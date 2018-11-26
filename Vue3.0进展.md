Vue 3.0 的发布时间：2019年下半年
* 更快
    ** 模板编译和Virtual DOM runtime(运行时)性能的优化

    ** 数据监听系统
        基于 Proxy 的新数据监听系统
            Vue2 的数据监听系统是基于 ES5 的 getter/setter,也就是 Object.defineProperty这个 API
            解决的具体问题：
                利用 Proxy 减少组件实例初始化开销
        全语言特性支持 + 更好的性能
            对象属性增添/删除
            数组 index/length更改
            Map,Set,WeakMap,WeakSet
            Classes

* 更小
    便于 Tree-shaking 的代码结构
        内置组件
        指令的运行时
        各种工具函数

* 更易于维护(目的是让团队更好的合作)
    Flow -> TypeScript
    内部模块解耦
        进一步降低源码阅读的难度
    编译器重构
        插件化设计
        带位置信息的 parser
        为更好的 IDE 工具链铺路(让开发IDE插件的开发者更容易开发Vue相关的插件)
            Vetur 的作者现在是 VS Code 团队的一员，微软已经同意他花三个月投入Vetur的改善

* 更好的多端渲染支持
    针对其他使用 vue 实现的框架(比如：使用 vue 去做小程序这样的框架的实现)

* 响应式数据监听 API

* 轻松排查组件更新的触发原因

* 更好的 TypeScript 支持，包括原生的 Class API 和 TSX

* 更好的警告信息
    组件堆栈包含函数式组件
    可以直接在警告信息中查看组件的 props
    在更多的警告中提供组件堆栈信息

* Experimental
    Hooks API
        作为一种逻辑复用机制，大概率取代 mixins
    Time Slicing Support

* 关于 IE
    会有一个专门的版本，在 IE11 中自动降级为旧的 getter/setter 机制，并对 IE 中不支持的用法给出警告
    