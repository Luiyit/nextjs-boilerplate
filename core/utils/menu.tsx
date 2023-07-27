import { MenuType, MenuGeneratorType, CoreSubMenuType } from "@core/types/menu";
import { Session } from 'next-auth';
import Link from 'next/link'
import * as antdIcons from '@ant-design/icons';
import { IHash } from "@core/types/util";
import { LayoutType } from '@interfaces/util';

const getIcon = (icon: string | undefined | null) => {

  // Antd icon logic - https://ant.design/components/icon
  if(!icon) return null;
  const AntdIcon = (antdIcons as IHash<any>)[icon];
  if(AntdIcon) return <AntdIcon />

  // Fontawesome icon logic - Maybe later
};

function transformItems(menu: MenuType[]): MenuType[] {
  return menu.map( function(item: MenuType): MenuType {
    
    // Excluding MenuDividerType - all have children at least as optional
    if(item.hasOwnProperty('children') || !item.hasOwnProperty('dashed')){
      const { children, label, link, icon, iconName, ...rest } = item as CoreSubMenuType;
      return {
        ...rest,
        link,
        label: link ? <Link href={link}>{label}</Link> : label,
        icon: icon || getIcon(iconName),
        children: children && transformItems(children as MenuType[])
      }
    }

    return item;
  });
}

function generateMenu(menu: MenuType[] | MenuGeneratorType | undefined, user: Session["user"] | null, layout: LayoutType): MenuType[]{

  if(!menu) return [];

  let menuItems: MenuType[] = []
  if(typeof menu === 'function') menuItems = menu(user, layout);
  else menuItems = menu;
  
  return transformItems(menuItems);
}

export { generateMenu, getIcon, transformItems }