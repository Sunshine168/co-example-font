// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { List, Card, Layout, Menu, notification, Icon, Button, Modal, Breadcrumb } from 'antd'
import { inject, observer } from 'mobx-react'

import ImgCard from './component/img-card'
import CreateModal, { createRoomForm } from './component/create-modal'
import AuditModal from './component/audit-modal'
import JoinModal, { joinRoomForm } from './component/join-modal'
import { UserStauts } from '../../component/'

const { SubMenu } = Menu
const { Content, Sider } = Layout
const { confirm } = Modal

type WorkspaceScreenProps = {}

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

@inject(stores => ({
  showAuditModal: () => stores.workspace.setAuditModalVisible(true),
  showCreateModal: () => stores.workspace.setCreateModalVisible(true),
  showJoinModal: () => stores.workspace.setJoinModalVisible(true),
  createRoom: stores.workspace.createRoom,
  joinRoom: stores.workspace.joinRoom,
  deleteRoom: stores.workspace.deleteRoom,
  getAllRooms: stores.workspace.getAllRooms,
  roomsArray: stores.workspace.roomsArray,
}))
@observer
export default class WorkspaceScreen extends Component<WorkspaceScreenProps> {
  constructor(props: WorkspaceScreenProps) {
    super(props)
    createRoomForm.$hooks = {
      onSuccess: (form) => {
        this.props.createRoom(form.values(), (result) => {
          const { room } = result
          const key = `open${Date.now()}`
          const btn = (
            <Button type='primary' size='small' onClick={() => notification.close(key)}>
              点击进入房间
            </Button>
          )
          notification.success({
            title: '创建成功',
            message: `创建的房号为${room}`,
            btn,
            onClose: () => {},
          })
          this.props.getAllRooms()
        })
      },
    }

    joinRoomForm.$hooks = {
      onSuccess: (form) => {
        this.props.joinRoom(form.values(), (result) => {
          if (result.status === 1) {
            // 开放房间允许直接加入
            const key = `open${Date.now()}`
            const btn = (
              <Button type='primary' size='small' onClick={() => notification.close(key)}>
                点击进入房间
              </Button>
            )
            notification.success({
              message: '加入房间成功',
              btn,
              onClose: () => {},
            })
          }
          if (result.status === 0) {
            // 待添加一个全局的消息模块
            notification.success({
              title: '申请已发送',
              message: '等待房主审核',
            })
          }
        })
      },
    }
  }

  componentDidMount() {
    const { getAllRooms } = this.props
    getAllRooms()
  }

  menuControl = (item) => {
    const { showAuditModal, showCreateModal, showJoinModal } = this.props
    if (item.key === '4') {
      showCreateModal(true)
    }
    if (item.key === '5') {
      showAuditModal(true)
    }
    if (item.key === '6') {
      showJoinModal(true)
    }
  }

  deleteRoom = (room) => {
    const { deleteRoom, getAllRooms } = this.props
    confirm({
      title: `是否要删除房间号为${room.roomNo}的房间`,
      content: '房间删除后不可恢复！！',
      onOk() {
        return new Promise((resolve) => {
          deleteRoom(
            room.roomNo,
            () => {
              notification.success({
                message: '删除成功',
              })
              getAllRooms()
            },
            resolve,
          )
        })
      },
      onCancel() {},
    })
  }

  render() {
    const { roomsArray } = this.props
    return (
      <div>
        <Row>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <UserStauts />
        </Row>
        <Layout
          style={{
            padding: '24px 0',
            background: '#fff',
          }}
        >
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode='inline'
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
              onClick={this.menuControl}
            >
              <SubMenu
                key='sub1'
                title={
                  <span>
                    <Icon type='user' />工作
                  </span>
                }
              >
                <Menu.Item key='1'>所有</Menu.Item>
                <Menu.Item key='2'>创建的协作</Menu.Item>
                <Menu.Item key='3'>参与的协作</Menu.Item>
              </SubMenu>
              <SubMenu
                key='sub2'
                title={
                  <span>
                    <Icon type='api' />管理
                  </span>
                }
              >
                <Menu.Item key='4'>创建一个新房间</Menu.Item>
                <Menu.Item key='5'>审核我的房间</Menu.Item>
                <Menu.Item key='6'>加入一个新房间</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 300 }}>
            <List
              grid={{
                gutter: 8,
                xs: 1,
                sm: 2,
                md: 3,
                lg: 3,
                xl: 4,
                xxl: 4,
              }}
              dataSource={roomsArray}
              renderItem={(item) => {
                const {
 img, owner, name, roomNo, isOwner,
} = item
                return (
                  <List.Item>
                    <ImgCard
                      img={img}
                      author={owner}
                      name={name}
                      description={`身份：${isOwner ? '拥有者' : '参与者'}`}
                      title={`房间号码为：${roomNo}`}
                      deleteAction={() => this.deleteRoom(item)}
                    />
                  </List.Item>
                )
              }}
            />
          </Content>
          <CreateModal form={createRoomForm} />
          <AuditModal />
          <JoinModal form={joinRoomForm} />
        </Layout>
      </div>
    )
  }
}
