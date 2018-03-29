/**
 * 游戏的控制类
 */
class GameControl extends egret.Sprite {
    public gameControl: egret.Sprite;
    private progress: egret.Bitmap;
    private flag: egret.Bitmap;

    private mStageWidth: number;
    private mStageHeight: number;

    private timer: egret.Timer
    private timeText: egret.TextField;

    private OffsetX = 20;
    private OffsetY = 150;

    public count = 0;

    private game2: Game2;

    public constructor(width: number, hight: number, game2: Game2) {
        super();
        this.mStageHeight = hight;
        this.mStageWidth = width;
        this.game2 = game2;
    }

    public addControl(): void {
        this.gameControl = new egret.Sprite();
        this.timer = new egret.Timer(1000, 0);
        this.timer.start();//启动定时器


        this.addShadow();
        this.addTipGame();
        this.addFlagControl();
        this.addRectangle();
        this.addTipHelp();
        this.addTimer();


    }

    /**
     * 添加阴影到控制器
     */
    private addShadow(): void {
        let topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, this.mStageWidth, 90);
        topMask.graphics.endFill();
        topMask.y = 30;
        this.gameControl.addChild(topMask);
    }

    /**
     * 添加笑脸提示
     */
    private addTipGame(): void {
        this.progress = new egret.Bitmap();
        this.progress.texture = RES.getRes("face_json.face_smile");
        this.progress.x = this.mStageWidth / 2;
        this.progress.y = 60;
        this.progress.touchEnabled = true;
        this.progress.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFaceTouch, this);
        this.progress.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (enev: egret.TouchEvent) => {
            this.progress.texture = RES.getRes("face_json.face_surprise");
        }, this)
        this.gameControl.addChild(this.progress);
    }


    /**
     * 添加flag标签控制器
     */
    private addFlagControl(): void {
        this.flag = new egret.Bitmap();
        this.flag.texture = RES.getRes("flag_json.unflag");
        this.flag.x = this.mStageWidth - 80;
        this.flag.y = 70;
        this.flag.touchEnabled = true;
        this.flag.addEventListener(egret.TouchEvent.TOUCH_TAP, this.markOrUnMark, this);
        this.gameControl.addChild(this.flag);
    }

    /**
     * 提示地雷的个数
     */
    private addTipHelp(): void {
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
    }

    /**
     * 添加矩形区域
     */
    private addRectangle(): void {
        let lins = new egret.Shape();
        let linsWidth = (this.mStageWidth - 40);
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
    }

    /**
     *添加显示时间的区域
     */
    private addTimer(): void {
        this.timeText = new egret.TextField();
        this.timeText.text = "时间:";
        this.timeText.x = this.mStageWidth - this.OffsetX - 180;
        this.timeText.y = this.OffsetY - 85;
        this.gameControl.addChild(this.timeText);

        this.timer.addEventListener(egret.TimerEvent.TIMER, (event: egret.TimerEvent) => {
            this.timeText.text = `时间：${this.count}`;
            this.count++;
        }, this);
    }

    /**
     * 重置开关监听器,重新新的一盘
     */
    private onFaceTouch(event: egret.TouchEvent): void {
        this.progress.texture = RES.getRes("face_json.face_happy");
        this.restartTimer();
        // this.repaly();

        this.game2.doSomeThing();
        // envents.doSomeThing();
    }

    /**
     * 标记监听器
     */
    private markOrUnMark(event: egret.TouchEvent): void {
        if (!GD.isSign) {
            GD.isSign = true;
            this.flag.texture = RES.getRes(`flag_json.flag`);
        } else {
            GD.isSign = false;
            this.flag.texture = RES.getRes(`flag_json.unflag`);
        }
    }

    /**
     * 定时器的监听器
     */
    private onTimerTouch(event: egret.TouchEvent): void {
        
    }

    /**
     * 重新启动定时器
     */
    public restartTimer(): boolean {
        this.count = 0;
        if (this.timer.running) {
            this.timer.reset();
            this.timer.removeEventListener(egret.TimerEvent.TIMER, null, this);
            this.timer.start();
            console.log("定时器还在运行，这个只是重新置空，但是并没有移除之前的监听事件");
            return true;
        } else {
            this.timer.removeEventListener(egret.TimerEvent.TIMER, null, this);
            // tile.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTileTouch, this);
            console.log("定时器还在停止了，移除监听事件")
            this.timer.start();
            return false;
        }
    }

    /**
     *  停止定时器
     */
    public stopTimer(): boolean {
        if (this.timer == null)
            return false;

        this.count = 0;
        this.timer.removeEventListener(egret.TimerEvent.TIMER, null, this);
        if (this.timer.running) {
            this.timer.stop();
            return true;
        } else {
            return false;
        }
    }

    /**
     * 设置提示按钮为指定类型
     */
    public setFaceFeel(msg: string) {
        if ("happy" == msg) {
            this.progress.texture = RES.getRes("face_json.face_happy");
        } else if ("sad" == msg) {
            this.progress.texture = RES.getRes("face_json.face_sad");
        } else if ("smile" == msg) {
            this.progress.texture = RES.getRes("face_json.face_smile");
        } else if ("surprise" == msg) {
            this.progress.texture = RES.getRes("face_json.face_surprise");
        }

    }

    /**
     * 设置falg为指定的类型
     */
    public setFlagType(msg: string) {
        if ("" == msg) {

        } else if ("unflag" == msg) {
            this.flag.texture = RES.getRes(`flag_json.unflag`);
        }
    }




}