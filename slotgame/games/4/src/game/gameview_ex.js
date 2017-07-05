
/*****************************************************
	Description 	: GameView
	Created 		: 2016/08/02
	Copyright		: 2016
******************************************************/

GameView.prototype.init = function(game) {
	var bg = game.add.image(0, 0, 'game_back');
	// var game_bg = game.add.image(GAME_STAUS.SPINVIEW_X, GAME_STAUS.SPINVIEW_Y, 'game_back1');

	this.spinView = new CSpinView(this, game);
	this.game_toolbar = new CGameToolBar(game, this);
	this.payView = new CPayView(game, resource_payview, this.onClosePayTable, GAME_CONF.PAYTABLE_NUM);
	this.game_title = new CGameTitle(game, game.world.centerX + 8, GAME_CONF.SPINVIEW_Y + 1, resource_GameTitle);


	// effect_megaWin = new ClassMegaWin(game, spinView);
	this.video_player = new ClassVideoManager(game, this.onVideoFinished);
	// this.spinView.drawInitLines(50);
}