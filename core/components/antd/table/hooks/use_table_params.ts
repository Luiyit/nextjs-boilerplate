import React, { useState } from 'react'
import type { TablePaginationConfig } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
export type { ColumnsType } from 'antd/es/table'

export interface TableParamsDataType<DataType> {
  tableParams: TableParams;
  handleTableChange: (
    tablePagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<DataType> | SorterResult<DataType>[],
  ) => void 
}

export interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

interface Props {
  pagination: false | TablePaginationConfig | undefined,
  setPagination: (pagination: TablePaginationConfig) => void,
  onTableChange?: (params: TableParams) => void
}


export default function useTableParams<DataType>({ setPagination, pagination, onTableChange }: Props){
  const [tableParams, setTableParams] = useState<TableParams>({});

  function handleTableChange(
    tablePagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<DataType> | SorterResult<DataType>[],
  ){
    const tableParams = { filters, ...sorter }
    setTableParams(tableParams);
    setPagination(tablePagination);
  
    // `dataSource` is useless since `pageSize` changed. We need it!?
    // if (tablePagination.pageSize !== pagination?.pageSize) {
      // setData([]);
    // }
  
    onTableChange && onTableChange({ ...tableParams, pagination: tablePagination })
  };

  return { tableParams, handleTableChange } as TableParamsDataType<DataType>
}

