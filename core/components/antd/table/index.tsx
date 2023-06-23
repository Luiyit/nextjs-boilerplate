import React from 'react'
import { Table as AntTable } from 'antd';
export type { ColumnsType } from 'antd/es/table'
import { TableProps as AntdTableProps } from 'antd/es/table/InternalTable';

export interface TableProps<DataType> extends AntdTableProps<DataType> {
  selectionType?: 'checkbox' | 'radio' | undefined
  onSelect?: (selectedRowKeys: React.Key[], selectedRows: object[]) => void
  getCheckboxProps?: (record: object) => object
}

function Table<DataType extends object>(props: TableProps<DataType>){

  const { selectionType, onSelect, getCheckboxProps, ...rest } = props
  const selectionMethods = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: object[]) => {
      if (onSelect) onSelect(selectedRowKeys, selectedRows)
    },
    getCheckboxProps: (record: object) => {
      if(getCheckboxProps) return getCheckboxProps(record)
      return { disabled: false }
    },
  };
  let rowSelection = selectionType ? { type: selectionType, ...selectionMethods } : undefined;
  
  return (
    <AntTable<DataType>
      rowSelection={rowSelection}
      { ...rest }
    />
  )
}

export default Table
