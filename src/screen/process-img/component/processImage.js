import React, { Component } from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import ProcessImage from 'react-imgpro'

@inject(['imgProcess'])
@observer
export default class AdaptiveProcessImage extends Component {
  componentDidMount() {
    const { initImgProcessWorkSpace } = this.props
  }

  render() {
    const { workingImg, modeMap } = this.props.processImage
    return <ProcessImage image={workingImg} {...modeMap} />
  }
}
