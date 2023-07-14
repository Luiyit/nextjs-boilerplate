import axios, { AxiosInstance, AxiosRequestConfig, AxiosHeaders } from 'axios';
var deserializer = require('jsonapi-serializer').Deserializer;
var changeCase = require('change-object-case');
import  { AxiosError } from 'axios';
import { Session } from 'next-auth';
import { IHash } from './request_service';
import { JWT } from 'next-auth/jwt';
import FormData from 'form-data'

export interface ApiClientProps{
	apiUrl: string;
  deserializeResponse: boolean;
	applyBodySnakeKeys: boolean;
	returnResponseHeaders?: boolean;
};

export interface ReqProps{
	session?: Session | null;
  query?: IHash<string>;
	token?: JWT | null
};

interface ApiResponse {
	data: any;
	status: number;
}

interface ApiError {
	response?: ApiResponse;
	message: string;
	status: number;
	
}

export default class Axios {
	axios: AxiosInstance;
	config: ApiClientProps;
  reqProps: ReqProps;

	constructor(config: ApiClientProps, reqProps?: ReqProps){
		this.config = config;
		this.axios = this._getAxiosInstance();
		this.reqProps = reqProps || {};
	}	
	
	_getAxiosInstance(): AxiosInstance {

		let axiosInstance = axios.create({
			baseURL: this.config.apiUrl,
		});

		// Attach interceptors
		if (this.config.applyBodySnakeKeys){
			Axios.requestInterceptor(axiosInstance);
		}

		if (this.config.deserializeResponse){
			Axios.responseInterceptor(axiosInstance, this.config);
		}

		return axiosInstance;
	}

	async generateConfig(partialConfig: AxiosRequestConfig): Promise<AxiosRequestConfig> {
		const headers = await this.getHeaders();
		return {
			headers,
			...partialConfig,
		}
	}

	getQueryString(params: any = {}): string {
		const snakeParams = changeCase.snakeKeys(params || {}, { recursive: true, arrayRecursive: true })
		const searchParams = new URLSearchParams(snakeParams);
		return searchParams.toString();
	}

	async get<DataType>(url: string, params: any = {}, config: AxiosRequestConfig = {}): Promise<DataType>{
		const query = this.getQueryString(params);
		const getConfig = await this.generateConfig(config);
		return await this.call<DataType>(this.axios.get, [`${url}?${query}`, getConfig]);
	}

	async post<DataType>(url: string, params: any = {}, config: AxiosRequestConfig = {}): Promise<DataType>{
		const postConfig = await this.generateConfig(config);
		return await this.call<DataType>(this.axios.post, [url, params, postConfig]);
	}

	async put<DataType>(url: string, params: any = {}, config: AxiosRequestConfig = {}): Promise<DataType>{
		const putConfig = await this.generateConfig(config);
		return await this.call<DataType>(this.axios.put, [url, params, putConfig]);
	}
	
	async patch<DataType>(url: string, params: any = {}, config: AxiosRequestConfig = {}): Promise<DataType>{
		const putConfig = await this.generateConfig(config);
		return await this.call<DataType>(this.axios.patch, [url, params, putConfig]);
	}

	async delete<DataType>(url: string, params: any = {}, config: AxiosRequestConfig = {}): Promise<DataType>{
		const query = this.getQueryString(params);
		const deleteConfig = await this.generateConfig(config);
		return await this.call<DataType>(this.axios.delete, [`${url}?${query}`, deleteConfig]);
	}

	call<DataType>(callback: Function, params: any): Promise<DataType>{
		return new Promise((resolve, reject) => {
						
			callback(...params).then((response: ApiResponse) => {
				resolve(response as DataType);
			}).catch((error: ApiError) => {
				
				if (error instanceof AxiosError){ 
					reject(error);

				// TODO: Check this validation
				// error.response has an aborted attribute. Check it!
				}else{

					/**
					 * DEV NOTE
					 * When the request is cancelled, we get an error with cancel object
					 * Cancel => { message }
					 * In this case we don't want to reject the request
					 */
					if(error?.message !== "Component unmounted"){
						reject(error);
					}
				}
			});
		});
	}

	static responseInterceptor(axiosInstance: AxiosInstance, config: ApiClientProps) 
	{
		axiosInstance.interceptors.response.use(async function (response: any) 
		{
			const { data, headers } = response;			
			if(!data || !data.data) {
				return data;
			}
			
			const deserialized = await new deserializer({
				id: 'id',
				keyForAttribute: 'camelCase',
				typeAsAttribute: false,
			}).deserialize(data);

			if(config.returnResponseHeaders)
				return [deserialized, headers]
			
			return deserialized;
		});

		return axiosInstance;
	}
  
	/**
   * Inject interceptor to prettify the response
   * https://axios-http.com/docs/interceptors
   *
   * @param {Axios} axiosInstance
   *
   * @returns axiosInstance
   */
	static requestInterceptor(axiosInstance: AxiosInstance) 
	{
		axiosInstance.interceptors.request.use(function (config: any) 
		{
			if(['get', 'delete'].includes(config.method)) return {
				...config,
				params: changeCase.snakeKeys(config.params || {}, { recursive: true, arrayRecursive: true })
			};

			const isFormData = config.data instanceof FormData;
			if(['post', 'put', 'patch'].includes(config.method) && !isFormData) return {
				...config,
				data: changeCase.snakeKeys(config.data || {}, { recursive: true, arrayRecursive: true })
			};

			return config;
		});

		return axiosInstance;
	}

	/**
   * [Overwrite]
	 * Generate headers for this particular client
   * 
   * @returns Axios Headers class instance
   */
  async getHeaders(): Promise<AxiosHeaders>{
    return new AxiosHeaders();
  }
}

const getCancelToken = () => ( axios.CancelToken.source() )
export { getCancelToken }