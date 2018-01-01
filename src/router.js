import React from 'react'
import { Route } from 'react-router-dom'
import DevTools from 'mobx-react-devtools'

import Counter from './screen/demo'

class AppRouter extends React.Component {
  render() {
    return (
      <div>
        <Route path='/counter' component={Counter} />
        <DevTools />
      </div>
    )
  }
}

export default AppRouter
