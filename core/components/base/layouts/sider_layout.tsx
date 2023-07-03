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
import lc from '@app/config/layout';
import { theme } from 'antd'
const { useToken } = theme;
import Image from 'next/image'
import brand from '@app/config/brand';
import { useTheme } from '@root/core/providers/theme';

interface SiderLayoutProps extends ComponentProps{
  template?: 'full-vav' | 'full-sider'
  siderMenu?: MenuType[] | MenuGeneratorType
  headerMenu?: MenuType[] | MenuGeneratorType
  profileMenu?: MenuType[] | MenuGeneratorType
  hideHeader?: boolean
  hideFooter?: boolean
}

const SiderLayout: React.FC<SiderLayoutProps> = ({ children, siderMenu, headerMenu, profileMenu, template = 'full-vav', hideHeader, hideFooter }) => {

  const useFullSider = template === 'full-sider'
  const { dark } = useTheme()
  const { user } = useSession()
  const { token } = useToken()
  
  const siderMenuItems = generateMenu(siderMenu, user);
  const headerMenuItems = generateMenu(headerMenu, user);
  const profileMenuItems = generateMenu(profileMenu, user);
  
  const { logo, favIcon} = getBrandAssets("sider", dark)

  return (
    <React.Fragment>
      <SiderLayoutStyle colorText={token.colorText} />
      <Layout className={`ant-${template}-template`}>
        {!useFullSider && !hideHeader && (
          <Header 
            menuItems={headerMenuItems} 
            profileMenuItems={profileMenuItems} 
            useContainer={lc.header.useContainerOnSider} 
            logo={logo}
            favIcon={favIcon}
            showLogo 
          />
        )}
        {useFullSider && <Sider 
          menuItems={siderMenuItems} 
          logo={logo}
          favIcon={favIcon}
          showLogo 
        />}

        <Layout>
          {useFullSider && !hideHeader && (
            <Header 
              menuItems={headerMenuItems} 
              profileMenuItems={profileMenuItems} 
              useContainer={lc.header.useContainerOnSider} 
              logo={logo}
              favIcon={favIcon}
            />
          )}
          {!useFullSider && <Sider 
            menuItems={siderMenuItems} 
            logo={logo}
            favIcon={favIcon}
          />}

          <Content headerHidden={hideHeader} footerHidden={hideFooter}>
            { children }
          </Content>

          {useFullSider && !hideFooter && <Footer />}
        </Layout>
        {!useFullSider && !hideFooter && <Footer />}
      </Layout>
    </React.Fragment>
  )
}

export default SiderLayout;