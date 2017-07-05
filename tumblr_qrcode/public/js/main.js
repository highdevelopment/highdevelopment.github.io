
$(document).ready(function()
{
	mainView 	= new classMain();
});


var classMain = function()
{
	var main = this;
	this.card = [];
	this.qrcode;

	this.init = function()
	{
		this.createEvent();
	}

	this.createEvent = function()
	{
		$('#btn_createQR').click(function(){
			main.createQRCode();
		})
		$('#btn_postTo').click(function(){
			main.postTumblr();
		})
	}

	this.createQRCode = function()
	{
		$('#qrcode').empty();

		this.qrcode = new QRCode(document.getElementById("qrcode"), {
			width : 300,
			height : 300
		});

		var userdata = {
			firstName : $('#text_firstname').val(),
			lastName : $('#text_secondname').val(),
			organization : $('#text_company').val(),
			title : $('#text_jobtitle').val(),
			workPhone : $('#text_phone').val(),
			email : $('#text_email').val(),
		}
		this.startServer(userdata);
	}

	this.postTumblr = function()
	{
		var canvas = $('#qrcode').children('canvas');
		var image    = canvas[0].toDataURL("image/png");
		main.socket.emit('posting_vcard', 
		{
			image  : image,
		});
	}

	String.prototype.replaceAll = function(search, replacement) {
	    var target = this;
	    return target.replace(new RegExp(search, 'g'), replacement);
	};

	this.makeCode = function(text)
	{
		// var str = text.replaceAll("CHARSET=UTF-8", "");
		var length = text.length;
		this.qrcode.makeCode(text);
		// $('#qrcode').child('img').src;
		var canvas = $('#qrcode').children('canvas');
		var image    = canvas[0].toDataURL("image/png");
	}

	this.startServer = function(userdata)
	{
		var host 	= "http://localhosts:8080";
		main.socket = io.connect(host);

		main.initSocket(userdata);
	}

	this.initSocket = function(userdata)
	{
		main.socket 		= io.connect(main.host);

		main.socket.on('connect', function (socket) {
			console.log('connected____');
		});

		main.socket.emit('c_userinfo', 
		{
			data  : userdata,
		});

		main.socket.on('s_vcard', function(vcard_data)
		{
			$('#btn_postTo').removeClass('disabled');
			console.log('success_posting' + vcard_data.data);
			main.makeCode(vcard_data.data);
		});

		main.socket.on('success_posting', function(data)
		{
			console.log('success_posting' + data);
			alert('posting is successed');
		});
	}
	this.init();
}