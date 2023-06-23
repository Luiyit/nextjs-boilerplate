import { MenuItemType, SubMenuType, MenuItemGroupType, MenuDividerType } from 'antd/es/menu/hooks/useItems';

export interface CoreMenuProps {
  link?: string;
  pathname?: string;
  label?: string;
  iconName?: string;
  children?: MenuType[];
}

export interface CoreMenuItemType extends MenuItemType, CoreMenuProps {}
export interface CoreSubMenuType extends SubMenuType, Omit<CoreMenuProps, 'children'> {}
export interface CoreMenuItemGroupType extends MenuItemGroupType{}
export interface CoreMenuDividerType extends MenuDividerType{}

export type MenuType = CoreMenuItemType | CoreSubMenuType | CoreMenuItemGroupType | CoreMenuDividerType;
export type MenuGeneratorType = ((session: Session["user"] | null) => MenuType[])