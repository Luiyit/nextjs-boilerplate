import PropTypes from 'prop-types';

export const types = {
  inputData: (type = PropTypes.any) =>
    PropTypes.shape({
      field: PropTypes.shape({
        name: PropTypes.string,
        value: type,
        onChange: PropTypes.func.isRequired,
      }),
      fieldState: PropTypes.object,
    }),
};
