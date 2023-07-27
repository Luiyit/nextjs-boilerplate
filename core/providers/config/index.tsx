import React, { FC, useContext, useEffect, useState } from 'react';
import { ComponentProps } from '@interfaces/util'
import type { ProviderValueI, CoreConfig } from '../../types/global_config'
import generateConfig from './helper'
import useOnChange from '@root/core/hooks/use_on_change';

export const Context = React.createContext({} as ProviderValueI);
export const useCoreConfig = () => useContext(Context);

interface Props extends ComponentProps {
  config?: CoreConfig | undefined | null;
}

const ConfigProvider: FC<Props> = ({ children, config }) => {
  console.log(generateConfig(config))
  const [state, setState] = useState<ProviderValueI>(generateConfig(config));

  useOnChange(() => {
    setState(generateConfig(config));
  }, [config], true)
  
  return (
    <Context.Provider value={state} >
      { children }
    </Context.Provider>
  )
};

export default ConfigProvider;
