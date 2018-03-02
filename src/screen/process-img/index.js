import React, { Component } from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import { Upload, ProcessImage, ProcessImageUtilPanel } from './component'

const Container = styled.div`
  display: flex;
  flex-direction: row;
`
const ImgBlock = styled.div``

@inject('imgProcess')
@observer
export default class imgProcess extends Component {
  componentDidMount() {
    const { initImgProcessWorkSpace } = this.props.imgProcess
    initImgProcessWorkSpace()
  }

  render() {
    const { workingImg } = this.props.imgProcess

    if (!workingImg) {
      return <Upload />
    }

    return (
      <Container>
        <ProcessImage />
        <ProcessImageUtilPanel />
      </Container>
    )
  }
}
