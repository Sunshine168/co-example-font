import React from 'react'
import { Upload, Icon } from 'antd'
import { observer, inject } from 'mobx-react'

function getBase64(img) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result))
    reader.readAsDataURL(img)
  })
}

@inject(['imgProcess'])
@observer
export default class UploadHelper extends React.Component {
  handleChange = (info) => {
    const { imgProcess } = this.props
    if (info.file.status === 'uploading') {
      imgProcess.setUploading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        imgProcess.setUploading(false)
        imgProcess.setWorkingImg(true)
      })
    }
  }

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className='ant-upload-text'>Upload</div>
      </div>
    )
    const { workingImg } = this.props.imgProcess
    return (
      <Upload
        name='avatar'
        listType='picture-card'
        className='avatar-uploader'
        showUploadList={false}
        // action='//jsonplaceholder.typicode.com/posts/'
        // beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {workingImg ? <img src={workingImg} alt='' /> : uploadButton}
      </Upload>
    )
  }
}
