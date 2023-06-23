import React, { FC, useContext, useState } from 'react';

import { ComponentProps } from '@interfaces/util'
import { ConfigProvider } from 'antd'
import antdTheme from '@app/config/antd_theme'
import { theme } from 'antd'
const { defaultAlgorithm, darkAlgorithm } = theme;

// Provider value type
export type ProviderValue = {
  dark: boolean;
  setDark: (dark: boolean) => void;
}

export const Context = React.createContext({} as ProviderValue);
export const useTheme = () => useContext(Context);

interface Props extends ComponentProps {
  dark: boolean;
  setDark: (dark: boolean) => void;
}

const InternalThemeProvider = ({ children, dark, setDark }: Props ) => {
  
  // Provider value
  const value: ProviderValue = {
    dark,
    setDark,
  };

  return (
    <Context.Provider value={value} >
      { children }
    </Context.Provider>
  );
};

const AntdThemeProvider: FC<ComponentProps> = ({ children }) => {
  const [dark, setDark] = useState(true);

  return (
    <ConfigProvider
      theme={{
        ...antdTheme,
        algorithm: dark ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <InternalThemeProvider setDark={setDark} dark={dark}>
        { children }
      </InternalThemeProvider>
    </ConfigProvider>
  )
};

export default AntdThemeProvider;
