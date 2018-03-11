// @flow
import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { Upload, message, Icon } from 'antd'
import styled from 'styled-components'
import { Text } from '../base-style-component'
import Cookies from 'js-cookie'

const csrftoken = Cookies.get('csrfToken')

const ImgPreview = styled.img`
  width: 100px;
  height: 100px;
`

const errorTips = Text.extend`
  color: #f4ie28;
`

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

function beforeUpload(file) {
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isLt2M
}

type ImgUploadProp = {
  onChange(fileBase64): void,
  error: ?boolean | string,
  help: ?string,
}

@observer
export default class ImgUpload extends React.Component<ImgUploadProp> {
  @observable imageUrl = ''
  @observable loading = false
  handleChange = (info: Object) => {
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
    const { error, help } = this.props
    const uploadButton = (
      <div>
        <Icon type={loading ? 'loading' : 'plus'} />
        <div className='ant-upload-text'>Upload</div>
      </div>
    )

    return (
      <div>
        <Upload
          headers={{
            'x-csrf-token': csrftoken,
          }}
          name='avatar'
          listType='picture-card'
          className='avatar-uploader'
          showUploadList={false}
          action='/upload'
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
        >
          {imageUrl ? <ImgPreview src={imageUrl} alt='' /> : uploadButton}
        </Upload>
        {error ? <errorTips>{help}</errorTips> : null}
      </div>
    )
  }
}
