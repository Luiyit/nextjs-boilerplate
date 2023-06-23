import React from 'react';
import { Layout } from 'antd';
import Header from '@base_comps/layouts/header'
import Sider from '@base_comps/layouts/sider'
import Footer from '@base_comps/layouts/footer'
import Content from '@base_comps/layouts/sider_content'
import { ComponentProps } from '@interfaces/util'
import { SiderLayoutStyle } from './styled';
import { generateMenu } from '@core/utils/menu'
import { MenuType, MenuGeneratorType } from "@core/types/menu";
import { useSession } from '@core/providers/session';
import lc from '@app/config/layout';

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
  const { user } = useSession()
  const siderMenuItems = generateMenu(siderMenu, user);
  const headerMenuItems = generateMenu(headerMenu, user);
  const profileMenuItems = generateMenu(profileMenu, user);

  return (
    <React.Fragment>
      <SiderLayoutStyle />
      <Layout className={`ant-${template}-template`}>
        {!useFullSider && !hideHeader && (
          <Header 
            menuItems={headerMenuItems} 
            profileMenuItems={profileMenuItems} 
            useContainer={lc.header.useContainerOnSider} 
            showLogo 
          />
        )}
        {useFullSider && <Sider menuItems={siderMenuItems} showLogo />}

        <Layout>
          {useFullSider && !hideHeader && (
            <Header 
              menuItems={headerMenuItems} 
              profileMenuItems={profileMenuItems} 
              useContainer={lc.header.useContainerOnSider} 
            />
          )}
          {!useFullSider && <Sider menuItems={siderMenuItems} />}

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