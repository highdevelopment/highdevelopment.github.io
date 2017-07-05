/*****************************************************
	Description 	: Lobby MainView
	Created 		: 2016/08/01
	Copyright		: 2016
******************************************************/

var LOBBY_SCROLL_NUM		= 9;
var LOBBY_OFFSET			= 100;
var LOBBY_WINDOW_OFFSET		= 320
var LOBBY_FULL_OFFSET		= 0;

var theLobby = function(game) {
	var main = this;
	this.group = null;
	this.iconview = null;
	this.nScroll = 0;
	this.btnLeft = null;
	this.btnRight = null;
	this.slider = null;

	main.onSliderChange = function(value) {
		if(value != main.value)
			main.iconview.setScrollValue(value);
	}
	this.onBtnGame = function(nIndex) {
		if(nIndex < UNLOCKED_GAME_NUM) {
			g_gameEnv.curGameIndex = nIndex;
			var src = g_gamelists[nIndex].src;
			if(g_gamelists[nIndex].lock)
				main.loadIframe('game_area', src);
			// LoadingJS(nIndex, main.LoadedJS);
			// main.game.state.start("GameLoading");
		}
	}
	this.LoadedJS = function() {
		main.game.state.start("GameLoading");
	}
	this.loadIframe = function(iframeName, url) {
		if(!this.game.device.desktop) {
			if(this.game.scale.isFullScreen) {
				this.game.scale.stopFullScreen();
			}
		}
		var $iframe = $('#' + iframeName);
		if ( $iframe.length ) {
			g_gameSound.pause();
			$iframe.attr('src',url);
			if(!this.game.device.desktop) {
				setTimeout(function() {
					$(document).fullScreen(true);
					// main.game.scale.startFullScreen(false);
				}, 100);
			}
			return false;
		}
		return true;
	}
}


theLobby.prototype = {
	create: function() {

		// this.game.stage.backgroundColor = '#ffff00';

		this.group = this.game.add.group();
		//var bg1 = this.group.create(502, 310 + LOBBY_OFFSET, 'lobby_back1');
		var bg = this.group.create(0, 0, 'lobby_back');
		this.iconview = new ClassIconView(this, this.onBtnGame);
		this.group.add(this.iconview.group);

		this.btnLeft = new MyButton(this.game, 530, 430 + LOBBY_OFFSET, 'btn_left', this.onBtnLeftScroll, this, 1, 0, 0);
		this.btnRight = new MyButton(this.game, 1340, 430 + LOBBY_OFFSET, 'btn_right', this.onBtnRightScroll, this, 1, 0, 0);
		this.slider = new ClassSlider(this.game, 828, 660 + LOBBY_OFFSET, this.onSliderChange, this, 0);

		this.group.add(this.btnLeft);
		this.group.add(this.btnRight);
		this.group.add(this.slider);
		var toolbar = new CToolBar(this, true);
		this.group.add(toolbar.group);

		this.setScrollState(this.nScroll);
	},

	setScrollState: function(nScroll) {
		this.btnLeft.visible = true;
		this.btnRight.visible = true;

		this.btnLeft.activate();
		this.btnRight.activate();
		if(nScroll <= 0) {
			nScroll = 0;
			this.btnLeft.deactivate();
		}
		else if(nScroll >= LOBBY_SCROLL_NUM - 1) {
			nScroll = LOBBY_SCROLL_NUM - 1;
			this.btnRight.deactivate();
		}
		this.slider.setSiderVal(nScroll, false);
		this.nScroll = nScroll;
	},

	onBtnLeftScroll: function() {
		this.btnLeft.visible = false;
		this.btnRight.visible = false;
		this.iconview.setScrollValue(this.nScroll - 1);
	},

	onBtnRightScroll: function() {
		this.btnLeft.visible = false;
		this.btnRight.visible = false;
		this.iconview.setScrollValue(this.nScroll + 1);
	},

	onFinishedScroll: function(nScroll) {
		this.setScrollState(nScroll);
	},


}