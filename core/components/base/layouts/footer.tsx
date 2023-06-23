import React from 'react';
import { Layout } from 'antd';
import lc from '@app/config/layout';
const { Footer: AntFooter } = Layout;
import { ComponentProps } from '@interfaces/util'
import { Div } from '@styled_comps/blocks'
import { footerStyle } from './styles'

const Footer: React.FC<ComponentProps> = () => {
  return (
    <React.Fragment>
      {lc.footer.useFooterWithSider && (
        <AntFooter style={footerStyle}>
          <Div textAlign='center'>
            Copyright © 2023 Boilerplate
          </Div>
        </AntFooter>
      )}
    </React.Fragment>
  )
}

export default Footer
