// @flow
import React, { Component } from 'react'
import styled from 'styled-components'

import { Container, LogoWrapper, Logo } from './style-component'
import Form, { loginInForm } from './component/login-form'

type Props = {
  routing: Object,
}

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
        <Form
          form={this.form}
        />
      </Container>
    )
  }
}
