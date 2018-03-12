// @flow
import React from 'react'
import { Input, Button } from 'antd'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import { MobxForm, validator } from '../../../util'

const { TextArea } = Input

const Control = styled.div`
  display: flex;
  flex-direction: row;
`

const fields = [
  {
    name: 'msg',
    rules: 'required|string',
  },
]

const ChatInput = ({ form, ...otherProps }) => {
  return (
    <div>
      <Control>
        <TextArea {...form.$('msg').bind()} {...otherProps} />
        <Button type='primary' style={{ height: 52 }} onClick={form.onSubmit}>
          发送
        </Button>
      </Control>
    </div>
  )
}

export const msgForm = new MobxForm({ fields }, { plugins: { dvr: validator } })
export default observer(ChatInput)
