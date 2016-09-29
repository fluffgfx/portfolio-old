export default ({ highlighted, data }) => {
  return (
    <div>
      { data.width === 1 && data.height === 1 
        ? <div>
            <h1 style={{
              color: 'white',
              fontFamily: 'proxima-nova',
              fontSize: '64px',
              margin: 0,
              position: 'absolute',
              bottom: 0,
              left: '10px',
            }}>{data.name.slice(0, Math.floor(data.name.length / 2))}</h1>
            <h1 style={{
              color: 'white',
              fontFamily: 'proxima-nova',
              fontSize: '64px',
              margin: 0,
              position: 'absolute',
              bottom: 0,
              right: '10px',
              transform: 'rotate(-90deg)'
            }}>{data.name.slice(0, Math.floor(data.name.length / 2))}</h1>
          </div>
        : <h1 style={{
            color: 'white',
            fontFamily: 'proxima-nova',
            fontSize: '64px',
            margin: 0,
            transform: data.width * 2 <= data.height ? 'rotate(-90deg)' : null,
            position: 'absolute',
            bottom: data.width * 2 <= data.height ? '60px' : 0,
            left: data.width * 2 <= data.height ? '-50px' : data.width >= data.height * 3 ? null : '10px',
            right: data.width >= data.height * 3 ? '10px' : null
          }}>{data.name}</h1>
      }
      <div style={{
        opacity: highlighted ? 1 : 0,
        transition: 'opacity 0.2s ease-in'
      }}>Data</div>
    </div>
  )
}
