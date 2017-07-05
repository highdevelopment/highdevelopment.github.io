
/*****************************************************
	Description 	: GameToolBar
	Created 		: 2016/08/15
	Copyright		: 2016
******************************************************/
var resource_lang = [
	{
		key: 'balance',
		en: 'BALANCE',
	},
	{
		key: 'lines',
		en: 'LINES',
	},
	{
		key: 'bet',
		en: 'BET',
	},
	{
		key: 'total_bet',
		en: 'TOTAL BET',
	},
	{
		key: 'win',
		en: 'WIN',
	},
];

const Lang = {
	en : 0,
	ch : 1,
}

var CResourceManage = {
	getStringWithLang: function(key, lang)  {
		for(var i = 0; i < resource_lang.length; i++) {
			if(resource_lang[i].key == key) {
				return resource_lang[i][lang];
			}
		}
	}
}


var CGameToolBar = function(game, gameView)
{
	this.game = game;
	this.gameView = gameView;
	var main = this;
	this.txtBalance;
	this.text_line;
	this.text_Bet;
	this.betMaxCount = g_aryBetVals.length;

	this.text_TotalBet;
	this.text_Win;
	this.viewWinText;
	// 	var aAtuoSpinVals = [200, 100, 50, 25, 10];
	var autoMenu;

	var progressBar;

	this.btnSpin;

	this.init = function(game) {
	    Phaser.Group.call(this, game);
		this.position.setTo(GAME_CONF.TOOLBAR_LEFT, GAME_CONF.TOOLBAR_TOP);
		this.initToolBar(game);

		this.text_line.text = GAME_CONF.PAY_LINE_NUM;
		this.betCount = Math.floor(this.betMaxCount / 2);
		this.refreshBetText();

		if(this.text_Win)
			this.text_Win.text = '0';

		// this.txtBalance.text = this.gameinfo.totalBalance;
	}

	this.refreshBetText = function() {
		var bet = parseFloat(g_aryBetVals[this.betCount]);
		this.text_Bet.text = bet;
		this.text_TotalBet.text = parseFloat(this.text_line.text) * bet;
	}

	this.onBtnSpin = function() {
		this.setWinText(0);
		this.gameView.onBtnSpin();
		// this.setButtons(game_status);
	}

	this.onBtnPayTable = function() {
		this.gameView.onBtnPayTable();
	}

	this.onBtnLinesLeft = function() {
		var line_num = this.text_line.text - 1;
		if(line_num <= 0)
			line_num = GAME_CONF.PAY_LINE_NUM;
		this.text_line.text = line_num;
		this.gameView.onClickLinesBtn(line_num);
		this.refreshBetText();
	};

	this.onBtnLinesRight = function() {
		var line_num = parseInt(this.text_line.text) + 1;
		if(line_num > GAME_CONF.PAY_LINE_NUM)
			line_num = 1;
		this.text_line.text = line_num;
		this.gameView.onClickLinesBtn(line_num);
		this.refreshBetText();
	}

	this.onBtnBetLeft = function() {
		this.betCount--;
		if(this.betCount < 0)
			this.betCount = this.betMaxCount - 1;
		this.refreshBetText();
	}

	this.onBtnBetRight = function() {
		this.betCount++;
		if(this.betCount >= this.betMaxCount)
			this.betCount = 0;
		this.refreshBetText();
	}

	this.onBtnMaxBet = function() {
		var line_num = GAME_CONF.PAY_LINE_NUM;
		this.text_line.text = line_num;
		this.betCount = this.betMaxCount - 1;
		this.refreshBetText();
		this.gameView.onBtnMaxBet(line_num);
	}


	this.setWinText = function(winVal, animation) {
		if(this.viewWinText) {
			this.viewWinText.setWinText(winVal, animation);
		}
		else {
			this.winVal = winVal;
			if(animation) {
				this.timerWinVal = this.game.time.events.loop(100, this.onLoopWinText, this);
			}
			else {
				this.text_Win.text = winVal + '';
			}
		}
	}

	this.onLoopWinText = function() {
		var step = Math.floor(this.winVal / 15);
		if(step == 0)
			step = 1;
		var curVal = parseInt(this.text_Win.text);
		if(curVal < this.winVal) {
			curVal += step;
			this.text_Win.text = curVal;
		}
		else {
			if(this.winVal)
				this.text_Win.text = this.winVal;
			else
				this.text_Win.text = '0';
			this.game.time.events.remove(this.timerWinVal);
		}
	}

	this.setButtons = function(status) {
		if(status == GAME_STAUS.INIT) {
			this.btnSpin.setEnable(true);
			this.btnSpin.setTextSpin();
			this.btnPay.setEnable(true);
			if(this.btnBet_Right)
				this.btnBet_Right.setEnable(true);
			if(this.btnBet_Left)
				this.btnBet_Left.setEnable(true);
			if(this.btnLines_Right)
				this.btnLines_Right.setEnable(true);
			if(this.btnLines_Left)
				this.btnLines_Left.setEnable(true);
			this.btnMaxBet.setEnable(true);
			if(this.btnAuto)
				this.btnAuto.setEnable(true);
			if(this.btnAutoStop)
				this.btnAutoStop.setEnable(true);
		}
		else if(status == GAME_STAUS.WAITING) {
			this.btnSpin.setEnable(false);
			this.btnSpin.setTextSpin();
			this.btnPay.setEnable(false);
			if(this.btnBet_Right)
				this.btnBet_Right.setEnable(false);
			if(this.btnBet_Left)
				this.btnBet_Left.setEnable(false);
			if(this.btnLines_Right)
				this.btnLines_Right.setEnable(false);
			if(this.btnLines_Left)
				this.btnLines_Left.setEnable(false);
			this.btnMaxBet.setEnable(false);
			if(this.btnAuto)
				this.btnAuto.setEnable(false);
			if(this.btnAutoStop)
				this.btnAutoStop.setEnable(false);
		}
		else if(status == GAME_STAUS.SPINNING) {
			this.btnSpin.setEnable(true);
			this.btnSpin.setTextStop();
			// this.btnSpin.setFrames(2, 2, 2, 2);
			if(this.btnAuto)
				this.btnAuto.setEnable(false);
		}
		else if(status == GAME_STAUS.STOPPED) {
			// this.btnSpin.setFrames(3, 3, 3, 3);
			this.btnSpin.setEnable(false);
			this.btnSpin.setTextStop();
			if(this.btnAutoStop)
				this.btnAutoStop.setEnable(false);
		}
		else if(status == GAME_STAUS.WATCHING) {
			this.btnSpin.setEnable(true);
			this.btnSpin.setTextSpin();
			// btnSpin.setFrames(0, 0, 0, 0);
			this.btnPay.setEnable(true);
			if(this.btnBet_Right)
				this.btnBet_Right.setEnable(true);
			if(this.btnBet_Left)
				this.btnBet_Left.setEnable(true);
			if(this.btnLines_Right)
				this.btnLines_Right.setEnable(true);
			if(this.btnLines_Left)
				this.btnLines_Left.setEnable(true);
			this.btnMaxBet.setEnable(true);
			if(this.btnAuto)
				this.btnAuto.setEnable(true);
			if(this.btnAutoStop)
				this.btnAutoStop.setEnable(true);
		}
		else if(status == GAME_STAUS.DISABLE) {
			this.btnSpin.setEnable(false);
			this.btnSpin.setTextSpin();
			this.btnPay.setEnable(false);
			if(this.btnBet_Right)
				this.btnBet_Right.setEnable(false);
			if(this.btnBet_Left)
				this.btnBet_Left.setEnable(false);
			if(this.btnLines_Right)
				this.btnLines_Right.setEnable(false);
			if(this.btnLines_Left)
				this.btnLines_Left.setEnable(false);
			this.btnMaxBet.setEnable(false);
			if(this.btnAuto)
				this.btnAuto.setEnable(false);
			if(this.btnAutoStop)
				this.btnAutoStop.setEnable(false);
		}
		game_status = status;
	}

	this.setCurBalance = function(balance) {
		if(this.txtBalance)
			this.txtBalance.text = balance + '';
	}


	this.onMenuItemClicked = function(index) {
		main.autoMenu.hideMenu();
		
		main.btnAuto.visible = false;
		main.btnAutoStop.visible = true;
		// this.btnSpin.visible = false;
		// labelAutoSpin.visible = true;
		// labelAutoSpinText.text = num;

		gameView.startAutoSpin(main.aAtuoSpinVals[index]);
		main.setAutoSpinText();
	}

	this.setAutoSpinText = function() {
		this.btnSpin.setSpinNumber(g_autoGameState);
		// labelAutoSpinText.text = g_autoGameState;
	}

	this.onFinishedAutoSpin = function() {
		if(main.btnAuto) {
			main.btnAuto.visible = true;
			main.btnAuto.setEnable(true);
			main.btnAutoStop.visible = false;
		}
		// this.btnSpin.visible = true;
		this.btnSpin.setSpinNumber(-1);
		// labelAutoSpin.visible = false;
	}

	this.onBtnAutoSpin = function() {
		this.autoMenu.toggleMenu();
	}

	this.onBtnStopAuto = function() {
		gameView.onBtnStopAuto();
		this.onFinishedAutoSpin();
	}

	this.init(game);
}


CGameToolBar.prototype = Object.create(Phaser.Group.prototype);
CGameToolBar.prototype.constructor = CGameToolBar;



