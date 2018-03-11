// @flow
import * as React from 'react'
import DevTools from 'mobx-react-devtools'
import { Layout, Menu, notification } from 'antd'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'

const isDev = process.env.NODE_ENV === 'development' ? true : false

const { Header, Content, Footer } = Layout

const { SubMenu } = Menu

type BaseMenuProps = {
  history: Object,
  user: Object,
}

// Waiting fix menu state
const BaseMenu = (props: BaseMenuProps) => {
  const { user } = props
  return (
    <Menu
      theme='dark'
      mode='horizontal'
      defaultSelectedKeys={['1']}
      style={{ lineHeight: '64px' }}
      onClick={(item) => {
        if (item.key === '3') {
          user.loginOut(() => {
            props.history.push(item.item.props.path)
            notification.success({
              message: '注销成功',
            })
          })
        } else {
          props.history.push(item.item.props.path)
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
      <Menu.Item key='4' path='/about'>
        关于我
      </Menu.Item>
    </Menu>
  )
}

const BaseMenuWithInject = withRouter(inject(stores => ({
  user: stores.user,
}))(observer(BaseMenu)))

const BaseLayout = (ContentComponent: React.ComponentType<any>) => (props: Object) => {
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
        <ContentComponent {...props} />
        {isDev ? <DevTools /> : null}
      </Content>
      <Footer style={{ textAlign: 'center' }}>Simple Co example</Footer>
    </Layout>
  )
}

export default BaseLayout
