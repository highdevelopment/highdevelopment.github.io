<div class="menu-content contact vert-center">
	<div class="contact-form-container">
		<p class="title">Contact</p>
		<div class="contact-left">			
			<form id="contact-form" data-name='contact'>	  
			<fieldset>			
				<input type="text" name="name" id="name" placeholder="Name" class="validate[required] input" value="">					
				<input type="text" name="email" placeholder="Email" class="validate[required,custom[email]] input" >
				<input type="text" name="phone" placeholder="Phone" class="validate[required] input" >
				<textarea style="width:300px;height:100px" placeholder="Message" name="message" class="input"></textarea>					
				<span class="action-button contact-submit">Send</span>
				<input type="hidden" name="task" value="contact"/>
				<input type="hidden" name="source" value="<?php echo $source; ?>"/>	 <input type="hidden" name="token" value="<?php echo $token; ?>"/>	
			</fieldset>
		</form>	
			<div id="contact-thank-msg">
			Thank you, someone will be in touch with you shortly.
			</div>								
		</div>
		<div class="contact-right">
			<div class="contact-address">
				9630 West Linebaugh Ave.<br>		
				Tampa, FL 33626<br>
				<br>		
				<p style="text-align:center">			
					<b class="tel">Call us: (855) 697-9355</b>
				</p>
			</div>		
		</div>	
	</div>
</div>