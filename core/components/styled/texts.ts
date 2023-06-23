"use client"
import styled from 'styled-components';
import { TextI } from '@styled_comps/interfaces';
import { 
  marginStyle,
  paddingStyle,
  textFontStyle,
  borderOutlineStyle,
} from '@styled_comps/style_templates';

const Text = styled.p.attrs((props: TextI) => { return props })`
  ${textFontStyle};
  ${marginStyle};
  ${paddingStyle};
  ${borderOutlineStyle};
  ${({fontSize, lineHeight}) => 
    (lineHeight && `line-height: ${lineHeight};`) || 
    (fontSize && `line-height: calc(${fontSize} * 1.4);`) || 
    ''
  };
`;

export default Text;