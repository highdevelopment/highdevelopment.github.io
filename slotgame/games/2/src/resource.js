/*****************************************************
	Description 	: Game Resource Manager
	Created 		: 2016/08/01
	Copyright		: 2016
******************************************************/



var arry_resource = [
	{
		type : "image",
		key : "game_back",
		src : "assets/image/background/bg.png",
	},
	// {
	// 	type : "image",
	// 	key : "game_back1",
	// 	src : "assets/image/background/bg_1.png",
	// },
	//main view
	{
		type : "image",
		key : "btn_pay",
		src : "assets/image/game/btn_pay.png",
	},
	{
		type : "image",
		key : "btn_left",
		src : "assets/image/game/btn_left.png",
	},
	{
		type : "image",
		key : "btn_right",
		src : "assets/image/game/btn_right.png",
	},
	{
		type : "image",
		key : "btn_max",
		src : "assets/image/game/btn_max.png",
	},
	{
		type : "image",
		key : "btn_spin",
		src : "assets/image/game/btn_spin.png",
	},
	{
		type : "image",
		key : "btn_text_stop",
		src : "assets/image/game/btn_text_stop.png",
	},
	//Paytable
	{
		type: 'images',
		key: 'pay_back_',
		src: 'assets/image/pay/payback_',
		ext: 'jpg',
		num: GAME_CONF.PAYTABLE_NUM,
	},
	{
		type : "image",
		key : "btn_back_game",
		src : "assets/image/pay/btn_back.png",
	},
	{
		type : "sprite",
		key : "btn_pay_left",
		src : "assets/image/pay/btn_pay_left.png",
	},
	{
		type : "sprite",
		key : "btn_pay_right",
		src : "assets/image/pay/btn_pay_right.png",
	},
	// slot
	{
		type : "images",
		key : "spin",
		src : "assets/image/symbol/symbol_",
		ext : "png",
		num : GAME_CONF.SPIN_NUMBER,
	},
	{
		type : "image",
		key : "border",
		src : "assets/image/symbol/border.png"
	},
	{
		type : "images",
		key : "payline",
		src : "assets/image/paylines/payline",
		ext : "png",
		num : GAME_CONF.PAY_LINE_NUM,
	},
	//animations
	{
		type: 'sprites',
		key: 'icon_ani',
		src: 'assets/image/anim/',
		num: GAME_CONF.SPIN_NUMBER,
		ext: 'png',
		props: [
			{ width: 130, height: 130, num: 62 },			//1
			{ width: 138, height: 138, num: 62 },			//2
			{ width: 132, height: 130, num: 62 },			//3
			{ width: 132, height: 132, num: 70 },			//4
			{ width: 154, height: 154, num: 71 },			//5
			{ width: 154, height: 154, num: 30 },			//6
			{ width: 154, height: 154, num: 30 },			//7
			{ width: 154, height: 154, num: 30 },			//8
			{ width: 154, height: 160, num: 30 },			//9
			{ width: 148, height: 148, num: 30 },			//10
			{ width: 152, height: 172, num: 62 },			//11
		]
	},

	//Videos
	{
		type: 'movies',
		key: 'movie_',
		src: 'assets/image/bonus/',
		ext: 'jpg'
	},

	// {
	// 	type : "sprite",
	// 	key : "animtion_effect_e",
	// 	src : "assets/image/pay/btn_pay_right.png",
	// 	width : 59,
	// 	height : 63,
	// 	num : 3,
	// },
	// {
	// 	type : "video",
	// 	key : "movie_1",
	// 	src : "assets/image/bonus/2/",
	// 	ext : "jpg",
	// 	width : 696,
	// 	height : 490,
	// 	num : 60,
	// },
	// {
	// 	type : "video",
	// 	key : "movie_2",
	// 	src : "assets/image/bonus/3/",
	// 	ext : "jpg",
	// 	width : 694,
	// 	height : 494,
	// 	num : 68,
	// },
	// {
	// 	type : "video",
	// 	key : "movie_3",
	// 	src : "assets/image/movies/4/",
	// 	ext : "jpg",
	// 	width : 674,
	// 	height : 470,
	// 	num : 63,
	// },
	// {
	// 	type : "video",
	// 	key : "movie_4",
	// 	src : "assets/image/movies/5/",
	// 	ext : "jpg",
	// 	width : 696,
	// 	height : 490,
	// 	num : 71,
	// },
	// {
	// 	type : "video",
	// 	key : "movie_5",
	// 	src : "assets/image/bonus/6/",
	// 	ext : "jpg",
	// 	width : 672,
	// 	height : 394,
	// 	num : 55,
	// },

	// Free Spin Dialog
	// {
	// 	type : "sprite",
	// 	key : "freespin_animation",
	// 	src : "assets/image/freespin/freespin_ani.png",
	// 	width : 219,
	// 	height : 175,
	// 	num : 126,
	// },

	{
		type : "image",
		key : "freespin_start_bg",
		src : "assets/image/freespin/start_bg.png",
	},
	{
		type : "image",
		key : "freespin_start",
		src : "assets/image/freespin/freespin_start.png",
	},
	{
		type : "image",
		key : "freespin_end_bg",
		src : "assets/image/freespin/freespin_end_bg.png",
	},
	{
		type : "image",
		key : "freespin_title",
		src : "assets/image/freespin/freespin_title.png",
	},

	//Audios
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
	// {
	// 	type : "audio",
	// 	key : "game_bg",
	// 	src : "assets/audio/soundtrack.mp3",
	// },
	// {
	// 	type : "audio",
	// 	key : "btn_down",
	// 	src : "assets/audio/btn_down.mp3",
	// },
	// {
	// 	type : "audio",
	// 	key : "btn_over",
	// 	src : "assets/audio/btn_over.mp3",
	// },
	// {
	// 	type : "audio",
	// 	key : "spin_start",
	// 	src : "assets/audio/spin_start.mp3",
	// },
	// {
	// 	type : "audio",
	// 	key : "spin_stop",
	// 	src : "assets/audio/spin_stop.mp3",
	// },
	// {
	// 	type : "audio",
	// 	key : "spinning",
	// 	src : "assets/audio/spinning.mp3",
	// },
	// {
	// 	type : "audio",
	// 	key : "spin_hold",
	// 	src : "assets/audio/spin_hold.mp3",
	// },
	// {
	// 	type : "audio",
	// 	key : "game_win",
	// 	src : "assets/audio/win.mp3",
	// },


	//effects
]



var resource_payview = [
	{
		id: 0,
		type: 'this',
		x: GAME_CONF.SPINVIEW_X,
		y: GAME_CONF.SPINVIEW_Y,
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
		x: 153,
		y: 436,
	},
	{
		id: 3,
		key: 'btn_back_game',
		keyText: null,
		type: 'image_button',
		x: 223,
		y: 435,
	},
	{
		id: 4,
		key: 'btn_pay_right',
		type: 'image_button',
		x: 464,
		y: 436,
	}
];


var resource_GameTitle = [
	// {
	// 	id: 0,
	// 	key: 'game_title',
	// 	type: 'image',
	// 	x: 0,
	// 	y: 0,
	// 	anchorX: 0.5,
	// 	anchorY: 1,
	// },
	// {
	// 	id: 1,
	// 	key: 'pay_title',
	// 	type: 'image',
	// 	x: 0,
	// 	y: -20,
	// 	anchorX: 0.5,
	// 	anchorY: 1,
	// },
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
		anchorX: 0.5,
		anchorY: 0.5,
		x: -13,
		y: -47,
		style: {
			font: "64px Arial bold",
			fill: "#ebc700",
			wordWrap: false,
			boundsAlignH: "center",
		},
	},
];


var resource_WinText = [
	// {
	// 	id: 0,
	// 	type: 'this',
	// 	x: 150,
	// 	y: 50,
	// 	anchorX: 0.5,
	// 	anchorY: 0.5,
	// },
	{
		id: 1,
		key: 'text_win',
		type: 'text',
		text: '500',
		x: 0,
		y: 0,
		anchorX: 0.5,
		anchorY: 0.5,
		style: {
			font: "18px Arial",
			fontWeight: 'bold',
			fill: "#7dff01",
			wordWrap: false,
			boundsAlignH: "center",
		},
		hidden: true,
	},
]

var resource_FreespinStartDlg = [
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
	// {
	// 	id: 1,
	// 	key: 'freespin_animation',
	// 	type: 'sprite',
	// 	x: 960,
	// 	y: 600,
	// 	anchorX: 0.5,
	// 	anchorY: 0.5,
	// 	scaleX: 2.35,
	// 	scaleY: 2.35,
	// },
	{
		id: 1,
		key: 'freespin_start_bg',
		type: 'image',
		x: 960,
		y: 600,
		anchorX: 0.5,
		anchorY: 0.5,
	},
	{
		id: 2,
		key: 'freespin_num',
		type: 'text',
		x: 960,
		y: 600,
		text: '10',
		anchorX: 0.5,
		anchorY: 0.5,
		style: {
			font: "72px Arial",
			fontWeight: 'bold',
			fill: "#7dff77",
			wordWrap: false,
			boundsAlignH: "center",
		},
	},
	{
		id: 3,
		key: 'freespin_start',
		type: 'image_button',
		x: 960,
		y: 800,
		anchorX: 0.5,
		anchorY: 0,
	},
]

var resource_FreespinEndDlg = [
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
		key: 'freespin_end_bg',
		type: 'image',
		x: GAME_CONF.SPINVIEW_X,
		y: GAME_CONF.SPINVIEW_Y,
		anchorX: 0,
		anchorY: 0,
	},
	{
		id: 2,
		key: 'all_shook_up',
		type: 'text',
		text: 'All Shook Up!',
		x: 960,
		y: GAME_CONF.SPINVIEW_Y + 70,
		anchorX: 0.5,
		anchorY: 0.5,
		style: {
			font: "52px Arial",
			fontWeight: 'bold',
			fill: "#da482f",
			wordWrap: false,
			boundsAlignH: "center",
			stroke: '#FCFF00',
			strokeThickness: 10,
			shadow: {
				x: 3,
				y: 3,
				color: 'rgba(255,255,255,0.7)',
				blur: 3,
				shadowStroke: true,
				shadowFill: true,
			},
		},
	},
	{
		id: 4,
		key: 'label_Win',
		type: 'text',
		text: 'You win',
		x: 960,
		y: GAME_CONF.SPINVIEW_Y + 150,
		anchorX: 0.5,
		anchorY: 0.5,
		style: {
			font: "26px Arial",
			fontWeight: 'bold',
			fill: "#88243c",
			wordWrap: false,
			boundsAlignH: "center",
			stroke: '#eeeeee',
			strokeThickness: 3,
		},
	},
	{
		id: 3,
		key: 'win_val',
		type: 'text',
		text: '1,000',
		x: 960,
		y: GAME_CONF.SPINVIEW_Y + 200,
		anchorX: 0.5,
		anchorY: 0.5,
		style: {
			font: "58px Arial",
			fontWeight: 'bold',
			fill: "#ffefba",
			wordWrap: false,
			boundsAlignH: "center",
			stroke: '#674e0b',
			strokeThickness: 10,
		},
	},
	{
		id: 4,
		key: 'label_coin',
		type: 'text',
		text: 'Coins in',
		x: 960,
		y: GAME_CONF.SPINVIEW_Y + 250,
		anchorX: 0.5,
		anchorY: 0.5,
		style: {
			font: "26px Arial",
			fontWeight: 'bold',
			fill: "#88243c",
			wordWrap: false,
			boundsAlignH: "center",
			stroke: '#eeeeee',
			strokeThickness: 3,
		},
	},
	{
		id: 4,
		key: 'freespin_num',
		type: 'text',
		text: '7',
		x: 960,
		y: GAME_CONF.SPINVIEW_Y + 330,
		anchorX: 0.5,
		anchorY: 0.5,
		style: {
			font: "58px Arial",
			fontWeight: 'bold',
			fill: "#ffefba",
			wordWrap: false,
			boundsAlignH: "center",
			stroke: '#674e0b',
			strokeThickness: 10,
		},
	},
	{
		id: 5,
		key: 'freespin',
		type: 'text',
		text: 'Free Spins!',
		x: 960,
		y: GAME_CONF.SPINVIEW_Y + 380,
		anchorX: 0.5,
		anchorY: 0.5,
		style: {
			font: "26px Arial",
			fontWeight: 'bold',
			fill: "#88243c",
			wordWrap: false,
			boundsAlignH: "center",
			stroke: '#eeeeee',
			strokeThickness: 3,
		},
	},
	{
		id: 4,
		key: 'freespin_start',
		type: 'image_button',
		x: 960,
		y: 770,
		anchorX: 0.5,
		anchorY: 0,
	},
]
