# canvas-combo
用canvas合并通栏图片，用于解决大图拆分后图片缩放导致的1像素bug


## 使用方法

_* 先把文档写完再写代码_

```HTML
<body>
	<div id="wrap"></div>
</body>
```


```Javascript
// canvasCombo(wrapElm, params);
canvasCombo('#wrap', {
	images: [
		'image1',
		'image2',
		'image3'
	]
	// options...
});
```

### 参数

- images Array 需要拼接的图片列表


### 输出

```HTML
<body>
	<div id="wrap">
		<img class="j-canvas-combo" src="datauri">
	</div>
</body>
```