
$(document).ready(function()
{
	mainView 	= new classMain();
});


var classMain = function()
{
	var main = this;

	this.init = function()
	{
      	var encoder = new GIFEncoder();
      	encoder.setRepeat(0);
      	encoder.setDelay(50);
      	encoder.setTransparent(0xFF00FF);
      	encoder.start();

		var canvas  = document.getElementById('myCanvas');
		canvas.width  = 400;
		canvas.height = 80;
		var context = canvas.getContext('2d');
		var circles = [];

		drawCircle(40, 40, 38, 6, function()
		{
		    drawLine(90, 40, 145, 40, 0.4, function()
		    {
		    	drawLine(150, 40, 150, 0, 0.4, function(){});
		    	drawLine(150, 40, 150, 80, 0.4, function()
		    	{
		    		drawImage(153, 0, 0.15, function()
		    		{
      					encoder.finish();
					    var binary_gif = encoder.stream().getData() //notice this is different from the as3gif package!
					    var data_url = 'data:image/gif;base64,'+encode64(binary_gif);
					    var result = $('#result');
					    result[0].src = data_url;
		    		});
		    	});
		    });
		});

		function drawImage(x, y, step, callback)
		{
			var amount = 0;
			var img = document.getElementById("image");
			function animate(current)
			{
   				context.fillStyle = '#FF00FF';
    			context.fillRect(x,0,canvas.width, canvas.height);
			    // context.clearRect(x, y, canvas.width, canvas.height);
			    var width = current * 240;
				context.drawImage(img, x, y, width, 80, x, y, width, 80);

			    if(amount < 1)
			    {
			   		amount += step; // change to alter duration
		            requestAnimationFrame(function () {
			    		encoder.addFrame(context);
		                animate(amount);
		            });
			    }
			    else
			    {
			    	if (callback) callback.call();
			    }
			}
		    animate();
		}

		function drawCircle(x, y, radius, step, callback)
		{
		    var endPercent = 101;
		    var curPerc = 0;
		    var counterClockwise = false;
		    var circ = Math.PI * 2;
		    var quart = Math.PI / 2;

		    context.lineWidth = 2;
		    context.strokeStyle = '#ffffff';
		    context.shadowOffsetX = 0;
		    context.shadowOffsetY = 0;

		    function animate(current)
		    {
   				context.fillStyle = '#FF00FF';
    			context.fillRect(0,0,canvas.width, canvas.height);
				// context.clearRect(0, 0, canvas.width, canvas.height);
				context.beginPath();
				context.arc(x, y, radius, -(quart), ((circ) * current) - quart, false);
				context.stroke();
				curPerc += step;
				if (curPerc < endPercent + step)
				{
					requestAnimationFrame(function () {
			    		encoder.addFrame(context);
						animate(curPerc / 100)
					});
				}
				else
				{
					context.closePath();
					if(callback)
						callback.call();
				}
		     }

		     animate();
		}

		function drawLine(startX, startY, endX, endY, step, callback)
		{
			var amount = 0;
			context.beginPath();
		    context.strokeStyle = "#ffffff";
		    context.setLineDash([5, 3]);
			function animate(current)
			{
   				// context.fillStyle = '#FF00FF';
    			// context.fillRect(0,0,canvas.width, canvas.height);
			    // context.clearRect(0, 0, canvas.width, canvas.height);
			    context.moveTo(startX, startY);
			    // lerp : a  + (b - a) * f
			    context.lineTo(startX + (endX - startX) * current, 
			             startY + (endY - startY) * current);
			    context.stroke();

			    if (amount < 1)
			    {
			   		amount += step; // change to alter duration
		            requestAnimationFrame(function () {
			    		encoder.addFrame(context);
		                animate(amount)
		            });
			    }
			    else
			    {
					// context.closePath();
			    	if(callback)
			    		callback.call();
			    }
			}
		    animate();
		}
	}


	this.init();
}