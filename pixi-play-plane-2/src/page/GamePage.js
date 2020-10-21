import {
  defineComponent,
  h,
  reactive,
  toRefs,
  onMounted,
  onUnmounted,
} from "@vue/runtime-core";

import Map from "../component/Map";
import Plane from "../component/Plane";
import Bullet from "../component/Bullet";
import EnemyPlane from "../component/EnemyPlane";
import { getGame } from "../Game";
import { hitTestRectangle } from "../utils/index";

export default defineComponent({
  setup(props,ctx) {
    // ref  处理 值类型
    // reactive 处理 对象类型 引用类型 {} []
    const planeInfo = useCreatePlaneInfo();
    // 子弹数据
    const bullets = reactive([]);
    // 敌军数据
    const enemyPlanes = reactive([
      {
        x: 10,
        y: 10,
        width: 308,
        height: 207,
      },
    ]);

    const handleAttack = (info) => {
      const createBulletInfo = () => {
        return {
          x: info.x + 100,
          y: info.y,
        };
      };

      bullets.push(createBulletInfo());
    };

    // 发子弹
    // 按空格
    // 动起来
    // 真循环

    getGame().ticker.add(() => {
      // 让子弹动起来
      moveBullets(bullets);
      // 碰撞检测

      enemyPlanes.forEach((enemyPlaneInfo) => {
        if (hitTestRectangle(enemyPlaneInfo, planeInfo)) {
          ctx.emit("changePage", "EndPage");
          console.log("hit");
        }
      });
    });

    // 创建子弹
    return {
      planeInfo,
      bullets,
      handleAttack,
      enemyPlanes,
    };
  },

  render(ctx) {
    // 渲染子弹
    const renderBullets = () => {
      return ctx.bullets.map((info) => {
        return h(Bullet, { x: info.x, y: info.y });
      });
    };

    // 渲染敌机
    const renderEnemyPlanes = () => {
      return ctx.enemyPlanes.map((info) => {
        return h(EnemyPlane, { x: info.x, y: info.y });
      });
    };

    return h("Container", [
      h(Map),
      h(Plane, {
        x: ctx.planeInfo.x,
        y: ctx.planeInfo.y,
        onAttack: ctx.handleAttack,
      }),
      ...renderBullets(),
      ...renderEnemyPlanes(),
    ]);
  },
});

const useCreatePlaneInfo = () => {
  const planeInfo = reactive({
    x: 150,
    y: 300,
    width: 258,
    height: 364,
  });

  // 让飞机移动起来
  const { x, y } = useMovePlane(planeInfo.x, planeInfo.y);
  planeInfo.x = x;
  planeInfo.y = y;

  return planeInfo;
};

const useMovePlane = (initX, initY) => {
  const speed = 15;
  const point = reactive({
    x: initX,
    y: initY,
  });

  // 按键
  // remove
  // vue2 组件销毁的时候进行 remove
  // 生命周期
  const handleKeyDown = (e) => {
    console.log(e.code);
    switch (e.code) {
      case "ArrowUp":
        point.y -= speed;
        break;
      case "ArrowDown":
        point.y += speed;
        break;
      case "ArrowLeft":
        point.x -= speed;
        break;
      case "ArrowRight":
        point.x += speed;
        break;
    }
  };

  onMounted(() => {
    // 组件创建完
    window.addEventListener("keydown", handleKeyDown);
  });

  onUnmounted(() => {
    // 组件销毁时
    window.removeEventListener("keydown", handleKeyDown);
  });

  return toRefs(point);
};

const moveBullets = (bullets) => {
  const speed = 5;
  bullets.forEach((bulletInfo) => {
    bulletInfo.y -= speed;
  });
};
