import React, { FC, useContext, useMemo, useState } from 'react';

import { ComponentProps } from '@interfaces/util'
import { ConfigProvider, GlobalToken } from 'antd'
import antdTheme from '@app/config/antd_theme'
import { theme } from 'antd'
const { defaultAlgorithm, darkAlgorithm, useToken } = theme;
import { getStorage } from '@core/helpers/storage'
const CORE_THEME_STORAGE_KEY = 'core-theme'
// Provider value type
export type ProviderValue = {
  dark: boolean;
  setDark: (dark: boolean) => void;
  token: GlobalToken;
}

export const Context = React.createContext({} as ProviderValue);
export const useTheme = () => useContext(Context);

interface Props extends ComponentProps {
  dark: boolean;
  setDark: (dark: boolean) => void;
}

const InternalThemeProvider = ({ children, dark, setDark }: Props ) => {
  const { token } = useToken();
  
  // Provider value
  const value: ProviderValue = {
    dark,
    setDark,
    token,
  };

  return (
    <Context.Provider value={value} >
      { children }
    </Context.Provider>
  );
};

interface AntdThemeProviderProps extends ComponentProps {
  disableDarkMode?: boolean;
}

const AntdThemeProvider: FC<AntdThemeProviderProps> = ({ children, disableDarkMode }) => {
  const storage = useMemo(() => getStorage(), [])
  const [dark, setDark] = useState(storage.getItem(CORE_THEME_STORAGE_KEY) === 'dark')
  const darkTheme = dark && !disableDarkMode

  const setDarkTheme = (dark: boolean) => {
    storage.setItem(CORE_THEME_STORAGE_KEY, dark ? 'dark' : 'light')
    setDark(dark)
  }

  return (
    <ConfigProvider
      theme={{
        ...antdTheme,
        algorithm: darkTheme ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <InternalThemeProvider setDark={setDarkTheme} dark={dark}>
        { children }
      </InternalThemeProvider>
    </ConfigProvider>
  )
};

export default AntdThemeProvider;
