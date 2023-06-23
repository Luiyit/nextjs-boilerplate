import { useEffect, useState } from 'react'

function isEmpty(value: any){
  return (
    value === undefined || 
    value === null || 
    value === '' || 
    value === false || 
    (Array.isArray(value) && value.length === 0) || 
    (typeof value === 'object' && Object.keys(value).length === 0)
  )
}

function isNotEmpty(value: any){
  return !isEmpty(value)
}

export default function useOneEffect(callback: () => void, deps: any[]){
  const [timesCall, setTimesCall] = useState<number>(0);
  
  useEffect(() => {
    if(timesCall >= 1 || !deps.every(isNotEmpty)) return;
      
    callback();
    setTimesCall(timesCall + 1);    

  }, [deps, callback, timesCall]);

};