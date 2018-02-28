// @flow
import React from 'react'
import { observer, inject } from 'mobx-react'
import { Button } from 'antd'
import styled from 'styled-components'

import { TextInput, EyeButton } from '../../../component'
import { MobxForm, validator } from '../../../util'

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0px;
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  & button:nth-child(1) {
    margin-bottom: 20px;
  }
`

const fields = [
  {
    name: 'account',
    placeholder: '请输入账户名/手机号',
    label: '账号',
    icon: 'user',
    rules: 'required|email|string',
    size: 15,
  },
  {
    name: 'password',
    label: '密码',
    placeholder: '请输入登录密码',
    rules: 'required|string|between:5,25',
    icon: 'lock',
    size: 15,
  },
]

type FormProps = {
  form: Object,
  pwdVisible: boolean,
  toRegister(): void,
}

const Form = ({ form, pwdVisible, toRegister }: FormProps) => {
  return (
    <form onSubmit={form.onSubmit}>
      <FormContainer>
        <TextInput
          {...form.$('account').bind()}
          error={form.errors().account}
          help={form.errors().account ? '账号格式不正确' : null}
        />
        <TextInput
          {...form.$('password').bind()}
          addonAfter={<EyeButton />}
          type={pwdVisible ? 'text' : 'password'}
          error={form.errors().password}
          help={form.errors().password ? '密码格式不正确' : null}
        />
        <ButtonGroup>
          <Button type='primary' onClick={form.onSubmit} size='large' loading={form.submitting}>
            登录
          </Button>
          <Button size='large' onClick={toRegister}>
            注册
          </Button>
        </ButtonGroup>
      </FormContainer>
    </form>
  )
}

export default inject(stores => ({
  pwdVisible: stores.user.pwdVisible,
}))(observer(Form))
export const loginInForm = new MobxForm({ fields }, { plugins: { dvr: validator } })
