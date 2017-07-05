
$(document).ready(function()
{
	mainView 	= new classMain();
});

// $(window).ready(function()
// {
// 	var tab = $(".works-filter").children('a').first();
// 	tab.trigger('click');
// })

var classMain 	= function()
{
	var main = this;

	this.init = function()
	{
		// var pagination = $('#home').find('.owl-pagination');
		// pagination.hide();
		// var video = $("#video_background");
		// video.play();
		$('#video_pause').hide();

		var width = $(window).width();
		if(width < 800)
			$('#background_png').css('min-height', 1200);
		else
			$('#background_png').css('min-height', 800);

		this.initFaceBook();
		this.initEvent();


		$('#first_filter').addClass("active");
		fselector = $('#first_filter').attr('data-filter');

		work_grid.imagesLoaded(function(){
			work_grid.isotope({
				itemSelector: '.mix',
				layoutMode: "fitRows",
				filter: fselector
			});
 		});

		var service_desc = $('#services_desc').children();
		var max_height = 0;
		$.each(service_desc, function(index, obj)
		{
			var height = $(obj).height();
			if(max_height < height)
				max_height = height;
		})
		if(max_height < $(window).height())
			$('#services_desc').height(max_height);
	}

	this.initFaceBook = function()
	{
		//https://graph.facebook.com/1617219031933660_1746896065632622/picture?access_token=331606223887493|457cc0809f6219564c90b52fe8fb4277
		var facebook_appid = '331606223887493';
		var facebook_secrete = '457cc0809f6219564c90b52fe8fb4277';
		var pageid = '1617219031933660';
		var username = 'doun2u3d@gmail.com';
		var command = '/' + pageid + '/feed?access_token=' + facebook_appid + '|' + facebook_secrete;
		FB.api(
			command,
			function (response)
			{
				if (response && !response.error)
				{
					/* handle the result */
					$.each(response.data, function(index, feed_obj)
					{
						if(index <= 2) {
						FB.api(
							'/' + feed_obj.id + '?fields=full_picture,link,name,description,caption,created_time',
							function(res)
							{
								if (res && !res.error)
								{
									main.addFBfeed(res);
								}
							}
						);
					}
					})
				}
			}
		);
	}

	this.addFBfeed = function(feed_obj)
	{
		// var div = $('#news .container');
		var div = $('#facebook_feeds');
		var feed_section = new CFeedSection(feed_obj);
		div.append(feed_section.view);
	}

	this.initEvent = function()
	{
		$('#video_play').click(function()
		{
			videobackground.videoEl.play();
			$('#video_play').hide();
			$('#video_pause').show();
		});

		$('#video_pause').click(function()
		{
			videobackground.videoEl.pause();
			$('#video_play').show();
			$('#video_pause').hide();
		});

		$('.team-item-image').click(function()
		{

		})
	}

	this.init();
}

var g_months = 
[
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

var CFeedSection = function(feed_data)
{
//	console.log(feed_data.picture);
	var main = this;
	this.view;

	this.init = function()
	{
		// var html = 
		// 		'<div class="container relative">\
		// 			<section>\
		// 				<img src="" class="right">\
		// 				<div>\
		// 					<h5>Intervoke</h5>\
		// 					<p>9hrs</p>\
		// 				</div>\
		// 			</section>\
		// 			<a href="http://uploadvr.com/microsoft-researchs-experimental-vr-co…/">http://uploadvr.com/microsoft-researchs-experimental-vr-c</a>\
		// 			<section>\
		// 				<img src=' + feed_data.picture + '>\
		// 			</section>\
		// 			<h4>Controllers From Microsoft Research Show A New Way To Feel Stuff In VR</h4>\
		// 			<p>We’re eager to go hands-on with Valve’s new prototype Vive controllers, but these new experiments from Microsoft’s Research division might be even...</p>\
		// 		</div>';
		var str_link = feed_data.link;
		if(str_link.substr(str_link.length - 1, 1) == '/')
			str_link = str_link.slice(0, -1);
		var str_Title = feed_data.name;
		if(!str_Title)
			str_Title = 'Intervoke';
		var str_description = feed_data.description;
		if(!str_description)
			str_description = '';
		var str_Name = feed_data.caption;
		if(!str_Name)
			str_Name = 'Intervoke';
		var strX = new Date(feed_data.created_time);
		var str_Time = strX.getDate() + ' ' + g_months[strX.getMonth()];
		var strPicture = feed_data.full_picture;
		if(!strPicture)
			strPicture = 'images/news/no_img.jpg';

		var html = 
			'<div class="col-sm-6 col-md-4 col-lg-4 mb-md-50 wow fadeIn" data-wow-delay="0.1s" data-wow-duration="2s">\
				<div class="post-prev-img">\
					<a href='+ str_link +'><img src=' + strPicture + ' alt="" /></a>\
				</div>\
				<div class="post-prev-title font-alt font_semibold">\
					<a href="">' + str_Title + '</a>\
				</div>\
				<div class="post-prev-info font-alt">\
					<a href="">' + str_Name + '</a> | ' + str_Time + '\
				</div>\
				<div class="post-prev-text">\
					'+ str_description + '\
				</div>\
				<div class="post-prev-more">\
					<a href=' + str_link + ' class="btn btn-mod btn-gray btn-round">Read More <i class="fa fa-angle-right"></i></a>\
				</div>\
			</div>';

		this.view = $(html);
	}

	this.init();
}