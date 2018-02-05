import React, { Component } from 'react'
import { PanelContainer as Container } from '../../component/base-style-component'
import Form, { registerForm } from './component/register-form'

export default class RegisterScreen extends Component {
  constructor(props: Props) {
    super(props)
    this.form = registerForm
    this.form.$hooks = {
      onSuccess: () => {},
      onError: () => {},
    }
  }
  render() {
    return (
      <Container>
        <Form form={this.form} />
      </Container>
    )
  }
}
