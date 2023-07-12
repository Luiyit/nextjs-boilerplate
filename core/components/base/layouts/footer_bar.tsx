import React from 'react';
import { Tooltip } from 'antd';
import { Flex } from '@styled_comps/blocks'
import Text from '@styled_comps/texts';
import { MailOutlined } from '@ant-design/icons';
import GhostBlock from '@styled_comps/ghost_block';
import { useCoreConfig } from '@core/providers/config'

const FooterBar = ({ height }: { height: string }) => {
  const { brand } = useCoreConfig()

  return (
    <Flex alignItems='center' justifyContent="space-between" height={height}>
      <Text padding="5px 0">
        © Copyright 2023 {brand.name || ''} All rights reserved.
      </Text>
      {brand.contactEmail && (
        <Text padding="5px 0">
          <GhostBlock displayUntil='md'>
            <Tooltip placement="top" title={brand.contactEmail}>
              <MailOutlined />
            </Tooltip >
          </GhostBlock>

          <GhostBlock displayFrom='md'>
            { brand.contactEmail }
          </GhostBlock>
        </Text>
      )}
    </Flex>
  )
}

export default FooterBar
