/*****************************************************
	Description 	: Preload image for bonus session
	Created 		: 2016/08/01
******************************************************/

function bonusPreload() {
	bonusloadingBar.setProgress(0);
	
	//backgroud
	game.load.image('bonustransbg', 'assets/images/bonus/bonus_trans_bg.png');
	game.load.image('bonusquestbg', 'assets/images/bonus/bonus_quest_bg.png');
	game.load.image('bonusstartbg', 'assets/images/bonus/bonus_quest_start_bg.png');
	game.load.image('bonusanimalbg', 'assets/images/bonus/bonus_animal_bg.png');
	game.load.image('bonusmultibg', 'assets/images/bonus/bonus-coffin-bg.png');
	game.load.image('bonusfinalbg', 'assets/images/bonus/bonus-final-bg.png');

	//start button
	game.load.spritesheet('startbonusbutton', 'assets/images/bonus/share_quest_btn_sprite.png', 243, 61);

	for(var i = 0; i < 4; i++) {
		//bonus boxes
		game.load.image(boxArr[i], 'assets/images/bonus/' + boxArr[i] + '.png');
		//bonus key
		game.load.spritesheet(keyArr[i], 'assets/images/bonus/' + keyArr[i] + '.png', 126, 131);
	}
	game.load.image('insideleft01', 'assets/images/bonus/inside_left01.png');
	game.load.image('questtop', 'assets/images/bonus/bonus_quest_top.png');
	game.load.image('questbottom', 'assets/images/bonus/bonus_quest_bottom.png');
	
	bonusloadingBar.setProgress(50);
	//bonus coversbonus_quest_cover_sprite
	for(var i = 0; i < 12; i++) {
		game.load.spritesheet(coverArr[i], 'assets/images/bonus/' + coverArr[i] + '.png', 126, 131);
	}

	//quest inside
	game.load.image('inside01', 'assets/images/bonus/bonus_quest_inside01.png');
	game.load.image('inside02', 'assets/images/bonus/bonus_quest_inside02.png');

	//animal sprite
	for(var i = 0; i < 10; i++) {
		game.load.spritesheet(animalArr[i], 'assets/images/bonus/' + animalArr[i] + '.png', animalWidthArr[i], animalHeightArr[i]);
	}

	//coffin sprite
	for(var i = 0; i < 3; i++) {
		game.load.spritesheet(coffinArr[i], 'assets/images/bonus/' + coffinArr[i] + '.png', coffinWArr[i], coffinHArr[i]);
	}

	//final bonus
	game.load.spritesheet('bonusbackbtn', 'assets/images/bonus/back_button_sprite.png', 206, 54);

	bonusloadingBar.setProgress(100);
}