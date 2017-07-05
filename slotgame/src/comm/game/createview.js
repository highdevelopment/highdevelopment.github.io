

function CTemplView(game, group, resources)
{
	this.objects = {};
	this.init = function() {
		for(var i = 0; i < resources.length; i++) {
			var obj = resources[i];
			var object = null;
			if(obj.type == 'this') {
				group.x = obj.x;
				group.y = obj.y;
			}
			if(obj.type == 'image') {
				object = group.create(obj.x, obj.y, obj.key);
			}
			else if(obj.type == 'button') {
				object = new MyButton(game, obj.x, obj.y, obj.key, null, group, 1, 0, 0, 2, group);
			}
			else if(obj.type == 'image_button') {
				object = new CImageButton(game, obj.x, obj.y, obj.key, obj.keyText, null, group, group);
			}
			else if(obj.type == 'text') {
				object = game.make.text(obj.x, obj.y, obj.text, obj.style);
				if(obj.style.shadow) {
					object.setShadow(obj.style.shadow.x, obj.style.shadow.y, obj.style.shadow.color, obj.style.shadow.blur);
				}
				group.add(object);
			}
			else if(obj.type == 'images') {
				for(var k = 0; k < obj.num; k++) {
					var key = obj.key + k;
					object = group.create(obj.x, obj.y, key);
					if(object) {
						this.setObjProp(object, obj);
						this.objects[key] = object;	
					}
				}
				continue;
			}
			else if(obj.type == 'sprite') {
				object = game.make.sprite(obj.x, obj.y, obj.key);
				object.animations.add('animation');
				group.add(object);
			}

			if(object) {
				this.setObjProp(object, obj);
				this.objects[obj.key] = object;	
			}
		}
	}

	this.setObjProp = function(object, data) {
		if(data.anchorX)
			object.anchor.x = data.anchorX;
		if(data.anchorY)
			object.anchor.y = data.anchorY;
		if(data.scaleX)
			object.scale.x = data.scaleX;
		if(data.scaleY)
			object.scale.y = data.scaleY;
		if(data.width)
			object.width = data.width;
		if(data.height)
			object.height = data.height;
		if(data.tint)
			object.tint = data.tint;
		if(data.alpha)
			object.alpha = data.alpha;
		if(data.inputEnabled)
			object.inputEnabled = data.inputEnabled;
		if(data.hidden)
			object.visible = false;
	}

	this.getObjWithKey = function(key) {
		return this.objects[key];
	}

	this.init();
}
