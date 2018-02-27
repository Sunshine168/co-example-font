// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { Breadcrumb } from 'antd'

import Chat from '../chat'
import { UserStauts } from '../../component/'

const CustomContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

type WorkSpaceProps = {
  computedMatch: Object,
}

export default class Workspace extends Component<WorkSpaceProps> {
  render() {
    const { roomNo } = this.props.computedMatch.params
    return (
      <div>
        <Row>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>{`房间：${roomNo}`}</Breadcrumb.Item>
          </Breadcrumb>
          <UserStauts />
        </Row>
        <CustomContainer>
          <Chat roomNo={roomNo} />
        </CustomContainer>
      </div>
    )
  }
}
