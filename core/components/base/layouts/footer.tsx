import React from 'react';
import { Layout } from 'antd';
import lc from '@app/config/layout';
const { Footer: AntFooter } = Layout;
import { ComponentProps } from '@interfaces/util'
import { Div, Flex } from '@styled_comps/blocks'
import { footerStyle } from './styles'
import Container from '@styled_comps/container'
import { useTheme } from '@core/providers/theme';
import Text from '@styled_comps/texts';
import brand from '@app/config/brand';

interface FooterProps extends ComponentProps{
  useContainer?: boolean;
}

const Footer: React.FC<FooterProps> = ({ useContainer }) => {
  const { token } = useTheme()
  const HeaderContainer = useContainer ? Container : Div;
  return (
    <React.Fragment>
      {lc.footer.useFooterWithSider && (
        <AntFooter style={footerStyle}>
          <HeaderContainer height="100%">
            <Flex alignItems='center' justifyContent="space-between" height="100%">
              <Text fontSize={`${token.fontSizeSM}px`} padding="5px 0">
                © Copyright 2023 {brand.name} All rights reserved.
              </Text>
              <Text fontSize={`${token.fontSizeSM}px`} padding="5px 0">
                {brand.contactEmail}
              </Text>
            </Flex>
          </HeaderContainer>          
        </AntFooter>
      )}
    </React.Fragment>
  )
}

export default Footer
