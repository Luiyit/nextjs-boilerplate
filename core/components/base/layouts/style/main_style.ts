import { createGlobalStyle, css } from 'styled-components';
import hexToRgba from 'hex-to-rgba';
import { LayoutI } from '@interfaces/global_config';
import { breakpoints } from '@interfaces/util.d';

const mainLayoutStyle = createGlobalStyle<{ colorText: string, config: LayoutI }>`
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
            line-height: ${({ config }) => config.header.heightInPx};
          }
        }
      }
    }

    ${({ config }) =>
    !!config.header.fixed &&
    css`
      &.fixed-header{
        .ant-layout-header{
          color: ${config.header.fixed.textColor};
          z-index: ${config.header.fixed.zIndex};
          position: fixed;
          
          .ant-menu{
            border-bottom: none;

            li{
              color: ${hexToRgba(config.header.fixed.textColor, '0.9')};

              &:hover{
                color: ${config.header.fixed.textColor};
              }
            }
          }
        }
      }
    `}

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