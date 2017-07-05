/*****************************************************
	Description 	: Game View
	Created 		: 2016/07/26
	Copyright		: 2016
******************************************************/


var BLINK_TIME			= 800;
var SPIN_DELAY			= 150;

var g_REEL_TOP = [];
var g_REEL_BOTTOM = [];

function CSpinView(mainView, game)
{
	var main = this;
	this.wheels = [];
	this.jsondata;
	var lineDrawer;
	var mSymbolAnimation;
	var timeSpin = [];
	var timeShowLines = [];
	this.tween_spinning = [];

	var mTimer_spins;

	var tweens_Loop = [];

	this.spinResult = {};

	this.init = function() {
		this.initReel();

		lineDrawer = new ClassLineDrawer(game);
		// animations = new ClassAnimations(game, this);
		mSymbolAnimation = new CSymbolAnimation(game, lineDrawer);

		for(var i = 0; i < this.wheels.length; i++) {
			var y = g_REEL_BOTTOM[i];
			var reel = this.wheels[i];
		}
	}

	this.initReel = function() {
		for(var i = 0; i < g_confReel.length; i++) {
			var reelX = GAME_CONF.SPINVIEW_X + g_confReel[i].x + GAME_CONF.ICON_WIDTH * 0.5 + GAME_CONF.SPINVIEW_XOFFSET;
			var reelY = GAME_CONF.SPINVIEW_Y + g_confReel[i].y - (GAME_CONF.INIT_SPIN_NUM + GAME_CONF.ADD_SPIN_NUM - g_confReel[i].num) * GAME_CONF.ICON_HEIGHT + GAME_CONF.ICON_HEIGHT * 0.5 + GAME_CONF.SPINVIEW_YOFFSET;
			var reelY2 = GAME_CONF.SPINVIEW_Y + g_confReel[i].y - GAME_CONF.ICON_HEIGHT + GAME_CONF.ICON_HEIGHT * 0.5 + GAME_CONF.SPINVIEW_YOFFSET;
			g_REEL_TOP.push(reelY);
			g_REEL_BOTTOM.push(reelY2);
			var wheel = new CReel(game, reelX, reelY, i);
			wheel.initImage();
			this.wheels.push(wheel);

			var mask = game.add.graphics(0, 0);
			mask.beginFill(0xffffff);
			mask.drawRect(GAME_CONF.SPINVIEW_X - 10, GAME_CONF.SPINVIEW_Y, GAME_CONF.SPINVIEW_WIDTH + 20, GAME_CONF.SPINVIEW_HEIGHT);
			wheel.mask = mask;
		}
	}

	this.startSpin = function() {
		game.tweens.removeAll();
		this.removeEvents();
		// game.time.events.removeAll();
		// animations.clearAnimations();
		mSymbolAnimation.stopAnimations();
		lineDrawer.clearLines();
		main.startSpinning();
	}

	this.startSpinning = function() {
		var time = game.time.events.add((SPIN_DELAY * g_confReel.length) + 300, this.onFinshedDelay, this);
		timeSpin.push(time);
		
		for(var i = 0; i < this.wheels.length; i++) {
			var reel = this.wheels[i];
			reel.spin = 1000;
			// var time = game.time.events.add(i * SPIN_DELAY, this.onTimeStartAnimation, this, reel);

			// reel.y = g_REEL_TOP[i];
	   		// tweens_Loop[reel.index].start();

			timeSpin.push(time);
			reel.startAnimation();
		}
		// if(mTimer_spins)
		// 	game.time.events.remove(mTimer_spins);
		// mTimer_spins = game.time.events.loop(10, this.onLoopSpinAnimation, this);
	}

	// this.onLoopSpinAnimation = function()
	// {
	// 	var bSpinFinished = true;
	// 	for(var i = 0; i < this.wheels.length; i++) {
	// 		var reel = this.wheels[i];
	// 		if(reel.animation == REEL_ANIMATION.SPINNING)
	// 		{
	// 			reel.y += reel.animation_velocity;
	// 			if(reel.y > g_REEL_BOTTOM[i])
	// 				reel.y = g_REEL_TOP[i];
	// 		}
	// 		else if(reel.animation == REEL_ANIMATION.SPINDOWN)
	// 		{
	// 			var velocity = reel.animation_velocity * 0.98;
	// 			if(velocity < 1)
	// 				velocity = 1;
	// 			reel.animation_velocity = velocity;
	// 			reel.y += reel.animation_velocity;
	// 			if(reel.y > g_REEL_BOTTOM[i])
	// 			{
	// 				reel.animation = REEL_ANIMATION.FINISHED;
	// 				reel.y = g_REEL_BOTTOM[i];

	// 			}
	// 		}

	// 		if(reel.animation != REEL_ANIMATION.FINISHED)
	// 		{
	// 			bSpinFinished = false;
	// 		}
	// 	}

	// 	if(bSpinFinished)
	// 	{
	// 		game.time.events.remove(mTimer_spins);
	// 		mainView.onFinsihedSpinAnimation();
	// 		for(var i = 0; i < this.wheels.length; i++) {
	// 			var reel = this.wheels[i];
	// 			reel.animation = REEL_ANIMATION.STOP;
	// 		}
	// 	}
	// }

	this.setVisible = function(visible) {
		// game.tweens.removeAll();
		// game.time.events.remove(timeSpin);
		this.removeEvents();
		// animations.clearAnimations();
		mSymbolAnimation.stopAnimations();
		lineDrawer.clearLines();
	}

	this.drawInitLines = function(num) {
		lineDrawer.drawInitLines(num);
	}

	// this.onTimeStartAnimation = function(reel) {
	// 	reel.y = g_REEL_TOP[i];
 //   		tweens_Loop[reel.index].start();
	// }

	// this.onComplete2 = function(reel) {
	// 	if(reel.spin > 0) {
	// 		reel.y = g_REEL_TOP[reel.index];
	// 		tweens_Loop[reel.index].start();
	// 		reel.spin--;
	// 		// this.onComplete1(reel);
	// 	}
	// 	else {
	// 		var y = g_REEL_BOTTOM[reel.index];
	// 		// console.log('start', reel.index);
	// 		var tweenEnd = game.add.tween(reel).to( { y: y }, 600, Phaser.Easing.Back.Out, true);
	// 		tweenEnd.onComplete.add(this.onComplete, this);
	// 		// tweens_End[reel.index].start();
	// 	}
	// }

	this.onComplete = function(reel) {
			// console.log(reel.index);
		if(reel.index == main.wheels.length - 1) {
			mainView.onFinsihedSpinAnimation();
			// this.removeEvents();
		}
	}

	this.onFinshedDelay = function() {
		if(this.spinResult && game_status == GAME_STAUS.SPINNING) {
			this.setPatterns(this.spinResult.pattern);
		}
	}

	this.onSpinResult = function(result, elapse) {
		if(result) {
		 	this.spinResult = result;
		 	if(elapse > SPIN_DELAY * this.wheels.length) {
				this.setPatterns(result.pattern);
			}
		}
	}

	this.setPatterns = function(patterns) {
		var spinCnt_ = this.wheels[0].spin;
		for(var nCol = 0; nCol < this.wheels.length; nCol++) {
			var wheel = this.wheels[nCol];
			var pattern = [];
			if(patterns) {
				for(var nRow = GAME_CONF.ROW_NUM - g_confReel[nCol].num; nRow < patterns.length; nRow++) { //temp for php
					if(nRow < GAME_CONF.ROW_NUM) {
						pattern.push(patterns[nRow][nCol]);
					}
					else {
						pattern.push(0);
					}
				}
				wheel.setPattern(pattern);
			}
			wheel.spin = (wheel.spin - spinCnt_) + 1;
		}
	}

	this.onSpinSuccess = function() {
		//testing
		// this.onCompleteBlink();
		// return;


		var blinkNum = 3;
		if(main.spinResult.winLines.length > 0) {
			if(main.spinResult.winLines.length == 1 && main.spinResult.winLines[0].list.length == 0)
				return;
			lineDrawer.animationBlinkLines(main.spinResult.winLines, blinkNum);
			var time = game.time.events.add(BLINK_TIME * blinkNum * 2.5, this.onCompleteBlink, this);
			timeSpin.push(time);
			// setTimeout(function() {
			// 	main.onCompleteBlink();	
			// } , BLINK_TIME * blinkNum * 2.5);
		}
	}

	this.onCompleteBlink = function() {
		if(g_autoGameState > 0) {
			mainView.restartAutoSpinning();
			return;
		}

		var lines = main.spinResult.winLines;
		lineDrawer.clearLines();
		var patterns = main.spinResult.pattern;

		var aniData = [];
		for(var i= 0; i < lines.length; i++) {
			var index = lines[i].line - 1;
			if(index <= 0)
				index = 0;
			// var delay = (i) * BLINK_TIME * 4;
			// lineDrawer.animationLineIndex(index, delay);
			var points = lines[i].list;
			var lineAniData = [];
			for(var k = 0; k < points.length; k++) {
				var col = points[k].col;
				var row = points[k].row;
				var spinIndex = patterns[row][col] - 1;
				if(spinIndex > 0) {
					if(spinIndex < GAME_CONF.SPIN_NUMBER) { // actors's icon
						var anim = {
							// index: spinIndex + i % 4, //__testing
							index: spinIndex,
							row: row,
							col: col,
							lineIndex: index,
						}
						lineAniData.push(anim);
					}
				}
			}
			aniData.push(lineAniData);
			// mSymbolAnimation.showAnimation(lineAniData, index, delay);
		}
		mSymbolAnimation.showAnimation(aniData);
	}

	this.stopGame = function() {
		this.removeEvents();
		// animations.clearAnimations();
		mSymbolAnimation.stopAnimations();
		lineDrawer.clearLines();
	}

	this.removeEvents = function() {
		for(var i = 0; i < timeSpin.length; i++) {
			game.time.events.remove(timeSpin[i]);
		}
		timeSpin = [];
	}

	this.setLosingPattern = function() {
		var patterns = generateLosingPattern();
		this.setPatterns(patterns);
	}

	main.init();
}
