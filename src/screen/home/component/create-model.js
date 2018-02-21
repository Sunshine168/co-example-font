import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Modal, Button, Form } from 'antd'

import TextInput, { SelectInput, ImgUpload } from '../../../component/input-component'
import { MobxForm, validator } from '../../../util'

const fields = [
  {
    name: 'name',
    placeholder: '请输入房间名',
    label: '房间名',
    icon: 'codepen-circle',
    rules: 'required|email|string',
    size: 15,
  },
  {
    name: 'img',
    label: '初始化协作图片',
    placeholder: '请上传初始协作图片',
    rules: 'string|between:5,25',
  },
  {
    name: 'permission',
    label: '房间权限',
    placeholder: '请设置房间权限',
    rules: 'required|number',
    default: true,
    initial: 0,
    options: [
      {
        value: 0,
        label: '公开房间',
      },
      {
        value: 1,
        label: '限制房间',
      },
    ],
  },
]

@observer
export default class CreateModel extends Component {
  render() {
    const { form } = this.props
    return (
      <Modal
        visible={this.visible}
        title='Title'
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button key='back' onClick={this.handleCancel}>
            Return
          </Button>,
          <Button key='submit' type='primary' loading={this.loading} onClick={this.handleOk}>
            Submit
          </Button>,
        ]}
      >
        <p>Some contents...</p>
        <Form>
          <TextInput {...form.$('name').bind()} />
          <ImgUpload {...form.$('img').bind()} />
          <SelectInput {...form.$('permission').bind()} />
        </Form>
      </Modal>
    )
  }
}

export const createRoomForm = new MobxForm({ fields }, { dvr: validator })
