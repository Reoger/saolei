var __reflect=this&&this.__reflect||function(e,t,i){e.__class__=t,i?i.push(t):i=[t],e.__types__=e.__types__?i.concat(e.__types__):i},__extends=this&&this.__extends||function(e,t){function i(){this.constructor=e}for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);i.prototype=t.prototype,e.prototype=new i},__awaiter=this&&this.__awaiter||function(e,t,i,r){return new(i||(i=Promise))(function(n,s){function o(e){try{h(r.next(e))}catch(t){s(t)}}function a(e){try{h(r["throw"](e))}catch(t){s(t)}}function h(e){e.done?n(e.value):new i(function(t){t(e.value)}).then(o,a)}h((r=r.apply(e,t||[])).next())})},__generator=this&&this.__generator||function(e,t){function i(e){return function(t){return r([e,t])}}function r(i){if(n)throw new TypeError("Generator is already executing.");for(;h;)try{if(n=1,s&&(o=s[2&i[0]?"return":i[0]?"throw":"next"])&&!(o=o.call(s,i[1])).done)return o;switch(s=0,o&&(i=[0,o.value]),i[0]){case 0:case 1:o=i;break;case 4:return h.label++,{value:i[1],done:!1};case 5:h.label++,s=i[1],i=[0];continue;case 7:i=h.ops.pop(),h.trys.pop();continue;default:if(o=h.trys,!(o=o.length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){h=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){h.label=i[1];break}if(6===i[0]&&h.label<o[1]){h.label=o[1],o=i;break}if(o&&h.label<o[2]){h.label=o[2],h.ops.push(i);break}o[2]&&h.ops.pop(),h.trys.pop();continue}i=t.call(e,h)}catch(r){i=[6,r],s=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}var n,s,o,a,h={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:i(0),"throw":i(1),"return":i(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a},LoadingUI=function(e){function t(){var t=e.call(this)||this;return t.createView(),t}return __extends(t,e),t.prototype.createView=function(){this.textField=new egret.TextField,this.addChild(this.textField),this.textField.y=300,this.textField.width=480,this.textField.height=100,this.textField.textAlign="center"},t.prototype.onProgress=function(e,t){this.textField.text="Loading..."+e+"/"+t},t}(egret.Sprite);__reflect(LoadingUI.prototype,"LoadingUI",["RES.PromiseTaskReporter"]);var AssetAdapter=function(){function e(){}return e.prototype.getAsset=function(e,t,i){function r(r){t.call(i,r,e)}if(RES.hasRes(e)){var n=RES.getRes(e);n?r(n):RES.getResAsync(e,r,this)}else RES.getResByUrl(e,r,this,RES.ResourceItem.TYPE_IMAGE)},e}();__reflect(AssetAdapter.prototype,"AssetAdapter",["eui.IAssetAdapter"]);var Game=function(e){function t(){var t=e.call(this)||this;return t.OffsetX=20,t.OffsetY=150,t.count=0,t}return __extends(t,e),t.prototype.init=function(){var e=this;console.log("测试"),this.timer=new egret.Timer(1e3,0),this.timer.start(),GD.initData(this);var t=this.createBitmapByName("bg_jpg");this.addChild(t);var i=this.stage.stageWidth,r=this.stage.stageHeight;t.width=i,t.height=r,this.gameControl=new egret.Sprite,this.gameContainer=new egret.Sprite;var n=new egret.Shape;n.graphics.beginFill(0,.5),n.graphics.drawRect(0,0,i,90),n.graphics.endFill(),n.y=30,this.gameControl.addChild(n),this.progress=this.createBitmapByName("face_json.face_smile"),this.progress.x=this.stage.width/2,this.progress.y=60,this.progress.touchEnabled=!0,this.progress.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onFaceTouch,this),this.progress.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(t){e.progress.texture=RES.getRes("face_json.face_surprise")},this),this.gameControl.addChild(this.progress),this.mark=this.createBitmapByName("flag_json.unflag"),this.mark.x=this.stage.width-80,this.mark.y=70,this.mark.touchEnabled=!0,this.mark.addEventListener(egret.TouchEvent.TOUCH_TAP,this.markOrUnMark,this),this.gameControl.addChild(this.mark);var s=new egret.Shape,o=this.stage.width-40,a=80;s.graphics.lineStyle(2,16777215),s.graphics.moveTo(0,0),s.graphics.lineTo(0,a),s.graphics.lineTo(o,a),s.graphics.lineTo(o,0),s.graphics.lineTo(0,0),s.graphics.endFill(),s.x=this.OffsetX,s.y=this.OffsetY-120,this.gameControl.addChild(s),this.timeText=new egret.TextField,this.timeText.text="时间:",this.timeText.x=this.stage.width-this.OffsetX-180,this.timeText.y=this.OffsetY-85,this.gameControl.addChild(this.timeText);var h=new egret.TextField;h.text=""+GD.MINES,h.x=this.OffsetX+50,h.y=this.OffsetY-85,this.gameControl.addChild(h);var l=new egret.Bitmap;l.texture=RES.getRes("mine_png"),l.x=this.OffsetX+85,l.y=this.OffsetY-85,this.gameControl.addChild(l);var g=new egret.Shape,c=this.stage.width-40;g.graphics.lineStyle(2,16777215),g.graphics.moveTo(0,0),g.graphics.lineTo(0,c),g.graphics.lineTo(c,c),g.graphics.lineTo(c,0),g.graphics.lineTo(0,0),g.graphics.endFill(),g.x=this.OffsetX,g.y=this.OffsetY,this.gameContainer.addChild(g),this.addChild(this.gameControl),this.addChild(this.gameContainer),this.createMap(),this.timer.addEventListener(egret.TimerEvent.TIMER,function(t){e.timeText.text="时间："+e.count,e.count++},this)},t.prototype.repaly=function(){this.count=0,GD.initData(this),this.createMap(),this.timer.running?console.log("正在运行"):(console.log("没有运行"),this.timer.reset(),this.timer.start())},t.prototype.createMap=function(){for(var e,t=this,i=0;i<GD.FIELE_H;i++)for(var r=0;r<GD.FIELE_W;r++)e=new egret.Bitmap,e.texture=RES.getRes("num_json.g"),this.gameContainer.addChild(e),e.width=e.height=GD.TILE_W,e.x=r*GD.TILE_W+this.OffsetX,e.y=i*GD.TILE_W+this.OffsetY,e.name="tile_"+i+"_"+r,e.touchEnabled=!0,e.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTileTouch,this),e.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(e){t.progress.texture=RES.getRes("face_json.face_surprise")},this)},t.prototype.markOrUnMark=function(e){GD.isSign?(GD.isSign=!0,this.mark.texture=RES.getRes("flag_json.unflag"),console.log("这里是表示在正常游戏标记地雷")):(GD.isSign=!0,this.mark.texture=RES.getRes("flag_json.flag"),console.log("这里是表示正在标记地雷"))},t.prototype.onTileTouch=function(e){if(!GD.isGameOver){this.progress.texture=RES.getRes("face_json.face_smile");var t=e.currentTarget,i=t.name,r=i.split("_"),n=Number(r[1]),s=Number(r[2]),o=GD.mineField[n][s];if(console.log("行="+n+",列="+s+",值为"+o),GD.isSign){if(GD.checkSign(n,s)){GD.isSign=!1,t.texture=RES.getRes("num_json.g"),this.mark.texture=RES.getRes("flag_json.unflag");for(var a=0;a<GD.signArray.length;a++){var h=GD.signArray[a];n==h[0]&&s==h[1]&&(GD.signArray.splice(a,1),console.log(GD.signArray))}}else GD.isSign=!1,t.texture=RES.getRes("flag_json.flag"),this.mark.texture=RES.getRes("flag_json.unflag"),GD.signArray.push([n,s]),GD.isWin()&&(GD.isGameOver=!0,this.GameOver("地雷全部清除，成功通关！",!0));return}GD.checkSign(n,s)?alert("这里已经标记"):(t.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTileTouch,this),t.touchEnabled=!1,0==o?this.fioodFill(n,s):9>o?t.texture=RES.getRes("num_json."+o):9==o&&(t.texture=RES.getRes("mine_png"),GD.isGameOver=!0,this.GameOver("踩中地雷，游戏结束",!1)))}},t.prototype.fioodFill=function(e,t){var i=this.gameContainer.getChildByName("tile_"+e+"_"+t);i.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTileTouch,this),i.touchEnabled=!1,i.texture=RES.getRes("num_json.0"),GD.mineField[e][t]=-1;for(var r=-1;1>=r;r++)for(var n=-1;1>=n;n++)0==r&&0==n||0!=r&&0!=n||0==GD.tileValue(e+r,t+n)&&this.fioodFill(e+r,t+n)},t.prototype.createBitmapByName=function(e){var t=new egret.Bitmap,i=RES.getRes(e);return t.texture=i,t},t.prototype.onFaceTouch=function(e){this.progress.texture=RES.getRes("face_json.face_happy"),this.repaly()},t.prototype.GameOver=function(e,t){var i=new eui.Panel;i.title="游戏结束!";var r=new egret.TextField;r.textColor=3394560,r.width=this.stage.width/2,r.textAlign="center",r.text=e,r.size=24,r.x=0,r.y=this.OffsetY-20,i.horizontalCenter=this.stage.width/2,i.verticalCenter=this.stage.height/2,i.addChild(r),t?this.progress.texture=RES.getRes("face_json.face_happy"):this.progress.texture=RES.getRes("face_json.face_sad"),this.addChild(i),this.showResult(),this.timer.running&&(this.timer.stop(),this.timer.reset())},t.prototype.showResult=function(){for(var e=0;e<GD.FIELE_H;e++)for(var t=0;t<GD.FIELE_W;t++){var i=this.gameContainer.getChildByName("tile_"+e+"_"+t),r=GD.mineField[e][t];9==r?i.texture=RES.getRes("mine_png"):-1==r?i.texture=RES.getRes("num_json.0"):i.texture=RES.getRes("num_json."+r)}},t}(egret.Sprite);__reflect(Game.prototype,"Game");var Game2=function(e){function t(){var t=e.call(this)||this;return t.OffsetX=20,t.OffsetY=150,t.count=0,t}return __extends(t,e),t.prototype.init=function(){console.log("这里停止了*-*-*-*-*-");var e=this.stage.stageWidth,t=this.stage.stageHeight;GD.initData(this),this.addbg(),this.gameControl=new GameControl(e,t),this.gameControl.addControl(),this.gameContainer=new egret.Sprite;var i=new egret.Shape,r=this.stage.width-40;i.graphics.lineStyle(2,16777215),i.graphics.moveTo(0,0),i.graphics.lineTo(0,r),i.graphics.lineTo(r,r),i.graphics.lineTo(r,0),i.graphics.lineTo(0,0),i.graphics.endFill(),i.x=this.OffsetX,i.y=this.OffsetY,this.gameContainer.addChild(i),this.addChild(this.gameControl.gameControl),this.addChild(this.gameContainer),this.createMap()},t.prototype.addbg=function(){var e=this.createBitmapByName("bg_jpg");this.addChild(e);var t=this.stage.stageWidth,i=this.stage.stageHeight;e.width=t,e.height=i},t.prototype.createMap=function(){for(var e,t=this,i=0;i<GD.FIELE_H;i++)for(var r=0;r<GD.FIELE_W;r++)e=new egret.Bitmap,e.texture=RES.getRes("num_json.g"),this.gameContainer.addChild(e),e.width=e.height=GD.TILE_W,e.x=r*GD.TILE_W+this.OffsetX,e.y=i*GD.TILE_W+this.OffsetY,e.name="tile_"+i+"_"+r,e.touchEnabled=!0,e.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTileTouch,this),e.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(e){t.gameControl.setFaceFeel("surprise")},this)},t.prototype.MapReset=function(){GD.createrandNum();for(var e,t=0;t<GD.FIELE_H;t++)for(var i=0;i<GD.FIELE_W;i++)e=new egret.Bitmap,e.texture=RES.getRes("num_json.g"),e.width=e.height=GD.TILE_W,e.x=i*GD.TILE_W+20,e.y=t*GD.TILE_W+150,e.name="tile_"+t+"_"+i,e.touchEnabled=!0},t.prototype.onTileTouch=function(e){if(!GD.isGameOver){this.gameControl.setFaceFeel("smile");var t=e.currentTarget,i=t.name,r=i.split("_"),n=Number(r[1]),s=Number(r[2]),o=GD.mineField[n][s];if(console.log("行="+n+",列="+s+",值为"+o),GD.isSign){if(GD.checkSign(n,s)){GD.isSign=!1,t.texture=RES.getRes("num_json.g"),this.gameControl.setFlagType("unflag");for(var a=0;a<GD.signArray.length;a++){var h=GD.signArray[a];n==h[0]&&s==h[1]&&(GD.signArray.splice(a,1),console.log(GD.signArray))}}else GD.isSign=!1,t.texture=RES.getRes("flag_json.flag"),this.gameControl.setFlagType("unflag"),GD.signArray.push([n,s]),GD.isWin()&&(GD.isGameOver=!0,this.GameOver("地雷全部清除，成功通关！",!0));return}GD.checkSign(n,s)?alert("这里已经标记"):(t.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTileTouch,this),t.touchEnabled=!1,0==o?this.fioodFill(n,s):9>o?t.texture=RES.getRes("num_json."+o):9==o&&(t.texture=RES.getRes("mine_png"),GD.isGameOver=!0,this.GameOver("踩中地雷，游戏结束",!1)))}},t.prototype.fioodFill=function(e,t){var i=this.gameContainer.getChildByName("tile_"+e+"_"+t);i.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTileTouch,this),i.touchEnabled=!1,i.texture=RES.getRes("num_json.0"),GD.mineField[e][t]=-1;for(var r=-1;1>=r;r++)for(var n=-1;1>=n;n++)if(!(0==r&&0==n||0!=r&&0!=n)&&0==GD.tileValue(e+r,t+n)){if(GD.checkSign(e+r,t+n))return;this.fioodFill(e+r,t+n)}},t.prototype.createBitmapByName=function(e){var t=new egret.Bitmap,i=RES.getRes(e);return t.texture=i,t},t.prototype.GameOver=function(e,t){var i=new eui.Panel;i.title="游戏结束!";var r=new egret.TextField;if(r.textColor=3394560,r.width=this.stage.width/2,r.textAlign="center",r.text=e,r.size=24,r.x=0,r.y=this.OffsetY-20,i.horizontalCenter=this.stage.width/2,i.verticalCenter=this.stage.height/2,i.addChild(r),t)this.gameControl.setFaceFeel("happy"),new StepSounds;else{this.gameControl.setFaceFeel("sad");new Sounds}this.gameControl.stopTimer()?console.log("停止成功"):console.log("不需要停止"),this.addChild(i),this.showResult()},t.prototype.showResult=function(){for(var e=0;e<GD.FIELE_H;e++)for(var t=0;t<GD.FIELE_W;t++){var i=this.gameContainer.getChildByName("tile_"+e+"_"+t);i.removeEventListener;var r=GD.mineField[e][t];9==r?i.texture=RES.getRes("mine_png"):-1==r?i.texture=RES.getRes("num_json.0"):i.texture=RES.getRes("num_json."+r)}},t}(egret.Sprite);__reflect(Game2.prototype,"Game2");var GameControl=function(e){function t(t,i){var r=e.call(this)||this;return r.OffsetX=20,r.OffsetY=150,r.count=0,r.mStageHeight=i,r.mStageWidth=t,r}return __extends(t,e),t.prototype.addControl=function(){this.gameControl=new egret.Sprite,this.timer=new egret.Timer(1e3,0),this.timer.start(),this.addShadow(),this.addTipGame(),this.addFlagControl(),this.addRectangle(),this.addTipHelp(),this.addTimer()},t.prototype.addShadow=function(){var e=new egret.Shape;e.graphics.beginFill(0,.5),e.graphics.drawRect(0,0,this.mStageWidth,90),e.graphics.endFill(),e.y=30,this.gameControl.addChild(e)},t.prototype.addTipGame=function(){var e=this;this.progress=new egret.Bitmap,this.progress.texture=RES.getRes("face_json.face_smile"),this.progress.x=this.mStageWidth/2,this.progress.y=60,this.progress.touchEnabled=!0,this.progress.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onFaceTouch,this),this.progress.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(t){e.progress.texture=RES.getRes("face_json.face_surprise")},this),this.gameControl.addChild(this.progress)},t.prototype.addFlagControl=function(){this.flag=new egret.Bitmap,this.flag.texture=RES.getRes("flag_json.unflag"),this.flag.x=this.mStageWidth-80,this.flag.y=70,this.flag.touchEnabled=!0,this.flag.addEventListener(egret.TouchEvent.TOUCH_TAP,this.markOrUnMark,this),this.gameControl.addChild(this.flag)},t.prototype.addTipHelp=function(){var e=new egret.TextField;e.text=""+GD.MINES,e.x=this.OffsetX+50,e.y=this.OffsetY-85,this.gameControl.addChild(e);var t=new egret.Bitmap;t.texture=RES.getRes("mine_png"),t.x=this.OffsetX+85,t.y=this.OffsetY-85,this.gameControl.addChild(t)},t.prototype.addRectangle=function(){var e=new egret.Shape,t=this.mStageWidth-40,i=80;e.graphics.lineStyle(2,16777215),e.graphics.moveTo(0,0),e.graphics.lineTo(0,i),e.graphics.lineTo(t,i),e.graphics.lineTo(t,0),e.graphics.lineTo(0,0),e.graphics.endFill(),e.x=this.OffsetX,e.y=this.OffsetY-120,this.gameControl.addChild(e)},t.prototype.addTimer=function(){var e=this;this.timeText=new egret.TextField,this.timeText.text="时间:",this.timeText.x=this.mStageWidth-this.OffsetX-180,this.timeText.y=this.OffsetY-85,this.gameControl.addChild(this.timeText),this.timer.addEventListener(egret.TimerEvent.TIMER,function(t){e.timeText.text="时间："+e.count,e.count++},this)},t.prototype.onFaceTouch=function(e){this.progress.texture=RES.getRes("face_json.face_happy"),this.restartTimer();var t=new Game2;t.init()},t.prototype.markOrUnMark=function(e){GD.isSign?(GD.isSign=!1,this.flag.texture=RES.getRes("flag_json.unflag")):(GD.isSign=!0,this.flag.texture=RES.getRes("flag_json.flag"))},t.prototype.restartTimer=function(){return this.count=0,this.timer.running?(this.timer.reset(),this.timer.start(),console.log("定时器还在运行，这个只是重新置空，但是并没有移除之前的监听事件"),!0):(this.timer.removeEventListener,console.log("定时器还在停止了，移除监听事件"),this.timer.start(),!1)},t.prototype.stopTimer=function(){return this.count=0,this.timer.running?(this.timer.stop(),!0):!1},t.prototype.setFaceFeel=function(e){"happy"==e?this.progress.texture=RES.getRes("face_json.face_happy"):"sad"==e?this.progress.texture=RES.getRes("face_json.face_sad"):"smile"==e?this.progress.texture=RES.getRes("face_json.face_smile"):"surprise"==e&&(this.progress.texture=RES.getRes("face_json.face_surprise"))},t.prototype.setFlagType=function(e){""==e||"unflag"==e&&(this.flag.texture=RES.getRes("flag_json.unflag"))},t}(egret.Sprite);__reflect(GameControl.prototype,"GameControl");var GD=function(){function e(){}return e.initData=function(t){console.log("打印~___"+t),e.SW=t.stage.stageWidth,e.SH=t.stage.stageHeight,e.TILE_W=Math.floor((e.SW-40)/e.FIELE_W),e.signArray=new Array,e.isGameOver=!1,e.isSign=!1,e.isCancel=!1,e.mineField=new Array;for(var i=0;i<e.FIELE_H;i++){e.mineField[i]=new Array;for(var r=0;r<e.FIELE_W;r++)e.mineField[i].push(0)}this.createrandNum()},e.createrandNum=function(){for(var t,i,r=0;r<e.MINES;)t=Math.floor(Math.random()*e.FIELE_H),i=Math.floor(Math.random()*e.FIELE_W),0==e.mineField[t][i]&&(e.mineField[t][i]=9,r++);for(var n=0;n<e.FIELE_H;n++)for(var s=0;s<e.FIELE_W;s++)if(9==e.mineField[n][s])for(var o=-1;1>=o;o++)for(var a=-1;1>=a;a++)(0!=a||0!=o)&&9!=e.tileValue(n+o,s+a)&&-1!=e.tileValue(n+o,s+a)&&(e.mineField[n+o][s+a]=e.mineField[n+o][s+a]+1);for(var n=0;n<e.FIELE_H;n++){for(var h="",s=0;s<e.FIELE_W;s++)h+=s>=e.FIELE_W-1?""+e.mineField[n][s]:e.mineField[n][s]+",";console.log(h)}},e.tileValue=function(t,i){return void 0==e.mineField[t]||void 0==e.mineField[t][i]?-1:e.mineField[t][i]},e.checkSign=function(t,i){for(var r=0;r<e.signArray.length;r++){var n=e.signArray[r];if(n[0]==t&&n[1]==i)return!0}return!1},e.isWin=function(){for(var t=0,i=0;i<e.signArray.length;i++){var r=e.signArray[i];9==e.mineField[r[0]][r[1]]&&(t+=9)}return console.log("num="+t),t==9*e.MINES?!0:!1},e.FIELE_W=10,e.FIELE_H=10,e.MINES=10,e}();__reflect(GD.prototype,"GD");var Main=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype.createChildren=function(){e.prototype.createChildren.call(this),egret.lifecycle.addLifecycleListener(function(e){}),egret.lifecycle.onPause=function(){egret.ticker.pause()},egret.lifecycle.onResume=function(){egret.ticker.resume()};var t=new AssetAdapter;egret.registerImplementation("eui.IAssetAdapter",t),egret.registerImplementation("eui.IThemeAdapter",new ThemeAdapter),this.runGame()["catch"](function(e){console.log(e)})},t.prototype.runGame=function(){return __awaiter(this,void 0,void 0,function(){var e,t;return __generator(this,function(i){switch(i.label){case 0:return[4,this.loadResource()];case 1:return i.sent(),this.createGameScene(),[4,RES.getResAsync("description_json")];case 2:return e=i.sent(),[4,platform.login()];case 3:return i.sent(),[4,platform.getUserInfo()];case 4:return t=i.sent(),console.log(t),[2]}})})},t.prototype.loadResource=function(){return __awaiter(this,void 0,void 0,function(){var e,t;return __generator(this,function(i){switch(i.label){case 0:return i.trys.push([0,4,,5]),e=new LoadingUI,this.stage.addChild(e),[4,RES.loadConfig("resource/default.res.json","resource/")];case 1:return i.sent(),[4,this.loadTheme()];case 2:return i.sent(),[4,RES.loadGroup("preload",0,e)];case 3:return i.sent(),this.stage.removeChild(e),[3,5];case 4:return t=i.sent(),console.error(t),[3,5];case 5:return[2]}})})},t.prototype.loadTheme=function(){var e=this;return new Promise(function(t,i){var r=new eui.Theme("resource/default.thm.json",e.stage);r.addEventListener(eui.UIEvent.COMPLETE,function(){t()},e)})},t.prototype.createGameScene=function(){var e=new Game;this.addChild(e),e.init()},t.prototype.createBitmapByName=function(e){var t=new egret.Bitmap,i=RES.getRes(e);return t.texture=i,t},t.prototype.onButtonClick=function(e){var t=new eui.Panel;t.title="Title",t.horizontalCenter=0,t.verticalCenter=0,this.addChild(t)},t}(eui.UILayer);__reflect(Main.prototype,"Main");var DebugPlatform=function(){function e(){}return e.prototype.getUserInfo=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2,{nickName:"username"}]})})},e.prototype.login=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2]})})},e}();__reflect(DebugPlatform.prototype,"DebugPlatform",["Platform"]),window.platform||(window.platform=new DebugPlatform);var Sounds=function(e){function t(){var t=e.call(this)||this,i=t._sound=new egret.Sound;return i.load("resource/9882.wav"),i.addEventListener(egret.Event.COMPLETE,function(e){this.init()},t),t}return __extends(t,e),t.prototype.init=function(){this.play()},t.prototype.play=function(){this._channel=this._sound.play(0,1)},t.prototype.stop=function(){this._channel&&(this._channel.stop(),this._channel=null)},t}(egret.DisplayObjectContainer);__reflect(Sounds.prototype,"Sounds");var StepSounds=function(e){function t(){var t=e.call(this)||this,i=t._sound=new egret.Sound;return i.load("resource/win.wav"),i.addEventListener(egret.Event.COMPLETE,function(e){this.init()},t),t}return __extends(t,e),t.prototype.init=function(){this.play()},t.prototype.play=function(){this._channel=this._sound.play(0,1)},t.prototype.stop=function(){this._channel&&(this._channel.stop(),this._channel=null)},t}(egret.DisplayObjectContainer);__reflect(StepSounds.prototype,"StepSounds");var Test=function(e){function t(){var t=e.call(this)||this;return t._pauseTime=30,t.addEventListener(egret.Event.ADDED_TO_STAGE,t.onAddToStage,t),t}return __extends(t,e),t.prototype.onAddToStage=function(e){this.loadSound()},t.prototype.loadSound=function(){var e=this._sound=new egret.Sound;e.addEventListener(egret.Event.COMPLETE,function(e){this.init()},this),e.load("resource/9882.wav")},t.prototype.play=function(){this._channel=this._sound.play(this._pauseTime,1),this._channel.addEventListener(egret.Event.SOUND_COMPLETE,this.onComplete,this),this.addEventListener(egret.Event.ENTER_FRAME,this.onTimeUpdate,this)},t.prototype.stop=function(){this._channel&&(this._channel.removeEventListener(egret.Event.SOUND_COMPLETE,this.onComplete,this),this.removeEventListener(egret.Event.ENTER_FRAME,this.onTimeUpdate,this),this._channel.stop(),this._channel=null)},t.prototype.onComplete=function(e){console.log("播放完成"),this.stop(),this.setAllAbled(!1),this.setProgress(0)},t.prototype.onTimeUpdate=function(e){var t=this._channel?this._channel.position:0;this.setProgress(t)},t.prototype.setProgress=function(e){this._updateTxt.text=e.toFixed(1)+"/"+this._sound.length.toFixed(1);var t=e/this._sound.length*400;this._bar.x=t+this.stage.stageWidth/2-200;var i=this._progress.mask||new egret.Rectangle(0,0,0,60);i.x=t,i.width=400-t,this._progress.mask=i},t.prototype.init=function(){var e=180,t=200,i=this._playTxt=new egret.TextField;i.text="播放",i.size=60,i.x=80,i.y=200+t,i.touchEnabled=!0,i.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){this.play(),this.setAllAbled(!0)},this),this.addChild(i);var r=this._stopTxt=new egret.TextField;r.text="停止",r.size=60,r.x=i.x+1*e,r.y=200+t,r.touchEnabled=!0,r.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){this._channel&&(this._pauseTime=0,this.stop(),this.onTimeUpdate()),this.setAllAbled(!1)},this),this.addChild(r);var n=this._pauseTxt=new egret.TextField;n.text="暂停",n.size=60,n.x=i.x+2*e,n.y=200+t,n.touchEnabled=!0,n.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){this._channel&&(this._pauseTime=this._channel.position,this.stop()),this.setAllAbled(!1)},this),this.addChild(n),this.setAllAbled(!1);var s=new egret.Shape;this.addChild(s),s.x=this.stage.stageWidth/2-200,s.y=95+t,s.graphics.beginFill(10066329),s.graphics.drawRoundRect(0,0,400,10,5,5),s.graphics.endFill(),this._progress=new egret.Shape,this.addChild(this._progress),this._progress.x=this.stage.stageWidth/2-200,this._progress.y=95+t,this._progress.graphics.beginFill(16776960),this._progress.graphics.drawRoundRect(0,0,400,10,5,5),this._progress.graphics.endFill(),this._bar=new egret.Shape,this.addChild(this._bar),this._bar.x=this.stage.stageWidth/2-200,this._bar.y=100+t,this._bar.graphics.beginFill(16776960),this._bar.graphics.drawCircle(0,0,20),this._bar.graphics.endFill(),this._updateTxt=new egret.TextField,this._updateTxt.text="0/"+this._sound.length.toFixed(1),this._updateTxt.width=200,this._updateTxt.size=30,this._updateTxt.x=this.stage.stageWidth/2-100,this._updateTxt.y=50+t,this._updateTxt.textAlign=egret.HorizontalAlign.CENTER,this.addChild(this._updateTxt)},t.prototype.setAllAbled=function(e){this.setTextAbled(this._playTxt,!e),this.setTextAbled(this._stopTxt,e),this.setTextAbled(this._pauseTxt,e)},t.prototype.setTextAbled=function(e,t){e.touchEnabled=t,t?e.textColor=16777215:e.textColor=10066329},t}(egret.DisplayObjectContainer);__reflect(Test.prototype,"Test");var ThemeAdapter=function(){function e(){}return e.prototype.getTheme=function(e,t,i,r){function n(e){t.call(r,e)}function s(t){t.resItem.url==e&&(RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,s,null),i.call(r))}"undefined"!=typeof generateEUI?egret.callLater(function(){t.call(r,generateEUI)},this):(RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,s,null),RES.getResByUrl(e,n,this,RES.ResourceItem.TYPE_TEXT))},e}();__reflect(ThemeAdapter.prototype,"ThemeAdapter",["eui.IThemeAdapter"]);