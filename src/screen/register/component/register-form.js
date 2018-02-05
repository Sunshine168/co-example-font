// @flow
import React from 'react'
import { inject, observer } from 'mobx-react'
import { Button, Upload, message } from 'antd'
import styled from 'styled-components'

import { Icon } from '../../../component/base-style-component'
import { TextInput, EyeButton } from '../../../component'
import { MobxForm, validator } from '../../../util'
import  AvatarUpload  from './avatar-upload'

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
    name: 'phone',
    placeholder: '请输入账户名/手机号',
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
  },
]

type FormProps = {
  form: Object,
}

const Form = ({ form }: FormProps) => {
  return (
    <form onSubmit={form.onSubmit}>
      <FormContainer>
        {fields.map((field) => {
          if (field.name === 'avatar') {
            return null
          }
          return (
            <TextInput
              {...form.$(field.name).bind()}
              addonAfter={field.name === 'password' ? <EyeButton /> : null}
              key={field.name}
            />
          )
        })}
        <AvatarUpload {...form.$('avatar').bind()} />
        <ButtonGroup>
          <Button type='primary' onClick={form.onSubmit} size='large'>
            点击注册
          </Button>
          <Button size='large'>已有账号请登录</Button>
        </ButtonGroup>
      </FormContainer>
    </form>
  )
}

export default observer(Form)
export const registerForm = new MobxForm({ fields }, { dvr: validator })
