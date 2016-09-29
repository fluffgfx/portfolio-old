import { Component, PropTypes } from 'react'

import items from '../items'
import Item from './Item'
import Grid from './Grid'
import GridItem from './GridItem'

export default class App extends Component {
  render () {
    let highlighted = parseInt(this.props.highlighted) || -1
    if (this.props.highlighted === '0') highlighted = 0
    return (
      <Grid>
        {items.map(i => i.default).map((i, x) => {
          return (
            <GridItem
              width={highlighted === x ? 4 : i.width}
              height={highlighted === x ? 4 : i.height}
              name={i.name}
              color={i.color}
              key={`gridItem${x}`}
              onClick={() => this.context.router.push(`/item/${x}`)}
              highlighted={highlighted === x}>
              <Item data={i} highlighted={highlighted === x} />
            </GridItem>
          )
        })}
      </Grid>
    )
  }
}

App.contextTypes = { router: PropTypes.object }
