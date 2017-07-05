/*****************************************************
	Description 	: Dialogs BuyCoin
	Created 		: 2016/08/02
	Copyright		: 2016
******************************************************/

function Dialogs(game, callbackClose)
{
	this.game = game;
	this.background;
	this.box;
	this.callbackClose = callbackClose;

	this.init = function(game) {
		this.background = game.add.image(0, 0, 'dlg_background');
		this.background.width = 1920;
		this.background.height = 1200;
		this.background.tint = '0x000000';
		this.background.alpha = 0;
		this.background.inputEnabled = true;

		this.box = game.add.group();

		var sp_box = this.box.create(0, 0, 'buycoin_dlg');

		for(var i = 0; i < 6; i++) {
			var btn = game.make.button(544, 125 + 49 * i, 'btn_buycoin', this.onBtnBuyCoin, this, 0, 0, 0);
			this.box.add(btn);
		}

		var btnClose = game.make.button(714, 7, 'btn_close', this.onBtnClose, this, 0, 0, 0);
		this.box.add(btnClose);

		this.box.x = Math.floor(game.world.centerX - sp_box.width * 0.5);
		this.box.y = Math.floor(game.world.centerY - sp_box.height * 0.8);
		this.box.alpha = 0;

		this.showDialog();
	}

	this.onBtnClose = function() {
		this.background.visible = false;
		this.box.visible = false;
		callbackClose();
	}

	this.onBtnBuyCoin = function() {

	}

	this.showDialog = function() {
		this.game.add.tween(this.background).to({alpha: 0.5}, 300, Phaser.Easing.Quadratic.In, true, 0, 0);
		this.game.add.tween(this.box).to({alpha: 1}, 300, Phaser.Easing.Quadratic.In, true, 0, 0);
	}

	this.init(game);
}