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

[键盘码](http://keycode.info/)-每个按键都有一个对应的keyCode。

关键点：按键后触发声音和改变画面上的样式。

步骤分解：

Q1：获取键码

A1：

```js
document.querySelector(`audio[data-key] = "${e.keyCode}"`)
```

Q2：点击的键不在网页显示的键中，会报错

A2：

```js
if(audio) audio.play()
if(dom) dom.classList.add('playing')
```

Q3：快速点击一个键，让它连续播放

A3：音频播放前，设置`currentTime`为0。

Q4：如果一段动画中有多个属性，transitionend 事件会重复触发！

A4：

```js
if(e.propertyName === 'transform'){
  e.currentTarget.classList.remove('playing')
}
```

思考点：

- `const keys = Array.from(document.querySelectorAll('.key'))` 其中的Array.from是否可以省略？

​    I：`querySelectorAll`返回的是一个NodeList，类数组。

- HTML 中用`<kbd>`标签定义键盘上键入的文本。
- `getElementsByClassName` 和 `querySelectorAll`：前者是获取动态集合，后者是静态。静态就是只要你不重新获取一次就不会变。



### Day2 clock 纯JS实现一个时钟

Q: 指针旋转到12点的时候 会闪回跳跃的bug ，原因是指针是90° - 96°- 102° - ... 

解决办法1： 将特殊点的transition过程瞬间完成

解决办法2：只在页面第一次加载时 new 一次 Date 对象，此后每秒直接更新角度值。

该方法存在的小问题：角度值可能存在有效范围，页面一直跑的话，数值就能无限大了应该会有问题。

- 指针

  ```css
  .second-hand::after{
    position: absolute;
    content: "";
    top: 50%;
    left: 50%;
    display: block;
    width: 10px;
    height: 40%;
    background-color: red;
    transform: translate(-50%, 0%);
    /* transform: rotate(0deg); 增加度数实现秒针的顺时针旋转 */
  }
  ```

- 指针圆点

  ```css
  .clock-face::after{
    position: absolute;
    top: 50%;
    left: 50%;
    content: "";
    display: block;
    width: 15px;
    height: 15px;
    border-radius: 100%;
    background-color: #fff;
    transform: translate(-50%, -50%);
  }
  ```

- 时分秒换算

  ```js
  // 表盘1格（1小时）是30° 1小格（1分钟）是6°
  let secDeg = date.getSeconds() * 6
  let minDeg = date.getMinutes() * 6 + date.getSeconds() * 6 / 60
  let hourDeg = date.getHours() * 30 + date.getMinutes() * 30 / 60
  ```

- 计时器选择setInterval、setTimeout、requestAnimationFrame

  ```js
  // setInterval 隔...执行一次 再隔...再执行  按照间隔时间持续执行
  setInterval(setClock, 1000)
  // 持续动作 比如时钟或者轮播图
  
  // setTimeout 延迟 执行一次
  function timeoutHandler(){
    setClock()
    setTimeout(timeoutHandler, 1000)
  }
  setTimeout(timeoutHandler, 1000)
  // 如果直接调用setClock 动一次就不会再动了
  
  //requestAnimationFrame
  function animationHandler(){
    setClock()
    window.requestAnimationFrame(animationHandler)
  }
  window.requestAnimationFrame(animationHandler);
  // 根据屏幕设备性能去调用函数更新画面 适用于canvas动画
  ```

  

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



### Day6 type ahead 联想词列表

> 输入作者或者词语关键词，展示匹配到的古诗词

①获取数据

唐诗数据访问地址：https://gist.githubusercontent.com/neptoo/786c9140bfeee90bf850c2f3316d979d/raw/2aaa48ee3fa6a915b77197b3413d78a51726ee42/TangPoetry.json

```js
fetch(url)  // 获取Promise对象
  .then(blob=>blob.json())   //解析JSON数据
  .then(data => poetries.push(...data));  //存入数组
```

②查找匹配de函数

```js
function findMatch(wordToMatch, poetries) {
  return poetries.filter(poet => {
  // filter() 返回一个新的、由通过测试的元素组成的数组
   const regex = new RegExp(wordToMatch, 'gi');
      return poet.title.match(regex);
   })
}
```

③展示匹配内容de函数

1. 获取匹配数据

   > const matchArray = **findMatch**(this.value, poetries);  // 匹配数组
   >
   > const regex = new **RegExp**(this.value, 'gi');  //关键字

2. 替换关键词放入高亮的标签

   > const title = poet.title.**replace**(regex, `<span class="hlight">${ this.value }</span>`)

3. 将匹配值的 HTML 标签放入 `<ul>` 中

④绑定事件

获取两个主要 HTML 元素（`<input>`，`<ul>`），给 `<input>` 添加事件监听（`change`, `keyup`）



### Day8 html5 canvas 画布

```js
ctx.lineJoin = "round"; // 相连部分如何连接在一起 扇形拐角  || miter菱形(默认) || bevel矩形拐角
```

```js
ctx.lineCap = "round"; //线段末端以圆形结束 || butt方形
```



### Day10 按住 shift 实现 checkbox 多选

获取所有的checkbox

```js
const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
```

遍历并给每个checkbox添加事件

```js
checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck));
```

