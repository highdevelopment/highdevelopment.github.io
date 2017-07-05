/*****************************************************
	Description 	: Game Objects: 
	Created 		: 2016/07/26
	Copyright		: 2016
******************************************************/

var REEL_ANIMATION = {};
REEL_ANIMATION.STOP 		= 0;
REEL_ANIMATION.SPINNING	= 1;
REEL_ANIMATION.SPINDOWN	= 2;
REEL_ANIMATION.FINISHED	= 3;

var CReel = function (game, x, y, index)
{
	var main = this;
	this.spin = REEL_ANIMATION.STOP;
	this.animation = 0;
	this.animation_velocity = 0;
	var mTimer_spins = null;
	var mTween = null;

	this.init = function() {
		Phaser.Group.call(this, game);
		this.index = index;
		this.x = x;
		this.y = y;
		for(var i = 0; i < (GAME_CONF.INIT_SPIN_NUM + GAME_CONF.ADD_SPIN_NUM); i++) {
			var symbol = this.create(0, i * GAME_CONF.ICON_HEIGHT, 'spin0');
		}

		mTween = game.add.tween(this).to( { y: g_REEL_BOTTOM[index] - 150}, 200, Phaser.Easing.Linear.None, false, 0, 1000);//.to( { y: START_Y - IMAGE_HEIGHT }, 1000, Phaser.Easing.Back.Out);
		mTween.onStart.add(this.onStart, this);
    	mTween.onRepeat.add(this.onLoop, this);
    	mTween.onComplete.add(this.onComplete, this);
	}

	this.initImage = function() {
		this.setPattern();
	}

	this.onStart = function()
	{

	}

	this.onLoop = function()
	{

	}

	this.onComplete = function()
	{
		
	}

	// this.remakeImage = function(patterns) {
	// 	this.removeAll();
	// 	var icons = this.randomSpinArray(); // icon[0] is random( for spin animation )
	// 	for(var i = 0; i < (GAME_CONF.INIT_SPIN_NUM + GAME_CONF.ADD_SPIN_NUM); i++) {
	// 		var iconIndex = icons[i];
	// 		if(iconIndex == null)
	// 			iconIndex = 0;
	// 		if(iconIndex < 0)
	// 			iconIndex = 0;
	// 		if(iconIndex >= GAME_CONF.SPIN_NUMBER)
	// 			iconIndex = GAME_CONF.SPIN_NUMBER - 1;
	// 		var symbol = this.create(0, i * GAME_CONF.ICON_HEIGHT, 'spin' + iconIndex);
	// 		var anchorX = 0.5, anchorY = 0.5;
	// 		if(g_spinConfig[iconIndex].anchorX != null)
	// 			anchorX = g_spinConfig[iconIndex].anchorX;
	// 		if(g_spinConfig[iconIndex].anchorY != null)
	// 			anchorY = g_spinConfig[iconIndex].anchorY;
	// 		symbol.anchor.setTo(anchorX, anchorY);

	// 		if(g_spinConfig[iconIndex].length > 1) {
	// 			var len = g_spinConfig[iconIndex].length;
	// 			symbol.y += (GAME_CONF.ICON_HEIGHT * (len - 1) * 0.5);
	// 			i += (len - 1);
	// 		}
	// 	}
	// }

	this.startAnimation = function()
	{
		this.y = g_REEL_TOP[i];
		mTween.start();
		// setTimeout(function()
		// {
		// 	main.y = g_REEL_TOP[i];
		// 	main.animation = REEL_ANIMATION.SPINNING;
		// 	main.animation_velocity = 60;
		// 	// if(mTimer_spins)
		// 	// 	game.time.events.remove(mTimer_spins);
		// 	// mTimer_spins = game.time.events.loop(10, main.onLoopSpinAnimation, main);
		// }, main.index * 200);
	}

	// this.onLoopSpinAnimation = function()
	// {
	// 	if(main.animation == REEL_ANIMATION.SPINNING)
	// 	{
	// 		main.y += main.animation_velocity;
	// 		if(main.y > g_REEL_BOTTOM[i])
	// 			main.y = g_REEL_TOP[i];
	// 	}
	// 	else if(main.animation == REEL_ANIMATION.SPINDOWN)
	// 	{
	// 		var velocity = main.animation_velocity * 0.98;
	// 		if(velocity < 1)
	// 			velocity = 1;
	// 		main.animation_velocity = velocity;
	// 		main.y += main.animation_velocity;
	// 		if(main.y > g_REEL_BOTTOM[i])
	// 		{
	// 			main.animation = REEL_ANIMATION.STOP;
	// 			main.y = g_REEL_BOTTOM[i];
	// 			game.time.events.remove(mTimer_spins);
	// 		}
	// 	}
	// }

	this.setPattern = function(patterns)
	{
		var icons = this.randomSpinArray(); // icon[0] is random( for spin animation )
		if(patterns) {
			var firstIndex = icons[0];
			while(1) {
				if(g_spinConfig[firstIndex].length == 1) {
					icons[0] = firstIndex;
					break;
				}
				if(firstIndex >= GAME_CONF.SPIN_NUMBER - 1)
					firstIndex = 0;
				firstIndex++;
			}
			// for(var i = 0; i < GAME_CONF.SPIN_NUM_ROW; i++) {
			for(var i = 0; i < GAME_CONF.ROW_NUM; i++) { // will be removed (for php)
				var val = patterns[i];
				if(val) {
					if(isNaN(val)) {
						if(val[1] == '_') {
							icons[i + 1] = val[0] * 1 - 1;
						}
					}
					else {
						icons[i + 1] = val * 1 - 1;
					}
				}
			}

			setTimeout(function()
			{
				main.animation = REEL_ANIMATION.SPINDOWN;
				main.y = g_REEL_TOP[main.index];
			}, 2000 + this.index * 200);
		}
		for(var i = 0; i < (GAME_CONF.INIT_SPIN_NUM + GAME_CONF.ADD_SPIN_NUM); i++) {
			var iconIndex = icons[i];
			if(iconIndex == null)
				iconIndex = 0;
			if(iconIndex < 0)
				iconIndex = 0;
			if(iconIndex >= GAME_CONF.SPIN_NUMBER)
				iconIndex = GAME_CONF.SPIN_NUMBER - 1;
			var symbol = this.children[i];
			symbol.key = 'spin' + iconIndex;
			symbol.loadTexture(symbol.key, 0);
			// var icon = this.create(0, i * GAME_CONF.ICON_HEIGHT, 'spin' + iconIndex);
			var anchorX = 0.5, anchorY = 0.5;
			if(g_spinConfig[iconIndex].anchorX != null)
				anchorX = g_spinConfig[iconIndex].anchorX;
			if(g_spinConfig[iconIndex].anchorY != null)
				anchorY = g_spinConfig[iconIndex].anchorY;
			symbol.anchor.setTo(anchorX, anchorY);

			if(g_spinConfig[iconIndex].length > 1) {
				var len = g_spinConfig[iconIndex].length;
				symbol.y += (GAME_CONF.ICON_HEIGHT * (len - 1) * 0.5);
				i += (len - 1);
			}
		}
	}

	this.randomSpinArray = function(array) {
	    var copy = [];
	    var aryTemp = [];
	    for(var i = 0; i < GAME_CONF.INIT_SPIN_NUM; i++)
	    	aryTemp[i] = i % GAME_CONF.SPIN_NUMBER;
	    this.shuffleArray(aryTemp);
	    for( var i = 0; i < aryTemp.length; i++) {
			copy.push(aryTemp[i]);
	    }
	    this.shuffleArray(aryTemp);
	    for(var i = 0; i < GAME_CONF.ADD_SPIN_NUM; i++) {
	    	copy.push( aryTemp[i]);
	    }
	    return copy;
	}

	this.shuffleArray = function(array) {
	    for (i = array.length - 1; i > 0; i--) {
			var j = parseInt(Math.random() * i)
			var tmp = array[i];
			array[i] = array[j];
			array[j] = tmp;
	    }
	}
	this.init();
};

CReel.prototype = Object.create(Phaser.Group.prototype);
CReel.prototype.constructor = CReel;





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