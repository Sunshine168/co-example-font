// @flow
import * as React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import Loadable from 'react-loadable'
import { Spin } from 'antd'

import BaseLayout from './layout'
import Counter from './screen/demo'

type PrivateRouteProps = {
  isLogin: boolean,
  location: Object,
  component: React.ComponentType<any>,
  CustomComponent: ?React.ComponentType<any>,
}

const Register = Loadable({
  loader: () => import('./screen/register'),
  loading: () => {
    return <Spin size='large' />
  },
})

const Login = Loadable({
  loader: () => import('./screen/login'),
  loading: () => {
    return <Spin size='large' />
  },
})

const Workspace = Loadable({
  loader: () => import('./screen/workspace'),
  loading: () => {
    return <Spin size='large' />
  },
})

const Home = Loadable({
  loader: () => import('./screen/home'),
  loading: () => {
    return <Spin size='large' />
  },
})

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
          <Component {...rest} />
        ) : CustomComponent ? (
          <CustomComponent {...rest} />
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
const PrivateRouteWithState = inject(stores => ({
  isLogin: stores.user.isLogin,
}))(observer(PrivateRoute))

class AppRouter extends React.Component<*> {
  render() {
    return (
      <Switch>
        <Route path='/counter' component={Counter} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <PrivateRouteWithState path='/' exact component={Home} />
        <PrivateRouteWithState path='/workspace/:roomNo' exact component={Workspace} />
      </Switch>
    )
  }
}

export default BaseLayout(AppRouter)
