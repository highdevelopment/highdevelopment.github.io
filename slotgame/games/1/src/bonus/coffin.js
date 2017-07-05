/*****************************************************
	Description 	: Coffin Image and mulitple alue in bonus step 3
	Created 		: 2016/08/01
******************************************************/

var coffinView = function(gr, cIndex) {

	var main = this;
	main.isSelected = false;
	var mIndex = cIndex;

	var enFont = { font: "bold 48px Arial", fill: '#ffd200', boundsAlignH: "center", boundsAlignV: "middle", stroke: "#cc0000", strokeThickness: 8 };
	var disFont = { font: "bold 42px Arial", fill: '#c10c06', boundsAlignH: "center", boundsAlignV: "middle", stroke: "#61120a", strokeThickness: 8 };

	var coffin = gr.create(coffinXArr[mIndex], coffinYArr[mIndex], coffinArr[mIndex]);
	coffin.inputEnabled = true;
	coffin.input.pixelPerfectOver = true;
	coffin.input.pixelPerfectClick = true;
	coffin.events.onInputOver.add(autoCountOver);
	coffin.events.onInputOut.add(autoCountOut);
	coffin.events.onInputUp.add(coffinSelected);

	var coffinValue = multiValueArr[cIndex];
	var coffinValText = game.make.text(0, 0, "×" + coffinValue, enFont);
	coffinValText.setTextBounds(coffinXArr[mIndex], coffinYArr[mIndex] + 260, coffinWArr[mIndex], 40);
	coffinValText.alpha = 0.0;
	gr.add(coffinValText);

	main.showCoffinValue = function() {

		coffin.inputEnabled = false;
		if(main.isSelected) {
			game.add.tween(coffinValText).to({alpha: 1.0, y: 0 - coffinYArr[mIndex] - 50}, 600, "Linear", true).onComplete.add(finishGetMulti, this);
		} else {
			coffinValText.setStyle(disFont);
			game.add.tween(coffinValText).to({alpha: 1.0, y: 0 - coffinYArr[mIndex]}, 600, "Linear", true);
		}
	}

	function finishGetMulti() {
		showAllMultiValue();
	}

	function coffinSelected(button) {
		if(!main.isSelected) {
			main.isSelected = true;
			multiValueText.text = coffinValue;
			multiValue = coffinValue;
			multiWinText.text = bonuswinValue * multiValue;

			main.showCoffinValue();
		}
	}
	
}