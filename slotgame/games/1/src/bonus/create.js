/*****************************************************
	Description 	: Create bonus game
	Created 		: 2016/08/01
******************************************************/

function bonusCreate() {
	game.add.image(0, 0, 'bonustransbg');

	var mainX 		= 576;
	var mainY 		= 300;
	var lWidth 		= 100;
	var lHeight		= 60;
	var labelW		= 280;
	var labelH		= 50;

	var m_font = { font: "bold 36px Arial", fill: '#2d6dff', boundsAlignH: "center", boundsAlignV: "middle", /*stroke: "#cc0000", strokeThickness: 8*/ };
	var t_font = { font: "bold 42px Arial", fill: '#2d6dff', boundsAlignH: "center", boundsAlignV: "middle", /*stroke: "#cc0000", strokeThickness: 8*/ };
	var c_font = { font: "bold 24px Arial", fill: '#2d6dff', boundsAlignH: "center", boundsAlignV: "middle", /*stroke: "#cc0000", strokeThickness: 8*/ };

	keyValueArr = new Array();
	coverValueArr = new Array();

	coverClassArr.length = 0;
	//Bonus quest part
	for(var i = 11; i >= 0; i--) {
		var cView = new coverView(mainX + coverXArr[i], mainY+ coverYArr[i], 11-i);
		coverClassArr.push(cView);
	}

	bonusquestbg = game.add.image(mainX, mainY, 'bonusquestbg');
	game.add.image(mainX, mainY - 48, 'questtop');
	game.add.image(mainX, mainY + 607, 'questbottom');

	//Bonus Animal Part
	animalBonusGr = game.add.group();
	animalBonusGr.x = mainX;
	animalBonusGr.y = mainY;
	animalBonusGr.create(0, 0, 'bonusanimalbg');

	for(var i = 0; i < 10; i++) {
		var aView = new animalView(animalBonusGr, i);
		animalViewArr.push(aView);
	}

	remainText = game.make.text(0, 0, animalLimit, m_font);
	remainText.setTextBounds(20, 10, lWidth, lHeight);
	animalBonusGr.add(remainText);

	bonuswinValue = 0;
	totalwinText = game.make.text(0, 0, bonuswinValue, m_font);
	totalwinText.setTextBounds(616, 16, lWidth, lHeight);
	animalBonusGr.add(totalwinText);

	animalBonusGr.visible = false;

	//Bonus Multiple part
	multiBonusGr = game.add.group();
	multiBonusGr.x = mainX;
	multiBonusGr.y = mainY;
	multiBonusGr.create(0, 0, 'bonusmultibg');

	multiValueText = game.make.text(0, 0, multiValue, m_font);
	multiValueText.setTextBounds(22, 56, lWidth, lHeight);
	multiBonusGr.add(multiValueText);

	multiWinText = game.make.text(0, 0, bonuswinValue, m_font);
	multiWinText.setTextBounds(616, 28, lWidth, lHeight);
	multiBonusGr.add(multiWinText);

	shuffleArray(multiValueArr);
	for(var i = 0; i < 3; i++) {
		var cView = new coffinView(multiBonusGr, i);
		coffinViewArr.push(cView);
	}
	multiBonusGr.visible = false;

	//Bonus Final part
	finalBonusGr = game.add.group();
	finalBonusGr.x = mainX;
	finalBonusGr.y = mainY;
	finalBonusGr.create(0, 0, 'bonusfinalbg');

	totalWinValue = 76700;
	totalWinLabel = game.make.text(0, 0, totalWinValue, t_font);
	totalWinLabel.setTextBounds(246, 196, labelW, labelH);
	finalBonusGr.add(totalWinLabel);

	calculatingLabel = game.make.text(0, 0, bonuswinValue + " × " + multiValue + " × " + betValue + " = " + totalWinValue, c_font);
	calculatingLabel.setTextBounds(246, 336, labelW, labelH);
	finalBonusGr.add(calculatingLabel);

	var backBtn = game.make.button(280, 420, 'bonusbackbtn', backBtnClick, this);
    backBtn.events.onInputOver.add(autoCountOver);
	backBtn.events.onInputOut.add(autoCountOut);
	finalBonusGr.add(backBtn);

	finalBonusGr.visible = false;
	
	//Bonus Start part
	startBonusGr = game.add.group();
	startBonusGr.x = mainX;
	startBonusGr.y = mainY;
	
	startBonusGr.create(0, 0, 'bonusstartbg');
	var btn = startBonusGr.create(261, 400, 'startbonusbutton');
	btn.inputEnabled = true;
	btn.events.onInputOver.add(autoCountOver);
	btn.events.onInputOut.add(autoCountOut);
	btn.events.onInputUp.add(startBonusquest);
}

function backBtnClick(button) {
	balanceValue += totalWinValue;
	balanceValueText.text = balanceValue;
	game.state.start("TheGame");
}

function shuffleArray( array ) {

    for (i = array.length - 1; i > 0; i--) {
		var j = parseInt(Math.random() * i)
		var tmp = array[i];
		array[i] = array[j];
		array[j] = tmp;
    }
}