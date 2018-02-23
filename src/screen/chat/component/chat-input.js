import React from 'react'
import { List, Input, Button } from 'antd'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import { Emoji } from 'emoji-mart'

const { TextArea } = Input

const Control = styled.div`
  display: flex;
  flex-direction: row;
`

const ChatInput = ({ sendTextMsg }) => {
  return (
    <div>
      {/* <Emoji emoji='santa' set='emojione' size={16} /> */}
      <Control>
        <TextArea />
        <Button
          type='primary'
          style={{ height: 52 }}
          onClick={() => {
            sendTextMsg(123)
          }}
        >
          发送
        </Button>
      </Control>
    </div>
  )
}

export default observer(ChatInput)
