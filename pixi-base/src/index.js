import {
  Application,
  Graphics,
  Sprite,
  Container
} from 'pixi.js';

const app = new Application({
  width: 300,
  height: 600,
  antialias: true,
  transparent: false,
  resolution: 1,
  backgroundColor: 0xff6633
});

// app.view就是个canvas元素，挂载到页面上
document.body.appendChild(app.view);

// 1.创建一个半径为32px的圆
const circle = new Graphics();
circle.beginFill(0x1d9ce0);
circle.drawCircle(0, 0, 32);
circle.endFill();
circle.x = 230;
circle.y = 130;

// 添加到app.stage里，从而可以渲染出来
app.stage.addChild(circle);

// 2. 创建一个图片精灵
const avatar1 = new Sprite.from('http://p0.meituan.net/userheadpic/ebce0c00cfef2f78e26e475f7f7b622111816.jpg');

// 图片宽高缩放0.3
avatar1.scale.set(0.3, 0.3);

app.stage.addChild(avatar1);

// 2. 创建一个图片精灵
const avatar2 = new Sprite.from('http://p0.meituan.net/userheadpic/ebce0c00cfef2f78e26e475f7f7b622111816.jpg');

// 图片宽高缩放0.3
avatar2.scale.set(0.3, 0.3);

// 居中展示
avatar2.x = 95;
avatar2.y = 90;

// 可交互 & 监听事件
avatar2.interactive = true;
avatar2.on('click', () => {
   // 透明度
   avatar2.alpha= 0.3;
})
app.stage.addChild(avatar2);



// 3. 创建一个图片精灵
const avatar3 = new Sprite.from('http://p0.meituan.net/userheadpic/ebce0c00cfef2f78e26e475f7f7b622111816.jpg');

// 图片宽高缩放0.5
avatar3.scale.set(0.3, 0.3);

// 居中展示
avatar3.x = 100;
avatar3.y = 250;

// 修改旋转中心为图片中心
avatar3.anchor.set(0.5, 0.5)

app.ticker.add(() => {
  // 每秒调用该方法60次(60帧动画)
  avatar3.rotation += 0.05;
})
app.stage.addChild(avatar3);


// 4.自定义Container
const myContainer = new Container();
// 相对于根节点偏移
myContainer.position.set(140, 400);

let rectangle = new Graphics();
rectangle.beginFill(0x000000);
rectangle.drawRect(0, 0, 64, 64);
rectangle.endFill();

let rectangle2 = new Graphics();
rectangle2.beginFill(0xFFFFFF);
rectangle2.drawRect(0, 0, 64, 64);
rectangle2.endFill();
// 相对于自定义Container偏移
rectangle2.position.set(20, 20);

// 两个图形加到自定义Container里
myContainer.addChild(rectangle);
myContainer.addChild(rectangle2);

// 自定义Container最后需要添加到app.stage
app.stage.addChild(myContainer);


