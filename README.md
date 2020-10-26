# javascript-30

wesbos 的30天纯 JS 挑战：[javascript30-github](https://github.com/wesbos/JavaScript30)，另外每天学到的东西会记录在README.md文件中。



## 在线预览

Day1: [Drum-Kit](https://neptoo.github.io/javascript-30/01-drum-kit/index.html)

Day2: [Clock](https://neptoo.github.io/javascript-30/02-clock/index.html)

Day3: [Update Photo Setting](https://neptoo.github.io/javascript-30/03-css-variables/index.html)

## 个人笔记

### Day1 drum kit 纯JS模拟打鼓效果

素材：

[音频下载](https://freesound.org/)

[键盘码](http://keycode.info/)



### Day2 clock 纯JS实现一个时钟

1.调整指针旋转的轴点 transform-origin

```css
transform-origin: 100%; // 默认是50%
```



2.指针旋转到12点的时候 会闪回跳跃的bug ，原因是指针是90° - 96°- 102° - ... 

解决办法1： 将特殊点的transition过程瞬间完成



解决办法2：只在页面第一次加载时 new 一次 Date 对象，此后每秒直接更新角度值。

该方法存在的小问题：角度值可能存在有效范围，页面一直跑的话，数值就能无限大了应该会有问题。



### Day3 用JS更新CSS variable

重点：

获取页面中 `input` 元素，用`for-each` 给每个`input`添加监听事件（change/mouseover），使其值变动，触发更新操作。

**自定义变量**

```html
<input data-emoji="😏" >

<script>
  const face = this.dataset.emoji; //😏
</script>
```

**css variable**: 在`root`中声明**全局变量**，再使用。

```html
<style>
  :root{
    --base: #eee;
  }
  div {
    color: var(--base);
  }
</style>
```

**如何用 JavaScript 改变 CSS 属性值？**

在 JavaScript 中 `document.documentElement` 即代表文档根元素。所以要改变全局的 CSS 变量，可以这样写：

```javascript
document.documentElement.style.setProperty(`--${thi.name}`, this.value + suffix);
// ('--base', #A0BEEE);
```

### Day4 Array 方法1

```
Filter the list of inventors for those who were born in the 1500's
```



```
Give us an array of the inventors first and last names
```



```
Sort the inventors by birthdate, oldest to youngest
```



```
How many years did all the inventors live all together?
```



#### 综合

```
Create a list of Books in Douban that contain 'de' anywhere in the name
```



### Day5 flex可伸缩画廊

Ⅰ.让图片均匀地占据空间：

将`.panels` 设置为 `display: flex;`，设置 `.panel` 的属性为`flex:1;`

Ⅱ.字母大写 `p{ text-transform: uppercase; }`

Ⅲ.设置默认状态下首尾字母的状态和点击之后文字状态

```css
.panel>*:first-child {
  transform: translateY(-100%);
}

.panel.open-active>*:first-child {
  transform: translateY(0);
}
```

Ⅳ.js部分

获取所有`.panel`的元素，用`forEach`遍历`panel`

给panel添加`click`监听事件（给触发的 DOM 元素添加样式，实现拉伸/压缩的效果)

添加 `transitionend` 事件监听，编写调用的函数（添加/去掉样式，实现文字的飞入/飞出效果）

