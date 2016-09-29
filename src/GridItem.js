export default ({ onClick, highlighted, color, children, ...props }) => {
  return <div style={{
    ...props,
    position: 'absolute',
    backgroundColor: color || 'black',
    transition: 'top 0.2s ease-in, left 0.5s ease-in 0.2s, width 0.5s ease-in 0.2s, height 0.2s ease-in, background-color 0.5s ease-in 0.2s',
    overflow: 'hidden'
  }} onClick={onClick}>
    {children}
  </div>
}
