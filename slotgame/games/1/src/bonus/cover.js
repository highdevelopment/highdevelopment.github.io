/*****************************************************
	Description 	: Cover class of quest on Bonus game
	Created 		: 2016/08/01
******************************************************/

var coverView = function(m_X, m_Y, index) {

	var main = this;
	main.coverIndex = index;

	main.keyGroup = game.add.group();
	main.keyGroup.x = m_X;
	main.keyGroup.y = m_Y;

	if(main.coverIndex > 3) 
		main.keyGroup.create(0, 0, 'inside01');
	else
		main.keyGroup.create(0, 0, 'inside02');

	var keyValue = parseInt(Math.random() * 4);
	var keySprite = main.keyGroup.create(0, 0, keyArr[keyValue]);
	
	// game.add.tween(keySprite).to({frame: 0}, 1000, "Linear", true, 0, -1);

	var coverGroup = game.add.group();
	coverGroup.x = m_X;
	coverGroup.y = m_Y;

	main.cover = coverGroup.create(-1, 0, coverArr[main.coverIndex]);
	main.cover.inputEnabled = true;
	main.cover.index = i;
	main.cover.events.onInputOver.add(autoCountOver);
	main.cover.events.onInputOut.add(autoCountOut);
	main.cover.events.onInputUp.add(openCover);

	coverGroup.create(121, 0, 'insideleft01');

	function openCover() {
		main.cover.inputEnabled = false;
		main.cover.frame = 0;
		if(main.coverIndex > 3) {
			var cTween = game.add.tween(main.cover).to({x: 8, y:3}, 200, "Linear", true);
			cTween.onStart.add(onStartMove, main);
			cTween.onComplete.add(onNextMove, main);
		} else {
			var cTween = game.add.tween(main.cover).to({x: 8, y:-3}, 200, "Linear", true);
			cTween.onStart.add(onStartMove, main);
			cTween.onComplete.add(onNextMove, main);
		}
	}

	function onStartMove() {
		coverDisable();

		keyValueArr.push(keyValue);
		coverValueArr.push(main.coverIndex);
	}

	function coverDisable() {
		for(var i = 0; i < 12; i++) {
			var cView = coverClassArr[i];
			cView.cover.inputEnabled = false;
		}
	}

	function onNextMove() {
		if(main.coverIndex > 3) {
			game.add.tween(main.cover).to({y: -112}, 1000, "Linear", true).onComplete.add(onFinishMove, main);
		} else {
			game.add.tween(main.cover).to({y: +112}, 1000, "Linear", true).onComplete.add(onFinishMove, main);
		}		
	}

	function onFinishMove() {
		var sameCount = 0;
		for(var i = 0; i < keyValueArr.length; i++) {
			if(keyValue == keyValueArr[i]) {
				sameCount++;
			}
		}

		if(sameCount >= 2) {
			startAnimationMatch(keyValue, sameCount);
		}

		if(sameCount < 3) {
			for(var i = 0; i < 12; i++) {
				var cView = coverClassArr[i];
				cView.cover.inputEnabled = true;
			}
		} else {
			animalLimit = boxValueArr[keyValue];
			remainText.text = animalLimit;
			game.time.events.add(1000, startAnimalBonus, this);
		}
		main.cover.visible = false;
	}

	main.matchAnimation = function(c) {
		// game.add.tween(keySprite).to({alpha: 0.5}, 500, "Linear", true, 0, 3);
		keySprite.smoothed = false;
		var anima;
		if(c == 3)
			anima = keySprite.animations.add('keysprite', [1, 0, 1, 0, 1, 0]);
		if(c == 2)
			anima = keySprite.animations.add('keysprite', [1, 0, 1, 0]);
		anima.play(5, false);
	}
}