import React from 'react'
export type { ColumnsType } from 'antd/es/table'
import UseListFetcher, { FetcherResponseType } from '@core/hooks/use_list_fetcher'
import useOnChange from '@core/hooks/use_on_change';
export type { FetcherResponseType };

interface ListFetcherProps {
  sourceUrl: string;
  keepAllPages?: boolean;
  children: Function;
  onError?: (error: any) => void;
}

function ListFetcher<DataType>(props: ListFetcherProps){
  const { sourceUrl, children } = props
  const fetcher = UseListFetcher<DataType>({ sourceUrl, keepAllPages: props.keepAllPages })
  
  useOnChange(() => {
    if(fetcher.error && props.onError) props.onError(fetcher.error)
  }, [fetcher.error])

  return (
    <>
      { children(fetcher) }
    </>
  )
}

export default ListFetcher
