// 开始页面
import { defineComponent, h } from "@vue/runtime-core";
import startPageImg from "../../assets/start_page.jpg";
import startBtn from "../../assets/startBtn.png";

// template -> render
export default defineComponent({
  render(ctx) {
    // 首页逻辑就是 显示一张图片 + 按钮，
    // <div><img src=""></img></div>
    return h("Container", [
      h("Sprite", { texture: startPageImg }),
      h("Sprite", {
        texture: startBtn,
        x: 210,
        y: 500,
        interactive: true,
        onClick() {
           // vue2 this emit
          console.log("click");
          console.log("---ctx----")
          console.log(ctx)
          ctx.$emit("changePage","GamePage")
        },
      }),
    ]);
  },
});
