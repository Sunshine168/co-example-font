import React, { Component } from 'react'
import styled from 'styled-components'

import Chat from '../chat'

const CustomContainer = styled.div`
  display: flex;
  flex-direction: row;
`

export default class Workspace extends Component {
  render() {
    return (
      <CustomContainer>
        <Chat />
      </CustomContainer>
    )
  }
}
