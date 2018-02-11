import React from 'react'
import { Card, Icon, Avatar } from 'antd'

const { Meta } = Card

const ImgCard = (props) => {
  const {
    img, author, title, description,
  } = props
  return (
    <Card
      style={{ width: 300 }}
      cover={<img alt='example' src={img} />}
      actions={[<Icon type='setting' />, <Icon type='edit' />, <Icon type='ellipsis' />]}
    >
      <Meta avatar={<Avatar src={author.avatar} />} title={title} description={description} />
    </Card>
  )
}

export default ImgCard
