import { useCallback, useEffect, useRef, useState } from 'react'
import type { TablePaginationConfig } from 'antd/es/table';
export type { ColumnsType } from 'antd/es/table'
import { ApiResponse } from '@services/api_client/types';
import useOnChange from '@core/hooks/use_on_change';
import { IHash } from '@core/types/util';
var changeCase = require('change-object-case');
import { useCoreConfig } from '@root/core/providers/config';

// TODO: We should move it to core!?
import NextJsClient from '@app/services/base/nextjs_client';

export type ReasonType = 'delete' | 'refresh';
export interface FetcherResponseType<DataType> {
  data: DataType[]
  loading: boolean
  pagination: TablePaginationConfig
  setPagination: (pagination: TablePaginationConfig) => void
  error: any,
  refetchData: (reason?: ReasonType) => void
}

interface FetcherPaginationConfig extends TablePaginationConfig {
  forceReFetch?: boolean
}

interface ClientResponse<DataType> {
  data: ApiResponse<DataType>
}

interface Props {
  sourceUrl: string;
  pageSize?: number;
  keepAllPages?: boolean;
  computeTotalItems?: boolean;
  params?: IHash<string | number>;
  setRef?: Function;
  logData?: boolean;
}

export interface RefType {
  refetchData: (reason?: ReasonType) => void
}

const UseListFetcher = <DataType>({ 
  sourceUrl, 
  keepAllPages, 
  computeTotalItems, 
  setRef, 
  pageSize: customSize, 
  params = {},
  logData
}: Props) => {

  const { pagination: defaultPagination } = useCoreConfig();
  
  const [data, setData] = useState<DataType[]>([]);
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<FetcherPaginationConfig>({ 
    current: 1, 
    pageSize: customSize || defaultPagination.pageSize 
  });
  const maxPage = useRef(0)
  const { current, pageSize } = pagination;
 
  useEffect(() => {
    if(logData) console.info(`${ sourceUrl }`, data, params, pagination)
  }, [sourceUrl, logData, data, params, pagination])

  const fetchData = useCallback(async (resetPages = false) => {
    const reFetch = resetPages || pagination.forceReFetch;

    if(!reFetch && !!current && current <= maxPage.current && keepAllPages) return;

    // Update max page
    maxPage.current = current || 0;
    setLoading(true);
    
    try {
      const client = new NextJsClient()
      const { data: response }: ClientResponse<DataType> = await client.get<ClientResponse<DataType>>(
        sourceUrl, 
        { ...pagination, ...params }
      );
      
      setLoading(false);
      if(keepAllPages) setData([...(data || []), ...(response.data as DataType[] || [])]);
      else setData(response.data as DataType[] || []);

      // Prevent lost params like pageSize
      const reqPagination = changeCase.camelKeys(response.pagination)
      let { total } = reqPagination || {};
      const newPagination = { ...pagination, ...reqPagination, forceReFetch: false };
      if( total && computeTotalItems) newPagination.total = total * (newPagination.pageSize || 1);
      setPagination(newPagination);

    } catch (reqError: any) {
      setError(reqError);
      setLoading(false);
    }
  }, [sourceUrl, pagination, current, params, data, keepAllPages, computeTotalItems]);

  const refetchData = useCallback((reason: ReasonType = 'delete') => {
    /**
     * TODO: handler when keepAllPages is true, 
     * Maybe the solution is disable refetchData when keepAllPages is true
     */   
    
    if(reason === 'refresh') fetchData(true);

    // Reason delete
    if(data?.length > 1) fetchData(true);
    // The page is empty because the last item was deleted
    const { current } = pagination;
    if(current && current > 1) setPagination({ 
      ...pagination, 
      current: current - 1, 
      forceReFetch: true 
    })
    
  }, [data, pagination, fetchData]);
  
  useEffect(() => {
    if(setRef) setRef({ refetchData })
  }, [setRef, refetchData, fetchData])

  /**
   * DEV NOTE: 
   * If initial pagination matches with the server one, 
   * it will not trigger the onChange event multiples times
   */
  useOnChange(() => {
    fetchData();
  }, [current, pageSize]);

  
  useOnChange(() => {
    if (current === 1) fetchData(true);
    else setPagination({ ...pagination, current: 1, forceReFetch: true });
  }, [params], true);

  return {
    data,
    refetchData,
    loading,
    pagination,
    setPagination,
    error,
  } as FetcherResponseType<DataType>
}

export default UseListFetcher
