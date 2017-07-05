<?php
	$_SESSION["total_bet"] = array(0.1, 0.2, 0.5, 1.0, 2.0, 2.5, 4.0, 5.0, 7.5, 10.0, 12.5, 15.0, 25.0);
?>

<!DOCTYPE HTML>
<html>
	<head>
		<meta charset="UTF-8"/>
		<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
		<meta id="myViewPort" name="viewport" content="user-scalable=1, width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
		<meta name="apple-mobile-web-app-status-bar-style" content="black"/>
		<meta name="apple-mobile-web-app-capable" content="yes"/>
		<meta name="interface" content="desktop"/>

		<title>Wild Gusher</title>

		<link type="text/css" rel="stylesheet" href="../../css/style.css">
		<link type="text/css" rel="stylesheet" href="../../css/contextmenu.css">
		<script type="text/javascript" src="../../src/js/contextmenu.js"></script>
		<script type="text/javascript" src="../../src/js/phaser.min.js"></script>
        <script type="text/javascript" src="../../src/js/jquery-2.2.4.js"></script>
    	<script type="text/javascript" src="../../src/js/jquery.fullscreen-min.js"></script>
	</head>

	<!-- <body class="contex_menu_canvas"> -->
	<body class="">
		<nav id="context-menu" class="context-menu">
			<ul class="context-menu__items">
				<li class="context-menu__item">
					<a href="#" class="context-menu__link" data-action="getinformation"><i class="normal"></i>Get Information</a>
				</li>
			</ul>
		</nav>
		<input type="hidden" id="bet_value" value="<?php $string=implode(",", $_SESSION["total_bet"]); echo $string;?>">
		
		<script type="text/javascript" src="../../src/comm/main_game.js"></script>
		<script type="text/javascript" src="../../src/comm/game_env.js"></script>
		<script type="text/javascript" src="../../src/comm/loading.js"></script>
		<script type="text/javascript" src="../../src/comm/toolbar.js"></script>
		<script type="text/javascript" src="../../src/comm/chat_tool.js"></script>
		<script type="text/javascript" src="../../src/comm/mybutton.js"></script>
		<script type="text/javascript" src="../../src/comm/buycoin.js"></script>
		<script type="text/javascript" src="../../src/comm/labelbutton.js"></script>
		<script type="text/javascript" src="../../src/comm/popup.js"></script>
		<script type="text/javascript" src="../../src/comm/game/createview.js"></script>


		<script type="text/javascript" src="../../src/comm/game/progressbar.js"></script>
		<script type="text/javascript" src="../../src/comm/game/game_title.js"></script>
		<script type="text/javascript" src="../../src/comm/game/LineDrawer.js"></script>
		<script type="text/javascript" src="../../src/comm/game/Particles.js"></script>
		<script type="text/javascript" src="../../src/comm/game/PayView.js"></script>
		<script type="text/javascript" src="../../src/comm/game/VideoManager.js"></script>
		<script type="text/javascript" src="../../src/comm/game/Animations.js"></script>
		<script type="text/javascript" src="../../src/comm/game/Effects.js"></script>
		<script type="text/javascript" src="../../src/comm/game/reel.js"></script>
		<script type="text/javascript" src="../../src/comm/game/spinview.js"></script>
		<script type="text/javascript" src="../../src/comm/game/gameview.js"></script>
		<script type="text/javascript" src="../../src/comm/game/game_toolbar.js"></script>

		<script type="text/javascript" src="src/gameconf.js"></script>
		<script type="text/javascript" src="src/resource.js"></script>

		<script type="text/javascript" src="src/game/gameview_ex.js"></script>
		<script type="text/javascript" src="src/game/gametoolbar_ex.js"></script>

		<script>
			(function() {
				$(window).load(function() {
					initializeGame();
				});
			})();
		</script>
	</body>

</html>      




