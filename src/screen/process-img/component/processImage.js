import React, { Component } from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import ProcessImage from 'react-imgpro'

@inject('imgProcess')
@observer
export default class AdaptiveProcessImage extends Component {
  render() {
    const { setWorkingBase64Img } = this.props.imgProcess
    return (
      <div>
        <ProcessImage
          image='http://365.unsplash.com/assets/paul-jarvis-9530891001e7f4ccfcef9f3d7a2afecd.jpg'
          storage={false}
          ref={element => (this.element = element)}
          processedImage={(state, err) => {
            setWorkingBase64Img(state)
          }}
        />
      </div>
    )
  }
}
