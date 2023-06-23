import React from 'react'
import Animation, { LottieComponentProps } from "lottie-react";

interface Props extends Omit<LottieComponentProps, "animationData">{
  data: any
  width?: string
  height?: string
}

const Lottie = ({ data, width, height, ...rest }: Props) => {
  return (
    <Animation 
      animationData={data} 
      style={{ width, height }} 
      { ...rest }
    />
  )
}

export default Lottie
