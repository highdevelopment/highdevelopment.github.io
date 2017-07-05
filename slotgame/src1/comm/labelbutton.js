/*****************************************************
	Description 	: Customized Button
	Created 		: 2016/08/14
	Copyright		: 2016
******************************************************/

var CLabelButton = function(game, x, y, key, label, labelStyle, callback, callbackContext, overFrame, outFrame, downFrame, upFrame) {
	Phaser.Button.call(this, game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);
	//Style how you wish...
	this.anchor.setTo( 0.5, 0.5 );
	this.label = new Phaser.Text(game, 0, 3, label, labelStyle);    //puts the label in the center of the button
	this.label.anchor.setTo( 0.5, 0.5 );
	this.addChild(this.label);
	this.setLabel( label );
	//adds button to game
	game.add.existing( this );
};

CLabelButton.prototype = Object.create(Phaser.Button.prototype);
CLabelButton.prototype.constructor = CLabelButton;
CLabelButton.prototype.setLabel = function( label ) {
	this.label.setText(label);
};

CLabelButton.prototype.setLabelStyle = function(style) {
	this.style = style;
	this.label.style = style;
}