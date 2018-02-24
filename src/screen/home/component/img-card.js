// @flow
import React from 'react'
import { Card, Icon, Avatar } from 'antd'

const { Meta } = Card

type ImgCardProps = {
  img: ?string,
  author: Object,
  title: string,
  description: string,
  deleteAction(): void,
  enterAction(): void,
}

const ImgCard = (props: ImgCardProps) => {
  const {
    img, author, title, description, deleteAction, enterAction,
  } = props
  return (
    <Card
      style={{ width: 250 }}
      cover={
        <img
          alt='example'
          src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
        />
      }
      actions={[
        <Icon type='setting' />,
        <span onClick={enterAction}>
          <Icon type='edit' />
        </span>,
        <span onClick={deleteAction}>
          <Icon type='delete' />
        </span>,
      ]}
    >
      <Meta avatar={<Avatar src={author.avatar} />} title={title} description={description} />
    </Card>
  )
}

export default ImgCard
