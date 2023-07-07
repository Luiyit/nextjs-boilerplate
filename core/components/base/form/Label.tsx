import React from 'react';
import Text from '@styled_comps/texts';
import { Flex } from '@styled_comps/blocks';

interface LabelProps {
  name: string,
  label?: string,
  children?: React.ReactNode,
  isRequired?: boolean,
  renderPopover?: () => React.ReactNode;
}

export default function Label({ name, label, children, isRequired, renderPopover }: LabelProps) {
  return (
    <Flex {...{ as: "label", htmlFor: name }} marginB="5px" alignItems="center" justifyContent="space-between" paddingR="5px">
      <Text as="span" fontWeight="600" >
        {label || children}
        {isRequired && <Text as="span" paddingL="3px">*</Text>}
      </Text>
      {renderPopover && renderPopover() }
    </Flex>
  );
}