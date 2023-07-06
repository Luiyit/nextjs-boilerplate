import { IHash } from '@core/types/util.d'
import { PageableType, PaginationType } from '@services/api_client/types.d'
import Axios, { ReqProps } from './axios';
import { NextApiRequest } from 'next';
import { AxiosRequestConfig } from 'axios';
import { ApiResponse } from "@core/services/api_client/types";

import { defaultPagination } from '@config/api'
import ExternalClient from '@app/services/base/external_client';

// Export used types
export type { IHash, PaginationType, NextApiRequest, AxiosRequestConfig }

export default class RequestService<DataType extends PageableType> {

  protected client: Axios;

  // req: GetServerSidePropsContext["req"] | NextRequest | NextApiRequest
  constructor(reqProps: ReqProps) {
    this.client = new ExternalClient(undefined, reqProps);
  }

  getReqProps(): ReqProps {
    return this.client.reqProps
  }

  /**
   * Return a list of DataType
   * Auth is added automatically by the client (ExternalClient)
   * 
   * @param url API url
   * @param params Query string parameters
   * @param config Axios request configuration
   * 
   * @returns Array of DataType
   */
  protected async _index(url: string, params?: IHash<string | number>, config: AxiosRequestConfig = {}): Promise<ApiResponse<DataType>> {
    
    const list = await this.client.get<DataType[]>(url, params, config);
    const [ first ] = list;

    return { 
      data: list, 
      pagination: first?.links
    };
  }
  
  protected async _show(url: string, params?: IHash<string | number>, config: AxiosRequestConfig = {}): Promise<DataType> {
    return await this.client.get<DataType>(url, params, config);
  }

  // TODO: Sometimes the Response dataTYpe is different than payload
  // Fix: pass another generic to the function _create<payload_type> or set like any
  protected async _create(url: string, payload: any, config: AxiosRequestConfig = {}): Promise<DataType> {
    return await this.client.post<DataType>(url, payload, config);
  }
 
  // TODO: Sometimes the Response dataTYpe is different than payload
  // Fix: pass another generic to the function _create<payload_type> or set like any
  protected async _update(url: string, payload: any, config: AxiosRequestConfig = {}): Promise<DataType> {
    return await this.client.put<DataType>(url, payload, config);
  }
  
  protected async _delete(url: string, config: AxiosRequestConfig = {}): Promise<DataType> {
    return await this.client.delete<DataType>(url, config);
  }

  /**
   * Return a default pagination or a pagination object from query
   * 
   * @param query request query object
   * @returns PaginationType
   */
  static getPagination(query?: IHash<string> | undefined): PaginationType {
    const { current, page_size: pageSize } = query || {};

    return {
      current: Number(current) || defaultPagination?.current || 1,
      pageSize: Number(pageSize) || defaultPagination?.pageSize || 1,
    } as PaginationType;
  }
}