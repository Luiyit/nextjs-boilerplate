import { breakpoints } from '@interfaces/util.d';
import { createGlobalStyle  } from 'styled-components';
import { SiderLayoutI } from '@interfaces/global_config';

const siderLayoutStyle = createGlobalStyle<{ colorText: string, config: SiderLayoutI }>`
  .ant-layout{
    position: relative;

    /* Set text color in dark mode using antd token */
    .ant-layout-content-dark{
      color: ${({ colorText }) => colorText };
    }

    /* Logo in header or sider */
    .logo-link{
      display: inline-block;
      font-size: 0;
    }

    .ant-layout-sider{
      @media (max-width: ${breakpoints.lg}){
        position: absolute;
        height: 100%;
        z-index: 2;
      }      
      
      /* dark mode */
      &.ant-layout-sider-dark {
        background: #141414;
        border-inline-end: 1px solid rgba(253, 253, 253, 0.12);
        
        .ant-layout-sider-trigger{
          background-color: #101010;
          border-inline-end: 1px solid rgba(253, 253, 253, 0.12);
        }
        
        .ant-menu{
          border-inline-end: none;
        }
      }

      &:not(.ant-layout-sider-dark) {
        /* background: red; */
        border-inline-end: 1px solid rgba(0, 0, 0, 0.12);
        
        .ant-layout-sider-trigger{
          border-inline-end: 1px solid rgba(0, 0, 0, 0.12);
        }
      }
      
      .ant-layout-sider-trigger{
        position: absolute;
      }

      .main-fav-logo{ display: none; }
      &.ant-layout-sider-collapsed{
        .main-logo{ display: none; }
        .main-fav-logo{ display: inline-block; }
      }
    }

    &:not(.ant-full-sider-template){
      .ant-layout{
        .ant-layout-content{
          @media (max-width: ${breakpoints.lg}){
            padding-left: ${({ config }) => config.sidebar.collapsedWidthInPx};
          }
        }
      }
    }

    /* Header style */
    .ant-layout-header {
      
      .header-container:not(.container){
        padding: 0 16px;
      }

      .ant-menu{
        li{
          line-height: ${({ config }) => config.header.heightInPx};
        }
      }
      
      &.ant-layout-header-dark{
        background: #141414;
        border-bottom: 1px solid rgba(253, 253, 253, 0.12);
        
      }
      
      &:not(.ant-layout-header-dark){
        background: #fff;
      }
    }

    /* When the Header is set side by side (LEFT-RIGHT) */
    &.ant-full-vav-template{
      .ant-layout-header {

        .header-logo-container{
          @media (min-width: ${breakpoints.lg}){
            width: ${({ config }) => config.sidebar.widthInPx};
          }
  
          .main-fav-logo{ display: none; }
          @media (max-width: ${breakpoints.lg}){
            .main-logo{ display: none; }
            .main-fav-logo{ display: inline-block; }
          }
        }
      }
    }

    /* When the Header is set side by side (TOP-BOTTOM) */
    &.ant-full-sider-template{
      .ant-layout-header {
      }
      .ant-layout{
        @media (max-width: ${breakpoints.lg}){
          padding-left: ${({ config }) => config.sidebar.collapsedWidthInPx};
        }
      }
    }
  }
`;

export default siderLayoutStyle;