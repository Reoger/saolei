class Game2 extends egret.Sprite implements envents {

    // public repaly: () =>void

    public constructor() {
        super();
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




    public doSomeThing(): void {
        this.repaly();
    }

    private gameContainer: egret.Sprite;

    private gameControl: GameControl;

    private signT: egret.TextField;

    private OffsetX = 20;
    private OffsetY = 150;


    private _txInfo: egret.TextField;
    private timer: egret.Timer

    private count = 0;

    private games: egret.Sprite;

    private stageW: number;

    private stageH: number;
	/**
     * 初始化游戏
     */
    public init(gameControl: GameControl) {

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

    }

    private repaly(): void {
        // this.removeChild
        console.log("开始重新游戏")
        GD.reInitData();
        this.addbg();


        this.gameContainer = new egret.Sprite();

        this.addLines();
        this.addChild(this.gameControl.gameControl);
        this.addChild(this.gameContainer);
        this.createMap();
        console.log("游戏重建完毕" + this)
    }


    /**
     * 添加背景
     */
    private addbg(): void {
        let sky = this.createBitmapByName("bg_jpg");
        this.addChild(sky);
        let stageW = this.stageW;
        let stageH = this.stageH;
        sky.width = stageW;
        sky.height = stageH;
    }

    /**
     * 添加大框框
     */
    private addLines(): void {
        let line = new egret.Shape();
        let length = (this.stageW - 40);
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
                tile.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.changeFaceToSuprose, this);

            }
        }


    }

    /**
     * 设计点击为笑脸
     */
    private changeFaceToSuprose(event: egret.TouchEvent): void {
        this.gameControl.setFaceFeel("surprise");
    }

    /**
     * 地图重置
     */
    public MapReset() {
        GD.createrandNum();
        let tile: egret.Bitmap;
        for (let i = 0; i < GD.FIELE_H; i++) {
            for (let j = 0; j < GD.FIELE_W; j++) {
                tile = new egret.Bitmap();
                tile.texture = RES.getRes("num_json.g");
                tile.width = tile.height = GD.TILE_W;
                tile.x = j * GD.TILE_W + 20;
                tile.y = i * GD.TILE_W + 150;
                tile.name = `tile_${i}_${j}`;
                tile.touchEnabled = true;
            }
        }


    }



    private onTileTouch(event: egret.TouchEvent): void {
        if (!GD.isGameOver) {

            this.gameControl.setFaceFeel("smile");
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

                    this.gameControl.setFlagType("unflag");
                    GD.signArray.push([row, col]);
                    if (GD.isWin()) {
                        GD.isGameOver = true;
                        this.GameOver("地雷全部清除，成功通关！", true)
                    }

                } else {  //如果不是添加标记
                    GD.isSign = false;
                    tile.texture = RES.getRes(`num_json.g`);
                    this.gameControl.setFlagType("unflag");
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
                        if (GD.checkSign(row + i, col + j))
                            return;
                        this.fioodFill(row + i, col + j);
                    } else if(GD.tileValue(row + i, col + j) != -1){
                        let around: egret.Bitmap = this.gameContainer.getChildByName(`tile_${row+i}_${col+j}`) as egret.Bitmap;
                        around.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTileTouch, this);
                        around.touchEnabled = false;
                        around.texture = RES.getRes(`num_json.${ GD.mineField[row+i][col+j]}`);
                    }
                }
            }
        }
    }

    private showArund

    public createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }




    /**
     * 提示游戏结束
     */
    private GameOver(msg: string, win: boolean) {
        let panel = new eui.Panel();
        panel.title = "游戏结束!";
        let colorLabel = new egret.TextField();
        colorLabel.textColor = 0x33cc00;
        // colorLabel.width = this.stage.width / 2;
        colorLabel.textAlign = "center";
        colorLabel.text = msg;
        colorLabel.size = 24;
        colorLabel.x = this.OffsetX;
        colorLabel.y = this.OffsetY-this.OffsetX;

        panel.horizontalCenter =0;
        panel.verticalCenter = 0;
        panel.x = this.OffsetX*5;
        panel.y = this.stageH/2-this.OffsetY;
        panel.addChild(colorLabel)
        if (win) {
            this.gameControl.setFaceFeel("happy");
            new StepSounds();
        } else {
            this.gameControl.setFaceFeel("sad");
            // let sounds = new Sounds();
            // sounds.play();
            let sound = new Sounds();
            // sound.play();
        }

        if (this.gameControl.stopTimer()) {
            console.log("停止成功");
        } else {
            console.log("不需要停止");
        }

        this.addChild(panel);
        this.showResult();
    }

    /**
     * 展现结果
     */
    private showResult() {
        for (let i: number = 0; i < GD.FIELE_H; i++) {
            for (let j: number = 0; j < GD.FIELE_W; j++) {
                let res = this.gameContainer.getChildByName(`tile_${i}_${j}`) as egret.Bitmap;
                res.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTileTouch, this);
                res.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.changeFaceToSuprose, this);

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