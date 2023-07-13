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
import SignUpForm from '@app_comps/forms/auth/sign_up_form';
import ForgotPasswordForm from '@app_comps/forms/auth/forgot_password';
import { HeaderConfigI } from '@root/core/types/global_config';

interface HeaderProps extends ComponentProps{
  menuItems?: MenuType[],
  profileMenuItems?: MenuType[],
  menuTheme?: AntMenuProps['theme'],
  logo: React.ReactNode
  favIcon: React.ReactNode
  config: HeaderConfigI
}

const Header: React.FC<HeaderProps> = ({ menuItems, profileMenuItems, menuTheme, logo, favIcon, config }) => {
  
  const baseOpacity = config.fixed?.baseOpacity || 1;
  const [opacity, setOpacity] = useState<number>(baseOpacity)
  const opacityRef = React.useRef(opacity);
  const HeaderContainer = config.useContainer ? Container : Div;

  const { dark } = useTheme();
  const darkTheme = dark && !config.disableDarkMode

  const listenScrollEvent = () => {

    if(!config.fixed) return;
    /**
     * DEV NOTE:
     * Normalize scroll position to a value between baseOpacity and opacityOnScroll
     * maxScrollY = 300
     * value = (scrollY / maxScrollY) * (opacityOnScroll - baseOpacity) + baseOpacity
     */
    const scrollOpacity = Math.min((window.scrollY / 300), 1) * (config.fixed.opacityOnScroll - config.fixed.baseOpacity) + config.fixed.baseOpacity;

    // DEV NOTE: Reduce extra renders updating opacity when it reaches the max value
    if(!config.fixed.bgColor || (scrollOpacity >= config.fixed.opacityOnScroll && opacityRef.current >= config.fixed.opacityOnScroll)) return;

    setOpacity(scrollOpacity)
    opacityRef.current = scrollOpacity;
  }
  
  useEffect(() => { 
    if (!config.fixed) return;

    window.addEventListener('scroll', listenScrollEvent)
    return () => window.removeEventListener('scroll', listenScrollEvent)
  }, [])

  const dynamicStyle = {
    ...(config.fixed ? { backgroundColor: hexToRgba(config.fixed.bgColor, opacity) } : {}),
    height: config.heightInPx,
  }

  return (
    <AntHeader className={`ant-layout-header-${darkTheme ? 'dark': 'light'}`} style={dynamicStyle}>
      <HeaderContainer className="header-container">

        <Div display={displayTypes.flex} align={alignTypes.center} height={config.heightInPx} justifyContent='space-between'>
          <Div className="header-left">
            {config.showLogo && (
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
              forgotPasswordForm={ForgotPasswordForm}
            />
          </Div>
        </Div>
        
      </HeaderContainer>
    </AntHeader>
  )
}

export default Header
