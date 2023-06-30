import React, { FC, useContext, useState } from 'react';

import { ComponentProps } from '@interfaces/util'
import { ConfigProvider, GlobalToken } from 'antd'
import antdTheme from '@app/config/antd_theme'
import { theme } from 'antd'
const { defaultAlgorithm, darkAlgorithm, useToken } = theme;

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
  const [dark, setDark] = useState(true)
  const darkTheme = dark && !disableDarkMode

  return (
    <ConfigProvider
      theme={{
        ...antdTheme,
        algorithm: darkTheme ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <InternalThemeProvider setDark={setDark} dark={dark}>
        { children }
      </InternalThemeProvider>
    </ConfigProvider>
  )
};

export default AntdThemeProvider;
