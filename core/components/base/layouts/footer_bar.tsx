import React from 'react';
import { Layout, Tooltip } from 'antd';
import { Flex } from '@styled_comps/blocks'
import { useTheme } from '@core/providers/theme';
import Text from '@styled_comps/texts';
import brand from '@app/config/brand';
import { MailOutlined } from '@ant-design/icons';
import GhostBlock from '@styled_comps/ghost_block';
import lc from '@app/config/layout';

const FooterBar = () => {
  const { token } = useTheme()
  return (
    <Flex alignItems='center' justifyContent="space-between" height={lc.footer.heightInPx}>
      <Text padding="5px 0">
        © Copyright 2023 {brand.name} All rights reserved.
      </Text>
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
    </Flex>
  )
}

export default FooterBar
