/*****************************************************
	Description 	: Customized Button
	Created 		: 2016/08/01
	Copyright		: 2016
******************************************************/

var ClassSlider = function (game, x, y, callback, callbackContext, curVal)
{
	var main = this;
	this.value = curVal;
	this.bar;
	this.head;
	this.init = function() {
	    Phaser.Group.call(this, game);
	    this.bar = game.make.image(0, 0, 'slider_bar');
		this.add(this.bar);
	    this.bar.anchor.setTo(0, 0.5);

	    for(var i = 0; i < LOBBY_SCROLL_NUM; i++) {
			var btn = game.make.button(this.getPosition(i), 0, 'slider_btn', this.onSliders, this, 0, 1, 2);
			btn.index = i;
			btn.anchor.setTo(0.5, 0.5);
			this.add(btn);
		}

	    // this.head = game.make.sprite(0, 0, 'slider_head');
	    this.head = game.make.button(0, 0, 'slider_head', this.onBtnHead, this, 0, 0, 0);
		// this.bar.events.onInputDown.add(this.onDownSlider, this);
		// this.head.events.onInputUp.add(this.onUpSlider, this);
		this.head.inputEnabled = true;
		this.head.input.enableDrag(true);
		// this.head.events.onDragStart.add(dragStart);
		this.head.events.onDragUpdate.add(main.onDragUpdateHead);
		// this.head.events.onDragStop.add(dragStop);
	    this.head.anchor.setTo(0.5, 0.5);
	    this.add(this.head);


		this.x = x, this.y = y;
	}
	this.setSiderVal = function(value, animation) {
		// this.head.x = this.getPosition(this.value);
		var tween = game.add.tween(this.head).to({x: this.getPosition(value)}, 300, Phaser.Easing.Quadratic.In, true, 0, 0);
		tween.onComplete.add(this.onCompleteTween, this);
		// callbackContext.onSliderChange(value);
		if(animation)
			callback(value);
		this.value = value;
	}

	this.onCompleteTween = function() {
	}

	this.onSliders = function(btn) {
		this.setSiderVal(btn.index, true);
	}

	main.onDragUpdateHead = function(sprite, pointer, dragX, dragY, snapPoint) {
		if(sprite.x < main.getPosition(0))
			sprite.x = main.getPosition(0);
		else if(sprite.x >= main.getPosition(LOBBY_SCROLL_NUM - 1))
			sprite.x = main.getPosition(LOBBY_SCROLL_NUM - 1);
		sprite.y = 0;

		var value = -1;
		for(var i = 0; i < LOBBY_SCROLL_NUM; i++) {
			var pos = main.getPosition(i)
			if(Math.abs(sprite.x - pos) < 6) {
				value = i;
				break;
			}
		}
		if(value >= 0) {
			this.value = value;
			callback(value);
		}
	}

	this.onBtnHead = function() {
	}

	this.onDragHead = function() {
	}

	this.getPosition = function(index) {
		return 20 + 24 * index;
	}

	this.init();
};

ClassSlider.prototype = Object.create(Phaser.Group.prototype);
ClassSlider.prototype.constructor = ClassSlider;
