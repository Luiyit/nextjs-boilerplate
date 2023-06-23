import React from 'react';
import { Layout } from 'antd';
import Header from '@base_comps/layouts/header'
import Footer from '@base_comps/layouts/footer'
import Content from '@base_comps/layouts/content'
import { ComponentProps } from '@interfaces/util'
import { ContentLayoutStyle } from './styled'
import { generateMenu } from '@core/utils/menu'
import { MenuType, MenuGeneratorType } from "@core/types/menu";
import { useSession } from '@core/providers/session';
import lc from '@app/config/layout';

interface ContentLayoutProps extends ComponentProps{
  template?: 'full-vav' | 'full-sider'
  headerMenu?: MenuType[] | MenuGeneratorType
  profileMenu?: MenuType[] | MenuGeneratorType
  hideHeader?: boolean
  hideFooter?: boolean
}

const ContentLayout: React.FC<ContentLayoutProps> = ({ children, headerMenu, profileMenu, hideHeader, hideFooter }) => {
  const { user } = useSession()
  const menuItems = generateMenu(headerMenu, user);
  const profileMenuItems = generateMenu(profileMenu, user);
  
  return (
    <React.Fragment>
      <ContentLayoutStyle />
      <Layout className={`ant-full-content-template`}>
        {!hideHeader && (
          <Header 
            menuItems={ menuItems } 
            showLogo 
            profileMenuItems={profileMenuItems}
            useContainer={lc.header.useContainer}
          />
        )}
        <Content headerHidden={hideHeader} footerHidden={hideFooter} >
          { children }
        </Content>
        {!hideFooter && <Footer />}
      </Layout>
    </React.Fragment>

  )
}

export default ContentLayout;