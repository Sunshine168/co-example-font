// @flow
import React from 'react'
import { Card, Icon, Avatar } from 'antd'
import { Link } from 'react-router-dom'

const { Meta } = Card

type ImgCardProps = {
  img: ?string,
  author: Object,
  title: string,
  description: string,
  deleteAction(): void,
  settingAction(): void,
  roomNo: string,
}

const ImgCard = (props: ImgCardProps) => {
  const {
    roomNo, img, author, title, description, deleteAction, settingAction, isOwner,
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
        <span onClick={settingAction}>
          <Icon type='setting' />
        </span>,
        <Link to={`/workspace/${roomNo}`}>
          <Icon type='edit' />
        </Link>,
        <span onClick={deleteAction}>
          <Icon type={`${isOwner ? 'delete' : 'close'}`} />
        </span>,
      ]}
    >
      <Meta avatar={<Avatar src={author.avatar} />} title={title} description={description} />
    </Card>
  )
}

export default ImgCard
