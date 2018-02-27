// @flow
import * as React from 'react'
import { Redirect } from 'react-router-dom'

type InnerComponentProps = {
  isLogin: boolean,
  location: Object,
}

type ClassComponent<D, P, S> = Class<React$Component<D, P, S>>

// This function takes a component...
export default function withRedirect(path: ?string, customRedirect: ?() => boolean) {
  // ...and returns another component...
  return (WrappedComponent: ClassComponent<void, *, *>) =>
    class extends React.Component<void, InnerComponentProps, *> {
      shouldRedirect = () => {
        if (typeof customRedirect === 'function') {
          return customRedirect()
        }
        console.log(this.props.isLogin)
        if (this.props.isLogin) {
          return true
        }
        return false
      }

      render() {
        const { isLogin, ...otherProsp } = this.props
        return this.shouldRedirect() ? (
          <Redirect
            to={{
              pathname: path ? path : '/login',
              state: { from: this.props.location },
            }}
          />
        ) : (
          <WrappedComponent {...otherProsp} />
        )
      }
    }
}
