import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Text from '@styled_comps/texts';
import { breakpoints } from '@interfaces/util.d';
import { capitalize } from '@utils/text';

import { types } from '../propTypes';

const tagSize = {
  small: { font: '14px', padding: '0px 8px', width: '72px', height: '32px' },
  medium: { font: '14px', padding: '0px 14px', width: '164px', height: '48px' },
  large: { font: '20px', padding: '0px 20px', width: '220px', height: '64px' },
};

const Tags = styled.div`
  padding-top: 12px;
  display: flex;
  flex-wrap: wrap;
  border-radius: 12px;
  transition: 0.3s all;
  overflow: hidden;
  justify-content: space-between;
  gap: 20px;
  @media ${breakpoints.md} {
    justify-content: flex-start;
  }
`;

const Tag = styled.div`
  color: #4c4c4c;
  border-radius: 100px;
  text-align: center;
  transition: all 0.2s;
  background-color: #f6f6f6;
  min-width: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${props =>
    props.selected &&
    css`
      background-color: black;
      color: white;
    `}

  ${props =>
    props.size &&
    css`
      min-width: ${tagSize[props.size].width};
      min-height: ${tagSize[props.size].height};
      padding: ${tagSize[props.size].padding};
    `}

  &:hover {
    cursor: pointer;
  }
`;

const TagSelector = ({ options, inputData, type, size }) => {
  const {
    field: { onChange, value },
  } = inputData;

  return (
    <>
      <Tags>
        {options.map(option => {
          const isSelected = (() => {
            if (!value && value !== false) return false;
            if (type === 'single') return value === option.value;
            return value.find(opt => opt === option.value);
          })();

          return (
            <Tag
              key={option.value}
              onClick={() => onChange(option.value)}
              selected={isSelected}
              size={size}
            >
              <Text fontSize={tagSize[size].font}>
                {capitalize(option.label)}
              </Text>
            </Tag>
          );
        })}
      </Tags>
    </>
  );
};

TagSelector.propTypes = {
  inputData: types.inputData(PropTypes.any),
  options: PropTypes.array,
  type: PropTypes.oneOf(['multiple', 'single']).isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

TagSelector.defaultProps = {
  size: 'small',
};

export default TagSelector;
