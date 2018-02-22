/* @flow */
import { observable, action } from 'mobx'
import { persist } from 'mobx-persist'
import { post } from '../util/'

class User {
  @observable loginIning = false
  @observable registerIng = false
  @observable pwdVisible = false
  @persist
  @observable
  isLogin = false
  @persist('object')
  @observable
  user = null

  @action.bound
  setPwdVisible() {
    this.pwdVisible = !this.pwdVisible
  }

  @action.bound
  async login(user, sucCb) {
    this.loginIning = true
    const result: Object = await post('/signIn', user)
    if (result) {
      this.setUser(result)
      this.loginIning = false
      sucCb(result)
    }
  }

  @action.bound
  setUser(user) {
    this.user = user
    this.isLogin = true
  }

  @action.bound
  clearUser() {
    this.user = null
    this.isLogin = false
  }

  @action.bound
  async loginOut(sucCb) {
    try {
      await post('/signOut')
      sucCb()
    } catch (e) {
      //
    } finally {
      this.clearUser()
    }
  }

  @action.bound
  async register(user, sucCb) {
    this.registerIng = true
    const result: Object = await post('/signUp', user)
    this.registerIng = false
    sucCb(result)
  }
}

export type IUser = {
  loginIning: boolean,
  pwdVisible: boolean,
  isLogin: boolean,
  setPwdVisible(): void,
  login(user: Object, sucCb: (res: Object) => void): Promise<*>,
}

const self: IUser = new User()

export default self
