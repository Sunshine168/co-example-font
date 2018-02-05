// @flow
import React, { Component } from 'react'
import styled from 'styled-components'

import { PanelContainer as Container } from '../../component/base-style-component'
import Form, { loginInForm } from './component/login-form'

type Props = {
  routing: Object,
}

export const LogoWrapper = styled.div`
  margin-bottom: 25px;
  text-align: center;
`

export const Logo = styled.h3`
  font-size: 32px;
`

export default class Login extends Component<Props> {
  constructor(props: Props) {
    super(props)
    this.form = loginInForm
    this.form.$hooks = {
      onSuccess: () => {},
      onError: () => {},
    }
  }
  render() {
    return (
      <Container>
        <LogoWrapper>
          <Logo>在线协图</Logo>
        </LogoWrapper>
        <Form form={this.form} />
      </Container>
    )
  }
}
