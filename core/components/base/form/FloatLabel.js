import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Label = styled.label`
  font-size: ${props => (props.floating ? '10px' : '14px')};
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 12px;
  top: ${props => (props.floating ? '6px' : '12px')};
  transition: 0.2s ease all;
  color: ${props => (props.withError ? 'red' : 'gray')};
  z-index: 999;
`;

const Wrapper = styled.div`
  position: relative;
`;

const FloatLabel = ({
  children,
  label,
  floatPlaceHolder,
  floating,
  withError,
  id,
}) => {
  const [focus, setFocus] = useState(false);

  const shouldFloat = focus || floating;

  return (
    <Wrapper
      id={id}
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      {children}
      <Label floating={shouldFloat} withError={withError}>
        {`${label}${floatPlaceHolder && !shouldFloat ? floatPlaceHolder : ''}`}
      </Label>
    </Wrapper>
  );
};

FloatLabel.propTypes = {
  label: PropTypes.string,
  floating: PropTypes.bool,
  children: PropTypes.node,
  withError: PropTypes.bool,
  floatPlaceHolder: PropTypes.string,
  id: PropTypes.string,
};

export default FloatLabel;
