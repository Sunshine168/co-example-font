import React, { Component } from 'react'
import styled from 'styled-components'
import { List, Card, Layout, Menu, Breadcrumb, Icon } from 'antd'
import { inject, observer } from 'mobx-react'

import ImgCard from './component/img-card'
import CreateModal, { createRoomForm } from './component/create-model'
import AuditModal from './component/audit-model'

const { SubMenu } = Menu
const { Content, Sider } = Layout

const testData = [
  {
    key: 1,
    img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    author: {
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    },
    title: '123',
    description: '455',
  },
  {
    key: 1,
    img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    author: {
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    },
    title: '123',
    description: '455',
  },
  {
    key: 1,
    img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    author: {
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    },
    title: '123',
    description: '455',
  },
  {
    key: 1,
    img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    author: {
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    },
    title: '123',
    description: '455',
  },
  {
    key: 1,
    img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    author: {
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    },
    title: '123',
    description: '455',
  },
  {
    key: 1,
    img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    author: {
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    },
    title: '123',
    description: '455',
  },
  {
    key: 1,
    img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    author: {
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    },
    title: '123',
    description: '455',
  },
  {
    key: 1,
    img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    author: {
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    },
    title: '123',
    description: '455',
  },
]

@inject(stores => ({
  showAuditModal: () => stores.workspace.setAuditModalVisible(true),
  showCreateModal: () => stores.workspace.setCreateModalVisible(true),
}))
@observer
export default class WorkspaceScreen extends Component {
  menuControl = (item) => {
    const { showAuditModal, showCreateModal } = this.props
    if (item.key === '4') {
      showCreateModal(true)
    }
    if (item.key === '5') {
      showAuditModal(true)
    }
  }
  render() {
    return (
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
              <Menu.Item key='5'>审核</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 300 }}>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 3,
              xl: 4,
              xxl: 4,
            }}
            dataSource={testData}
            renderItem={item => (
              <List.Item>
                <ImgCard {...item} />
              </List.Item>
            )}
          />
        </Content>
        <CreateModal form={createRoomForm} />
        <AuditModal />
      </Layout>
    )
  }
}
