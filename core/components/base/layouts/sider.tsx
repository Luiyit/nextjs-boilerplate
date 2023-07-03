import React, { useState } from 'react';
import { Layout } from 'antd';
const { Sider: AntSider } = Layout;
import { ComponentProps } from '@interfaces/util'
import { siderStyle } from './styles'
import lc from '@app/config/layout';
import Menu from '@base_comps/menu'
import { Div } from '@styled_comps/blocks';
import Link from 'next/link'
import { MenuType } from '@core/types/menu';
import { useTheme } from '@core/providers/theme';

interface SiderProps extends ComponentProps{
  menuItems?: MenuType[]
  showLogo?: boolean
  logo: React.ReactNode
  favIcon: React.ReactNode
}

const Sider: React.FC<SiderProps> = ({ menuItems, showLogo, logo, favIcon }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { dark } = useTheme();

  return (
    <React.Fragment>
      <AntSider 
        style={siderStyle} 
        width={lc.sidebar.width}
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="lg"
        collapsedWidth={lc.sidebar.collapsedWidth}
        onBreakpoint={(broken) => {}}
        theme={ dark ? 'dark': 'light' }
      >
        {showLogo && (
          <Div padding='5px' textAlign='center' height={`${lc.header.height}px`}>
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
