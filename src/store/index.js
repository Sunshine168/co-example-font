import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import { create } from 'mobx-persist'

import counter from './counter'
import user from './user'
import workspace from './workspace'
import chat from './chat'

const browserHistory = createBrowserHistory()
const routingStore = new RouterStore()

export const history = syncHistoryWithStore(browserHistory, routingStore)

const stores = {
  counter,
  user,
  chat,
  workspace,
  routing: routingStore,
}

export const hydrate = create()
hydrate('user', user).then(() => console.log('user hydrated'))

export default stores
