/*****************************************************
	Description 	: icon's Animations
	Created 		: 2016/07/29
	Copyright		: 2016
******************************************************/

var lineColors = ['0xffff01', '0x65feac', '0xcb32ca', '0xfe0000', '0xbdfb00',		//1
					'0xff6766', '0xccff00', '0x008a00', '0xc1ffb4', '0x00ff87',		//6
					'0x01cc00', '0xff98ff', '0xfeb4b3', '0xff3300', '0x7fff6c',		//11
					'0xffb600', '0x00cca3', '0x00fff7', '0xff32cb', '0xfe66cb', 	//16
					'0xe9ff79', '0x00a6a4', '0x66d1ff', '0x0099ff', '0xff6600', 	//21
					'0x99fe00', '0xcc9900', '0x8bf3f2', '0xff3366', '0xd851db',		//26
					'0xfea056', '0xc20060', '0x0068b1', '0xb150ff', '0x013fd2', 	//31
					'0x60b001', '0xbbd2e4', '0xfed200', '0x025e4f', '0x0105ae', 	//36
					'0x9a8d1b', '0xb34f4f', '0x71aa9b', '0xd8db80', '0x0073cc',		//41
					'0xfe7d9c', '0x8d1900', '0xa0aaa1', '0x016726', '0x6444c3',  ];

var CSymbolAnimation = function(game, lineDrawer)
{
	var main = this;
	// var mCount = 0;
	var mAniData = [];
	var mAniSprites = [];
	var mBorders = [];
	var timeEvents = [];

	this.init = function() {
		// mCount = 0;
		// var test = new CAnimationTest(game);
		// test.testAnimation(12, false);
		// test.testAllAnimation();

		// var border = game.add.sprite(800, 600, 'border');
		// border.anchor.setTo(0.5, 0.5);
		// var colorCnt = 0;
		// var style1 = { font: "58px Arial", fontWeight: "bold", fill: "#ffffff", wordWrap: false, boundsAlignH: "center" };
		// var textIndex = game.add.text(800, 500, colorCnt, style1);
		// textIndex.anchor.setTo(0.5, 0.5);

		// border.inputEnabled = true;
		// border.events.onInputDown.add(function(){
		// 	colorCnt++;
		// 	textIndex.text = colorCnt;
		// 	border.tint = lineColors[colorCnt - 1];
		// });
// var backSprite = game.add.image(630, 600, 'game_back1');
// cropRect = new Phaser.Rectangle(0, 0, GAME_CONF.ICON_WIDTH, GAME_CONF.ICON_HEIGHT);
// backSprite.crop(cropRect);
// return;
	}

	this.createAnimation = function(data) {
		var group = game.add.group();
		group.position.setTo(GAME_CONF.SPINVIEW_X, GAME_CONF.SPINVIEW_Y);

		var spinIndex = data.index;
		if(GAME_CONF.GAME_INDEX == 19 && spinIndex >= 6) //testing
			return;

		var nRow = data.row;
		var nCol = data.col;
		var lineIndex = data.lineIndex;

		var pos = getSymbolPosition(nRow, nCol);

		var backSprite = game.make.graphics(0, 0);
		backSprite.beginFill(GAME_CONF.BACK_COLOR, 1);
		backSprite.drawRect(pos.x - GAME_CONF.ICON_WIDTH * 0.5, pos.y - GAME_CONF.ICON_HEIGHT * 0.5, GAME_CONF.ICON_WIDTH , GAME_CONF.ICON_HEIGHT);
		// var backSprite = game.make.image(pos.x, pos.y, 'game_back1');
		// cropRect = new Phaser.Rectangle(pos.x - GAME_CONF.ICON_WIDTH * 0.5, pos.y - GAME_CONF.ICON_HEIGHT * 0.5, GAME_CONF.ICON_WIDTH, GAME_CONF.ICON_HEIGHT);
		// backSprite.crop(cropRect);
		// backSprite.anchor.setTo(0.5, 0.5);
		group.add(backSprite);

		var sprite = game.make.sprite(0, 0, 'icon_ani' + spinIndex);
		group.add(sprite);

		if(game.device.iOS && g_spinConfig[spinIndex].ani_scale == 2) {
			sprite.scale.setTo(2, 2);
		}
		var anchorX = 0.5, anchorY = 0.5;
		if(g_spinConfig[spinIndex].anchorX != null)
			anchorX = g_spinConfig[spinIndex].anchorX;
		if(g_spinConfig[spinIndex].anchorY != null)
			anchorY = g_spinConfig[spinIndex].anchorY;
		sprite.anchor.setTo(anchorX, anchorY);

		sprite.animations.add('animation');
		sprite.x = pos.x;
		if(g_spinConfig[spinIndex].length == 2)
			sprite.y = pos.y + (GAME_CONF.ICON_HEIGHT * 0.5);
		else
			sprite.y = pos.y;
		if(g_spinConfig[spinIndex].ani_offsetX)
			sprite.x += g_spinConfig[spinIndex].ani_offsetX;
		if(g_spinConfig[spinIndex].ani_offsetY)
			sprite.y += g_spinConfig[spinIndex].ani_offsetY;

		var border = game.make.graphics(0, 0);
		border.lineStyle(5, lineColors[lineIndex], 1)
		border.drawRect(pos.x - GAME_CONF.ICON_WIDTH * 0.5, pos.y - GAME_CONF.ICON_HEIGHT * 0.5 - 1, GAME_CONF.ICON_WIDTH - 2 , GAME_CONF.ICON_HEIGHT - 2);
		group.add(border);

		// var border = game.make.sprite(pos.x, pos.y, 'border');
		group.add(border);
		// border.anchor.setTo(0.5, 0.5);
		// border.tint = lineColors[lineIndex];
		// border.visible = false;
		group.alpha = 0;
		var tween = game.add.tween(group)
			.to( { alpha: 1 }, 10, Phaser.Easing.Linear.None, false, 0, 0)
			.to( { alpha: 0 }, 10, Phaser.Easing.Linear.None, false, BLINK_TIME, 0)
			.to( { alpha: 1 }, 10, Phaser.Easing.Linear.None, false, BLINK_TIME, 0)
			.to( { alpha: 0 }, 10, Phaser.Easing.Linear.None, false, BLINK_TIME, 0);
		tween.start();


		lineDrawer.animationLineIndex(lineIndex, 0);

		mBorders.push(group);
		return sprite;
	}
	
	// this.startAnimation = function(lineData) {
	// 	var sprite;
	// 	for(var i = 0; i < lineData.length; i++) {
	// 		sprite = this.createAnimation(lineData[i]);
	// 		var frameRate = sprite.animations._frameData._frames.length / (4 * BLINK_TIME / 1000);
	// 		sprite.animations.play('animation', frameRate, false);
	// 		mAniSprites.push(sprite);
	// 	}
	// 	sprite.events.onAnimationComplete.add(main.onCompletedAnimation, this);
	// }

	this.onLoopBlink = function() {
		for(var i = 0; i < mAniSprites.length; i++) {
			mAniSprites[i].animations.stop();
			mAniSprites[i].destroy();
		}
		mAniSprites = [];

		lineDrawer.clearLines();

		for(var i = 0; i < mBorders.length; i++) {
			mBorders[i].destroy();
		}
		mBorders = [];

		// mCount++;
		// if(mCount >= mAniData.length) {
		// 	mAniData = [];
		// 	return;
		// }
		// main.startAnimation(mAniData[mCount]);

		if(mAniCount < mAniNum) {
			var lineData = mAniData[mAniCount];
		}
		else {
			this.stopAnimations();
			return;
		}
		mAniCount++;

		// console.log(mAniCount, mAniNum);
		// console.log(mAniData, lineData);

		for(var i = 0; i < lineData.length; i++) {
			var sprite = this.createAnimation(lineData[i]);
			if(sprite)
			{
				var frameRate = sprite.animations._frameData._frames.length / (4 * BLINK_TIME / 1000);
				sprite.animations.play('animation', frameRate, false);
				mAniSprites.push(sprite);
			}
		}
	}

	this.showAnimation = function(aniData) {
		for(var i = 0; i < timeEvents.length; i++) {
			game.time.events.remove(timeEvents[i]);
		}
		timeEvents = [];
		var timer = game.time.events.loop(4 * BLINK_TIME, this.onLoopBlink, this);
		timeEvents.push(timer);
		mAniNum = aniData.length;
		mAniCount = 0;
		mAniData = aniData;

		this.onLoopBlink();
		// this.startAnimation(aniData[mCount]);
	}

	this.stopAnimations = function() {
		// mCount = 10000;
	 	for(var i = 0; i < mAniSprites.length; i++) {
			mAniSprites[i].animations.stop();
			mAniSprites[i].destroy();
		}
		mAniSprites = [];
		mAniData = [];
		lineDrawer.clearLines();
		for(var i = 0; i < mBorders.length; i++) {
			mBorders[i].destroy();
		}
		mBorders = [];
		for(var i = 0; i < timeEvents.length; i++) {
			game.time.events.remove(timeEvents[i]);
		}
		timeEvents = [];
		// mAniCount = 0;
	}

	this.init();
}



function CAnimationTest(game, lineDrawer)
{
	var main = this;
	var mAniCount = 0;
	var mAniNum = 0;
	this.animations = [];
	this.borders = [];
	var timeEvents = [];
	this.init = function() {
		// this.testAnimation(0);
		// this.testAllAnimation();
	}

	this.showAnimation = function(aniData) {
		var timer = game.time.events.loop(4 * BLINK_TIME, this.onLoopBlink, this, aniData);
		timeEvents.push(timer);
		mAniNum = aniData.length;
		mAniCount = 0;
		mAniData = aniData;
	}

	this.createAnimation = function(data) {
		var spinIndex = data.index;
		var nRow = data.row;
		var nCol = data.col;
		var lineIndex = data.lineIndex;

		var sprite = game.add.sprite(0, 0, 'icon_ani' + spinIndex);
		if(game.device.iOS && g_spinConfig[spinIndex].ani_scale == 2) {
			sprite.scale.setTo(2, 2);
		}
		var anchorX = 0.5, anchorY = 0.5;
		if(g_spinConfig[spinIndex].anchorX != null)
			anchorX = g_spinConfig[spinIndex].anchorX;
		if(g_spinConfig[spinIndex].anchorY != null)
			anchorY = g_spinConfig[spinIndex].anchorY;
		sprite.anchor.setTo(anchorX, anchorY);

		sprite.animations.add('animation');
		var pos = getSymbolPosition(nRow, nCol);
		sprite.x = pos.x;
		if(g_spinConfig[spinIndex].length == 2)
			sprite.y = pos.y + (GAME_CONF.ICON_HEIGHT * 0.5);
		else
			sprite.y = pos.y;
		if(g_spinConfig[spinIndex].ani_offsetX)
			sprite.x += g_spinConfig[spinIndex].ani_offsetX;
		if(g_spinConfig[spinIndex].ani_offsetY)
			sprite.y += g_spinConfig[spinIndex].ani_offsetY;


		var border = game.add.sprite(pos.x, pos.y, 'border');
		border.anchor.setTo(0.5, 0.5);
		border.alpha = 0;
		border.tint = lineColors[lineIndex];
		// border.visible = false;
		borders.push(border);

		var tween = game.add.tween(border)
			.to( { alpha: 1 }, 10, Phaser.Easing.Linear.None, false, 0, 0)
			.to( { alpha: 0 }, 10, Phaser.Easing.Linear.None, false, BLINK_TIME, 0)
			.to( { alpha: 1 }, 10, Phaser.Easing.Linear.None, false, BLINK_TIME, 0)
			.to( { alpha: 0 }, 10, Phaser.Easing.Linear.None, false, BLINK_TIME, 0);
		tween.start();

		lineDrawer.animationLineIndex(lineIndex, 0);

		return sprite;
	}

	this.onLoopBlink = function(aniData) {
		var lineData = aniData[mAniCount];
		mAniCount++;
		if(mAniCount >= mAniNum) {
			this.stopAnimations();
		}

		for(var i = 0; i < lineData.length; i++) {
			sprite = this.createAnimation(lineData[i]);
		}
	}

	this.stopAnimations = function() {
		for(var i = 0; i < this.borders.length; i++) {
			this.borders[i].destroy();
		}
		this.borders = [];

		for(var i = 0; i < this.animations.length; i++) {
			var aniSprtes = this.animations[i];
		 	for(var k = 0; k < aniSprtes.length; k++) {
				aniSprtes[k].animations.stop();
				aniSprtes[k].destroy();
			}
			aniSprtes = [];
		}
		this.animations = [];
		
		for(var i = 0; i < timeEvents.length; i++) {
			game.time.events.remove(timeEvents[i]);
		}
		timeEvents = [];
		lineDrawer.clearLines();
	}

	this.startPlay = function(aniSprites) {
		for(var i = 0; i < this.animations.length; i++) {
			var ary = this.animations[i];
		 	for(var k = 0; k < ary.length; k++) {
				ary[k].animations.stop();
				ary[k].destroy();
			}
			ary = [];
		}
		this.animations = [];

		for(var i = 0; i < aniSprites.length; i++) {
			var frameRate = aniSprites[i].animations._frameData._frames.length / (4 * BLINK_TIME / 1000);
			aniSprites[i].animations.play('animation', frameRate, true);
			aniSprites[i].visible = true;
		}
		this.animations.push(aniSprites);
		var time = game.time.events.add(4 * BLINK_TIME, this.onFinishedPlay, this, aniSprites);
		timeEvents.push(time);
	}

	this.onFinishedPlay = function(param) {
		for(var i = 0; i < param.length; i++) {
			param[i].animations.stop();
			param[i].destroy();
		}
		for(var i = 0; i < timeEvents.length; i++) {
			game.time.events.remove(timeEvents[i]);
		}
		timeEvents = [];
	}

	this.testAllAnimation = function() {
		game.world.removeAll();
		for(var i = 0; i < GAME_CONF.SPIN_NUMBER / 5 + 1; i++) {
			for(var k = 0; k < 5; k++) {
				var index = i * 5 + k;
				if(index >= GAME_CONF.SPIN_NUMBER)
					break;
				var iX = 400 + 200 * k; iY = 500 + 200 * i;
				var offsetX = 0; //g_spinConfig[index].ani_offsetX;
				var offsetY = 0; //g_spinConfig[index].ani_offsetY;
				if(g_spinConfig[index].ani_offsetX)
					offsetX = g_spinConfig[index].ani_offsetX;
				if(g_spinConfig[index].ani_offsetY)
					offsetY = g_spinConfig[index].ani_offsetY;
				var sprite1 = game.add.sprite(iX, iY, 'spin' + index);
				sprite1.anchor.setTo(0.5, 0.5);
				var sprite = game.add.sprite(iX + offsetX, iY + offsetY, 'icon_ani' + index);
				sprite.anchor.setTo(0.5, 0.5);
				sprite.animations.add('animation');
				sprite.visible = true;
				sprite.animations.play('animation', 15, false);

				sprite1.inputEnabled = true;
				sprite1.events.onInputDown.add(function(){
					sprite.visible = true;
					sprite.animations.play('animation', 15, false);
				});
				sprite.events.onAnimationComplete.add(function(){
					sprite.visible = false;
				});
			}
		}
	}

	this.testAnimation = function(index, visible) {
		game.world.removeAll();
		var offsetX = g_spinConfig[index].ani_offsetX;
		var offsetY = g_spinConfig[index].ani_offsetY;
		if(!offsetX)
			offsetX = 0;
		if(!offsetY)
			offsetY = 0;

		var iX = 800, iY = 700;
		var style1 = { font: "26px Arial", fontWeight: "bold", fill: "#ffffff", wordWrap: false, boundsAlignH: "center" };
		var txtIndex = game.add.text(iX - 200, iY + 10, index, style1);
		txtIndex.anchor.setTo(0.5, 0.5);
		var txtOffsetX = game.add.text(iX + 200, iY + 10, offsetX, style1);
		txtOffsetX.anchor.setTo(0.5, 0.5);
		var txtOffsetY = game.add.text(iX + 200, iY + 50, offsetY, style1);
		txtOffsetY.anchor.setTo(0.5, 0.5);
		var sprite1 = game.add.sprite(iX, iY, 'spin' + index);
		sprite1.anchor.setTo(0.5, 0.5);

		var sprite = game.add.sprite(iX, iY, 'icon_ani' + index);
		if(game.device.iOS && g_spinConfig[index].ani_scale == 2) {
			sprite.scale.setTo(2, 2);
		}
		sprite.anchor.setTo(0.5, 0.5);
		sprite.position.setTo(iX + offsetX, iY + offsetY);
		sprite.animations.add('animation');
		sprite.visible = false;
		sprite1.inputEnabled = true;
		sprite1.events.onInputDown.add(function(){
			sprite.visible = true;
			sprite.animations.play('animation', 25, false);
		});
		sprite.events.onAnimationComplete.add(function(){
			sprite.visible = visible;
		});
		game.input.keyboard.onUpCallback = function( e ){
			// if(e.keyCode == Phaser.Keyboard.PAGE_UP) {
			// 	index++;
			// }
			// else if(e.keyCode == Phaser.Keyboard.PAGE_UP) {
			// 	index--;
			// }
			if(e.keyCode == Phaser.Keyboard.LEFT) {
				offsetX--;
			}
			else if(e.keyCode == Phaser.Keyboard.RIGHT) {
				offsetX++;
			}
			else if(e.keyCode == Phaser.Keyboard.UP) {
				offsetY--;
			}
			else if(e.keyCode == Phaser.Keyboard.DOWN) {
				offsetY++;
			}
			txtOffsetX.text = offsetX;
			txtOffsetY.text = offsetY;
			sprite.position.setTo(iX + offsetX, iY + offsetY);
		}
	}

	this.init();
}

function getSymbolPosition(row, col) {
	row += (g_confReel[col].num - GAME_CONF.ROW_NUM);
	var pos = {
		x: g_confReel[col].x + GAME_CONF.ICON_WIDTH * 0.5 + GAME_CONF.SPINVIEW_XOFFSET,
		y: g_confReel[col].y + GAME_CONF.ICON_HEIGHT * row + GAME_CONF.ICON_HEIGHT * 0.5 + GAME_CONF.SPINVIEW_YOFFSET,
	}
	return pos;
}