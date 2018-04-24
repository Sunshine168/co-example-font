// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import ProcessImage from 'react-imgpro'
import getProcessOptions from '../util/getProcessOptions'
import { type IImgProcess } from '../../../store/imgProcess'

type AdaptiveProcessImageProps = {
  imgProcess: IImgProcess,
}

@inject('imgProcess')
@observer
export default class AdaptiveProcessImage extends Component<AdaptiveProcessImageProps> {
  render() {
    const { setWorkingBase64Img, modeMap, workingImg } = this.props.imgProcess
    const modeSetting = toJS(modeMap)
    const processOptions = getProcessOptions(this.props.imgProcess)
    return (
      <div>
        <ProcessImage
          image='http://365.unsplash.com/assets/paul-jarvis-9530891001e7f4ccfcef9f3d7a2afecd.jpg'
          storage={false}
          ref={element => (this.element = element)}
          processedImage={(state, err) => {
            setWorkingBase64Img(state)
          }}
          {...modeSetting}
          {...processOptions}
        />
      </div>
    )
  }
}
