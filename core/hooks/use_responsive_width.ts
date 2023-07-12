import { useEffect, useRef, useState } from "react"
import { breakpoints as bp } from '@interfaces/util.d';
import type { BreakpointsType } from '@interfaces/util.d'

export interface ResponsiveWidthProps {
  defaultValue: string
  mode?: 'from' | 'until'
  xs?: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
  xxl?: string
}

const useResponsiveWidth = (props: ResponsiveWidthProps) => {

  const { defaultValue, mode = 'until' } = props;
  const { xs = '', sm = '', md = '', lg = '', xl = '', xxl = '' } = props;

  const [width, setWidth] = useState<string>(defaultValue);
  const widthRef = useRef(width);
  const sizes: BreakpointsType = { xs, sm, md, lg, xl, xxl };
  
  const checkMediaQuery = (where: 'min-width' | 'max-width', value: string) => {
    const query = `(${where}: ${value})`;
    const mediaQueryList = window.matchMedia(query);

    return mediaQueryList.matches;
  }

  const getWidth = () => {
    const queryKey = mode === 'from' ? 'min-width' : 'max-width';
    const keys = mode === 'until' ? Object.keys(sizes).reverse() : Object.keys(sizes);
    
    let width = defaultValue;
    keys.forEach((key) => {
      if (sizes[key]) {
        if(checkMediaQuery(queryKey, bp[key])){
          width = sizes[key];
        }
      }
    });

    return width;
  }

  const listenResizeEvent = () => {
    const newWidth = getWidth();
    if (!!newWidth && newWidth !== widthRef.current) {
      widthRef.current = newWidth;
      setWidth(newWidth);
    }
  }

  useEffect(() => {
    window.addEventListener('resize', listenResizeEvent)
    return () => window.removeEventListener('resize', listenResizeEvent)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { width }
}

export default useResponsiveWidth
