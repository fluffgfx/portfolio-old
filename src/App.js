import { Component, PropTypes } from 'react'

import items from '../items'
import Item from './Item'
import Grid from './Grid'
import GridItem from './GridItem'

export default class App extends Component {
  render () {
    let highlighted = this.props.highlighted || -1
    console.log(highlighted)
    return (
      <Grid>
        {items.map(i => i.default).map((i, x) => (
          <GridItem
            width={highlighted === x ? 4 : i.width}
            height={highlighted === x ? 4 : i.height}
            name={i.name}
            thumbnail={i.thumbnail}
            key={`gridI${x}`}>
            <Item data={i} highlighted={highlighted === x} />
          </GridItem>
        ))}
      </Grid>
    )
  }
}

App.contextTypes = { router: PropTypes.object }
