// @flow
import React, { Component } from 'react'
import styled from 'styled-components'

import { Avatar, List } from 'antd'

import { Container, Bubble } from '../../component/base-style-component'

const { Item } = List

const testData = [
  {
    id: 1,
    type: 1,
    msgFrom: 0,
    context: '1231231231231231231231231231231231231231231231231231231231231231231231233123131312',
    status: 'success',
  },
  {
    id: 2,
    type: 1,
    msgFrom: 0,
    context: '123',
    status: 'success',
  },
  {
    id: 3,
    type: 1,
    msgFrom: 0,
    context: '123',
    status: 'success',
  },
]

const UserListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`

const ChatingListWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`

export default class Chat extends Component<*> {
  constructor(props) {
    super(props)
    this.renderChatItem = this.renderChatItem.bind(this)
  }

  renderChatItem(rowData: Object, sectionID: number, rowID: number) {
    const { context, msgFrom } = rowData
    return (
      <Item>
        <Bubble className={msgFrom === 1 ? 'bubble_right' : 'bubble_left'}>{context}</Bubble>
      </Item>
    )
  }
  render() {
    return (
      <Container>
        <UserListWrapper>
          <Avatar icon='user' />
          <Avatar>U</Avatar>
          <Avatar>USER</Avatar>
          <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
          <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>
          <Avatar style={{ backgroundColor: '#87d068' }} icon='user' />
        </UserListWrapper>
        <ChatingListWrapper>
          <List itemLayout='vertical' dataSource={testData} renderItem={this.renderChatItem} />
        </ChatingListWrapper>
      </Container>
    )
  }
}
