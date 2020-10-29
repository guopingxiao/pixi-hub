
import { createApp } from "./src/runtime-pixi";
import App from "./src/App";
import { getRootContainer } from './src/Game'

createApp(App).mount(getRootContainer());
