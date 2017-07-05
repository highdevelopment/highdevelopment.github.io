var agPopupMenu = function() {

	var main 		= this;
	var group 		= null;

	main.createMenu = function() {
		
		group = game.add.group();
		group.x = 1178;
		group.y = 754;
		
		var xmar = 5;
		var ymar = 5;
		var btnH = 23;

		var itemArr = ['ag200btn', 'ag100btn', 'ag50btn', 'ag25btn', 'ag10btn'];
		var valueArr = [200, 100, 50, 25, 10];

		group.create(0, 0, 'agPopupbg');
		for(var i = 0; i < 5; i++) {
			var item = group.create(xmar, ymar + i * btnH, itemArr[i]);
			item.inputEnabled = true;
			item.spincount = valueArr[i];
			item.events.onInputOver.add(focusOver);
			item.events.onInputOut.add(focusOut);
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
		agSpinCounter = item.spincount;
		agIsAuto = true;
		agActor.startSpinning();
	}
}