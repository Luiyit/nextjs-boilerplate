import React from 'react';
import PropTypes from 'prop-types';
import Text from '@styled_comps/texts';

const Error = ({ message }) => {
  if (!message) return null;

  return (
    <Text color="#cd201f" fontSize="14px" paddingT="4px">
      {message}
    </Text>
  );
};

Error.propTypes = {
  message: PropTypes.string,
};

export default Error;
