// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import { notification } from 'antd'

import { PanelContainer as Container } from '../../component/base-style-component'
import Form, { loginInForm } from './component/login-form'
import type { IUser } from '../../store/user'
import { withRedirect } from '../../component/hoc'

type Props = {
  history: Object,
  user: IUser,
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
export default class Login extends Component<Props> {
  constructor(props: Props) {
    super(props)
    loginInForm.$hooks = {
      onSuccess: (form) => {
        const { login } = this.props
        login(form.values(), () => {
          const { history } = this.props
          notification.success({ message: '登录成功' })
          history.push('/')
        })
      },
      onError: (form) => {
        console.log(form.errors())
      },
    }
  }

  render() {
    console.log(`inner render ${+new Date()}`)
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
