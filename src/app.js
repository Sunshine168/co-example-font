import React, { Component } from 'react'
import { Provider } from 'mobx-react'
import { injectGlobal, ThemeProvider } from 'styled-components'
import { Router } from 'react-router'
import 'antd/dist/antd.css'

import Routes from './router'
import stores, { history } from './store'

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
  render() {
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
