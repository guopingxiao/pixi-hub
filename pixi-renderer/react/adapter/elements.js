import * as PIXI from 'pixi.js'

const wrapDisplayObject = (props) => (displayObject) => {
  if (typeof props.onAdded === 'function') {
    displayObject.addListener('added', container => {
      props.onAdded(displayObject, container)
    })
  }

  if (typeof props.onRemoved === 'function') {
    displayObject.addListener('removed', container => {
      props.onRemoved(displayObject, container)
    })
  }

  return displayObject
}

/**
 * 获取Sprite
 * @param {*} param0 
 */
const getSprite = ({ texture, ...props }) => {
  return new PIXI.Sprite(texture)
}

/**
 * 获取文本Text
 * @param {*} param0 
 */
const getText = ({ text, style, canvas, ...props }) => {
  const pixiText = new PIXI.Text(text, style, canvas)
  pixiText.x = props.x || 0
  pixiText.y = props.y || 0
  return pixiText
}

/**
 * 创建元素 container| graphics | text | sprite
 * @param {*} type 
 * @param {*} props 
 * @param {*} rootContainerInstance 
 */
export const createElement = (type, props, rootContainerInstance) =>
  wrapDisplayObject(props)(
    (() => {
      switch (type) {
        case 'container': return new PIXI.Container()
        case 'graphics': return new PIXI.Graphics()
        case 'text': return getText(props)
        case 'sprite':
          return getSprite(props)
        default:
          // console.log("UNKNOWN TYPE!", type)
          return type
      }
    })()
  )
