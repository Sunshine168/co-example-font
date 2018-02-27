// @flow
import * as React from 'react'
import { Spin } from 'antd'

type InnerComponentProps = {
  isLoading: boolean,
}

type ClassComponent<D, P, S> = Class<React$Component<D, P, S>>

// This function takes a component...
export default function AutoSwitchLoading() {
  // ...and returns another component...
  return (WrappedComponent: ClassComponent<void, *, *>) =>
    class extends React.Component<void, InnerComponentProps, *> {
      render() {
        const { isLoading, ...otherProsp } = this.props
        return isLoading ? <Spin size='large' /> : <WrappedComponent {...otherProsp} />
      }
    }
}
