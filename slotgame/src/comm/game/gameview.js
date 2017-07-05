/*****************************************************
	Description 	: GameView
	Created 		: 2016/09/07
	Copyright		: 2016
******************************************************/

var game_status = GAME_STAUS.INIT;

var g_autoGameState = 0;
var g_nAutoWinVal = 0;

function GameView(game)
{
	var main = this;
	this.game = game;
	this.payView;

	this.freespin_title;
	this.freespinDlg;

	this.btnSpin;
	this.result = {};


	this.onClosePayTable = function() {
		main.game_title.setTitleType(TITLE_TYPE.GAME);
	}

	this.onClosedFreeSpinDlg = function() {
		// Starting Free Spinning
		g_autoGameState = main.result.freespin;
		main.game_title.setTitleType(TITLE_TYPE.FREESPIN, main.result.freespin);
		main.game_toolbar.setButtons(GAME_STAUS.INIT);
		main.startSpinning();
		g_nAutoWinVal = 0;
	}

	this.onBtnSpin = function() {
		if(game_status == GAME_STAUS.INIT || game_status == GAME_STAUS.WATCHING) {
			if(g_autoGameState > 0) {
				this.restartAutoSpinning();
			}
			else {
				this.startSpinning();
			}
		}
		else if(game_status == GAME_STAUS.SPINNING) {
			this.game_toolbar.setButtons(GAME_STAUS.STOPPED);
			this.stopGame();
		}
	}

	this.onFinsihedSpinAnimation = function() {
		if(this.result.success) {
			this.game_toolbar.setWinText(this.result.winVal, true);
			// if(this.result.winVal > 25000) {
				// effect_megaWin.startAnimation(this.result.winVal);
			// }
			if(g_confMovies && this.result.bonus >= 0) {
				game_status = GAME_STAUS.DISABLE;
				this.video_player.showVideo(this.result.bonus, this.result.bonusIndex);
			}
			else if(this.result.freespin > 0) {
				this.freespinDlg.showDialog(this.result.freespin);
			}
			else {
				game_status = GAME_STAUS.WATCHING;
				this.spinView.onSpinSuccess();
			}
		}
		else {
			game_status = GAME_STAUS.INIT;
			if(g_autoGameState > 0) {
				this.restartAutoSpinning();
			}
		}
		this.game_toolbar.setButtons(game_status);

		if(this.result.money != null)
		{
			this.game_toolbar.setCurBalance(this.result.money);
			g_gameEnv.setCurBalance(this.result.money);
		}
		
		g_gameSound.stopReels();
	}

	this.onVideoFinished = function() {
		if(main.result.freespin) {
			main.freespinDlg.showDialog(main.result.freespin);
		}
		else {
			main.spinView.onSpinSuccess();
		}
		main.game_toolbar.setButtons(GAME_STAUS.WATCHING);
	}

	this.restartAutoSpinning = function() {
		game_status = GAME_STAUS.INIT;
		main.game_toolbar.setButtons(game_status);
		if(main.game_title.isFreeSpin()) {
			if(main.result.winVal)
				g_nAutoWinVal += main.result.winVal;
			var freeNum = main.game_title.freeSpinNum;
			if(freeNum <= 1) {
				g_autoGameState = 0;
				main.game_title.setTitleType(TITLE_TYPE.GAME);
				var freespinNum = main.freespinDlg.freeSpinNum;
				this.freespinEndDlg.showDialog(g_nAutoWinVal, freespinNum);
				return;
			}
			main.game_title.setFreeSpinNum(freeNum - 1);
			g_autoGameState = freeNum - 1;
		}
		else {
			g_autoGameState--;
			if(g_autoGameState <= 0) {
				main.game_toolbar.onFinishedAutoSpin();
				return;
			}
			main.game_toolbar.setAutoSpinText();
		}
		main.startSpinning();
	}

	this.startSpinning = function() {
		this.result = {};
		this.game_toolbar.setButtons(GAME_STAUS.WAITING);
		this.spinView.startSpin();
		this.getSpinData();
		g_gameSound.playReels();
	}

	this.onClickLinesBtn = function(line_num) {
		this.stopGame();
		this.spinView.drawInitLines(line_num);
	}

	this.onBtnMaxBet = function(line_num) {
		this.spinView.drawInitLines(line_num);
		this.timeMaxBet = this.game.time.events.add(1000, this.onTimeMaxBet, this);
	}

	this.onTimeMaxBet = function() {
		this.onBtnSpin();
		this.game.time.events.remove(this.timeMaxBet);
	}
//		setTimeout(function() {
//			main.onBtnSpin();
//		}, 1000);
//		// this.timeMaxBet = this.game.time.events.add(, this.onTimeMaxBet, this);
//	}

	this.onBtnPayTable = function() {
		this.game_title.setTitleType(TITLE_TYPE.PAY);
		this.payView.visible = true;
		this.spinView.setVisible();
		// this.setGameVisible(false);
	}

	this.setGameVisible = function(visible) {
		this.spinView.setVisible(visible);
	}

	this.stopGame = function() {
		this.spinView.stopGame();
	}

	// function getUrlVars( urlVars ) {
	// 	urlVars = urlVars.trim();
	// 	var oFinalData = new Array();
	// 	var hashes = urlVars.split('&');
	// 	for (var i = 0; i < hashes.length; i++) {
	// 		var hash = hashes[i].split('=');
	// 		oFinalData[hash[0]] = hash[1];
	// 	}
	// 	return oFinalData;
	// }

	this.getSpinData = function() {

		var start_time = new Date();
	// // // ///////////////////testing
	// setTimeout(function() {
	// // 	var testData = '{"res":"true","win":"true","pattern":[["9","9","4","5","3"],["10","8","7","10","1"],["8","7","9","9","4"]],"win_lines":[{"line":18,"amount":"2","num_win":3,"value":"9","list":[{"row":0,"col":0,"value":"9"},{"row":0,"col":1,"value":"9"},{"row":2,"col":2,"value":"9"}]},{"line":32,"amount":"4","num_win":4,"value":"9","list":[{"row":0,"col":0,"value":"9"},{"row":0,"col":1,"value":"9"},{"row":2,"col":2,"value":"9"},{"row":2,"col":3,"value":"9"}]}],"money":99824,"tot_win":24,"bonus":0,"cash":376}';
	// // 	// var testData = '{"res":"true","win":"true","pattern":[[0,0,0,"13","s","12"],[0,0,"10","9","9","12"],[0,"10","7","13","11","5"],["10","12","9","5","12","13"],["3","s","11","13","13","7"],["s","5","6","4","s","12"]],"win_lines":[{"line":1,"amount":"3","num_win":3,"value":"10","list":[{"row":3,"col":0,"value":"10"},{"row":2,"col":1,"value":"10"},{"row":1,"col":2,"value":"10"}]},{"line":2,"amount":"3","num_win":3,"value":"10","list":[{"row":3,"col":0,"value":"10"},{"row":2,"col":1,"value":"10"},{"row":1,"col":2,"value":"10"}]},{"line":3,"amount":"3","num_win":3,"value":"10","list":[{"row":3,"col":0,"value":"10"},{"row":2,"col":1,"value":"10"},{"row":1,"col":2,"value":"10"}]},{"line":4,"amount":"3","num_win":3,"value":"10","list":[{"row":3,"col":0,"value":"10"},{"row":2,"col":1,"value":"10"},{"row":1,"col":2,"value":"10"}]},{"line":5,"amount":"3","num_win":3,"value":"10","list":[{"row":3,"col":0,"value":"10"},{"row":2,"col":1,"value":"10"},{"row":1,"col":2,"value":"10"}]},{"line":6,"amount":"3","num_win":3,"value":"10","list":[{"row":3,"col":0,"value":"10"},{"row":2,"col":1,"value":"10"},{"row":1,"col":2,"value":"10"}]},{"line":31,"amount":"2","num_win":2,"value":"s","list":[{"row":5,"col":0,"value":"s"},{"row":4,"col":1,"value":"s"}]},{"line":32,"amount":"2","num_win":2,"value":"s","list":[{"row":5,"col":0,"value":"s"},{"row":4,"col":1,"value":"s"}]},{"line":33,"amount":"2","num_win":2,"value":"s","list":[{"row":5,"col":0,"value":"s"},{"row":4,"col":1,"value":"s"}]},{"line":34,"amount":"2","num_win":2,"value":"s","list":[{"row":5,"col":0,"value":"s"},{"row":4,"col":1,"value":"s"}]},{"line":35,"amount":"2","num_win":2,"value":"s","list":[{"row":5,"col":0,"value":"s"},{"row":4,"col":1,"value":"s"}]},{"line":36,"amount":"2","num_win":2,"value":"s","list":[{"row":5,"col":0,"value":"s"},{"row":4,"col":1,"value":"s"}]}],"money":99920,"tot_win":120,"bonus":0,"cash":280}';
	// 	// var testData5 = '{"res":"true","win":"true","pattern":[[0,0,0,"6","7","7"],[0,0,"13","11","6","10"],[0,"8","10","9","7","s"],["10","10","9","6","12","7"],["11","9","12","7","9","11"],["12","12","4","4","7","7"]],"win_lines":[{"line":25,"amount":"3","num_win":3,"value":"10","list":[{"row":3,"col":0,"value":"10"},{"row":3,"col":1,"value":"10"},{"row":2,"col":2,"value":"10"}]},{"line":26,"amount":"3","num_win":3,"value":"10","list":[{"row":3,"col":0,"value":"10"},{"row":3,"col":1,"value":"10"},{"row":2,"col":2,"value":"10"}]},{"line":27,"amount":"3","num_win":3,"value":"10","list":[{"row":3,"col":0,"value":"10"},{"row":3,"col":1,"value":"10"},{"row":2,"col":2,"value":"10"}]},{"line":28,"amount":"3","num_win":3,"value":"10","list":[{"row":3,"col":0,"value":"10"},{"row":3,"col":1,"value":"10"},{"row":2,"col":2,"value":"10"}]},{"line":29,"amount":"3","num_win":3,"value":"10","list":[{"row":3,"col":0,"value":"10"},{"row":3,"col":1,"value":"10"},{"row":2,"col":2,"value":"10"}]},{"line":30,"amount":"3","num_win":3,"value":"10","list":[{"row":3,"col":0,"value":"10"},{"row":3,"col":1,"value":"10"},{"row":2,"col":2,"value":"10"}]},{"line":49,"amount":"2","num_win":3,"value":"12","list":[{"row":5,"col":0,"value":"12"},{"row":5,"col":1,"value":"12"},{"row":4,"col":2,"value":"12"}]},{"line":50,"amount":"2","num_win":3,"value":"12","list":[{"row":5,"col":0,"value":"12"},{"row":5,"col":1,"value":"12"},{"row":4,"col":2,"value":"12"}]}],"money":99888,"tot_win":88,"bonus":0,"cash":312}';
	// 	var testData7 = '{"res":"true","win":"true","pattern":[["11","10","9","8_1","5_1"],["9","12","12","8_2","5_2"],["10","10","12","8_1","12"],["11","12","s","8_2","11"]],"win_lines":[{"line":1,"amount":"0","num_win":1,"value":"11","list":[{"row":0,"col":0,"value":"11"}]},{"line":2,"amount":"0","num_win":1,"value":"11","list":[{"row":3,"col":0,"value":"11"}]},{"line":3,"amount":"0","num_win":1,"value":"9","list":[{"row":1,"col":0,"value":"9"}]},{"line":4,"amount":"0","num_win":2,"value":"10","list":[{"row":2,"col":0,"value":"10"},{"row":2,"col":1,"value":"10"}]},{"line":5,"amount":"0","num_win":1,"value":"11","list":[{"row":0,"col":0,"value":"11"}]},{"line":6,"amount":"0","num_win":1,"value":"11","list":[{"row":3,"col":0,"value":"11"}]},{"line":7,"amount":"0","num_win":1,"value":"10","list":[{"row":2,"col":0,"value":"10"}]},{"line":8,"amount":"0","num_win":1,"value":"9","list":[{"row":1,"col":0,"value":"9"}]},{"line":9,"amount":"0","num_win":1,"value":"11","list":[{"row":0,"col":0,"value":"11"}]},{"line":10,"amount":"0","num_win":1,"value":"11","list":[{"row":3,"col":0,"value":"11"}]},{"line":11,"amount":"0","num_win":1,"value":"9","list":[{"row":1,"col":0,"value":"9"}]},{"line":12,"amount":"0","num_win":1,"value":"10","list":[{"row":2,"col":0,"value":"10"}]},{"line":13,"amount":"0","num_win":1,"value":"9","list":[{"row":1,"col":0,"value":"9"}]},{"line":14,"amount":"0","num_win":1,"value":"10","list":[{"row":2,"col":0,"value":"10"}]},{"line":15,"amount":"0","num_win":1,"value":"11","list":[{"row":0,"col":0,"value":"11"}]},{"line":16,"amount":"0","num_win":1,"value":"11","list":[{"row":3,"col":0,"value":"11"}]},{"line":17,"amount":"0","num_win":1,"value":"9","list":[{"row":1,"col":0,"value":"9"}]},{"line":18,"amount":"0","num_win":1,"value":"10","list":[{"row":2,"col":0,"value":"10"}]},{"line":19,"amount":"0","num_win":1,"value":"9","list":[{"row":1,"col":0,"value":"9"}]},{"line":20,"amount":"0","num_win":1,"value":"10","list":[{"row":2,"col":0,"value":"10"}]},{"line":21,"amount":"0","num_win":1,"value":"11","list":[{"row":0,"col":0,"value":"11"}]},{"line":22,"amount":"0","num_win":1,"value":"11","list":[{"row":3,"col":0,"value":"11"}]},{"line":23,"amount":"0","num_win":1,"value":"9","list":[{"row":1,"col":0,"value":"9"}]},{"line":24,"amount":"0","num_win":2,"value":"10","list":[{"row":2,"col":0,"value":"10"},{"row":2,"col":1,"value":"10"}]},{"line":25,"amount":"0","num_win":1,"value":"9","list":[{"row":1,"col":0,"value":"9"}]},{"line":26,"amount":"0","num_win":2,"value":"10","list":[{"row":2,"col":0,"value":"10"},{"row":2,"col":1,"value":"10"}]},{"line":27,"amount":"0","num_win":1,"value":"11","list":[{"row":0,"col":0,"value":"11"}]},{"line":28,"amount":"0","num_win":1,"value":"11","list":[{"row":3,"col":0,"value":"11"}]},{"line":29,"amount":"0","num_win":2,"value":"10","list":[{"row":2,"col":0,"value":"10"},{"row":2,"col":1,"value":"10"}]},{"line":30,"amount":"0","num_win":1,"value":"9","list":[{"row":1,"col":0,"value":"9"}]},{"line":31,"amount":"0","num_win":1,"value":"11","list":[{"row":0,"col":0,"value":"11"}]},{"line":32,"amount":"0","num_win":1,"value":"11","list":[{"row":3,"col":0,"value":"11"}]},{"line":33,"amount":"0","num_win":2,"value":"10","list":[{"row":2,"col":0,"value":"10"},{"row":0,"col":1,"value":"10"}]},{"line":34,"amount":"0","num_win":1,"value":"9","list":[{"row":1,"col":0,"value":"9"}]},{"line":35,"amount":"0","num_win":1,"value":"9","list":[{"row":1,"col":0,"value":"9"}]},{"line":36,"amount":"0","num_win":1,"value":"10","list":[{"row":2,"col":0,"value":"10"}]},{"line":37,"amount":"0","num_win":1,"value":"9","list":[{"row":1,"col":0,"value":"9"}]},{"line":38,"amount":"0","num_win":1,"value":"10","list":[{"row":2,"col":0,"value":"10"}]},{"line":39,"amount":"0","num_win":1,"value":"11","list":[{"row":0,"col":0,"value":"11"}]},{"line":40,"amount":"0","num_win":1,"value":"11","list":[{"row":3,"col":0,"value":"11"}]},{"line":41,"amount":"0","num_win":2,"value":"10","list":[{"row":2,"col":0,"value":"10"},{"row":0,"col":1,"value":"10"}]},{"line":42,"amount":"0","num_win":1,"value":"9","list":[{"row":1,"col":0,"value":"9"}]},{"line":43,"amount":"0","num_win":1,"value":"11","list":[{"row":0,"col":0,"value":"11"}]},{"line":44,"amount":"0","num_win":1,"value":"11","list":[{"row":3,"col":0,"value":"11"}]},{"line":45,"amount":"0","num_win":2,"value":"10","list":[{"row":2,"col":0,"value":"10"},{"row":0,"col":1,"value":"10"}]},{"line":46,"amount":"0","num_win":1,"value":"9","list":[{"row":1,"col":0,"value":"9"}]},{"line":47,"amount":"0","num_win":1,"value":"11","list":[{"row":0,"col":0,"value":"11"}]},{"line":48,"amount":"0","num_win":1,"value":"11","list":[{"row":3,"col":0,"value":"11"}]},{"line":49,"amount":"0","num_win":1,"value":"11","list":[{"row":0,"col":0,"value":"11"}]},{"line":50,"amount":"0","num_win":1,"value":"11","list":[{"row":3,"col":0,"value":"11"}]}],"money":998.23,"tot_win":100.35,"bonus":0,"cash":400}';
	// 	main.procSpinData(testData7, start_time);
	// }, 200);
	// return;

		var _oAjaxData = {};
		// _oAjaxData.gameengine = 2;
		_oAjaxData.a = 'spin';
		_oAjaxData.bet = parseFloat(this.game_toolbar.text_Bet.text).toString();
		_oAjaxData.total_bet = parseFloat(this.game_toolbar.text_TotalBet.text).toString();
		_oAjaxData.lines = parseInt(this.game_toolbar.text_line.text).toString();
		_oAjaxData.gameid = GAME_CONF.GAME_INDEX;
		// http://95.85.17.19/work/action.php?gameengine=1&a=spin&bet=4&total_bet=200&lines=50&gameid=2
		$.ajax({
			type: 'POST',
			url: "http://95.85.17.19/work/action.php",
			data: _oAjaxData,
			headers: { "cache-control": "no-cache" },
			cache: false,
			timeout : 10000,
			dataType : "text",
			beforeSend:function() {
				console.log(this.url +'?' + this.data);
			},
			success: function(data, e, h) {
				// s_oLoading.hide();
				// var oRetData = getUrlVars(data);
				console.log(data);
				if(data[0] != '{')
				{
				 	main.result.success = false;
					main.result.winVal = 0;
					main.result.pattern = generateLosingPattern();
					var elaspe = new Date() - start_time;
					main.spinView.onSpinResult(main.result, elaspe);
					main.game_toolbar.setButtons(GAME_STAUS.SPINNING);
					console.log('data error');
				}
				else {
					main.procSpinData(data, start_time);
				}
			},

			error:function(e) {
				// failed request; give feedback to user
				// s_oLoading.hide();
				// s_oGame.generateLosingPattern();
			 	main.result.success = false;
				main.result.winVal = 0;
				main.result.pattern = generateLosingPattern();
				var elaspe = new Date() - start_time;
				main.spinView.onSpinResult(main.result, elaspe);
				main.game_toolbar.setButtons(GAME_STAUS.SPINNING);
				console.log('error');
			}
		});
	}

	this.setPatternData = function(data) {
		main.result.pattern = [];
		for(var i = 0; i < data.length; i++) {
			main.result.pattern[i] = [];
			var symbols = data[i];
			for(var k = 0; k < symbols.length; k++) {
				var symbol = symbols[k];
				if(symbol == 'w')
					symbol = GAME_CONF.SYMBOL_WILD;
				else if(symbol == 'b')
					symbol = GAME_CONF.SYMBOL_BONUS;
				else if(symbol == 's')
					symbol = GAME_CONF.SYMBOL_SCATTER;
				else if(symbol == 'j')
					symbol = GAME_CONF.SYMBOL_SCATTER;
				main.result.pattern[i][k] = symbol;
			}
		}
	}

	this.procSpinData = function(data, start_time) {
		oRetData = JSON.parse(data);
		console.log(oRetData);
		if ( oRetData.res === "true" ) {
		 	if(oRetData.win === "true") {
		 		main.result.success = true;
				main.result.winLines = oRetData.win_lines;
		 		main.result.winVal = parseFloat(oRetData.tot_win);
		 		if(oRetData.free_spin > 0 && g_autoGameState <= 0)
		 			main.result.freespin = parseInt(oRetData.free_spin);
		 		//testing
		 		main.result.freespin = false;
		 		// if(g_autoGameState <= 0) //testing
		 		// 	main.result.freespin = 7;
		 		if(oRetData.pattern) {
			 		// main.result.pattern = oRetData.pattern;
			 		main.setPatternData(oRetData.pattern);
		 		}
		 	}
		 	else {
		 		main.result.success = false;
		 		if(oRetData.pattern) {
			 		// main.result.pattern = oRetData.pattern;
			 		this.setPatternData(oRetData.pattern);
		 		}
			 	else
			 		main.result.pattern = generateLosingPattern();
			 	main.result.winVal = 0;
		 	}
		 	main.result.money = oRetData.money;
			if( parseInt(oRetData.bonus) > 0 && g_autoGameState <= 0 ) {
				main.result.bonus = oRetData.bonus - 1;
				main.result.bonusIndex = parseInt(oRetData.bonusIndex - 1);
			// 	main.result.bonusIndex = parseInt(oRetData.bonus_items);
			// 	main.result.bonusPrice = parseInt(oRetData.bonus_prize);

			// 	//temp
			// 	if(main.game.rnd.integerInRange(0, 3) == 2)
			// 		main.result.freespin = true;
			// 	else
			// 		main.result.freespin = false;
			// }
			// else {
			}
		}
		else {
		 	main.result.success = false;
			main.result.winVal = 0;
			main.result.pattern = generateLosingPattern();
		}
		var elaspe = new Date() - start_time;
		main.spinView.onSpinResult(main.result, elaspe);
		main.game_toolbar.setButtons(GAME_STAUS.SPINNING);
	}

	this.startAutoSpin = function(num) {
		g_autoGameState = num;

		game_status = GAME_STAUS.INIT;
		main.game_toolbar.setButtons(game_status);
		main.startSpinning();
	}

	this.onBtnStopAuto = function() {
		g_autoGameState = 0;
		this.stopGame();
	}

	this.init(game);
}

