<?php
define('_MC_',1);
include('includes/init.php');
$msg=array('ok'=>true,'msg'=>null);
if($_POST['task']=='refresh'){
	$ret=array();
	$conds=array();		 
	
	if((int)$_POST['hasPhone']==1){
		$conds[]="phone<>''";
	}
		
	if((int)$_POST['today']==1){
		$conds[]='DATE(s.timestamp)=DATE(NOW())';
	}
	if((int)$_POST['Complete']==1){
		$conds[]='submitted_info=1';
	}
	if((int)$_POST['PPC']==1){
		$conds[]="source NOT LIKE '%direct%' and source NOT LIKE '%manual%'";
	}
	
	$cond_string = implode(' AND ', $conds);
	
		
	$query="SELECT s.id sid,s.*,l.* FROM  `site_visits` s LEFT JOIN leads l ON (l.token=s.token) ".( $cond_string=='' ? '' : "WHERE $cond_string" )." group by s.token ORDER BY  s.timestamp DESC";
	$ret['q'] =$query;	
	$rows=db()->query($query)->fetchAll();
	$i=0;
	$total_conversion=0;
    $ret['appointment']='';
    $ret['contact']='';
    $ret['visits']='';    
    $ret['hidden']='';
	$ret['all']='';
	
	foreach($rows as $row){	
		$i++;
		$alt=2;
		$total_conversion = (trim($row['phone'])=='') ? $total_conversion : $total_conversion+1;
		$row=array_map('formatRow',$row);
		$id = $row['sid'];
		$rating= getCallRating($row['sid'],$row['call_rating']);
		$phone = preg_replace('/^(\d{3})(\d{3})(\d{4})$/i', '($1) $2-$3', $row['phone']);
		$tr_cls = ($row['call_rating'] == 'Bad') ? 'grey' : '';
		$site = str_replace(array('www.','.com'),'', $row['initial_page']);
		
		if($row['hidden']==1){
			
			$ret['hidden'].="<tr  data-id=\"$id\" class='smalt$alt $tr_cls'>
								<td class='editable' data-name='firstName' data-id='$row[id]'>$row[name]</td>
								<td nowrap><div>$row[email]</div></td>
								<td><a href='tel:$phone'>$phone</a></td>
								<td nowrap><div>$row[state]</div></td>
								<td nowrap><div><a href='http://$row[website]' target='_blank'>$row[website]</a></div></td>
								<td nowrap>".( date('m-d h:i' ,strtotime($row['timestamp'])) )."</td>
								<td>$row[source]</td>								
								<td>$rating</td>
								<td  valign='top'><a href='note.php?id=$id' class='popup-note'>Notes</a></td>
								<td  valign='top' class='unhide'>[un-hide]</td>
							</tr>";
						
		}
		elseif($row['method']=='appointment'){
			$ret['appointment'].="	<tr  data-id=\"$id\" class='smalt$alt $tr_cls'>
								<td class='editable' data-name='firstName' data-id='$row[id]'>$row[name]</td>
								<td nowrap><div>$row[email]</div></td>
								<td><a href='tel:$phone'>$phone</a></td>
								<td nowrap><div>$row[when]</div></td>
								<td nowrap><div>$row[state]</div></td>
								<td nowrap><div>$site</div></td>
								<td nowrap>".( date('m-d h:i' ,strtotime($row['timestamp'])) )."</td>
								<td>$row[source]</td>								
								<td>$rating</td>
								<td  valign='top'><a href='note.php?id=$id' class='popup-note'>Notes</a></td>
								<td  valign='top' class='hide'><img src='images/del.png'/></td>
							</tr>";
			
		}
		elseif($row['method']=='contact'){
			
			$ret['contact'].="	<tr data-id=\"$id\" class='smalt$alt $tr_cls'>
								<td class='editable' data-name='firstName' data-id='$row[id]'>$row[name]</td>
								<td nowrap><div>$row[email]</div></td>
								<td><a href='tel:$phone'>$phone</a></td>
								<td nowrap><div>$row[state]</div></td>
								<td nowrap><div>$site</div></td>
								<td nowrap><div style='width:300px;'>$row[message]</div></td>
								<td nowrap>".( date('m-d h:i' ,strtotime($row['timestamp'])) )."</td>
								<td>$row[source]</td>								
								<td>$rating</td>
								<td  valign='top'><a href='note.php?id=$id' class='popup-note'>Notes</a></td>
								<td  valign='top' class='hide'><img src='images/del.png'/></td>
							</tr>";

			
		}
		elseif($row['method']=='--'){

			$ret['visits'].="<tr class='smalt$alt $tr_cls'>
					<td class='editable' data-name='firstName' data-id='$row[id]'>$row[name]</td>
					<td nowrap><div>$row[email]</div></td>
					<td><a href='tel:$phone'>$phone</a></td>
					<td nowrap><div>$row[state]</div></td>
					<td nowrap>".( date('m-d h:i' ,strtotime($row['timestamp'])) )."</td>
					<td>$site</td>							
					<td>$row[source]</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
				</tr>";
			
		}
		
		if( ($row['method']=='appointment' || $row['method']=='contact' ) && $row['hidden']==0 ){
			$ret['all'].="	<tr  data-id=\"$id\" class='smalt$alt $tr_cls'>
								<td class='editable' data-name='firstName' data-id='$row[id]'>$row[name]</td>
								<td nowrap><div>$row[email]</div></td>
								<td><a href='tel:$phone'>$phone</a></td>
								<td nowrap><div>$row[when]</div></td>
								<td nowrap><div>$row[state]</div></td>
								<td nowrap><div>$site</div></td>
								<td nowrap>".( date('m-d h:i' ,strtotime($row['timestamp'])) )."</td>
								<td>$row[source]</td>								
								<td>$row[method]</td>
								<td>$rating</td>
								<td  valign='top'><a href='note.php?id=$id' class='popup-note'>Notes</a></td>								
								<td  valign='top' class='hide'><img src='images/del.png'/></td>
							</tr>";
			
		}		
		
	}		
			
	$ret['stats'] = "Total Visits: <b>$i</b> | Total Conversions: <b>$total_conversion</b> | Conversion: <b>".( $i==0 ? 0 : ceil(($total_conversion*100)/$i) )."</b>%	";
	
	$date_conds = array();
	
	if(isset($_POST['from'])){
		$date_conds[]=" DATE(timestamp) >= '".str_replace('/', '-', $_POST['from'])."'";
	}else{
		$date_conds[]=" DATE(timestamp) >= '".date('26-04-2014')."'";
	}
	if(isset($_POST['to'])){
		$date_conds[]=" DATE(timestamp) <= '".str_replace('/', '-', $_POST['to'])."'";
	}else{
		$date_conds[]=" DATE(timestamp) <= '".date('Y-m-d')."'";
	}
	
	$date_cond = " AND ".implode(' AND ', $date_conds);
	
	
	$query="SELECT 				
				(SELECT COUNT(DISTINCT ip) from site_visits where left(ip,5) NOT in ('209.8','66.24')  $date_cond AND source like '%gaw%') total,
				(SELECT COUNT(DISTINCT ip) from site_visits where left(ip,5) NOT in ('209.8','66.24') AND submitted_info=1  AND source like '%gaw%' $date_cond) submits";

	$stats=db()->query($query)->fetch();
	
	$ret['tableStats']="
					<tr>					
						<td class='th'>Total Visits (%gaw%)</td>
						<td class='th'>$stats[total]</td>
					</tr>
					<tr>					
						<td class='th'>Form Submits (%gaw%)</td>
						<td class='th'>$stats[submits]</td>
					</tr>
					<tr>					
						<td class='th'>Conversion Rate (%gaw%)</td> 
						<td class='th'>".( ($stats['total']==0)? 0 : number_format(($stats['submits']*100)/$stats['total'],1) )."%</td>
					</tr>";
		
	
	echo json_encode($ret); 
	exit();
}
elseif(isset($_GET['rating'])){ 
   		
	$query = 'UPDATE site_visits SET call_rating='.q($_GET['rating']).' WHERE id='.(int)$_GET['id'];
	$msg['q']=$query;
	if(db()->exec($query)===false){	        	
    	$msg['ok']=false;
    	$msg['msg']='An error has occured , please try again';	
	}
    echo json_encode($msg);
    exit();

}
elseif($_GET['task']=='hide'){
    $query = 'UPDATE site_visits SET hidden=1 WHERE id='.(int)$_GET['id'];
    db()->exec($query);
    echo json_encode($msg);
    exit();
}
elseif($_GET['task']=='unhide'){
    $query = 'UPDATE site_visits SET hidden=0 WHERE id='.(int)$_GET['id'];
    db()->exec($query);
    echo json_encode($msg);
    exit();
}

?>
<!DOCTYPE html>
<head>
<link rel="icon" href="images/fav.ico" type="image/x-icon">
<meta charset="utf-8"> 
<title>Customers</title> 
<link rel="stylesheet" href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">
<LINK href="styles/cus.css" rel="stylesheet" type="text/css">       
<link href="styles/jquery.fancybox.css" type="text/css" rel="stylesheet">
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<script src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
<script type="text/javascript" src="js/jquery.fancybox.js"></script>
<script type="text/javascript">
var refreshOpt=true;
$(function(){
	
	var timeout=10;        
    //setInterval(function(){refresh()},timeout * 1000);
        
    $( document ).tooltip();
    $( "#tabs" ).tabs();
	$('.rating').live('change',function(){
       var val = $(this).val();
       var id = $(this).attr('data-id');
       $('#ajx-ldr').show();
       $.get(location.href,{rating : val ,id : id, ajax : true} , function(ret){
       		$('#ajx-ldr').hide();
            if(!ret.ok){
	            alert(ret.msg);
            }
            
       } 
       , 'json');	              
	});
   
    $('.hide').live('click',function(){
	    var p = $(this).parent('tr');
	    var id = p.attr('data-id');
	    $('#ajx-ldr').show();
	    $.get(location.href,{ajax : true,task: 'hide',id : id} , function(ret){
			refresh();
	    });
    });

    $('.unhide').live('click',function(){
	    var p = $(this).parent('tr');
	    var id = p.attr('data-id');
	    $('#ajx-ldr').show();
	    $.get(location.href,{ajax : true,task: 'unhide',id : id} , function(ret){
			refresh();
	    });
    });
    
    $("a.popup-note").fancybox({'type': 'iframe','width': 380,'height': 195,'autoSize':false,'autoDimensions':false,'hideOnOverlayClick':false});
    
    $('.editable input').live('keyup',function(e){
    	var code = e.keyCode || e.which;
    	var t=$(this);
    	var id = t.parent().attr('data-id');
    	var name = t.parent().attr('data-name');
		if(code == 13) {
			refreshOpt=false;
			$('#ajx-ldr').show();
			$.post(location.href,{task:'update',id:id,name:name,val:t.val()},function(){
				refreshOpt=true;
				$('#ajx-ldr').hide();
				t.parent().html(t.val());	
			},'json');
		}
    });
   	
    $('.opts [type="checkbox"]').change(function(){
	   refresh();
   });
    
   $('.date-submit').click(function(){
	   refresh();
   })
    
    $("#date-from,#date-to").datepicker({ dateFormat: 'yy/mm/dd'});
    
<?php 
	if(isset($_GET['from'])):
?>
		$("#date-from").datepicker("setDate", '<?php echo $_GET['from']?>');
		
<?
	else : 		
?>	
		$("#date-from").datepicker("setDate", '2014/04/26' );
<?		
	endif;
?>		
<?php 
	if(isset($_GET['to'])):
?>
		$("#date-to").datepicker("setDate", '<?php echo $_GET['to']?>');
<?
	else : 		
?>	
		$("#date-to").datepicker("setDate", '<?php echo date('Y/m/d');?>');
<?		
	endif;
?>		
	    
	refresh();
		
}); 
function refresh(){
	if(!refreshOpt) return false;
	var users = $('[name="users"]').val();
	$('#ajx-ldr').show();
	var data = $('.opts form').serializeArray();
	var from = $('[name="from"]').val();
	var to = $('[name="to"]').val();
	data.push({name:'from',value: from },{name:'to',value: to });
	
    $.post(location.href,data, function(ret){        	
   		$('#ajx-ldr').hide();
        $('#log tbody').html(ret.html);
        $('#appointment .log tbody').html(ret.appointment);
        $('#contact .log tbody').html(ret.contact);
        $('#visits .log tbody').html(ret.visits);
        $('#hidden .log tbody').html(ret.hidden);		
        $('#all .log tbody').html(ret.all);		
		$('.stats').html(ret.stats);
		$('.stats_table tbody').html(ret.tableStats);
        
    } 
    , 'json');   
    
}
</script>
<style>
#log{
	margin: 10px auto;
}
.stats_date{
	width: 400px;
	margin: 5px auto;
}
</style>
</head>
<body>
	<div id="wrapper" style="box-shadow:none;">
<?php
	if($msg['msg']!=null){
		echo msg($msg);
	}
?>		<div class="stats_date">
			<form method="get">
				<b>FROM:</b> <input type="text" name="from" id="date-from"/>
				<b>TO:</b> <input type="text" name="to" id="date-to"/>
				<input type="button" value="OK" class="date-submit"/>
			</form>	
		</div>	
		<div>
			<table class="stats_table">
				<thead>
					<th>&nbsp;</th>
					<th>Main Site</th>
				</thead>
				<tbody>					
				</tbody>
			</table>
			
		</div>

		<div class="opts">
			<form>
				Show only : 
				<input type="checkbox" name="hasPhone" value="1" checked="checked"><b>Has Phone</b> |
				<input type="checkbox" name="today" value="1"><b>Today Only</b> |
				<input type="checkbox" name="Complete" value="1"><b>Complete Fills</b> |
				<input type="checkbox" name="PPC" value="1"><b>PPC Leads</b>
				<input type="hidden" name="task" value="refresh">
			</form>	
		</div>			
		<div class="stats">
		</div>

		<div id="tabs">
			<ul>
				<li><a href="#all">All</a></li>
			    <li><a href="#appointment">Appointment</a></li>
			    <li><a href="#contact">Contact</a></li>
			    <li><a href="#visits">Visits</a></li>
			    <li><a href="#hidden">Hidden</a></li>
			</ul>
			<div id="all">
			<table class="log">
				<thead>
					<tr>
						<th>Name </th>
						<th>Email</th>
						<th>Phone</th>
						<th>When</th>
						<th>State</th>
						<th>Site</th>
						<th>Date</th>						
						<th>Source</th>
						<th>Type</th>
						<th>&nbsp;</th>
						<th>&nbsp;</th>
						<th>&nbsp;</th>
					</tr>
				</thead>					
				<tbody>
				</tbody>
			</table>
			</div>			
			<div id="appointment">
			<table class="log">
				<thead>
					<tr>
						<th>Name </th>
						<th>Email</th>
						<th>Phone</th>
						<th>When</th>
						<th>State</th>
						<th>Site</th>
						<th>Date</th>							
						<th>Source</th>
						<th>&nbsp;</th>
						<th>&nbsp;</th>
						<th>&nbsp;</th>
					</tr>
				</thead>					
				<tbody>
				</tbody>
			</table>
			</div>

			<div id="contact">
			<table class="log">
				<thead>
					<tr>
						<th>Name </th>
						<th>Email</th>
						<th>Phone</th>
						<th>State</th>
						<th>Site</th>
						<th style="width:300px;">Message</th>
						<th>Date</th>					
							<th>Source</th>
						<th>&nbsp;</th>
						<th>&nbsp;</th>
						<th>&nbsp;</th>
					</tr>
				</thead>					
				<tbody>
				</tbody>
			</table>
			</div>			
			<div id="visits">
			<table class="log">
				<thead>
					<tr>
						<th>Name </th>
						<th>Email</th>
						<th>Phone</th>
						<th>State</th>
						<th>Date</th>					
						<th>Source</th>
						<th>&nbsp;</th>
						<th>&nbsp;</th>
					</tr>
				</thead>					
				<tbody>
				</tbody>
			</table>
			</div>
			<div id="hidden">
			<table class="log">
				<thead>
					<tr>
						<th>Name </th>
						<th>Email</th>
						<th>Phone</th>
						<th>State</th>
						<th>Date</th>
						<th>When</th>
						<th>Source</th>
						<th>Type</th>
						<th>&nbsp;</th>
						<th>&nbsp;</th>
						<th>&nbsp;</th>
					</tr>
				</thead>					
				<tbody>
				</tbody>
			</table>
			</div>			
		</div>	
	</div>
	<div id="ajx-ldr">
		Loading...
	</div>

</body>

<?php

function formatRow($val){
	return trim($val)=='' ?'--' : $val; 
}

function getCallRating($id,$selected=null){
	$ratings= array('Great','Good','Bad');
	$select = "<select name='rating' class='rating'  data-id='$id' style='width:60px;'>";
	$select.= "<option value=''> - </option>";
	foreach($ratings as $v){				
		$selected_attr=($selected == $v)? 'selected' : '';
		$select .= "<option value='$v' $selected_attr >$v</option>";
	}
	$select .= '</select>';
	return $select;
}
?>
