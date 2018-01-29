/* @flow */
import React, { Component } from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'

import { Container } from './component'


type Props = {
  count: number,
  increase: () => void,
  decrease: () => void,
}

const TestElement = styled.div`
  background: url(${require('../../assets/images/koa-mids.png')});
  width: 100px;
  height: 100px;
`

@inject(stores => ({
  count: stores.counter.count,
  increase: stores.counter.increase,
  decrease: stores.counter.decrease,
}))
@observer
export default class Demo extends Component<Props> {
  render() {
    return (
      <Container>
        <button onClick={this.props.increase} >
          +
        </button>
        <button onClick={this.props.decrease} inline>
          -
        </button>
        <div>{this.props.count}</div>
        <TestElement />
      </Container>
    )
  }
}
