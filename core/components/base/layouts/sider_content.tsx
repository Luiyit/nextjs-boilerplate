import React, { useMemo } from 'react';
import { Layout } from 'antd';
const { Content: AntContent } = Layout;
import { ComponentProps } from '@interfaces/util'
import { SiderContainer } from '@styled_comps/container'
import { generateSiderContentStyle, SiderContentStyleProps } from './styles'
import { useTheme } from '@core/providers/theme';

interface ContentProps extends ComponentProps, SiderContentStyleProps{
}

const SiderContent: React.FC<ContentProps> = ({ children, ...rest }) => {
  const siderContentStyle = useMemo(() => generateSiderContentStyle(rest), [rest])
  const { dark } = useTheme();

  return (
    <React.Fragment>
      <AntContent className={`ant-layout-content-${dark ? 'dark':'light'}`} style={siderContentStyle} >
        <SiderContainer>
          { children }
        </SiderContainer>
      </AntContent>
    </React.Fragment>
  )
}

export default SiderContent
