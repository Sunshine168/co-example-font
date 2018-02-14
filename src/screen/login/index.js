// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'

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

@inject(['user'])
@observer
export default class Login extends Component<Props> {
  constructor(props: Props) {
    super(props)
    loginInForm.$hooks = {
      onSuccess: (form) => {
        const { user } = this.props
        user.login(form.values())
      },
      onError: (form) => {
        console.log(form.errors())
      },
    }
  }
  render() {
    return (
      <Container>
        <LogoWrapper>
          <Logo>在线协图</Logo>
        </LogoWrapper>
        <Form form={loginInForm} />
      </Container>
    )
  }
}
