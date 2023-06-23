import React from 'react';
import PropTypes from 'prop-types';
import { Div } from '@styled_comps/blocks';

export default function ControllerWrapper({ children, ...rest }) {
  return <Div {...rest}>{children}</Div>;
}

ControllerWrapper.propTypes = {
  children: PropTypes.element,
  marginB: PropTypes.string,
};

ControllerWrapper.defaultProps = {
  marginB: '20px',
};
