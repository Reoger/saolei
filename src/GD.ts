class GD {
		
	//舞台的宽度和高度
    public static SW:number;
    public static SH:number;

	public static FIELE_W:number=10;//列
    public static FIELE_H:number=10;//行


    public static TILE_W:number;//一个格子的宽度和高度
    public static mineField:Array<any>;
    public static MINES:number=10;

	public static isGameOver:boolean;

	public static signArray:Array<any>;	
	public static isSign:boolean;
	public static isCancel:boolean;

	public static initData(_stage:egret.Sprite){
		console.log(`打印~___${_stage}`);

        GD.SW=_stage.stage.stageWidth;
        GD.SH=_stage.stage.stageHeight;
		GD.TILE_W=Math.floor((GD.SW-40)/GD.FIELE_W);

		
		GD.signArray=new Array();
		GD.isGameOver=false;
		GD.isSign=false;
		GD.isCancel=false;
		
		//生成一个二维数组
		GD.mineField=new Array();
        for(let i:number=0;i<GD.FIELE_H;i++){
             GD.mineField[i]=new  Array();  
            for(let j:number=0;j<GD.FIELE_W;j++){
                GD.mineField[i].push(0);
            }
        }
		//
		this.createrandNum();
	}

/**
 * 重新初始化
 */
	public static reInitData(){
		GD.TILE_W=Math.floor((GD.SW-40)/GD.FIELE_W);

		
		GD.signArray=new Array();
		GD.isGameOver=false;
		GD.isSign=false;
		GD.isCancel=false;
		
		//生成一个二维数组
		GD.mineField=new Array();
        for(let i:number=0;i<GD.FIELE_H;i++){
             GD.mineField[i]=new  Array();  
            for(let j:number=0;j<GD.FIELE_W;j++){
                GD.mineField[i].push(0);
            }
        }
		//
		this.createrandNum();
	}


	public static  createrandNum(){
		//随机生成地雷数据
        let placedMines:number=0;
        let randomRow,randomCol:number;
		while(placedMines<GD.MINES){
			randomRow=Math.floor(Math.random()*GD.FIELE_H);
            randomCol=Math.floor(Math.random()*GD.FIELE_W);
			if(GD.mineField[randomRow][randomCol]==0){
				GD.mineField[randomRow][randomCol]=9;
				placedMines++;
			}
			
		}

		//设置提示数据
        for(let i=0;i<GD.FIELE_H;i++){
            for(let j=0;j<GD.FIELE_W;j++){
				if(GD.mineField[i][j]==9){
					 for(let h=-1;h<=1;h++){
						 for(let w=-1;w<=1;w++){
							 if(w!=0||h!=0){
								 if(GD.tileValue(i+h,j+w)!=9 && GD.tileValue(i+h,j+w)!=-1){
                                    GD.mineField[i+h][j+w]=GD.mineField[i+h][j+w]+1;
                                }
							 }
						 }
					 }
                        
				}
			}
		}
	
		for(let i=0;i<GD.FIELE_H;i++){
			let str:string="";
			for(let j=0;j<GD.FIELE_W;j++){
				if(j>=GD.FIELE_W-1){
					str+=`${GD.mineField[i][j]}`;
				}else{
					str+=`${GD.mineField[i][j]},`;
				}
				
			}
			console.log(str);
		}

	}



	public static tileValue(row:number,col:number):number{
		if(GD.mineField[row]==undefined||GD.mineField[row][col]==undefined){
			return -1;
		}else{
			return GD.mineField[row][col];
		}
    }
    public static checkSign(row:number,col:number):boolean{
        for(let i=0;i<GD.signArray.length;i++){
            let sign=GD.signArray[i];
            if(sign[0]==row&&sign[1]==col){
                return true;
            }
        }
        return false;
    }
	public static isWin():boolean{
        let num:number=0;
        for(let i=0;i<GD.signArray.length;i++){
            let sign=GD.signArray[i];
            if(GD.mineField[sign[0]][sign[1]]==9){
                num+=9;
            }
        }
        console.log(`num=${num}`);
        if(num==GD.MINES*9){
            return true;
        }else{
            return false;
        }
        
    }
    

}