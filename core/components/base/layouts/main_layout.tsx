import React from 'react';
import { Layout } from 'antd';
import Header from '@base_comps/layouts/header'
import Footer from '@base_comps/layouts/footer'
import Content from '@base_comps/layouts/content'
import { ComponentProps } from '@interfaces/util'
import MainLayoutStyle from './style/main_style'
import { generateMenu } from '@core/utils/menu'
import { MenuType, MenuGeneratorType } from "@core/types/menu";
import { useSession } from '@core/providers/session';
import { theme } from 'antd'
const { useToken } = theme;
import { useTheme } from '@root/core/providers/theme';
import { getBrandAssets } from '@core/utils/header'
import { useCoreConfig } from '@root/core/providers/config';

interface MainLayoutProps extends ComponentProps{
  template?: 'full-vav' | 'full-sider'
  headerMenu?: MenuType[] | MenuGeneratorType
  profileMenu?: MenuType[] | MenuGeneratorType
  hideHeader?: boolean
  hideFooter?: boolean
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, headerMenu, profileMenu, hideHeader, hideFooter }) => {
  const { user } = useSession()
  const { token } = useToken()
  const { dark } = useTheme()
  const config = useCoreConfig()
  const { header, footerBar } = config.mainLayout

  const menuItems = generateMenu(headerMenu, user);
  const profileMenuItems = generateMenu(profileMenu, user);
  const { logo, favIcon} = getBrandAssets("main", dark, config)

  return (
    <React.Fragment>
      <MainLayoutStyle colorText={token.colorText} config={config.mainLayout} />
      <Layout className={`ant-full-content-template ${!!header.fixed ? 'fixed-header' : ''}`}>
        {!hideHeader && (
          <Header 
            menuItems={ menuItems } 
            profileMenuItems={profileMenuItems}
            logo={logo}
            favIcon={favIcon}
            config={header}
          />
        )}
        <Content 
          headerHidden={hideHeader} 
          footerHidden={hideFooter} 
          disableDarkMode={config.mainLayout.disableDarkMode}
        >
          { children }
        </Content>

        {/* TODO: Check hideFooter */}
        {footerBar.enabled && (
          <Footer 
            useContainer={footerBar.useContainer} 
            config={footerBar}
          />
        )}
      </Layout>
    </React.Fragment>

  )
}

export default MainLayout;