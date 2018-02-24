import React from 'react'
import { Input, Button } from 'antd'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import { Emoji } from 'emoji-mart'

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

const ChatInput = ({ form }) => {
  return (
    <div>
      {/* <Emoji emoji='santa' set='emojione' size={16} /> */}
      <Control>
        <TextArea {...form.$('msg').bind()} />
        <Button type='primary' style={{ height: 52 }} onClick={form.onSubmit}>
          发送
        </Button>
      </Control>
    </div>
  )
}

export const msgForm = new MobxForm({ fields }, { dvr: validator })
export default observer(ChatInput)
