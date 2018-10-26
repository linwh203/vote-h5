# vue-multiple-page for esports-h5

## 目录结构

    index-本地入口页面
    redbag-红包活动页面
    vote-投票活动页面
    guess_s7-s7决赛竞猜页面
    event-rank-排行榜页面（暂时没用到）
    guess-直播中竞猜页面（暂时没用到，用的quiz项目）
    lottery-珍珠抽奖页面

## 简介

该项目为电竞H5项目开发的vue多页面入口脚手架。脚手架默认配置es6-7-8＋cssnext+vue开发环境并对webpack打包流程做了优化处理。支持代码切割异步加载，可参阅[webpack中文文档#代码分离](https://doc.webpack-china.org/guides/code-splitting/)。

新语法参阅：
* es6: [阮一峰es6入门](http://es6.ruanyifeng.com/)
* cssnext: [postcss官网](http://postcss.org/)
* vue: [vue中文官网](https://cn.vuejs.org/)

## 使用

``` shell
npm install
npm run dev
```

## 打包

项目默认配置三种代码环境，分别为 `production(正式环境)`、`production-test(测试环境)` 以及 `development(开发)`。

**新增环境配置须要在build/util.js中的nowConfig方法里添加新变量。
**alias需在config/base,base-prod,base-test都加上。

测试环境与正式环境打包方式一致，主要用于正式版与测试版的接口配置。开发版本取消代码压缩及其它不必要的优化，支持开发热更新。

脚手架使用 [DllPlugin + DllReferencePlugin](https://doc.webpack-china.org/plugins/dll-plugin/) 打包外部资源包，优化打包速度，`manifest` 及打包后的文件包均放置在 `static/libs/js` 目录下，也可进入脚本自行配置路径。

### dev

``` shell
npm run dev
```

### build

``` shell
npm run build
```

### buildtest

``` shell
npm run buildtest
```

### dll(打包外部资源库)

```  
npm run build:vendors
```

> 如果需要打包外部资源库，应先跑 `build:vendors` 命令进行打包外部资源包，再执行编译。

## 项目结构

```
.
├── README.md
├── build
│   ├── build-d.js
│   ├── build.js
│   ├── dev-client.js
│   ├── dev.js
│   ├── util.js
│   ├── webpack.base.config.js
│   ├── webpack.dev.config.js
│   ├── webpack.dll.config.js
│   └── webpack.prod.config.js
├── config
│   ├── base.js
│   ├── dev.env.js
│   ├── index.js
│   ├── prod-d.env.js
│   ├── prod.env.js
│   └── util.js
├── package-lock.json
├── package.json
└── src
    ├── pages
    │   ├── common
    │   │   └── js
    │   │       └── common.js
    │   ├── index (页面1，单页模式将默认将index文件夹作为页面)
    │   │   ├── index.html
    │   │   ├── js
    │   │   │   ├── index.js
    │   │   └── style
    │   └── page2 (页面2)
    │       ├── index.html
    │       ├── js
    │       │   └── index.js
    │       └── style
    └── static (静态资源文件夹)
        ├── libs
        │   └── js (js文件夹下的)
        │       ├── manifest_vendors.json
        │       └── vendors.js
        └── test.txt
```

> *注意*: 开启多页功能的情况下，脚本默认获取 `src/pages`文件夹下除 `common` 文件夹外的所有满足 `!(_)*/!(_)*.html` 条件的html文件作为html页面，并将满足条件的文件夹下的 `js` 文件夹下的 `index.js` 作为 webpack 打包入口。

### 每个页面项目的基本格式

```
.my-page (页面名称)
├── index.html (页面渲染的html模版)
├── js
│   └── index.js (页面脚本入口)
└── style (页面的样式文件)
```

### 编译后的项目结构

```
.
├── css
│   ├── index.3f05035e.css
│   ├── index.3f05035e.css.map
│   ├── page2.3f05035e.css
│   └── page2.3f05035e.css.map
├── js
│   ├── index.3f05035ea26e8a6c3eb8.js
│   ├── index.3f05035ea26e8a6c3eb8.js.gz
│   ├── index.3f05035ea26e8a6c3eb8.js.map
│   ├── page2.3f05035ea26e8a6c3eb8.js
│   └── page2.3f05035ea26e8a6c3eb8.js.map
├── static ()
│   ├── libs
│   │   └── js
│   │       ├── manifest_vendors.json
│   │       └── vendors.js
│   └── test.txt
├── index.html
└── page2.html
```


## 配置

脚手架的基本配置为 `config/base.js` 文件。修改配置文件将影响打包效果。

### 默认配置项

``` js
{
    isMultiplePage: true,
    // 是否启用异步加载功能
    isOpenSyncImport: true,
    // 最小chunk的大小
    minChunkSize: 10000,
    // dev模式下是否自动打开页面
    autoOpenBrowser: true,
    // 文件目录
    assetsRoot: path.resolve(__dirname, '../src'),
    // 生成目录
    buildRoot: path.resolve(__dirname, '../dist'),
    // 静态资源根目录
    staticAssets: 'static',
    // 生成路径
    publicPath: '/',
    // 公用别名
    commonAlias: {
        Static: 'static',
        '@': 'pages'
    },
    // 外部扩展
    externals: {
        // '$': 'JQuery'
    },
    // 公众模块(默认情况下common／js文件下的文件作为`commons chunk`打包)
    commons: {
        // demo: path.resolve(__dirname, '../src/pages/index/js/demo.js')
    },
    // 要打包的外部资源库
    library: [
        'axios',
        'vue',
        'vue-router'
    ],
    // 要引进外部资源库的页面(为空则全部引入)
    libraryEntry: [
        // 'index',
        // 'page2'
    ],
    // 本地开发端口
    port: 8009,
    // 本地开发代理
    proxy: {
        // '/api': {
        //  target: "http://*.com",
        //  changeOrigin: true,
        //  pathRewrite: {
        //      '^/api': ''
        //  },
        //  logLevel: 'error'
        // }
    }
}
```

* `isMultiplePage` <Boolean> 是否多入口打包
* `isOpenSyncImport` <Boolean> 是否启用异步加载功能（启用的状态下，`commons` 参数将失效）
* `minChunkSize` <Number> 最小chunk的大小 (`isOpenSyncImport` 参数为 `true` 是生效)
* `autoOpenBrowser` <Boolean> dev模式下是否自动打开页面
* `assetsRoot` <String> 资源文件目录 URL（参照webpack官方文档）
* `buildRoot` <String> 打包后的文件目录 URL（参照webpack官方文档）
* `staticAssets` <String> 在资源文件目录下的静态资源目录
* `publicPath` <String> 打包后的文件目录对应的公开 URL（参照webpack官方文档）
* `commonAlias` <Object> 公用别名（参照webpack官方文档）
* `externals` <Object> 外部扩展（参照webpack官方文档）
* `commons` <Object> 公众模块（默认情况下common／js文件下的文件作为`commons chunk`打包，在 `isOpenSyncImport` 参数启用的情况下将失效）
* `library` <Array> 要打包的外部资源库（填写模块名或引用路径）
* `libraryEntry` <Array> 要引进外部资源库的页面(为空则全部引入，填写页面名称，即入口文件夹名称)
* `port` <Number> 本地开发端口（默认为 `8009`）
* `proxy` <Object> 本地代理（参照[http-proxy-middleware文档](https://github.com/chimurai/http-proxy-middleware)）

## 备注

*如果遇到脚本语法兼容问题，请升级 `node` 版本。其它问题请[提交问题(issue)](https://github.com/Mrminfive/vue-multiple-page/issues/new)*

## 样式相关

#### rem转换

目前采用的是大漠他们的方案，[https://github.com/amfe/lib-flexible](https://github.com/amfe/lib-flexible)

在我们系统里，直接根据sketch的设计稿里，写对应的`px`单位

比如课程列表的顶上的tab在设计稿里高度是`80px`，于是在less里定义的时候高度就直接写`80px`

另外有2个特例

一个是像`1px`的边框，如果也转成rem的话，可能就太细，导致在手机里显示不出来。这个时候就要阻止它转换。

```less
.test {
  border: 1px solid #ccc;	/*no*/
}
```

按上面的例子所写的，在后面加一个`/*no*/`的注释，它就不会转换了。

还有一个是文字，文字转换成rem之后经常也会有问题，这个时候也应该保持`px`，但和边框这种不一样，不同的清晰度会使用不同大小的文字。这个借用`postcss-px2rem`的插件转换了。

```less
.test {
  font-size: 30px;	/*px*/
}
```

按上面写的例子，后面加一个`/*px*/`的注释，它会根据dpr，生成下面的代码

```css
[data-dpr="1"] .test {
	font-size: 15px;
}
[data-dpr="2"] .test {
	font-size: 30px;
}
[data-dpr="3"] .test {
	font-size: 45px;
}
```

#### 样式的命名

建议使用`BEM`的命名方式，虽然看上去比较长，但这样最大的好处是清晰，而且可以让选择器的层级不会太深

`BEM`的命名规则是：

`Block__Element--Modifier`

换成中文就是

`模块__元素--修饰`  或者如果没有`元素`的情况下用 `模块--修饰`

比如课程列表上的tab

模块就是`tab`，所以最外层就是`<div class="tab">`

这个tab的每一个标签是一个`元素`，我这边取名为`item`

所以标签的样式是`<a class="tab__item">`

标签它有一个被选中的样式，这个就是`修饰`

当一个标签被选中的时候，它的样式是`<a class="tab__item tab__item--active">`

虽然看上去比较长，但看起来很清晰

在less里定义很方便

```less
.tab {
  // tab模块的样式
  &__item {
    // 标签元素的样式
    &--active {
      // 被选中的标签元素样式
    }
  }
}
```

#### 组件和页面的样式

一般`组件`会考虑用`scoped`来限定作用域，这样就不易受外部影响了，里面的样式也不会与外面的冲突。

在`vue`文件里

```html
<style lang="less" src="...." scoped></style>
```
比如现在课程列表顶上的tab，在命名的时候被我命名为`tab`，当它被`scoped`起来之后，如果css里还有别的东西也是以`tab`命名，它们并不会冲突

而一般`页面`则不会去用`scoped`来限定作用域，可以考虑按`课程列表页`这样处理，整个页面最外层定义`Block`，这边取名为`course-list`，这个页面里的所有内容都会在这个`course-list`的`模块`里

比如课程列表的tab，虽然它在组件内部是一个`模块`，命名是`tab`，但对于外面这个页面，它只是页面上的一个`元素`，所以我取名为`course-list__tab`

理论上，这个tab`元素`在页面上怎么布局，与页面上别的元素的间隔如何，应该是要在页面里定义，而不是在`tab`这个组件里定义。所以可以看到我在组件内部并没有`position`属性，而是在页面上。这样组件还可以在不同的页面上，根据页面的布局复用。

#### 样式属性的声明顺序

正常情况下，一个样式的属性是要有顺序的，这样看上去会比较清晰。

css属性大体上可以分类：`定位类`、`盒模型`、`其它属性`

一般写属性的时候，按这3个的顺序来写

大体上理解就是：

`定位类`影响着元素要在页面的哪里显示，浏览器先要找到开始渲染的位置，它发生了变动，很有可能会引起后续元素进行重新定位。

`定位类`比如就是`position`、`left`、`z-index`

`盒模型`浏览器找到位置之后，还要知道渲染区域，盒模型影响元素要显示的尺寸，尺寸变化也可能引起后续元素的位置调整。

`盒模型`比如就是`display`、`width`、`margin`、`float`

`其它属性`位置和大小都已经确定好了之后，基本上就是元素内部的事情了。比如字体大小、背景色之类

#### 一些浏览器兼容较差的属性或单位可以考虑暂时先不要使用

比如`vw`在安卓4.4才开始支持，尽量可以看看有没别的什么属性可以绕过

可以参考[http://caniuse.com/](http://caniuse.com/)# vote-h5
# vote-h5
