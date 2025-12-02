# *03_vue笔记*

小鹿线前端开发 视频讲解     https://www.bilibili.com/video/BV15z4y1a7MN/?p=56

掘金博客超详细                   https://juejin.cn/post/6996841019094335519

.

# 01_v-if和v-show的区别3点

1.v-if效率低 , v-show效率高

2.v-if:会编译/卸载的过程(删除/添加)，切换过程中会适当的销毁和重建内部的事件监听和子组件；才是真正的条件渲染,会触发声明周期;

3.v-show:只是简单的css切换,display值来让元素显示和隐藏,v-show从false变成true的时候不会触发组件的声明周期

# 02_如何理解MVVM的

M：模型，对应的就是data的数据

V:   视图，用户界面，DOM

VM：视图模型：Vue的实例对象，连接ViewModel的桥梁核心是提双向数据绑定,当数据改变的时候, ViewModel能监听到数据的变化, 自动更新视图,当用户操作视图的时候,ViewModel也可以监听到视图的变化,然后通知数据进行改动,这就实现了双向数据绑定ViewModel通过双向绑定把View和Model连接起来,他们之间的同步是自动的,不需要认为干涉,所以我们只需要关注业务逻辑即可，不需要操作DOM，同时也不需要关注数据的状态问题，因为她是由MVVM统一管理

.

# 03_v-for中的key值的3种作用

key属性是DOM元素的唯一标识作用：

1.提高虚拟DOM的更新,diff算法使用(diff算法是同级进行比较)

2.若不设置key，可能会触发一些bug(例如列表,更新第1行数据,但影响了第2行)

3.为了触发过度效果 (只会替换当前数据,不会影响其他效果)

.

# 04_vue生命周期

1.创建

    beforeCreat              在这个阶段属性和方法都不能使用

    created                     这里时实例创建完成之后，在这里完成了数据监测，可以使用数据，修改数据，不会触发updated，也不会更新视图

2.挂载

    beforeMount            完成了模板的编译，虚拟DOM也完成创建，即将渲染，修改数据，不会触发

    updatedMounted     把编译好的模板挂载到页面，这里可以发送异步请求也可以访问DOM节点

3.更新

    beforeUpdate           组件数据更新之前使用，数据是新的，页面上的数据时旧的，组件即将更新，准备渲染，可以改数据

    updatedrender         重新做了渲染,这时数据和页面都是新的,避免在此更新数据

4.销毁

    beforeDestroy           实例销毁前,在这里实例还可以用,可以清楚定时器等等

    destroyed                  组件已经被销毁了，全部都销毁

5.使用了keep-alive时多出两个周期：

    activited组件激活时

    deactivited组件被销毁时

.

# 05_在created和mounted去请求数据有什么区别

created：渲染前先初始化属性，再做渲染

mounted：模板渲染完成后，一般都是初始化页面后，请求的数据时,元素节点渲染可能出现闪屏的问题，created里不会

总结:

一般用created时,发起请求比较多

对DOM无关的请求数据，可以放在mounted

对DOM有影响的请求的数据，一般使用created

# 06_vue中的修饰符有5大类

1.事件修饰符

    .stop    组织冒泡

    .prevent   组织默认行为

    .capture   内部元素触发的事件先在次处理

    .self  只有在event

    .target  是当前元素时触发

    .once  事件只会触发一次

    .passive  立即触发默认行为

    .native   把当前元素作为原生标签看待

2.按键修饰符

   .keyup   键盘抬起

   .keydown   键盘按下

3.系统修饰符

    .ctrl

    .alt

    .meta

4.鼠标修饰符

    .left  鼠标左键

    .right  鼠标右键

    .middle  鼠标中键

5.表单修饰符

    .lazy   等输入完之后再显示

    .trim   删除内容前后的空格

    .number   输入是数字或转为数字

# 07_elementui是怎么做表单验证的

1.在表单中加rules属性，然后再vue中的data里写校验规则

2.内部添加规则

3.自定义函数校验

4.最舒服的方式时写jsx语法去检验表达

# 08_vue如何进行组件通信4种方式

1.父传子

    props:    父组件绑定属性,子组件定义props接收数据

    $ref:        父组件中子组件绑定ref,父组件可以控制子组件

2.子传父

    $emit:    子组件绑定自定义事件,触发执行后,传给父组件,父组件需要用事件监听来接收参数

3.兄弟传

    new一个新的vue实例，用on和emit来对数据进行传输

4.vuex/pinia

    共享数据

.

# 09_keep-alive是什么

Vue的一个内置组件,包裹组件的时候,会缓存不活跃的组件实例,并不是销毁他们

作用:把组件切换的状态保存在内存里,防止重复渲染DOM节点,减少加载时间和性能消耗,提高用户体验

# 10_axios是怎么做封装的

创建实例

接着封装请求响应拦截器

抛出

最后封装接口

.

# 11_vue路由时怎么传参

params传参

    this.router.push(name:"index",params:{id:item:id})

    this.router.params.id

路由属性传参

    this.$router.push({name: '/index/${item.id}'})

    路由配置 { path:'/index:id' }

query传参（可以解决页面刷新参数丢失的问题)

    this.$router.push({ name: 'index', query: {id:item.id})

.

# 12_vue路由的hash模式和history模式有什么区别

1.hash的路由地址上有#号, history模式没有

2.在做回车刷新的时候, hash模式会加载对应页面, history会报错404

3.hash模式支持低版本浏览器, history不支持,因为是H5新增的API

4.hash不会重新加载页面，单页面应用必备

5.history有历史记录, H5新增了pushstate和replaceState()去修改历史记录,并不会立刻发送请求

6.history需要后台配置

.

# 13_路由拦截是怎么实现的

路由拦截使用router.beforeEach

// 在每次路由改变之前执行

router.beforeEach((to, from, next) => {

  // 检查用户是否已登录

  const isLogged = !!localStorage.getItem('user')

  // 如果用户未登录，且要访问的不是登录页，则重定向到登录页

  if (!isLogged && to.path !== '/login') {

    next('/login')

  } else {

    next()

  }

})

.

# 14_说一下vue的动态路由

要在路由配置里设置meat属性,扩展权限相关的字段,在路由导航守卫里通过判断这个权限标识,实现路由的动态增加和跳转

根据用户登录的账号，返回用户角色

前端再根据角色,跟路由表的meta.role进行匹配

把匹配搭配的路由形成可访问的路由

.

# 15_如何解决刷新后二次加载路由

1.window.location.reload()

2.matcher

const router = createRouter()

export function resetRouter(){

   const newRouter = creatRouter()

   router.matcher = newRouter.matcher

}

.

# 16_vuex刷新数据会丢失吗_怎么解决

vuex肯定会重新获取数据，页面也会丢失数据

1.把数据直接保存在浏览器缓存里(cookie localstorage sessionstorage)

2·页面刷新的时候,再次请求数据,达到可以动态更新的方法监听浏览器的刷新书简,在刷新前把数据保存到sessionstorage里,刷新后请求数据,请求到了用vuex,如果没有那就用sessionstorage里的数据

.

# 17_computed和watch的区别

1.computed是计算属性, watch是监听,监听的是data中数据的变化

2.computed是支持缓存,依赖的属性值发生变化,计算属性才会重新计算,否则用缓存; watch不支持缓存

3.computed不支持异步，watch是可以异步操作

4.computed是第一次加载就监听，watch是不监听

5.computed函数中必须有return watch不用

.

# 18_vuex在什么场景会去使用

使用场景：用户的个人信息、购物车模块、订单模块

state存储变量

gettersstate的计算属性

mutations提交更新数据的方法和mutations差不多，他是提交mutations来修改数据，可以包括异步操作

modules模块化vuexactions

.

# 19_vue的双向数据绑定原理是什么

通过数据劫持和发布订阅者模式来实现，同时利用object.defineProperty（）劫持各个属性的setter和getter，

在数据发生改变的时候发布消息给订阅者,触发对应的监听回调渲染视图,也就是说数据和视图时同步的,数据发生改变,视图跟着发生改变,视图改变,数据也会发生改变。

第一步:需要observer的数据对象进行递归遍历,包括子属性对象的属性,都加上setter和getter

第二步: compile模板解析指令,把模板中的变量替换成数据,然后初始化渲染视图,同时把每个指令对应的节点绑定上更新函数,添加订阅者,如果数据变化,收到通知,更新视图

第三步: watcher订阅者是Observer和Compile之间的通信桥梁,作用:

    1.在自身实例化的时候忘订阅器内添加自己

    2.自身要有一个update()方法

    3.等待属性变动时,调用自身的update方法,触发compile这种的回调

第四步:**MVVM作为数据绑定的入口,整合了observer、compile和watcher三者,通过observer来监听自己的数据变化,通过compile解析模板指令,最后利用watcher把observer和compile联系起来,最终达到数据**更新视图更新,视图更新数据更新的效果

.

# 20_了解diff算法和虚拟DOM吗

虚拟DOM:   描述元素和元素之间的关系,创建一个JS对象如果组件内有响应的数据,数据发生改变的时候, render函数会生成一个新的虚拟DOM,这个新的虚拟DOM会和旧的虚拟DOM进行比对,找到需要修改的虚拟DOM内容,然后去对应的真实DOM中修改

diff算法:     就是虚拟DOM的比对时用的,返回一个patch对象,这个对象的作用就是存储两个节点不同的地方,最后用patch里记录的信息进行更新真实DOM

步骤：

1.JS对象表示真实的DOM结构,要生成一个虚拟DOM,再用虚拟DOM构建一个真实DOM树,渲染到页面

2.状态改变生成新的虚拟DOM,跟就得虚拟DOM进行比对,这个比对的过程就是DIFF算法,利用patch记录差异

3,把记录的差异用在第一个虚拟DOM生成的真实DOM上,视图就更新了。

.

# 21_vue和jquery的区别是什么

1.原理不同vue就是数据绑定;jq是先获取dom再处理

2.着重点不同vue是数据驱动，jq是着重于页面

3.操作不同vue是生命式编程,jq是命令式编程

.

# 22_vuex的响应式处理

vuex是vue的状态管理工具

vue中可以直接触发methods中的方法， vuex是不可以的。未来处理异步，当触发事件的时候,会通过dispatch来访问actions中的方法,

 actions中的commit会触发mutations中的方法从而修改state里的值,通过getter把数据更新到视图

Vue.use(vuex),调用install方法,通过applyMixin(vue)在任意组件内执行this.$store就可以访问到store对象。vuex的state是响应式的，借助的就是vue的data，把state存到vue实例组件的data中

.

# 23_vue中遍历全局的方法有哪些

直接使用lodash库

# 24_如何搭建脚手架

下载: node cnpm webpack vue-cli创建项目：

1.找到对应的文件，然后利用node指令创建(cmd)

2.vue init webpack xxxx

3. 回车项目描述

4.作者回车

5.选择vue build

6.回车

7.输入n

8.不安装yarn

9.输入npm run dev

.

# 25_如何封装一个组件

1.使用Vue.extend（）创建一个组件

2.使用Vue.components()方法注册组件

3,如果子组件需要数据,可以在props中接收定义

4.子组件修改好数据，要把数据传递给父组件,可以用emit()方法

原则：

把功能拆开

尽量让组件原子化,一个组件做一件事情

容器组件管数据，展示组件管视图

.

# 26_封装一个可复用的组件_需要满足什么条件

1.低耦合,组件之间的依赖越小越好

2.最好从父级传入信息,不要在公共组件中请求数据

3·传入的数据要进行校验

4·处理事件的方法写在父组件中

.

# 27_vue的过滤器怎么使用

vue的特性，用来对文本进行格式化处理使用它的两个地方，一个是插值表达式，一个是v-bind

分类：

1.全局过滤器Vue.filter

2.本地过滤器和methods同级filter:

.

# 28_vue中如何做强制刷新

1.localtion.reload()

2.this.$router.go(0)

3.provide和iniect

.

# 29_vue3和vue2有哪些区别

1.双向数据绑定的原理不同

2.是否支持碎片

3.API不同

4.定义数据变量方法不同  vue2.data    vue3使用setup响应是数据

5·生命周期的不同        vue2主要生命周期是mounted       vue3创建时setup 挂载是onmounted

6.传值不同            vue2使用props,$emit        vue3使用provide/inject

7.指令和插槽不同

8.main.js不同  vue2可以直接写原型   vue3使用工厂函数没有根标签

coplit回答

1. **性能** ：Vue 3 在性能上有显著的提升。它的渲染速度比 Vue 2 快，内存使用也更少。
2. **组合式 API** ：Vue 3 引入了组合式 API，这是一种新的编写组件的方式，可以更好地重用和组织代码。
3. **Fragment、Teleport 和 Suspense** ：Vue 3 引入了新的内置组件，如 Fragment（允许一个组件有多个根节点）、Teleport（可以将子组件渲染到 DOM 的任何位置）和 Suspense（用于处理异步组件的加载状态）。
4. **更好的 TypeScript 支持** ：Vue 3 的源码完全用 TypeScript 重写，因此对 TypeScript 的支持更好。
5. **自定义渲染 API** ：Vue 3 提供了更底层的 API，允许开发者自定义渲染过程。
6. **更小的体积** ：由于 Vue 3 的设计更加模块化，因此可以通过 tree-shaking 移除未使用的代码，从而减小最终的打包体积。
7. **更好的安全性** ：Vue 3 对于 XSS 攻击有更好的防护。
8. **响应式系统** ：Vue 3 使用 Proxy 重写了响应式系统，而 Vue 2 使用的是 Object.defineProperty。

# **30_vue的性能优化怎么做**

1.编码优化

    不要把所有数据都放在data中

    v-for时给每个元素绑定事件用事件代理

    keep-alive缓存组件

    分组件，提高复用性、维护性

    key值要保证唯一

    路由懒加载，异步组件

    数据持久化存储的使用尽量用防抖、节流优化

2.加载优化

    按需加载

    内容懒加载

    图片懒加载

3.用户体验

    骨架屏

4.SEO优化

    预渲染服务端

    渲染ssr

5.打包优化

    CDN形式加载第三方模块

    多线程打包

    抽离公共文件

6.缓存和压缩

    客户端缓存

    服务端缓存

    服务端Gzip压缩

.

# 31_首屏优化该如何去做

1.使用路由懒加载

2.非首屏组件使用异步组件

3.首屏不中要的组件延迟加载

4.静态资源放在CDN上

5.减少首屏上js,css等资源文件的大小

6.使用服务端渲染

7.简历减少DOM的数量和层级

8.使用精灵图请求

9.做一些loading

10.开启Gzip压缩1

1.图片懒加载

# 32_vue3的性能为什么比vue2好

1.diff算法的优化

2.静态提升

3.事件侦听缓存

.

# 33_vue3为什么使用proxy

1.proxy可以代理整个对象, defineproperty只代理对象上的某个属性

2.proxy对代理对象的监听更加丰富

3.proxy代理对象会生成新的对象,不会修改被代理对象本身

4.proxy补兼容ie浏览器

# 34_说一下你对组件的理解

可以重复使用的vue实例，独一无二的组件名称

可以抽离单独的公共模块

提高代码的复用率

# 35_你是如何规划项目文件的

public

   图标、index.html、img

src

    api

    assets

    components

    plugins

    router

    static

    styles

    utils

    views

App.vue

main.js

package.json

vue.config.js

.

# 36_是否使用过nuxt

是基于vue的应用框架，关注的是渲染，可以开发服务端渲染应用的配置

SSR：服务端渲染

    好处：

    SSR生成的是有内容的HTML页面，有利于搜索引擎的搜索

    优化了首屏加载时间

SEO:优化搜索引擎

SPA的应用不利于搜索引擎SEO的操作

.

# 37_SEO如何优化

1.SSR

2.预渲染  prerender-spa-plugin       博客文章   https://juejin.cn/post/7059771777525743624
