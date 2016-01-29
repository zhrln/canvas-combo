/**
 * Created by zhangrui on Fri Jan 29 2016.
 */

(function(win, lib){

    if(lib.CanvasCombo) return;

    var CanvasCombo = function(wrapElm, params){
        this._canvas = document.createElement('canvas');
        this._context = this._canvas.getContext("2d");
        this.init();
    };

    var fn = CanvasCombo.prototype;

    fn.init = function(){

    };

    lib.CanvasCombo = CanvasCombo;


}(window, window['lib'] || (window['lib'] = {})));
