import React from 'react'
import { Redirect } from 'react-router-dom'

// This function takes a component...
export default function withRedirect(path, customRedirect) {
  // ...and returns another component...
  return WrappedComponent =>
    class extends React.Component {
      shouldRedirect = () => {
        if (typeof customRedirect === 'function') {
          return customRedirect()
        }
        if (this.props.user) {
          return true
        }
        return false
      }

      render() {
        return this.shouldRedirect() ? (
          <Redirect
            to={{
              pathname: path ? path : '/login',
              state: { from: this.props.location },
            }}
          />
        ) : (
          <WrappedComponent {...this.props} />
        )
      }
    }
}
