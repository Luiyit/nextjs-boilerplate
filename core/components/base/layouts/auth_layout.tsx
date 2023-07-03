import React from 'react';
import { Col, Layout, Row } from 'antd';
import { ComponentProps } from '@interfaces/util'
import { AuthLayoutStyle, AuthContentImage } from './styled'

interface AuthLayoutProps extends ComponentProps{
  imageUrl?: string
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, imageUrl }) => {
    
  return (
    <React.Fragment>
      <AuthLayoutStyle />
      
      <Layout className={`auth-content-template`}>
        <Row className="auth-content-row" justify="center" align="middle" >
          <Col className="auth-content-col" md={0} lg={12} xl={12} xxl={12}>
            <AuthContentImage imageUrl={imageUrl} />
          </Col>
          <Col className="auth-content-col" xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <div className="auth-content">
              {children}
            </div>
          </Col>
        </Row>
      </Layout>
    </React.Fragment>

  )
}

export default AuthLayout;