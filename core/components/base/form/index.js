/* eslint-disable import/no-cycle */

import styled from 'styled-components';

export { default as AutoComplete } from './AutoComplete';
export { default as AutocompleteController } from './AutoComplete/controller';

export { default as Calendar } from './Calendar';
export { default as CalendarController } from './Calendar/controller';

export { default as DateCalendarPicker } from './DateCalendarPicker';
export { default as CalendarPickerController } from './DateCalendarPicker/controller';

export { default as FloatInput } from './FloatInput';
export { default as FloatInputController } from './FloatInput/controller';

export { default as FloatSelect } from './FloatSelect';
export { default as FloatSelectController } from './FloatSelect/controller';

export { default as FloatAutoComplete } from './FloatAutoComplete';
export { default as FloatAutoCompleteController } from './FloatAutoComplete/controller';

export { default as Input } from './Input';
export { default as InputController } from './Input/controller';

export { default as MultiLineInput } from './MultilineInput';
export { default as MultiLineInputController } from './MultilineInput/controller';

export { default as Radio } from './Radio';
export { default as RadioController } from './Radio/controller';

export { default as Select } from './Select';
export { default as SelectController } from './Select/controller';

export { default as CountrySelect } from './country_select';
export { default as CountrySelectController } from './country_select/controller';

export { default as StateSelect } from './state_select';
export { default as StateSelectController } from './state_select/controller';

export { default as CitySelect } from './city_select';
export { default as CitySelectController } from './city_select/controller';

export { default as TagSelector } from './TagSelector';
export { default as TagSelectorController } from './TagSelector/controller';

export { default as TextArea } from './TextArea';
export { default as TextAreaController } from './TextArea/controller';

export { default as Checkbox } from './Checkbox';
export { default as CheckboxController } from './Checkbox/controller';

export { default as FloatLabel } from './FloatLabel';
export { default as Label } from './Label';

// Typescript
// export { default as FileUpload } from './upload';
// export { default as FileUploadController } from './upload/controller';

export const Form = styled.form`
  // Overriding ant styles
  &&& {}
`;

export default Form;