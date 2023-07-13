import React from 'react'
import { Avatar as AntAvatar, Dropdown } from 'antd';
import { useSession } from "@core/providers/session"
import Image from 'next/image'
import Text from '@styled_comps/texts'
import { Div, Flex } from '@styled_comps/blocks'
import { AvatarSize } from 'antd/es/avatar/SizeContext';
import { MenuType } from '@core/types/menu';
import { useCoreConfig } from '@root/core/providers/config';

interface Props {
  disabled?: boolean,
  size?: AvatarSize,
  displayName?: boolean
  menuItems?: MenuType[]
}

const Avatar = ({ disabled, size = 35, displayName=true, menuItems }: Props) => {
  const { user } = useSession()
  const { currentUser } = useCoreConfig()
  if(!user) return null

  const firstLetter = (user.name || user.email).charAt(0).toUpperCase() || ''
  const AvatarContainer = menuItems?.length ? Dropdown : Div
  const emailName = (user.email || "").split("@")[0]
  const imageUrl = currentUser.imageUrl?.(user) || user.image

  return (
    <AvatarContainer menu={{ items: menuItems, style: { fontSize: "14px"} }} disabled={disabled}>
      <Flex onClick={(e: React.MouseEvent<HTMLDivElement>) => e.preventDefault()} alignItems="center" >
        {displayName && <Text padding='0 5px'>{ user.name || emailName }</Text>}
        {imageUrl && <AntAvatar size={size} src={<Image src={imageUrl} alt="avatar" width={size as number} height={size as number} />} /> }
        {!imageUrl && <AntAvatar >{ firstLetter }</AntAvatar> }
      </Flex>
    </AvatarContainer>
  )
}

export default Avatar
