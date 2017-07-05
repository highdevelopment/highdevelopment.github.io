/*****************************************************
	Description 	: For Pay Table View&Controller
	Created 		: 2016/07/18
******************************************************/

var payTable = function () {

	var main 		= this;
	var viewX 		= 586;
	var viewY 		= 385;
	var paygroup 	= null; 
	var payview1	= null;
	var payview2	= null;
	var nextbtn		= null;
	var prevbtn		= null;
	var backgamebtn = null;
	
	main.createView = function() {
	
		paygroup = game.add.group();

		payview1 = paygroup.create(viewX, viewY, 'pay1');
		payview2 = paygroup.create(viewX, viewY, 'pay2');

		nextbtn = paygroup.create(viewX + 480, viewY + 398, 'next');
		// Enable input
		nextbtn.inputEnabled = true;
	    nextbtn.events.onInputUp.add(nextClicked);

		prevbtn = paygroup.create(viewX + 180, viewY + 400, 'prev');
		// Enable input
		prevbtn.inputEnabled = true;
		prevbtn.events.onInputUp.add(prevClicked);

		backgamebtn = paygroup.create(viewX + 260, viewY + 394, 'backtogame');
		// Enable input
	    backgamebtn.inputEnabled = true;
	    backgamebtn.events.onInputUp.add(backClicked);

		main.initPayView();
	}

	main.initPayView = function() {
		payview2.visible = false;
		nextbtn.frame = 0;
		prevbtn.frame = 1;

		paygroup.visible = false;
	}

	main.showView = function() {
		paygroup.visible = true;
	}

	function nextClicked(item, pointer) {
		if(item.frame == 0) { 
			item.frame = 1;
			prevbtn.frame = 0;

			payview2.visible = !payview2.visible;
		}
	}

	function prevClicked(item, pointer) {
		if(item.frame == 0) {
			item.frame = 1;
			nextbtn.frame = 0;

			payview2.visible = !payview2.visible;
		}
	}

	function backClicked(item, pointer) {
		main.initPayView();
	}

}

