$(document).ready( function() {
	// var gif_obj = new SuperGif({ gif: document.getElementById('ads') } );
	// gif_obj.load(function()
	// {
	// });
	// $('.jsgif canvas').mouseenter(function()
	// {
	// 	gif_obj.pause();
	// });
	// $('.jsgif canvas').mouseleave(function()
	// {
	// 	gif_obj.play();
	// });
	

	var iframe_sync = '<!-- BEGIN TAG - DO NOT MODIFY --><script type="text/javascript">/*<![CDATA[*/supp_key = "6d19b52936142a416637e0488501c077";supp_channel="";supp_code_format="ads";supp_click="";supp_custom_params={};supp_width="300";supp_height="250";/*]]>*/</script><script type="text/javascript" src="//n221adserv.com/js/show_ads_supp.js?pubId=3"></script><!-- END TAG -->';
	var iframe_sync = "<!-- BEGIN TAG - DO NOT MODIFY --><script type='text/javascript'>/*<![CDATA[*/supp_key = '6d19b52936142a416637e0488501c077';supp_channel='';supp_code_format='ads';supp_click='';supp_custom_params={};supp_width='300';supp_height='250';/*]]>*/</script><script type='text/javascript' src='//n221adserv.com/js/show_ads_supp.js?pubId=3'></script><!-- END TAG -->";
	var iframe_simple = '<iframe src="http://n221adserv.com/ads?key=6d19b52936142a416637e0488501c077&ch=" width="300" height="250" frameborder="0" scrolling="no"></iframe>';

	animation = false;
	j = 51

	if( animation == false ) {
		$(".modal_global").fadeOut();
	}
	j = 0;
	setTimeout(function() {
		$(".modal_global .container").height($(".content_table_1").height());
	}, 1000)
	$("#menu_btn").click( function() {

		if( $(".left_menu").hasClass("open") ) {
			$(".left_menu").css("left", "-220px");
			$(".open").toggleClass("open");
			$("#menu_btn").css("background-image", "url(./assets/img/arrow_right.png)");
		}
		else {
			$(".left_menu").css( "left", "0");
			$(".left_menu").addClass("open");
			$("#menu_btn").css("background-image", "url(./assets/img/arrow_left.png)");
		}

	})

	// function getImages(data){
	// 	var html = "";
	//    	data.forEach( function(item) {
	//     	html += '<div class="img_block small_img zoomIn" data-height="207px" custom-height="390px">'+ iframe_simple + '<div class="modal_info"><div class="modal_text">lorem ipsum dolor ipsum es sup emp lorem ipsum dolor ipsum es sup emp</div><div class="modal_icons"><div class="row"><div class="col-md-6 col-xs-6 col-sm-6 col-lg-6"><a href="#">Save</a><a href="#">Ascovery Point</a><a href="#">Reviews</a></div><div class="col-md-6 col-xs-6 col-sm-6 col-lg-6"><a href="#">Review</a><a href="#">Shop Assistant</a><a href="#">Site</a></div></div></div></div></div>'
	//     });
	// 	return html;
	// }
	function getImages(data){
		var html = "";
	   	data.forEach( function(item) {
	    	html += '<div class="img_block '+item['name']+' zoomIn" data-height='+item['height']+' custom-height='+item['cus_height']+'>'+item['script']+'<div class="modal_info"><div class="modal_text">lorem ipsum dolor ipsum es sup emp lorem ipsum dolor ipsum es sup emp</div><div class="modal_icons"><div class="row"><div class="col-md-6 col-xs-6 col-sm-6 col-lg-6"><a href="#">Save</a><a href="#">Ascovery Point</a><a href="#">Reviews</a></div><div class="col-md-6 col-xs-6 col-sm-6 col-lg-6"><a href="#">Review</a><a href="#">Shop Assistant</a><a href="#">Site</a></div></div></div></div></div>'
	    });
		return html;
	}
	// function getImages(data){
	// 	var html = "";
	//    	data.forEach( function(item) {
	//     	html += '<div class="img_block '+item['name']+' zoomIn" data-height='+item['height']+' custom-height='+item['cus_height']+'><img src="http://web.ddminds.com/ascovery/'+item['img']+'" /><div class="modal_info"><div class="modal_text">lorem ipsum dolor ipsum es sup emp lorem ipsum dolor ipsum es sup emp</div><div class="modal_icons"><div class="row"><div class="col-md-6 col-xs-6 col-sm-6 col-lg-6"><a href="#">Save</a><a href="#">Ascovery Point</a><a href="#">Reviews</a></div><div class="col-md-6 col-xs-6 col-sm-6 col-lg-6"><a href="#">Review</a><a href="#">Shop Assistant</a><a href="#">Site</a></div></div></div></div></div>'
	//     });
	// 	return html;
	// }
var timer;
	function hoverIn() {
		$this = $(this);
		clearTimeout(timer);
		timer = setTimeout(function(){
			$(".img_block").removeClass("close_img");
			j++
			$this.addClass("image_trans");
			height1 = $this.attr("custom-height");
			$this.height(height1);
			$(".modal_global").fadeIn('fast');
			$this.addClass("z-index");
			$this.find(".modal_info").show();
		}, 500)
	}
	function hoverOut() {
		clearTimeout(timer);
		$this = $(this);
		height2 = $(this).attr("data-height");
		$(this).height(height2);
		$(this).css("z-index", j);
		$this.removeClass("z-index");
		$this.removeClass("image_trans");
		$(".modal_global").fadeOut('fast');
		$(".modal_info").hide();
	}


	var count = 0;
	function replace_image(array)
	{
		var iframe_arr = array.toArray();

		function set_image(index)
		{
			var iframe 	= iframe_arr[index];
			var iframe_url 	= $(iframe).attr("src");
			if(!iframe_url)
				return;
			$(iframe).load(iframe_url, function() 
			{
				jQuery.each($(this), function(key, val)
				{
					var tag_a 	 = $(val).find("a");
					var parent = $(iframe).parent();
					parent.prepend(tag_a);

					var image = tag_a.find('img');
					// image.attr('src', "https://s-media-cache-ak0.pinimg.com/originals/a9/e5/06/a9e506364ae6b6892e6a126a2f021206.gif");
					// image.attr('src', "http://static.shareasale.com/image/62921/HKT-flash-banner-gold-button.gif");
					var img_url = image.attr("src");
					if(img_url.indexOf('.gif') > 0)
					{
						image.hide();
						image.addClass('gif');
						count++;
					}
					else
					{
					}
					$(iframe).remove();
				});

				if(index + 1 < iframe_arr.length)
					set_image(index + 1);
				else
				{
					if($('.gif').length > 0)
					{
					    second = new freezeframe({
					      'selector': '.gif',
					      'animation_play_duration': Infinity,
					      'non_touch_device_trigger_event': 'hover'
					    }).freeze();
					}
					$('.gif').show();
					set_animation();
				}
			});
		}

		set_image(0);
	}

	function set_animation()
	{
		$(".modal_global").hover( function() 
		{
			$(".modal_global").addClass("hover_in_modal");
			$(".image_trans").css("z-index", j);
			$this.removeClass("z-index");
			$this.removeClass("image_trans");
			$(".modal_global").fadeOut('fast');
			$(".modal_global").css("display", "none!important");
			$(".modal_info").hide();
		}, function() 
		{
			$(".modal_global").removeClass("hover_in_modal");
		})

		$(".modal_global").mouseenter( function() {
			$(this).hide();
		})
	}


	$.getJSON("./js/test2.json", function( data ) 
	{
		var j = 51;
		var i = 20;

		var partArray = data['images'].slice(0, i);
		var html = getImages(partArray);
		
		$(".content_table_1").append(html);

			$grid = $(".content_table_1").masonry({
				columnWidth: '.extra_img',
				gutter: 25,
				percentPosition: true,
			});

		 $(".img_block").bind({
		 	mouseenter: hoverIn,
		 	mouseleave: hoverOut
		 });

		
		replace_image($('iframe'));


		var click_i = 0
		
		$(".load_more").click( function()
		{
			click_i++

			if(click_i == 10) 
			{
				setTimeout( function() 
				{
					$(".load_more").hide();
				}, 800)

			}

			var $btn = $(this);

		    $btn.button('loading');


		    setTimeout(function () 
		    {
		    	partArray = data['images'].slice(i, i+10);
				$items = $(getImages(partArray));
				$grid.append( $items ).masonry( 'appended', $items );
				$(".img_block").css("transition", "all 0.5s");

				replace_image($items.find('iframe'));
				$(".img_block").bind({
					mouseenter: hoverIn,
					mouseleave: hoverOut
				});


				$(".modal_global").hover( function() {
					$(".modal_global").addClass("hover_in_modal");
					$(".image_trans").css("z-index", j);
					$this.removeClass("z-index");
					$this.removeClass("image_trans");
					$(".modal_global").fadeOut('fast');
					$(".modal_global").css("display", "none!important");
					$(".modal_info").hide();
				}, function() {
					$(".modal_global").removeClass("hover_in_modal");
				})
				i+=10;
		        $btn.button('reset');
		    }, 1000);
		})
	});




	$(".search_button").click( function() {
		if( $(".search_bar").hasClass("open_search") ) {
			$(".navbar").height(90);
			$(".search_bar").removeClass("open_search");
			$(".search_bar").fadeOut('slow');
		}
		else {
			$(".navbar").height(150);
			$(".search_bar").addClass("open_search");
			$(".search_bar").fadeIn('slow');
		}
	})

})
