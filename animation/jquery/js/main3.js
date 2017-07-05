
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

									// })
									$(content).click(function()
									{
										parent.$(parent.document).trigger('close_slide');
									});
								}, time);
							}, time);
						}, time);
					}, time);
				}, time);
			}, time);

			animationLine(content.find('#ani_arrow_line'), 1437.647, 611.587, 1437.647, 586.347, 4, function()
			{
				content.find('#ani_arrow_head').fadeIn();
			});
			
		})
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