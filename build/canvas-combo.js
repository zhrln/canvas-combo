!function(t,a){"use strict";function i(t,a){var i=s();this.imageQueue=[],this.loadStatus=0,this.$wrap="string"==typeof t?document.querySelector(t):t,this._canvas=i.canvas,this._context=i.context,a&&a.images&&a.images.length&&this.add(a.images),this.$wrap.tagName&&"img"==this.$wrap.tagName.toLowerCase()?this.contentImage=this.$wrap:(this.contentImage=e(),n(this.$wrap,this.contentImage))}function e(){var t=new Image;return t.className="j-canvas-combo",t}function n(t,a){t.appendChild(a)}function s(){var t=document.createElement("canvas"),a=t.getContext("2d");return t.width=0,t.height=0,{canvas:t,context:a}}function h(t,a){if(g[t])return void(a&&a(null,g[t]));var i=new Image;i.crossOrigin="anonymous",i.onload=function(){g[t]=this,i=null,a&&a(null,g[t])},i.onerror=function(){i=null,a&&a("err")},i.src=t}function c(){if(1!=this.loadStatus){if(0==this.imageQueue.length)return 2==this.loadStatus&&(u.call(this,o.call(this)),r.call(this),this.imgTmpCache=[]),void(this.loadStatus=0);this.loadStatus=1,this.imgTmpCache=this.imgTmpCache||[];var t=this.imageQueue.shift();h(t,function(t,a){t||(this.imgTmpCache.push(a),this.loadStatus=2,c.call(this))}.bind(this))}}function o(){this.tempCanvasObj=this.tempCanvasObj||s();var t=0,a=0,i=0,e=this.tempCanvasObj,n=this.imgTmpCache;return n.forEach(function(i){t+=i.height,a=Math.max(a,i.width)}),e.canvas.width=a,e.canvas.height=t,e.context.fillStyle="#ffffff",e.context.fillRect(0,0,a,t),n.forEach(function(t){e.context.drawImage(t,0,i),i+=t.height}),e.context.getImageData(0,0,e.canvas.width,e.canvas.height)}function u(t){var a,i=this._canvas.height;this._canvas.width&&this._canvas.height&&(a=this._context.getImageData(0,0,this._canvas.width,this._canvas.height)),this._canvas.width=Math.max(this._canvas.width,t.width),this._canvas.height+=t.height,a&&this._context.putImageData(a,0,0),this._context.putImageData(t,0,i)}function r(){this.contentImage.src=this._canvas.toDataURL("image/jpeg")}if(!a.CanvasCombo){var g={},m=function(t,a){i.apply(this,arguments)},l=m.prototype;l.add=function(t){if("string"==typeof t)this.imageQueue.push(t);else{if(!t||"[object Array]"!==Object.prototype.toString.call(t))return 0;Array.prototype.push.apply(this.imageQueue,t)}c.call(this)},a.CanvasCombo=m}}(window,window.lib||(window.lib={}));