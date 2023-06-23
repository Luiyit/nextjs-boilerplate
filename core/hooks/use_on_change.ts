import { useEffect, useState } from 'react'

export default function useOnChange(callback: () => void, deps: any[], ignoreMountCall: boolean = false){
  const [mutate, setMutate] = useState('');
  const [timesCall, setTimesCall] = useState<number>(0);

  useEffect(() => {
    const depsString = JSON.stringify(deps);
    
    if( mutate !== depsString ){
      setMutate(depsString);

      if(!ignoreMountCall || ignoreMountCall && timesCall > 0){ 
        callback();
      }
      
      setTimesCall(timesCall + 1);
    }

  }, [deps, mutate, callback, timesCall, ignoreMountCall]);

};