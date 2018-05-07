// @flow
import * as React from 'react'
import styled from 'styled-components'
import { Collapse, Switch, Slider, Button } from 'antd'
import { observer, inject } from 'mobx-react'
import type { IImgProcess } from '../../../store/imgProcess'
import { TextInput } from '../../../component'
import emitter from '../../../util/event-mitter'

const { Panel } = Collapse

const SwitchWrapper = styled.div`
  flex-direction: column;
  justify-content: center;
`

const Container = styled.div`
  padding: 0 20px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
`

const ModePreviewImg = styled.img`
  wight: 50px;
  height: 50px;
  margin-left: 15px;
`

type ProcessImgUtilProps = {
  imgProcess: IImgProcess,
  sendImg(): void,
}

@inject('imgProcess')
@observer
export default class ProcessImgUtil extends React.Component<void, ProcessImgUtilProps, *> {
  afterParamChange = (action) => {
    if (action) {
      action()
    }
  }

  syncInformAction = () => {
    emitter.emit('PROCESS_STATE_CHANGE')
  }

  syncActionWrapper = async (action, extraAction) => {
    const { isSyncingImg } = this.props.imgProcess
    await action()
    if (isSyncingImg) {
      extraAction()
    }
  }
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
      posterize,
      posterizeChange,
      size,
      isSyncingImg,
      changeSyncStatus,
    } = this.props.imgProcess
    const { sendImg } = this.props
    return (
      <Container>
        <Button type='primary' onClick={sendImg}>
          发送到聊天室
        </Button>
        <Button
          onClick={() => {
            changeSyncStatus(!isSyncingImg)
          }}
        >
          {`${isSyncingImg ? '停止' : '开始'}`}同步修改图片
        </Button>
        <Collapse>
          <Panel header='normalize'>
            <SwitchWrapper>
              <Switch
                checked={modeMap.get('normalize')}
                onChange={(value) => {
                  this.syncActionWrapper(
                    () => switchMode('normalize', value),
                    this.syncInformAction,
                  )
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
                  this.syncActionWrapper(
                    () => switchMode('greyscale', value),
                    this.syncInformAction,
                  )
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
                  this.syncActionWrapper(() => switchMode('invert', value), this.syncInformAction)
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
                  this.syncActionWrapper(() => switchMode('sepia', value), this.syncInformAction)
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
                  this.syncActionWrapper(
                    () => switchMode('dither565', value),
                    this.syncInformAction,
                  )
                }}
              />
              <ModePreviewImg src={require('../../../assets/imgProcess/img-mode/dither565.png')} />
            </SwitchWrapper>
          </Panel>
          <Panel header='quality'>
            <SwitchWrapper>
              <Slider
                min={1}
                max={100}
                onChange={(value) => {
                  this.syncActionWrapper(() => qualityChange(value), this.syncInformAction)
                }}
                value={quality}
              />
            </SwitchWrapper>
          </Panel>
          <Panel header='blur'>
            <SwitchWrapper>
              <Slider
                min={0}
                max={100}
                onChange={(value) => {
                  this.syncActionWrapper(() => blurChange(value), this.syncInformAction)
                }}
                value={blur}
              />
            </SwitchWrapper>
          </Panel>
          <Panel header='opacity'>
            <SwitchWrapper>
              <Slider
                step={0.1}
                min={0}
                max={1}
                onChange={(value) => {
                  this.syncActionWrapper(() => opacityChange(value), this.syncInformAction)
                }}
                value={opacity}
              />
            </SwitchWrapper>
          </Panel>
          <Panel header='posterize'>
            <SwitchWrapper>
              <Slider
                min={1}
                max={100}
                onChange={(value) => {
                  this.syncActionWrapper(() => posterizeChange(value), this.syncInformAction)
                }}
                value={posterize}
              />
            </SwitchWrapper>
          </Panel>
          <Panel header='resize'>
            <TextInput
              value={size.get('width')}
              onChange={(event) => {
                this.syncActionWrapper(
                  () => size.set('width', event.target.value),
                  this.syncInformAction,
                )
              }}
              label='宽度'
            />
            <TextInput
              value={size.get('height')}
              onChange={(event) => {
                this.syncActionWrapper(
                  () => size.set('height', event.target.value),
                  this.syncInformAction,
                )
              }}
              label='高度'
            />
          </Panel>
        </Collapse>
      </Container>
    )
  }
}
