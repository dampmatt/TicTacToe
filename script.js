(()=>{
    var playerInfo={        

        init: function() {
            this.cacheDom();
            // console.log("hello world");
            this.bindEvents();
            // console.log("bye world");
            // this.render();
        },
        
        cacheDom: function(){
            // console.log("hello world");
            this.headerSub=document.querySelector("#header-btn");
            // console.log(this.headerSub);    
            this.id_player1Name=document.querySelector("#player1-name");
            this.id_player2Name=document.querySelector("#player2-name");
            this.id_player1Symbol=document.querySelector("#player1-symbol");
            this.id_player2Symbol=document.querySelector("#player2-symbol");
            this.formSub=document.querySelector("#form-btn");
            this.formContainer=document.querySelector(".form-container");
            this.player1Head=document.querySelector('#player1-heading');
            this.player2Head=document.querySelector('#player2-heading');
            
        },

        bindEvents:function(){
            this.headerSub.addEventListener("click",this.showForm.bind(this));
            this.formSub.addEventListener("click",this.render.bind(this))
        },

        render:function(){
            // console.log("gello");
            this.getPlayerDetails();
            this.formContainer.style.display="none";
            // console.log(this.player1Head);
            this.player1Head.textContent=this.pl1_name+":"+ this.pl1_symbol
            // console.log(this.player1Head);
            this.player2Head.textContent=this.pl2_name+":"+ this.pl2_symbol
        },

        getPlayerDetails:function(){
            this.pl1_name=this.id_player1Name.value;
            // console.log(this.pl1_name);
            this.pl1_symbol=this.id_player1Symbol.value;           
            this.pl2_name=this.id_player2Name.value;
            this.pl2_symbol=this.id_player2Symbol.value;
        },

        showForm:function(){
            this.formContainer.style.display="block";

        }
    }
    playerInfo.init();
})();

gameplay=(()=>{
    var gameInfo={
        
        init:function(){
            this.cacheDom();
            this.bindEvents();
            this.clearboard();
        },
        cacheDom:function(){
            this.gameTiles=document.querySelectorAll(".game-tiles");
            this.pl1_symbol=document.querySelector("#player1-heading").innerText;
            this.pl1_symbol=this.pl1_symbol[this.pl1_symbol.length-1];
            // console.log(this.pl1_symbol);
            this.pl2_symbol=document.querySelector("#player2-heading").innerText;
            this.pl2_symbol=this.pl2_symbol[this.pl2_symbol.length-1];
            // console.log(this.pl2_symbol);
            this.gameMatrix=[[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];
            this.player1Marker=0;
            this.player2Marker=-1;;
            this.turn=0;
            this.gameWon=false;
            this.winBanner=document.querySelector("#win-banner");
            this.winBannerHead=document.querySelector("#win-banner>h1");
            // console.log(this.winBanner);
            this.formSub=document.querySelector("#form-btn");
        },
        bindEvents:function(){
            this.gameTiles.forEach(element => {
                element.addEventListener("click",()=>{
                    this.render(element);
                })
            });

            this.formSub.addEventListener("click",()=>{
                this.init();
                this.winBanner.style.display='none';
            });
        },
        render:function(ele){
            // console.log(ele);
            if(ele.innerText==='' && !this.gameWon){
                var divId=ele.id;
                var divIndex=divId[divId.length-1];
                this.gameMatrix[Math.floor((divIndex-1)/3)][(divIndex-1)%3]=this.turn%2;
                if(this.turn%2===0)
                    ele.innerText=this.pl1_symbol;
                else
                ele.innerText=this.pl2_symbol;
                if(this.checkGame()){
                    this.gameWon=true;
                    this.winBanner.style.display='block';
                    this.winBannerHead.textContent="Game Won By Player "+(this.turn%2+1) ;
                    // console.log(this.winBannerHead.innerHtml);
                }
                this.turn++;
            }
            // console.log(this.turn); 
            
        },   
        checkGame:function(){
            if((this.gameMatrix[0].every(v=>v===0))){
                return 1;
            }
            else if(this.gameMatrix[0].every(v=>v===1)){
                return 1;
            }
            if((this.gameMatrix[1].every(v=>v===0)) || (this.gameMatrix[1].every(v=>v===1))){
                return 1;
            }
            if((this.gameMatrix[2].every(v=>v===0)) || (this.gameMatrix[2].every(v=>v===1))){
                return 1;
            }
            if((this.gameMatrix[0][0]==1 && this.gameMatrix[1][0]==1 && this.gameMatrix[2][0]==1) || (this.gameMatrix[0][0]==0 && this.gameMatrix[1][0]==0 && this.gameMatrix[2][0]==0)){
                return 1;
            }
            if((this.gameMatrix[0][1]==1 && this.gameMatrix[1][1]==1 && this.gameMatrix[2][1]==1) || (this.gameMatrix[0][1]==0 && this.gameMatrix[1][1]==0 && this.gameMatrix[2][1]==0)){
                return 1;
            }
            if((this.gameMatrix[0][2]==1 && this.gameMatrix[1][2]==1 && this.gameMatrix[2][2]==1) || (this.gameMatrix[0][2]==0 && this.gameMatrix[1][2]==0 && this.gameMatrix[2][2]==0)){
                return 1;
            }
            if((this.gameMatrix[0][0]==1 && this.gameMatrix[1][1]==1 && this.gameMatrix[2][2]==1) || (this.gameMatrix[0][0]==0 && this.gameMatrix[1][1]==0 && this.gameMatrix[2][2]==0)){
                return 1;
            }
            if((this.gameMatrix[0][2]==1 && this.gameMatrix[1][1]==1 && this.gameMatrix[2][0]==1) || (this.gameMatrix[0][2]==0 && this.gameMatrix[1][1]==0 && this.gameMatrix[2][0]==0)){
                return 1;
            }
            // console.log(this.gameMatrix);
        },

        clearboard:function(){
            this.gameTiles.forEach(element=>{
                element.innerText='';
            });
        }

    }
    gameInfo.init();
    // console.log("hello");
})();