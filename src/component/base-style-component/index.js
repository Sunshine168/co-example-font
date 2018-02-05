// import React from 'react'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const PanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #f6f6f6;
  position: absolute;
  background-color: #fff;
  padding: 30px 15px 10px 15px;
`

export const Icon = styled.i`
  display: block;
  height: ${props => props.size || props.height || 15}px;
  width: ${props => props.size || props.width || 15}px;
  background: url(${props => props.source});
  background-size: cover;
`
