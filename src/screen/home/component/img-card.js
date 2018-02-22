// @flow
import React from 'react'
import { Card, Icon, Avatar } from 'antd'

const { Meta } = Card

type ImgCardProps = {
  img: ?string,
  author: Object,
  title: string,
  description: string,
}

const ImgCard = (props: ImgCardProps) => {
  const {
    img, author, title, description,
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
      actions={[<Icon type='setting' />, <Icon type='edit' />, <Icon type='delete' />]}
    >
      <Meta avatar={<Avatar src={author.avatar} />} title={title} description={description} />
    </Card>
  )
}

export default ImgCard
