// @flow
import * as React from 'react'
import styled from 'styled-components'
import { Breadcrumb, notification } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import io from 'socket.io-client'

import Chat from '../chat'
import ChatStore from '../../store/chat'
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
  workspace: Object,
  history: Object,
  imgProcess: Object,
  chat: typeof ChatStore,
}

@withRouter
@inject(stores => ({
  user: stores.user,
  workspace: stores.workspace,
  chat: stores.chat,
  imgProcess: stores.imgProcess,
}))
@observer
export default class Workspace extends React.Component<WorkSpaceProps> {
  componentDidMount() {
    const { roomNo } = this.props.computedMatch.params
    const { workspace, history, imgProcess } = this.props
    workspace.checkRoomAlive(
      roomNo,
      (room) => {
        this.loadSocket()
        imgProcess.setWorkingImg(room.img)
      },
      () => {
        history.push('/')
      },
    )
  }

  componentWillUnmount = () => {
    if (this.socket) {
      this.socket.disconnect()
    }
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
        log('#receive room msg', msg)
        this.receiveMsgHandler(msg)
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

  receiveMsgHandler = (msg: Object) => {
    const { roomNo } = this.props.computedMatch.params
    const { chat, imgProcess } = this.props
    const { data } = msg
    const { payload } = data
    if (payload.type === 'text' || payload.type === 'img') {
      chat.addChatingRecord(roomNo, payload)
    }
    if (payload.type === 'sync_img') {
      if (imgProcess.processingStatus) {
        imgProcess.setProcessStatus(false)
      }
    }
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

  sendGroupImagMsg = () => {
    const { roomNo } = this.props.computedMatch.params
    const { workingBase64Img } = this.props.imgProcess
    if (!workingBase64Img) {
      notification.error({
        message: '图片不能为空',
      })
      return
    }
    this.socket.emit('exchange', {
      payload: {
        data: {
          context: {
            src: workingBase64Img,
          },
        },
        type: 'img',
        author: this.props.user.user,
      },
      target: `room_${roomNo}`,
    })
  }

  syncProcessImg = () => {
    const { imgProcess } = this.props
    const data = imgProcess.getAllOptions()
    const { roomNo } = this.props.computedMatch.params
    imgProcess.setProcessStatus(true)
    this.socket.emit('exchange', {
      payload: {
        data: JSON.stringify(data),
        type: 'sync_img',
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
          <ProcessImg sendImg={this.sendGroupImagMsg} />
        </CustomContainer>
      </div>
    )
  }
}
