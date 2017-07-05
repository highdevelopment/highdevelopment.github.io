// shape with 4 vertexes
function CShapeObj(initPts, strokeColor, isCalibration, callBackMoved)
{
	var main = this;
	this.vertexes = [];
	var polygon;
	var labels = [];
	this.strokeColor = strokeColor;
	this.isCalibration = isCalibration;
	this.visible = true;

	var tmpZoom = canvas.getZoom();
	var centerPos = {};
	centerPos.x = (canvas.width - 150) * 0.5 / tmpZoom;
	centerPos.y = (canvas.height - 150) * 0.5 / tmpZoom;

	this.init = function()
	{
		var tmppoints = [];
		for(var i = 0; i < 4; i++)
		{
			tmppoints.push({
				x: initPts[i].x + centerPos.x,
				y: initPts[i].y + centerPos.y,
				// x: initPts[i].x,
				// y: initPts[i].y,
			});
		}

		for(var i = 0; i < 4; i++)
		{
			var circle = null;
			if(this.isCalibration == 2 && i == 1)
				circle = fabric.util.object.clone(g_imgCircleRed);
			else
				circle = fabric.util.object.clone(g_imgCircleBlack);
			circle.set({
				// radius: 12 / tmpZoom,
				strokeWidth: 0,
				stroke: this.strokeColor,
				fill: 'rgba(0, 0, 0, 0)',
				left: tmppoints[i].x,
				top: tmppoints[i].y,
				originX: 'center',
				originY: 'center',
				hasControls:false,
				hasBorders:false,
				opacity: 1.0,
				nindex:i,
				scaleX: 1 / tmpZoom,
				scaleY: 1 / tmpZoom,
				obj_type: 'circle',
			});

			this.vertexes.push(circle);
			canvas.moveTo(circle, 1);
			canvas.add(circle);

			var label = new CLabelObj();
			var end = i + 1;
			if(end >= tmppoints.length)
				end = 0;
			label.setPosition(tmppoints[i], tmppoints[end]);
			labels.push(label);

			circle.on('moving', function()
			{
				polygon.points[this.nindex].x = (this.left - polygon.left) / polygon.scaleX;
				polygon.points[this.nindex].y = (this.top - polygon.top) / polygon.scaleY;
				main.reloadPolygon();
				canvas.renderAll();

				if(main.isCalibration > 0)
				{
					main.refreshLength();
				}
				else
				{
					callBackMoved.call();
				}

				if(main.isCalibration == 2) {
					if(g_measureVolumeHeight && this.nindex == 1) {
						g_measureVolumeHeight.setPositionAtVolume(this.left, this.top)
					}
				}
			});
		}

		this.createPolygon(tmppoints);
		this.setEditable(main.isCalibration);
		if(main.isCalibration)
		{
			this.refreshLength();
			canvas.renderAll();
		}
	}

	this.getPoint = function(index)
	{
		return {
			x: this.vertexes[index].left,
			y: this.vertexes[index].top,
		}
	}

	this.refreshLength = function()
	{
		var values = [];
		var end = 0;
		for(var i = 0; i < main.vertexes.length; i++)
		{
			if(i == 3)
				end = 0;
			else
				end = i + 1;
			var pt1 = {
				x: main.vertexes[i].left,
				y: main.vertexes[i].top,
			}
			var pt2 = {
				x: main.vertexes[end].left,
				y: main.vertexes[end].top,
			}
			var dis = getDistanceFromTwoPoints(pt1, pt2);
			values.push(dis);
		}
		this.setLabelText(values);

		// if(g_modeMeasure == MODE.Area)
		{
			var points = [
				{
					x: main.vertexes[1].left,
					y: main.vertexes[1].top,
				},
				{
					x: main.vertexes[2].left,
					y: main.vertexes[2].top,
				},
				{
					x: main.vertexes[3].left,
					y: main.vertexes[3].top,
				},
				{
					x: main.vertexes[0].left,
					y: main.vertexes[0].top,
				},
			]
			if(main.isCalibration == 1)
			{
				var res = getAreaFrom4Points(points);
				$('#text_area input').val(res.area);
				$('#text_perimeter input').val(res.perimeter);
			}
			else if(main.isCalibration == 2)
			{
				var res = getVolumeFrom4Points(points);
				$('#text_area input').val(res.area);
				$('#text_volume input').val(res.volume);
				g_measureVolumeHeight.setLabelText(res.elen);
			}
		}
	}

	this.reloadPolygon = function()
	{
		var tmppoints = [];
		if(polygon)
		{
			polygon._calcDimensions();
			var tmpZoom = 1;//canvas.getZoom();
			for(var i = 0; i < polygon.points.length; i++)
			{
				tmppoints.push({
					x:polygon.left * tmpZoom + polygon.points[i].x * (tmpZoom * polygon.scaleX),
					y:polygon.top * tmpZoom + polygon.points[i].y * (tmpZoom * polygon.scaleX)
				});
			}
			canvas.remove(polygon);
			polygon = null;
		}
		else
		{
			for(var i = 0; i < 4; i++)
			{
				tmppoints.push({
					x: initPts[i].x + centerPos.x,
					y: initPts[i].y + centerPos.y,
				});
			}
		}
		this.createPolygon(tmppoints);
	}

	this.createPolygon = function(points)
	{
		var min_x, min_y, max_x, max_y;
		min_x = max_x = points[0].x;
		min_y = max_y = points[0].y;
		for(var i = 0; i < points.length; i++) {
			if(min_x > points[i].x) min_x = points[i].x;
			if(min_y > points[i].y) min_y = points[i].y;
			if(max_x < points[i].x) max_x = points[i].x;
			if(max_y < points[i].y) max_y = points[i].y;

			if(labels[i])
			{
				var end = i + 1;
				if(end >= points.length)
					end = 0;
				labels[i].setPosition(points[i], points[end]);
			}
		}

		for(var i = 0; i < points.length; i++) {
			points[i].x -= min_x;
			points[i].y -= min_y;
		}

		var zoom = canvas.getZoom();
		polygon = new fabric.Polygon(points, {
			left : min_x,
			top : min_y,
			fill : 'rgba(0, 0, 0, 0)',
			opacity : 1.0,
			stroke : '#882882',
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
			obj_type: 'polygon',
			visible: this.visible,
		});
		canvas.add(polygon);
		canvas.moveTo(polygon, 1);
	}

	this.setEditable = function(isEditable)
	{
		if(isEditable)
		{
			for(var i = 0; i < this.vertexes.length; i++)
			{
				this.vertexes[i].set('fill', 'rgba(1, 1, 1, 0.1)');
				this.vertexes[i].selectable = true;
				this.vertexes[i].hoverCursor = 'move';
			}
			this.showAll();
		}
		else
		{
			for(var i = 0; i < this.vertexes.length; i++)
			{
				this.vertexes[i].set('fill', 'rgba(1, 1, 1, 0)');
				this.vertexes[i].selectable = false;
				this.vertexes[i].hoverCursor = 'default';
			}
			this.hideAll();
		}
		canvas.renderAll();
	}

	this.setLabelText = function(values)
	{
		for(var i = 0; i < labels.length; i++)
		{
			labels[i].setText(values[i] + 'cm');
		}
	}

	this.showAll = function()
	{
		polygon.visible = true;
		for(var i = 0; i < this.vertexes.length; i++)
			this.vertexes[i].visible = true;
		for(var i = 0; i < labels.length; i++)
			labels[i].show();
		this.visible = true;
		canvas.renderAll();
	}

	this.hideAll = function()
	{
		polygon.visible = false;
		for(var i = 0; i < this.vertexes.length; i++)
			this.vertexes[i].visible = false;
		for(var i = 0; i < labels.length; i++)
			labels[i].hide();
		this.visible = false;
		canvas.renderAll();
	}

	this.showLabel = function()
	{
		for(var i = 0; i < labels.length; i++)
			labels[i].show();
		canvas.renderAll();
	}
	this.hideLabel = function()
	{
		for(var i = 0; i < labels.length; i++)
			labels[i].hide();
		canvas.renderAll();
	}

	this.setRotatePoints = function(angle) {
		var width = g_bgImage.imgObj.width;
		var height = g_bgImage.imgObj.height;
		for(var i = 0; i < 4; i++) {
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
			polygon.points[i].x = (x - polygon.left) / polygon.scaleX;
			polygon.points[i].y = (y - polygon.top) / polygon.scaleY;
		}
		main.reloadPolygon();
	}

	this.init();
}
