/* @flow */
import { observable, action } from 'mobx'

class Chat {
  @observable chatingListMap: Map<string, Array<Object>> = new Map()
  @observable chatingUserListMap: Map<string, Array<Object>> = new Map()
  @observable isSendingMediaMessage: boolean = false

  @action.bound
  initRoom(roomNo: string) {
    this.chatingListMap.set(roomNo, [])
    this.chatingUserListMap.set(roomNo, [])
  }

  @action.bound
  checkRoom(roomNo: string) {
    if (!this.chatingListMap.has(roomNo)) {
      this.initRoom(roomNo)
    }
  }

  @action.bound
  addChatingRecord(roomNo: string, record: Object) {
    this.checkRoom(roomNo)
    const chatingArray = this.chatingListMap.get(roomNo)
    chatingArray.push(record)
  }

  @action.bound
  setChatingUserList(roomNo: string, userList: Array<Object>) {
    this.checkRoom(roomNo)
    this.chatingUserListMap.set(roomNo, userList)
  }
}

const self = new Chat()
export default self
