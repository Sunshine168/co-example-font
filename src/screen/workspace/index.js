// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import io from 'socket.io-client'

import Chat from '../chat'
import ProcessImg from '../process-img'
import { UserStauts } from '../../component/'

const CustomContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

type WorkSpaceProps = {
  computedMatch: Object,
}

@inject(stores => ({
  user: stores.user,
  workspace: stores.workspace,
  routing: stores.routing,
  chat: stores.chat,
  imgProcess: stores.imgProcess,
}))
@observer
export default class Workspace extends Component<WorkSpaceProps> {
  componentDidMount() {
    const { roomNo } = this.props.computedMatch.params
    const { workspace, routing, imgProcess } = this.props
    workspace.checkRoomAlive(
      roomNo,
      (room) => {
        this.loadSocket()
        imgProcess.setWorkingImg(room.img)
      },
      () => {
        routing.push('/')
      },
    )
  }

  loadSocket = () => {
    const { chat } = this.props
    const { roomNo } = this.props.computedMatch.params
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
    const { roomNo } = this.props.computedMatch.params
    this.socket.emit('exchange', {
      payload: {
        data: {
          context: text,
        },
        type: 'text',
        author: this.props.user.user,
      },
      target: `room_${roomNo}`,
    })
  }

  render() {
    const { roomNo } = this.props.computedMatch.params
    return (
      <div>
        <Row>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to='/' href='/'>
                List
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{`房间：${roomNo}`}</Breadcrumb.Item>
          </Breadcrumb>
          <UserStauts />
        </Row>
        <CustomContainer>
          <Chat roomNo={roomNo} sendGroupTextMsg={this.sendGroupTextMsg} />
          <ProcessImg />
        </CustomContainer>
      </div>
    )
  }
}
