import React from 'react';

export interface IHash<T> {
  [index: string]: T | T[] | undefined;
}

export type ComponentProps = {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
}

export type LayoutType = 'sider' | 'main' | 'auth'

export type SubmitEvent = React.BaseSyntheticEvent<object, any, any>

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type BreakpointsType = {[key in Breakpoint]: string} & {[key: string]: string}


const breakpoints: BreakpointsType = {
  xs: '480px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px',
};

export { breakpoints }