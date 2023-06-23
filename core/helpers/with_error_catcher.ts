import type { NextApiResponse } from 'next'
import type { ApiError } from '@services/api_client/types.d'
import { AxiosError } from 'axios'

type ParamsType = {
  res: NextApiResponse<ApiError | Error>, 
  callback: Function,
}

type ErrorWithMessage = {
  message: string
}

/**
 * Check if the error has a message property
 * The return is boolean, but also describe if the param error has a message property
 * In that way the parent function can use the error as a ErrorWithMessage type
 * Can do something like this: error.message
 * 
 * @param error Unknown error
 * @returns True if the error has a message property
 */
function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  )
}

function errorMessage(error: unknown): string {
  if (isErrorWithMessage(error)) return error.message
  return 'Internal Server Error'
}

function withError(error: unknown): ApiError {
  if (error instanceof AxiosError) return withAxiosError(error)

  return {
    error,
    status: 500,
    message: errorMessage(error)
  } as ApiError
}

function withAxiosError(axiosError: AxiosError): ApiError{
  const { response } = axiosError;
  const { data, status, statusText } = response || {};
  
  return {
    error: (data as { error: any })?.error,
    status: status || 500,
    message: statusText || errorMessage(axiosError),
  }
}

export default async function withErrorCatcher({ res, callback }: ParamsType) {
  try {
    await callback()    
  } catch (_) {
    const error = withError(_);
    res.status(error.status).json(error) 
  }
}