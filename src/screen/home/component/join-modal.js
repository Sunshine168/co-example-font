// @flow
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Modal, Button, Form } from 'antd'

import TextInput from '../../../component/input-component'
import { MobxForm, validator } from '../../../util'

const fields = [
  {
    name: 'roomNo',
    placeholder: '请输入房间号',
    label: '房间号',
    icon: 'codepen-circle',
    rules: 'required|number',
  },
]

type JoinModalProps = {
  visible: boolean,
  loading: boolean,
  setVisible(visible: boolean): void,
  form: Object,
}

@inject(stores => ({
  visible: stores.workspace.joinModalVisible,
  loading: stores.workspace.joinModalLoading,
  setVisible: stores.workspace.setJoinModalVisible,
}))
@observer
export default class JoinModal extends Component<JoinModalProps> {
  handleOk = (e) => {
    const { setVisible, form } = this.props
    form.onSubmit(e)
    setVisible(false)
  }

  handleCancel = () => {
    const { setVisible } = this.props
    setVisible(false)
  }

  render() {
    const { form, visible, loading } = this.props
    return (
      <Modal
        visible={visible}
        title='创建房间'
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button key='back' onClick={this.handleCancel}>
            取消
          </Button>,
          <Button key='submit' type='primary' loading={loading} onClick={this.handleOk}>
            确定
          </Button>,
        ]}
      >
        <p>请填写房间信息</p>
        <Form>
          <TextInput {...form.$('roomNo').bind()} />
        </Form>
      </Modal>
    )
  }
}

export const joinRoomForm = new MobxForm({ fields }, { dvr: validator })
