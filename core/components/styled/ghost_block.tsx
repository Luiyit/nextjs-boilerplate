import { ComponentProps } from '@core/types/util';
import React, { useEffect, useState } from 'react'
import { breakpoints as bp } from '@interfaces/util.d';

interface Props extends ComponentProps {
  displayFrom?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  displayUntil?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
}

const GhostBlock = ({ children, displayFrom, displayUntil }: Props) => {

  const checkVisibility = () => {
    let query = '';
    if (displayFrom) query = `(min-width: ${bp[displayFrom]})`;
    if (displayUntil){
      if (query) query += ' and ';
      query += `(max-width: calc(${bp[displayUntil]} - 1px))`;
    }

    const mediaQueryList = window.matchMedia(query);
    return mediaQueryList.matches;
  }

  const listenResizeEvent = () => {
    const shouldRender = checkVisibility();
    if (shouldRender !== opacityRef.current) {
      opacityRef.current = shouldRender;
      setShouldRender(shouldRender);
    }
  }

  const [shouldRender, setShouldRender] = useState<boolean>(checkVisibility())
  const opacityRef = React.useRef(shouldRender);

  useEffect(() => {
    window.addEventListener('resize', listenResizeEvent)
    return () => window.removeEventListener('resize', listenResizeEvent)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if(!shouldRender) return null;
  
  return (<>{ children }</>)
}

export default GhostBlock
