<?php
define('_MC_',1);
include('includes/init.php');

if(!isset($_GET['id'])){
	die('ID not specified');
}

$id = (int)$_GET['id'];
$msg=array('ok'=>true,'msg'=>null);

if($_GET['task']=='save'){
	
	$query='UPDATE site_visits SET note='.q($_GET['note']).' WHERE id='.$id;
	if( db()->exec($query)!== false ){
		$msg['msg'] = 'Your changes have been saved';
	}else{
		$msg['msg'] = 'An error has occured, please try again';
		$msg['ok'] = false;
	}
}


$query = "SELECT note FROM site_visits WHERE id=$id";
$p = db()->query($query)->fetch();	


?>
<!DOCTYPE html>
<head>
<link rel="icon" href="images/fav.ico" type="image/x-icon">
<meta charset="utf-8">
<title>Note</title>    
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<style>
*{
	margin: 0px;
	padding: 0px;
}
body{
	font-weight: 300;	
	font-size: 17px;
}
a{
	text-decoration: none;
	border: none;
}

#wrapper{
	width: 350px;
	margin: 0px auto;
	padding: 0px;
}
h2.title{
	margin: 10px auto;
	width: 300px;
}
label
{
	font-size:16px;
	color: #808BAD;
}
.float{
	display: inline-block;
	width: 100px;
}
.row{
	margin: 5px; 
}
.submit{
	display: block;
	width: 80px;
	background: #003387;
	font-weight: bold;
	color: white;
	border: 0 none;
	border-radius: 1px;
	cursor: pointer;
	padding: 5px;
	margin: 10px auto;
}
.ok,.error{
	background-size: 40px 40px;
	background-image: linear-gradient(135deg, rgba(255, 255, 255, .05) 25%, transparent 25%,
								transparent 50%, rgba(255, 255, 255, .05) 50%, rgba(255, 255, 255, .05) 75%,
								transparent 75%, transparent);										
	box-shadow: inset 0 -1px 0 rgba(255,255,255,.4);
	width: 100%;
	border: 1px solid;
	color: #fff;
	padding: 5px 0px;
	margin: 0px auto;
	text-shadow: 0 1px 0 rgba(0,0,0,.5);
	text-align: center;
}
.ok {
	background-color: #61b832;
	border-color: #55a12c;
}
.error {
	background-color: #de4343;
	border-color: #c43d3d;
}
</style>
<script type="text/javascript">
    $(function(){
           	
    });
</script>
</head>
<body>
	<div id="wrapper">
		<form method="get" >
			<?php if($msg['msg']!=null) echo msg($msg); ?>
			<div class="row">	
				<label>Note : </label>				
			</div>			
			<div class="row">
				<textarea name="note" style="width:320px;height:80px"><?php if (isset($p['note'])){echo $p['note'];}?></textarea>
			</div>
			<input type="submit" value="Save" class="submit" />
			<input type="hidden" name="id" value="<?php echo $id;?>" />
			<input type="hidden" name="task" value="save" />
		</form>
	</div>
</body>

<?php    
    function msg($msg){
      $class=($msg['ok']) ? 'ok' : 'error';
      return '<div class="msg flash '.$class.'">'.$msg['msg'].'</div>';
    }
?>