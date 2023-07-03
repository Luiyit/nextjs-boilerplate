import React from 'react'
import { Avatar as AntAvatar, Dropdown } from 'antd';
import { useSession } from "@core/providers/session"
import Image from 'next/image'
import Text from '@styled_comps/texts'
import { Div, Flex } from '@styled_comps/blocks'
import menu from '@config/menus/signed_in'
import { AvatarSize } from 'antd/es/avatar/SizeContext';
import { MenuType } from '@core/types/menu';

interface Props {
  disabled?: boolean,
  size?: AvatarSize,
  displayName?: boolean
  menuItems?: MenuType[]
}

const Avatar = ({ disabled, size = 35, displayName=true, menuItems }: Props) => {
  const { user } = useSession()
  if(!user) return null
  const firstLetter = user.name?.charAt(0).toUpperCase() || ''
  const AvatarContainer = menuItems?.length ? Dropdown : Div

  return (
    <AvatarContainer menu={{ items: menuItems, style: { fontSize: "14px"} }} disabled={disabled}>
      <Flex onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()} alignItems="center" >
        {displayName && <Text padding='0 5px'>{ user.name }</Text>}
        {user.image && <AntAvatar size={size} src={<Image src={user.image} alt="avatar" width={size as number} height={size as number} />} /> }
        {!user.image && <AntAvatar >{ firstLetter }</AntAvatar> }
      </Flex>
    </AvatarContainer>
  )
}

export default Avatar
