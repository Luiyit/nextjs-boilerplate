import React, { FC, useContext } from 'react';
import { notification } from 'antd';
type NotificationType = 'success' | 'info' | 'warning' | 'error';
import { ComponentProps } from '@interfaces/util'
import { NotificationInstance } from 'antd/es/notification/interface';

// Provider value type
export type ProviderValue = {
  notify: (type: NotificationType, message: string, description?: string) => void;
  error: (message: string, description?: string) => void;
  info: (message: string, description?: string) => void;
  warning: (message: string, description?: string) => void;
  api: NotificationInstance,
}

export const Context = React.createContext({} as ProviderValue);
export const useNotifier = () => useContext(Context);

const NotifierProvider: FC<ComponentProps> = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  function notify(type: NotificationType, message: string, description?: string){
    
    if (typeof message !== 'string') return console.error('Message must be a string')
    if (typeof description !== 'string') return console.error('Description must be a string')

    api[type]({ message, description });
  }

  function error(message: string, description?: string){
    notify('error', message, description );
  }
  
  function info(message: string, description?: string){
    notify('info', message, description );
  }
  
  function warning(message: string, description?: string){
    notify('warning', message, description );
  }

  // Provider value
  const value: ProviderValue = {
    notify,
    error,
    info,
    warning,
    api,
  };


  return (
    <Context.Provider value={value} >
      { contextHolder }
      { children }
    </Context.Provider>
  )
};

export default NotifierProvider;
