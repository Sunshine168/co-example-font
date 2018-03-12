// @flow
import * as React from 'react'
import { findDOMNode } from 'react-dom'
import styled from 'styled-components'
import { Avatar, List, notification, Tooltip } from 'antd'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'

import { Container } from '../../component/base-style-component'
import { Bubble, ChatInput, msgForm } from './component'

// import './emoji.css'

const { Item } = List

const UserListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  padding: 20px 25px;
  border: 1px solid #c8cacd;
`

const ChatingListWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  width: 400px;
  height: 500px;
  border: 1px solid #cfcfcf;
  background: #fff;
`

type ChatProps = {
  user: Object,
  chat: Object,
  roomNo: string | number,
  sendGroupTextMsg(msg: string): void,
}

@withRouter
@inject(stores => ({
  user: stores.user,
  chat: stores.chat,
}))
@observer
export default class Chat extends React.Component<ChatProps> {
  constructor(props: ChatProps) {
    super(props)
    this.renderChatItem = this.renderChatItem.bind(this)
    msgForm.$hooks.onSuccess = (form) => {
      this.props.sendGroupTextMsg(form.values().msg)
      form.$('msg').sync('')
    }
    msgForm.$hooks.onError = () => {
      notification.error({
        message: '发送失败,消息不能为空',
      })
    }
  }

  componentDidUpdate = (prevProps: ChatProps) => {
    const { chat, roomNo } = this.props
    const { chatingListMap } = chat
    const chatingList = chatingListMap.get(roomNo)
    if (chatingList && chatingList.length > 0) {
      if (this.chatingWrapper) {
        findDOMNode(this.chatingWrapper).scrollTop = 10000
      }
    }
  }

  renderChatItem(rowData: Object) {
    const { data, author, type } = rowData
    const { user } = this.props
    const { context } = data

    if (type === 'text') {
      return (
        <Item>
          <Bubble className={author._id === user.user._id ? 'right' : 'left'} author={author}>
            {context}
          </Bubble>
        </Item>
      )
    }

    if (type === 'img') {
      const { src } = context
      return (
        <Item>
          <Bubble className={author._id === user.user._id ? 'right' : 'left'} author={author}>
            <img width={100} height={100} src={src} />
          </Bubble>
        </Item>
      )
    }

    return <div />
  }

  render() {
    const { chat, roomNo } = this.props
    const { chatingUserListMap, chatingListMap } = chat
    const chatingUserList = chatingUserListMap.get(roomNo) || []
    return (
      <Container>
        <div>
          消息数：{chat.chatingListMap.has(roomNo) ? chat.chatingListMap.get(roomNo).length : 0}
        </div>
        <UserListWrapper>
          {chatingUserList.map((user) => {
            return (
              <Tooltip title={user.nickname} key={user._id}>
                {user.avatar ? (
                  <Avatar src={user.avatar} style={{ marginLeft: 5 }} />
                ) : (
                  <Avatar icon='user' style={{ marginLeft: 5 }} />
                )}
              </Tooltip>
            )
          })}
        </UserListWrapper>
        <ChatingListWrapper ref={element => (this.chatingWrapper = element)}>
          <List
            split={false}
            itemLayout='vertical'
            dataSource={chatingListMap.get(roomNo)}
            renderItem={this.renderChatItem}
          />
        </ChatingListWrapper>
        <ChatInput form={msgForm} onPressEnter={msgForm.onSubmit} />
      </Container>
    )
  }
}
