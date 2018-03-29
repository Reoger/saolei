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
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        var _this = _super.call(this) || this;
        _this._pauseTime = 30;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Test.prototype.onAddToStage = function (event) {
        this.loadSound();
    };
    /*** 本示例关键代码段开始 ***/
    //加载
    Test.prototype.loadSound = function () {
        var sound = this._sound = new egret.Sound();
        ;
        //sound 加载完成监听
        sound.addEventListener(egret.Event.COMPLETE, function (e) {
            this.init();
        }, this);
        sound.load("resource/9882.wav");
    };
    //播放
    Test.prototype.play = function () {
        //sound 播放会返回一个 SoundChannel 对象，暂停、音量等操作请控制此对象
        this._channel = this._sound.play(this._pauseTime, 1);
        this._channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onComplete, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onTimeUpdate, this);
    };
    //停止
    Test.prototype.stop = function () {
        if (this._channel) {
            this._channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onComplete, this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onTimeUpdate, this);
            this._channel.stop();
            this._channel = null;
        }
    };
    //播放完成
    Test.prototype.onComplete = function (e) {
        console.log("播放完成");
        this.stop();
        this.setAllAbled(false);
        this.setProgress(0);
    };
    //更新进度
    Test.prototype.onTimeUpdate = function (e) {
        var position = this._channel ? this._channel.position : 0;
        this.setProgress(position);
    };
    Test.prototype.setProgress = function (position) {
        this._updateTxt.text = position.toFixed(1) + "/" + this._sound.length.toFixed(1);
        var w = (position / this._sound.length) * 400;
        this._bar.x = w + this.stage.stageWidth / 2 - 200;
        var mask = this._progress.mask || new egret.Rectangle(0, 0, 0, 60);
        mask.x = w;
        mask.width = 400 - w;
        this._progress.mask = mask;
    };
    Test.prototype.init = function () {
        var rap = 180;
        var rapH = 200;
        //play
        var playTxt = this._playTxt = new egret.TextField();
        playTxt.text = "播放";
        playTxt.size = 60;
        playTxt.x = 80;
        playTxt.y = 200 + rapH;
        playTxt.touchEnabled = true;
        playTxt.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            this.play();
            this.setAllAbled(true);
        }, this);
        this.addChild(playTxt);
        //stop
        var stopTxt = this._stopTxt = new egret.TextField();
        stopTxt.text = "停止";
        stopTxt.size = 60;
        stopTxt.x = playTxt.x + rap * 1;
        stopTxt.y = 200 + rapH;
        stopTxt.touchEnabled = true;
        stopTxt.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (this._channel) {
                this._pauseTime = 0;
                this.stop();
                this.onTimeUpdate();
            }
            this.setAllAbled(false);
        }, this);
        this.addChild(stopTxt);
        //pause 
        var pauseTxt = this._pauseTxt = new egret.TextField();
        pauseTxt.text = "暂停";
        pauseTxt.size = 60;
        pauseTxt.x = playTxt.x + rap * 2;
        pauseTxt.y = 200 + rapH;
        pauseTxt.touchEnabled = true;
        pauseTxt.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (this._channel) {
                this._pauseTime = this._channel.position;
                this.stop();
            }
            this.setAllAbled(false);
        }, this);
        this.addChild(pauseTxt);
        this.setAllAbled(false);
        var bg = new egret.Shape();
        this.addChild(bg);
        bg.x = this.stage.stageWidth / 2 - 200;
        bg.y = 100 - 5 + rapH;
        bg.graphics.beginFill(0x999999);
        bg.graphics.drawRoundRect(0, 0, 400, 10, 5, 5);
        bg.graphics.endFill();
        this._progress = new egret.Shape();
        this.addChild(this._progress);
        this._progress.x = this.stage.stageWidth / 2 - 200;
        this._progress.y = 100 - 5 + rapH;
        this._progress.graphics.beginFill(0xffff00);
        this._progress.graphics.drawRoundRect(0, 0, 400, 10, 5, 5);
        this._progress.graphics.endFill();
        this._bar = new egret.Shape();
        this.addChild(this._bar);
        this._bar.x = this.stage.stageWidth / 2 - 200;
        this._bar.y = 100 + rapH;
        this._bar.graphics.beginFill(0xffff00);
        this._bar.graphics.drawCircle(0, 0, 20);
        this._bar.graphics.endFill();
        this._updateTxt = new egret.TextField();
        this._updateTxt.text = 0 + "/" + this._sound.length.toFixed(1);
        this._updateTxt.width = 200;
        this._updateTxt.size = 30;
        this._updateTxt.x = this.stage.stageWidth / 2 - 100;
        this._updateTxt.y = 50 + rapH;
        this._updateTxt.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(this._updateTxt);
    };
    Test.prototype.setAllAbled = function (isPlaying) {
        this.setTextAbled(this._playTxt, !isPlaying);
        this.setTextAbled(this._stopTxt, isPlaying);
        this.setTextAbled(this._pauseTxt, isPlaying);
    };
    Test.prototype.setTextAbled = function (text, touchEnabled) {
        text.touchEnabled = touchEnabled;
        if (touchEnabled) {
            text.textColor = 0xffffff;
        }
        else {
            text.textColor = 0x999999;
        }
    };
    return Test;
}(egret.DisplayObjectContainer));
__reflect(Test.prototype, "Test");
