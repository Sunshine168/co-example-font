// @flow
import * as React from 'react'
import { Form, Input } from 'antd'

import Select from './select'

const FormItem = Form.Item

type InputWithErrorProps = {
  error: string,
  value: ?string,
  onChange: (SyntheticInputEvent<>) => void,
  editable: ?boolean,
  onErrorClick: ?(SyntheticInputEvent<>) => void,
  icon: ?string,
  size: ?number,
  label: ?string,
  help: ?string,
  validating: ?boolean,
  validateStatus: ?string,
  layout: ?'horizontal' | 'vertical' | 'inline',
}

const TextInput = (props: InputWithErrorProps) => {
  const {
    error,
    onErrorClick,
    icon,
    label,
    layout,
    validating,
    help,
    validateStatus,
    ...otherProps
  } = props
  return (
    <FormItem
      label={label}
      help={help}
      layout={layout}
      formItemLayout={layout}
      validateStatus={
        validateStatus ? validateStatus : validating ? 'validating' : error ? 'error' : ''
      }
    >
      <Input {...otherProps} />
    </FormItem>
  )
}

export const AutoInput = ({ type, ...props }) => {
  if (!type || type === 'textInput') {
    return <TextInput {...props} />
  }
  if (type === 'selectInput') {
    return <Select {...props} />
  }
  return null
}

export const SelectInput = Select
export { default as ImgUpload } from './img-upload'
export default TextInput
