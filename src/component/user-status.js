// @flow
import React from 'react'
import { observer, inject } from 'mobx-react'
import { Avatar } from 'antd'

type UserStautsProps = {
  user: Object,
}

const UserStauts = ({ user }: UserStautsProps) => {
  if (!user.user) {
    return null
  }
  return (
    <div>
      {user.user.nickname}
      <Avatar
        src={user.user.avatar}
        style={{
          marginLeft: 10,
        }}
      />
    </div>
  )
}

const UserStautsWithInject = inject(['user'])(observer(UserStauts))

export default UserStautsWithInject
