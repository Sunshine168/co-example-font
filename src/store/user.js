/* @flow */
import { observable, action } from 'mobx'
import { post } from '../util/'

class User {
  @observable loginIning = false
  @observable registerIng = false
  @observable pwdVisible = false
  @observable isLogin = true

  @action.bound
  setPwdVisible() {
    this.pwdVisible = !this.pwdVisible
  }

  @action.bound
  async login(user, sucCb) {
    this.loginIning = true
    const result: Object = await post('/signIn', user)
    this.loginIning = false
    sucCb(result)
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
