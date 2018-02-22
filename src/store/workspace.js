/* @flow */
import { observable, action, computed } from 'mobx'
import { post } from '../util/'

class WorkSpace {
  @observable createModalVisible = false
  @observable createModalLoading = false
  @observable auditModalVisible = false
  @observable auditModalLoading = false
  @observable joinModalVisible = false
  @observable joinModalLoading = false
  @observable rooms = []

  @action.bound
  setCreateModalVisible(visible) {
    this.createModalVisible = visible
  }

  @action.bound
  setAuditModalVisible(visible) {
    this.auditModalVisible = visible
  }

  @action.bound
  setJoinModalVisible(visible) {
    this.joinModalVisible = visible
  }

  @action.bound
  async getAllRooms() {
    try {
      const result = await post('/workspace/info')
      this.rooms = result.rooms
    } catch (e) {}
  }

  @action.bound
  async createRoom(room, sucCb) {
    try {
      const result = await post('/workspace/createRoom', room)
      sucCb(result)
    } catch (e) {
      // err handle
    }
  }

  @action.bound
  async joinRoom(room, sucCb) {
    try {
      const result = await post('/workspace/joinRoom', room)
      sucCb(result)
    } catch (e) {
      //
    }
  }

  @computed
  get roomsArray() {
    return this.rooms.slice()
  }
}

export type IWorkSpace = {
  createModalVisible: boolean,
  createModalLoading: boolean,
  auditModalVisible: boolean,
  auditModalLoading: boolean,
}

const self: IWorkSpace = new WorkSpace()
export default self
