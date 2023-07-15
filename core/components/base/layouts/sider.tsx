import React, { useState } from 'react';
import { Layout } from 'antd';
const { Sider: AntSider } = Layout;
import { ComponentProps } from '@interfaces/util'
import Menu from '@base_comps/menu'
import { Div } from '@styled_comps/blocks';
import Link from 'next/link'
import { MenuType } from '@core/types/menu';
import { useTheme } from '@core/providers/theme';
import { SidebarConfigI } from '@root/core/types/global_config';

interface SiderProps extends ComponentProps{
  menuItems?: MenuType[]
  logo: React.ReactNode
  favIcon: React.ReactNode
  config: SidebarConfigI
}

const Sider: React.FC<SiderProps> = ({ menuItems, logo, favIcon, config }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { dark } = useTheme();
  const { showLogo } = config

  return (
    <React.Fragment>
      <AntSider 
        width={config.width}
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="lg"
        collapsedWidth={config.collapsedWidth}
        onBreakpoint={(broken) => {}}
        theme={ dark ? 'dark': 'light' }
      >
        {showLogo && (
          <Div padding='5px' textAlign='center' height={`${config.logoHeight}px`}>
            <Link className='logo-link' href='/'>
              { logo }
              { favIcon }
            </Link>
          </Div>
        )}
        <Menu items={menuItems} mode='inline' />
      </AntSider>
    </React.Fragment>

  )
}

export default Sider
