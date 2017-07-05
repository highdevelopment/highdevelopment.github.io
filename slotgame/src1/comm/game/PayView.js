/*****************************************************
	Description 	: Payment View
	Created 		: 2016/07/18
	Copyright		: 2016
******************************************************/

var CPayView = function(game, resources, callbackClosed, num)
{
	var main = this;
	var mainView;
	var btnPrev, btnNext;

	this.curIndex = 0;
	this.tableNum = 2;
	if(num)
		this.tableNum = num;

	this.init = function(num) {
		Phaser.Group.call(this, game);

		mainView = new CTemplView(game, this, resources);
		for(var i = 0; i < this.tableNum; i++) {
			var payView = this.getPayTable(i);
			payView.inputEnabled = true;
		}

		btnPrev = mainView.getObjWithKey('btn_pay_left');
		btnPrev.events.onInputDown.add(this.onBtnPrev, this);
		btnPrev.deactivate();

		var btnBackGame = mainView.getObjWithKey('btn_back_game');
		btnBackGame.events.onInputDown.add(this.onBtnBackGame, this);
		
		btnNext = mainView.getObjWithKey('btn_pay_right');
		btnNext.events.onInputDown.add(this.onBtnNext, this);
		btnNext.activate();

		this.visible = false;

		this.refreshView(this.curIndex);
	}

	this.getPayTable = function(index) {
		if(index >= 0 && index < this.tableNum)
			return mainView.getObjWithKey('pay_back_' + index);
		return null;
	}

	this.onBtnPrev = function() {
		this.refreshView(this.curIndex - 1);
	}

	this.onBtnNext = function() {
		this.refreshView(this.curIndex + 1);
	}

	this.onBtnBackGame = function() {
		this.visible = false;
		// mainView.setGameVisible(true);
		if(callbackClosed)
			callbackClosed();
	}

	this.refreshView = function(index) {
		if(index <= 0) {
			btnPrev.deactivate();
			btnNext.activate();
			this.curIndex = 0;
		}
		else if(index >= this.tableNum - 1) {
			btnPrev.activate();
			btnNext.deactivate();
			this.curIndex = this.tableNum - 1;
		}
		else {
			btnPrev.activate();
			btnNext.activate();
			this.curIndex = index;
		}

		for(var i = 0; i < this.tableNum; i++) {
			var payView = this.getPayTable(i);
			if(i == this.curIndex)
				payView.visible = true;
			else
				payView.visible = false;
		}
	}

	main.init();
}

CPayView.prototype = Object.create(Phaser.Group.prototype);
CPayView.prototype.constructor = CPayView;