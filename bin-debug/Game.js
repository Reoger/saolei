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
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this) || this;
        _this.OffsetX = 20;
        _this.OffsetY = 150;
        _this.count = 0;
        return _this;
    }
    /**
     * 初始化游戏
     */
    Game.prototype.init = function () {
        var _this = this;
        console.log('测试');
        this.timer = new egret.Timer(1000, 0);
        this.timer.start();
        GD.initData(this);
        var sky = this.createBitmapByName("bg_jpg");
        this.addChild(sky);
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;
        this.gameControl = new egret.Sprite();
        this.gameContainer = new egret.Sprite();
        // 添加阴影
        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, 90);
        topMask.graphics.endFill();
        topMask.y = 30;
        this.gameControl.addChild(topMask);
        //添加进度按钮
        this.progress = this.createBitmapByName("face_json.face_smile");
        this.progress.x = this.stage.width / 2;
        this.progress.y = 60;
        this.progress.touchEnabled = true;
        this.progress.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFaceTouch, this);
        this.progress.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (enev) {
            _this.progress.texture = RES.getRes("face_json.face_surprise");
        }, this);
        this.gameControl.addChild(this.progress);
        //添加标志flag按钮
        this.mark = this.createBitmapByName("flag_json.unflag");
        this.mark.x = this.stage.width - 80;
        this.mark.y = 70;
        this.mark.touchEnabled = true;
        this.mark.addEventListener(egret.TouchEvent.TOUCH_TAP, this.markOrUnMark, this);
        this.gameControl.addChild(this.mark);
        var lins = new egret.Shape();
        var linsWidth = (this.stage.width - 40);
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
        //添加时间计时
        this.timeText = new egret.TextField();
        this.timeText.text = "时间:";
        this.timeText.x = this.stage.width - this.OffsetX - 180;
        this.timeText.y = this.OffsetY - 85;
        this.gameControl.addChild(this.timeText);
        //添加地雷个数
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
        //添加框框
        var line = new egret.Shape();
        var length = (this.stage.width - 40);
        line.graphics.lineStyle(2, 0xffffff);
        line.graphics.moveTo(0, 0);
        line.graphics.lineTo(0, length);
        line.graphics.lineTo(length, length);
        line.graphics.lineTo(length, 0);
        line.graphics.lineTo(0, 0);
        line.graphics.endFill();
        line.x = this.OffsetX;
        line.y = this.OffsetY;
        this.gameContainer.addChild(line);
        this.addChild(this.gameControl);
        this.addChild(this.gameContainer);
        this.createMap();
        this.timer.addEventListener(egret.TimerEvent.TIMER, function (event) {
            _this.timeText.text = "\u65F6\u95F4\uFF1A" + _this.count;
            _this.count++;
        }, this);
    };
    Game.prototype.repaly = function () {
        this.count = 0;
        if (this.timer.running) {
            console.log("正在运行");
            // this.timer.reset();
            //  this.timer.start();
            this.timer.stop;
            this.timer.removeEventListener;
            this.timer.$removeEventBin;
        }
        else {
            console.log("没有运行");
            this.timer.removeEventListener;
            this.timer.reset();
        }
        this.timer.start();
        this.init();
    };
    Game.prototype.createMap = function () {
        var _this = this;
        var tile;
        for (var i = 0; i < GD.FIELE_H; i++) {
            for (var j = 0; j < GD.FIELE_W; j++) {
                tile = new egret.Bitmap();
                tile.texture = RES.getRes("num_json.g");
                this.gameContainer.addChild(tile);
                tile.width = tile.height = GD.TILE_W;
                tile.x = j * GD.TILE_W + this.OffsetX;
                tile.y = i * GD.TILE_W + this.OffsetY;
                tile.name = "tile_" + i + "_" + j;
                tile.touchEnabled = true;
                tile.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTileTouch, this);
                tile.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (event) {
                    _this.progress.texture = RES.getRes("face_json.face_surprise");
                }, this);
            }
        }
    };
    Game.prototype.markOrUnMark = function (event) {
        if (!GD.isSign) {
            GD.isSign = true;
            this.mark.texture = RES.getRes("flag_json.flag");
            console.log("这里是表示正在标记地雷");
        }
        else {
            GD.isSign = true;
            this.mark.texture = RES.getRes("flag_json.unflag");
            console.log("这里是表示在正常游戏标记地雷");
        }
    };
    Game.prototype.onTileTouch = function (event) {
        if (!GD.isGameOver) {
            this.progress.texture = RES.getRes("face_json.face_smile");
            var tile = event.currentTarget;
            var tileName = tile.name;
            var tileNameArray = tileName.split("_");
            var row = Number(tileNameArray[1]);
            var col = Number(tileNameArray[2]);
            var val = GD.mineField[row][col];
            console.log("\u884C=" + row + ",\u5217=" + col + ",\u503C\u4E3A" + val);
            if (GD.isSign) {
                if (!GD.checkSign(row, col)) {
                    GD.isSign = false;
                    tile.texture = RES.getRes("flag_json.flag");
                    this.mark.texture = RES.getRes("flag_json.unflag");
                    GD.signArray.push([row, col]);
                    if (GD.isWin()) {
                        GD.isGameOver = true;
                        this.GameOver("地雷全部清除，成功通关！", true);
                    }
                }
                else {
                    GD.isSign = false;
                    tile.texture = RES.getRes("num_json.g");
                    this.mark.texture = RES.getRes("flag_json.unflag");
                    for (var i = 0; i < GD.signArray.length; i++) {
                        var sign = GD.signArray[i];
                        if (row == sign[0] && col == sign[1]) {
                            GD.signArray.splice(i, 1);
                            console.log(GD.signArray);
                        }
                    }
                }
                return;
            }
            if (!GD.checkSign(row, col)) {
                tile.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTileTouch, this);
                tile.touchEnabled = false;
                if (val == 0) {
                    this.fioodFill(row, col);
                }
                else if (val < 9) {
                    tile.texture = RES.getRes("num_json." + val);
                }
                else if (val == 9) {
                    tile.texture = RES.getRes("mine_png");
                    GD.isGameOver = true;
                    this.GameOver("踩中地雷，游戏结束", false);
                }
            }
            else {
                alert("这里已经标记");
            }
        }
    };
    Game.prototype.fioodFill = function (row, col) {
        var tile = this.gameContainer.getChildByName("tile_" + row + "_" + col);
        tile.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTileTouch, this);
        tile.touchEnabled = false;
        tile.texture = RES.getRes("num_json.0");
        GD.mineField[row][col] = -1;
        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
                if ((i != 0 || j != 0) && (i == 0 || j == 0)) {
                    if (GD.tileValue(row + i, col + j) == 0) {
                        this.fioodFill(row + i, col + j);
                    }
                }
            }
        }
    };
    Game.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Game.prototype.onFaceTouch = function (event) {
        this.progress.texture = RES.getRes("face_json.face_happy");
        this.repaly();
    };
    /**
     * 提示游戏结束
     */
    Game.prototype.GameOver = function (msg, win) {
        var panel = new eui.Panel();
        panel.title = "游戏结束!";
        var colorLabel = new egret.TextField();
        colorLabel.textColor = 0x33cc00;
        colorLabel.width = this.stage.width / 2;
        colorLabel.textAlign = "center";
        colorLabel.text = msg;
        colorLabel.size = 24;
        colorLabel.x = 0;
        colorLabel.y = this.OffsetY - 20;
        panel.horizontalCenter = this.stage.width / 2;
        panel.verticalCenter = this.stage.height / 2;
        panel.addChild(colorLabel);
        if (win) {
            this.progress.texture = RES.getRes("face_json.face_happy");
        }
        else {
            this.progress.texture = RES.getRes("face_json.face_sad");
        }
        this.addChild(panel);
        this.showResult();
        if (this.timer.running) {
            this.timer.stop();
            this.timer.reset();
        }
    };
    /**
     * 展现结果
     */
    Game.prototype.showResult = function () {
        for (var i = 0; i < GD.FIELE_H; i++) {
            for (var j = 0; j < GD.FIELE_W; j++) {
                var res = this.gameContainer.getChildByName("tile_" + i + "_" + j);
                var val = GD.mineField[i][j];
                if (val == 9) {
                    res.texture = RES.getRes("mine_png");
                }
                else if (val == -1) {
                    res.texture = RES.getRes("num_json.0");
                }
                else {
                    res.texture = RES.getRes("num_json." + val);
                }
            }
        }
    };
    return Game;
}(egret.Sprite));
__reflect(Game.prototype, "Game");
