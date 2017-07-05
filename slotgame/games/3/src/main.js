/*****************************************************
	Description 	: Defined Pharse Game Default methods
	Created 		: 2016/08/12
******************************************************/

function agPreload() {
	agLoadingbar.setProgress(0);
	game.load.image('agBg_center', 'assets/resources/images/bg_center.png');
	game.load.image('agBG_left', 'assets/resources/images/bg_left.png');
	game.load.image('agBG_right', 'assets/resources/images/bg_right.png');
	game.load.image('agBG_top', 'assets/resources/images/bg_top.png');
	game.load.image('agBG_bottom', 'assets/resources/images/bg_bottom.png');
	game.load.image('agBG_header', 'assets/resources/images/header/title.png');
	game.load.image('agBG_freespin', 'assets/resources/images/header/freetitle.png');

	game.load.spritesheet('agNextBtn', 'assets/resources/images/buttons/next_btn_sprite.png', 32, 34);
	game.load.spritesheet('agPrevBtn', 'assets/resources/images/buttons/prev_btn_sprite.png', 32, 34);
	game.load.spritesheet('agPayBtn', 'assets/resources/images/buttons/pay_btn_sprite.png', 98, 98);
	game.load.spritesheet('agMaxBtn', 'assets/resources/images/buttons/maxbet_btn_sprite.png', 141, 61);
	game.load.spritesheet('agAutoBtn', 'assets/resources/images/buttons/auto_btn_sprite.png', 82, 59);
	game.load.spritesheet('agSpinBtn', 'assets/resources/images/buttons/spin_btn_sprite.png', 98, 58);

	//Popup Menu when click AUTO button
	game.load.image('agPopupbg', 'assets/resources/images/popup/popupbg.png');
	game.load.spritesheet('ag200btn', 'assets/resources/images/popup/200btn.png', 111, 23);
	game.load.spritesheet('ag100btn', 'assets/resources/images/popup/100btn.png', 111, 23);
	game.load.spritesheet('ag50btn', 'assets/resources/images/popup/50btn.png', 111, 23);
	game.load.spritesheet('ag25btn', 'assets/resources/images/popup/25btn.png', 111, 23);
	game.load.spritesheet('ag10btn', 'assets/resources/images/popup/10btn.png', 111, 23);

	//Paytable
	game.load.image('agPayBg', 'assets/resources/images/paytable/bg_paytable.png');
	game.load.spritesheet('agPayTables', 'assets/resources/images/paytable/pay_table_sprite.png', 672, 410);
	game.load.spritesheet('agBackBtn', 'assets/resources/images/paytable/back_to_game_sprite.png', 230, 82);
	game.load.spritesheet('agPt_prev', 'assets/resources/images/paytable/pt_prev_sprite.png', 52, 55);
	game.load.spritesheet('agPt_next', 'assets/resources/images/paytable/pt_next_sprite.png', 51, 57);

	//win border sprite
	game.load.spritesheet('agWinBorder', 'assets/resources/images/win_border_sprite.png', 136, 136);

	//Load Reel Audio
	game.load.audio('game_audio', 'assets/resources/sound/reel-game3.mp3');

	//All payline images
	for(var i = 0; i < agLineImgArr.length; i++) {
		var paylineVar = agLineImgArr[i];
		game.load.image(paylineVar, 'assets/resources/images/paylines/' + paylineVar + '.png');
	}
	game.load.image('border_bg', 'assets/resources/images/paylines/border_bg.png');

	//All Animation images
	for(var i = 0; i < agSpinAnimArr.length; i++) {
		var anim = agSpinAnimArr[i];
		var width = 142;
		var height = 142;

		if(i == 9) {
			width = 135;
			height = 109;		
		} else if(i > 5 && i < 13) {
			width = 146;
			height = 146;
		} else if(i == 14) {
			width = 220;
			height = 191;
		} else if(i == 15) {
			width = 238;
			height = 238;
		} else if(i == 13) {
			width = 183;
			height = 106;
		}

		game.load.spritesheet(anim, 'assets/resources/images/animations/' + anim + '.png', width, height);
	}
	// game.load.spritesheet('scatterAnim', 'assets/resources/images/animations/scatter_anim.png', 157, 240);

	//All spin charactors images
	for(var i = 0; i < agSpinImgArr.length; i++) {
		var spinVar = agSpinImgArr[i];
		game.load.image(spinVar, 'assets/resources/images/symbols/' + spinVar + '.png');
	}
	agLoadingbar.setProgress(100);
}

function agCreate() {
	game.add.image(541, 258, 'agBg_center');

	//init Reels
	reelXArr		= new Array();
	agReelArr 		= new Array();
	var xp 			= 618;
	var rxp			= xp;
	reelXArr.push(rxp);
	agReelFst 		= new agReelGroup(rxp, 0);
	agReelArr.push(agReelFst);
	rxp				= xp + AG_IMAGE_HEIGHT + 1;
	reelXArr.push(rxp);
	agReelSnd		= new agReelGroup(rxp, 1);
	agReelArr.push(agReelSnd);
	rxp				= xp + AG_IMAGE_HEIGHT * 2 + 2;
	reelXArr.push(rxp);
	agReelThr		= new agReelGroup(rxp, 2);
	agReelArr.push(agReelThr);
	rxp				= xp + AG_IMAGE_HEIGHT * 3 + 3;
	reelXArr.push(rxp);
	agReelFur		= new agReelGroup(rxp, 3);
	agReelArr.push(agReelFur);
	rxp 			= xp + AG_IMAGE_HEIGHT * 4 + 4;
	reelXArr.push(rxp);
	agReelFiv		= new agReelGroup(rxp, 4);
	agReelArr.push(agReelFiv);


	//create All bet lines
    agLineView = new agLineGroup();

    //create Animation Group
    agActor = new agAction();

	//Draw background by sprite image.
	game.add.image(0, 0, 'agBG_top');
	game.add.image(0, 424, 'agBG_left');
	game.add.image(0, 808, 'agBG_bottom');
	game.add.image(1279, 424, 'agBG_right');

	//Init Every Values for Betting
	agSetView = new agSetGr();

	//create Auto Spin Menu
    agAutoView = new agPopupMenu();
    agAutoView.createMenu();

    //create Title
    agTitleView = new agHeaderView();

    //Create PayTables
    agPTView = new agPayTable();
    
}

function agRender() {

}