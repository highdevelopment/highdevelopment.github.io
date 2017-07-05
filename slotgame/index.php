<?php
	$_SESSION['player_balance'] = 50000;
	$_SESSION['info_Major'] = 500;
	$_SESSION['info_Super'] = 500;
	$_SESSION['info_Ultimate'] = 500;
	$_SESSION['info_Grand'] = 500;
	$_SESSION['info_Minor'] = 500;
?>

<!DOCTYPE HTML>
<html>
	<head>
		<meta charset="UTF-8"/>    
		<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
		<meta id="myViewPort" name="viewport" content="minimal-ui, width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
		<meta name="apple-mobile-web-app-status-bar-style" content="black"/>
		<meta name="apple-mobile-web-app-capable" content="yes"/>
		<meta name="interface" content="desktop"/>

		<title>Lobby</title>

		<link type="text/css" rel="stylesheet" href="css/style.css">
		<link type="text/css" rel="stylesheet" href="css/contextmenu.css">
        <!-- <script type="text/javascript" src="src/js/jquery-2.2.4.js"></script> -->
        <script type="text/javascript" src="src/js/jquery-3.1.0.min.js"></script>
<!--  		<link type="text/css" rel="stylesheet" href="css/jquery.mobile-1.4.5.min.css">
        <script type="text/javascript" src="src/js/jquery.mobile-1.4.5.min.js"></script> -->
    	<script type="text/javascript" src="src/js/jquery.fullscreen-min.js"></script>

	</head>

	<!-- <body class="contex_menu_canvas"> -->
	<body>
		<input type="hidden" id="txt_balance" value="<?php echo $_SESSION['player_balance']; ?>">
		<input type="hidden" id="info_Major" value="<?php echo $_SESSION['info_Major']; ?>">
		<input type="hidden" id="info_Super" value="<?php echo $_SESSION['info_Super']; ?>">
		<input type="hidden" id="info_Ultimate" value="<?php echo $_SESSION['info_Ultimate']; ?>">
		<input type="hidden" id="info_Grand" value="<?php echo $_SESSION['info_Grand']; ?>">
		<input type="hidden" id="info_Minor" value="<?php echo $_SESSION['info_Minor']; ?>">

		<div id='div_lobby'></div>
		<!-- <div id='div_game'> -->
		<!-- <iframe id="game_area" src="" frameborder="0" scrolling="no" webkitAllowFullScreen mozAllowFullScreen allowFullScreen>
			
		</iframe> -->
		<!-- </div> -->

		<nav id="context-menu" class="context-menu">
			<ul class="context-menu__items">
				<li class="context-menu__item">
					<a href="#" class="context-menu__link" data-action="getinformation"><i class="normal"></i>Get Information</a>
				</li>
			</ul>
		</nav>

		<div id="chatting">
<!-- 			<iframe class="class_iframe" src="http://work.panama-egaming.com/chattest/" frameborder="0">
			</iframe> -->
		</div>

		<div id="iframe_coinDlg">
			<!-- <div id="iframe_border">
				<img id="close_button" src="assets/image/toolbar/close_button.png">
				<iframe class="class_iframe" src="http://work.panama-egaming.com/processing/account.php" frameborder="0">
				</iframe>
			</div> -->
			<!-- <div class="dialog_background"></div> -->
		</div>


		<script type="text/javascript" src="games/conf.js"></script>
		
		<script type="text/javascript" src="src/js/phaser.min.js"></script>
		<script type="text/javascript" src="src/js/contextmenu.js"></script>
		<script type="text/javascript" src="src/boot.js"></script>
		<script type="text/javascript" src="src/preload.js"></script>
		<script type="text/javascript" src="src/resource.js"></script>

		<script type="text/javascript" src="src/lobby/main.js"></script>
		<script type="text/javascript" src="src/lobby/icon_view.js"></script>
		<script type="text/javascript" src="src/lobby/myslider.js"></script>

		<script type="text/javascript" src="src/comm/game_env.js"></script>
		<script type="text/javascript" src="src/comm/loading.js"></script>
		<script type="text/javascript" src="src/comm/toolbar.js"></script>
		<script type="text/javascript" src="src/comm/mybutton.js"></script>
		<!-- <script type="text/javascript" src="src/comm/chattool.js"></script> -->
		<script type="text/javascript" src="src/comm/buycoin.js"></script>
		<script type="text/javascript" src="src/events.js"></script>

		<script>
			(function() {
				// var game = null;
				var width = 0;
				var height = 0;
				$(document).on('onBtnGoLobby', function() {               
        			
    			});
				$( document ).ready(function() {
					width = window.innerWidth * window.devicePixelRatio;
					height = window.innerHeight * window.devicePixelRatio;
					if(width < height) {
						width = height;
						height = window.innerWidth * window.devicePixelRatio;
					}
				});
				$(window).on('load', function (e) {
					game = new Phaser.Game(1900, 1200, Phaser.AUTO, "div_lobby", null, true);
					game.state.add("Boot", boot);
					game.state.add("Preload", preload);
					game.state.add("Lobby", theLobby);
					game.state.start("Boot");
				});

				$(document).on("keypress", function(evt) {
					evt.stopPropagation();
					evt.preventDefault();
				});
			})();
		</script>
	</body>

</html>      




