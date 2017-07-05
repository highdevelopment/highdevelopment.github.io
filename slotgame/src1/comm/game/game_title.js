/*****************************************************
	Description 	: GAme Title
	Created 		: 2016/08/16
******************************************************/

CGameTitle = function(game, x, y, resources)
{
	this.freeSpinNum = 0;
	this.gameTitle;
	this.payTitle;
	this.freeSpinTitle;
	this.text_FreeSpin;

	this.init = function() {
		Phaser.Group.call(this, game);
		this.position.setTo(x, y);

		var view = new CTemplView(game, this, resources);

		this.gameTitle = view.getObjWithKey('game_title');
		this.payTitle = view.getObjWithKey('pay_title');
		this.freeSpinTitle = view.getObjWithKey('freespin_title');
		this.text_FreeSpin = view.getObjWithKey('spin_text');

		this.setTitleType(TITLE_TYPE.GAME);
	}
	this.init();
}

CGameTitle.prototype = Object.create(Phaser.Group.prototype);
CGameTitle.prototype.constructor = CGameTitle;

CGameTitle.prototype.decreaseSpinNum = function() {
	var num = this.freeSpinNum - 1;
	this.setTitleType(TITLE_TYPE.FREESPIN, num);
}

CGameTitle.prototype.setFreeSpinNum = function(num) {
	if(num > 0)
		this.setTitleType(TITLE_TYPE.FREESPIN, num);
}

CGameTitle.prototype.isFreeSpin = function() {
	return this.freeSpinTitle.visible;
}

CGameTitle.prototype.setTitleType = function(type, num) {
	switch(type) {
	case TITLE_TYPE.GAME:
		if(this.gameTitle)
			this.gameTitle.visible = true;
		if(this.payTitle)
			this.payTitle.visible = false;
		if(this.freeSpinTitle) {
			this.freeSpinTitle.visible = false;
			this.text_FreeSpin.visible = false;
		}
		break;
	case TITLE_TYPE.PAY:
		if(this.gameTitle)
			this.gameTitle.visible = false;
		if(this.payTitle)
			this.payTitle.visible = true;
		if(this.freeSpinTitle) {
			this.freeSpinTitle.visible = false;
			this.text_FreeSpin.visible = false;
		}
		break;
	case TITLE_TYPE.FREESPIN:
		if(this.gameTitle)
			this.gameTitle.visible = false;
		if(this.payTitle)
			this.payTitle.visible = false;

		if(this.freeSpinTitle) {
			this.freeSpinTitle.visible = true;
			this.text_FreeSpin.visible = true;

			this.text_FreeSpin.text = num + '';
			this.freeSpinNum = num;
		}
		break;
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////
CWinTextView = function(game, x, y, resources)
{
	var textGoodLuck;
	var textWin;
	var textWinLabel;

	this.init = function() {
		Phaser.Group.call(this, game);
		this.position.setTo(x, y);
		// this.anchor.setTo(0.5, 0.5);

		var view = new CTemplView(game, this, resources);

		textGoodLuck = view.getObjWithKey('text_goodluck');
		textWin = view.getObjWithKey('text_win');
		textWinLabel = view.getObjWithKey('text_winlabel');
	}

	this.showWinText = function(visible) {
		if(visible) {
			if(textGoodLuck)
				textGoodLuck.visible = false;
			if(textWinLabel)
				textWinLabel.visible = true;
			textWin.visible = true;
		}
		else {
			if(textGoodLuck)
				textGoodLuck.visible = true;
			if(textWinLabel)
				textWinLabel.visible = false;
			textWin.visible = false;
		}
	}
	
	this.onLoopWinText = function() {
		var step = Math.floor(this.winVal / 15);
		var curVal = parseFloat(textWin.text);
		if(curVal < this.winVal) {
			curVal += step;
			textWin.text = curVal;
		}
		else {
			if(this.winVal)
				textWin.text = this.winVal;
			else
				textWin.text = '0';
			game.time.events.remove(this.timerWinVal);
		}
	}

	this.setWinText = function(winVal, animation) {
		if(winVal == 0)
			this.showWinText(false);
		else
			this.showWinText(true);

		this.winVal = winVal;
		if(animation) {
			this.timerWinVal = game.time.events.loop(100, this.onLoopWinText, this);
		}
		else {
			textWin.text = winVal + '';
		}
	}

	this.init();
}


CWinTextView.prototype = Object.create(Phaser.Group.prototype);
CWinTextView.prototype.constructor = CWinTextView;
