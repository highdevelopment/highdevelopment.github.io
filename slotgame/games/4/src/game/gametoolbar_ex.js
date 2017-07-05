/*****************************************************
	Description 	: GameView
	Created 		: 2016/09/07
	Copyright		: 2016
******************************************************/


CGameToolBar.prototype.initToolBar = function(game) {
	var style1 = { font: "18px Arial", fill: "#918db5", wordWrap: false, boundsAlignH: "center" };
	var style2 = { font: "18px Arial", fill: "#785844", wordWrap: false, boundsAlignH: "center" };
	var style3 = { font: "18px Arial", fill: "#e0c752", wordWrap: false, boundsAlignH: "center" };
	var style4 = { font: "18px Arial", fill: "#9d59a3", wordWrap: false, boundsAlignH: "center" };

	// txtBalance = game.make.text(0, 3, "5000", style1);
	// txtBalance.setTextBounds(0, 0, 140, 25);
	// this.add(txtBalance);
	// var txtBalanceLabel = game.make.text(0, 20, CResourceManage.getStringWithLang('balance', 'en'), style2);
	// txtBalanceLabel.setTextBounds(0, 0, 140, 25);
	// this.add(txtBalanceLabel);

	this.text_line = game.make.text(0, 0, "50", style1);
	this.text_line.setTextBounds(197, 11, 46, 25);
	this.add(this.text_line);
	this.text_line.visible = false;

	this.text_Bet = game.make.text(0, 0, "25", style2);
	this.text_Bet.setTextBounds(272, 11, 68, 25);
	this.add(this.text_Bet);
	this.text_Bet.visible = false;

	var text_BetLabel = game.make.text(120, 36, 'TOTAL BET', style3);
	text_BetLabel.anchor.setTo(0.5, 0.5);
	this.add(text_BetLabel);
	this.text_TotalBet = game.make.text(0, 0, "1250", style3);
	this.text_TotalBet.setTextBounds(40, 44, 155, 25);
	this.add(this.text_TotalBet);

	// text_Win = game.make.text(570, 5, "50", style1);
	// text_Win.setTextBounds(0, 0, 130, 25);
	// this.add(text_Win);
	// var text_WinLabel = game.make.text(570, 20, CResourceManage.getStringWithLang('win', 'en'), style2);
	// text_WinLabel.setTextBounds(0, 0, 130, 25);
	// this.add(text_WinLabel);

	var good_luck = game.add.image(217, 1, 'good_luck');
	this.add(good_luck);
	this.viewWinText = new CWinTextView(game, 190, 0, resource_WinText);
	this.add(this.viewWinText);

	this.btnPay = new CImageButton(game, -13, 9, 'pay_button', null, this.onBtnPayTable, this, this);
	// this.btnPay = new MyButton(game, -13, 9, 'pay_button', this.onBtnPayTable, this, 0, 0, 0, 0, this);

	this.btnLines_Left = new CImageButton(game, 38, 70, 'leftspin_button', null, this.onBtnLinesLeft, this, this);
	this.btnLines_Right = new CImageButton(game, 126, 70, 'rightspin_button', null, this.onBtnLinesRight, this, this);
	// this.btnBet_Left = new CImageButton(game, 38, 70, 'leftspin_button', null, this.onBtnBetLeft, this, this);
	// this.btnBet_Right = new CImageButton(game, 126, 70, 'rightspin_button', null, this.onBtnBetRight, this, this);

	this.btnMaxBet = new MyButton(game, 489, 9, 'max_bet_button', this.onBtnMaxBet, this, 0, 0, 0, 0, this);

	var btnAutoX = 489;
	var btnAutoY = 52;
	labelStyle = { 'font': '16px Arial', fontWeight: "bold", 'fill': '#ffffee' };
	this.aAtuoSpinVals = [200, 100, 50, 25, 10];
	this.autoMenu = new CPopupMenu(game, btnAutoX + 3, btnAutoY - 100, 12, 20, this.onMenuItemClicked, this.aAtuoSpinVals, labelStyle);
	this.add(this.autoMenu);
	this.btnAuto = new MyButton(game, btnAutoX, btnAutoY, 'btn_auto', this.onBtnAutoSpin, this, 1, 0, 0, 0, this);
	this.btnAutoStop = new MyButton(game, btnAutoX, btnAutoY, 'btn_auto_stop', this.onBtnStopAuto, this, 1, 0, 0, 0, this);
	this.btnAutoStop.visible = false;


	this.btnSpin = new CSpinButton(game, 600, 9, 'btn_spin', 'btn_text_spin', 'btn_text_stop', this.onBtnSpin, this, this);
	// btnSpin = game.add.button(600, 9, 'spin_button', this.onBtnSpin, this, 0, 0, 1);
	// this.add(btnSpin);

	// this.labelAutoSpin = this.create(600, 9, 'lable_autoSpinNum');
	// labelAutoSpin.scale.x = 10;
	// this.labelAutoSpinText = game.make.text(this.labelAutoSpin.width * 0.5, this.labelAutoSpin.height * 0.5, '10', { font: "36px Arial", fill: "#e0c752", wordWrap: false, boundsAlignH: "center" });
	// this.labelAutoSpinText.anchor.setTo(0.5, 0.5);
	// this.labelAutoSpin.addChild(this.labelAutoSpinText);
	// this.labelAutoSpin.visible = false;
}