"use client"
import * as propsTypes from '@styled_comps/interfaces';

const marginStyle = (props: propsTypes.MarginProps) => (`
  ${props.margin && `margin: ${props.margin};` || ''}
  ${props.marginB && `margin-bottom: ${props.marginB};` || ''} 
  ${props.marginT && `margin-top: ${props.marginT};` || ''} 
  ${props.marginL && `margin-left: ${props.marginL};` || ''} 
  ${props.marginR && `margin-right: ${props.marginR};` || ''} 
`);

const paddingStyle = (props: propsTypes.PaddingProps) => (`
  ${props.padding && `padding: ${props.padding};` || ''}
  ${props.paddingB && `padding-bottom: ${props.paddingB};` || ''} 
  ${props.paddingT && `padding-top: ${props.paddingT};` || ''} 
  ${props.paddingL && `padding-left: ${props.paddingL};` || ''} 
  ${props.paddingR && `padding-right: ${props.paddingR};` || ''}
`);

const textFontStyle = (props: propsTypes.TextFontProps) => (`
  ${props.fontSize && `font-size: ${props.fontSize};` || ''} 
  ${props.fontWeight && `font-weight: ${props.fontWeight};` || ''} 
${props.color && `color: ${props.color};` || ''} 
  ${props.textAlign && `text-align: ${props.textAlign};` || ''} 
  ${props.lineHeight && `line-height: ${props.lineHeight};` || ''}
  ${props.letterSpacing && `letter-spacing: ${props.letterSpacing};` || ''} 
`)

const positionStyle = (props: propsTypes.PositionProps) => (`
  ${props.display && `display: ${props.display};` || ''} 
  ${props.position && `position: ${props.position};` || ''} 
  ${props.wrap && `flex-wrap: ${props.wrap};` || ''} 
  ${props.top && `top: ${props.top};` || ''} 
  ${props.right && `right: ${props.right};` || ''} 
  ${props.bottom && `bottom: ${props.bottom};` || ''} 
  ${props.left && `left: ${props.left};` || ''} 
  ${props.zIndex && `z-index: ${props.zIndex};` || ''} 
  ${props.justify && `justify-content: ${props.justify};` || ''}
  ${props.align && `align-items: ${props.align};` || ''} 
`)

const dimensionStyle = (props: propsTypes.DimensionProps) => (`
  ${props.width && `width: ${props.width};` || ''}
  ${props.height && `height: ${props.height};` || ''}
  ${props.minHeight && `min-height: ${props.minHeight};` || ''}
  ${props.maxHeight && `max-height: ${props.maxHeight};` || ''}
  ${props.minWidth && `min-width: ${props.minWidth};` || ''}
  ${props.maxWidth && `max-width: ${props.maxWidth};` || ''}
`)

const borderOutlineStyle = (props: propsTypes.BorderOutlineProps) => (`
  ${props.border && `border: ${props.border};` || ''}
  ${props.borderB && `border-bottom: ${props.borderB};` || ''}
  ${props.borderRadius && `border-radius: ${props.borderRadius};` || ''}
  ${props.borderTopLeftRadius && `border-top-left-radius: ${props.borderTopLeftRadius};` || ''}
  ${props.borderTopRightRadius && `border-top-right-radius: ${props.borderTopRightRadius};` || ''}
  ${props.borderBottomLeftRadius && `border-bottom-left-radius: ${props.borderBottomLeftRadius};` || ''}
  ${props.borderBottomRightRadius && `border-bottom-right-radius: ${props.borderBottomRightRadius};` || ''}
`)
const boxStyle = (props: propsTypes.BoxProps) => (`
  ${props.overflow && `overflow: ${props.overflow};` || ''}
  ${props.overflowX && `overflow-x: ${props.overflowX};` || ''}
  ${props.overflowY && `overflow-y: ${props.overflowY};` || ''}
`)

const backgroundStyle = (props: propsTypes.BackgroundProps) => (`
  ${props.backgroundColor && `background-color: ${props.backgroundColor};` || ''}
  ${props.backgroundImage && `background-image: ${props.backgroundImage};` || ''}
  ${props.backgroundRepeat && `background-repeat: ${props.backgroundRepeat};` || ''}
  ${props.backgroundPosition && `background-position: ${props.backgroundPosition};` || ''}
  ${props.backgroundSize && `background-size: ${props.backgroundSize};` || ''}
`)

const otherStyle = (props: propsTypes.OtherProps) => (`
  ${props.flex && `flex: ${props.flex};` || ''}
  ${props.flexDirection && `flex-direction: ${props.flexDirection};` || ''}
  ${props.flexWrap && `flex-wrap: ${props.flexWrap};` || ''}
  ${props.flexShrink && `flex-shrink: ${props.flexShrink};` || ''}
  ${props.justifyContent && `justify-content: ${props.justifyContent};` || ''}
  ${props.flexBasis && `flex-basis: ${props.flexBasis};` || ''}
  ${props.alignItems && `align-items: ${props.alignItems};` || ''} 
`)

const gridStyle = (props: propsTypes.gridProps) => (`
  ${props.gridTemplateColumns && `grid-template-columns: ${props.gridTemplateColumns};` || ''}
  ${props.gridTemplateRows && `grid-template-rows: ${props.gridTemplateRows};` || ''}
  ${props.gridTemplateAreas && `grid-template-areas: ${props.gridTemplateAreas};` || '' }
  ${props.gridTemplate && `grid-template: ${props.gridTemplate};` || ''}
  ${props.gridAutoColumns && `grid-auto-columns: ${props.gridAutoColumns};` || ''}
  ${props.gridAutoRows && `grid-auto-rows: ${props.gridAutoRows};` || ''}
  ${props.gridAutoFlow && `grid-auto-flow: ${props.gridAutoFlow};` || '' }
  ${props.grid && `grid: ${props.grid};` || ''}
  ${props.columnGap && `column-gap: ${props.columnGap};` || '' }
  ${props.rowGap && `row-gap: ${props.rowGap};` || '' }
  ${props.gap && `gap: ${props.gap};` || '' }
  ${props.gridColumn && `grid-column: ${props.gridColumn};` || '' }
  ${props.gridRow && `grid-row: ${props.gridRow};` || '' }
  ${props.gridArea && `grid-area: ${props.gridArea};` || '' }
`)

const transformStyle = (props: propsTypes.TransformProps) => (`
  ${props.transform && `transform: ${props.transform};` || ''}
  ${props.transformOrigin && `transform-origin: ${props.transformOrigin};` || ''}
  ${props.transformStyle && `transform-style: ${props.transformStyle};` || ''}
  ${props.perspective && `perspective: ${props.perspective};` || ''}
  ${props.perspectiveOrigin && `perspective-origin: ${props.perspectiveOrigin};` || ''}
  ${props.backfaceVisibility && `backface-visibility: ${props.backfaceVisibility};` || ''}
`)

export { 
  textFontStyle,
  marginStyle,
  paddingStyle,
  positionStyle,
  dimensionStyle,
  borderOutlineStyle,
  boxStyle,
  backgroundStyle,
  otherStyle,
  gridStyle,
  transformStyle
};