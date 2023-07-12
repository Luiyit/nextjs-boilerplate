import React, { FC } from 'react';
import { ComponentProps } from '@interfaces/util'
import type { CoreConfig } from '../../types/global_config'
import ConfigProvider from '@core/providers/config'
import ThemeProvider from '@core/providers/theme'
import NotifierProvider from '@core/providers/notifier'

interface Props extends ComponentProps {
  config?: CoreConfig | undefined | null;
}

// TODO: Should be inside providers folder!?
const BaseCoreProviders: FC<Props> = ({ children, config }) => {
  return (
    <ConfigProvider config={config} >
      {/* disableDarkMode={useMainLayout} */}
      <ThemeProvider>
        <NotifierProvider>
          { children }
        </NotifierProvider>
      </ThemeProvider>
    </ConfigProvider>
  )
};

export default BaseCoreProviders;
