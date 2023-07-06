import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
const { Header: AntHeader } = Layout;
import { ComponentProps } from '@interfaces/util'
import Menu from '@base_comps/menu'
import { Div } from '@styled_comps/blocks';
import { displayTypes, alignTypes } from '@styled_comps/interfaces';
import Link from 'next/link'
import type { MenuProps as AntMenuProps } from 'antd';
import Avatar from '@core/components/base/session/session_avatar'
import SignInUp from '@base_comps/session/sign_in_up';
import { MenuType } from '@core/types/menu';
import Container from '@styled_comps/container'
import { useTheme } from '@core/providers/theme';
import hexToRgba from 'hex-to-rgba';
import Text from '@styled_comps/texts';

import lc from '@app/config/layout';
import SignUpForm from '@app_comps/forms/auth/sign_up_form';

interface HeaderProps extends ComponentProps{
  menuItems?: MenuType[],
  profileMenuItems?: MenuType[],
  showLogo?: boolean,
  menuTheme?: AntMenuProps['theme'],
  useContainer?: boolean,
  disableDarkMode?: boolean;
  logo: React.ReactNode
  favIcon: React.ReactNode
  fixed?: boolean
}

const Header: React.FC<HeaderProps> = ({ menuItems, profileMenuItems, showLogo, menuTheme, useContainer, disableDarkMode, logo, favIcon, fixed }) => {
  const baseOpacity = lc.header.fixed?.baseOpacity || 1;
  const [opacity, setOpacity] = useState<number>(baseOpacity)
  const opacityRef = React.useRef(opacity);
  const HeaderContainer = useContainer ? Container : Div;

  const { dark } = useTheme();
  const darkTheme = dark && !disableDarkMode

  const listenScrollEvent = () => {

    /**
     * DEV NOTE:
     * Normalize scroll position to a value between baseOpacity and opacityOnScroll
     * maxScrollY = 300
     * value = (scrollY / maxScrollY) * (opacityOnScroll - baseOpacity) + baseOpacity
     */
    const scrollOpacity = Math.min((window.scrollY / 300), 1) * (lc.header.fixed.opacityOnScroll - lc.header.fixed.baseOpacity) + lc.header.fixed.baseOpacity;

    // DEV NOTE: Reduce extra renders updating opacity when it reaches the max value
    if(!lc.header.fixed.bgColor || (scrollOpacity >= lc.header.fixed.opacityOnScroll && opacityRef.current >= lc.header.fixed.opacityOnScroll)) return;

    setOpacity(scrollOpacity)
    opacityRef.current = scrollOpacity;
  }
  
  useEffect(() => { 
    if (!fixed) return;

    window.addEventListener('scroll', listenScrollEvent)
    return () => window.removeEventListener('scroll', listenScrollEvent)
  }, [])

  const dynamicStyle = {
    ...(fixed ? { backgroundColor: hexToRgba(lc.header.fixed.bgColor, opacity) } : {})
  }

  return (
    <AntHeader className={`ant-layout-header-${darkTheme ? 'dark': 'light'}`} style={dynamicStyle}>
      <HeaderContainer className="header-container">

        <Div display={displayTypes.flex} align={alignTypes.center} height={lc.header.heightInPx} justifyContent='space-between'>
          <Div className="header-left">
            {showLogo && (
              <Div className='header-logo-container' padding='0 15px' textAlign='center' minWidth="80px">
                <Link className='logo-link' href='/' style={{display: "inline-block", fontSize: 0}}>
                  { logo }
                  { favIcon }
                </Link>
              </Div>
            )}
          </Div>

          <Menu items={menuItems} theme={menuTheme} />

          <Div className="header-right">
            <Avatar menuItems={profileMenuItems} />
            <SignInUp 
              buttonProps={{ 
                size: "small",
                shape: 'round',
                style: {height: "35px", width: "120px"}
              }} 
              signupForm={SignUpForm}
              buttonLabel={<Text fontWeight="700">Sign in</Text>}
            />
          </Div>
        </Div>
        
      </HeaderContainer>
    </AntHeader>
  )
}

export default Header
