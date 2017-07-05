/*****************************************************
	Description 	: Lobby Resource Manager
	Created 		: 2016/08/01
	Copyright		: 2016
******************************************************/

var UNLOCKED_GAME_NUM	= g_gamelists.length;

var arr_Resource = 
[
	{
		type : "image", // image, audio, sprite
		key : "lobby_back",
		src	: "assets/image/lobby/background.jpg"
	},
	// {
	// 	type : "image",
	// 	key : "lobby_back1",
	// 	src	: "assets/image/lobby/background_1.png"
	// },
	{
		type : "sprite",
		key : "btn_left",
		src	: "assets/image/lobby/btn_left.png",
		width : 39,
		height : 66,
		num : 3
	},
	{
		type : "sprite",
		key : "btn_right",
		src	: "assets/image/lobby/btn_right.png",
		width : 39,
		height : 66,
		num : 3
	},
	{
		type : "audio",
		key : "lobby_audio",
		src : "assets/audio/lobby.mp3"
	},
	{
		type : "audio",
		key : "audio_btn_over",
		src : "assets/audio/btn_over.mp3"
	},
	{
		type : "image",
		key : "slider_bar",
		src	: "assets/image/lobby/slider_bar.png"
	},
	{
		type : "image",
		key : "slider_head",
		src	: "assets/image/lobby/slider_head.png"
	},
	{
		type : "sprite",
		key : "slider_btn",
		src	: "assets/image/lobby/slider_btn.png",
		width : 13,
		height : 13,
		num : 3
	},
	{
		type : "sprite",
		key : "icon_ads",
		src	: "assets/image/lobby/icon_ads.png",
		width : 200,
		height : 310,
		num : 2
	},
	{
		type : "sprite",
		key : "loading_ani",
		src	: "assets/image/loading/animation.jpg",
		width : 32,
		height : 32,
		num : 48
	},
	{
		type : "images",
		key : "game_icon",
		num : UNLOCKED_GAME_NUM + 1,
		src :  "assets/image/icons/icon",
		ext : "png",
	},
	{
		type : "images",
		key : "game_ricon",
		num : 4,
		src : "assets/image/icons/ricon_",
		ext : "png",
	}
];

