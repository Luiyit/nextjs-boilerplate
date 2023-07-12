import type { ProviderValueI, CoreConfig, PaginationI, BrandI, LayoutI, HeaderConfigI, FooterBarI, SidebarConfigI, AuthConfigI, OptionalLayoutI } from '../../types/global_config'
import { numberToPixels } from '@core/utils/css_units'

export default function generateConfig(baseConfig: CoreConfig | undefined | null): ProviderValueI {

  const { pagination, brand, siderLayout, mainLayout, auth } = baseConfig || {}
  const { sidebar, ...restSiderLayout } = siderLayout || {};

  return {
    pagination: getPaginationConfig(pagination),
    brand: getBrandConfig(brand),
    siderLayout: {
      ...getLayoutConfig(restSiderLayout as OptionalLayoutI ),
      sidebar: getSiderConfig(sidebar),
      template: 'full-sider',
    },
    mainLayout: getLayoutConfig(mainLayout),
    auth: getAuthConfig(auth),
  }
}

function getPaginationConfig(pagination: Partial<PaginationI> | undefined): PaginationI {
  return {
    current: 1,
    pageSize: 12,
    ...pagination,
  } as PaginationI
}

function getBrandConfig(brand: BrandI | undefined): BrandI {
  return {
    ...brand,
  } as BrandI
}

/** CONSTANTS */
const headerHeight: number = 64
const footerHeight: number = 60
const sidebarWidth: number = 300
const sidebarCollapsedWidth: number = 80

function getLayoutConfig(layout: OptionalLayoutI | undefined): LayoutI {
  const { header, footerBar, disableDarkMode } = layout || {}

  return {
    header: getHeaderConfig(header),
    footerBar: getFooterConfig(footerBar),
    disableDarkMode: !!disableDarkMode,
  } as LayoutI
}

function getSiderConfig(sidebar: Partial<SidebarConfigI> | undefined): SidebarConfigI {
  return {
    width: sidebarWidth,
    widthInPx: numberToPixels(sidebarWidth),
    collapsedWidth: sidebarCollapsedWidth,
    collapsedWidthInPx: numberToPixels(sidebarCollapsedWidth),
    showLogo: true,
    height: headerHeight,
    heightInPx: numberToPixels(headerHeight),
    ...sidebar,
  } as SidebarConfigI
}

function getHeaderConfig(header: Partial<HeaderConfigI> | undefined): HeaderConfigI {
  const { fixed, ...restHeader } = header || {}
  return {
    showLogo: true,
    height: headerHeight,
    heightInPx: numberToPixels(headerHeight),
    useContainer: true,
    useContainerOnSider: false,
    disableDarkMode: true,
    fixed,
    ...restHeader,
  } as HeaderConfigI
}

function getFooterConfig(footerBar: Partial<FooterBarI> | undefined): FooterBarI {

  return {
    enabled: true,
    useContainer: true,
    height: footerHeight,
    heightInPx: numberToPixels(footerHeight),
    ...footerBar,
  } as FooterBarI
}

function getAuthConfig(auth: AuthConfigI | undefined): AuthConfigI {
  const { forgotPasswordForm, signUpForm, enabledSignUp, ...restAuth } = auth || {}
  const forms = { forgotPasswordForm, signUpForm }

  return {
    signInAfterCredentialsSignUp: false,
    signInText: 'Sign in',
    enabledSignUp: enabledSignUp !== undefined ? enabledSignUp && !!signUpForm : !!signUpForm,
    ...forms,
    ...restAuth,
  } as AuthConfigI
}