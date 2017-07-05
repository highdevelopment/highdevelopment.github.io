/*****************************************************
	Description 	: Game Environment, Static Global variable
	Created 		: 2016/08/01
	Copyright		: 2016
******************************************************/

var g_gameTitleList = [
	
]

var g_aryBetVals;

// Game
var g_gameEnv = {
	game: null,
	curGameIndex: -1,
	curLoaingJS: [],
	gameinfo: {},
	toolbar: null,
	isLobby: false,
	initGame: function(game, isLobby) {
		if(isLobby)
			this.isLobby = isLobby;
		this.game = game;
		this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
		this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.USER_SCALE;
		this.game.scale.setMinMax(320, 200, 1920, 1200);

		var width = $(window).width();
		var height = $(window).height();
		if(isLobby) {
			width = $(window).width();
			height = $(window).height();
		}
		else {
			width = $(parent.window).width();
			height = $(parent.window).height(); 
		}
		var initScale = 1;
		// width = screen.width * window.devicePixelRatio;
		if(game.device.desktop) {
			if(width < 1050 || height < 700) {
				var sw = width / 1050;
				var sh = height / 700;
				initScale = Math.min(sw, sh);
			}
		}
		else {
			//if(width < 1200 || height < 1000) {
				if(isLobby)
				{
					var sw = width / 1050;
					var sh = height / 500;
					initScale = Math.min(sw, sh);
				}
				else
				{
					var sw = width / 1050;
					var sh = height / 700;
					initScale = Math.min(sw, sh);
				}
		//	}
		}
		this.game.scale.setUserScale(initScale, initScale, 0, 0);

		var canvasWidth = 1920 * initScale;
		this.resizeGame(canvasWidth);

		if(!isLobby) {
			var str = $('#bet_value').attr('value');
			if(str)
				g_aryBetVals = str.split(',');
		}

	},
	initToolBar: function() {
		var totalbalance = 5000;
		if(this.isLobby) {
			this.gameinfo.totalBalance = $("#txt_balance").val();
			this.gameinfo.infoMajor = $("#info_Major").val();
			this.gameinfo.infoSuper = $("#info_Super").val();
			this.gameinfo.infoUltimate = $("#info_Ultimate").val();
			this.gameinfo.infoGrand = $("#info_Grand").val();
			this.gameinfo.infoMinor = $("#info_Minor").val();
		}
		else {
			// this.gameinfo.totalBalance = $("#txt_balance").val();
			// var totalbalance = window.parent.$('#txt_balance').attr('value');
			this.gameinfo.totalBalance = totalbalance;
		}

		if(this.game.device.desktop)
			totalbalance = localStorage.getItem("total_balance");
		this.gameinfo.totalBalance = totalbalance;
		
		this.toolbar = new CToolBar(this, this.isLobby);
		this.setCurBalance(this.gameinfo.totalBalance);
	},
	setCurBalance: function(balance, animation) {
		this.gameinfo.totalBalance = balance;
		if(this.game.device.desktop)
			localStorage.setItem("total_balance", balance);
		// window.parent.$('#txt_balance').attr('value', balance);
		this.toolbar.setCurBalance(balance, animation);
	},
	resizeGame: function(canvasWidth) {
		if(this.game == null)
			return;
		// var width = $(window).width();
		// var height = $(window).height();
		// if(!this.game.device.desktop) {
		// 	width = screen.width;
		// 	alert(width)
		// }
		var width = $(window).width();
		var height = $(window).height(); 
			// alert(width + "," + height + "," + game.scale.scaleFactor.x + "," + game.scale.scaleFactor.y);
		if(this.isLobby) {
			width = $(window).width();
			height = $(window).height(); 
		}
		else {
			width = $(parent.window).width();
			height = $(parent.window).height();
			// alert(width+','+ canvasWidth);
			// alert(width);
		}

		if(!canvasWidth) {
			canvasWidth = $('canvas').width();
		}
		if(this.game.device.desktop) {
			$('canvas').css('left', (width - canvasWidth) * 0.5);
		}
		else {
			if(isDeviceAndroid()) {
				width = window.innerWidth;
				$('canvas').css('left', (width - canvasWidth) * 0.5);
			}
			else {
				// if(width == 320)
				// 	$('canvas').css('left', (width - canvasWidth) * 0.5 * window.devicePixelRatio);
				// else
					$('canvas').css('left', (width - canvasWidth) * 0.5);
			}
		}

		var yPos = 0;
		if(this.game.world) {
			var isFull = this.isGameFullScreen();
			if(isFull) {
				yPos = (1200 - height * this.game.scale.scaleFactor.y) * 0.5;
				if(yPos < 0)
					yPos = 0;
				if(yPos > 200)
					yPos = 200;
			}
			else {
				if(this.isLobby) {
					yPos = LOBBY_WINDOW_OFFSET;
				}
				else {
					if(height <= 800)
						yPos = 250;
					else
						yPos = 150;
				}
			}

			this.game.world.bounds.y = yPos;
			this.game.scale.setGameSize(1920, 1200);
		}

		if(this.toolbar) {
			this.toolbar.group.y = yPos;
		}

		if(this.toolbar) {
			this.toolbar.chatTool.rePositionChat();
		}
	},
	isGameFullScreen: function() {
		if(this.game.device.desktop) {
			if(this.isLobby)
				return $(document).fullScreen();
			else
				return $(parent.document).fullScreen();
		}
		else {
			return this.game.scale.isFullScreen;
		}
	}
}


$(window).bind( 'orientationchange', function(e) {
	setTimeout(function() {
		var width = $(window).width();
		var canvasWidth = $('canvas').width();
		if(isDeviceAndroid()) {
			width = window.innerWidth;
			$('canvas').css('left', (width - canvasWidth) * 0.5);
		}
		else {
			if(width == 320)
				$('canvas').css('left', (width - canvasWidth) * 0.5 * window.devicePixelRatio);
			else
				$('canvas').css('left', (width - canvasWidth) * 0.5);
		}
	}, 500);
});

$(window).resize(function() {
		var width = $(window).width();
		// $('canvas').css('left', (width - 1920) * 0.5);
		g_gameEnv.resizeGame();
	// setTimeout(g_gameEnv.resizeGame(), 300);
	
	// alert('aaa');
		// var height = $(window).height();
		// var width = $(window).width();
		// // alert(width);
		// $('#game_area').css('width', width);
		// $('#game_area').css('height', height);
		// var canvasWidth = $('canvas').width();
		// var canvasHeight = $('canvas').height();
		// // alert(width + ',' + canvasWidth);

		// if(canvasWidth != 1920) {
		// 	if(isDeviceAndroid()) {
		// 		$('canvas').css('left', (width - canvasWidth) * 0.5);
		// 	}
		// 	else
		// 		$('canvas').css('left', (width - canvasWidth) * 0.5) * window.devicePixelRatio;
		// }
});

function onCoinDgCloseButton(total_balance)
{
	g_gameEnv.setCurBalance(total_balance, true);
}
// $(window).bind('trigger_close_button', function(e, param)
// {
// 	g_gameEnv.setCurBalance(param, true);
// })

// Sound
var g_gameSound = {
	audio: null,
	isPlay: true,
	audio_btnOver: null,
	audio_reels: null,

	init: function(game, audio) {
		this.isPlay = true;
		this.audio_btnOver = game.add.audio('audio_btn_over');
		this.audio_reels = game.add.audio('audio_reels');

		// this.pause();
		this.start(game, audio);
	},
	start: function(game, name) {
		if(name.length > 0) { 
			if(this.audio)
				this.audio.destroy();
			this.audio = game.add.audio(name);
			this.audio.loopFull(1.0);
			this.audio.mute = !this.isPlay;
		}
	},
	play: function() {
		this.isPlay = true;
		this.audio.play();
	},
	pause: function() {
		this.isPlay = false;
		this.audio.mute = true;
	},
	resume: function() {
		this.isPlay = true;
		this.audio.mute = false;
	},
	stop: function() {
		if(this.audio)
			this.audio.stop();
	},
	playBtnOver: function() {
		if(this.isPlay)
			this.audio_btnOver.play();
	},
	playReels: function() {
		// if(this.isPlay)
		// 	this.audio_reels.fadeIn(2000);
	},	
	stopReels: function() {
		// if(this.isPlay)
		// 	this.audio_reels.fadeOut(2000);
	}
}

function isMobilecheck() {
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
	return true;
  return false;
}

function isDeviceAndroid() {
	var ua = navigator.userAgent.toLowerCase();
	var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
	if(isAndroid) {
		return true;
	}
	return false;
}

function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

	  // Windows Phone must come first because its UA also contains "Android"
	if (/windows phone/i.test(userAgent)) {
		return "Windows Phone";
	}

	if (/android/i.test(userAgent)) {
		return "Android";
	}

	// iOS detection from: http://stackoverflow.com/a/9039885/177710
	if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
		return "iOS";
	}

	return "unknown";
}




var s_aRandSymbols;

_initSymbolsOccurence();
function _initSymbolsOccurence() {
	s_aRandSymbols = new Array();

	var i;
	//OCCURENCE FOR SYMBOL 1
	for(i=0;i<1;i++){
		s_aRandSymbols.push(1);
	}

	//OCCURENCE FOR SYMBOL 2
	for(i=0;i<2;i++){
		s_aRandSymbols.push(2);
	}

	//OCCURENCE FOR SYMBOL 3
	for(i=0;i<3;i++){
		s_aRandSymbols.push(3);
	}

	//OCCURENCE FOR SYMBOL 4
	for(i=0;i<4;i++){
		s_aRandSymbols.push(4);
	}

	//OCCURENCE FOR SYMBOL 5
	for(i=0;i<4;i++){
		s_aRandSymbols.push(5);
	}

	//OCCURENCE FOR SYMBOL 6
	for(i=0;i<6;i++){
		s_aRandSymbols.push(6);
	}

	//OCCURENCE FOR SYMBOL 7
	for(i=0;i<7;i++){
		s_aRandSymbols.push(7);
	}

	//OCCURENCE FOR SYMBOL 8
	for(i=0;i<8;i++){
		s_aRandSymbols.push(8);
	}

	//OCCURENCE FOR SYMBOL 9
	for(i=0;i<2;i++){
		s_aRandSymbols.push(9);
	}

	//OCCURENCE FOR SYMBOL WILD
	for(i=0;i<1;i++){
		s_aRandSymbols.push(10);
	}
};


function generateLosingPattern() {
	var aFirstCol = new Array();
	for(var i = 0; i < GAME_CONF.ROW_NUM; i++) {
		var iRandIndex = Math.floor(Math.random()* (s_aRandSymbols.length - 2));
		var iRandSymbol = s_aRandSymbols[iRandIndex];
		aFirstCol[i] = iRandSymbol;
	}

	var _aFinalSymbolCombo = new Array();
	for(var i = 0; i < GAME_CONF.ROW_NUM; i++) {
		_aFinalSymbolCombo[i] = new Array();
		for(var j = 0; j < g_confReel.length; j++) {

		if(j === 0) {
			_aFinalSymbolCombo[i][j] = aFirstCol[i];
		}
		else {
			do {
				var iRandIndex = Math.floor(Math.random()* (s_aRandSymbols.length - 2));
				var iRandSymbol = s_aRandSymbols[iRandIndex];
			} while(aFirstCol[0] === iRandSymbol || aFirstCol[1] === iRandSymbol || aFirstCol[2] === iRandSymbol);

				_aFinalSymbolCombo[i][j] = iRandSymbol;
			}
		}
	}

	// _aWinningLine = new Array();
	return _aFinalSymbolCombo;
};

function _generateRandSymbols() {
	var aRandSymbols = new Array();
	for (var i = 0; i < NUM_ROWS; i++) {
		var iRandIndex = Math.floor(Math.random()* s_aRandSymbols.length);
		aRandSymbols[i] = s_aRandSymbols[iRandIndex];
	}

	return aRandSymbols;
};