/*****************************************************
	Description 	: A Group of every values and buttons for betting.
	Created 		: 2016/08/12
******************************************************/

var agSetGr = function() {

	var main		= this;

	var balnceTxt 	= null;
	var lineTxt		= null;
	var betTxt		= null;
	var totalbetTxt	= null;
	var winTxt		= null;

	//Init every values for betting
	var aryBetVals 					= g_aryBetVals;
	var vBalance					= 0;
	var vLines				 		= AG_MAX_LINES;
	var vBet				 		= aryBetVals[2];
	var vTotalbet 					= vLines * vBet * 1;
	var vWin				 		= 0;

	//Set Fonts
	var lblSty 		= { font: "22px marker", fill: '#5d1d00', boundsAlignH: "center", boundsAlignV: "middle", stroke: "#5d1d00", strokeThickness: 2 };
	var txtSty 		= { font: "bold 18px Arial", fill: '#ffd200', boundsAlignH: "center", boundsAlignV: "middle", stroke: "#3b1300", strokeThickness: 3 };
	var btnSty		= { font: "bold 18px Arial", fill: '#ffd200', boundsAlignH: "center", boundsAlignV: "middle", stroke: "#3b1300", strokeThickness: 3};
	var btnDisSty	= { font: "bold 18px Arial", fill: '#787878', boundsAlignH: "center", boundsAlignV: "middle", stroke: "#000000", strokeThickness: 3};

	var gr = game.add.group();
	gr.x = 618;
	gr.y = 836;

	var txtY = 2;
	var txtX = 0;
	var txtH = 22;

	balnceTxt = game.make.text(0, 0, "5000", txtSty);
    balnceTxt.text = vBalance;
    balnceTxt.setTextBounds(txtX, txtY, 120, txtH);
    gr.add(balnceTxt);

    lineTxt = game.make.text(0, 0, "5", txtSty);
    lineTxt.text = vLines;
    lineTxt.setTextBounds(262, txtY, 42, txtH);
    gr.add(lineTxt);

    betTxt = game.make.text(0, 0, "5", txtSty);
    betTxt.text = vBet;
    betTxt.setTextBounds(330, txtY, 50, txtH);
    gr.add(betTxt);

    totalbetTxt = game.make.text(0, 0, "500", txtSty);
    totalbetTxt.text = vTotalbet;
    totalbetTxt.setTextBounds(420, txtY, 96, txtH);
    gr.add(totalbetTxt);

    winTxt = game.make.text(0, 0, "500", txtSty);
    winTxt.text = vWin;
    winTxt.setTextBounds(568, txtY, 112, txtH);
    gr.add(winTxt);

    var ptBtn = game.make.button(140, -10, 'agPayBtn', onClickedPTBtn, this);
    setFocusFunctions(ptBtn);

    var btnY = 50;
    var lineDeBtn = game.make.button(254, btnY, 'agPrevBtn', onClickedLineDeBtn, this);
    setFocusFunctions(lineDeBtn);
    var lineInBtn = game.make.button(278, btnY, 'agNextBtn', onClickedLineInBtn, this);
    setFocusFunctions(lineInBtn);

    var betDeBtn = game.make.button(326, btnY, 'agPrevBtn', onClickedBetDeBtn, this);
    setFocusFunctions(betDeBtn);
    var betInBtn = game.make.button(350, btnY, 'agNextBtn', onClickedBetInBtn, this);
    setFocusFunctions(betInBtn);

    var maxbetBtn = game.make.button(398, 36, 'agMaxBtn', onClickedMaxbetBtn, this);
    setFocusFunctions(maxbetBtn);

    var autoBtn = game.make.button(538, 37, 'agAutoBtn', onClickedAutoBtn, this);
    setFocusFunctions(autoBtn);

    var spinBtn = game.make.button(600, 47, 'agSpinBtn', onClickedSpinBtn, this);
    setFocusFunctions(spinBtn);

    var spinBtnLbl = game.make.text(0, 0, "Spin!", lblSty);
    spinBtnLbl.setTextBounds(594, 49, 112, 40);
    gr.add(spinBtnLbl);
    

	function setFocusFunctions(button) {
		button.inputEnabled = true;
		button.events.onInputOver.add(focusOver);
		button.events.onInputOut.add(focusOut);
		gr.add(button);
	}

	function onClickedPTBtn(button) {
		agActor.clearGroups();
		agPTView.showPaytable();
	}

	function onClickedLineDeBtn(button) {
		agActor.clearGroups();
		vLines--;
		if(vLines < 1)
			vLines = AG_MAX_LINES;
		
		lineTxt.text = vLines;
		agLineView.drawLines(vLines);
	}

	function onClickedLineInBtn(button) {
		agActor.clearGroups();
		vLines++;
		if(vLines > AG_MAX_LINES)
			vLines = 1;
	
		lineTxt.text = vLines;
		agLineView.drawLines(vLines);
	}

	function getBetIndex(betvalue) {
		for(var i = 0; i < aryBetVals.length; i++) {
			if((betvalue * 1 ) == (aryBetVals[i] * 1)) {
				return i;
			}
		}

		return 0;
	}

	function onClickedBetInBtn(button) {

		var betIndex = getBetIndex(vBet);
		betIndex++;

		if(betIndex >= aryBetVals.length) {
			betIndex = 0;
		}

		vBet = aryBetVals[betIndex];
		betTxt.text = vBet;
		setTotalValue();
	}

	function onClickedBetDeBtn(button) {
		var betIndex = getBetIndex(vBet);
		betIndex--;

		if(betIndex < 0) {
			betIndex = aryBetVals.length - 1;
		}

		vBet = aryBetVals[betIndex];
		betTxt.text = vBet;
		setTotalValue();
	}

	function onClickedMaxbetBtn(button) {
		vLines = AG_MAX_LINES;
		lineTxt.text = vLines;
		setTotalValue();
		agActor.startSpinning();
	}

	function onClickedAutoBtn(button) {
		agActor.clearGroups();
		agAutoView.showMenu();
	}

	function onClickedSpinBtn(button) {
		if(agIsAuto) {
			agSpinCounter = 0;
		} else {
			agActor.startSpinning();
		}
	}

	function setTotalValue() {
		vTotalbet = vLines * vBet;
		totalbetTxt.text = vTotalbet;
	}

	function disableButton(button) {
		button.inputEnabled = false;
		button.frame = 2;
	}

	function enableButton(button) {
		button.inputEnabled = true;
		button.frame = 0;
	}
	
    main.getBalanceValue = function() {
    	return vBalance;
    }
    main.setBalanceValue = function(v) {
    	vBalance = v;
    	balnceTxt.text = vBalance;
    }

    main.getLinesValue = function() {
    	return vLines;
    }
    main.setLinesValue = function(v) {
    	vLines = v;
    	lineTxt.text = vLines;
    }

    main.getBetValue = function() {
    	return vBet;
    }
    main.setBetValue = function(v) {
    	vBet = v;
    	betTxt.text = vBet;
    }

    main.getTotalBetValue = function() {
    	return vTotalbet;
    }
    main.setTotalBetValue = function(v) {
    	vTotalbet = v;
    	totalbetTxt.text = vTotalbet;
    }

    main.getWinValue = function() {
    	return vWin;
    }
    main.setWinValue = function(v) {
    	vWin = v;
    	winTxt.text = vWin;
    }

    main.setSpinLbl = function(v) {
    	spinBtnLbl.text = v;
    }

    main.disableAllButtons = function() {
    	disableButton(lineInBtn);
    	disableButton(lineDeBtn);
    	disableButton(betDeBtn);
    	disableButton(betInBtn);
    	disableButton(maxbetBtn);
    	disableButton(ptBtn);
    	disableButton(autoBtn);

    	if(!agIsAuto) {
    		disableButton(spinBtn);
    	}
    }

    main.enableAllButtons = function() {
    	enableButton(lineInBtn);
    	enableButton(lineDeBtn);
    	enableButton(betDeBtn);
    	enableButton(betInBtn);
    	enableButton(maxbetBtn);
    	enableButton(ptBtn);
    	enableButton(autoBtn);
    	enableButton(spinBtn);
    }	
}