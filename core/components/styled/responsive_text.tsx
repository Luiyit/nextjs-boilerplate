import React from 'react'
import BaseText from '@styled_comps/texts'
import styled from 'styled-components'
import { breakpoints as bp } from '@app/config/layout'
import { ComponentProps } from '@core/types/util'
import { TextI } from '@styled_comps/interfaces';

export interface ResponsiveTextI extends TextI {
  xs?: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
  xxl?: string
}

const Text = styled(BaseText).attrs((props: ResponsiveTextI) => props)`
  font-size: ${({ xs }) => xs};

  @media (min-width: ${bp.xs}) {
    ${({ xs }) => xs && `font-size: ${xs};`}
  }
  
  @media (min-width: ${bp.sm}) {
    ${({ sm }) => sm && `font-size: ${sm};`}
  }
  
  @media (min-width: ${bp.md}) {
    ${({ md }) => md && `font-size: ${md};`}
  }
  
  @media (min-width: ${bp.lg}) {
    ${({ lg }) => lg && `font-size: ${lg};`}
  }
  
  @media (min-width: ${bp.xl}) {
    ${({ xl }) => xl && `font-size: ${xl};`}
  }
  
  @media (min-width: ${bp.xxl}) {
    ${({ xxl }) => xxl && `font-size: ${xxl};`}
  }
`
interface Props extends Omit<ResponsiveTextI, "as">, ComponentProps {
  as?: string
}

const ResponsiveText: React.FC<Props> = ({ children, as, ...rest}) => {
  return (
    <Text {...rest}>
      { children }
    </Text>
  )
}


export default ResponsiveText
