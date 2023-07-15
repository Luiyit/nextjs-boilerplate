import React from 'react'
import { useCoreConfig } from '@root/core/providers/config';
import NextHead from 'next/head'

const Head = ({ title }: { title?: string }) => {
  const { brand } = useCoreConfig()
  const titleParts = [brand.name || '', title].filter(Boolean)
  const pageTitle = titleParts.join(' | ')

  return (
    <NextHead>
      {pageTitle && <title>{ pageTitle }</title>}
      {brand.description && <meta name="description" content={ brand.description } />}
      {brand.faviconLinkPath && <link rel="icon" href={brand.faviconLinkPath} />}
      {brand.webmanifestLinkPath && <link rel="manifest" href={brand.webmanifestLinkPath} />}
      {brand.keywords && <meta name="keywords" content={brand.keywords.join(", ")} /> }
      
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </NextHead>
  )
}

export default Head
