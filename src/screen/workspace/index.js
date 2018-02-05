import React, { Component } from 'react'
import styled from 'styled-components'
import { List, Card, Layout, Menu, Breadcrumb, Icon } from 'antd'

import ImgCard from './component/img-card'

const { SubMenu } = Menu
const {
  Header, Content, Footer, Sider,
} = Layout

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
export default class WorkspaceScreen extends Component {
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
          >
            <SubMenu
              key='sub1'
              title={
                <span>
                  <Icon type='user' />工作
                </span>
              }
            >
              <Menu.Item key='1'>协助台</Menu.Item>
              <Menu.Item key='2'>协作室</Menu.Item>
              <Menu.Item key='3'>教程</Menu.Item>
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
              lg: 4,
              xl: 3,
              xxl: 5,
            }}
            dataSource={testData}
            renderItem={item => (
              <List.Item>
                <ImgCard {...item} />
              </List.Item>
            )}
          />
        </Content>
      </Layout>
    )
  }
}
