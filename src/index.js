import React from 'react'
window.React = React

import { render } from 'react-dom'
import { Router, browserHistory, hashHistory, Route, IndexRoute } from 'react-router'

import App from './App'

const Highlight = ({ ...props }) => {
  return <App highlighted={props.params.id} {...props} />
}

render(
  <Router history={hashHistory}>
    <Route path='/'>
      <IndexRoute component={App} />
      <Route path='item/:id' component={Highlight} />
    </Route>
  </Router>,
  document.getElementById('mount'))
