import React, { FC } from 'react';
import { ComponentProps } from '@interfaces/util'
import type { CoreConfig } from '../../types/global_config'
import ConfigProvider from '@core/providers/config'
import ThemeProvider from '@core/providers/theme'
import NotifierProvider from '@core/providers/notifier'
import { ThemeConfig } from 'antd';

interface Props extends ComponentProps {
  config?: CoreConfig | undefined | null;
  theme?: ThemeConfig
}

const BaseCoreProviders: FC<Props> = ({ children, config, theme }) => {
  return (
    <ConfigProvider config={config} >
      <ThemeProvider theme={theme}>
        <NotifierProvider>
          { children }
        </NotifierProvider>
      </ThemeProvider>
    </ConfigProvider>
  )
};

export default BaseCoreProviders;
