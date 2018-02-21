/* @flow */
import { observable, action } from 'mobx'
import { post } from '../util/'

class WorkSpace {
  @observable createModalVisible = false
  @observable createModalLoading = false
  @observable auditModalVisible = false
  @observable auditModalLoading = false

  @action.bound
  setCreateModalVisible(visible) {
    this.createModalVisible = visible
  }

  @action.bound
  setAuditModalVisible(visible) {
    this.auditModalVisible = visible
  }

  @action.bound
  async getAllRooms() {}
}

export type IWorkSpace = {
  createModalVisible: boolean,
  createModalLoading: boolean,
  auditModalVisible: boolean,
  auditModalLoading: boolean,
}

const self: IWorkSpace = new WorkSpace()
export default self
