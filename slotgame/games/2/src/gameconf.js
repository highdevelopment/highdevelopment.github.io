/*****************************************************
	Description 	: Game Configure
	Created 		: 2016/08/01
	Copyright		: 2016
******************************************************/

const GAME_CONF = {};
GAME_CONF.GAME_INDEX		= 2;
GAME_CONF.PAY_LINE_NUM		= 50;

GAME_CONF.TOOLBAR_LEFT		= 608;
GAME_CONF.TOOLBAR_TOP		= 774;

GAME_CONF.SPINVIEW_X		= 608;
GAME_CONF.SPINVIEW_Y		= 384;
GAME_CONF.SPINVIEW_WIDTH	= 673;
GAME_CONF.SPINVIEW_HEIGHT	= 391;

GAME_CONF.SPINVIEW_XOFFSET	= 0;
GAME_CONF.SPINVIEW_YOFFSET	= -4;
GAME_CONF.ICON_WIDTH		= 134;
GAME_CONF.ICON_HEIGHT		= 130;

GAME_CONF.INIT_SPIN_NUM 	= 10;
GAME_CONF.ADD_SPIN_NUM		= 6;

GAME_CONF.PAYTABLE_NUM		= 2;
GAME_CONF.BACK_COLOR		= 0x1d0d21;


g_confReel = [
	{
		x: 0,
		y: 4,
		num: 3,
	},
	{
		x: 135,
		y: 4,
		num: 3,
	},
	{
		x: 270,
		y: 4,
		num: 3,
	},
	{
		x: 405,
		y: 4,
		num: 3,
	},
	{
		x: 540,
		y: 4,
		num: 3,
	},
];

GAME_CONF.ROW_NUM			= 3;

GAME_CONF.SYMBOL_WILD		= 11;
GAME_CONF.SYMBOL_BONUS		= 0;
GAME_CONF.SYMBOL_SCATTER	= 0;

g_spinConfig = [
	{
		index: 0,
		type: 'fast cash',
		length: 1,
		ani_offsetX: -6,
		ani_offsetY: -6,
	},
	{
		index: 1,
		type: 'scatter',
		length: 1,
		ani_offsetX: 2,
		ani_offsetY: 2,
	},
	{
		index: 2,
		type: 'stacked',
		length: 1,
		ani_offsetX: -4,
		ani_offsetY: -6,
	},
	{
		index: 3,
		type: 'symbol',
		length: 1,
		ani_offsetX: -4,
		ani_offsetY: -4,
	},
	{
		index: 4,
		type: 'symbol',
		length: 1,
		ani_offsetX: 0,
		ani_offsetY: 1,
	},
	{
		index: 5,
		type: 'symbol_E',
		length: 1,
		ani_offsetX: 2,
		ani_offsetY: 2,
	},
	{
		index: 6,
		type: 'symbol_L',
		length: 1,
		ani_offsetX: 2,
		ani_offsetY: 2,
	},
	{
		index: 7,
		type: 'symbol_V',
		length: 1,
		ani_offsetX: 2,
		ani_offsetY: 2,
	},
	{
		index: 8,
		type: 'symbol_I',
		length: 1,
		ani_offsetX: 2,
		ani_offsetY: 0,
	},
	{
		index: 9,
		type: 'symbol_S',
		length: 1,
		ani_offsetX: -4,
		ani_offsetY: -4,
	},
	{
		index: 10,
		type: 'Stack_Wild',
		length: 1,
		ani_offsetX: 0,
		ani_offsetY: 4,
	},
];

GAME_CONF.SPIN_NUMBER		= g_spinConfig.length;

GAME_CONF.PAY_LINE_NUM		= 50;

var g_confPayLine = {
	xPos: 0,
	yPos: -105,
	scaleX: 0.905,
	scaleY: 0.93,
};

var g_confMovies = [
	{
		index: 0,
		num: 67,
	},
	{
		index: 1,
		num: 60,
	},
	{
		index: 2,
		num: 68,
	},
	{
		index: 3,
		num: 63,
	},
	{
		index: 4,
		num: 71,
	},
	{
		index: 5,
		num: 55,
	},
];


var g_confMatchEffect = [
	{
		reel_index: 0,
		indexs: [5, 5, 5],
		key: 'animtion_effect_e',
	},	
	{
		reel_index: 1,
		indexs: [6, 6, 6],
		key: 'animtion_effect_l',
	},
	{
		reel_index: 2,
		indexs: [7, 7, 7],
		key: 'animtion_effect_v',
	},
	{
		reel_index: 3,
		indexs: [8, 8, 8],
		key: 'animtion_effect_i',
	},
	{
		reel_index: 4,
		indexs: [9, 9, 9],
		key: 'animtion_effect_s',
	},
]