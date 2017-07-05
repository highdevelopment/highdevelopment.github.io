
// line object with 2 vertex
function CLengthObj(initPos, isVolume)
{
	var main = this;
	this.vertexes = [];
	this.polygon;
	this.text;
	this.visible = true;

	var zoom = canvas.getZoom();
	var centerPos = {};
	centerPos.x = (canvas.width - 150) * 0.5 / zoom;
	centerPos.y = (canvas.height - 150) * 0.5 / zoom;
	var measuer_pts = [
		{x:centerPos.x, y:centerPos.y},
		{x:30 / zoom + centerPos.x, y:200 / zoom + centerPos.y},
	];

	if(isVolume) {
		if(g_measureArea) {
			initPos.x = g_measureArea.vertexes[1].left;
			initPos.y = g_measureArea.vertexes[1].top;
			measuer_pts[0].x = 0;
			measuer_pts[0].y = 0;
			measuer_pts[1].x = 30 / zoom;
			measuer_pts[1].y = 200 / zoom;
		}
	}

	this.init = function()
	{
		var tmppoints = [];
		for(var i = 0; i < 2; i++)
		{
			tmppoints.push({
				x: measuer_pts[i].x + initPos.x,
				y: measuer_pts[i].y + initPos.y,
			});
		}

		var tmpZoom = canvas.getZoom();
		for(var i = 0; i < 2; i++)
		{
			var circle;
			var selectable = true;
			if(isVolume)
			{
				if(i == 0) {
					selectable = false;
					circle = fabric.util.object.clone(g_imgCircleRed);
				}
				else {
					circle = fabric.util.object.clone(g_imgCircleBlue);
				}
			}
			else
				circle = fabric.util.object.clone(g_imgCircleBlue);
			var zoom = canvas.getZoom();
			circle.set({
			// var circle = new fabric.Circle({
				radius: 15 / tmpZoom,
				strokeWidth: 0,
				stroke: '#00ff00',
				fill: 'rgba(1, 1, 1, 0.2)',
				left: tmppoints[i].x,
				top: tmppoints[i].y,
				originX: 'center',
				originY: 'center',
				hasControls:false,
				hasBorders:false,
				opacity: 1.0,
				nindex:i,
				scaleX: 1/ zoom,
				scaleY: 1 / zoom,
				obj_type: 'circle',
				selectable: selectable,
			});

			this.vertexes.push(circle);
			canvas.add(circle);

			circle.on('moving', function()
			{
				if(this.nindex == 0)
				{
					main.polygon.x1 = (this.left - main.polygon.left) / main.polygon.scaleX;
					main.polygon.y1 = (this.top - main.polygon.top) / main.polygon.scaleY;
				}
				else
				{
					main.polygon.x2 = (this.left - main.polygon.left) / main.polygon.scaleX;
					main.polygon.y2 = (this.top - main.polygon.top) / main.polygon.scaleY;
				}
				main.reloadPolygon();
				canvas.renderAll();

				if(isVolume)
				{
					g_measureArea.refreshLength();
				}
			});
		}

		this.text = new CLabelObj();
		this.createPolygon(tmppoints);
	}

	this.setPositionAtVolume = function(x, y) {
		this.vertexes[0].left = x;
		this.vertexes[0].top = y;
		main.polygon.x1 = (x - this.polygon.left) / this.polygon.scaleX;
		main.polygon.y1 = (y - this.polygon.top) / this.polygon.scaleY;
		main.reloadPolygon();
		canvas.renderAll();
		g_measureArea.refreshLength();
	}

	this.reloadPolygon = function()
	{
		var tmppoints = [];
		if(main.polygon)
		{
			var tmpZoom = 1;//canvas.getZoom();
			tmppoints.push({
				x:main.polygon.left * tmpZoom + main.polygon.x1 * (tmpZoom * main.polygon.scaleX),
				y:main.polygon.top * tmpZoom + main.polygon.y1 * (tmpZoom * main.polygon.scaleX)
			});
			tmppoints.push({
				x:main.polygon.left * tmpZoom + main.polygon.x2 * (tmpZoom * main.polygon.scaleX),
				y:main.polygon.top * tmpZoom + main.polygon.y2 * (tmpZoom * main.polygon.scaleX)
			});
			canvas.remove(main.polygon);
			main.polygon = null;
		}
		else
		{
			for(var i = 0; i < 2; i++)
			{
				tmppoints.push({
					x: measuer_pts[i].x + initPos.x,
					y: measuer_pts[i].y + initPos.y,
				});
			}
		}
		this.createPolygon(tmppoints);
	}

	this.refreshLength = function(points)
	{
		var pt1, pt2;
		if(!points)
		{
			if(this.vertexes.length > 0)
			{
				pt1 = {
					x: this.vertexes[0].left,
					y: this.vertexes[0].top,
				};
				pt2 = {
					x: this.vertexes[1].left,
					y: this.vertexes[1].top,
				};
			}
		}
		else
		{
			pt1 = points[0];
			pt2 = points[1];
		}
		var dis = getDistanceFromTwoPoints(pt1, pt2);
		var string = dis.toString() + 'cm';
		this.text.setPosition(pt1, pt2, string);
	}

	this.setLabelText = function(length)
	{
		var string = length.toString() + 'cm';
		this.text.setText(string);
	}

	this.createPolygon = function(points)
	{
		this.refreshLength(points);
		var min_x, min_y, max_x, max_y;
		// var tmpZoom = canvas.getZoom();
		min_x = max_x = points[0].x;
		min_y = max_y = points[0].y;
		for(var i = 0; i < points.length; i++) {
			if(min_x > points[i].x) min_x = points[i].x;
			if(min_y > points[i].y) min_y = points[i].y;
			if(max_x < points[i].x) max_x = points[i].x;
			if(max_y < points[i].y) max_y = points[i].y;
		}

		for(var i = 0; i < points.length; i++) {
			points[i].x -= min_x;
			points[i].y -= min_y;
		}

		var zoom = canvas.getZoom();
		main.polygon = new fabric.Line([points[0].x, points[0].y, points[1].x, points[1].y], {
			left : min_x,
			top : min_y,
			fill : 'rgba(0, 0, 0, 0)',
			opacity : 1.0,
			stroke : '#FFAA22',
			strokeWidth : 2 / zoom,
			originX : 'left',
			originY : 'top',
			hoverCursor : 'default',
			selectable : false,
			hasBorders : false,
			lockUniScaling : true,
			lockRotation : true,
			objtype : 'BlockObj',
			lockMovementX : false,
			lockMovementY : false,
			obj_type: 'line',
			visible: this.visible,
		});
		canvas.add(main.polygon);
		canvas.moveTo(main.polygon, 1);
	}

	this.show = function()
	{
		this.polygon.visible = true;
		for(var i = 0; i < this.vertexes.length; i++)
			this.vertexes[i].visible = true;
		this.text.show();
		canvas.renderAll();
		this.visible = true;
	}

	this.hide = function()
	{
		this.polygon.visible = false;
		for(var i = 0; i < this.vertexes.length; i++)
			this.vertexes[i].visible = false;
		this.text.hide();
		canvas.renderAll();
		this.visible = false;
	}

	this.setRotatePoints = function(angle) {
		var width = g_bgImage.imgObj.width;
		var height = g_bgImage.imgObj.height;
		for(var i = 0; i < 2; i++) {
			var ox = this.vertexes[i].left;
			var oy = this.vertexes[i].top;
			if(angle == 90) {
				x = height - oy;
				y = ox;
			}
			else if(angle == 180) {
				x = width - oy;
				y = ox;
			}
			else if(angle == 270) {
				x = height - oy;
				y = ox;
			}
			else if(angle == 0) {
				x = width - oy;
				y = ox;
			}
			this.vertexes[i].left = x;
			this.vertexes[i].top = y;
		}
		this.polygon.x1 = (this.vertexes[0].left - this.polygon.left) / this.polygon.scaleX;
		this.polygon.y1 = (this.vertexes[0].top - this.polygon.top) / this.polygon.scaleY;
		this.polygon.x2 = (this.vertexes[1].left - this.polygon.left) / this.polygon.scaleX;
		this.polygon.y2 = (this.vertexes[1].top - this.polygon.top) / this.polygon.scaleY;
		this.reloadPolygon();
	}

	this.init();
}