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
      <Grid highlighted={highlighted}>
        {items.map(i => i.default).map((i, x) => {
          return (
            <GridItem
              width={highlighted === x ? 4 : i.width}
              height={highlighted === x ? x === 10 ? 3 : x === 3 ? 2 : 4 : i.height}
              name={i.name}
              color={i.color}
              key={`gridItem${x}`}
              onClick={() => i.isLink ? window.location.replace(i.link) : this.context.router.push(`/item/${x}`)}
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
