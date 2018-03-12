import React, { Component } from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import ProcessImage from '../../../component/react-imgpro'
import map2object from '../../../util/map2object'
import getProcessOptions from '../util/getProcessOptions'

/*
* waiting the Pr review,import lib in local, before react-imgpro new version published
* https://github.com/nitin42/react-imgpro/pull/10
*/

@inject('imgProcess')
@observer
export default class AdaptiveProcessImage extends Component {
  render() {
    const { setWorkingBase64Img, modeMap, workingImg } = this.props.imgProcess
    const modeSetting = map2object(modeMap)
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
