import React, { useState } from 'react';
import { Layout } from 'antd';
const { Sider: AntSider } = Layout;
import { ComponentProps } from '@interfaces/util'
import { siderStyle } from './styles'
import lc from '@app/config/layout';
import brand from '@app/config/brand';
import Menu from '@base_comps/menu'
import { Div } from '@styled_comps/blocks';
import Image from 'next/image'
import Link from 'next/link'
import { MenuType } from '@core/types/menu';
import { useTheme } from '@core/providers/theme';

interface SiderProps extends ComponentProps{
  menuItems?: MenuType[],
  showLogo?: boolean
}

const Sider: React.FC<SiderProps> = ({ menuItems, showLogo }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { dark } = useTheme();

  const logo = brand.renderLogo ? 
    brand.renderLogo({ className: "main-logo" }): 
    <Image className="main-logo" src={brand.logo} alt={brand.name} height={lc.header.height * 0.75} />

  const favIcon = brand.renderFav ? 
    brand.renderFav(lc.header.height - 20, { className: "main-fav-logo" }) : 
    <Image className="main-fav-logo" src={brand.favLogo} alt={brand.name} height={lc.header.height - 10} />

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
            <Link href='/' style={{display: "inline-block", fontSize: 0}}>
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
