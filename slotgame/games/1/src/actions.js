/*****************************************************
	Description 	: javascript Action functions 
	Created 		: 2016/07/18
******************************************************/

function paytableClick() {
	payView.showView();
}

function increaseLineClick(button) {
	linesValue++;
	if(linesValue > 30)
		linesValue = 1;
	
	lineDraw.drawLinewithCount(linesValue);
}

function decreaseLineClick(button) {
	linesValue--;
	if(linesValue < 1)
		linesValue = 30;
	
	lineDraw.drawLinewithCount(linesValue);
}

function increaseBetClick(button) {

	switch(betValue) {
		case 1:
			betValue = 2;
			break;
		case 2:
			betValue = 5;
			break;
		case 5:
			betValue = 10;
			break;
		case 10:
			betValue = 25;
			break;

		default:
			betValue += 25;
			break;
	}

	if(betValue > 100) 
		betValue = 1;

	betValueText.text = betValue;
	setTotalValue();
}

function decreaseBetClick(button) {
	switch(betValue) {
		case 1:
			betValue = 100;
			break;
		case 2:
			betValue = 1;
			break;
		case 5:
			betValue = 2;
			break;
		case 10:
			betValue = 5;
			break;

		case 25:
			betValue = 10;
			break;

		default:
			betValue -= 25;
			break;
	}

	betValueText.text = betValue;
	setTotalValue();
}

function setTotalValue() {
	totalValue = linesValue * betValue;
	totalValueText.text = totalValue;
}

function maxlinesBtnClick(button) {
	linesValue = 30;
	linesValueText.text = linesValue;
	setTotalValue();
	startSpinning();
}

function spinBtnClick(button) {
	if(isAuto) {
		spinCounter = 0;
	} else {
		startSpinning();
		startedTime = new Date();
	}
}

function autoBtnClick(button) {
	autoMenu.showMenu();
}

function drawSeperateImage() {
	if(seperateImg) {
		delete seperateImg;
	}

	var viewX = 620;
	var viewY = 387;
	seperateImg = game.add.image(viewX, viewY, 'seperate_bg');
}

function getUrlVars( urlVars ) {
	urlVars = urlVars.trim();
	var oFinalData = new Array();
	var hashes = urlVars.split('&');
	for (var i = 0; i < hashes.length; i++) {
		var hash = hashes[i].split('=');
		oFinalData[hash[0]] = hash[1];
	}
	return oFinalData;
}


function startSpinning() {

	if(balanceValue < totalValue) {
		return;
	}
	
	if(isAuto) {
		spinCounter--;
		spinBtnText.text = spinCounter;
	}
	

	balanceValue -= totalValue;
	winValue = 0;
	setBalanceText();

	responseObj = null;
	disableButtons();

	_oAjaxData = {};
    _oAjaxData.a = "spin";
    _oAjaxData.bet = betValue;
    _oAjaxData.total_bet = totalValue;
    _oAjaxData.lines = linesValue;
    _oAjaxData.hold = [false, false, false, false, false];
            console.log(_oAjaxData);
	console.log("a=spin bet="+_oAjaxData.bet + " lines = " + _oAjaxData.lines +  " total_bet = " + _oAjaxData.total_bet);
       
	$.ajax({
        type: 'POST',
        url: "./php/action.php",
        data: _oAjaxData,
        headers: { "cache-control": "no-cache" },
        cache: false,
        timeout : 15000,
        dataType : "text",
        beforeSend: function(){
            console.log("dfas");
            // this is where we append a loading image
            // s_oLoading.show();
        },

        success: function(data){
            // s_oLoading.hide();
            console.log(data);
            if(data.length == 0) {
            	console.log("Get Empty Data");
            	data = noWinArr[game.rnd.between(0, 4)];
            }
            responseObj = getUrlVars(data);
            
            // _iMoney = parseFloat(oRetData.money);
            // _iCurState = GAME_STATE_SPINNING;
        },

        error:function(){
            console.log("Connection Error");
            console.log("Get Empty Data");
            data = noWinArr[game.rnd.between(0, 4)];
            responseObj = getUrlVars(data);
            // failed request; give feedback to user
            
        }
    });
	// responseObj = JSON.parse(responseStr);

	lineDraw.hideLines();
	autoMenu.hideMenu();
	animGroup.removeAll();
	spinning = true;
	
	var s = 2;
	reelFst.startSpin(++s);
	reelSnd.startSpin(++s);
	reelThr.startSpin(++s);
	reelFur.startSpin(++s);
	reelFiv.startSpin(++s);
}

var loopCounter = 0;
var winCounter = 0;
var animGroup = null;
var winlineGroup = null;
var paylineImg = null;
var winlinetimer = null;
var showAll = false;

function collectionAllWin() {
	var rxp			= 612;
	var isDefined = false;

	animGroup.removeAll();
	winlineGroup.removeAll();

	showAll = true;
	var winArr = new Array();

	for(var l = 0; l < 5; l++) {
		winArr.length = 0;
		if(responseObj && responseObj.win_lines) {
			var winlineArr = JSON.parse(responseObj.win_lines);
			for(var i = 0; i < winlineArr.length; i++) {
				if(winlineArr[i].line > 30)
					continue;

				var linelist = winlineArr[i].list;
				for(var j = 0; j < linelist.length; j++) {
					var line = linelist[j];
					if(line.col == l) {
						var found = false;
						for(var k = 0; k < winArr.length; k++) {
							if(line.row == winArr[k]) {
								found = true;
								break;
							}
						}

						if(!found) {
							winArr.push(line.row);
						}
					}
				}
			}
		}

		if(winArr.length != 0) {
			for(var i = 0; i < winArr.length; i++) {
				if(responseObj && responseObj.pattern) {
					var winlineArr = JSON.parse(responseObj.pattern); 
					var animIndex = winlineArr[winArr[i]][l] - 1;

					if(isAvailable(animIndex)) {
						var anim = animGroup.create(rxp + IMAGE_HEIGHT * l, START_Y + IMAGE_HEIGHT * winArr[i], spinAnimArr[animIndex]);
						anim.smoothed = false;
						var animate = anim.animations.add('ok' + winArr[i] + l);
				    	animate.play(20, true);
				    }

			    	var borderAnim = animGroup.create(rxp + IMAGE_HEIGHT * l, START_Y + IMAGE_HEIGHT * winArr[i], 'win_frame');
					borderAnim.smoothed = false;
			    	var borderAnimate = borderAnim.animations.add('Border');
			    	borderAnimate.play(10, true);
				}
			}
		}
	}

	var viewY = 386;
	for(var i = 1; i < 5; i++) {
		animGroup.create(rxp + (i * IMAGE_HEIGHT) - 13, viewY, 'seperate');
	}

	loopCounter = 0;
	drawWinLines();
}

function isAvailable(aIndex) {
	for(var i = 0; i < noAnimationArr.length; i++) {
		if(aIndex == noAnimationArr[i]) {
			return false;
		}
	}

	return true;
}

function drawWinLines() {
	var viewX = 612;
	var viewY = 386;

	if(responseObj && responseObj.win == 'true') {
		var winlineArr = JSON.parse(responseObj.win_lines);
		for(var i = 0; i < winlineArr.length; i++) {
			if(winlineArr[i].line > 30)
					continue;

			var paylineIndex = winlineArr[i].line - 1;
			winlineGroup.create(viewX, viewY, payLineArr[paylineIndex]);
		}

		game.time.events.add(300, removeWinLines, this);
	} else {
		if(isAuto) {
			if(spinCounter > 0) {
				startSpinning();
			} else {
				spinBtnText.text = 'SPIN!';
				enableButtons();
				isAuto = false;
			}
		} else {
			enableButtons();
		}
	}
}

function removeWinLines() {
	winlineGroup.removeAll();

	loopCounter++;
	if(loopCounter < 3) {
		game.time.events.add(300, drawWinLines, this);
	} else {
		loopCounter = 0;
		if(isAuto) {

			if(responseObj && responseObj.bonus == 1) {
				game.state.start("Bonus");
				return;
			}

			if(spinCounter > 0) {
				startSpinning();
			} else {
				spinBtnText.text = 'SPIN!';
				enableButtons();
				isAuto = false;
			}
		} else {
			enableButtons();
			collectionColWin();
			/*game.time.events.add(10000, removeWinColLines, this);*/
		}
	}

}

function removeWinColLines() {
	animGroup.removeAll();
}

function collectionColWin() {

	if(responseObj && responseObj.bonus == 1) {
		game.state.start("Bonus");
		return;
	}

	var rxp			= 612;
	var isDefined = false;
	var winlineArr = null;

	if(responseObj && responseObj.win_lines) {
		winlineArr = JSON.parse(responseObj.win_lines);
	}

	while(winlineArr[winCounter].line > 30) {
		winCounter++;
		
		if(winCounter >= winlineArr.length) {
			winCounter = 0;
		}	
	}

	animGroup.removeAll();

	for(var l = 0; l < 5; l++) {
		var winArr = new Array();
		if(winCounter < winlineArr.length) {
			var linelist = winlineArr[winCounter].list;
			for(var j = 0; j < linelist.length; j++) {
				var line = linelist[j];
				if(line.col == l) {
					var found = false;
					for(var k = 0; k < winArr.length; k++) {
						if(line.row == winArr[k]) {
							found = true;
							break;
						}
					}

					if(!found) {
						winArr.push(line.row);
					}
				}
			}			
		}

		if(winArr.length != 0) {
			
			for(var i = 0; i < winArr.length; i++) {
				if(responseObj && responseObj.pattern) {
					var patternArr = JSON.parse(responseObj.pattern);
					var animIndex = patternArr[winArr[i]][l] - 1;

					if(isAvailable(animIndex)) {
						var anim = animGroup.create(rxp + IMAGE_HEIGHT * l, START_Y + IMAGE_HEIGHT * winArr[i], spinAnimArr[animIndex]);
						anim.smoothed = false;
			    		var animate = anim.animations.add();
			    		animate.play(20, true);
					}
					
			    	var borderAnim = animGroup.create(rxp + IMAGE_HEIGHT * l, START_Y + IMAGE_HEIGHT * winArr[i], 'win_frame');
					borderAnim.smoothed = false;
					var borderAnimate = borderAnim.animations.add('Border');
					if(!isDefined) {
			    		isDefined = true;
			    		loopCounter = 0;
				    	// anim.onStart.add(animationStarted, this);
				    	borderAnimate.onLoop.add(animationLooped, this);
				    	// anim.onComplete.add(animationStopped, this);
			    	}
			    	borderAnimate.play(10, true);
				}
				
			}
		}
	}

	var viewY = 386;
	for(var i = 1; i < 5; i++) {
		animGroup.create(rxp + (i * IMAGE_HEIGHT) - 13, viewY, 'seperate');
	}

	var viewX = 612;
	var viewY = 386;
	var winlineArr = JSON.parse(responseObj.win_lines);
	var paylineIndex = winlineArr[winCounter].line - 1;
	animGroup.create(viewX, viewY, payLineArr[paylineIndex]);

	winCounter++;
	if(winCounter >= winlineArr.length) {
		winCounter = 0;
	}
}

function onCompleteSpin() {
	winCounter = 0;
	updateValues();
	collectionAllWin();
}

function animationLooped() {
	
	loopCounter++;
	if(loopCounter >= 1) {
		loopCounter = 0;
		collectionColWin();
	}
}

function setBalanceText() {
	balanceValueText.text = balanceValue;
	winValueText.text = winValue;
}

function updateValues() {
	if(responseObj && responseObj.win == 'true') {
		balanceValue = balanceValue * 1 + responseObj.money * 1;
		winValue = responseObj.tot_win;
	} else {
		winValue = 0;
	}

	setBalanceText();
}

function disableButtons() {

	for(var i = 0; i < btnArr.length; i++) {
		var btn = btnArr[i];
		btn.frame = 2;
		btn.inputEnabled = false;
	}
	
	if(!isAuto) {
		spinBtn.frame = 2;
		spinBtn.inputEnabled = false;
		spinBtnText.setStyle(btnDisStyle);
	} 
}

function enableButtons() {
	for(var i = 0; i < btnArr.length; i++) {
		var btn = btnArr[i];
		btn.frame = 0;
		btn.inputEnabled = true;
	}

	spinBtn.frame = 0;
	spinBtn.inputEnabled = true;
	spinBtnText.setStyle(btnStyle);
}

function autoCountOver(item) {
	item.frame = 1;
}

function autoCountOut(item) {
	item.frame = 0;
}

function startTimer() {

	timer = game.time.create(false);
	timer.loop(3000, updateTicks, this);
	spinning = true;
	timer.start();
}