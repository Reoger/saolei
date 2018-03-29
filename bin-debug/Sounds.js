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
var Sounds = (function (_super) {
    __extends(Sounds, _super);
    function Sounds() {
        var _this = _super.call(this) || this;
        var sound = _this._sound = new egret.Sound();
        sound.load("resource/9882.wav");
        sound.addEventListener(egret.Event.COMPLETE, function (e) {
            this.init();
        }, _this);
        return _this;
    }
    Sounds.prototype.init = function () {
        this.play();
    };
    //播放
    Sounds.prototype.play = function () {
        //sound 播放会返回一个 SoundChannel 对象，暂停、音量等操作请控制此对象
        this._channel = this._sound.play(0, 1);
    };
    //停止
    Sounds.prototype.stop = function () {
        if (this._channel) {
            this._channel.stop();
            this._channel = null;
        }
    };
    return Sounds;
}(egret.DisplayObjectContainer));
__reflect(Sounds.prototype, "Sounds");
