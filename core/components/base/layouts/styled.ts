import lc, { breakpoints } from '@app/config/layout';
import styled, { createGlobalStyle  } from 'styled-components';

// Style for Sider LAYOUT (Sider / Header / Content / Footer)
const SiderLayoutStyle = createGlobalStyle`
  .ant-layout{
    position: relative;

    .ant-layout-content-dark{
      /* TODO: Como puedo obtener este valor de las vars de Antd!!!! */
      color: rgba(255, 255, 255, 0.85);
    }

    .logo-link{
      display: inline-block;
      font-size: 0;
    }

    /* Sider style */
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
            padding-left: ${lc.sidebar.collapsedWidthInPx};
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
          line-height: ${lc.header.heightInPx};
        }
      }
      
      &.ant-layout-header-dark{
        background: #141414;
        border-bottom: 1px solid rgba(253, 253, 253, 0.12);
        
      }
      
      &:not(.ant-layout-header-dark){
        background: #fff;
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);

        .ant-menu{
          border-bottom: 1px solid rgba(0, 0, 0, 0.12);
        }
      }
    }

    /* When the Header is set side by side (LEFT-RIGHT) */
    &.ant-full-vav-template{
      .ant-layout-header {

        .header-logo-container{
          @media (min-width: ${breakpoints.lg}){
            width: ${lc.sidebar.widthInPx};
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
          padding-left: ${lc.sidebar.collapsedWidthInPx};
        }
      }

    }
  }
`;

const ContentLayoutStyle = createGlobalStyle`
  .ant-layout{
    position: relative;

    .ant-layout-content-dark{
      /* TODO: Como puedo obtener este valor de las vars de Antd!!!! */
      color: rgba(255, 255, 255, 0.85);
    }

    &.ant-full-content-template{
      .ant-layout-header {
        
        &.ant-layout-header-dark{
          background: #141414;
          border-bottom: 1px solid rgba(253, 253, 253, 0.12);
          
        }
        
        &:not(.ant-layout-header-dark){
          background: #fff;

          .ant-menu{
          }
        }

        .header-logo-container{
          /* TODO: should we fix the bg to white */
  
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
  }
`;

const AuthLayoutStyle = createGlobalStyle`
  .auth-content{
    max-width: 400px;
    margin: 0 auto;
  }
`

const AuthContentImage = styled.div.attrs((props: { imageUrl: string }) => (props))`
  height: 100vh;
  background-image: ${({ imageUrl }) => imageUrl ? `url(${imageUrl})` : 'none'};
  background-position: center;
  background-size: cover;
`

export {
  SiderLayoutStyle,
  ContentLayoutStyle,
  AuthLayoutStyle,
  AuthContentImage
}