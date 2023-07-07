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

const Div = styled.div.attrs<DivI>(props => (props))<DivI>`
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

const Flex = styled(Div).attrs<DivI>(props => ({...props, display: props.display || 'flex'}))<DivI>``;

const Grid = styled.div.attrs<GridI>(props => {
  const { gutter, ...rest } = props;
  let [rowGap, columnGap] = gutter || [null, null]

  if(rowGap && isNumber(rowGap) ) rowGap = `${rowGap}px`
  if(columnGap && isNumber(columnGap) ) columnGap = `${columnGap}px`

  return {
    ...rest,
    rowGap: rowGap || props.rowGap || props.gap,
    columnGap: columnGap || props.columnGap || props.gap,
  };
})<GridI>`
  display: grid;
  ${dimensionStyle}
  ${otherStyle}
  ${gridStyle}
`

const GridBox = styled(Div).attrs<GridI>(props => (props))<GridI>`
  ${gridStyle}
`;

export { Div, Flex, Grid, GridBox };