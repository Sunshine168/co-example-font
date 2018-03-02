import React, { Component } from 'react'
import styled from 'styled-components'
import { Collapse, Switch } from 'antd'
import { observer, inject } from 'mobx-react'

const { Panel } = Collapse

const SwitchWrapper = styled.div`
  flex-direction: column;
`

const Container = styled.div`
  padding: 18px 20px;
  min-width: 150px;
`

@inject(stores => ({
  modeMap: stores.imgProcess.modeMap,
  switchMode: stores.imgProcess.switchMode,
}))
@observer
export default class ProcessImgUtil extends Component {
  render() {
    const { modeMap, switchMode } = this.props
    const modes = modeMap.keys()
    return (
      <Container>
        <Collapse
          onChange={() => {
            console.log()
          }}
        >
          <Panel header='模式选项'>
            {modes.map((item) => {
              return (
                <SwitchWrapper key={item}>
                  <Switch
                    checked={modeMap.get(item)}
                    onChange={(value) => {
                      switchMode(item, value)
                    }}
                  />
                </SwitchWrapper>
              )
            })}
          </Panel>
        </Collapse>
      </Container>
    )
  }
}
