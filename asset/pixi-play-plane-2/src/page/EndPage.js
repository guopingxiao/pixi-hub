// 结束页面
import { defineComponent, h } from "@vue/runtime-core";
import endPageImg from "../../assets/end_page.jpg";
import restartBtn from "../../assets/restartBtn.png";

// template -> render
export default defineComponent({
  render(ctx) {
    // 显示一张图片
    // <div><img src=""></img></div>
    return h("Container", [
      h("Sprite", { texture: endPageImg }),
      h("Sprite", {
        texture: restartBtn,
        x: 210,
        y: 500,
        interactive: true,
        onClick() {
          // vue2 this emit
          console.log("click");
          console.log("---ctx----");
          console.log(ctx);
          ctx.$emit("changePage", "GamePage");
        },
      }),
    ]);
  },
});
