import React from 'react'
import { QRCode } from 'antd';
import brand from '@app/config/brand';

// TODO: Check a better way to access to @app stuff. Is it ok?

export interface QrCodeProps {
  value: string
  size?: number
  iconSize?: number
  icon?: string
}
const QrCode = ({ size=300, iconSize=50, icon, ...rest }: QrCodeProps) => {
  return (
    <QRCode
      size={size}
      iconSize={iconSize}
      icon={icon || undefined}
      {...rest}
    />
  )
}

export default QrCode
