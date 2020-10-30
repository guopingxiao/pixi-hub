import { noop } from './util'
import Image from './Image'
import { canvas } from './canvas'
import location from './location'
import document from './document'
import WebSocket from './WebSocket'
import navigator from './navigator'
import TouchEvent from './TouchEvent'
import XMLDocument from './XMLDocument'
import localStorage from './localStorage'
import XMLHttpRequest from './XMLHttpRequest'
import { Element, HTMLCanvasElement, HTMLImageElement, HTMLVideoElement } from './element'

const { platform } = wx.getSystemInfoSync()

GameGlobal.canvas = canvas // 全局canvas
canvas.addEventListener = document.addEventListener
canvas.removeEventListener = document.removeEventListener

// 模拟器 挂载window上不能修改
if (platform === 'devtools') {
  Object.defineProperties(window, {
    Image: {value: Image},
    Element: {value: Element},
    ontouchstart: {value: noop},
    WebSocket: {value: WebSocket},
    addEventListener: {value: noop},
    TouchEvent: {value: TouchEvent},
    XMLDocument: {value: XMLDocument},
    localStorage: {value: localStorage},
    XMLHttpRequest: {value: XMLHttpRequest},
    HTMLVideoElement: {value: HTMLVideoElement},
    HTMLImageElement: {value: HTMLImageElement},
    HTMLCanvasElement: {value: HTMLCanvasElement},
  })
  // 挂载 document
  for (const key in document) {
    const desc = Object.getOwnPropertyDescriptor(window.document, key)
    if (!desc || desc.configurable) {
      Object.defineProperty(window.document, key, {value: document[key]})
    }
  }
} else {
  GameGlobal.Image = Image
  GameGlobal.ontouchstart = noop
  GameGlobal.document = document
  GameGlobal.location = location
  GameGlobal.WebSocket = WebSocket
  GameGlobal.navigator = navigator
  GameGlobal.TouchEvent = TouchEvent
  GameGlobal.addEventListener = noop
  GameGlobal.XMLDocument = XMLDocument
  GameGlobal.removeEventListener = noop
  GameGlobal.localStorage = localStorage
  GameGlobal.XMLHttpRequest = XMLHttpRequest
  GameGlobal.HTMLImageElement = HTMLImageElement
  GameGlobal.HTMLVideoElement = HTMLVideoElement
  GameGlobal.HTMLCanvasElement = HTMLCanvasElement
  GameGlobal.WebGLRenderingContext = GameGlobal.WebGLRenderingContext || {}
  GameGlobal.window = GameGlobal
}
