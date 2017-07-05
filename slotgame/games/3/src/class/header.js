/*****************************************************
	Description 	: Manage title of game and free spin.
	Created 		: 2016/08/14
******************************************************/

var agHeaderView = function() {
	var main = this;

	var lfont 		= { font: "56px marker", fill: '#FFFFFF', boundsAlignH: "center", boundsAlignV: "middle"/*, stroke: "#5d1d00", strokeThickness: 1 */};

	var gr = game.add.group();
	gr.x = 615;
	gr.y = 316;
	var titleImg = gr.create(0, 0, 'agBG_header');

	var freeGr = game.make.group();
	var freetImg = game.make.image(0, 0, 'agBG_freespin');
	freeGr.add(freetImg);
	var counterLabel = game.make.text(0, 0, "10", lfont);
    counterLabel.setTextBounds(270, 24, 140, 76);
    freeGr.add(counterLabel);
    freeGr.alpha = 0.0;
    
    gr.add(freeGr);

    var onCompleteAction = function() {
    	agSetView.enableAllButtons();
    }

	main.startFreeSpin = function(counter) {
		console.log("STart free spin");
		counterLabel.text = counter;
		var tw = game.add.tween(freeGr).to( { alpha: 1.0}, 1000, "Linear", true);
		tw.onComplete.add(onCompleteAction, this);

		
	}

	main.setFreeSpinCounter = function(counter) {
		counterLabel.text = counter;
	}
}