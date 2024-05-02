var game=new Phaser.Game(`100%`,245,Phaser.AUTO,'game',{preload:preload,create:create,update:update});
            function preload(){
                console.log('preload');
                game.load.image(`bkg`,`images/bkg/bkg.png`);
            }
            function create(){
                console.log('create');
                game.add.image(0,0,`bkg`);
                
            }
            function update(){
                console.log('update');
            }