<?php
session_start();

$page = (isset($_GET['s']) && file_exists("$_GET[s].php")) ? "$_GET[s].php" : 'home.php';

$type = isset($_GET['type']) ? $_GET['type'] : 'medical';

$source = isset($_GET['source']) ? $_GET['source'] : 'direct';

if(!isset($_COOKIE['source']) && $source !='direct'){

	setcookie('source',$source ,time() + (86400 * 7));

}elseif(isset($_COOKIE['source']) && $source =='direct'){

	$source = $_COOKIE['source'];

}

if(!isset($_SESSION['token'])){
	$_SESSION['token'] = uniqid();
}

$token = $_SESSION['token'];

?>
<!DOCTYPE html>
<head>
	<meta charset="utf-8">
	<title>Hemorrhoid Treatment - HemWell America</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="icon" href="images/favico.png" type="image/x-icon">
	<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,700' rel='stylesheet' type='text/css'>
	<meta name="description" content="Specialized marketing for doctors and the medical industry">
	<meta name="keywords" content="Hemorrhoid, wellness, tampa, St. petersburg, hemorrhoid treatment">
	<link rel="stylesheet" href="//code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" type="text/css" media="all" />
	<link rel="stylesheet" type="text/css" href="styles/jquery.fancybox.css" media="screen"/>
	<link rel="stylesheet" href="styles/datetimepicker.css" media="all">
	<link rel="stylesheet" href="styles/style3.css" media="all">
	<link rel="stylesheet" href="styles/media-queries3.css" media="all">
	<script src="//code.jquery.com/jquery-1.8.3.min.js" type="text/javascript"></script>
	<script src="//code.jquery.com/ui/1.10.3/jquery-ui.js" type="text/javascript"></script>
	<script src="js/jquery.fancybox.js"></script>
	<script src="js/formatCurrency.min.js"></script>
	<script src="js/validation.js"></script>
	<script src="js/jquery.loadmask.js"></script>
	<script src="js/datetimepicker.js"></script>
	<script src="http://momentjs.com/downloads/moment.min.js"></script>
	<script src="js/script.js"></script>
	<script async src="//19874.tctm.co/t.js"></script>

    <!-- BEGIN FACEBOOK TRACKING PIXEL -->
    <script>(function() {
	var _fbq = window._fbq || (window._fbq = []);
	if (!_fbq.loaded) {
	var fbds = document.createElement('script');
	fbds.async = true;
	fbds.src = '//connect.facebook.net/en_US/fbds.js';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(fbds, s);
	_fbq.loaded = true;
	}
	})();
	window._fbq = window._fbq || [];
	window._fbq.push(['track', '6019105625790', {'value':'0.01','currency':'USD'}]);
	</script>
	<noscript>
    <img height="1" width="1" alt="" style="display:none" src="https://www.facebook.com/tr?ev=6019105625790&amp;cd[value]=0.01&amp;cd[currency]=USD&amp;noscript=1" /></noscript>
    <!-- END FACEBOOK TRACKING PIXEL -->

	<!-- slideshow script -->
	<script>
    $(function() {

        $("#slideshow > div:gt(0)").hide();

        setInterval(function() {
          $('#slideshow > div:first')
            .fadeOut(0)
            .next()
            .fadeIn(1000)
            .end()
            .appendTo('#slideshow');
        },  6000);

    });
	</script>  <!-- move to -->

</head>
<body>
    <!-- BEGIN GA TRACKING CODE -->
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-52775752-1', 'auto');
      ga('require', 'displayfeatures');
      ga('send', 'pageview');
    </script>
    <!-- END GA TRACKING CODE -->
	<div class="header">
		<div class="icon-menu"></div>
		<div id="mobile-menu">
			<ul class="menu-mobile">
				<li><a href="index.php?s=procedure" <?php echo ($page=='procedure.php') ? 'class="current"' : '' ?>>About the procedure</a></li>
				<li><a href="index.php?s=questions" <?php echo ($page=='questions.php') ? 'class="current"' : '' ?>>Questions & Answers</a></li>
				<li><a href="index.php?s=conditions-treated" <?php echo ($page=='conditions-treated.php') ? 'class="current"' : '' ?>>Conditions Treated</a></li>
				<!-- <li><a href="index.php?s=incontinence-center" style="color: red;!important"<?php echo ($page=='incontinence-center.php') ? 'class="current"' : '' ?>>Incontinence Center</a> -->
				<li><a href="index.php?s=other-services" <?php echo ($page=='other-services.php') ? 'class="current"' : '' ?>>Other Services</a></li>
				<li><a href="index.php?s=meet-team" <?php echo ($page=='meet-team.php') ? 'class="current"' : '' ?>>Meet the Team</a></li>
				<li><a href="index.php?s=testimonials" <?php echo ($page=='testimonials.php') ? 'class="current"' : '' ?>>Testimonials</a></li>
				<li><a href="index.php?s=location" <?php echo ($page=='location.php') ? 'class="current"' : '' ?>>Location</a></li>
			</ul>
		</div>

		<div class="content">
			<div class="logo">
				<a href="index.php">
					<img src="images/logo.svg" alt="lift your practice with more patients"/>
					<!-- <img src="images/logo.png" alt="lift your practice with more patients"> -->
				</a>
			</div>
			<div class="callus">
				<p>Call us now!</p>
				<a href="tel:8556979355"><span class="tel">(855) 697-9355</span></a>
			</div>
			<div class="nav">
				<a href="index.php?s=procedure" <?php echo ($page=='procedure.php') ? 'class="current"' : '' ?>>About the <br>Procedure</a>
				<a href="index.php?s=questions" <?php echo ($page=='questions.php') ? 'class="current"' : '' ?>>Questions <br>& Answers</a>
				<a href="index.php?s=conditions-treated" <?php echo ($page=='conditions-treated.php') ? 'class="current"' : '' ?>>Conditions <br>Treated</a>
				<!-- <a href="index.php?s=incontinence-center" style="color: red;!important"<?php echo ($page=='incontinence-center.php') ? 'class="current"' : '' ?>>Incontinence <br>Center</a> -->
				<a href="index.php?s=other-services" <?php echo ($page=='other-services.php') ? 'class="current"' : '' ?>>Other <br>Services</a>
				<a href="index.php?s=meet-team" <?php echo ($page=='meet-team.php') ? 'class="current"' : '' ?>>Meet the<br>Team</a>
				<a href="index.php?s=testimonials" <?php echo ($page=='testimonials.php') ? 'class="current"' : '' ?>>Testimonials</a>
				<a href="index.php?s=location" <?php echo ($page=='location.php') ? 'class="current"' : '' ?>>Location</a>
			</div>
		</div>
	</div>

	<div class="main">

		<!-- slideshow starts -->
		<div id="slideshow">

		   <div>
		     <img src="images/slide1.jpg">
			 <div class="heading-small"><span style="font-size:45px;">Urgent Care</span> for Hemorrhoid Pain<p class="under-heading-small">Passionate caring providers</p></div>
		   </div>

		   <div>
		     <img src="images/slide2.jpg">
			 <div class="heading-small">Same Day Appointments<p class="under-heading-small">Experts in anorectal care</p></div>
		   </div>

		   <div>
		     <img src="images/slide3.jpg">
			 <div class="heading-small">Walk Ins Welcome<p class="under-heading-small">Specialists in treating the most severe cases</p></div>
		   </div>

		   <div>
		     <img src="images/slide1.jpg">
			 <div class="heading-small">Hemorrhoids? Finally, a painless, quick 10-minute, in-office procedure that works!</br><p class="under-heading-small">Medicare and most major insurance plans accepted</p></div>
		   </div>

		   <div>
		     <img src="images/slide2.jpg">
			 <div class="heading-small">Thousands of Patients Have Received the Relief They Deserve!<p class="under-heading-small">Same Day Appointments Available.</p></div>
		   </div>

		   <div>
		     <img src="images/slide3.jpg">
			 <div class="heading-small">Receive immediate relief with this quick in-office procedure.<p class="under-heading-small">Resume your normal daily activity right after procedure.</p></div>
		   </div>

	   </div> <!-- slideshow ends -->

		<div class="content">
			<img src="images/menu_shadow.png" class="bg">
		</div> <!-- content ends -->



	</div>

	<!--<div class="headings">
	</div>-->
	<div class="main-content">

		<div id="mobheader">
			<div class="heading">Hemorrhoids? Finally, a painless,<br> quick 10-minute, in-office procedure that works!<p class="under-heading">Medicare and most major insurance plans accepted</p></div><!--heading-->
		</div><!-- /.mobheader -->

<!-- 		<img src="images/shadow_top.png" class="shadow-top">
		<img src="images/shadow_bottom.png" class="shadow-bottom">
		<div class="shadow-repeat"></div> -->

		<div class="content">
<?php
		include($page);
?>
		</div>
	</div>
	<div class="footer">
		<img src="images/footer-logo.png">
		<div class="nav-footer">
				<a href="index.php?s=procedure" <?php echo ($page=='procedure.php') ? 'class="current"' : '' ?>>About the Procedure</a>
				<a href="index.php?s=questions" <?php echo ($page=='questions.php') ? 'class="current"' : '' ?>>Questions & Answers</a>
				<a href="index.php?s=conditions-treated" <?php echo ($page=='conditions-treated.php') ? 'class="current"' : '' ?>>Conditions Treated</a>
				<!-- <a href="index.php?s=incontinence-center" style="color: red;!important"<?php echo ($page=='incontinence-center.php') ? 'class="current"' : '' ?>>Incontinence <br>Center</a> -->
				<a href="index.php?s=other-services" <?php echo ($page=='other-services.php') ? 'class="current"' : '' ?>>Other Services</a>
				<a href="index.php?s=meet-team" <?php echo ($page=='meet-team.php') ? 'class="current"' : '' ?>>Meet the Team</a>
				<a href="index.php?s=testimonials" <?php echo ($page=='testimonials.php') ? 'class="current"' : '' ?>>Testimonials</a>
				<a href="index.php?s=location" <?php echo ($page=='location.php') ? 'class="current"' : '' ?>>Location</a>
		</div>
		<p>
		Copyright &#169; 2012-<?php echo date("Y") ?> HemWell America LLC
		</p>
		<p class="wrap bottom-notice">
			the patient and any other person responsible for payment has a right to refuse to pay, cancel payment, or be reimbursed for payment for any other service, examination, or treatment that is performed as a result of and within 72 hours of responding to the advertisement for the free, discounted fee, or reduced fee service, examination, or treatment.
		</p>
		<!-- NEW pixel code -->
		<img height="1" width="1" style="border-style:none;" alt="" src="//insight.adsrvr.org/track/conv/?adv=p62f6ik&ct=0:bx7cmqes&fmt=3"/>
		<!-- END pixel code -->
	</div>

	<div id="appointment-popup">
		<!--<img src="images/close.png" class="bottom-popup-close">-->
		<div class="appointment-form-container">
			<p class="title">Get more info!</p>
			<form id="appointment-form" data-name='appointment'>
					<div class="row">
						<input type="text" name="first_name" id="first-name" placeholder="First Name" class="validate[] input" value="">
						<input type="text" name="last_name" id="last-name" placeholder="Last Name" class="validate[] input" value="">
					</div>
					<div class="row">
						<input type="text" name="email" placeholder="Email Address" class="validate[required,custom[email]] input" >
						<input type="text" name="phone" placeholder="Phone" class="validate[] input" >
					</div>

                    <!--<div class="row">
						<input type="text" name="datetime" class="datetime input" style="display:block;margin:4px auto;" placeholder="Preferred Date/Time">
					</div>-->

                    <div class="row">
					  <input type="text" name="message" id="message" placeholder="Ask us a question" style="display:block;margin:4px auto;" class="validate[] input" value="">
					</div>

        			<span class="action-button appointment-submit">Send Now!</span>
					<img class="big-btn-shadow" src="images/btn-shadow.png">
					<input type="hidden" name="task" value="appointment"/>
					<input type="hidden" name="id" value="0"/>
					<input type="hidden" name="source" value="<?php echo $source; ?>"/>	 <input type="hidden" name="token" value="<?php echo $token; ?>"/>
				</form>
			<!-- <div id="appointment-thank-msg">
				Thank you, our team will contact you shortly.</div> -->
		</div>
	</div>

	<input type="hidden" name="log_id" value=""/>
	<input type="hidden" name="log_source" value="<?php echo $source; ?>"/>
	<input type="hidden" name="log_keyword" value="<?php echo $_GET['keyword']; ?>"/>
	<input type="hidden" name="log_adpos" value="<?php echo $_GET['adpos']; ?>"/>
	<input type="hidden" name="log_matchtype" value="<?php echo $_GET['matchtype']; ?>"/>
	<input type="hidden" name="log_gaid" value="<?php echo $_GET['gaid']; ?>"/>
	<input type="hidden" name="log_ip" value="<?php echo get_ip(); ?>"/>
	<input type="hidden" name="log_initial" value="<?php echo $_SERVER["SERVER_NAME"];?>"/>
	<input type="hidden" name="token" value="<?php echo $token; ?>"/>

	<script type="text/javascript">
	/* <![CDATA[ */
	var google_conversion_id = 969263750;
	var google_custom_params = window.google_tag_params;
	var google_remarketing_only = true;
	/* ]]> */
	</script>
	<script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js">
	</script>
	<noscript>
	<div style="display:inline;">
	<img height="1" width="1" style="border-style:none;" alt="" src="//googleads.g.doubleclick.net/pagead/viewthroughconversion/969263750/?value=0&amp;guid=ON&amp;script=0"/>
	</div>
	</noscript>
<!-- begin olark code -->
<script data-cfasync="false" type='text/javascript'>/*<![CDATA[*/window.olark||(function(c){var f=window,d=document,l=f.location.protocol=="https:"?"https:":"http:",z=c.name,r="load";var nt=function(){
f[z]=function(){
(a.s=a.s||[]).push(arguments)};var a=f[z]._={
},q=c.methods.length;while(q--){(function(n){f[z][n]=function(){
f[z]("call",n,arguments)}})(c.methods[q])}a.l=c.loader;a.i=nt;a.p={
0:+new Date};a.P=function(u){
a.p[u]=new Date-a.p[0]};function s(){
a.P(r);f[z](r)}f.addEventListener?f.addEventListener(r,s,false):f.attachEvent("on"+r,s);var ld=function(){function p(hd){
hd="head";return["<",hd,"></",hd,"><",i,' onl' + 'oad="var d=',g,";d.getElementsByTagName('head')[0].",j,"(d.",h,"('script')).",k,"='",l,"//",a.l,"'",'"',"></",i,">"].join("")}var i="body",m=d[i];if(!m){
return setTimeout(ld,100)}a.P(1);var j="appendChild",h="createElement",k="src",n=d[h]("div"),v=n[j](d[h](z)),b=d[h]("iframe"),g="document",e="domain",o;n.style.display="none";m.insertBefore(n,m.firstChild).id=z;b.frameBorder="0";b.id=z+"-loader";if(/MSIE[ ]+6/.test(navigator.userAgent)){
b.src="javascript:false"}b.allowTransparency="true";v[j](b);try{
b.contentWindow[g].open()}catch(w){
c[e]=d[e];o="javascript:var d="+g+".open();d.domain='"+d.domain+"';";b[k]=o+"void(0);"}try{
var t=b.contentWindow[g];t.write(p());t.close()}catch(x){
b[k]=o+'d.write("'+p().replace(/"/g,String.fromCharCode(92)+'"')+'");d.close();'}a.P(2)};ld()};nt()})({
loader: "static.olark.com/jsclient/loader0.js",name:"olark",methods:["configure","extend","declare","identify"]});
/* custom configuration goes here (www.olark.com/documentation) */
olark.identify('1426-155-10-7424');olark('api.chat.onMessageToOperator',function(){ trackChatAdWordsConversion(); });olark('api.chat.onOfflineMessageToOperator',function(){ trackChatAdWordsConversion(); });/*]]>*/</script><noscript><a href="https://www.olark.com/site/1426-155-10-7424/contact" title="Contact us" target="_blank">Questions? Feedback?</a> powered by <a href="http://www.olark.com?welcome" title="Olark live chat software">Olark live chat software</a></noscript>
<!-- end olark code -->

<!-- BEGIN GOOGLE REMARKETING PIXEL FOR MCKAYAD -->
<script type="text/javascript">
/* <![CDATA[ */
var google_conversion_id = 958302025;
var google_custom_params = window.google_tag_params;
var google_remarketing_only = true;
/* ]]> */
</script>
<script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js">
</script>
<noscript>
<div style="display:inline;">
<img height="1" width="1" style="border-style:none;" alt="" src="//googleads.g.doubleclick.net/pagead/viewthroughconversion/958302025/?value=0&amp;guid=ON&amp;script=0"/>
</div>
</noscript>
<!-- END GOOGLE REMARKETING PIXEL FOR MCKAYAD -->

<!-- BEGIN FB REMARKETING PIXEL FOR MCKAYAD -->
<script type="text/javascript">
  (function() {
    window._pa = window._pa || {};
    // _pa.orderId = "myOrderId"; // OPTIONAL: attach unique conversion identifier to conversions
    // _pa.revenue = "19.99"; // OPTIONAL: attach dynamic purchase values to conversions
    // _pa.productId = "myProductId"; // OPTIONAL: Include product ID for use with dynamic ads
    var pa = document.createElement('script'); pa.type = 'text/javascript'; pa.async = true;
    pa.src = ('https:' == document.location.protocol ? 'https:' : 'http:') + "//tag.perfectaudience.com/serve/54a2ad2f538336be8800002d.js";
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(pa, s);
  })();
</script>
<!-- END FB REMARKETING PIXEL FOR MCKAYAD -->

</body>
</html>

<?php

function get_ip() {

     $ipaddress = '';
     if ($_SERVER['HTTP_CLIENT_IP'])
         $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
     else if($_SERVER['HTTP_X_FORWARDED_FOR'])
         $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
     else if($_SERVER['HTTP_X_FORWARDED'])
         $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
     else if($_SERVER['HTTP_FORWARDED_FOR'])
         $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
     else if($_SERVER['HTTP_FORWARDED'])
         $ipaddress = $_SERVER['HTTP_FORWARDED'];
     else if($_SERVER['REMOTE_ADDR'])
         $ipaddress = $_SERVER['REMOTE_ADDR'];
     else
         $ipaddress = 'UNKNOWN';

     return $ipaddress;
}

?>