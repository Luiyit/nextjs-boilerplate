import { createGlobalStyle  } from 'styled-components';

const globalLayoutStyle = createGlobalStyle`
  .ant-layout{
    
    .ant-layout-header {
      background: white;
      line-height: initial;
      padding-inline: 0;
      width: 100%;

      .ant-menu{
        background: transparent;
        border-bottom: none;
      }
    }

    .ant-layout-footer{
      padding: 0;
    }

  }
`

export default globalLayoutStyle;