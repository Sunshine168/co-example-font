// @flow
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Modal, Button, Table } from 'antd'

import post from '../../../util/fetch'

const { Column } = Table

type AuditModalProps = {
  visible: boolean,
  setVisible(visible: boolean): void,
  partnersArray: Array<Object>,
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

  uploadJoinStatus = async (user_id, queryRoom, status) => {
    try {
      await post('/workspace/updatePartnerStatus', {
        user_id,
        queryRoom,
        status,
      })
      this.props.getPartnerInfo()
    } catch (e) {
      //
    }
  }

  render() {
    const { visible, partnersArray } = this.props
    return (
      <Modal
        visible={visible}
        title='管理房间'
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
        <Table dataSource={partnersArray} pagination={false} bordered rowKey={record => record._id}>
          <Column title='账号名' dataIndex='account' key='account' />
          <Column title='用户昵称' dataIndex='nickname' key='nickname' />
          <Column
            className='center_column'
            title='操作'
            key='action'
            render={(text, record) => {
              if (record.status === 0) {
                return (
                  <div>
                    <Button
                      type='primary'
                      style={{ marginRight: 15 }}
                      onClick={() => {
                        this.uploadJoinStatus(record._id, record.roomNo, 1)
                      }}
                    >
                      允许
                    </Button>
                    <Button
                      type='danger'
                      onClick={() => {
                        this.uploadJoinStatus(record._id, record.roomNo, 2)
                      }}
                    >
                      拒绝
                    </Button>
                  </div>
                )
              }
              return (
                <Button
                  type='danger'
                  onClick={() => {
                    this.uploadJoinStatus(record._id, record.roomNo, -1)
                  }}
                >
                  移除
                </Button>
              )
            }}
          />
        </Table>
      </Modal>
    )
  }
}
