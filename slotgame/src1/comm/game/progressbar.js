/*****************************************************
	Description 	: Progress Bar
	Created 		: 2016/08/16
	Copyright		: 2016
******************************************************/


var CProgressBar = function(game, x, y, key_bar, key_slider, slider_rang1, slider_rang2, coinNum)
{
	var main = this;
	var sp_bar;
	var sp_slider;
	var txt_Coin;
	var txt_Score;
	this.curCoin = -1;
	this.coinNum = coinNum;
	this.curScore = 0;
	this.init = function() {
	    Phaser.Group.call(this, game);
	    this.position.setTo(x, y);

	    sp_bar = this.create(0, 0, key_bar);
	    sp_bar.anchor.setTo(0, 1);
	    
	    sp_slider = this.create(slider_rang1, 0, key_slider);
	    sp_slider.anchor.setTo(0, 1);

		var style1 = { font: "12px Arial", fontWeight: "bold", fill: "#021432", wordWrap: false, boundsAlignH: "center" };
		var style2 = { font: "12px Arial", fontWeight: "bold", fill: "#dfce00", wordWrap: false, boundsAlignH: "center" };

		txt_Coin = game.make.text(690, -34, '10 / 122', style1);
		txt_Coin.setTextBounds(0, 0, 68, 13);
		this.add(txt_Coin);

		txt_Score = game.make.text(690, -20, '6354', style2);
		txt_Score.setTextBounds(0, 0, 68, 13);
		this.add(txt_Score);

		this.setProgress(0, false);
		this.addCoins();
	}

	this.addCoins = function() {
		this.curCoin++;
		txt_Coin.text = this.curCoin;
		txt_Coin.text = this.curCoin + ' / ' + this.coinNum + '';

		this.setProgress(this.curCoin / this.coinNum, true);
	}

	this.setScore = function(score) {
		this.curScore = score;
		txt_Score.text = score;
	}

	this.setProgress = function(progress, isAnimation) {
		var x = slider_rang1 + (slider_rang2 - slider_rang1) * progress;
		if(isAnimation) {
			var tween = game.add.tween(sp_slider).to({x: x}, 300, Phaser.Easing.Quadratic.In, true, 0, 0);
			tween.onComplete.add(this.onComplete, tween);
		}
		else {
			sp_slider.x = x;
		}
	}

	this.onComplete = function(tween) {
		game.tweens.remove(tween);
	}

	this.init();
};

CProgressBar.prototype = Object.create(Phaser.Group.prototype);
CProgressBar.prototype.constructor = CProgressBar;