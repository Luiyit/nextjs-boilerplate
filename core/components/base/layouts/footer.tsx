import React from 'react';
import { Layout } from 'antd';
import lc from '@app/config/layout';
const { Footer: AntFooter } = Layout;
import { ComponentProps } from '@interfaces/util'
import { Div } from '@styled_comps/blocks'
import { footerStyle } from './styles'
import Container from '@styled_comps/container'
import FooterBar from './footer_bar';

interface FooterProps extends ComponentProps{
  useContainer?: boolean;
}

const Footer: React.FC<FooterProps> = ({ useContainer }) => {
  const HeaderContainer = useContainer ? Container : Div;
  return (
    <React.Fragment>
      {lc.footer.useFooterWithSider && (
        <AntFooter style={footerStyle}>
          <HeaderContainer height="100%" padding="0 15px">
            <FooterBar />
          </HeaderContainer>          
        </AntFooter>
      )}
    </React.Fragment>
  )
}

export default Footer
