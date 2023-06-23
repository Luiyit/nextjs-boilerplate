import React from 'react'
import Table, { TableProps } from '.';
import type { TablePaginationConfig } from 'antd/es/table';
import { FilterValue } from 'antd/es/table/interface';
export type { ColumnsType } from 'antd/es/table'
import useTableParams from './hooks/use_table_params'

export interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

interface PaginatedTableProps<DataType> extends TableProps<DataType>{
  dataSource: DataType[],
  loading: boolean,
  pagination: TablePaginationConfig,
  setPagination: (pagination: TablePaginationConfig) => void,
  onTableChange?: (params: TableParams) => void
}

function PaginatedTable<DataType extends object>(props: PaginatedTableProps<DataType>){

  const { dataSource, loading, pagination, setPagination, onTableChange, ...rest } = props
  const { tableParams, handleTableChange } = useTableParams<DataType>({ pagination, setPagination, onTableChange })
  
  return (
    <>
      <Table<DataType>
        onChange={handleTableChange}
        {...{dataSource, loading, pagination, ...rest }}
      />
    </>
  )
}

export default PaginatedTable
