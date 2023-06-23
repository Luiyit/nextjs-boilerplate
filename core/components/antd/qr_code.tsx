import React from 'react'
import { QRCode } from 'antd';
import brand from '@app/config/brand';

// TODO: Check a better way to access to @app stuff. Is it ok?

export interface QrCodeProps {
  value: string
  size?: number
  iconSize?: number
  showBrandIcon?: boolean
}
const QrCode = ({ size=300, iconSize=50, showBrandIcon, ...rest }: QrCodeProps) => {
  return (
    <QRCode
      size={size}
      iconSize={iconSize}
      icon={showBrandIcon && brand.favLogo.src || undefined}
      {...rest}
    />
  )
}

export default QrCode
