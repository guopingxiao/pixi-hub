import { createApp } from "./src/runtime-canvas";
import App from "./src/App";
import { getCanvasRootContainer } from "./src/Game";

// 1. 需要创建根组件和  根容器， 创建根组件没什么问题，但是创建根容器，怎么办呢？web里是直接怪哉到dom节点上，那在canvas的节点需如何搞？
// canvas和vue3碰撞，当然直接挂在到canvas节点也不是不可以；原生的canvasAPI巨难用，可以用。可以用游戏引擎库，来将我们的节点渲染到canvas上；
createApp(App).mount(getCanvasRootContainer());
