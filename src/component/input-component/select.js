// @flow
import * as React from 'react'
import { Select } from 'antd'

const { Option } = Select

type CustomSelectProps = {
  value: [],
  options: [],
  onChange: (SyntheticInputEvent<>) => void,
}

const CustomSelect = ({ options, ...otherProps }: CustomSelectProps) => {
  return (
    <Select {...otherProps}>
      {options.map((option) => {
        return <Option key={option.value}>{option.label}</Option>
      })}
    </Select>
  )
}

export default CustomSelect
