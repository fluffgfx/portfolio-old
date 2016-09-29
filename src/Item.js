export default ({ highlighted, data, width, height }) => {
  let h = highlighted ? 4 : height
  const baseFontStyles = {
    color: data.invert ? 'black' : 'white',
    fontFamily: 'proxima-nova',
    fontSize: '64px',
    margin: 0,
    fontWeight: '800'
  }
  return (
    <div>
      { width === 1 && h === 1 && !highlighted
        ? <div>
            <h1 style={{
              ...baseFontStyles,
              position: 'absolute',
              bottom: 0,
              right: '58px',
            }}>{data.name.slice(0, 3).toLowerCase()}</h1>
            <h1 style={{
              ...baseFontStyles,
              position: 'absolute',
              bottom: '44px',
              right: '-30px',
              transform: 'rotate(-90deg)'
            }}>{data.name.slice(3).toLowerCase()}</h1>
          </div>
        : <h1 style={{
            ...baseFontStyles,
            transform: (width * 2 <= h && !highlighted) ? 'rotate(-90deg)' : 'rotate(0deg)',
            position: 'absolute',
            bottom: (width * 2 <= h && !highlighted) ? '44px' : 0,
            left: (width * 2 <= h && !highlighted) ? '-50px' : width >= h * 3 ? null : '10px',
            right: width >= h * 3 ? '10px' : null,
            transition: 'transform 0.2s ease-in, bottom 0.2s ease-in, left 0.2s ease-in, right 0.2s ease-in'
          }}>{data.name.toLowerCase()}</h1>
      }
      <div style={{
        opacity: highlighted ? 1 : 0,
        transition: 'opacity 0.2s ease-in 0.7s',
        padding: '25px'
      }}>
        <p style={{
          color: data.invert ? 'black' : 'white',
          fontFamily: 'proxima-nova'
        }}>{data.description || 'Null'}</p></div>
    </div>
  )
}
