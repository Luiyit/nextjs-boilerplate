import lc, { breakpoints } from '@app/config/layout';
import styled, { createGlobalStyle  } from 'styled-components';
import hexToRgba from 'hex-to-rgba';

const globalLayoutStyle = createGlobalStyle`
  .ant-layout{
    .ant-layout-header {
      .ant-menu{
        background: transparent;
        border-bottom: none;
      }
    }
  }
`

export default globalLayoutStyle;