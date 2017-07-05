/*****************************************************
	Description 	: Define Global Variable
	Created 		: 2016/08/12
******************************************************/

//Define literals
var AG_SPINNUMBER				= 16;
var AG_START_Y					= 421;
var AG_IMAGE_HEIGHT				= 135;
var AG_MAX_LINES				= 100;

var AG_SPINARRAY 				= [	'symbol_01', 'symbol_02', 'symbol_03', 'symbol_04', 'symbol_05', 'symbol_06', 'symbol_07', 'symbol_08', 'symbol_09', 'symbol_10',
									'symbol_11', 'symbol_12', 'symbol_13', 'symbol_14', 'symbol_scatter', 'symbol_wild'];

var agSpinImgArr				= [	'symbol_01', 'symbol_02', 'symbol_03', 'symbol_04', 'symbol_05', 'symbol_06', 'symbol_07', 'symbol_08', 'symbol_09', 'symbol_10',
									'symbol_11', 'symbol_12', 'symbol_13', 'symbol_14', 'symbol_scatter', 'symbol_wild'];

var agSpinAnimArr 				= [	'symbol_01_anim', 'symbol_02_anim', 'symbol_03_anim', 'symbol_04_anim', 'symbol_05_anim', 'symbol_06_anim', 'symbol_07_anim', 'symbol_08_anim', 'symbol_09_anim', 'symbol_10_anim',	
									'symbol_11_anim', 'symbol_12_anim', 'symbol_13_anim', 'symbol_14_anim', 'symbol_scatter_anim', 'symbol_wild_anim' ];

var agLineImgArr				= [ 'payline1', 'payline2', 'payline3', 'payline4', 'payline5', 'payline6', 'payline7', 'payline8', 'payline9', 'payline10',
									'payline11', 'payline12', 'payline13', 'payline14', 'payline15', 'payline16', 'payline17', 'payline18', 'payline19', 'payline20',
									'payline21', 'payline22', 'payline23', 'payline24', 'payline25', 'payline26', 'payline27', 'payline28', 'payline29', 'payline30',
									'payline31', 'payline32', 'payline33', 'payline34', 'payline35', 'payline36', 'payline37', 'payline38', 'payline39', 'payline40',
									'payline41', 'payline42', 'payline43', 'payline44', 'payline45', 'payline46', 'payline47', 'payline48', 'payline49', 'payline50',
									'payline51', 'payline52', 'payline53', 'payline54', 'payline55', 'payline56', 'payline57', 'payline58', 'payline59', 'payline60',
									'payline61', 'payline62', 'payline63', 'payline64', 'payline65', 'payline66', 'payline67', 'payline68', 'payline69', 'payline70',
									'payline71', 'payline72', 'payline73', 'payline74', 'payline75', 'payline76', 'payline77', 'payline78', 'payline79', 'payline80',
									'payline81', 'payline82', 'payline83', 'payline84', 'payline85', 'payline86', 'payline87', 'payline88', 'payline89', 'payline90',
									'payline91', 'payline92', 'payline93', 'payline94', 'payline95', 'payline96', 'payline97', 'payline98', 'payline99', 'payline100'];
var agLoadingbar				= null;


//Define View Groups
var agAutoView					= null;
var agLineView					= null;
var agSetView					= null;
var agPTView					= null;
var agTitleView					= null;

//Define Values for Spinning
var agSpinCounter 				= 0;
var agIsAuto					= false;
var agIsFree					= false;
var agScatterCounter			= 0;
var agResponseObj				= null;

//Define Action
var agActor						= null;

//Define Reels
var agReelFst 					= null;
var agReelSnd					= null;
var agReelThr					= null;
var agReelFur					= null;
var agReelFiv					= null;
var agReelArr					= null;
var reelXArr					= null;

function getNumberIndex(spec) {
	if(spec == "w") {
		return 16;
	} else if(spec == "s") {
		return 15;
	}

	return spec;
}