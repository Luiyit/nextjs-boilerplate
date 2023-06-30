/**
 * DEV NOTE: 
 * Watch CSS group reference here: https://www.script-tutorials.com/css-reference/
 **/

export interface BaseProps{
  ref?: React.RefObject<HTMLElement>
}

export interface MarginProps{
  margin?: string;
  marginT?: string;
  marginB?: string;
  marginL?: string;
  marginR?: string;
}

export interface PaddingProps{
  padding?: string;
  paddingT?: string;
  paddingB?: string;
  paddingL?: string;
  paddingR?: string;
}

export interface fontProps{
  fontSize?: string;
  fontWeight?: string | number | undefined;
}

export enum textAlignTypes {
  left = 'left',
  right = 'right',
  center = 'center',
  justify = 'justify',
}

export interface textProps{
  lineHeight?: string;
  textAlign?: textAlignTypes | string;
  letterSpacing?: string;
  color?: string;
}

export interface TextFontProps extends fontProps, textProps {}

export enum displayTypes {
  block = 'block',
  inline = 'inline',
  inlineBlock = 'inline-block',
  flex = 'flex',
  inlineFlex = 'inline-flex',
  grid = 'grid',
  inlineGrid = 'inline-grid'
}

export enum positionTypes {
  absolute = 'absolute',
  relative = 'relative',
  fixed = 'fixed',
  static = 'static',
  sticky = 'sticky'
}

export enum justifyTypes {
  flexStart = 'flex-start',
  flexEnd = 'flex-end',
  center = 'center',
  spaceBetween = 'space-between',
  spaceAround = 'space-around',
  spaceEvenly = 'space-evenly',
  start = 'start',
  end = 'end',
  left = 'left',
  right = 'right'
}

export enum alignTypes {
  flexStart = 'flex-start',
  flexEnd = 'flex-end',
  left = 'left',
  right = 'right',
  center = 'center',
  baseline = 'baseline',
  stretch = 'stretch',
  start = 'start',
  end = 'end',
  selfStart = 'self-start',
  selfEnd = 'self-end'  
}

export enum wrapTypes {
  wrap = 'wrap',
  nowrap = 'nowrap',
  wrapReverse = 'wrap-reverse'
}

export interface PositionProps{
  display?: string | displayTypes;
  position?: string | positionTypes;
  justify?: justifyTypes;
  align?: alignTypes;
  wrap?: wrapTypes;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  zIndex?: number;
}

export interface DimensionProps{
  width?: string | number | undefined;
  height?: string | number | undefined;
  maxWidth?: string | number | undefined;
  maxHeight?: string | number | undefined;
  minWidth?: string | number | undefined;
  minHeight?: string | number | undefined;
}

export interface BorderOutlineProps{
  border?: string;
  borderB?: string;
  borderRadius?: string;
  borderTopLeftRadius?: string;
  borderTopRightRadius?: string;
  borderBottomLeftRadius?: string;
  borderBottomRightRadius?: string;
}

export interface BoxProps{
  overflow?: string;
  overflowX?: string;
  overflowY?: string;
}

export enum backgroundRepeatTypes {
  repeat = 'repeat',
  repeatX = 'repeat-x',
  repeatY = 'repeat-y',
  noRepeat = 'no-repeat'
}

export enum backgroundPositionTypes {
  left = 'left',
  right = 'right',
  center = 'center',
  top = 'top',
  bottom = 'bottom'
}

export enum backgroundSizeTypes {
  cover = 'cover',
  contain = 'contain',
}

export interface BackgroundProps{
  backgroundColor?: string | undefined;
  backgroundImage?: string | undefined;
  backgroundRepeat?: backgroundRepeatTypes;
  backgroundPosition?: backgroundPositionTypes;
  backgroundSize?: backgroundSizeTypes | string | undefined;
}

export enum flexBasisTypes {
  unset = 'unset',
  inherit = 'inherit',
  initial = 'initial',
  revert = 'revert',
  revertLayer = 'revert-layer',
  auto = 'auto',
  content = 'content',
  maxContent = 'max-content',
  minContent = 'min-content',
  fixContent = 'fix-content',
}

export interface TransformProps{
  transform?: string | undefined;
  transformOrigin?: string | undefined;
  transformStyle?: string | undefined;
  transformBox?: string | undefined;
  perspective?: string | undefined;
  perspectiveOrigin?: string | undefined;
  backfaceVisibility?: string | undefined;
}

// https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout#gutters
export interface gridProps{
  
  /* [grid] */
  columnGap?: string | undefined;
  rowGap?: string | undefined;
  gap?: string | undefined;
  gutter?: number[] | string[] | undefined;
  // Define how many rows and columns an element should span across
  gridTemplateColumns?: string | undefined;
  gridTemplateRows?: string | undefined;
  
  /* [item] */
  // Define the size of the rows and columns in a grid
  gridColumn?: string | undefined;
  gridRow?: string | undefined;


  grid?: string | undefined;
  gridAutoColumns?: string | undefined;
  gridAutoRows?: string | undefined;
  gridTemplateAreas?: string | undefined;
  gridTemplate?: string | undefined;
  gridAutoFlow?: string | undefined;
  gridArea?: string | undefined;
}

export interface OtherProps{
  flex?: string | undefined;
  flexDirection?: string | undefined;
  flexWrap?: string | undefined;
  flexShrink?: string | undefined;
  justifyContent?: string | undefined;  
  flexBasis?: flexBasisTypes | string | undefined;  
  alignItems?: string | undefined;  
}

// HTML Text Element Interface
export interface TextI extends 
  BaseProps, 
  MarginProps, 
  PaddingProps, 
  BorderOutlineProps,
  DimensionProps,
  TextFontProps {};

// export interface TextHTMLI extends 
//   React.HTMLAttributes<HTMLParagraphElement>, 
//   TextI {};

// React.HTMLAttributes<HTMLDivElement>,
export interface DivI extends 
  BaseProps, 
  MarginProps, 
  PaddingProps, 
  TextFontProps,
  PositionProps,
  DimensionProps,
  BorderOutlineProps,
  BoxProps,
  OtherProps,
  BackgroundProps,
  TransformProps {};

  export interface GridI extends 
    BaseProps,
    DimensionProps,
    OtherProps,
    gridProps {};

  // React.ButtonHTMLAttributes<HTMLButtonElement>,
export interface ButtonI extends 
  BaseProps, 
  MarginProps, 
  PaddingProps, 
  TextFontProps,
  PositionProps,
  DimensionProps,
  BorderOutlineProps {
    size?: 'small' | 'medium' | 'large';
  };

import { InputNumberProps } from 'antd';
export interface InputNumberI extends 
  InputNumberProps,
  BaseProps, 
  MarginProps, 
  PaddingProps, 
  TextFontProps,
  PositionProps,
  BorderOutlineProps,
  BackgroundProps {};