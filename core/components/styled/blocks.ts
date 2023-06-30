import styled from 'styled-components';
import { DivI, GridI } from '@styled_comps/interfaces';

import { 
  marginStyle,
  paddingStyle,
  textFontStyle,
  positionStyle,
  dimensionStyle,
  borderOutlineStyle,
  boxStyle,
  backgroundStyle,
  otherStyle,
  gridStyle,
  transformStyle,
} from '@styled_comps/style_templates';
import { isNumber } from '@core/utils/number';

const Div = styled.div.attrs((props: DivI) => (props))`
  ${positionStyle}
  ${marginStyle}
  ${paddingStyle}
  ${textFontStyle}
  ${dimensionStyle}
  ${borderOutlineStyle}
  ${boxStyle}
  ${backgroundStyle}
  ${otherStyle}
  ${transformStyle}
`;

const Flex = styled(Div).attrs((props: DivI) => ({...props, display: props.display || 'flex'}))``;

const Grid = styled.div.attrs((props: GridI) => {
  const { gutter, ...rest } = props;
  let [rowGap, columnGap] = gutter || [null, null]

  if(rowGap && isNumber(rowGap) ) rowGap = `${rowGap}px`
  if(columnGap && isNumber(columnGap) ) columnGap = `${columnGap}px`

  return {
    ...rest,
    rowGap: rowGap || props.rowGap || props.gap,
    columnGap: columnGap || props.columnGap || props.gap,
  };
})`
  display: grid;
  ${dimensionStyle}
  ${otherStyle}
  ${gridStyle}
`

const GridBox = styled(Div).attrs((props: GridI) => (props))`

  ${gridStyle}
`;

export { Div, Flex, Grid, GridBox };