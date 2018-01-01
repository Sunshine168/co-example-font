import React, { Component } from 'react'
import { Provider } from 'mobx-react'
import 'antd-mobile/dist/antd-mobile.css'

import { injectGlobal, ThemeProvider } from 'styled-components'

import Router from './router'
import stores from './store'

/* eslint-disable no-unused-expressions */
injectGlobal`
 *{
   margin:0;
   padding:0;
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
          <Router />
        </ThemeProvider>
      </Provider>
    )
  }
}
