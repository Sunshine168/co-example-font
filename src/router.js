// @flow
import * as React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { observer, inject } from 'mobx-react'

import BaseLayout from './layout'
import Counter from './screen/demo'
import Login from './screen/login'
import Register from './screen/register'
import Home from './screen/home'
import Workspace from './screen/workspace'

type PrivateRouteProps = {
  isLogin: boolean,
  location: Object,
  component: React.ComponentType<any>,
  CustomComponent: ?React.ComponentType<any>,
}

const PrivateRoute = ({
  component: Component,
  CustomComponent,
  isLogin,
  ...rest
}: PrivateRouteProps) => {
  return (
    <Route
      {...rest}
      render={props =>
        (isLogin ? (
          <Component {...props} />
        ) : CustomComponent ? (
          <CustomComponent {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        ))
      }
    />
  )
}

/* eslint-disable max-len */
const PrivateRouteWithState = inject(stores => ({ isLogin: stores.user.isLogin }))(observer(PrivateRoute))

class AppRouter extends React.Component<*> {
  render() {
    return (
      <Switch>
        <Route path='/counter' component={Counter} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <PrivateRouteWithState path='/' exact component={Home} />
        <PrivateRouteWithState path='/workspace' exact component={Workspace} />
      </Switch>
    )
  }
}

export default BaseLayout(AppRouter)
