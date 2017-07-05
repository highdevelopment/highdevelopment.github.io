/*****************************************************
	Description 	: Toolbar
	Created 		: 2016/08/01
	Copyright		: 2016
******************************************************/

function CToolBar(parentView, isLobby)
{
	var main = this;
	this.game = parentView.game;
	this.group = null;
	this.btnSound;
	this.btnFullscreen;
	this.textBalance;
	this.balance = 0;
	this.timeBalance;
	this.chatTool;

	var group_info;
	var btnShowInfo;

	var textMajor;
	var textSuper;
	var textUltimate;
	var textGrand;
	var textMinor;

	this.isFullScreen = false;

	this.blackSprite = null;

	this.init = function(game, isLobby) {
		this.group = this.game.add.group();
		g_gameEnv.toolbar = this;
		this.initInfoView(game);

		var style1 = { font: "18px Arial", fill: "#ffffee", wordWrap: false, boundsAlignH: "center", boundsAlignV: 'center' };
		this.textBalance = this.game.make.text(0, 0, '0', style1);
		if(g_gameEnv.gameinfo.totalBalance)
			this.textBalance.text = g_gameEnv.gameinfo.totalBalance;
		this.textBalance.setTextBounds(258, 35, 113, 24);
		this.group.add(this.textBalance);

		var btnBuy = this.game.make.button(400, 26, 'btn_buy', this.onBtnBuyCoin, this, 1, 0, 2);
		this.group.add(btnBuy);
		if(!isLobby) {
			var btnlobby = this.game.add.button(695, 28, 'btnlobby', this.onBtnGoLobby, this, 1, 0, 2);
			this.group.add(btnlobby);
			var btnSignout = this.game.make.button(790, 28, 'btn_signout', this.onBtnSignout, this, 0, 0, 0);
			this.group.add(btnSignout);
		}
		else {
			var btnSignout = this.game.make.button(790, 28, 'btn_signout', this.onBtnSignout, this, 0, 0, 0);
			this.group.add(btnSignout);
			// this.group.position.setTo(463, 380);
			// this.group.position.setTo(463, this.game.world.bounds.y + 290);
		}
		if(game.state.current == 'Lobby') {
			this.group.position.setTo(453, LOBBY_WINDOW_OFFSET);
		}
		else {
			// this.group.position.setTo(463, 230);
			this.group.position.setTo(463, this.game.world.bounds.y + 10);
		}
		this.btnSound = game.make.button(895, 28, 'btn_sound', this.onBtnSound, this, 0, 0, 0);
		if(g_gameSound.isPlay)
			this.btnSound.setFrames(0, 0, 0);
		else
			this.btnSound.setFrames(1, 1, 1);
		this.group.add(this.btnSound);

		this.btnFullscreen = game.make.button(930, 28, 'btn_fullscreen', this.onBtnFullScreen, this, 0, 0, 0);
		if(isLobby) {
			this.isFullScreen = $(document).fullScreen();
		}
		else {
			this.isFullScreen = $(parent.document).fullScreen();
		}
		if(this.isFullScreen)
			this.btnFullscreen.setFrames(0, 0, 0);
		else
			this.btnFullscreen.setFrames(1, 1, 1);
		this.group.add(this.btnFullscreen);

		// this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;


		// this.chatTool = new CChatTool(this.game);
		// this.game.scale.enterFullScreen.add(this.onEnterFullScreen, this);
		this.game.scale.onFullScreenChange.add(this.onFullScreenChange, this);
		// this.blackSprite = game.add.image(0, 1200, 'dlg_background');
		// this.blackSprite.width = game.world.width * 2;
		// this.blackSprite.height = 400;
		// this.blackSprite.tint = '#000000';
	}

	this.initInfoView = function(game) {
		btnShowInfo = game.make.button(899, 63, 'btn_showinfo', this.onBtnShowInfo, this, 0, 0, 0);
		this.group.add(btnShowInfo);

		group_info = game.make.group();
		var infoBack = group_info.create(0, 0, 'info_toolbar');
		infoBack.anchor.setTo(0, 0.5);
		var btnClose = game.make.button(775, infoBack.y, 'btn_info_close', this.onBtnCloseInfo, this, 0, 0, 0);
		btnClose.anchor.y = 0.5;
		group_info.add(btnClose);
		group_info.position.setTo(94, 55);
		this.group.add(group_info);
		group_info.visible = false;

		var style1 = { font: "18px Arial", fill: "#ffffff", wordWrap: false, boundsAlignH: "center", boundsAlignV: 'center' };
		textMajor = this.game.make.text(40, 0, g_gameEnv.gameinfo.infoMajor, style1);
		textMajor.setTextBounds(0, 0, 120, 25);
		group_info.add(textMajor);

		textSuper = this.game.make.text(175, 0, g_gameEnv.gameinfo.infoSuper, style1);
		textSuper.setTextBounds(0, 0, 115, 25);
		group_info.add(textSuper);

		textUltimate = this.game.make.text(316, 0, g_gameEnv.gameinfo.infoUltimate, style1);
		textUltimate.setTextBounds(0, 0, 170, 25);
		group_info.add(textUltimate);

		textGrand = this.game.make.text(500, 0, g_gameEnv.gameinfo.infoGrand, style1);
		textGrand.setTextBounds(0, 0, 120, 25);
		group_info.add(textGrand);

		textMinor = this.game.make.text(640, 0, g_gameEnv.gameinfo.infoMinor, style1);
		textMinor.setTextBounds(0, 0, 120, 25);
		group_info.add(textMinor);

		this.group.create(0, 0, 'toolbar');

		this.game.time.events.loop(100, this.onLoopText, this);
	}

	this.onLoopText = function() {
		if(group_info.visible)
		{
			textMajor.text = this.game.rnd.integerInRange(500, 1000);
			textSuper.text = this.game.rnd.integerInRange(500, 1000);
			textUltimate.text = this.game.rnd.integerInRange(500, 1000);
			textGrand.text = this.game.rnd.integerInRange(500, 1000);
			textMinor.text = this.game.rnd.integerInRange(500, 1000);
		}
	}


	this.onBtnBuyCoin = function() {
		//var dlg = new Dialogs(this.game, this.onCloseBuyDlg);
		if(isLobby) {
			var dlg = $('#iframe_border');
			var window_width = $(window).width();
			var window_height = $(window).height();
			var width = dlg.width();
			var height = dlg.height();

			if(width > window_width)
				width = window_width;
			else if(window_width > 1030)
				width = 1030;

			if(height > window_height)
				height = window_height;
			else if(window_height > 677)
				height = 677;
			dlg.css('width', width - 30);
			dlg.css('height', height - 30);

			width = dlg.width();
			height = dlg.height();
			// var left = (window_width - width) * 0.5;
			// dlg.css('left', left);
			var top = (window_height - height) * 0.5;
			dlg.css('top', top);
			$('#iframe_coinDlg').fadeIn();
		}
		else {
			parent.$(parent.document).trigger('show_coin_dlg');
		}
	}

	this.onBtnGoLobby = function() {
		g_gameSound.pause();
		this.game.time.events.removeAll();
		// this.game.state.start('Lobby');
		if(!isLobby) {
			// parent.$(parent.document).trigger('onBtnGoLobby');
			// g_gameSound.stop();
			window.location.href = "../../index.php";
		}
	}
	this.onBtnSignout = function() {
		this.game.time.events.removeAll();
		if(isLobby)
			window.location.href = 'logout.php';
		else
			parent.$(parent.document).trigger('onBtnSignout');
	}

	this.onCloseBuyDlg = function() {
	}

	this.onBtnSound = function() {
		if(g_gameSound.isPlay) {
			g_gameSound.pause();
			this.btnSound.setFrames(1, 1, 1);
		}
		else {
			g_gameSound.resume();
			this.btnSound.setFrames(0, 0, 0);
		}
		if(!isLobby)
			parent.$(parent.document).trigger('onBtnSound');

		// if(isLobby) {
		// 	var contents = $('.class_iframe').contents().find("iframe");
		// 	contents.css('height', '510px');
		// }
	}

	this.onBtnFullScreen = function() {
		if(this.game.device.desktop) {
			if(isLobby) {
				if($(document).fullScreen())
				{
					$(document).fullScreen(false);
				}
				else
				{
					$(document).fullScreen(true);
				}
			}
			else {
				parent.$(parent.document).trigger('onBtnFullScreen');
			}
		}
		else {
			if(isLobby) {
				if(main.game.scale.isFullScreen)
				{
					main.game.scale.stopFullScreen();
				}
				else
				{
					main.game.scale.startFullScreen(false);
				}
			}
			else {
				parent.$(parent.document).trigger('onBtnFullScreen');
			}
		}
	}

	$(document).bind("fullscreenchange", function() {
		if(main.game.device.desktop) {
			var isFullScreen = false;
			if(isLobby) {
				isFullScreen = $(document).fullScreen();
			}
			else {
				isFullScreen = $(parent.document).fullScreen();
			}
			if(isFullScreen)
				g_gameEnv.toolbar.btnFullscreen.setFrames(0, 0, 0);
			else
				g_gameEnv.toolbar.btnFullscreen.setFrames(1, 1, 1);

			// setTimeout(function() {
			// 	var width = $(window).width();
			// 	var canvasWidth = $('canvas').width();
			// 	if(isDeviceAndroid()) {
			// 		width = window.innerWidth;
			// 		$('canvas').css('left', (width - canvasWidth) * 0.5);
			// 	}
			// 	else {
			// 		if(width == 320)
			// 			$('canvas').css('left', (width - canvasWidth) * 0.5 * window.devicePixelRatio);
			// 		else
			// 			$('canvas').css('left', (width - canvasWidth) * 0.5);
			// 	}
			// }, 100);
		}
	});

	$(document).bind("fullscreenerror", function() {
		console.log("Browser rejected fullscreen change");
	});

	this.onFullScreenChange = function(event) {
		if(!main.game.device.desktop) {
			var isFullScreen = main.game.scale.isFullScreen;
			if(isFullScreen)
				main.btnFullscreen.setFrames(0, 0, 0);
			else
				main.btnFullscreen.setFrames(1, 1, 1);
		}
	}

	this.onBtnShowInfo = function() {
		if(!group_info.visible) {
			this.game.add.tween(btnShowInfo).to({y: 33}, 250, Phaser.Easing.Linear.None, true, 0, 0);
			group_info.visible = true;
			this.game.add.tween(group_info).to({y: 105}, 250, Phaser.Easing.Linear.None, true, 0, 0);
		}
	}
	this.onBtnCloseInfo = function() {
		if(group_info.visible) {
			this.game.add.tween(btnShowInfo).to({y: 63}, 250, Phaser.Easing.Linear.None, true, 0, 0);
			var tween = this.game.add.tween(group_info).to({y: 55}, 250, Phaser.Easing.Linear.None, true, 0, 0);
			tween.onComplete.add(onComplete = function() {
				group_info.visible = false;
			})
		}
	}

	this.setCurBalance = function(balance, isAnimation) {
		if(isAnimation) {
			var curVal = parseFloat(this.textBalance.text);
			var step = Math.floor((balance - curVal) / 15);
			if(!step)
				step = 1;
			this.timeBalance = this.game.time.events.loop(100, this.onLoopBalanceText, this, step);
		}
		else {
			this.textBalance.text = balance;
		}
		this.balance = balance;
	}

	this.onLoopBalanceText = function(step) {
		var curVal = parseInt(this.textBalance.text);
		if(curVal < this.balance) {
			curVal += step;
			this.textBalance.text = curVal;
		}
		else {
			if(this.balance)
				this.textBalance.text = this.balance;
			// else
			// 	this.textBalance.text = '0';
			this.game.time.events.remove(this.timeBalance);
		}
	}

	this.init(this.game, isLobby);
}



function loadRes_ToolBar(game, isLobby) {
	var dir = '../../assets/image/toolbar/';
	if(isLobby)
		dir = 'assets/image/toolbar/';
	//toolbar
	game.load.image('toolbar', dir + 'toolbar.png');
	game.load.image('btnlobby', dir + 'btnlobby.png');
	game.load.image('btn_signout', dir + 'btn_signout.png');
	game.load.spritesheet('btn_fullscreen', dir + 'btn_fullscreen.png', 31, 30, 3);
	game.load.spritesheet('btn_sound', dir + 'btn_sound.png', 31, 30, 3);
	game.load.spritesheet('btn_buy', dir + 'btn_buy_coin.png', 186, 35, 3);
	// game.load.image('tool_chat', dir + 'chat.png');
	// game.load.image('btn_chatopen', dir + 'btn_chatopen.png');
	// game.load.image('list_back', dir + 'list_back.png');
	// game.load.image('list_item', dir + 'list_item.png');
	game.load.image('toolbar_list', dir + 'list.png');
	game.load.image('btn_showinfo', dir + 'btn_info.png');
	game.load.image('info_toolbar', dir + 'info_tool.png');
	game.load.image('btn_info_close', dir + 'btn_close.png');

	// BuyCoin Dialog
	game.load.image('dlg_background', dir + 'buycoin/dlg_back.png');
	game.load.image('buycoin_dlg', dir + 'buycoin/back.png');
	game.load.image('btn_buycoin', dir + 'buycoin/btn_buycoin.png');
	game.load.image('btn_close', dir + 'buycoin/btn_close.png');
}