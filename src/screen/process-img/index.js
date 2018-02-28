import React, { Component } from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import { Upload, ProcessImage } from './component'

const Container = styled.div`
  display: flex;
  flex-direction: row;
`
const ImgBlock = styled.div``

@inject(['processImg'])
@observer
export default class ProcessImg extends Component {
  componentDidMount() {
    const { initImgProcessWorkSpace } = this.props.processImage
    initImgProcessWorkSpace()
  }

  render() {
    const { workingImg } = this.props.processImage

    if (workingImg) {
      return <Upload />
    }

    return (
      <Container>
        <ProcessImage />
      </Container>
    )
  }
}
