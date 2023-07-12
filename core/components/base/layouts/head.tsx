import React from 'react'
import { useCoreConfig } from '@root/core/providers/config';
import NextHead from 'next/head'

const Head = () => {
  const { brand } = useCoreConfig()

  return (
    <NextHead>
      {brand.name && <title>{ brand.name }</title>}
      {brand.description && <meta name="description" content={ brand.description } />}
      {brand.faviconLinkPath && <link rel="icon" href={brand.faviconLinkPath} />}
      {brand.webmanifestLinkPath && <link rel="manifest" href={brand.webmanifestLinkPath} />}
      {brand.keywords && <meta name="keywords" content={brand.keywords.join(", ")} /> }
      
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </NextHead>
  )
}

export default Head
