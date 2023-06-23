import { OrganizationType, UserType } from "@app/services/types"
import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"
import { RoleType } from "@app_types/app.d"

declare module "next-auth" {

  type Credentials = Record<"username" | "password" | "email", string> | undefined

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken: string | undefined
    provider: string | undefined
    user: {
      organization: OrganizationType | undefined
      role: RoleType
      nickname: string | null
      id: string
      name: string;
      email: string;
      avatarImage?: string;
      gender?: string 
      country?: string 
      state?: string 
      city?: string 
      organization?: OrganizationType
      
    } & DefaultSession["user"]
  }

  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface Token {
    accessToken: string
  }

  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {}

  /**
   * Usually contains information about the provider being used
   * and also extends `TokenSet`, which is different tokens returned by OAuth Providers.
   */
  interface Account {}

  /** The OAuth profile returned from your provider */
  interface Profile {
    email_verified: boolean
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    accessToken?: string
    role: string
    userData: UserType
  }
}