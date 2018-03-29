class Sounds extends egret.DisplayObjectContainer {
    private _sound: egret.Sound;
    private _channel: egret.SoundChannel;


    constructor() {
        super();
        var sound: egret.Sound = this._sound = new egret.Sound();
        sound.load("resource/9882.wav");
        sound.addEventListener(egret.Event.COMPLETE, function (e: egret.Event) {
            this.init();
        }, this);
    }


    private init(){
        this.play();
    }
        //播放
    public play():void {
        //sound 播放会返回一个 SoundChannel 对象，暂停、音量等操作请控制此对象
        this._channel = this._sound.play(0, 1);
    }

        //停止
    private stop():void {
        if (this._channel) {

            
            this._channel.stop();
            this._channel = null;
        }
    }

}