import {
  defineComponent,
  h,
  watch,
  reactive,
  toRefs,
  onMounted,
  onUnmounted,
} from "@vue/runtime-core";
import planeImg from "../../assets/plane.png";

export default defineComponent({
  props: ["x", "y"],

  setup(props, ctx) {
    console.log("----props-------");
    console.log(props);

    const handleAttack = (e) => {
      if (e.code === "Space") {
        // 发消息
        ctx.emit("attack", {
          x: props.x,
          y: props.y,
        });
      }
    };

    onMounted(() => {
      window.addEventListener("keydown", handleAttack);
    });

    onUnMounted(() => {
      window.removeEventListener("keydown", handleAttack);
    });

    // 观察 props 的情况
    // watch
    // props 是仅读的响应式对象
    // 响应式对象 分两种
    // 1. 可以修改
    // 2. 是不可以修改

    // props 就是一个
    // const point = reactive({
    //   x: props.x,
    //   y: props.y,
    // });

    // watch(props, (value) => {
    //   console.log("--watch-----");
    //   console.log(value);
    //   point.x = value.x;
    //   point.y = value.y;
    // });
    // return {
    //   point,
    // };

    // 响应式丢失问题
    // toRefs
    const { x, y } = toRefs(props);
    return {
      x,
      y,
    };
  },
  render(ctx) {
    return h("Container", { x: ctx.x, y: ctx.y }, [
      h("Sprite", { texture: planeImg }),
    ]);
  },
});
