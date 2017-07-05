/*****************************************************
	Description 	: Particles
	Created 		: 2016/07/30
	Copyright		: 2016
******************************************************/

var CoinParticle = (function () {
    var CoinParticle = function (game,x,y) {
        Phaser.Particle.call(this,game,x,y,'coins');
        this.animations.add("rotate");
    };
    CoinParticle.prototype = Object.create(Phaser.Particle.prototype);
    CoinParticle.prototype.constructor = CoinParticle;
    CoinParticle.prototype.onEmit = function () {
        this.animations.stop("rotate",true);
        this.animations.play("rotate",60,true);
        this.animations.getAnimation('rotate').frame = Math.floor(Math.random() * this.animations.getAnimation('rotate').frameTotal);
    }
    return CoinParticle;
}());

function ClassCoins(game) {
	this.emitter;
	this.init = function() {
		this.emitter = game.add.emitter(0, 0, 200);

		this.emitter.width = 10;
		this.emitter.setXSpeed(-150, 150);
		this.emitter.setYSpeed(-150, 150);

		this.emitter.particleClass = CoinParticle;
		this.emitter.minParticleScale = 0.5;
	    this.emitter.maxParticleScale = 1.1;

		this.emitter.makeParticles();
		this.emitter.gravity = 130;
	}

	this.startParticle = function(x, y) {
		this.emitter.x = x;
		this.emitter.y = y;
		this.emitter.start(true, 3000, null, 100);
	}

	this.init();
}


function ClassStars(game, num) {
	this.group;
	this.init = function() {
		this.group = game.add.group();
		for(var i = 0; i < num; i++) {
			this.group.create(SCREEN_WIDTH * 0.5, SCREEN_HEIGHT * 0.5, 'star');
		}
		this.group.visible = false;
	}

	this.startAnimation = function() {
		this.group.visible = true;
		var i = 0;
		this.group.forEachAlive(function(p) {
			p.x = SCREEN_WIDTH * 0.5, p.y = SCREEN_HEIGHT * 0.5;
			p.anchor.setTo(0.5, 0.5);
			p.angle = 360 / num * i + game.rnd.integerInRange(-10, 10);
			p.scale.set(0.1, 0.1);
			var scale = 0.3 + game.rnd.realInRange(0, 1.5);
			game.add.tween(p.scale).to({ x: scale, y: scale }, 3200, Phaser.Easing.Linear.None, true, 100 * game.rnd.realInRange(0, 10), 0);
			var x = SCREEN_WIDTH * 0.5 + (SCREEN_WIDTH * 0.7) * Math.cos(p.angle * Math.PI / 180);
			var y = SCREEN_HEIGHT * 0.5 + (SCREEN_WIDTH * 0.7) * Math.sin(p.angle * Math.PI / 180);
			game.add.tween(p).to({ x: x, y: y }, 4200, Phaser.Easing.Quadratic.Out, true,  100 * game.rnd.realInRange(0, 10), 0);
			i++;
		});
	}

	this.init();
}