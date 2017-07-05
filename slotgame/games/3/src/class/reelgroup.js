/*****************************************************
	Description 	: For Group of each reel
	Created 		: 2016/08/12
******************************************************/

var agReelGroup = function(xpoint, rIndex) {
	
	var main = this;
	var reelY = AG_START_Y - (AG_SPINNUMBER + 2) * AG_IMAGE_HEIGHT;
	var reelX = xpoint;

	var spinArr = null;
	var reelIndex = rIndex;
	var gr = game.add.group();
	var tween = null;
	var isChanged = false;
	var winArr = null;
	var lcounter = 0;
	var loopCounter = 4;

	var scatterIndex = 15;
	var isScatter = false;

	var borderAnim = null;
	var borderGr = game.add.group();
	borderGr.x = reelX;
	borderGr.y = AG_START_Y;

	function copyArray( array ) {
	    var copy = [];

	    copy.push(array[parseInt(Math.random() * AG_SPINNUMBER)]);
	    copy.push(array[parseInt(Math.random() * AG_SPINNUMBER)]);
	    
	    shuffleArray(array);
	    for(var i = 0; i < array.length; i++) {
	    	copy.push(array[i]);
	    }
	    
	    for(var i = 0; i < 3; i++) {
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

		isScatter = false;

		if(spinCount == undefined) {
			spinCount = 2;
		}

		if(frame == undefined) {
			frame = 0;
		}

		gr.removeAll();
		gr.y = reelY;
		gr.x = reelX;

		spinArr = copyArray(agSpinImgArr);
	
		for(var i = 0; i < (AG_SPINNUMBER + 5); i++) {
			var spinIndex = getIndex(spinArr[i]);
			var spinY = 0;
			var spinX = 0;

			if( 0 <= spinIndex && spinIndex <= 5 ) {
				spinY = i * AG_IMAGE_HEIGHT;
			} else if( 6 <= spinIndex && spinIndex <= 14) {
				spinY = i * AG_IMAGE_HEIGHT - 10;
				if( spinIndex == 14 ) {
					spinX = -12;
				}

			} else if(spinIndex == 15) {
				spinY = i * AG_IMAGE_HEIGHT;
			}

			var item = gr.create(spinX, spinY, spinArr[i]);
		}

		setTween(spinCount);
	}

	function getIndex(obj) {
		for(var i = 0; i < AG_SPINARRAY.length; i++) {
			if(obj == AG_SPINARRAY[i])
				return i;
		}

		return 0;
	}

	main.getReelGroup = function() {
		return gr;
	}

	main.startSpin = function(spinCount) {
		if(spinCount == undefined) {
			spinCount = 4;
		}
		
		main.initGroup(spinCount, 0);
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
		tween = game.add.tween(gr).to( { y: AG_START_Y - (AG_IMAGE_HEIGHT * 2)}, 500, Phaser.Easing.Linear.None, false, 0, 1000);//.to( { y: START_Y - IMAGE_HEIGHT }, 1000, Phaser.Easing.Back.Out);
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
		if(!isChanged && agResponseObj) {
			var arr = agResponseObj.pattern;
			isChanged = true;
			if(arr != null) {
				replaceSpinImage(arr[0][reelIndex], arr[1][reelIndex], arr[2][reelIndex]);
			}			

			game.time.events.add(500 * reelIndex, stopLoop, this);
		}
	}

	function stopLoop() {
		tween.stop(true);
	}

	function replaceSpinImage(first, second, third) {

		first = getNumberIndex(first);
		second = getNumberIndex(second);
		third = getNumberIndex(third);

		spinArr[1] = AG_SPINARRAY[first-1];
		spinArr[2] = AG_SPINARRAY[second-1];
		spinArr[3] = AG_SPINARRAY[third-1];

		if(first == scatterIndex || second == scatterIndex || third == scatterIndex) {
			isScatter = true;
			agScatterCounter++;
		}

		gr.removeAll();
		gr.y = reelY;
		gr.x = reelX;

		for(var i = 0; i < (AG_SPINNUMBER + 5); i++) {
			var spinIndex = getIndex(spinArr[i]);
			var spinY = 0;
			var spinX = 0;

			if( 0 <= spinIndex && spinIndex <= 5 ) {
				spinY = i * AG_IMAGE_HEIGHT;
			} else if( 6 <= spinIndex && spinIndex <= 14) {
				spinY = i * AG_IMAGE_HEIGHT - 10;
				if( spinIndex == 14 ) {
					spinX = -12;
				}

			} else if(spinIndex == 15) {
				spinY = i * AG_IMAGE_HEIGHT;
			}

			var item = gr.create(spinX, spinY, spinArr[i], 1);
		}
	}

	function getWinArray() {
		if(agResponseObj && agResponseObj.win_lines) {
			for(var i = 0; i < agResponseObj.win_lines.length; i++) {
				var linelist = agResponseObj.win_lines[i].list;
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
		for(var i = 0; i < (AG_SPINNUMBER + 3); i++) {
			gr.getChildAt(i).frame = 0;
		}
		game.add.tween(gr).to( { y: AG_START_Y - AG_IMAGE_HEIGHT}, 1000, Phaser.Easing.Back.Out, true).onComplete.add(onCompleteAction, this);
	}

	function onCompleteAction() {
		if(reelIndex == 4) {
			agActor.onCompleteSpin();
		} else {
			var animName = null;
			var xscale = 1.0;
			var yscale = 1.0;
			var xdelta = 0;
			var ydelta = 0;

			if(isScatter) {
				animName = 'scatterAnim';
			} 

			/*if(animName != null) {
				var anim = borderGr.create(AG_IMAGE_HEIGHT/2 + xdelta, AG_IMAGE_HEIGHT*3/2 + ydelta, animName);
				anim.anchor.setTo(0.5, 0.5);
				anim.smoothed = false;
				anim.scale.setTo(xscale, yscale);
	            var animate = anim.animations.add();
	            animate.play(30, true);
			}*/
		}
	}

	main.checkWin = function() {
		getWinArray();
		// main.startAnimation();
	}

	main.startAnimation = function() {
		if(winArr.length != 0) {
			
			for(var i = 0; i < winArr.length; i++) {
				if(agResponseObj && agResponseObj.pattern) {

					var animIndex = agResponseObj.pattern[winArr[i]][reelIndex];

					var anim = game.add.sprite(reelX, AG_START_Y + AG_IMAGE_HEIGHT * winArr[i], agSpinAnimArr[animIndex]);
					

					anim.smoothed = false;
			    	var anima = anim.animations.add('ok' + winArr[i] + reelIndex);
			    	anima.play(10, true);

			    	/*anim.onStart.add(animationStarted, this);
			    	anim.onLoop.add(animationLooped, this);
			    	anim.onComplete.add(animationStopped, this);*/
				}
				
			}
		}
	}

	main.initGroup();
}