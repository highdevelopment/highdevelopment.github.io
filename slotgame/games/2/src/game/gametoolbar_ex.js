/*****************************************************
	Description 	: GameView
	Created 		: 2016/09/07
	Copyright		: 2016
******************************************************/


CGameToolBar.prototype.initToolBar = function(game) {

	// progressBar = new CProgressBar(game, 0, 5, 'progress_bar', 'progress_header', 0, 628, 60);
	// this.add(progressBar);

	var style1 = { font: "16px Arial", fill: "#ff84ec", wordWrap: false, boundsAlignH: "center" };
	var style2 = { font: "12px Arial", fill: "#5e67cc", wordWrap: false, boundsAlignH: "center" };
	// var style1 = { font: "24px Arial", fontWeight: "bold", fill: "#f9ffbd", wordWrap: false, boundsAlignH: "center" };

	var text_Y1 = 24;
	// var text_Y2 = 11;
	this.txtBalance = game.make.text(87, text_Y1, "5000", style1);
	this.txtBalance.anchor.setTo(0.5, 0.5);
	this.add(this.txtBalance);
	// this.txtBalanceLabel = game.make.text(94, text_Y2, CResourceManage.getStringWithLang('balance', 'en'), style2);
	// this.txtBalanceLabel.anchor.setTo(0.5, 0.5);
	// this.add(this.txtBalanceLabel);

	this.text_Bet = game.make.text(306, text_Y1, "50", style1);
	this.text_Bet.anchor.setTo(0.5, 0.5);
	this.add(this.text_Bet);
	// this.text_BetLabel = game.make.text(222, text_Y2, 'BET', style2);
	// this.text_BetLabel.anchor.setTo(0.5, 0.5);
	// this.add(this.text_BetLabel);

	this.text_line = game.make.text(220, text_Y1, "30", style1);
	this.text_line.anchor.setTo(0.5, 0.5);
	this.add(this.text_line);
	// this.text_lineLabel = game.make.text(317, text_Y2, 'LINES', style2);
	// this.text_lineLabel.anchor.setTo(0.5, 0.5);
	// this.add(this.text_lineLabel);

	this.text_TotalBet = game.make.text(425, text_Y1, "5000", style1);
	this.text_TotalBet.anchor.setTo(0.5, 0.5);
	this.add(this.text_TotalBet);
	// this.text_TotalBetLabel = game.make.text(433, text_Y2, CResourceManage.getStringWithLang('total_bet', 'en'), style2);
	// this.text_TotalBetLabel.anchor.setTo(0.5, 0.5);
	// this.add(this.text_TotalBetLabel);

	// var text_GoodLuck;
	// var style4 = { font: "26px Arial", fontWeight: "bold", fill: "#ffffee", wordWrap: false, boundsAlignH: "center" };
	// text_GoodLuck = game.make.text(380, 45, "GOOD LUCK!", style4);
	// text_GoodLuck.anchor.setTo(0.5, 0.5);
	// text_GoodLuck.setShadow(3, 3, 'rgba(0,0,0,0.5)', 10);
	// this.add(text_GoodLuck);

	// var style3 = { font: "18px Arial", fill: "#fed700", wordWrap: false, boundsAlignH: "center" };
	this.text_Win = game.make.text(586, text_Y1, "50", style1);
	this.text_Win.anchor.setTo(0.5, 0.5);
	this.add(this.text_Win);
	// var text_WinLabel = game.make.text(585, text_Y2, CResourceManage.getStringWithLang('win', 'en'), style2);
	// text_WinLabel.anchor.setTo(0.5, 0.5);
	// this.add(text_WinLabel);

	// this.viewWinText = new CWinTextView(game, 586, text_Y1, resource_WinText);
	// this.viewWinText.anchor.setTo(0.5, 0.5);
	// this.add(this.viewWinText);

	this.btnPay = new CImageButton(game, 8, 60, 'btn_pay', null, this.onBtnPayTable, this, this);
	// btnExand = new CImageButton(game, 0, 45, 'btn_expand', 'btn_expand_text', gameView.onBtnExpand, this, this);

	this.btnLines_Left = new CImageButton(game, 192, 65, 'btn_left', null, this.onBtnLinesLeft, this, this);
	this.btnLines_Right = new CImageButton(game, 222, 65, 'btn_right', null, this.onBtnLinesRight, this, this);
	this.btnBet_Left = new CImageButton(game, 274, 65, 'btn_left', null, this.onBtnBetLeft, this, this);
	this.btnBet_Right = new CImageButton(game, 304, 65, 'btn_right', null, this.onBtnBetRight, this, this);

	this.btnMaxBet = new CImageButton(game, 348, 60, 'btn_max', null, this.onBtnMaxBet, this, this);

//   	var btnAutoX = 511;
//   	var btnAutoY = 49;
//   	labelStyle = { 'font': '14px Arial', fontWeight: "bold", 'fill': '#90136f' };
	// autoMenu = new CPopupMenu(game, btnAutoX, btnAutoY - 95, 13, 18, main.onMenuItemClicked, aAtuoSpinVals, labelStyle);
	// this.add(autoMenu);
//   	btnAuto = new CImageButton(game, btnAutoX, btnAutoY, 'btn_auto', 'btn_auto_text', this.onBtnAutoSpin, this, this);
//   	btnAutoStop = new CImageButton(game, btnAutoX, btnAutoY, 'btn_auto', 'btn_auto_text_stop', this.onBtnStopAuto, this, this);
//   	btnAutoStop.visible = false;

	this.btnSpin = new CSpinButton(game, 511, 60, 'btn_spin', null, 'btn_text_stop', this.onBtnSpin, this, this);
}