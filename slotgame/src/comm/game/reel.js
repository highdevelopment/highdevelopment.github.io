/*****************************************************
	Description 	: Game Objects: 
	Created 		: 2016/07/26
	Copyright		: 2016
******************************************************/


var CReel = function (game, x, y, index, spinView)
{
	var main = this;
	//this.spin = REEL_ANIMATION.STOP;
	this.animation = 0;
	this.animation_velocity = 0;
	this.mTween = null;

	this.mSetPattern = false;
	this.patterns = false;

	this.init = function() {
		Phaser.Group.call(this, game);
		this.index = index;
		this.x = x;
		this.y = y;
		for(var i = 0; i < (GAME_CONF.INIT_SPIN_NUM + GAME_CONF.ADD_SPIN_NUM); i++) {
			var symbol = this.create(0, i * GAME_CONF.ICON_HEIGHT, 'spin0');
		}
	}

	this.initImage = function() {
		this.resetSymbols();

	}

	this.onStart = function()
	{
		this.mSetPattern = true;
	}

	this.onLoop = function()
	{
		if(this.mSetPattern && this.patterns)
		{
			this.resetSymbols();
			this.mSetPattern = false;
			game.time.events.add(1000 + 500 * this.index, this.stopLoop, this);
		}
	}

	this.stopLoop = function()
	{
		this.mTween.stop(true);
	}

	this.onComplete = function()
	{
		var y = g_REEL_BOTTOM[this.index];
		var tweenEnd = game.add.tween(this).to( { y: y }, 1000, Phaser.Easing.Back.Out, true);
		tweenEnd.onComplete.add(this.onComplete2, this);
	}

	this.onComplete2 = function()
	{
		if(this.index == g_confReel.length - 1)
			spinView.onSpinComplete();
	}

	this.startAnimation = function()
	{
		this.patterns = null;
		if(this.mTween)
			delete this.mTween;

		this.y = g_REEL_TOP[this.index];
		this.mTween = game.add.tween(this).to( { y: g_REEL_BOTTOM[index] - 150}, 500, Phaser.Easing.Linear.None, false, 0, 1000);//.to( { y: START_Y - IMAGE_HEIGHT }, 1000, Phaser.Easing.Back.Out);
		this.mTween.onStart.add(this.onStart, this);
    	this.mTween.onRepeat.add(this.onLoop, this);
    	this.mTween.onComplete.add(this.onComplete, this);
		this.mTween.start();
		// setTimeout(function()
		// {
		// 	main.y = g_REEL_TOP[i];
		// 	main.animation = REEL_ANIMATION.SPINNING;
		// 	main.animation_velocity = 60;
		// 	// if(mTimer_spins)
		// 	// 	game.time.events.remove(mTimer_spins);
		// 	// mTimer_spins = game.time.events.loop(10, main.onLoopSpinAnimation, main);
		// }, main.index * 200);
	}

	this.resetSymbols = function()
	{
		var icons = this.randomSpinArray(); // icon[0] is random( for spin animation )
		if(this.patterns) {
			var firstIndex = icons[0];
			while(1) {
				if(g_spinConfig[firstIndex].length == 1) {
					icons[0] = firstIndex;
					break;
				}
				if(firstIndex >= GAME_CONF.SPIN_NUMBER - 1)
					firstIndex = 0;
				firstIndex++;
			}
			// for(var i = 0; i < GAME_CONF.SPIN_NUM_ROW; i++) {
			for(var i = 0; i < GAME_CONF.ROW_NUM; i++) { // will be removed (for php)
				var val = this.patterns[i];
				if(val) {
					if(isNaN(val)) {
						if(val[1] == '_') {
							icons[i + 1] = val[0] * 1 - 1;
						}
					}
					else {
						icons[i + 1] = val * 1 - 1;
					}
				}
			}
		}
		for(var i = 0; i < (GAME_CONF.INIT_SPIN_NUM + GAME_CONF.ADD_SPIN_NUM); i++) {
			var iconIndex = icons[i];
			if(iconIndex == null)
				iconIndex = 0;
			if(iconIndex < 0)
				iconIndex = 0;
			if(iconIndex >= GAME_CONF.SPIN_NUMBER)
				iconIndex = GAME_CONF.SPIN_NUMBER - 1;
			var symbol = this.children[i];
			var newKey = 'spin' + iconIndex;
			if(symbol.key != newKey) {
				symbol.key = 'spin' + iconIndex;
				symbol.loadTexture(symbol.key, 0);
			}
			// var icon = this.create(0, i * GAME_CONF.ICON_HEIGHT, 'spin' + iconIndex);
			var anchorX = 0.5, anchorY = 0.5;
			if(g_spinConfig[iconIndex].anchorX != null)
				anchorX = g_spinConfig[iconIndex].anchorX;
			if(g_spinConfig[iconIndex].anchorY != null)
				anchorY = g_spinConfig[iconIndex].anchorY;
			symbol.anchor.setTo(anchorX, anchorY);

			if(g_spinConfig[iconIndex].length > 1) {
				var len = g_spinConfig[iconIndex].length;
				symbol.y += (GAME_CONF.ICON_HEIGHT * (len - 1) * 0.5);
				i += (len - 1);
			}
		}
	}

	this.setPattern = function(patterns)
	{
		this.patterns = patterns;
	}

	this.randomSpinArray = function(array) {
	    var copy = [];
	    var aryTemp = [];
	    for(var i = 0; i < GAME_CONF.INIT_SPIN_NUM; i++)
	    	aryTemp[i] = i % GAME_CONF.SPIN_NUMBER;
	    this.shuffleArray(aryTemp);
	    for( var i = 0; i < aryTemp.length; i++) {
			copy.push(aryTemp[i]);
	    }
	    this.shuffleArray(aryTemp);
	    for(var i = 0; i < GAME_CONF.ADD_SPIN_NUM; i++) {
	    	copy.push( aryTemp[i]);
	    }
	    return copy;
	}

	this.shuffleArray = function(array) {
	    for (i = array.length - 1; i > 0; i--) {
			var j = parseInt(Math.random() * i)
			var tmp = array[i];
			array[i] = array[j];
			array[j] = tmp;
	    }
	}
	this.init();
};

CReel.prototype = Object.create(Phaser.Group.prototype);
CReel.prototype.constructor = CReel;

