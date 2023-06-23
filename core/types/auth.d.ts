import { ClientSafeProvider, LiteralUnion } from "next-auth/react"
import { BuiltInProviderType } from 'next-auth/providers';

export type { ClientSafeProvider as AuthProvider, BuiltInProviderType }
export type AuthProvidersType = Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>