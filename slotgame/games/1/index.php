<?php
 $_SESSION["total_bet"] = array(1, 2, 5, 10, 20, 25, 40, 50, 75, 100, 125, 150, 250);
?>
<input type="hidden" id="bet_value" value="<?php $string=implode(",", $_SESSION["total_bet"]); echo $string;?>">

<!DOCTYPE HTML>
<html>  
	
	<head>    
		<meta charset="UTF-8"/>    
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
		<meta name="apple-mobile-web-app-status-bar-style" content="black" />
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<meta name="interface" content="desktop" />

		<title>Slots </title>     

		<link type="text/css" rel="stylesheet" href="../../css/style.css">
		<link type="text/css" rel="stylesheet" href="../../css/contextmenu.css">
		<script type="text/javascript" src="../../src/js/contextmenu.js"></script>
		<script type="text/javascript" src="../../src/js/phaser.min.js"></script>
        <script type="text/javascript" src="../../src/js/jquery-2.2.4.js"></script>
        <script type="text/javascript" src="../../src/comm/loading.js"></script>
    	<script type="text/javascript" src="../../src/js/jquery.fullscreen-min.js"></script>
	</head>  

	<body>
		<input type="hidden" id="bet_value" value="<?php $string=implode(",", $_SESSION["total_bet"]); echo $string;?>">
		
		<script type="text/javascript" src="../../src/comm/game_env.js"></script>
		<script type="text/javascript" src="../../src/comm/toolbar.js"></script>
		<script type="text/javascript" src="../../src/comm/chat_tool.js"></script>
		<script type="text/javascript" src="../../src/comm/buycoin.js"></script>

		<script type="text/javascript" src="src/main.js" ></script>
		<script type="text/javascript" src="src/create.js" ></script>
		<script type="text/javascript" src="src/render.js" ></script>
		<script type="text/javascript" src="src/preload.js" ></script>
		<script type="text/javascript" src="src/global.js" ></script>
		<script type="text/javascript" src="src/reelgroup.js" ></script>
		<script type="text/javascript" src="src/actions.js" ></script>
		<script type="text/javascript" src="src/paytable.js" ></script>
		<script type="text/javascript" src="src/line.js" ></script>
		<script type="text/javascript" src="src/popup.js" ></script>
		<script type="text/javascript" src="src/bonus/preload.js" ></script>
		<script type="text/javascript" src="src/bonus/create.js" ></script>
		<script type="text/javascript" src="src/bonus/actions.js" ></script>
		<script type="text/javascript" src="src/bonus/cover.js" ></script>
		<script type="text/javascript" src="src/bonus/animal.js" ></script>
		<script type="text/javascript" src="src/bonus/coffin.js" ></script>
		<script>
			window.onload = init();
		</script>
	</body>

</html>      




