/*****************************************************
	Description 	: For Group of each reel
	Created 		: 2016/08/12
******************************************************/

var agLineGroup = function() {

	var main = this;
	var objArr = new Array();

	var gr = game.add.group();
	gr.x = 600;
	gr.y = 300;

	for(var i = 0;  i < agLineImgArr.length; i++) {
		var obj = game.make.image(0, 0, agLineImgArr[i]);
		objArr.push(obj);
	}
	
	main.drawLines = function(lineId) {

		gr.removeAll();
		gr.x = 602;
		gr.y = 300;

		for(var i = 0; i < lineId; i++) {
			gr.add(objArr[i]);
		}
	}

	main.clearLines = function() {
		gr.removeAll();
	}
}