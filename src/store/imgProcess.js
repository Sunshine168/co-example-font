/* @flow */
import { observable, action, toJS } from 'mobx'
import config from '../screen/process-img/config'

export type IImgProcess = {
  workingImg: stirng,
  uploadingImg: boolean,
  lastActionTime: number,
  modeMap: Map<string, boolean>,
  quality: number,
  brightness: number,
  flip: Map<string, number>,
  opacity: number,
  fade: number,
  blur: number,
  posterize: number,
  size: Map<string, string | number>,
  sendingBase64: boolean,
  processingStatus: boolean,
  workingBase64Img: string,
  isSyncingImg: boolean,
  changeSyncStatus(status: boolean): void,
  setWorkingBase64Img(img: string): void,
  setProcessStatus(status: boolean): void,
  setWorkingImg(img: string): void,
  setUploadingImg(img: string): void,
  initImgProcessWorkSpace(): void,
  switchMode(modeName: string, value: boolean): void,
  qualityChange(value: number): void,
  fadeChange(value: number): void,
  changeFlip(flipKey: string, value: number | string): void,
  blurChange(value: string): void,
  posterizeChange(value: string): void,
  sizeChange(value: string): void,
}

class ImgProcess {
  @observable workingImg = ''
  @observable uploadingImg = false
  @observable lastActionTime
  @observable modeMap = new Map()
  @observable quality = 100
  @observable brightness
  @observable flip = new Map()
  @observable opacity = 1
  @observable fade = 0
  @observable blur = 0
  @observable posterize = 100
  @observable size = new Map()
  @observable sendingBase64
  @observable processingStatus = false
  @observable workingBase64Img
  @observable isSyncingImg = false

  @action.bound
  changeSyncStatus(status) {
    this.isSyncingImg = status
  }

  @action.bound
  setWorkingBase64Img(img) {
    this.workingBase64Img = img
  }

  @action.bound
  setProcessStatus(status) {
    this.processingStatus = status
  }

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
    // init mode
    mode.forEach((item) => {
      if (!this.modeMap.has(item)) {
        this.modeMap.set(item, false)
      }
    })
    // init size
    this.size.set('width', 500)
    this.size.set('height', 500)
    this.size.set('mode', 'bicubic')
  }

  @action.bound
  switchMode(modeName, value) {
    this.modeMap.set(modeName, value)
  }

  @action.bound
  qualityChange(value) {
    this.quality = value
  }

  @action.bound
  opacityChange(value) {
    this.opacity = value
  }

  @action.bound
  fadeChange(value) {
    this.fade = value
  }

  @action.bound
  changeFlip(flipKey, value) {
    this.modeMap.set(flipKey, value)
  }

  @action.bound
  blurChange(value) {
    this.blur = value
  }

  @action.bound
  posterizeChange(value) {
    this.posterize = value
  }

  @action.bound
  sizeChange(key, value) {
    this.size.set(key, value)
  }

  @action.bound
  getAllOptions() {
    return {
      mode: [...toJS(this.modeMap)],
      size: [...toJS(this.size)],
      switchOption: {
        quality: this.quality,
        opacity: this.opacity,
        fade: this.fade,
        blur: this.blur,
        posterize: this.posterize,
      },
    }
  }
}

const self: IImgProcess = new ImgProcess()
export default self
