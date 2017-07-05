/*****************************************************
	Description 	: Loading View
	Created 		: 2016/08/01
	Copyright		: 2016
******************************************************/

function CLoadingView(game)
{
	this.game = game;
	this.slider;
	this.bar;

	this.init = function() {
		this.game.stage.backgroundColor = "#000000";
		this.bar = this.game.add.image(this.game.world.centerX, this.game.world.centerY, 'loading_bar');
		this.bar.anchor.setTo(0.5, 0.5);
		this.slider = this.game.add.image(this.game.world.centerX, this.game.world.centerY, 'loading_slider');
		this.slider.anchor.setTo(0, 0.5);

		// if(!this.game.device.desktop) {
		// 	this.bar.position.setTo(screen.width * 0.5, screen.height * 0.5);
		// 	this.slider.position.setTo(screen.width * 0.5, screen.height * 0.5);
		// }

		this.slider.x = this.bar.x - this.bar.width * 0.46;
		this.slider.scale.x = 0;

		var style1 = { font: "12px Arial", fill: "#ffffff", wordWrap: false, boundsAlignH: "center" };
		var text_loading = this.game.add.text(0, 0, "Loading", style1);
		text_loading.setTextBounds(this.game.world.centerX - 100, this.game.world.centerY + 20, 200, 20);
		var tween = this.game.add.tween(text_loading).to({alpha: 0}, 500, Phaser.Easing.Quadratic.In, true, 0, -1);
		tween.yoyo(1000);
	}

	this.setProgress = function(percent) {
		this.slider.scale.x = percent / 100;
	}

	this.setVisible = function(visible) {
		if(visible)
			this.game.stage.backgroundColor = "#000000";
		this.slider.visible = visible;
		this.slider.visible = visible;
	}
	this.init();
}

function loadingResource(game, loadingBar, ary_Res) {
	this.init = function() {
		if(ary_Res) {
			for(var count = 0; count < ary_Res.length; count++) {
				var obj = ary_Res[count];
				
				var type = obj.type;
				var key = obj.key;
				var src = obj.src;
				if(type == 'image') {
					game.load.image(key, src);
				}
				else if(type == 'sprite') {
					game.load.spritesheet(key, src, obj.width, obj.height, obj.num);
				}
				else if(type == 'audio') {
					game.load.audio(key, src);
				}
				else if(type == 'images') {
					for(var i = 0; i < obj.num; i++) {
						game.load.image(key + i, src + (i + 1) + '.' + obj.ext);
					}
				}
				else if(type == 'sprites') {
					for(var i = 0; i < obj.num; i++) {
						var prop = obj.props[i];
						if(game.device.iOS) {
							if(key == 'icon_ani' && g_spinConfig[i].ani_scale == 2) {
								game.load.spritesheet(key + i, src + '_i' + (i + 1) + '.' + obj.ext, prop.width / 2, prop.height / 2, prop.num);
							}
							else {
								game.load.spritesheet(key + i, src + (i + 1) + '.' + obj.ext, prop.width, prop.height, prop.num);
							}
						}
						else {
							game.load.spritesheet(key + i, src + (i + 1) + '.' + obj.ext, prop.width, prop.height, prop.num);
						}
					}
				}
				else if(type == 'movies') {
					for(var i = 0; i < g_confMovies.length; i++) {
						var num = g_confMovies[i].num;
						for(var k = 0; k < num; k++) {
							var pad = "000"
							var str = "" + (k + 1);
							var number = pad.substring(0, pad.length - str.length) + str;
							var strSrc = src + (i + 1) + '/img' + number + '.' + obj.ext;
							game.load.image(key + i + '_' + k, strSrc);
						}
					}
				}
				else {
					alert("couldn't find key = " + type);
				}
			}
		}

		game.load.onLoadStart.add(this.loadStart, this);
		game.load.onFileComplete.add(this.fileComplete, this);
		game.load.onLoadComplete.add(this.loadComplete, this);
	}

	this.loadStart = function() {
		loadingBar.setProgress(0);
	}

	this.fileComplete = function(progress, cacheKey, success, totalLoaded, totalFiles) {
		loadingBar.setProgress(progress);
	}

	this.loadComplete = function() {
		loadingBar.setProgress(100);
	}

	this.init();
}


/*
var SLoaingView = (function () {
    var instance;
 
    function createInstance(game) {
        var object = new CLoadingView(game);
        return object;
    }
 
    return {
        getInstance: function (game) {
            if (!instance) {
                instance = createInstance(game);
            }
            return instance;
        }
    };
})();


class CLoadingAnimation extends CLoadingView
{
	constructor(game) {
		super(game);
	}
	
	init() {
		super.init();
		
		var sprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 50, 'loading_ani');
		sprite.anchor.setTo(0.5, 0.5);
		sprite.animations.add('ani');
		sprite.animations.play('ani', 15, true);
	}
}

var SLoaingAnimation = (function () {
    var instance;
 
    function createInstance(game) {
        var object = new CLoadingAnimation(game);
        return object;
    }
 
    return {
        getInstance: function (game) {
            if (!instance) {
                instance = createInstance(game);
            }
            return instance;
        }
    };
})();*/



// function loadingResource(game, loadingBar, ary_Res) {
// 	var total_count = ary_Res.length;
// 	var counter = 0;

// 	var main = this;
// 	this.game = game;

// 	this.load_progress = function(game, obj) {
// 				console.log(counter, total_count);
// 		loadingBar.setProgress(counter / total_count * 100);
// 		var type = obj.type;
// 		var key = obj.key;
// 		var src = obj.src;
// 		if(type == 'image') {
// 			game.load.image(key, src);
// 		}
// 		else if(type == 'sprite') {
// 			game.load.spritesheet(key, src, obj.width, obj.height, obj.num);
// 		}
// 		else if(type == 'audio') {
// 			game.load.audio(key, src);
// 		}
// 		else if(type == 'images') {
// 			for(var i = 0; i < obj.num; i++) {
// 				game.load.image(key + i, src + (i + 1) + '.' + obj.ext);
// 			}
// 		}
// 		else if(type == 'sprites') {
// 			for(var i = 0; i < obj.num; i++) {
// 				var prop = obj.props[i];
// 				game.load.spritesheet(key + i, src + (i + 1) + '.' + obj.ext, prop.width, prop.height, prop.num);
// 			}
// 		}
// 		else {
// 			alert("couldn't find key = " + type);
// 		}

// 		counter++;
// 		if(counter < total_count) {
// 			setTimeout(function() {
// 				main.load_progress(game, ary_Res[counter]);
// 			}, 100)
// 		}
// 		else {
// 			return;
// 		}
// 	}

// 	var item = ary_Res[counter];
// 	this.load_progress(game, item);
// }