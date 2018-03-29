class Timer extends egret.Sprite {
    private static instance: Timer;

    private constructor() {
        super();
    }

    /**
     * 构造一个timer的单例模式
     */
    public static getInstance(): Timer {
        if (!this.instance) {
            this.instance = new Timer();
        }
        return this.instance;
    }




}

