import React from 'react';
import { LayoutType } from '../types/util';
import { ProviderValueI, HeaderConfigI } from '../types/global_config';

// TODO: Move to another place!!?
function getHeaderConfig(layout: LayoutType, config: ProviderValueI): HeaderConfigI {
  if(layout === 'main')
    return config.mainLayout.header
  
  return config.siderLayout.header  
}

function getLogo(layout: LayoutType, dark: boolean, config: ProviderValueI): React.ReactNode {
  if(config.brand.renderLogo)
    return config.brand.renderLogo(layout, dark, { className: "main-logo" })
  
  return null
}

function getFavicon(layout: LayoutType, dark: boolean, config: ProviderValueI): React.ReactNode {
  if(config.brand.renderFav){
    const headerConfig = getHeaderConfig(layout, config)
    return config.brand.renderFav(layout, dark, { className: "main-fav-logo", width: headerConfig.height - 10 })
  }
  
  return null
}

function getBrandAssets(layout: LayoutType, dark: boolean, config: ProviderValueI): {logo: React.ReactNode, favIcon: React.ReactNode } {
  return {
    logo: getLogo(layout, dark, config),
    favIcon: getFavicon(layout, dark, config)
  }
}

export { getLogo, getFavicon, getBrandAssets }