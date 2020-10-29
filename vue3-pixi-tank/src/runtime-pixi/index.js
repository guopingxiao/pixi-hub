import { createRenderer } from "@vue/runtime-core";
import { Text, Container, Sprite, Texture } from "pixi.js";

/**
 * vue-pixi-render核心逻辑
 */
const renderer = createRenderer({
  // 创建节点
  createElement(type) {
    let element;
    switch (type) {
      case "Container":
        element = new Container();
        break;
      case "Sprite":
        element = new Sprite();
        break;
    }
    return element;
  },

  // 设置Text节点
  setElementText(node, text) {
    const cText = new Text(text);
    node.addChild(cText);
  },

  // 创建Text节点
  createText(text) {
    return new Text(text);
  },

  // 处理属性节点
  patchProp(el, key, prevValue, nextValue) {
    switch (key) {
      case "texture":
        el.texture = Texture.from(nextValue);
        break;
      case "onClick":
        el.on("pointertap", nextValue);
        break;
      default:
        el[key] = nextValue; // x,y 坐标等同key的属性
    }
  },

  // 插入节点
  insert(el, parent) {
    parent.addChild(el);
  },
  createComment() {},
  parentNode() {},
  nextSibling() { },
  // 删除节点
  remove(el) {
    const parent = el.parent;
    if (parent) {
      parent.removeChild(el);
    }
  },
});

/**
 * 复写createApp(container) 方法
 * @param {*} rootComponent 
 */
export function createApp(rootComponent) {
  return renderer.createApp(rootComponent);
}
