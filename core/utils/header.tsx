import lc from '@app/config/layout';
import brand from '@app/config/brand';
import React from 'react';
import { LayoutType } from '../types/util';

function getLogo(layout: LayoutType, dark: boolean): React.ReactNode {
  if(brand.renderLogo)
    return brand.renderLogo(layout, dark, { className: "main-logo" })
  
  return null
}

function getFavicon(layout: LayoutType, dark: boolean): React.ReactNode {
  if(brand.renderFav)
    return brand.renderFav(layout, dark, { className: "main-fav-logo", width: lc.header.height - 10 })
  
  return null
}

function getBrandAssets(layout: LayoutType, dark: boolean): {logo: React.ReactNode, favIcon: React.ReactNode } {
  return {
    logo: getLogo(layout, dark),
    favIcon: getFavicon(layout, dark)
  }
}

export { getLogo, getFavicon, getBrandAssets }