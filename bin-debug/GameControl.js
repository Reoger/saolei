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
/**
 * 游戏的控制类
 */
var GameControl = (function (_super) {
    __extends(GameControl, _super);
    function GameControl(width, hight, game2) {
        var _this = _super.call(this) || this;
        _this.OffsetX = 20;
        _this.OffsetY = 150;
        _this.count = 0;
        _this.mStageHeight = hight;
        _this.mStageWidth = width;
        _this.game2 = game2;
        return _this;
    }
    GameControl.prototype.addControl = function () {
        this.gameControl = new egret.Sprite();
        this.timer = new egret.Timer(1000, 0);
        this.timer.start(); //启动定时器
        this.addShadow();
        this.addTipGame();
        this.addFlagControl();
        this.addRectangle();
        this.addTipHelp();
        this.addTimer();
    };
    /**
     * 添加阴影到控制器
     */
    GameControl.prototype.addShadow = function () {
        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, this.mStageWidth, 90);
        topMask.graphics.endFill();
        topMask.y = 30;
        this.gameControl.addChild(topMask);
    };
    /**
     * 添加笑脸提示
     */
    GameControl.prototype.addTipGame = function () {
        var _this = this;
        this.progress = new egret.Bitmap();
        this.progress.texture = RES.getRes("face_json.face_smile");
        this.progress.x = this.mStageWidth / 2;
        this.progress.y = 60;
        this.progress.touchEnabled = true;
        this.progress.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFaceTouch, this);
        this.progress.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (enev) {
            _this.progress.texture = RES.getRes("face_json.face_surprise");
        }, this);
        this.gameControl.addChild(this.progress);
    };
    /**
     * 添加flag标签控制器
     */
    GameControl.prototype.addFlagControl = function () {
        this.flag = new egret.Bitmap();
        this.flag.texture = RES.getRes("flag_json.unflag");
        this.flag.x = this.mStageWidth - 80;
        this.flag.y = 70;
        this.flag.touchEnabled = true;
        this.flag.addEventListener(egret.TouchEvent.TOUCH_TAP, this.markOrUnMark, this);
        this.gameControl.addChild(this.flag);
    };
    /**
     * 提示地雷的个数
     */
    GameControl.prototype.addTipHelp = function () {
        var mineNum = new egret.TextField();
        mineNum.text = "" + GD.MINES;
        mineNum.x = this.OffsetX + 50;
        mineNum.y = this.OffsetY - 85;
        this.gameControl.addChild(mineNum);
        var bit = new egret.Bitmap;
        bit.texture = RES.getRes('mine_png');
        bit.x = this.OffsetX + 85;
        bit.y = this.OffsetY - 85;
        this.gameControl.addChild(bit);
    };
    /**
     * 添加矩形区域
     */
    GameControl.prototype.addRectangle = function () {
        var lins = new egret.Shape();
        var linsWidth = (this.mStageWidth - 40);
        var linsLength = 80;
        lins.graphics.lineStyle(2, 0xffffff);
        lins.graphics.moveTo(0, 0);
        lins.graphics.lineTo(0, linsLength);
        lins.graphics.lineTo(linsWidth, linsLength);
        lins.graphics.lineTo(linsWidth, 0);
        lins.graphics.lineTo(0, 0);
        lins.graphics.endFill();
        lins.x = this.OffsetX;
        lins.y = this.OffsetY - 120;
        this.gameControl.addChild(lins);
    };
    /**
     *添加显示时间的区域
     */
    GameControl.prototype.addTimer = function () {
        var _this = this;
        this.timeText = new egret.TextField();
        this.timeText.text = "时间:";
        this.timeText.x = this.mStageWidth - this.OffsetX - 180;
        this.timeText.y = this.OffsetY - 85;
        this.gameControl.addChild(this.timeText);
        this.timer.addEventListener(egret.TimerEvent.TIMER, function (event) {
            _this.timeText.text = "\u65F6\u95F4\uFF1A" + _this.count;
            _this.count++;
        }, this);
    };
    /**
     * 重置开关监听器,重新新的一盘
     */
    GameControl.prototype.onFaceTouch = function (event) {
        this.progress.texture = RES.getRes("face_json.face_happy");
        this.restartTimer();
        // this.repaly();
        this.game2.doSomeThing();
        // envents.doSomeThing();
    };
    /**
     * 标记监听器
     */
    GameControl.prototype.markOrUnMark = function (event) {
        if (!GD.isSign) {
            GD.isSign = true;
            this.flag.texture = RES.getRes("flag_json.flag");
        }
        else {
            GD.isSign = false;
            this.flag.texture = RES.getRes("flag_json.unflag");
        }
    };
    /**
     * 定时器的监听器
     */
    GameControl.prototype.onTimerTouch = function (event) {
    };
    /**
     * 重新启动定时器
     */
    GameControl.prototype.restartTimer = function () {
        this.count = 0;
        if (this.timer.running) {
            this.timer.reset();
            this.timer.removeEventListener(egret.TimerEvent.TIMER, null, this);
            this.timer.start();
            console.log("定时器还在运行，这个只是重新置空，但是并没有移除之前的监听事件");
            return true;
        }
        else {
            this.timer.removeEventListener(egret.TimerEvent.TIMER, null, this);
            // tile.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTileTouch, this);
            console.log("定时器还在停止了，移除监听事件");
            this.timer.start();
            return false;
        }
    };
    /**
     *  停止定时器
     */
    GameControl.prototype.stopTimer = function () {
        if (this.timer == null)
            return false;
        this.count = 0;
        this.timer.removeEventListener(egret.TimerEvent.TIMER, null, this);
        if (this.timer.running) {
            this.timer.stop();
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * 设置提示按钮为指定类型
     */
    GameControl.prototype.setFaceFeel = function (msg) {
        if ("happy" == msg) {
            this.progress.texture = RES.getRes("face_json.face_happy");
        }
        else if ("sad" == msg) {
            this.progress.texture = RES.getRes("face_json.face_sad");
        }
        else if ("smile" == msg) {
            this.progress.texture = RES.getRes("face_json.face_smile");
        }
        else if ("surprise" == msg) {
            this.progress.texture = RES.getRes("face_json.face_surprise");
        }
    };
    /**
     * 设置falg为指定的类型
     */
    GameControl.prototype.setFlagType = function (msg) {
        if ("" == msg) {
        }
        else if ("unflag" == msg) {
            this.flag.texture = RES.getRes("flag_json.unflag");
        }
    };
    return GameControl;
}(egret.Sprite));
__reflect(GameControl.prototype, "GameControl");
