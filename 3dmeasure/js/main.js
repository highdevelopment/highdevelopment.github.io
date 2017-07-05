
var canvas;
var g_bgImage;					// background image
var g_caliObject;				// shape object for calibration
var g_measureLengths = [];		// array of line object at length mode
var g_measureArea;				// shape object at Area mode
var g_measureVolumeHeight;		// line object at volume mode
// var g_modeMeasure = MODE.Length;


var MODE = {					// measure mode
	Length: 0,
	Area: 1,
	Volume: 2,
};

var strokeColor_calibration = '#0022ff';
var strokeColor_area 		= '#ff0000';
var g_imgCircleBlack;
var g_imgCircleBlue;
var g_imgCircleRed;

$(window).ready(function()
{
	fabric.Image.fromURL('./img/circle_black.png', function(img)
	{
		g_imgCircleBlack = img;
		var mainClass = new ClassMain();
		g_bgImage = new ClassBG(mainClass.loadedImage);
	});
	fabric.Image.fromURL('./img/circle_blue.png', function(img)
	{
		g_imgCircleBlue = img;
	});
	fabric.Image.fromURL('./img/circle_red.png', function(img)
	{
		g_imgCircleRed = img;
	});
})

// Main Class to start app
function ClassMain()
{
	var main = this;

	this.init = function()
	{
		canvas = new fabric.Canvas('canvas', {renderOnAddRemove: false, preserveObjectStacking: true});
		canvas.selection = false;
		context = canvas.getContext('2d');
		this.initEvent();
		$('#text_Label h2').text('LONGITUD');
	}

	this.initEvent = function()
	{
		$(window).on('resize', function()
		{
			if(g_bgImage)
				g_bgImage.setResize();
		})
	}

	this.loadedImage = function()
	{
		var zoom = canvas.getZoom();
		var cali_pts = [
			{x:10 / zoom, y:0 / zoom},
			{x:0 / zoom, y:100 / zoom},
			{x:100 / zoom, y:80 / zoom},
			{x:120 / zoom, y:10 / zoom},
		];
		// var cali_pts = [
		// 	{x:718, y:226},
		// 	{x:727, y:255.2},
		// 	{x:780, y:254},
		// 	{x:766, y:225},
		// ];
		g_caliObject = new CShapeObj(cali_pts, strokeColor_calibration, 0, main.callbackMovePoints);
		// g_caliObject.hideLabel();

		new initToolBar();
		new initReferenceDlg();
		new initMeasureModeDlg();

		canvas.renderAll();
	}

	this.callbackMovePoints = function()
	{
		for(var i = 0; i < g_measureLengths.length; i++)
		{
			g_measureLengths[i].refreshLength();
		}
		if(g_measureArea)
		{
			g_measureArea.refreshLength();
		}
	}

	this.init();
}

function IsCheckImageSize(imgSize, refSize)
{
	var fRateX = imgSize.width / refSize.width;
	var fRateY = imgSize.height / refSize.height;
	if(fRateX > 300 || fRateY > 300)
	{
		// alert('when the picture is very big, lines and texts become bigger');
		return false;
	}
	return true;
}

// background image
function ClassBG(callbackLoaded)
{
	var main = this;
	this.zoom = 1;
	this.imgObj;

	this.init = function()
	{
		this.setResize();
		this.setBackgroundImage('img/image_1.jpg', 0);
		this.initCanvasEvent();
	}

	this.resetCanvas = function()
	{
		canvas.clear();
		canvas.renderAll();
	}

    this.setResize = function(isSave)
    {
    	if(!this.imgObj)
    		return;

		var width = this.imgObj.width;
		var height = this.imgObj.height;
		if(this.imgObj.angle == 90 || this.imgObj.angle == 270) {
			width = this.imgObj.height;
			height = this.imgObj.width;
		}

		var bgWidth = $(window).width() - 230;
		var footerHeight = $('#footer').height();
		var bgHeight = $(window).height() - $('#header').height() - footerHeight;


        var rate_w = bgWidth / width;
        var rate_h = bgHeight / height;
        var zoom = Math.min(rate_w, rate_h);

        var resW = width * zoom;
        var resH = height * zoom;

        var x = (bgWidth - resW) / 2;
        var y = (bgHeight - resH) / 2;

		if(isSave) {
			if(this.imgObj.angle == 90 || this.imgObj.angle == 270) {
				resW = this.imgObj.height;
				resH = this.imgObj.width;
			}
			else {
				resW = this.imgObj.width;
				resH = this.imgObj.height;
			}
			zoom = 1;
		}

		$('#canvasview').width(resW);
		$('#canvasview').height(resH);
		$('#canvasview').css('margin-left', x);
		// $('#canvasview').css('margin-top', y);

		this.imgObj.left = width * 0.5;
		this.imgObj.top = height * 0.5;

		canvas.setWidth(resW);
		canvas.setHeight(resH);
		this.zoom = zoom;
        canvas.setZoom(zoom);
        canvas.renderAll();

        if(g_caliObject)
        	IsCheckImageSize(this.imgObj, g_caliObject);
    }

	this.setBackgroundImage = function(imgURL, angle)
	{
        fabric.Image.fromURL(imgURL, function(img)
        {
        	main.originWith = img.width;
        	main.originHeight = img.height;
        	main.imgObj = img;

            var imgObj = img.set({
            	left:0, top:0, width:img.width, height:img.height, 
            	originX: 'center', originY: 'center', 
            	opacity: main.transvalue / 100.0,
            	selectable: false,
            	hoverCursor:'default',
            	angle: angle,
				obj_type: 'background',
            });
            var arrAllObjs = [];
            arrAllObjs.push(main.imgObj);
            canvas.add(imgObj);
            canvas.sendToBack(imgObj);

            canvas.absolutePan(new fabric.Point(0, 0));
            main.setResize();
            callbackLoaded.call();
        });
	}

	$('#btn_rotate').click(function() {
		// canvas.remove(main.imgObj);
		var angle = main.imgObj.angle;
		// main.resetCanvas();
		angle += 90;
		if(angle == 360)
			angle = 0;

		g_caliObject.setRotatePoints(angle);
		g_measureLengths.forEach(function(obj, index) {
			obj.setRotatePoints(angle);
		})
		if(g_measureArea)
			g_measureArea.setRotatePoints(angle);
		if(g_measureVolumeHeight)
			g_measureVolumeHeight.setRotatePoints(angle);

		main.imgObj.set({
            	angle: angle,
            });
		main.setResize();
		canvas.renderAll();
		// main.setBackgroundImage('img/image_1.jpg', angle);
	})

	$('#btn_zoomout').click(function() {
		var curZoom = canvas.getZoom();
		var point = {
			x: canvas.width * 0.5,
			y: canvas.height * 0.5,
		}
		canvas.zoomToPoint(new fabric.Point(point.x, point.y), curZoom * 1.1);
	})
	$('#btn_zoomin').click(function() {
		var curZoom = canvas.getZoom();
		var point = {
			x: canvas.width * 0.5,
			y: canvas.height * 0.5,
		}
		canvas.zoomToPoint(new fabric.Point(point.x, point.y), curZoom * 0.9);
	})
	var slider = $('#slider_zoom').slider({
		// orientation: 'vertical',
		min		: -50,
		max		: 50,
		value	: 0,
		change	: function(event, ui)
		{
			sliderVal = ui.value;
			var percent = parseInt(sliderVal);
			$('#span_slider').text(percent + '%');

			var curZoom = canvas.getZoom();
			var point = {
				x: canvas.width * 0.5,
				y: canvas.height * 0.5,
			}
			canvas.zoomToPoint(new fabric.Point(point.x, point.y), main.zoom * (1 + (sliderVal / 100)));
		}
	});
	$('#btn_zoom_reset').click(function() {
        canvas.absolutePan(new fabric.Point(0, 0));
		canvas.setZoom(main.zoom);
		slider.val(0);
	})
	$('#btn_save').click(function() {
		main.setResize(true);

		function b64toBlob(b64Data, contentType, sliceSize) {
		  contentType = contentType || '';
		  sliceSize = sliceSize || 512;

		  var byteCharacters = atob(b64Data);
		  var byteArrays = [];

		  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		    var slice = byteCharacters.slice(offset, offset + sliceSize);

		    var byteNumbers = new Array(slice.length);
		    for (var i = 0; i < slice.length; i++) {
		      byteNumbers[i] = slice.charCodeAt(i);
		    }

		    var byteArray = new Uint8Array(byteNumbers);

		    byteArrays.push(byteArray);
		  }
		    
		  var blob = new Blob(byteArrays, {type: contentType});
		  return blob;
		}

		var pngdata = canvas.toDataURL({format: 'png'/*, multiplier: png_w/w*/});
		//console.log(pngdata);
		//tmpimg.set({width: thumb_w, height:thumb_h});
		//canvas.backgroundImage = tmpimg;
		//var thumb = canvas.toDataURL({format: 'png', multiplier: thumb_w/w});
		
		/*var download = document.createElement('a');
		download.href = pngdata;
		download.download = 'pngdata.png';
		download.click();*/
		var contentType = 'image/png';
		//var b64Data = 'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';
		var b64Data = pngdata.replace(/^data:image\/[a-z]+;base64,/, "");
		var blob = b64toBlob(b64Data, contentType);
		//console.log(blob);
		var blobUrl = URL.createObjectURL(blob);

		/*var img = document.getElementById('tmpimg');
		img.src = blobUrl;*/


		var download = document.createElement('a');
		download.href = pngdata;
		download.download = 'save.png';
		download.click();

		main.setResize(false);

		// var dataURL = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
		// $('#file_download_iframe')[0].src = dataURL;
	})

	this.initCanvasEvent = function() {
		var panning = false;
		var prevX = 0, prevY = 0;
		canvas.on('mouse:up', function (e) {
			panning = false;
		});
		canvas.on('mouse:out', function (e) {
			panning = false;
		});
		canvas.on('mouse:down', function (e) {
			if(e.target.obj_type != 'background')
				return;
			panning = true;
			var pointx, pointy;
			if(e.e instanceof MouseEvent) {
				pointx = e.e.offsetX==undefined?e.e.layerX:e.e.offsetX;
				pointy = e.e.offsetY==undefined?e.e.layerY:e.e.offsetY;
			}
			else {
				pointx = e.e.touches[0].clientX;
				pointy = e.e.touches[0].clientY;
			}
			// pointx -= canvas.viewportTransform[4];
			// pointy -= canvas.viewportTransform[5];
			prevX = pointx;
			prevY = pointy;
		});
		canvas.on('mouse:move', function (e) {
			var pointx, pointy;
			if(e.e instanceof MouseEvent) {
				pointx = e.e.offsetX==undefined?e.e.layerX:e.e.offsetX;
				pointy = e.e.offsetY==undefined?e.e.layerY:e.e.offsetY;
			}
			else {
				pointx = e.e.touches[0].clientX;
				pointy = e.e.touches[0].clientY;
			}

			if(panning && e && e.e) {
				if(prevX != 0 && prevY != 0) {
					var delta = new fabric.Point((pointx - prevX), (pointy - prevY));
    				canvas.relativePan(delta);
				}
				prevX = pointx;
				prevY = pointy;
			}
		});
	}

	this.init();
}

// callback for toolbar buttons
function initToolBar()
{
	var main = this;

	this.init = function()
	{
	}

	$('.layer').mouseleave(function() {
		$(this).hide();		
	})
	$('#btn_reference').mouseenter(function(e) {
		$('.layer').hide();
		$('#layer_reference').show();
		e.preventDefault();
		e.stopPropagation();
	})
	// $('#btn_reference').mouseleave(function() {
	// 	$('.layer').hide();
	// })

	$('#btn_caliberation').mouseenter(function(e) {
		$('.layer').hide();
		$('#layer_calibration').show();
		e.preventDefault();
		e.stopPropagation();
	})
	// $('#btn_caliberation').mouseleave(function() {
	// 	$('.layer').hide();
	// })
	$('#btn_caliberation').click(function()
	{
		if($(this).hasClass('btn_active'))
		{
			$(this).removeClass('btn_active');
			g_caliObject.setEditable(false);
			// $('#btn_add').show();
		}
		else
		{
			$(this).addClass('btn_active');
			g_caliObject.setEditable(true);
			// $('#btn_add').hide();
		}
	})

	$('#btn_measure').mouseenter(function(e) {
		$('.layer').hide();
		$('#layer_measure').show();
		e.preventDefault();
		e.stopPropagation();
	})
	// $('#btn_measure').mouseleave(function() {
	// 	$('.layer').hide();
	// })

	$('.tab li').click(function(e) {
		$(this).closest('.tab').find('li').removeClass();
		$(this).addClass('active');
	})


	$('#btn_add').click(function()
	{
		var cnt = g_measureLengths.length;

		var zoom = canvas.getZoom();
		var pos = {
			x: (-150 + cnt * 30) / zoom,
			y: (-150 + cnt * 20) / zoom,
		};
		var measObj = new CLengthObj(pos);
		g_measureLengths.push(measObj);
	})

	$('#btn_file_open').click(function()
	{
		canvas.defaultCursor = 'default';
		$('#imagelinkvalue').click();
	});

	document.getElementById("imagelinkvalue").onchange = function()
	{
		if(this.value != '')
		{
			if(g_bgImage)
			{
				g_bgImage.resetCanvas();
			}

			//progress bar
			$('#uploadprogressbar').css('width', '0');
			var progressModal = document.getElementById('progressModal');
			progressModal.style.display = "block";

			var obj =  new FormData(document.getElementById('SeatMapArenaUpload'));
			$.ajax({
			    url     :   'uploadarena.php',
			    type    :   "POST",
			    data    :   obj,
				xhr: function() {
					var myXhr = $.ajaxSettings.xhr();

					//Upload progress
					myXhr.upload.addEventListener("progress", function(evt){
						if (evt.lengthComputable) {
							var percentComplete = 100 * evt.loaded / evt.total;
							//Do something with upload progress
							$('#uploadprogressbar').css('width', percentComplete + '%');
						}
					}, false);

					//Download progress
					myXhr.addEventListener("progress", function(evt){
						if (evt.lengthComputable) {
							var percentComplete = evt.loaded / evt.total;
							//Do something with download progress
							//console.log('Download - ' + evt.loaded + ':' + evt.total);
						}
					}, false);

					return myXhr;
				},
				cache: false,
			    processData: false,
			    contentType: false,
			    success: function(retData,response) {
			    	if(retData == 'error')
			    	{
			    		alert("file's size exceeds server's maximum upload size!");
			    	}
			    	else
			    	{
						//reset input file
						$('#imagelinkvalue').wrap('<form>').closest('form').get(0).reset();
						$('#imagelinkvalue').unwrap();

				        if(retData == '0'){
							alert('error - uploading map image');

							var progressModal = document.getElementById('progressModal');
							progressModal.style.display = "none";
				            //Oops! Some error occured during Image submission. Please try again later.
				            return;
				        }

				        //Image submitted successfully
						//console.log('uploaded url:' + retData);
						g_bgImage.setBackgroundImage(retData);
					}
			    },
			    error: function(){
			        //'Oops! Some error occured during Image submission. Please try again later.'
			        //reset input file
					$('#imagelinkvalue').wrap('<form>').closest('form').get(0).reset();
					$('#imagelinkvalue').unwrap();
			    }
			});
		}
    };

	this.init();
}

// reference dialog
function initReferenceDlg()
{
	var MODE = {
		credit: 0,
		a4_paper: 1,
		custom: 2,
	};
	var size_refernece = {
		credit: {
			width: 8.52,
			height: 5.37,
		},
		a4_paper: {
			width: 29.7,
			height: 21,
		},
	}

	var main = this;

	this.init = function()
	{
		this.setRefType('credit');
		this.setReferenceType(size_refernece.credit.width, size_refernece.credit.height);
	}

	this.setRefType = function(type)
	{
		if(type != 'custom')
		{
			$("#text_ref_width").prop('disabled', true);
			$('#text_ref_width').val(size_refernece[type].width);
			$("#text_ref_height").prop('disabled', true);
			$('#text_ref_height').val(size_refernece[type].height);
		}
		else
		{
			$("#text_ref_width").prop('disabled', false);
			$('#text_ref_width').val('');
			$("#text_ref_height").prop('disabled', false);
			$('#text_ref_height').val('');
		}
	}

	$('#layer_reference #btn_card').click(function(e)
	{
		main.setRefType('credit');
		main.setReferenceSize();
	});
	$('#layer_reference #btn_a4').click(function(e)
	{
		main.setRefType('a4_paper');
		main.setReferenceSize();
	});
	$('#layer_reference #btn_custom').click(function(e)
	{
		main.setRefType('custom');
		$('#text_ref_width').val(100);
		$('#text_ref_height').val(100);
		main.setReferenceSize();
	});
	$('#text_ref_width').keydown(function(e) {
		main.setReferenceSize();
	})
	$('#text_ref_height').keydown(function(e) {
		main.setReferenceSize();
	})

	$('.btn_up').click(function() {
		var input = $(this).closest('.input_number').find('input');
		if(!input.prop('disabled')) {
			var lastVal = parseInt(input.val()) + 1;
			input.val(lastVal);
			main.setReferenceSize();
		}
	})
	$('.btn_down').click(function() {
		var input = $(this).closest('.input_number').find('input');
		if(!input.prop('disabled')) {
			var lastVal = parseInt(input.val()) - 1;
			if(lastVal > 0) {
				input.val(lastVal);
				main.setReferenceSize();
			}
		}
	})

	this.setReferenceSize = function() {
		var width = $('#text_ref_width').val();
		var height = $('#text_ref_height').val();
		main.setReferenceType(width, height);
	}

	this.setReferenceType = function(width, height)
	{
		if(g_caliObject)
		{
			var values = [
				width,
				height,
				width,
				height,
			];
			g_caliObject.width = width;
			g_caliObject.height = height;
			g_caliObject.setLabelText(values);
			canvas.renderAll();

			if(g_bgImage)
				IsCheckImageSize(g_bgImage.imgObj, g_caliObject);
		}


	}

	this.init();
}

// measure mode dialog
function initMeasureModeDlg()
{
	var main = this;
	this.init = function()
	{
		$('#text_area').hide();
		$('#text_perimeter').hide();
		$('#text_volume').hide();
		// this.setModeBtn(0);
	}

	// this.setModeBtn = function(index)
	// {
	// 	$('#select_measure_mode li').removeClass('active');
	// 	var kkk = $('#select_measure_mode li').eq(index);
	// 	kkk.addClass('active');
	// }

	// $('#select_measure_mode li').click(function()
	// {
	// 	$('#select_measure_mode li').removeClass('active');
	// 	$(this).addClass('active');
	// });


	// $('#dlg_mesure_mode .modal-footer .btn-success').click(function()
	// {
	// 	$('#select_measure_mode li').each(function(index)
	// 	{
	// 		if($(this).hasClass('active'))
	// 		{
	// 			main.setModeType(index);
	// 			return;
	// 		}
	// 	})
	// })

	$('#layer_measure #btn_length').click(function() {
		main.setModeType(MODE.Length);
	})
	$('#layer_measure #btn_area').click(function() {
		main.setModeType(MODE.Area);
	})
	$('#layer_measure #btn_volume').click(function() {
		main.setModeType(MODE.Volume);
	})

	this.setModeType = function(index)
	{
		g_modeMeasure = index;
		if(index == MODE.Length)
		{
			for(var i = 0; i < g_measureLengths.length; i++)
				g_measureLengths[i].show();
			if(g_measureArea)
				g_measureArea.hideAll();
			if(g_measureVolumeHeight)
				g_measureVolumeHeight.hide();
			$('#btn_add').show();
			$('#text_Label h2').text('LONGITUD');
			$('#text_area').hide();
			$('#text_perimeter').hide();
			$('#text_volume').hide();
		}
		else if(index == MODE.Area)
		{
			for(var i = 0; i < g_measureLengths.length; i++)
				g_measureLengths[i].hide();
			if(!g_measureArea)
			{
				var pts = [
					{x:0, y:0},
					{x:0, y:300},
					{x:300, y:250},
					{x:280, y:0},
				];
				g_measureArea = new CShapeObj(pts, strokeColor_area, 1);
			}
			else
			{
				g_measureArea.isCalibration = 1;
				g_measureArea.showAll();
			}
			$('#btn_add').hide();
			if(g_measureVolumeHeight)
				g_measureVolumeHeight.hide();
			$('#text_Label h2').text('ÁREA');
			$('#text_area').show();
			$('#text_perimeter').show();
			$('#text_volume').hide();
		}
		else if(index == MODE.Volume)
		{
			if(!g_measureVolumeHeight)
			{
				var pos = {
					x: 0,
					y: 300,
				};
				g_measureVolumeHeight = new CLengthObj(pos, true);
			}
			else
			{
				g_measureVolumeHeight.show();
			}
			for(var i = 0; i < g_measureLengths.length; i++)
				g_measureLengths[i].hide();
			if(!g_measureArea)
			{
				var pts = [
					{x:0, y:0},
					{x:0, y:300},
					{x:300, y:250},
					{x:280, y:0},
				];
				g_measureArea = new CShapeObj(pts, strokeColor_area, 2);
			}
			else
			{
				g_measureArea.isCalibration = 2;
				g_measureArea.showAll();
			}
			$('#btn_add').hide();
			$('#text_Label h2').text('VOLUMEN');
			$('#text_area').show();
			$('#text_perimeter').hide();
			$('#text_volume').show();
		}
	}

	this.init();
}


function getDistanceFromTwoPoints(pt1, pt2) {
	// var a = pt1.x - pt2.x;
	// var b = pt1.y - pt2.y;
	// return Math.sqrt( a*a + b*b )

	var cali_width = g_caliObject.width;
	var cali_height = g_caliObject.height;
	var vertexes = g_caliObject.vertexes;
	var ref_pos1 = {
		x: vertexes[0].left,
		y: vertexes[0].top,
		z: 0,
	}
	var ref_pos2 = {
		x: vertexes[1].left,
		y: vertexes[1].top,
		z: 0,
	}
	var ref_pos3 = {
		x: vertexes[2].left,
		y: vertexes[2].top,
		z: 0,
	}
	var ref_pos4 = {
		x: vertexes[3].left,
		y: vertexes[3].top,
		z: 0,
	}
	var dis = getMeasure(cali_width, cali_height, ref_pos1, ref_pos2, ref_pos3, ref_pos4, pt1, pt2);
	return parseInt(dis * 10) / 10;
}

function getAreaFrom4Points(points)
{
	var zoom = canvas.getZoom();
	var cali_width = g_caliObject.width;
	var cali_height = g_caliObject.height;
	var vertexes = g_caliObject.vertexes;
	var ref_pos = [
		{
			x: vertexes[0].left,
			y: vertexes[0].top,
			z: 0,
		},
		{
			x: vertexes[1].left,
			y: vertexes[1].top,
			z: 0,
		},
		{
			x: vertexes[2].left,
			y: vertexes[2].top,
			z: 0,
		},
		{
			x: vertexes[3].left,
			y: vertexes[3].top,
			z: 0,
		}
	];
	var res = getMeasureArea(cali_width, cali_height, ref_pos, points);
	return res;
}

function getVolumeFrom4Points(points)
{
	var zoom = canvas.getZoom();
	var cali_width = g_caliObject.width;
	var cali_height = g_caliObject.height;
	var vertexes = g_caliObject.vertexes;
	var ref_pos = [
		{
			x: vertexes[0].left,
			y: vertexes[0].top,
			z: 0,
		},
		{
			x: vertexes[1].left,
			y: vertexes[1].top,
			z: 0,
		},
		{
			x: vertexes[2].left,
			y: vertexes[2].top,
			z: 0,
		},
		{
			x: vertexes[3].left,
			y: vertexes[3].top,
			z: 0,
		}
	];

	var point_volume = {
		x: g_measureVolumeHeight.vertexes[1].left,
		y: g_measureVolumeHeight.vertexes[1].top,
		z: 0,
	}
	var res = getMeasureVolume(cali_width, cali_height, ref_pos, points, point_volume);
	return res;
}
