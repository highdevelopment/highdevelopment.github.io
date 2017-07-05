/*****************************************************
	Description 	: On Creating Game
	Created 		: 2016/07/18
******************************************************/

var linebtnImgArr = [	
					'betline_button004',
					'betline_button028',
					'betline_button002',
					'betline_button024',
					'betline_button020',
					'betline_button016',
					'betline_button010',
					'betline_button001',
					'betline_button011',
					'betline_button017',
					'betline_button013',
					'betline_button021',
					'betline_button003',
					'betline_button029',
					'betline_button005',
					'betline_button014',
					'betline_button026',
					'betline_button018',
					'betline_button012',
					'betline_button009',
					'betline_button022',
					'betline_button006',
					'betline_button030',
					'betline_button007',
					'betline_button023',
					'betline_button008',
					'betline_button019',
					'betline_button025',
					'betline_button027',
					'betline_button015' 
];

function gameCreate() {

	//Set Fonts
	lblStyle 		= { font: "bold 16px Arial", fill: '#542812', boundsAlignH: "center", boundsAlignV: "middle"/*, stroke: "#feef00", strokeThickness: 1*/ };
	txtStyle 		= { font: "bold 16px Arial", fill: '#ffd200', boundsAlignH: "center", boundsAlignV: "middle", stroke: "#3b1300", strokeThickness: 3 };
	btnStyle		= { font: "bold 18px Arial", fill: '#ffd200', boundsAlignH: "center", boundsAlignV: "middle", stroke: "#3b1300", strokeThickness: 3};
	btnDisStyle		= { font: "bold 18px Arial", fill: '#787878', boundsAlignH: "center", boundsAlignV: "middle", stroke: "#000000", strokeThickness: 3};

	//Set Backgroud
	var bg 			= game.add.image(0, 0, 'background');

	//init Reels
	var xp 			= 612;
	var rxp			= xp;

	reelFst 		= new reelGroup(rxp, 0);
	rxp				= xp + IMAGE_HEIGHT;
	reelSnd			= new reelGroup(rxp, 1);
	rxp				= xp + IMAGE_HEIGHT * 2;
	reelThr			= new reelGroup(rxp, 2);
	rxp				= xp + IMAGE_HEIGHT * 3;
	reelFur			= new reelGroup(rxp, 3);
	rxp 			= xp + IMAGE_HEIGHT * 4;
	reelFiv			= new reelGroup(rxp, 4);

	var topbg = game.add.image(0, 0, 'topBg');
	var bottombg = game.add.image(0, 806, 'bottomBg');
	game.add.image(680, 315, 'title');
	btnArr.length = 0;

	var viewX = 612;
	var viewY = 386;
	for(var i = 1; i < 5; i++) {
		game.add.image(viewX + (i * IMAGE_HEIGHT) - 13, viewY, 'seperate');
	}

	animGroup = game.add.group();
	for(var i = 1; i < 5; i++) {
		animGroup.create(viewX + (i * IMAGE_HEIGHT) - 13, viewY, 'seperate');
	}

	winlineGroup = game.add.group();
	winlineGroup.create(viewX + (i * IMAGE_HEIGHT) - 13, viewY, 'seperate');
	winlineGroup.removeAll();

	//LINE
	lineDraw = new betLineView();
	lineDraw.initView();

	/***
	* Set Bet Information
	***/
	var lineBX = 580;
	var lineBY = 360;
	var textBarY = 830;
	var textBarW = 120;
	var textBarH = 26;
	var increaseBtnSize = 24;
	lineBX += 2;

	//balance
	var balanceBar = game.add.graphics();
    balanceBar.beginFill(0x923b02, 0.0);
    balanceBar.drawRect(lineBX, textBarY, textBarW, textBarH);

    balanceValueText = game.add.text(0, 0, "234", txtStyle);
    balanceValueText.text = balanceValue;
    balanceValueText.setTextBounds(lineBX, textBarY+2, textBarW + 10, textBarH);

    var balanceText = game.add.text(0, 0, "", lblStyle);
    //balanceText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    balanceText.setTextBounds(lineBX, textBarY + textBarH + 2, textBarW, textBarH);

    //Pay Table
    var payX = lineBX + balanceBar.width + 14;
    paytable = game.add.button(payX, textBarY, 'paytable', paytableClick, this);
    paytable.events.onInputOver.add(autoCountOver);
	paytable.events.onInputOut.add(autoCountOut);
	btnArr.push(paytable);
    // paytable.scale.setTo(0.75, 0.75);
	
    /*var payText = game.add.text(0, 0, "PAY TABLE", lblStyle);
    payText.setTextBounds(payX + 3, textBarY + paytable.height, paytable.width - 3, textBarH);*/

    //lINES
    var lineX = payX + paytable.width + 16;
    var lineBar = game.add.graphics();
    lineBar.beginFill(0x923b02, 0.0);
    lineBar.drawRect(lineX, textBarY, textBarW-28, textBarH);

    linesValueText = game.add.text(0, 0, "12", txtStyle);
    linesValueText.text = linesValue;
    linesValueText.setTextBounds(lineX, textBarY+2, textBarW-28, textBarH);

    lineX -= 4;
    lineDecreaseBtn = game.add.button(lineX, textBarY + textBarH + 8, 'decrease', decreaseLineClick, this);
    lineDecreaseBtn.name = 'decrease';
    lineDecreaseBtn.events.onInputOver.add(autoCountOver);
	lineDecreaseBtn.events.onInputOut.add(autoCountOut);
	btnArr.push(lineDecreaseBtn);
	// lineDecreaseBtn.width = increaseBtnSize;
	// lineDecreaseBtn.height = increaseBtnSize;

	lineX = lineX + lineDecreaseBtn.width - 2;
	var lineCenterImg = game.add.image(lineX, textBarY + textBarH + 2, 'center');
	// lineCenterImg.scale.setTo(0.7, 0.7);

	lineX = lineX + lineCenterImg.width - 2;
	lineIncreaseBtn = game.add.button(lineX, textBarY + textBarH + 8, 'increase', increaseLineClick, this);
    lineIncreaseBtn.name = 'increase';
    lineIncreaseBtn.events.onInputOver.add(autoCountOver);
	lineIncreaseBtn.events.onInputOut.add(autoCountOut);
	btnArr.push(lineIncreaseBtn);
	// lineIncreaseBtn.width = increaseBtnSize;
	// lineIncreaseBtn.height = increaseBtnSize;

	var lineText = game.add.text(0, 0, "", lblStyle);
    lineText.setTextBounds(payX + paytable.width + 6, lineCenterImg.y + lineCenterImg.height +2, textBarW-20, textBarH);

	//Bet
	var betX = lineX + increaseBtnSize + 8;
	betValueText = game.add.text(0, 0, "2", txtStyle);
	betValueText.text = betValue;
    betValueText.setTextBounds(betX, textBarY+2, textBarW - 22, textBarH);

    betDecreaseBtn = game.add.button(betX, textBarY + textBarH + 8, 'decrease', decreaseBetClick, this);
    betDecreaseBtn.name = 'decrease';
    betDecreaseBtn.events.onInputOver.add(autoCountOver);
	betDecreaseBtn.events.onInputOut.add(autoCountOut);
	btnArr.push(betDecreaseBtn);
	// betDecreaseBtn.width = increaseBtnSize;
	// betDecreaseBtn.height = increaseBtnSize;

	var betCenterImg = game.add.image(betDecreaseBtn.x + betDecreaseBtn.width - 2, textBarY + textBarH + 2, 'center');
	// betCenterImg.scale.setTo(0.7, 0.7);

	betIncreaseBtn = game.add.button(betCenterImg.x + betCenterImg.width - 2, textBarY + textBarH + 8, 'increase', increaseBetClick, this);
    betIncreaseBtn.name = 'increase';
    betIncreaseBtn.events.onInputOver.add(autoCountOver);
	betIncreaseBtn.events.onInputOut.add(autoCountOut);
	btnArr.push(betIncreaseBtn);
	// betIncreaseBtn.width = increaseBtnSize;
	// betIncreaseBtn.height = increaseBtnSize;

	var betText = game.add.text(0, 0, "", lblStyle);
    betText.setTextBounds(betX, betCenterImg.y + betCenterImg.height +2, textBarW - 20, textBarH);

	//Total Bet
	var tbetX = betX + textBarW - 20 + 14;
	totalValueText = game.add.text(0, 0, "2", txtStyle);
	totalValueText.text = totalValue;
    totalValueText.setTextBounds(tbetX, textBarY+2, textBarW - 14, textBarH);

    var tbetText = game.add.text(0, 0, "", lblStyle);
    tbetText.setTextBounds(tbetX, textBarY + textBarH, textBarW - 14, textBarH);

    totalBetBtn = game.add.button(tbetX - 16, textBarY + textBarH + textBarH - 4, 'maxlines', maxlinesBtnClick, this);
    totalBetBtn.events.onInputOver.add(autoCountOver);
	totalBetBtn.events.onInputOut.add(autoCountOut);
	btnArr.push(totalBetBtn);
    // totalBetBtn.width = 96;
    // totalBetBtn.height = 30;

    //Win
    var winX = tbetX + totalBetBtn.width + 10;
	winValueText = game.add.text(0, 0, "0", txtStyle);
	winValueText.text = winValue;
    winValueText.setTextBounds(winX, textBarY+2, textBarW - 22, textBarH);

    var winText = game.add.text(0, 0, "", lblStyle);
    winText.setTextBounds(winX, textBarY + textBarH, textBarW - 14, textBarH);

    autoBtn = game.add.button(winX - 20, textBarY + textBarH + textBarH - 4, 'auto', autoBtnClick, this);
    autoBtn.events.onInputOver.add(autoCountOver);
	autoBtn.events.onInputOut.add(autoCountOut);
	btnArr.push(autoBtn);
    // autoBtn.width = 48;
    // autoBtn.height = 30;
    spinBtn = game.add.button(winX - 20 + autoBtn.width - 8, textBarY + textBarH + textBarH - 4, 'spin', spinBtnClick, this);
    spinBtn.events.onInputOver.add(autoCountOver);
	spinBtn.events.onInputOut.add(autoCountOut);
	// btnArr.push(spinBtn);
	spinBtnText = game.add.text(0, 0, 'SPIN!', btnStyle);
	spinBtnText.text = 'SPIN!';
    spinBtnText.setTextBounds(winX - 20 + autoBtn.width - 8, textBarY + textBarH + textBarH - 4, 77, 40);
    spinBtnText.stroke = '#3b1300';
    spinBtnText.strokeThickness = 5;

    //Create PayTable
    payView = new payTable();
    payView.createView();

    //create Auto Spin Menu
    autoMenu = new popupMenu();
    autoMenu.createMenu();

    /*
    //Testing Button
    var bonusBtn = game.add.button(300, 300, 'spin', bonusBtnClick, this);
    bonusBtn.events.onInputOver.add(autoCountOver);
	bonusBtn.events.onInputOut.add(autoCountOut);

	function bonusBtnClick(button) {
		game.state.start("Bonus");
	}
	*/

	if(isAuto) {
		if(spinCounter > 0) {
			startSpinning();
		} else {
			spinBtnText.text = 'SPIN!';
			enableButtons();
			isAuto = false;
		}
	}
}