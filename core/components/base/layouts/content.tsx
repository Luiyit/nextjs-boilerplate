import React, { useMemo } from 'react';
import { Layout } from 'antd';
const { Content: AntContent } = Layout;
import { ComponentProps } from '@interfaces/util'
import { Container } from '@styled_comps/container'
import { generateContentStyle } from './styles'
import { useTheme } from '@core/providers/theme';

interface ContentProps extends ComponentProps{
  headerHidden?: boolean;
  footerHidden?: boolean;
}

const Content: React.FC<ContentProps> = ({ children, ...rest }) => {
  const contentStyle = useMemo(() => generateContentStyle(rest), [rest])
  const { dark } = useTheme();

  return (
    <React.Fragment>
      <AntContent className={`ant-layout-content-${dark ? 'dark':'light'}`} style={contentStyle} >
        <Container { ...rest } >
          { children }
        </Container>
      </AntContent>
    </React.Fragment>
  )
}

export default Content
