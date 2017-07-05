/*****************************************************
	Description 	: Boot
	Created 		: 2016/08/01
	Copyright		: 2016
******************************************************/

var boot = function(game) {
	console.log("%cStarting game", "color:white; background:red");
};

boot.prototype = {
	preload: function() {
		g_gameEnv.initGame(this.game, true);
		this.game.load.image('loading_bar', 'assets/image/loading/bar.png');
		this.game.load.image('loading_slider', 'assets/image/loading/slider.png');
		// this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	},
	
	create: function() {
		// s_gameEnv.resizeGame(this.game);
		// this.game.width = $( window ).width();
		// this.game.height = $( window ).height();
		// this.game.scale.setUserScale(1920 / $( window ).width(), 1200 / $( window ).height());
		// this.game.scale.setUserScale($( window ).width() / 1920, $( window ).height() / 1200) ;
		// this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
		// this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		// this.scale.pageAlignVertically = false;
		// this.scale.pageAlignHorizontally = false;
		this.game.state.start("Preload");
	}
}