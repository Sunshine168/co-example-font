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
  render() {
    return (
      <div>
        <ProcessImage
          image='http://365.unsplash.com/assets/paul-jarvis-9530891001e7f4ccfcef9f3d7a2afecd.jpg'
          storage={false}
          // normalize={this.normalize}
        />
      </div>
    )
  }
}
