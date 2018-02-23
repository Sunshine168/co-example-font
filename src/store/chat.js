/* @flow */
import { observable, action } from 'mobx'

class Chat {
  @observable chatingList: Array<Object> = []
  @observable chatingUserList: Array<Object> = []

  @action.bound
  addChatingRecord(record: Object) {
    this.chatingList.push(record)
  }

  @action.bound
  setChatingUserList(userList: Array<Object>) {
    this.chatingUserList = userList
  }
}

const self = new Chat()
export default self
