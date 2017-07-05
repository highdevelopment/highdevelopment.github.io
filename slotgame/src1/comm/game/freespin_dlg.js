/*****************************************************
	Description 	: Effect view
	Created 		: 2016/07/30
******************************************************/

function CFreeSpin_StartDlg(game, resources, callback)
{
	var main = this;
	// this.callback = callback;
	this.game = game;
	this.sp_box;
	this.freeSpinNum = 0;

	this.init = function() {
		Phaser.Group.call(this, game);

		var view = new CTemplView(game, this, resources);

		this.sp_box = view.getObjWithKey('freespin_animation');
		this.spin_num = view.getObjWithKey('freespin_num');
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
		if(this.sp_box)
			this.sp_box.animations.stop();
		callback();
	}

	this.init();
};

CFreeSpin_StartDlg.prototype = Object.create(Phaser.Group.prototype);
CFreeSpin_StartDlg.prototype.constructor = CFreeSpin_StartDlg;

CFreeSpin_StartDlg.prototype.showDialog = function(spin_num) {
	if(spin_num)
		this.spin_num.text = spin_num;
	this.visible = true;
	this.alpha = 0;
	var tween = this.game.add.tween(this).to( { alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 0);
	this.freeSpinNum = spin_num;
	// this.sp_box.animations.play('animation', 10, true);
}

function CFreeSpin_EndDlg(game, resources, callback)
{
	var main = this;
	// this.callback = callback;

	this.sp_box;
	var btnStart;
	var background;
	this.textWinVal;
	this.textFreeSpinNum;

	this.init = function() {
		Phaser.Group.call(this, game);

		var view = new CTemplView(game, this, resources);

		this.sp_box = view.getObjWithKey('freespin_animation');
		var btnStart = view.getObjWithKey('freespin_start');
		btnStart.events.onInputDown.add(this.onBtnStart, this);

		this.textWinVal = view.getObjWithKey('win_val');
		this.textFreeSpinNum = view.getObjWithKey('freespin_num');
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
		// this.sp_box.animations.stop();
		if(callback)
			callback();
	}

	this.init();
};

CFreeSpin_EndDlg.prototype = Object.create(Phaser.Group.prototype);
CFreeSpin_EndDlg.prototype.constructor = CFreeSpin_EndDlg;
CFreeSpin_EndDlg.prototype.showDialog = function(winVal, freeSpinNum) {
	this.visible = true;
	this.textWinVal.text = winVal;
	this.textFreeSpinNum = freeSpinNum;
	// this.sp_box.animations.play('animation', 10, true);
}


