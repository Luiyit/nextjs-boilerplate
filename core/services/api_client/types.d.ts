import { AuthResponseError } from '@core/helpers/with_server_auth_session';

export interface PaginationType {
  current: number;
  next?: number;
  pageSize: number;
  total?: number;
}

export interface PageableType {
  links?: PaginationType;
}

// TODO: Rename it?? Maybe IndexApiResponse | PaginatedResponse
export interface ApiResponse<DataType> {
  data: DataType[];
  pagination?: PaginationType;
}

export interface ApiError {
  error?: any,
  status: number,
  message: string,
}

export type NextApiHandlerType<DataType> = ApiResponse<DataType> | ApiError | AuthResponseError;