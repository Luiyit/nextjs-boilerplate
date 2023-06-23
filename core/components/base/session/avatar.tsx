import React from 'react'
import { Avatar as AntAvatar } from 'antd';
import Image from 'next/image'
import Text from '@styled_comps/texts'
import { Flex } from '@styled_comps/blocks'
import { AvatarSize } from 'antd/es/avatar/SizeContext';


interface Props {
  name: string,
  image?: string,
  size?: AvatarSize,
  displayName?: boolean
}

const Avatar = ({ name, image, size = 35, displayName=true }: Props) => {
  const firstLetter = name?.charAt(0).toUpperCase() || ''

  return (
    <Flex alignItems="center" >
      {displayName && <Text padding='0 5px'>{ name }</Text>}
      {image && <AntAvatar size={size} src={<Image src={image} alt="avatar" width={size as number} height={size as number} />} /> }
      {!image && firstLetter && <AntAvatar size={size}>{ firstLetter }</AntAvatar> }
    </Flex>
  )
}

export default Avatar
