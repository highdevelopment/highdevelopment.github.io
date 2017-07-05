/*****************************************************
	Description 	: Lobby MainView
	Created 		: 2016/08/01
	Copyright		: 2016
******************************************************/


// Game Button
var CGameButton = function(game, x, y, key, callback, callbackContext, group) {
	this.o_width;
	this.o_height;
	this.init = function() {
		Phaser.Button.call(this, game, x, y, key, callback, callbackContext, 0, 0, 0, 0, group);
		game.add.existing(this);
		group.add(this);
		this.events.onInputOver.add(this.over, this);
		this.events.onInputOut.add(this.out, this);
		this.o_width = this.width;
		this.o_height = this.height;
		this.anchor.set(0.5, 0.5);
	}
	this.over = function() {
		var i = 0;
		g_gameSound.playBtnOver();
		// this.width = this.o_width * 1.05;
		// this.height = this.o_height * 1.05;
		game.add.tween(this.scale).to({x: 1.03, y: 1.03}, 100, Phaser.Easing.Linear.None, true, 0, 0);
	}
	this.out = function() {
		// this.width = this.o_width;
		// this.height = this.o_height;
		game.add.tween(this.scale).to({x: 1 / 1.03, y: 1 / 1.03}, 100, Phaser.Easing.Linear.None, true, 0, 0);
	}
	this.init();
};

CGameButton.prototype = Object.create(Phaser.Button.prototype);

CGameButton.prototype.constructor = CGameButton;

CGameButton.prototype.activate = function() {
	this.input.enabled = true;
	this.frame = 0;
};

CGameButton.prototype.deactivate = function() {
	this.input.enabled = false;
	this.frame = 2; // change this to match your greyed out frame in the button spritesheet
};



function ClassIconView(state, callback)
{
	var STATUS_INIT			= 0;
	var STATUS_SCROLLING	= 1;
	this.group;
	this.scroll = 0;
	this.state = STATUS_INIT;
	this.init = function() {
		this.group = state.game.add.group();

		// var button = state.game.make.button(10, 10, 'icon_ads', this.onBtnAds, this, 0, 0, 0);
		var btn = new CGameButton(state.game, 14 + 86, 14 + 155, 'icon_ads', this.onBtnAds, this, this.group);
		btn.index = 1000;
		var btnIndex = 0;
		for(var i = 1; i < LOBBY_SCROLL_NUM * 4; i++) {
			var str;
			btnIndex = (i - 1) * 2;
			if(btnIndex < UNLOCKED_GAME_NUM)
				str = 'game_icon' + (btnIndex + 1);
			else
				str = 'game_ricon' + state.game.rnd.integerInRange(0, 3);
			var button = new CGameButton(state.game, 43 + 173 * i + 86, 12 + 78, str, this.onBtnIcon, this, this.group);
			button.index = 2 * (i - 1);
			btnIndex = (i - 1) * 2 + 1;
			if(btnIndex < UNLOCKED_GAME_NUM)
				str = 'game_icon' + (btnIndex + 1);
			else
				str = 'game_ricon' + state.game.rnd.integerInRange(0, 3);
			button = new CGameButton(state.game, 43 + 173 * i + 86, 158 + 78, str, this.onBtnIcon, this, this.group);
			button.index = 2 * (i - 1) + 1;
		}
		this.group.x = 590;
		this.group.y = 300 + LOBBY_OFFSET;
		this.setScrollValue(0);
		this.setIconEnable();

		var mask = game.add.graphics(0, 0);
		mask.beginFill(0xffffff);
		mask.drawRect(508, 414, 886, 313);
		this.group.mask = mask;
	}

	this.onBtnAds = function() {

	}

	this.onBtnIcon = function(button) {
		callback(button.index);
	}

	this.setScrollValue = function(scroll) {
		if(this.scroll == scroll)
			return;
		this.scroll = scroll;
		if(this.state != STATUS_INIT)
			return;

		// this.group.x = 476 - this.scroll * 612;
		var tween = state.game.add.tween(this.group).to({x: 571 - scroll * 691}, 600, Phaser.Easing.Quadratic.In, true, 0, 0);
		this.group.index = scroll;
		tween.onComplete.add(this.onCompleteScroll, this);

		this.init = STATUS_SCROLLING;
		this.setEnable(false);
	}

	this.onCompleteScroll = function() {
		this.init = STATUS_INIT;
		if(this.scroll != this.group.index) {
			this.setScrollValue(scroll.index);
		}
		state.onFinishedScroll(this.scroll);
		this.setIconEnable();
	}

	this.setEnable = function(bEnable) {
		this.group.forEachAlive(function(btn) {
			btn.input.enabled = bEnable;
		});
	}

	this.setIconEnable = function() {
		for(var i = 0; i < this.group.children.length; i++) {
			var btn = this.group.children[i];
			if(btn.index >= this.scroll * 8 - 2 && btn.index < (this.scroll) * 8 + 6)
				btn.input.enabled = true;
			else
				btn.input.enabled = false;

			if(btn.index == 1000) {
				if(this.scroll == 0)
					btn.input.enabled = true;
				else
					btn.input.enabled = false;
			}
		}
	}

	this.init();
}