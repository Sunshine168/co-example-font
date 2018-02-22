// @flow
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { notification } from 'antd'
import { PanelContainer as Container } from '../../component/base-style-component'
import Form, { registerForm } from './component/register-form'

type Props = {
  history: Object,
}

@inject(['user'])
@observer
export default class RegisterScreen extends Component<Props> {
  constructor(props: Props) {
    super(props)
    this.form = registerForm
    this.form.$hooks = {
      onSuccess: (form) => {
        const { register } = this.props.user
        register(form.values(), (result) => {
          const { history } = this.props
          notification.success({
            message: '注册成功',
          })
          history.push('/login')
        })
      },
      onError: () => {},
    }
  }
  render() {
    const { history } = this.props
    return (
      <Container>
        <Form
          form={this.form}
          toLogin={() => {
            history.push('login')
          }}
        />
      </Container>
    )
  }
}
