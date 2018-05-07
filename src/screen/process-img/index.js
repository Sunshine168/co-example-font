// @flow
import * as React from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import { Upload, ProcessImage, ProcessImageUtilPanel } from './component'
import type { IImgProcess } from '../../store/imgProcess'

const Container = styled.div`
  padding: 20px 0 0 30px;
  display: flex;
  flex-direction: row;
`

type imgProcessProps = {
  imgProcess: IImgProcess,
  sendImg(img: string): void,
}

@inject('imgProcess')
@observer
export default class imgProcess extends React.Component<void, imgProcessProps, *> {
  componentDidMount() {
    const { initImgProcessWorkSpace } = this.props.imgProcess
    initImgProcessWorkSpace()
  }

  render() {
    console.log(this.props.imgProcess)
    const { workingImg } = this.props.imgProcess

    const { sendImg } = this.props

    // if (!workingImg) {
    //   return <Upload />
    // }

    return (
      <Container>
        <ProcessImage />
        <ProcessImageUtilPanel sendImg={sendImg} />
      </Container>
    )
  }
}
