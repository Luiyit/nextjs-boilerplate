import { IHash } from '@core/types/util.d'
import { PageableType, PaginationType } from '@services/api_client/types.d'
import Axios, { ReqProps } from './axios';
import { NextApiRequest } from 'next';
import { AxiosRequestConfig } from 'axios';
import { ApiResponse } from "@core/services/api_client/types";

// TODO: fix this imports
import ExternalClient from '@app/services/base/external_client';
import config from '@app/config/core/index'

// Export used types
export type { IHash, PaginationType, NextApiRequest, AxiosRequestConfig }

// TODO: Fix me! Not all services need that interface extends of PageableType
// DONE!!??
export default class RequestService<DataType extends PageableType | undefined> {

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
  
  protected async _delete(url: string, params?: IHash<string | number>, config: AxiosRequestConfig = {}): Promise<DataType> {
    return await this.client.delete<DataType>(url, params, config);
  }
  
  protected async _patch(url: string, payload: any, config: AxiosRequestConfig = {}): Promise<DataType> {
    return await this.client.patch<DataType>(url, payload, config);
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
      current: Number(current) || config.pagination?.current  || 1,
      pageSize: Number(pageSize) || config.pagination?.pageSize || 12,
    } as PaginationType;
  }
}