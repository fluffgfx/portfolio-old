import { Children, cloneElement } from 'react'

export default ({ onClick, highlighted, color, children, style, ...props }) => {
  return <div style={{
    ...style,
    position: 'absolute',
    backgroundColor: color || 'black',
    transition: 'top 0.2s ease-in, left 0.5s ease-in 0.2s, width 0.5s ease-in 0.2s, height 0.2s ease-in, background-color 0.5s ease-in 0.2s',
    overflow: 'hidden'
  }} onClick={onClick}>
    {cloneElement(Children.only(children), { width: props.width, height: props.height })}
  </div>
}
