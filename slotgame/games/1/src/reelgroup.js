/*****************************************************
	Description 	: For Group of each reel
	Created 		: 2016/07/18
******************************************************/

var reelGroup = function(xpoint, rIndex) {
	
	var main = this;
	var reelY = START_Y - (spinNumber + 2) * IMAGE_HEIGHT;
	var reelX = xpoint;

	var spinArr = null;
	var reelIndex = rIndex;
	var gr = game.add.group();
	var tween = null;
	var isChanged = false;
	var winArr = null;
	var lcounter = 0;
	var loopCounter = 4;

	function copyArray( array ) {
	    var copy = [];

	    shuffleArray (array);

	    copy.push(array[parseInt(Math.random() * spinNumber)]);
	    copy.push(array[parseInt(Math.random() * spinNumber)]);

	    for( var i = 0; i < array.length; i++) {
			copy.push(array[i]);
	    }
	    
	    for(var i = 2; i < 5; i++) {
	    	copy.push( array[i]);
	    }
	    
	    return copy;
	}

	function shuffleArray( array ) {

	    for (i = array.length - 1; i > 0; i--) {
			var j = parseInt(Math.random() * i)
			var tmp = array[i];
			array[i] = array[j];
			array[j] = tmp;
	    }
	}

	main.initGroup = function(spinCount, frame) {
		if(spinCount == undefined) {
			spinCount = 4;
		}

		if(frame == undefined) {
			frame = 0;
		}

		gr.removeAll();
		gr.y = reelY;
		gr.x = reelX;

		spinArr = copyArray(spinImgArr);
	
		for(var i = 0; i < (spinNumber + 5); i++) {
			var item = gr.create(0, i * IMAGE_HEIGHT, spinArr[i], frame);
		}

		setTween(spinCount);
	}

	main.startSpin = function(spinCount) {
		if(spinCount == undefined) {
			spinCount = 4;
		}
		main.initGroup(spinCount, 1);
		tween.start();
	}

	function setTween(spinCount) {
		if(spinCount == undefined) {
			spinCount = 4;
		}

		if(tween) {
			delete tween;
		}

		loopCounter = spinCount;
		tween = game.add.tween(gr).to( { y: START_Y - (IMAGE_HEIGHT * 2) }, 500, Phaser.Easing.Linear.None, false, 0, 1000);//.to( { y: START_Y - IMAGE_HEIGHT }, 1000, Phaser.Easing.Back.Out);
		tween.onStart.add(onStart, this);
    	tween.onRepeat.add(onLoop, this);
    	tween.onComplete.add(onComplete, this);

	}

	function onStart() {
		isChanged = false;
		lcounter = 0;

		winArr = new Array();
	}

	function onLoop() {
		if(!isChanged && responseObj && responseObj.pattern) {
			var arr = JSON.parse(responseObj.pattern);
			isChanged = true;
			replaceSpinImage(arr[0][reelIndex], arr[1][reelIndex], arr[2][reelIndex]);

			game.time.events.add(500 * reelIndex, stopLoop, this);
		}
	}

	function stopLoop() {
		tween.stop(true);
	}

	function replaceSpinImage(first, second, third) {
		spinArr[1] = SPINARRAY[first-1];
		spinArr[2] = SPINARRAY[second-1];
		spinArr[3] = SPINARRAY[third-1];

		gr.removeAll();
		gr.y = reelY;
		gr.x = reelX;

		for(var i = 0; i < (spinNumber + 5); i++) {
			var item = gr.create(0, i * IMAGE_HEIGHT, spinArr[i], 1);
		}
	}

	function getWinArray() {
		if(responseObj && responseObj.win_lines) {
			for(var i = 0; i < responseObj.win_lines.length; i++) {
				var linelist = responseObj.win_lines[i].list;
				for(var j = 0; j < linelist.length; j++) {
					var line = linelist[j];
					if(line.col == reelIndex) {
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
	}

	function onComplete() {
		for(var i = 0; i < (spinNumber + 3); i++) {
			gr.getChildAt(i).frame = 0;
		}
		game.add.tween(gr).to( { y: START_Y - IMAGE_HEIGHT }, 1000, Phaser.Easing.Back.Out, true).onComplete.add(onCompleteAction, this);
	}

	function onCompleteAction() {
		if(reelIndex == 4) {
			onCompleteSpin();
		}
	}

	main.checkWin = function() {
		getWinArray();
		main.startAnimation();
	}

	main.startAnimation = function() {
		if(winArr.length != 0) {
			
			for(var i = 0; i < winArr.length; i++) {
				if(responseObj && responseObj.pattern) {

					var animIndex = responseObj.pattern[winArr[i]][reelIndex];

					var anim = game.add.sprite(reelX, START_Y + IMAGE_HEIGHT * winArr[i], spinAnimArr[animIndex]);
					

					anim.smoothed = false;
			    	var anima = anim.animations.add('ok' + winArr[i] + reelIndex);
			    	anima.play(10, true);

			    	/*anim.onStart.add(animationStarted, this);
			    	anim.onLoop.add(animationLooped, this);
			    	anim.onComplete.add(animationStopped, this);*/
				}
				
			}
		}

		if(reelIndex == 4) {
			// drawSeperateImage();
			seperateImg.z = 10000;
		}
	}

	main.initGroup();
}