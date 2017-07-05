
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
			var ani_row1 = content.find('.ani_row1');
			content.find('.ani_row1_fill').css('fill', '#BEC8D2');
			content.find('.ani_row1_stroke').css('stroke', '#BEC8D2');

			content.find('.ani_row2').css('fill', '#BEC8D2');
			content.find('.ani_row2').css('stroke', '#BEC8D2');
			content.find('#row2_12').css('stroke', '#BEC8D2');

			content.find('#row3_1').css('fill', '#BEC8D2');
			content.find('#row3_2').css('fill', '#BEC8D2');

			content.find('.ani_row4_fill').css('fill', '#BEC8D2');
			content.find('.ani_row4_stroke').css('stroke', '#BEC8D2');

			content.find('.ani_row5_fill').css('fill', '#BEC8D2');

			var btn_Next = content.find('#btn_Next');
			btn_Next.css('fill', '#BEC8D2');

			var time = 750;
			setTimeout(function()
			{
				content.find('#row1_1').css('fill', '#124191');
				content.find('#row1_2').css('fill', '#124191');
				content.find('#row1_3').css('stroke', '#50C2F0');
				content.find('#row1_4').css('fill', '#50C2F0');
				content.find('#row1_5').css('stroke', '#00C9FF');
				setTimeout(function()
				{
					content.find('.ani_row2').css('fill', '#1E448D');
					content.find('.ani_row2').css('stroke', '#1E448D');
					content.find('#row2_12').css('stroke', '#1E448D');
					setTimeout(function()
					{
						content.find('#row3_1').css('fill', '#124191');
						content.find('#row3_2').css('fill', '#00C9FF');
						setTimeout(function()
						{
							content.find('.ani_row4_fill').css('fill', '#1E448D');
							content.find('.ani_row4_stroke').css('stroke', '#1E448D');
							setTimeout(function()
							{
								content.find('.ani_row5_fill').css('fill', '#1E448D');
								setTimeout(function()
								{
									btn_Next.css('fill', '#1E448D');
									// btn_Next.css('cursor', 'pointer');
									// btn_Next.click(function()
									// {
									// 	main.fadeInNextPage($('#page1'), $('#page2'), 1500);
									// })

									// var btnText = content.find('#btn_Text');
									// btnText.css('cursor', 'pointer');
									// btnText.click(function()
									// {
										main.fadeInNextPage($('#page1'), $('#page2'), 1500);
									// })
								}, time);
							}, time);
						}, time);
					}, time);
				}, time);
				animationCounter(content.find("#time_1"), 0.00, 4.96, time * 6);
				animationCounter(content.find("#time_2"), 0.00, 5.72, time * 6);
			}, time * 1);

		})

		this.loadPage('page2', function(content)
		{
			content.find('.row1_fill1').css('fill', '#BEC8D2');
			content.find('.row1_fill2').css('fill', '#BEC8D2');
			content.find('.row1_stroke').css('stroke', '#BEC8D2');

			content.find('.row2_fill').css('fill', '#BEC8D2');
			content.find('.row2_stroke').css('stroke', '#BEC8D2');

			content.find('.row3_fill1').css('fill', '#BEC8D2');
			content.find('.row3_fill2').css('fill', '#BEC8D2');

			content.find('.row4_fill').css('fill', '#BEC8D2');
			content.find('.row4_stroke').css('stroke', '#BEC8D2');

			content.find('.row5_fill').css('fill', '#BEC8D2');

			var btn_Next = content.find('#btn_Next');
			btn_Next.css('fill', '#BEC8D2');

			var time = 700;
			setTimeout(function()
			{
				content.find('.row1_fill1').css('fill', '#124191');
				content.find('.row1_fill2').css('fill', '#50C2F0');
				content.find('.row1_stroke').css('stroke', '#00C9FF');
				setTimeout(function()
				{
					content.find('.row2_fill').css('fill', '#1E448D');
					content.find('.row2_stroke').css('stroke', '#1E448D');
					setTimeout(function()
					{
						content.find('.row3_fill1').css('fill', '#124191');
						content.find('.row3_fill2').css('fill', '#00C9FF');
						setTimeout(function()
						{
							content.find('.row4_fill').css('fill', '#1E448D');
							content.find('.row4_stroke').css('stroke', '#1E448D');
							setTimeout(function()
							{
								content.find('.row5_fill').css('fill', '#1E448D');
								setTimeout(function()
								{
									btn_Next.css('fill', '#1E448D');
									// btn_Next.css('cursor', 'pointer');
									// btn_Next.click(function()
									// {
									// 	var ptCur = { x: 1440, y:640 };
									// 	var ptNext = { x: 860, y:540 };
									// 	main.zoomOutNextPage($('#page2'), ptCur, $('#page3'), ptNext, 2, 1500);
									// })
									
									// var btnText = content.find('#btn_Text');
									// btnText.css('cursor', 'pointer');
									// btnText.click(function()
									// {
										var ptCur = { x: 1440, y:640 };
										var ptNext = { x: 860, y:540 };
									// })
									main.zoomOutNextPage($('#page2'), ptCur, $('#page3'), ptNext, 2, 1500);
								}, time);
							}, time);
						}, time);
					}, time);
				}, time);
				var points = [
					{x: 1434.647, y: 970.717},
					{x: 1434.647, y: 898.677},
					{x: 1373.774, y: 870.399},
					{x: 1434.647, y: 830.591},
					{x: 1434.647, y: 750.332},
				];
				animationPolygon(content.find('#ani_polyline'), points, function()
				{
					content.find('#ani_arrow_head').fadeIn();
					setTimeout(function()
					{
						content.find('#ani_rect').fadeIn();
					}, 600);
				});
			}, time * 3);

		});

		this.loadPage('page3', function(content)
		{
			// main.fadeInNextPage($('#page3'), $('#page4'), 1500);
			$(content).click(function()
			{
				parent.$(parent.document).trigger('close_slide');
			});
		});

		// this.loadPage('page4', function(content)
		// {
		// 	content.find('.row1_fill1').css('fill', '#BEC8D2');
		// 	content.find('.row1_fill2').css('fill', '#BEC8D2');
		// 	content.find('.row1_stroke').css('stroke', '#BEC8D2');

		// 	content.find('.row2_fill').css('fill', '#BEC8D2');
		// 	content.find('.row2_stroke').css('stroke', '#BEC8D2');

		// 	content.find('.row3_fill1').css('fill', '#BEC8D2');
		// 	content.find('.row3_fill2').css('fill', '#BEC8D2');

		// 	content.find('.row4_fill').css('fill', '#BEC8D2');
		// 	content.find('.row4_stroke').css('stroke', '#BEC8D2');

		// 	content.find('.row5_fill').css('fill', '#BEC8D2');

		// 	var btn_Next = content.find('#btn_Next');
		// 	btn_Next.css('fill', '#BEC8D2');

		// 	var time = 400;
		// 	setTimeout(function()
		// 	{
		// 		content.find('.row1_fill1').css('fill', '#124191');
		// 		content.find('.row1_fill2').css('fill', '#50C2F0');
		// 		content.find('.row1_stroke').css('stroke', '#00C9FF');
		// 		setTimeout(function()
		// 		{
		// 			content.find('.row2_fill').css('fill', '#1E448D');
		// 			content.find('.row2_stroke').css('stroke', '#1E448D');
		// 			setTimeout(function()
		// 			{
		// 				content.find('.row3_fill1').css('fill', '#124191');
		// 				content.find('.row3_fill2').css('fill', '#00C9FF');
		// 				setTimeout(function()
		// 				{
		// 					content.find('.row4_fill').css('fill', '#1E448D');
		// 					content.find('.row4_stroke').css('stroke', '#1E448D');
		// 					setTimeout(function()
		// 					{
		// 						content.find('.row5_fill').css('fill', '#1E448D');
		// 						setTimeout(function()
		// 						{
		// 							btn_Next.css('fill', '#1E448D');
		// 							btn_Next.css('cursor', 'pointer');
		// 							btn_Next.click(function()
		// 							{
		// 								var ptCur = { x: 1440, y:640 };
		// 								var ptNext = { x: 860, y:540 };
		// 								main.zoomOutNextPage($('#page2'), ptCur, $('#page3'), ptNext, 4, 1500);
		// 							})
		// 						}, time);
		// 					}, time);
		// 				}, time);
		// 			}, time);
		// 		}, time);
		// 	}, time);

		// 	animationLine(content.find('#ani_arrow_line'), 1437.647, 611.587, 1437.647, 586.347, 4, function()
		// 	{
		// 		content.find('#ani_arrow_head').fadeIn();
		// 	});
			
		// 	$(content).click(function()
		// 	{
		// 		parent.$(parent.document).trigger('close_slide');
		// 	});
		// });
	}


	this.loadPage = function(page_id, callback)
	{
		var strJ = $('#' + page_id + ' object');
		strJ[0].addEventListener('load', function()
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