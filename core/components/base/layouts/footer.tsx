import React from 'react';
import { Layout } from 'antd';
const { Footer: AntFooter } = Layout;
import { ComponentProps } from '@interfaces/util'
import { Div } from '@styled_comps/blocks'
import Container from '@styled_comps/container'
import FooterBar from './footer_bar';
import { FooterBarI } from '@root/core/types/global_config';

interface FooterProps extends ComponentProps{
  useContainer?: boolean;
  config: FooterBarI;
}

// TODO: Rename to FooterBar
const Footer: React.FC<FooterProps> = ({ children, useContainer, className, config }) => {
  const HeaderContainer = useContainer ? Container : Div;

  return (
    <React.Fragment>
      <AntFooter className={className}>
        <HeaderContainer height="100%" padding="0 15px">
          { children }
          <FooterBar height={ config.heightInPx }/>
        </HeaderContainer>          
      </AntFooter>
    </React.Fragment>
  )
}

export default Footer
