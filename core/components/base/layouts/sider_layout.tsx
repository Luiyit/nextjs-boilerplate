import React from 'react';
import { Layout } from 'antd';
import Header from '@base_comps/layouts/header'
import Sider from '@base_comps/layouts/sider'
import Footer from '@base_comps/layouts/footer'
import Content from '@base_comps/layouts/sider_content'
import { ComponentProps } from '@interfaces/util'
import SiderLayoutStyle from './style/sider_style';
import { generateMenu } from '@core/utils/menu'
import { getBrandAssets } from '@core/utils/header'
import { MenuType, MenuGeneratorType } from "@core/types/menu";
import { useSession } from '@core/providers/session';
import { theme } from 'antd'
const { useToken } = theme;
import { useTheme } from '@core/providers/theme';
import { useCoreConfig } from '@core/providers/config';
import Head from './head';

interface SiderLayoutProps extends ComponentProps{
  siderMenu?: MenuType[] | MenuGeneratorType
  headerMenu?: MenuType[] | MenuGeneratorType
  profileMenu?: MenuType[] | MenuGeneratorType
  hideHeader?: boolean
  hideFooter?: boolean
}

const SiderLayout: React.FC<SiderLayoutProps> = ({ children, siderMenu, headerMenu, profileMenu, hideHeader, hideFooter }) => {

  const { dark } = useTheme()
  const { user } = useSession()
  const { token } = useToken()
  const config = useCoreConfig()
  const { header, footerBar, template, sidebar } = config.siderLayout
  const useFullSider = template === 'full-sider'
  
  const siderMenuItems = generateMenu(siderMenu, user, "sider");
  const headerMenuItems = generateMenu(headerMenu, user, "sider");
  const profileMenuItems = generateMenu(profileMenu, user, "sider");
  
  const { logo, favIcon} = getBrandAssets("sider", dark, config)

  return (
    <React.Fragment>
      <Head />
      <SiderLayoutStyle colorText={token.colorText} config={config.siderLayout} />
      <Layout className={`ant-${template}-template`}>
        {!useFullSider && !hideHeader && (
          <Header 
            menuItems={headerMenuItems} 
            profileMenuItems={profileMenuItems} 
            logo={logo}
            favIcon={favIcon}
            config={header}
          />
        )}

        {useFullSider && (
          <Sider 
            menuItems={siderMenuItems} 
            logo={logo}
            favIcon={favIcon}
            config={sidebar}
          />
        )}

        <Layout>
          {useFullSider && !hideHeader && (
            <Header 
              menuItems={headerMenuItems} 
              profileMenuItems={profileMenuItems} 
              logo={logo}
              favIcon={favIcon}
              config={header}
            />
          )}

          {!useFullSider && (
            <Sider 
              menuItems={siderMenuItems} 
              logo={logo}
              favIcon={favIcon}
              config={sidebar}
            />
          )}

          <Content 
            headerHidden={hideHeader} 
            footerHidden={hideFooter}
            headerHeight={header.height}
            footerHeight={footerBar.height}
            useFooter={footerBar.enabled}
          >
            { children }
          </Content>

          {useFullSider && !hideFooter && (
            <Footer 
              useContainer={footerBar.useContainer} 
              config={footerBar}
            />
          )}
        </Layout>

        {!useFullSider && !hideFooter && (
          <Footer 
            useContainer={footerBar.useContainer} 
            config={footerBar}
          />
        )}

      </Layout>
    </React.Fragment>
  )
}

export default SiderLayout;