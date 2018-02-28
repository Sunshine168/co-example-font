// @flow
import * as React from 'react'
import { Spin } from 'antd'
import { observer } from 'mobx-react'

type InnerComponentProps = {
  isLoading: boolean,
}

type ClassComponent<D, P, S> = Class<React$Component<D, P, S>>

// hoc declare https://github.com/facebook/flow/issues/2521

// This function takes a component...
export default function AutoSwitchLoading(WrappedComponent: ClassComponent<void, *, *>) {
  // ...and returns another component...
  return observer(class extends React.Component<void, InnerComponentProps, *> {
    render() {
      const { isLoading, ...otherProsp } = this.props
      return isLoading ? (
        <Spin size='large'>
          <WrappedComponent {...otherProsp} />
        </Spin>
      ) : (
        <WrappedComponent {...otherProsp} />
      )
    }
  })
}
