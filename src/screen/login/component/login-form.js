// @flow
import React from 'react'
import { inject, observer } from 'mobx-react'
import { Button } from 'antd'

import styled from 'styled-components'
import { Icon } from '../../../component/base-style-component'
import TextInput from '../../../component/input-component'

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
    name: 'phone',
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

type EyeButtonProps = {
  pwdVisible: boolean,
  setPwdVisible: () => void,
}

const EyeButton = ({ pwdVisible, setPwdVisible }: EyeButtonProps) => {
  return (
    <Icon
      onClick={() => {
        setPwdVisible()
      }}
      width={25}
      height={20}
      source={
        pwdVisible
          ? require('../../../assets/login/ic_open@2x.png')
          : require('../../../assets/login/ic_Close_the@2x.png')
      }
    />
  )
}

const EyeButtonWithInject = inject(stores => ({
  pwdVisible: stores.user.pwdVisible,
  setPwdVisible: stores.user.setPwdVisible,
}))(observer(EyeButton))

type FormProps = {
  form: Object,
}

const Form = ({ form }: FormProps) => {
  return (
    <form onSubmit={form.onSubmit}>
      <FormContainer>
        {fields.map((field) => {

          return (
            <TextInput
              {...form.$(field.name).bind()}
              addonAfter={field.name === 'password' ? <EyeButtonWithInject /> : null}
              key={field.name}
            />
          )
        })}
        <ButtonGroup>
          <Button type='primary' onClick={form.onSubmit} size='large'>
            登录
          </Button>
          <Button size='large'>注册</Button>
        </ButtonGroup>
      </FormContainer>
    </form>
  )
}

export default observer(Form)
export const loginInForm = new MobxForm({ fields }, { dvr: validator })
