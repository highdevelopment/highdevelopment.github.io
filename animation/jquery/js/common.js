function animationCounter(jNumber, f1, f2, time, callback)
{
	var value1 = parseFloat(f1);
	var value2 = parseFloat(f2);
	jNumber.text(value1.toFixed(2));
	var step = (value2 - value1) / time * 30;

	function animate(current)
	{
		if(current > value2)
		{
			jNumber.text(value2.toFixed(2));
			if(callback)
				callback.call();
		}
		else
		{
			setTimeout(function()
			{
				jNumber.text(current.toFixed(2));
				animate(current + step);
			}, 30);
		}
	}
	animate(value1)
}


function getDistance(pt1, pt2)
{
	var a = pt1.x - pt2.x;
	var b = pt1.y - pt2.y;
	return Math.sqrt( a*a + b*b )
}

function animationPolygon(polygon, points, callback)
{
	polygon.show();
	var attr_points = [];
	attr_points.push({x:points[0].x, y:points[0].y});
	attr_points.push({x:points[0].x, y:points[0].y});
	polygon.attr('points', attr_points[0].x + ',' + attr_points[0].y);

	var point_cnt = 0;
	var line_cnt = 0;
	var step = 10;
	var pt1 = points[point_cnt];
	var pt2 = points[point_cnt + 1];
	var count = getDistance(pt1, pt2) / step;
	function animation()
	{
		if(line_cnt > count)
		{
			line_cnt = 0;
			attr_points.push({x:points[point_cnt].x, y:points[point_cnt].y});
			point_cnt++;
			if(point_cnt >= points.length - 1)
			{
				if(callback)
					callback.call();
				return;
			}
			pt1 = points[point_cnt];
			pt2 = points[point_cnt + 1];
			count = getDistance(pt1, pt2) / step;
		}

		{
			setTimeout(function()
			{
				line_cnt++;
				var x = pt1.x + (pt2.x - pt1.x) * line_cnt / count;
				var y = pt1.y + (pt2.y - pt1.y) * line_cnt / count;
				if(line_cnt > count - 1)
				{
					x = pt2.x;
					y = pt2.y;
				}
				attr_points[attr_points.length - 1].x = x;
				attr_points[attr_points.length - 1].y = y;
				var strAttr = "";
				for(var i = 0; i < attr_points.length; i++)
					strAttr += attr_points[i].x + "," + attr_points[i].y + ' ';
				polygon.attr('points', strAttr);
				animation();
			}, 40);
		}
	}
	animation();
}


function animateCircle(circle, step, callback)
{
	circle.show();
	circle.css('stroke-dasharray', '0 1000');
	function animate(current)
	{
		if(current > 110)
		{
			if (callback) callback.call();
		}
		else
		{
			setTimeout(function()
			{
				circle.css('stroke-dasharray', current + ' 1000');
				animate(current + step);
			}, 50);
		}
	}
	animate(0);
}

function animateArrowLine(line, arrow, x1, x2, callback)
{
	line.attr('x2', x1);
	arrow.hide();
	function animation(xPos)
	{
		if(xPos > x2)
		{
			arrow.fadeIn();
			if (callback) callback.call();
			return;
		}
		xPos += 10;
		setTimeout(function()
		{
			// arrow.()
			line.attr('x2', xPos);
			animation(xPos)
		}, 50);
	}
	animation(x1);
}


function getDistance2(x1, x2, y1, y2)
{
	var a = x1 - x2;
	var b = y1 - y2;
	return Math.sqrt( a*a + b*b )
}


function animationLine(line, x1, y1, x2, y2, step, callback)
{
	line.show();
	line.attr('x1', x1);
	line.attr('y1', y1);
	line.attr('x2', x1);
	line.attr('y2', y1);

	var count = getDistance2(x1, x2, y1, y2) / step;

	function animation(current)
	{
		if(current > count)
		{
			if(callback)
				callback.call();
		}
		else
		{
			setTimeout(function()
			{
				if(current > count - 1)
					current = count;
				var x = x1 + (x2 - x1) * current / count;
				var y = y1 + (y2 - y1) * current / count;
				line.attr('x2', x);
				line.attr('y2', y);
				animation(current + 1)
			}, 50);
		}
	}
	animation(0);
}

function animationZoomReplace(curPage, nextPage, obj1, cx2, cy2, radius2, time, callback)
{
	var cx1 = parseFloat(obj1.attr('cx'));
	var cy1 = parseFloat(obj1.attr('cy'));
	var radius1 = parseFloat(obj1.attr('r'));

	var width = $(window).width();
	var fRate = width / 1920;

	// nextPage.show();

	// var nextContent = nextPage.find('object')[0].contentDocument;
	// var obj2 = $(nextContent).find('#' + id2);
	// var cx2 = 333.521;
	// var cy2 = 509.909;
	// var radius2 = 125.594;

	var fScale = radius2 / radius1;
	var width0 = curPage.width();

	// nextPage.show();
	// nextPage.css('opacity', '1.0');
	// curPage.css('opacity', '0.7');

	// var fNextScale = 1 / fScale;
	// var sss = cx1 * (fNextScale - 1) * fRate;
	// 			var dxNext = (cx2 - cx1) * fRate;
	// 			var dyNext = (cy2 - cy1) * fRate;
	// nextPage.css('left', dxNext-cx1 * (fNextScale - 1) * fRate);
	// nextPage.css('top', dyNext-cy1 * (fNextScale - 1) * fRate);
	// nextPage.css('width', width0 * fNextScale);

	nextPage.show();
	nextPage.css('opacity', 0);
	var count = 3000 / 25;
	function animate(current)
	{
		if(current > count)
		{
			curPage.hide();
			nextPage.css('opacity', 1.0);
			if(callback)
				callback.call();
		}
		else
		{
			setTimeout(function()
			{
				if(current > count - 1)
					current = count;
				var dx = (cx2 - cx1) * current / count * fRate;
				var dy = (cy2 - cy1) * current / count * fRate;

				var scale = 1 + (fScale - 1) * current / count;
				var dx1 = cx1 * (scale - 1) * fRate;
				var dy1 = cy1 * (scale - 1) * fRate;
				curPage[0].style.left = dx - dx1 + 'px';
				curPage[0].style.top = dy - dy1 + 'px';
				curPage[0].style.width = width0 * scale + 'px';

				var dxNext = (cx2 - cx1) * current / count * fRate;
				var dyNext = (cy2 - cy1) * current / count * fRate;
				
				if(current > count * 0.8)
					nextPage.css('opacity', current / count);
				animate((current + 0.2) * 1.1);
			}, 25);
		}
	}
	animate(0);

}