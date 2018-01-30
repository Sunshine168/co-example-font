import React from 'react'
import DevTools from 'mobx-react-devtools'
import { Layout, Menu, Breadcrumb } from 'antd'

const { Header, Content, Footer } = Layout

const BaseLayout = ContentComponent => (props) => {
  return (
    <Layout className='layout'>
      <Header>
        <div className='logo' />
        <Menu
          theme='dark'
          mode='horizontal'
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key='1'>首页</Menu.Item>
          <Menu.Item key='2'>登录/注册</Menu.Item>
          <Menu.Item key='3'>关于我</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <ContentComponent {...props} />
        <DevTools />
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2016 Created by Ant UED</Footer>
    </Layout>
  )
}

export default BaseLayout
