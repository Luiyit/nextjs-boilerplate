import type { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from '@api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"
import withErrorCatcher from './with_error_catcher'
import { getToken } from "next-auth/jwt"

export type AuthResponseError = {
  message: string
}

type ParamsType = {
  req: NextApiRequest, 
  res: NextApiResponse<AuthResponseError>, 
  callback: Function,
  useErrorCatcher?: boolean
}

export default async function withServerAuthSession({req, res, callback, useErrorCatcher}: ParamsType) {
  const token = await getToken({ req })
  const session = await getServerSession(req, res, authOptions)
  
  if(!session) {
    res.status(401).json({ message: "Unauthorized" })
    return
  }

  const caller = async () => {
    await callback(req, res, session, token)
  }

  if (useErrorCatcher) await withErrorCatcher({ res, callback: caller });
  else await caller();
}