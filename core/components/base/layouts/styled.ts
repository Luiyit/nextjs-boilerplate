import styled, { createGlobalStyle  } from 'styled-components';

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
  AuthLayoutStyle,
  AuthContentImage
}