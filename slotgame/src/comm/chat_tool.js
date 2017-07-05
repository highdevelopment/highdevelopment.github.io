/*****************************************************
	Description 	: Chat
	Created 		: 2016/08/01
	Copyright		: 2016
******************************************************/

//Chat
var CChatTool = function(game)
{
	var main = this;
	var group = null;
	var background = null;
	var btnOpen = null;
	var list = null;
	// var list_back;

	this.init = function(game) {
		list = game.add.image(0, 0, 'toolbar_list');
		list.visible = false;
		list.scale.y = 0.01

		// group = game.add.group();
		background = game.add.sprite(300, 300, 'tool_chat');
		background.inputEnabled = true;
		background.input.enableDrag(true);

		background.events.onDragStart.add(this.onDragStart);
		background.events.onDragUpdate.add(this.onDragUpdate);
		// background.events.onDragStop.add(this.dragStop);
		// group.add(background);

		btnOpen = game.add.button(147, 0, 'btn_chatopen', this.onBtnChatOpen, this, 0, 0, 0);
		// group.add(btn_chatopen);
		// group.position.setTo(200, 160);
		this.reLayout();

		// list = game.add.group();
		// list_back = list.create(0, 0, 'list_back');
		// list.visible = false;
		// for(var i = 0; i < 4; i++) {
		// 	var list_item = game.add.image(0, 104 * i, 'list_item');
		// 	list.add(list_item);
		// }
		//$('#chatting').css('display', 'block');
		this.rePositionChat();
		this.reLayout();
	}

	this.onDragUpdate = function() {
		main.reLayout();
		main.rePositionChat();
	}

	this.onDragStart = function() {
		// $('#chatting').css('display', 'none');
		list.visible = false;
	}

	this.reLayout = function() {
		btnOpen.x = background.x + 148;
		btnOpen.y = background.y;
	}

	this.rePositionChat = function() {
		var screenWidth = $(window).width();
		var screenHeight = $(window).height();
		var position = $('canvas').offset();
		var x = background.x / game.scale.scaleFactor.x + position.left - 7;
		var y = (background.y + background.height - game.world.bounds.y) / game.scale.scaleFactor.y + position.top - 7;

		if(x < 0) {
			x = 0;
			background.x = (x + 7 - position.left) * game.scale.scaleFactor.x;
			this.reLayout();
		}
		else if(x > screenWidth - background.width - 30) {
			x = screenWidth - background.width - 30;
			background.x = (x + 7 - position.left) * game.scale.scaleFactor.x;
			this.reLayout();
		}

		if(y < 0) {
			y = 0;
			background.y = (y + 7 - position.top) * game.scale.scaleFactor.y + game.world.bounds.y - background.height;
			this.reLayout();
		}
		else if(y > screenHeight - background.height - 30) {
			y = screenHeight - background.height - 30;
			background.y = (y + 7 - position.top) * game.scale.scaleFactor.y + game.world.bounds.y - background.height;
			this.reLayout();
		}

		if(game.state.current == 'Lobby') {
			$(document).trigger('chat_tool', {type:'rePositionChat', x:x, y:y});
		}
		else {
			parent.$(parent.document).trigger('chat_tool', {type:'rePositionChat', x:x, y:y});
		}
	}

	this.onBtnChatOpen = function() {
		// if(list.scale.y < 1) {
		// 	list.position.x = background.x;
		// 	list.position.y = background.y;
		// 	// list.width = background.width;
		// 	// list_back.height = 10;
		// 	list.visible = true;
		// 	list.scale.y = 0.01;
		// 	game.add.tween(list.scale).to({y: 1}, 200, Phaser.Easing.Linear.None, true, 0, 0);
		// }
		// else
		// {
		// 	list.scale.y = 0.01;
		// 	list.visible = false;
		// }
		if(game.state.current == 'Lobby') {
			$(document).trigger('chat_tool', {type:'chat_show'});
		}
		else {
			parent.$(parent.document).trigger('chat_tool', {type:'chat_show'});
		}
		this.rePositionChat();
	}

	this.init(game);
}