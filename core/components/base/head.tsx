import React from 'react'
import NextHead from 'next/head'
import { ComponentProps } from '@interfaces/util'
import brand from '@app/config/brand'

interface HeadProps extends ComponentProps {
  title: string,
  description?: string,
  viewport?: string,
}

const Head: React.FC<HeadProps> = ({ children, title, description, viewport }) => {
  const pageTitle = `${brand.name} ${title ? ` | ${title}`: ''}`
  return (
    <NextHead>
      <title>{ pageTitle }</title>
      {description && <meta name="description" content={ description } />}
      <meta name="viewport" content={viewport || "width=device-width, initial-scale=1"} />
      <link rel="icon" href="/favicon.ico" />
      { children }
    </NextHead>
  )
}

export default Head
