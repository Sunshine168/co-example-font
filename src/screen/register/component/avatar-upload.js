// @flow
import React from 'react'
import { inject, observer } from 'mobx-react'
import { observable } from 'mobx'
import { Button, Upload, message, Icon } from 'antd'

import styled from 'styled-components'

const AvatarPreview = styled.img`
  width: 100px;
  height: 100px;
`

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg'
  if (!isJPG) {
    message.error('You can only upload JPG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJPG && isLt2M
}

@observer
export default class AvatarUpload extends React.Component {
  @observable imageUrl = ''
  @observable loading = false
  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.loading = false
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        this.props.onChange(info.file.response.url)
        this.imageUrl = imageUrl
      })
    }
  }
  render() {
    const { loading, imageUrl } = this
    const uploadButton = (
      <div>
        <Icon type={loading ? 'loading' : 'plus'} />
        <div className='ant-upload-text'>Upload</div>
      </div>
    )

    return (
      <Upload
        name='avatar'
        listType='picture-card'
        className='avatar-uploader'
        showUploadList={false}
        action='/upload'
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <AvatarPreview src={imageUrl} alt='' /> : uploadButton}
      </Upload>
    )
  }
}
