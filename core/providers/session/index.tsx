import React, { FC, useContext } from 'react';

import { SessionProvider } from "next-auth/react"
import { ComponentProps } from '@interfaces/util'
import { Session } from 'next-auth';
import { useSession as NextAuthUseSession, signIn, signOut } from "next-auth/react"
import { CurrencyType, OrganizationType } from '@app/services/types';

interface ProviderProps extends ComponentProps {
  session: Session | null;
}

// Provider value type
export type ProviderValue = {
  user: Session["user"] | null;
  organization?: OrganizationType | null;
  signIn: typeof signIn;
  signOut: typeof signOut;
  status: "authenticated" | "unauthenticated" | "loading";
  updateSession: (data?: any) => void;
  currency: CurrencyType;
}

export const Context = React.createContext({} as ProviderValue);
export const useSession = () => useContext(Context);

const InternalSessionProvider = ({ children }: ComponentProps ) => {
  const session = NextAuthUseSession();
  const { data } = session;
  const { user } = data || {};
  const { organization } = user || {};
  const currency = organization?.settings?.currency || 'usd';

  // Provider value
  const value: ProviderValue = {
    user: user || null,
    organization: organization || null,
    status: session.status,
    updateSession: session.update,
    signIn,
    signOut,
    currency,
  };

  return (
    <Context.Provider value={value} >
      { children }
    </Context.Provider>
  );
};

const NextAuthSessionProvider: FC<ProviderProps> = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <InternalSessionProvider>
        { children }
      </InternalSessionProvider>
    </SessionProvider>
  )
};

export default NextAuthSessionProvider;
