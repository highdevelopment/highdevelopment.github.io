
$(document).ready(function()
{
	new classMain();
});

$('body').click(function()
{
	console.log('aaa');
})

function classMain()
{
	var main = this;
	this.init = function()
	{
		$('#page_1').show();
		$('#page_1').css('opacity', '1.0');
		this.initElement();
		this.initEvent();
	}

	this.initElement = function()
	{
		var win_width = $(window).width();
		var fRate = win_width / 1000;
		$('#page_1 .loading').css('top', 230 * fRate);
	}

	this.animateCircle = function(circle, step, callback)
	{
		circle.show();
		circle.css('stroke-dasharray', '0 1000');
		function animate(current)
		{
			if(current > 110)
			{
				if (callback) callback.call();
			}
			else
			{
				setTimeout(function()
				{
					circle.css('stroke-dasharray', current + ' 1000');
					animate(current + step);
				}, 30);
			}
		}
		animate(0);
	}
	this.animateArrowLine = function(line, arrow, x1, x2, callback)
	{
		line.attr('x2', x1);
		arrow.hide();
		function animation(xPos)
		{
			if(xPos > x2)
			{
				arrow.fadeIn();
				if (callback) callback.call();
				return;
			}
			xPos += 10;
			setTimeout(function()
			{
				// arrow.()
				line.attr('x2', xPos);
				animation(xPos)
			}, 30);
		}
		animation(x1);
	}

	this.initEvent = function()
	{
		this.loadPage('page_1', function(content)
		{
			animationLine(content.find('#line_arrow'), 571, 573.375, 818, 573.375, 10, function()
			{
				content.find('#arrow').fadeIn();
				main.animateCircle(content.find('#circle_1'), 5, function()
				{
					main.animateCircle(content.find('#circle_2'), 5, function()
					{
						$(content).click(function()
						{
							$('#page_1 .loading').hide();
							animationZoomReplace($('#page_1'), $('#page_2'), $(content).find('#circle_1'), 333.521, 509.909, 125.594, 2000);
						});
						// main.fadeInNextPage($('#page_1'), $('#page_2'), 1500);
					});
				});
			});
			// main.fadeInNextPage($('#page_1'), $('#page_8'), 1500);
						
		})

		this.loadPage('page_2', function()
		{
			var fScale = 2;
			var ptCur = { x: 326, y:491 };
			var ptNext = { x: 790, y:388 };
			main.zoomOutNextPage($('#page_2'), ptCur, $('#page_3'), ptNext, fScale, 1500);
		});

		this.loadPage('page_3', function()
		{
			var fScale = 2;
			var ptCur = { x: 720, y:488 };
			var ptNext = { x: 860, y:540 };
			main.zoomOutNextPage($('#page_3'), ptCur, $('#page_4'), ptNext, fScale, 1300);
		});

		this.loadPage('page_4', function()
		{
			main.fadeInNextPage($('#page_4'), $('#page_5'), 1500);
		});

		this.loadPage('page_5', function()
		{
			var fScale = 2;
			var ptCur = { x: 1505, y:461 };
			var ptNext = { x: 960, y:540 };
			main.zoomOutNextPage($('#page_5'), ptCur, $('#page_6'), ptNext, fScale, 1300);
		});

		this.loadPage('page_6', function()
		{
			main.fadeInNextPage($('#page_6'), $('#page_7'), 1500);
		});

		this.loadPage('page_7', function()
		{
			main.fadeInNextPage($('#page_7'), $('#page_8'), 1500);
		});

		this.loadPage('page_8', function()
		{
			var content = $($('#page_8 object')[0].contentDocument);
			setTimeout(function()
			{
				main.animationLine(content.find('#ani_start_line1'), 787, 855, 908, 855);
				main.animationLine(content.find('#ani_start_line2'), 1053, 855, 908, 855, function()
				{
					var points = [
						{x: 908.965, y: 854.575},
						{x: 908.965, y: 804.595},
						{x: 847.092, y: 775.316},
						{x: 908.965, y: 735.508},
						{x: 908.965, y: 655.25},
					];
					var polygon = content.find('#ani_polyline1');
					main.animationPolygon(polygon, points, 5, function()
					{
						content.find('#ani_poly_arrow_head').fadeIn();

						main.animationLine(content.find('#ani_rect_line1'), 985.544, 543.312, 985.544, 518.5, function()
						{
							main.animationLine(content.find('#ani_rect_line2'), 988, 520, 835, 520, function()
							{
								main.animationLine(content.find('#ani_rect_line3'), 837, 520, 837, 576, function()
								{
									main.animationLine(content.find('#ani_rect_line4'), 835, 574, 985.544, 574, function()
									{
										main.animationLine(content.find('#ani_rect_line5'), 985.544, 576.221, 985.544, 542.001, function()
										{
											main.animationLine(content.find('#ani_arrow_line'), 984.544, 542.624, 1255.049, 542.624, function()
											{
												content.find('#ani_arrow_head').fadeIn();
											});
										});
									});
								});
							});
						});
					})
				});
			}, 1000);

			$(content).click(function()
			{
				parent.$(parent.document).trigger('close_slide');
			});
		});
	}

	function getDistance(pt1, pt2)
	{
		var a = pt1.x - pt2.x;
		var b = pt1.y - pt2.y;
		return Math.sqrt( a*a + b*b )
	}

	this.animationPolygon = function(polygon, points, step, callback)
	{
		polygon.show();
		var attr_points = [];
		attr_points.push({x:points[0].x, y:points[0].y});
		attr_points.push({x:points[0].x, y:points[0].y});
		polygon.attr('points', attr_points[0].x + ',' + attr_points[0].y);

		var point_cnt = 0;
		var line_cnt = 0;
		// var step = 10;
		var pt1 = points[point_cnt];
		var pt2 = points[point_cnt + 1];
		var count = getDistance(pt1, pt2) / step;
		function animation()
		{
			if(line_cnt > count)
			{
				line_cnt = 0;
				attr_points.push({x:points[point_cnt].x, y:points[point_cnt].y});
				point_cnt++;
				if(point_cnt >= points.length - 1)
				{
					if(callback)
						callback.call();
					return;
				}
				pt1 = points[point_cnt];
				pt2 = points[point_cnt + 1];
				count = getDistance(pt1, pt2) / step;
			}

			{
				setTimeout(function()
				{
					line_cnt++;
					var x = pt1.x + (pt2.x - pt1.x) * line_cnt / count;
					var y = pt1.y + (pt2.y - pt1.y) * line_cnt / count;
					attr_points[attr_points.length - 1].x = x;
					attr_points[attr_points.length - 1].y = y;
					var strAttr = "";
					for(var i = 0; i < attr_points.length; i++)
						strAttr += attr_points[i].x + "," + attr_points[i].y + ' ';
					polygon.attr('points', strAttr);
					animation();
				}, 30);
			}
		}
		animation();
	}

	this.animationLine = function(line, x1, y1, x2, y2, callback)
	{
		line.show();
		line.attr('x1', x1);
		line.attr('y1', y1);
		line.attr('x2', x1);
		line.attr('y2', y1);
		var step = 10;

		var count = getDistance2(x1, x2, y1, y2) / step;

		function animation(current)
		{
			if(current > count)
			{
				if(callback)
					callback.call();
			}
			else
			{
				setTimeout(function()
				{
					if(current > count - 1)
						current = count;
					var x = x1 + (x2 - x1) * current / count;
					var y = y1 + (y2 - y1) * current / count;
					line.attr('x2', x);
					line.attr('y2', y);
					animation(current + 1)
				}, 50);
			}
		}
		animation(0);
	}

	this.loadPage = function(page_id, callback)
	{
		var strJ = '#' + page_id + ' object';
		$(strJ)[0].addEventListener('load', function()
		{
			if(callback)
				callback.call(this, $($(strJ)[0].contentDocument));
		});
	}

	this.fadeInNextPage = function(curPage, nextPage, time)
	{
		var contentDocument = curPage.find('object')[0].contentDocument;
		$(contentDocument).click(function()
		{
        	curPage.fadeOut();
        	nextPage.show();
			nextPage.animate({
				opacity: 1.0,
			}, time, function() {
			});
		});
	}

	this.zoomOutNextPage = function(curPage, ptCur, nextPage, ptNext, fScale, time)
	{
		var contentDocument = curPage.find('object')[0].contentDocument;
		$(contentDocument).click(function()
		{
			var fRate = $(window).width() / 1920;
			var x = ptNext.x * fRate - ptCur.x * fScale * fRate;
			var y = ptNext.y * fRate - ptCur.y * fScale * fRate;
			var width = curPage.width();
			var height = curPage.height();
			curPage.animate({
				opacity: 0,
				width: width * fScale,
				height: height * fScale,
				left: x,
				top: y,
			}, time, function() {
				curPage.hide();
			});
			setTimeout(function()
			{
	        	nextPage.show();
				nextPage.animate({
					opacity: 1.0,
				}, 600, function() {
				});
			}, time * 0.8);
		});
	}

	$(window).resize(function()
	{
		main.initElement();
	});

	this.init();
}