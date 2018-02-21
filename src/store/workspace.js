/* @flow */
import { observable, action } from 'mobx'
import { post } from '../util/'

class WorkSpace {
  @observable createModalVisible = false
  @observable createModalLoading = false
  @observable auditModalVisible = false
  @observable auditModalLoading = false
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
  async getAllRooms() {
    const result = await post('/workspace/info')
    console.log(result)
  }

  @action.bound
  async createRoom(room) {
    const result = await post('/workspace/createRoom', room)
    console.log(result)
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
