// @flow
import MobxReactForm from 'mobx-react-form'

export default class Form extends MobxReactForm {
  bindings() {
    return {
      // we can choose a name as key
      MaterialTextField: {
        id: 'id',
        name: 'name',
        type: 'type',
        value: 'value',
        label: 'floatingLabelText',
        placeholder: 'hintText',
        disabled: 'disabled',
        error: 'error',
        onChange: 'onChange',
        onBlur: 'onBlur',
        onFocus: 'onFocus',
        autoFocus: 'autoFocus',
      },
    }
  }
}
