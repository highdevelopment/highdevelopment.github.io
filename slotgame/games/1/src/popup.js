var popupMenu = function() {

	var main 		= this;
	var group 		= null;

	main.createMenu = function() {
		
		group = game.add.group();
		group.x = 1202;
		group.y = 748;
		
		var xmar = 5;
		var ymar = 5;
		var btnH = 23;

		var itemArr = ['200btn', '100btn', '50btn', '25btn', '10btn'];
		var valueArr = [200, 100, 50, 25, 10];

		group.create(0, 0, 'popupbg');
		for(var i = 0; i < 5; i++) {
			var item = group.create(xmar, ymar + i * btnH, itemArr[i]);
			item.inputEnabled = true;
			item.spincount = valueArr[i];
			item.events.onInputOver.add(autoCountOver);
			item.events.onInputOut.add(autoCountOut);
			item.events.onInputUp.add(autoCountClicked);
		}

		group.visible = false;
	}

	main.showMenu = function() {
		group.visible = true;
	}

	main.hideMenu = function() {
		group.visible = false;
	}

	function autoCountClicked(item, pointer) {
		spinCounter = item.spincount;
		isAuto = true;
		startSpinning();
	}
}