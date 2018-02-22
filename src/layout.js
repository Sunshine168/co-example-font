// @flow
import React from 'react'
import styled from 'styled-components'
import DevTools from 'mobx-react-devtools'
import { Layout, Menu, Breadcrumb, notification, Avatar } from 'antd'
import { observer, inject } from 'mobx-react'

const { Header, Content, Footer } = Layout

const { SubMenu } = Menu

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

type BaseMenuProps = {
  routing: Object,
}

const BaseMenu = (props: BaseMenuProps) => {
  const { user } = props
  return (
    <Menu
      theme='dark'
      mode='horizontal'
      defaultSelectedKeys={['2']}
      style={{ lineHeight: '64px' }}
      onClick={(item) => {
        if (item.key === '3') {
          user.loginOut(() => {
            props.routing.push(item.item.props.path)
            notification.success({
              message: '注销成功',
            })
          })
        } else {
          props.routing.push(item.item.props.path)
        }
      }}
    >
      <Menu.Item key='1' path='/'>
        首页
      </Menu.Item>
      <SubMenu title='操作'>
        {!user.isLogin ? (
          <Menu.Item key='2' path='/login'>
            登录/注册
          </Menu.Item>
        ) : (
          <Menu.Item key='3' path='/login'>
            注销
          </Menu.Item>
        )}
      </SubMenu>
      <Menu.Item key='3' path='/about'>
        关于我
      </Menu.Item>
    </Menu>
  )
}

const UserStauts = ({ user }) => {
  if (!user.user) {
    return null
  }
  return (
    <div>
      {user.user.nickname}
      <Avatar
        scr={user.user.Avatar}
        style={{
          marginLeft: 10,
        }}
      />
    </div>
  )
}

const UserStautsWithInject = inject(['user'])(observer(UserStauts))

const BaseMenuWithInject = inject(stores => ({
  routing: stores.routing,
  user: stores.user,
}))(observer(BaseMenu))

const BaseLayout = ContentComponent => (props) => {
  return (
    <Layout className='layout'>
      <Header>
        <div className='logo' />
        <BaseMenuWithInject />
      </Header>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <Row>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <UserStautsWithInject />
        </Row>
        <ContentComponent {...props} />
        <DevTools />
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2016 Created by Ant UED</Footer>
    </Layout>
  )
}

export default BaseLayout
