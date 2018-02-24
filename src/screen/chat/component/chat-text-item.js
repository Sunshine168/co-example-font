import React from 'react'
import { Bubble } from '../../../component/base-style-component'

const BubbleComponent = ({
  children, bgColor, className, author,
}) => {
  const { avatar } = author
  return (
    <Bubble className={className}>
      <a className='avatar'>
        <img src={avatar} />
      </a>
      <div className='wrap'>
        <div className='content'>{children}</div>
      </div>
    </Bubble>
  )
}

export default BubbleComponent
