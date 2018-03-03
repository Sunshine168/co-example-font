import React, { Component } from 'react'
import styled from 'styled-components'
import { Collapse, Switch, Slider } from 'antd'
import { observer, inject } from 'mobx-react'

import { TextInput } from '../../../component'

const { Panel } = Collapse

const SwitchWrapper = styled.div`
  flex-direction: column;
  justify-content: center;
`

const Container = styled.div`
  padding: 0 20px;
  min-width: 250px;
`

const ModePreviewImg = styled.img`
  wight: 50px;
  height: 50px;
  margin-left: 15px;
`

@inject('imgProcess')
@observer
export default class ProcessImgUtil extends Component {
  render() {
    const {
      modeMap,
      switchMode,
      quality,
      qualityChange,
      blur,
      blurChange,
      opacity,
      opacityChange,
      fade,
      fadeChange,
      posterize,
      posterizeChange,
      size,
    } = this.props.imgProcess
    const modes = modeMap.keys()
    return (
      <Container>
        <Collapse
          onChange={() => {
            console.log()
          }}
        >
          <Panel header='normalize'>
            <SwitchWrapper>
              <Switch
                checked={modeMap.get('normalize')}
                onChange={(value) => {
                  switchMode('normalize', value)
                }}
              />
              <ModePreviewImg src={require('../../../assets/imgProcess/img-mode/normalize.png')} />
            </SwitchWrapper>
          </Panel>
          <Panel header='greyscale'>
            <SwitchWrapper>
              <Switch
                checked={modeMap.get('greyscale')}
                onChange={(value) => {
                  switchMode('greyscale', value)
                }}
              />
              <ModePreviewImg src={require('../../../assets/imgProcess/img-mode/greyscale.png')} />
            </SwitchWrapper>
          </Panel>
          <Panel header='invert'>
            <SwitchWrapper>
              <Switch
                checked={modeMap.get('invert')}
                onChange={(value) => {
                  switchMode('invert', value)
                }}
              />
              <ModePreviewImg src={require('../../../assets/imgProcess/img-mode/invert.png')} />
            </SwitchWrapper>
          </Panel>
          <Panel header='sepia'>
            <SwitchWrapper>
              <Switch
                checked={modeMap.get('sepia')}
                onChange={(value) => {
                  switchMode('sepia', value)
                }}
              />
              <ModePreviewImg src={require('../../../assets/imgProcess/img-mode/sepia.png')} />
            </SwitchWrapper>
          </Panel>
          <Panel header='dither565'>
            <SwitchWrapper>
              <Switch
                checked={modeMap.get('dither565')}
                onChange={(value) => {
                  switchMode('dither565', value)
                }}
              />
              <ModePreviewImg src={require('../../../assets/imgProcess/img-mode/dither565.png')} />
            </SwitchWrapper>
          </Panel>
          <Panel header='quality'>
            <SwitchWrapper>
              <Slider min={1} max={100} onChange={qualityChange} value={quality} />
            </SwitchWrapper>
          </Panel>
          <Panel header='blur'>
            <SwitchWrapper>
              <Slider min={1} max={100} onChange={blurChange} value={blur} />
            </SwitchWrapper>
          </Panel>
          <Panel header='opacity'>
            <SwitchWrapper>
              <Slider min={0} max={1} onChange={opacityChange} value={opacity} />
            </SwitchWrapper>
          </Panel>
          <Panel header='posterize'>
            <SwitchWrapper>
              <Slider min={1} max={100} onChange={posterizeChange} value={posterize} />
            </SwitchWrapper>
          </Panel>
          <Panel header='resize'>
            <TextInput
              value={size.get('width')}
              onChange={event => size.set('width', event.target.value)}
              label='宽度'
            />
            <TextInput
              value={size.get('height')}
              onChange={(event) => {
                size.set('height', event.target.value)
              }}
              label='高度'
            />
          </Panel>
        </Collapse>
      </Container>
    )
  }
}
