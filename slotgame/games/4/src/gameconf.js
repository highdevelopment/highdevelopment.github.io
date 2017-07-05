/*****************************************************
	Description 	: Game Configure
	Created 		: 2016/08/01
	Copyright		: 2016
******************************************************/

const GAME_CONF = {};
GAME_CONF.GAME_INDEX		= 4;
GAME_CONF.PAY_LINE_NUM		= 50;

GAME_CONF.TOOLBAR_LEFT		= 608;
GAME_CONF.TOOLBAR_TOP		= 780;

GAME_CONF.SPINVIEW_X		= 612;
GAME_CONF.SPINVIEW_Y		= 382;
GAME_CONF.SPINVIEW_WIDTH	= 685;
GAME_CONF.SPINVIEW_HEIGHT	= 400;

GAME_CONF.SPINVIEW_XOFFSET	= 0;
GAME_CONF.SPINVIEW_YOFFSET	= -2;
GAME_CONF.ICON_WIDTH		= 135;
GAME_CONF.ICON_HEIGHT		= 134;

GAME_CONF.INIT_SPIN_NUM 	= 25;
GAME_CONF.ADD_SPIN_NUM		= 15;

GAME_CONF.PAYTABLE_NUM		= 3;
GAME_CONF.BACK_COLOR		= 0x9ef0fe;

g_confReel = [
	{
		x: 0,
		y: 0,
		num: 3,
	},
	{
		x: 138,
		y: 0,
		num: 3,
	},
	{
		x: 270,
		y: 0,
		num: 3,
	},
	{
		x: 410,
		y: 0,
		num: 3,
	},
	{
		x: 544,
		y: 0,
		num: 3,
	},
];
GAME_CONF.ROW_NUM			= 3;
GAME_CONF.SYMBOL_WILD		= 3;
GAME_CONF.SYMBOL_BONUS		= 1;
GAME_CONF.SYMBOL_SCATTER	= 2;


g_spinConfig = [
	{
		index: 0,
		type: 'bonus',
		length: 1,
		ani_offsetX: 2,
		ani_offsetY: 3,
	},
	{
		index: 1,
		type: 'scatter',
		length: 1,
		ani_scale: 2,
		ani_offsetX: -6,
		ani_offsetY: 1,
	},
	{
		index: 2,
		type: 'wild pays',
		length: 2,
		ani_scale: 2,
		ani_offsetX: -6,
		ani_offsetY: 0,
	},
	{
		index: 3,
		type: 'wild gusher',
		length: 1,
		ani_offsetX: -6,
		ani_offsetY: -4,
	},
	{
		index: 4,
		type: 'symbol',
		length: 1,
		ani_scale: 2,
		ani_offsetX: 0,
		ani_offsetY: 6,
	},
	{
		index: 5,
		type: 'symbol',
		length: 1,
		ani_scale: 2,
		ani_offsetX: 4,
		ani_offsetY: 4,
	},
	{
		index: 6,
		type: 'symbol',
		length: 1,
		ani_offsetX: 6,
		ani_offsetY: -6,
	},
	{
		index: 7,
		type: 'symbol',
		length: 1,
		ani_scale: 2,
		ani_offsetX: 2,
		ani_offsetY: 2,
	},
	{
		index: 8,
		type: 'symbol',
		length: 1,
		ani_offsetX: 4,
		ani_offsetY: 6,
	},
	{
		index: 9,
		type: 'symbol',
		length: 1,
		ani_offsetX: 4,
		ani_offsetY: 6,
	},
	{
		index: 10,
		type: 'symbol',
		length: 1,
		ani_offsetX: 4,
		ani_offsetY: 6,
	},
	{
		index: 11,
		type: 'symbol',
		length: 1,
		ani_offsetX: 0,
		ani_offsetY: 6,
	},
]


GAME_CONF.SPIN_NUMBER		= g_spinConfig.length;


var g_confPayLine = {
	xPos: 0,
	yPos: -115,
	scaleX: 0.905,
	scaleY: 0.93,
};