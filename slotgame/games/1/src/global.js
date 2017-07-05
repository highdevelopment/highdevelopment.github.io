/*****************************************************
	Description 	: Global Values
	Created 		: 2016/07/18
******************************************************/

var WHOLE_WIDTH 	= 800;
var WHOLE_HEIGHT 	= 600;
var GAME_WIDTH		= 660; 
var GAME_HEIGHT		= 480;
var LINE_NUMBER		= 15;
var START_Y			= 386;
var IMAGE_HEIGHT	= 140;

var game 			= null;
var balanceValue 	= 5000;
var linesValue 		= 30;
var betValue 		= 5;
var totalValue 		= 150;
var winValue 		= 0;

var seperateImg		= null;

//loading
var loadingBar		= null;

//Spinning
var spinning 		= false;
var isStarted 		= false;
var isAuto			= false;

var timer			= null;
var startedTime 	= -1;

//buttons
var btnArr 			= new Array();
var paytable		= null;
var autoBtn			= null;
var spinBtn 		= null;
var totalBetBtn		= null;
var betIncreaseBtn	= null;
var betDecreaseBtn	= null;
var lineIncreaseBtn	= null;
var lineDecreaseBtn	= null;

//Texts
var balanceValueText= null;
var linesValueText	= null;
var betValueText	= null;
var totalValueText	= null;
var winValueText	= null;
var spinBtnText 	= null;

//ReelGroup
var spinNumber 		= 12;
var reelFst 		= null;
var reelSnd 		= null;
var reelThr 		= null;
var reelFur 		= null;
var reelFiv 		= null;


var spinCounter 	= 1;

//Payview
var payView			= null;
//LineView
var lineDraw		= null;
//Popup
var autoMenu		= null;

//font style value
var lblStyle		= null;
var txtStyle		= null;
var btnStyle		= null;
var btnDisStyle		= null;

var SPINARRAY 	= [	'symbol_1',
					'symbol_2',
					'symbol_3',
					'symbol_4',
					'symbol_5',
					'symbol_6',
					'symbol_7',
					'symbol_8',
					'symbol_9',
					'symbol_10',
					'symbol_11',
					'symbol_12'
];

var spinImgArr 	= [	'symbol_1',
					'symbol_2',
					'symbol_3',
					'symbol_4',
					'symbol_5',
					'symbol_6',
					'symbol_7',
					'symbol_8',
					'symbol_9',
					'symbol_10',
					'symbol_11',
					'symbol_12'
];

var spinAnimArr = [	'symbol_1_anim',
					'symbol_2_anim',
					'symbol_3_anim',
					'symbol_4_anim',
					'symbol_5_anim',
					'symbol_6_anim',
					'symbol_7_anim',
					'symbol_8_anim',
					'symbol_9_anim',
					'symbol_10_anim',
					'symbol_11_anim',
					'symbol_12_anim'
];

var noAnimationArr = [2, 3, 4, 8, 9];

var payLineArr 	= [ 'payline1',
					'payline2',
					'payline3',
					'payline4',
					'payline5',
					'payline6',
					'payline7',
					'payline8',
					'payline9',
					'payline10',
					'payline11',
					'payline12',
					'payline13',
					'payline14',
					'payline15',
					'payline16',
					'payline17',
					'payline18',
					'payline19',
					'payline20',
					'payline21',
					'payline22',
					'payline23',
					'payline24',
					'payline25',
					'payline26',
					'payline27',
					'payline28',
					'payline29',
					'payline30'
];

var noWinArr	= [ 'res=true&win=false&pattern=[[3,2,7,6,4],[1,7,4,6,2],[1,6,8,7,6]]&money=-1&bonus=false&bonus_prize=-1',
					'res=true&win=false&pattern=[[1,7,5,2,2],[1,3,7,5,2],[4,3,2,6,5]]&money=-1&bonus=false&bonus_prize=-1',
					'res=true&win=false&pattern=[[1,4,2,2,2],[6,5,2,4,2],[7,2,2,4,3]]&money=-1&bonus=false&bonus_prize=-1',
					'res=true&win=false&pattern=[[3,4,5,4,5],[3,1,2,7,1],[8,1,6,4,1]]&money=-1&bonus=false&bonus_prize=-1',
					'res=true&win=false&pattern=[[6,4,3,4,4],[7,5,3,4,1],[2,3,5,4,1]]&money=-1&bonus=false&bonus_prize=-1'
];

var responseObj = null;

/******************
** BONUS SESSION **
******************/
var bonuswinValue	= 0;
var totalWinValue 	= 0;

var startBonusBtn	= null;
var bonusloadingBar	= null;

var bonusquestbg	= null;
var startbonusbg	= null;
var startBonusGr	= null;
var animalBonusGr	= null;
var multiBonusGr	= null;
var finalBonusGr	= null;

var remainText		= null;
var totalwinText	= null;
var totalWinLabel	= null;
var calculatingLabel= null;

var coverArr		= [	'bonus_quest_cover_sprite01',
						'bonus_quest_cover_sprite02',
						'bonus_quest_cover_sprite03',
						'bonus_quest_cover_sprite04',
						'bonus_quest_cover_sprite05',
						'bonus_quest_cover_sprite06',
						'bonus_quest_cover_sprite07',
						'bonus_quest_cover_sprite08',
						'bonus_quest_cover_sprite09',
						'bonus_quest_cover_sprite10',
						'bonus_quest_cover_sprite11',
						'bonus_quest_cover_sprite12'
];

var keyArr			= [	'bonus_key_sprite_001',
						'bonus_key_sprite_002',
						'bonus_key_sprite_003',
						'bonus_key_sprite_004'
];

var boxArr			= [	'bonus_quest_box01',
						'bonus_quest_box02',
						'bonus_quest_box03',
						'bonus_quest_box04'
];

var coffinArr		= ['coffin-left-sprite', 'coffin-center-sprite', 'coffin-right-sprite'];
var coffinWArr		= [242, 187, 249];
var coffinHArr		= [340, 340, 340];
var coffinXArr		= [34, 292, 488];
var coffinYArr		= [248, 262, 262];
var multiValueArr	= [1, 2, 3];
var multiValue 		= 0;
var coffinViewArr	= new Array();

var multiValueText 	= null;
var multiWinText	= null;

var boxValueArr		= [1, 2, 3, 4];

var coverXArr		= [	119, 256, 390, 527, 123, 255, 387, 521, 110, 257, 389, 532];
var coverYArr		= [	93, 85, 85, 90, 228, 230, 229, 230, 365, 373, 372, 364];
var coverClassArr	= new Array();
var keyValueArr		= new Array();
var coverValueArr	= new Array();
var prizebg			= null;

var animalArr		= [	'animal_sprite01',
						'animal_sprite02',
						'animal_sprite03',
						'animal_sprite04',
						'animal_sprite05',
						'animal_sprite06',
						'animal_sprite07',
						'animal_sprite08',
						'animal_sprite09',
						'animal_sprite10'
];

var animalXArr		= [-2, 230, 136, 24, 30, 676, 334, 558, 644, 404];
var animalYArr		= [102, 180, 244, 220, 392, 174, 274, 250, 254, 334];
var animalWidthArr	= [90, 130, 130, 120, 340, 90, 160, 90, 120, 342];
var animalHeightArr = [180, 270, 236, 300, 210, 130, 230, 240, 242, 270];
var animalLimit		= 3	;
var animalViewArr	= new Array();
