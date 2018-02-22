/* @flow */
import { observable, action } from 'mobx'

class Chat {
  @observable chatingList: Array<Object> = []

  @action
  addChatingRecord(record) {
    this.chatingList.push(record)
  }
}

const self = new Chat()
export default self
