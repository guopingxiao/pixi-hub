import { createElement } from 'react'

const elementFactory = name => props => createElement(name, props)
export const Container = elementFactory('container')
export const Text = elementFactory('text')
export const Sprite = elementFactory('sprite')
