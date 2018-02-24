// @flow
import * as React from 'react'
import styled from 'styled-components'
import { Avatar, List, notification, Tooltip } from 'antd'
import io from 'socket.io-client'
import { inject, observer } from 'mobx-react'

import { Container } from '../../component/base-style-component'
import { Bubble, ChatInput, msgForm } from './component'

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

const text = <span>prompt text</span>

type ChatProps = {
  user: Object,
  chat: Object,
}

@inject(stores => ({
  user: stores.user,
  chat: stores.chat,
  routing: stores.routing,
}))
@observer
export default class Chat extends React.Component<ChatProps> {
  constructor(props: ChatProps) {
    super(props)
    this.renderChatItem = this.renderChatItem.bind(this)
    msgForm.$hooks.onSuccess = (form) => {
      this.sendGroupTextMsg(form.values().msg)
      form.$('msg').sync('')
    }
    msgForm.$hooks.onError = () => {
      notification.error({
        message: '发送失败,消息不能为空',
      })
    }
  }

  componentDidMount() {
    const { chat, roomNo, routing } = this.props
    chat.checkRoomAlive(roomNo, this.loadSocket, () => {
      routing.push('/')
    })
  }

  loadSocket = () => {
    const { roomNo, chat } = this.props
    // TODO 先确定房间存在是否再进行后面的步骤
    chat.initRoom(roomNo)

    const socket = io(`${document.location.hostname}:7001`, {
      query: {
        room: roomNo,
      },
      transports: ['websocket'],
    })
    this.socket = socket
    // debug
    const { log } = console
    socket.on('connect', () => {
      const { id } = socket

      log('#connect,', id, socket)

      // 接收在线用户信息
      socket.on('online', (msg) => {
        log('#online,', msg)
        const { users } = msg
        chat.setChatingUserList(roomNo, users)
      })

      socket.on(roomNo, (msg) => {
        const { chat } = this.props
        const { data } = msg
        const { payload } = data
        if (payload.type === 'text') {
          log('#receive room text info', msg)
          chat.addChatingRecord(roomNo, payload)
        }

        log('#receive room msg', msg)
      })

      // 监听自身 id 以实现 p2p 通讯
      socket.on(id, (msg) => {
        log('#receive,', msg)
      })

      // 系统事件
      socket.on('disconnect', (msg) => {
        // 中断和错误都强制离开房间
        log('#disconnect', msg)
      })

      socket.on('disconnecting', () => {
        log('#disconnecting')
      })

      socket.on('error', () => {
        log('#error')
      })
    })
  }

  sendGroupTextMsg = (text: string) => {
    this.socket.emit('exchange', {
      payload: {
        data: {
          context: text,
        },
        type: 'text',
        author: this.props.user.user,
      },
      target: `room_${this.props.roomNo}`,
    })
  }

  renderChatItem(rowData: Object, sectionID: number, rowID: number) {
    const { data, author } = rowData
    const { user } = this.props
    const { context } = data
    console.log(author)
    console.log(user.user._id)
    return (
      <Item>
        <Bubble className={author._id === user.user._id ? 'right' : 'left'} author={author}>
          {context}
        </Bubble>
      </Item>
    )
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
                <Avatar icon='user' />
              </Tooltip>
            )
          })}
        </UserListWrapper>
        <ChatingListWrapper>
          <List
            split={false}
            itemLayout='vertical'
            dataSource={chatingListMap.get(roomNo)}
            renderItem={this.renderChatItem}
          />
        </ChatingListWrapper>
        <ChatInput form={msgForm} />
      </Container>
    )
  }
}
