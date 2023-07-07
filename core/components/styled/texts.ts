"use client"
import styled, { ThemedStyledFunctionBase, DefaultTheme  } from 'styled-components';
import { TextI } from '@styled_comps/interfaces';
import { 
  marginStyle,
  paddingStyle,
  textFontStyle,
  borderOutlineStyle,
  dimensionStyle,
} from '@styled_comps/style_templates';

// https://stackoverflow.com/questions/61979237/styled-components-attrs-w-typescript
const Text = styled.p.attrs<TextI>((props) => { return props })<TextI>`
  ${textFontStyle};
  ${marginStyle};
  ${paddingStyle};
  ${borderOutlineStyle};
  ${dimensionStyle};
  ${({fontSize, lineHeight}) => 
    (lineHeight && `line-height: ${lineHeight};`) || 
    (fontSize && `line-height: calc(${fontSize} * 1.4);`) || 
    ''
  };
`;

export default Text;