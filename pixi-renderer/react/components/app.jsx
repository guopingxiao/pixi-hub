import React, { Component } from 'react'
import { Container, Text } from '../adapter/react-pixi'

export class App extends Component {
  componentDidMount () {
    this.props.app.render()
  }

  render () {
    return (
      <Container>
        <Text text='hello pixi.js'
          style={{ fill: '0xFFFFFF', fontSize: 80 }}
          x={100}
          y={160}
        />
      </Container>
    )
  }
}
