# *①01_css笔记* 


*小鹿线前端开发 视频讲解*https://www.bilibili.com/video/BV15z4y1a7MN/?p=2

掘金博客超详细                   https://juejin.cn/post/6996841019094335519

# 01_css盒模型

在HTML页面中的所有元素都可以看成是一个盒子

盒子的组成:内容content、内边距padding、边框border、外边距margin

盒模型的类型：box-sizing

IE盒模型           border-box  : margin +content(border+padding)

标准盒模型       content-box : margin +border +padding +content

.

# 02_css选择器优先级大小

css的特性 : 继承性 , 层叠性 , 优先级

继承性:?

层叠性:?

优先级:写css样式的时候,会给同一个元素添加多个样式,此时谁的权重高就显示谁的样式

!important>行内样式>id>类/伪类/属性>标签

# 03_css隐藏元素4种方法

display:none        ;元素在页面上消失,不占据空间位置

opacity:0           ;设置元素透明度为0,元素不可见,占据控件位置

visibility: hidden  ;元素在页面上消失,不占据空间位置

position: absolute  ;从当前位置,移动动到别的位置,还是可见

clip-path           ;元素剪切掉-修剪掉      掘金笔记      https://juejin.cn/post/7163075335058096141

.

# 04_px和rem的区别是什么

px是像素，显示器上给我们呈现画面的像素，每个像素的大小是一样，绝对单位长度

rem,相对单位,相对于html根节点的font-size的值,直接给html节点的font-size：62.5%；1rm=10px; (16px*62.5%=10px)

# 05_css重排重绘有什么区别

重排:(回流)布局引擎会根据所有的样式计算出盒模型在页面上的位置和大小

重绘:计算好盒模型的位置、大小和其他一些属性之后,浏览器就会根据每个盒模型的特性进行绘制浏览器的渲染机制

重排===对DOM的大小、位置进行修改后，浏览器需要重新计算元素的这些几何属性，就叫重排

重绘===对DOM的样式进行修改，比如color和background，浏览器不需要重新计算几何属性的时,直接绘制该元素的新样式,这里就只触发了重绘

.

# 06_让元素水平垂直居中有5种方法

1.定位+margin

2.定位+transform

3.flex布局

4.grid布局

5.table布局

.

# 07_css常用7种属性可以被基础

css的三大特性：继承、层叠、优先级

子元素可以继承父类元素的样式

1.字体的一些属性：font

2.文本的一些属性： line-height

3.元素的可见性: visibility:hidden

4.表格布局的属性: border-spacing

5.列表的属性： list-style

6.页面样式属性: page

7.声音的样式属性

.

# 08_有没有用过预处理器

预处理语言增加了变量、函数、混入等强大的功能 sass less
