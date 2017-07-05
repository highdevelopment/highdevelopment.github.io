/*****************************************************
	Description 	: Auto updating game state
	Created 		: 2016/07/18
******************************************************/

function gameUpdate() {
	//Update Game State

	var now = new Date();

	if((startedTime > 0) && ((now - startedTime) > 3000) && spinning) {
		/*spinning = false;
		startedTime = -1;

		for(var i = 0; i < (spinNumber + 3); i++)
		{
			group1.getChildAt(i).frame = 0;
		}

		stopTween(tween1, group1);
		game.time.events.repeat(Phaser.Timer.SECOND, 1, onComplete1, this);*/
	}
}

function onComplete1() {
	for(var i = 0; i < (spinNumber + 3); i++) {
		group2.getChildAt(i).frame = 0;
	}
	stopTween(tween2, group2);

	game.time.events.repeat(Phaser.Timer.SECOND, 1, onComplete2, this);
}

function onComplete2() {
	for(var i = 0; i < (spinNumber + 3); i++) {
		group3.getChildAt(i).frame = 0;
	}
	stopTween(tween3, group3);

	game.time.events.repeat(Phaser.Timer.SECOND, 1, onComplete3, this);
}

function onComplete3() {
	for(var i = 0; i < (spinNumber + 3); i++) {
		group4.getChildAt(i).frame = 0;
	}
	stopTween(tween4, group4);

	game.time.events.repeat(Phaser.Timer.SECOND, 1, onComplete4, this);
}

function onComplete4() {
	for(var i = 0; i < (spinNumber + 3); i++) {
		group5.getChildAt(i).frame = 0;
	}
	stopTween(tween5, group5);

	game.time.events.repeat(Phaser.Timer.SECOND, 1, onComplete5, this);
}

function onComplete5() {

}