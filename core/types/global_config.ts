import { LayoutType } from '@interfaces/util';
import { Session } from 'next-auth';

export interface PaginationI {
  current: number,
  pageSize: number,
}

export interface CurrentUserI {
  imageUrl?: (user: Session["user"]) => string | undefined,
}

export interface BrandI {
  name?: string,
  shortName?: string,
  contactEmail?: string,
  contactPhone?: string,
  description?: string,
  keywords?: string[],
  renderLogo?: (layout: LayoutType, isDark: boolean, extra: any) => JSX.Element,
  renderFav?: (layout: LayoutType, isDark: boolean, extra: any) => JSX.Element,
  faviconLinkPath?: string,
  webmanifestLinkPath?: string,
}

export interface FixedHeaderConfigI {
  bgColor: string,
  baseOpacity: number,
  textColor: string,
  opacityOnScroll: number,
  zIndex: number,
}

export interface HeaderConfigI {
  showLogo: boolean,
  height: number,
  heightInPx: string,
  useContainer: boolean,
  // Dev Note: Won't have effect if you are using fixed header
  disableDarkMode: boolean,  
  fixed?: FixedHeaderConfigI,
}

export interface FooterBarI {
  enabled: boolean,
  useContainer: boolean,
  height: number,
  heightInPx: string,
}

export interface LayoutI {
  header: HeaderConfigI,
  footerBar: FooterBarI,
  disableDarkMode: boolean,
}

export interface SidebarConfigI {
  width: number,
  widthInPx: string,
  collapsedWidth: number,
  collapsedWidthInPx: string,
  showLogo: boolean,
  logoHeight: number,
  logoHeightInPx: string,
}

export type StateFnCallback = (...params: any[]) => Promise<any>
export type AuthFormI = React.ComponentType<{ 
  onSuccess?: StateFnCallback | undefined
  onError?: StateFnCallback | undefined
}>

export interface AuthConfigI {
  signInAfterCredentialsSignUp?: boolean
  signInText?: string
  signUpText?: string
  enabledSignUp?: boolean
  forgotPasswordForm?: AuthFormI
  signUpForm?: AuthFormI,
}

export type SiderLayoutI = LayoutI & { sidebar: SidebarConfigI } & { template: 'full-vav' | 'full-sider' }

/**
 * Provider value interface
 * The provider will define all the values that will be available to the app
 */
export interface ProviderValueI {
  pagination: PaginationI
  brand: BrandI
  siderLayout: SiderLayoutI
  mainLayout: LayoutI
  auth: AuthConfigI
  currentUser: CurrentUserI
}

export type OptionalLayoutI = {
  header?: Partial<HeaderConfigI>
  footerBar?: Partial<FooterBarI>
  disableDarkMode?: Partial<boolean>
}

export type OptionalSiderLayoutI = OptionalLayoutI & {
  sidebar?: SidebarConfigI
}

/**
 * Core config interface
 * Define the same interface than provider, but all the values are optional
 */
export interface CoreConfig {
  pagination?: Partial<PaginationI>
  brand?: Partial<BrandI>
  siderLayout?: OptionalSiderLayoutI
  mainLayout?: OptionalLayoutI
  auth?: Partial<AuthConfigI>
  currentUser?: Partial<CurrentUserI>
}