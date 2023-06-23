import React, { useState, useEffect } from 'react';
import { Menu as AntMenu } from 'antd';
import type { MenuProps as AntMenuProps } from 'antd';
import { ComponentProps } from '@interfaces/util'
import { useRouter } from 'next/router'
import { CoreSubMenuType, MenuType } from '@core/types/menu';
import { pathnameMatches } from '@core/utils/pathname';

interface MenuProps extends ComponentProps {
  items?: MenuType[],
  mode?: AntMenuProps['mode']
  theme?: AntMenuProps['theme']
}

const Menu: React.FC<MenuProps> = ({ items, mode, theme }) => {
  const [current, setCurrent] = useState('');
  const { pathname } = useRouter()
  
  useEffect(() => {      
    const newCurrent = (items || []).find(item => {
      if(!item.hasOwnProperty('children') || item.hasOwnProperty('dashed')) return false;
      const { link, pathname: itemPathname } = (item as CoreSubMenuType);
      if(!link && !itemPathname) return false;
      
      const finalPathname = itemPathname || link || '';
      return pathnameMatches(pathname, finalPathname)
      
    } );

    if(newCurrent && current != newCurrent.key) setCurrent(newCurrent.key as string);

  }, [current, items, pathname]);

  const onClick: AntMenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  // No selected Menu
  if(!items || !items.length) return null;

  return (
    <AntMenu items={items} mode={mode || "horizontal"} theme={theme} selectedKeys={[current]} onClick={onClick} />
  )
}

export default Menu;