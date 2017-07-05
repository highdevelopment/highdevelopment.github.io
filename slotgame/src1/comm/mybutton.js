/*****************************************************
	Description 	: Customized Button
	Created 		: 2016/08/01
	Copyright		: 2016
******************************************************/

var MyButton = function(game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame, group) {
	Phaser.Button.call(this, game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame, group);
	game.add.existing(this);
	if(group)
		group.add(this);
};

MyButton.prototype = Object.create(Phaser.Button.prototype);
MyButton.prototype.constructor = MyButton;
MyButton.prototype.activate = function() {
	this.input.enabled = true;
	this.frame = 0;
};

MyButton.prototype.deactivate = function() {
	this.input.enabled = false;
	this.frame = 2; // change this to match your greyed out frame in the button spritesheet
};

MyButton.prototype.setEnable = function(enable) {
	if(enable)
		this.activate();
	else
		this.deactivate();
};


var CImageButton = function(game, x, y, keyBack, keyText, callback, callbackContext, group) {
	var main = this;
	// var imgBackOver;
	var imgBackGrey;
	this.imgText;
	this.imgGreyText;
	this.init = function() {
		Phaser.Button.call(this, game, x, y, keyBack, callback, callbackContext, 0, 0, 0, 0, group);
		game.add.existing(this);
		
		// var gray = game.add.filter('Gray');

		// imgBackOver = game.make.image(0, 0, keyBack);
		// this.addChild(imgBackOver);
		// imgBackOver.width = this.width;
		// imgBackOver.height = this.height;
		// imgBackOver.visible = false;
		// imgBackOver.tint = 0xaaaaaa;
		// var colorMatrix = [
		// 	1, 0, 0, 0,
		// 	0, 1, 0, 0,
		// 	0, 0, 1, 0,
		// 	0, 0, 0, 1
		// ];
		// var filter = new PIXI.filters.ColorMatrixFilter();
		// filter.matrix = colorMatrix;
		// filter.brightness(1.2, false);
		// imgBackOver.filters = [filter];

		imgBackGrey = game.make.image(0, 0, keyBack);
		this.addChild(imgBackGrey);
		// imgBackGrey.filters = [gray];
		imgBackGrey.visible = false;
		imgBackGrey.tint = '0x888888';

		if(group)
			group.add(this);

		if(keyText) {
			this.imgText = game.make.image(0, 0, keyText);
			this.imgText.anchor.setTo(0.5, 0.5);
			this.imgText.position.setTo(Math.floor(this.width * 0.5), Math.floor(this.height * 0.5));
			this.addChild(this.imgText);
			this.imgGreyText = game.make.image(0, 0, keyText);
			this.imgGreyText.anchor.setTo(0.5, 0.5);
			this.imgGreyText.position.setTo(Math.floor(this.width * 0.5), Math.floor(this.height * 0.5));
			this.addChild(this.imgGreyText);
			// this.imgGreyText.filters = [gray];
			this.imgGreyText.visible = false;
			this.imgGreyText.tint = '0x888888';
		}

		this.events.onInputOver.add(this.onBtnOver, this);
		this.events.onInputOut.add(this.onBtnOut, this);
		this.events.onInputDown.add(this.onBtnDown, this);
		this.events.onInputUp.add(this.onBtnUp, this);

		this.initX = this.x;
		this.initY = this.y;
	}

	this.setEnable = function(bEnable) {
		this.input.enabled = bEnable;
		// return;
		if(bEnable) {
			this.frame = 0;
			// this.setFrame(1, 0, 0, 0);
			if(this.imgText) {
				this.imgText.visible = true;
				this.imgGreyText.visible = false;
			}
			imgBackGrey.visible = false;
		}
		else {
			if(this.imgText) {
				this.imgText.visible = false;
				this.imgGreyText.visible = true;
			}
			imgBackGrey.visible = true;
			// this.setFrame(2, 2, 2, 2);
		}
	}

	this.activate = function() {
		this.setEnable(true);
	}

	this.deactivate = function() {
		this.setEnable(false);
	}

	this.onBtnOver = function() {
		// imgBackOver.visible = true;
	}

	this.onBtnOut = function() {
		// imgBackOver.visible = false;
	}

	this.onBtnDown = function() {
		this.x = this.initX + 2;
		this.y = this.initY + 2;
	}

	this.onBtnUp = function() {
		this.x = this.initX;
		this.y = this.initY;
		// g_gameSound.playBtnOver();
	}

	this.init();
}

CImageButton.prototype = Object.create(Phaser.Button.prototype);
CImageButton.prototype.constructor = CImageButton;


var CSpinButton = function(game, x, y, keyBack, keySpin, keyStop, callback, callbackContext, group) {
	var main = this;
	var stopText;
	var numberBack;
	var spinNumber;
	var imgGreyStopText;
	this.init = function() {
		CImageButton.call(this, game, x, y, keyBack, keySpin, callback, callbackContext, group);

		stopText = game.make.image(0, 0, keyStop);
		stopText.anchor.setTo(0.5, 0.5);
		stopText.position.setTo(Math.floor(this.width * 0.5), Math.floor(this.height * 0.5));
		this.addChild(stopText);
		stopText.visible = false;

		// var gray = game.add.filter('Gray');
		imgGreyStopText = game.make.image(0, 0, keyStop);
		imgGreyStopText.anchor.setTo(0.5, 0.5);
		imgGreyStopText.position.setTo(Math.floor(this.width * 0.5), Math.floor(this.height * 0.5));
		this.addChild(imgGreyStopText);
		// imgGreyStopText.filters = [gray];
		imgGreyStopText.tint = '0x888888';
		imgGreyStopText.visible = false;

		numberBack = game.make.image(0, 0, keyBack);
		this.addChild(numberBack);
		numberBack.visible = false;

		var style = { font: "36px Arial", fontweight: "bold", fill: "#e0c752", wordWrap: false, boundsAlignH: "center" };
		spinNumber = game.make.text(this.width * 0.5, this.height * 0.5, '10', style);
		spinNumber.anchor.setTo(0.5, 0.5);
		this.addChild(spinNumber);
		spinNumber.visible = false;
	}

	this.setSpinNumber = function(number) {
		if(number > 0) {
			this.input.enabled = false;
			spinNumber.visible = true;
			numberBack.visible = true;
			spinNumber.text = number + '';
		}
		else {
			this.input.enabled = true;
			spinNumber.visible = false;
			numberBack.visible = false;
		}
	}

	this.setTextSpin = function() {
		if(this.imgText) {
			if(this.input.enabled) {
				this.imgText.visible = true;
				this.imgGreyText.visible = false;
			}
			else {
				this.imgGreyText.visible = true;
				this.imgText.visible = false;
			}
		}
		stopText.visible = false;
		imgGreyStopText.visible = false;
	}

	this.setTextStop = function() {
		if(stopText) {
			if(this.input.enabled) {
				stopText.visible = true;
				imgGreyStopText.visible = false;
			}
			else {
				stopText.visible = false;
				imgGreyStopText.visible = true;
			}
		}
		if(this.imgText) {
			this.imgText.visible = false;
			this.imgGreyText.visible = false;
		}
	}

	// this.setBtnState = function() {
	// 	switch(this.state) {
	// 	case SPIN_BTN_STATE.spin:
	// 		if(this.input.enabled) {
	// 			stopText.visible = true;
	// 			imgGreyStopText.visible = false;
	// 		}
	// 		else {
	// 			stopText.visible = false;
	// 			imgGreyStopText.visible = true;
	// 		}
	// 		this.imgText.visible = false;
	// 		this.imgGreyText.visible = false;
	// 		spinNumber.visible = false;
	// 		break;
	// 	case SPIN_BTN_STATE.stop:
	// 		if(this.input.enabled) {
	// 			this.imgText.visible = true;
	// 			this.imgGreyText.visible = false;
	// 		}
	// 		else {
	// 			this.imgText.visible = false;
	// 			this.imgGreyText.visible = true;
	// 		}
	// 		stopText.visible = false;
	// 		imgGreyStopText.visible = false;
	// 		spinNumber.visible = false;
	// 		break;
	// 	}
	// }


	this.init();
}

CSpinButton.prototype = Object.create(CImageButton.prototype);
CSpinButton.prototype.constructor = CSpinButton;