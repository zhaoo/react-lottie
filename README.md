# react-lottie

Lottie player for React

## Props

[参考官方](https://github.com/airbnb/lottie-web)

### 基本入参

| Prop | Type | Required | Default | Description |
| -------- | -------- | -------- | -------- | -------- |
| name | string | N | lottie-${timestamp} | 索引名称 |
| ref | ForwardedRef | N | / | 方法和实例通过ref回传父组件，参考下文 |
| path | string | N | / | 资源链接(CDN) |
| animationData | string | N | / | 资源文件(JSON) |
| loop | boolean | N | true | 是否循环 |
| autoplay | boolean | N | true | 是否自动播放 |
| renderer | 'svg' or 'canvas' or 'html' | N | 'svg' | 渲染类型 |
| rendererSettings | Object | N | / | 渲染参数(参考官方) |
| ...props | any | N | / | 剩余参数会透传在动画实例入参和容器中 |

### 事件入参

| Prop | Type | Required | Default | Description |
| -------- | -------- | -------- | -------- | -------- |
| onComplete | callback | N | / | 播放完成（循环播放下不会触发） |
| onLoopComplete | callback | N | / | 当前循环下播放（循环播放/非循环播放）结束时触发 |
| onEnterFrame | callback | N | / | 每进入一帧就会触发，播放时每一帧都会触发一次（可以监听进度） |
| onSegmentStart | callback | N | / | 播放指定片段时触发 |
| onConfigReady | callback | N | / | 配置加载完成时触发 |
| onDataReady | callback | N | / | 动画JSON文件加载完毕触发 |
| onDataFailed | callback | N | / | 动画JSON文件加载失败触发 |
| onLoadedImages | callback | N | / | 加载图片时触发 |
| onDOMLoaded | callback | N | / | DOM挂载完成时触发（一般此处监听完成事件） |
| onDestroy | callback | N | / | 实例销毁时触发 |
| onError | callback | N | / | 报错时触发 |

## Ref

动画实例以及控制方法可通过 ref 实时操作。

### 实例

| Name | Type | Description |
| -------- | -------- | -------- |
| anim | AnimationItem | 动画实例 | 
| lottie | LottiePlayer | 播放器对象 |
| api | function | [lottie-api](https://github.com/bodymovin/lottie-api) |

### 方法

| Name | Type | Description |
| -------- | -------- | -------- |
| play | () => void | 播放 |
| pause | () => void | 暂停 |
| stop | () => void | 停止 |
| destroy | () => void | 销毁 |
| setSpeed | (speed: number) => void | 设置速度（x倍数） |
| setDirection | (direction: AnimationDirection) => void | 设置播放方向（1 => 从头到尾; 0 => 从尾到头） | 
| setSubframe | (useSubFrames: boolean) => void | 开启帧优化（true => 60FPS; false => 遵循AE设置） |
| playSegments | (segments: AnimationSegment | AnimationSegment[], forceFlag?: boolean) => void | 播放片段 |
| getDuration | (inFrames?: boolean) => number | undefined | 获取时长 |
| goToAndPlay | (value: number, isFrame?: boolean) => void | 跳转并播放（true => 跳转到对应帧; false => 跳转到对应时间） |
| goToAndStop | (value: number, isFrame?: boolean) => void | 跳转并停止（同上）|
| goToProgressAndPlay | (value: number) => void | 跳转到进度并播放（进度: 0 ~ 1）|
| goToProgressAndStop | (value: number) => void | 跳转到进度并停止（进度: 0 ~ 1）|
| slotText | (props: AnimationSoltText) => void | 文本插槽 |
| slotImage | (props: AnimationSoltText) => void | 图片插槽 |

```javascript
type AnimationItem = {
    name: string;  // 名称
    isLoaded: boolean;  // 是否加载实例
    currentFrame: number;  // 当前播放帧
    currentRawFrame: number;  // 当前原始帧
    firstFrame: number;  // 首帧（片段播放时）
    totalFrames: number;  // 帧总数
    frameRate: number;  // 帧率（FPS）
    frameMult: number;
    playSpeed: number;  // 播放速度
    playDirection: number;  // 播放顺序
    playCount: number;  // 播放次数
    isPaused: boolean;  // 是否暂停
    autoplay: boolean;  // 是否自动播放
    loop: boolean;  // 是否循环
    renderer: any;  // 渲染方式
    animationID: string;  // ID
    assetsPath: string;  // 资源路径
    timeCompleted: number;  // 播放帧数
    segmentPos: number;  // 片段位置
    isSubframeEnabled: boolean;  // 是否开启帧优化
    segments: AnimationSegment | AnimationSegment[]; // 片段列表
}
```

```javascript
type LottiePlayer = {
    play(name?: string): void;
    pause(name?: string): void;
    stop(name?: string): void;
    setSpeed(speed: number, name?: string): void;
    setDirection(direction: AnimationDirection, name?: string): void;
    searchAnimations(animationData?: any, standalone?: boolean, renderer?: string): void;  // 搜索动画
    loadAnimation(params: AnimationConfigWithPath | AnimationConfigWithData): AnimationItem;  // 加载动画实例
    destroy(name?: string): void;
    registerAnimation(element: Element, animationData?: any): void;  // 重新加载动画
    setQuality(quality: string | number): void;  // 设置质量
    setLocationHref(href: string): void;  // 设置跳转链接
};
```

## 高端操作

### 插槽

方式一（不支持Canvas渲染模式）：

首先分享个黑科技，设计师在 AE 图层命名时，如果在后面加 `#xxx` 或 `.xxx`，Lottie 就会生成对应 ID 或 Class 的元素。通过这个 ID 或 Class 就可以定位到对应 DOM 元素，做替换操作。react-lottie 做了封装操作，执行如下代码即可：

```javascript
// 替换文本
ref.current.slotText({
  id: 'attention',
  text: '你好， 兆兆！'
});

// 替换图片
ref.current.slotImage({
  className: 'avatar',
  src: '...'
});
```

 方式二：
 
 [lottie-api](https://github.com/bodymovin/lottie-api) 提供了查找方法，可以通过“合成名称”和“图层名称”定位到 DOM 元素，做替换操作。合成名称和图层名称可以在 AE 中查看。react-lottie 做了封装操作，执行如下代码即可：
 
 ```javascript
// 替换文本
ref.current.slotText({
  comp: '合成1',
  layer: '文本',
  text: '你好， 兆兆！'
});
```
 
By the way: 该方法只支持替换文本，不支持替换图像。翻了一下源码，lottie-api 作者才写了个壳...