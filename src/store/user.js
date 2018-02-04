/* @flow */
import { observable, action } from 'mobx'

class User {
  @observable loading: boolean = false
  @observable isAutoLogin: boolean = false
  @observable pwdVisible: boolean = false
  @observable personInfoEditable: boolean = false
  @observable isLogin: boolean = true

  @action.bound
  async loginIn() {
    this.loading = true
  }

  @action.bound
  setAutoLogin() {
    this.isAutoLogin = !this.isAutoLogin
  }

  @action.bound
  setPwdVisible() {
    this.pwdVisible = !this.pwdVisible
  }

  @action.bound
  setPersonInfoEditable() {
    this.personInfoEditable = !this.personInfoEditable
  }
}

const self = new User()
export default self
