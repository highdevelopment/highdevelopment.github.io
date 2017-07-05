$(document).ready(function() {
	$( "#splash" ).animate({
		opacity: 1
	}, 500, function() {
	// Animation complete.
	});
	$('.horizen').css('width', '0%');
	$('.horizen').show();
	$('.vertical').css('height', '0%');
	$('.vertical').show();
	$('#scanner').show();
	setTimeout(function() {
		startRed(function() {
			startGreen();
		});
	}, 2300);

	$('#banner:after').css('opacity', 0.3);
	setTimeout(function() {
		// $('#banner').fadeIn(1000);
		$('#banner').removeClass('banner-bg-lg-3');
		$('#banner').addClass('banner-bg-lg-2');
	}, 2000);

	$('#scanner').animate({
		right: '-160%',
	}, 6000, function() {
	})

	securityAnimation();
})

function startRed(callback) {
	startOne('#red_animation .ani_1');
	setTimeout(function() {
		startOne('#red_animation .ani_2');
	}, 1000);
	setTimeout(function() {
		startOne('#red_animation .ani_3', function() {
			callback.call();
		});
	}, 2000);
}

function startGreen() {
	startOne('#green_animation .ani_1', function() {
		$('#red_animation .ani_1').fadeOut(300);
	});
	setTimeout(function() {
		startOne('#green_animation .ani_2', function() {
			$('#red_animation .ani_2').fadeOut(300);
		});
	}, 1000);
	setTimeout(function() {
		startOne('#green_animation .ani_3', function() {
			$('#red_animation .ani_3').fadeOut(300);
		});
	}, 2000);

	$('#banner').removeClass();
	$('#banner').addClass('banner-bg-lg-3');
}

function startOne(name, callback) {
	function aniCircle(classname) {
		var div = $(classname + ' .circle');
		div.css('opacity', 0);
		div.animate({
			opacity: 1,
		}, 300, function() {
			aniLine1(classname);
		})
	}
	function aniLine1(classname) {
		var div = $(classname + ' .horizen');
		var len = div.attr('length');
		div.show();
		div.css('width', '0%');
		div.animate({
			width: len,
		}, 800, function() {
			aniLine2(classname);
		})
	}
	function aniLine2(classname) {
		var div = $(classname + ' .vertical');
		var len = div.attr('length');
		div.show();
		div.css('height', '0%');
		div.animate({
			height: len,
		}, 800, function() {
			aniRect(classname);
			if(callback)
				callback.call();
		})
	}
	function aniRect(classname) {
		var div = $(classname + ' .rect');
		div.animate({
			opacity: 1
		}, 600, function() {
		})
	}

	aniCircle(name);
}




var isShow = false;
function securityAnimation() {
	var fabric = $('#security_fabric');
	var fabric_line = $('#security_fabric .line_vertical');
	var text = $('#security_animation #text');
	var outerImg = $('#security_animation #outer');

	var image_width = $('#security_animation').width();
	var image_Height = image_width / 980 * 800;
	var lines = [];

	text.css('top', image_Height * 0.15);

	// outerImg.on("load", function() {
		$(document).scroll(function(e) 
		{
			if(isScrolledIntoView(fabric[0])) 
			{
				startAnimation();
			}

			if($(document).scrollTop() + $(window).height() >= $("#audiences")[0].offsetTop)
			{
				$("#audiences .circle_area").addClass("anim_area");
			}
		})
		if(isScrolledIntoView(fabric[0])) {
			startAnimation();
		}
	// });

	function isScrolledIntoView(elem)
	{
		var docViewTop = $(window).scrollTop();
		var docViewBottom = docViewTop + $(window).height();

		var elemTop = $(elem).offset().top;
		var elemBottom = elemTop + $(elem).height();

		return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
	}

	function startAnimation() {
		if(!isShow) {
			var h = image_Height * 0.45 - 47;
			animationFabric(h);
		}
		isShow = true;
	}

	function animationFabric(h) {
		fabric_line.animate({
			height: h,
			opacity: 0,
		}, 1000, function() {
			// fabric_line.css('opacity', 0.2);
			animationOuter();
			text.css('opacity', 0.0);
			text.animate({
				opacity: 1.0
			}, 2000);
		})
	}

	function animationOuter() {
		outerImg.show();
		outerImg.animate({
			width: '100%'
		}, {
			step: function( now, fx ) {
				var y = 38 * (100 - now) / 100;
				outerImg.css('margin-top', y + '%');
			},
			duration: 2000,
			complete : function() {
				aniamteLines();
			}
		})
	}

	count = 5;
	function aniamteLines() {
		function createLine(angle){
			var width = $('#security_animation').width();
			var height = outerImg.height();
			var radiusOut = height * 0.3;
			var radiusIn = 60;
			var length = radiusOut - radiusIn;
			var transform = 'rotate('+angle+'deg)';

			var line = $('<div>')
				.appendTo('#security_animation')
				.addClass('pline')
				.css({
					'position': 'relative',
					'transform': transform
				})
				.width(length);
				// .offset({left: width / 2, top: height / 2});

			var centerX = width / 2;
			var centerY = -height * 0.57;
			var h = $('#security_animation').height();
			var left = centerX + radiusIn * Math.cos(angle * Math.PI / 180);
			var top = centerY + radiusIn * Math.sin(angle * Math.PI / 180);
			line.css('left', left / width * 100 + '%');
			line.css('top', top / h * 100 + '%');

			line.width(0);
			line.animate({
				width: length,
			}, 1000, function() {

			})
			return line;
		}

		lines.push(createLine(0));
		lines.push(createLine(47));
		lines.push(createLine(136));
		lines.push(createLine(180));
		lines.push(createLine(222));
		lines.push(createLine(320));
	}

	$(window).resize(function() {
		var image_Height = $('#outer').height();
		var h = image_Height * 0.45 - 47;
		$('#security_fabric .line_vertical').css('height', h );

		var width = $('#security_animation').width();
		var height = outerImg.height();
		var radiusOut = height * 0.3;
		var radiusIn = 60;
		var length = radiusOut - radiusIn;
		var centerX = width / 2;
		var centerY = -height * 0.57;


		function resizeLine(line, angle) {
			if(line) {
				line.css('width', length);
				var transform = 'rotate('+angle+'deg)';

				var h = $('#security_animation').height();
				var left = centerX + radiusIn * Math.cos(angle * Math.PI / 180);
				var top = centerY + radiusIn * Math.sin(angle * Math.PI / 180);
				line.css('left', left);
				line.css('top', top);
			}
		}
		if(lines.length > 0) {
			resizeLine(lines[0], 0);
			resizeLine(lines[1], 46);
			resizeLine(lines[2], 136);
			resizeLine(lines[3], 180);
			resizeLine(lines[4], 222);
			resizeLine(lines[5], 320);
		}
	});
}