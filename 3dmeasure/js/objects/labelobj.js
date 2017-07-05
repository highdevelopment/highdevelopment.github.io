
// label to display distance
function CLabelObj()
{
	var main = this;
	var textObj;
	this.init = function()
	{
		var zoom = canvas.getZoom();
		textObj = new fabric.Text('15cm',
		{ 
			left: 0, //Take the block's position
			top: 0,
			strokeWidth: 1,
			stroke: 'black',
			fill: 'white',
			fontSize: 18 / zoom,
	        originX: 'center',
	        originY: 'center',
	        selectable: false,
			hoverCursor : 'default',
			obj_type: 'text',
		});
		canvas.add(textObj);
	}

	function getPointFromTwoPointsToDistance(pt1, pt2, pt, d, sss)
	{
		var temp = (pt2.y - pt1.y) / (pt2.x - pt1.x);
		var angle = Math.atan(temp);
		var a = Math.abs(temp);
		var xt, yt;
		//if (sss == 1)
		{
			if (pt2.x > pt1.x && pt2.y > pt1.y)
			{
				xt = pt.x - sss * a * Math.sqrt(d*d / (1 + a*a));
				yt = pt.y + sss * Math.sqrt(d*d / (1 + a*a));
			}
			else if (pt2.x > pt1.x && pt2.y < pt1.y)
			{
				xt = pt.x + sss * a * Math.sqrt(d*d / (1 + a*a));
				yt = pt.y + sss * Math.sqrt(d*d / (1 + a*a));
			}
			else if (pt2.x < pt1.x && pt2.y < pt1.y)
			{
				xt = pt.x + sss * a * Math.sqrt(d*d / (1 + a*a));
				yt = pt.y - sss * Math.sqrt(d*d / (1 + a*a));
			}
			else 
			{
				xt = pt.x - sss * a * Math.sqrt(d*d / (1 + a*a));
				yt = pt.y - sss * Math.sqrt(d*d / (1 + a*a));
			}		
		}
		return{x:xt, y:yt, angle:angle};
	}

	this.setPosition = function(pos1, pos2, string)
	{
		if(string)
			textObj.setText(string);
		var centerPos = {
			x: (pos1.x + pos2.x) * 0.5,
			y: (pos1.y + pos2.y) * 0.5,
		}
		var pt = getPointFromTwoPointsToDistance(pos1, pos2, centerPos, 12, 1);
		textObj.left = pt.x;
		textObj.top = pt.y;
		textObj.setAngle(pt.angle * 180 / Math.PI);
	}

	this.setText = function(value)
	{
		textObj.setText(value);
	}

	this.show = function()
	{
		textObj.visible = true;
	}
	this.hide = function()
	{
		textObj.visible = false;
	}

	this.init();
}
