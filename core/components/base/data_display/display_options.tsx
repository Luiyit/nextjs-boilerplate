import { AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { Radio } from 'antd'
import React, { useState } from 'react'
import { ComponentProps } from "@interfaces/util.d";

export type ModeType = 'table' | 'grid';

interface DisplayOptionsProps extends ComponentProps {
  mode: ModeType;
  onChange: (mode: ModeType) => void;
}

const DisplayOptions: React.FC<DisplayOptionsProps> = (props) => {
  return (
    <>
      <Radio.Group value={ props.mode } onChange={(e) => props.onChange(e.target.value)}>
        <Radio.Button value="table"><UnorderedListOutlined /></Radio.Button>
        <Radio.Button value="grid"><AppstoreOutlined /></Radio.Button>
      </Radio.Group>
    </>
  )
}

export default DisplayOptions
