/*****************************************************
	Description 	: Lobby Events
	Created 		: 2016/08/12
	Copyright		: 2016
******************************************************/


(function() {
	$('#game_area').on("load", function() {
	    // $('canvas').css('display', 'none');
	    $('#game_area').show();
	    // $('canvas').css('z-index', 100);
	    // $('#game_area').css('z-index', 1000);
    	// $('#game_area').attr('tabindex', 0);
	    // $('#game_area').focus();
	});
	$(document).on('onBtnGoLobby', function() {
	    $('#game_area').hide();
	    // $('canvas').css('z-index', 1000);
	    // $('#game_area').css('z-index', 100);
    	// $('canvas').css('display', 'block');
    	$('canvas').attr('tabindex', 0);
    	$('canvas').focus();
    	g_gameSound.resume();
    	g_gameEnv.toolbar.chatTool.rePositionChat();

    	// var total_balance = localStorage.getItem("total_balance");
    	var total_balance = $('#txt_balance').attr('value');
    	g_gameEnv.setCurBalance(total_balance, false);
    	// gameView.game_toolbar.txtBalance.text = g_gameEnv.gameinfo.totalBalance;
	});
	$(document).on('onBtnSignout', function() {
		window.location.href = '../../logout.php';
	})
	$(document).on('onBtnFullScreen', function() {
		if($(document).fullScreen())
		{
			$(document).fullScreen(false);
		}
		else
		{
			$(document).fullScreen(true);
		}
	});
	$(document).on('chat_tool', function(event, param) {
		if(param.type == 'rePositionChat') {
			$('#chatting').css('left', param.x + 'px');
			$('#chatting').css('top', param.y + 'px');
		}
		else if(param.type == 'chat_show') {
			if($('#chatting').css('display') == 'none') {
				$('#chatting').css('display', 'block');
				// this.rePositionChat();
				// $('#chatting').css('width', background.width / game.scale.scaleFactor.x + 'px');
				// $('#chatting').css('height', '0px');
				$("#chatting").animate({
					height: "+=520",
				}, 250, function() {
					// Animation complete.
				});
			}
			else {
				$('#chatting').animate({
					height: "0px",
				}, 150, function() {
					// Animation complete.
					$('#chatting').css('display', 'none');
				});
			}
		}
	});
	$(document).on('show_coin_dlg', function(event, param) {
		var dlg = $('#iframe_border');
		var window_width = $(window).width();
		var window_height = $(window).height();
		var width = dlg.width();
		var height = dlg.height();

		if(width > window_width)
			width = window_width;
		else if(window_width > 1030)
			width = 1030;

		if(height > window_height)
			height = window_height;
		else if(window_height > 677)
			height = 677;
		dlg.css('width', width - 30);
		dlg.css('height', height - 30);

		width = dlg.width();
		height = dlg.height();
		// var left = (window_width - width) * 0.5;
		// dlg.css('left', left);
		var top = (window_height - height) * 0.5;
		dlg.css('top', top);
		$('#iframe_coinDlg').fadeIn();
	});
	$('#close_button').click(function() {
		$('#iframe_coinDlg').fadeOut();
		var total_balance = $("#txt_balance").val();
		g_gameEnv.setCurBalance(total_balance, true);

		var frame_window = $('#game_area')[0].contentWindow;
		if(frame_window && frame_window.g_gameEnv)
		{
			frame_window.g_gameEnv.setCurBalance(total_balance, true);
			$('#game_area').attr('tabindex', 0);
	    	$('#game_area').focus();
		}
		// frame_window.onCoinDgCloseButton(total_balance);
		// var doc = game_document.contentWindow.document;
		// $(game_document).trigger('trigger_close_button');
	});


	// $(document).on('onBtnFullScreen', function() {
	// });
	$(window).resize(function() {
		// var width = window.innerWidth * window.devicePixelRatio - 100;
		// var height = window.innerHeight * window.devicePixelRatio - 100;
		// var width1 = $(window).width();
		// var height1 = $(window).height();
		// $('#game_area').css('width', width);
		// $('#game_area').css('height', height);
		// console.log(width, height, width1, height1);
	});
})();