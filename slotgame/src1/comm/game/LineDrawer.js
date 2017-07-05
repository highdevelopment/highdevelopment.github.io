/*****************************************************
	Description 	: Line Drawing
	Created 		: 2016/07/28
	Copyright		: 2016
******************************************************/

function ClassLineDrawer(game)
{
	var main = this;
	var result;
	this.paylines = [];

	this.init = function() {
		if(g_confPayLine == null) {
			g_confPayLine = {};
			g_confPayLine.xPos = 0;
			g_confPayLine.yPos = 0;
			g_confPayLine.scaleX = 0.95;
			g_confPayLine.scaleY = 0.95;
		}

		for(var i = 0; i < GAME_CONF.PAY_LINE_NUM; i++) {
			var yOffset = 0;
			if(i >= 3)
				yOffset = 5 * (i % 3 - 1);
			var payline = game.add.image(GAME_CONF.SPINVIEW_X + g_confPayLine.xPos, GAME_CONF.SPINVIEW_Y + g_confPayLine.yPos + yOffset, 'payline' + i);
			payline.scale.setTo(g_confPayLine.scaleX, g_confPayLine.scaleY);
			// payline.tint = lineColors[i];
			payline.visible = false;
			this.paylines.push(payline);
		}
	}

	this.clearLines = function() {
		for(var i = 0; i < GAME_CONF.PAY_LINE_NUM; i++) {
			this.paylines[i].visible = false;
			this.paylines[i].alpha = 1;
		}
	}

	this.drawInitLines = function(num) {
		for(var i = 0; i < GAME_CONF.PAY_LINE_NUM; i++) {
			if(i < num)
				this.paylines[i].visible = true;
			else
				this.paylines[i].visible = false;
		}
	}

	this.drawLineIndex = function(index) {
		for(var i = 0; i < GAME_CONF.PAY_LINE_NUM; i++) {
			if(i == index)
				this.paylines[i].visible = true;
			else
				this.paylines[i].visible = false;
		}
	}

	var timerBlinkTotal;
	this.animationBlinkLines = function(lines, nBlinkCnt, callbackComplete) {
		this.callbackComplete = callbackComplete;
		for(var i = 0; i < GAME_CONF.PAY_LINE_NUM; i++) {
			this.paylines[i].visible = false;
		}
		var drawlines = [];
		for(var i = 0; i < lines.length; i++) {
			var index = lines[i].line - 1;
			if(index >= GAME_CONF.PAY_LINE_NUM)
				index = GAME_CONF.PAY_LINE_NUM - 1;
			if(index <= 0)
				index = 0;
			this.paylines[index].visible = true;
			this.paylines[index].alpha = 0;
			drawlines.push(this.paylines[index]);
		}

		drawlines.index = nBlinkCnt * 2 - 1;
		timerBlinkTotal = game.time.events.loop(BLINK_TIME, this.onTimeBlinkTotal, this, drawlines);
	}

	this.onTimeBlinkTotal = function(drawlines) {
		if(drawlines.index < 0) {
			game.time.events.remove(timerBlinkTotal);
			drawlines = [];
			//main.callbackComplete();
		}
		for(var i = 0; i < drawlines.length; i++) {
			if(drawlines.index % 2 == 0)
				drawlines[i].alpha = 0;
			else
				drawlines[i].alpha = 1;
			if(drawlines.index < 0)
				drawlines[i].visible = false;
		}
		drawlines.index = drawlines.index - 1;
		// timer.destroy();
	}

	this.animationLineIndex = function(index, delay) {
		this.paylines[index].visible = true;
		this.paylines[index].alpha = 0;
		var tween = game.add.tween(this.paylines[index])
			.to( { alpha: 1 }, 10, Phaser.Easing.Linear.None, false, delay, 0)
			.to( { alpha: 0 }, 10, Phaser.Easing.Linear.None, false, BLINK_TIME, 0)
			.to( { alpha: 1 }, 10, Phaser.Easing.Linear.None, false, BLINK_TIME, 0)
			.to( { alpha: 0 }, 10, Phaser.Easing.Linear.None, false, BLINK_TIME, 0);
		tween.start();
	}

	this.init();
}