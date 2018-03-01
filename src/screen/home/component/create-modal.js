// @flow
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Modal, Button, Form } from 'antd'

import TextInput, { SelectInput, ImgUpload } from '../../../component/input-component'
import { MobxForm, validator } from '../../../util'

const fields = [
  {
    name: 'name',
    placeholder: '请输入房间名',
    label: '房间名',
    icon: 'codepen-circle',
    rules: 'required',
    size: 15,
  },
  {
    name: 'img',
    label: '初始化协作图片',
    placeholder: '请上传初始协作图片',
    rules: 'string|between:5,25',
  },
  {
    name: 'permissions',
    label: '房间权限',
    placeholder: '请设置房间权限',
    rules: 'required',
    default: true,
    initial: '0',
    extra: [
      {
        value: '0',
        label: '公开房间',
      },
      {
        value: '1',
        label: '限制房间',
      },
    ],
  },
]

type CreateModalProps = {
  visible: boolean,
  loading: boolean,
  setVisible(visible: boolean): void,
  form: Object,
}

@inject(stores => ({
  visible: stores.workspace.createModalVisible,
  loading: stores.workspace.createModalLoading,
  setVisible: stores.workspace.setCreateModalVisible,
}))
@observer
export default class CreateModal extends Component<CreateModalProps> {
  handleOk = (e) => {
    const { setVisible, form } = this.props
    form.onSubmit(e)
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
          <TextInput
            {...form.$('name').bind()}
            error={form.errors().name}
            help={form.errors().name ? form.errors().name : ''}
          />
          <ImgUpload {...form.$('img').bind()} />
          <SelectInput {...form.$('permissions').bind()} options={form.$('permissions').extra} />
        </Form>
      </Modal>
    )
  }
}

export const createRoomForm = new MobxForm({ fields }, { plugins: { dvr: validator } })
