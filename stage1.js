var stage1 = {


		preload: function() {

			this.load.spritesheet('tiles', 'assets/super_mario_tiles.png', 16,
					16);
			this.load.spritesheet('goomba', 'assets/goomba3.png', 16, 16);
			this.load.spritesheet('mario', 'assets/mario-2.png', 16, 16);
			this.load.spritesheet('coin', 'assets/coin3.png', 16, 16);
			this.load.spritesheet('xel', 'assets/xel.png',16,16);

			this.load.tilemap('level', 'assets/supermario.json', null,
					Phaser.Tilemap.TILED_JSON);
			this.load.audio('back', 'audio/bgm.mp3'); //Background sound	
			this.load.audio('mpim', 'audio/coin.wav');//Coin sound
			this.load.audio('jump', 'audio/jump.wav');//Jump sound
			this.load.audio('mu', 'audio/key.wav');
			this.load.image('mush','assets/mush.png',16,16);
			this.load.image('badmush','assets/badmush.png',16,16);
			this.load.image('heart','assets/lives.png',16,16);
			this.load.image('mush2','assets/mushroom.png',16,16);
		},

		
		create: function() {
			back = game.add.audio('back');
			back.play();
			var mpim;
			var jump;
			var style = { font: "bold 14px Arial", fill: "#FFE500", boundsAlignH: "center", boundsAlignV: "middle" };
			text = game.add.text(10, 5, "SCORE:  "+score, style); //Keimeno score
			var style2 = { font: "bold 14px Arial", fill: "#FF0090", boundsAlignH: "center", boundsAlignV: "middle" };
			livestext = game.add.text(10, 30, "LIVES: "+lives, style2);//Keimeno gia lives
			Phaser.Canvas.setImageRenderingCrisp(game.canvas)
			game.scale.pageAlignHorizontally = true;
			game.scale.pageAlignVertically = true
			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			game.physics.startSystem(Phaser.Physics.ARCADE);

			game.stage.backgroundColor = '#5c94fc';

			map = game.add.tilemap('level');
			map.addTilesetImage('tiles', 'tiles');
			map.setCollisionBetween(3, 12, true, 'solid');

			map.createLayer('background');

			layer = map.createLayer('solid');
			layer.resizeWorld();

			coins = game.add.group();
			coins.enableBody = true;
			map.createFromTiles(2, null, 'coin', 'stuff', coins);
			coins.callAll('animations.add', 'animations', 'spin',
					[ 0, 0, 1, 2 ], 3, true);
			coins.callAll('animations.play', 'animations', 'spin');

			if(mushflag == false){

			mush = game.add.sprite(800, game.world.height - 200,'mush');
			mushs = game.add.group(); //Manitari
			mush.enableBody = true;
			game.physics.arcade.enable(mush);


			}

			heart = game.add.sprite(1000, game.world.height - 100,'heart');
			hearts = game.add.group(); 
			heart.enableBody = true;
			game.physics.arcade.enable(heart);

			mush2 = game.add.sprite(2000, game.world.height - 200,'mush2');
			mush2s = game.add.group(); 
			mush2.enableBody = true;
			game.physics.arcade.enable(mush2);

			xel = game.add.group();
			xel.enableBody = true;
			map.createFromTiles(3, null, 'xel', 'stuff', xel);
			xel.callAll('animations.add', 'animations', 'moveRight', [4, 5, 6, 7], 2, true);
			xel.callAll('animations.add', 'animations', 'moveLeft', [0, 1, 2, 3], 2, true);	
			xel.callAll('animations.play', 'animations', 'moveLeft');
			xel.setAll('body.bounce.x', 1);
			xel.setAll('body.velocity.x', -20);
			xel.setAll('body.gravity.y', 500);

			goombas = game.add.group();
			goombas.enableBody = true;
			map.createFromTiles(1, null, 'goomba', 'stuff', goombas);
			goombas.callAll('animations.add', 'animations', 'walk', [ 0, 1 ], 2, true);
			goombas.callAll('animations.play', 'animations', 'walk');
			goombas.setAll('body.bounce.x', 1);
			goombas.setAll('body.velocity.x', -20);
			goombas.setAll('body.gravity.y', 500);

			player = game.add.sprite(16, game.world.height - 48, 'mario');
			game.physics.arcade.enable(player);
			player.body.gravity.y = 370;
			player.body.collideWorldBounds = true;
			player.animations.add('walkRight', [ 1, 2, 3 ], 10, true);
			player.animations.add('walkLeft', [ 8, 9, 10 ], 10, true);
			player.goesRight = true;

			game.camera.follow(player);
			text.fixedToCamera=true;
			livestext.fixedToCamera=true;

			cursors = game.input.keyboard.createCursorKeys();
		},

		update: function() {

			game.physics.arcade.collide(player, layer);
			game.physics.arcade.collide(player,mush2, mush2collide);
			game.physics.arcade.collide(goombas, layer);
			game.physics.arcade.collide(xel, layer);
			game.physics.arcade.collide(player,heart,heartCollide1);
			game.physics.arcade.overlap(player, goombas, goombaOverlap);
			game.physics.arcade.overlap(player, xel, xelOverlap);
			game.physics.arcade.overlap(player, coins, coinOverlap);
			game.physics.arcade.collide(player,mush,mushOverlap);

			if (player.body.enable) {
				player.body.velocity.x = 0;
				if (cursors.left.isDown) {
					player.body.velocity.x = -90;
					player.animations.play('walkLeft');
					player.goesRight = false;
				} else if (cursors.right.isDown) {
					player.body.velocity.x = 90;
					player.animations.play('walkRight');
					player.goesRight = true;
				} else {
					player.animations.stop();
					if (player.goesRight)
						player.frame = 0;
					else
						player.frame = 7;
				}

				if (cursors.up.isDown && player.body.onFloor()) {
					jump = game.add.audio('jump');
					jump.play();
					player.body.velocity.y = -190;
					player.animations.stop();
				}

				if (player.body.velocity.y != 0) {
					if (player.goesRight)
						player.frame = 5;
					else
						player.frame = 12;
				}
			}
		}

}
