(function (scope, bundled) {
	
	var   enyo     = scope.enyo || (scope.enyo = {})
		, manifest = enyo.__manifest__ || (defineProperty(enyo, '__manifest__', {value: {}}) && enyo.__manifest__)
		, exported = enyo.__exported__ || (defineProperty(enyo, '__exported__', {value: {}}) && enyo.__exported__)
		, require  = enyo.require || (defineProperty(enyo, 'require', {value: enyoRequire}) && enyo.require)
		, local    = bundled()
		, entries;

	// below is where the generated entries list will be assigned if there is one
	entries = null;


	if (local) {
		Object.keys(local).forEach(function (name) {
			var value = local[name];
			if (manifest.hasOwnProperty(name)) {
				if (!value || !(value instanceof Array)) return;
			}
			manifest[name] = value;
		});
	}

	function defineProperty (o, p, d) {
		if (Object.defineProperty) return Object.defineProperty(o, p, d);
		o[p] = d.value;
		return o;
	}
	
	function enyoRequire (target) {
		if (!target || typeof target != 'string') return undefined;
		if (exported.hasOwnProperty(target))      return exported[target];
		var   request = enyo.request
			, entry   = manifest[target]
			, exec
			, map
			, ctx
			, reqs
			, reqr;
		if (!entry) throw new Error('Could not find module "' + target + '"');
		if (!(entry instanceof Array)) {
			if (typeof entry == 'object' && (entry.source || entry.style)) {
				throw new Error('Attempt to require an asynchronous module "' + target + '"');
			} else if (typeof entry == 'string') {
				throw new Error('Attempt to require a bundle entry "' + target + '"');
			} else {
				throw new Error('The shared module manifest has been corrupted, the module is invalid "' + target + '"');
			}
		}
		exec = entry[0];
		map  = entry[1];
		if (typeof exec != 'function') throw new Error('The shared module manifest has been corrupted, the module is invalid "' + target + '"');
		ctx  = {exports: {}};
		if (request) {
			if (map) {
				reqs = function (name) {
					return request(map.hasOwnProperty(name) ? map[name] : name);
				};
				defineProperty(reqs, 'isRequest', {value: request.isRequest});
			} else reqs = request;
		}
		reqr = !map ? require : function (name) {
			return require(map.hasOwnProperty(name) ? map[name] : name);
		};
		exec(
			ctx,
			ctx.exports,
			scope,
			reqr,
			reqs
		);
		return exported[target] = ctx.exports;
	}

	// in occassions where requests api are being used, below this comment that implementation will
	// be injected
	

	// if there are entries go ahead and execute them
	if (entries && entries.forEach) entries.forEach(function (name) { require(name); });
})(this, function () {
	// this allows us to protect the scope of the modules from the wrapper/env code
	return {'enyo-external/Notification':[function (module,exports,global,require,request){
/**
 * Enyo UI
 * @see http://enyojs.com
 * @name enyo
 * @namespace
 */

/**
 * Dynamic loaded list
 * <hr />
 * <h2>Notification format</h2>
 * Notification send with enyo.Notification#sendNotification respect the format :
 * <ul>
 *  <li><code>title</code>: The title of the notification (The main information)</li>
 *  <li><code>message</code>: The message of the notification (A description/explanation)</li>
 *  <li><code>icon</code>: The icon of the notification (ex. warning icon, stop icon)</li>
 *  <li><code>duration</code>: How long did the notification stay on screen (in seconds)</li>
 *  <li><code>stay</code>: if <code>true</code> the notification will disappear only if user click on it</li>
 *  <li><code>theme</code>: The name of the theme to use to render notification</li>
 * </ul>
 * Example :
 * <pre>{title: "Alert", message: "Your battery is low", icon: "battery-low.png", stay: true, theme: "notification.Pop"}</pre>
 * <pre>{title: "Sync", message: "Your data have been synced", icon: "sync.png", theme: "notification.MessageBar"}</pre>
 * <pre>{title: "Sound", message: "The music is muted", icon: "sound-mute.png"}</pre>
 * @name enyo.Notification
 * @class
 * @author MacFJA
 * @version 1.2 (27/09/2013)
 */

var
	kind = require('enyo/kind'),
        Control = require('enyo/Control');

var Notification = module.exports = kind({
	name: "enyo.Notification",
	kind: Control,

	published: {
		/** @lends enyo.Notification# */
		/**
		 * The default notification theme (use getter/setter)
		 * @field
		 * @type String
		 * @default "notification.Bezel"
		 */
		defaultTheme: "notification.Bezel",
	},

	events: {
		/** @lends enyo.Notification# */
		/**
		 * Inform that a notification has been send
		 * @event
		 * @param {Object} inSender Event's sender
		 * @param {Object} inEvent The notification
		 * @see enyojs.com for more information about events
		 */
		onNotify: "",

		/**
		 * Inform that the notification is tap
		 * @event
		 * @param {Object} inSender Event's sender
		 * @param {Object} inEvent The notification
		 * @see enyojs.com for more information about events
		 */
		onTap: ""
	},
	/** @lends enyo.Notification# */

	/**
	 * The list of waiting notification
	 * @field
	 * @type Array
	 * @private
	 * @default <tt>[]</tt>
	 * @name enyo.Notification#pending
	 */
	pending: [],

	/**
	 * The list of loaded theme
	 * @field
	 * @type Array
	 * @private
	 * @default <tt>[]</tt>
	 * @name enyo.Notification#themes
	 */
	themes: [],

	/**
	 * The last unique identifier
	 * @field
	 * @type Number
	 * @private
	 * @default 0
	 * @name enyo.Notification#uid
	 */
	uid: 0,

	/**
	 * Send a new notification
	 * @function
	 * @name enyo.Notification#sendNotification
	 * @param {Object} notification The notification to send
	 * @param {Function} [callback] The callBack function
	 * @return The notification UID
	 */
	sendNotification: function(notification, callback) {
		//Get the theme (or defaultTheme if no theme specified)
		var theme = this.getTheme(notification.theme||this.defaultTheme);

		this.pending.push({
			theme: theme,
			uid: this.uid,
			notification: notification,
			callback: (typeof(callback) != "function")?enyo.nop:callback,//if no callback function, use enyo.nop
		});

		theme.newNotification(notification, this.uid);//Send the notification
		this.doNotify(notification);//Send a event to inform about this new notification
		this.uid++;//Increment uid of notification

		return this.uid-1;
	},

	/**
	 * Return the theme with a specific name
	 * @function
	 * @private
	 * @param {String} name The name of the theme
	 * @returns The theme
	 * @type Object
	 * @name enyo.Notification#getTheme
	 */
	getTheme: function(name) {
		//Search the theme
		for(var tour=0,size=this.themes.length;tour<size;tour++) {
			if(this.themes[tour].name == name) {
				return this.themes[tour].component;//Return the component
			}
		}
		//If here, the theme doesn't exist, so create it.
		var newNode = this.createComponent({kind: name, onTap: "notifTap", onClose: "notifClose"}, {owner: this});
		this.themes.push({name: name, component: newNode});
		return this.themes[this.themes.length-1].component;//Return the new theme
	},

	/**
	 * Handler for <q>onTap</q> event
	 * @function
	 * @name enyo.Notification#notifTap
	 * @private
	 */
	notifTap: function(inSender, inEvent) {
		//Search the notification by its uid
		for(var tour=0,size=this.pending.length;tour<size;tour++) {
			if(this.pending[tour].uid == inEvent.uid) {
				this.pending[tour].callback(this.pending[tour].notification);//call the callback function
				this.doTap(this.pending[tour].notification);//Send a onTap event
				enyo.remove(this.pending[tour], this.pending);//Remove the pending notification
				return true;//End the function
			}
		}
	},

	/**
	 * Handler for <q>onClose</q> event
	 * @function
	 * @name enyo.Notification#notifClose
	 * @private
	 */
	notifClose: function(inSender, inEvent) {
		//Search the notification by its uid
		for(var tour=0,size=this.pending.length;tour<size;tour++) {
			if(this.pending[tour].uid == inEvent.uid) {
				enyo.remove(this.pending[tour], this.pending);//Remove the pending notification
				return;//Exit the function
			}
		}
	},
	
	/**
	 * Remove all pending noification
	 * @function
	 * @name enyo.Notification#removeAlls
	 * @param {Boolean} onlyStay Indicate if only <tt>stau</tt> notification sould be removed
	 */
	removeAllNotifications: function(onlyStay) {
		for(var tour=this.pending.length-1;tour>=0;tour--) {
			if(!onlyStay || onlyStay && this.pending[tour].notification.stay) {
				this.removeNotification(this.pending[tour].uid)
			}
		}
	},
	
	/**
	 * Remove a particular notification
	 * @function
	 * @name enyo.Notification#removeNotification
	 * @param {Int} uid The Uid of the notification
	 */
	removeNotification: function(uid) {
		//Search the notification by its uid
		for(var tour=0,size=this.pending.length;tour<size;tour++) {
			if(this.pending[tour].uid == uid) {
				this.pending[tour].theme.removeNotification(this.pending[tour].uid);
				enyo.remove(this.pending[tour], this.pending);//Remove the pending notification
				return;//Exit the function
			}
		}
	},
	
	/**
	 * Return an associative array of all pending notification<br />
	 * Key = Uid<br />
	 * Value = Notification<br />
	 * @function
	 * @name enyo.Notification.getPendingNotification
	 * @return Array of notification
	 */
	getPendingNotification: function() {
		var result = {};
		
		for(var tour=0,size=this.pending.length;tour<size;tour) {
			result[this.pending[tour].uid] = this.pending[tour].notification;
		}

		return result;
	}
});

}],'enyo-external/ColorPicker':[function (module,exports,global,require,request){
/*
Copyright (c) 2012, MachiApps
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

var kind = require('enyo/kind'),
    Control = require('enyo/Control'),
    Slider = require('onyx/Slider'),
    FittableColumns = require('layout/FittableColumns'),
    FittableRows = require('layout/FittableRows');

var DefaultColorsBox = kind({
	name: "DefaultColorsBox",
	published: {
		color: ''
	},
	events: {
		onSelect: ""
	},
	components: [
		{classes: "onyx-groupbox", ontap: "colorTapped", components:[
			{name: "colorBox", style: "height: 24px; border: 1px solid Black; margin: 5px;"}
		]}
	],
	create: function() {
		this.inherited(arguments);
		this.colorChanged();
	},
	setColor: function(c){
		this.color = c;
		this.colorChanged();
	},
	colorChanged: function(){
		this.$.colorBox.applyStyle("background-color", '#' + this.color);
	},
	colorTapped: function(){
		this.bubble("onSelect", {color: this.color});
	}
});

var DefaultColorsBoxes = kind({
	name: "DefaultColorsBoxes",
	components: [
		{kind: FittableColumns, components: [
			{style: "width: 5%;"},
			{kind: FittableRows, style: "width: 10%;", defaultKind: DefaultColorsBox, components: [
				{color: "000000"},
				{color: "222222"},
				{color: "444444"},
				{color: "666666"},
				{color: "888888"},
				{color: "AAAAAA"},
				{color: "CCCCCC"},
				{color: "FFFFFF"}
			]},
			{kind: FittableRows, style: "width: 10%;", defaultKind: DefaultColorsBox, components: [
				{color: "220000"},
				{color: "440000"},
				{color: "880000"},
				{color: "BB0000"},
				{color: "FF0000"},
				{color: "FE2E2E"},
				{color: "F78181"},
				{color: "F6CECE"}
			]},
			{kind: FittableRows, style: "width: 10%;", defaultKind: DefaultColorsBox, components: [
				{color: "002200"},
				{color: "004400"},
				{color: "008800"},
				{color: "00BB00"},
				{color: "00FF00"},
				{color: "2EFF2E"},
				{color: "81FF81"},
				{color: "CEF6CE"}
			]},
			{kind: FittableRows, style: "width: 10%;", defaultKind: DefaultColorsBox, components: [
				{color: "000022"},
				{color: "000044"},
				{color: "000088"},
				{color: "0000BB"},
				{color: "0000FF"},
				{color: "2E2EFF"},
				{color: "8181FF"},
				{color: "CECEF6"}
			]},
			{kind: FittableRows, style: "width: 10%;", defaultKind: DefaultColorsBox, components: [
				{color: "220022"},
				{color: "440044"},
				{color: "880088"},
				{color: "BB00BB"},
				{color: "FF00FF"},
				{color: "FF2EFF"},
				{color: "FF81FF"},
				{color: "F6CEF6"}
			]},
			{kind: FittableRows, style: "width: 10%;", defaultKind: DefaultColorsBox, components: [
				{color: "002222"},
				{color: "004444"},
				{color: "008888"},
				{color: "00BBBB"},
				{color: "00FFFF"},
				{color: "2EFFFF"},
				{color: "81FFFF"},
				{color: "CEF6F6"}
			]},
			{kind: FittableRows, style: "width: 10%;", defaultKind: DefaultColorsBox, components: [
				{color: "222200"},
				{color: "444400"},
				{color: "888800"},
				{color: "BBBB00"},
				{color: "FFFF00"},
				{color: "FFFF2E"},
				{color: "FFFF81"},
				{color: "F6F6CE"}
			]},
			{kind: FittableRows, style: "width: 10%;", defaultKind: DefaultColorsBox, components: [
				{color: "3B240B"},
				{color: "61380B"},
				{color: "B45F04"},
				{color: "FF8000"},
				{color: "FE9A2E"},
				{color: "FAAC58"},
				{color: "F7BE81"},
				{color: "F5D0A9"}
			]},
			{kind: FittableRows, style: "width: 10%;", defaultKind: DefaultColorsBox, components: [
				{color: "3B0B17"},
				{color: "610B21"},
				{color: "8A0829"},
				{color: "DF013A"},
				{color: "FF0040"},
				{color: "FA5882"},
				{color: "F7819F"},
				{color: "F5A9BC"}
			]},
			{style: "width: 5%;"}
		]}
	]
});

module.exports = kind({
	name: "ColorPicker",
	kind: Control,
	published: {
		red: 'ff',
		blue: 'ff',
		green: 'ff',
		color: ''
	},
	events: {
		onColorPick: "",
		onColorSlide: ""
	},
	handlers: {
		onSelect: "colorTapped"
	},
	components: [
		{kind: DefaultColorsBoxes},
		{kind: Slider, name: "redSlider", barClasses: "red-progress-bar", onChanging: "redSliding", onChange: "redChanged", style: "vertical-align:middle; height:10px;"},
		{style: "height: 10px"},
		{kind: Slider, name: "greenSlider", barClasses: "green-progress-bar", onChanging: "greenSliding", onChange: "greenChanged", style: "vertical-align:middle; height:10px;"},
		{style: "height: 10px"},
		{kind: Slider, name: "blueSlider", barClasses: "blue-progress-bar", onChanging: "blueSliding", onChange: "blueChanged", style: "vertical-align:middle; height:10px;"},
		{style: "height: 10px"},
		{classes: "onyx-groupbox", components:[
			{name: "colorBox", ontap: "mainColorPicked", style: "height: 32px; border: 1px solid Black; margin: 10px;"}
		]}
	],
	create: function() {
		this.inherited(arguments);
		this.updateColor();
		this.updateProgresses();
	},
	colorTapped: function(inEvent, data){
		this.red = data.color.substr(0,2);
		this.green = data.color.substr(2,2);
		this.blue = data.color.substr(4,2);
		this.updateProgresses();
		this.updateColor();
		this.doColorPick();
		return true;
	},
	updateProgresses: function(){
		var r = Math.floor(parseInt(this.red, 16)*100/255);
		var b = Math.floor(parseInt(this.blue, 16)*100/255);
		var g = Math.floor(parseInt(this.green, 16)*100/255);
		this.$.redSlider.setValue(r);
		this.$.greenSlider.setValue(g);
		this.$.blueSlider.setValue(b);
	},
	mainColorPicked: function(){
		color = this.color;
		this.doColorPick();
	},
	updateColor: function(){
		var c = '#' + (this.red + this.green + this.blue).toUpperCase();
		this.$.colorBox.applyStyle("background-color", c);
		this.color = c;
	},
	redChanged: function(inSender, inEvent){
		var x = Math.floor(inEvent.value*255/100);
		var h = x.toString(16);
		if (h.length==1){
			h = '0' + h;
		}
		this.red = h;
		this.updateColor();
	},
	greenChanged: function(inSender, inEvent){
		var x = Math.floor(inEvent.value*255/100);
		var h = x.toString(16);
		if (h.length==1){
			h = '0' + h;
		}
		this.green = h;
		this.updateColor();
	},
	blueChanged: function(inSender, inEvent){
		var x = Math.floor(inEvent.value*255/100);
		var h = x.toString(16);
		if (h.length==1){
			h = '0' + h;
		}
		this.blue = h;
		this.updateColor();
	},
	redSliding: function(inSender, inEvent){
		var x = Math.floor(inEvent.value*255/100);
		var h = x.toString(16);
		if (h.length==1){
			h = '0' + h;
		}
		this.red = h;
		this.updateColor();
		this.doColorSlide();
	},
	greenSliding: function(inSender, inEvent){
		var x = Math.floor(inEvent.value*255/100);
		var h = x.toString(16);
		if (h.length==1){
			h = '0' + h;
		}
		this.green = h;
		this.updateColor();
		this.doColorSlide();
	},
	blueSliding: function(inSender, inEvent){
		var x = Math.floor(inEvent.value*255/100);
		var h = x.toString(16);
		if (h.length==1){
			h = '0' + h;
		}
		this.blue = h;
		this.updateColor();
		this.doColorSlide();
	}
});

}],'enyo-external/FileInputDecorator':[function (module,exports,global,require,request){
/**
	Allows for improved customizable file input, with support for filetype
	filters, multiple file selection, html5 media capture across a wide breadth
	of browsers.
	
	You can wrap this component around other controls to let taps on them trigger the file input.
	If no inner components are specified, a generic button is used.
	
	Note: filetype filters, multiple file support, and media capture not supported in IE.
*/

var
        kind = require('enyo/kind');
var
	Control = require('enyo/Control'),
	Input = require('enyo/Input'),
	Button = require('onyx/Button');

module.exports = kind({
	name: "FileInputDecorator",
	published: {
		//* File browser mode: either _"file"_, _"audio"_, _"image"_, or _"video"_.
		type: "file",
		//* Mimetype to filter files for. Confirmed not to work well with IE and Firefox.
		mime: undefined,
		//* Whether to create new files via camera/microphone/camcorder. Only works on mobile devices.
		capture: false, 
		//* Whether to input multiple files. Does not work in IE and many mobile browsers
		multiple: false,
		//* Any name attribute you may want to specify
		inputName:undefined,
		//* Disabled or not
		disabled: false
	},
	events: {
		/**
			Triggered when one or more files are selected.
			Event data includes the _"value"_ property which is the standard input value property,
			as well as _"files"_, which is the FileList object (for browsers that support it)
		*/
		onSelect: ""
	},
	//* @protected
	tag:"span",
	handlers: {
		ontap: "browse"
	},
	components: [
		{style:"width: 0px; height: 0px; overflow: hidden;", components:[
			{name:"fileInput", kind: Input, type:"file", onchange:"filesSelected"}
		]},
		{name: "client", tag:"span"},
	],
	defaultClient: [
		{kind: Button, content:"Browse..."}
	],
	create: function() {
		this.inherited(arguments);
		if(!this.$.client.children || this.$.client.children.length==0) {
			this.$.client.createComponents(this.defaultClient);
		}
		this.updateFileInputAttr();
		this.disabledChanged();
	},
	updateFileInputAttr: function() {
		if(!this.mime) {
			if(this.type=="audio") {
				this.$.fileInput.setAttribute("accept", "audio/*");
				if(this.capture) {
					this.$.fileInput.setAttribute("capture", "microphone");
				} else {
					this.$.fileInput.setAttribute("capture", "filesystem");
				}
			} else if(this.type=="image") {
				this.$.fileInput.setAttribute("accept", "image/*");
				if(this.capture) {
					this.$.fileInput.setAttribute("capture", "camera");
				} else {
					this.$.fileInput.setAttribute("capture", "filesystem");
				}
			} else if(this.type=="video") {
				this.$.fileInput.setAttribute("accept", "video/*");
				if(this.capture) {
					this.$.fileInput.setAttribute("capture", "camcorder");
				} else {
					this.$.fileInput.setAttribute("capture", "filesystem");
				}
			} else {
				this.$.fileInput.setAttribute("accept", "*/*");
				this.$.fileInput.setAttribute("capture", "filesystem");
			}
		} else {
			this.$.fileInput.setAttribute("accept", this.mime);
			this.$.fileInput.setAttribute("capture", "filesystem");
		}
		if(this.multiple) {
			this.$.fileInput.setAttribute("multiple", "multiple");
		} else {
			this.$.fileInput.setAttribute("multiple", null);
		}
		if(this.inputName) {
			this.$.fileInput.setAttribute("name", this.inputName);
		} else {
			this.$.fileInput.setAttribute("name", null);
		}
	},
	typeChanged: function() {
		this.updateFileInputAttr();
	},
	captureChanged: function() {
		this.updateFileInputAttr();
	},
	multipleChanged: function() {
		this.updateFileInputAttr();
	},
	inputNameChanged: function() {
		this.updateFileInputAttr();
	},
	disabledChanged: function() {
		this.$.fileInput.setDisabled(this.disabled);
	},
	//* @public
	//* Trigger the file input browser. This function is called automatically when tapped on.
	browse: function() {
		var node = this.$.fileInput.hasNode();
		if(node && node.click) {
			node.click();
		}
	},
	//* @protected
	filesSelected: function(inSender, inEvent) {
		this.doSelect({value:this.$.fileInput.getValue(), files:inEvent.target.files});
	}
});

}]
	};

});
//# sourceMappingURL=enyo-external.js.map