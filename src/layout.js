// @flow
import React from 'react'
import DevTools from 'mobx-react-devtools'
import { Layout, Menu, Breadcrumb } from 'antd'
import { observer, inject } from 'mobx-react'

const { Header, Content, Footer } = Layout

type BaseMenuProps = {
  routing: Object,
}

const BaseMenu = (props: BaseMenuProps) => {
  return (
    <Menu
      theme='dark'
      mode='horizontal'
      defaultSelectedKeys={['2']}
      style={{ lineHeight: '64px' }}
      onClick={(item) => {
        props.routing.push(item.item.props.path)
      }}
    >
      <Menu.Item key='1' path='/'>
        首页
      </Menu.Item>
      <Menu.Item key='2' path='/login'>
        登录/注册
      </Menu.Item>
      <Menu.Item key='3' path='/about'>
        关于我
      </Menu.Item>
    </Menu>
  )
}

const BaseMenuWithInject = inject(stores => ({ routing: stores.routing, user: stores.user }))(observer(BaseMenu))

const BaseLayout = ContentComponent => (props) => {
  return (
    <Layout className='layout'>
      <Header>
        <div className='logo' />
        <BaseMenuWithInject />
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
