const Container = PIXI.Container,
    Graphics = PIXI.Graphics,
    Sprite = PIXI.Sprite,
    TilingSprite = PIXI.extras.TilingSprite,
    Loader = PIXI.loader,
    Resources = PIXI.loader.resources;

const option = {                            //创建一个 Pixi应用 需要的一些参数
    width: 910,
    height: 512,
    transparent: true,
}
const app = new PIXI.Application(option);   //创建一个 Pixi应用
const stage = app.stage;                    //获取舞台
const renderer = app.renderer;              //获取渲染器
const playground = document.getElementById('px-render');
const scale = scaleToWindow(renderer.view);//将画布缩放到最大窗口大小
const state = play;//设置初始游戏状态

playground.appendChild(renderer.view);     //把 Pixi 创建的 canvas 添加到页面上
Loader.add("images/pixiePerilousness.json").load(setup);//加载资源

//定义可能在多个函数中使用的变量
let t = undefined,
    b = undefined,
    d = undefined,
    pd = undefined,
    u = undefined,
    id = undefined,
    pointer = undefined,
    circle = undefined,
    pixie = undefined,
    sky = undefined,
    blocks = undefined,
    finish = undefined,
    particleStream = undefined,
    dustFrames = undefined;

function setup() {

    /* 1.实例化需要使用的库 */
    t = new Tink(PIXI, renderer.view, scale);//创建Tink实例，用于交互, 最后一个参数scale是上面的scaleToWindow函数的返回值
    b = new Bump(PIXI);//创建Bump实例，用于碰撞检测
    u = new SpriteUtilities(PIXI);//创建spriteu实例，简化创建精灵
    id = Resources["images/pixiePerilousness.json"].textures;//获取对纹理贴图集的引用

    /* 2.创建精灵 */
    sky = new TilingSprite(id["clouds.png"], renderer.view.width, renderer.view.height);//制作天空背景
    stage.addChild(sky);

    blocks = new Container();//创造一个容器，里面会包括所有柱子
    stage.addChild(blocks);

    let gapSize = 4;            //柱子之间的初始间隙
    let numberOfPillars = 15;   //柱子的数量

    for (let i = 0; i < numberOfPillars; i++) {             //循环15次，形成15根柱子
        let startGapNumber = randomInt(0, 8 - gapSize);     //随机确定单个柱子的间隙
        if (i > 0 && i % 5 === 0) gapSize -= 1;             //每隔五根柱子就减少一个间隙 

        for (let j = 0; j < 8; j++) {                       //如果不在柱子的间隙内，就创建一个块放入柱子
            if (j < startGapNumber || j > startGapNumber + gapSize - 1) {
                let block = u.sprite(id["greenBlock.png"]);
                blocks.addChild(block);
                block.x = i * 384 + 512;        //每根柱子之间间隔384像素，第一根柱子的x位置为512
                block.y = j * 64;
            }
        }

        if (i === numberOfPillars - 1) {    //创建柱子之后，在添加finish图像
            finish = u.sprite(id["finish.png"]);
            blocks.addChild(finish);
            finish.x = i * 384 + 896;
            finish.y = 192;
        }
    }

    //制作小精灵角色
    const pixieFrames = [id["0.png"], id["1.png"], id["2.png"]];
    pixie = u.sprite(pixieFrames);
    stage.addChild(pixie);
    pixie.fps = 24;
    pixie.position.set(232, 32);
    pixie.vy = 0;
    pixie.oldVy = 0;

    //创建小精灵角色需要的帧数组
    dustFrames = [id["pink.png"], id["yellow.png"], id["green.png"], id["violet.png"]];
    d = new Dust(PIXI);             //创建Dust实例，用于制作粒子效果
    
    particleStream = d.emitter(     //创建粒子发射器
        300, //时间间隔
        () => d.create(  
            pixie.x + 8, //x 坐标
            pixie.y + pixie.height / 2, //y 坐标
            () => u.sprite(dustFrames), //粒子精灵
            stage, //父容器
            3, //粒子数
            0, //重力
            true, //随机间隔
            2.4, 3.6, //最小，最大角度
            18, 24, //最小，最大尺寸
            2, 3, //最小，最大速度
            0.005, 0.01, //最小，最大比例速度
            0.005, 0.01, //最小，最大alpha速度
            0.05, 0.1 //最小，最大旋转速度
        )
    );

    particleStream.play();  //游戏开始时，播放粒子效果
    pointer = t.makePointer();// 创建指针对象，并为指针对象指定 tap 方法每次点击都会使小精灵的垂直速度（vy）增加1.5，将她向上推。
    pointer.tap = function () {
        pixie.vy += 1.5;
    };

    gameLoop();//开始游戏循环
}

//游戏循环
function gameLoop() {
    requestAnimationFrame(gameLoop);//循环调用gameLoop函数
    state(); //运行当前状态
    t.update();//更新 Tink
    d.update();//更新 Dust
    renderer.render(stage);//渲染舞台
}

function play() {
    sky.tilePosition.x -= 1; //通过修改平铺精灵 sky 的 tilePosition属性的 x 坐标，使天空背景滚动

    //finish 精灵在屏幕外时，每一帧左移2个像素.  一旦finish 精灵滚动到视图中，blocks 容器将停止移动
    if (finish.getGlobalPosition().x > 256) {
        blocks.x -= 2;
    }

    pixie.vy -= 0.05; //给小精灵增加重力，使小精灵下落
    pixie.y -= pixie.vy;

    //决定小精灵是否应该拍打翅膀, 如果她上升，则拍打翅膀并产生五彩的小星星
    if (pixie.vy > pixie.oldVy) {
        if (!pixie.animating) {
            pixie.playAnimation();
            if (pixie.visible && !particleStream.playing) {
                particleStream.play();
            }
        }
    }

    //如果她往下落，停止拍打翅膀，展示第一帧，并停止产生五彩的小星星
    if (pixie.vy < 0 && pixie.oldVy > 0) {
        if (pixie.animating) pixie.stopAnimation();
        pixie.show(0);
        if (particleStream.playing) particleStream.stop();
    }

    //存储小精灵的当前vy值，以便我们可以在下一帧中使用它来确定小精灵是否改变了方向
    pixie.oldVy = pixie.vy;

    //限制小精灵在舞台区域内
    const pixieVsCanvas = b.contain(pixie, {
        x: 0,
        y: 0,
        width: renderer.view.width,
        height: renderer.view.height
    });
    if (pixieVsCanvas) {
        if (pixieVsCanvas.has("bottom") || pixieVsCanvas.has("top")) {
            pixie.vy = 0;
        }
    }

    //遍历 blocks.children 数组，检测每个块和小精灵之间的碰撞。
    //如果 hitTestRectangle 返回 true ，则退出循环，表示小精灵碰撞到柱子了。
    // hitTestRectangle 方法的第三个参数必须为  true ，以便强制 hitTestRectangle  方法使用全局坐标进行碰撞检测。
    let pixieVsBlock = blocks.children.some(function (block) {
        return b.hitTestRectangle(pixie, block, true);
    });

    //如果 pixieVsBlock 为 true ，并且当前小精灵可见，
    //则运行小精灵爆炸成一堆小星星的代码。
    //它使小精灵变的不可见，并产生粒子爆炸效果，而且在延迟3秒后调用游戏的 reset 函数，重置游戏
    if (pixieVsBlock && pixie.visible) {
        //使小精灵不可见
        pixie.visible = false;

        //制作爆炸小星星效果
        d.create(
            pixie.centerX, pixie.centerY, //x 和 y 坐标
            () => u.sprite(dustFrames), //粒子精灵
            stage, //父容器
            20, //粒子数
            0, //重力
            false, //随机间隔
            0, 6.28, //最小角度，最大角度
            16, 32, //最小尺寸，最大尺寸
            1, 3 //最小速度，最大速度
        );

        //停止粒子发射器
        particleStream.stop();

        //等待3秒，然后重置游戏
        wait(3000).then(function () {
            return reset();
        });
    }
}

//重置游戏
function reset() {
    pixie.visible = true;
    pixie.y = 32;
    particleStream.play();
    blocks.x = 0;
}

//生成随机数
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//等待函数
function wait() {
    let duration = arguments[0] === undefined ? 0 : arguments[0];

    return new Promise(function (resolve, reject) {
        setTimeout(resolve, duration);
    });
}
