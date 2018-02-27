// @flow
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Modal, Button, Table } from 'antd'

const { Column } = Table

const data = []

const mockData = (count) => {
  for (let i = 0; i < count; i++) {
    data.push({
      account: `${i}`,
      nickname: `${i}`,
      status: 0,
      key: `${i}`,
    })
  }
}

mockData(5)

type AuditModalProps = {
  visible: boolean,
  setVisible(visible: boolean): void,
  getPartnerInfo(): void,
}

@inject(stores => ({
  visible: stores.workspace.auditModalVisible,
  setVisible: stores.workspace.setAuditModalVisible,
  getPartnerInfo: stores.workspace.getPartnerInfo,
  isLoading: stores.workspace.isLoadingCheckRoomInfo,
}))
@observer
export default class AuditModal extends Component<AuditModalProps> {
  handleOk = () => {
    const { setVisible } = this.props
    setVisible(false)
  }

  handleCancel = () => {
    const { setVisible } = this.props
    setVisible(false)
  }

  render() {
    const { visible } = this.props
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
          <Button key='submit' type='primary' onClick={this.handleOk}>
            确定
          </Button>,
        ]}
      >
        <Table dataSource={data} pagination={false} bordered>
          <Column title='账号名' dataIndex='account' key='account' />
          <Column title='用户昵称' dataIndex='ninckname' key='nickname' />
          <Column
            className='center_column'
            title='操作'
            key='action'
            render={(text, record) => (
              <div>
                <Button type='primary' style={{ marginRight: 15 }}>
                  允许
                </Button>
                <Button type='danger'>拒绝</Button>
              </div>
            )}
          />
        </Table>
      </Modal>
    )
  }
}
