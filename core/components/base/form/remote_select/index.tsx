import React, { useMemo, useRef, useState } from 'react';
import { Select, Spin } from 'antd';
import type { SelectProps } from 'antd/es/select';
import debounce from 'lodash/debounce';
import Label from '../Label';
import Error from '../Error';
import type { ControllerProps, Type } from '../types';

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
}

export interface OptionType { 
  key?: string; 
  label: React.ReactNode; 
  value: string | number;
  disabled?: boolean;
  title?: string;
}

export interface FieldProps extends ControllerProps, Omit<SelectProps<any, OptionType>, "defaultValue"> {
  debounceTimeout?: number;
  fetchOptions: (search: string) => Promise<OptionType[]>;
  type?: Type;
}

const RemoteSelect = ({ fieldData, rules, fetchOptions, debounceTimeout = 800, ...props }: FieldProps ) => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<any>([]);
  const fetchRef = useRef(0);
  const fetchOptionsRef = useRef(fetchOptions);
  
  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      fetchOptionsRef.current(value).then((newOptions) => {

        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout]);

  const { field, fieldState } = fieldData;
  const { label, style, ...rest } = props;


  return (
    <>
      {label && (
        <Label label={label} name={field.name} isRequired={rules?.hasOwnProperty('required')}/>
      )}
      <Select
        labelInValue
        removeIcon
        allowClear
        showSearch
        onSearch={debounceFetcher}
        notFoundContent={ fetching ? <Spin size="small" /> : null }
        options={options}
        style={{ width: '100%', ...style }}

        // DEV NOTE: filterOption prevents ant filter/remove my options using local search
        filterOption={() => true}
        {...field} 
        {...rest}
      />
      <Error message={fieldState?.error?.message} />
    </>
  )
}

export default RemoteSelect;