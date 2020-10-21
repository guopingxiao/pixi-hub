// 地图
import { defineComponent, h, ref } from "@vue/runtime-core";
import mapImg from "../../assets/map.jpg";
import { getGame } from "../Game";

export default defineComponent({
  setup() {
    const mapHeight = 1080;
    // 创建一个响应式对象
    const mapY1 = ref(0);
    const mapY2 = ref(-mapHeight);

    // 让地图动起来
    // y ++
    // 循环
    // setInterval
    // requestAnimationFrame
    // pixi 循环
    const speed = 5;
    getGame().ticker.add(() => {
      mapY1.value += speed;
      mapY2.value += speed;

      // 归位
      if (mapY1.value >= mapHeight) {
        mapY1.value = -mapHeight;
      }
      if (mapY2.value >= mapHeight) {
        mapY2.value = -mapHeight;
      }
    });

    return {
      mapY1,
      mapY2,
    };
  },
  render(ctx) {
    return h("Container", [
      h("Sprite", { texture: mapImg, y: ctx.mapY1 }),
      h("Sprite", { texture: mapImg, y: ctx.mapY2 }),
    ]);
  },
});
