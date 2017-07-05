
$(document).ready(function()
{
	new classMain();
});

function classMain()
{
	var main = this;
	this.init = function()
	{
		$('#page1').show();
		$('#page1').css('opacity', '1.0');
		this.initElement();
		this.initEvent();
	}

	this.initElement = function()
	{
	}

	this.initEvent = function()
	{
		this.loadPage('page1', function(content)
		{
			animationLine(content.find('#ani_arrow_line'), 571.598, 573.375, 818.114, 573.375, 15, function()
			{
				content.find('#ani_arrow_head').fadeIn();
				animateCircle(content.find('#ani_circle1'), 10, function()
				{
					animateCircle(content.find('#ani_circle2'), 10, function()
					{
						main.fadeInNextPage($('#page1'), $('#page2'), 1500);
					});
				});
			});
		})

		this.loadPage('page2', function(content)
		{
			var ptCur = { x: 326, y:491 };
			var ptNext = { x: 790, y:388 };
			main.zoomOutNextPage($('#page2'), ptCur, $('#page3'), ptNext, 2, 1500);
		});

		this.loadPage('page3', function()
		{
			var ptCur = { x: 720, y:488 };
			var ptNext = { x: 860, y:540 };
			main.zoomOutNextPage($('#page3'), ptCur, $('#page4'), ptNext, 1.3, 1300);
		});

		this.loadPage('page4', function(content)
		{
			main.fadeInNextPage($('#page4'), $('#page5'), 1500);
		});

		this.loadPage('page5', function(content)
		{
			var ptCur = { x: 1505, y:461 };
			var ptNext = { x: 960, y:540 };
			main.zoomOutNextPage($('#page5'), ptCur, $('#page6'), ptNext, 2, 1300);
		});

		this.loadPage('page6', function(content)
		{
			var ptCur = { x: 720, y:488 };
			var ptNext = { x: 860, y:540 };
			main.zoomOutNextPage($('#page6'), ptCur, $('#page7'), ptNext, 1.3, 1300);
		});

		this.loadPage('page7', function(content)
		{
			main.fadeInNextPage($('#page7'), $('#page8'), 1500);
		});

		this.loadPage('page8', function(content)
		{
			setTimeout(function()
			{
				animationLine(content.find('#ani_start_line1'), 1094.043, 853.031, 920, 856.65, 10);
				animationLine(content.find('#ani_start_line2'), 746.495, 853.031, 920, 856.65, 10, function()
				{
					var points = [
						{x: 908.965, y: 854.575},
						{x: 908.965, y: 804.595},
						{x: 847.092, y: 775.316},
						{x: 904.971, y: 735.508},
						{x: 908.789, y: 655.25},
					];
					var polygon = content.find('#ani_polyline1');
					animationPolygon(polygon, points, function()
					{
						content.find('#ani_poly_arrow_head').fadeIn();

						animationLine(content.find('#ani_rect_line1'), 985.544, 543.312, 985.5, 518.5, 10, function()
						{
							animationLine(content.find('#ani_rect_line2'), 988, 520, 835, 520, 10, function()
							{
								animationLine(content.find('#ani_rect_line3'), 837, 520, 837, 576, 10, function()
								{
									animationLine(content.find('#ani_rect_line4'), 835, 574, 985.544, 574, 10, function()
									{
										animationLine(content.find('#ani_rect_line5'), 985.381, 576.221, 985.441, 530.001, 10, function()
										{
											animationLine(content.find('#ani_arrow_line'), 984.544, 542.624, 1255.049, 542.624, 10, function()
											{
												content.find('#ani_arrow_head').fadeIn();
												$(content).click(function()
												{
													parent.$(parent.document).trigger('close_slide');
												});
											});
										});
									});
								});
							});
						});
					})
				});
			}, 600);
		});
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