import React from 'react'
import Table, { TableProps } from '.';
import type { TablePaginationConfig } from 'antd/es/table';
import { FilterValue } from 'antd/es/table/interface';
export type { ColumnsType } from 'antd/es/table'
import UseListFetcher from '@core/hooks/use_list_fetcher'
import useTableParams from './hooks/use_table_params';
import useOnChange from '@core/hooks/use_on_change';
import { IHash } from '@core/types/util';

export type { RefType, ReasonType } from '@core/hooks/use_list_fetcher'

export interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

interface RemoteTableProps<DataType> extends TableProps<DataType>{
  sourceUrl: string;
  computeTotalItems?: boolean;
  onTableChange?: (params: TableParams) => void;
  onError?: (error: any) => void;
  setRef?: Function;
  fetchParams?: IHash<string | number>;
  logData?: boolean;
  pageSize?: number;
}

function RemoteTable<DataType extends object>(props: RemoteTableProps<DataType>){

  const { sourceUrl, onTableChange, computeTotalItems, setRef, fetchParams, pageSize, logData, ...rest } = props
  const { data: dataSource, loading, pagination, setPagination, error } = UseListFetcher<DataType>({
    sourceUrl, 
    computeTotalItems,
    setRef,
    params: fetchParams,
    pageSize,
    logData
  })
  
  const { tableParams, handleTableChange } = useTableParams<DataType>({ pagination, setPagination, onTableChange })
  
  useOnChange(() => {
    if(error && props.onError) props.onError(error)
  }, [error])
  
  return (
    <>
      <Table<DataType>
        onChange={handleTableChange}
        {...{dataSource, loading, pagination, ...rest }}
      />
    </>
  )
}

export default RemoteTable
