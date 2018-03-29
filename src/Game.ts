class Game extends egret.Sprite {
    public constructor() {
        super();
    }

    private gameContainer: egret.Sprite;
    private gameControl: egret.Sprite;
    // private toolbar: egret.TextField;

    private signT: egret.TextField;
    private timeText: egret.TextField;

    private OffsetX = 20;
    private OffsetY = 150;

    private progress: egret.Bitmap;

    private mark: egret.Bitmap;

    private _txInfo: egret.TextField;
    private timer: egret.Timer

    private count = 0;
	/**
     * 初始化游戏
     */
    public init() {
        console.log('测试');

        this.timer = new egret.Timer(1000, 0);
        this.timer.start();

        GD.initData(this);

        let sky = this.createBitmapByName("bg_jpg");
        this.addChild(sky);
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;


        this.gameControl = new egret.Sprite();
        this.gameContainer = new egret.Sprite();



        // 添加阴影
        let topMask = new egret.Shape();
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
        this.progress.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (enev: egret.TouchEvent) => {
            this.progress.texture = RES.getRes("face_json.face_surprise");
        }, this)
        this.gameControl.addChild(this.progress);




        //添加标志flag按钮
        this.mark = this.createBitmapByName("flag_json.unflag");
        this.mark.x = this.stage.width - 80;
        this.mark.y = 70;
        this.mark.touchEnabled = true;
        this.mark.addEventListener(egret.TouchEvent.TOUCH_TAP, this.markOrUnMark, this);
        this.gameControl.addChild(this.mark);

        let lins = new egret.Shape();
        let linsWidth = (this.stage.width - 40);
        let linsLength = 80;
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
        let mineNum = new egret.TextField();
        mineNum.text = `${GD.MINES}`
        mineNum.x = this.OffsetX + 50;
        mineNum.y = this.OffsetY - 85;
        this.gameControl.addChild(mineNum);

        let bit: egret.Bitmap = new egret.Bitmap;
        bit.texture = RES.getRes('mine_png');
        bit.x = this.OffsetX + 85;
        bit.y = this.OffsetY - 85;
        this.gameControl.addChild(bit);


        //添加框框
        let line = new egret.Shape();
        let length = (this.stage.width - 40);
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


        this.timer.addEventListener(egret.TimerEvent.TIMER, (event: egret.TimerEvent) => {
            this.timeText.text = `时间：${this.count}`;
            this.count++;
        }, this);
    }


    private repaly() {
        this.count = 0;
       

        if (this.timer.running) {
            console.log("正在运行");
            // this.timer.reset();
            //  this.timer.start();
            this.timer.stop
            this.timer.removeEventListener
            this.timer.$removeEventBin
        } else {
            console.log("没有运行");
            this.timer.removeEventListener
            this.timer.reset();
           
        }
         this.timer.start();
         this.init();

    }



    private createMap() {
        let tile: egret.Bitmap;
        for (let i = 0; i < GD.FIELE_H; i++) {
            for (let j = 0; j < GD.FIELE_W; j++) {
                tile = new egret.Bitmap();
                tile.texture = RES.getRes("num_json.g");
                this.gameContainer.addChild(tile);
                tile.width = tile.height = GD.TILE_W;
                tile.x = j * GD.TILE_W + this.OffsetX;
                tile.y = i * GD.TILE_W + this.OffsetY;
                tile.name = `tile_${i}_${j}`;
                tile.touchEnabled = true;
                tile.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTileTouch, this);
                tile.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (event: egret.TouchEvent) => {
                    this.progress.texture = RES.getRes("face_json.face_surprise");
                }, this);

            }
        }


    }

    private markOrUnMark(event: egret.TouchEvent): void {
        if (!GD.isSign) {
            GD.isSign = true;
            this.mark.texture = RES.getRes(`flag_json.flag`);
            console.log("这里是表示正在标记地雷");
        } else {
            GD.isSign = true;
            this.mark.texture = RES.getRes(`flag_json.unflag`);
            console.log("这里是表示在正常游戏标记地雷");
        }
    }

    private onTileTouch(event: egret.TouchEvent): void {
        if (!GD.isGameOver) {

            this.progress.texture = RES.getRes("face_json.face_smile");

            let tile: egret.Bitmap = event.currentTarget as egret.Bitmap;
            let tileName: string = tile.name;
            let tileNameArray: Array<any> = tileName.split("_");
            let row: number = Number(tileNameArray[1]);
            let col: number = Number(tileNameArray[2]);
            let val: number = GD.mineField[row][col];
            console.log(`行=${row},列=${col},值为${val}`);

            if (GD.isSign) { //添加标记
                if (!GD.checkSign(row, col)) {
                    GD.isSign = false;
                    tile.texture = RES.getRes(`flag_json.flag`);
                    this.mark.texture = RES.getRes(`flag_json.unflag`);
                    GD.signArray.push([row, col]);
                    if (GD.isWin()) {
                        GD.isGameOver = true;
                        this.GameOver("地雷全部清除，成功通关！", true)
                    }

                } else {  //如果不是添加标记
                    GD.isSign = false;
                    tile.texture = RES.getRes(`num_json.g`);
                    this.mark.texture = RES.getRes(`flag_json.unflag`);
                    for (let i = 0; i < GD.signArray.length; i++) {
                        let sign = GD.signArray[i];
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
                } else if (val < 9) {
                    tile.texture = RES.getRes(`num_json.${val}`);
                } else if (val == 9) {
                    tile.texture = RES.getRes(`mine_png`);
                    GD.isGameOver = true;
                    this.GameOver("踩中地雷，游戏结束", false);
                }
            } else {
                alert("这里已经标记");
            }

        }

    }

    private fioodFill(row: number, col: number): void {
        let tile: egret.Bitmap = this.gameContainer.getChildByName(`tile_${row}_${col}`) as egret.Bitmap;
        tile.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTileTouch, this);
        tile.touchEnabled = false;
        tile.texture = RES.getRes(`num_json.0`);
        GD.mineField[row][col] = -1;
        for (let i: number = -1; i <= 1; i++) {
            for (let j: number = -1; j <= 1; j++) {
                if ((i != 0 || j != 0) && (i == 0 || j == 0)) {
                    if (GD.tileValue(row + i, col + j) == 0) {
                        this.fioodFill(row + i, col + j);
                    }
                }
            }
        }
    }

    public createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }


    private onFaceTouch(event: egret.TouchEvent): void {
        this.progress.texture = RES.getRes("face_json.face_happy");
        this.repaly();

    }


    /**
     * 提示游戏结束
     */
    private GameOver(msg: string, win: boolean) {
        let panel = new eui.Panel();
        panel.title = "游戏结束!";
        let colorLabel = new egret.TextField();
        colorLabel.textColor = 0x33cc00;
        colorLabel.width = this.stage.width / 2;
        colorLabel.textAlign = "center";
        colorLabel.text = msg;
        colorLabel.size = 24;
        colorLabel.x = 0;
        colorLabel.y = this.OffsetY - 20;

        panel.horizontalCenter = this.stage.width / 2;
        panel.verticalCenter = this.stage.height / 2;
        panel.addChild(colorLabel)
        if (win) {
            this.progress.texture = RES.getRes("face_json.face_happy");
        } else {
            this.progress.texture = RES.getRes("face_json.face_sad");
        }
        this.addChild(panel);
        this.showResult()
        if (this.timer.running) {
            this.timer.stop();
            this.timer.reset();
        }
    }

    /**
     * 展现结果
     */
    private showResult() {
        for (let i: number = 0; i < GD.FIELE_H; i++) {
            for (let j: number = 0; j < GD.FIELE_W; j++) {
                let res = this.gameContainer.getChildByName(`tile_${i}_${j}`) as egret.Bitmap;
                let val = GD.mineField[i][j];
                if (val == 9) {
                    res.texture = RES.getRes("mine_png");
                } else if (val == -1) {
                    res.texture = RES.getRes("num_json.0");

                } else {
                    res.texture = RES.getRes(`num_json.${val}`);
                }

            }
        }
    }



}