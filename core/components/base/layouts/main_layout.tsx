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
import lc from '@app/config/layout';
import { theme } from 'antd'
const { useToken } = theme;
import { useTheme } from '@root/core/providers/theme';
import { getBrandAssets } from '@core/utils/header'

interface MainLayoutProps extends ComponentProps{
  template?: 'full-vav' | 'full-sider'
  headerMenu?: MenuType[] | MenuGeneratorType
  profileMenu?: MenuType[] | MenuGeneratorType
  hideHeader?: boolean
  hideFooter?: boolean
  fixedHeader?: boolean
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, headerMenu, profileMenu, hideHeader, hideFooter, fixedHeader }) => {
  const { user } = useSession()
  const { token } = useToken()
  const { dark } = useTheme()

  const menuItems = generateMenu(headerMenu, user);
  const profileMenuItems = generateMenu(profileMenu, user);
  const { logo, favIcon} = getBrandAssets("main", dark)

  return (
    <React.Fragment>
      <MainLayoutStyle colorText={token.colorText} />
      <Layout className={`ant-full-content-template ${!!lc.header.fixed ? 'fixed-header' : ''}`}>
        {!hideHeader && (
          <Header 
            menuItems={ menuItems } 
            profileMenuItems={profileMenuItems}
            useContainer={lc.header.useContainer}
            disableDarkMode={lc.header.disableDarkMode}
            fixed={fixedHeader}
            logo={logo}
            favIcon={favIcon}
            showLogo 
          />
        )}
        <Content 
          headerHidden={hideHeader} 
          footerHidden={hideFooter} 
          disableDarkMode={lc.mainLayout.disableDarkMode}
        >
          { children }
        </Content>
        {!hideFooter && <Footer useContainer={lc.header.useContainer} />}
      </Layout>
    </React.Fragment>

  )
}

export default MainLayout;