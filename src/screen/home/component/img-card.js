import React from 'react'
import { Card, Icon, Avatar } from 'antd'

const { Meta } = Card

const ImgCard = (props) => {
  const {
    img, author, title, description, id,
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
