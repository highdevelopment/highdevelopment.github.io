/*****************************************************
	Description 	: Booting methods 
	Created 		: 2016/08/12
******************************************************/

function init() 
{
	game = new Phaser.Game(1920, 1200, Phaser.AUTO, 'AmericanGlamour');

	game.state.add("AGBoot", AGboot);
	game.state.add("AGPreload", AGpreload);
	game.state.add("AGGame", AGGame);
	game.state.start("AGBoot");
}

var AGboot = function(game) {
	console.log("%cStarting", "color:white; background:red");
}

AGboot.prototype = {
	preload: function() {
		g_gameEnv.initGame(this.game);
		game.load.image('loading_bar', 'assets/resources/images/loading/bar.png');
		game.load.image('loading_slider', 'assets/resources/images/loading/slider.png');
	},
  	create: function(){
		this.game.state.start("AGPreload");
	}
}

var AGpreload = function(game) {}
 
AGpreload.prototype = {
	preload: function(){
    	agLoadingbar = new CLoadingView(game);
    	agPreload();
		loadRes_ToolBar(this.game, false);
		loadingResource(this.game, agLoadingbar);
	},
  	create: function(){
		this.game.state.start("AGGame");
	}
}

var AGGame = function(game) {}
 
AGGame.prototype = {
	create: function() {
		agCreate();
		g_gameEnv.initToolBar(false);
		agSetView.setBalanceValue(g_gameEnv.gameinfo.totalBalance);
		g_gameSound.init(this.game, 'game_audio');
	},

	render: function() {
		agRender();
	}
}
