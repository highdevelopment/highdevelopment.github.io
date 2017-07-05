/*****************************************************
	Description 	: Video Manager
	Created 		: 2016/07/31
	Copyright		: 2016
******************************************************/

var CMoviePlayer = function(game, key, num, callbackMovieComplete)
{
	var main = this;
	this.keyName = key;
	this.frameIndex = 0;
	this.sprite;

	this.init = function() {
		Phaser.Sprite.call(this, game);
		game.add.existing(this);
		//this. game.add.image(GAME_CONF.SPINVIEW_X, GAME_CONF.GAME_START_Y, key + '0');
	}

	this.onLoopMovie = function() {
		if(main.frameIndex < num) {
			var key = main.keyName + main.frameIndex;
			main.key = key;
			main.loadTexture(key, 0);
			main.frameIndex++;
		}
		else {
			if(callbackMovieComplete)
				callbackMovieComplete();
			main.visible = false;
			game.time.events.remove(main.time);
		}
	}


	this.playMovie = function() {
		this.frameIndex = 0;
		this.time = game.time.events.loop(100, this.onLoopMovie, this);
		this.visible = true;
	}

	this.stopMovie = function() {
		if(this.time)
			game.time.remove(this.time);
		this.frameIndex = 0;
		if(callbackMovieComplete)
			callbackMovieComplete();
		this.sprite.visible = false;
	}

	this.init();
}

CMoviePlayer.prototype = Object.create(Phaser.Sprite.prototype);
CMoviePlayer.prototype.constructor = CMoviePlayer;


function ClassVideoManager(game, callbackMovieComplete)
{
	var main = this;
	var players = [];
	var curIndex = 0;

	this.init = function() {
		// var btn_test = game.add.button(500, 565, 'rightspin_button', this.onBtnTesting, this, 0, 0, 0);
		// for(var i = 5; i < 6; i++) {
		// 	var player = game.add.sprite(GAME_CONF.SPINVIEW_X, GAME_CONF.GAME_START_Y, 'movie_' + i);
		// 	player.animations.add('movie');
		// 	player.index = i;
		// 	player.animations.currentAnim.onComplete.add(this.onMovieComplete, this, player);
		// 	player.visible = false;
		// 	player.scale.setTo(2.625, 2.625);
		// 	players.push(player);
		// }
		if(g_confMovies) {
			for(var i = 0; i < g_confMovies.length; i++) {
				var player = new CMoviePlayer(game, 'movie_' + i + '_', g_confMovies[i].num, callbackMovieComplete);
				player.visible = false;
				players.push(player);
			}
		}

		// players[0].position.setTo(GAME_CONF.SPINVIEW_X, GAME_CONF.GAME_START_Y);
		// players[0].playMovie();
	}

	this.showVideo = function(index, posIndex) {
		// if(index < 0)
		// 	index = 0;
		// if(index > 5)
		// 	index = index % 6;
		// index = 5;
		// players[index].animations.play('movie', 10, false);
		var x = GAME_CONF.SPINVIEW_X;
		var y = GAME_CONF.SPINVIEW_Y;
		if(g_confMovies && index < g_confMovies.length) {
			players[index].position.setTo(x, y);
			players[index].playMovie();
		}
	}

	this.stopVideo = function() {
	}

	// this.onMovieComplete = function(param) {
	// 	param.visible = false;
	// 	main.callback();
	// }

	this.onBtnTesting = function() {
		if(curIndex > 5)
			curIndex = 0;
		this.showVideo(curIndex);
		curIndex++;
	}
	this.init();
}