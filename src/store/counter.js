/* @flow */
import { observable, action } from 'mobx'

class Counter {
  @observable count: number = 0

  @action
  increase: () => void = () => {
    this.count += 1
  }
  @action
  decrease: () => void = () => {
    this.count -= 1
  }
}

const self = new Counter()
export default self
