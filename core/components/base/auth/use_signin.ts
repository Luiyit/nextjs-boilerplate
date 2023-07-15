import { useCallback } from 'react'
import { SignInResponse, useSession } from "next-auth/react"
import { useNotifier } from '@core/providers/notifier';
import { useRouter } from 'next/router';

// TODO: Generic messages from the app, not fixed here!
const useSignin = (prams: { redirectTo?: string } = {}) => {
  const { redirectTo } = prams
  const session = useSession()
  const { error, info } = useNotifier();
  const router = useRouter()

  const onError = useCallback(async (response: SignInResponse | undefined) => {
    error(response?.error || "Error", "Something went wrong, please try again")
  }, [error])

  const onSuccess = useCallback(async (response: SignInResponse | undefined, redirect: boolean = true) => {
    info("Welcome back", "You have successfully signed in")
    redirect && router.push(redirectTo || response?.url || "/")
  }, [redirectTo, info, router])

  const alreadySignedIn = useCallback(async (redirect: boolean = true) => {
    info("Logged in", "You already have an active session")
    redirect && router.push(redirectTo || "/")
  }, [redirectTo, info, router])

  return {
    session,
    onError,
    onSuccess,
    alreadySignedIn
  }

}

export default useSignin
