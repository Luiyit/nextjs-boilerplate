// TODO: Fix style using antd theme
import { InputNumber as AntInputNumber } from 'antd';
import styled from 'styled-components';
import { InputNumberI } from '@styled_comps/interfaces';
import invert from 'invert-color';

import { 
  marginStyle,
  paddingStyle,
  textFontStyle,
  positionStyle,
  dimensionStyle,
  borderOutlineStyle,
  backgroundStyle,
} from '@styled_comps/style_templates';

// fontSize: props.fontSize || '16px',
const InputNumber = styled(AntInputNumber).attrs((props: InputNumberI) => ({
  ...props,
  borderRadius: props.borderRadius || '50px',
  height: props.height || '46px',
  padding: props.padding || '0 20px',
  backgroundColor: props.backgroundColor || '#172A3E',
  fontWeight: props.fontWeight || 600,
}))`
  ${positionStyle}
  ${dimensionStyle}
  ${marginStyle}
  ${borderOutlineStyle}
  
  .ant-input-number-input{
    ${paddingStyle}
    ${textFontStyle}
    height: ${props => props.height};
  }
  .ant-input-number-group-addon{
    ${paddingStyle}
    ${textFontStyle}
    ${backgroundStyle}
    ${({ backgroundColor }) => backgroundColor && `color: ${invert(backgroundColor)};` || ''}
    border-top-right-radius: ${props => props.borderRadius};
    border-bottom-right-radius: ${props => props.borderRadius};
  }
`;

export { InputNumber };