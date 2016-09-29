import { Component, Children, cloneElement } from 'react'

const genArray = (len) => Array(len).fill(null)

export default class Grid extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cellSize: 150,
      gutterSize: 20,
      nodeWidth: 0,
      gridWidth: 0,
      leftPadding: 0,
      rightPadding: 0,
      grid: [],
      ref: null
    }
    this.handleRef = this.handleRef.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleRef (ref = this.state.ref) {
    // component was remounted, recalculate state
    if (!ref) return
    let cellSize = this.state.cellSize
    const nodeWidth = ref.clientWidth
    let gridWidth = Math.round(ref.clientWidth / (this.state.cellSize + this.state.gutterSize))
    const rightPadding = nodeWidth - (gridWidth * (this.state.cellSize + this.state.gutterSize))
    const leftPadding = rightPadding + 20
    this.setState({ cellSize, nodeWidth, gridWidth, rightPadding, leftPadding, ref }, () => {
      console.log(this.state)
      let grid = this.fillGrid(genArray(Children.count(this.props.children)))
      this.setState({ grid })
    })
  }

  handleClick () {
    console.log(this)
    this.handleRef()
  }

  componentDidMount () {
    window.addEventListener('resize', () => this.handleRef())
  }

  componentWillUnmount () {
    window.removeEventListener('resize', () => this.handleRef())
  }

  fillGrid (grid) {
    const children = Children.toArray(this.props.children)
    const virtualGrid = genArray(children.length * 4).map(row => genArray(this.state.gridWidth).fill(true))
    return grid.map((g, i) => {
      const child = children[i]
      for (let r = 0; r < children.length * 4; r++) {
        const row = virtualGrid[r]
        for (let c = 0; c < this.state.gridWidth; c++) {
          const cell = row[c]
          // we have a cell. is it filled
          if (cell) {
            // it's not filled, but is the child big enough to fit
            // check that the surrounding area is wide enough...
            const wideEnough = (() => {
              for (let cc = 0; cc < child.props.width; cc++) {
                if (!row[c + cc]) return false
              }
              return true
            })()
            if (!wideEnough) continue
            const tallEnough = (() => {
              for (let rr = 0; rr < child.props.height; rr++) {
                if (!virtualGrid[r + rr]) return false
                const nextRow = virtualGrid[r + rr]
                if (!nextRow[c]) return false
                const wideEnough = (() => {
                  for (let cc = 0; cc < child.props.width; cc++) {
                    if (!nextRow[c + cc]) return false
                  }
                  return true
                })()
                if (!wideEnough) return false
              }
              return true
            })()
            if (!tallEnough) continue
            // we have a perfect space let's put it in the grid
            for (let rr = 0; rr < child.props.height; rr++) {
              for (let cc = 0; cc < child.props.width; cc++) {
                virtualGrid[r + rr][c + cc] = false
              }
            }
            return [r, c]
          } else { continue }
        }
      }
    })
  }

/*
  componentWillReceiveProps (nextProps) {
    this.setState({
      children:
        Children.map(nextProps.children, child => {
          if (child.props.width > this.state.gridWidth) return cloneElement(child, { width: this.state.gridWidth })
          if (child.props.width > 4) return cloneElement(child, { width: 4 })
          return child
        })
    })
  }
*/

  render () {
    return (
      <div ref={this.handleRef} onClick={this.handleClick} >
        {Children.toArray(this.props.children).map((child, index) =>
          this.state.grid[0]
            ? cloneElement(child, {
              left: this.state.grid[index][1] * (this.state.cellSize + this.state.gutterSize),
              top: this.state.grid[index][0] * (this.state.cellSize + this.state.gutterSize),
              width: (child.props.width * this.state.cellSize) + (child.props.width * (this.state.gutterSize - 1)),
              height: (child.props.height * this.state.cellSize) + (child.props.height * (this.state.gutterSize - 1))
            })
            : null
          )}
      </div>
    )
  }
}
