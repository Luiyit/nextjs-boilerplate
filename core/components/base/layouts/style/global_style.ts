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
  
  .ant-logo-uploader.ant-upload-wrapper.ant-upload-picture-card-wrapper,
  .ant-avatar-uploader.ant-upload-wrapper.ant-upload-picture-circle-wrapper{
    .ant-upload-list{
      
      .ant-upload.ant-upload-select,
      .ant-upload-list-item-container{
        width: 200px;
        height: 200px;
      }
    }
  }  
  
  .ant-upload-wrapper.ant-upload-picture-circle-wrapper .ant-upload-list.ant-upload-list-picture-circle .ant-upload-list-item-container{
  }
`

export default globalLayoutStyle;