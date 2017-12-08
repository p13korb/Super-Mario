var menu = {

	preload: function() {

		game.load.image('menu', 'assets/titl.png');
		game.load.image('lvl1', 'assets/Level1.png');
		game.load.image('lvl2', 'assets/Level2.png');
},

	create: function() {

		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.physics.startSystem(Phaser.Physics.ARCADE);

		var s = game.add.sprite(200, 80, 'menu');

		var btn1 = game.add.button(490 , 340, "lvl1", function(){
			game.state.start('stage1');
		});
		btn1.anchor.set(0.5, 0.5);

		var btn2 = game.add.button(490, 390, "lvl2", function(){
			game.state.start('stage2');
		});
		btn2.anchor.set(0.5, 0.5);

		}



	}