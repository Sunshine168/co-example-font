import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import createBrowserHistory from 'history/createBrowserHistory'

import counter from './counter'
import user from './user'
import workspace from './workspace'
import chat from './chat'
import imgProcess from './imgProcess'

const stores = {
  counter,
  user,
  chat,
  imgProcess,
  workspace,
}

export default stores
