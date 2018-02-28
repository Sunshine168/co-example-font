// @flow
import React from 'react'
import { observer, inject } from 'mobx-react'
import { Button } from 'antd'
import styled from 'styled-components'

import EyeButton from '../../../component/eye-button'
import { MobxForm, validator } from '../../../util'
import TextInput, { ImgUpload } from '../../../component/input-component'

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
    placeholder: '请输入邮箱',
    label: '账号',
    icon: 'user',
    rules: 'required|email|string',
  },
  {
    name: 'password',
    label: '密码',
    placeholder: '请输入登录密码',
    rules: 'required|string|between:5,25',
    icon: 'lock',
  },
  {
    name: 'confirmPwd',
    label: '确认密码',
    placeholder: '请确认登录密码',
    rules: 'required|string|same password',
    icon: 'lock',
  },
  {
    name: 'nickname',
    label: '昵称',
    placeholder: '请输入昵称',
    rules: 'required|string|nickname',
    icon: 'lock',
  },
  {
    name: 'avatar',
    lable: '头像',
    rules: 'required',
    value: '',
  },
]

type FormProps = {
  form: Object,
  toLogin(): void,
  pwdVisible: boolean,
}

const Form = ({ form, toLogin, pwdVisible }: FormProps) => {
  return (
    <form onSubmit={form.onSubmit}>
      <FormContainer>
        {fields.map((field) => {
          if (field.name === 'avatar') {
            return null
          }
          const err = form.errors()[field.name]
          if (field.name === 'password') {
            return (
              <TextInput
                key={field.name}
                {...form.$('password').bind()}
                addonAfter={<EyeButton />}
                type={pwdVisible ? 'text' : 'password'}
                error={err}
                help={err ? err.replace(field.name, field.label) : null}
              />
            )
          }

          return (
            <TextInput
              {...form.$(field.name).bind()}
              key={field.name}
              error={err}
              help={err ? err.replace(field.name, field.label) : null}
            />
          )
        })}
        <ImgUpload {...form.$('avatar').bind()} />
        <ButtonGroup>
          <Button type='primary' onClick={form.onSubmit} size='large'>
            点击注册
          </Button>
          <Button size='large' onClick={toLogin}>
            已有账号请登录
          </Button>
        </ButtonGroup>
      </FormContainer>
    </form>
  )
}

export default inject(stores => ({
  pwdVisible: stores.user.pwdVisible,
}))(observer(Form))
export const registerForm = new MobxForm({ fields }, { plugins: { dvr: validator } })
