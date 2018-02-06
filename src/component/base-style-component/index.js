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

export const Bubble = styled.div`
  position: relative;
  min-height: 30px;
  background-color: yellowgreen;
  line-height: 30px;
  padding: 0 10px;
  border-radius: 8px;
  display: inline-block;
  margin-left:15px;
  &.bubble_right:after {
    position: absolute;
    top: 5px;
    right: -18px;
    width: 0;
    height: 0;
    border: 10px solid;
    border-color: transparent;
    border-left-color: yellowgreen !important;
    display: inline-block;
    content: '';
  }
  &.bubble_left:before {
    position: absolute;
    top: 5px;
    left: -18px;
    width: 0;
    height: 0;
    border: 10px solid;
    z-index:5;
    border-color: transparent;
    border-right-color: yellowgreen !important;
    display: inline-block;
    content:'';
  }
`

export const Text = styled.span`
  color: ${props => (props.color ? props.color : '#1f1f1f')};
  font-size: ${props => (props.fontSzie ? props.fontSzie : 15)}px;
`
