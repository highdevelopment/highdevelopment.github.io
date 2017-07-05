/*****************************************************
	Description 	: Create Phaser Canvas Game and Define Phaser Game 	method
	Created 		: 2016/07/18
******************************************************/

function init() 
{
	game = new Phaser.Game(1920, 1200, Phaser.AUTO, 'Cleopatra');

	game.state.add("Boot", boot);
	game.state.add("Preload", preload);
	game.state.add("TheGame", theGame);
	game.state.add("Bonus", bonus);
	game.state.start("Boot");
}

var boot = function(game) {
	console.log("%cStarting", "color:white; background:red");
};

boot.prototype = {
	preload: function() {
		
		g_gameEnv.initGame(this.game);
		game.load.image('loading_bar', 'assets/images/bar.png');
		game.load.image('loading_slider', 'assets/images/slider.png');
	},
  	create: function(){
		// this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		// this.scale.pageAlignHorizontally = true;
		this.game.state.start("Preload");
	}
}

var preload = function(game) {

}
 
preload.prototype = {
	preload: function(){
    	loadingBar = new CLoadingView(game);
    	// this.load.setPreloadSprite(loadingBar);
    	gamePreload();
    	loadRes_ToolBar(this.game, false);
    	loadingResource(this.game, loadingBar);
	},
  	create: function(){
		this.game.state.start("TheGame");
	}
}

var theGame = function(game) {

}
 
theGame.prototype = {
	create: function() {
		gameCreate();
		g_gameEnv.initToolBar(false);
		// g_gameSound.init(this.game, 'game_audio');
	},

	render: function() {
		gameRender();
	}
}

var bonus = function(game) {

}

bonus.prototype = {
	preload: function() {
		bonusloadingBar = new CLoadingView(game);
		bonusPreload();
	},
	create: function() {
		bonusCreate();
	}
}

