import lc, { breakpoints } from '@app/config/layout';
import { createGlobalStyle  } from 'styled-components';
import hexToRgba from 'hex-to-rgba';

const mainLayoutStyle = createGlobalStyle<{ colorText: string }>`
  .ant-layout{
    position: relative;

    .ant-layout-content-dark{
      color: ${({ colorText }) => colorText };
    }

    &.ant-full-content-template{

      .ant-menu{
        background: transparent;
        min-width: 50%;
        justify-content: center;
      }

      .ant-layout-header {
        color: ${lc.header.fixed.textColor};

        .ant-menu{
          li{
            color: ${hexToRgba(lc.header.fixed.textColor, '0.9')};

            &:hover{
              color: ${lc.header.fixed.textColor};
            }
          }
        }

        &.ant-layout-header-dark{
          background: #141414;
          border-bottom: 1px solid rgba(253, 253, 253, 0.12);
          
        }
        
        .header-logo-container{  
          .main-fav-logo{ display: none; }
          @media (max-width: ${breakpoints.lg}){
            .main-logo{ display: none; }
            .main-fav-logo{ display: inline-block; }
          }
        }
  
        .ant-menu{
          li{
            line-height: ${lc.header.heightInPx};
          }
        }
      }
    }

    &.fixed-header{
      .ant-layout-header{
        height: ${lc.header.heightInPx};
        line-height: initial;
        padding-inline: 0;
        width: 100%;
        z-index: 1000;
        position: fixed;
        
        .ant-menu{
          border-bottom: none;
        }
      }
    }

    /* Not fixed (custom style) - Not dark */
    &:not(.fixed-header){
      &.ant-full-content-template{
        &:not(.ant-layout-header-dark){
          background: #fff;

          .ant-menu{
          }
        }
      }
    }
  }
`;

export default mainLayoutStyle;