
$(document).ready(function()
{
	(new mainClass());
});


var mainClass = function()
{
	var main = this;

	var data = [];				// position of each item
	data.push(new Item(0, 0, 0));     //fill the first element data[0], so that the index == DOM li sequence

	var current_index = 1;		// the sequence number of current item
	var max_index = 0;			// the sequence number of the last item
	var page = document.getElementById('page');	// the DOM element where the items are placed

	var space = -1000;			// offset between neighboring items on Y and Z axis
	var	pageSize = 10;			// number of items each page
	var angle = 0;
	var MAX_SIZE = jsonData.length;

	var fRate = window.innerWidth / 1212;
	var slider_timeline = $('#slider_timeline')[0];
	var slider_scrollbar = $('#slider_scrollbar')[0];

	var dataTimelinePos = [];
	var dateMonthNames = [
		'JANUARY',
		'FABRARY',
		'MARCH',
		'APRIL',
		'MAY',
		'JUNE',
		'JULY',
		'AUGUST',
		'SEPTEMBER',
		'OCTOVER',
		'NOVEMBER',
		'DECEMBER',
	]

	this.init = function()
	{
		for(var i = 0; i < jsonData.length; i++)
		{
			var val = jsonData[i].date.yy + jsonData[i].date.mm * (1 / 12);
			var value = this.getTimelinePos(val);
			dataTimelinePos.push(value);
		}

		this.initMobileDevice();
		this.initAnimation();
		this.initEvent();

		this.resizeView();
		// $( "#slider" ).slider();
	}

	this.initMobileDevice = function()
	{
		for(var i = 0; i < jsonData.length; i++)
		{
			var imgUrl = jsonData[i].image;
			var videoUrl;
			if(jsonData[i].video)
			{
				imgUrl = 'data/image1.jpg';
				videoUrl = jsonData[i].video;
			}

			var innerHTML = this.getItemMobioleHTML(imgUrl, jsonData[i].title, 
				jsonData[i].text, jsonData[i].date.yy, dateMonthNames[jsonData[i].date.mm - 1], jsonData[i].date.dd,
				jsonData[i].writer, jsonData[i].like,
				videoUrl);
			$('#mobile_view').append(innerHTML);
		}
	}

	this.getItemMobioleHTML = function(imageurl, title, text, yy, mm, dd, writer, likeNum, videoUrl)
	{
		var dataType = 0;
		lastDataType = !lastDataType;

		var html_img = "", html_line = "";
		var htmlVideo = "";
		// if(videoUrl)
		// {
		// 	fRate = window.innerWidth / 1212;
		// 	var v_w = 350 * fRate;
		// 	var v_h = 270 * fRate;
		// 	htmlVideo = '<video width="' + v_w + '" height="' + v_h + '" controls >\
		// 				<source src="data/1.mp4" type="video/mp4">\
		// 			</video>';
		// }

		html_line = "<img src='image/line_1.png' class='lineType1'>";
		var html_date = "<div class='text_date'>\
						<img src='image/symbol_date.png'>\
						<section>\
							<p class='text_month'>" + mm + "</p>" + "<p class='text_year'>" + yy + "</p>\
						</section>\
					</div>";

		// var html3 = "<img src='image/symbol_date.png' class='symbol'>"
		var strDate = mm + ' ' + dd + ', ' + yy;
		var html4 = "<div class='posting'>" +  
						"<img src='" + imageurl + "' class='photo'>" + 
						"<section class='posting_text'>" + 
							"<p class='text_content_title'>" + title + "</p>" + 
							"<p class='text_content_date'>" + strDate + "</p>" + 
							"<p class='text_content_text'>" + text + "</p>" + 
						"</section>" +
						"<section class='posting_footer'>" + 
							"<span class=''>" + "Shared By: " + writer + "</span>" + 
							"<div style='float:right'>" + 
								"<img src='image/icon-heart.png' class='icon_like icon_mark'>" + 
								"<span class='like_number icon_mark'>" + likeNum + "</span>" + 
								"<img src='image/icon-link.png' class='icon_link icon_mark'>" + 
							"</div>"
						"</section>" +
					"</div>";
		return "<div>" + "<section class='left_section posting_section'>" + html_img + 
			htmlVideo + html4 + "</section>" + html_line + html_date + "</div>";
	}

	this.isMobileDevice = function()
	{
		if($(window).width() > 800)
			return	false;
		return true;
	}

	this.initTimeline = function()
	{
		var fRate = window.innerWidth / 1212;
		var markerNum = 15;
		function getStrMarker(index)
		{
			if(index >= 0 && index < markerNum - 1)
				return 1950 + 5 * index;
			else if(index == markerNum - 1)
				return 2016;
			return null;
		}
		function getOffsetMarker(index, width)
		{
			if(index >= 0 && index < markerNum - 1)
				return (width / 13.5) * index;
			else if(index == markerNum - 1)
				return width;
			return null;
		}
		var left = $('#slider_timeline').offset().left;
		var top = $('#slider_timeline').offset().top;
		var width = $('#slider_timeline').width();
		var height = $('#slider_timeline').height();
		for(var i = 0; i < markerNum; i++)
		{
			var str = getStrMarker(i).toString();
			var marker = $('#marker_num' + (i + 1));
			var fontSize = 10 * fRate;
			marker.css('left', left + getOffsetMarker(i, width) - fontSize * 1.3);
			marker.css('top', (81 + 60) * fRate + height - fontSize);
			marker.css('font-size', fontSize);
		}

		$('#marker_dob1').css('left', left + getOffsetMarker(0, width) - fontSize * 1.3);
		$('#marker_dob1').css('top', (81 + 60 + 3) * fRate - fontSize * 0.8);
		$('#marker_dob1').css('font-size', fontSize);
		$('#marker_dob2').css('left', left + getOffsetMarker(markerNum - 1, width) - fontSize * 1.3);
		$('#marker_dob2').css('top', (81 + 60 + 3) * fRate - fontSize * 0.8);
		$('#marker_dob2').css('font-size', fontSize);
	}


	$(window).resize(function()
	{
		main.resizeView();
	});

	this.resizeView = function()
	{
		if(this.isMobileDevice())
		{
			$('#mobile_view').show();
			$('.header').hide();
			$('#slider').hide();
			$('.scrollbar').hide();
			$('.main').hide();
			$('#view').hide();
			$('.footer').hide();
			this.resizeMobile();
		}
		else
		{
			$('#mobile_view').hide();
			$('.header').show();
			$('#slider').show();
			$('.scrollbar').show();
			$('.main').show();
			$('#view').show();
			$('.footer').show();
			this.resizeDesktop();
		}
	}

	this.resizeDesktop = function()
	{
		var fRate = window.innerWidth / 1212;
		var scroll_top = 250 * fRate;
		var scroll_bottom = 520 * fRate;
		$('#scrollbar').css('top', scroll_top);
		$('#scrollbar').css('height', scroll_bottom - $('#scrollbar').offset().top);
		$('#slider_scrollbar').css('top', scroll_top);
		$('#slider_scrollbar').css('height', $('#scrollbar').height());
		$('#slider_scrollbar').css('margin-right', -0.5 - 2.5 / fRate);

		// $('#scrollbar_head').css('width', $('#scrollbar').width());
		$('#view').css('width', 800 * fRate);
		$('#view').css('height', 480 * fRate);

		// var header_height = $('.header').height();
		$('#timeline_bar').css('top', (81 + 60) * fRate);
		$('#timeline_bar').css('width', 1074 * fRate);
		$('#timeline_bar').css('height', 45);
		$('#timeline_bar').css('left', 60 * fRate);
		$('#slider_timeline').css('top', (81 + 60 + 3) * fRate);
		$('#slider_timeline').css('width', 1058 * fRate);
		$('#slider_timeline').css('height', 45);
		$('#slider_timeline').css('left', 70 * fRate);

		this.initPageView();
		this.updateScrollVertical(current_index);
		this.updateScrollTimeline(current_index);

		this.initTimeline();
	}

	this.resizeMobile = function()
	{
	}

	this.initPageView = function()
	{
		var fRate = window.innerWidth / 1212;
		var line_top = 520 * fRate;

		$('#page li').css('left', window.innerWidth * -0.29);

		$('#page').css('margin-top', 50 * fRate);
		$('#page .lineType1').css('width', 1000 * fRate);
		$('#page .lineType1').css('left', 230 * fRate);
		$('#page .lineType1').css('top', line_top);

		$('#page .text_date').css('width', 100 * fRate);
		$('#page .text_date').css('left', 700 * fRate);
		$('#page .text_date').css('top', 470 * fRate);
		$('#page .text_date').css('font-size', 12 * fRate);

		$('#page .text_date section').css('top', -65 * fRate);

		$('#page .posting_section').css('width', 350 * fRate);
		// $('#page .posting_section').css('height', 450 * fRate);

		$('#page .left_section').css('left', 230 * fRate);
		$('#page .right_section').css('left', 930 * fRate);

		// $('#page .photo').css('width', 350 * fRate);
		// var height_line = $('lineType1')
		$('.image_mark').css('left', 150 * fRate);
		$('.image_mark').css('height', 58 * fRate);
		$('.image_mark').css('top', 10 * fRate);

		$('#page .posting_text').css('height', 100 * fRate);
		$('#page .posting_footer').css('height', 20 * fRate);
		$('#page .posting_footer').css('font-size', 16 * fRate);
		$('#page .posting_footer .icon_like').css('width', 18 * fRate);
		$('#page .posting_footer .icon_like').css('margin-top', 2 * fRate);
		$('#page .posting_footer .like_number').css('font-size', 10 * fRate);
		$('#page .posting_footer .like_number').css('margin-top', 10 * fRate);
		$('#page .posting_footer .icon_link').css('width', 16 * fRate);
		$('#page .posting_footer .icon_link').css('margin-top', 1 * fRate);


		$('#page .text_content_title').css('font-size', 14 * fRate);
		$('#page .text_content_date').css('font-size', 8 * fRate);
		$('#page .text_content_text').css('font-size', 10 * fRate);
		var h1 = 540 * fRate;
		$('#page .posting_section').css('top', line_top - h1);

	}

	var lastDataType = false;
	var POS = {};
	POS.LEFT = 0;
	POS.RIGHT = 1;
	this.getItemHTML = function(imageurl, title, text, yy, mm, dd, writer, likeNum, videoUrl)
	{
		var dataType = 0;
		if(lastDataType)
			dataType = POS.LEFT;
		else
			dataType = POS.RIGHT;
		lastDataType = !lastDataType;

		var html_img = "", html_line = "";
		var htmlVideo = "";
		// if(videoUrl)
		// {
		// 	fRate = window.innerWidth / 1212;
		// 	var v_w = 350 * fRate;
		// 	var v_h = 270 * fRate;
		// 	htmlVideo = '<video width="' + v_w + '" height="' + v_h + '" controls >\
		// 				<source src="data/1.mp4" type="video/mp4">\
		// 			</video>';
		// }

		html_line = "<img src='image/line_1.png' class='lineType1'>";
		var html_date = "<div class='text_date'>\
						<img src='image/symbol_date.png'>\
						<section>\
							<p class='text_month'>" + mm + "</p>" + "<p class='text_year'>" + yy + "</p>\
						</section>\
					</div>";

		// var html3 = "<img src='image/symbol_date.png' class='symbol'>"
		var strDate = mm + ' ' + dd + ', ' + yy;
		var html4 = "<div class='posting'>" +  
						"<img src='" + imageurl + "' class='photo'>" + 
						"<section class='posting_text'>" + 
							"<p class='text_content_title'>" + title + "</p>" + 
							"<p class='text_content_date'>" + strDate + "</p>" + 
							"<p class='text_content_text'>" + text + "</p>" + 
						"</section>" +
						"<section class='posting_footer'>" + 
							"<span class=''>" + "Shared By: " + writer + "</span>" + 
							"<div style='float:right'>" + 
								"<img src='image/icon-heart.png' class='icon_like icon_mark'>" + 
								"<span class='like_number icon_mark'>" + likeNum + "</span>" + 
								"<img src='image/icon-link.png' class='icon_link icon_mark'>" + 
							"</div>"
						"</section>" +
					"</div>";
		if(dataType == POS.LEFT)
			return "<div>" + html_line  + html_date + "<section class='left_section posting_section'>" + html_img + htmlVideo + html4 + "<img class='image_mark' src='image/img_mark.png'>" + "</section>" + "</div>";
		else
			return "<div>" + html_line  + html_date + "<section class='right_section posting_section'>" + html_img + htmlVideo + html4 + "<img class='image_mark' src='image/img_mark.png'>" + "</section>" + "</div>";
	}

	function Item(translate_y, translate_z, rotate_z)	// data structure for storing the positions
	{
		this.translate_y = translate_y;
		this.translate_z = translate_z;
		this.rotate_z = rotate_z;
	}

	this.addEvent = function(n)	// put a new item
	{
		if(!data[n])
		{
			data.push(new Item(data[max_index].translate_y + space, data[max_index].translate_z + space, data[max_index].rotate_z + 3));
		}
		var item = document.createElement('li');
		item.id = n;
		item.style.zIndex = (1000 - n);
	//		        item.style.opacity = 0;			// new item is invisible initially, will be displayed by animate() function
		// item.onclick = function() { main.jumpTo(n) };			// if an item is clicked, it will move to the first place in the screen

		// console.log(n);
		var imgUrl = jsonData[n - 1].image;
		var videoUrl;
		if(jsonData[n - 1].video)
		{
			imgUrl = 'data/image1.jpg';
			videoUrl = jsonData[n - 1].video;
		}

		item.innerHTML = this.getItemHTML(imgUrl, jsonData[n - 1].title, 
			jsonData[n - 1].text, jsonData[n - 1].date.yy, dateMonthNames[jsonData[n - 1].date.mm - 1], jsonData[n - 1].date.dd,
			jsonData[n - 1].writer, jsonData[n - 1].like,
			videoUrl);

		// item.style.left = -350 * fRate + 'px';
		page.appendChild(item);
		max_index ++;
		this.resizeView();

	}

	this.initAnimation = function()
	{
		for(var n = 1; n < pageSize + 1; n++)			// put 10 items initially
		{
			data.push(new Item(n * space, (n - 0.7) * space, (n - 1) * angle));
			this.addEvent(n);
		}

		for(var n = 1; n < pageSize + 1; n++)
		{
			this.animate(n, 0, 1);			// animate 10 items added
		}
	}

	this.jumpTo = function(n)							// keep moving forward to show the n th item
	{
		if(n > current_index)
		{
			for(var i = current_index; i < n; i++)
			{
				this.next(true);
			}
		}
		else
		{
			for(var i = current_index; i >= n; i--)
			{
				this.prev(true);
			}
		}
	}

	this.animate = function(n, y, opacity, isNoScroll)
	{
		if(n <= MAX_SIZE)
		{
			var new_y = data[n].translate_y + y;
			var new_z = data[n].translate_z + y;
			var new_rz = data[n].rotate_z + angle*y/space;		// calculate new position of n th item

			var elementN = document.getElementById(n);
			// elementN.onclick = function() { main.jumpTo(n) };
			// animate n th item with CSS3 translate3d and rotate3d methods
			elementN.style.webkitTransform = 'translateZ(' + new_z + 'px)';
			elementN.style.transform = 'translateZ(' + new_z + 'px)';
			elementN.style.opacity = opacity;

			data[n].translate_y = new_y;
			data[n].translate_z = new_z;
			data[n].rotate_z = new_rz;						// save its new position


			// if(!isNoScroll)
			// {
			// 	// this.setScrollPos(current_index);
			// 	// this.setTimelinePos(current_index);
			// 	console.log(current_index);
			// 	var index = current_index;
			// 	if(slider_timeline.noUiSlider)
			// 		slider_timeline.noUiSlider.set([current_index / MAX_SIZE * 100], false);
			// 	if(slider_scrollbar.noUiSlider)
			// 		slider_scrollbar.noUiSlider.set([current_index / MAX_SIZE * 100], false);
			// }
		}
	}

	this.updateScrollTimeline = function(nDataIndex)
	{
		var nIndex = nDataIndex;
		if(typeof(nDataIndex) =='undefined')
		{
			nIndex = current_index;
		}
		if(slider_timeline.noUiSlider)
			slider_timeline.noUiSlider.set([nIndex / MAX_SIZE * 100], false);
	}
	this.updateScrollVertical = function(nDataIndex)
	{
		var nIndex = nDataIndex;
		if(typeof(nDataIndex) =='undefined')
		{
			nIndex = current_index;
		}
		if(slider_scrollbar.noUiSlider)
			slider_scrollbar.noUiSlider.set([100 - nIndex / MAX_SIZE * 100], false);
	}

	this.prev = function(isNoScroll)
	{
		if(current_index > 1)
		{
			document.getElementById(current_index - 1).style.opacity = 1;	// show last item
			current_index--;
			for(var n = 1; n < current_index; n++)	// update the positions of previous invisible items
			{
				this.animate(n, space, 0, isNoScroll);
			}
			for(var n = current_index; n < current_index + pageSize; n++)	// update the positions of current visible items
			{
				this.animate(n, space, 1, isNoScroll);
			}
			for(var n = current_index + pageSize; n <= max_index; n++)	// update the positions of next invisible items
			{
				this.animate(n, space, 0, isNoScroll);
			}
		}
	}

	this.next = function(isNoScroll)
	{
		if(current_index < data.length && current_index < MAX_SIZE)
		{
			document.getElementById(current_index).style.opacity = 0;	//hide current item
			current_index++;
			if(current_index + pageSize - 1 > max_index && max_index < MAX_SIZE)	// maximum 60 items allowed
			{
				this.addEvent(current_index + pageSize - 1);		// load a new item if available
			}
			for(var n = 1; n < current_index; n++)	// update the positions of previous invisible items
			{
				this.animate(n, -1 * space, 0, isNoScroll);
			}
			for(var n = current_index; n < current_index + pageSize; n++)	// update the positions of current visible items
			{
				this.animate(n, -1 * space, 1, isNoScroll);
			}
			for(var n = current_index + pageSize; n <= max_index; n++)
			{
				this.animate(n, -1 * space, 0, isNoScroll);
			}
		}
	}

	this.initEvent = function()
	{
		noUiSlider.create(slider_timeline, {
			start: 0,
			animate: false,
			behaviour: 'tap',
			// orientation: 'vertical',
			connect: [false, true],
			range: {
				'min':  0,
				'max':  100
			}
		});
		noUiSlider.create(slider_scrollbar, {
			start: 100,
			animate: false,
			behaviour: 'tap',
			orientation: 'vertical',
			connect: [false, true],
			range: {
				'min':  0,
				'max':  100
			}
		});
		var lastDate = new Date().getTime();
		$('#page').bind('mousewheel', function(event)
		{
			var sss = $(this).offset();
			if(event.clientY > sss.top && event.clientY < sss.top + $(this).height())
			{
			    var delayInMs = event.timeStamp - lastDate;
			    // console.log(delayInMs);
			    lastDate = event.timeStamp;
			    if(Math.abs(delayInMs) < 100)
			    {
					event.preventDefault();
			    	return;
			    }

				if(event.originalEvent.wheelDelta > 0)				// mouse wheel rolls forward
				{
					main.next();
					main.updateScrollTimeline();
					main.updateScrollVertical();
				}
				else if(event.originalEvent.wheelDelta < 0)
				{
					main.prev();								// mouse wheel rolls backward
					main.updateScrollTimeline();
					main.updateScrollVertical();
				}
			}
			event.preventDefault();
		});

		function shortCutFF(event)				// only for Firefox, because it doesn't support onmousewheel event
		{
			if(event.detail < 0)
			{					// mouse wheel rolls forward
				main.next();
				main.updateScrollTimeline();
				main.updateScrollVertical();
			}
			else if(event.detail > 0)
			{
				main.prev();
				main.updateScrollTimeline();
				main.updateScrollVertical();							// mouse wheel rolls backward
			}
			event.preventDefault();
		}

		document.onkeydown = function(event)
		{
			if(event.keyCode == '37' || event.keyCode == '40')   //left or down  --> previous
			{
				main.prev();
				main.updateScrollTimeline();
				main.updateScrollVertical();
			}
			else if(event.keyCode == '39' || event.keyCode == '38')
			{    //right or up --> next
				main.next();
				main.updateScrollTimeline();
				main.updateScrollVertical();
			}
		};

		$('#tab_button').click(function(event)
		{
			if ($('#right_tab').css('right') == '-10px')
			{
				$('#right_tab').animate({'right':'-250px'});	
			}
			else 
			{
				$('#right_tab').animate({'right':'-10px'});	
			}
		});

		$('.tab_option').click(function(e)
		{
			$('#right_tab').animate({'right':'-250px'});
		})

		$('#btn_addtimeline').click(function(e)
		{
			$('#dlg_register').fadeIn();
		})

		$('.btn_close').click(function(e)
		{
			$('#dlg_register').fadeOut();
		})

		slider_timeline.noUiSlider.on('update', function(value, handle)
		{
			var scroll_val = parseFloat(value) / 100;
			var limit_min = 0xffff;
			for(var nIndex = 0; nIndex < MAX_SIZE; nIndex++)
			{
				if(dataTimelinePos[nIndex] > scroll_val)
					break;
			}
			main.jumpTo(nIndex);
			main.updateScrollVertical(nIndex);
		});

		slider_scrollbar.noUiSlider.on('update', function(value, handle)
		{
			var scroll_val = 1 - parseFloat(value) / 100;
			var nIndex = MAX_SIZE * scroll_val;
			main.jumpTo(nIndex);
			main.updateScrollTimeline(nIndex);
		});
	}

	this.getTimelinePos = function(date)
	{
		var xPos = 0;
		if(date < 2015) //1037 : (1950 - 2015)
			xPos = ((date - 1950) / (2015 - 1950) * 1037);
		else //39: 2015-2016
			xPos = (1037 + (date - 2015) / (2016-2015) * 39);

		return xPos / 1076;
		return xPos;
	}


	this.getTimelineDate = function(pos)
	{

	}

	this.init();
}
