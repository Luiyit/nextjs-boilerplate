import React from 'react';

export interface IHash<T> {
  [index: string]: T | T[] | undefined;
}

export type ComponentProps = {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
}

export type SubmitEvent = React.BaseSyntheticEvent<object, any, any>