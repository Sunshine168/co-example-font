import React, { Component } from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import ProcessImage from 'react-imgpro'
import { Button } from 'antd'
import { map2Object } from '../../../util'
import { Upload } from './'
import { observable } from 'mobx'

// @inject('imgProcess')
// @observer
export default class AdaptiveProcessImage extends Component {
  process = (map) => {
    return map2Object(map)
  }

  state = {
    greyscale: true,
    normalize: false,
  }

  render() {
    // const { workingImg, modeMap } = this.props.imgProcess
    // const modeConfig = this.process(modeMap)
    // console.log(modeConfig)
    console.log(this.state.greyscale)
    return (
      <div>
        <ProcessImage
          image='http://365.unsplash.com/assets/paul-jarvis-9530891001e7f4ccfcef9f3d7a2afecd.jpg'
          greyscale={this.state.greyscale}
          storage={false}
          // normalize={this.normalize}
        />
        <Button
          onClick={() => {
            // this.greyscale = !this.greyscale
            this.setState({
              greyscale: !this.state.greyscale,
            })
          }}
        >
          greyscale
        </Button>
        <Button
          onClick={() => {
            // this.normalize = !this.normalize
          }}
        >
          normalize
        </Button>
      </div>
    )
  }
}
