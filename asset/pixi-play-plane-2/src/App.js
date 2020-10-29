// <div>{{currentPageName}}</div>
// template -> render
import { defineComponent, h, computed, ref } from "@vue/runtime-core";
import StartPage from "./page/StartPage";
import GamePage from "./page/GamePage";
import EndPage from "./page/EndPage";
export default defineComponent({
  setup() {
    // 创建一个响应式对象
    // ref 创建响应式对象
    // 值类型  string number
    const currentPageName = ref("StartPage");
    // const currentPageName = ref("GamePage");
    // const currentPageName = ref("EndPage");
    console.log(currentPageName);
    // 依赖别的属性的属性
    // 计算属性
    const currentPage = computed(() => {
      if (currentPageName.value === "StartPage") {
        return StartPage;
      } else if (currentPageName.value === "GamePage") {
        return GamePage;
      } else if (currentPageName.value === "EndPage") {
        return EndPage;
      }
    });

    return {
      currentPageName,
      currentPage,
    };
  },
  render(ctx) {
    console.log("----ctx------");
    console.log(ctx);
    return h("Container", [
      h(ctx.currentPage, {
        onChangePage(page) {
          console.log(page);
          // page "GamePage"
          // "StartPage" -> StartPage
          ctx.currentPageName = page;
        },
      }),
    ]);
    // return h("Container", [h(GamePage)]);
  },
});
