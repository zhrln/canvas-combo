/**
 * Created by zhangrui on Fri Jan 29 2016.
 */

/*
 var statusMap = [
 'unknow',
 'loading',
 'complete'
 ];
 */

(function(win, lib){

    'use strict';

    if(lib.CanvasCombo) return;

    var imageStorage = {};

    var supportCORS = (function(img){return (img.crossOrigin !== undefined)}(new Image));

    var CanvasCombo = function(wrapElm, params){
        if(!supportCORS){
            console.warn('浏览器不支持CORS');
        }
        init.apply(this, arguments);
    };

    function unSupportFun(){

        if(this.$wrap.className.indexOf('j-unsupport-cors') == -1){
            this.$wrap.className += ' j-unsupport-cors';
        }

        var _tmp = document.createDocumentFragment(),
            img;

        while(this.imageQueue.length){
            img  = createContentImage();
            img.src = this.imageQueue.shift();
            _tmp.appendChild(img);
        }

        appendToWrap(this.$wrap, _tmp);
    }

    var fn = CanvasCombo.prototype;

    function init(wrapElm, params){
        var _newCanvasObj = getNewCanvasObj();

        this.imageQueue = [];
        this.loadStatus = 0;
        this.$wrap = typeof wrapElm === 'string' ? document.querySelector(wrapElm) : wrapElm;

        this._canvas = _newCanvasObj.canvas;
        this._context = _newCanvasObj.context;

        if(params && params.images && params.images.length){
            this.add(params.images);
        }

        if(this.$wrap.tagName && this.$wrap.tagName.toLowerCase() == 'img'){
            if(!supportCORS){
                throw new Error('浏览器不支持CORS,需要设置一个不是IMG的容器');
            }
            this.contentImage = this.$wrap;
        }else{
            if(supportCORS){
                this.contentImage = createContentImage();
                appendToWrap(this.$wrap, this.contentImage);
            }
        }
    }

    function createContentImage(){
        var _img = new Image();
        _img.className = 'j-canvas-combo';
        return _img;
    }

    function appendToWrap(wrapElm, elm){
        wrapElm.appendChild(elm);
    }

    function getNewCanvasObj(){
        var _canvas = document.createElement('canvas'),
            _context = _canvas.getContext("2d");
        _canvas.width = 0;
        _canvas.height = 0;
        return {
            canvas: _canvas,
            context: _context
        }
    }

    function getImageData(src, callback){
        if(imageStorage[src]){
            callback && callback(null, imageStorage[src]);
            return;
        }
        var _img = new Image();
        _img.crossOrigin = 'anonymous';
        _img.onload = function(){
            imageStorage[src] = this;
            _img = null;
            callback && callback(null, imageStorage[src]);
        };
        _img.onerror = function(){
            _img = null;
            callback && callback('err')
        };
        _img.src = src;
    }

    function pullImageData(){
        if(this.loadStatus == 1){
            return;
        }
        if(this.imageQueue.length == 0){
            if(this.loadStatus == 2){
                draw.call(this, combo.call(this));
                render.call(this);
                this.imgTmpCache = [];
            }
            this.loadStatus = 0;
            return;
        }
        this.loadStatus = 1;
        this.imgTmpCache = this.imgTmpCache || [];
        var _imgSrc = this.imageQueue.shift();
        getImageData(_imgSrc, function(err, img){
            if(!err){
                this.imgTmpCache.push(img);
                this.loadStatus = 2;
                pullImageData.call(this);
            }
        }.bind(this));
    }

    function combo(){
        this.tempCanvasObj = this.tempCanvasObj || getNewCanvasObj();
        var calcHeight = 0,
            calcWidth = 0,
            lastHeight = 0,
            tempCanvasObj = this.tempCanvasObj,
            arr = this.imgTmpCache;
        arr.forEach(function(n){
            calcHeight += n.height;
            calcWidth = Math.max(calcWidth, n.width);
        });
        tempCanvasObj.canvas.width = calcWidth;
        tempCanvasObj.canvas.height = calcHeight;
        tempCanvasObj.context.fillStyle = "#ffffff";
        tempCanvasObj.context.fillRect(0, 0, calcWidth, calcHeight);
        arr.forEach(function(n){
            tempCanvasObj.context.drawImage(n, 0, lastHeight);
            lastHeight += n.height;
        });
        return tempCanvasObj.context.getImageData(0, 0, tempCanvasObj.canvas.width, tempCanvasObj.canvas.height);
    }

    function draw(imageData){
        var lastHeight = this._canvas.height;
        var lastImageData;
        if(this._canvas.width && this._canvas.height){
            lastImageData = this._context.getImageData(0, 0, this._canvas.width, this._canvas.height);
        }
        this._canvas.width = Math.max(this._canvas.width, imageData.width);
        this._canvas.height += imageData.height;

        if(lastImageData){
            this._context.putImageData(lastImageData, 0, 0);
        }
        this._context.putImageData(imageData, 0, lastHeight);
    }

    function render(){
        this.contentImage.src = this._canvas.toDataURL("image/jpeg");
    }

    fn.add = function(imgSrc){
        if(typeof imgSrc === 'string'){
            this.imageQueue.push(imgSrc);
        }else if(imgSrc && Object.prototype.toString.call(imgSrc) === '[object Array]'){
            Array.prototype.push.apply(this.imageQueue, imgSrc);
        }else{
            return 0;
        }
        if(supportCORS){
            pullImageData.call(this);
        }else{
            unSupportFun.call(this);
        }
    };

    fn.supportCORS = function(){
        return supportCORS;
    };

    lib.CanvasCombo = CanvasCombo;

}(window, window['lib'] || (window['lib'] = {})));
