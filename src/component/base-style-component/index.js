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
  padding: 6px;
  overflow: hidden;
  position: relative;
  &:after {
    clear: both;
    content: '';
  }
  & .content {
    width: auto;
    padding: 0.7em 0.5em;
    font-size: 16px;
    border-radius: 6px;
    border: 1px solid;
    position: relative;
    display: inline-block;
  }
  & .content:before {
    content: '';
    display: inline-block;
    box-sizing: border-box;
    width: 12px;
    height: 12px;
    border: 1px solid transparent;
    border-radius: 3px;
    position: absolute;
    background-color: inherit;
    border-right-color: inherit;
    border-bottom-color: inherit;
  }
  & a.avatar {
    display: block;
    height: 44px;
    width: 44px;
    border-radius: 2px;
    overflow: hidden;
  }
  & a.avatar > img {
    width: 100%;
    height: 100%;
  }
  &.left a.avatar {
    float: left;
  }
  &.right a.avatar {
    float: right;
  }
  &.left {
    text-align: left;
  }
  &.right {
    text-align: right;
  }
  & .wrap {
    margin: 0 56px;
  }
  &.left .content {
    background: #fafafa;
    border-color: #c6c6c6;
  }
  &.left .content:before {
    left: -6px;
    top: 16px;
    transform: rotate(135deg);
  }
  &.right .content {
    background: #2db7f5;
    border-color: #78d0f8;
    text-align: left;
    color: #f7f7f7;
  }
  &.right .content:before {
    right: -6px;
    top: 16px;
    transform: rotate(-45deg);
  }
`

export const Text = styled.span`
  color: ${props => (props.color ? props.color : '#1f1f1f')};
  font-size: ${props => (props.fontSzie ? props.fontSzie : 15)}px;
`
