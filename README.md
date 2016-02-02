# canvas-combo
用canvas合并通栏图片，用于解决大图拆分后图片缩放导致的1像素bug


## 使用方法

```HTML
<body>
    <div id="wrap1"></div>
    <img id="img1">
</body>
```

```Javascript
// 可以制定一个容器
var CanvasCombo = require('canvas-combo');
var canvasCombo1 = new CanvasCombo('#wrap1', {
    images: [
        'image1',
        'image2',
        'image3'
    ]
    // options...
});

// 也可以制定一个图片元素
var canvasCombo2 = new CanvasCombo('#img1', {
    images: [
        'image4',
        'image5',
        'image6'
    ]
    // options...
});

// 还可以追加图片
canvasCombo.add('image4')  // 添加单张图片
canvasCombo.add(['image4', 'image5'])  //添加一组图片
```

### 参数

```
new CanvasCombo(wrapElm | imgElm, {
	images: Array // 需要拼接的图片列表
})
```


### API

- canvasCombo.add('image4')  添加单张图片
- canvasCombo.add(['image4', 'image5'])  添加一组图片

### 输出

```HTML
<body>
    <div id="wrap1">
        <img class="j-canvas-combo" src="datauri">
    </div>
    <img id="img1" src="datauri">
</body>
```
