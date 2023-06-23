import { useFormContext } from 'react-hook-form';

const FormContext = props => {
  const { control } = useFormContext();
  const {
    name,
    rules,
    defaultValue,
    shouldUnregister,
    label,
    ...inputProps
  } = props;

  const controllerProps = {
    name,
    rules,
    defaultValue,
    shouldUnregister,
    control,
  };

  return {
    labelProps: { name, label },
    controllerProps,
    inputProps,
  };
};

export default FormContext;
