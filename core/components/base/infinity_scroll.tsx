import React, { useMemo } from 'react'
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { Div } from '@styled_comps/blocks';
import { ComponentProps } from '@interfaces/util';
import { Button, TablePaginationConfig } from 'antd';
import { useCoreConfig } from '@root/core/providers/config';

interface InfinityScrollProps extends ComponentProps{
  pagination: TablePaginationConfig,
  setPagination: (pagination: TablePaginationConfig) => void,
  loading: boolean,
  showMore?: boolean,
  height?: string,
}

const InfinityScroll: React.FC<InfinityScrollProps> = ({ pagination, loading, setPagination, height, showMore, children }) => {
  const { pagination: defaultPagination } = useCoreConfig();

  const { current, pageSize, total } = useMemo(() => {
    return {
      current: pagination.current || 1,
      pageSize: pagination.pageSize || defaultPagination.pageSize,
      total: pagination.total || 0
    }
  }, [pagination, defaultPagination]);

  const itemsLoaded = current * pageSize;

  const onBottom = () => {
    if(loading) return;
    if(itemsLoaded >= total) return;

    setPagination({ ...pagination, current: current + 1 });
  }
  
  const onLoadMore = () => {
    setPagination({ ...pagination, current: current + 1 });
  }

  const scrollRef = useBottomScrollListener<HTMLDivElement>(onBottom);

  const containerStyle = !showMore && {
    height: height || 'auto',
    overflowY: 'scroll',
    overflowX: 'hidden'
  } || {};

  return (
    <Div ref={scrollRef} {...containerStyle}>
      { children }
      <Div textAlign="center" paddingT="50px">
        {showMore && <Button 
          type="primary" 
          loading={loading} 
          disabled={itemsLoaded >= (total || 0)}
          onClick={onLoadMore}
        >
          Load more
        </Button>}
      </Div>
    </Div>
  )
}

export default InfinityScroll
