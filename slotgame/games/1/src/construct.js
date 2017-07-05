/*****************************************************
	Description 	: javascript functions 
	Created 		: 2016/07/18
******************************************************/

var WHOLE_WIDTH 		= 800;
var WHOLE_HEIGHT 		= 600;
var GAME_WIDTH			= 660; 
var GAME_HEIGHT			= 480;
var LINE_NUMBER			= 15;
var START_Y				= 387;
var IMAGE_HEIGHT		= 140;

var lineNumberArr = [
	4, 28, 2, 24, 20, 16, 10, 1, 11, 17, 13, 21, 3, 29, 5, 14, 26, 18, 12, 9, 22, 6, 30, 7, 23, 8, 19, 25, 27, 15 
];

var lineColorArr = ['0xffff01', '0x65ffac', '0xcc32cc', '0xff3200', '0x98cc01', '0xff98ff', '0x6633ff', '0x7eff6b', '0xc0ffb3', '0xff3265',
					'0x01cc00', '0x008b8c', '0xffb2b5', '0xff3200', '0xff6500', '0xffb600', '0x00ff86', '0x008900', '0x65d1ff', '0xfe65cb', 
					'0xe9ff78', '0xff3200', '0xff2ed0', '0x0098ff', '0xccff00', '0x98fe00', '0x00fff7', '0x8bf3f2', '0x00cda3', '0xff6666' ];
var LX0 = 618;
var LX1 = LX0 + IMAGE_HEIGHT / 2 - 4;
var LX2 = LX1 + IMAGE_HEIGHT - 4;
var LX3 = LX2 + IMAGE_HEIGHT - 4;
var LX4 = LX3 + IMAGE_HEIGHT - 4;
var LX5 = LX4 + IMAGE_HEIGHT - 4;
var LX6 = LX5 + IMAGE_HEIGHT / 2;

var lineGraph;
var LY = new Array();
LY[0] = 404;
var lineXPoints = new Array(); 
var lineYPoints = new Array();
var lineArr = new Array();
var stuffArr1 = new Array();
var stuffArr2 = new Array();
var stuffArr3 = new Array();
var stuffArr4 = new Array();
var stuffArr5 = new Array();

var lineBtnArr = new Array();
var reelX;
var reelY;


var background;
var balanceValueText;
var linesValueText;
var betValueText;
var totalValueText;
var winValueText;
var payLogoImg;

var paygroup;
var payview1;
var payview2;
var backgamebtn;
var nextbtn;
var prevbtn;

function gameCreate() {
	constructView();
	viewPayTable();
	spinning = false;
	initLinePointers();
	initPopupMenu();
}

function initPopupMenu() {
	popupGroup = game.add.group();
	popupGroup.x = 1202;
	popupGroup.y = 748;
	var xmar = 5;
	var ymar = 5;
	var btnH = 23;

	var itemArr = ['200btn', '100btn', '50btn', '25btn', '10btn'];
	var valueArr = [200, 100, 50, 25, 10];

	popupGroup.create(0, 0, 'popupbg');
	for(var i = 0; i < 5; i++) {
		var item = popupGroup.create(xmar, ymar + i * btnH, itemArr[i]);
		item.inputEnabled = true;
		item.spincount = valueArr[i];
		item.events.onInputOver.add(autoCountOver);
		item.events.onInputOut.add(autoCountOut);
		item.events.onInputUp.add(autoCountClicked);
	}

	popupGroup.visible = false;
}

function initReel() {
	//Create Reels
	
	createReelArr(/*group1, group2, group3, group4, group5*/);

	game.add.image(0, 0, 'topBg');
	game.add.image(0, 804, 'bottomBg');

	tween1 = game.add.tween(group1).to( { y: START_Y }, 800, "Linear", false, 0, 5);
	tween2 = game.add.tween(group2).to( { y: START_Y }, 800, "Linear", false, 0, 6);
	tween3 = game.add.tween(group3).to( { y: START_Y }, 800, "Linear", false, 0, 7);
	tween4 = game.add.tween(group4).to( { y: START_Y }, 800, "Linear", false, 0, 8);
	tween5 = game.add.tween(group5).to( { y: START_Y }, 800, "Linear", false, 0, 9);
}

function constructView() {
	// Initialize GameMachine Session

	
	// bg.scale.setTo(0.7, 0.7);

	initReel();
	
	
	
}


function stopTween(tween, group) {
	tween.stop();
	tween = game.add.tween(group);

	var mod = (Math.abs(group.y - START_Y)) % IMAGE_HEIGHT;
	tween.to({y: group.y + mod}, 500);
	// if(mod <= (IMAGE_HEIGHT / 2)) {
		// tween.to({y: group.y + mod}, 500);
	// } else {
	// 	tween.to({y: group.y - (IMAGE_HEIGHT - mod)}, 500);
	// }
	
	tween.start();
}

function copyArray( array ) {
    var copy = [];

    shuffleArray (array);

    for( var i = 0; i < array.length; i++) {
		copy.push(array[i]);
    }
    
    for(var i = 0; i < 3; i++) {
    	copy.push( array[i]);
    }
    
    return copy;
}

function shuffleArray( array ) {

    for (i = array.length - 1; i > 0; i--) {
		var j = parseInt(Math.random() * i)
		var tmp = array[i];
		array[i] = array[j];
		array[j] = tmp;
    }
}

function shuffleGroup( group ) {

    for (i = group.length - 1; i > 0; i--) {
		var j = parseInt(Math.random() * i)
		var tmp = group[i];
		group[i] = group2[j];
		group[j] = tmp;
    }
}
