import React, { Component } from 'react'
import { Provider } from 'mobx-react'
import { injectGlobal, ThemeProvider } from 'styled-components'
import { Router } from 'react-router'
import { Spin, Alert } from 'antd'
import 'antd/dist/antd.css'
import { create } from 'mobx-persist'

import Routes from './router'
import stores, { history } from './store'
import { emitter } from './util/'

/* eslint-disable no-unused-expressions */
injectGlobal`
 *{
   margin:0;
   padding:0;
 }
 html,body,#app{
   /* overflow:hidden; */
   background-color:#f0f2f5;
 }
 html,body,#app,.layout.ant-layout {
   height:100vh;
 }
 ::-webkit-scrollbar{
    display: none
}
 .layout.ant-layout{
   position:relative;
 }
 .avatar-uploader{
   margin:0 auto;
 }
`

const theme = {
  color: '#ffa12f',
}

export default class App extends Component {
  state = {
    loading: true,
  }
  componentDidMount = () => {
    const hydrate = create()
    const result = hydrate('co-user', stores.user)
    const { rehydrate } = result
    rehydrate().then(() => {
      this.setState({
        loading: false,
      })
    })

    emitter.on('USER_IS_INVALID', () => {
      stores.user.loginOut(() => {})
      stores.routing.push('/login')
    })
  }

  render() {
    if (this.state.loading) {
      return (
        <Spin tip='Loading...'>
          <Alert message='loading' description='wait ...' type='info' />
        </Spin>
      )
    }
    return (
      <Provider {...stores}>
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <Routes />
          </Router>
        </ThemeProvider>
      </Provider>
    )
  }
}
