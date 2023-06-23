import styled, { createGlobalStyle } from 'styled-components';

const codeAreaSize = 60;
const gutter = (100 - codeAreaSize) * 0.5;
const iGutter = 100 - gutter;
const path = `0% 0%, 0% 100%, ${gutter}% 100%, ${gutter}% ${gutter}%, ${iGutter}% ${gutter}%, ${iGutter}% ${iGutter}%, ${gutter}% ${iGutter}%, ${gutter}% 100%, 100% 100%, 100% 0%`

const Wrapper = styled.div`
  position: relative;
  .ant-btn{
    position: absolute;
    z-index: 5;
    top: 10px;
    right: 10px;
  }

  .ant-tag{
    position: absolute;
    z-index: 10;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }

  .loading, .grant_permission, .not_granted{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 5;
    background-color: #fff;

    .anticon{
      position: absolute;
      top: calc(50% - 10px);
      left: calc(50% - 10px);
    }

    .ant-btn{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  
`

const QrContainer = styled.div`
  width: 100%;
  height: 384px;
  position: relative;

  :after{
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.5;
    z-index: 1;

    -webkit-clip-path: ${`polygon(${path})`};
    clip-path: ${`polygon(${path})`}
  }

  :before{
    content: "";
    position: absolute;
    top: ${`${gutter}%`};
    left: ${`${gutter}%`};
    display: block;
    width: ${`${codeAreaSize}%`};
    height: ${`${codeAreaSize}%`};
    border: 5px dashed #ddd;
    z-index: 2;
  }
`

export { Wrapper, QrContainer }