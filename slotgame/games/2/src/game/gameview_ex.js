
/*****************************************************
	Description 	: GameView
	Created 		: 2016/08/02
	Copyright		: 2016
******************************************************/

GameView.prototype.init = function(game) {
	
	game.stage.backgroundColor = GAME_CONF.BACK_COLOR;
	//var game_bg = game.add.image(GAME_STAUS.SPINVIEW_X, GAME_STAUS.SPINVIEW_Y, 'game_back1');

	this.spinView = new CSpinView(this, game);
	var bg = game.add.image(0, 0, 'game_back');

	this.game_toolbar = new CGameToolBar(game, this);
	this.game_title = new CGameTitle(game, game.world.centerX, GAME_CONF.SPINVIEW_Y, resource_GameTitle);
	this.payView = new CPayView(game, resource_payview, this.onClosePayTable, GAME_CONF.PAYTABLE_NUM);

	// this.freespin_title = new CFreeSpinTitle(game, game.world.centerX, GAME2.GAME_START_Y - 2);
	// payView = new ClassPayView(this, game);

	// effect_megaWin = new ClassMegaWin(game, spinView);
	this.video_player = new ClassVideoManager(game, this.onVideoFinished);

	this.freespinDlg = new CFreeSpin_StartDlg(game, resource_FreespinStartDlg, this.onClosedFreeSpinDlg);
	this.freespinEndDlg = new CFreeSpin_EndDlg(game, resource_FreespinEndDlg, null);
	// this.freespinEndDlg.showDialog();

	// mask = game.add.graphics(0, 0);
	// mask.beginFill(0xffffff);
	// mask.drawRect(200, 300, 1000, 1000);
	// bg.mask = mask;
}