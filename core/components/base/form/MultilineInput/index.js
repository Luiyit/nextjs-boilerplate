import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import Error from '../Error';
import { types } from '../propTypes';
import { Flex } from '@styled_comps/blocks';

const { TextArea } = Input;

export default function InputControl({ inputData, inputStyle, ...rest }) {
  const { field, fieldState } = inputData;

  return (
    <Flex fd="column">
      <TextArea {...field} {...rest} style={inputStyle} />
      <Error message={fieldState?.error?.message} />
    </Flex>
  );
}

InputControl.propTypes = {
  inputData: types.inputData(PropTypes.string),
  inputStyle: PropTypes.object,
};

InputControl.defaultProps = {
  inputStyle: {},
};
