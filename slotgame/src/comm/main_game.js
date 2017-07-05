/*****************************************************
	Description 	: Main Game
	Created 		: 2016/08/21
	Copyright		: 2016
******************************************************/

function initializeGame()
{
	var game = new Phaser.Game(1920, 1080, Phaser.AUTO, "game");
	game.state.add("Boot", boot);
	game.state.add("Preload", preload);
	game.state.add("TheGame",theGame);
	game.state.start("Boot");
}


var boot = function(game) {
	console.log("%cStarting game", "color:white; background:red");
};

boot.prototype = {
	preload: function() {
		g_gameEnv.initGame(this.game);
		this.game.load.image('loading_bar', '../../assets/image/loading/bar.png');
		this.game.load.image('loading_slider', '../../assets/image/loading/slider.png');
	},
	
	create: function() {
		this.game.state.start("Preload");
	}
}


var preload = function(game) {}

preload.prototype = {
	preload: function() {
		var loadingView = new CLoadingView(this.game);
		loadRes_ToolBar(this.game, false);
		loadingResource(this.game, loadingView, arry_resource);
		// this.game.load.script('gray', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/Gray.js');
		// this.game.load.script('pixi', "https://rawgit.com/pixijs/pixi.js/master/bin/pixi.min.js");
	},

	create: function() {
		this.game.state.start("TheGame");
	}
}


var theGame = function(game) {
}

theGame.prototype = {
  	create: function(){
  		var gameView = new GameView(this.game);
		g_gameEnv.initToolBar(false);
		g_gameSound.init(this.game, 'game_audio');

		if(gameView.game_toolbar.txtBalance)
			gameView.game_toolbar.txtBalance.text = g_gameEnv.gameinfo.totalBalance;
	}
}


const GAME_STAUS = {
	INIT: 		0,
	WAITING:	1,
	STOPPED:	2,
	SPINNING:	3,
	WATCHING:	4,
	DISABLE:	5,
};

const TITLE_TYPE = {
	GAME: 0,
	PAY: 1,
	FREESPIN: 2,
};

var g_confPayLine;
var g_confMovies;