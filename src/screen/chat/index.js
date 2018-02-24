// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { Avatar, List } from 'antd'
import io from 'socket.io-client'
import { inject, observer } from 'mobx-react'

import { Container } from '../../component/base-style-component'
import { Bubble, ChatInput, msgForm } from './component'

const { Item } = List

const testData = [
  // {
  //   id: 1,
  //   type: 1,
  //   msgFrom: 0,
  //   context: '1231231231231231231231231231231231231231231231231231231231231231231231233123131312',
  //   status: 'success',
  // },
  // {
  //   id: 2,
  //   type: 1,
  //   msgFrom: 0,
  //   context: '123',
  //   status: 'success',
  // },
  // {
  //   id: 3,
  //   type: 1,
  //   msgFrom: 0,
  //   context: '123',
  //   status: 'success',
  // },
]

const UserListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  padding: 20px 25px;
`

const ChatingListWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  width: 400px;
  height: 500px;
  border: 1px solid #cfcfcf;
`
@inject(stores => ({
  user: stores.user,
  chat: stores.chat,
}))
@observer
export default class Chat extends Component<*> {
  constructor(props) {
    super(props)
    this.renderChatItem = this.renderChatItem.bind(this)
    msgForm.$hooks = {
      onSuccess: (form) => {
        this.sendGroupTextMsg(form.values().msg)
        form.$('msg').sync('')
      },
    }
  }

  componentDidMount() {
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
    return (
      <Item>
        <Bubble className={author._id === user._id ? 'right' : 'left'}>{context}</Bubble>
      </Item>
    )
  }

  render() {
    const { chat, roomNo } = this.props
    const { chatingUserListMap, chatingListMap } = chat
    const chatingUserList = chatingUserListMap.get(roomNo) || []
    const chatingList = chatingListMap.get(roomNo) || []
    console.log('should render')
    console.log(chat.chatingListMap.get(roomNo))
    return (
      <Container>
        <UserListWrapper>
          {chatingUserList.map((user) => {
            return <Avatar icon='user' key={user._id} />
          })}
        </UserListWrapper>
        <ChatingListWrapper>
          <List
            itemLayout='vertical'
            dataSource={chatingListMap.get(roomNo)}
            renderItem={this.renderChatItem}
          />
        </ChatingListWrapper>
        <ChatInput form={msgForm} />
        <div>{chat.chatingListMap.has(roomNo) ? chat.chatingListMap.get(roomNo).length : 0}</div>
      </Container>
    )
  }
}
