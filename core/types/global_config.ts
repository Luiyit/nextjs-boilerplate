import { LayoutType } from '@interfaces/util';

export interface PaginationI {
  current: number,
  pageSize: number,
}

export interface BrandI {
  name?: string,
  shortName?: string,
  contactEmail?: string,
  description?: string,
  keywords?: string[],
  renderLogo?: (layout: LayoutType, isDark: boolean, extra: any) => JSX.Element,
  renderFav?: (layout: LayoutType, isDark: boolean, extra: any) => JSX.Element,
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

export type StateFnCallback = () => Promise<any>
export type AuthForm = React.ReactElement<{ 
  onSuccess?: StateFnCallback 
  onError?: StateFnCallback 
}>

export interface AuthConfigI {
  enablePasswordConfirmation?: boolean
  enablePasswordReset?: boolean
  forgotPasswordForm?: AuthForm
  signupForm?: AuthForm,
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
}