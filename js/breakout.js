
const config= {
    type:Phaser.AUTO,
    width:731,
    height:400,
    scene:{
       preload,
       create,
       update
    },
    parent:`game`,
    physics:{
        default:`arcade`,
        arcade:{
            gravity:{y:100},
            debug:false
            
        }
        
    }
    
};
var game=new Phaser.Game(config);
var platforms;
var player;
var cursors;
var csm;
var stars;
var scoreText;
var score=0;
var keyboard = document.getElementById(`keyboard`);
            function chuansong(player,csm){
               //alert("技术原因，传送失败！");
               score+=10;
               scoreText.setText(`分数：`+score);
               csm.disableBody(true,true);
            }

            function preload(){
                
                this.load.image(`sky`,`images/sky.png`);
                this.load.image(`star`,`images/star.png`);
                this.load.image('ground','images/platforms.png');
                this.load.image(`csm`,`images/csm.png`);
                this.load.spritesheet(`dude`,`images/player/dude.png`,{frameWidth:31.6,frameHeight:47});
            }
            function create(){
                //game.physics.startSystem(Phaser.Physics.ARCADE);
                this.add.image(300,200,`sky`);
                platforms = this.physics.add.staticGroup();
                //platforms.create(45,310,`csm`);
                platforms.create(0,380,'ground').refreshBody();
                platforms.create(0,250,'ground');
                platforms.create(500,310,'ground');
                stars = this.physics.add.group({
                    key:`star`,
                    repeat:11,
                    setXY:{x:0,y:0,stepX:50}
                    });
                stars.create(40,321.5,`csm`);
                stars.children.iterate(function(child){
                      child.setBounceY(Phaser.Math.FloatBetween(0.2,0.8));
                      child.setCollideWorldBounds(true);
                });
                //计分
                scoreText = this.add.text(10,20,`分数：0`,{fontSize:`25px`,fill:`#f9f9f9`});
                
                //加载主角
                player=this.physics.add.sprite(0,205,'dude');
                player.setBounce(0.2)
                player.setCollideWorldBounds(true);
                this.physics.add.collider(player,platforms);
                this.physics.add.collider(stars,platforms);
                this.physics.add.overlap(player,stars,chuansong,null,this);
              /*player.animations.add('left',[0,1,2,3],10,true);    //设置主角向左方向的序列帧
                player.animations.add('right',[5,6,7,8],10,true);*/
                this.anims.create({
                    key:`left`,
                    frames:this.anims.generateFrameNumbers('dude',{start : 0,end : 3}),
                    frameRate:10,
                    repeat:-1
                });
                
                this.anims.create({
                    key:`turn`,
                    frames:[{key : 'dude',frame : 4}],
                    frameRate:20
                });
                
                
                this.anims.create({
                    key:`right`,
                    frames:this.anims.generateFrameNumbers('dude',{start : 5,end : 8}),
                    frameRate:10,
                    repeat:-1
                });
                
                cursors = this.input.keyboard.createCursorKeys();
                //this.input.touch.onTouchStart=function(){alert();};

            }
            function update(){
                //游戏主循环
                //game.physics.arcade.collide(player,platforms);
                
                //控制主角开始
                  if(cursors.left.isDown)
                  {
                   player.setVelocityX(-70);

                   player.anims.play("left",true);
                  }
                   else if(cursors.right.isDown)
                  {
                   player.setVelocityX(70);

                   player.anims.play("right",true);
                  }
                  else{
                   player.setVelocityX(0);

                   player.anims.play('turn');
                  }
      
                  if(cursors.up.isDown){
                      // && player.body.touching.down
                  player.setVelocityY(-100);
                  cursors.up.isDown = false;
                  }
    
            
             }
   
   
   keyboard.addEventListener(`click`,(event)=>{
       if(event.target.tagName == `BUTTON`){
           var value = event.target.textContent;
           if(value == `上`){
               //player.setVelocityY(-60);
               cursors.up.isDown=true;
               //player.body.touching.down = true;
               
               
           }else if(value == `左`){
               /*player.setVelocityX(-50);
               player.anims.play("left",true);*/
               cursors.left.isDown=true;
               cursors.up.isDown=false;
               ursors.right.isDown = false;
           }else if(value == `右`){
              /* player.setVelocityX(50);
               player.anims.play("right",true);*/
               cursors.right.isDown = true;
               cursors.up.isDown=false;
               cursors.left.isDown=false;
           }else{
              /* player.setVelocityX(0);
               player.anims.play('turn');*/
               
           }
           
           
           
       }
       
   });