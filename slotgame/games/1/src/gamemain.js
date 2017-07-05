/*****************************************************
	Description 	: Create Phaser Canvas Game and Define Phaser Game 	method
	Created 		: 2016/07/26
	Copyright		: 2016
******************************************************/

var game = null;
var resMan = null;

function ClassGameMan()
{
	var main = this;
	var mainview = null;

	this.init = function() {
		game = new Phaser.Game(1920, 1200, Phaser.AUTO, 'SlotMachine');

		game.state.add("Boot",boot);
		game.state.add("Preload",preload);
		game.state.add("TheGame", theGame);
		game.state.start("Boot");
	}

	main.init();
}

var boot = function(game) {
	console.log("%cStarting", "color:white; background:red");
};

boot.prototype = {
	preload: function() {
		game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
		game.scale.setUserScale(1900 / 1280, 1200 / 800);

		game.load.image('loading_bar', 'assets/images/loading/bar.png');
		game.load.image('loading_slider', 'assets/images/loading/slider.png');
	},
  	create: function(){
		// this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		// this.scale.pageAlignHorizontally = true;
		this.game.state.start("Preload");
	}
}

var preload = function(game){}
 
preload.prototype = {
	preload: function(){
    	var loadingBar = new ClassLoadingView();
    	// this.load.setPreloadSprite(loadingBar);
    	resMan = new ClassResMan(loadingBar);
	},
  	create: function(){
		this.game.state.start("TheGame");
	}
}

var theGame = function(game) {
}
 
theGame.prototype = {
	create: function() {
		var mainView = new ClassMainView();
	}
}