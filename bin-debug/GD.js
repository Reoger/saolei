var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GD = (function () {
    function GD() {
    }
    GD.initData = function (_stage) {
        console.log("\u6253\u5370~___" + _stage);
        GD.SW = _stage.stage.stageWidth;
        GD.SH = _stage.stage.stageHeight;
        GD.TILE_W = Math.floor((GD.SW - 40) / GD.FIELE_W);
        GD.signArray = new Array();
        GD.isGameOver = false;
        GD.isSign = false;
        GD.isCancel = false;
        //生成一个二维数组
        GD.mineField = new Array();
        for (var i = 0; i < GD.FIELE_H; i++) {
            GD.mineField[i] = new Array();
            for (var j = 0; j < GD.FIELE_W; j++) {
                GD.mineField[i].push(0);
            }
        }
        //
        this.createrandNum();
    };
    /**
     * 重新初始化
     */
    GD.reInitData = function () {
        GD.TILE_W = Math.floor((GD.SW - 40) / GD.FIELE_W);
        GD.signArray = new Array();
        GD.isGameOver = false;
        GD.isSign = false;
        GD.isCancel = false;
        //生成一个二维数组
        GD.mineField = new Array();
        for (var i = 0; i < GD.FIELE_H; i++) {
            GD.mineField[i] = new Array();
            for (var j = 0; j < GD.FIELE_W; j++) {
                GD.mineField[i].push(0);
            }
        }
        //
        this.createrandNum();
    };
    GD.createrandNum = function () {
        //随机生成地雷数据
        var placedMines = 0;
        var randomRow, randomCol;
        while (placedMines < GD.MINES) {
            randomRow = Math.floor(Math.random() * GD.FIELE_H);
            randomCol = Math.floor(Math.random() * GD.FIELE_W);
            if (GD.mineField[randomRow][randomCol] == 0) {
                GD.mineField[randomRow][randomCol] = 9;
                placedMines++;
            }
        }
        //设置提示数据
        for (var i = 0; i < GD.FIELE_H; i++) {
            for (var j = 0; j < GD.FIELE_W; j++) {
                if (GD.mineField[i][j] == 9) {
                    for (var h = -1; h <= 1; h++) {
                        for (var w = -1; w <= 1; w++) {
                            if (w != 0 || h != 0) {
                                if (GD.tileValue(i + h, j + w) != 9 && GD.tileValue(i + h, j + w) != -1) {
                                    GD.mineField[i + h][j + w] = GD.mineField[i + h][j + w] + 1;
                                }
                            }
                        }
                    }
                }
            }
        }
        for (var i = 0; i < GD.FIELE_H; i++) {
            var str = "";
            for (var j = 0; j < GD.FIELE_W; j++) {
                if (j >= GD.FIELE_W - 1) {
                    str += "" + GD.mineField[i][j];
                }
                else {
                    str += GD.mineField[i][j] + ",";
                }
            }
            console.log(str);
        }
    };
    GD.tileValue = function (row, col) {
        if (GD.mineField[row] == undefined || GD.mineField[row][col] == undefined) {
            return -1;
        }
        else {
            return GD.mineField[row][col];
        }
    };
    GD.checkSign = function (row, col) {
        for (var i = 0; i < GD.signArray.length; i++) {
            var sign = GD.signArray[i];
            if (sign[0] == row && sign[1] == col) {
                return true;
            }
        }
        return false;
    };
    GD.isWin = function () {
        var num = 0;
        for (var i = 0; i < GD.signArray.length; i++) {
            var sign = GD.signArray[i];
            if (GD.mineField[sign[0]][sign[1]] == 9) {
                num += 9;
            }
        }
        console.log("num=" + num);
        if (num == GD.MINES * 9) {
            return true;
        }
        else {
            return false;
        }
    };
    GD.FIELE_W = 10; //列
    GD.FIELE_H = 10; //行
    GD.MINES = 10;
    return GD;
}());
__reflect(GD.prototype, "GD");
