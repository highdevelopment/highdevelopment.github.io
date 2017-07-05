/*****************************************************
	Description 	: Preload Images
	Created 		: 2016/07/18
******************************************************/

var linebtnImgArr = [	
					'betline_button004',
					'betline_button028',
					'betline_button002',
					'betline_button024',
					'betline_button020',
					'betline_button016',
					'betline_button010',
					'betline_button001',
					'betline_button011',
					'betline_button017',
					'betline_button013',
					'betline_button021',
					'betline_button003',
					'betline_button029',
					'betline_button005',
					'betline_button014',
					'betline_button026',
					'betline_button018',
					'betline_button012',
					'betline_button009',
					'betline_button022',
					'betline_button006',
					'betline_button030',
					'betline_button007',
					'betline_button023',
					'betline_button008',
					'betline_button019',
					'betline_button025',
					'betline_button027',
					'betline_button015' 
];

function gamePreload() {
	// Pre load all images.
	loadingBar.setProgress(0);
	//backgroud
	game.load.image('background', 'assets/images/background.png');
	game.load.image('topBg', 'assets/images/bg_top.png');
	game.load.image('bottomBg', 'assets/images/bg_bottom.png');
	game.load.image('title', 'assets/images/title.png');

	loadingBar.setProgress(10);
	//paytable
	game.load.image('pay1', 'assets/images/pay_table1.png');
	game.load.image('pay2', 'assets/images/pay_table2.png');
	game.load.spritesheet('next', 'assets/images/buttons/next.png', 73, 52);
	game.load.spritesheet('prev', 'assets/images/buttons/prev.png', 73, 52);
	game.load.spritesheet('backtogame', 'assets/images/buttons/back_btn.png', 211, 62);

	loadingBar.setProgress(25);
	//Popup Menu when click AUTO button
	game.load.image('popupbg', 'assets/images/popupbg.png');
	game.load.spritesheet('200btn', 'assets/images/buttons/200btn.png', 111, 23);
	game.load.spritesheet('100btn', 'assets/images/buttons/100btn.png', 111, 23);
	game.load.spritesheet('50btn', 'assets/images/buttons/50btn.png', 111, 23);
	game.load.spritesheet('25btn', 'assets/images/buttons/25btn.png', 111, 23);
	game.load.spritesheet('10btn', 'assets/images/buttons/10btn.png', 111, 23);

	loadingBar.setProgress(40);
	//seperate Image
	game.load.image('seperate_bg', 'assets/images/seperate_bg.png');
	game.load.image('seperate', 'assets/images/seperate.png');

	loadingBar.setProgress(50);
	//All slot images
	for(var i = 0; i < spinImgArr.length; i++) {
		var spinVar = spinImgArr[i];
		game.load.spritesheet(spinVar, 'assets/images/' + spinVar + '.png', IMAGE_HEIGHT, IMAGE_HEIGHT);
	}

	loadingBar.setProgress(60);
	//All slot animations
	for(var i = 0; i < spinAnimArr.length; i++) {
		var spinAnim = spinAnimArr[i];
		game.load.spritesheet(spinAnim, 'assets/images/' + spinAnim + '.png', IMAGE_HEIGHT, IMAGE_HEIGHT);
	}

	loadingBar.setProgress(70);
	//Win Animation
	game.load.spritesheet('win_frame', 'assets/images/win_frame_anim.png', IMAGE_HEIGHT, IMAGE_HEIGHT, 20);

	//All line button images 
	for(var i = 0; i < linebtnImgArr.length; i++) {
		var linebtnVar = linebtnImgArr[i];
		game.load.image(linebtnVar, 'assets/images/buttons/' + linebtnVar + '.png');	
	}

	loadingBar.setProgress(85);
	//All payline images
	for(var i = 0; i < payLineArr.length; i++) {
		var paylineVar = payLineArr[i];
		game.load.image(paylineVar, 'assets/images/paylines/' + paylineVar + '.png');
	}

	loadingBar.setProgress(95);
	//pay table image
	game.load.spritesheet('paytable', 'assets/images/buttons/pay_table_sprite.png', 121, 88);
	//increase image
	game.load.spritesheet('increase', 'assets/images/buttons/plus_sprite.png', 33, 32);
	//decrease image
	game.load.spritesheet('decrease', 'assets/images/buttons/minus_sprite.png', 33, 32);
	//Center image
	game.load.image('center', 'assets/images/buttons/center.png');
	//Max Lines Button Image
	game.load.spritesheet('maxlines', 'assets/images/buttons/max_button_sprite.png', 142, 40);
	//Auto button Image
	game.load.spritesheet('auto', 'assets/images/buttons/auto_button_sprite.png', 73, 40);
	//Spin button Image
	game.load.spritesheet('spin', 'assets/images/buttons/spin_button_sprite.png', 77, 40);

	loadingBar.setProgress(100);
}