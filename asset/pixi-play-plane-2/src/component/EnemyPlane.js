// 敌军
import { defineComponent, h, watch, reactive, toRefs } from "@vue/runtime-core";
import enemyImg from "../../assets/enemy.png";

export default defineComponent({
  props: ["x", "y"],
  setup(props) {
  },
  render(ctx) {
    return h("Container", { x: ctx.x, y: ctx.y }, [
      h("Sprite", { texture: enemyImg }),
    ]);
  },
});