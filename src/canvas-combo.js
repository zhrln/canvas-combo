/**
 * Created by zhangrui on Fri Jan 29 2016.
 */

(function(win, lib){

    if(lib.CanvasCombo) return;

    var imageStorage = {};

    var statusMap = [
        'unknow',
        'loading',
        'complete'
    ];

    var CanvasCombo = function(wrapElm, params){
        init.apply(this, arguments);
    };

    var fn = CanvasCombo.prototype;

    function init(wrapElm, params){
        var _newCanvasObj = getNewCanvasObj();

        this.imageQueue = [];
        this.loadStatus = 0;
        this.contentImage = createContentImage();
        this.$wrap = typeof wrapElm === 'string' ? document.querySelector(wrapElm) : wrapElm;

        this._canvas = _newCanvasObj.canvas;
        this._context = _newCanvasObj.context;

        if(params && params.images && params.images.length){
            this.original = params.images;
            this.add(params.images);
        }

        appendToWrap(this.$wrap, this.contentImage);
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
        var _canvas = document.createElement('canvas');
        return {
            canvas: _canvas,
            context: _canvas.getContext("2d")
        }
    }

    function getImageData(src, callback){
        if(imageStorage[src]){
            success && success(imageStorage[src]);
            return;
        }
        var _img = new Image();
        var templateCanvas = getNewCanvasObj();
        _img.crossOrigin = 'anonymous';
        _img.onload = function(){
            templateCanvas.canvas.width = this.width;
            templateCanvas.canvas.height = this.height;
            templateCanvas.context.drawImage(this, 0, 0);
            imageStorage[src] = {
                width: this.width,
                height: this.height,
                datauri: templateCanvas.canvas.toDataURL("image/png")
            };
            _img = null;
            templateCanvas = null;
            callback && callback(null, imageStorage[src]);
        };
        _img.onerror = function(){
            callback && callback('err')
        };
        _img.src = src;
    }

    function pullImageData(){
        if(this.imageQueue.length == 0){
            this.loadStatus = 0;
            return;
        }
        this.loadStatus = 1;
        var _imgsrc = this.imageQueue.shift();
        getImageData(_imgsrc, function(err, data){
            if(!err){
                render.call(this, data, _imgsrc);
                pullImageData.call(this);
            }
        }.bind(this));
    }

    function render(data){
        // TODO 完成渲染逻辑
    }

    fn.pullImageData = function(){
        if(this.loadStatus == 1){
            return;
        }
        pullImageData.call(this);
    };

    fn.add = function(imgsrc){
        if(typeof imgsrc === 'string'){
            this.imageQueue.push(imgsrc);
        }else if(imgsrc && Object.prototype.toString.call(imgsrc) === '[object Array]'){
            Array.prototype.push.apply(this.imageQueue, imgsrc);
        }else{
            return 0;
        }
        this.pullImageData();
    };

    fn.render = function(){
        this.contentImage.src = this._canvas.toDataURL("image/png");
    };

    lib.CanvasCombo = CanvasCombo;


}(window, window['lib'] || (window['lib'] = {})));
