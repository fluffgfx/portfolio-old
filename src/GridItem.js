export default ({ onClick, ...props }) => {
  return <div style={{
    ...props,
    position: 'absolute',
    backgroundColor: 'black',
    transition: 'top 0.2s ease-in, left 0.5s ease-in 0.2s'
  }} onClick={onClick} />
}
