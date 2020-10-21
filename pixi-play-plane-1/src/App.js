// template -> render，我们这里使用最原始的 defineComponent的方式，+ h函数来写render方法； 
import { defineComponent, h } from "@vue/runtime-core";

export default defineComponent({
  setup(){

  },
  render() {
    // render创建vnode  --》  return 创建好的虚拟节点即可；为什么这里一定要return出去呢？可以从源码入手分析一下；
    let vnode
    let x = 100
    vnode = h("circle", { x, y: 100 });
    // 创建虚拟节点
    setTimeout(() => { 
      
      vnode = h("circle", { x, y: 200 });
      x = x + 10
      console.log(vnode);
    }, 1000)
    
    return vnode;
  },
});
