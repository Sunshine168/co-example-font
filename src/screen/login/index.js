// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import { notification } from 'antd'

import { PanelContainer as Container } from '../../component/base-style-component'
import Form, { loginInForm } from './component/login-form'
import { withRedirect } from '../../component/hoc'

type Props = {
  history: Object,
  login(user: Object, sucCb: (res: Object) => void, errCb: () => void): Promise<*>,
}

export const LogoWrapper = styled.div`
  margin-bottom: 25px;
  text-align: center;
`

export const Logo = styled.h3`
  font-size: 32px;
`

@inject(stores => ({
  login: stores.user.login,
  isLogin: stores.user.isLogin,
}))
@observer
@withRedirect('/')
export default class Login extends Component<void, Props, *> {
  constructor(props: Props) {
    super(props)
    loginInForm.$hooks.onSuccess = (form) => {
      const { login } = this.props
      return new Promise((resolve) => {
        login(
          form.values(),
          () => {
            notification.success({ message: '登录成功' })
            resolve()
          },
          () => {
            resolve()
          },
        )
      })
    }
    loginInForm.$hooks.onError = (form) => {
      console.log(form.errors())
    }
  }

  render() {
    const { history } = this.props
    return (
      <Container>
        <LogoWrapper>
          <Logo>在线协图</Logo>
        </LogoWrapper>
        <Form
          form={loginInForm}
          toRegister={() => {
            history.push('/register')
          }}
        />
      </Container>
    )
  }
}
