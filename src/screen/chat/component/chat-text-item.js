import React from 'react'
import { Avatar } from 'antd'
import { Bubble } from '../../../component/base-style-component'

const BubbleComponent = ({
  children, bgColor, className, author,
}) => {
  const { avatar } = author
  return (
    <Bubble className={className}>
      <a className='avatar'>{avatar ? <img src={avatar} /> : <Avatar icon='user' />}</a>
      <div className='wrap'>
        <div className='content'>{children}</div>
      </div>
    </Bubble>
  )
}

export default BubbleComponent
