/*****************************************************
	Description 	: Game Resource Manager
	Created 		: 2016/08/01
	Copyright		: 2016
******************************************************/


var arry_resource = [
	{
		type: 'image',
		key: 'game_back',
		src: 'assets/image/background/bg.jpg',
	},
	// {
	// 	type: 'image',
	// 	key: 'game_back1',
	// 	src: 'assets/image/background/bg_1.jpg',
	// },

	// Main View
	{
		type: 'image',
		key: 'pay_button',
		src: 'assets/image/game/pay_table.png',
	},
	{
		type: 'sprite',
		key: 'leftspin_button',
		src: 'assets/image/game/left_spin.png',
	},
	{
		type: 'sprite',
		key: 'rightspin_button',
		src: 'assets/image/game/right_spin.png',
	},
	{
		type: 'image',
		key: 'good_luck',
		src: 'assets/image/game/goodluck.png',
	},
	{
		type: 'sprite',
		key: 'max_bet_button',
		src: 'assets/image/game/max_bet.png',
		width: 107,
		height: 45,
		num: 3,
	},
	{
		type: 'sprite',
		key: 'btn_auto',
		src: 'assets/image/game/btn_auto.png',
		width: 107,
		height: 46,
		num: 3,
	},
	{
		type: 'sprite',
		key: 'btn_auto_stop',
		src: 'assets/image/game/btn_auto_stop.png',
		width: 107,
		height: 46,
		num: 3,
	},
	{
		type : "image",
		key : "btn_spin",
		src : "assets/image/game/btn_spin.png",
	},
	{
		type : "image",
		key : "btn_text_spin",
		src : "assets/image/game/btn_text_spin.png",
	},
	{
		type : "image",
		key : "btn_text_stop",
		src : "assets/image/game/btn_text_stop.png",
	},

	// Pay table
	{
		type: 'images',
		key: 'pay_back_',
		src: 'assets/image/pay/payback_',
		ext: 'png',
		num: GAME_CONF.PAYTABLE_NUM,
	},
	{
		type: 'image',
		key: 'btn_back_game',
		src: 'assets/image/pay/btn_back.png',
	},
	{
		type: 'sprite',
		key: 'btn_pay_left',
		src: 'assets/image/pay/btn_pay_left.png',
	},
	{
		type: 'sprite',
		key: 'btn_pay_right',
		src: 'assets/image/pay/btn_pay_right.png',
	},

	// Slot images
	{
		type: 'images',
		key: 'spin',
		src: 'assets/image/symbol/symbol_',
		ext: 'png',
		num: GAME_CONF.SPIN_NUMBER,
	},
	{
		type: 'image',
		key: 'border',
		src: 'assets/image/symbol/border.png',
	},
	{
		type: 'images',
		key: 'payline',
		src: 'assets/image/paylines/payline',
		ext: 'png',
		num: GAME_CONF.PAY_LINE_NUM,
	},
	{
		type: 'sprites',
		key: 'icon_ani',
		src: 'assets/image/anim/',
		num: 12,
		ext: 'png',
		props: [
			{ width: 188, height: 184, num: 72 },	//1
			{ width: 322, height: 260, num: 72},	//2
			{ width: 242, height: 288, num: 72 },	//3
			{ width: 226, height: 228, num: 28 },
			{ width: 240, height: 270, num: 72 },
			{ width: 236, height: 236, num: 72 },
			{ width: 220, height: 194, num: 72 },	//7
			{ width: 234, height: 234, num: 72 },
			{ width: 124, height: 142, num: 36 },	//9
			{ width: 124, height: 142, num: 36 },	//10
			{ width: 124, height: 142, num: 36 },
			{ width: 128, height: 142, num: 36 },	//12
		]
	},

	// Audios
	{
		type : "audio",
		key : "game_audio",
		src : "assets/audio/game_audio.mp3",
	},
	// {
	// 	type : "audio",
	// 	key : "audio_reels",
	// 	src : "assets/audio/reels.mp3",
	// },

	// Popup
	{
		type: 'image',
		key: 'popupmenu_back',
		src: 'assets/image/popup_menu/back.png'
	},
	{
		type: 'sprite',
		key: 'popupmenu_item',
		src: 'assets/image/popup_menu/item.png',
		width: 95,
		height: 18,
		num: 3
	},

	//Game Title
	{
		type: 'image',
		key: 'game_title',
		src: 'assets/image/game/game_title.png'
	},
	{
		type: 'image',
		key: 'pay_title',
		src: 'assets/image/pay/pay_title.png'
	},
	{
		type: 'image',
		key: 'freespin_title',
		src: 'assets/image/freespin/freespin_title.png'
	},
]




///////////////////////////////////////////////////////////////////////////////////////////
var resource_payview = [
	{
		id: 0,
		type: 'this',
		x: GAME_CONF.SPINVIEW_X - 46,
		y: GAME_CONF.SPINVIEW_Y - 28,
	},
	{
		id: 0,
		key: 'pay_back_',
		type: 'images',
		x: 0,
		y: 0,
		num: GAME_CONF.PAYTABLE_NUM,
	},
	{
		id: 2,
		key: 'btn_pay_left',
		type: 'image_button',
		x: 183,
		y: 460,
	},
	{
		id: 3,
		key: 'btn_back_game',
		type: 'image_button',
		x: 243,
		y: 455,
	},
	{
		id: 4,
		key: 'btn_pay_right',
		type: 'image_button',
		x: 544,
		y: 460,
	}
];


var resource_GameTitle = [
	{
		id: 0,
		key: 'game_title',
		type: 'image',
		x: 0,
		y: 0,
		anchorX: 0.5,
		anchorY: 1,
	},
	{
		id: 1,
		key: 'pay_title',
		type: 'image',
		x: 0,
		y: 0,
		anchorX: 0.5,
		anchorY: 1,
	},
	{
		id: 2,
		key: 'freespin_title',
		type: 'image',
		x: 0,
		y: 0,
		anchorX: 0.5,
		anchorY: 1,
	},
	{
		id: 3,
		key: 'spin_text',
		type: 'text',
		text: '10',
		x: -65,
		y: -74,
		width: 111,
		height: 60,
		style: {
			font: "64px Arial bold",
			fill: "#ebc700",
			wordWrap: false,
			boundsAlignH: "center",
		},
	},
];


var resource_WinText = [
	{
		id: 0,
		key: 'text_goodluck',
		type: 'text',
		text: 'GOOD LUCK!',
		x: 160,
		y: 57,
		anchorX: 0.5,
		anchorY: 0.5,
		style: {
			font: "26px Arial",
			fontWeight: 'normal',
			fill: "#ffff69",
			wordWrap: false,
			boundsAlignH: "center",
		},
	},
	{
		id: 1,
		key: 'text_win',
		type: 'text',
		text: '500',
		x: 160,
		y: 45,
		anchorX: 0.5,
		anchorY: 0.5,
		style: {
			font: "20px Arial",
			fontWeight: 'normal',
			fill: "#7dff01",
			wordWrap: false,
			boundsAlignH: "center",
		},
		hidden: true,
	},
	{
		id: 2,
		key: 'text_winlabel',
		type: 'text',
		text: 'WIN',
		x: 160,
		y: 70,
		anchorX: 0.5,
		anchorY: 0.5,
		style: {
			font: "20px Arial",
			fontWeight: 'normal',
			fill: "#7dff01",
			wordWrap: false,
			boundsAlignH: "center",
		},
		hidden: true,
	}
]


var resource_bonusStartDlg = [
	{
		id: 0,
		key: 'dlg_background',
		type: 'image',
		x: 0,
		y: 0,
		width: 1920,
		height: 1200,
		tint: '0x000000',
		alpha: 0.7,
		inputEnabled: true,
	},
	{
		id: 1,
		key: 'freespin_animation',
		type: 'sprite',
		x: 960,
		y: 600,
		anchorX: 0.5,
		anchorY: 0.5,
		scaleX: 2.35,
		scaleY: 2.35,
	},
	{
		id: 2,
		key: 'freespin_start',
		type: 'image_button',
		x: 960,
		y: 800,
		anchorX: 0.5,
		anchorY: 0,
	},
];