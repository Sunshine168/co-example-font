// @flow
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Modal, Button, Table } from 'antd'

const { Column } = Table

type AuditModalProps = {
  visible: boolean,
  setVisible(visible: boolean): void,
  getPartnerInfo(): void,
}

@inject(stores => ({
  visible: stores.workspace.auditModalVisible,
  setVisible: stores.workspace.setAuditModalVisible,
  getPartnerInfo: stores.workspace.getPartnerInfo,
  partnersArray: stores.workspace.partnersArray,
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
    const { visible, partnersArray } = this.props
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
        <Table dataSource={partnersArray} pagination={false} bordered>
          <Column title='账号名' dataIndex='account' key='account' />
          <Column title='用户昵称' dataIndex='nickname' key='nickname' />
          <Column
            className='center_column'
            title='操作'
            key='action'
            render={(text, record) => {
              if (record.stauts === 0) {
                return (
                  <div>
                    <Button type='primary' style={{ marginRight: 15 }}>
                      允许
                    </Button>
                    <Button type='danger'>拒绝</Button>
                  </div>
                )
              }
              return null
            }}
          />
        </Table>
      </Modal>
    )
  }
}
