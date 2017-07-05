/*****************************************************
	Description 	: Action functions for Bonus game
	Created 		: 2016/08/01
******************************************************/

function startBonusquest(button) {
	game.add.tween(startBonusGr).to( { alpha: 0 }, 600, "Linear", true).onComplete.add(onCompleteDisapper, this);

	startBonusGr.visible = false;
}

function onCompleteDisapper() {
	startBonusGr.visible = false;
}

function startAnimationMatch(v, c) {
	for(var i = 0; i < keyValueArr.length; i++) {
		if(v == keyValueArr[i]) {
			var coverIndex = coverValueArr[i];
			var coverClass = coverClassArr[coverIndex];
			coverClass.matchAnimation(c);
		}
	}
}

function startAnimalBonus() {
	animalBonusGr.visible = true;
	animalBonusGr.alpha = 0.0;
	game.add.tween(animalBonusGr).to({alpha: 1.0}, 1000, "Linear", true);
}

function showAllAnimalValue() {
	for(var i = 0; i < animalViewArr.length; i++) {
		var aView = animalViewArr[i];
		if(!aView.isClicked) {
			aView.showAnimalValue(false);
		}
	}

	game.time.events.add(1600, startMultiBonus, this);
}

function startMultiBonus() {
	multiBonusGr.visible = true;
	multiBonusGr.alpha = 0.0;
	game.add.tween(multiBonusGr).to({alpha: 1.0}, 1000, "Linear", true);
}

function showAllMultiValue() {
	for(var i = 0; i < coffinViewArr.length; i++) {
		var cView = coffinViewArr[i];
		if(!cView.isSelected) {
			cView.showCoffinValue();
		}
	}

	game.time.events.add(1600, startFinishBonus, this);
}

function startFinishBonus() {
	totalWinValue = bonuswinValue * multiValue * betValue;
	totalWinLabel.text = totalWinValue;
	calculatingLabel.text = bonuswinValue + " × " + multiValue + " × " + betValue + " = " + totalWinValue;

	finalBonusGr.visible = true;
	finalBonusGr.alpha = 0.0;
	game.add.tween(finalBonusGr).to({alpha: 1.0}, 1000, "Linear", true);
}