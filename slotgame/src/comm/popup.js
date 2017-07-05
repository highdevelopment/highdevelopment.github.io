/*****************************************************
	Description 	: Customized PopupMenu
	Created 		: 2016/08/12
	Copyright		: 2016
******************************************************/



var CPopupMenu = function(game, x, y, yOffset, item_height, callback, aVals, style) {
	var main = this;

	this.init = function() {
	    Phaser.Group.call(this, game);
		this.x = x, this.y = y;

		var back = this.create(0, 0, 'popupmenu_back');
		// back.anchor.setTo(0, 0);
		for(var i = 0; i < aVals.length; i++) {
			var btnItem = new CLabelButton(game, back.width * 0.5, i * item_height + yOffset, 'popupmenu_item', aVals[i], style, this.onBtnItem, this, 1, 0, 0);
			this.add(btnItem);
			btnItem.index = i;
		}
		this.visible = false;
	}
	main.onBtnItem = function(item) {
		callback(item.index);
	}
	this.init();
};

CPopupMenu.prototype = Object.create(Phaser.Group.prototype);
CPopupMenu.prototype.constructor = CPopupMenu;

CPopupMenu.prototype.showMenu = function() {
	this.visible = true;
}

CPopupMenu.prototype.hideMenu = function() {
	this.visible = false;
}

CPopupMenu.prototype.toggleMenu = function() {
	this.visible = !this.visible;
}
