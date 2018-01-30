import React from 'react'
import { Route, Switch } from 'react-router-dom'
import BaseLayout from './layout'

import Counter from './screen/demo'
import Login from './screen/login'

class AppRouter extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/counter' component={Counter} />
        <Route path='/login' component={Login} />
      </Switch>
    )
  }
}

export default BaseLayout(AppRouter)
