/*****************************************************
	Description 	: Animal Image and bonus value in bonus step 2
	Created 		: 2016/08/01
******************************************************/

var animalView = function(gr, aIndex) {

	var main = this;
	main.isClicked = false;

	var aId = aIndex;
	var enFont = { font: "bold 36px Arial", fill: '#ffd200', boundsAlignH: "center", boundsAlignV: "middle", stroke: "#cc0000", strokeThickness: 8 };
	var disFont = { font: "bold 32px Arial", fill: '#c10c06', boundsAlignH: "center", boundsAlignV: "middle", stroke: "#61120a", strokeThickness: 8 };

	var animal = gr.create(animalXArr[aId], animalYArr[aId], animalArr[aId]);
	animal.valueIndex = aIndex;
	animal.inputEnabled = true;
	animal.input.pixelPerfectOver = true;
	animal.input.pixelPerfectClick = true;
	animal.events.onInputOver.add(autoCountOver);
	animal.events.onInputOut.add(autoCountOut);
	animal.events.onInputUp.add(clickAnimal);

	var valAnimal = 30 * (parseInt(Math.random() * 10)) + 30;
	var valueText = game.make.text(0, 0, valAnimal, enFont);
	gr.add(valueText);

    valueText.setTextBounds(animalXArr[aId], animalYArr[aId], animalWidthArr[aId], animalHeightArr[aId]);
    valueText.visible = false;
    valueText.alpha = 0.0;

    function clickAnimal(button) {
    	if(!main.isClicked) {
    		animalLimit--;
    		if(animalLimit >= 0)
    			remainText.text = animalLimit;

    		main.isClicked = true;
    		main.showAnimalValue(true);

    		if(animalLimit <= 0) {
				showAllAnimalValue();
				// game.state.start("TheGame");
			}
    	}
	}

	main.showAnimalValue = function(isSelected) {
		animal.inputEnabled = false;
			
		valueText.visible = true;
		if(!isSelected) {
			valueText.setStyle(disFont);
		} else {
			bonuswinValue += valAnimal;
			totalwinText.text = bonuswinValue;
			multiWinText.text = bonuswinValue;
		}

		game.add.tween(valueText).to({ alpha: 1 }, 500, "Linear", true);
		
	}

}