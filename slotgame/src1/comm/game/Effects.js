/*****************************************************
	Description 	: Effect view
	Created 		: 2016/07/30
******************************************************/

function CFreeSpinDlg(game, resources, callback)
{
	var main = this;
	// this.callback = callback;

	this.sp_box;
	var btnStart;
	var background;

	this.init = function() {
		Phaser.Group.call(this, game);

		var view = new CTemplView(game, this, resources);

		this.sp_box = view.getObjWithKey('freespin_animation');
		var btnStart = view.getObjWithKey('freespin_start');
		btnStart.events.onInputDown.add(this.onBtnStart, this);
		// background = game.make.sprite(0, 0, 'dlg_background');
		// background.width = 1920;
		// background.height = 1200;
		// background.tint = '0x000000';
		// background.alpha = 0.7;
		// background.inputEnabled = true;
		// this.add(background);

		// this.sp_box = game.make.sprite(Math.floor(game.world.centerX), Math.floor(game.world.centerY), 'freespin_animation');
		// this.sp_box.animations.add('movie');
		// this.sp_box.anchor.setTo(0.5, 0.5);
		// this.sp_box.scale.setTo(2.35, 2.35);
		// this.add(this.sp_box);

		// btnStart = game.make.button(Math.floor(game.world.centerX), Math.floor(game.world.centerY) + this.sp_box.height * 0.5 + 10, 'freespin_start', this.onBtnStart, this, 0, 0, 0);
		// btnStart.anchor.setTo(0.5, 0);
		// this.add(btnStart);

		this.visible = false;
	}

	this.onBtnStart = function() {
		this.visible = false;
		this.sp_box.animations.stop();
		callback();
	}

	this.init();
};

CFreeSpinDlg.prototype = Object.create(Phaser.Group.prototype);
CFreeSpinDlg.prototype.constructor = CFreeSpinDlg;
CFreeSpinDlg.prototype.showDialog = function() {
	this.visible = true;
	this.sp_box.animations.play('animation', 10, true);
}


