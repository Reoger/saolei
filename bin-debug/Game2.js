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
var Game2 = (function (_super) {
    __extends(Game2, _super);
    // public repaly: () =>void
    function Game2() {
        var _this = _super.call(this) || this;
        _this.OffsetX = 20;
        _this.OffsetY = 150;
        _this.count = 0;
        return _this;
        // this.repaly = ()=>{
        //     console.log("开始重新游戏")
        //     GD.reInitData();
        //     this.addbg();
        //     this.gameControl = new GameControl(this.stageW, this.stageH);
        //     this.gameControl.addControl();
        //     this.gameContainer = new egret.Sprite();
        //     this.addLines();
        //     this.addChild(this.gameControl.gameControl);
        //     this.addChild(this.gameContainer);
        //     this.createMap();
        //     console.log("游戏重建完毕"+this)
        // }
    }
    Game2.prototype.doSomeThing = function () {
        this.repaly();
    };
    /**
     * 初始化游戏
     */
    Game2.prototype.init = function (gameControl) {
        console.log("这里停止了*-*-*-*-*-" + this);
        this.stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;
        GD.initData(this);
        this.addbg();
        this.gameControl = gameControl;
        this.gameControl.addControl();
        this.gameContainer = new egret.Sprite();
        this.addLines();
        this.addChild(this.gameControl.gameControl);
        this.addChild(this.gameContainer);
        this.createMap();
    };
    Game2.prototype.repaly = function () {
        // this.removeChild
        console.log("开始重新游戏");
        GD.reInitData();
        this.addbg();
        this.gameContainer = new egret.Sprite();
        this.addLines();
        this.addChild(this.gameControl.gameControl);
        this.addChild(this.gameContainer);
        this.createMap();
        console.log("游戏重建完毕" + this);
    };
    /**
     * 添加背景
     */
    Game2.prototype.addbg = function () {
        var sky = this.createBitmapByName("bg_jpg");
        this.addChild(sky);
        var stageW = this.stageW;
        var stageH = this.stageH;
        sky.width = stageW;
        sky.height = stageH;
    };
    /**
     * 添加大框框
     */
    Game2.prototype.addLines = function () {
        var line = new egret.Shape();
        var length = (this.stageW - 40);
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
    };
    Game2.prototype.createMap = function () {
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
                tile.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.changeFaceToSuprose, this);
            }
        }
    };
    /**
     * 设计点击为笑脸
     */
    Game2.prototype.changeFaceToSuprose = function (event) {
        this.gameControl.setFaceFeel("surprise");
    };
    /**
     * 地图重置
     */
    Game2.prototype.MapReset = function () {
        GD.createrandNum();
        var tile;
        for (var i = 0; i < GD.FIELE_H; i++) {
            for (var j = 0; j < GD.FIELE_W; j++) {
                tile = new egret.Bitmap();
                tile.texture = RES.getRes("num_json.g");
                tile.width = tile.height = GD.TILE_W;
                tile.x = j * GD.TILE_W + 20;
                tile.y = i * GD.TILE_W + 150;
                tile.name = "tile_" + i + "_" + j;
                tile.touchEnabled = true;
            }
        }
    };
    Game2.prototype.onTileTouch = function (event) {
        if (!GD.isGameOver) {
            this.gameControl.setFaceFeel("smile");
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
                    this.gameControl.setFlagType("unflag");
                    GD.signArray.push([row, col]);
                    if (GD.isWin()) {
                        GD.isGameOver = true;
                        this.GameOver("地雷全部清除，成功通关！", true);
                    }
                }
                else {
                    GD.isSign = false;
                    tile.texture = RES.getRes("num_json.g");
                    this.gameControl.setFlagType("unflag");
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
    Game2.prototype.fioodFill = function (row, col) {
        var tile = this.gameContainer.getChildByName("tile_" + row + "_" + col);
        tile.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTileTouch, this);
        tile.touchEnabled = false;
        tile.texture = RES.getRes("num_json.0");
        GD.mineField[row][col] = -1;
        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
                if ((i != 0 || j != 0) && (i == 0 || j == 0)) {
                    if (GD.tileValue(row + i, col + j) == 0) {
                        if (GD.checkSign(row + i, col + j))
                            return;
                        this.fioodFill(row + i, col + j);
                    }
                    else if (GD.tileValue(row + i, col + j) != -1) {
                        var around = this.gameContainer.getChildByName("tile_" + (row + i) + "_" + (col + j));
                        around.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTileTouch, this);
                        around.touchEnabled = false;
                        around.texture = RES.getRes("num_json." + GD.mineField[row + i][col + j]);
                    }
                }
            }
        }
    };
    Game2.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 提示游戏结束
     */
    Game2.prototype.GameOver = function (msg, win) {
        var panel = new eui.Panel();
        panel.title = "游戏结束!";
        var colorLabel = new egret.TextField();
        colorLabel.textColor = 0x33cc00;
        // colorLabel.width = this.stage.width / 2;
        colorLabel.textAlign = "center";
        colorLabel.text = msg;
        colorLabel.size = 24;
        colorLabel.x = this.OffsetX;
        colorLabel.y = this.OffsetY - this.OffsetX;
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        panel.x = this.OffsetX * 5;
        panel.y = this.stageH / 2 - this.OffsetY;
        panel.addChild(colorLabel);
        if (win) {
            this.gameControl.setFaceFeel("happy");
            new StepSounds();
        }
        else {
            this.gameControl.setFaceFeel("sad");
            // let sounds = new Sounds();
            // sounds.play();
            var sound = new Sounds();
            // sound.play();
        }
        if (this.gameControl.stopTimer()) {
            console.log("停止成功");
        }
        else {
            console.log("不需要停止");
        }
        this.addChild(panel);
        this.showResult();
    };
    /**
     * 展现结果
     */
    Game2.prototype.showResult = function () {
        for (var i = 0; i < GD.FIELE_H; i++) {
            for (var j = 0; j < GD.FIELE_W; j++) {
                var res = this.gameContainer.getChildByName("tile_" + i + "_" + j);
                res.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTileTouch, this);
                res.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.changeFaceToSuprose, this);
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
    return Game2;
}(egret.Sprite));
__reflect(Game2.prototype, "Game2", ["envents"]);
