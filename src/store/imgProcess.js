/* @flow */
import { observable, action } from 'mobx'
import config from '../screen/process-img/config'

class ImgProcess {
  @observable workingImg
  @observable uploadingImg = false
  @observable lastActionTime
  @observable modeMap = {}

  @action.bound
  setWorkingImg(img) {
    this.workingImg = img
  }

  @action.bound
  setUploadingImg(loading) {
    this.uploadingImg = loading
  }

  @action.bound
  initImgProcessWorkSpace() {
    const { mode } = config
    mode.forEach((item) => {
      if (!this.modeMap(item)) {
        this.modeMap[item] = false
      }
    })
  }

  @action.bound
  switchMode(modeName, value) {
    this.modeMap[modeName] = value
  }
}

const self = new ImgProcess()
export default self
