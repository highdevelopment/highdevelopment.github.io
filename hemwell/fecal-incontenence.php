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
	<link rel="stylesheet" href="styles/parallax-bg.css" media="all">

	<link rel="stylesheet" type="text/css" href="styles/common.css" />
	<link rel="stylesheet" type="text/css" href="styles/circle_style.css">

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


	<div class="header headerfixed">
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
			</div> <!-- mobile menu -->
		<div class="content">
			<div class="logo">
				<a href="index.php">
					<img src="images/logo.svg" alt="lift your practice with more patients"/>
				</a>
			</div> <!-- logo div -->
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
			</div> <!-- End of Nav div -->
		</div>

	</div>


	<div class="main-b">

		<!-- parallax starts -->
		<div class="bgimg-1">
			<div class="caption">
				<span class="title-3">TAKE BACK YOUR LIFE</span><br>
				<span class="title-1">There is a New Treatment for Loss of Bowel Control</span><br><br>
				<span class="title-1">Stop suffering in silence</span><br>
				<span class="title-2">You are not alone</span><br><br>
			</div><!-- /.caption -->
	   	
		   	<div class="circle-links">
		   		

	
			</div>


	   	</div> <!-- parallax ends -->
		
				<ul class="ch-grid">
					<li>
						<div class="ch-item ch-img-1">
							<div class="ch-info">
								<h3><a href="#">What is Fecal Incontinence?</a></h3>
							</div>
						</div>
					</li>
					<li>
						<div class="ch-item ch-img-2">
							<div class="ch-info-2">
								<a href="#"><img src="images/circle-link-b-02.svg" alt="HemWell FI Total Care" /></a>
							</div>
						</div>
					</li>
					<li>
						<div class="ch-item ch-img-3">
							<div class="ch-info-3">
								<h3><a href="#">Controlling your FI</a></h3>
							</div>
						</div>
					</li>
				</ul>
	</div>


	<div style="margin-top: -30px;" class="main-content">


		<!-- <div class="content"> -->

			<div class="procedure-content">
				
				<div class="white-row">				
					<div class="page-wrap">
						<h1 class="title">FECAL INCONTINENCE</h1>	
						<h4>What is loss Of bowel control (Fecal Incontinence)?</h4>
						<p>Did you know that more than 18 million Americans suffer every year from fecal incontinence? Fecal Incontinence, also known as Accidental Bowl Leakage (ABL), is the inability to control the passage of stool or gas. Some people have mild trouble holding gas, while others have severe trouble holding stool. Incontinence is a miserable problem that many people have trouble talking about. People are frequently embarrassed and afraid there is no help. However, treatment is available to help you restore your dignity and return you to your active lifestyle. </p>
					</div> <!-- end of page-wrap -->
				</div> <!-- white-row -->
					
				<div class="gray-row">
					<div class="page-wrap">
						<h4>What causes fecal incontinence?</h4>
						<p>Normal control of the passage of stool depends on many factors. A problem in any of the following areas can contribute to lack of bowel control or accidental leakage. </p>

						<ul >
							<li>Stool moving through the bowel too quickly. This can be caused by irritable bowel syndrome or inflammation of the bowel. </li>
							<li>Anything that causes diarrhea, such as infection, inflammation, and food intolerance.</li>
							<li>Abnormal growth in the rectum can cause the rectum to fill faster than normal, inhibiting the ability for the rectum to expand further to hold additional stool. If this happens, loose stool may leak out.</li>
							<li>Neurological problems such as stroke or diabetes may cause abnormal sensation in the rectum, leading to the inability to sense that gas stool has entered the rectum, leaving no warning to go to the bathroom. </li>
							<li>Weakening or loosening of the anal sphincter, can be caused by aging, injured nerves during childbirth or surgery. Normal anal sphincter function is required to keep stool in the rectum. </li>
						</ul>
					</div> <!-- -page-wrap -->
				</div><!-- /.gray-row -->	
				
				<div class="white-row">				
					<div class="page-wrap">
						<h4>What are the symptoms of fecal incontinence?</h4>
						<p>The main symptom of fecal incontinence is Accidental Bowel Leakage (ABL). Accidents may may be as simple as stains in your underwear and may be small, or may be full bowel movements. ABL can occur on a daily, weekly, or monthly basis. You may have good days, and some bad days, or you may have accidents every day. More than 70% of patients do not bring up these symptoms to their doctor out of fear and embarrassment. Fortunately, HemWell America has a solution for you to stop suffering in silence.</p>

						<p>Other symptoms of Fecal Incontinence may include:</p>
						<ul >
							<li>Diarrhea</li>
							<li>Constipation</li>
							<li>Urinary incontinence </li>
							<li>Abnormal cramping</li>
							<li>Abdominal pain</li>
							<li>Bloating</li>
							<li>Flatulence</li>
							<li>Anal itching</li>
						</ul>
					</div> <!-- end of page-wrap -->
				</div> <!-- white-row -->
	
				<div class="gray-row">
					<div class="page-wrap">
						<h4>What can i do to control fecal incontinence?</h4>
						<p>The first step is to consult with your doctor. They may recommend conservative treatment first, which may include:</p>
						<ul>
							<li>Changes to your diet such as adding fiber</li>
							<li>Prescription medication changes</li>
							<li>Bowel training and pelvic floor exercises</li>
							<li>Biofeedback via electrical stimulation</li>
						</ul>
					</div> <!-- -page-wrap -->
				</div><!-- /.gray-row -->	

				<div class="white-row">				
					<div class="page-wrap">
						<h4>When conservative treatment has been exhausted, minimally invasive surgical intervention may be necessary as an outpatient procedure:</h4>

						<ul><li>Sacral nerve modulation via Medtronic’s InterStim Therapy 
						</li></ul>
					</div> <!-- end of page-wrap -->
				</div> <!-- white-row -->


			<hr />


				<div class="teal-row">
					<div class="page-wrap">
						<h1 style="font-size: 1.6em; line-height:1.3em; text-align: center; margin-bottom: 30px;">HemWell America has a proven treatment pathway to reduce or even completely eliminate your fecal incontinence. In fact, there is an 89% success rate!<br /><span style="border-bottom: 2px solid #ffffff;text-transform: uppercase;">Covered by Medicare and most insurance<span></h1>

						<p style="font-size:26px; line-height: 26px; font-weight:500; text-align: center;">Call HemWell America today at <a class="blue" href="tel:8556979355">855-697-9355</a> to schedule a consultation today with a board-certified specialist and get back to living!</p>
					</div> <!-- -page-wrap -->
				</div><!-- /.teal-row -->
				
				<div class="page-wrap">
					<div class="appointment-form-container">
						<p class="title">Contact us for more information on our revolutionary procedure and how we can help.</p>
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
				
					</div> <!-- End of Form Div -->
				</div><!-- /.page-wrap -->


			</div> <!-- procedure-content div -->
			<br />
			<br />
			<hr />

	</div> <!-- main-content-div -->


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




		

