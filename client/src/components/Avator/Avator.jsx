import React from 'react'

const Avator = ({children,backgroundColor,color,px,py,borderRadius,cursor,fontSize}) => {
  const style={
    backgroundColor,
    color:color||"black",
    padding:`${px} ${py}`,
    borderRadius,
    fontSize,
    cursor:cursor||null,
    textAlign:"center"
  }
  return (
    <div style={style}>{children}</div>
  )
}

export default Avator