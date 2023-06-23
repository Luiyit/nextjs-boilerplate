import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import styled, { css } from 'styled-components';
import TagSelector from '.';
import { breakpoints } from '@app/config/layout';
import Text from '@styled_comps/texts';
import { UpOutlined, DownOutlined } from '@ant-design/icons';

const Wrapper = styled.div`
  border: ${props => (props.bordered ? '1px solid #bdbdbd' : 'none')};
  padding: ${props => (props.bordered ? '24px 12px' : 0)};

  @media ${breakpoints.md} {
    padding: ${props => (props.bordered ? '24px' : 0)};
  }

  &&& {
    border-radius: 12px;
    flex-basis: 100%;
  }
`;

const SelectorWrapper = styled.div`
  ${({ expandable, isExpanded }) =>
    expandable &&
    css`
      max-height: ${isExpanded ? '1000px' : 0};
      overflow: ${isExpanded ? 'normal' : 'hidden'};
    `}
`;

const Header = styled.div`
  display: flex;
  align-items: baseline;
  cursor: pointer;
  justify-content: space-between;
`;

const TagSelectorController = ({
  rules,
  name,
  defaultValue,
  title,
  bordered,
  expandable,
  expanded,
  onChange,
  isNested,
  canUnselect,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(expandable && expanded);
  const { control, setValue, getValues } = useFormContext();
  const toggleExpansion = () => expandable && setIsExpanded(!isExpanded);

  const handleChange = opt => {
    const value = getValues(name);
    if (props.type === 'multiple') updateMultiple(opt, value);
    else updateSingle(opt, value);
    onChange(opt);
  };

  const updateMultiple = (opt, value) => {
    if (value.includes(opt)) {
      setValue(
        name,
        value.filter(o => o !== opt),
      );
    } else {
      setValue(name, [...value, opt]);
    }
  };

  const updateSingle = (opt, value) => {
    if (value === opt && canUnselect) setValue(name, undefined);
    else setValue(name, opt);
  };

  return (
    <Wrapper bordered={bordered}>
      {title && (
        <Header onClick={toggleExpansion}>
          <Text fontSize={props.headerSize} fontWeight="bold">
            {title}
          </Text>
          {expandable && (isExpanded ? <UpOutlined /> : <DownOutlined />)}
        </Header>
      )}

      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        render={inputData => {
          const { field, ...rest } = inputData;
          return (
            <SelectorWrapper expandable={expandable} isExpanded={isExpanded}>
              <TagSelector
                inputData={{
                  field: { ...field, onChange: handleChange },
                  ...rest,
                }}
                {...props}
              />
            </SelectorWrapper>
          );
        }}
      />
    </Wrapper>
  );
};

TagSelectorController.propTypes = {
  rules: PropTypes.object,
  name: PropTypes.string,
  defaultValue: PropTypes.any,
  title: PropTypes.string,
  expandable: PropTypes.bool,
  expanded: PropTypes.bool,
  bordered: PropTypes.bool,
  type: PropTypes.oneOf(['multiple', 'single']).isRequired,
  onChange: PropTypes.func,
  headerSize: PropTypes.string,
  canUnselect: PropTypes.bool,
};

TagSelectorController.defaultProps = {
  expandable: true,
  expanded: false,
  bordered: true,
  onChange: () => {},
  headerSize: '18px',
  canUnselect: true,
};

export default TagSelectorController;
