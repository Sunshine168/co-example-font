import React, { Component } from 'react'
import styled from 'styled-components'
import { Collapse, Switch } from 'antd'
import { observer, inject } from 'mobx-react'

import config from '../config'

const { Panel } = Collapse

const SwitchWrapper = styled.div`
  flex-direction: column;
`

@inject('imgProcess')
@observer
export default class ProcessImgUtil extends Component {
  render() {
    const { imgProcess } = this.props
    const { modeMap, switchMode } = imgProcess
    const modes = Object.keys(modeMap)
    return (
      <div>
        <Collapse
          onChange={() => {
            console.log()
          }}
        >
          <Panel>
            {modes.map((item) => {
              return (
                <SwitchWrapper key={item}>
                  <Switch
                    checked={modeMap[item]}
                    onChange={(value) => {
                      switchMode(item, value)
                    }}
                  />
                </SwitchWrapper>
              )
            })}
          </Panel>
        </Collapse>
      </div>
    )
  }
}
