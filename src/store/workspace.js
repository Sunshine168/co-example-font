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
  @observable checkingRoomNo
  @observable rooms = []
  @observable isLoadingCheckRoomInfo = false
  @observable isInitingHome = false
  @observable partnerInfo = []

  @action.bound
  setCreateModalVisible(visible) {
    this.createModalVisible = visible
  }

  @action.bound
  setAuditModalVisible(visible, roomNo) {
    this.auditModalVisible = visible
    this.checkingRoomNo = roomNo
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
      console.log(e)
    }
  }

  @action.bound
  async deleteRoom(roomNo, sucCb, cb) {
    try {
      const result = await post(`/workspace/deleteRoom/${roomNo}`)
      sucCb(result)
    } catch (e) {
      //
      console.log(e)
    } finally {
      cb()
    }
  }

  @action.bound
  async getPartnerInfo() {
    this.isLoadingCheckRoomInfo = true
    try {
      const { result } = await post(`/workspace/${this.checkingRoomNo}/partners`)
      console.log(result)
      this.partnerInfo = result
    } catch (e) {
      //
    } finally {
      this.isLoadingCheckRoomInfo = false
    }
  }

  @action.bound
  async quitRoom(roomNo, sucCb, cb) {
    try {
      const result = await post(`/workspace/${roomNo}/quitRoom`)
      sucCb(result)
    } catch (e) {
      //
      console.log(e)
    } finally {
      cb()
    }
  }

  @computed
  get roomsArray() {
    return this.rooms.slice()
  }

  @computed
  get partnersArray() {
    return this.partnerInfo.slice()
  }

  @computed
  get homeScreenLoading() {
    return this.isInitingHome || this.isLoadingCheckRoomInfo ? true : false
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
