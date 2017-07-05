/*****************************************************
	Description 	: Loading View
	Created 		: 2016/07/26
	Copyright		: 2016
******************************************************/

/*function ClassLoadingView()
{
	var main = this;
	var bar;
	var slider;
	this.init = function() {
		game.stage.backgroundColor = "#000000";
		bar = game.add.image(game.world.centerX, game.world.centerY, 'loading_bar');
		bar.anchor.setTo(0.5, 0.5);
		slider = game.add.image(game.world.centerX, game.world.centerY, 'loading_slider');
		slider.anchor.setTo(0, 0.5);
		slider.x = bar.x - bar.width * 0.46;
		slider.scale.x = 0;
	}

	this.setProgress = function(percent) {
		slider.scale.x = percent / 100;
	}

	this.setVisible = function(visible) {
		slider.visible = visible;
		slider.visible = visible;
	}

	this.init();
}*/

function CLoadingView(game)
{
	this.game = game;
	this.slider;
	this.bar;

	this.init = function() {
		this.game.stage.backgroundColor = "#000000";
		this.bar = this.game.add.image(this.game.world.centerX, this.game.world.centerY, 'loading_bar');
		this.bar.anchor.setTo(0.5, 0.5);
		this.slider = this.game.add.image(this.game.world.centerX, this.game.world.centerY, 'loading_slider');
		this.slider.anchor.setTo(0, 0.5);
		this.slider.x = this.bar.x - this.bar.width * 0.46;
		this.slider.scale.x = 0;

		var style1 = { font: "12px Arial", fill: "#ffffff", wordWrap: false, boundsAlignH: "center" };
		var text_loading = this.game.add.text(0, 0, "Loading", style1);
		text_loading.setTextBounds(this.game.world.centerX - 100, this.game.world.centerY + 20, 200, 20);
		var tween = this.game.add.tween(text_loading).to({alpha: 0}, 500, Phaser.Easing.Quadratic.In, true, 0, -1);
		tween.yoyo(1000);
	}

	this.setProgress = function(percent) {
  		this.slider.scale.x = percent / 100;
	}

	this.setVisible = function(visible) {
		if(visible)
			this.game.stage.backgroundColor = "#000000";
		this.slider.visible = visible;
		this.slider.visible = visible;
	}
 	
 	this.init();
}