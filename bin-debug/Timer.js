var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Timer = (function (_super) {
    __extends(Timer, _super);
    function Timer() {
        return _super.call(this) || this;
    }
    /**
     * 构造一个timer的单例模式
     */
    Timer.getInstance = function () {
        if (!this.instance) {
            this.instance = new Timer();
        }
        return this.instance;
    };
    return Timer;
}(egret.Sprite));
__reflect(Timer.prototype, "Timer");
