/*****************************************************
	Description 	:Paytable View
	Created 		: 2016/08/12
******************************************************/

var agPayTable = function() {

	var main = this;
	var viewX = 580;
	var viewY = 322;

	var tableIndex = 0;

	var tableX = 42;
	var tableY = 108;
	var lfont 		= { font: "32px marker", fill: '#5d1d00', boundsAlignH: "center", boundsAlignV: "middle"/*, stroke: "#5d1d00", strokeThickness: 1 */};

	var gr = game.add.group();
	gr.x = viewX;
	gr.y = viewY;
	var ptbg = gr.create(0, 0, 'agPayBg');
	ptbg.inputEnabled = true;

	//create tables
	var tables = game.make.image(tableX, tableY, 'agPayTables', tableIndex);
	gr.add(tables);

	var backButton = game.make.button(262, 527, 'agBackBtn', onClickBacktoGameBtn, this);
	setEventtoBtn(backButton);

	var backLbl = game.make.text(0, 0, "Back to Game", lfont);
    backLbl.setTextBounds(272, 558, 220, 40);
    gr.add(backLbl);

	var prevBtn = game.make.button(217, 546, 'agPt_prev', onClickedPrevTableBtn, this);
    setEventtoBtn(prevBtn);
    var nextBtn = game.make.button(486, 544, 'agPt_next', onClickedNextTableBtn, this);
    setEventtoBtn(nextBtn);

    gr.visible = false;

	function onClickBacktoGameBtn(button) {
		gr.visible = false;
	}

	function onClickedPrevTableBtn(button) {
		tableIndex--;
		if(tableIndex < 0) {
			tableIndex = 0;
		}

		setButtonStatus(tableIndex);		 
	}

	function onClickedNextTableBtn(button) {
		tableIndex++;
		if(tableIndex > 3) {
			tableIndex = 3;
		}

		setButtonStatus(tableIndex);		 
	}

	function setEventtoBtn(button) {
		button.inputEnabled = true;
		button.events.onInputOver.add(focusOver);
		button.events.onInputOut.add(focusOut);	
		gr.add(button);
	}

	function enableButton(button) {
		button.inputEnabled = true;
		button.frame = 0;
	}

	function disableButton(button) {
		button.inputEnabled = false;
		button.frame = 2;
	}	

	function setButtonStatus(tindex) {
		enableButton(nextBtn);
		enableButton(prevBtn);

		if(tindex == 0) {
			disableButton(prevBtn);
		} else if(tindex == 3) {
			disableButton(nextBtn);
		}

		tables.frame = tindex;
	}

	main.showPaytable = function() {
		gr.visible = true;
	}
}