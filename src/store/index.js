import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import createBrowserHistory from 'history/createBrowserHistory'

import counter from './counter'
import user from './user'
import workspace from './workspace'

const browserHistory = createBrowserHistory()
const routingStore = new RouterStore()

export const history = syncHistoryWithStore(browserHistory, routingStore)

const stores = {
  counter,
  user,
  workspace,
  routing: routingStore,
}

export default stores
