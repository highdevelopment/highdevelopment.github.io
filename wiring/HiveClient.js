(function (scope, bundled) {
	
	var   enyo     = scope.enyo || (scope.enyo = {})
		, manifest = enyo.__manifest__ || (defineProperty(enyo, '__manifest__', {value: {}}) && enyo.__manifest__)
		, exported = enyo.__exported__ || (defineProperty(enyo, '__exported__', {value: {}}) && enyo.__exported__)
		, require  = enyo.require || (defineProperty(enyo, 'require', {value: enyoRequire}) && enyo.require)
		, local    = bundled()
		, entries;

	// below is where the generated entries list will be assigned if there is one
	entries = ['index'];


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
	return {'src/common/services/stack':[function (module,exports,global,require,request){
//

var STACK_TYPES = {
    SVG: 'svg',
    ENYO: 'enyo'
};
exports.STACK_TYPES = STACK_TYPES;

var STACK_METHODS = {
    NONE: 'none',
    DEFAULT: 'default',
    CREATE: 'create',
    DELETE: 'delete',
    EDIT: 'edit',
    REMOVE: 'remove',
    MOVE: 'move',
    RESIZE: 'resize',
    FLIP: 'flip',
    TRANSITION: 'transition',
    CALLBACK: 'callback',
    ROTATE: 'rotate',
    PARALLEL: 'parallel',
    TO_FRONT: 'toFront',
    TO_BACK: 'toBack',
    TAP: 'tap'
};
exports.STACK_METHODS = STACK_METHODS;

var STACK_ENYO = BaseEntity.extend({
    init: function(panel, parentPanel, method, sender, value, parent, command) {
        this.id = -1;
        this.panel = panel;
        this.parentPanel = parentPanel;
        this.type = STACK_TYPES.ENYO;
        this.method = method || STACK_METHODS.NONE;
        this.sender = sender;
        this.value = value;
        this.parent = parent;
        this.command = command;
    }
});
exports.STACK_ENYO = STACK_ENYO;

var STACK_SVG = BaseEntity.extend({
    init: function(panel, parentPanel, method, object, data) {
        this.id = -1;
        this.panel = panel;
        this.parentPanel = parentPanel;
        this.type = STACK_TYPES.SVG;
        this.method = method || STACK_METHODS.NONE;
        this.object = object;
        this.data = data;
    }
});
exports.STACK_SVG = STACK_SVG;

var STACK_STORAGE = Class.extend({
    init: function() {
        this.data = new Collection();
    },
    addStack: function(panel, parentPanel, type, method, sender, value, parentSender, command) {
        var stack;
        if(type === STACK_TYPES.ENYO) {
            stack = new STACK_ENYO(panel, parentPanel, method, sender, value, parentSender, command);
        } else if(type === STACK_TYPES.SVG) {
            stack = new STACK_SVG(panel, parentPanel, method, sender, value);
        }
        if(stack) {
            this.data.add(stack, true);
        }

        return stack;
    },
    removeStack: function(stack) {
        this.data.remove(stack);
    },
    removePanel: function(parentPanel) {
        for(var i = 0; i < this.data.count; i++) {
            if(this.data.collection[i].parentPanel === parentPanel) {
                this.removeStack(this.data.collection[i]);
                i--;
            }
        }
    },
    getStack: function(panel) {
        for(var i = this.data.count - 1; i > -1; i--) {
            if(this.data.item(i).panel === panel) {
                return this.data.item(i);
            }
        }
        return false;
    },
    getStackByParentPanel: function(parentPanel) {
        for(var i = this.data.count - 1; i > -1; i--) {
            if(this.data.item(i).parentPanel === parentPanel) {
                return this.data.item(i);
            }
        }
        return false;
    },
    // Method Create
    enyoCreate: function(stack) {
        if(stack.sender && stack.parent && stack.command) {
            stack.parent[stack.command](stack.sender);
        }
    },
    // Method Remove
    enyoRemove: function(stack) {
        if(stack.parent && stack.command && stack.value) {
            stack.parent[stack.command](stack.value);
        }
    },
    // Method Edit
    enyoEdit: function(stack) {
        if(stack.sender.kind == "onyx.Input" || stack.sender.kind == "onyx.TextArea") {
            stack.sender.setValue(stack.value);
            stack.sender.triggerHandler('oninput');
        } else if(stack.sender.kind == "onyx.Checkbox") {
            stack.sender.setChecked(stack.value)
        } else if(stack.sender.kind == "Group") {
            stack.value.setChecked(true);
        }
        if(stack.parent && stack.command) {
            stack.parent[stack.command](stack);
        }
    },
    // Method Transition
    enyoTransition: function(stack) {
        if(stack.sender.kind == "Panels") {
            stack.sender.undoed = true;
            stack.sender.setIndex(stack.value);
        }
    },
    // Method Callback
    enyoCallback: function(stack) {
        if(stack.parent && stack.command) {
            stack.parent[stack.command](stack);
        }
    },
    // Method default
    enyoDefault: function(stack) {
        if(stack.parent && stack.command && stack.value) {
            stack.parent[stack.command](stack.value);
        }
    },
    // Enyo Undo
    undo: function(panel) {
        var stack = this.getStack(panel);
        if(!!stack && stack.type === STACK_TYPES.ENYO) {
            if(stack.method === STACK_METHODS.CREATE) {
                this.enyoCreate(stack);
            } else if(stack.method === STACK_METHODS.REMOVE) {
                this.enyoRemove(stack);
            } else if(stack.method === STACK_METHODS.EDIT) {
                this.enyoEdit(stack);
            } else if(stack.method === STACK_METHODS.TRANSITION) {
                this.enyoTransition(stack);
            } else if(stack.method === STACK_METHODS.CALLBACK) {
                this.enyoCallback(stack);
            } else if(stack.method === STACK_METHODS.DEFAULT) {
                this.enyoDefault(stack);
            }

            // Remove
            this.removeStack(stack);
        }
    }
});
exports.STACK_STORAGE = STACK_STORAGE;

var STACK_LIST = new STACK_STORAGE();
exports.STACK_LIST = STACK_LIST;

}],'src/common/services/label':[function (module,exports,global,require,request){
var ERROR = {
    email: "Email is required!",
    username: "Username is required!",
    password: "Password is required!",
    confirmPassword: "Retype Password is required!",
    emailValid: "Email is incorrect!"
};
exports.ERROR = ERROR;

var LABELS = {
    setup: {
        projectName: "New project",
        projectNotes: "Project's description",
        projectAddress: "unknown",
        projectCoordinates: "unknown",
        projectAltitude: "unknown"
    },
    siteBuilder: {
        zoneExisting: "Room is ready!",
        zoneNotReady: "Room doesn't ready!"
    }
};
exports.LABELS = LABELS;

}],'src/views/progress/wiring/preview':[function (module,exports,global,require,request){
//

var wiringPreview = module.exports = {
    configs: {
        distanceY: 80,
        distanceAdaptor: 30,
        distanceSensor: 10
    },
    mObjectController: new Collection(),
    mObjectAdaptor: new Collection(),
    mObjectSensor: new Collection(),
    loaded: false,

    init: function(svg, width, height, flag) {
        this.width = width;
        this.height = height;
        this.mObjectController = new Collection();
        this.mObjectAdaptor = new Collection();
        this.mObjectSensor = new Collection();

        $("#" + svg).html('');
        this.paper = Snap("#" + svg);
        this.paper.attr({width: this.width, height: this.height});

        // Root node
        this.rootNode = this.paper.g();

        // Master (Tree root)
        var controller = this.createController({
            id: 1,
            name: 'MASTER CONTROLLER',
            url: "assets/images/temps/wiring/master-controller.png",
            x: 0,
            y: 0,
            w: 130,
            h: 90
        });

        // Adaptor
        this.createAdaptor(controller, {
            id: 1,
            name: 'RELAY',
            url: "assets/images/temps/wiring/equipment.png",
            w: 79,
            h: 117
        });

        var adaptor = this.createAdaptor(controller, {
            id: 2,
            name: 'SENSOR',
            url: "assets/images/temps/wiring/equipment.png",
            w: 79,
            h: 117
        });

        this.moveToCenter();

        if(!!flag) {

            // Create sensor
            this.createSensor(adaptor, {
                id: 1,
                name: "sensor",
                url: 'assets/images/sensors/t.svg',
                w: 30,
                h: 30
            });

            this.createSensor(adaptor, {
                id: 2,
                name: "sensor",
                url: 'assets/images/sensors/t.svg',
                w: 30,
                h: 30
            });

            this.createSensor(adaptor, {
                id: 3,
                name: "sensor",
                url: 'assets/images/sensors/t.svg',
                w: 30,
                h: 30
            });
        }

    },
    createController: function(options) {
        var controller = this.paper.g();
        this.rootNode.add(controller);

        var img = this.paper.image(options.url, options.x, options.y, options.w, options.h);
        controller.add(img);

        var text = options.name.split(' ');
        // Create label
        var label = this.paper.text(controller.getBBox().cx, controller.getBBox().cy - 5, text);
        label.attr({
            fill: "#FFF",
            fontSize: 12,
            fontWeight: 'bold',
            'text-anchor': 'middle',
            stroke: 'none',
            cursor: 'pointer'

        });
        label.length = text.length;
        if(text.length == 1) {
            label.select('tspan:nth-of-type(1)').attr({x: parseFloat(label.attr('x')), dy: 10});
        } else if(text.length == 2) {
            label.select('tspan:first-of-type').attr({x: parseFloat(label.attr('x')), dy: 0});
            label.select('tspan:last-of-type').attr({x: parseFloat(label.attr('x')), dy: 15});
        } else {
            label.select('tspan:first-of-type').attr({x: parseFloat(label.attr('x')), dy: 0});
            label.select('tspan:last-of-type').attr({x: parseFloat(label.attr('x')), dy: 15});
        }
        controller.add(label);

        controller.id = options.id;
        this.mObjectController.add(controller);
        controller.adaptors = new Collection();

        this.rootNode.transform('T0,0');

        return controller;
    },
    createAdaptor: function(controller, options) {
        var adaptor = this.paper.g();
        this.rootNode.add(adaptor);

        var img = this.paper.image(options.url, options.x, options.y, options.w, options.h);

        adaptor.add(img);

        // Create label
        //var label = this.paper.text((options.x * 2 + options.w) / 2, options.y + 35, options.name);
        var label = this.paper.text(0, 0, options.name);
        label.attr({
            fill: "#FFFFFF",
            fontSize: 11,
            fontWeight: 'bold',
            'text-anchor': 'middle',
            stroke: 'none',
            cursor: 'pointer'
        });
        adaptor.add(label);

        this.mObjectAdaptor.add(adaptor);
        controller.adaptors.add(adaptor);
        adaptor.parentControler = controller;
        adaptor.sensors = new Collection();

        // Get Position
        var distanceAdaptor = this.configs.distanceAdaptor;
        var bb = controller.getBBox();
        var x = bb.cx - (options.w * (controller.adaptors.count) + distanceAdaptor * (controller.adaptors.count - 1)) / 2;
        var y = bb.y2 + this.configs.distanceY;

        // Rearrange position
        var ref = this;
        this.mObjectAdaptor.forEach(function(item) {
            if(item.parentControler === controller) {
                item[0].attr({
                    x: x,
                    y: y
                });
                var bbItem = item[0].getBBox();
                if(item[1]) {
                    item[1].attr({
                        x: bbItem.cx,
                        y: y + 35
                    });
                }
                // Draw connection
                if(item.connectPath != undefined) {
                    item.connectPath.remove();
                }
                item.connectPath = ref.paper.path("M" + bb.cx + " " + bb.y2 + "L" + bbItem.cx + " " + bbItem.y).attr({
                    stroke: "#525380",
                    'stroke-width': 3
                });
                ref.rootNode.add(item.connectPath);

                x += options.w + distanceAdaptor;
            }
        });

        this.rootNode.transform('T0,0');

        return adaptor;
    },
    createSensor: function(adaptor, options) {
        var sensor = this.paper.image(options.url, options.x, options.y, options.w, options.h);
        this.rootNode.add(sensor);

        sensor.id = options.id;

        this.mObjectSensor.add(sensor);
        adaptor.sensors.add(sensor);
        sensor.parentAdaptor = adaptor;

        // Get Position
        var distanceAdaptor = this.configs.distanceSensor;
        var bb = adaptor.getBBox();
        var x = bb.cx - (options.w * (adaptor.sensors.count) + distanceAdaptor * (adaptor.sensors.count - 1)) / 2;
        var y = bb.y2 + this.configs.distanceY;
        // Rearrange position
        var ref = this;
        this.mObjectSensor.forEach(function(item) {
            if(item.parentAdaptor === adaptor) {
                item.attr({
                    x: x,
                    y: y
                });
                x += options.w + distanceAdaptor;
                // Draw connection
                if(item.connectPath != undefined) {
                    item.connectPath.remove();
                }
                var bbItem = item.getBBox();
                item.connectPath = ref.paper.path("M" + bb.cx + " " + bb.y2 + "L" + bbItem.cx + " " + bbItem.y).attr({
                    stroke: "#525380",
                    'stroke-width': 3
                });

                ref.rootNode.add(item.connectPath);
            }
        });

        this.rootNode.transform('T0,0');

        return sensor;
    },
    moveToCenter: function() {
        var bb = this.rootNode.getBBox(),
            cx = this.width / 2,
        //cy = this.height / 2,
            cy = bb.height / 2 + 50,
            dx = cx - bb.cx,
            dy = cy - bb.cy;

        this.mObjectController.forEach(function(controller) {
            // Image
            controller[0].attr({
                x: parseFloat(controller[0].attr('x')) + dx,
                y: parseFloat(controller[0].attr('y')) + dy
            });
            // Label
            controller[1].attr({
                x: parseFloat(controller[1].attr('x')) + dx,
                y: parseFloat(controller[1].attr('y')) + dy
            });
            for(var i = 1; i <= controller[1].length; i++) {
                controller[1].select('tspan:nth-of-type(' + i + ')').attr({
                    x: parseFloat(controller[1].attr('x'))
                });
            }

            controller.adaptors.forEach(function(adaptor) {
                adaptor[0].attr({
                    x: parseFloat(adaptor[0].attr('x')) + dx,
                    y: parseFloat(adaptor[0].attr('y')) + dy
                });
                adaptor[1].attr({
                    x: parseFloat(adaptor[1].attr('x')) + dx,
                    y: parseFloat(adaptor[1].attr('y')) + dy
                });
                adaptor.transform('T0,0');
                var path = Snap.parsePathString(adaptor.connectPath.attr('path'));
                for(var i = 0; i < path.length; i++) {
                    path[i][1] += dx;
                    path[i][2] += dy;
                }
                adaptor.connectPath.attr("path", path.toString());
                adaptor.connectPath.transform('T0,0');

                adaptor.sensors.forEach(function(sensor) {
                    sensor.attr({
                        x: parseFloat(sensor.attr('x')) + dx,
                        y: parseFloat(sensor.attr('y')) + dy
                    });
                    sensor.transform('T0,0');
                    var path = Snap.parsePathString(sensor.connectPath.attr('path'));
                    for(var i = 0; i < path.length; i++) {
                        path[i][1] += dx;
                        path[i][2] += dy;
                    }
                    sensor.connectPath.attr("path", path.toString());
                    sensor.connectPath.transform('T0,0');
                });
            });
        });
        this.rootNode.transform("T0,0");
    }
};

}],'src/views/progress/screenState':[function (module,exports,global,require,request){
module.exports= [{fromScreen: null, state:0, eventState:0}]
}],'src/data/enums':[function (module,exports,global,require,request){
// Generated by DDL Code Generator
// on 2017-01-30 06:02:16 UTC
// from /srv/udat/home/jfilling/work/hcontroller_1/Database/current/current-schema.sql,/srv/udat/home/jfilling/work/hcontroller_1/Database/current/current-enums.sql.

const databaseEnumsDDLMD5Hash = "4ee96eaf884da12c54d11f74f7455a5f"

// Animation_Method_Enum
var AnimationMethod = exports.AnimationMethod =
{
    SOMETHINGHERE: 0
}
Object.freeze(AnimationMethod)

// Animation_Types_Enum
var AnimationTypes = exports.AnimationTypes =
{
    SOMETHINGHERE: 0
}
Object.freeze(AnimationTypes)

// Boolean_Enum
var Boolean = exports.Boolean =
{
    FALSE: 0,
    TRUE: 1
}
Object.freeze(Boolean)

// Building_Model_Types_Enum
var BuildingModelTypes = exports.BuildingModelTypes =
{
    IFC: 0,
    GBXML: 1,
    resCheck: 2,
    comCheck: 3,
    designDay: 4
}
Object.freeze(BuildingModelTypes)

// Building_Types_Enum
var BuildingTypes = exports.BuildingTypes =
{
    commercial: 0,
    residential: 1,
    industrial: 2,
    other: 3
}
Object.freeze(BuildingTypes)

// Connection_Node_Types_Enum
var ConnectionNodeTypes = exports.ConnectionNodeTypes =
{
    INPUT: 0,
    OUTPUT: 1,
    INOUT: 2
}
Object.freeze(ConnectionNodeTypes)

// Connector_Type_Enum
var ConnectorType = exports.ConnectorType =
{
    SOMETHINGHERE: 0
}
Object.freeze(ConnectorType)

// Controller_Type_Enum
var ControllerType = exports.ControllerType =
{
    controlerLCD: 0,
    controlerHeadless: 1
}
Object.freeze(ControllerType)

// Day_Enum
var Day = exports.Day =
{
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4,
    Saturday: 5,
    Sunday: 6
}
Object.freeze(Day)

// Design_Day_Enum
var DesignDay = exports.DesignDay =
{
    SOMETHINGHERE: 0
}
Object.freeze(DesignDay)

// Device_Type_Enum
var DeviceType = exports.DeviceType =
{
    SOMETHINGHERE: 0
}
Object.freeze(DeviceType)

// Frequency_Enum
var Frequency = exports.Frequency =
{
    SOMETHINGHERE: 0
}
Object.freeze(Frequency)

// Interface_Enum
var Interface = exports.Interface =
{
    SOMETHINGHERE: 0
}
Object.freeze(Interface)

// Module_Type_Enum
var ModuleType = exports.ModuleType =
{
    GPIO: 0,
    relay: 1,
    power: 2,
    motorControl: 3
}
Object.freeze(ModuleType)

// Protocol_Enum
var Protocol = exports.Protocol =
{
    TCP: 0,
    oneWire: 1,
    modbus: 2,
    bacnet: 3,
    enocean: 4
}
Object.freeze(Protocol)

// Protocol_Transport_Type_Enum
var ProtocolTransportType = exports.ProtocolTransportType =
{
    SOMETHINGHERE: 0
}
Object.freeze(ProtocolTransportType)

// Protocol_Type_Enum
var ProtocolType = exports.ProtocolType =
{
    SOMETHINGHERE: 0
}
Object.freeze(ProtocolType)

// Role_Enum
var Role = exports.Role =
{
    superUser: 0,
    privledgedUser: 1,
    standardUser: 2
}
Object.freeze(Role)

// Sensor_Subclass_Enum
var SensorSubclass = exports.SensorSubclass =
{
    temperature: 0,
    thermostat: 1,
    humidity: 2,
    gasSensor: 3,
    waterSensor: 4,
    flow: 5,
    liquidLevel: 6,
    windSpeed: 7,
    windDirection: 8,
    errorStatus: 9,
    custom: 10
}
Object.freeze(SensorSubclass)

// Sensor_Substance_Enum
var SensorSubstance = exports.SensorSubstance =
{
    air: 0,
    water: 1,
    refrigerant: 2,
    co2: 3,
    surface: 4
}
Object.freeze(SensorSubstance)

// Setting_Mode_Enum
var SettingMode = exports.SettingMode =
{
    auto: 0,
    heating: 1,
    cooling: 2
}
Object.freeze(SettingMode)

// Subsystem_Group_Type_Enum
var SubsystemGroupType = exports.SubsystemGroupType =
{
    singleGroup: 0,
    parallelGroup: 1,
    exclusiveGroup: 2
}
Object.freeze(SubsystemGroupType)

// Subsystem_Type_Enum
var SubsystemType = exports.SubsystemType =
{
    heating: 0,
    cooling: 1,
    general: 2
}
Object.freeze(SubsystemType)

// Surface_Type_Enum
var SurfaceType = exports.SurfaceType =
{
    ROOF: 0,
    WALL: 1,
    FLOOR: 2,
    SLAB: 3,
    BASEMENT: 4,
    GLAZING: 5
}
Object.freeze(SurfaceType)

// System_Priority_Enum
var SystemPriority = exports.SystemPriority =
{
    highLifeSupport: 0,
    lowLifeSupport: 1,
    userRequest: 2,
    generalPriority: 3
}
Object.freeze(SystemPriority)

// Unit_Category_Enum
var UnitCategory = exports.UnitCategory =
{
    Acceleration: 1,
    Angle: 2,
    Area: 3,
    ConcentrationMass: 4,
    Dispersion: 5,
    Duration: 6,
    ElectricCharge: 7,
    ElectricCurrent: 8,
    ElectricPotentialDifference: 9,
    ElectricResistance: 10,
    Energy: 11,
    Frequency: 12,
    FuelEfficiency: 13,
    Illuminance: 14,
    Length: 15,
    Mass: 16,
    Number: 17,
    Power: 18,
    Pressure: 19,
    Speed: 20,
    Temperature: 21,
    Volume: 22
}
Object.freeze(UnitCategory)

// Virtual_Enum
var Virtual = exports.Virtual =
{
    SOMETHINGHERE: 0
}
Object.freeze(Virtual)


}],'src/views/progress/site/list-setting-content':[function (module,exports,global,require,request){
//

var kind = require('enyo/kind');

module.exports = kind({
    name: 'pl.site.ListSettingContent',
    create: function() {
        this.inherited(arguments);
    },
    rendered: function() {
        this.inherited(arguments);
    },
    sortAlphabet: function() {
        var a, b, a1, b1, rx = /(\d+)|(\D+)/g, rd = /\d+/;
        this.children.sort(function(as, bs) {
            a = String(as.value).toLowerCase().match(rx);
            b = String(bs.value).toLowerCase().match(rx);
            while(a.length && b.length) {
                a1 = a.shift();
                b1 = b.shift();
                if(rd.test(a1) || rd.test(b1)) {
                    if(!rd.test(a1)) return 1;
                    if(!rd.test(b1)) return -1;
                    if(a1 != b1) return a1 - b1;
                } else if(a1 != b1) {
                    return a1 > b1 ? 1 : -1;
                }
            }
            return a.length - b.length;
        });

        this.render();
    }
});

}],'src/common/services/utils':[function (module,exports,global,require,request){
//

var IS_TOUCH = require('enyo/platform').touch;
var eGetPosition= require('enyo/dispatcher').getPosition;

var utils = module.exports = {
    // Get mouse position
    getPosition: function() {
        var pos = {x: 0, y: 0};
        if(IS_TOUCH) {
            pos.x = window.event.changedTouches[0].pageX;
            pos.y = window.event.changedTouches[0].pageY;
        } else {
            pos.x = eGetPosition().pageX;
            pos.y = eGetPosition().pageY;
        }

        return pos;
    },

    // Get offset enyo element
    getOffset: function(element) {
        var absoluteBounds = element.getAbsoluteBounds();

        return {
            top: absoluteBounds.top,
            left: absoluteBounds.left,
            width: absoluteBounds.width,
            height: absoluteBounds.height
        };
    },

    // Check inside enyo element
    isInside: function(element) {
        var pos = utils.getPosition();
        var offset = utils.getOffset(element);
        if((offset.left <= pos.x && pos.x <= offset.left + offset.width) && (offset.top <= pos.y && pos.y <= offset.top + offset.height)) {
            return true;
        }
        return false;
    },

    // Get object size.
    getSize: function(target, style) {
        return {
            width: this.getCSSProperty(target, PROPERTY_NAMES.width, style),
            height: this.getCSSProperty(target, PROPERTY_NAMES.height, style)
        }
    },

    // Set object size
    setPosition: function(target, pos, unit) {
        target = target || {};
        unit = unit || "px";

        if(target.hasOwnProperty('addStyles')) {
            target.addStyles("top:" + pos.y + unit + "; left:" + pos.x + unit);
        }
    },

    // Get CSS Property
    getCSSProperty: function(target, property, style) {
        style == style || false;
        if(target.hasNode()) {
            return (style) ? target.node.style[property] : target.node[property];
        }
    },

    // Check Number
    isNumber: function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    },

    // Get Ordinal
    getOrdinal: function(n) {
        if((parseFloat(n) == parseInt(n)) && !isNaN(n)) {
            var s = ["th", "st", "nd", "rd"],
                v = n % 100;
            return n + (s[(v - 20) % 10] || s[v] || s[0]);
        }
        return n;
    },

    // fn in valide email
    invalidateEmail: function(email) {
        var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(email);
    },
    ///
    // convert longitude/latitude decimal degrees to degrees, minutes, seconds
    // DDD to DMS
    // @param lat, latitude degrees decimal
    // @param lng, longitude degrees decimal
    ///
    convertDDToDMS: function(D) {
        return [0 | D, '° ', 0 | (D < 0 ? D = -D : D) % 1 * 60, "' ", 0 | D * 60 % 1 * 60, '"'].join('');
    },
    degToDms: function(dec) {
        var deg = Math.floor(Math.abs(dec));
        var min = Math.floor((Math.abs(dec) - deg) * 60);
        var sec = (Math.round((((Math.abs(dec) - deg) - (min / 60)) * 60 * 60) * 100) / 100 );
        var len = String(deg).length
        deg = Array(3 + 1 - len).join('0') + deg;
        var len = String(min).length
        min = Array(2 + 1 - len).join('0') + min;
        var len = String(sec).length
        sec = Array(5 + 1 - len).join('0') + sec;
        deg = dec < 0 ? '-' + deg : deg;
        var dec_min = (min * 1.0 + (sec / 60.0));
        var dms = deg + '&deg ' + dec_min.toFixed(3) + '\'';
        return dms;
    },

    // To parse your input use the following.
    parseInputDMS: function(input) {
        var parts = input.split(/[^\d\w]+/);
        var lat = utils.convertDMSToDD(parts[0], parts[1], parts[2], parts[3]);
        var lng = utils.convertDMSToDD(parts[4], parts[5], parts[6], parts[7]);

        console.log(lat)
        console.log(lng)
    },

    // The following will convert your DMS to DD
    convertDMSToDD: function(days, minutes, seconds, direction) {
        var dd = days + minutes / 60 + seconds / (60 * 60);

        if(direction == "S" || direction == "W") {
            dd = dd * -1;
        } // Don't do anything for N or E
        return dd;
    },

    // Sort By ASC
    orderByNameAscending: function(a, b) {
        if(a.name == b.name) {
            return 0;
        } else if(a.name > b.name) {
            return 1;
        }
        return -1;
    },

    // Sort By ASC
    orderByIdAscending: function(a, b) {
        if(a.id == b.id) {
            return 0;
        } else if(a.id > b.id) {
            return 1;
        }
        return -1;
    },

    // Order By Name Ascending
    foldersOrderBy: function(folders) {
        //folders.sort(utils.orderByNameAscending);
        for(var i = 0; i < folders.length; i++) {
            folders[i].projects.sort(utils.orderByNameAscending);
        }
    },

    // Remove Folder in Folders by folderIndex
    removeItemInArray: function(folders, folderIndex) {
        var newFolders = new Array();
        for(var i = 0; i < folders.length; i++) {
            if(i == folderIndex) continue;
            newFolders.push(folders[i]);
        }
        return newFolders;
    },

    // Handle Files When Upload Or Drop
    handleFiles: function(files) {
        var url = undefined;
        window.URL = window.URL || window.webkitURL;
        for(var i = 0, file; file = files[i]; i++) {
            if(!file.type.match(/image.*/)) continue;
            url = window.URL.createObjectURL(file);
            break;
        }
        return url;
    },

    // Image Info
    getImageUrl: function(files) {
        return new Promise(function(resolve) {
            window.URL = window.URL || window.webkitURL;
            var url, file;
            for(var i = 0, f; f = files[i]; i++) {
                if(!f.type.match(/image.*/)) continue;
                file = f;
                url = window.URL.createObjectURL(file);
                break;
            }
            if(file && window.File && window.FileReader && window.FileList && window.Blob) {
                var reader = new FileReader();
                reader.onloadend = function() {
                    var tempImg = new Image();
                    tempImg.src = reader.result;
                    tempImg.onload = function() {
                        resolve({
                            width: tempImg.width,
                            height: tempImg.height,
                            url: url
                        });
                    };
                };
                reader.readAsDataURL(file);
            } else {
                resolve(false);
            }
        });
    },

    ///
    // convertImgToBase64
    // @param  {String}   url
    // @param  {Function} callback
    // @param  {String}   [outputFormat='image/png']
    // @author HaNdTriX
    // @example
    // convertImgToBase64('http://goo.gl/AOxHAL', function(base64Img){
    // console.log('IMAGE:',base64Img);
    // })
    ///
    convertImgToBase64: function(url, callback, outputFormat) {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function() {
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img, 0, 0);
            var dataURL = canvas.toDataURL(outputFormat || "image/png|gif|jpg");
            callback.call(this, dataURL);
            // Clean up
            canvas = null;
        };
        img.src = url;
    },

    // Make SVG tag
    // var clippath = makeSVG("clippath", {"id": "mask_polygon"});
    // var polygon = makeSVG("polygon", {"points": "159 515,586 515,586 158,159 158"});
    // clippath.appendChild(polygon);
    makeSVG: function(tag, attrs, content) {
        var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
        if(!!attrs) {
            for(var k in attrs) {
                el.setAttribute(k, attrs[k]);
            }
        }
        if(!!content) el.innerHTML = content;
        return el;
    },

    // Make Html tag
    makeHTML: function(tag, attrs) {
        var el = document.createElement(tag);
        if(!!attrs) {
            for(var k in attrs) {
                el.setAttribute(k, attrs[k]);
            }
        }
        return el;
    },

    // Make highlight element
    makeHighlight: function(id, colorMatrix, deviation) {
        if(!id) {
            id = "highlight";
        }
        if(!colorMatrix) {
            colorMatrix = "0 0 0 0 0 0 0 0 0 0 5 5 5 5 0 5 5 5 5.7 0";
        }
        if(!deviation) {
            deviation = "2";
        }
        // a transparent grey glow with no offset
        var feMerge = this.makeSVG('feMerge');
        feMerge.appendChild(this.makeSVG('feMergeNode', {in: "coloredBlur"}));
        feMerge.appendChild(this.makeSVG('feMergeNode', {in: "SourceGraphic"}));
        var filter = this.makeSVG('filter', {id: id});
        filter.appendChild(this.makeSVG('feColorMatrix', {type: "matrix", values: colorMatrix}));
        filter.appendChild(this.makeSVG('feGaussianBlur', {stdDeviation: deviation, result: "coloredBlur"}));
        filter.appendChild(feMerge);
        return filter;
    },

    // Convert to path
    getPoints: function(points) {
        var path = "";
        for(var i = 0; i < points.length; i++) {
            if(i == 0) {
                path += 'M' + points[i].x + "," + points[i].y;
            }
            else {
                path += 'L' + points[i].x + "," + points[i].y;
            }
        }
        return path;
    },
    mergingPoints: function(points) {
        var path = "";
        for(var i = 0; i < points.length; i++) {
            if(i == 0) {
                path += 'M ' + points[i].x + " " + points[i].y;
            }
            else {
                path += ' L ' + points[i].x + " " + points[i].y;
            }
        }
        return path;
    },

    // Check position on connect-line to get point/breakpoint
    checkBreakPoints: function(points, pos) { // start - end
        var offset = 25;
        // check start
        var point = points[0];
        var distance = Math.sqrt(Math.pow(pos.y - point[2], 2) + Math.pow(pos.x - point[1], 2));
        if(distance <= offset) {
            return {
                pos: 'start',
                index: 0
            };
        }
        // check end
        var point = points[points.length - 1];
        var distance = Math.sqrt(Math.pow(pos.y - point[2], 2) + Math.pow(pos.x - point[1], 2));
        if(distance <= offset) {
            return {
                pos: 'end',
                index: points.length - 1
            };
        }

        return false;
    },

    // encode xml
    encodeXml: function(str) {
        if(str === undefined) {
            return "";
        }
        return str.replaceAll("&", "&amp;").replaceAll("\"", "&quot;").replaceAll("'", "&apos;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\n", "\\n");
    },

    // decode xml
    decodeXml: function(str) {
        if(str === undefined) {
            return "";
        }
        return str.replaceAll("\\n", "\n").replaceAll("&quot;", "\"").replaceAll("&apos;", "'").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&");
    },

    // restrict character
    restrictCharacter: function(e) {
        var k;
        document.all ? k = e.keyCode : k = e.which;
        return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57) || k == 40 || k == 41 || k == 45 || k == 95);
    },

    // number only
    numbersOnly: function(e, decimal) {
        var key;
        var keychar;
        if(window.event) {
            key = window.event.keyCode;
        } else if(e) {
            key = e.which;
        } else {
            return true;
        }
        keychar = String.fromCharCode(key);
        if((key == null) || (key == 0) || (key == 8) || (key == 9) || (key == 13) || (key == 27)) {
            return true;
        } else if((("-+0123456789").indexOf(keychar) > -1)) {
            return true;
        } else if(decimal && (keychar == ".")) {
            return true;
        } else {
            return false;
        }
    },
    parseFloat: function(str) {
        return parseFloat(str.replace(/[^-.0-9]/g, ''));
    },

    // Parse String from Xml
    parseString: function(XML) {
        //code for IE
        if(window.ActiveXObject) {
            return XML.xml;
        } else { // code for Chrome, Safari, Firefox, Opera, etc.
            return (new XMLSerializer()).serializeToString(XML);
        }
    },

    // Parse XML form string
    parseXml: function(xmlStr) {
        if(typeof window.DOMParser != "undefined") {
            return (new window.DOMParser()).parseFromString(xmlStr, "text/xml");
        } else if(typeof window.ActiveXObject != "undefined" && new window.ActiveXObject("Microsoft.XMLDOM")) {
            var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = "false";
            xmlDoc.loadXML(xmlStr);
            return xmlDoc;
        } else {
            throw new Error("No XML parser found");
        }
    },

    // Get XML form Url
    httpGetXml: function(theUrl) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, false);
        xmlHttp.send(null);
        return xmlHttp.responseXML;
    },

    // Get String form Url
    httpGetString: function(theUrl) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, false);
        xmlHttp.send(null);
        return xmlHttp.responseText;
    },

    // Clone array
    cloneArray: function(inArray) {
        var outArray = [];
        for(var i = 0; i < inArray.length; i++) {
            var childs = [];
            for(var j = 0; j < inArray[i].length; j++) {
                childs.push(inArray[i][j]);
            }
            outArray.push(childs);
        }
        return outArray;
    },
    deltaTransformPoint: function(matrix, point) {
        var dx = point.x * matrix.a + point.y * matrix.c + 0;
        var dy = point.x * matrix.b + point.y * matrix.d + 0;
        return {x: dx, y: dy};
    },
    decomposeMatrix: function(matrix) {
        // @see https://gist.github.com/2052247
        // calculate delta transform point
        var px = this.deltaTransformPoint(matrix, {x: 0, y: 1});
        var py = this.deltaTransformPoint(matrix, {x: 1, y: 0});

        // calculate skew
        var skewX = ((180 / Math.PI) * Math.atan2(px.y, px.x) - 90);
        var skewY = ((180 / Math.PI) * Math.atan2(py.y, py.x));

        return {
            translateX: matrix.e,
            translateY: matrix.f,
            scaleX: Math.sqrt(matrix.a * matrix.a + matrix.b * matrix.b),
            scaleY: Math.sqrt(matrix.c * matrix.c + matrix.d * matrix.d),
            skewX: skewX,
            skewY: skewY,
            rotation: skewX // rotation is the same as skew x
        };
    },

    /**
     * Returns a random number between min (inclusive) and max (exclusive)
     */
    getRandomArbitrary: function(min, max) {
        return Math.random() * (max - min) + min;
    },

    /**
     * Returns a random integer between min (inclusive) and max (inclusive)
     * Using Math.round() will give you a non-uniform distribution!
     */
    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /**
     * Calculate Lighter or Darker Hex Colors
     */
    colorLuminance: function(hex, lum) {
        // validate hex string
        hex = String(hex).replace(/[^0-9a-f]/gi, '');
        if(hex.length < 6) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        lum = lum || 0;

        // convert to decimal and change luminosity
        var rgb = "#", c, i;
        for(i = 0; i < 3; i++) {
            c = parseInt(hex.substr(i * 2, 2), 16);
            c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
            rgb += ("00" + c).substr(c.length);
        }

        return rgb;
    },

    //*** Convert color
    hex2Rgb: function(hex) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    },
    rgb2Hex: function(r, g, b) {
        function componentToHex(c) {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }

        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    },
    hex2hsb: function(hex) {
        var rgb = this.hex2Rgb(hex);
        return rgb ? Snap.rgb2hsb(rgb) : null;
    },

    // Change opacity = 1 and luminosity
    changeLuminosityOfHsl: function(color, luminosity) {
        var rgb = Snap.getRGB(color);
        var hsl = Snap.rgb2hsl(rgb.r, rgb.g, rgb.b);

        return Snap.hsl2rgb(hsl.h, hsl.s, luminosity).hex;
    },

    // Incrementing hue color
    colorHsvIncrementing: function(hexColor, hue, saturation, brightness) {
        saturation = saturation || 1;
        brightness = brightness || 1;

        var rgb = Snap.getRGB(hexColor);
        var hsb = Snap.rgb2hsb(rgb.r, rgb.g, rgb.b);

        return Snap.hsb2rgb(hsb.h + hue, saturation, brightness).hex;
    },
    getRgbaString: function(color, transparency) {
        transparency = transparency || 1;
        var rgb = Snap.getRGB(color);

        return 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', ' + transparency + ')';

    },

    // SVG Ellipse to Path Converter
    ellipseToPath: function(cx, cy, rx, ry) {
        var output = "M" + (cx - rx).toString() + "," + cy.toString() +
            "a" + rx.toString() + "," + ry.toString() + " 0 1,0 " + (2 * rx).toString() + ",0" +
            "a" + rx.toString() + "," + ry.toString() + " 0 1,0 " + (-2 * rx).toString() + ",0";

        return output;
    },

    // SVG Circle to Path Converter
    circleToPath: function(cx, cy, r) {
        return this.ellipseToPath(cx, cy, r, r);
    },

    // SVG Rect to Path Converter
    rectToPath: function(x, y, x2, y2) {
        var output = "M" + x.toString() + "," + y.toString() +
            "L" + x2.toString() + "," + y.toString() +
            "L" + x2.toString() + "," + y2.toString() +
            "L" + x + "," + y2 + "Z";

        return output;
    },

    // Points to Path Converter
    pointsToPath: function(points) {
        var path = utils.getPoints(points);

        return path + 'Z';
    },

    polarToCartesian: function(centerX, centerY, radiusX, radiusY, angleInDegrees) {
        var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

        return {
            x: centerX + (radiusX * Math.cos(angleInRadians)),
            y: centerY + (radiusY * Math.sin(angleInRadians))
        };
    },

    // SVG Arc (Ellipse or  Circle) to Path Converter
    ellipticalArcToPath: function(x, y, radiusX, radiusY, startAngle, endAngle) {
        var start = this.polarToCartesian(x, y, radiusX, radiusY, endAngle);
        var end = this.polarToCartesian(x, y, radiusX, radiusY, startAngle);
        var arcSweep = endAngle - startAngle <= 180 ? '0' : '1';
        var d = [
            'M', start.x, start.y,
            'A', radiusX, radiusY, 0, arcSweep, 0, end.x, end.y
        ].join(' ');

        return d;
    },

    // Left trim
    ltrim: function(strings, chars) {
        chars = chars || "\\s*";
        return strings.replace(new RegExp("^[" + chars + "]+", "g"), "");
    },

    // Right trim
    rtrim: function(strings, chars) {
        chars = chars || "\\s*";
        return strings.replace(new RegExp("[" + chars + "]+$", "g"), "");
    },

    // Trim
    trim: function(strings, chars) {
        return this.ltrim(this.rtrim(strings, chars), chars);
    },

    // Prepend array
    prependArray: function(oldArray, value) {
        var newArray = new Array();
        newArray.push(value);
        for(var i = 0; i < oldArray.length; ++i) {
            newArray.push(oldArray[i]);
        }
        return newArray;
    },

    //*** Calculate angle, distance between three points - Return degrees
    calculateThreePoints: function(p2, p1, p3) {
        p1 = p1 || {x: 0, y: 0};
        p2 = p2 || {x: 0, y: 0};
        p3 = p3 || {x: 0, y: 0};

        var d12 = utils.getDistanceTwoPoints(p1, p2);
        var d13 = utils.getDistanceTwoPoints(p1, p3);
        var d23 = utils.getDistanceTwoPoints(p2, p3);

        var rad = Math.acos((Math.pow(d12, 2) + Math.pow(d13, 2) - Math.pow(d23, 2)) / (2 * d12 * d13)); // between 0 and PI radians
        if(rad == 0) {
            return {d12: d12, d13: d13, d23: d23, angle: 0};
        } else {
            return {d12: d12, d13: d13, d23: d23, angle: rad * 180 / Math.PI};
        }
    },

    /***
     * Distance two points
     * @param p1
     * @param p2
     * @returns {number}
     */
    calculateTwoPoints: function(p1, p2) {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    },

    //*** Get point by projection
    projectionPointOnPath: function(path, point) {
        point = point || {x: 0, y: 0};
        var arr = [];
        var i1 = Snap.path.intersection(path, 'M-10000,' + point.y + 'L' + "10000," + point.y),
            i2 = Snap.path.intersection(path, 'M' + point.x + ',-10000L' + point.x + ",10000");
        for(var i = 0; i < i1.length; i++) {
            var p = {
                x: parseFloat(i1[i].x.toFixed(2)),
                y: parseFloat(i1[i].y.toFixed(2))
            };
            p.d = Math.sqrt(Math.pow(p.x - point.x, 2) + Math.pow(p.y - point.y, 2));
            arr.push(p);
        }
        for(var i = 0; i < i2.length; i++) {
            var p = {
                x: parseFloat(i2[i].x.toFixed(2)),
                y: parseFloat(i2[i].y.toFixed(2))
            };
            p.d = Math.sqrt(Math.pow(p.x - point.x, 2) + Math.pow(p.y - point.y, 2));
            arr.push(p);
        }
        if(arr.length > 0) {
            arr.sort(function(a, b) {
                return a.d - b.d
            });
            return {x: arr[0].x, y: arr[0].y};
        }
        return false;
    },

    //*** Quadrant coordinates
    getDirection: function(r, p) {
        if(r.x == p.x && r.y == p.y) {
            return 0;
        } else if(r.x <= p.x && r.y >= p.y) {
            return 1;
        } else if(r.x <= p.x && r.y <= p.y) {
            return 2;
        } else if(r.x >= p.x && r.y <= p.y) {
            return 3;
        } else if(r.x >= p.x && r.y >= p.y) {
            return 4;
        }
    },

    /***
     * Get Distance from p1 to p2
     */
    getDistanceTwoPoints: function(p1, p2) {
        return utils.calculateTwoPoints(p1, p2);
    },

    /***
     * Get Properties From Three Points
     * @param p2
     * @param p1
     * @param p3
     * @returns {*|{d12, d13, d23, angle}}
     */
    getPropertiesThreePoints: function(p2, p1, p3) {
        return utils.calculateThreePoints(p2, p1, p3);
    },

    /***
     * Get Point: Projection of a point to vector
     * @param O(x;y)
     * @param vector(A(x,y),B(x,y))
     * n=(a,b), A(xa, ya) => a(x-xa)+b(y-yb)=0
     */
    getPointOfPointToVector: function(O, A, B) {
        // OM*AB
        var a1 = A.x - B.x,
            b1 = A.y - B.y,
            c1 = -(A.x - B.x) * O.x - (A.y - B.y) * O.y;

        // a(x-xa)+b(y-yb)=0
        var a2 = A.y - B.y,
            b2 = -A.x + B.x,
            c2 = -(A.y - B.y) * A.x - (B.x - A.x) * A.y;

        return utils.getXYOfEquation(a1, b1, -c1, a2, b2, -c2);
    },

    /***
     * @param a1x + b1y = c1
     * @param a2x + b2y = c2
     */
    getXYOfEquation: function(a1, b1, c1, a2, b2, c2) {
        var d = a1 * b2 - a2 * b1,
            dx = c1 * b2 - c2 * b1,
            dy = a1 * c2 - a2 * c1;

        if(d != 0) {
            return {
                x: parseFloat(dx / d),
                y: parseFloat(dy / d)
            };
        } else {
            if(dx != 0 && dy != 0) {
                // return false
            } else if(dx == 0 && dy == 0) {
                // return n
            }
        }

        return false;
    },

    /**
     *    var svgText = document.getElementById("myViewer").outerHTML;
     *    var myCanvas = document.getElementById("canvas");
     *    var ctxt = myCanvas.getContext("2d");
     *    // usage:
     *    drawInlineSVG(ctxt, svgText, function() {
     *        console.log(canvas.toDataURL());  // -> PNG
     *        alert("see console for output...");
     *    });
     **/
    drawInlineSVG: function(ctx, rawSVG, callback) {
        var svg = new Blob([rawSVG], {type: "image/svg+xml;charset=utf-8"}),
            domURL = self.URL || self.webkitURL || self,
            url = domURL.createObjectURL(svg),
            img = new Image;

        img.onload = function() {
            ctx.drawImage(this, 0, 0);
            domURL.revokeObjectURL(url);
            callback(this);
        };

        img.src = url;
    }
};

}],'src/common/services/graphic':[function (module,exports,global,require,request){
//

var utils = require('../../common/services/utils.js');
var STACK_LIST = require('../../common/services/stack.js').STACK_LIST;
var STACK_TYPES = require('../../common/services/stack.js').STACK_TYPES;
var eGetPosition= require('enyo/dispatcher').getPosition;

var IS_TOUCH = require('enyo/platform').touch;

var Graphic = module.exports = Class.extend({
    init: function(svgName, inputName, info, width, height, configs, onMouseDown, onMouseMove, onMouseUp, onStart, onMove, onEnd, fIn, fOut) {
        var _self = this;
        this.svgName = svgName;
        this.inputName = inputName;
        this.info = info;
        this.configs = configs;
        this.scale = 1;
        this.currZoom = 1;
        this.minZoom = 0.5;
        this.maxZoom = 2;
        this.currPos = {x: 0, y: 0};
        this.currMatrix = new Snap.Matrix();
        this.mMouse = {
            start: {x: 0, y: 0},
            position: {x: 0, y: 0}
        };
        this.width = width;
        this.height = height;

        // Create node input
        this.input = document.getElementById(inputName);
        this.input.addEventListener('keydown', function(e) {
            switch(e.keyCode) {
                case 13: // enter
                {
                    if(toolIcons.isAddText) {
                        _self.createText({
                            x: this.x,
                            y: this.y,
                            text: this.value
                        });
                    }
                    break;
                }
            }
        });

        // Create svg
        this.paper = Snap("#" + svgName);
        this.paper.attr({width: this.width, height: this.height});
        this.paper.width = width;
        this.paper.height = height;

        // Events
        if(IS_TOUCH) { // For mobile
            this.paper.node.addEventListener('touchstart', onMouseDown, false);
            this.paper.node.addEventListener('touchmove', onMouseMove, false);
            this.paper.node.addEventListener('touchend', onMouseUp, false);
        } else { // For desktop
            this.paper.node.onmousedown = onMouseDown;
            this.paper.node.onmousemove = onMouseMove;
            this.paper.node.onmouseup = onMouseUp;
        }

        // Create root group
        var rootChildNodes = this.paper.node.childNodes; // get all child nodes in our svg element
        this.rootNode = this.paper.g(); // Root
        var index = 0; // initialize our index counter for child nodes
        var noOfChildNodes = rootChildNodes.length - 1;// get the number of child nodes in our root node
        // go through all child elements
        // (except the last one, which is our <g> element)
        while(index < noOfChildNodes) {
            this.appendChild(rootChildNodes[0]);
            index += 1;
        }

        // Create group behind
        this.behindNode = this.group();

        // Create background
        this.backdrop = this.paper.g();
        this.paper.prepend(this.backdrop);

        // panZoom
        this.panZoom = this.paper.panzoom({
            zoomStep: this.configs.zoomStep
        });

        // function
        this.onMove = onMove;
        this.onStart = onStart;
        this.onEnd = onEnd;
        this.fIn = fIn;
        this.fOut = fOut;

        // define some custom options
        this.zpdOptions = {
            pan: true,          // enable or disable panning (default enabled)
            zoom: true,         // enable or disable zooming (default enabled)
            drag: false,        // enable or disable dragging (default disabled)
            zoomStep: 0.05       // define zoom sensitivity
        };

        // define some data to be used in the function internally
        this.zpdData = {
            state: 'none',
            stateTarget: null,
            stateOrigin: null,
            stateTf: null
        };

        /**
         * Sets the current transform matrix of an element.
         */
        function setCTM(element, matrix, threshold) {
            if(threshold && typeof threshold === 'object') { // array [0.5,2]
                if(matrix.a <= threshold[0]) {
                    return;
                }
                if(matrix.d >= threshold[1]) {
                    return;
                }
            }
            var s = "matrix(" + matrix.a + "," + matrix.b + "," + matrix.c + "," + matrix.d + "," + matrix.e + "," + matrix.f + ")";
            element.setAttribute("transform", s);

            return matrix;
        }

        /**
         * Instance an SVGPoint object with given event coordinates.
         */
        function getEventPoint(event, svgNode) {
            var p = svgNode.node.createSVGPoint();

            if(!!('ontouchstart' in window)) { // Check tablet
                p.x = event.changedTouches[0].clientX;
                p.y = event.changedTouches[0].clientY;
            } else {
                p.x = event.clientX;
                p.y = event.clientY;
            }

            return p;
        }

        function handleMouseDown(event) {
            if(event.preventDefault) {
                event.preventDefault();
            }

            event.returnValue = false;

            var g = _self.rootNode.node;

            if(event.target.tagName == "svg" || !_self.zpdOptions.drag) { // Pan anyway when drag is disabled and the user clicked on an element
                // Pan mode
                _self.zpdData.state = 'pan';
                _self.zpdData.stateTf = g.getCTM().inverse();
                _self.zpdData.stateOrigin = getEventPoint(event, _self.paper).matrixTransform(_self.zpdData.stateTf);
            } else {
                // Drag mode
                _self.zpdData.state = 'drag';
                _self.zpdData.stateTarget = event.target;
                _self.zpdData.stateTf = g.getCTM().inverse();
                _self.zpdData.stateOrigin = getEventPoint(event, _self.paper).matrixTransform(_self.zpdData.stateTf);
            }
        }

        function handleMouseMove(event) {
            if(event.preventDefault) {
                event.preventDefault();
            }
            event.returnValue = false;
            var g = _self.rootNode.node;
            if(_self.zpdData.state == 'pan' && _self.zpdOptions.pan && toolIcons.isMoving) { // Pan mode
                var p = getEventPoint(event, _self.paper).matrixTransform(_self.zpdData.stateTf);
                var matrix = setCTM(
                    g,
                    _self.zpdData.stateTf.inverse().translate(p.x - _self.zpdData.stateOrigin.x, p.y - _self.zpdData.stateOrigin.y)
                );
                _self.currMatrix = matrix;
            } else if(_self.zpdData.state == 'drag' && _self.zpdOptions.drag) { // Drag mode
                var dragPoint = getEventPoint(event, _self.paper).matrixTransform(g.getCTM().inverse());
                setCTM(
                    _self.zpdData.stateTarget,
                    _self.paper.node.createSVGMatrix()
                        .translate(dragPoint.x - _self.zpdData.stateOrigin.x, dragPoint.y - _self.zpdData.stateOrigin.y)
                        .multiply(g.getCTM().inverse())
                        .multiply(_self.zpdData.stateTarget.getCTM())
                );
                _self.zpdData.stateOrigin = dragPoint;
            }
        }

        function handleMouseUp(event) {
            if(event.preventDefault) {
                event.preventDefault();
            }
            event.returnValue = false;
            if(_self.zpdData.state == 'pan' || _self.zpdData.state == 'drag') {
                _self.zpdData.state = ''; // quit pan mode
            }
        }

        if(IS_TOUCH) { // For mobile
            this.paper.node.addEventListener('touchstart', handleMouseDown, false);
            this.paper.node.addEventListener('touchmove', handleMouseMove, false);
            this.paper.node.addEventListener('touchend', handleMouseUp, false);
        } else { // For desktop
            // IE < 9 would need to use the event onmouseup, but they do not support svg anyway.
            this.paper.node.addEventListener('mousedown', handleMouseDown, false);
            this.paper.node.addEventListener('mousemove', handleMouseMove, false);
            this.paper.node.addEventListener('mouseup', handleMouseUp, false);
        }
    },
    // Offset for Draw SVG -  Fix dragtable
    getOffset: function() {
        var offset = {
            top: parseFloat(this.paper.node.getAttribute('offsetTop')),
            left: parseFloat(this.paper.node.getAttribute('offsetLeft')),
            width: parseFloat(this.paper.node.getAttribute('width')),
            height: parseFloat(this.paper.node.getAttribute('height'))
        };

        var rect = this.paper.node.getBoundingClientRect();
        if(isNaN(offset.top) || !offset.top) {
            offset.top = rect.top;
        }
        if(isNaN(offset.left) || !offset.left) {
            offset.left = rect.left;
        }
        if(isNaN(offset.width) || !offset.width) {
            offset.width = rect.width;
        }
        if(isNaN(offset.height) || !offset.height) {
            offset.height = rect.left;
        }

        return offset;
    },
    // Position mouse on Draw Panel
    getPosition: function() {
        var pos = {x: 0, y: 0};
        var offset = this.getOffset();

        if(IS_TOUCH) {
            pos = {
                x: window.event.changedTouches[0].pageX - offset.left,
                y: window.event.changedTouches[0].pageY - offset.top
            };
        } else {
            pos = {
                x: eGetPosition().pageX - offset.left,
                y: eGetPosition().pageY - offset.top
            };
        }

        // Zoom fixed
        var pan = this.getCurrentPosition();
        pos.x = pos.x * this.scale + pan.x;
        pos.y = pos.y * this.scale + pan.y;

        return pos;
    },
    // Mouse in Draw Panel
    isInside: function() {
        var pos = utils.getPosition();
        var offset = this.getOffset();
        if((offset.left <= pos.x && pos.x <= offset.left + offset.width) && (offset.top <= pos.y && pos.y <= offset.top + offset.height)) {
            return true;
        }
        return false;
    },
    appendChild: function(nodeElement) {
        this.rootNode.node.appendChild(nodeElement);

        return nodeElement;
    },
    appendBackdrop: function(nodeElement) {
        this.backdrop.node.appendChild(nodeElement);

        return nodeElement;
    },
    add: function(node) {
        this.rootNode.add(node);
    },
    group: function() {
        var g = this.paper.g();
        this.rootNode.add(g);
        return g;
    },
    rect: function(x, y, width, height) {
        var rect = this.paper.rect(x, y, width, height);
        this.rootNode.add(rect);
        return rect;
    },
    circle: function(x, y, r) {
        var circle = this.paper.circle(x, y, r);
        this.rootNode.add(circle);
        return circle;
    },
    ellipse: function(x, y, rx, ry) {
        var ellipse = this.paper.ellipse(x, y, rx, ry);
        this.rootNode.add(ellipse);
        return ellipse;
    },
    polygon: function(points) {
        var polygon = this.paper.polygon(points);
        this.rootNode.add(polygon);
        return polygon;
    },
    path: function(pathString) {
        var path = this.paper.path(pathString);
        this.rootNode.add(path);
        return path;
    },
    image: function(url, x, y, width, height) {
        var image = this.paper.image(url, x, y, width, height);
        this.rootNode.add(image);
        return image;
    },
    text: function(x, y, text) {
        var t = this.paper.text(x, y, text);
        this.rootNode.add(t);
        return t;
    },
    connection: function(start, end, info) {
        var conn = false;
        if(!end && !info) {
            conn = start;
            this.paper.connection(conn);
        } else {
            conn = this.paper.connection(start, end, info);
            if(!!conn) {
                this.behindNode.attr({
                    id: 'svg-system-group-path',
                    classes: 'svg-system-group-path'
                });
                this.behindNode.add(conn.line1, conn.line2, conn.mask);

                if(!!conn.lineStart) {
                    this.behindNode.add(conn.lineStart.line1, conn.lineStart.line2, conn.lineStart.mask);
                }

                if(!!conn.lineEnd) {
                    this.behindNode.add(conn.lineEnd.line1, conn.lineEnd.line2, conn.lineEnd.mask);
                }
            }
        }
        return conn;
    },
    /**
     * zoom element to a certain zoom factor
     * zoomTo(1, 1000);
     * zoomTo(1);
     */
    zoomTo: function(zoom, translate, interval, ease, callback) {
        if(zoom < 0 || typeof zoom !== 'number') {
            console.error('zoomTo(arg) should be a number and greater than 0');
            return;
        }

        translate = translate || {x: 0, y: 0};

        if(typeof interval !== 'number') {
            interval = 100;
        }

        var _self = this,
            _root = this.rootNode;

        _self.currMatrix = new Snap.Matrix().scale(zoom).translate(translate.x, translate.y);
        _self.scale = 1 / zoom;
        // animate our element and call the callback afterwards
        _root.animate({transform: _self.currMatrix}, interval, ease || null, function() {
            if(callback) {
                callback(_root);
            }
        });
    },
    /**
     * move the element to a certain position
     * panTo(0, 0); // original location
     * panTo('+10', 0); // move right
     */
    panTo: function(x, y, interval, ease, cb) {
        // Detect is +1 -1 or 1
        // increase decrease or just number
        function increaseDecreaseOrNumber(defaultValue, input) {
            if(input === undefined) {
                return parseInt(defaultValue);
            } else if(input[0] == '+') {
                return defaultValue + parseInt(input.split('+')[1]);
            } else if(input[0] == '-') {
                return defaultValue - parseInt(input.split('-')[1]);
            } else {
                return parseInt(input);
            }
        }

        // get a reference to the current element
        var self = this.rootNode;

        var gMatrix = self.node.getCTM(),
            matrixX = increaseDecreaseOrNumber(gMatrix.e, x),
            matrixY = increaseDecreaseOrNumber(gMatrix.f, y),
            matrixString = "matrix(" + gMatrix.a + "," + gMatrix.b + "," + gMatrix.c + "," + gMatrix.d + "," + matrixX + "," + matrixY + ")";

        // load <g> transform matrix
        self.animate({transform: matrixString}, interval || 10, ease || null, function() {
            if(cb) {
                cb(null, self);
            }
        });
    },
    // Zoom By Step
    zoom: function() {
        var dentalX = (this.currMatrix.e - this.width / 2 * (1 - this.currZoom)) / this.currZoom;
        var dentalY = (this.currMatrix.f - this.height / 2 * (1 - this.currZoom)) / this.currZoom;
        var currZoom = this.currZoom;

        if(PL.keyCode == 16) { // Zoom Out
            this.currZoom -= this.zpdOptions.zoomStep;
        } else { // Zoom In
            this.currZoom += this.zpdOptions.zoomStep;
        }
        this.currZoom = parseFloat(this.currZoom.toFixed(2));

        var dx = this.width / 2 * (1 - this.currZoom) / this.currZoom + dentalX,
            dy = this.height / 2 * (1 - this.currZoom) / this.currZoom + dentalY;

        if(this.currZoom === this.minZoom - this.zpdOptions.zoomStep || this.maxZoom + this.zpdOptions.zoomStep === this.currZoom) {
            console.error(this.minZoom + ' <= zoomTo <= ' + this.maxZoom);
            this.currZoom = currZoom;
        } else if(this.currZoom < this.minZoom || this.maxZoom < this.currZoom) {
            console.error(this.minZoom + ' <= zoomTo <= ' + this.maxZoom);
            this.zoomDefault();
        } else {
            this.zoomTo(this.currZoom, {x: dx, y: dy});
        }
    },
    // Zoom By Param
    zoomBy: function(currZoom) {
        var dentalX = (this.currMatrix.e - this.width / 2 * (1 - this.currZoom)) / this.currZoom;
        var dentalY = (this.currMatrix.f - this.height / 2 * (1 - this.currZoom)) / this.currZoom;

        this.currZoom = currZoom;

        var dx = this.width / 2 * (1 - this.currZoom) / this.currZoom + dentalX,
            dy = this.height / 2 * (1 - this.currZoom) / this.currZoom + dentalY;

        this.zoomTo(this.currZoom, {x: dx, y: dy});
    },
    zoomByRoot: function(currZoom) {
        this.currZoom = currZoom;
        this.zoomTo(this.currZoom, {x: 0, y: 0});
    },
    // Zoom to fit
    zoomFit: function(bbox) {
        var x = bbox.x - 10,
            y = bbox.y - 10,
            width = bbox.width + 20,
            height = bbox.height + 20,
            zW = this.width / width,
            zH = this.height / height;

        if(zW < zH) {
            this.currZoom = zW;
        } else {
            this.currZoom = zH;
        }

        this.zoomTo(this.currZoom, {x: -x, y: -y});
    },
    zoomDefault: function(callback) {
        this.currZoom = 1;
        this.zoomTo(this.currZoom, undefined, undefined, undefined, callback);
    },
    scaleViewPort: function(scaleX, scaleY) {
        this.rootNode.transform(new Snap.matrix().scale(scaleX, scaleY));
    },
    // Get position for mouseover
    getCurrentPosition: function() {
        this.currPos.x = -this.currMatrix.e * this.scale;
        this.currPos.y = -this.currMatrix.f * this.scale;

        return this.currPos;
    },
    // Verifying the parent - check current panel
    verify: function(item) {
        if(item.paper && item.paper.node.id === this.svgName) {
            return true;
        } else {
            return false;
        }
    },
    // fn select item
    isSelectedItem: function(item) {
        for(var i = 0; i < this.info.mSelectedItems.count; i++) {
            if(this.info.mSelectedItems.item(i) === item) {
                return true;
            }
        }
        return false;
    },
    // deselect items in array selecteditems
    deSelectedItems: function() {
        this.info.mSelectedItems.forEach(function(item) {
            item.selectChange(false);
        });
        this.info.mSelectedItems = new Collection();
    },
    // deselect item in list selected items
    deSelectedItem: function(ele) {
        var that = this;
        this.info.mSelectedItems.forEach(function(item) {
            if(item === ele) {
                item.selectChange(false);
                that.info.mSelectedItems.remove(item);
            }
        });
        if(this.info.mSelectedItems.count === 0) {
            this.info.mSelectedItems = new Collection();
        }
    },
    createText: function(options) {
        if(options.text.trim() !== "") {
            var text = new Text(options.x, options.y, options.text);
            this.info.mText.add(text, true);
            var item = this.drawText(text);
            this.info.mObjectText.add(item);

            // Add stack list
            STACK_LIST.addStack(this.info.currentTagName, this.info.panel.name, STACK_TYPES.SVG, STACK_METHODS.CREATE, item);

            // Off input
            this.turnOnTextBoxToAddText(false);

            // Reset input value
            this.input.value = "";

            return item;
        }
        return false;
    },
    // fn draw text
    drawText: function(object, label) {
        if(label == undefined) {
            label = false;
        } else {
            label = true;
        }

        var text = this.text(object.x, object.y, object.text).attr({
            'font-size': object.fontSize,
            'text-anchor': 'middle',
            stroke: 'none',
            fill: '#000000',
            cursor: 'pointer'
        });

        if(!label) {
            text.id = object.id;
            text.info = object;
            text.objType = OBJECTS.TEXT;
            text.angle = 0;
            text.selectChange = function(flag) {
                if(flag) {
                    this.attr({stroke: '#B8C8E6', 'stroke-opacity': .5});
                } else {
                    this.attr({stroke: 'none'});
                }
            };
            if(!IS_TOUCH) {
                text.hover(this.fIn, this.fOut);
            }
            text.drag(this.onMove, this.onStart, this.onEnd);
        }

        return text;
    },
    // fn remove text
    removeText: function(item) {
        this.info.mText.remove(item);
        for(var i = 0; i < this.info.mObjectText.count; i++) {
            if(this.info.mObjectText.item(i) === item) {
                this.info.mObjectText.remove(item);
                item.remove();
                break;
            }
        }
    },
    contain: function(shape, item) {
        function contain(shape, item) {
            var outSite = shape.getBBox();
            var inSite = item.getBBox();
            if(outSite.x < inSite.x && inSite.x + inSite.width < outSite.x + outSite.width &&
                outSite.y < inSite.y && inSite.y + inSite.height < outSite.y + outSite.height) {
                return true;
            }
            return false;
        }

        shape.matrix = shape.matrix || shape.node.getCTM();
        item.matrix = item.matrix || item.node.getCTM();
        if((shape.type == 'ellipse' || shape.type == 'circle' || shape.type == 'rect' || shape.type == "path" || shape.type == "polygon") &&
            (shape.matrix.a == 1 && shape.matrix.b == 0 && shape.matrix.c == 0 && shape.matrix.d == 1) &&
            (item.type == 'ellipse' || item.type == 'circle' || item.type == 'rect' || item.type == "path" || item.type == "polygon") &&
            (item.matrix.a == 1 && item.matrix.b == 0 && item.matrix.c == 0 && item.matrix.d == 1)) {
            var path1, path2, bb1 = shape.getBBox(), bb2 = item.getBBox(), ma1 = shape.matrix, ma2 = item.matrix;
            if(shape.type == 'ellipse') {
                path1 = utils.ellipseToPath(parseFloat(shape.attr('cx')) + ma1.e, parseFloat(shape.attr('cy')) + ma1.f, parseFloat(shape.attr('rx')), parseFloat(shape.attr('ry')));
            } else if(shape.type == 'circle') {
                path1 = utils.circleToPath(parseFloat(shape.attr('cx')) + ma1.e, parseFloat(shape.attr('cy')) + ma1.f, parseFloat(shape.attr('r')));
            } else if(shape.type == 'rect') {
                path1 = utils.rectToPath(bb1.x, bb1.y, bb1.x2, bb1.y2);
            } else if(shape.type == 'path') {
                path1 = Snap.parsePathString(shape.attr('path'));
                for(var i = 0; i < path1.length - 1; i++) {
                    path1[i][1] += ma1.e;
                    path1[i][2] += ma1.f;
                }
                path1 = path1.toString();
            } else if(shape.type == 'polygon') {
                path1 = Snap.parsePathString('M' + shape.attr('points').toString() + 'Z');
                for(var i = 0; i < path1.length - 1; i++) {
                    path1[i][1] += ma1.e;
                    path1[i][2] += ma1.f;
                }
                path1 = path1.toString();
            }
            if(item.type == 'ellipse') {
                path2 = utils.ellipseToPath(parseFloat(item.attr('cx')) + ma2.e, parseFloat(item.attr('cy')) + ma2.f, parseFloat(item.attr('rx')), parseFloat(item.attr('ry')));
            } else if(item.type == 'circle') {
                path2 = utils.circleToPath(parseFloat(item.attr('cx')) + ma2.e, parseFloat(item.attr('cy')) + ma2.f, parseFloat(item.attr('r')));
            } else if(item.type == 'rect') {
                path2 = utils.rectToPath(bb2.x, bb2.y, bb2.x2, bb2.y2);
            } else if(item.type == 'path') {
                path2 = Snap.parsePathString(item.attr('path'));
                for(var i = 0; i < path2.length - 1; i++) {
                    path2[i][1] += ma1.e;
                    path2[i][2] += ma1.f;
                }
                path2 = path2.toString();
            } else if(item.type == 'polygon') {
                path2 = Snap.parsePathString('M' + item.attr('points').toString() + 'Z');
                for(var i = 0; i < path2.length - 1; i++) {
                    path2[i][1] += ma1.e;
                    path2[i][2] += ma1.f;
                }
                path2 = path2.toString();
            }

            if(Snap.path.isPointInside(path1, bb2.cx, bb2.cy) && Snap.path.intersection(path1, path2).length == 0) {
                return true;
            }
            return false;
        } else {
            return contain(shape, item);
        }
    },
    // Resize
    setSize: function(width, height, zoomDefault, callback) {
        var isDefault = (zoomDefault !== false);
        this.width = width;
        this.height = height;
        var currZoom = this.panZoom.getCurrentZoom(),
            curPos = this.panZoom.getCurrentPosition(),
            newWidth = this.width * (1 - (currZoom * this.configs.zoomStep)),
            newHeight = this.height * (1 - (currZoom * this.configs.zoomStep));
        this.paper.width = this.width;
        this.paper.height = this.height;
        this.paper.attr({
            width: this.width,
            height: this.height,
            viewBox: curPos.x + " " + curPos.y + " " + newWidth + " " + newHeight
        });

        // Reset zoom
        if(isDefault) {
            this.zoomDefault(callback);
        } else {
            if(callback) callback();
        }
    },
    setSizeViewPort: function(width, height, zoomDefault, callback) {
        this.setSize(width, height, zoomDefault, callback);
    },
    // Scale By Zoom Default
    setScaleViewPort: function(scaleX, scaleY) {
        var _self = this;
        _self.zoomDefault(function() {
            _self.scaleViewPort(scaleX, scaleY);
        });
    },
    // Showing
    setShowing: function(showing) {
        this.rootNode.attr('opacity', showing ? 1 : 0);
    },

    //--- panZoom library ---//
    // fn zoom
    zoomViewPort: function(pos) {
        if(PL.keyCode == 16) {
            this.panZoom.zoomOut(this.configs.zoomStep, pos);
        } else {
            this.panZoom.zoomIn(this.configs.zoomStep, pos);
        }
        this.scale = (1 - (this.panZoom.getCurrentZoom() * this.configs.zoomStep));
    },
    zoomToFit: function() {
        this.panZoom.enable();
        this.panZoom.zoomOut(this.panZoom.getCurrentZoom());
        this.scale = (1 - (this.panZoom.getCurrentZoom() * this.configs.zoomStep));
        this.panZoom.disable();
    },
    //--- End panZoom ---//

    // fn turn on textbox for input text to add text
    turnOnTextBoxToAddText: function(turnOn) {
        if(turnOn) {
            this.input.style.display = 'block';
            this.input.x = this.mMouse.position.x;
            this.input.y = this.mMouse.position.y;
            var pan = this.getCurrentPosition();
            if((this.mMouse.position.x - pan.x) / this.scale < 100) {
                this.input.style.left = '0px';
            } else {
                this.input.style.left = (this.mMouse.position.x - pan.x) / this.scale - 100 + 'px';
            }
            if((this.mMouse.position.y - pan.y) / this.scale < 20) {
                this.input.style.top = "0px";
            } else {
                this.input.style.top = (this.mMouse.position.y - pan.y) / this.scale - 20 + 'px';
            }
            this.input.focus();
        } else {
            this.input.style.display = 'none';
        }
        // Set value
        this.input.width = 200;
        this.input.height = 40;
        this.input.style.fontSize = 20 + "px";
        this.input.style.width = 200 + "px";
        this.input.style.height = 40 + "px";
    },

    /**
     * Calculate available size of all items
     * @param mObjects
     * @param availableSize
     * @param pipeGroup - Zoom fit should include pipe extents
     * @returns {*|{x: number, y: number, x2: number, y2: number, cx: number, cy: number, width: number, height: number}}
     */
    calculateFitSize: function(mObjects, availableSize, pipeGroup) {
        availableSize = availableSize || {x: 0, y: 0, x2: 0, y2: 0, cx: 0, cy: 0, width: 0, height: 0};
        if(mObjects.count > 0) {
            // Set x2, y2
            for(var i = 0; i < mObjects.count; i++) {
                mObjects.item(i).x2 = mObjects.item(i).x + mObjects.item(i).width;
                mObjects.item(i).y2 = mObjects.item(i).y + mObjects.item(i).height;
            }

            var min = mObjects.sort('x').item(0),
                max = mObjects.sort('x2').item(mObjects.count - 1);
            availableSize.x = min.x;
            availableSize.x2 = max.x + max.width;
            availableSize.width = max.x + max.width - min.x;
            availableSize.cx = min.x + availableSize.width / 2;

            var min = mObjects.sort('y').item(0),
                max = mObjects.sort('y2').item(mObjects.count - 1);
            availableSize.y = min.y;
            availableSize.y2 = max.y + max.height;
            availableSize.height = max.y + max.height - min.y;
            availableSize.cy = min.y + availableSize.height / 2;
        }

        if(!!pipeGroup) {
            var bb = pipeGroup.getBBox();
            if(bb.width > 0 && bb.height > 0) {
                if(bb.x < availableSize.x) availableSize.x = bb.x;
                if(bb.y < availableSize.y) availableSize.y = bb.y;
                if(bb.x2 > availableSize.x2)  availableSize.x2 = bb.x2;
                if(bb.y2 > availableSize.y2)  availableSize.y2 = bb.y2;

                availableSize.width = availableSize.x2 - availableSize.x;
                availableSize.height = availableSize.y2 - availableSize.y;
                availableSize.cx = (availableSize.x + availableSize.x2) / 2;
                availableSize.cy = (availableSize.y + availableSize.y2) / 2;
            }
        }

        return availableSize;
    }
});

},{'../../common/services/utils.js':'src/common/services/utils','../../common/services/stack.js':'src/common/services/stack'}],'src/views/progress/site/graphic':[function (module,exports,global,require,request){
//

var Signals = require('enyo/Signals');

var Graphic = require('../../../common/services/graphic.js');
var utils = require('../../../common/services/utils.js');

var STACK_LIST = require('../../../common/services/stack.js').STACK_LIST;
var STACK_TYPES = require('../../../common/services/stack.js').STACK_TYPES;
var STACK_METHODS = require('../../../common/services/stack.js').STACK_METHODS;

var IS_TOUCH = require('enyo/platform').touch;

var siteGraphic = module.exports = {
    configs: {
        opacity: 0.6,
        zoomStep: 0.1,
        edge: 40,
        angle: 15 // (degree) For polygon - All angles greater than 15 degrees
    },
    panel: null,
    width: 0,
    height: 0,
    isDrawArea: false,
    drawing: false,
    currentTagName: null,
    availableDraw: {
        color: "#ffffff",
        floorId: -1000,
        zoneId: -1000
    },
    selectedArea: {
        shape: undefined,
        areaNormal: {fill: 'none', stroke: 'none'},
        areaSelect: {fill: '#9CFFFD', 'fill-opacity': 0.1, stroke: '#389CFF'},
        stroke: '#389CFF',
        strokeWidth: 1
    },
    mAttributes: {
        fill: '#ffffff',
        stroke: '#ffffff',
        'stroke-width': 0.001,
        'fill-opacity': 0.5
    },
    floors: {},
    queues: [],
    init: function(info, svg, input, width, height) {
        this.currentTagName = svg.getId();
        this.width = width;
        this.height = height;
        // Init available
        this.floors[this.currentTagName] = {
            info: info,
            currentTagName: this.currentTagName,
            panel: this.panel,
            image: undefined,
            currentSensor: undefined,
            stackList: new Array(),
            currentStack: -1,
            mText: new Collection(),
            mObjectText: new Collection(),
            mSensors: new Collection(),
            mShapes: new Collection(),
            mObjectShapes: new Collection(),
            mSelectedItems: new Collection()
        };
        var floor = this.floors[this.currentTagName];
        floor.g = new Graphic(
            svg.getId(),
            input.getId(),
            floor,
            this.width,
            this.height,
            this.configs,
            this.onMouseDown,
            this.onMouseMove,
            this.onMouseUp,
            this.onStart,
            this.onMove,
            this.onEnd,
            this.fIn,
            this.fOut
        );
        // Add highlight
        floor.g.appendChild(utils.makeHighlight(this.currentTagName + '_hlSensor'));
        floor.g.appendChild(utils.makeHighlight(this.currentTagName + '_hlShape', '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0'));
        // Add group
        floor.bgGroup = floor.g.group().attr({id: this.currentTagName + '_bgGroup'});
        floor.shapeGroup = floor.g.group().attr({id: this.currentTagName + '_shapeGroup'});
        floor.shapeGroup.length = 0;
        floor.sensorGroup = floor.g.group().attr({id: this.currentTagName + '_sensorGroup'});
        floor.sensorGroup.length = 0;
        floor.textGroup = floor.g.group().attr({id: this.currentTagName + '_textGroup'});
        floor.textGroup.length = 0;
        floor.edgeGroup = floor.g.group();
        // Background
        this.setBackground(floor.image);

        // Backdrop Blue-Grey-Drawing
        floor.g.appendBackdrop(utils.makeSVG('defs', undefined, '' +
            '<pattern id="' + this.currentTagName + '_blueStripe" patternUnits="userSpaceOnUse" x="0" y="0" width="25" height="25" viewBox="0 0 16 16">' +
                //'<pattern id="' + this.currentTagName + '_grayStripe" patternUnits="userSpaceOnUse" x="0" y="0" width="8" height="8" viewBox="0 0 16 16">' +
            '   <rect width="100%" height="100%" fill="#D8E2ED"/>' +
            '   <path d="M1,1h16v16h-16v-16" fill-opacity="0" stroke-width=".5" stroke-dasharray="1,1" stroke="#446F9C"/>' +
            '</pattern>' +
            '<pattern id="' + this.currentTagName + '_greyStripe" patternUnits="userSpaceOnUse" x="0" y="0" width="25" height="25" viewBox="0 0 16 16">' +
            '   <rect width="100%" height="100%" fill="#dce3e4"/>' +
            '   <path d="M1,1h16v16h-16v-16" fill-opacity="0" stroke-width="0.5" stroke-dasharray="1,1" stroke="#bbc5c9"/>' +
            '</pattern>'
        ));
        floor.g.appendBackdrop(utils.makeSVG('rect', {
            width: '100%',
            height: '100%',
            fill: 'url(#' + this.currentTagName + '_blueStripe)',
            class: 'blue-stripe'
        }));
        floor.g.appendBackdrop(utils.makeSVG('rect', {
            width: '100%',
            height: '100%',
            fill: 'url(#' + this.currentTagName + '_greyStripe)',
            class: 'grey-stripe'
        }));
    },
    onMouseDown: function(e) {
        var _self = siteGraphic;
        if(_self.drawing !== true) return;
        var floor = _self.floors[_self.currentTagName];
        floor.g.mMouse.start = floor.g.getPosition();
        if(!_self.currentItem && toolIcons.isSelector) {
            _self.isDrawArea = true;
            if(PL.keyCode != 16 && PL.keyCode != 17) { // shift or ctrl key
                floor.g.deSelectedItems();
            }
        } else {
            _self.isDrawArea = false;
        }
        // Set variables
        GB.isStart = true;
        floor.g.turnOnTextBoxToAddText(false);
    },
    // fn draw shape mouse move
    onMouseMove: function(e) {
        var _self = siteGraphic;
        if(_self.drawing !== true) return;
        var floor = _self.floors[_self.currentTagName];
        floor.g.mMouse.position = floor.g.getPosition();
        var x = floor.g.mMouse.start.x > floor.g.mMouse.position.x ? floor.g.mMouse.position.x : floor.g.mMouse.start.x,
            y = floor.g.mMouse.start.y > floor.g.mMouse.position.y ? floor.g.mMouse.position.y : floor.g.mMouse.start.y,
            w = Math.abs(floor.g.mMouse.start.x - floor.g.mMouse.position.x),
            h = Math.abs(floor.g.mMouse.start.y - floor.g.mMouse.position.y);
        if(_self.isDrawArea) {
            // draw multi select element area
            if(_self.selectedArea.shape === undefined) {
                _self.selectedArea.shape = floor.g.rect(x, y, w, h).attr(_self.selectedArea.areaSelect);
            } else {
                _self.selectedArea.shape.attr({x: x, y: y, width: w, height: h}).attr(_self.selectedArea.areaSelect);
            }
        } else {
            if(toolIcons.isAddRectangle && GB.isStart) {
                if(_self.selectedArea.shape === undefined) {
                    _self.selectedArea.shape = floor.g.rect(x, y, w, h).attr(_self.selectedArea.areaSelect);
                } else {
                    _self.selectedArea.shape.attr({
                        x: x,
                        y: y,
                        width: w,
                        height: h
                    }).attr(_self.selectedArea.areaSelect);
                }
            } else if(toolIcons.isAddCircle && GB.isStart) {
                if(_self.selectedArea.shape === undefined) {
                    _self.selectedArea.shape = floor.g.ellipse(x + w / 2, y + h / 2, w / 2, h / 2).attr(_self.selectedArea.areaSelect);
                } else {
                    _self.selectedArea.shape.attr({
                        cx: x + w / 2,
                        cy: y + h / 2,
                        rx: w / 2,
                        ry: h / 2
                    }).attr(_self.selectedArea.areaSelect);
                }
            }
        }
    },
    // fn draw shape mouse up
    onMouseUp: function(e) {
        var _self = siteGraphic;
        if(_self.drawing !== true) return;
        var floor = _self.floors[_self.currentTagName];
        floor.g.mMouse.position = floor.g.getPosition();
        if(toolIcons.isSelector) {
            if(_self.selectedArea.shape !== undefined) { // Shape select
                floor.mObjectShapes.forEach(function(item) {
                    if(PL.keyCode == 17) {
                        if(floor.g.contain(_self.selectedArea.shape, item)) {
                            if(floor.g.isSelectedItem(item)) {
                                floor.g.deSelectedItem(item);
                                item.selectChange(false);
                            } else {
                                floor.mSelectedItems.add(item);
                                item.selectChange(true);
                            }
                        }
                    } else {
                        if(floor.g.contain(_self.selectedArea.shape, item)) {
                            if(!floor.g.isSelectedItem(item)) {
                                floor.mSelectedItems.add(item);
                                item.selectChange(true);
                            }
                        }
                    }
                });
                // Add text
                floor.mObjectText.forEach(function(item) {
                    if(PL.keyCode == 17) {
                        if(floor.g.contain(_self.selectedArea.shape, item)) {
                            if(floor.g.isSelectedItem(item)) {
                                floor.g.deSelectedItem(item);
                                item.selectChange(false);
                            } else {
                                floor.mSelectedItems.add(item);
                                item.selectChange(true);
                            }
                        }
                    } else {
                        if(floor.g.contain(_self.selectedArea.shape, item)) {
                            if(!floor.g.isSelectedItem(item)) {
                                floor.mSelectedItems.add(item);
                                item.selectChange(true);
                            }
                        }
                    }
                });
                _self.selectedArea.shape.remove();
                _self.selectedArea.shape = undefined;
            }
        } else {
            if(toolIcons.isAddRectangle || toolIcons.isAddCircle) {
                var type = SHAPE_TYPES.RECTANGLE;
                if(toolIcons.isAddRectangle) {
                    type = SHAPE_TYPES.RECTANGLE;
                } else if(toolIcons.isAddCircle) {
                    type = SHAPE_TYPES.CIRCLE;
                }

                if(_self.selectedArea.shape) {
                    var bb = _self.selectedArea.shape.getBBox();
                    _self.createShape({
                        type: type,
                        x: bb.x,
                        y: bb.y,
                        w: bb.width,
                        h: bb.height
                    });
                }
                if(_self.selectedArea.shape !== undefined) {
                    _self.selectedArea.shape.remove();
                    _self.selectedArea.shape = undefined;
                }
            } else if(toolIcons.isAddPolyline) {
                var isFinish = false;
                if(GB.points.length >= 3) { // Check create polygon
                    var nodeRoot = GB.points[0];
                    if((nodeRoot.x - 10 < floor.g.mMouse.position.x && floor.g.mMouse.position.x < nodeRoot.x + 10) &&
                        (nodeRoot.y - 10 < floor.g.mMouse.position.y && floor.g.mMouse.position.y < nodeRoot.y + 10)) {
                        _self.createPolygon();
                        isFinish = true;
                    }
                }
                if(!isFinish) {
                    GB.points.push({x: floor.g.mMouse.position.x, y: floor.g.mMouse.position.y});
                    if(_self.selectedArea.shape === undefined) {
                        _self.selectedArea.shape = floor.g.path(utils.getPoints(GB.points)).attr({
                            stroke: _self.selectedArea.stroke,
                            'stroke-width': _self.selectedArea.strokeWidth,
                            fill: "none"
                        });
                    } else {
                        _self.selectedArea.shape.attr({path: utils.getPoints(GB.points)});
                    }
                }
            } else if(toolIcons.isAddText) {
                // Add Text and Off textBox
                var input = floor.g.input;
                if(!!input) {
                    if(input.value.trim() != "") {
                        floor.g.createText({x: input.x, y: input.y, text: input.value});
                    }
                }
                // Edit Text
                if(!!_self.currentItem) {
                    if(_self.currentItem.objType == OBJECTS.TEXT) {
                        var pan = floor.g.getCurrentPosition();

                        var left = (parseFloat(_self.currentItem.attr('x')) - pan.x) / floor.g.scale - parseInt(input.getAttribute('width')) / 2;
                        var top = (parseFloat(_self.currentItem.attr('y')) - pan.y) / floor.g.scale - parseInt(input.getAttribute('height')) / 2;

                        input.x = parseFloat(_self.currentItem.attr('x'));
                        input.y = parseFloat(_self.currentItem.attr('y'));

                        input.style.left = left + 'px';
                        input.style.top = top + 'px';
                        input.style.display = 'block';
                        input.value = _self.currentItem.attr('text');
                        input.focus();

                        floor.g.removeText(_self.currentItem);
                        floor.textGroup.length--;
                        _self.currentItem = undefined;
                    } else {
                        floor.g.turnOnTextBoxToAddText(true);
                    }
                } else {
                    floor.g.turnOnTextBoxToAddText(true);
                }
            }
        }
        // Reset variables
        GB.isStart = false;
        _self.isDrawArea = false;
    },
    // fn fin
    fIn: function(e) {
        if(siteGraphic.drawing !== true) return;
        siteGraphic.currentItem = this;
    },
    // fn fout
    fOut: function() {
        if(siteGraphic.drawing !== true) return;
        siteGraphic.currentItem = undefined;
    },
    // fn onstart
    onStart: function(x, y) {
        var _self = siteGraphic,
            floor = _self.floors[_self.currentTagName];
        if(!floor.g || (floor.g && !floor.g.verify(this))) {
            return false;
        }
        if(_self.drawing !== true) {
            return false;
        }

        // Check key holding
        if(PL.keyCode == 16 || PL.keyCode == 17) { // shift key or ctrl key
            floor.g.deSelectedItems();
            floor.mSelectedItems.add(this);
            this.selectChange(true);
        }

        if(IS_TOUCH) {
            var offset = floor.g.getOffset();
            floor.g.mMouse.position = {
                x: x - offset.left,
                y: y - offset.top
            };
        }

        if(toolIcons.isSelector) {
            if(this.objType === OBJECTS.TEXT || this.objType === OBJECTS.SHAPE) {
                if(PL.keyCode == 16 || PL.keyCode == 17) { // shift key or ctrl key
                    if(!floor.g.isSelectedItem(this)) {
                        floor.mSelectedItems.add(this);
                        this.selectChange(true);
                    } else if(PL.keyCode == 17) {
                        floor.g.deSelectedItem(this);
                        this.selectChange(false);
                    }
                } else {
                    floor.g.deSelectedItems();
                    floor.mSelectedItems.add(this);
                    this.selectChange(true);
                }
            } else if(this.objType === OBJECTS.SENSOR) {
                _self.deSelectedSensor();
                this.selectChange(true);
                floor.currentSensor = this;
                floor.g.deSelectedItems();
            } else if(this.objType === OBJECTS.EDGE) {
                // Backup parent size
                this.parentBBox = this.parentShape.getBBox();
                // For ellipse
                this.parentBBox.rx = parseFloat(this.parentShape.attr('rx'));
                this.parentBBox.ry = parseFloat(this.parentShape.attr('ry'));
                // For polygon
                if(this.parentShape.type == SHAPE_TYPES.POLYGON) {
                    this.parentBBox.points = this.parentShape.attr('points').join(' ');
                }
            }
        } else {
            floor.g.deSelectedItems();
            _self.deSelectedSensor();
        }

        // Set variables
        this.dx = 0;
        this.dy = 0;
        _self.currentItem = this;
    },
    // fn onmove
    onMove: function(dx, dy) {
        var _self = siteGraphic,
            floor = _self.floors[_self.currentTagName];

        if(!floor.g || (floor.g && !floor.g.verify(this))) {
            return false;
        }

        if(_self.drawing !== true) {
            return false;
        }

        dx = dx * floor.g.scale;
        dy = dy * floor.g.scale;

        if(toolIcons.isSelector) {
            if(this.objType === OBJECTS.TEXT || this.objType === OBJECTS.SHAPE) {
                floor.mSelectedItems.forEach(function(item) {
                    item.transform('R0T' + dx + ',' + dy);
                    if(item.objType === OBJECTS.SHAPE) {
                        item.mObjectSensors.forEach(function(sensor) {
                            sensor.transform('R0T' + dx + ',' + dy);
                            var bb = sensor.getBBox();
                            sensor.pathColor.transform('R0T' + bb.x + ',' + bb.y);
                        });
                    }
                });
            } else if(this.objType === OBJECTS.SENSOR) {
                this.transform('R0T' + dx + ',' + dy);
                var bb = this.getBBox();
                this.pathColor.transform('R0T' + bb.x + ',' + bb.y);
            } else if(this.objType === OBJECTS.EDGE) {
                // Parent shape has selected
                if(floor.mSelectedItems.collection.indexOf(this.parentShape) > -1) {
                    this.resized = true;
                    _self.setTransformForEdge(this, dx, dy);
                } else {
                    this.resized = false;
                }
            }
        }

        // Set variables
        this.dx = dx;
        this.dy = dy;
    },
    // fn onend
    onEnd: function(e) {
        var _self = siteGraphic,
            floor = _self.floors[_self.currentTagName];
        if(!floor.g || (floor.g && !floor.g.verify(this))) {
            return false;
        }
        if(_self.drawing !== true) {
            return false;
        }

        var dx = this.dx;
        var dy = this.dy;

        if(toolIcons.isSelector && (dx != 0 || dy != 0)) {
            if(this.objType === OBJECTS.TEXT || this.objType === OBJECTS.SHAPE) {
                floor.mSelectedItems.forEach(function(item) {
                    // Add stack list
                    if(_self.setTransform(item, dx, dy)) {
                        STACK_LIST.addStack(_self.currentTagName, _self.panel.name, STACK_TYPES.SVG, STACK_METHODS.MOVE, item, {
                            dx: dx,
                            dy: dy
                        });

                        // Set edge for shape
                        if(item.objType === OBJECTS.SHAPE) {
                            _self.setEdgePosition(item);
                            _self.minSizeForZoneShape(item);
                        }
                    }
                });
            } else if(this.objType === OBJECTS.SENSOR) {
                if(floor.g.contain(this.parentShape, this)) {
                    // Add stack list
                    if(_self.setTransform(this, dx, dy)) {
                        STACK_LIST.addStack(_self.currentTagName, _self.panel.name, STACK_TYPES.SVG, STACK_METHODS.MOVE, this, {
                            dx: dx,
                            dy: dy,
                            parentShape: this.parentShape
                        });

                        _self.minSizeForZoneShape(this.parentShape);
                    }
                } else {
                    var bb = this.getBBox();
                    var shape = _self.getShapeContainer({x: bb.x, y: bb.y, w: bb.width, h: bb.height});
                    if(shape) {
                        // Remove parent
                        var parent = this.parentShape;
                        parent.mObjectSensors.remove(this);
                        _self.isEmptyShape(parent);
                        if(_self.setTransform(this, dx, dy)) {
                            // Set new parent
                            this.parentShape = shape;
                            shape.mObjectSensors.add(this);
                            this.pathColor.attr({
                                fill: utils.changeLuminosityOfHsl(shape.node.getAttribute('fill'), SITE_SETTING.luminosity)
                            });
                            _self.isEmptyShape(shape);

                            // Chang info
                            this.info.floorId = shape.info.floorId;
                            this.info.zoneId = shape.info.zoneId;

                            // Change zone parent for sensor in floor
                            Signals.send("onSiteMenu", {
                                sensorId: this.info.type,
                                from: parent.vals,
                                to: shape.vals,
                                method: STACK_METHODS.MOVE
                            });

                            // Add stack list
                            STACK_LIST.addStack(_self.currentTagName, _self.panel.name, STACK_TYPES.SVG, STACK_METHODS.MOVE, this, {
                                dx: dx,
                                dy: dy,
                                parentShape: parent
                            });

                            // Calculator
                            _self.minSizeForZoneShape(shape);
                            _self.minSizeForZoneShape(parent);
                        }
                    } else {
                        this.transform('R0T0,0');
                        var bb = this.getBBox();
                        this.pathColor.transform('R0T' + bb.x + ',' + bb.y);
                    }
                }
            } else if(this.objType === OBJECTS.EDGE) {
                if(this.resized) {
                    _self.setEdgePosition(this.parentShape);

                    // Add stack list
                    STACK_LIST.addStack(_self.currentTagName, _self.panel.name, STACK_TYPES.SVG, STACK_METHODS.RESIZE, this.parentShape, this.parentBBox);
                }
            }
        }

        // Reset variables
        this.dx = 0;
        this.dy = 0;
        _self.currentItem = undefined;
    },
    // fn get position transform of element after moving
    setTransform: function(item, dx, dy) {
        var _self = siteGraphic,
            bb = item.getBBox(),
            limit = {
                min: {x: bb.x, y: bb.y},
                max: {x: bb.x + bb.width, y: bb.y + bb.height}
            };

        // entities only moving into limited area
        if(!(0 < limit.min.x && 0 < limit.min.y && limit.max.x < _self.width && limit.max.y < _self.height)) {
            item.transform('R0T0,0');
            if(item.objType === OBJECTS.SHAPE) {
                item.mObjectSensors.forEach(function(sensor) {
                    sensor.transform('R0T0,0');
                    var bb = sensor.getBBox();
                    sensor.pathColor.transform('R0T' + bb.x + ',' + bb.y);
                });
            } else if(item.objType === OBJECTS.SENSOR) {
                var bb = item.getBBox();
                item.pathColor.transform('R0T' + bb.x + ',' + bb.y);
            }
            return false;
        } else {
            if(item.objType === OBJECTS.SHAPE) {
                if(item.type === SHAPE_TYPES.ELLIPSE) {
                    item.attr({
                        cx: parseFloat(item.attr('cx')) + dx,
                        cy: parseFloat(item.attr('cy')) + dy
                    });
                } else if(item.type === SHAPE_TYPES.POLYGON) {
                    var path = Snap.parsePathString('M' + item.attr('points').toString() + 'Z'),
                        points = [];
                    for(var i = 0; i < path.length - 1; i++) {
                        points.push(path[i][1] + dx, path[i][2] + dy)
                    }
                    item.attr('points', points);
                } else {
                    item.attr({
                        x: parseFloat(item.attr('x')) + dx,
                        y: parseFloat(item.attr('y')) + dy
                    });
                }
                item.mObjectSensors.forEach(function(sensor) {
                    _self.setTransform(sensor, dx, dy);
                });
                var box = item.getBBox();
                item.info.x = box.x;
                item.info.y = box.y;
                item.info.w = box.width;
                item.info.h = box.height;
                item.transform('R0T0,0');
            } else if(item.objType === OBJECTS.TEXT) {
                item.attr({
                    x: parseFloat(item.attr('x')) + dx,
                    y: parseFloat(item.attr('y')) + dy
                });
                item.transform('R0T0,0');
                item.info.x = parseFloat(item.attr('x'));
                item.info.y = parseFloat(item.attr('y'));
            } else if(item.objType === OBJECTS.SENSOR) {
                item.attr({
                    cx: parseFloat(item.attr('cx')) + dx,
                    cy: parseFloat(item.attr('cy')) + dy
                });
                item.transform('R0T0,0');
                var bb = item.getBBox();
                item.pathColor.transform('R0T' + bb.x + ',' + bb.y);
                item.info.x = bb.x;
                item.info.y = bb.y;
            }
        }
        return true;
    },
    // fn set position of edge and parent shape for moving
    setTransformForEdge: function(edge, dx, dy) {
        var _self = siteGraphic,
            zoneShape = edge.parentShape,
            bb = zoneShape.getBBox(),
            bbEdge = edge.getBBox(),
            dx2 = dx - edge.dx,
            dy2 = dy - edge.dy,
            change = false;

        if(zoneShape.type == SHAPE_TYPES.RECTANGLE) {
            var dtx = bbEdge.x + dx2,
                dty = bbEdge.y + dy2;

            if(edge.edgeType == 'left') {
                if(!!zoneShape.minSize && zoneShape.minSize.x != zoneShape.minSize.x2) {
                    if(bb.x2 - dtx >= _self.configs.edge && dtx < zoneShape.minSize.x) {
                        change = true;
                    }
                } else if(bb.x2 - dtx >= _self.configs.edge) {
                    change = true;
                }

                if(change) {
                    edge.attr('path', 'M' + dtx + ',' + bbEdge.y + 'L' + dtx + ',' + bbEdge.y2);
                    zoneShape.attr({
                        x: parseFloat(zoneShape.attr('x')) + dx2,
                        width: parseFloat(zoneShape.attr('width')) - dx2
                    });
                }
            } else if(edge.edgeType == 'right') {
                if(!!zoneShape.minSize && zoneShape.minSize.x != zoneShape.minSize.x2) {
                    if(dtx - bb.x >= _self.configs.edge && dtx > zoneShape.minSize.x2) {
                        change = true;
                    }
                } else if(dtx - bb.x >= _self.configs.edge) {
                    change = true;
                }

                if(change) {
                    edge.attr('path', 'M' + dtx + ',' + bbEdge.y + 'L' + dtx + ',' + bbEdge.y2);
                    zoneShape.attr({
                        width: parseFloat(zoneShape.attr('width')) + dx2
                    });
                }
            } else if(edge.edgeType == 'top') {
                if(!!zoneShape.minSize && zoneShape.minSize.y != zoneShape.minSize.y2) {
                    if(bb.y2 - dty >= _self.configs.edge && dty < zoneShape.minSize.y) {
                        change = true;
                    }
                } else if(bb.y2 - dty >= _self.configs.edge) {
                    change = true;
                }

                if(change) {
                    edge.attr('path', 'M' + bbEdge.x + ',' + dty + 'L' + bbEdge.x2 + ',' + (bbEdge.y2 + dy2));
                    zoneShape.attr({
                        y: parseFloat(zoneShape.attr('y')) + dy2,
                        height: parseFloat(zoneShape.attr('height')) - dy2
                    });
                }
            } else if(edge.edgeType == 'bottom') {
                if(!!zoneShape.minSize && zoneShape.minSize.y != zoneShape.minSize.y2) {
                    if(dty - bb.y >= _self.configs.edge && dty > zoneShape.minSize.y2) {
                        change = true;
                    }
                } else if(dty - bb.y >= _self.configs.edge) {
                    change = true;
                }

                if(change) {
                    edge.attr('path', 'M' + bbEdge.x + ',' + dty + 'L' + bbEdge.x2 + ',' + (bbEdge.y2 + dy2));
                    zoneShape.attr({
                        height: parseFloat(zoneShape.attr('height')) + dy2
                    });
                }
            }
        } else if(zoneShape.type == SHAPE_TYPES.ELLIPSE) {
            var cx, cy, rx, ry, path;
            if(edge.edgeType == 'topLeft') {
                cx = parseFloat(zoneShape.attr('cx')) + dx2 / 2;
                cy = parseFloat(zoneShape.attr('cy')) + dy2 / 2;
                rx = parseFloat(zoneShape.attr('rx')) - dx2 / 2;
                ry = parseFloat(zoneShape.attr('ry')) - dy2 / 2;
                path = utils.ellipticalArcToPath(cx, cy, rx, ry, 270, 0);
            } else if(edge.edgeType == 'topRight') {
                cx = parseFloat(zoneShape.attr('cx')) + dx2 / 2;
                cy = parseFloat(zoneShape.attr('cy')) + dy2 / 2;
                rx = parseFloat(zoneShape.attr('rx')) + dx2 / 2;
                ry = parseFloat(zoneShape.attr('ry')) - dy2 / 2;
                path = utils.ellipticalArcToPath(cx, cy, rx, ry, 0, 90);
            } else if(edge.edgeType == 'bottomLeft') {
                cx = parseFloat(zoneShape.attr('cx')) + dx2 / 2;
                cy = parseFloat(zoneShape.attr('cy')) + dy2 / 2;
                rx = parseFloat(zoneShape.attr('rx')) - dx2 / 2;
                ry = parseFloat(zoneShape.attr('ry')) + dy2 / 2;
                path = utils.ellipticalArcToPath(cx, cy, rx, ry, 180, 270);
            } else if(edge.edgeType == 'bottomRight') {
                cx = parseFloat(zoneShape.attr('cx')) + dx2 / 2;
                cy = parseFloat(zoneShape.attr('cy')) + dy2 / 2;
                rx = parseFloat(zoneShape.attr('rx')) + dx2 / 2;
                ry = parseFloat(zoneShape.attr('ry')) + dy2 / 2;
                path = utils.ellipticalArcToPath(cx, cy, rx, ry, 90, 180);
            }

            if(!!zoneShape.minSize && zoneShape.minSize.x != zoneShape.minSize.x2 && zoneShape.minSize.y != zoneShape.minSize.y2) {
                var tPath1 = utils.rectToPath(zoneShape.minSize.x, zoneShape.minSize.y, zoneShape.minSize.x2, zoneShape.minSize.y2);
                var tPath2 = utils.ellipseToPath(cx, cy, rx, ry);

                var dots = Snap.path.intersection(tPath1, tPath2);
                if(dots.length == 0) {
                    change = true;
                }
            } else if(rx * 2 >= _self.configs.edge && ry * 2 >= _self.configs.edge) {
                change = true;
            }

            if(change) {
                edge.attr('path', path);
                zoneShape.attr({cx: cx, cy: cy, rx: rx, ry: ry});
            }
        } else if(zoneShape.type == SHAPE_TYPES.POLYGON) {
            var pos = edge.pos;
            var properties = _self.getPropertiesOfPolygonPoints(zoneShape);
            var paths = properties.paths, points = properties.points;
            var start = paths[pos].start, end = paths[pos].end;

            var startPos = _self.getIndexOfPoints(points, start);
            var endPost = _self.getIndexOfPoints(points, end);

            if(startPos > -1 && endPost > -1) {
                points[startPos].x += dx2;
                points[startPos].y += dy2;
                points[endPost].x += dx2;
                points[endPost].y += dy2;

                if(!!zoneShape.minSize && zoneShape.minSize.x != zoneShape.minSize.x2 && zoneShape.minSize.y != zoneShape.minSize.y2) {
                    var tPath1 = utils.rectToPath(zoneShape.minSize.x, zoneShape.minSize.y, zoneShape.minSize.x2, zoneShape.minSize.y2);
                    var tPath2 = utils.pointsToPath(points);

                    var dots = Snap.path.intersection(tPath1, tPath2);
                    if(!_self.hasErrorPointsOfPolygon(points) && dots.length == 0) {
                        change = true;
                    }
                } else if(!_self.hasErrorPointsOfPolygon(points)) {
                    change = true;
                }

                if(change) {
                    edge.attr('path', 'M' + points[startPos].x.toString() + ',' + points[startPos].y.toString() + 'L' + points[endPost].x.toString() + ',' + points[endPost].y.toString());

                    var path = [];
                    for(var i = 0; i < points.length; i++) {
                        path.push(points[i].x.toString(), points[i].y.toString());
                    }

                    zoneShape.attr('points', path.join(' '));
                }
            }
        }

        edge.dx = dx;
        edge.dy = dy;
    },
    getIndexOfPoints: function(points, p) {
        for(var i = 0; i < points.length; i++) {
            if(points[i].x == p.x && points[i].y == p.y) {
                return i;
            }
        }

        return -1;
    },
    /***
     * Get Properties Of Polygon
     * @param shape (polygon)
     * @returns {{center: {x: number, y: number}, points: *, paths: Array}}
     */
    getPropertiesOfPolygonPoints: function(shape) {
        var px = [], py = [];
        var pCenter = {x: 0, y: 0};
        var paths = [], points = shape.attr('points');
        for(var i = 0; i < points.length; i++) {
            if(i % 2 == 0) {
                px.push(parseFloat(points[i]));
            } else {
                py.push(parseFloat(points[i]));
            }
        }

        points = [];
        for(var i = 0; i < px.length; i++) {
            points.push({x: px[i], y: py[i]});
            if(i < px.length - 1) {
                paths.push({
                    start: {x: px[i], y: py[i]},
                    end: {x: px[i + 1], y: py[i + 1]}
                });
            } else {
                paths.push({
                    start: {x: px[i], y: py[i]},
                    end: {x: px[0], y: py[0]}
                });
            }
        }

        pCenter.x = enyo.clone(px).sort()[Math.ceil(px.length / 2) - 1];
        pCenter.y = enyo.clone(py).sort()[Math.ceil(py.length / 2) - 1];

        return {
            center: pCenter,
            points: points,
            paths: paths
        }
    },
    getShapeContainer: function(options) {
        var floor = this.floors[this.currentTagName];
        for(var i = 0; i < floor.mObjectShapes.count; i++) {
            var shape = floor.mObjectShapes.item(i);
            if(shape.type === SHAPE_TYPES.ELLIPSE) {
                var path1 = utils.ellipseToPath(parseFloat(shape.attr('cx')), parseFloat(shape.attr('cy')), parseFloat(shape.attr('rx')), parseFloat(shape.attr('ry'))),
                    path2 = utils.ellipseToPath(options.x + options.w / 2, options.y + options.h / 2, options.w / 2, options.h / 2);
                if(Snap.path.isPointInside(path1, options.x + options.w / 2, options.y + options.h / 2) && Snap.path.intersection(path1, path2).length == 0) {
                    return shape;
                }
            } else if(shape.type == SHAPE_TYPES.POLYGON) {
                var path1 = 'M' + shape.attr('points').toString() + 'Z',
                    path2 = utils.ellipseToPath(options.x + options.w / 2, options.y + options.h / 2, options.w / 2, options.h / 2);
                if(Snap.path.isPointInside(path1, options.x + options.w / 2, options.y + options.h / 2) && Snap.path.intersection(path1, path2).length == 0) {
                    return shape;
                }
            } else { // rect
                var bbox = shape.getBBox();
                if(Snap.path.isPointInsideBBox(bbox, options.x, options.y) &&
                    Snap.path.isPointInsideBBox(bbox, options.x, options.y + options.h) &&
                    Snap.path.isPointInsideBBox(bbox, options.x + options.w, options.y) &&
                    Snap.path.isPointInsideBBox(bbox, options.x + options.w, options.y + options.h)) {
                    return shape;
                }
            }
        }
        return false;
    },
    getShapeByAvailableDraw: function(options) {
        var floor = this.floors[this.currentTagName];
        if(!!floor) {
            for(var i = 0; i < floor.mObjectShapes.count; i++) {
                if(floor.mObjectShapes.collection[i].vals.floorId === options.floorId &&
                    floor.mObjectShapes.collection[i].vals.zoneId === options.zoneId) {
                    return floor.mObjectShapes.item(i);
                }
            }
        }
        return false;
    },
    // Check shape exist sensor
    isEmptyShape: function(shape) {
        if(shape.mObjectSensors.count > 0) {
            shape.attr({
                'fill-opacity': this.configs.opacity
            });
            return true
        } else {
            shape.attr({
                'fill-opacity': this.mAttributes['fill-opacity']
            });
            return false;
        }
    },
    // Check zone created
    isZoneCreated: function() {
        if(this.panel.zoneExisting(this.availableDraw.floorId, this.availableDraw.zoneId)) {
            var floor = this.floors[this.currentTagName];
            // Check shape existing
            for(var i = 0; i < floor.mObjectShapes.count; i++) {
                if(floor.mObjectShapes.collection[i].vals.floorId === this.availableDraw.floorId &&
                    floor.mObjectShapes.collection[i].vals.zoneId === this.availableDraw.zoneId) {
                    return true;
                }
            }
            return false;
        }
        return 0;
    },
    //Check error for points of pologon
    hasErrorPointsOfPolygon: function(points) {
        var _self = siteGraphic, prop;
        points = enyo.cloneArray(points);
        if(points.length >= 3) {
            points.push(points[0]);
            points.push(points[1]);
            for(var i = 0; i <= points.length - 3; i++) {
                prop = utils.getPropertiesThreePoints(points[i], points[i + 1], points[i + 2]);
                if(
                    prop.angle < _self.configs.angle ||
                    prop.d12 < _self.configs.edge ||
                    prop.d13 < _self.configs.edge ||
                    prop.d23 < _self.configs.edge
                ) {
                    return true;
                }
            }
            return false;
        } else {
            return true;
        }
    },
    // fn deselect current Sensor
    deSelectedSensor: function() {
        var floor = this.floors[this.currentTagName];
        if(typeof floor.currentSensor !== "undefined") {
            floor.currentSensor.selectChange(false);
            floor.currentSensor = undefined;
        }
    },
    // fn delete selected items
    deleteSelectedItems: function() {
        var _self = siteGraphic,
            floor = _self.floors[_self.currentTagName];

        // Remove from mSelectedItems
        if(floor.mSelectedItems.count != 0) {
            floor.mSelectedItems.forEach(function(item) {
                if(item.objType == OBJECTS.SHAPE) {
                    // Add stack list
                    var sensors = [];
                    item.mObjectSensors.forEach(function(sensor) {
                        sensors.push({
                            item: sensor.info,
                            x: parseFloat(sensor.attr('x')),
                            y: parseFloat(sensor.attr('y'))
                        });
                    });

                    STACK_LIST.addStack(_self.currentTagName, _self.panel.name, STACK_TYPES.SVG, STACK_METHODS.REMOVE, item.info, {sensors: sensors});

                    _self.removeShape(item);
                } else if(item.objType == OBJECTS.TEXT) {
                    // Add stack list
                    STACK_LIST.addStack(_self.currentTagName, _self.panel.name, STACK_TYPES.SVG, STACK_METHODS.REMOVE, item.info);

                    floor.g.removeText(item.info);
                    floor.textGroup.length--;
                }
            });
            // Reset
            floor.mSelectedItems = new Collection();
        }

        // Remove current sensor
        if(floor.currentSensor !== undefined) {
            // Add stack list
            STACK_LIST.addStack(
                _self.currentTagName,
                _self.panel.name,
                STACK_TYPES.SVG,
                STACK_METHODS.REMOVE,
                floor.currentSensor.info
            );

            _self.removeSensor(floor.currentSensor);
        }
        return false;
    },
    // fn get path from xml format
    getDescriptionPath: function(url) {
        var doc = utils.httpGetXml(url);
        var path = doc.getElementsByTagName('path')[0];
        var d = path.getAttribute('d');

        return d;
    },
    // fn draw shape
    drawShape: function(object) {
        var _self = siteGraphic,
            floor = _self.floors[_self.currentTagName],
            shape = false;
        if(object.type === SHAPE_TYPES.RECTANGLE) {
            if(object.w < _self.configs.edge || object.h < _self.configs.edge) return false; // Check condition
            shape = floor.g.rect(object.x, object.y, object.w, object.h).attr(_self.mAttributes);
        } else if(object.type === SHAPE_TYPES.CIRCLE) {
            if(object.w < _self.configs.edge || object.h < _self.configs.edge) return false; // Check condition
            shape = floor.g.ellipse(object.x + object.w / 2, object.y + object.h / 2, object.w / 2, object.h / 2).attr(_self.mAttributes);
        } else if(object.type === SHAPE_TYPES.POLYGON) {
            shape = floor.g.polygon(object.points).attr(_self.mAttributes);
        }

        //added 20170430
        shape.attr({
            'class': "rect_shape"
        })
        //end

        shape.selectChange = function(flag) {
            if(flag) {
                this.attr({
                    filter: "url(#" + _self.currentTagName + "_hlShape)",
                    stroke: "#389CFF",
                    'stroke-width': 1
                })
            } else {
                this.attr({
                    filter: "none",
                    stroke: "#ffffff",
                    'stroke-width': 0.001
                })
            }
        };

        object.floorId = _self.availableDraw.floorId;
        object.zoneId = _self.availableDraw.zoneId;
        object.color = _self.availableDraw.color;

        shape.info = object;
        shape.id = object.id;
        shape.vals = _self.availableDraw;
        shape.objType = OBJECTS.SHAPE;
        shape.mObjectSensors = new Collection();

        // Draw edge for resize
        _self.drawEdge(shape);

        // Select zone
        if(IS_TOUCH) { // On Mobile
            shape.touchstart(function() {
                Signals.send("onSiteMenu", {
                    vals: this.vals,
                    method: STACK_METHODS.TAP
                });
            });
        } else { // On Desktop
            shape.click(function() {
                Signals.send("onSiteMenu", {
                    vals: this.vals,
                    method: STACK_METHODS.TAP
                });
            });
        }

        if(!IS_TOUCH) {
            shape.hover(_self.fIn, _self.fOut);
        }

        shape.drag(_self.onMove, _self.onStart, _self.onEnd);

        return shape;
    },
    // fn draw edge for shape (selectable and draggable)
    drawEdge: function(shape) {
        var _self = siteGraphic,
            floor = _self.floors[_self.currentTagName];

        if(shape.type == SHAPE_TYPES.RECTANGLE) {
            // Edge Left
            shape.edgeLeft = floor.g.path('M0,0').attr({
                stroke: 'transparent',
                'stroke-width': 5,
                cursor: 'e-resize'
            });
            shape.edgeLeft.parentShape = shape;
            shape.edgeLeft.objType = OBJECTS.EDGE;
            shape.edgeLeft.edgeType = 'left';
            shape.edgeLeft.drag(_self.onMove, _self.onStart, _self.onEnd);
            floor.edgeGroup.add(shape.edgeLeft);

            // Edge Right
            shape.edgeRight = floor.g.path('M0,0').attr({
                stroke: 'transparent',
                'stroke-width': 5,
                cursor: 'e-resize'
            });
            shape.edgeRight.parentShape = shape;
            shape.edgeRight.objType = OBJECTS.EDGE;
            shape.edgeRight.edgeType = 'right';
            shape.edgeRight.drag(_self.onMove, _self.onStart, _self.onEnd);
            floor.edgeGroup.add(shape.edgeRight);

            // Edge Top
            shape.edgeTop = floor.g.path('M0,0').attr({
                stroke: 'transparent',
                'stroke-width': 5,
                cursor: 'n-resize'
            });
            shape.edgeTop.parentShape = shape;
            shape.edgeTop.objType = OBJECTS.EDGE;
            shape.edgeTop.edgeType = 'top';
            shape.edgeTop.drag(_self.onMove, _self.onStart, _self.onEnd);
            floor.edgeGroup.add(shape.edgeTop);

            // Edge Bottom
            shape.edgeBottom = floor.g.path('M0,0').attr({
                stroke: 'transparent',
                'stroke-width': 5,
                cursor: 'n-resize'
            });
            shape.edgeBottom.parentShape = shape;
            shape.edgeBottom.objType = OBJECTS.EDGE;
            shape.edgeBottom.edgeType = 'bottom';
            shape.edgeBottom.drag(_self.onMove, _self.onStart, _self.onEnd);
            floor.edgeGroup.add(shape.edgeBottom);
        } else if(shape.type == SHAPE_TYPES.ELLIPSE) {
            // Edge Top Left
            shape.edgeTopLeft = floor.g.path('M0,0').attr({
                fill: 'none',
                stroke: 'transparent',
                'stroke-width': 5,
                cursor: 'nwse-resize'
            });
            shape.edgeTopLeft.parentShape = shape;
            shape.edgeTopLeft.objType = OBJECTS.EDGE;
            shape.edgeTopLeft.edgeType = 'topLeft';
            shape.edgeTopLeft.drag(_self.onMove, _self.onStart, _self.onEnd);
            floor.edgeGroup.add(shape.edgeTopLeft);

            // Edge Top Right
            shape.edgeTopRight = floor.g.path('M0,0').attr({
                fill: 'none',
                stroke: 'transparent',
                'stroke-width': 5,
                cursor: 'ne-resize'
            });
            shape.edgeTopRight.parentShape = shape;
            shape.edgeTopRight.objType = OBJECTS.EDGE;
            shape.edgeTopRight.edgeType = 'topRight';
            shape.edgeTopRight.drag(_self.onMove, _self.onStart, _self.onEnd);
            floor.edgeGroup.add(shape.edgeTopRight);

            // Edge Bottom Left
            shape.edgeBottomLeft = floor.g.path('M0,0').attr({
                fill: 'none',
                stroke: 'transparent',
                'stroke-width': 5,
                cursor: 'sw-resize'
            });
            shape.edgeBottomLeft.parentShape = shape;
            shape.edgeBottomLeft.objType = OBJECTS.EDGE;
            shape.edgeBottomLeft.edgeType = 'bottomLeft';
            shape.edgeBottomLeft.drag(_self.onMove, _self.onStart, _self.onEnd);
            floor.edgeGroup.add(shape.edgeBottomLeft);

            // Edge Bottom Right
            shape.edgeBottomRight = floor.g.path('M0,0').attr({
                fill: 'none',
                stroke: 'transparent',
                'stroke-width': 5,
                cursor: 'se-resize'
            });
            shape.edgeBottomRight.parentShape = shape;
            shape.edgeBottomRight.objType = OBJECTS.EDGE;
            shape.edgeBottomRight.edgeType = 'bottomRight';
            shape.edgeBottomRight.drag(_self.onMove, _self.onStart, _self.onEnd);
            floor.edgeGroup.add(shape.edgeBottomRight);
        } else if(shape.type == SHAPE_TYPES.POLYGON) {
            for(var i = 0; i < shape.attr('points').length / 2; i++) {
                shape['path' + i] = floor.g.path('M0,0').attr({
                    stroke: 'transparent',
                    'stroke-width': 5
                });
                shape['path' + i].parentShape = shape;
                shape['path' + i].objType = OBJECTS.EDGE;
                shape['path' + i].drag(_self.onMove, _self.onStart, _self.onEnd);
                floor.edgeGroup.add(shape['path' + i]);
            }
        }

        _self.setEdgePosition(shape);
    },
    // fn draw sensor for site builder
    drawSensor: function(object) {
        var _self = siteGraphic,
            floor = _self.floors[_self.currentTagName],
            pathColor = floor.g.path(_self.getDescriptionPath(object.url));
        pathColor.transform("T" + object.x + "," + object.y);

        var sensor = floor.g.ellipse(object.x + object.w / 2, object.y + object.w / 2, object.w / 2, object.h / 2).attr({
            opacity: 0.001,
            fill: "#000000"
        });
        sensor.pathColor = pathColor;

        // Disable sensor
        if(!this.drawing) {
            sensor.attr("display", "none");
            sensor.pathColor.attr("display", "none");
        }

        sensor.selectChange = function(flag) {
            if(flag) {
                //this.pathColor.attr({filter: "url(#" + siteGraphic.currentTagName+"_hlSensor)"});
            } else {
                //this.attr({filter: "none"});
            }
        };

        sensor.id = object.id;
        sensor.info = object;
        sensor.objType = OBJECTS.SENSOR;

        if(!IS_TOUCH) {
            sensor.hover(_self.fIn, _self.fOut);
        }
        sensor.drag(_self.onMove, _self.onStart, _self.onEnd);

        // Hack to add breadcrumb percentage
        var percent = 0;
        percent = PROGRESS['SITE_BUILDER'];
        percent += 5;
        if(PROGRESS['SITE_BUILDER'] < 100) {
            Signals.send("onProgress", {page: APP_PROGRESS.PR_SITE, key: 'SITE_BUILDER', value: percent});
        } else {
            PROGRESS['SITE_BUILDER'] = 100;
        }
        // END HACK

        return sensor;
    },
    // fn create shape (for zone)
    createShape: function(options) {
        var _self = siteGraphic,
            floor = _self.floors[_self.currentTagName];

        // Check shape existing
        if(_self.isZoneCreated() === false) {
            var shape = new Shape(options.type, options.x, options.y, options.w, options.h, options.points);
            floor.mShapes.add(shape, true);
            var item = _self.drawShape(shape);
            if(item) {
                floor.mObjectShapes.add(item);
                floor.shapeGroup.add(item);
                floor.shapeGroup.length++;

                // Add to task list
                STACK_LIST.addStack(_self.currentTagName, _self.panel.name, STACK_TYPES.SVG, STACK_METHODS.CREATE, item);

                // Send zone created
                Signals.send("onSiteZoneCreated", {
                    floorId: _self.availableDraw.floorId,
                    zoneId: _self.availableDraw.zoneId,
                    color: _self.availableDraw.color
                });

                // Check queues
                var queues = [];
                for(var i = 0; i < _self.queues.length; i++) {
                    if(_self.queues[i].floorId == _self.availableDraw.floorId && _self.queues[i].zoneId == _self.availableDraw.zoneId) {
                        _self.createSensor2(_self.queues[i]);
                    } else {
                        queues.push(_self.queues[i]);
                    }
                }
                //_self.queues = queues;
            } else {
                floor.mShapes.remove(shape);
            }
        } else {
            //Signals.send("onNotification", {method: "message", message: LABELS.siteBuilder.zoneExisting});
        }
    },
    // fn create sensor
    createSensor: function(options) {
        var _self = siteGraphic,
            floor = _self.floors[_self.currentTagName];

        options.x = options.x * floor.g.scale + floor.g.getCurrentPosition().x;
        options.y = options.y * floor.g.scale + floor.g.getCurrentPosition().y;

        var zoneShape = _self.getShapeContainer(options);
        if(!!zoneShape) {
            var sens = new Sensor(options.sensorId, options.name, options.url, options.x, options.y, options.w, options.h);
            sens.floorId = zoneShape.info.floorId;
            sens.zoneId = zoneShape.info.zoneId;

            floor.mSensors.add(sens, true);

            var objectSensor = this.drawSensor(sens);
            objectSensor.parentShape = zoneShape;

            zoneShape.mObjectSensors.add(objectSensor);

            floor.sensorGroup.add(objectSensor.pathColor);
            floor.sensorGroup.add(objectSensor);
            floor.sensorGroup.length++;

            objectSensor.pathColor.attr({
                fill: utils.changeLuminosityOfHsl(zoneShape.node.getAttribute('fill'), SITE_SETTING.luminosity)
            });

            _self.isEmptyShape(zoneShape);
            _self.minSizeForZoneShape(zoneShape);

            // Add sensor to sensor list
            Signals.send("onSiteMenu", {
                sensorId: options.sensorId,
                name: options.name,
                classes: options.classes,
                kind: options.kind,
                type: options.type,
                url: options.url,
                w: options.w,
                h: options.h,
                vals: zoneShape.vals,
                method: STACK_METHODS.CREATE,
                objectSensor: objectSensor
            });

            return true;
        }

        return false;
    },
    // fn create sensor by add list sensor
    createSensor2: function(options) {
        var _self = siteGraphic,
            floor = _self.floors[_self.currentTagName],
            zoneShape;
        if(floor) {
            options.w = options.w * floor.g.scale;
            options.h = options.h * floor.g.scale;
            zoneShape = _self.getShapeByAvailableDraw(options);
        }

        if(!!zoneShape) {
            var bb = zoneShape.getBBox();
            //*** Get random x, y
            //options.x = 0;
            //options.y = 0;
            //
            function checkInline() {
                if(zoneShape.type == SHAPE_TYPES.ELLIPSE) {
                    var path1 = utils.ellipseToPath(parseFloat(zoneShape.attr('cx')), parseFloat(zoneShape.attr('cy')), parseFloat(zoneShape.attr('rx')), parseFloat(zoneShape.attr('ry'))),
                        path2 = utils.ellipseToPath(options.x + options.w / 2, options.y + options.h / 2, options.w / 2, options.h / 2);
                    if(Snap.path.isPointInside(path1, options.x + options.w / 2, options.y + options.h / 2) && Snap.path.intersection(path1, path2).length == 0) {
                        return true;
                    }
                } else if(zoneShape.type == SHAPE_TYPES.POLYGON) {
                    var path1 = 'M' + zoneShape.attr('points').toString() + 'Z',
                        path2 = utils.ellipseToPath(options.x + options.w / 2, options.y + options.h / 2, options.w / 2, options.h / 2);
                    if(Snap.path.isPointInside(path1, options.x + options.w / 2, options.y + options.h / 2) && Snap.path.intersection(path1, path2).length == 0) {
                        return true;
                    }
                } else {
                    if(Snap.path.isPointInsideBBox(bb, options.x, options.y) &&
                        Snap.path.isPointInsideBBox(bb, options.x, options.y + options.h) &&
                        Snap.path.isPointInsideBBox(bb, options.x + options.w, options.y) &&
                        Snap.path.isPointInsideBBox(bb, options.x + options.w, options.y + options.h)) {
                        return true;
                    }
                }
                return false;
            }

            //*** Get point center
            options.x = bb.cx - options.w / 2;
            options.y = bb.cy - options.h / 2;

            if(zoneShape.type == SHAPE_TYPES.POLYGON) {
                do {
                    options.x = utils.getRandomInt(bb.x, bb.x2 - options.w);
                    options.y = utils.getRandomInt(bb.y, bb.y2 - options.h);
                } while(!checkInline());
            }

            var sens = new Sensor(options.sensorId, options.name, options.url, options.x, options.y, options.w, options.h);
            sens.floorId = zoneShape.info.floorId;
            sens.zoneId = zoneShape.info.zoneId;

            floor.mSensors.add(sens, true);

            var objectSensor = _self.drawSensor(sens);
            objectSensor.parentShape = zoneShape;

            zoneShape.mObjectSensors.add(objectSensor);

            floor.sensorGroup.add(objectSensor.pathColor);
            floor.sensorGroup.add(objectSensor);
            floor.sensorGroup.length++;

            objectSensor.pathColor.attr({
                fill: utils.changeLuminosityOfHsl(zoneShape.node.getAttribute('fill'), SITE_SETTING.luminosity)
            });

            _self.isEmptyShape(zoneShape);
            _self.minSizeForZoneShape(zoneShape);

            return objectSensor;
        } else {
            options.w = options.w / _self.scaleX;
            options.h = options.h / _self.scaleY;
            _self.queues.push(options);

            return options;
        }

        return true;
    },
    // fn create polygon
    createPolygon: function() {
        var _self = siteGraphic;
        if(!_self.hasErrorPointsOfPolygon(GB.points)) {
            var points = [];
            for(var i = 0; i < GB.points.length; i++) {
                points.push(GB.points[i].x, GB.points[i].y)
            }
            _self.createShape({
                type: SHAPE_TYPES.POLYGON,
                points: points
            });
        }
        if(_self.selectedArea.shape !== undefined) {
            GB.points = new Array();
            _self.selectedArea.shape.remove();
            _self.selectedArea.shape = undefined;
        }
    },
    // fn remove queues
    removeQueues: function(options) {
        var _self = siteGraphic;
        for(var i = 0; i < _self.queues.length; i++) {
            if(_self.queues[i].floorId == options.floorId && _self.queues[i].zoneId == options.zoneId && _self.queues[i].type == options.type) {
                _self.queues.splice(i, 1);
                break;
            }
        }
    },
    // fn remove sensor
    removeSensor: function(item, isSignal) {
        var _self = siteGraphic,
            floor = _self.floors[_self.currentTagName];
        // Remove info
        floor.mSensors.remove(item);
        // Remove object
        item.parentShape.mObjectSensors.remove(item);
        item.pathColor.remove();
        item.remove();
        floor.sensorGroup.length--;

        // Remove sensor from zone (menu)
        if(isSignal !== false) {
            Signals.send("onSiteMenu", {
                sensorId: item.info.type,
                vals: item.parentShape.vals,
                method: STACK_METHODS.DELETE
            });
        }
    },
    // fn Remove Sensor From Enyo
    removeSensorByObject: function(sensorObject) {
        if(!!sensorObject.node) { // SVG
            this.removeSensor(sensorObject, false);
        } else { // Remove Queues
            this.removeQueues(sensorObject);
        }
    },
    // fn remove sensor by list sensor
    removeSensorByOption: function(options) {
        var _self = siteGraphic,
            floor = _self.floors[_self.currentTagName],
            shape;
        if(floor) {
            shape = _self.getShapeByAvailableDraw(options);
        }
        if(!!shape) {
            for(var i = 0; i < shape.mObjectSensors.count; i++) {
                if(shape.mObjectSensors.collection[i].info.type === options.sensorId) {
                    // Add to Stack
                    STACK_LIST.addStack(
                        _self.currentTagName,
                        _self.panel.name,
                        STACK_TYPES.SVG,
                        STACK_METHODS.REMOVE,
                        shape.mObjectSensors.collection[i].info
                    );

                    _self.removeSensor(shape.mObjectSensors.collection[i], false);
                    break;
                }
            }
        }
    },
    // fn remove shape
    removeShape: function(item) {
        var _self = siteGraphic,
            floor = _self.floors[_self.currentTagName];
        // Send zone removed
        Signals.send("onSiteZoneRemoved", {
            floorId: item.vals.floorId,
            zoneId: item.vals.zoneId
        });
        // Remove info
        floor.mShapes.remove(item);
        // Remove object
        floor.mObjectShapes.forEach(function(shape) {
            if(shape === item) {
                // Remove sensor children
                shape.mObjectSensors.forEach(function(sensor) {
                    sensor.pathColor.remove();
                    sensor.remove();
                    floor.sensorGroup.length--;
                });
                // Remove Edge
                _self.removeEdge(shape);
                // Empty
                shape.mObjectSensors = new Collection();
                // Remove shape parent
                shape.remove();
            }
        });
        // Remove object parent
        floor.mObjectShapes.remove(item);
        floor.shapeGroup.length--;
    },
    // fn remove edge
    removeEdge: function(shape) {
        if(shape.type == SHAPE_TYPES.RECTANGLE) {
            shape.edgeLeft.remove();
            shape.edgeRight.remove();
            shape.edgeTop.remove();
            shape.edgeBottom.remove();
        } else if(shape.type == SHAPE_TYPES.ELLIPSE) {
            shape.edgeTopLeft.remove();
            shape.edgeTopRight.remove();
            shape.edgeBottomLeft.remove();
            shape.edgeBottomRight.remove();
        } else if(shape.type == SHAPE_TYPES.POLYGON) {
            for(var i = 0; i < shape.attr('points').length / 2; i++) {
                shape['path' + i].remove();
            }
        }
    },
    // fn resize shape
    resizeShape: function(shape, option) {
        var _self = siteGraphic;

        if(shape.type == SHAPE_TYPES.RECTANGLE) {
            shape.attr({
                x: option.x,
                y: option.y,
                width: option.width,
                height: option.height
            });
        } else if(shape.type == SHAPE_TYPES.ELLIPSE) {
            shape.attr({
                cx: option.cx,
                cy: option.cy,
                rx: option.rx,
                ry: option.ry
            });
        } else if(shape.type == SHAPE_TYPES.POLYGON) {
            shape.attr('points', option.points);
        }

        _self.setEdgePosition(shape);
    },
    setEdgePosition: function(shape) {
        var _self = siteGraphic;
        var bb = shape.getBBox();

        if(shape.type == SHAPE_TYPES.RECTANGLE) {
            shape.edgeLeft.attr('path', 'M' + bb.x + ',' + bb.y + 'L' + bb.x + ',' + (bb.y + bb.h));
            shape.edgeRight.attr('path', 'M' + (bb.x + bb.w) + ',' + bb.y + 'L' + (bb.x + bb.w) + ',' + (bb.y + bb.h));
            shape.edgeTop.attr('path', 'M' + bb.x + ',' + bb.y + 'L' + (bb.x + bb.w) + ',' + bb.y);
            shape.edgeBottom.attr('path', 'M' + bb.x + ',' + (bb.y + bb.h) + 'L' + (bb.x + bb.w) + ',' + (bb.y + bb.h));

            // Update info
            shape.info.x = parseFloat(shape.attr('x'));
            shape.info.y = parseFloat(shape.attr('y'));
            shape.info.setWidth(shape.attr('width'));
            shape.info.setHeight(shape.attr('height'));
        } else if(shape.type == SHAPE_TYPES.ELLIPSE) {
            var cx = parseFloat(shape.attr('cx'));
            var cy = parseFloat(shape.attr('cy'));
            var rx = parseFloat(shape.attr('rx'));
            var ry = parseFloat(shape.attr('ry'));

            shape.edgeTopLeft.attr('path', utils.ellipticalArcToPath(cx, cy, rx, ry, 270, 0));
            shape.edgeTopRight.attr('path', utils.ellipticalArcToPath(cx, cy, rx, ry, 0, 90));
            shape.edgeBottomLeft.attr('path', utils.ellipticalArcToPath(cx, cy, rx, ry, 180, 270));
            shape.edgeBottomRight.attr('path', utils.ellipticalArcToPath(cx, cy, rx, ry, 90, 180));

            // Update info
            shape.info.cx = parseFloat(shape.attr('cx'));
            shape.info.cy = parseFloat(shape.attr('cy'));
            shape.info.rx = parseFloat(shape.attr('rx'));
            shape.info.ry = parseFloat(shape.attr('ry'));
            shape.info.x = bb.x;
            shape.info.y = bb.y;
            shape.info.setWidth(bb.width);
            shape.info.setHeight(bb.height);
        } else if(shape.type == SHAPE_TYPES.POLYGON) {
            var direction, path, pH, cursor = '', edgeType = '';
            var properties = _self.getPropertiesOfPolygonPoints(shape);
            var center = properties.center, paths = properties.paths, points = properties.points;

            for(var i = 0; i < paths.length; i++) {
                path = 'M' + paths[i].start.x + ',' + paths[i].start.y + 'L' + paths[i].end.x + ',' + paths[i].end.y;

                // Property
                pH = utils.getPointOfPointToVector(center, paths[i].start, paths[i].end);
                if(pH) {
                    direction = utils.getDirection(center, pH);
                    if(direction == 1) {
                        cursor = 'ne-resize';
                        edgeType = 'edgeTopRight';
                    } else if(direction == 2) {
                        cursor = 'se-resize';
                        edgeType = 'edgeBottomRight';
                    } else if(direction == 3) {
                        cursor = 'sw-resize';
                        edgeType = 'edgeBottomLeft';
                    } else if(direction == 4) {
                        cursor = 'nwse-resize';
                        edgeType = 'edgeTopLeft';
                    }
                }

                shape['path' + i].attr({path: path, cursor: cursor});
                shape['path' + i].pos = i;
                shape['path' + i].edgeType = edgeType;
            }

            shape.center = center;
            shape.points = points;
            shape.paths = paths;

            // Update info
            shape.info.points = shape.attr('points');
            shape.info.x = bb.x;
            shape.info.y = bb.y;
            shape.info.setWidth(bb.width);
            shape.info.setHeight(bb.height);
        }
    },
    // Set AvailableDraw
    setAvailableDraw: function(option) {
        this.availableDraw = {
            color: option.color ? option.color : '#FFFFFF',
            floorId: option.floorId,
            zoneId: option.zoneId
        };
    },
    // Resize ViewPort
    setSizeViewPort: function(width, height, callback) {
        var _self = siteGraphic;
        _self.scaleX = width / this.width;
        _self.scaleY = height / this.height;
        _self.width = width;
        _self.height = height;

        // Resize
        for(var key in this.floors) {
            _self.floors[key].g.setSize(width, height, true, callback);
        }
    },
    // Scale ViewPort
    setScaleViewPort: function(width, height, panelWidth, panelHeight) {
        var _self = siteGraphic;
        panelWidth = panelWidth || width;
        panelHeight = panelHeight || height;
        for(var key in this.floors) {
            _self.floors[key].g.setScaleViewPort(width / panelWidth, height / panelHeight);
        }
    },
    // Show content
    setShowing: function(showing) {
        var _self = siteGraphic,
            floor = _self.floors[_self.currentTagName];
        if(!!floor) {
            floor.g.setShowing(true);
            //floor.mObjectShapes.forEach(function(item) {
            //    if(showing) {
            //        item.attr("display", "");
            //    } else {
            //        item.attr("display", "none");
            //    }
            //    item.mObjectSensors.forEach(function(sensor) {
            //        if(showing) {
            //            sensor.attr("display", "");
            //            sensor.pathColor.attr("display", "");
            //        } else {
            //            sensor.attr("display", "none");
            //            sensor.pathColor.attr("display", "none");
            //        }
            //    });
            //});
            //floor.mObjectText.forEach(function(item) {
            //    if(showing) {
            //        item.attr("display", "");
            //    } else {
            //        item.attr("display", "none");
            //    }
            //});
        }
    },
    setBackground: function(image, width, height, panelWidth, panelHeight) {
        var _self = siteGraphic,
            floor = _self.floors[_self.currentTagName];
        panelWidth = panelWidth || this.width;
        panelHeight = panelHeight || this.height;

        if(!!floor && !!image) {
            if(!!width && !!height) {
                var t = width / height;
                width = panelWidth;
                height = width / t;
            } else {
                width = panelWidth;
                height = panelHeight;
            }
            var left = (panelWidth - width) / 2;
            var top = (panelHeight - height) / 2;

            // Set image background
            floor.image = image;

            // Check existing
            if(typeof floor.background === 'object') floor.background.remove();

            // Set background
            floor.background = floor.g.image(image, left, top, width, height);
            floor.background.objType = 'background';
            floor.bgGroup.add(floor.background);

            // Show content
            if(!_self.drawing) _self.setShowing(false);

            return true;
        }

        return false;
    },
    // has background
    hasBackground: function(tagName) {
        var _self = siteGraphic,
            floor = _self.floors[tagName];
        if(!!floor && !!floor.image) {
            return true;
        }
        return false;
    },
    // Calculate available size of all sensor (in zone)
    minSizeForZoneShape: function(zoneShape) {
        var minSize = {x: 0, y: 0, x2: 0, y2: 0};
        if(zoneShape.mObjectSensors.count > 0) {
            var x = [], x2 = [], y = [], y2 = [];
            zoneShape.mObjectSensors.forEach(function(sensor) {
                var bb = sensor.getBBox();
                x.push(bb.x);
                y.push(bb.y);
                x2.push(bb.x2);
                y2.push(bb.y2);
            });
            x.sort();
            y.sort();
            x2.sort();
            y2.sort();
            minSize.x = x[0];
            minSize.y = y[0];
            minSize.x2 = x2[x2.length - 1];
            minSize.y2 = y2[y2.length - 1];
        }
        zoneShape.minSize = minSize;
    },
    // Changing fill color for shape by options
    adjustFillColor: function(floorId, zoneId, color) {
        var _self = siteGraphic;
        var floor = _self.floors[_self.currentTagName];
        if(floor) {
            var shape = _self.getShapeByAvailableDraw({floorId: floorId, zoneId: zoneId});
            if(!!shape) {
                var rgba = utils.getRgbaString(color, SITE_SETTING.transparency);
                shape.attr({
                    fill: rgba
                });

                shape.mObjectSensors.forEach(function(sensor) {
                    sensor.pathColor.attr({
                        fill: utils.changeLuminosityOfHsl(rgba, SITE_SETTING.luminosity)
                    });
                });

                // Update info
                shape.info.color = rgba;
                shape.vals.color = rgba;

                // Signal
                Signals.send("onSiteZoneColorChanged", {floorId: floorId, zoneId: zoneId, color: color});
            }
        }
    },
    selectShape: function(floorId, zoneId) {
        var _self = siteGraphic;
        var floor = _self.floors[_self.currentTagName];
        if(floor) {
            var shape = _self.getShapeByAvailableDraw({floorId: floorId, zoneId: zoneId});
            floor.g.deSelectedItems();
            if(!!shape) {
                floor.mSelectedItems.add(shape);
                shape.selectChange(true);
                _self.panel.activeSelector();
            }
        }
    },
    // fn zoom
    zoomViewPort: function() {
        var _self = siteGraphic,
            floor = _self.floors[_self.currentTagName];
        return floor.g.zoom();
    },
    zoomToFit: function() {
        var _self = siteGraphic,
            floor = _self.floors[_self.currentTagName];
        var availableSize = floor.g.calculateFitSize(floor.mShapes);
        return floor.g.zoomFit(availableSize);
    },
    resetInputAndZoom: function() {
        var _self = siteGraphic,
            floor = _self.floors[_self.currentTagName];
        if(floor) {
            floor.g.turnOnTextBoxToAddText(false);
            floor.g.zoomDefault();
        }
    },
    // It should just undo the last things done
    undo: function() {
        var _self = siteGraphic,
            floor = _self.floors[_self.currentTagName];
        var stack = STACK_LIST.getStack(_self.currentTagName);
        if(stack) {
            var item = stack.object;
            if(stack.method === STACK_METHODS.CREATE) {
                if(item.objType === OBJECTS.SHAPE) {
                    _self.removeShape(item);
                } else if(item.objType === OBJECTS.TEXT) {
                    floor.g.removeText(item);
                    floor.textGroup.length--;
                } else if(item.objType === OBJECTS.SENSOR) {
                    _self.removeSensor(item);
                }
            } else if(stack.method === STACK_METHODS.MOVE) {
                if(item.objType === OBJECTS.SHAPE) {
                    if(item.type === SHAPE_TYPES.ELLIPSE) {
                        item.attr({
                            cx: parseFloat(item.attr('cx')) - stack.data.dx,
                            cy: parseFloat(item.attr('cy')) - stack.data.dy
                        });
                    } else if(item.type === SHAPE_TYPES.POLYGON) {
                        var path = Snap.parsePathString('M' + item.attr('points').toString() + 'Z'),
                            points = [];
                        for(var i = 0; i < path.length - 1; i++) {
                            points.push(path[i][1] - stack.data.dx, path[i][2] - stack.data.dy)
                        }
                        item.attr('points', points);
                    } else { // rect
                        item.attr({
                            x: parseFloat(item.attr('x')) - stack.data.dx,
                            y: parseFloat(item.attr('y')) - stack.data.dy
                        });
                    }
                    item.mObjectSensors.forEach(function(sensor) {
                        sensor.attr({
                            cx: parseFloat(sensor.attr('cx')) - stack.data.dx,
                            cy: parseFloat(sensor.attr('cy')) - stack.data.dy
                        });
                        var bb = sensor.getBBox();
                        sensor.pathColor.transform('R0T' + bb.x + ',' + bb.y);
                    });

                    _self.setEdgePosition(item);
                } else if(item.objType === OBJECTS.TEXT) {
                    item.attr({
                        x: parseFloat(item.attr('x')) - stack.data.dx,
                        y: parseFloat(item.attr('y')) - stack.data.dy
                    });
                    item.info.x = parseFloat(item.attr('x'));
                    item.info.y = parseFloat(item.attr('y'));
                } else if(item.objType === OBJECTS.SENSOR) {
                    item.attr({
                        cx: parseFloat(item.attr('cx')) - stack.data.dx,
                        cy: parseFloat(item.attr('cy')) - stack.data.dy
                    });
                    var bb = item.getBBox();
                    item.pathColor.transform('R0T' + bb.x + ',' + bb.y);
                    if(item.parentShape != stack.data.parentShape) {
                        //*** Remove old parent
                        var parent = item.parentShape;
                        parent.mObjectSensors.remove(item);
                        siteGraphic.isEmptyShape(parent);

                        //*** Change parent shape
                        var shape = stack.data.parentShape;
                        item.parentShape = shape;
                        item.parentShape.mObjectSensors.add(item);
                        item.pathColor.attr({
                            fill: utils.changeLuminosityOfHsl(shape.node.getAttribute('fill'), SITE_SETTING.luminosity)
                        });
                        siteGraphic.isEmptyShape(shape);

                        // Change zone parent for sensor in floor
                        Signals.send("onSiteMenu", {
                            sensorId: item.info.type,
                            from: parent.vals,
                            to: shape.vals,
                            method: STACK_METHODS.MOVE
                        });
                    }
                }
            } else if(stack.method === STACK_METHODS.REMOVE) {
                if(item.objType === OBJECTS.SHAPE) {
                    this.createShape(item);
                    for(var i = 0; i < stack.data.sensors.length; i++) {
                        this.createSensor(stack.data.sensors[i].item);
                    }
                } else if(item.objType === OBJECTS.TEXT) {
                    floor.g.createText(item);
                } else if(item.objType === OBJECTS.SENSOR) {
                    this.createSensor(item);
                }
            } else if(stack.method === STACK_METHODS.RESIZE) {
                if(item.objType === OBJECTS.SHAPE) {
                    _self.resizeShape(item, stack.data);
                }
            }

            STACK_LIST.removeStack(stack);
        }
    },
    // Check inside draw panel
    isInside: function() {
        var _self = siteGraphic;
        if(_self.drawing !== true) {
            return false;
        }
        var floor = _self.floors[_self.currentTagName];
        if(floor) {
            return floor.g.isInside();
        }
        return false;
    },
    // active icons
    activeIcons: function(keyOn, valOn, keyOff, valOff) {
        if(keyOn === undefined) {
            keyOn = 'isSelector';
        }
        if(valOn === undefined) {
            valOn = true;
        }
        if(keyOff === undefined) {
            keyOff = '';
        }
        if(valOff === undefined) {
            valOff = false;
        }
        for(var key in toolIcons) {
            if(key === keyOn) {
                toolIcons[key] = valOn;
            } else if(key === keyOff) {
                toolIcons[key] = valOff;
            } else {
                toolIcons[key] = false;
            }
        }
        var _self = siteGraphic,
            floor = _self.floors[_self.currentTagName];
        if(!!floor) {
            // Disable selector and remove selected item
            if(!toolIcons.isSelector && !toolIcons.isZoom && !toolIcons.isZoomToFit && !toolIcons.isMoving) {
                floor.g.deSelectedItems();
            }
            // Disable sensor
            _self.deSelectedSensor();
            if(!toolIcons.isAddText) {
                // Add Text and Off textBox
                var input = floor.g.input;
                if(!!input) {
                    if(input.value.trim() != "") {
                        floor.g.createText({
                            x: input.x,
                            y: input.y,
                            text: input.value
                        });
                    } else {
                        // Off input
                        floor.g.turnOnTextBoxToAddText(false);
                        // Reset input value
                        input.value = "";
                    }
                }
            }
            // If zoom active
            //floor.g.panZoom.enable(toolIcons.isZoom);
            // if move active
            //floor.g.panZoom.move(toolIcons.isMoving);

            // Reset variable
            GB.points = new Array();
            if(_self.selectedArea.shape !== undefined) {
                _self.selectedArea.shape.remove();
                _self.selectedArea.shape = undefined;
            }
        }
    }
};

},{'../../../common/services/graphic.js':'src/common/services/graphic','../../../common/services/utils.js':'src/common/services/utils','../../../common/services/stack.js':'src/common/services/stack'}],'src/views/progress/system/graphic':[function (module,exports,global,require,request){
//

var utils = require('../../../common/services/utils.js');
var Graphic = require('../../../common/services/graphic.js');

var STACK_LIST = require('../../../common/services/stack.js').STACK_LIST;
var STACK_TYPES = require('../../../common/services/stack.js').STACK_TYPES;
var STACK_METHODS = require('../../../common/services/stack.js').STACK_METHODS;

var IS_TOUCH = require('enyo/platform').touch;

var eCloneArray = require('enyo/utils').cloneArray;

var systemGraphic = module.exports = {
    configs: {
        zoomStep: 0.2,
        rotateSpeed: 100,
        rotateDelay: 120,
        offsetSpace: 3,
        offsetHolder: 2,
        holderSize: 20,
        holderDistance: IS_TOUCH ? 30 : 20,
        badgeRadius: 8,
        badgeTextSize: 10,
        badgeTextTop: 3,
        badgeTotal: 1000,
        layerTotal: 4,
        connectorColor: '#0000ff'
    },
    panel: null,
    width: 0,
    height: 0,
    isHolder: false, // when drag-drop on holder for create connection
    isMulti: false,
    isDrawArea: false,
    // Size of available items.
    availableSize: {x: 0, x2: 0, y: 0, y2: 0, height: 0, width: 0},
    // kind of available items.
    availableKind: {},
    selectedArea: {
        shape: undefined,
        areaNormal: {fill: 'none', stroke: 'none'},
        areaSelect: {fill: '#9CFFFD', 'fill-opacity': 0.1, stroke: '#389CFF'},
        lineSelect: {stroke: '#389CFF'}
    },
    dummy: undefined,
    currentTagName: null,
    currentItem: undefined,
    mEquipments: new Collection(),
    mText: new Collection(),
    mConnections: new Collection(),
    mCurrentConnection: new Connection(),
    mObjectEquipments: new Collection(),
    mObjectText: new Collection(),
    mObjectConnections: new Collection(),
    mSelectedItems: new Collection(),
    mAttributes: {fill: '#ffffff', stroke: '#389CFF', 'stroke-width': 1},
    holderHighlight: [],
    // Initiation
    init: function(svg, input) {
        this.currentTagName = svg.getId();
        this.g = new Graphic(
            svg.getId(),
            input.getId(),
            this,
            this.width,
            this.height,
            this.configs,
            this.onMouseDown,
            this.onMouseMove,
            this.onMouseUp,
            this.onStart,
            this.onMove,
            this.onEnd,
            this.fIn,
            this.fOut
        );
        // Add highlight
        this.g.appendChild(utils.makeHighlight(this.currentTagName + '_highlight'));
        // Draw dummy
        this.dummy = this.g.rect(0, 0, 4, 4).attr({fill: 'red', stroke: 'none', 'fill-opacity': .001});
        this.dummy.id = -1000;
        // Ready
        this.loaded = true;
    },
    //=== Mouse events management on graphic panel ===
    onMouseDown: function(e) {
        var _self = systemGraphic;
        _self.g.mMouse.start = _self.g.getPosition();
        //_self.dummy.attr({x: _self.g.mMouse.start.x, y: _self.g.mMouse.start.y, 'stroke-width': 0.1});
        //_self.g.mMouse.start = _self.g.mMouse.position;
        if(!_self.currentItem && toolIcons.isSelector) {
            _self.isDrawArea = true;
            if(PL.keyCode != 16 && PL.keyCode != 17) { // shift or ctrl key
                _self.g.deSelectedItems();
            }
        } else {
            _self.isDrawArea = false;
        }
        // Set variables
        _self.g.turnOnTextBoxToAddText(false);
    },
    onMouseMove: function(e) {
        var _self = systemGraphic;
        _self.g.mMouse.position = _self.g.getPosition();

        if(_self.isDrawArea) {
            var x = _self.g.mMouse.start.x > _self.g.mMouse.position.x ? _self.g.mMouse.position.x : _self.g.mMouse.start.x,
                y = _self.g.mMouse.start.y > _self.g.mMouse.position.y ? _self.g.mMouse.position.y : _self.g.mMouse.start.y,
                w = Math.abs(_self.g.mMouse.start.x - _self.g.mMouse.position.x),
                h = Math.abs(_self.g.mMouse.start.y - _self.g.mMouse.position.y);
            if(!_self.isHolder) {
                if(_self.selectedArea.shape === undefined) { // draw multi select element area
                    _self.selectedArea.shape = _self.g.rect(x, y, w, h).attr(_self.selectedArea.areaSelect);
                } else {
                    _self.selectedArea.shape.attr({
                        x: x,
                        y: y,
                        width: w,
                        height: h
                    }).attr(_self.selectedArea.areaSelect);
                }
            }
        }
    },
    onMouseUp: function(e) {
        var _self = systemGraphic;
        _self.g.mMouse.position = _self.g.getPosition();
        // Reset variables
        _self.isDrawArea = false;
        if(_self.selectedArea.shape !== undefined) {
            // Add equipment
            _self.mObjectEquipments.forEach(function(item) {
                if(PL.keyCode == 17) {
                    if(_self.g.contain(_self.selectedArea.shape, item)) {
                        if(_self.g.isSelectedItem(item)) {
                            _self.g.deSelectedItem(item);
                            item.selectChange(false);
                        } else {
                            _self.mSelectedItems.add(item);
                            item.selectChange(true);
                        }
                    }
                } else {
                    if(_self.g.contain(_self.selectedArea.shape, item)) {
                        if(!_self.g.isSelectedItem(item)) {
                            _self.mSelectedItems.add(item);
                            item.selectChange(true);
                        }
                    }
                }
            });
            // Add text
            _self.mObjectText.forEach(function(item) {
                if(PL.keyCode == 17) {
                    if(_self.g.contain(_self.selectedArea.shape, item)) {
                        if(_self.g.isSelectedItem(item)) {
                            _self.g.deSelectedItem(item);
                            item.selectChange(false);
                        } else {
                            _self.mSelectedItems.add(item);
                            item.selectChange(true);
                        }
                    }
                } else {
                    if(_self.g.contain(_self.selectedArea.shape, item)) {
                        if(!_self.g.isSelectedItem(item)) {
                            _self.mSelectedItems.add(item);
                            item.selectChange(true);
                        }
                    }
                }
            });
            // Remove select area
            _self.selectedArea.shape.remove();
            _self.selectedArea.shape = undefined;
        }
        // Disable Pullout
        if(!_self.currentItem) {
            _self.panel.$.TankSettingsPullout.toggle(false);
            _self.panel.$.ZoneSettingsPullout.toggle(false);
        }
        // Enable textBox
        if(toolIcons.isAddText) {
            // Add Text and Off textBox
            if(!!_self.g.input) {
                if(_self.g.input.value.trim() != '') {
                    _self.g.createText({
                        x: _self.g.input.x,
                        y: _self.g.input.y,
                        text: _self.g.input.value
                    });
                }
            }
            // Edit Text
            if(!!_self.currentItem) {
                if(_self.currentItem.info.objType == OBJECTS.TEXT) {
                    var pan = _self.g.getCurrentPosition();

                    var left = (parseFloat(_self.currentItem.attr('x')) - pan.x) / _self.g.scale - parseInt(_self.g.input.getAttribute('width')) / 2;
                    var top = (parseFloat(_self.currentItem.attr('y')) - pan.y) / _self.g.scale - parseInt(_self.g.input.getAttribute('height')) / 2;

                    _self.g.input.x = parseFloat(_self.currentItem.attr('x'));
                    _self.g.input.y = parseFloat(_self.currentItem.attr('y'));

                    _self.g.input.style.left = left + 'px';
                    _self.g.input.style.top = top + 'px';
                    _self.g.input.style.display = 'block';
                    _self.g.input.value = _self.currentItem.attr('text');
                    _self.g.input.focus();

                    _self.g.removeText(_self.currentItem);
                    _self.currentItem = undefined;
                }
            } else {
                _self.g.turnOnTextBoxToAddText(true);
            }
        }
    },
    //=== Graphics element mouse events ===
    // fn fin
    fIn: function(e) {
        var _self = systemGraphic;
        if(this.info !== null && this.info.objType === OBJECTS.EQUIPMENT) {
            if(_self.g.isSelectedItem(this)) { // item is selecting
                return;
            }
        }
        _self.currentItem = this;
    },
    // fn fout
    fOut: function() {
        var _self = systemGraphic;
        if(this.info !== null && this.info.objType === OBJECTS.EQUIPMENT) {
            if(_self.g.isSelectedItem(this)) { // item is selecting
                return;
            }
        }
        _self.currentItem = undefined;
    },
    // fn onstart
    onStart: function(x, y) {
        var _self = systemGraphic;
        if(!_self.g || (_self.g && !_self.g.verify(this))) {
            return false;
        }
        if(IS_TOUCH) { // If mobile
            var offset = _self.g.getOffset();
            _self.g.mMouse.position = {x: x - offset.left, y: y - offset.top};
        }

        // object equipment and text
        if(this.objType === OBJECTS.EQUIPMENT || this.objType === OBJECTS.TEXT) {
            // Select entities on touch
            if(toolIcons.isSelector) {
                if(PL.keyCode == 16) { // shift key
                    if(!_self.g.isSelectedItem(this)) {
                        _self.mSelectedItems.add(this);
                        this.selectChange(true);
                    }

                    // Move mSelectedItems
                } else if(PL.keyCode == 17) { //  ctrl key
                    if(!_self.g.isSelectedItem(this)) {
                        _self.mSelectedItems.add(this);
                        this.selectChange(true);
                    } else {
                        _self.g.deSelectedItem(this);
                        this.selectChange(false);
                    }

                    // Not Move mSelectedItems
                } else { // Not holding key
                    if(!_self.g.isSelectedItem(this)) {
                        _self.g.deSelectedItems();
                        _self.mSelectedItems.add(this);
                        this.selectChange(true);
                    }

                    // Move mSelectedItems
                }
            } else {
                _self.g.deSelectedItems();
            }
            _self.mSelectedItems.forEach(function(item) {
                item.dx = 0;
                item.dy = 0;
            });
        }

        if(toolIcons.isSelector && this.objType === OBJECTS.CONNECTION) {
            // Select and highlight connector
            if(!(PL.keyCode == 16 || PL.keyCode == 17)) {
                if(!_self.g.isSelectedItem(this)) {
                    _self.g.deSelectedItems();
                    _self.mSelectedItems.add(this);
                    this.selectChange(true);
                }
            }

            // Wire handles
            if(this.points.length >= 4) {
                var pCheck = eCloneArray(this.points);
                pCheck.splice(pCheck.length - 1, 1); // End Point
                pCheck.splice(0, 1); // Start Point

                var point = utils.projectionPointOnPath(this.attr('path'), _self.g.mMouse.position);
                if(point) {
                    var direction = 0,
                        duplicateX = 0, duplicateY = 0,
                        pStart = null, pEnd = null,
                        posMin = 0, posMax = 0;

                    for(var i = 0; i < pCheck.length; i++) {
                        if(parseFloat(pCheck[i].x.toFixed(2)) === point.x) {
                            duplicateX++;
                            if(pStart == null) {
                                pStart = pCheck[i];
                                posMin = i + 1;
                            } else {
                                pEnd = pCheck[i];
                                posMax = i + 1;
                                break;
                            }
                        }
                        if(parseFloat(pCheck[i].y.toFixed(2)) === point.y) {
                            duplicateY++;
                            if(pStart == null) {
                                pStart = pCheck[i];
                                posMin = i + 1;
                            } else {
                                pEnd = pCheck[i];
                                posMax = i + 1;
                                break;
                            }
                        }
                    }

                    if(duplicateX == 2) { // Move x
                        direction = 1;
                    } else if(duplicateY == 2) { // Move y
                        direction = 2;
                    }

                    if(direction > 0) {
                        _self.wireHandles = {};
                        if(direction == 1) {
                            _self.wireHandles = _self.g.rect(point.x - 3, point.y - 5, 6, 10).attr({
                                fill: '#6098eb',
                                stroke: '#033e99',
                                'stroke-width': 1,
                                cursor: 'w-resize'
                            });
                        } else {
                            _self.wireHandles = _self.g.rect(point.x - 5, point.y - 3, 10, 6).attr({
                                fill: '#6098eb',
                                stroke: '#033e99',
                                'stroke-width': 1,
                                cursor: 'w-resize'
                            });
                        }
                        _self.wireHandles.x = parseFloat(_self.wireHandles.attr('x'));
                        _self.wireHandles.y = parseFloat(_self.wireHandles.attr('y'));
                        _self.wireHandles.point = point;
                        _self.wireHandles.posMin = posMin;
                        _self.wireHandles.posMax = posMax;
                        _self.wireHandles.start = {
                            x: this.points[posMin].x,
                            y: this.points[posMin].y
                        };
                        _self.wireHandles.end = {
                            x: this.points[posMax].x,
                            y: this.points[posMax].y
                        };
                        _self.wireHandles.direction = direction;
                    }
                }
            }
        }

        // Set position
        if(toolIcons.isConnector) {
            _self.dummy.attr({x: _self.g.mMouse.position.x, y: _self.g.mMouse.position.y});
            _self.dummy.x = parseFloat(_self.dummy.attr('x'));
            _self.dummy.y = parseFloat(_self.dummy.attr('y'));
        }

        // Check change connection
        if(toolIcons.isConnector && this.objType === OBJECTS.CONNECTION) {
            var objFrom = this.info.objFrom,
                objTo = this.info.objTo,
                holderFrom = _self.getHolderByType(objFrom.holders, CONNECTION_TYPES.OUTPUT),
                holderTo = _self.getHolderByType(objTo.holders, CONNECTION_TYPES.INPUT);
            _self.isMulti = true;

            _self.mTempFromConnection = new Connection();
            _self.mTempFromConnection.color = _self.configs.connectorColor;
            _self.mTempFromConnection.from = objFrom.info.id;
            _self.mTempFromConnection.fromHolder = holderFrom.info.id;
            _self.mTempFromConnection.objFrom = objFrom;
            _self.mTempFromConnection.to = _self.dummy.id;
            _self.mTempFromConnection.toHolder = -1;
            _self.mTempFromConnection.objTo = _self.dummy;

            _self.mTempToConnection = new Connection();
            _self.mTempToConnection.color = _self.configs.connectorColor;
            _self.mTempToConnection.from = _self.dummy.id;
            _self.mTempToConnection.fromHolder = -1;
            _self.mTempToConnection.objFrom = _self.dummy;
            _self.mTempToConnection.to = objTo.info.id;
            _self.mTempToConnection.toHolder = holderTo.info.id;
            _self.mTempToConnection.objTo = objTo;

            _self.mObjectConnections.add(_self.createConnection(_self.mTempFromConnection));
            _self.mObjectConnections.add(_self.createConnection(_self.mTempToConnection));
        }

        // Start draw connection
        if(toolIcons.isConnector && this.objType === OBJECTS.HOLDER && this.port === CONNECTION_TYPES.OUTPUT) { // object holder
            _self.isHolder = true;
            _self.mCurrentConnection = new Connection();
            _self.mCurrentConnection.color = _self.configs.connectorColor;
            _self.mCurrentConnection.from = this.info.parent.id;
            _self.mCurrentConnection.objFrom = this.parentNode;
            _self.mCurrentConnection.fromHolder = this.info.id;
            _self.mCurrentConnection.to = _self.dummy.id;
            _self.mCurrentConnection.toHolder = -1;

            _self.mObjectConnections.add(_self.createConnection(_self.mCurrentConnection));
        }

        // Set variables
        _self.currentItem = this;
    },
    // fn onmove
    onMove: function(dx, dy) {
        var _self = systemGraphic;
        if(!_self.g || (_self.g && !_self.g.verify(this))) {
            return false;
        }

        dx = dx * _self.g.scale;
        dy = dy * _self.g.scale;

        if(toolIcons.isConnector) {
            _self.dummy.attr({x: _self.dummy.x + dx, y: _self.dummy.y + dy});

            if(IS_TOUCH) {// check position on touch
                _self.g.mMouse.position = {x: _self.dummy.x + dx, y: _self.dummy.y + dy};
            }
        }

        if(!_self.isHolder && !_self.isMulti) {
            if(toolIcons.isSelector && PL.keyCode != 17) { // != crl key
                _self.mSelectedItems.forEach(function(item) {
                    // Transform item
                    if(item.objType === OBJECTS.EQUIPMENT) {
                        item.transform('T' + dx + ',' + dy);
                        for(var i = 0; i < item.length; i++) {
                            item.paperSet[i].transform('R' + item.angle + (!item.info.animation.flip ? 'S1,1' : 'S-1,1') + 'T' + dx + ',' + dy);
                        }
                        item.holders.transform('R' + item.angle + ',' + item.cx + ',' + item.cy + (!item.info.animation.flip ? 'S1,1' : 'S-1,1') + 'T' + dx + ',' + dy);
                        if(item.badge) {
                            item.badge.transform('T' + dx + ',' + dy);
                        }
                        _self.handlePositionHolder(item);
                        _self.invalidateConnections(item);
                    } else if(item.objType === OBJECTS.TEXT) {
                        item.transform('R' + item.angle + 'T' + dx + ',' + dy);
                    }
                    item.dx = dx;
                    item.dy = dy;
                });
            }
        } else {
            _self.invalidateConnections();
        }

        // When selecting a connector between equipment icons, make moveable handles visible, allow user to move connector segments
        if(toolIcons.isSelector && this.objType === OBJECTS.CONNECTION) {
            if(_self.wireHandles) {
                var start = {
                    x: this.points[_self.wireHandles.posMin - 1].x,
                    y: this.points[_self.wireHandles.posMin - 1].y
                };
                var end = {
                    x: this.points[_self.wireHandles.posMax + 1].x,
                    y: this.points[_self.wireHandles.posMax + 1].y
                };

                if(_self.wireHandles.direction == 1) { // Move x
                    if(start.x > end.x) {
                        var temp = {
                            x: start.x,
                            y: start.y
                        };

                        start.x = end.x;
                        start.y = end.y;

                        end.x = temp.x;
                        end.y = temp.y;
                    }


                    var path = _self.g.paper.cornerRadius(this.points, 5);
                    this.parentNode.line1.attr('path', path);
                    this.parentNode.line2.attr('path', path);
                    this.parentNode.mask.attr('path', path);

                    _self.wireHandles.attr({
                        x: _self.wireHandles.x + dx
                    });
                } else if(_self.wireHandles.direction == 2) { // Move y
                    if(start.y > end.y) {
                        var temp = {
                            x: start.x,
                            y: start.y
                        };

                        start.x = end.x;
                        start.y = end.y;

                        end.x = temp.x;
                        end.y = temp.y;
                    }

                    this.points[_self.wireHandles.posMin].y = _self.wireHandles.start.y + dy;
                    this.points[_self.wireHandles.posMax].y = _self.wireHandles.start.y + dy;

                    var path = _self.g.paper.cornerRadius(this.points, 5);
                    this.parentNode.line1.attr('path', path);
                    this.parentNode.line2.attr('path', path);
                    this.parentNode.mask.attr('path', path);

                    _self.wireHandles.attr({
                        y: _self.wireHandles.y + dy
                    });
                }
            }
        }

        // Check focus holder
        if(toolIcons.isConnector) {
            _self.focusHolderConnection();
        }
    },
    // fn onend
    onEnd: function(e) {
        var _self = systemGraphic;

        if(!_self.g || (_self.g && !_self.g.verify(this))) {
            return false;
        }

        if(toolIcons.isSelector && (this.objType === OBJECTS.EQUIPMENT || this.objType === OBJECTS.TEXT)) {
            _self.mSelectedItems.forEach(function(item) {
                if(item.objType === OBJECTS.EQUIPMENT) {
                    // Handle image
                    for(var i = 0; i < item.length; i++) {
                        item.paperSet[i].attr({
                            x: parseFloat(item.paperSet[i].attr('x')) + item.dx,
                            y: parseFloat(item.paperSet[i].attr('y')) + item.dy
                        });
                    }
                    for(var i = 0; i < item.length; i++) {
                        item.paperSet[i].transform('R' + item.angle + (!item.info.animation.flip ? 'S1,1' : 'S-1,1') + 'T0,0');
                    }
                    // Handle holder
                    var bb = item.paperSet[item.length - 1].getBBox();
                    item.cx = bb.cx;
                    item.cy = bb.cy;
                    for(var i = 0; i < item.holders.length; i++) {
                        item.holders[i].attr({
                            x: parseFloat(item.holders[i].attr('x')) + item.dx,
                            y: parseFloat(item.holders[i].attr('y')) + item.dy
                        });
                    }

                    item.holders.transform('T0,0');
                    item.holders.transform('R' + item.angle + ',' + item.cx + ',' + item.cy + (!item.info.animation.flip ? 'S1,1' : 'S-1,1') + 'T0,0');

                    _self.handlePositionMask(item);
                } else if(item.objType === OBJECTS.TEXT) {
                    item.attr({
                        x: parseFloat(item.attr('x')) + item.dx,
                        y: parseFloat(item.attr('y')) + item.dy
                    });
                    item.transform('R' + item.angle + 'T0,0');
                    item.info.x = parseFloat(item.attr('x'));
                    item.info.y = parseFloat(item.attr('y'));
                }

                // Add stack list
                STACK_LIST.addStack(_self.currentTagName, _self.panel.name, STACK_TYPES.SVG, STACK_METHODS.MOVE, item, {
                    dx: item.dx,
                    dy: item.dy
                });
            });
            _self.g.calculateFitSize(_self.mEquipments, _self.availableSize, _self.g.behindNode);
        }

        // End draw connection
        if(toolIcons.isConnector && (this.objType === OBJECTS.HOLDER && this.port === CONNECTION_TYPES.OUTPUT) || (_self.isMulti && this.objType === OBJECTS.CONNECTION)) {
            _self.deleteConnectionDummy();
            if(IS_TOUCH) {
                var offset = _self.g.getOffset();
                _self.g.mMouse.position = {
                    x: e.changedTouches[0].pageX - offset.left,
                    y: e.changedTouches[0].pageY - offset.top
                };
            }
            _self.activeConnection();
        }

        // Reset variables
        if(toolIcons.isSelector && this.objType === OBJECTS.CONNECTION) {
            if(_self.wireHandles) {
                _self.wireHandles.remove();
                _self.wireHandles = undefined;
            }
        }
        _self.currentItem = undefined;

        // Remove holder highlight
        for(var i = 0; i < _self.holderHighlight.length; i++) {
            _self.holderHighlight[i].attr({
                filter: 'none'
            });
        }
        _self.holderHighlight = [];
    },
    // fn doubleClick
    onDblClick: function() {
        var _self = systemGraphic;
        if(this.objType === OBJECTS.EQUIPMENT) {
            if(toolIcons.isSelector && PL.keyCode != 16 && PL.keyCode != 17) {
                switch(this.info.type) {
                    case EQUIPMENT_TYPES.ZONE:
                    {
                        _self.panel.$.TankSettingsPullout.toggle(false);
                        _self.panel.$.ZoneSettingsPullout.toggle(true);
                        break;
                    }
                    default:
                    {
                        _self.panel.$.ZoneSettingsPullout.toggle(false);
                        _self.panel.$.TankSettingsPullout.toggle(true);
                        break;
                    }
                }
            }
        }
    },
    // Select equipments by object
    selectEquipmentsByObject: function(object) {
        var _self = systemGraphic;
        this.g.deSelectedItems();
        this.mObjectEquipments.forEach(function(item) {
            if(item.info.svg === object.svg) {
                _self.mSelectedItems.add(item);
                item.selectChange(true);
            }
        });
    },
    // fn delete selected items
    deleteSelectedItems: function() {
        var _self = systemGraphic;
        if(this.mSelectedItems.count != 0) {
            this.mSelectedItems.forEach(function(item) {
                switch(item.objType) {
                    case OBJECTS.EQUIPMENT:
                    {
                        // Add stack list
                        STACK_LIST.addStack(_self.currentTagName, _self.panel.name, STACK_TYPES.SVG, STACK_METHODS.REMOVE, item, {
                            total: item.total,
                            angle: item.angle
                        });
                        _self.removeEquipment(item);
                        break;
                    }
                    case OBJECTS.CONNECTION:
                    {
                        // Add stack list
                        STACK_LIST.addStack(_self.currentTagName, _self.panel.name, STACK_TYPES.SVG, STACK_METHODS.REMOVE, item.info);
                        _self.removeConnection(item);
                        break;
                    }
                    case OBJECTS.TEXT:
                    {
                        // Add stack list
                        STACK_LIST.addStack(_self.currentTagName, _self.panel.name, STACK_TYPES.SVG, STACK_METHODS.REMOVE, item.info);
                        _self.g.removeText(item);
                        break;
                    }
                }
            });
            // Reset
            this.mSelectedItems = new Collection();
            // Off setting
            this.panel.$.TankSettingsPullout.toggle(false);
            this.panel.$.ZoneSettingsPullout.toggle(false);
        }
        return false;
    },
    // fn draw entity
    drawEquipment: function(object) {
        var _self = systemGraphic;
        var paperSet = _self.g.group();
        var image = _self.g.image(object.svg, object.x, object.y, object.width, object.height);
        paperSet.add(image);

        // Fix scale for chrome browser
        image.node.style.zoom = 2;

        var path = 'M' + object.x + ',' + object.y +
            'L' + object.x + ',' + object.y + // R translate
            'L' + (object.x + object.width) + ',' + object.y + // R translate
            'L' + (object.x + object.width) + ',' + (object.y + object.height) + // R translate
            'L' + (object.x + object.width) + ',' + (object.y + object.height) +
            'L' + (object.x) + ',' + (object.y + object.height) +
            'Z';

        var shape = _self.g.path(path).attr({
            'fill-opacity': 0.001,
            fill: '#ffffff',
            stroke: '#ffffff',
            'stroke-width': 0.001
        });
        shape.id = object.id;
        shape.info = object;
        shape.objType = OBJECTS.EQUIPMENT;
        shape.paperSet = paperSet;
        shape.length = 1;
        shape.total = 1;
        shape.angle = 0;
        shape.cx = shape.getBBox().cx;
        shape.cy = shape.getBBox().cy;

        var holders = _self.g.group();

        // Add holder
        var holderArray = object.holders;
        for(var i = 0; i < holderArray.length; i++) {
            var hd = holderArray[i];
            var x = 0, y = 0;

            if(hd.direct == 1 || hd.direct == 11) {
                x = object.x + hd.offset;
                y = object.y - _self.configs.holderSize + _self.configs.offsetHolder;
            } else if(hd.direct == 12) {
                x = (object.x + object.width - _self.configs.holderSize) - hd.offset;
                y = object.y - _self.configs.holderSize + _self.configs.offsetHolder;
            } else if(hd.direct == 2 || hd.direct == 21) {
                x = object.x + object.width - _self.configs.offsetHolder;
                y = object.y + hd.offset;
            } else if(hd.direct == 22) {
                x = object.x + object.width - _self.configs.offsetHolder;
                y = (object.y + object.height - _self.configs.holderSize) - hd.offset;
            } else if(hd.direct == 3 || hd.direct == 31) {
                x = (object.x + object.width - _self.configs.holderSize) - hd.offset;
                y = object.y + object.height - _self.configs.offsetHolder;
            } else if(hd.direct == 32) {
                x = object.x + hd.offset;
                y = object.y + object.height - _self.configs.offsetHolder;
            } else if(hd.direct == 4 || hd.direct == 41) {
                x = (object.x - _self.configs.holderSize) + _self.configs.offsetHolder;
                y = object.y + hd.offset;
            } else if(hd.direct == 42) {
                x = (object.x - _self.configs.holderSize) + _self.configs.offsetHolder;
                y = (object.y + object.height - _self.configs.holderSize) - hd.offset;
            }
            
            // Hack fix for solar opposite routing issue
            if (hd.method === "in-bottom-top" && object.svg === "assets/images/equipments/solar-thermal/solar-thermal-panel.svg") {
                hd.type = "output";   
            }
            
            if (hd.method === "out-bottom-top" && object.svg === "assets/images/equipments/solar-thermal/solar-thermal-panel.svg") {
                hd.type = "input";   
            }

            holders.add(
                _self.drawHolder({
                    id: hd.id,
                    direct: hd.direct,
                    x: x,
                    y: y,
                    method: hd.method,
                    type: hd.type,
                    parent: object,
                    shape: shape
                }));
        }
        holders.length = holderArray.length;
        // End add

        shape.holders = holders;
        shape.selectChange = function(flag) {
            if(flag) {
                this.paperSet.attr({
                    filter: 'url(#' + _self.currentTagName + '_highlight)'
                });
                //this.paperSet.node.setAttribute('filter', 'url(#' + _self.currentTagName + '_highlight)');
            } else {
                this.paperSet.attr({
                    filter: 'none'
                });
                //this.paperSet.node.removeAttribute('filter');
            }
        };

        if(IS_TOUCH) { // On Mobile
            shape.touchstart(_self.onDblClick);
        } else { // On Desktop
            shape.dblclick(_self.onDblClick);
        }

        if(!IS_TOUCH) {
            shape.hover(_self.fIn, _self.fOut);
        }

        shape.drag(_self.onMove, _self.onStart, _self.onEnd);

        // All item related
        var contains = _self.g.group();
        contains.attr({
            id: 'svg-system-group-equipment-' + object.id,
            classes: 'svg-system-group-equipment'
        });
        contains.add(paperSet, shape, holders);

        shape.contains = contains;

        return shape;
    },
    // Draw Flip Equipment
    drawFlip: function() {
        var _self = systemGraphic;
        this.mSelectedItems.forEach(function(item) {
            if(item.info.objType === OBJECTS.EQUIPMENT) {
                for(var i = 0; i < item.length; i++) {
                    item.paperSet[i].transform('R' + item.angle + (!item.info.animation.flip ? 'S-1,1' : 'S1,1') + 'T0,0');
                }

                // Fix zone manifold flip
                //if(item.info.kind === 'zone-manifold') {
                //    if(item.info.animation.rotate === 0) {
                //        if(!item.info.animation.flip) {
                //            item.holders.transform('R' + item.angle + ',' + item.cx + ',' + item.cy + (!item.info.animation.flip ? 'S-1,1' : 'S1,1') + 'T75,0');
                //        } else {
                //            item.holders.transform('R' + item.angle + ',' + item.cx + ',' + item.cy + (!item.info.animation.flip ? 'S-1,1' : 'S1,1') + 'T0,0');
                //        }
                //    } else if(item.info.animation.rotate === 1) {
                //        if(!item.info.animation.flip) {
                //            item.holders.transform('R' + item.angle + ',' + item.cx + ',' + item.cy + (!item.info.animation.flip ? 'S-1,1' : 'S1,1') + 'T0,-75');
                //        } else {
                //            item.holders.transform('R' + item.angle + ',' + item.cx + ',' + item.cy + (!item.info.animation.flip ? 'S-1,1' : 'S1,1') + 'T0,0');
                //        }
                //    } else if(item.info.animation.rotate === 2) {
                //        if(!item.info.animation.flip) {
                //            item.holders.transform('R' + item.angle + ',' + item.cx + ',' + item.cy + (!item.info.animation.flip ? 'S-1,1' : 'S1,1') + 'T-75,0');
                //        } else {
                //            item.holders.transform('R' + item.angle + ',' + item.cx + ',' + item.cy + (!item.info.animation.flip ? 'S-1,1' : 'S1,1') + 'T0,0');
                //        }
                //
                //    } else if(item.info.animation.rotate === 3) {
                //        if(!item.info.animation.flip) {
                //            item.holders.transform('R' + item.angle + ',' + item.cx + ',' + item.cy + (!item.info.animation.flip ? 'S-1,1' : 'S1,1') + 'T0,75');
                //        } else {
                //            item.holders.transform('R' + item.angle + ',' + item.cx + ',' + item.cy + (!item.info.animation.flip ? 'S-1,1' : 'S1,1') + 'T0,0');
                //        }
                //    } else {
                //        item.holders.transform('R' + item.angle + ',' + item.cx + ',' + item.cy + (!item.info.animation.flip ? 'S-1,1' : 'S1,1') + 'T0,0');
                //    }
                //} else {
                //    item.holders.transform('R' + item.angle + ',' + item.cx + ',' + item.cy + (!item.info.animation.flip ? 'S-1,1' : 'S1,1') + 'T0,0');
                //}

                item.holders.transform('R' + item.angle + ',' + item.cx + ',' + item.cy + (!item.info.animation.flip ? 'S-1,1' : 'S1,1') + 'T0,0');

                item.info.animation.flip = !item.info.animation.flip;
                _self.handlePositionMask(item);
                _self.invalidateConnections(item);
                // Add stack list
                STACK_LIST.addStack(_self.currentTagName, _self.panel.name, STACK_TYPES.SVG, STACK_METHODS.FLIP, item);
            }
        });
    },
    // fn draw holder
    drawHolder: function(options) {
        var holder = this.g.image('assets/images/connectors/' + options.method + '.svg', options.x, options.y, this.configs.holderSize, this.configs.holderSize).attr({
            opacity: .001
        });
        holder.id = options.id;
        holder.info = {
            id: options.id,
            direct: options.direct,
            parent: options.parent,
            pos: options.pos,
            type: options.type || 'none', // in/out
            objType: OBJECTS.HOLDER
        };
        holder.direct = options.direct;
        holder.objType = OBJECTS.HOLDER;
        holder.parentNode = options.shape;
        holder.port = options.type;
        var bb = holder.getBBox();
        holder.bb = {
            x: bb.x,
            x2: bb.x2,
            y: bb.y,
            y2: bb.y2,
            cx: bb.cx,
            cy: bb.cy,
            width: bb.width,
            height: bb.height
        };
        holder.drag(this.onMove, this.onStart, this.onEnd);

        return holder;
    },
    // fn draw parallel
    drawParallel: function(shape) {
        var _self = systemGraphic;

        if(shape.total < this.configs.layerTotal) {
            var childSet = shape.paperSet[shape.length - 1].clone();
            childSet.attr({
                x: parseFloat(childSet.attr('x')) + this.configs.offsetSpace * shape.length,
                y: parseFloat(childSet.attr('y')) + this.configs.offsetSpace * shape.length,
                opacity: (1 - 0.25 * shape.length)
            });
            childSet.transform('R' + shape.angle + (!shape.info.animation.flip ? 'S1,1' : 'S-1,1') + 'T0,0');

            shape.paperSet.prepend(childSet);
            shape.length++;
            shape.selectChange(true);

            // Reset mask
            _self.handlePositionMask(shape);
            _self.invalidateConnections(shape);

            _self.g.calculateFitSize(_self.mEquipments, _self.availableSize, _self.g.behindNode);
            _self.calculateKind();
        }

        // Create badge
        if(shape.total < this.configs.layerTotal || shape.total < this.configs.badgeTotal) {
            shape.total++;

            var bb = shape.getBBox();
            if(!shape.badge) {
                var circle = this.g.circle(bb.x, bb.y, this.configs.badgeRadius).attr({
                    stroke: 'none',
                    fill: '#E53944'
                });
                var text = this.g.text(bb.x, bb.y, shape.total).attr({
                    fill: '#FFFFFF',
                    'font-size': this.configs.badgeTextSize,
                    'font-weight': 'bold'
                });
                text.attr({
                    x: bb.x - text.getBBox().width / 2,
                    y: bb.y + this.configs.badgeTextTop
                });
                shape.badge = this.g.group();
                shape.badge.add(circle, text);
            } else {
                var text = shape.badge[1];
                text.node.innerHTML = shape.total;
                text.attr({
                    x: bb.x - text.getBBox().width / 2,
                    y: bb.y + this.configs.badgeTextTop
                })
            }

            // Add stack
            STACK_LIST.addStack(_self.currentTagName, _self.panel.name, STACK_TYPES.SVG, STACK_METHODS.PARALLEL, shape);
        }

        // Save To Info
        shape.info.parallel = shape.total - 1;
    },
    // fn create entity
    createEquipment: function(options, undo) {
        var _self = systemGraphic;

        if(undo !== true) {
            options.x = options.x * _self.g.scale + _self.g.getCurrentPosition().x;
            options.y = options.y * _self.g.scale + _self.g.getCurrentPosition().y;
        }

        var equip = new Equipment(options);
        _self.mEquipments.add(equip, true);

        var shape = _self.drawEquipment(equip);
        _self.mObjectEquipments.add(shape);

        // Add stack item
        STACK_LIST.addStack(_self.currentTagName, _self.panel.name, STACK_TYPES.SVG, STACK_METHODS.CREATE, shape);

        _self.g.calculateFitSize(_self.mEquipments, _self.availableSize, _self.g.behindNode);
        _self.calculateKind();

        return shape;
    },
    // fn create a new connection between entities
    createConnection: function(info) {
        var _self = systemGraphic,
            start, end;

        if(info.from != _self.dummy.id && info.to != _self.dummy.id) {
            // draw: 2 entities
            start = _self.mObjectEquipments.itemByID(info.from);
            end = _self.mObjectEquipments.itemByID(info.to);
        } else if(info.to == _self.dummy.id) {
            // draw from dummy
            start = _self.mObjectEquipments.itemByID(info.from);
            end = _self.dummy;
            // get start: dummy, end: entity
        } else if(info.from == _self.dummy.id) {
            // draw to dummy
            start = _self.dummy;
            end = _self.mObjectEquipments.itemByID(info.to);
            // get start: entity, end: dummy
        } else if(!!info.from && !!info.to) {
            start = _self.mObjectEquipments.itemByID(info.from);
            end = _self.mObjectEquipments.itemByID(info.to);
        }

        var conn = _self.g.connection(start, end, info);
        if(!conn) return false;

        conn.objType = OBJECTS.CONNECTION;
        conn.id = info.id;
        conn.mask.id = info.id;
        conn.mask.info = info;
        conn.mask.objType = OBJECTS.CONNECTION;

        if(!IS_TOUCH) {
            conn.mask.hover(_self.fIn, _self.fOut);
        }
        conn.mask.drag(_self.onMove, _self.onStart, _self.onEnd);

        // Add stack list
        STACK_LIST.addStack(_self.currentTagName, _self.panel.name, STACK_TYPES.SVG, STACK_METHODS.CREATE, conn);

        return conn;
    },
    // check connection is exiting
    checkConnectionExiting: function(connect) {
        for(var i = 0; i < this.mConnections.count; i++) {
            if(this.mConnections.item(i).from === connect.from && this.mConnections.item(i).to === connect.to) {
                return true;
            }
        }
        return false;
    },
    // fn delete connection dummy
    deleteConnectionDummy: function() {
        var _self = systemGraphic;
        this.mObjectConnections.forEach(function(conn) {
            if(conn.info.to == _self.dummy.id || conn.info.from == _self.dummy.id) {
                _self.removeConnection(conn);
            }
        });
    },
    // fn invalidate connections when drag-drop entity
    invalidateConnections: function(entity) {
        var _self = systemGraphic;
        this.mObjectConnections.forEach(function(conn) {
            if(entity) {
                if(conn.info.from === entity.info.id || conn.info.to === entity.info.id) {
                    _self.g.connection(conn);
                }
            } else {
                if(conn.info.from === -1000 || conn.info.to === -1000) {
                    _self.g.connection(conn);
                }
            }
        });
    },
    // create or change connection-line
    activeConnection: function() {
        var _self = systemGraphic;
        for(var index = 0; index < _self.mObjectEquipments.count; index++) {
            var item = _self.mObjectEquipments.collection[index];
            // isHolder create connection
            if(_self.isHolder && _self.mCurrentConnection.from != item.info.id) {
                for(var i = 0; i < item.holders.length; i++) {
                    if(item.holders[i].port === CONNECTION_TYPES.INPUT) {
                        var bb = item.holders[i].bb;
                        var min = {x: bb.x, y: bb.y},
                            max = {x: bb.x + bb.width, y: bb.y + bb.height};
                        if(
                            (min.x - _self.configs.holderDistance < _self.g.mMouse.position.x && _self.g.mMouse.position.x < max.x + _self.configs.holderDistance)
                            &&
                            (min.y - _self.configs.holderDistance < _self.g.mMouse.position.y && _self.g.mMouse.position.y < max.y + _self.configs.holderDistance)
                        ) {
                            _self.mCurrentConnection.to = item.info.id;
                            _self.mCurrentConnection.toHolder = item.holders[i].info.id;
                            _self.mCurrentConnection.objTo = item;
                            if(!_self.checkConnectionExiting(_self.mCurrentConnection)) {
                                _self.mConnections.add(_self.mCurrentConnection, true);
                                _self.mObjectConnections.add(_self.createConnection(_self.mCurrentConnection));
                            }
                        break;
                        }
                    }
                }
            }
            // Create two connection
            if(_self.isMulti) {
                // Create from equipment to drag
                if(_self.mTempFromConnection.from != item.info.id) {
                    for(var i = 0; i < item.holders.length; i++) {
                        if(item.holders[i].port === CONNECTION_TYPES.INPUT) {
                            var bb = item.holders[i].bb;
                            var min = {x: bb.x, y: bb.y},
                                max = {x: bb.x + bb.width, y: bb.y + bb.height};
                            if(
                                (min.x - _self.configs.holderDistance < _self.g.mMouse.position.x && _self.g.mMouse.position.x < max.x + _self.configs.holderDistance)
                                &&
                                (min.y - _self.configs.holderDistance < _self.g.mMouse.position.y && _self.g.mMouse.position.y < max.y + _self.configs.holderDistance)
                            ) {
                                _self.mTempFromConnection.to = item.info.id;
                                _self.mTempFromConnection.toHolder = item.holders[i].info.id;
                                _self.mTempFromConnection.objTo = item;
                                if(!_self.checkConnectionExiting(_self.mTempFromConnection)) {
                                    _self.mConnections.add(_self.mTempFromConnection, true);
                                    _self.mObjectConnections.add(_self.createConnection(_self.mTempFromConnection));
                                }
                            break;
                            }
                        }
                    }
                }
                // Create from drag to equipment
                if(_self.mTempToConnection.from != item.info.id) {
                    for(var i = 0; i < item.holders.length; i++) {
                        if(item.holders[i].port === CONNECTION_TYPES.INPUT) {
                            var bb = item.holders[i].bb,
                                min = {x: bb.x, y: bb.y},
                                max = {x: bb.x + bb.width, y: bb.y + bb.height},
                                holder = _self.getHolderByType(item.holders, CONNECTION_TYPES.OUTPUT);
                            if(
                                (min.x - _self.configs.holderDistance < _self.g.mMouse.position.x && _self.g.mMouse.position.x < max.x + _self.configs.holderDistance)
                                &&
                                (min.y - _self.configs.holderDistance < _self.g.mMouse.position.y && _self.g.mMouse.position.y < max.y + _self.configs.holderDistance)
                            ) {
                                _self.mTempToConnection.from = item.info.id;
                                _self.mTempToConnection.fromHolder = holder.info.id;
                                _self.mTempToConnection.objFrom = item;
                                if(!_self.checkConnectionExiting(_self.mTempToConnection)) {
                                    _self.mConnections.add(_self.mTempToConnection, true);
                                    _self.mObjectConnections.add(_self.createConnection(_self.mTempToConnection));
                                }
                            break;
                            }
                        }
                    }
                }
            }
        }
        _self.isHolder = _self.isMulti = false;
    },
    // fn focus holder connection if mouse in area
    focusHolderConnection: function() {
        var _self = systemGraphic;
        for(var index = 0; index < _self.mObjectEquipments.count; index++) {
            var item = _self.mObjectEquipments.collection[index];
            if(_self.mCurrentConnection.from != item.info.id) { // Check node root
                for(var i = 0; i < item.holders.length; i++) {
                    if(item.holders[i].port === CONNECTION_TYPES.INPUT) {
                        var bb = item.holders[i].bb;
                        var min = {x: bb.x, y: bb.y},
                            max = {x: bb.x + bb.width, y: bb.y + bb.height};
                        if(
                            (min.x - _self.configs.holderDistance < _self.g.mMouse.position.x && _self.g.mMouse.position.x < max.x + _self.configs.holderDistance)
                            &&
                            (min.y - _self.configs.holderDistance < _self.g.mMouse.position.y && _self.g.mMouse.position.y < max.y + _self.configs.holderDistance)
                        ) {
                            // Not check existing
                            item.holders[i].attr({
                                filter: 'url(#' + _self.currentTagName + '_highlight)'
                            });
                            _self.holderHighlight.push(item.holders[i]);
                        } else {
                            item.holders[i].attr({
                                filter: 'none'
                            });
                        }
                    }
                }
            }
        }
    },
    // fn create parallel
    createParallel: function() {
        for(var i = 0; i < this.mSelectedItems.count; i++) {
            if(this.mSelectedItems.item(i).objType === OBJECTS.EQUIPMENT) {
                this.drawParallel(this.mSelectedItems.item(i));
            }
        }
    },
    // Remove connection
    removeConnection: function(item) {
        this.mConnections.remove(item);

        this.mObjectConnections.forEach(function(conn) {
            if(conn.id === item.id) {
                conn.line1.remove();
                conn.line2.remove();
                conn.mask.remove();
                if(!!conn.lineStart) {
                    conn.lineStart.line1.remove();
                    conn.lineStart.line2.remove();
                    conn.lineStart.mask.remove();
                }
                if(!!conn.lineEnd) {
                    conn.lineEnd.line1.remove();
                    conn.lineEnd.line2.remove();
                    conn.lineEnd.mask.remove();
                }
            }
        });
        this.mObjectConnections.remove(item);
    },
    // Remove Equipment
    removeEquipment: function(item) {
        var _self = systemGraphic;

        _self.mEquipments.remove(item);
        _self.mObjectEquipments.forEach(function(shape) {
            if(shape === item) {
                // Remove connections
                for(var i = _self.mConnections.count - 1; i >= 0; i--) {
                    var conn = _self.mConnections.item(i);
                    if(conn.from == item.id || conn.to == item.id) {
                        // Remove connection
                        _self.mConnections.remove(conn);
                        _self.removeConnection(conn);
                    }
                }
                // Remove holders
                shape.holders.remove();
                shape.paperSet.remove();
                if(shape.badge) shape.badge.remove();
                shape.remove();
            }
        });
        _self.mObjectEquipments.remove(item);

        _self.g.calculateFitSize(_self.mEquipments, _self.availableSize, _self.g.behindNode);
        _self.calculateKind();
    },
    // Recovery Equipment after remove
    recoveryEquipment: function(shape) {
        var _self = systemGraphic;

        _self.g.add(shape.paperSet);
        _self.g.add(shape);
        _self.g.add(shape.holders);
        _self.mEquipments.add(shape.info);
        _self.mObjectEquipments.add(shape);
        shape.removed = false;

        _self.g.calculateFitSize(_self.mEquipments, _self.availableSize, _self.g.behindNode);
        _self.calculateKind();
    },
    // Total number of each equipment kind
    calculateKind: function() {
        //// Clear data
        //for(var key in this.availableKind) {
        //    this.availableKind[key] = 0;
        //}
        //// Set data
        //for(var i = 0; i < this.mObjectEquipments.count; i++) {
        //    if(this.availableKind[this.mObjectEquipments.item(i).info.kind] == undefined) {
        //        this.availableKind[this.mObjectEquipments.item(i).info.kind] = this.mObjectEquipments.item(i).length;
        //    } else {
        //        this.availableKind[this.mObjectEquipments.item(i).info.kind] += this.mObjectEquipments.item(i).length;
        //    }
        //}
        //// Transmission
        //for(var key in this.availableKind) {
        //    Signals.send('onBadge', {kind: key, value: this.availableKind[key]});
        //}
    },
    // Calculator cx, cy for holder
    handlePositionHolder: function(item) {
        for(var i = 0; i < item.holders.length; i++) {
            item.holders[i].transform(item.holders.matrix);
            var bb = item.holders[i].getBBox();
            item.holders[i].bb = {
                x: bb.x,
                x2: bb.x2,
                y: bb.y,
                y2: bb.y2,
                cx: bb.cx,
                cy: bb.cy,
                width: bb.width,
                height: bb.height
            };
            item.holders[i].transform('R0S1,1T0,0');
        }
    },
    // fn fix mask for equipment and update info
    handlePositionMask: function(item) {
        var start = item.paperSet[item.length - 1],
            bb = item.paperSet.getBBox(),
            bbItem = start.getBBox();

        // Position
        var path = 'M' + bb.x + ',' + (bb.y2 - bbItem.height) +
            'L' + bb.x + ',' + bb.y2 +
            'L' + (bb.x + bbItem.width) + ',' + bb.y2 +
            'L' + bb.x2 + ',' + (bb.y + bbItem.height) +
            'L' + bb.x2 + ',' + bb.y +
            'L' + (bb.x2 - bbItem.width) + ',' + bb.y +
            'Z';
        item.attr({path: path});
        item.transform('R0T0,0');

        var bb = item.getBBox();
        item.info.x = parseFloat(start.attr('x'));
        item.info.y = parseFloat(start.attr('y'));
        item.info.width = parseFloat(start.attr('width'));
        item.info.height = parseFloat(start.attr('height'));

        if(item.badge) {
            var circle = item.badge[0],
                text = item.badge[1];
            circle.attr({
                cx: bb.x,
                cy: bb.y
            });
            text.attr({
                x: bb.x - text.getBBox().width / 2,
                y: bb.y + this.configs.badgeTextTop
            });
            item.badge.transform('T0,0');
        }

        this.handlePositionHolder(item);
    },
    // turn on active create and change connection-lines
    turnOnHolderOfEntity: function(turnOn) {
        this.mObjectEquipments.forEach(function(item) {
            for(var i = 0; i < item.holders.length; i++) {
                var holder = item.holders[i];
                if(turnOn) {
                    holder.attr({
                        opacity: 1
                    });
                } else {
                    holder.attr({
                        opacity: .001
                    });
                }
            }
        });
    },
    getHolderByType: function(holders, type) {
        for(var i = 0; i < holders.length; i++) {
            if(holders[i].info.type === type) {
                return holders[i];
            }
        }
        return false;
    },
    setSize: function(width, height) {
        this.width = width;
        this.height = height;
        if(this.loaded) {
            this.g.setSize(width, height);
        }
    },
    // Align
    alignObjects: function(align) {
        var _self = systemGraphic;

        // Check count object
        if(this.mSelectedItems.count <= 1) return;

        // Position
        var start = this.mSelectedItems.item(0).getBBox();
        for(var i = 1; i < this.mSelectedItems.count; i++) {
            var item = this.mSelectedItems.item(i);
            var end = item.getBBox();
            var dx = 0, dy = 0;
            if(align == ALIGN.HL) {
                dx = end.x - start.x;
            } else if(align == ALIGN.HC) {
                dx = end.x - (start.cx - end.width / 2);
            } else if(align == ALIGN.HR) {
                dx = end.x - (start.x2 - end.width);
            } else if(align == ALIGN.VT) {
                dy = end.y - start.y;
            } else if(align == ALIGN.VC) {
                dy = end.y - (start.cy - end.height / 2);
            } else if(align == ALIGN.VB) {
                dy = end.y - (start.y2 - end.height);
            }
            if(item.objType == OBJECTS.EQUIPMENT) {
                // Handle image
                for(var j = 0; j < item.length; j++) {
                    item.paperSet[j].attr({
                        x: parseFloat(item.paperSet[j].attr('x')) - dx,
                        y: parseFloat(item.paperSet[j].attr('y')) - dy
                    });
                    item.paperSet[j].transform('R' + item.angle + (!item.info.animation.flip ? 'S1,1' : 'S-1,1') + 'T0,0');
                }
                // Handle holder
                var bb = item.paperSet[item.length - 1].getBBox();
                item.cx = bb.cx;
                item.cy = bb.cy;
                for(var j = 0; j < item.holders.length; j++) {
                    item.holders[j].attr({
                        x: parseFloat(item.holders[j].attr('x')) - dx,
                        y: parseFloat(item.holders[j].attr('y')) - dy
                    });
                }
                item.holders.transform('R' + item.angle + ',' + item.cx + ',' + item.cy + (!item.info.animation.flip ? 'S1,1' : 'S-1,1') + 'T0,0');
                // Update Holder And Line
                this.handlePositionMask(item);
                this.invalidateConnections(item);
                // Update info
                item.info.x = parseFloat(item.attr('x'));
                item.info.y = parseFloat(item.attr('y'));
            } else if(item.objType == OBJECTS.TEXT) {
                item.attr({
                    x: parseFloat(item.attr('x')) - dx,
                    y: parseFloat(item.attr('y')) - dy
                });
            }
            // Add stack list
            STACK_LIST.addStack(_self.currentTagName, _self.panel.name, STACK_TYPES.SVG, STACK_METHODS.MOVE, item, {
                dx: -dx,
                dy: -dy
            });
        }
    },
    // fn rotate item
    rotate: function() {
        var _self = systemGraphic;
        this.mSelectedItems.forEach(function(item) {
            if(item.objType != OBJECTS.CONNECTION) {
                item.info.animation.rotate = (item.info.animation.rotate + 1) % 4; // set position when active rotate
                // change position of holder when rotate
                item.angle -= 90;
                if(item.objType === OBJECTS.EQUIPMENT) {
                    for(var i = 0; i < item.length; i++) {
                        item.paperSet[i].animate({transform: 'R' + item.angle + (!item.info.animation.flip ? 'S1,1' : 'S-1,1')}, _self.configs.rotateSpeed);
                    }
                    item.holders.animate({transform: 'R' + item.angle + ',' + item.cx + ',' + item.cy + (!item.info.animation.flip ? 'S1,1' : 'S-1,1')}, _self.configs.rotateSpeed);
                    setTimeout(function() {
                        _self.handlePositionMask(item);
                        _self.invalidateConnections(item);
                    }, _self.configs.rotateDelay + 100);
                } else if(item.objType === OBJECTS.TEXT) {
                    item.animate({transform: 'R' + item.angle + 'S1,1T0,0'}, _self.configs.rotateSpeed);
                }
                // Add stack list
                STACK_LIST.addStack(_self.currentTagName, _self.panel.name, STACK_TYPES.SVG, STACK_METHODS.ROTATE, item);
            }
        });
    },
    // fn zoom view port
    zoomViewPort: function() {
        return this.g.zoom();
    },
    zoomToFit: function() {
        return this.g.zoomFit(this.availableSize);
    },
    // It should just undo the last things done
    undo: function() {
        var _self = systemGraphic;
        var stack = STACK_LIST.getStack(_self.currentTagName);
        if(stack) {
            var item = stack.object;
            if(stack.method === STACK_METHODS.CREATE) {
                if(item.objType === OBJECTS.EQUIPMENT) {
                    this.removeEquipment(item);
                } else if(item.objType === OBJECTS.CONNECTION) {
                    this.removeConnection(item);
                } else if(item.objType === OBJECTS.TEXT) {
                    this.g.removeText(item);
                }
            } else if(stack.method === STACK_METHODS.PARALLEL) {
                if(item.total <= this.configs.layerTotal) {
                    item.paperSet[0].remove();
                    item.length--;
                    item.total--;

                    // Reset mask
                    _self.handlePositionMask(item);
                    _self.invalidateConnections(item);

                    _self.g.calculateFitSize(_self.mEquipments, _self.availableSize, _self.g.behindNode);
                    _self.calculateKind();
                } else {
                    item.total--;
                }

                // Remove badge
                if(item.badge && !item.badge.removed) {
                    if(item.total === 1) {
                        item.badge.remove();
                        item.badge = undefined;
                    } else {
                        var bb = item.getBBox();
                        var text = item.badge[1];
                        text.node.innerHTML = item.total;
                        text.attr({
                            x: bb.x - text.getBBox().width / 2,
                            y: bb.y + this.configs.badgeTextTop
                        });
                    }
                }

                // Save To Info
                item.info.parallel = item.total - 1;
            } else if(stack.method === STACK_METHODS.MOVE) {
                if(item.objType === OBJECTS.EQUIPMENT) {
                    // Handle image
                    for(var i = 0; i < item.length; i++) {
                        item.paperSet[i].attr({
                            x: parseFloat(item.paperSet[i].attr('x')) - stack.data.dx,
                            y: parseFloat(item.paperSet[i].attr('y')) - stack.data.dy
                        });
                        item.paperSet[i].transform('R' + item.angle + (!item.info.animation.flip ? 'S1,1' : 'S-1,1') + 'T0,0');
                    }
                    // Handle holder
                    var bb = item.paperSet[item.length - 1].getBBox();
                    item.cx = bb.cx;
                    item.cy = bb.cy;
                    for(var i = 0; i < item.holders.length; i++) {
                        item.holders[i].attr({
                            x: parseFloat(item.holders[i].attr('x')) - stack.data.dx,
                            y: parseFloat(item.holders[i].attr('y')) - stack.data.dy
                        });
                    }
                    item.holders.transform('R' + item.angle + ',' + item.cx + ',' + item.cy + (!item.info.animation.flip ? 'S1,1' : 'S-1,1') + 'T0,0');
                    // Reset mask
                    this.handlePositionMask(item);
                    this.invalidateConnections(item);
                } else if(item.objType === OBJECTS.TEXT) {
                    item.attr({
                        x: parseFloat(item.attr('x')) - stack.data.dx,
                        y: parseFloat(item.attr('y')) - stack.data.dy
                    });
                    item.info.x = parseFloat(item.attr('x'));
                    item.info.y = parseFloat(item.attr('y'));
                    item.transform('R' + item.angle + 'T0,0');
                }
            } else if(stack.method === STACK_METHODS.REMOVE) {
                if(item.objType === OBJECTS.EQUIPMENT) {
                    var shape = this.createEquipment(item.info, true);
                    shape.angle = stack.data.angle;
                    shape.paperSet[0].transform('R' + shape.angle + (!shape.info.animation.flip ? 'S1,1' : 'S-1,1') + 'T0,0');
                    shape.holders.transform('R' + shape.angle + ',' + shape.cx + ',' + shape.cy + (!shape.info.animation.flip ? 'S1,1' : 'S-1,1') + 'T0,0');
                    while(stack.data.total-- > 1) {
                        this.drawParallel(shape);
                    }
                    shape.selectChange(false);
                } else if(item.objType === OBJECTS.TEXT) {
                    this.g.createText(item);
                } else if(item.objType === OBJECTS.CONNECTION) {
                    this.mCurrentConnection = new Connection();
                    this.mCurrentConnection.id = item.id;
                    this.mCurrentConnection.from = item.from;
                    this.mCurrentConnection.fromHolder = item.fromHolder;
                    this.mCurrentConnection.to = item.to;
                    this.mCurrentConnection.toHolder = item.toHolder;
                    this.mCurrentConnection.color = item.color;
                    this.mCurrentConnection.objType = item.objType;
                    this.mConnections.add(this.mCurrentConnection);
                    var conn = this.createConnection(this.mCurrentConnection);
                    this.mObjectConnections.add(conn);
                    this.activeConnection();
                }
            } else if(stack.method === STACK_METHODS.ROTATE) {
                if(item.info.animation.rotate == 0) {
                    item.info.animation.rotate = 3;
                } else {
                    item.info.animation.rotate--;
                }
                item.angle += 90;
                if(item.objType === OBJECTS.EQUIPMENT) {
                    for(var i = 0; i < item.length; i++) {
                        item.paperSet[i].animate({transform: 'R' + item.angle + (!item.info.animation.flip ? 'S1,1' : 'S-1,1')}, this.configs.rotateSpeed);
                    }
                    // Handle holder
                    var bb = item.paperSet[item.length - 1].getBBox();
                    item.cx = bb.cx;
                    item.cy = bb.cy;
                    item.holders.animate({transform: 'R' + item.angle + ',' + item.cx + ',' + item.cy + (!item.info.animation.flip ? 'S1,1' : 'S-1,1')}, this.configs.rotateSpeed);
                    setTimeout(function() {
                        _self.handlePositionMask(item);
                        _self.invalidateConnections(item);
                    }, _self.configs.rotateDelay + 100);
                } else if(item.objType === OBJECTS.TEXT) {
                    item.animate({transform: 'R' + item.angle}, this.configs.rotateSpeed);
                }
            } else if(stack.method === STACK_METHODS.FLIP) {
                for(var i = 0; i < item.length; i++) {
                    item.paperSet[i].transform('R' + item.angle + (!item.info.animation.flip ? 'S-1,1' : 'S1,1') + 'T0,0');
                }
                item.holders.transform('R' + item.angle + ',' + item.cx + ',' + item.cy + (!item.info.animation.flip ? 'S-1,1' : 'S1,1') + 'T0,0');
                item.info.animation.flip = !item.info.animation.flip;
                this.handlePositionMask(item);
                this.invalidateConnections(item);
            }

            STACK_LIST.removeStack(stack);
        }
    },
    // Active icons
    activeIcons: function(keyOn, valOn, keyOff, valOff) {
        if(keyOn === undefined) {
            keyOn = 'isSelector';
        }
        if(valOn === undefined) {
            valOn = true;
        }
        if(keyOff === undefined) {
            keyOff = '';
        }
        if(valOff === undefined) {
            valOff = false;
        }
        for(var key in toolIcons) {
            if(key === keyOn) {
                toolIcons[key] = valOn;
            } else if(key === keyOff) {
                toolIcons[key] = valOff;
            } else {
                toolIcons[key] = false;
            }
        }
        // Disable selector and remove selected item
        if(!toolIcons.isSelector) {
            // Remove selected
            this.g.deSelectedItems();
            // Reset pullout
            this.panel.$.TankSettingsPullout.toggle(false);
            this.panel.$.ZoneSettingsPullout.toggle(false);
        }
        if(!toolIcons.isAddText) {
            // Add Text and Off textBox
            if(!!this.g.input) {
                if(this.g.input.value.trim() != '') {
                    this.g.createText({
                        x: this.g.input.x,
                        y: this.g.input.y,
                        text: this.g.input.value
                    });
                } else {
                    // Off input
                    this.g.turnOnTextBoxToAddText(false);
                    // Reset input value
                    this.g.input.value = '';
                }
            }
        }
        this.turnOnHolderOfEntity(toolIcons.isConnector);
        // If zoom active
        //this.g.panZoom.enable(toolIcons.isZoom);
        // if move active
        //this.g.panZoom.move(toolIcons.isMoving);
    }
};

},{'../../../common/services/utils.js':'src/common/services/utils','../../../common/services/graphic.js':'src/common/services/graphic','../../../common/services/stack.js':'src/common/services/stack'}],'src/views/progress/interface/graphic':[function (module,exports,global,require,request){
//

var Signals = require('enyo/Signals');
var IS_TOUCH = require('enyo/platform').touch;

var STACK_LIST = require('../../../common/services/stack.js').STACK_LIST;
var STACK_TYPES = require('../../../common/services/stack.js').STACK_TYPES;
var STACK_METHODS = require('../../../common/services/stack.js').STACK_METHODS;
var Graphic = require('../../../common/services/graphic.js');
var utils = require('../../../common/services/utils.js');

var interfaceGraphic = module.exports = {
    configs: {
        zoomStep: 0.2,
        containerSpace: 5,
        strokeColor: '#414141',
        roundedCorners: 6,
        pointerAngle: 270
    },
    panel: null,
    width: 0,
    height: 0,
    isCollapsed: false,
    isPullout: false,
    currentTagName: null,
    defaultWidth: undefined,
    defaultHeight: undefined,
    currentItem: undefined,
    selectedItem: undefined,
    selectedArea: {
        shape: undefined,
        areaSelect: {fill: '#9CFFFD', 'fill-opacity': 0.1, stroke: '#389CFF'},
        stroke: '#389CFF',
        strokeWidth: 1
    },
    viewTabs: {},
    init: function(svg, input) {
        this.currentTagName = svg.getId();
        // Init available
        this.viewTabs[this.currentTagName] = {
            currentTagName: this.currentTagName,
            panel: this.panel,
            bgTop: null,
            bgBottom: null,
            mText: new Collection(),
            mObjectText: new Collection(),
            mShapes: new Collection(),
            mObjectShapes: new Collection(),
            mControls: new Collection(),
            mObjectControls: new Collection(),
            mSelectedItems: new Collection()
        };
        this.viewTabs[this.currentTagName].g = new Graphic(
            svg.getId(),
            input.getId(),
            this.viewTabs[this.currentTagName],
            this.width,
            this.height,
            this.configs,
            this.onMouseDown,
            this.onMouseMove,
            this.onMouseUp,
            this.onStart,
            this.onMove,
            this.onEnd,
            this.fIn,
            this.fOut
        );
        var paper = this.viewTabs[this.currentTagName].g.paper;
        // Add clipPath
        this.viewTabs[this.currentTagName].clipPath = paper.el("clippath");
        this.viewTabs[this.currentTagName].clipPathHtml = utils.makeSVG('clipPath', {id: "svgPath_" + this.currentTagName});
        this.viewTabs[this.currentTagName].g.appendChild(this.viewTabs[this.currentTagName].clipPathHtml);

        // Add highlight
        this.viewTabs[this.currentTagName].g.appendChild(utils.makeHighlight(this.currentTagName + "_hlShape", "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"));
        this.viewTabs[this.currentTagName].g.appendChild(utils.makeHighlight(this.currentTagName + "_highlight"));
        // Add background group
        this.viewTabs[this.currentTagName].bgGroup = this.viewTabs[this.currentTagName].g.group();
        // Add border group
        this.viewTabs[this.currentTagName].borderGroup = this.viewTabs[this.currentTagName].g.group();
        // Add container group
        this.viewTabs[this.currentTagName].containerGroup = this.viewTabs[this.currentTagName].g.group();
        this.viewTabs[this.currentTagName].containerGroup.count = 0;
        // Add control group
        this.viewTabs[this.currentTagName].controlGroup = this.viewTabs[this.currentTagName].g.group();
        this.viewTabs[this.currentTagName].controlGroup.count = 0;

        // Set size default
        if(!this.defaultWidth || !this.defaultHeight) {
            this.defaultWidth = this.width;
            this.defaultHeight = this.height;
        }

        // Add ImportEventListener
        function dragover(e) {
            e.stopPropagation();
            e.preventDefault();
        }

        function drop(e) {
            e.stopPropagation();
            e.preventDefault();
            var dt = e.dataTransfer;
            var files = dt.files;
            // Set background
            interfaceGraphic.setBackgroundByBase64(files, "");
        }

        var dropbox = document.getElementById(this.currentTagName);
        dropbox.addEventListener('dragover', dragover, false);
        dropbox.addEventListener('drop', drop, false);

        // Add default
        //this.setBackgroundByBase64("assets/images/temps/interface/temp.png", "bgTop");
        //this.setBackgroundByBase64("assets/images/temps/interface/temp2.png", "bgBottom");

        // Set zoom
        this.setZoom(this.width, this.height);
    },
    onMouseDown: function(e) {
        var me = interfaceGraphic;
        var viewTab = me.viewTabs[me.currentTagName];
        viewTab.g.mMouse.start = viewTab.g.getPosition();

        // Check Pullout
        //if(!(!!me.currentItem && ((me.currentItem.objType === OBJECTS.CONTROL && me.currentItem.info.objKind !== INTERFACE_ITEM_TYPE.CONTAINER)
        //    || me.currentItem.objType === OBJECTS.POINTER
        //    || me.currentItem.objType === OBJECTS.TIMER))) {
        //    me.panel.toggleSetting(false);
        //} else {
        //    if(me.currentItem.objType === OBJECTS.POINTER || me.currentItem.objType === OBJECTS.TIMER) {
        //        me.panel.toggleSetting(me.currentItem.parentControl);
        //    } else {
        //        me.panel.toggleSetting(me.currentItem);
        //    }
        //}
        if(!(!!me.currentItem && (me.currentItem == me.currentSelect || (!!me.currentItem.parentControl && me.currentItem.parentControl == me.currentSelect)))) {
            me.panel.toggleSetting(false);
        }

        // Check Selected Item
        if(!me.currentItem && !!me.selectedItem) {
            if(me.selectedItem.objType === OBJECTS.POINTER || me.selectedItem.objType === OBJECTS.TIMER) {
                me.selectedItem.parentControl.selectChange(false);
            }
            if(typeof me.selectedItem.selectChange === 'function') {
                me.selectedItem.selectChange(false);
            }
            me.selectedItem = undefined;
        }
        // Set variables
        GB.isStart = true;
        viewTab.g.turnOnTextBoxToAddText(false);
    },
    // fn draw shape mouse move
    onMouseMove: function(e) {
        var viewTab = interfaceGraphic.viewTabs[interfaceGraphic.currentTagName];
        viewTab.g.mMouse.position = viewTab.g.getPosition();
        var x = viewTab.g.mMouse.start.x > viewTab.g.mMouse.position.x ? viewTab.g.mMouse.position.x : viewTab.g.mMouse.start.x,
            y = viewTab.g.mMouse.start.y > viewTab.g.mMouse.position.y ? viewTab.g.mMouse.position.y : viewTab.g.mMouse.start.y,
            w = Math.abs(viewTab.g.mMouse.start.x - viewTab.g.mMouse.position.x),
            h = Math.abs(viewTab.g.mMouse.start.y - viewTab.g.mMouse.position.y);
        if(toolIcons.isAddRectangle && GB.isStart) {
            if(interfaceGraphic.selectedArea.shape === undefined) {
                interfaceGraphic.selectedArea.shape = viewTab.g.rect(x, y, w, h).attr(interfaceGraphic.selectedArea.areaSelect);
            } else {
                interfaceGraphic.selectedArea.shape.attr({
                    x: x,
                    y: y,
                    width: w,
                    height: h
                }).attr(interfaceGraphic.selectedArea.areaSelect);
            }
        } else if(toolIcons.isAddCircle && GB.isStart) {
            if(interfaceGraphic.selectedArea.shape === undefined) {
                interfaceGraphic.selectedArea.shape = viewTab.g.ellipse(x + w / 2, y + h / 2, w / 2, h / 2).attr(interfaceGraphic.selectedArea.areaSelect);
            } else {
                interfaceGraphic.selectedArea.shape.attr({
                    cx: x + w / 2,
                    cy: y + h / 2,
                    rx: w / 2,
                    ry: h / 2
                }).attr(interfaceGraphic.selectedArea.areaSelect);
            }
        }
    },
    // fn draw shape mouse up
    onMouseUp: function(e) {
        var viewTab = interfaceGraphic.viewTabs[interfaceGraphic.currentTagName];
        viewTab.g.mMouse.position = viewTab.g.getPosition();
        //if(toolIcons.isAddRectangle || toolIcons.isAddCircle) {
        if(toolIcons.isAddRectangle || toolIcons.isAddCircle) {
            if(interfaceGraphic.selectedArea.shape) {
                var bb = interfaceGraphic.selectedArea.shape.getBBox();
                interfaceGraphic.createShape({
                    type: toolIcons.isAddRectangle ? SHAPE_TYPES.RECTANGLE : SHAPE_TYPES.CIRCLE,
                    x: bb.x,
                    y: bb.y,
                    w: bb.width,
                    h: bb.height
                });
            }
            if(interfaceGraphic.selectedArea.shape !== undefined) {
                interfaceGraphic.selectedArea.shape.remove();
                interfaceGraphic.selectedArea.shape = undefined;
            }
        } else if(toolIcons.isAddPolyline) {
            var isFinish = false;
            if(GB.points.length >= 3) { // Check create polyLine
                var nodeRoot = GB.points[0];
                if((nodeRoot.x - 10 < viewTab.g.mMouse.position.x && viewTab.g.mMouse.position.x < nodeRoot.x + 10) &&
                    (nodeRoot.y - 10 < viewTab.g.mMouse.position.y && viewTab.g.mMouse.position.y < nodeRoot.y + 10)) {
                    interfaceGraphic.createPolyLine();
                    isFinish = true;
                }
            }
            if(!isFinish) {
                GB.points.push({x: viewTab.g.mMouse.position.x, y: viewTab.g.mMouse.position.y});
                if(interfaceGraphic.selectedArea.shape === undefined) {
                    interfaceGraphic.selectedArea.shape = viewTab.g.path(utils.getPoints(GB.points)).attr({
                        stroke: interfaceGraphic.selectedArea.stroke,
                        'stroke-width': interfaceGraphic.selectedArea.strokeWidth,
                        fill: "none"
                    });
                }
                else {
                    interfaceGraphic.selectedArea.shape.attr({
                        path: utils.getPoints(GB.points)
                    });
                }
            }
        } else if(toolIcons.isAddText) { // Add Text and Off textBox
            var input = viewTab.g.input;
            if(!!input) {
                if(input.value.trim() != "") {
                    var text = viewTab.g.createText({
                        x: input.x,
                        y: input.y,
                        text: input.value
                    });
                }
            }
            // Edit Text
            if(!!interfaceGraphic.currentItem) {
                if(interfaceGraphic.currentItem.objType == OBJECTS.TEXT) {
                    var pan = viewTab.g.panZoom.getCurrentPosition();

                    var left = (parseFloat(interfaceGraphic.currentItem.attr('x')) - pan.x) / viewTab.g.scale - parseInt(input.getAttribute('width')) / 2;
                    var top = (parseFloat(interfaceGraphic.currentItem.attr('y')) - pan.y) / viewTab.g.scale - parseInt(input.getAttribute('height')) / 2;

                    input.x = parseFloat(interfaceGraphic.currentItem.attr('x'));
                    input.y = parseFloat(interfaceGraphic.currentItem.attr('y'));

                    input.style.left = left + 'px';
                    input.style.top = top + 'px';
                    input.style.display = 'block';
                    input.value = interfaceGraphic.currentItem.attr('text');
                    input.focus();

                    interfaceGraphic.g.removeText(interfaceGraphic.currentItem);
                    interfaceGraphic.currentItem = undefined;
                }
            }
            else {
                viewTab.g.turnOnTextBoxToAddText(true);
            }
        }
        // Reset variables
        GB.isStart = false;
    },
    // fn fin
    fIn: function() {
        interfaceGraphic.currentItem = this;
    },
    // fn fout
    fOut: function() {
        interfaceGraphic.currentItem = undefined;
    },
    // fn onstart
    onStart: function(x, y) {
        var viewTab = interfaceGraphic.viewTabs[interfaceGraphic.currentTagName];
        if(!viewTab.g || (viewTab.g && !viewTab.g.verify(this))) {
            return false;
        }

        interfaceGraphic.panel.activeReset();

        if(IS_TOUCH) {
            var offset = viewTab.g.getOffset();
            viewTab.g.mMouse.position = {
                x: x - offset.left,
                y: y - offset.top
            };
        }

        if(this.objType === OBJECTS.CONTROL) {
            if(!!this.pointer) {
                this.pointer.attrX = parseFloat(this.pointer.attr('x'));
                this.pointer.attrY = parseFloat(this.pointer.attr('y'));
            }
            if(!!this.timer) {
                this.timer.attrX = parseFloat(this.timer.attr('x'));
                this.timer.attrY = parseFloat(this.timer.attr('y'));
            }
            if(this.info.objKind === INTERFACE_ITEM_TYPE.CONTAINER) {
                for(var i = 0; i < this.children.count; i++) {
                    var item = this.children.item(i);
                    if(!!item.pointer) {
                        item.pointer.attrX = parseFloat(item.pointer.attr('x'));
                        item.pointer.attrY = parseFloat(item.pointer.attr('y'));
                    }
                    if(!!item.timer) {
                        item.timer.attrX = parseFloat(item.timer.attr('x'));
                        item.timer.attrY = parseFloat(item.timer.attr('y'));
                    }
                }
            }
        } else if(this.objType === OBJECTS.POINTER || this.objType === OBJECTS.TIMER) {
            this.attrX = parseFloat(this.attr('x'));
            this.attrY = parseFloat(this.attr('y'));
        } else if(this.objType === OBJECTS.TEXT) {
            this.attr({stroke: '#B8C8E6', 'stroke-opacity': .5});
        }
        this.dx = 0;
        this.dy = 0;

        // Disable selected
        if(!!interfaceGraphic.selectedItem) {
            if(interfaceGraphic.selectedItem.objType === OBJECTS.POINTER || interfaceGraphic.selectedItem.objType === OBJECTS.TIMER) {
                if(this.objType === OBJECTS.POINTER || this.objType === OBJECTS.TIMER) {
                    if(interfaceGraphic.selectedItem.parentControl !== this.parentControl) {
                        interfaceGraphic.selectedItem.parentControl.selectChange(false);
                    }
                } else if(this.objType === OBJECTS.CONTROL) {
                    if(interfaceGraphic.selectedItem.parentControl !== this) {
                        interfaceGraphic.selectedItem.parentControl.selectChange(false);
                    }
                }
            } else if(interfaceGraphic.selectedItem.objType === OBJECTS.CONTROL && interfaceGraphic.selectedItem.info.objKind !== INTERFACE_ITEM_TYPE.CONTAINER) {
                if(this.objType === OBJECTS.POINTER || this.objType === OBJECTS.TIMER) {
                    if(interfaceGraphic.selectedItem !== this.parentControl) {
                        interfaceGraphic.selectedItem.selectChange(false);
                    }
                } else if(this.objType === OBJECTS.CONTROL) {
                    if(interfaceGraphic.selectedItem !== this) {
                        interfaceGraphic.selectedItem.selectChange(false);
                    }
                }
            }
        }
        if(this.objType === OBJECTS.POINTER || this.objType === OBJECTS.TIMER) {
            this.parentControl.selectChange(true);
        }
        if(typeof this.selectChange === 'function') {
            this.selectChange(true);
        }

        interfaceGraphic.selectedItem = this;
        interfaceGraphic.currentItem = this;
    },
    // fn onmove
    onMove: function(dx, dy) {
        var viewTab = interfaceGraphic.viewTabs[interfaceGraphic.currentTagName];
        if(!viewTab.g || (viewTab.g && !viewTab.g.verify(this))) {
            return false;
        }

        dx = dx * viewTab.g.scale;
        dy = dy * viewTab.g.scale;
        if(this.objType === OBJECTS.CONTROL) {
            if(this.info.objKind === INTERFACE_ITEM_TYPE.CONTAINER) {
                for(var i = 0; i < this.children.count; i++) {
                    var item = this.children.item(i);
                    item.label.transform("R0T" + dx + ',' + dy);
                    item.contains.transform("R0T" + dx + ',' + dy);
                }
                this.transform("R0T" + dx + ',' + dy);
            } else {
                this.transform("R0T" + dx + ',' + dy);
                this.label.transform("R0T" + dx + ',' + dy);
                // Check move tail
                if(!!this.pointer) {
                    this.pointer.attr({
                        x: this.pointer.attrX + dx,
                        y: this.pointer.attrY + dy
                    });
                    this.pointer.transform('R' + this.pointer.angle + "," + this.getBBox().cx + "," + this.getBBox().cy + 'T0,0');
                }
                // Check move timer
                if(!!this.timer) {
                    this.timer.attr({
                        x: this.timer.attrX + dx,
                        y: this.timer.attrY + dy
                    });
                    this.timer.transform('R' + this.timer.angle + "," + this.getBBox().cx + "," + this.getBBox().cy + 'T0,0');
                }
            }
        } else if(this.objType === OBJECTS.POINTER) {
            var position = viewTab.g.getPosition();
            var bb = this.parentControl.getBBox();
            // Calculate angle
            this.angle = Math.atan2(position.x - bb.cx, -(position.y - bb.cy)) * (180 / Math.PI) + 90;
            if(this.angle < 0) {
                this.angle = 360 + this.angle;
            }
            this.transform('R' + this.angle + "," + this.parentControl.getBBox().cx + "," + this.parentControl.getBBox().cy + 'T0,0');
            // Send update
            var angle = interfaceGraphic.configs.pointerAngle - this.angle;
            if(angle < 0) {
                angle = 360 + angle;
            }
            // Save input
            this.parentControl.info.pointerAngle = angle;
            // Send angle
            Signals.send('onPointAngleUpdate', {pointerAngle: Math.round(angle)});
        } else if(this.objType === OBJECTS.TIMER) {
            var position = viewTab.g.getPosition();
            var bb = this.parentControl.getBBox();
            // Calculate angle
            this.angle = Math.atan2(position.x - bb.cx, -(position.y - bb.cy)) * (180 / Math.PI);
            this.transform('R' + this.angle + "," + this.parentControl.getBBox().cx + "," + this.parentControl.getBBox().cy + 'T0,0');
        } else if(this.objType === OBJECTS.TEXT) {
            this.transform("R0T" + dx + ',' + dy);
        }
        this.dx = dx;
        this.dy = dy;
    },
    // fn onend
    onEnd: function(e) {
        var me = interfaceGraphic,
            viewTab = me.viewTabs[me.currentTagName];
        if(!viewTab.g || (viewTab.g && !viewTab.g.verify(this))) {
            return false;
        }

        if(this.objType === OBJECTS.CONTROL) {
            this.transform("R0T0,0");
            this.attr({
                x: parseFloat(this.attr('x')) + this.dx,
                y: parseFloat(this.attr('y')) + this.dy
            });
            if(this.info.objKind === INTERFACE_ITEM_TYPE.CONTAINER) {
                for(var i = 0; i < this.children.count; i++) {
                    var item = this.children.item(i);
                    item.attr({
                        x: parseFloat(item.attr('x')) + this.dx,
                        y: parseFloat(item.attr('y')) + this.dy
                    });
                    item.contains.transform('R0T0,0');
                    item.label.transform("R0T0,0");
                    item.label.attr({
                        x: parseFloat(item.label.attr('x')) + this.dx,
                        y: parseFloat(item.label.attr('y')) + this.dy
                    });
                    if(!!item.pointer) {
                        item.pointer.attr({
                            x: parseFloat(item.pointer.attr('x')) + this.dx,
                            y: parseFloat(item.pointer.attr('y')) + this.dy
                        });
                        item.pointer.transform('R' + item.pointer.angle + "," + item.getBBox().cx + "," + item.getBBox().cy + 'T0,0');
                    }
                    if(!!item.timer) {
                        item.timer.attr({
                            x: parseFloat(item.timer.attr('x')) + this.dx,
                            y: parseFloat(item.timer.attr('y')) + this.dy
                        });
                        item.timer.transform('R' + item.timer.angle + "," + item.getBBox().cx + "," + item.getBBox().cy + 'T0,0');
                    }
                }
            } else {
                this.label.transform("R0T0,0");
                this.label.attr({
                    x: parseFloat(this.label.attr('x')) + this.dx,
                    y: parseFloat(this.label.attr('y')) + this.dy
                });
                // Check move tail
                if(!!this.pointer) {
                    this.pointer.transform('R' + this.pointer.angle + "," + this.getBBox().cx + "," + this.getBBox().cy + 'T0,0');
                    this.pointer.attr({
                        x: this.pointer.attrX + this.dx,
                        y: this.pointer.attrY + this.dy
                    });
                }
                // Check move timer
                if(!!this.timer) {
                    this.timer.transform('R' + this.timer.angle + "," + this.getBBox().cx + "," + this.getBBox().cy + 'T0,0');
                    this.timer.attr({
                        x: this.timer.attrX + this.dx,
                        y: this.timer.attrY + this.dy
                    });
                }
                // Check resize container
                interfaceGraphic.validateContainer(this);
            }
        } else if(this.objType === OBJECTS.TEXT) {
            this.transform("R0T0,0");
            this.attr({stroke: 'none'});
            this.attr({
                x: parseFloat(this.attr('x')) + this.dx,
                y: parseFloat(this.attr('y')) + this.dy
            });
        }

        // Add stack list
        STACK_LIST.addStack(me.currentTagName, me.panel.name, STACK_TYPES.SVG, STACK_METHODS.MOVE, this, {
            dx: this.dx,
            dy: this.dy
        });

        this.dx = 0;
        this.dy = 0;

        interfaceGraphic.currentItem = undefined;
    },
    // fn draw shape
    drawShape: function(panel, object) {
        var viewTab = this.viewTabs[this.currentTagName];
        var shape = new Object();
        if(object.type === SHAPE_TYPES.RECTANGLE) {
            shape = panel.rect(object.x, object.y, object.w, object.h).attr({
                rx: 6,
                ry: 6
            });
            shape.outline = panel.rect(object.x, object.y, object.w, object.h).attr({
                fill: 'transparent',
                rx: 6,
                ry: 6,
                stroke: this.configs.strokeColor,
                'stroke-width': 6
            });
        } else if(object.type === SHAPE_TYPES.CIRCLE) {
            shape = panel.ellipse(object.x + object.w / 2, object.y + object.h / 2, object.w / 2, object.h / 2);
            shape.outline = panel.ellipse(object.x + object.w / 2, object.y + object.h / 2, object.w / 2, object.h / 2).attr({
                fill: 'transparent',
                stroke: this.configs.strokeColor,
                'stroke-width': 6
            });
        } else if(object.type === SHAPE_TYPES.POLYLINE) {
            object.path = roundPathCorners(object.path, 6, false);
            shape = panel.path(object.path);
            shape.outline = panel.path(object.path).attr({
                fill: 'transparent',
                stroke: this.configs.strokeColor,
                'stroke-width': 6
            });
        }
        // Add to layer
        viewTab.borderGroup.add(shape.outline);

        shape.selectChange = function(flag) {
            if(flag) {
                this.attr({filter: "url(#" + interfaceGraphic.currentTagName + "_hlShape)"})
            } else {
                this.attr({filter: "none"})
            }
        };
        shape.info = object;
        shape.id = object.id;
        shape.objType = OBJECTS.SHAPE;
        //shape.drag(this.onMove, this.onStart, this.onEnd);

        return shape;
    },
    // fn draw control
    drawControl: function(object) {
        var me = interfaceGraphic;
        var viewTab = me.viewTabs[me.currentTagName];
        var control = new Object();
        if(object.objKind === INTERFACE_ITEM_TYPE.CONTAINER) {
            control = viewTab.g.rect(object.x, object.y, object.width, object.height).attr({
                rx: 8,
                ry: 8,
                fill: "#d9d9d9",
                stroke: "#3e3e3e",
                'stroke-width': 3,
                opacity: 0.8
            });
            control.children = new Collection();
            control.availableSize = false;
            control.defaultSize = {width: object.width, height: object.height};
            viewTab.containerGroup.add(control);
            viewTab.containerGroup.count++;

            control.info = object;
            control.id = object.id;
            control.objType = OBJECTS.CONTROL;

            control.drag(this.onMove, this.onStart, this.onEnd);
        } else {
            control = viewTab.g.image(object.url, object.x, object.y, object.width, object.height);
            control.parentContainer = undefined;

            var contains = viewTab.g.group();
            contains.add(control);

            viewTab.controlGroup.add(contains);
            viewTab.controlGroup.count++;

            control.info = object;
            control.id = object.id;
            control.objType = OBJECTS.CONTROL;

            var bb = control.getBBox();

            if(control.info.objKind === INTERFACE_ITEM_TYPE.USER_INPUT) {
                // Create pointer for user inputs - position left
                control.pointer = viewTab.g.image("assets/images/interfaces/userinputs/off/tail.svg", bb.x - 22, bb.y + 13, 27, 19).attr('cursor', 'pointer');
                control.pointer.angle = me.configs.pointerAngle;
                control.pointer.parentControl = control;
                control.pointer.objType = OBJECTS.POINTER;

                if(IS_TOUCH) { // On Mobile
                    control.pointer.touchstart(function() {
                        this.parentControl.selectChange(true);
                        me.panel.toggleSetting(this.parentControl);
                        me.currentSelect = this.parentControl;
                    });
                } else { // On Desktop
                    control.pointer.dblclick(function() {
                        this.parentControl.selectChange(true);
                        me.panel.toggleSetting(this.parentControl);
                        me.currentSelect = this.parentControl;
                    });
                }
                control.pointer.drag(this.onMove, this.onStart, this.onEnd);
                contains.add(control.pointer);
                // Update position to bottom
                control.pointer.transform('R' + control.pointer.angle + "," + control.pointer.parentControl.getBBox().cx + "," + control.pointer.parentControl.getBBox().cy + 'T0,0');

                // Create timer
                control.timer = viewTab.g.image("assets/images/interfaces/userinputs/off/timer.svg", bb.cx - 4, bb.y - 1, 8, 8).attr('cursor', 'pointer');
                control.timer.angle = 0;
                control.timer.parentControl = control;
                control.timer.objType = OBJECTS.TIMER;

                if(IS_TOUCH) { // On Mobile
                    control.timer.touchstart(function() {
                        this.parentControl.selectChange(true);
                        me.panel.toggleSetting(this.parentControl);
                        me.currentSelect = this.parentControl;
                    });
                } else { // On Desktop
                    control.timer.dblclick(function() {
                        this.parentControl.selectChange(true);
                        me.panel.toggleSetting(this.parentControl);
                        me.currentSelect = this.parentControl;
                    });
                }
                control.timer.drag(this.onMove, this.onStart, this.onEnd);
                contains.add(control.timer);
            }

            // Create label
            control.label = viewTab.g.drawText({
                x: bb.cx,
                y: bb.y2 + 12,
                text: object.name.toUpperCase()
            }, true).attr({
                fontSize: 9,
                fontWeight: 'bold',
                opacity: 0.001,
                display: 'none',
                fill: '#444'
            });
            //contains.add(control.label);
            control.contains = contains;

            control.selectChange = function(flag) {
                if(flag) {
                    this.contains.attr({filter: "url(#" + me.currentTagName + "_highlight)"})
                } else {
                    this.contains.attr({filter: "none"})
                }
            };

            // Change info
            control.changeInfo = function(type) {
                if(type === 'pointerStyle') {
                    if(!this.info.pointerStyle) {
                        this.pointer.attr('opacity', .001);
                    } else {
                        this.pointer.attr('opacity', 1);
                    }
                } else if(type === 'timerStyle') {
                    if(!this.info.timerStyle) {
                        this.timer.attr('opacity', .001);
                    } else {
                        this.timer.attr('opacity', 1);
                    }
                }
            };

            // Event click
            if(IS_TOUCH) { // On Mobile
                control.touchstart(function() {
                    me.panel.toggleSetting(this);
                    me.currentSelect = this;
                });
            } else { // On Desktop
                control.dblclick(function() {
                    me.panel.toggleSetting(this);
                    me.currentSelect = this;
                });
            }

            control.drag(this.onMove, this.onStart, this.onEnd);

            function init() {
                if(control.info.objKind === INTERFACE_ITEM_TYPE.USER_INPUT) {
                    control.info.pointerStyle = true;
                    control.changeInfo('pointerStyle');

                    control.info.timerStyle = false;
                    control.changeInfo('timerStyle');
                }

                // Check Selected Item
                if(!!me.selectedItem) {
                    if(me.selectedItem.objType === OBJECTS.POINTER || me.selectedItem.objType === OBJECTS.TIMER) {
                        me.selectedItem.parentControl.selectChange(false);
                    }
                    if(typeof me.selectedItem.selectChange === 'function') {
                        me.selectedItem.selectChange(false);
                    }
                }
                control.selectChange(true);
                me.selectedItem = control;
                me.currentSelect = control;
                // Open setting panel
                me.panel.toggleSetting(control);
            }

            init();
        }

        return control;
    },
    // fn create shape
    createShape: function(options) {
        var me = interfaceGraphic,
            viewTab = me.viewTabs[me.currentTagName];
        var shape = new Shape(options.type, options.x, options.y, options.w, options.h, options.path);
        var item = this.drawShape(viewTab.g, shape);
        viewTab.mShapes.add(shape, true);
        viewTab.mObjectShapes.add(item);
        viewTab.clipPath.add(item);
        // Add clip path
        var node = viewTab.clipPath.node.childNodes[0];
        viewTab.clipPathHtml.appendChild(node);
        // Add task list
        node.outline = item.outline;
        STACK_LIST.addStack(me.currentTagName, me.panel.name, STACK_TYPES.SVG, STACK_METHODS.CREATE, node);
    },
    // fn create polyline
    createPolyLine: function() {
        var path = utils.mergingPoints(GB.points);
        path += ' Z';
        this.createShape({
            type: SHAPE_TYPES.POLYLINE,
            path: path
        });
        if(this.selectedArea.shape !== undefined) {
            GB.points = new Array();
            this.selectedArea.shape.remove();
            this.selectedArea.shape = undefined;
        }
    },
    // fn create control
    createControl: function(options) {
        var me = interfaceGraphic,
            viewTab = me.viewTabs[me.currentTagName];
        options.x = options.x * viewTab.g.scale + viewTab.g.panZoom.getCurrentPosition().x;
        options.y = options.y * viewTab.g.scale + viewTab.g.panZoom.getCurrentPosition().y;
        var control = new Control(options.type, options.kind, options.name, options.url, options.x, options.y, options.width, options.height, options.data);
        viewTab.mControls.add(control, true);
        var objectControl = this.drawControl(control);
        viewTab.mObjectControls.add(objectControl);
        // Check if exist container
        if(objectControl.info.objKind !== INTERFACE_ITEM_TYPE.CONTAINER) {
            this.validateContainer(objectControl);
        } else { // Container
            objectControl.objCon = options.data.containerType;
        }

        // Add task list
        STACK_LIST.addStack(me.currentTagName, me.panel.name, STACK_TYPES.SVG, STACK_METHODS.CREATE, objectControl);

        return true;
    },
    // fn remove control
    removeControl: function(item) {
        var viewTab = this.viewTabs[this.currentTagName];
        if(item.info.objKind === INTERFACE_ITEM_TYPE.CONTAINER) {
            viewTab.containerGroup.count--;
        } else {
            viewTab.controlGroup.count--;
        }
        // Remove info
        viewTab.mControls.remove(item);
        // Remove object
        viewTab.mObjectControls.remove(item);
        item.remove();
    },
    // Delete item selected
    deleteSelectedItems: function() {
        if(!!this.selectedItem) {
            var me = interfaceGraphic,
                viewTab = me.viewTabs[me.currentTagName];
            // Remove info
            viewTab.mControls.remove(me.selectedItem);
            // Remove object
            viewTab.mObjectControls.forEach(function(control) {
                if(control === me.selectedItem) {
                    if(control.info.objKind === INTERFACE_ITEM_TYPE.CONTAINER) {
                        for(var i = 0; i < control.children.count; i++) {
                            var item = control.children.item(i);
                            viewTab.mControls.remove(item);
                            if(!!item.pointer) {
                                item.pointer.remove();
                            }
                            if(!!item.timer) {
                                item.timer.remove();
                            }
                            if(!!item.label) {
                                item.label.remove();
                            }
                            item.remove();
                        }
                    }
                    if(!!control.pointer) {
                        control.pointer.remove();
                    }
                    if(!!control.timer) {
                        control.timer.remove();
                    }
                    if(!!control.label) {
                        control.label.remove();
                    }
                    control.remove();
                }
            });
            me.panel.toggleSetting(false);
        }
    },
    // Import to background
    setBackgroundByBase64: function(files, position) {
        var _self = interfaceGraphic,
            viewTab = _self.viewTabs[_self.currentTagName],
            tagName = _self.currentTagName;

        // Show loading
        Signals.send('onLoading', {method: 'show'});

        utils.getImageUrl(files).then(function(result) {
            if(result) {
                var t = result.width / result.height;
                var width, height;
                //var sw = result.width / _self.defaultWidth;
                //var sh = result.height / _self.defaultHeight;
                //if(sw > sh) {
                //    height = _self.defaultHeight;
                //    width = height * t;
                //} else {
                //    width = _self.defaultWidth;
                //    height = width / t;
                //}

                // Fix width size
                width = _self.defaultWidth;
                height = width / t;

                utils.convertImgToBase64(result.url, function(base64Img) {
                    if(position != 'bgTop' && position != 'bgBottom') {
                        if(viewTab['bgBottom'] == null) {
                            position = 'bgBottom';
                        } else if(viewTab['bgTop'] == null) {
                            position = 'bgTop';
                        } else {
                            position = 'bgBottom';
                        }
                    }
                    if(viewTab[position] != null) {
                        viewTab[position].remove();
                        viewTab[position] = null;
                    }
                    viewTab[position] = viewTab.g.image(base64Img, 0, 0, width, height);
                    if(position == 'bgTop') {
                        viewTab.bgGroup.prepend(viewTab[position]);
                    } else {
                        viewTab.bgGroup.append(viewTab[position]);
                    }
                    if(viewTab['bgTop'] != null && viewTab['bgBottom'] != null) {
                        viewTab['bgBottom'].node.setAttribute('clip-path', 'url(#svgPath_' + tagName + ')');
                    }

                    // Close loading
                    Signals.send('onLoading', {method: 'hide'});
                })

            } else {
                Signals.send('onLoading', {method: 'hide'});
            }
        });
    },
    setSize: function(width, height) {
        var _self = interfaceGraphic,
            viewTab = _self.viewTabs[_self.currentTagName];
        _self.width = width;
        _self.height = height;

        // Resize
        if(!!viewTab) {
            viewTab.g.setSize(width, height, false);
        }

        // Zoom
        _self.setZoom(width, height);

        //var viewTab = this.viewTabs[this.currentTagName];
        //if(!!viewTab) {
        //    // Resize background
        //    if(!!viewTab["bgTop"]) {
        //        viewTab["bgTop"].attr({
        //            width: this.width,
        //            height: this.height
        //        });
        //    }
        //    if(!!viewTab["bgBottom"]) {
        //        viewTab["bgBottom"].attr({
        //            width: this.width,
        //            height: this.height
        //        });
        //    }
        //}
    },
    setZoom: function(width, height) {
        var _self = interfaceGraphic,
            viewTab = _self.viewTabs[_self.currentTagName];

        if(!!viewTab) {
            //viewTab.g.scaleViewPort(width / _self.defaultWidth, height / _self.defaultHeight);

            // Zoom width size
            viewTab.g.zoomByRoot(width / _self.defaultWidth);
        }
    },
    // Redaw user input
    setPointerAngle: function(mControl) {
        var me = interfaceGraphic,
            viewTab = me.viewTabs[me.currentTagName];

        for(var i = 0; i < viewTab.mObjectControls.count; i++) {
            var item = viewTab.mObjectControls.item(i);
            if(item.info == mControl) {
                if(!!item.pointer) {
                    var angle = interfaceGraphic.configs.pointerAngle - mControl.pointerAngle;
                    if(angle < 0) {
                        angle = 360 + angle;
                    }
                    item.pointer.angle = angle;
                    item.pointer.transform('R' + item.pointer.angle + "," + item.getBBox().cx + "," + item.getBBox().cy + 'T0,0');
                }
                break;
            }
        }
    },
    // Calculate contains size for item control
    calculateItemControlSize: function(item) {
        var bb = item.getBBox(),
            lbb = item.label.getBBox(),
            x = bb.x, x2 = bb.x2, y = bb.y, y2 = bb.y2,
            lx = lbb.x, lx2 = lbb.x2, ly = lbb.y, ly2 = lbb.y2;

        if(lx > 0 && lx < x) x = lx;
        if(lx2 > 0 && lx2 > x2) x2 = lx2;
        if(ly2 > 0 && ly2 > y2) y2 = ly2;

        return {x: x, x2: x2, y: y, y2: y2, cx: (x + x2) / 2, cy: (y + y2) / 2, width: x2 - x, height: y2 - y};
    },
    // Check and set control to container
    validateContainer: function(item) {
        var me = interfaceGraphic,
            viewTab = me.viewTabs[me.currentTagName],
            container = false;
        var bbItem = me.calculateItemControlSize(item);
        for(var i = 0; i < viewTab.containerGroup.count; i++) {
            var bbContainer = viewTab.containerGroup[i].getBBox();
            if(bbContainer.x < bbItem.cx && bbItem.cx < bbContainer.x2 && bbContainer.y < bbItem.cy && bbItem.cy < bbContainer.y2) {
                container = viewTab.containerGroup[i];
                break;
            }
        }
        if(container) {
            if(container !== item.parentContainer) {
                if(item.parentContainer != undefined) {
                    var parentContainer = item.parentContainer;
                    if(!parentContainer.children.remove(item)) {
                        console.log("error");
                    }
                    me.resizeContainer(parentContainer);
                }
                container.children.add(item);
                item.parentContainer = container;
                item.label.attr({
                    opacity: 1,
                    display: ''
                });
                if(!!item.pointer) {
                    item.pointer.attr('display', 'none');
                }
            }
            me.resizeContainer(container);
        } else {
            if(item.parentContainer != undefined) {
                var parentContainer = item.parentContainer;
                if(!parentContainer.children.remove(item)) {
                    console.log("error");
                }
                item.parentContainer = undefined;
                item.label.attr({
                    opacity: 0.001,
                    display: 'none'
                });
                if(!!item.pointer) {
                    item.pointer.attr('display', '');
                }
                me.resizeContainer(parentContainer);
            }
        }

        return container;
    },
    // Resize container
    resizeContainer: function(container) {
        var me = interfaceGraphic;
        if(container.children.count > 0) {
            var x, x2, y, y2;

            if(container.objCon === CONTAINER_TYPE.HORIZONTAL) {
                var minHeight = 0, maxHeight = 0,
                    isSmall = false, isControl = false;
                var bb = container.getBBox();
                var minX = bb.x;
                var maxX = bb.x + container.defaultSize.width;
                var minY = bb.y;
                var d = {x: 0, x2: 0};

                for(var i = 0; i < container.children.count; i++) {
                    var item = container.children.item(i);
                    var bb = me.calculateItemControlSize(item);
                    if(item.info.objKind === INTERFACE_ITEM_TYPE.INDICATOR) {
                        isSmall = true;
                        minHeight = (minHeight == 0 ? bb.height : (minHeight < bb.height ? bb.height : minHeight));
                    } else {
                        isControl = true;
                        maxHeight = (maxHeight == 0 ? bb.height : (maxHeight < bb.height ? bb.height : maxHeight));
                    }
                    if(d.x == 0) {
                        d.x = bb.x;
                    } else {
                        if(d.x > bb.x) d.x = bb.x;
                    }
                    if(d.x2 == 0) {
                        d.x2 = bb.x2;
                    } else {
                        if(d.x2 < bb.x2) d.x2 = bb.x2;
                    }
                }
                y = minY;
                if(d.x2 - d.x > container.defaultSize.width) {
                    x = d.x - me.configs.containerSpace;
                    x2 = d.x2 + me.configs.containerSpace;
                } else {
                    x = minX;
                    x2 = maxX;
                }
                if(isSmall && isControl) {
                    y2 = (minY + minHeight * 2) > (minY + maxHeight) ? (minY + minHeight * 2) : (minY + maxHeight) + me.configs.containerSpace * 2;
                } else if(isSmall) {
                    y2 = minY + minHeight * 2 + me.configs.containerSpace * 2;
                } else if(isControl) {
                    y2 = minY + maxHeight + me.configs.containerSpace * 2;
                }
            } else { //CONTAINER_TYPE.VERTICAL
                var minWidth = 0, maxWidth = 0,
                    isSmall = false, isControl = false;
                var bb = container.getBBox();
                var minX = bb.x;
                var minY = bb.y;
                var maxY = bb.y + container.defaultSize.height;
                var d = {y: 0, y2: 0};

                for(var i = 0; i < container.children.count; i++) {
                    var item = container.children.item(i);
                    var bb = me.calculateItemControlSize(item);
                    if(item.info.objKind === INTERFACE_ITEM_TYPE.INDICATOR) {
                        isSmall = true;
                        minWidth = (minWidth == 0 ? bb.width : (minWidth < bb.width ? bb.width : minWidth));
                    } else {
                        isControl = true;
                        maxWidth = (maxWidth == 0 ? bb.width : (maxWidth < bb.width ? bb.width : maxWidth));
                    }
                    if(d.y == 0) {
                        d.y = bb.y;
                    } else {
                        if(d.y > bb.y) d.y = bb.y;
                    }
                    if(d.y2 == 0) {
                        d.y2 = bb.y2;
                    } else {
                        if(d.y2 < bb.y2) d.y2 = bb.y2;
                    }
                }
                x = minX;
                if(d.y2 - d.y > container.defaultSize.height) {
                    y = d.y - me.configs.containerSpace;
                    y2 = d.y2 + me.configs.containerSpace;
                } else {
                    y = minY;
                    y2 = maxY;
                }
                if(isSmall && isControl) {
                    x2 = (minX + minWidth * 2) > (minX + maxWidth) ? (minX + minWidth * 2) : (minX + maxWidth) + me.configs.containerSpace * 2;
                } else if(isSmall) {
                    x2 = minX + minWidth * 2 + me.configs.containerSpace * 2;
                } else if(isControl) {
                    x2 = minX + maxWidth + me.configs.containerSpace * 2;
                }
            }

            container.attr({
                x: x,
                y: y,
                width: x2 - x,
                height: y2 - y
            });

            // Move item in container
            for(var i = 0; i < container.children.count; i++) {
                var item = container.children.item(i);
                var bb = me.calculateItemControlSize(item);

                if(bb.x - me.configs.containerSpace < x) {
                    var dx = x - bb.x + me.configs.containerSpace;
                    item.attr('x', parseFloat(item.attr('x')) + dx);
                    item.label.attr('x', parseFloat(item.label.attr('x')) + dx);
                    if(!!item.pointer) {
                        item.pointer.attr('x', parseFloat(item.pointer.attr('x')) + dx);
                        item.pointer.transform('R' + item.pointer.angle + "," + item.getBBox().cx + "," + item.getBBox().cy + 'T0,0');
                    }
                    if(!!item.timer) {
                        item.timer.attr('x', parseFloat(item.timer.attr('x')) + dx);
                        item.timer.transform('R' + item.timer.angle + "," + item.getBBox().cx + "," + item.getBBox().cy + 'T0,0');
                    }
                }

                if(bb.x2 + me.configs.containerSpace > x2) {
                    var dx = bb.x2 + me.configs.containerSpace - x2;
                    item.attr('x', parseFloat(item.attr('x')) - dx);
                    item.label.attr('x', parseFloat(item.label.attr('x')) - dx);
                    if(!!item.pointer) {
                        item.pointer.attr('x', parseFloat(item.pointer.attr('x')) - dx);
                        item.pointer.transform('R' + item.pointer.angle + "," + item.getBBox().cx + "," + item.getBBox().cy + 'T0,0');
                    }
                    if(!!item.timer) {
                        item.timer.attr('x', parseFloat(item.timer.attr('x')) - dx);
                        item.timer.transform('R' + item.timer.angle + "," + item.getBBox().cx + "," + item.getBBox().cy + 'T0,0');
                    }
                }

                if(bb.y - me.configs.containerSpace < y) {
                    var dy = y - bb.y + me.configs.containerSpace;
                    item.attr('y', parseFloat(item.attr('y')) + dy);
                    item.label.attr('y', parseFloat(item.label.attr('y')) + dy);
                    if(!!item.pointer) {
                        item.pointer.attr('y', parseFloat(item.pointer.attr('y')) + dy);
                        item.pointer.transform('R' + item.pointer.angle + "," + item.getBBox().cx + "," + item.getBBox().cy + 'T0,0');
                    }
                    if(!!item.timer) {
                        item.timer.attr('y', parseFloat(item.timer.attr('y')) + dy);
                        item.timer.transform('R' + item.timer.angle + "," + item.getBBox().cx + "," + item.getBBox().cy + 'T0,0');
                    }
                }

                if(bb.y2 + me.configs.containerSpace > y2) {
                    var dy = bb.y2 + me.configs.containerSpace - y2;
                    item.attr('y', parseFloat(item.attr('y')) - dy);
                    item.label.attr('y', parseFloat(item.label.attr('y')) - dy);
                    if(!!item.pointer) {
                        item.pointer.attr('y', parseFloat(item.pointer.attr('y')) - dy);
                        item.pointer.transform('R' + item.pointer.angle + "," + item.getBBox().cx + "," + item.getBBox().cy + 'T0,0');
                    }
                    if(!!item.timer) {
                        item.timer.attr('y', parseFloat(item.timer.attr('y')) - dy);
                        item.timer.transform('R' + item.timer.angle + "," + item.getBBox().cx + "," + item.getBBox().cy + 'T0,0');
                    }
                }

                item.contains.transform('T0,0');
            }
        } else {
            container.attr({
                width: container.defaultSize.width,
                height: container.defaultSize.height
            });
        }
    },
    // It should just undo the last things done
    undo: function() {
        var me = interfaceGraphic,
            viewTab = me.viewTabs[me.currentTagName];
        var stack = STACK_LIST.getStack(me.currentTagName);
        if(stack) {
            var item = stack.object;
            if(stack.method === STACK_METHODS.CREATE) {
                if(item.objType === OBJECTS.CONTROL) {
                    this.removeControl(item);
                } else if(item.objType === OBJECTS.TEXT) {
                    viewTab.g.removeText(item);
                } else { // if shape
                    if(!!item.outline) {
                        item.outline.remove();
                    }
                    item.remove();
                }
            } else if(stack.method === STACK_METHODS.MOVE) {
                if(item.objType === OBJECTS.CONTROL || item.objType === OBJECTS.TEXT) {
                    item.attr({
                        x: parseFloat(item.attr('x')) - stack.data.dx,
                        y: parseFloat(item.attr('y')) - stack.data.dy
                    });
                    item.info.x = parseFloat(item.attr('x'));
                    item.info.y = parseFloat(item.attr('y'));
                }
            } else if(stack.method === STACK_METHODS.REMOVE) {
                // Action
            }

            STACK_LIST.removeStack(stack);
        }
    },
    // Check inside draw panel
    isInside: function() {
        var me = interfaceGraphic,
            viewTab = me.viewTabs[me.currentTagName];
        if(viewTab) {
            return viewTab.g.isInside();
        }
        return false;
    },
    // active icons
    activeIcons: function(keyOn, valOn, keyOff, valOff) {
        var me = interfaceGraphic,
            viewTab = me.viewTabs[me.currentTagName];
        if(!!viewTab && !!viewTab["bgTop"] && !!viewTab["bgBottom"]) {
            if(keyOn === undefined) {
                keyOn = 'isSelector';
            }
            if(valOn === undefined) {
                valOn = true;
            }
            if(keyOff === undefined) {
                keyOff = '';
            }
            if(valOff === undefined) {
                valOff = false;
            }
            for(var key in toolIcons) {
                if(key === keyOn) {
                    toolIcons[key] = valOn;
                } else if(key === keyOff) {
                    toolIcons[key] = valOff;
                } else {
                    toolIcons[key] = false;
                }
            }
            if(!toolIcons.isAddText) {
                // Add Text and Off textBox
                var input = viewTab.g.input;
                if(!!input) {
                    if(input.value.trim() != "") {
                        var text = viewTab.g.createText({
                            x: input.x,
                            y: input.y,
                            text: input.value
                        });
                    } else {
                        // Off input
                        viewTab.g.turnOnTextBoxToAddText(false);
                        // Reset input value
                        input.value = "";
                    }
                }
            }
            // If zoom active
            viewTab.g.panZoom.enable(toolIcons.isZoom);
            // if move active
            viewTab.g.panZoom.move(toolIcons.isMoving);

            return true;
        } else if(keyOn === false) {
            for(var key in toolIcons) {
                toolIcons[key] = false;
            }
        } else {
            for(var key in toolIcons) {
                toolIcons[key] = false;
            }
            if(!viewTab) {
                Signals.send("onNotification", {method: "message", message: "Please add a root view!"});
            } else {
                Signals.send("onNotification", {
                    method: "message",
                    message: "Please import top/bottom view image!"
                });
            }
        }
        // Reset variable
        GB.points = new Array();
        if(this.selectedArea.shape !== undefined) {
            this.selectedArea.shape.remove();
            this.selectedArea.shape = undefined;
        }

        return false;
    }
};

},{'../../../common/services/stack.js':'src/common/services/stack','../../../common/services/graphic.js':'src/common/services/graphic','../../../common/services/utils.js':'src/common/services/utils'}],'src/views/progress/wiring/graphic':[function (module,exports,global,require,request){
//

var Signals = require('enyo/Signals');
var IS_TOUCH = require('enyo/platform').touch;

var STACK_LIST = require('../../../common/services/stack.js').STACK_LIST;
var STACK_TYPES = require('../../../common/services/stack.js').STACK_TYPES;
var STACK_METHODS = require('../../../common/services/stack.js').STACK_METHODS;
var Graphic = require('../../../common/services/graphic.js');
var utils = require('../../../common/services/utils.js');

var wiringGraphic = module.exports = {
    configs: {
        zoomStep: 0.2,
        distanceY: 80,
        distanceAdaptor: 30,
        distanceSensor: 10
    },
    panel: null,
    width: 0,
    height: 0,
    isCollapsed: false,
    queues: {},
    currentTagName: null,
    currentItem: undefined,
    currentController: undefined,
    mController: new Collection(),
    mAdaptor: new Collection(),
    mSensor: new Collection(),
    mObjectController: new Collection(),
    mObjectAdaptor: new Collection(),
    mObjectSensor: new Collection(),
    reset: function() {
        if(this.g) {
            $('#' + this.g.svgName).remove();
            $('#' + this.g.inputName).remove();
            delete this.g;
        }
        this.queues = {};
        this.currentTagName = null;
        this.currentItem = undefined;
        this.currentController = undefined;
        this.mController = new Collection();
        this.mAdaptor = new Collection();
        this.mSensor = new Collection();
        this.mObjectController = new Collection();
        this.mObjectAdaptor = new Collection();
        this.mObjectSensor = new Collection();
        this.loaded = false;
    },
    init: function(svg, input) {
        this.currentTagName = svg.getId();
        this.g = new Graphic(
            svg.getId(),
            input.getId(),
            this,
            this.width,
            this.height,
            this.configs,
            this.onMouseDown,
            this.onMouseMove,
            this.onMouseUp,
            this.onStart,
            this.onMove,
            this.onEnd,
            this.fIn,
            this.fOut
        );
        // Add highlight
        this.g.appendChild(utils.makeHighlight(this.currentTagName + "_highlight"));
        this.g.rootNode.attr('class', 'svg-root');

        if(!!this.deviceList) {
            for(var i = 0; i < this.deviceList.length; i++) {
                // Master (Tree root)
                var controller = this.createController({
                    id: this.deviceList[i].id,
                    name: this.deviceList[i].name,
                    url: "assets/images/temps/wiring/master-controller.png",
                    x: 0,
                    y: 0,
                    w: 130,
                    h: 90
                });
                // Adaptor
                for(var j = 0; j < this.deviceList[i].adaptors.length; j++) {
                    this.createAdaptor(controller, {
                        id: this.deviceList[i].adaptors[j].id,
                        name: this.deviceList[i].adaptors[j].title.split(" ")[0],
                        url: "assets/images/temps/wiring/equipment.png",
                        w: 79,
                        h: 117
                    });
                }
            }

            // Move to center
            this.moveToCenter();
            // TurnOn
            this.turnOnEntity(1);
        }

        this.loaded = true;

        // Run queues
        for(var command in this.queues) {
            var values = this.queues[command];
            this[command](values[0], values[1]);
        }
        this.queues = {};
    },
    onMouseDown: function(e) {
        //wiringGraphic.deSelectedItems();
    },
    // fn draw shape mouse move
    onMouseMove: function(e) {
    },
    // fn draw shape mouse up
    onMouseUp: function(e) {
    },
    // fn fin
    fIn: function(e) {
    },
    // fn fout
    fOut: function() {
    },
    // fn onstart
    onStart: function(x, y) {
        var me = wiringGraphic;
        if(!me.g || (me.g && !me.g.verify(this))) {
            return false;
        }

        this.dx = 0;
        this.dy = 0;
        // Set available
        me.currentItem = this;
    },
    // fn onmove
    onMove: function(dx, dy) {
        var me = wiringGraphic;
        if(!me.g || (me.g && !me.g.verify(this))) {
            return false;
        }

        dx = dx * wiringGraphic.g.scale;
        dy = dy * wiringGraphic.g.scale;
        this.transform("T" + dx + "," + dy);
        if(this.objType === OBJECTS.CONTROLLER) {
            var controllerId = this.info.id;
            wiringGraphic.mObjectAdaptor.forEach(function(adaptor) {
                if(adaptor.info.controllerId === controllerId) {
                    adaptor.transform('T' + dx + ',' + dy);
                    adaptor.connectPath.transform('T' + dx + ',' + dy);
                    wiringGraphic.mObjectSensor.forEach(function(sensor) {
                        if(sensor.info.controllerId == controllerId && sensor.info.adaptorId === adaptor.id) {
                            sensor.transform('T' + dx + ',' + dy);
                            sensor.connectPath.transform('T' + dx + ',' + dy);
                        }
                    });
                }
            });
        } else if(this.objType == OBJECTS.ADAPTOR) {
            var bb = this.getBBox();
            var path = Snap.parsePathString(this.connectPath.attr('path'));
            path[1][1] = bb.cx;
            path[1][2] = bb.y;
            this.connectPath.attr("path", path.toString());
            var controllerId = this.info.controllerId;
            var adaptorId = this.info.id;
            wiringGraphic.mObjectSensor.forEach(function(sensor) {
                if(sensor.info.controllerId == controllerId && sensor.info.adaptorId === adaptorId) {
                    sensor.transform('T' + dx + ',' + dy);
                    sensor.connectPath.transform('T' + dx + ',' + dy);
                }
            });
        } else if(this.objType == OBJECTS.SENSOR) {
            var bb = this.getBBox();
            var path = Snap.parsePathString(this.connectPath.attr('path'));
            path[1][1] = bb.cx;
            path[1][2] = bb.y;
            this.connectPath.attr("path", path.toString());
        }
        this.dx = dx;
        this.dy = dy;
        GB.isStart = true;
    },
    // fn onend
    onEnd: function(e) {
        var me = wiringGraphic;
        if(!me.g || (me.g && !me.g.verify(this))) {
            return false;
        }
        var dx = this.dx,
            dy = this.dy;
        if(GB.isStart) {
            if(this.objType == OBJECTS.CONTROLLER) {
                // Image
                this[0].attr({
                    x: parseFloat(this[0].attr('x')) + dx,
                    y: parseFloat(this[0].attr('y')) + dy
                });
                // Label
                this[1].attr({
                    x: parseFloat(this[1].attr('x')) + dx,
                    y: parseFloat(this[1].attr('y')) + dy
                });
                for(var i = 1; i <= this[1].length; i++) {
                    this[1].select('tspan:nth-of-type(' + i + ')').attr({
                        x: parseFloat(this[1].attr('x'))
                    });
                }
                var controllerId = this.info.id;
                me.mObjectAdaptor.forEach(function(adaptor) {
                    if(adaptor.info.controllerId === controllerId) {
                        adaptor[0].attr({
                            x: parseFloat(adaptor[0].attr('x')) + dx,
                            y: parseFloat(adaptor[0].attr('y')) + dy
                        });
                        adaptor[1].attr({
                            x: parseFloat(adaptor[1].attr('x')) + dx,
                            y: parseFloat(adaptor[1].attr('y')) + dy
                        });
                        adaptor.transform('T0,0');
                        var path = Snap.parsePathString(adaptor.connectPath.attr('path'));
                        for(var i = 0; i < path.length; i++) {
                            path[i][1] += dx;
                            path[i][2] += dy;
                        }
                        adaptor.connectPath.attr("path", path.toString());
                        adaptor.connectPath.transform('T0,0');
                        me.mObjectSensor.forEach(function(sensor) {
                            if(sensor.info.controllerId == controllerId && sensor.info.adaptorId === adaptor.id) {
                                sensor.attr({
                                    x: parseFloat(sensor.attr('x')) + dx,
                                    y: parseFloat(sensor.attr('y')) + dy
                                });
                                sensor.transform('T0,0');
                                var path = Snap.parsePathString(sensor.connectPath.attr('path'));
                                for(var i = 0; i < path.length; i++) {
                                    path[i][1] += dx;
                                    path[i][2] += dy;
                                }
                                sensor.connectPath.attr("path", path.toString());
                                sensor.connectPath.transform('T0,0');
                            }
                        });
                    }
                });
            } else if(this.objType == OBJECTS.ADAPTOR) {
                this[0].attr({
                    x: parseFloat(this[0].attr('x')) + dx,
                    y: parseFloat(this[0].attr('y')) + dy
                });
                this[1].attr({
                    x: parseFloat(this[1].attr('x')) + dx,
                    y: parseFloat(this[1].attr('y')) + dy
                });
                var controllerId = this.info.controllerId;
                var adaptorId = this.info.id;
                me.mObjectSensor.forEach(function(sensor) {
                    if(sensor.info.controllerId == controllerId && sensor.info.adaptorId === adaptorId) {
                        sensor.attr({
                            x: parseFloat(sensor.attr('x')) + dx,
                            y: parseFloat(sensor.attr('y')) + dy
                        });
                        sensor.transform('T0,0');
                        var path = Snap.parsePathString(sensor.connectPath.attr('path'));
                        for(var i = 0; i < path.length; i++) {
                            path[i][1] += dx;
                            path[i][2] += dy;
                        }
                        sensor.connectPath.attr("path", path.toString());
                        sensor.connectPath.transform('T0,0');
                    }
                });

                // Add stack list
                STACK_LIST.addStack(me.currentTagName, me.panel.name, STACK_TYPES.SVG, STACK_METHODS.MOVE, this, {
                    dx: dx,
                    dy: dy
                });
            } else if(this.objType == OBJECTS.SENSOR) {
                this.attr({
                    x: parseFloat(this.attr('x')) + dx,
                    y: parseFloat(this.attr('y')) + dy
                });

                // Add stack list
                STACK_LIST.addStack(me.currentTagName, me.panel.name, STACK_TYPES.SVG, STACK_METHODS.MOVE, this, {
                    dx: dx,
                    dy: dy
                });
            }
            this.transform('T0,0');
        }

        // Reset
        me.currentItem = undefined;
        GB.isStart = false;
    },
    // select item by controllerId and adaptorId
    selectItem: function(controllerId, adaptorId) {
        if(this.loaded) {
            if(controllerId != undefined && adaptorId != undefined) {
                this.mObjectAdaptor.forEach(function(item) {
                    if(item.info.controllerId === controllerId) {
                        if(item.info.id === adaptorId) {
                            item.selectChange(true);
                        } else {
                            item.selectChange(false);
                        }
                    }
                });
            } else if(controllerId != undefined) {
                this.turnOnEntity(controllerId);
            }
        } else {
            this.addQueue("selectItem", controllerId, adaptorId)
        }
    },
    // Add queue if not ready
    addQueue: function(command, value1, value2) {
        this.queues[command] = [value1, value2];
    },
    // deselect items in array selecteditems
    deSelectedItems: function(controllerId) {
        this.mObjectAdaptor.forEach(function(item) {
            if(item.info.controllerId === controllerId) {
                item.selectChange(false);
            }
        });
    },
    drawController: function(object) {
        var me = wiringGraphic,
            controller = me.g.group();
        var img = me.g.image(object.url, object.x, object.y, object.w, object.h).attr({
            class: 'svg-controller',
            controllerId: object.id
        });
        controller.add(img);

        var text = object.name.split(' ');
        // Create label
        var label = me.g.drawText({x: controller.getBBox().cx, y: controller.getBBox().cy - 5, text: text}, true);
        label.attr({
            fill: "#FFF",
            fontSize: 12,
            fontWeight: 'bold',
            class: 'svg-controller',
            controllerId: object.id
        });
        label.length = text.length;
        if(text.length == 1) {
            label.select('tspan:nth-of-type(1)').attr({x: parseFloat(label.attr('x')), dy: 10});
        } else if(text.length == 2) {
            label.select('tspan:first-of-type').attr({x: parseFloat(label.attr('x')), dy: 0});
            label.select('tspan:last-of-type').attr({x: parseFloat(label.attr('x')), dy: 15});
        } else {
            label.select('tspan:first-of-type').attr({x: parseFloat(label.attr('x')), dy: 0});
            label.select('tspan:last-of-type').attr({x: parseFloat(label.attr('x')), dy: 15});
        }
        controller.add(label);

        controller.id = object.id;
        controller.info = object;
        controller.objType = OBJECTS.CONTROLLER;

        controller.selectChange = function(flag) {

        };

        controller.click(function() {
            this.selectChange(true);
            Signals.send("onWiringSelectItem", {controllerId: object.id});
        });

        controller.drag(me.onMove, me.onStart, me.onEnd);

        controller.attr({
            class: 'svg-controller',
            controllerId: object.id
        });

        return controller;
    },
    drawAdaptor: function(object) {
        var me = wiringGraphic,
            adaptor = me.g.group();
        var img = me.g.image(object.url, object.x, object.y, object.w, object.h).attr({
            class: 'svg-adaptor',
            controllerId: object.controllerId,
            adaptorId: object.id
        });

        adaptor.add(img);

        // Create label
        var label = me.g.drawText({
            x: (object.x * 2 + object.w) / 2,
            y: object.y + 35,
            text: object.name
        }, true);
        label.attr({
            fill: "#FFFFFF",
            fontSize: 11,
            fontWeight: 'bold',
            class: 'svg-adaptor',
            controllerId: object.controllerId,
            adaptorId: object.id
        });
        adaptor.add(label);

        adaptor.id = object.id;
        adaptor.controllerId = object.controllerId;
        adaptor.info = object;
        adaptor.objType = OBJECTS.ADAPTOR;

        adaptor.selectChange = function(flag) {
            if(flag) {
                this.attr({filter: "url(#" + me.currentTagName + "_highlight)"});
            } else {
                this.attr({filter: "none"});
            }
            // Highlight sensor children
            me.mObjectSensor.forEach(function(sensor) {
                if(sensor.info.controllerId == adaptor.info.controllerId && sensor.info.adaptorId === adaptor.info.id) {
                    sensor.selectChange(flag);
                } else {
                    sensor.selectChange(!flag);
                }
            });
        };

        if(IS_TOUCH) { // On Mobile
            adaptor.touchstart(function() {
                this.selectChange(true);
                Signals.send("onWiringSelectItem", {
                    controllerId: object.controllerId,
                    adaptorId: object.id,
                    isStack: true
                });
            });
        } else { // On Desktop
            adaptor.click(function() {
                this.selectChange(true);
                Signals.send("onWiringSelectItem", {
                    controllerId: object.controllerId,
                    adaptorId: object.id,
                    isStack: true
                });
            });
        }

        adaptor.drag(me.onMove, me.onStart, me.onEnd);

        adaptor.attr({
            class: 'svg-adaptor',
            controllerId: object.controllerId,
            adaptorId: object.id
        });

        return adaptor;
    },
    drawSensor: function(object) {
        var me = wiringGraphic,
            sensor = me.g.image(object.url, object.x, object.y, object.w, object.h);
        sensor.controllerId = object.controllerId;
        sensor.adaptorId = object.adaptorId;
        sensor.floorId = object.floorId;
        sensor.zoneId = object.zoneId;
        sensor.sensorId = object.sensorId;
        sensor.info = object;
        sensor.objType = OBJECTS.SENSOR;

        sensor.selectChange = function(flag) {
            if(flag) {
                this.attr({filter: "url(#" + me.currentTagName + "_highlight)"});
            } else {
                this.attr({filter: "none"});
            }
        };

        sensor.drag(me.onMove, me.onStart, me.onEnd);

        sensor.attr({
            class: 'svg-sensor',
            controllerId: object.controllerId,
            adaptorId: object.adaptorId,
            floorId: sensor.floorId,
            zoneId: sensor.zoneId,
            sensorId: sensor.sensorId
        });

        return sensor;
    },
    createController: function(options) {
        options.x = options.x * this.g.scale + this.g.panZoom.getCurrentPosition().x;
        options.y = options.y * this.g.scale + this.g.panZoom.getCurrentPosition().y;

        var con = new Controller(options.id, options.name, options.url, options.x, options.y, options.w, options.h);
        this.mController.add(con);
        var controller = this.drawController(con);
        this.mObjectController.add(controller);

        return controller;
    },
    createAdaptor: function(controller, options) {
        var ad = new Adaptor(options.id, options.name, controller.id, options.url, 0, 0, options.w, options.h);
        this.mAdaptor.add(ad);
        controller.info.adaptors.add(ad);
        var adaptor = this.drawAdaptor(ad);
        this.mObjectAdaptor.add(adaptor);
        adaptor.parentControler = controller;

        // Get Position
        var distanceAdaptor = this.configs.distanceAdaptor;
        var bb = controller.getBBox();
        var x = bb.cx - (options.w * (controller.info.adaptors.count) + distanceAdaptor * (controller.info.adaptors.count - 1)) / 2;
        var y = bb.y2 + this.configs.distanceY;

        // Rearrange position
        this.mObjectAdaptor.forEach(function(item) {
            if(item.parentControler === controller) {
                item[0].attr({
                    x: x,
                    y: y
                });
                var bbItem = item[0].getBBox();
                if(item[1]) {
                    item[1].attr({
                        x: bbItem.cx,
                        y: y + 35
                    });
                }
                // Draw connection
                if(item.connectPath != undefined) item.connectPath.remove();
                item.connectPath = wiringGraphic.g.path("M" + bb.cx + " " + bb.y2 + "L" + bbItem.cx + " " + bbItem.y).attr({
                    stroke: "#525380",
                    'stroke-width': 3,
                    class: 'svg-path-adaptor',
                    controllerId: controller.id,
                    adaptorId: adaptor.info.id
                });
                x += options.w + distanceAdaptor;
            }
        });

        return adaptor;
    },
    createSensor: function(adaptor, quantity, options) {
        for(var i = 0; i < quantity; i++) {
            var sen = new SensorForAdaptor(
                options.controllerId,
                options.adaptorId,
                options.floorId,
                options.zoneId,
                options.sensorId,
                options.url,
                0,
                0,
                options.w,
                options.h,
                options.sender
            );
            this.mSensor.add(sen, true);

            var sensor = this.drawSensor(sen);
            this.mObjectSensor.add(sensor, true);
            sensor.parentAdaptor = adaptor;

            // Save to store
            adaptor.info.sensors.add(sensor);

            // Highlight sensor
            sensor.selectChange(true);
        }

        // Check item on folderBar
        Signals.send("onWiringFolderBarItem", {sender: options.sender, check: true});

        // Rearrange position
        this.rearrangeSensor(adaptor, options.w);

        wiringGraphic.g.rootNode.transform('T0,0');
    },
    createSensorByAdaptor: function(data, cb) {
        var adaptor = false;
        for(var i = 0; i < this.mObjectAdaptor.count; i++) {
            if(this.mObjectAdaptor.collection[i].info.controllerId === data.controllerId && this.mObjectAdaptor.collection[i].info.id === data.adaptorId) {
                adaptor = this.mObjectAdaptor.collection[i];
                break;
            }
        }
        if(adaptor) {
            this.createSensor(
                adaptor,
                1,
                {
                    controllerId: data.controllerId,
                    adaptorId: data.adaptorId,
                    floorId: data.sensor.floorId,
                    zoneId: data.sensor.zoneId,
                    sensorId: data.sensor.sensorId,
                    url: data.sensor.url,
                    sender: data.sender,
                    w: 30,
                    h: 30
                }
            );
        }

        // Callback
        if(typeof cb === 'function') {
            cb();
        }
    },
    removeSensorByOption: function(options) {
        var sensor, adaptor, sensors = [];
        for(var i = 0; i < this.mObjectSensor.count; i++) {
            sensor = this.mObjectSensor.collection[i];
            if(
                sensor.controllerId === options.controllerId &&
                sensor.adaptorId === options.adaptorId &&
                sensor.floorId === options.floorId &&
                sensor.zoneId === options.zoneId &&
                sensor.sensorId === options.sensorId &&
                sensor.info.sender === options.sender
            ) {
                sensors.push(sensor);
            }
        }

        if(sensors.length > 0) {
            for(var i = 0; i < sensors.length; i++) {
                sensor = sensors[i];
                adaptor = sensor.parentAdaptor;

                // Remove Sensor
                this.mSensor.remove(sensor);
                sensor.parentAdaptor.info.sensors.remove(sensor);
                if(sensor.connectPath) {
                    sensor.connectPath.remove();
                }
                this.mObjectSensor.remove(sensor);
                sensor.remove();
            }

            // UnCheck item on folderBar
            Signals.send("onWiringFolderBarItem", {sender: options.sender, check: false});

            // Rearrange position
            this.rearrangeSensor(sensor.parentAdaptor, sensor.info.w);
        }
    },
    // Rearrange Position For Sensor
    rearrangeSensor: function(adaptor, width) {
        // Get Position
        var distanceAdaptor = this.configs.distanceSensor;
        var bb = adaptor.getBBox();
        var x = bb.cx - (width * (adaptor.info.sensors.count) + distanceAdaptor * (adaptor.info.sensors.count - 1)) / 2;
        var y = bb.y2 + this.configs.distanceY;

        // Rearrange position
        this.mObjectSensor.forEach(function(sensor) {
            if(sensor.parentAdaptor === adaptor) {
                sensor.attr({
                    x: x,
                    y: y
                });
                x += width + distanceAdaptor;
                // Draw connection
                if(sensor.connectPath != undefined) {
                    sensor.connectPath.remove();
                }
                var bbItem = sensor.getBBox();
                sensor.connectPath = wiringGraphic.g.path("M" + bb.cx + " " + bb.y2 + "L" + bbItem.cx + " " + bbItem.y).attr({
                    stroke: "#525380",
                    'stroke-width': 3,
                    class: 'svg-path-sensor',
                    controllerId: sensor.controllerId,
                    adaptorId: sensor.adaptorId,
                    floorId: sensor.floorId,
                    zoneId: sensor.zoneId,
                    sensorId: sensor.sensorId
                });
            }
        });
    },
    setSize: function(width, height) {
        var me = wiringGraphic;
        me.width = width;
        me.height = height;
        if(!!me.loaded) {
            me.g.setSize(width, height);
            me.moveToCenter();
        }
    },
    moveToCenter: function() {
        var me = wiringGraphic,
            cx = me.width / 2,
            cy = me.height / 2,
            bb = me.g.rootNode.getBBox(),
            dx = cx - bb.cx,
            dy = cy - bb.cy;

        me.mObjectController.forEach(function(controller) {
            // Image
            controller[0].attr({
                x: parseFloat(controller[0].attr('x')) + dx,
                y: parseFloat(controller[0].attr('y')) + dy
            });
            // Label
            controller[1].attr({
                x: parseFloat(controller[1].attr('x')) + dx,
                y: parseFloat(controller[1].attr('y')) + dy
            });
            for(var i = 1; i <= controller[1].length; i++) {
                controller[1].select('tspan:nth-of-type(' + i + ')').attr({
                    x: parseFloat(controller[1].attr('x'))
                });
            }
            var controllerId = controller.info.id;
            me.mObjectAdaptor.forEach(function(adaptor) {
                if(adaptor.info.controllerId === controllerId) {
                    adaptor[0].attr({
                        x: parseFloat(adaptor[0].attr('x')) + dx,
                        y: parseFloat(adaptor[0].attr('y')) + dy
                    });
                    adaptor[1].attr({
                        x: parseFloat(adaptor[1].attr('x')) + dx,
                        y: parseFloat(adaptor[1].attr('y')) + dy
                    });
                    adaptor.transform('T0,0');
                    var path = Snap.parsePathString(adaptor.connectPath.attr('path'));
                    for(var i = 0; i < path.length; i++) {
                        path[i][1] += dx;
                        path[i][2] += dy;
                    }
                    adaptor.connectPath.attr("path", path.toString());
                    adaptor.connectPath.transform('T0,0');
                    me.mObjectSensor.forEach(function(sensor) {
                        if(sensor.info.controllerId == controllerId && sensor.info.adaptorId === adaptor.id) {
                            sensor.attr({
                                x: parseFloat(sensor.attr('x')) + dx,
                                y: parseFloat(sensor.attr('y')) + dy
                            });
                            sensor.transform('T0,0');
                            var path = Snap.parsePathString(sensor.connectPath.attr('path'));
                            for(var i = 0; i < path.length; i++) {
                                path[i][1] += dx;
                                path[i][2] += dy;
                            }
                            sensor.connectPath.attr("path", path.toString());
                            sensor.connectPath.transform('T0,0');
                        }
                    });
                }
            });
        });
        me.g.rootNode.transform("T0,0");
    },
    // Turn on by controllerId
    turnOnEntity: function(controllerId) {
        this.mObjectController.forEach(function(controller) {
            if(controller.id === controllerId) {
                controller.attr({
                    display: ""
                });
                wiringGraphic.currentController = controller;
            } else {
                controller.attr({
                    display: "none"
                });
            }
        });
        var ad = false;
        this.mObjectAdaptor.forEach(function(adaptor) {
            if(adaptor.controllerId === controllerId) {
                adaptor.attr({
                    display: ""
                });
                if(adaptor.connectPath != undefined) {
                    adaptor.connectPath.attr({
                        display: ""
                    });
                }
                ad = adaptor;
            } else {
                adaptor.attr({
                    display: "none"
                });
                if(adaptor.connectPath != undefined) {
                    adaptor.connectPath.attr({
                        display: "none"
                    });
                }
                adaptor.selectChange(false);
            }
        });

        if(ad) Signals.send("onWiringSelectItem", {controllerId: ad.controllerId, adaptorId: ad.id});

        this.mObjectSensor.forEach(function(sensor) {
            if(sensor.controllerId === controllerId) {
                sensor.attr({
                    display: ""
                });
                if(sensor.connectPath != undefined) {
                    sensor.connectPath.attr({
                        display: ""
                    });
                }
            } else {
                sensor.attr({
                    display: "none"
                });
                if(sensor.connectPath != undefined) {
                    sensor.connectPath.attr({
                        display: "none"
                    });
                }
            }
        });

        this.moveToCenter();
    },
    // It should just undo the last things done
    undo: function() {
        var me = wiringGraphic;
        var stack = STACK_LIST.getStack(me.currentTagName);
        if(stack) {
            var item = stack.object;
            if(stack.method === STACK_METHODS.MOVE) {
                if(item.objType == OBJECTS.ADAPTOR) {
                    item[0].attr({
                        x: parseFloat(item[0].attr('x')) - stack.data.dx,
                        y: parseFloat(item[0].attr('y')) - stack.data.dy
                    });
                    item[1].attr({
                        x: parseFloat(item[1].attr('x')) - stack.data.dx,
                        y: parseFloat(item[1].attr('y')) - stack.data.dy
                    });

                    // Connection
                    var bb = item.getBBox();
                    var path = Snap.parsePathString(item.connectPath.attr('path'));
                    path[1][1] = bb.cx;
                    path[1][2] = bb.y;
                    item.connectPath.attr("path", path.toString());

                    var controllerId = item.info.controllerId;
                    var adaptorId = item.info.id;
                    me.mObjectSensor.forEach(function(sensor) {
                        if(sensor.info.controllerId == controllerId && sensor.info.adaptorId === adaptorId) {
                            sensor.attr({
                                x: parseFloat(sensor.attr('x')) - stack.data.dx,
                                y: parseFloat(sensor.attr('y')) - stack.data.dy
                            });
                            sensor.transform('T0,0');

                            // Connection
                            var path = Snap.parsePathString(sensor.connectPath.attr('path'));
                            for(var i = 0; i < path.length; i++) {
                                path[i][1] -= stack.data.dx;
                                path[i][2] -= stack.data.dy;
                            }
                            sensor.connectPath.attr("path", path.toString());
                            sensor.connectPath.transform('T0,0');
                        }
                    });
                } else if(item.objType === OBJECTS.SENSOR) {
                    item.attr({
                        x: parseFloat(item.attr('x')) - stack.data.dx,
                        y: parseFloat(item.attr('y')) - stack.data.dy
                    });

                    // Connection
                    var bb = item.getBBox();
                    var path = Snap.parsePathString(item.connectPath.attr('path'));
                    path[1][1] = bb.cx;
                    path[1][2] = bb.y;
                    item.connectPath.attr("path", path.toString());
                }
            }
            STACK_LIST.removeStack(stack);
        }
    }
};

},{'../../../common/services/stack.js':'src/common/services/stack','../../../common/services/graphic.js':'src/common/services/graphic','../../../common/services/utils.js':'src/common/services/utils'}],'src/data/models':[function (module,exports,global,require,request){
// Generated by DDL Code Generator
// on 2017-01-30 18:00:51 UTC
// from /home/jfilling/work/hcontroller_0/Database/current/current-schema.sql.

var kind = require('enyo/kind');
var RelationalModel = require('enyo/RelationalModel');

const tablesDefinitionsDDLMD5Hash = "940fb9a242d1806bb528481856450a1f"

// AirInfiltrationLoad
var AirInfiltrationLoad = exports.AirInfiltrationLoad = kind({
	name: "AirInfiltrationLoad",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		Infiltration: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		zone: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'zone',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
]})

// AllowedRange
var AllowedRange = exports.AllowedRange = kind({
	name: "AllowedRange",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		rangeLow: null,
		rangeHigh: null,
		probabilityMatrix: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		variable: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'variable',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
]})

// Analog
var Analog = exports.Analog = kind({
	name: "Analog",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		nominal: null,
		rangeMax: null,
		rangeMin: null,
		lastModified: null,
		// Primary Attributes
		interfaceTypes: null,
	},
	relations: [
		// Primary relationships
		{
			key: 'interfaceTypes',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// Animation
var Animation = exports.Animation = kind({
	name: "Animation",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		animationType: null,
		animationTag: null,
		animationMethod: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		variable: null,
		image: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'variable',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'image',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
]})

// AutoPreference
var AutoPreference = exports.AutoPreference = kind({
	name: "AutoPreference",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		summerCLO: null,
		winterCLO: null,
		summerNightCLO: null,
		locked: null,
		winterNightCLO: null,
		lastModified: null,
		// Primary Attributes
		comforts: null,
	},
	relations: [
		// Primary relationships
		{
			key: 'comforts',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// Branch
var Branch = exports.Branch = kind({
	name: "Branch",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		type: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		eqMassFlow: null,
		// Primary Attributes
		equipmentClasses: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'eqMassFlow',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		// Primary relationships
		{
			key: 'equipmentClasses',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// BuildingModel
var BuildingModel = exports.BuildingModel = kind({
	name: "BuildingModel",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		type: null,
		fileName: null,
		file: null,
		heatLossUA: null,
		designDayHeating: null,
		designDayCooling: null,
		designExtreme: null,
		lastModified: null,
		locked: null,
		// Primary Attributes
		buildings: null,
	},
	relations: [
		// Primary relationships
		{
			key: 'buildings',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// Building
var Building = exports.Building = kind({
	name: "Building",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		name: null,
		notes: null,
		buildingType: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		buildingModel: null,
		image: null,
		// Primary Attributes
		systems: null,
		floors: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'buildingModel',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'image',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		// Primary relationships
		{
			key: 'systems',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'floors',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// Comfort
var Comfort = exports.Comfort = kind({
	name: "Comfort",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		naturalConditioning: null,
		settingMode: null,
		allowAutoOccupancy: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		coolingSetting: null,
		occupant: null,
		heatingSetting: null,
		autoSetting: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'coolingSetting',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'occupant',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'heatingSetting',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'autoSetting',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
]})

// ConnectionNet
var ConnectionNet = exports.ConnectionNet = kind({
	name: "ConnectionNet",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		name: null,
		lastModified: null,
		locked: null,
		// Primary Attributes
		connectionNodes: null,
	},
	relations: [
		// Primary relationships
		{
			key: 'connectionNodes',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// ConnectionNode
var ConnectionNode = exports.ConnectionNode = kind({
	name: "ConnectionNode",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		nodeName: null,
		nodeType: null,
		svgTag: null,
		loopRequired: null,
		required: null,
		connectorType: null,
		sensorRequired: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		equipment: null,
		variable: null,
		net: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'equipment',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'variable',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'net',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
]})

// ControlType
var ControlType = exports.ControlType = kind({
	name: "ControlType",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		HVAC: null,
		lighting: null,
		irrigation: null,
		// Foreign attributes
		systems: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'systems',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
]})

// ControllerLibrary
var ControllerLibrary = exports.ControllerLibrary = kind({
	name: "ControllerLibrary",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		name: null,
		lastModified: null,
		locked: null,
		// Primary Attributes
		controllers: null,
	},
	relations: [
		// Primary relationships
		{
			key: 'controllers',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// Controller
var Controller = exports.Controller = kind({
	name: "Controller",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		deviceName: null,
		cardSlots: null,
		networkSupport: null,
		parentController: null,
		childController: null,
		serialNumber: null,
		version: null,
		canMaster: null,
		available: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		controllerLibrary: null,
		expansionCards: null,
		image: null,
		// Primary Attributes
		networkMasters: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'controllerLibrary',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'expansionCards',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'image',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		// Primary relationships
		{
			key: 'networkMasters',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// Coupling
var Coupling = exports.Coupling = kind({
	name: "Coupling",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		type: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		eqMassFlow: null,
		eqHeatTransfer: null,
		// Primary Attributes
		equipmentClasses: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'eqMassFlow',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'eqHeatTransfer',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		// Primary relationships
		{
			key: 'equipmentClasses',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// Device
var Device = exports.Device = kind({
	name: "Device",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		name: null,
		type: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		user: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'user',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
]})

// EnergyCost
var EnergyCost = exports.EnergyCost = kind({
	name: "EnergyCost",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		cost: null,
		unit: null,
		timeOfDay: null,
		lastModified: null,
		locked: null,
		// Primary Attributes
		sourceEnergies: null,
	},
	relations: [
		// Primary relationships
		{
			key: 'sourceEnergies',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// EquationDirectory
var EquationDirectory = exports.EquationDirectory = kind({
	name: "EquationDirectory",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		name: null,
		lastModified: null,
		locked: null,
		// Primary Attributes
		equatia: null,
	},
	relations: [
		// Primary relationships
		{
			key: 'equatia',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// Equation
var Equation = exports.Equation = kind({
	name: "Equation",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		name: null,
		function: null,
		notes: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		directory: null,
		// Primary Attributes
		loads: null,
		couplings: null,
		sensors: null,
		sourceSinks: null,
		mixers: null,
		stores: null,
		branches: null,
		routers: null,
		paths: null,
		variableJoins: null,
		transports: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'directory',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		// Primary relationships
		{
			key: 'loads',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'couplings',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'sensors',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'sourceSinks',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'mixers',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'stores',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'branches',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'routers',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'paths',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'variableJoins',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'transports',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// EquipmentClass
var EquipmentClass = exports.EquipmentClass = kind({
	name: "EquipmentClass",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		// Foreign attributes
		store: null,
		coupling: null,
		branch: null,
		source: null,
		transport: null,
		sink: null,
		load: null,
		router: null,
		path: null,
		sensor: null,
		mixer: null,
		// Primary Attributes
		equipments: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'store',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'coupling',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'branch',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'source',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'transport',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'sink',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'load',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'router',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'path',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'sensor',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'mixer',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		// Primary relationships
		{
			key: 'equipments',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// EquipmentGroup
var EquipmentGroup = exports.EquipmentGroup = kind({
	name: "EquipmentGroup",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		equipmentState: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		subsystem: null,
		equipment: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'subsystem',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'equipment',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
]})

// Equipment
var Equipment = exports.Equipment = kind({
	name: "Equipment",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		name: null,
		toolTip: null,
		parent: null,
		systemIndex: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		preferences: null,
		eclass: null,
		group: null,
		image: null,
		// Primary Attributes
		connectionNodes: null,
		equipmentGroups: null,
		manufacturers: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'preferences',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'eclass',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'group',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'image',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		// Primary relationships
		{
			key: 'connectionNodes',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'equipmentGroups',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'manufacturers',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// ErrorHandler
var ErrorHandler = exports.ErrorHandler = kind({
	name: "ErrorHandler",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		errorNotification: null,
		errorTimeout: null,
		escalationTime: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		managerLevel2: null,
		managerLevel1: null,
		managerLevel3: null,
		error: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'managerLevel2',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'managerLevel1',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'managerLevel3',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'error',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
]})

// EventCondition
var EventCondition = exports.EventCondition = kind({
	name: "EventCondition",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		eventType: null,
		errorName: null,
		errorSource: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		errorResolution: null,
		variable: null,
		// Primary Attributes
		issueNotes: null,
		eventConditia: null,
		errorHandlers: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'errorResolution',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'variable',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		// Primary relationships
		{
			key: 'issueNotes',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'eventConditia',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'errorHandlers',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// Floor
var Floor = exports.Floor = kind({
	name: "Floor",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		name: null,
		area: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		building: null,
		image: null,
		// Primary Attributes
		zones: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'building',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'image',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		// Primary relationships
		{
			key: 'zones',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// Folder
var Folder = exports.Folder = kind({
	name: "Folder",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		name: null,
		toolTip: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		folderviews: null,
		// Primary Attributes
		groups: null,
		systems: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'folderviews',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		// Primary relationships
		{
			key: 'groups',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'systems',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// FolderView
var FolderView = exports.FolderView = kind({
	name: "FolderView",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		name: null,
		lastModified: null,
		locked: null,
		// Primary Attributes
		folders: null,
	},
	relations: [
		// Primary relationships
		{
			key: 'folders',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// Group
var Group = exports.Group = kind({
	name: "Group",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		configuration: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		folder: null,
		// Primary Attributes
		equipments: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'folder',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		// Primary relationships
		{
			key: 'equipments',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// HistogramGroup
var HistogramGroup = exports.HistogramGroup = kind({
	name: "HistogramGroup",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		group: null,
		day: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		variable: null,
		// Primary Attributes
		histograms: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'variable',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		// Primary relationships
		{
			key: 'histograms',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// Histogram
var Histogram = exports.Histogram = kind({
	name: "Histogram",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		bin: null,
		value: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		histogram: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'histogram',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
]})

// IOCardLibrary
var IOCardLibrary = exports.IOCardLibrary = kind({
	name: "IOCardLibrary",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		name: null,
		lastModified: null,
		locked: null,
		// Primary Attributes
		ioModules: null,
	},
	relations: [
		// Primary relationships
		{
			key: 'ioModules',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// IOModule
var IOModule = exports.IOModule = kind({
	name: "IOModule",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		deviceName: null,
		type: null,
		slotNumber: null,
		portCount: null,
		peripherals: null,
		serialNumber: null,
		version: null,
		onLine: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		ioCardLibrary: null,
		pins: null,
		image: null,
		// Primary Attributes
		controllers: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'ioCardLibrary',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'pins',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'image',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		// Primary relationships
		{
			key: 'controllers',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// Image
var Image = exports.Image = kind({
	name: "Image",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		image: null,
		lastModified: null,
		locked: null,
		// Primary Attributes
		buildings: null,
		ioModules: null,
		floors: null,
		systems: null,
		equipments: null,
		controllers: null,
		animatia: null,
	},
	relations: [
		// Primary relationships
		{
			key: 'buildings',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'ioModules',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'floors',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'systems',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'equipments',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'controllers',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'animatia',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// InterfaceType
var InterfaceType = exports.InterfaceType = kind({
	name: "InterfaceType",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		wireNumber: null,
		value: null,
		// Foreign attributes
		boolean: null,
		wires: null,
		analog: null,
		// Primary Attributes
		routers: null,
		transports: null,
		sourceSinks: null,
		sensors: null,
		mixers: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'boolean',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'wires',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'analog',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		// Primary relationships
		{
			key: 'routers',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'transports',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'sourceSinks',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'sensors',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'mixers',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// IssueNote
var IssueNote = exports.IssueNote = kind({
	name: "IssueNote",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		note: null,
		user: null,
		timeStamp: null,
		// Foreign attributes
		error: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'error',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
]})

// LayerSet
var LayerSet = exports.LayerSet = kind({
	name: "LayerSet",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		name: null,
		lastModified: null,
		locked: null,
		// Primary Attributes
		layers: null,
		surfaces: null,
	},
	relations: [
		// Primary relationships
		{
			key: 'layers',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'surfaces',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// Layer
var Layer = exports.Layer = kind({
	name: "Layer",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		thickness: null,
		index: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		layerSet: null,
		materialProperties: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'layerSet',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'materialProperties',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
]})

// Load
var Load = exports.Load = kind({
	name: "Load",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		zoneCount: null,
		zones: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		eqMassFlow: null,
		eqHeatTransfer: null,
		// Primary Attributes
		equipmentClasses: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'eqMassFlow',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'eqHeatTransfer',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		// Primary relationships
		{
			key: 'equipmentClasses',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// Location
var Location = exports.Location = kind({
	name: "Location",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		address: null,
		latitude: null,
		longitude: null,
		elevation: null,
		timeZone: null,
		lastModified: null,
		locked: null,
		// Primary Attributes
		systems: null,
		weatherSources: null,
	},
	relations: [
		// Primary relationships
		{
			key: 'systems',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'weatherSources',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// Log
var Log = exports.Log = kind({
	name: "Log",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		value: null,
		time: null,
		// Foreign attributes
		predictionGroup: null,
		variable: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'predictionGroup',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'variable',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
]})

// Manufacturer
var Manufacturer = exports.Manufacturer = kind({
	name: "Manufacturer",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		equipment: null,
		// Primary Attributes
		models: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'equipment',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		// Primary relationships
		{
			key: 'models',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// MaterialProperty
var MaterialProperty = exports.MaterialProperty = kind({
	name: "MaterialProperty",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		name: null,
		density: null,
		conductivity: null,
		specificHeat: null,
		reflectance: null,
		emmisivity: null,
		roughness: null,
		transmittance: null,
		uValue: null,
		lastModified: null,
		locked: null,
		// Primary Attributes
		layers: null,
		zones: null,
	},
	relations: [
		// Primary relationships
		{
			key: 'layers',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'zones',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// Mixer
var Mixer = exports.Mixer = kind({
	name: "Mixer",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		type: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		interface: null,
		eqMixer: null,
		eqMassFlow: null,
		// Primary Attributes
		equipmentClasses: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'interface',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'eqMixer',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'eqMassFlow',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		// Primary relationships
		{
			key: 'equipmentClasses',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// Model
var Model = exports.Model = kind({
	name: "Model",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		name: null,
		subsystemLock: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		manufacturer: null,
		// Primary Attributes
		variableJoins: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'manufacturer',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		// Primary relationships
		{
			key: 'variableJoins',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// NetworkMaster
var NetworkMaster = exports.NetworkMaster = kind({
	name: "NetworkMaster",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		name: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		network: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'network',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
]})

// OccupancyLoad
var OccupancyLoad = exports.OccupancyLoad = kind({
	name: "OccupancyLoad",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		occupancy: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		zone: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'zone',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
]})

// OccupancySource
var OccupancySource = exports.OccupancySource = kind({
	name: "OccupancySource",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		sampleFrequency: null,
		historyWindow: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		source: null,
		// Primary Attributes
		occupants: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'source',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		// Primary relationships
		{
			key: 'occupants',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// Occupant
var Occupant = exports.Occupant = kind({
	name: "Occupant",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		user: null,
		occupancySource: null,
		// Primary Attributes
		comforts: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'user',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'occupancySource',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		// Primary relationships
		{
			key: 'comforts',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// Organization
var Organization = exports.Organization = kind({
	name: "Organization",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		name: null,
		streetAddress: null,
		city: null,
		state: null,
		country: null,
		zipCode: null,
		lastModified: null,
		locked: null,
		// Primary Attributes
		users: null,
	},
	relations: [
		// Primary relationships
		{
			key: 'users',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// Overhang
var Overhang = exports.Overhang = kind({
	name: "Overhang",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		overhangXLength: null,
		overhangYOffset: null,
		// Primary Attributes
		surfaces: null,
	},
	relations: [
		// Primary relationships
		{
			key: 'surfaces',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// Path
var Path = exports.Path = kind({
	name: "Path",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		eq1: null,
		eq2: null,
		// Primary Attributes
		equipmentClasses: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'eq1',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'eq2',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		// Primary relationships
		{
			key: 'equipmentClasses',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// PeripheralType
var PeripheralType = exports.PeripheralType = kind({
	name: "PeripheralType",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		analogIn: null,
		analogOut: null,
		digitalIn: null,
		digitalOut: null,
		motor: null,
		freqIn: null,
		FreqOut: null,
		lastModified: null,
		// Foreign attributes
		protocolTransport: null,
		// Primary Attributes
		pins: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'protocolTransport',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		// Primary relationships
		{
			key: 'pins',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// Pin
var Pin = exports.Pin = kind({
	name: "Pin",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		number: null,
		setup: null,
		wireProtocol: null,
		available: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		peripheralMapping: null,
		peripheralSupport: null,
		// Primary Attributes
		wires: null,
		ioModules: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'peripheralMapping',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'peripheralSupport',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		// Primary relationships
		{
			key: 'wires',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'ioModules',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// PlugLoad
var PlugLoad = exports.PlugLoad = kind({
	name: "PlugLoad",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		loads: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		zone: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'zone',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
]})

// PredictionGroup
var PredictionGroup = exports.PredictionGroup = kind({
	name: "PredictionGroup",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		name: null,
		predictionTimeStamp: null,
		// Primary Attributes
		logs: null,
	},
	relations: [
		// Primary relationships
		{
			key: 'logs',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// Preference
var Preference = exports.Preference = kind({
	name: "Preference",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		json: null,
		lastModified: null,
		locked: null,
		// Primary Attributes
		equipments: null,
		variableJoins: null,
	},
	relations: [
		// Primary relationships
		{
			key: 'equipments',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'variableJoins',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// Privilege
var Privilege = exports.Privilege = kind({
	name: "Privilege",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		tableName: null,
		superUserOperations: null,
		privilegedUserOperations: null,
		standardUser: null,
		lastModified: null,
		locked: null,
	},
})

// ProtocolTransport
var ProtocolTransport = exports.ProtocolTransport = kind({
	name: "ProtocolTransport",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		address: null,
		networkName: null,
		subnet: null,
		password: null,
		transportState: null,
		lastModified: null,
		// Foreign attributes
		wireProtocol: null,
		// Primary Attributes
		peripheralTypes: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'wireProtocol',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		// Primary relationships
		{
			key: 'peripheralTypes',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// Router
var Router = exports.Router = kind({
	name: "Router",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		type: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		eqRouter: null,
		interface: null,
		eqMassFlow: null,
		// Primary Attributes
		equipmentClasses: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'eqRouter',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'interface',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'eqMassFlow',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		// Primary relationships
		{
			key: 'equipmentClasses',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// SchemaVersion
var SchemaVersion = exports.SchemaVersion = kind({
	name: "SchemaVersion",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		major: null,
		minor: null,
		micro: null,
	},
})

// Sensor
var Sensor = exports.Sensor = kind({
	name: "Sensor",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		type: null,
		group: null,
		updateRate: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		interface: null,
		eqConversion: null,
		zone: null,
		// Primary Attributes
		equipmentClasses: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'interface',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'eqConversion',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'zone',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		// Primary relationships
		{
			key: 'equipmentClasses',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// Session
var Session = exports.Session = kind({
	name: "Session",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		failedCount: null,
		forcedReset: null,
		lastFailedLogin: null,
		startTime: null,
		endTime: null,
		lastmodified: null,
		locked: null,
		// Primary Attributes
		users: null,
	},
	relations: [
		// Primary relationships
		{
			key: 'users',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// SettingPreference
var SettingPreference = exports.SettingPreference = kind({
	name: "SettingPreference",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		settingTemp: null,
		setBackTemp: null,
		comfortRange: null,
		setbackStartTime: null,
		setbackEndTime: null,
		dayOfWeek: null,
		lastModified: null,
		locked: null,
		// Primary Attributes
		comforts: null,
	},
	relations: [
		// Primary relationships
		{
			key: 'comforts',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// SourceEnergy
var SourceEnergy = exports.SourceEnergy = kind({
	name: "SourceEnergy",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		energyType: null,
		CO2: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		cost: null,
		// Primary Attributes
		sourceSinks: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'cost',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		// Primary relationships
		{
			key: 'sourceSinks',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// SourceSink
var SourceSink = exports.SourceSink = kind({
	name: "SourceSink",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		interface: null,
		sourceEnergy: null,
		eqState: null,
		eqLimit: null,
		eqCOP: null,
		eqCapacity: null,
		eqTransferFunction: null,
		eqPower: null,
		eqControl: null,
		// Primary Attributes
		equipmentClasses: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'interface',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'sourceEnergy',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'eqState',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'eqLimit',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'eqCOP',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'eqCapacity',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'eqTransferFunction',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'eqPower',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'eqControl',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		// Primary relationships
		{
			key: 'equipmentClasses',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// Store
var Store = exports.Store = kind({
	name: "Store",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		type: null,
		storageMedium: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		eqPower: null,
		eqEnergyCapacity: null,
		eqMaxEnergyCapacity: null,
		eqHeatLoss: null,
		// Primary Attributes
		equipmentClasses: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'eqPower',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'eqEnergyCapacity',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'eqMaxEnergyCapacity',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'eqHeatLoss',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		// Primary relationships
		{
			key: 'equipmentClasses',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// SubsystemGroup
var SubsystemGroup = exports.SubsystemGroup = kind({
	name: "SubsystemGroup",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		groupName: null,
		type: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		systems: null,
		subsystems: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'systems',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'subsystems',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
]})

// Subsystem
var Subsystem = exports.Subsystem = kind({
	name: "Subsystem",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		name: null,
		type: null,
		head: null,
		priority: null,
		nativePriority: null,
		activePriority: null,
		lastModified: null,
		locked: null,
		// Primary Attributes
		subsystemGroups: null,
		equipmentGroups: null,
	},
	relations: [
		// Primary relationships
		{
			key: 'subsystemGroups',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'equipmentGroups',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// SupportedUnit
var SupportedUnit = exports.SupportedUnit = kind({
	name: "SupportedUnit",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		representation: null,
		lastModified: null,
		locked: null,
		// Primary Attributes
		unitLookups: null,
	},
	relations: [
		// Primary relationships
		{
			key: 'unitLookups',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// Surface
var Surface = exports.Surface = kind({
	name: "Surface",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		name: null,
		surfaceType: null,
		area: null,
		azimuth: null,
		tilt: null,
		connectingNodeName: null,
		shade: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		layerSet: null,
		adjacency: null,
		zone: null,
		overhang: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'layerSet',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'adjacency',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'zone',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'overhang',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
]})

// SystemFolder
var SystemFolder = exports.SystemFolder = kind({
	name: "SystemFolder",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		name: null,
		toolTip: null,
		lastModified: null,
		locked: null,
		// Primary Attributes
		systems: null,
	},
	relations: [
		// Primary relationships
		{
			key: 'systems',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// System
var System = exports.System = kind({
	name: "System",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		name: null,
		notes: null,
		status: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		system: null,
		systemFolder: null,
		location: null,
		building: null,
		image: null,
		controlTypes: null,
		// Primary Attributes
		subsystemGroups: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'system',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'systemFolder',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'location',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'building',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'image',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'controlTypes',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		// Primary relationships
		{
			key: 'subsystemGroups',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// Transport
var Transport = exports.Transport = kind({
	name: "Transport",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		state: null,
		variableSpeed: null,
		zoneNumber: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		eqFlowCurve: null,
		eqTransport: null,
		interface: null,
		// Primary Attributes
		equipmentClasses: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'eqFlowCurve',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'eqTransport',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'interface',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		// Primary relationships
		{
			key: 'equipmentClasses',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// UnitLookup
var UnitLookup = exports.UnitLookup = kind({
	name: "UnitLookup",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		table: null,
		column: null,
		// Foreign attributes
		supportedUnit: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'supportedUnit',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
]})

// User
var User = exports.User = kind({
	name: "User",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		email: null,
		userName: null,
		password: null,
		firstName: null,
		lastName: null,
		createdDateTime: null,
		lastSuccessfullLogin: null,
		role: null,
		cloudAccount: null,
		salt: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		organization: null,
		session: null,
		// Primary Attributes
		devices: null,
		occupants: null,
		errorHandlers: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'organization',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'session',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		// Primary relationships
		{
			key: 'devices',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'occupants',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'errorHandlers',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// VariableDirectory
var VariableDirectory = exports.VariableDirectory = kind({
	name: "VariableDirectory",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		name: null,
		lastModified: null,
		locked: null,
		// Primary Attributes
		variables: null,
	},
	relations: [
		// Primary relationships
		{
			key: 'variables',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// VariableJoin
var VariableJoin = exports.VariableJoin = kind({
	name: "VariableJoin",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		// Foreign attributes
		equation: null,
		preference: null,
		variable: null,
		model: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'equation',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'preference',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'variable',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'model',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
]})

// Variable
var Variable = exports.Variable = kind({
	name: "Variable",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		name: null,
		sourceQuality: null,
		global: null,
		advanced: null,
		currentValue: null,
		ErrorType: null,
		dailyAverage: null,
		weeklyAverage: null,
		monthlyAverage: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		directory: null,
		// Primary Attributes
		logs: null,
		allowedRanges: null,
		eventConditia: null,
		connectionNodes: null,
		animatia: null,
		occupancySources: null,
		histogramGroups: null,
		variableJoins: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'directory',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		// Primary relationships
		{
			key: 'logs',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'allowedRanges',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'eventConditia',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'connectionNodes',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'animatia',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'occupancySources',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'histogramGroups',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'variableJoins',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// WeatherLibrary
var WeatherLibrary = exports.WeatherLibrary = kind({
	name: "WeatherLibrary",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		name: null,
		lastModified: null,
		locked: null,
		// Primary Attributes
		weatherSources: null,
	},
	relations: [
		// Primary relationships
		{
			key: 'weatherSources',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// WeatherSource
var WeatherSource = exports.WeatherSource = kind({
	name: "WeatherSource",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		name: null,
		url: null,
		duration: null,
		interval: null,
		dataMapping: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		location: null,
		weatherLibrary: null,
		// Primary Attributes
		weathers: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'location',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'weatherLibrary',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		// Primary relationships
		{
			key: 'weathers',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// Weather
var Weather = exports.Weather = kind({
	name: "Weather",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		date: null,
		temperature: null,
		minTemp: null,
		maxTemp: null,
		dewpoint: null,
		relativeHumidity: null,
		skyCover: null,
		windSpeed: null,
		windDirection: null,
		windGust: null,
		fret: null,
		pop: null,
		qpf: null,
		snowAmt: null,
		snowLevel: null,
		solarElevation: null,
		solarAzimuth: null,
		weatherDescription: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		weatherSource: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'weatherSource',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
]})

// WireProtcol
var WireProtcol = exports.WireProtcol = kind({
	name: "WireProtcol",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		address: null,
		joined: null,
		owl: null,
		protocolState: null,
		lastModified: null,
		// Primary Attributes
		protocolTransports: null,
	},
	relations: [
		// Primary relationships
		{
			key: 'protocolTransports',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// Wire
var Wire = exports.Wire = kind({
	name: "Wire",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		name: null,
		lastModified: null,
		// Foreign attributes
		hardwarePin: null,
		// Primary Attributes
		interfaceTypes: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'hardwarePin',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		// Primary relationships
		{
			key: 'interfaceTypes',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// Zone
var Zone = exports.Zone = kind({
	name: "Zone",
	kind: RelationalModel,
	primaryKey: "ID",
	attributes: {
		ID: null,
		name: null,
		hvacLoadEntryNode: null,
		airVolume: null,
		lastModified: null,
		locked: null,
		// Foreign attributes
		floor: null,
		interiorMaterial: null,
		// Primary Attributes
		plugLoads: null,
		airInfiltrationLoads: null,
		sensors: null,
		surfaces: null,
		occupancyLoads: null,
	},
	relations: [
		// Foreign relationships
		{
			key: 'floor',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		{
			key: 'interiorMaterial',
			type: 'toOne',
			model: null,
			isOwner: false,
		},
		// Primary relationships
		{
			key: 'plugLoads',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'airInfiltrationLoads',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'sensors',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'surfaces',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
		{
			key: 'occupancyLoads',
			type: 'toMany',
			model: null,
			isOwner: false,
		},
]})

// Fixup Relations

AirInfiltrationLoad.prototype.relations[0].model = Zone

AllowedRange.prototype.relations[0].model = Variable

Analog.prototype.relations[0].model = InterfaceType

Animation.prototype.relations[0].model = Variable
Animation.prototype.relations[1].model = Image

AutoPreference.prototype.relations[0].model = Comfort

Branch.prototype.relations[0].model = Equation
Branch.prototype.relations[1].model = EquipmentClass

BuildingModel.prototype.relations[0].model = Building

Building.prototype.relations[0].model = BuildingModel
Building.prototype.relations[1].model = Image
Building.prototype.relations[2].model = System
Building.prototype.relations[3].model = Floor

Comfort.prototype.relations[0].model = SettingPreference
Comfort.prototype.relations[1].model = Occupant
Comfort.prototype.relations[2].model = SettingPreference
Comfort.prototype.relations[3].model = AutoPreference

ConnectionNet.prototype.relations[0].model = ConnectionNode

ConnectionNode.prototype.relations[0].model = Equipment
ConnectionNode.prototype.relations[1].model = Variable
ConnectionNode.prototype.relations[2].model = ConnectionNet

ControlType.prototype.relations[0].model = System

ControllerLibrary.prototype.relations[0].model = Controller

Controller.prototype.relations[0].model = ControllerLibrary
Controller.prototype.relations[1].model = IOModule
Controller.prototype.relations[2].model = Image
Controller.prototype.relations[3].model = NetworkMaster

Coupling.prototype.relations[0].model = Equation
Coupling.prototype.relations[1].model = Equation
Coupling.prototype.relations[2].model = EquipmentClass

Device.prototype.relations[0].model = User

EnergyCost.prototype.relations[0].model = SourceEnergy

EquationDirectory.prototype.relations[0].model = Equation

Equation.prototype.relations[0].model = EquationDirectory
Equation.prototype.relations[1].model = Load
Equation.prototype.relations[2].model = Coupling
Equation.prototype.relations[3].model = Sensor
Equation.prototype.relations[4].model = SourceSink
Equation.prototype.relations[5].model = Mixer
Equation.prototype.relations[6].model = Store
Equation.prototype.relations[7].model = Branch
Equation.prototype.relations[8].model = Router
Equation.prototype.relations[9].model = Path
Equation.prototype.relations[10].model = VariableJoin
Equation.prototype.relations[11].model = Transport

EquipmentClass.prototype.relations[0].model = Store
EquipmentClass.prototype.relations[1].model = Coupling
EquipmentClass.prototype.relations[2].model = Branch
EquipmentClass.prototype.relations[3].model = SourceSink
EquipmentClass.prototype.relations[4].model = Transport
EquipmentClass.prototype.relations[5].model = SourceSink
EquipmentClass.prototype.relations[6].model = Load
EquipmentClass.prototype.relations[7].model = Router
EquipmentClass.prototype.relations[8].model = Path
EquipmentClass.prototype.relations[9].model = Sensor
EquipmentClass.prototype.relations[10].model = Mixer
EquipmentClass.prototype.relations[11].model = Equipment

EquipmentGroup.prototype.relations[0].model = Subsystem
EquipmentGroup.prototype.relations[1].model = Equipment

Equipment.prototype.relations[0].model = Preference
Equipment.prototype.relations[1].model = EquipmentClass
Equipment.prototype.relations[2].model = Group
Equipment.prototype.relations[3].model = Image
Equipment.prototype.relations[4].model = ConnectionNode
Equipment.prototype.relations[5].model = EquipmentGroup
Equipment.prototype.relations[6].model = Manufacturer

ErrorHandler.prototype.relations[0].model = User
ErrorHandler.prototype.relations[1].model = User
ErrorHandler.prototype.relations[2].model = User
ErrorHandler.prototype.relations[3].model = EventCondition

EventCondition.prototype.relations[0].model = EventCondition
EventCondition.prototype.relations[1].model = Variable
EventCondition.prototype.relations[2].model = IssueNote
EventCondition.prototype.relations[3].model = EventCondition
EventCondition.prototype.relations[4].model = ErrorHandler

Floor.prototype.relations[0].model = Building
Floor.prototype.relations[1].model = Image
Floor.prototype.relations[2].model = Zone

Folder.prototype.relations[0].model = FolderView
Folder.prototype.relations[1].model = Group
Folder.prototype.relations[2].model = System

FolderView.prototype.relations[0].model = Folder

Group.prototype.relations[0].model = Folder
Group.prototype.relations[1].model = Equipment

HistogramGroup.prototype.relations[0].model = Variable
HistogramGroup.prototype.relations[1].model = Histogram

Histogram.prototype.relations[0].model = HistogramGroup

IOCardLibrary.prototype.relations[0].model = IOModule

IOModule.prototype.relations[0].model = IOCardLibrary
IOModule.prototype.relations[1].model = Pin
IOModule.prototype.relations[2].model = Image
IOModule.prototype.relations[3].model = Controller

Image.prototype.relations[0].model = Building
Image.prototype.relations[1].model = IOModule
Image.prototype.relations[2].model = Floor
Image.prototype.relations[3].model = System
Image.prototype.relations[4].model = Equipment
Image.prototype.relations[5].model = Controller
Image.prototype.relations[6].model = Animation

InterfaceType.prototype.relations[0].model = Analog
InterfaceType.prototype.relations[1].model = Wire
InterfaceType.prototype.relations[2].model = Analog
InterfaceType.prototype.relations[3].model = Router
InterfaceType.prototype.relations[4].model = Transport
InterfaceType.prototype.relations[5].model = SourceSink
InterfaceType.prototype.relations[6].model = Sensor
InterfaceType.prototype.relations[7].model = Mixer

IssueNote.prototype.relations[0].model = EventCondition

LayerSet.prototype.relations[0].model = Layer
LayerSet.prototype.relations[1].model = Surface

Layer.prototype.relations[0].model = LayerSet
Layer.prototype.relations[1].model = MaterialProperty

Load.prototype.relations[0].model = Equation
Load.prototype.relations[1].model = Equation
Load.prototype.relations[2].model = EquipmentClass

Location.prototype.relations[0].model = System
Location.prototype.relations[1].model = WeatherSource

Log.prototype.relations[0].model = PredictionGroup
Log.prototype.relations[1].model = Variable

Manufacturer.prototype.relations[0].model = Equipment
Manufacturer.prototype.relations[1].model = Model

MaterialProperty.prototype.relations[0].model = Layer
MaterialProperty.prototype.relations[1].model = Zone

Mixer.prototype.relations[0].model = InterfaceType
Mixer.prototype.relations[1].model = Equation
Mixer.prototype.relations[2].model = Equation
Mixer.prototype.relations[3].model = EquipmentClass

Model.prototype.relations[0].model = Manufacturer
Model.prototype.relations[1].model = VariableJoin

NetworkMaster.prototype.relations[0].model = Controller

OccupancyLoad.prototype.relations[0].model = Zone

OccupancySource.prototype.relations[0].model = Variable
OccupancySource.prototype.relations[1].model = Occupant

Occupant.prototype.relations[0].model = User
Occupant.prototype.relations[1].model = OccupancySource
Occupant.prototype.relations[2].model = Comfort

Organization.prototype.relations[0].model = User

Overhang.prototype.relations[0].model = Surface

Path.prototype.relations[0].model = Equation
Path.prototype.relations[1].model = Equation
Path.prototype.relations[2].model = EquipmentClass

PeripheralType.prototype.relations[0].model = ProtocolTransport
PeripheralType.prototype.relations[1].model = Pin

Pin.prototype.relations[0].model = PeripheralType
Pin.prototype.relations[1].model = PeripheralType
Pin.prototype.relations[2].model = Wire
Pin.prototype.relations[3].model = IOModule

PlugLoad.prototype.relations[0].model = Zone

PredictionGroup.prototype.relations[0].model = Log

Preference.prototype.relations[0].model = Equipment
Preference.prototype.relations[1].model = VariableJoin

ProtocolTransport.prototype.relations[0].model = WireProtcol
ProtocolTransport.prototype.relations[1].model = PeripheralType

Router.prototype.relations[0].model = Equation
Router.prototype.relations[1].model = InterfaceType
Router.prototype.relations[2].model = Equation
Router.prototype.relations[3].model = EquipmentClass

Sensor.prototype.relations[0].model = InterfaceType
Sensor.prototype.relations[1].model = Equation
Sensor.prototype.relations[2].model = Zone
Sensor.prototype.relations[3].model = EquipmentClass

Session.prototype.relations[0].model = User

SettingPreference.prototype.relations[0].model = Comfort

SourceEnergy.prototype.relations[0].model = EnergyCost
SourceEnergy.prototype.relations[1].model = SourceSink

SourceSink.prototype.relations[0].model = InterfaceType
SourceSink.prototype.relations[1].model = SourceEnergy
SourceSink.prototype.relations[2].model = Equation
SourceSink.prototype.relations[3].model = Equation
SourceSink.prototype.relations[4].model = Equation
SourceSink.prototype.relations[5].model = Equation
SourceSink.prototype.relations[6].model = Equation
SourceSink.prototype.relations[7].model = Equation
SourceSink.prototype.relations[8].model = Equation
SourceSink.prototype.relations[9].model = EquipmentClass

Store.prototype.relations[0].model = Equation
Store.prototype.relations[1].model = Equation
Store.prototype.relations[2].model = Equation
Store.prototype.relations[3].model = Equation
Store.prototype.relations[4].model = EquipmentClass

SubsystemGroup.prototype.relations[0].model = System
SubsystemGroup.prototype.relations[1].model = Subsystem

Subsystem.prototype.relations[0].model = SubsystemGroup
Subsystem.prototype.relations[1].model = EquipmentGroup

SupportedUnit.prototype.relations[0].model = UnitLookup

Surface.prototype.relations[0].model = LayerSet
Surface.prototype.relations[1].model = Zone
Surface.prototype.relations[2].model = Zone
Surface.prototype.relations[3].model = Overhang

SystemFolder.prototype.relations[0].model = System

System.prototype.relations[0].model = Folder
System.prototype.relations[1].model = SystemFolder
System.prototype.relations[2].model = Location
System.prototype.relations[3].model = Building
System.prototype.relations[4].model = Image
System.prototype.relations[5].model = SubsystemGroup
System.prototype.relations[6].model = ControlType

Transport.prototype.relations[0].model = Equation
Transport.prototype.relations[1].model = Equation
Transport.prototype.relations[2].model = InterfaceType
Transport.prototype.relations[3].model = EquipmentClass

UnitLookup.prototype.relations[0].model = SupportedUnit

User.prototype.relations[0].model = Organization
User.prototype.relations[1].model = Session
User.prototype.relations[2].model = Device
User.prototype.relations[3].model = Occupant
User.prototype.relations[4].model = ErrorHandler

VariableDirectory.prototype.relations[0].model = Variable

VariableJoin.prototype.relations[0].model = Equation
VariableJoin.prototype.relations[1].model = Preference
VariableJoin.prototype.relations[2].model = Variable
VariableJoin.prototype.relations[3].model = Model

Variable.prototype.relations[0].model = VariableDirectory
Variable.prototype.relations[1].model = Log
Variable.prototype.relations[2].model = AllowedRange
Variable.prototype.relations[3].model = EventCondition
Variable.prototype.relations[4].model = ConnectionNode
Variable.prototype.relations[5].model = Animation
Variable.prototype.relations[6].model = OccupancySource
Variable.prototype.relations[7].model = HistogramGroup
Variable.prototype.relations[8].model = VariableJoin

WeatherLibrary.prototype.relations[0].model = WeatherSource

WeatherSource.prototype.relations[0].model = Location
WeatherSource.prototype.relations[1].model = WeatherLibrary
WeatherSource.prototype.relations[2].model = Weather

Weather.prototype.relations[0].model = WeatherSource

WireProtcol.prototype.relations[0].model = ProtocolTransport

Wire.prototype.relations[0].model = Pin
Wire.prototype.relations[1].model = InterfaceType

Zone.prototype.relations[0].model = Floor
Zone.prototype.relations[1].model = MaterialProperty
Zone.prototype.relations[2].model = PlugLoad
Zone.prototype.relations[3].model = AirInfiltrationLoad
Zone.prototype.relations[4].model = Sensor
Zone.prototype.relations[5].model = Surface
Zone.prototype.relations[6].model = OccupancyLoad


}],'src/views/progress/breadcrumbs/breadcrumbs':[function (module,exports,global,require,request){
//

var kind = require('enyo/kind');

var Signals = require('enyo/Signals'),
    Control = require('enyo/Control');

module.exports = kind({
    name: 'pl.pg.Breadcrumbs',
    kind: Control,
    classes: 'enyo-unselectable  breadcrumbs-wrapper',
    style: 'text-align: center',
    zIndex: 100,
    published: {
        page: APP_PROGRESS.PR_SETUP,
        path: [
            {name: 'SETUP', page: APP_PROGRESS.PR_SETUP, key: 'SETUP'},
            {name: 'SITE BUILDER', page: APP_PROGRESS.PR_SITE, key: 'SITE_BUILDER'},
            {name: 'SYSTEM BUILDER', page: APP_PROGRESS.PR_SYSTEM, key: 'SYSTEM_BUILDER'},
            {name: 'INTERFACE', page: APP_PROGRESS.PR_INTERFACE, key: 'INTERFACE'},
            {name: 'WIRING', page: APP_PROGRESS.PR_WIRING, key: 'WIRING'},
            {name: 'COMMISSION', page: APP_PROGRESS.PR_COMMISSION, key: 'COMMISSION'}
        ]
    },
    components: [
        {name: 'Breadcrumb', kind: Control, classes: 'breadcrumbs'},
        {kind: Signals, onProgress: 'onProgress', onProgressStage: 'onProgressStage'}
    ],
    create: function() {
        this.inherited(arguments);
        for(var i = 0; i < this.path.length; i++) {
            this.$.Breadcrumb.createComponent({
                name: 'Item_' + this.path[i].page,
                classes: 'breadcrumbs-item' + (i + 1) + ' button not_started' + (this.page == this.path[i].page ? ' selected' : ''),
                allowHtml: true,
                page: this.path[i].page,
                key: this.path[i].key,
                percent: 0,
                content: ''
                + '<span class="label">' + this.path[i].name + '</span>'
                + '<span class="background">'
                + '  <span class="gauge"><span class="arrow"><span></span></span></span>'
                + '<span class="arrow"><span></span></span>'
                + '</span>',
                ontap: 'tapHandler'
            }, {owner: this});
        }
        this.$.Breadcrumb.render();
    },
    tapHandler: function(inSender) {
        // Change parent panel
        this.bubble('onProgressChanged', {page: inSender.page});

        // Change local variable
        if (inSender.page < APP_PROGRESS.PR_SETUP_SITE_INFO) { 
            this.page = inSender.page;
            this.key = inSender.key;
        }

        // Remove selected
        for(var i = 0; i < this.$.Breadcrumb.children.length; i++) {
            this.$.Breadcrumb.children[i].removeClass('selected');
        }

        // Add Class selected
        inSender.addClass('selected');
    },
    setCurrentPageWithTap: function(page) {
        if (page < APP_PROGRESS.PR_SETUP_SITE_INFO) {
            this.$.Breadcrumb.children[page].triggerHandler('ontap');
        }
        this.setCurrentPage(page);
    },
    setCurrentPage: function(page) {
        // HACK to add the code for making breadcrumb 100% when you swith to the NEXT page and only the next page
        // if(page - 1) has percent > 1, change to 100%
        if(page > 0) {
            var percent = this.$.Breadcrumb.children[page - 1].percent;
            var key = this.$.Breadcrumb.children[page - 1].key;
            var page = page - 1;

            if(percent > 1) {
                PROGRESS[key] = 100;
                Signals.send('onProgress', {page: page, key: key, value: 100});
            }
        }
        // END HACK
    },
    onProgress: function(inSender, inEvent) {
        var page = this.page;
        var key = this.key;

        if(inEvent.page !== undefined && inEvent.key !== undefined && inEvent.value !== undefined) {
            page = inEvent.page;
            key = inEvent.key;
            PROGRESS[key] = parseInt(inEvent.value);
        }

        if (inEvent.page == APP_PROGRESS.PR_SETUP_SITE_INFO ||
                inEvent.page == APP_PROGRESS.PR_SETUP_BUILDING_INFO) {
            var sub_page = inEvent.page - APP_PROGRESS.PR_SETUP_SITE_INFO;
            Signals.send('onSubSetupProgress', {page: sub_page, key: inEvent.key, value: inEvent.value});
            return;
        }

        if (inEvent.page == APP_PROGRESS.PR_WIRING_AUTO_SETUP ||
                inEvent.page == APP_PROGRESS.PR_WIRING_DEVICE_WIRING) {
            var sub_page = inEvent.page - APP_PROGRESS.PR_WIRING_AUTO_SETUP;
            Signals.send('onSubWiringProgress', {page: sub_page, key: inEvent.key, value: inEvent.value});
            return;
        }

        var bcs = this.$.Breadcrumb.children,
            percent = 0,
            count = 0,
            completed = true;

        // Set percent
        if(bcs[page].percent != PROGRESS[key]) {
            bcs[page].percent = PROGRESS[key];
            this.setPercentage(page, PROGRESS[key]);
        }

        // Set percent and count
        for(var key in PROGRESS) {
            percent += PROGRESS[key];
            count++;
            if(PROGRESS[key] < 100) {
                completed = false;
            }
        }
        if(percent >= count * 100 && completed === true) {
            setTimeout(function() {
                for(var i = 0; i < bcs.length; i++) {
                    // Remove normal
                    bcs[i].removeClass('button');
                    bcs[i].removeClass('not_started');
                    bcs[i].removeClass('not_finished');
                    bcs[i].removeClass('partly_completed');
                    bcs[i].removeClass('in_progress');
                    // Add completed
                    bcs[i].addClass('button_completed');
                }
            }, 100);
        }
    },
    setPercentage: function(stage, percentage) {
        var bcs = this.$.Breadcrumb.children;

        function Breadcrumb(number) {
            var completed = false, percentage = 0;
            this.number = number;
            this.getCompleted = function() {
                return completed;
            };
            this.getPercentage = function() {
                return percentage;
            };
            this.setPercentage = function(newPercentage) {
                percentage = newPercentage;
                if(percentage >= 100) {
                    completed = true;
                } else {
                    completed = false;
                }
            };
            return this;
        }

        function BreadcrumbPanel() {
            var completed = false, breadcrumbs = [];

            function checkIsPanelComplete() {
                completed = true;
                for(var i = 0; i < bcs.length; i++) {
                    if(breadcrumbs[i].getCompleted() === false) {
                        completed = false;
                    }
                }
            }

            this.getBreadcrumbPanelCompleted = function() {
                return completed;
            };
            this.getBreadcrumbPercentage = function(breadcrumbNumber) {
                return breadcrumbs[breadcrumbNumber].getPercentage();
            };
            this.setBreadcrumbPercentage = function(breadcrumbNumber, percentage) {
                breadcrumbs[breadcrumbNumber].setPercentage(percentage);
                checkIsPanelComplete();
            };

            function init() {
                for(var i = 0; i < bcs.length; i++) {
                    breadcrumbs[i] = new Breadcrumb(i);
                }
            }

            init();

            return this;
        }

        function BreadcrumbView() {
            this.animateBreadcrumb = function(breadcrumbNumber, percentage, cb) {
                function setClassInProgress(breadcrumbNumber, percentage) {
                    for(var i = 0; i < bcs.length; i++) {
                        if(bcs[i].percent < 100) {
                            bcs[i].addClass('not_finished');
                        }
                    }
                    bcs[breadcrumbNumber].removeClass('partly_completed');
                    bcs[breadcrumbNumber].removeClass('not_started');
                    bcs[breadcrumbNumber].removeClass('not_finished');
                    bcs[breadcrumbNumber].addClass('in_progress');
                }

                //console.log(breadcrumbNumber + ' is ' + percentage + ' percents blue!!!');
                var gauge = document.getElementById(bcs[breadcrumbNumber].getId()).getElementsByClassName('background')[0].getElementsByClassName('gauge')[0],
                    HTMLPersentage, f = [];

                setClassInProgress(breadcrumbNumber, percentage);

                if(breadcrumbNumber === 0 && percentage < 4) {
                    percentage = 3;
                    gauge.style.display = 'none'
                } else {
                    gauge.style.display = ''
                }
                HTMLPersentage = percentage / 100 * 92;

                // Set custom percentage levels
                if(breadcrumbNumber == 0 || breadcrumbNumber == 3) {
                    HTMLPersentage = percentage / 100 * 82;
                } else if(breadcrumbNumber == 1) {
                    HTMLPersentage = percentage / 100 * 84;
                } else if(breadcrumbNumber == 2) {
                    HTMLPersentage = percentage / 100 * 87;
                } else if(breadcrumbNumber == 4) {
                    HTMLPersentage = percentage / 100 * 79;
                }
                if(breadcrumbNumber === bcs.length - 1) {
                    HTMLPersentage = percentage / 100 * 100;
                }

                // Check support Promise
                if(typeof Promise !== 'function') {
                    console.log('Not support Promise!');
                    return false;
                }

                if(percentage < 100) {
                    f.push(new Promise(function(resolve) {
                        setTimeout(function() {
                            gauge.style.width = HTMLPersentage + '%';
                            resolve(HTMLPersentage);
                        }, 50)
                    }));
                } else {
                    f.push(new Promise(function(resolve) {
                        setTimeout(function() {
                            // Set custom percentage levels
                            if(breadcrumbNumber == 0 || breadcrumbNumber == 3) {
                                gauge.style.width = (99 / 100 * 82) + '%';
                            } else if(breadcrumbNumber == 1) {
                                gauge.style.width = (99 / 100 * 84) + '%';
                            } else if(breadcrumbNumber == 2) {
                                gauge.style.width = (99 / 100 * 87) + '%';
                            } else if(breadcrumbNumber == 4) {
                                gauge.style.width = (99 / 100 * 79) + '%';
                            }

                            //gauge.style.width = (99 / 100 * 92) + '%';
                            if(breadcrumbNumber === bcs.length - 1) {
                                gauge.style.width = 100 + '%';
                            }
                            resolve(gauge.style.width);
                        }, 50)
                    }));
                    f.push(new Promise(function(resolve) {
                        setTimeout(function() {
                            bcs[breadcrumbNumber].removeClass('in_progress');
                            bcs[breadcrumbNumber].addClass('partly_completed');
                            resolve('partly_completed');
                        }, 1050)
                    }));
                }
                Promise.all(f).then(function() {
                    cb();
                });
            };
        }

        function BreadcrumbPanelView() {
            var breadcrumbView = new BreadcrumbView(),
                breadcrumbPanel = new BreadcrumbPanel();
            this.animatePanel = function(breadcrumbNumber, percentage) {
                breadcrumbView.animateBreadcrumb(breadcrumbNumber, percentage, animateAsGreen);
                function animateAsGreen() {
                    breadcrumbPanel.setBreadcrumbPercentage(breadcrumbNumber, percentage);
                    if(breadcrumbPanel.getBreadcrumbPanelCompleted()) {
                        for(var i = 0; i < bcs.length; i++) {
                            // Remove normal
                            bcs[i].removeClass('button');
                            bcs[i].removeClass('not_started');
                            bcs[i].removeClass('not_finished');
                            bcs[i].removeClass('partly_completed');
                            bcs[i].removeClass('in_progress');
                            // Add completed
                            bcs[i].addClass('button_completed');
                        }
                    } else {
                        for(var i = 0; i < bcs.length; i++) {
                            // Remove completed
                            bcs[i].removeClass('button_completed');
                            bcs[i].addClass('button');
                            // Set value
                            if(bcs[i].percent >= 100) {
                                bcs[i].removeClass('not_started');
                                bcs[i].removeClass('not_finished');
                                // Add partly_completed
                                bcs[i].addClass('partly_completed');
                            } else if(bcs[i].percent >= 4) {
                                bcs[i].removeClass('partly_completed');
                                bcs[i].removeClass('not_started');
                                bcs[i].removeClass('not_finished');
                                // Add in_progress
                                bcs[i].addClass('in_progress');
                            } else {
                                bcs[i].removeClass('partly_completed');
                                bcs[i].removeClass('in_progress');
                                // Add not_started && not_finished
                                bcs[i].addClass('not_started');
                                bcs[i].addClass('not_finished');
                            }
                        }
                    }
                }
            };
        }

        // Run
        if(!this.breadcrumbPanelView) {
            this.breadcrumbPanelView = new BreadcrumbPanelView();
        }
        this.breadcrumbPanelView.animatePanel(stage, percentage);
    }
});

}],'src/views/progress/setup/sub-breadcrumbs':[function (module,exports,global,require,request){
//

var kind = require('enyo/kind');

var Control = require('enyo/Control'),
    Signals = require('enyo/Signals');

module.exports = kind({
    name: "pl.su.SubBreadcrumbs",
    kind: Control,
    classes: "enyo-unselectable  breadcrumbs-wrapper",
    style: "text-align: center;",
    published: {
        index: 0
    },
    events: {
        onActivate: ""
    },
    components: [
        {
            name: "Breadcrumb", kind: Control, classes: "breadcrumbs",
            components: [
                {
                    name: "Item_1",
                    index: 0,
                    classes: "breadcrumbs-item1 button not_started selected",
                    allowHtml: true,
                    content: ""
                    + "<span class='label'>SITE INFO</span>"
                    + "<span class='background' >"
                    + "  <span class='gauge'><span class='arrow'><span></span></span></span>"
                    + "<span class='arrow'><span></span></span>"
                    + "</span>",
                    ontap: "tapHandler"
                },
                {
                    name: "Item_2",
                    index: 1,
                    classes: "breadcrumbs-item2  button not_started",
                    allowHtml: true,
                    content: ""
                    + "<span class='label'>BUILDING INFO</span>"
                    + "<span class='background' >"
                    + "  <span class='gauge'><span class='arrow'><span></span></span></span>"
                    + "<span class='arrow'><span></span></span>"
                    + "</span>",
                    ontap: "tapHandler"
                }
            ]
        },
        {kind: Signals, onSubSetupProgress: 'onSubSetupProgress'}
    ],
    create: function() {
        this.inherited(arguments);
        this.tapHandler(this.$.Breadcrumb.children[0]);
    },
    setActive: function(index) {
        if(!!this.$.Breadcrumb.children[index]) {
            this.tapHandler(this.$.Breadcrumb.children[index]);
        }
    },
    onSubSetupProgress: function(inSender, inEvent) {
        var page = inEvent.page;
        var key = inEvent.key;
        var bcs = this.$.Breadcrumb.children;
        if (document.getElementById(bcs[page].getId()) != null) {
            var gauge = document.getElementById(bcs[page].getId()).getElementsByClassName('background')[0].getElementsByClassName('gauge')[0];

            bcs[page].addClass('not_finished');
            bcs[page].removeClass('in_progress');
            bcs[page].removeClass('partly_completed');
            bcs[page].removeClass('not_started');
            bcs[page].removeClass('not_finished');
            bcs[page].addClass('in_progress');

            var percent = PROGRESS[key];
            if (page == 0) {
                percent = 2 * (PROGRESS[key] / 100 * 86);
            }
            else if (page == 1) {
                percent = 2 * (PROGRESS[key] / 100 * 100);
            }

            gauge.style.display = '';
            gauge.style.width = percent + '%';
        }
    },
    tapHandler: function(inSender) {
        for(var i = 0; i < this.$.Breadcrumb.children.length; i++) {
            if(this.$.Breadcrumb.children[i] === inSender) {
                if(!inSender.hasClass('selected')) {
                    inSender.addClass('selected');
                }
            } else if(this.$.Breadcrumb.children[i].hasClass('selected')) {
                this.$.Breadcrumb.children[i].removeClass('selected');
            }
        }
        if(this.index !== inSender.index) {
            this.index = inSender.index;
            this.doActivate({index: inSender.index});
        }
    }
});

}],'src/views/progress/wiring/sub-breadcrumbs':[function (module,exports,global,require,request){
//

var kind = require('enyo/kind');

var Control = require('enyo/Control'),
    Signals = require('enyo/Signals');

module.exports = kind({
    name: "pl.wr.SubBreadcrumbs",
    kind: Control,
    classes: "enyo-unselectable  breadcrumbs-wrapper",
    style: "text-align: center;",
    published: {
        index: 0
    },
    events: {
        onActivate: ""
    },
    components: [
        {
            name: "Breadcrumb", kind: Control, classes: "breadcrumbs",
            components: [
                {
                    name: "Item_1",
                    index: 0,
                    classes: "breadcrumbs-item1 button not_started selected",
                    allowHtml: true,
                    content: ""
                    + "<span class='label'>AUTO-SETUP</span>"
                    + "<span class='background' >"
                    + "  <span class='gauge'><span class='arrow'><span></span></span></span>"
                    + "<span class='arrow'><span></span></span>"
                    + "</span>",
                    ontap: "tapHandler"
                },
                {
                    name: "Item_2",
                    index: 1,
                    classes: "breadcrumbs-item2  button not_started",
                    allowHtml: true,
                    content: ""
                    + "<span class='label'>DEVICE WIRING</span>"
                    + "<span class='background' >"
                    + "  <span class='gauge'><span class='arrow'><span></span></span></span>"
                    + "<span class='arrow'><span></span></span>"
                    + "</span>",
                    ontap: "tapHandler"
                }
            ]
        },
        {kind: Signals, onSubWiringProgress: 'onSubWiringProgress'}
    ],
    create: function() {
        this.inherited(arguments);
        this.tapHandler(this.$.Breadcrumb.children[0]);
    },
    setActive: function(index) {
        if(!!this.$.Breadcrumb.children[index]) {
            this.tapHandler(this.$.Breadcrumb.children[index]);
        }
    },
    onSubWiringProgress: function(inSender, inEvent) {
        var page = inEvent.page;
        var key = inEvent.key;
        var bcs = this.$.Breadcrumb.children;
        if (document.getElementById(bcs[page].getId()) != null) {
            var gauge = document.getElementById(bcs[page].getId()).getElementsByClassName('background')[0].getElementsByClassName('gauge')[0];

            bcs[page].addClass('not_finished');
            bcs[page].removeClass('in_progress');
            bcs[page].removeClass('partly_completed');
            bcs[page].removeClass('not_started');
            bcs[page].removeClass('not_finished');
            bcs[page].addClass('in_progress');

            var percent = PROGRESS[key];
            if (page == 0) {
                percent = (PROGRESS[key] / 100 * 86);
            }
            else if (page == 1) {
                percent = (PROGRESS[key] / 100 * 100);
            }

            gauge.style.display = '';
            gauge.style.width = percent + '%';
        }
    },
    tapHandler: function(inSender) {
        for(var i = 0; i < this.$.Breadcrumb.children.length; i++) {
            if(this.$.Breadcrumb.children[i] === inSender) {
                if(!inSender.hasClass('selected')) {
                    inSender.addClass('selected');
                }
            } else if(this.$.Breadcrumb.children[i].hasClass('selected')) {
                this.$.Breadcrumb.children[i].removeClass('selected');
            }
        }
        if(this.index !== inSender.index) {
            this.index = inSender.index;
            this.doActivate({index: inSender.index});
        }
    }
});

}],'src/components/googlemap':[function (module,exports,global,require,request){
/**
 * The maps api is loaded using the Google Loader. Include
 * <script type="text/javascript" src="https://www.google.com/jsapi"></script>
 * in your index.html to use this component.
 */

var kind = require('enyo/kind'),
    bind = require('enyo/utils').bind;

var Control = require('enyo/Control'),
    Signals = require('enyo/Signals');

// Variable Global
var BuildingOnGoogleMaps = {type: undefined, building: undefined};

function googleMenuOptions(data) {
    BuildingOnGoogleMaps.type = data.getAttribute('type');
    BuildingOnGoogleMaps.building = JSON.parse(data.getAttribute('data'));
}

// locationList Array item: {BuildingId, BuildingName, Latitude, Longitude}
// Signals.send("onGoogleMapPosition",{lat: lat, lng: lng})
module.exports = kind({
    name: 'GoogleMap',
    kind: Control,
    published: {
        apiVersion: '3',
        otherMapParams: 'libraries=geometry,places&language=en&key=AIzaSyBRuk7I6gZbwqPshcAxeUQCsngIuQWWHeU',
        zoom: 15,
        center: null,
        mapType: "HYBRID",
        disableDefaultUI: false,
        panControl: false,
        streetViewControl: false,
        locationList: undefined,
        single: false
    },
    events: {
        onMapCreated: "",
        onMapLoaded: "",
        onElevation: "",
        onAdminister: "",
        onOpenSystemDesign: ""
    },
    constructor: function() {
        this.inherited(arguments);
        this.letter = "A";
        this.address = undefined;
        this.lat = 53.48539;
        this.lng = -2.248474;
        this.mapOptions = {};
    },
    components: [
        {name: "map", classes: "enyo-google-map"},
        {name: "client"},
        {kind: Signals, onGoogleMapPosition: "onGoogleMapPosition"}
    ],
    //* @protected
    create: function() {
        this.inherited(arguments);
        this.load();
    },
    load: function() {
        google.load('maps', this.apiVersion, {
            callback: bind(this, 'apiLoadHandler'),
            other_params: this.otherMapParams
        });
    },
    apiLoadHandler: function() {
        this.apiLoaded = true;
        this.isClick = false;
        // Init
        this.mapOptions.zoom = this.zoom;
        switch(this.mapType) {
            case "ROADMAP":
                this.mapOptions.mapTypeId = google.maps.MapTypeId.ROADMAP;
                break;
            case "SATELLITE":
                this.mapOptions.mapTypeId = google.maps.MapTypeId.SATELLITE;
                break;
            case "HYBRID":
                this.mapOptions.mapTypeId = google.maps.MapTypeId.HYBRID;
                break;
            case "TERRAIN":
                this.mapOptions.mapTypeId = google.maps.MapTypeId.TERRAIN;
                break;
            default:
                break;
        }
        this.mapOptions.disableDefaultUI = this.disableDefaultUI;
        this.mapOptions.panControl = this.panControl;
        this.mapOptions.streetViewControl = this.streetViewControl;
        if(this.hasNode()) {
            this.createMap();
        }
    },
    createMap: function() {
        if(this.map) {
            this.destroyMap();
        }
        if(this.$.map.hasNode()) {
            // ====== Create map objects ======
            this.geocoder = new google.maps.Geocoder();
            this.infowindow = new google.maps.InfoWindow({
                maxWidth: 220
            });
            // ====== Create map ======
            if(this.single === true) {
                this.createMapSingleLocation();
            } else if(this.locationList != undefined && this.locationList.length > 0) {
                this.createMapMultiLocation();
            } else {
                console.log("Error")
            }
        }
    },
    createMapSingleLocation: function() {
        this.currentPos = new google.maps.LatLng(this.lat, this.lng);
        this.mapOptions.center = this.currentPos;

        this.map = new google.maps.Map(this.$.map.node, this.mapOptions);
        this.service = new google.maps.places.PlacesService(this.map);
        var that = this;
        /* Load Current Position */
        // Get Elevation
        this.getElevationByLocation(this.currentPos);
        // Show Position
        var marker = new google.maps.Marker({
            position: this.currentPos,
            map: this.map
        });
        // Event
        if(this.isClick === true) {
            google.maps.event.addListener(this.map, "click", function(event) {
                // get Position
                marker.setPosition(event.latLng);
                that.getInformationByLocation(event.latLng.lat(), event.latLng.lng(), true);
            });
        }
        // Return Event
        this.doMapCreated();
    },
    // Parameter: Array item: {BuildingId, BuildingName, Latitude, Longitude}
    createMapMultiLocation: function() {
        var latLng = new google.maps.LatLng(this.locationList[0].lat, this.locationList[0].lng);
        this.mapOptions.center = latLng;
        this.map = new google.maps.Map(this.$.map.node, this.mapOptions);
        // Init location list
        this.placeList = new Array();
        for(var i = 0; i < this.locationList.length; i++) {
            this.placeList.push(this.initPlace(this.locationList[i]));
        }
        // Return Event
        this.doMapCreated();
    },
    destroyMap: function() {
        this.map = null;
        this.infowindow = null;
        this.geocoder = null;
        this.letter = "A";
    },
    setLetterSize: function(lat, lng) {
        var place = undefined;
        if(!!this.apiLoaded) {
            function getMarket(placeList, lat, lng) {
                if(!!placeList && Object.prototype.toString.call(placeList) === '[object Array]') {
                    for(var i = 0; i < placeList.length; i++) {
                        if(placeList[i].lat == lat && placeList[i].lng == lng) {
                            placeList[i].setIcon("http://maps.google.com/mapfiles/kml/paddle/" + placeList[i].letter + ".png");
                            place = placeList[i];
                        }
                        else {
                            placeList[i].setIcon("http://maps.google.com/mapfiles/marker" + placeList[i].letter + ".png");
                        }
                    }
                }
                return false;
            }

            getMarket(this.placeList, lat, lng);
        }
        return place;
    },
    onGoogleMapPosition: function(inSender, inEvent) {
        var marker = this.setLetterSize(inEvent.lat, inEvent.lng);
        if(marker) {
            this.initPopUp(this, marker);
        }
    },
    reLoad: function() {
        this.createMap();
    },
    reLoadByOptions: function(options) {
        if(options.position.lat) this.lat = options.position.lat;
        if(options.position.lng) this.lng = options.position.lng;
        !!options.isClick ? this.isClick = true : this.isClick = false;

        switch(options.mapType) {
            case "ROADMAP":
                this.mapOptions.mapTypeId = google.maps.MapTypeId.ROADMAP;
                break;
            case "SATELLITE":
                this.mapOptions.mapTypeId = google.maps.MapTypeId.SATELLITE;
                break;
            case "HYBRID":
                this.mapOptions.mapTypeId = google.maps.MapTypeId.HYBRID;
                break;
            case "TERRAIN":
                this.mapOptions.mapTypeId = google.maps.MapTypeId.TERRAIN;
                break;
            default:
                break;
        }
        this.createMap();
    },
    setCenter: function(inLat, inLng) {
        this.center.lat = inLat;
        this.center.lng = inLng;
        this.map.panTo(new google.maps.LatLng(this.lat, this.lng));
    },
    setCenterByLocation: function(location, address) {
        this.lat = location.lat().toFixed(6);
        this.lng = location.lng().toFixed(6);
        this.address = address;
        this.map.panTo(location);
    },
    setPanToCurrent: function() {
        this.map.panTo(new google.maps.LatLng(this.lat, this.lng));
    },
    initPopUp: function(that, marker) {
        that.info = marker.info;
        that.openId = 'google-map-open' + marker.info.project.id;
        that.editId = 'google-map-edit' + marker.info.project.id;

        var html = "" +
            "<div id='enyo-google-map-main' class='enyo-google-map-main row'>" +
            "   <div class='col6'>" +
            "       <div class='name'>" + marker.info.project.name + "</div>" +
            "       <div class='row'>" +
            "           <div class='col5'>" +
            "               <div id='" + that.openId + "'>" +
            "                   <div><span class='onyx-icon onyx-icon-button btn btn-open'></span></div>" +
            "                   <div>OPEN</div>" +
            "               </div>" +
            "           </div>" +
            "           <div class='col5'>" +
            "               <div id='" + that.editId + "'>" +
            "                   <div><span class='onyx-icon onyx-icon-button btn btn-setting'></span></div>" +
            "                   <div>EDIT</div>" +
            "               </div>" +
            "           </div>" +
            "       </div>" +
            "   </div>" +
            "   <div class='col4'>" +
            "       <img style='height:60px' src='" + marker.info.project.image + "'/>" +
            "   </div>" +
            "</div>";
        that.infowindow.setContent(html);
        that.infowindow.open(that.map, marker);

        // Ready & Event Return
        google.maps.event.addListener(that.infowindow, 'domready', function() {
            document.getElementById('enyo-google-map-main').parentNode.parentNode.parentNode.classList.add("enyo-google-map-content");
            document.getElementById('enyo-google-map-main').parentNode.parentNode.parentNode.parentNode.classList.add("enyo-google-map-wrapper");

            // Add Event
            if(!document.getElementById(that.openId).hasAddEvent) {
                document.getElementById(that.openId).addEventListener('click', function(e) {
                    e.preventDefault();
                    that.doOpenSystemDesign(that.info);
                });
                document.getElementById(that.openId).hasAddEvent = true;
            }

            if(!document.getElementById(that.editId).hasAddEvent) {
                document.getElementById(that.editId).addEventListener('click', function(e) {
                    e.preventDefault();
                    that.doAdminister(that.info);
                });
                document.getElementById(that.editId).hasAddEvent = true;
            }

            // Get Element
            var popup = document.getElementsByClassName("enyo-google-map-content");
            popup = popup[0];

            // Add Class
            for(var i = 0; i < popup.childNodes.length; i++) {
                popup.childNodes[i].classList.add("enyo-google-menu-element" + i);
            }
        });
    },
    // Parameter building{BuildingId, BuildingName, Latitude, Longitude}
    initPlace: function(building) {
        var that = this;
        var location = new google.maps.LatLng(building.lat, building.lng);
        var letter = this.getLetter();
        var marker = new google.maps.Marker({
            position: location,
            map: this.map,
            //draggable: true,
            label: letter,
//            avatar: 'http://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=bus|FFFF00'
        });
        marker.letter = letter;
        marker.lat = building.lat;
        marker.lng = building.lng;
        marker.info = building;
        // Event: Show Menu Option
        google.maps.event.addListener(marker, "click", function() {
            that.setLetterSize(this.lat, this.lng);
            that.initPopUp(that, this);
        });
        google.maps.event.addListener(this.map, "click", function() {
            that.setLetterSize(null, null);
            that.infowindow.close();
        });

        return marker;
    },
    // Show Position, Show address when click
    getPlaceMarker: function(location) {
        var that = this;
        var marker = new google.maps.Marker({
            position: location,
            map: this.map,
            //draggable: true,
            label: this.getLetter(),
//            avatar: 'http://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=bus|FFFF00'
        });
        // Get Information
        this.geocoder.geocode({'latLng': location}, function(results, status) {
            if(status == google.maps.GeocoderStatus.OK) {
                var address = '<div style="max-width:200px">'
                    + '<div>' + results[0]["formatted_address"] + '</div>'
                        //+ '<div style=" display: inline-block; float: right"><img src="' + marker.avatar + '" /></div>'
                    + '</div>';
                // Event
                google.maps.event.addListener(marker, "click", function() {
                    that.infowindow.setContent(address);
                    that.infowindow.open(that.map, this);
                });
            } else {
                console.log("Geocode was not successful for the following reason: " + status);
            }
        });
    },
    geoCodeByLocation: function(location, marker) {
        var that = this;
        this.geocoder.geocode({'latLng': location}, function(results, status) {
            if(status == google.maps.GeocoderStatus.OK) {
                var address = '<div style="max-width:200px">'
                    + '<div>' + results[0]["formatted_address"] + '</div>'
                        //+ '<div style=" display: inline-block; float: right"><img src="' + marker.avatar + '" /></div>'
                    + '</div>';
                // Event
                google.maps.event.addListener(marker, "click", function() {
                    that.infowindow.setContent(address);
                    that.infowindow.open(that.map, this);
                });
            } else if(status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                setTimeout(function() {
                    that.geoCodeByLocation(location);
                }, 200);
            } else {
                console.log("Geocode was not successful for the following reason: " + status);
            }
        });

    },
    geoCodeByAddress: function(address) {
        var that = this;
        this.geocoder.geocode({'address': address}, function(results, status) {
            if(status === google.maps.GeocoderStatus.OK) {
                var result = results[0].geometry.location;
                var marker = new google.maps.Marker({
                    position: result,
                    map: that.map
                });
            } else if(status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                setTimeout(function() {
                    that.geoCodeByAddress(address);
                }, 200);
            } else {
                console.log("Geocode was not successful for the following reason:" + status);
            }
        });
    },
    // Parameter: latLng, return altitude
    getElevationByLocation: function(location) {
        var that = this;
        var locations = [location];
        // Create a LocationElevationRequest object using the array's one value
        var positionalRequest = {'locations': locations}
        // Initiate the location request
        var elevator = new google.maps.ElevationService();
        elevator.getElevationForLocations(positionalRequest, function(results, status) {
            if(status == google.maps.ElevationStatus.OK) {
                // Retrieve the first result
                if(results[0]) {
                    that.altitude = results[0].elevation.toFixed(6);
                    that.doElevation();
                } else {
                    alert('No results found');
                }
            } else {
                alert('Elevation service failed due to: ' + status);
            }
        });
    },
    // Parameter: locations[latLng1,latLng2,...]
    getElevationByLocations: function(locations) {
        // Create a LocationElevationRequest object using the array's one value
        var positionalRequest = {'locations': locations}
        // Initiate the location request
        var elevator = new google.maps.ElevationService();
        elevator.getElevationForLocations(positionalRequest, function(results, status) {
            if(status == google.maps.ElevationStatus.OK) {
                // Retrieve the first result
                if(results[0]) {
                    // Open an info window indicating the elevation at the clicked position
                    //infowindow.setContent('The elevation at this point <br>is ' + results[0].elevation + ' meters.');
                    //infowindow.setPosition(clickedLocation);
                    //infowindow.open(map);
                } else {
                    alert('No results found');
                }
            } else {
                alert('Elevation service failed due to: ' + status);
            }
        });
    },
    // Single Position, return Near
    getNearBySearch: function() {
        var that = this;
        var request = {location: this.currentPos, radius: 500, types: ['store']};
        this.service.nearbySearch(request, function(places, status) {
            if(status == google.maps.places.PlacesServiceStatus.OK) {
                for(var i = 0; i < places.length; i++) {
                    var marker = new google.maps.Marker({
                        map: this.map,
                        position: places[i].geometry.location,
                        title: places[i].vicinity,
                        label: this.getLetter(),
                        draggable: true
                    });
                    marker.place = places[i];
                    // Add click event listeners.
                    google.maps.event.addListener(marker, 'click', function() {
                        that.infowindow.setContent(this.place.name + '<br><img src="' + this.place.icon + '"/>');
                        that.infowindow.open(this.map, this);
                    });
                    // Add dragging event listeners.
                    google.maps.event.addListener(marker, 'dragstart', function() {
                    });
                    google.maps.event.addListener(marker, 'drag', function() {
                    });
                    google.maps.event.addListener(marker, 'dragend', function() {
                        // Get the Current position, where the pointer was dropped
                        //var point = marker.getPosition();
                        // Center the map at given point
                        //this.map.panTo(point);
                    });
                }
            }
        }.bind(this));
    },
    getInformationByAddress: function(address) {
        try {
            var that = this;
            this.geocoder.geocode({'address': address}, function(results, status) {
                if(status == google.maps.GeocoderStatus.OK) {
                    that.setCenterByLocation(results[0].geometry.location, results[0]["formatted_address"]);
                    that.address = results[0]["formatted_address"];
                    // Get Elevation
                    that.getElevationByLocation(results[0].geometry.location);
                } else {
                    console.log("Geocode was not successful for the following reason: " + status);
                    that.bubble("onError", {type: "address"});
                }
            });
        } catch(err) {
            console.log(err.message);
        }
    },
    // if load === true  return event
    getInformationByLocation: function(inLat, inLng, load) {
        try {
            var that = this;
            var latLng = new google.maps.LatLng(inLat, inLng);
            this.geocoder.geocode({'latLng': latLng}, function(results, status) {
                if(status == google.maps.GeocoderStatus.OK) {
                    that.setCenterByLocation(results[0].geometry.location, results[0]["formatted_address"]);
                    if(load === true) {
                        that.doMapLoaded();
                    }
                    // Get Elevation
                    that.getElevationByLocation(results[0].geometry.location);
                } else {
                    console.log("Geocode was not successful for the following reason: " + status);
                    that.bubble("onError", {type: "location"});
                }
            });
        } catch(err) {
            console.log(err.message);
        }
    },
    // get next letter
    getLetter: function() {
        var temp = this.letter;
        this.letter = String.fromCharCode(this.letter.charCodeAt(0) + 1);
        return temp;
    }
});

}],'src/data/data':[function (module,exports,global,require,request){
// This is a specific instance of a "test" dataset in the Enyo style.

var kind = require('enyo/kind'),
    Collection = require('enyo/Collection')

var mdlUser           = require('./models.js').User
var mdlOrganization   = require('./models.js').Organization  
var mdlDevice         = require('./models.js').Device        
var mdlSession        = require('./models.js').Session       
var mdlImage          = require('./models.js').Image
var mdlLocation       = require('./models.js').Location
var mdlSystemFolder   = require('./models.js').SystemFolder
var mdlBuildingModel  = require('./models.js').BuildingModel
var mdlBuilding       = require('./models.js').Building
var mdlFolder         = require('./models.js').Folder
var mdlSystem         = require('./models.js').System
var mdlControlType    = require('./models.js').ControlType

var enmRole                = require('./enums.js').Role
var enmBuildingModelTypes  = require('./enums.js').BuildingModelTypes
var enmBuildingTypes       = require('./enums.js').BuildingTypes

// organizations
var organization = new mdlOrganization({
        ID              : 1,
        name            : "PassiveLogic",
        streetAddress   : "2040 E Murray Holladay Rd",
        city            : "Salt Lake City",
        state           : "UT",
        country         : "United States",
        zipCode         : 84108,
        lastModified    : new Date(),
        locked          : false,
})

// device
const uuid = 'da7d18c5-7803-4547-9458-bd2c396010d1'
var device = new mdlDevice({
    ID: 1, name: "Test Device A", UUID: uuid, kind: null, lastModified: new Date(), locked: true
})

// session
var session = new mdlSession({ID: 1})

// user
var test_user = new mdlUser({
    ID                  : 1,
    email               : "test@passive-logic.com",
    userName            : "test",
    password            : "test123",
    firstName           : "Test",
    lastName            : "User",
    createdDateTime     : new Date(),
    lastSuccessfullLogin: null,
    role                : enmRole.superUser,
    lastFailedLogin     : null,
    failedCount         : 0,
    forcedReset         : 0,
    salt                : 0,
    lastModified        : new Date(),
    locked              : false,
})

var image_arnott      = new mdlImage({ID: 1, image: 'assets/images/projects/arnott.png'      , lastModified: new Date(), locked: false})
var image_hayes       = new mdlImage({ID: 2, image: 'assets/images/projects/hayes.png'       , lastModified: new Date(), locked: false})
var image_marano      = new mdlImage({ID: 3, image: 'assets/images/projects/marano.png'      , lastModified: new Date(), locked: false})
var image_olympuscove = new mdlImage({ID: 4, image: 'assets/images/projects/olympus-cove.png', lastModified: new Date(), locked: false})
var image_omeara      = new mdlImage({ID: 5, image: 'assets/images/projects/o-meara.png'     , lastModified: new Date(), locked: false})
var image_quinn       = new mdlImage({ID: 6, image: 'assets/images/projects/quinn.png'       , lastModified: new Date(), locked: false})
var image_turner      = new mdlImage({ID: 7, image: 'assets/images/projects/turner.png'      , lastModified: new Date(), locked: false})
var image_voz         = new mdlImage({ID: 8, image: 'assets/images/projects/voz.png'         , lastModified: new Date(), locked: false})
var image_zealey      = new mdlImage({ID: 9, image: 'assets/images/projects/zealey.png'      , lastModified: new Date(), locked: false})

const noaa = 0
const climate = {ID: 0}

var location_arnott      = new mdlLocation({ID: 1, address: '', latitude: 53.48539,  longitude: -2.248474, elevation: null, timeZone: 'MDT', lastModified: new Date(), locked: false})
var location_hayes       = new mdlLocation({ID: 2, address: '', latitude: 53.487305, longitude: -2.248832, elevation: null, timeZone: 'MDT', lastModified: new Date(), locked: false})
var location_marano      = new mdlLocation({ID: 3, address: '', latitude: 53.483079, longitude: -2.25426,  elevation: null, timeZone: 'MDT', lastModified: new Date(), locked: false})
var location_olympuscove = new mdlLocation({ID: 4, address: '', latitude: 53.485913, longitude: -2.242308, elevation: null, timeZone: 'MDT', lastModified: new Date(), locked: false})
var location_omeara      = new mdlLocation({ID: 5, address: '', latitude: 53.48387,  longitude: -2.245227, elevation: null, timeZone: 'MDT', lastModified: new Date(), locked: false})
var location_quinn       = new mdlLocation({ID: 6, address: '', latitude: 53.482696, longitude: -2.244712, elevation: null, timeZone: 'MDT', lastModified: new Date(), locked: false})
var location_turner      = new mdlLocation({ID: 7, address: '', latitude: 53.481995, longitude: -2.246957, elevation: null, timeZone: 'MDT', lastModified: new Date(), locked: false})
var location_voz         = new mdlLocation({ID: 8, address: '', latitude: 53.488664, longitude: -2.243979, elevation: null, timeZone: 'MDT', lastModified: new Date(), locked: false})
var location_zealey      = new mdlLocation({ID: 9, address: '', latitude: 53.488425, longitude: -2.237335, elevation: null, timeZone: 'MDT', lastModified: new Date(), locked: false})

var systemfolder_all      = new mdlSystemFolder({ID: 1, name: 'All Systems'     , toolTip: '', lastModified: new Date(), locked: false})
var systemfolder_unsorted = new mdlSystemFolder({ID: 2, name: 'Unsorted Systems', toolTip: '', lastModified: new Date(), locked: false})
var systemfolder_user1    = new mdlSystemFolder({ID: 3, name: 'User Folder 1'   , toolTip: '', lastModified: new Date(), locked: false})
var systemfolder_user2    = new mdlSystemFolder({ID: 4, name: 'User Folder 2'   , toolTip: '', lastModified: new Date(), locked: false})

const DDH = 0.0
const DDC = 0.0
const DE = 0.0

var buildingmodel_arnott      = new mdlBuildingModel({ID: 1, type: enmBuildingModelTypes.IFC, fileName: null, file: null, heatLossUA: null, designDayHeating: DDH, designDayCooling: DDC, designExtreme: DE, lastModified: new Date(), locked: false})
var buildingmodel_hayes       = new mdlBuildingModel({ID: 2, type: enmBuildingModelTypes.IFC, fileName: null, file: null, heatLossUA: null, designDayHeating: DDH, designDayCooling: DDC, designExtreme: DE, lastModified: new Date(), locked: false})
var buildingmodel_marano      = new mdlBuildingModel({ID: 3, type: enmBuildingModelTypes.IFC, fileName: null, file: null, heatLossUA: null, designDayHeating: DDH, designDayCooling: DDC, designExtreme: DE, lastModified: new Date(), locked: false})
var buildingmodel_olympuscove = new mdlBuildingModel({ID: 4, type: enmBuildingModelTypes.IFC, fileName: null, file: null, heatLossUA: null, designDayHeating: DDH, designDayCooling: DDC, designExtreme: DE, lastModified: new Date(), locked: false})
var buildingmodel_omeara      = new mdlBuildingModel({ID: 5, type: enmBuildingModelTypes.IFC, fileName: null, file: null, heatLossUA: null, designDayHeating: DDH, designDayCooling: DDC, designExtreme: DE, lastModified: new Date(), locked: false})
var buildingmodel_quinn       = new mdlBuildingModel({ID: 6, type: enmBuildingModelTypes.IFC, fileName: null, file: null, heatLossUA: null, designDayHeating: DDH, designDayCooling: DDC, designExtreme: DE, lastModified: new Date(), locked: false})
var buildingmodel_turner      = new mdlBuildingModel({ID: 7, type: enmBuildingModelTypes.IFC, fileName: null, file: null, heatLossUA: null, designDayHeating: DDH, designDayCooling: DDC, designExtreme: DE, lastModified: new Date(), locked: false})
var buildingmodel_voz         = new mdlBuildingModel({ID: 8, type: enmBuildingModelTypes.IFC, fileName: null, file: null, heatLossUA: null, designDayHeating: DDH, designDayCooling: DDC, designExtreme: DE, lastModified: new Date(), locked: false})
var buildingmodel_zealey      = new mdlBuildingModel({ID: 9, type: enmBuildingModelTypes.IFC, fileName: null, file: null, heatLossUA: null, designDayHeating: DDH, designDayCooling: DDC, designExtreme: DE, lastModified: new Date(), locked: false})

var building_arnott      = new mdlBuilding({ID: 1, name: 'Arnott Building',       notes: '', buildingType: enmBuildingTypes.residential, lastModified: new Date(), locked: false})
var building_hayes       = new mdlBuilding({ID: 2, name: 'Hayes Building',        notes: '', buildingType: enmBuildingTypes.residential, lastModified: new Date(), locked: false})
var building_marano      = new mdlBuilding({ID: 3, name: 'Marano Building',       notes: '', buildingType: enmBuildingTypes.residential, lastModified: new Date(), locked: false})
var building_olympuscove = new mdlBuilding({ID: 4, name: 'Olympus Cove Building', notes: '', buildingType: enmBuildingTypes.residential, lastModified: new Date(), locked: false})
var building_omeara      = new mdlBuilding({ID: 5, name: 'O\`Meara Building',     notes: '', buildingType: enmBuildingTypes.residential, lastModified: new Date(), locked: false})
var building_quinn       = new mdlBuilding({ID: 6, name: 'Quinn Building',        notes: '', buildingType: enmBuildingTypes.residential, lastModified: new Date(), locked: false})
var building_turner      = new mdlBuilding({ID: 7, name: 'Turner Building',       notes: '', buildingType: enmBuildingTypes.residential, lastModified: new Date(), locked: false})
var building_voz         = new mdlBuilding({ID: 8, name: 'Voz Building',          notes: '', buildingType: enmBuildingTypes.residential, lastModified: new Date(), locked: false})
var building_zealey      = new mdlBuilding({ID: 9, name: 'Zealey Building',       notes: '', buildingType: enmBuildingTypes.residential, lastModified: new Date(), locked: false})

// folders
var folder = new mdlFolder({ID: 1, name: 'Test Folder', toolTip: '', lastModified: new Date(), locked: false})

// systems
var system_arnott      = new mdlSystem({ID: 1, name: 'Arnott',         notes: '', status: '', lastModified: new Date(), locked: false})
var system_hayes       = new mdlSystem({ID: 2, name: 'Hayes',          notes: '', status: '', lastModified: new Date(), locked: false})
var system_marano      = new mdlSystem({ID: 3, name: 'Marano',         notes: '', status: '', lastModified: new Date(), locked: false})
var system_olympuscove = new mdlSystem({ID: 4, name: 'Olympus Cove',   notes: '', status: '', lastModified: new Date(), locked: false})
var system_omeara      = new mdlSystem({ID: 5, name: 'O\'meara',       notes: '', status: '', lastModified: new Date(), locked: false})
var system_quinn       = new mdlSystem({ID: 6, name: 'Quinn',          notes: '', status: '', lastModified: new Date(), locked: false})
var system_turner      = new mdlSystem({ID: 7, name: 'Turner',         notes: '', status: '', lastModified: new Date(), locked: false})
var system_voz         = new mdlSystem({ID: 8, name: 'Voz',            notes: '', status: '', lastModified: new Date(), locked: false})
var system_zealey      = new mdlSystem({ID: 9, name: 'Zealey',         notes: '', status: '', lastModified: new Date(), locked: false})

var controltype_arnott      = new mdlControlType({ID: 1, HVAC: true, lighting: false, irrigation: false, system: system_arnott     })
var controltype_hayes       = new mdlControlType({ID: 2, HVAC: true, lighting: false, irrigation: false, system: system_hayes      })
var controltype_marano      = new mdlControlType({ID: 3, HVAC: true, lighting: false, irrigation: false, system: system_marano     })
var controltype_olympuscove = new mdlControlType({ID: 4, HVAC: true, lighting: false, irrigation: false, system: system_olympuscove})
var controltype_omeara      = new mdlControlType({ID: 5, HVAC: true, lighting: false, irrigation: false, system: system_omeara     })
var controltype_quinn       = new mdlControlType({ID: 6, HVAC: true, lighting: false, irrigation: false, system: system_quinn      })
var controltype_turner      = new mdlControlType({ID: 7, HVAC: true, lighting: false, irrigation: false, system: system_turner     })
var controltype_voz         = new mdlControlType({ID: 8, HVAC: true, lighting: false, irrigation: false, system: system_voz        })
var controltype_zealey      = new mdlControlType({ID: 9, HVAC: true, lighting: false, irrigation: false, system: system_zealey     })

// Complete relations

organization.set('users', [test_user])

device.set('user', test_user)

session.set('users', [test_user])

test_user.set('organization', organization)
test_user.set('session',      session)
test_user.set('devices',      [device])
test_user.set('occupants',    [])

     image_arnott.set('buildings', [     building_arnott])
      image_hayes.set('buildings', [      building_hayes])
     image_marano.set('buildings', [     building_marano])
image_olympuscove.set('buildings', [building_olympuscove])
     image_omeara.set('buildings', [     building_omeara])
      image_quinn.set('buildings', [      building_quinn])
     image_turner.set('buildings', [     building_turner])
        image_voz.set('buildings', [        building_voz])
     image_zealey.set('buildings', [     building_zealey])

     image_arnott.set('systems', [system_arnott     ])
      image_hayes.set('systems', [system_hayes      ])
     image_marano.set('systems', [system_marano     ])
image_olympuscove.set('systems', [system_olympuscove])
     image_omeara.set('systems', [system_omeara     ])
      image_quinn.set('systems', [system_quinn      ])
     image_turner.set('systems', [system_turner     ])
        image_voz.set('systems', [system_voz        ])
     image_zealey.set('systems', [system_zealey     ])

     location_arnott.set('systems', [     system_arnott])
      location_hayes.set('systems', [      system_hayes])
     location_marano.set('systems', [     system_marano])
location_olympuscove.set('systems', [system_olympuscove])
     location_omeara.set('systems', [     system_omeara])
      location_quinn.set('systems', [      system_quinn])
     location_turner.set('systems', [     system_turner])
        location_voz.set('systems', [        system_voz])
     location_zealey.set('systems', [     system_zealey])

     location_arnott.set('weatherSources', [])
      location_hayes.set('weatherSources', [])
     location_marano.set('weatherSources', [])
location_olympuscove.set('weatherSources', [])
     location_omeara.set('weatherSources', [])
      location_quinn.set('weatherSources', [])
     location_turner.set('weatherSources', [])
        location_voz.set('weatherSources', [])
     location_zealey.set('weatherSources', [])

systemfolder_all.set('systems', [
         system_arnott,
          system_hayes,
         system_marano,
    system_olympuscove,
         system_omeara,
          system_quinn,
         system_turner,
            system_voz,
         system_zealey
])

     buildingmodel_arnott.set('buildings', [     building_arnott]) 
      buildingmodel_hayes.set('buildings', [      building_hayes]) 
     buildingmodel_marano.set('buildings', [     building_marano]) 
buildingmodel_olympuscove.set('buildings', [building_olympuscove]) 
     buildingmodel_omeara.set('buildings', [     building_omeara]) 
      buildingmodel_quinn.set('buildings', [      building_quinn]) 
     buildingmodel_turner.set('buildings', [     building_turner]) 
        buildingmodel_voz.set('buildings', [        building_voz]) 
     buildingmodel_zealey.set('buildings', [     building_zealey]) 

     building_arnott.set('systems', [     system_arnott])
      building_hayes.set('systems', [      system_hayes])
     building_marano.set('systems', [     system_marano])
building_olympuscove.set('systems', [system_olympuscove])
     building_omeara.set('systems', [     system_omeara])
      building_quinn.set('systems', [      system_quinn])
     building_turner.set('systems', [     system_turner])
        building_voz.set('systems', [        system_voz])
     building_zealey.set('systems', [     system_zealey])

     building_arnott.set('buildingModel', [     buildingmodel_arnott])
      building_hayes.set('buildingModel', [      buildingmodel_hayes])
     building_marano.set('buildingModel', [     buildingmodel_marano])
building_olympuscove.set('buildingModel', [buildingmodel_olympuscove])
     building_omeara.set('buildingModel', [     buildingmodel_omeara])
      building_quinn.set('buildingModel', [      buildingmodel_quinn])
     building_turner.set('buildingModel', [     buildingmodel_turner])
        building_voz.set('buildingModel', [        buildingmodel_voz])
     building_zealey.set('buildingModel', [     buildingmodel_zealey])

     building_arnott.set('image',      image_arnott.ID)
      building_hayes.set('image',       image_hayes.ID)
     building_marano.set('image',      image_marano.ID)
building_olympuscove.set('image', image_olympuscove.ID)
     building_omeara.set('image',      image_omeara.ID)
      building_quinn.set('image',       image_quinn.ID)
     building_turner.set('image',      image_turner.ID)
        building_voz.set('image',         image_voz.ID)
     building_zealey.set('image',      image_zealey.ID)

//folder.set('folderviews', )
//folder.set('groups', )
folder.set('systems', [
         system_arnott.get("ID"),
          system_hayes.get("ID"),
         system_marano.get("ID"),
    system_olympuscove.get("ID"),
         system_omeara.get("ID"),
          system_quinn.get("ID"),
         system_turner.get("ID"),
            system_voz.get("ID"),
         system_zealey.get("ID")
])

     system_arnott.set('folder', folder)
      system_hayes.set('folder', folder)
     system_marano.set('folder', folder)
system_olympuscove.set('folder', folder)
     system_omeara.set('folder', folder)
      system_quinn.set('folder', folder)
     system_turner.set('folder', folder)
        system_voz.set('folder', folder)
     system_zealey.set('folder', folder)

     system_arnott.set('systemFolder', systemfolder_all)
      system_hayes.set('systemFolder', systemfolder_all)
     system_marano.set('systemFolder', systemfolder_all)
system_olympuscove.set('systemFolder', systemfolder_all)
     system_omeara.set('systemFolder', systemfolder_all)
      system_quinn.set('systemFolder', systemfolder_all)
     system_turner.set('systemFolder', systemfolder_all)
        system_voz.set('systemFolder', systemfolder_all)
     system_zealey.set('systemFolder', systemfolder_all)

     system_arnott.set('location',      location_arnott)
      system_hayes.set('location',       location_hayes)
     system_marano.set('location',      location_marano)
system_olympuscove.set('location', location_olympuscove)
     system_omeara.set('location',      location_omeara)
      system_quinn.set('location',       location_quinn)
     system_turner.set('location',      location_turner)
        system_voz.set('location',         location_voz)
     system_zealey.set('location',      location_zealey)

     system_arnott.set('building',      building_arnott)
      system_hayes.set('building',       building_hayes)
     system_marano.set('building',      building_marano)
system_olympuscove.set('building', building_olympuscove)
     system_omeara.set('building',      building_omeara)
      system_quinn.set('building',       building_quinn)
     system_turner.set('building',      building_turner)
        system_voz.set('building',         building_voz)
     system_zealey.set('building',      building_zealey)

     system_arnott.set('image',      image_arnott)
      system_hayes.set('image',       image_hayes)
     system_marano.set('image',      image_marano)
system_olympuscove.set('image', image_olympuscove)
     system_omeara.set('image',      image_omeara)
      system_quinn.set('image',       image_quinn)
     system_turner.set('image',      image_turner)
        system_voz.set('image',         image_voz)
     system_zealey.set('image',      image_zealey)

     system_arnott.set('controlTypes',      controltype_arnott)
      system_hayes.set('controlTypes',       controltype_hayes)
     system_marano.set('controlTypes',      controltype_marano)
system_olympuscove.set('controlTypes', controltype_olympuscove)
     system_omeara.set('controlTypes',      controltype_omeara)
      system_quinn.set('controlTypes',       controltype_quinn)
     system_turner.set('controlTypes',      controltype_turner)
        system_voz.set('controlTypes',         controltype_voz)
     system_zealey.set('controlTypes',      controltype_zealey)

var mdlOrganizations    = kind({kind: Collection, name: "Organizations",     model: mdlOrganization })
var mdlDevices          = kind({kind: Collection, name: "mdlDevices",        model: mdlDevice       })
var mdlSessions         = kind({kind: Collection, name: "mdlSessions",       model: mdlSession      })
var mdlUsers            = kind({kind: Collection, name: "mdlUsers",          model: mdlUser         })
var mdlImages           = kind({kind: Collection, name: "mdlImages",         model: mdlImage        })
var mdlLocations        = kind({kind: Collection, name: "mdlLocations",      model: mdlLocation     })
var mdlSystemFolders    = kind({kind: Collection, name: "mdlSystemFolders",  model: mdlSystemFolder })
var mdlBuildingModels   = kind({kind: Collection, name: "mdlBuildingModels", model: mdlBuildingModel})
var mdlBuildings        = kind({kind: Collection, name: "mdlBuildings",      model: mdlBuilding     })
var mdlSystems          = kind({kind: Collection, name: "mdlSystems",        model: mdlSystem       })

module.exports = kind({
    name: 'StaticDataModel',
    organizations: new mdlOrganizations([organization]),
    devices: new mdlDevices([device]),
    sessions: new mdlSessions([session]),
    users: new mdlUsers([test_user]),
    images: new mdlImages([
        image_arnott,
        image_hayes,
        image_marano,
        image_olympuscove,
        image_omeara,
        image_quinn,
        image_turner,
        image_voz,
        image_zealey,
    ]),
    locations: new mdlLocations([
        location_arnott,
        location_hayes,
        location_marano,
        location_olympuscove,
        location_omeara,
        location_quinn,
        location_turner,
        location_voz,
        location_zealey,
    ]),
    systemfolders: new mdlSystemFolders([
        systemfolder_all,
        systemfolder_unsorted,
        systemfolder_user1,
        systemfolder_user2,
    ]),
    buildingmodels: new mdlBuildingModels([
        buildingmodel_arnott,
        buildingmodel_hayes,
        buildingmodel_marano,
        buildingmodel_olympuscove,
        buildingmodel_omeara,
        buildingmodel_quinn,
        buildingmodel_turner,
        buildingmodel_voz,
        buildingmodel_zealey,
    ]),
    buildings: new mdlBuildings([
        building_arnott,
        building_hayes,
        building_marano,
        building_olympuscove,
        building_omeara,
        building_quinn,
        building_turner,
        building_voz,
        building_zealey,
    ]),
    systems: new mdlSystems([
        system_arnott,
        system_hayes,
        system_marano,
        system_olympuscove,
        system_omeara,
        system_quinn,
        system_turner,
        system_voz,
        system_zealey,
    ]),
})

},{'./models.js':'src/data/models','./enums.js':'src/data/enums'}],'src/views/progress/site/sensor':[function (module,exports,global,require,request){
//

var kind = require('enyo/kind');

var FittableRows = require('layout/FittableRows'),
    FittableColumns = require('layout/FittableColumns'),
    Image = require('enyo/Image');

module.exports = kind({
    name: "pl.site.Sensor",
    kind: FittableRows,
    classes: "sensor",
    handlers: {
        onmouseover: "pressed",
        onmouseout: "released"
    },
    published: {
        url: "",
        title: ""
    },
    events: {
        onSelect: "",
        onRemove: ""
    },
    components: [
        { kind: FittableColumns, ontap: "doSelect", components: [
            { name: "Image", kind: Image, classes: "image" },
            { name: "Title", classes: "title", fit: true }
        ]},
        { name: "Remove", classes: "delete", ontap: "doRemove"}
    ],
    create: function() {
        this.inherited(arguments);
        this.$.Image.setSrc(this.url);
        this.$.Title.setContent(this.title);
    },
    pressed: function() {
        this.addClass("selected");
    },
    released: function() {
        this.removeClass("selected");
    }
});

}],'src/views/progress/site/input':[function (module,exports,global,require,request){
//

var kind = require('enyo/kind');

var FittableRows = require('layout/FittableRows'),
    Input = require('onyx/Input'),
    Signals = require('enyo/Signals');

var utils = require('../../../common/services/utils.js');

module.exports = kind({
    name: 'pl.site.Input',
    handlers: {
        onmouseover: 'pressed',
        onmouseout: 'released'
    },
    events: {
        onChanged: '',
        onDelete: ''
    },
    published: {
        value: 'unknown',
        color: undefined,
        zoneObject: new Collection()
    },
    components: [
        {
            name: 'Wrapper', kind: FittableRows, classes: 'input', onholdpulse: 'holdpulse',
            components: [
                {name: 'Value'},
                {name: 'Color', classes: 'color', showing: false},
                {name: 'Input', kind: Input, type: 'text', oninput: 'valueChanged', onchange: 'valueChanged'},
                {name: 'Remove', classes: 'remove', ontap: 'doDelete'}
            ]
        },
        {kind: Signals, onSiteZoneCreated: 'onSiteZoneCreated'},
        {kind: Signals, onSiteZoneRemoved: 'onSiteZoneRemoved'},
        {kind: Signals, onSiteZoneColorChanged: 'onSiteZoneColorChanged'},
        {kind: Signals, onCheckInput: 'onCheckInput'},
        {kind: Signals, onKeyDown: 'onKeyDown'}
    ],
    create: function() {
        this.inherited(arguments);

        this.edit = false;
        this.setDescription();
    },
    pressed: function() {
        this.addClass('hover');
    },
    released: function() {
        this.removeClass('hover');
    },
    // Edit Enable
    holdpulse: function(inSender, inEvent) {
        if(inEvent.holdTime >= SITE_SETTING.holdTime) {
            this.edit = true;
            this.enable();
        }
    },
    disable: function() {
        this.$.Input.hide();
        this.$.Remove.hide();
        this.edit = false;

        // Has changed
        if(this.senderChanged) {
            this.doChanged(this.senderChanged);
            delete this.senderChanged;
        }
    },
    enable: function() {
        if(this.edit) {
            this.$.Input.show();
            this.$.Input.focus();
            this.$.Input.selectContents();
            //this.$.Remove.show();

            // Changing
            this.senderChanged = this.$.Input;
        }
    },
    setEnable: function() {
        this.edit = true;
        this.enable();
    },
    setDescription: function() {
        this.$.Value.setContent(this.value);
        this.$.Input.setValue(this.value);
        this.$.Color.applyStyle('background-color', utils.getRgbaString(this.color, SITE_SETTING.transparency));
        //this.oldValue = this.value;
    },
    // Value changed
    valueChanged: function(inSender) {
        //if(inSender.getValue().trim() == '') {
        //    this.$.Value.setContent(this.oldValue);
        //    this.$.Input.setValue(this.oldValue);
        //} else {
        //    this.value = this.$.Input.getValue();
        //    this.oldValue = this.value;
        //    this.$.Value.setContent(this.value);
        //}
        this.value = this.$.Input.getValue();
        this.$.Value.setContent(this.value);
    },
    colorChanged: function(color) {
        this.color = color;
        this.zoneObject.color = color;

        this.$.Color.applyStyle('background-color', utils.getRgbaString(this.color, SITE_SETTING.transparency));
    },
    onSiteZoneCreated: function(inSender, inEvent) {
        if(inEvent.floorId == this.floorId && inEvent.zoneId == this.zoneId) {
            // Hack to add breadcrumb percentage
            var percent = 0;
            percent = PROGRESS['SITE_BUILDER'];
            percent += 10;
            if(PROGRESS['SITE_BUILDER'] < 100) {
                Signals.send('onProgress', {page: APP_PROGRESS.PR_SITE, key: 'SITE_BUILDER', value: percent});
            } else {
                PROGRESS['SITE_BUILDER'] = 100;
            }
            // END HACK

            this.colorChanged(inEvent.color);
            this.$.Color.show();
        }
    },
    onSiteZoneRemoved: function(inSender, inEvent) {
        if(inEvent.floorId == this.floorId && inEvent.zoneId == this.zoneId) {
            this.$.Color.hide();
        }
    },
    onSiteZoneColorChanged: function(inSender, inEvent) {
        if(inEvent.floorId == this.floorId && inEvent.zoneId == this.zoneId) {
            this.colorChanged(inEvent.color);
        }
    },
    onCheckInput: function(inSender, inEvent) {
        if(inEvent.sender == this || inEvent.sender == this.$.Wrapper || inEvent.sender == this.$.Value || inEvent.sender == this.$.Input) {
            this.enable();
        } else {
            this.disable();
        }
    },
    onKeyDown: function(inSender, inEvent) {
        if(inEvent.keyCode === 13) { // Enter
            this.disable();
        }
    }
});

},{'../../../common/services/utils.js':'src/common/services/utils'}],'src/views/progress/wiring/input':[function (module,exports,global,require,request){
// MenuItem

var kind = require('enyo/kind');

var FittableRows = require('layout/FittableRows'),
    Signals = require('enyo/Signals'),
    Input = require('onyx/Input');

module.exports = kind({
    name: "pl.wr.Input",
    tag: "li",
    kind: FittableRows,
    handlers: {
        onmouseover: "pressed",
        onmouseout: "released"
    },
    published: {
        title: "NO NAME",
        edit: false
    },
    components: [
        {kind: FittableRows, classes: "input", components: [
            {name: "Title", objType: "input"},
            {name: "Input", kind: Input, objType: "input"}
        ]},
        {kind: Signals, onCheckInput: "transmission"},
        {kind: Signals, onKeyDown: "keyDown"}
    ],
    create: function() {
        this.inherited(arguments);
        this.$.Title.setContent(this.title);
        this.$.Input.setValue(this.title);
    },
    rendered: function() {
        this.inherited(arguments);
        if(!this.edit) this.disable();
    },
    pressed: function() {
        this.addClass("selected");
    },
    released: function() {
        this.removeClass("selected");
    },
    disable: function() {
        this.$.Input.hide();
    },
    enable: function() {
        this.$.Input.show();
    },
    transmission: function(inSender, inEvent) {
        if(inEvent.sender == this || inEvent.sender == this.$.Wrapper || inEvent.sender == this.$.Value || inEvent.sender == this.$.Input) {
            this.enable();
        } else {
            this.disable();
        }
    },
    keyDown: function(inSender, inEvent) {
        if(inEvent.keyCode === 13) { // Enter
            this.disable();
        }
    }
});


}],'src/components/menubar':[function (module,exports,global,require,request){
// MenuItem

var kind = require('enyo/kind');

var Drawer = require('onyx/Drawer'),
    FittableRows = require('layout/FittableRows'),
    FittableRowsLayout = require('layout/FittableLayout').Rows;

var MenuItem = kind({
    name: "MenuItem",
    tag: "li",
    handlers: {
        onmouseover: "pressed",
        onmouseout: "released"
    },
    published: {
        title: ""
    },
    allowHtml: true,
    create: function() {
        this.inherited(arguments);
        this.setContent(this.title);
    },
    pressed: function() {
        this.addClass("selected");
    },
    released: function() {
        this.removeClass("selected");
    }
});
exports.MenuItem = MenuItem;

// MenuBar
var MenuBar = kind({
    name: "MenuBar",
    kind: FittableRows,
    classes: "menu-bar",
    published: {
        resizeContent: false,
        contentComponents: ""
    },
    events: {
        onItemTap: "",
        onItemDrag: "",
        onDisable: ""
    },
    heightTitle: undefined,
    heightContent: undefined,
    currentSelect: undefined,
    components: [
        {layoutKind: FittableRowsLayout, name: "MenuContent"}
    ],
    create: function() {
        this.inherited(arguments);
        for(var i = 0; i < this.contentComponents.length; i++) {
            this.$.MenuContent.createComponent({
                name: "Item_" + i, index: i, components: [
                    {
                        name: "ItemTitle_" + i,
                        index: i,
                        classes: "title",
                        ontap: "handleShowTap",
                        content: this.contentComponents[i][0]
                    },
                    {
                        name: "ItemDrawer_" + i, index: i, kind: Drawer, tag: "ul", open: false, animated: false,
                        onDrawerAnimationEnd: "drawerAnimationEnd",
                        components: this.contentComponents[i][1]
                    }
                ]
            }, {owner: this})
        }
        if(this.resizeContent == true) {
            this.resizeHeightContent();
        }
    },
    rendered: function() {
        this.inherited(arguments);
        for(var i = 0; i < this.$.MenuContent.children.length; i++) {
            this.$.MenuContent.children[i].children[1].setOpen(false);
        }
        this.$.MenuContent.children[0].addClass("selected");
        this.$.MenuContent.children[0].children[1].setOpen(true);
        if(this.resizeContent == true) this.resizeHeightContent();
    },
    handleResize: function() {
        this.inherited(arguments);
        if(this.resizeContent == true) this.resizeHeightContent();
    },
    resizeHeightContent: function() {
        this.heightTitle = utils.getCSSProperty(this.$.MenuContent.children[0].children[0], "offsetHeight", false);
        this.heightContent = utils.getCSSProperty(this, "offsetHeight", false) - this.heightTitle * this.$.MenuContent.children.length;
        for(var i = 0; i < this.$.MenuContent.children.length; i++) {
            if(this.$.MenuContent.children[i].hasClass("selected")) {
                this.$.MenuContent.children[i].applyStyle("height", (this.heightContent + this.heightTitle) + "px");
            }
        }
    },
    handleShowTap: function(inSender, inEvent) {
        if(!this.$["Item_" + inSender.index].hasClass("selected")) {
            for(var i = 0; i < this.$.MenuContent.children.length; i++) {
                if(this.$.MenuContent.children[i] != this.$["Item_" + inSender.index] && this.$.MenuContent.children[i].hasClass("selected")) {
                    this.$.MenuContent.children[i].children[1].applyStyle("overflow", "hidden");
                    this.$.MenuContent.children[i].children[1].setOpen(false);
                    this.$.MenuContent.children[i].removeClass("selected");
                    this.$.MenuContent.children[i].applyStyle("height", this.heightTitle + "px");
                }
            }
            this.$["Item_" + inSender.index].children[1].applyStyle("overflow", "hidden");
            this.$["Item_" + inSender.index].children[1].setOpen(true);
            this.$["Item_" + inSender.index].addClass("selected");
            if(this.resizeContent == true) this.$["Item_" + inSender.index].applyStyle("height", (this.heightContent + this.heightTitle) + "px");
        }
        else {
            this.$["Item_" + inSender.index].children[1].applyStyle("overflow", "hidden");
            this.$["Item_" + inSender.index].children[1].setOpen(false);
            this.$["Item_" + inSender.index].removeClass("selected");
            this.doDisable();
        }
    },
    handleItemTap: function(inSender, inEvent) {
        if(this.currentSelect == inSender.name) {
            return;
        }
        if(this.currentSelect != undefined) {
            this.$[this.currentSelect].removeClass("active");
        }
        this.currentSelect = inSender.name;
        this.$[this.currentSelect].addClass("active");
        this.doItemTap(inEvent);
    },
    handleItemDrag: function(inSender, inEvent) {
        this.doItemDrag(inEvent);
    },
    // Fix overflow: hidden;
    drawerAnimationEnd: function(inSender) {
        inSender.applyStyle("overflow", "inherit");
    }
});
exports.MenuBar = MenuBar;

}],'src/views/progress/system/search':[function (module,exports,global,require,request){
// SEARCH
var kind = require('enyo/kind'),
    Signals = require('enyo/Signals');

var Image = require('enyo/Image'),
    Input = require('onyx/Input'),
    InputDecorator = require('onyx/InputDecorator'),
    Toolbar = require('onyx/Toolbar');

module.exports = kind({
    name: "pl.st.Search",
    kind: Toolbar,
    classes: "form-search",
    components: [
        { kind: InputDecorator, components: [
            { kind: Input, placeholder: "SEARCH", oninput: "valueChanged"},
            { kind: Image, src: "assets/images/search-input-search.png", ontap: "valueChanged" }
        ]}
    ],
    valueChanged: function() {
        var value = this.$.input.getValue().trim();
        this.bubble("onChanged", {value: value});
        Signals.send("onSystemSearch", {value: value});
    }
});

}],'src/views/progress/setup/site':[function (module,exports,global,require,request){
//

var kind = require('enyo/kind');

var Checkbox = require('onyx/Checkbox'),
    Signals = require('enyo/Signals'),
    Drawer = require('onyx/Drawer'),
    FittableColumns = require('layout/FittableColumns'),
    FittableRows = require('layout/FittableRows'),
    FittableRowsLayout = require('layout/FittableLayout').Rows,
    GoogleMap = require('../../../components/googlemap.js'),
    Group = require('enyo/Group'),
    Input = require('onyx/Input'),
    Scroller = require('enyo/Scroller'),
    TextArea = require('onyx/TextArea');

var LABELS = require('../../../common/services/label.js').LABELS;
var STACK_LIST = require('../../../common/services/stack.js').STACK_LIST;
var STACK_TYPES = require('../../../common/services/stack.js').STACK_TYPES;
var STACK_METHODS = require('../../../common/services/stack.js').STACK_METHODS;

module.exports = kind({
    name: "pl.su.Site",
    kind: FittableRows,
    classes: "site-info enyo-fit",
    components: [
        { name: "Project", kind: FittableRows, classes: "outer-box", components: [
            { name: "ProjectName", classes: "drawer-title", content: "PROJECT INFORMATION<div class='ok'></div>", allowHtml: true, drawer: "ProjectContent", ontap: "activateDrawer"},
            { name: "ProjectContent", kind: Drawer, open: true, classes: "inner-box", components: [
                { kind: FittableColumns, components: [
                    { kind: FittableRows, fit: true, components: [
                        { classes: "item-row", components: [
                            { classes: "item-title", content: "PROJECT NAME"},
                            {
                                name: "NameInput", kind: Input, placeholder: LABELS.setup.projectName, classes: "txt-project-name",
                                oninput: "valueChanged",
                                onfocus: "onSaveFocus",
                                onkeydown: "onSaveKeyDown",
                                onchange: "onSaveChange"
                            }
                        ]},
                        { classes: "item-row", components: [
                            { classes: "item-title", content: "NOTES"},
                            {
                                name: "NotesInput", kind: TextArea, classes: "txt-note", placeholder: LABELS.setup.projectNotes,
                                oninput: "valueChanged",
                                onfocus: "onSaveFocus",
                                onkeydown: "onSaveKeyDown",
                                onchange: "onSaveChange"
                            }
                        ]}
                    ]},
                    { classes: "checkgroup", layoutKind: FittableRowsLayout, components: [
                        { classes: "item-title", content: "CONTROL TYPE"},
                        { name: "ControlTypeGroupCheckbox", classes: "checkgroup-box multiple", components: [
                            { kind: FittableColumns, ontap:"onCheckBoxTap", checkbox: "HvacSystemCheckbox", components: [
                                { name: "HvacSystemCheckbox", kind: Checkbox, classes: "checkbox-style2 hvac-system", onchange: "valueChanged"},
                                { content: "HVAC SYSTEM" }
                            ]},
                            { kind: FittableColumns, ontap:"onCheckBoxTap", checkbox: "LightingCheckbox", components: [
                                { name: "LightingCheckbox", kind: Checkbox, classes: "checkbox-style2 lighting", onchange: "valueChanged"},
                                { content: "LIGHTING" }
                            ]},
                            { kind: FittableColumns, ontap:"onCheckBoxTap", checkbox: "IrrigationCheckbox", components: [
                                { name: "IrrigationCheckbox", kind: Checkbox, classes: "checkbox-style2 irrigation", onchange: "valueChanged"},
                                { content: "IRRIGATION" }
                            ]}
                        ]}
                    ]},
                    { classes: "checkgroup", layoutKind: FittableRowsLayout, components: [
                        { classes: "item-title", content: "BUILDING/SITE TYPE"},
                        { name: "SiteTypeGroupCheckbox", kind: Group, defaultKind: Checkbox, classes: "checkgroup-box single", onActivate: "valueChanged", components: [
                            { name: "CommercialCheckbox", parentName: "SiteTypeGroupCheckbox", index: BUILDING_SITE_TYPES.COMMERCIAL, content: "COMMERCIAL", classes: "checkbox-style2 commercial"},
                            { name: "ResidentialCheckbox", parentName: "SiteTypeGroupCheckbox", index: BUILDING_SITE_TYPES.RESIDENTIAL, content: "RESIDENTIAL", classes: "checkbox-style2 residential"},
                            { name: "IndustrialCheckbox", parentName: "SiteTypeGroupCheckbox", index: BUILDING_SITE_TYPES.INDUSTRIAL, content: "INDUSTRIAL", classes: "checkbox-style2 industrial"}
                            //{ name: "OtherCheckbox", parentName: "SiteTypeGroupCheckbox", index: "other", content: "OTHER", classes: "checkbox-style2 other"}
                        ]}
                    ]}
                ]}
            ]}
        ]},
        { name: "Location", kind: FittableRows, classes: "outer-box", fit: true, components: [
            { name: "LocationName", classes: "drawer-title", content: "LOCATION INFORMATION<div class='ok'></div>", allowHtml: true, drawer: "LocationContent", ontap: "activateDrawer"},
            { name: "LocationContent", kind: Drawer, open: true, fit: true, classes: "inner-box", components: [
                { kind: FittableColumns, style: "height:100%", components: [
                    { layoutKind: FittableRowsLayout, kind: Scroller, fit: true, components: [
                        { classes: "item-row", components: [
                            { classes: "item-title", content: "ADDRESS"},
                            {
                                name: "AddressInput", kind: TextArea, classes: "txt-address", placeholder: LABELS.setup.projectAddress,
                                //oninput: "valueChanged",
                                onfocus: "onSaveFocus",
                                onkeydown: "onSaveKeyDown",
                                //onchange: "onSaveChange"
                                onchange: "valueChanged"
                            }
                        ]},
                        { classes: "item-row", components: [
                            { classes: "item-title", content: "COORDINATES"},
                            { kind: FittableColumns, components: [
                                {
                                    name: "NorthInput", kind: Input, classes: "txt-coordinates", placeholder: LABELS.setup.projectCoordinates,
                                    oninput: "valueChanged",
                                    onfocus: "onSaveFocus",
                                    onkeydown: "onSaveKeyDown",
                                    onchange: "onSaveChange"
                                },
                                { classes: "textCoordinates", content: "°N"},
                                {
                                    name: "WestInput", kind: Input, classes: "txt-coordinates", placeholder: LABELS.setup.projectCoordinates,
                                    oninput: "valueChanged",
                                    onfocus: "onSaveFocus",
                                    onkeydown: "onSaveKeyDown",
                                    onchange: "onSaveChange"
                                },
                                { classes: "textCoordinates", content: "°W"}
                            ]}
                        ]},
                        { classes: "item-row", components: [
                            { classes: "item-title", content: "ALTITUDE"},
                            {
                                name: "AltitudeInput", kind: Input, classes: "txt-altitude", attributes: {readonly: true}, placeholder: LABELS.setup.projectAltitude,
                                oninput: "valueChanged",
                                onfocus: "onSaveFocus",
                                onkeydown: "onSaveKeyDown",
                                onchange: "onSaveChange"
                            }
                        ]}
                    ]},
                    { kind: FittableRows, name: "GoogleMapWrap", classes: "google-map-wrap" }

                ]}
            ]}
        ]}
    ],
    breadcrumbHack: function(key, page, percentToAdd) {
        // Hack to add breadcrumb percentage
        var percent = PROGRESS[key];

        percent += percentToAdd;

        if(PROGRESS[key] < 100) {
            Signals.send("onProgress", {page: page, key: key, value: percent});
        } else {
            PROGRESS[key] = 100;
        }
    },
    constructor: function() {
        this.inherited(arguments);
        // Data
        this.project = plProject2;
    },
    create: function() {
        this.inherited(arguments);

        // Set input fields
        this.inputFields = {
            name: this.$.NameInput,
            notes: this.$.NotesInput,
            controlTypes: {
                hvacSystem: this.$.HvacSystemCheckbox,
                lighting: this.$.LightingCheckbox,
                irrigation: this.$.IrrigationCheckbox
            },
            buildingSiteType: this.$.SiteTypeGroupCheckbox,
            buildingSiteTypeChilds: {
                // TODO:: Refactor comerical to commercial it is spelled wrong...
                commercial: this.$.CommercialCheckbox,
                residential: this.$.ResidentialCheckbox,
                industrial: this.$.IndustrialCheckbox
                //other: this.$.OtherCheckbox
            },
            address: this.$.AddressInput,
            north: this.$.NorthInput,
            west: this.$.WestInput,
            altitude: this.$.AltitudeInput
        };
    },
    rendered: function() {
        this.inherited(arguments);

        // Update data
        /*this.inputFields.name.setValue(this.project.name);
         this.inputFields.notes.setValue(this.project.notes);*/

        this.inputFields.controlTypes.hvacSystem.setChecked(this.project.hvacSystem);
        this.inputFields.controlTypes.lighting.setChecked(this.project.lighting);
        this.inputFields.controlTypes.irrigation.setChecked(this.project.irrigation);
        if(this.project.buildingSiteType == BUILDING_SITE_TYPES.COMMERCIAL) {
            this.inputFields.buildingSiteTypeChilds.commercial.setChecked(true);
        } else if(this.project.buildingSiteType == BUILDING_SITE_TYPES.RESIDENTIAL) {
            this.inputFields.buildingSiteTypeChilds.residential.setChecked(true);
        } else if(this.project.buildingSiteType == BUILDING_SITE_TYPES.INDUSTRIAL) {
            this.inputFields.buildingSiteTypeChilds.industrial.setChecked(true);
        }
        this.inputFields.address.setValue(this.project.address);
        this.inputFields.north.setValue(this.project.north);
        this.inputFields.west.setValue(this.project.west);
        this.inputFields.altitude.setValue(this.project.altitude);

        // Set oldValue SiteTypeGroupCheckbox
        var me = this;
        document.getElementById(this.inputFields.buildingSiteType.getId()).addEventListener('mousedown', function(e) {
            if(me.inputFields.buildingSiteType.hasChange && me.inputFields.buildingSiteType.oldValue !== me.inputFields.buildingSiteType.getActive()) {
                me.inputFields.buildingSiteType.oldValue = me.inputFields.buildingSiteType.getActive()
            }
        });
    },
    handleResize: function() {
        this.inherited(arguments);
    },
    activateDrawer: function(inSender, inEvent) {
        if(this.$[inSender.drawer].open === true) {
            inSender.addClass("unactive");
        } else if(inSender.hasClass("unactive")) {
            inSender.removeClass("unactive");
        }
        this.$[inSender.drawer].setOpen(!this.$[inSender.drawer].open);
    },
    onCheckBoxTap: function(inSender) {
        this.$[inSender.checkbox].triggerHandler('ontap');
    },
    initGoogleMap: function() {
        this.$.GoogleMapWrap.createComponent({
            name: "GoogleMap",
            kind: GoogleMap,
            single: true,
            classes: "google-map",
            onMapLoaded: "mapLoaded",
            onElevation: "mapElevation",
            onError: "mapError"
        }, {owner: this});
        this.$.GoogleMap.render();
    },
    mapReLoad: function() {
        if(this.$.GoogleMap) {
            this.$.GoogleMap.reLoad();
        }
    },
    mapLoaded: function() {
        this.inputFields.address.setValue(this.$.GoogleMap.address);
        this.inputFields.north.setValue(this.$.GoogleMap.lat);
        this.inputFields.west.setValue(this.$.GoogleMap.lng);
    },
    mapElevation: function(inSender, inEvent) {
        if(this.inputFields.north.getValue() != '' && this.inputFields.west.getValue() != '') {
            this.inputFields.altitude.setValue(inEvent.originator.altitude);
            this.project.altitude = inEvent.originator.altitude;
        }
        // Check mark
        this.checkMark();
    },
    mapError: function(inSender, inEvent) {
        if(inEvent.type == "address") {
            this.inputFields.north.setValue("");
            this.inputFields.west.setValue("");
            this.inputFields.altitude.setValue("");
        } else if(inEvent.type == "location") {
            this.inputFields.address.setValue("");
            this.inputFields.altitude.setValue("");
        }
        // Check mark
        this.checkMark();
    },
    valueChanged: function(inSender, inEvent) {
        switch(inSender.name) {
            case "NameInput":
                this.project.name = this.inputFields.name.getValue();
                break;
            case "NotesInput":
                this.project.notes = this.inputFields.notes.getValue();
                break;
            case "HvacSystemCheckbox":
                this.project.hvacSystem = this.inputFields.controlTypes.hvacSystem.getChecked();

                STACK_LIST.addStack(
                    this.owner.name,
                    this.owner.name,
                    STACK_TYPES.ENYO,
                    STACK_METHODS.EDIT,
                    inSender,
                    !this.project.hvacSystem
                );
                break;
            case "LightingCheckbox":
                this.project.lighting = this.inputFields.controlTypes.lighting.getChecked();

                STACK_LIST.addStack(
                    this.owner.name,
                    this.owner.name,
                    STACK_TYPES.ENYO,
                    STACK_METHODS.EDIT,
                    inSender,
                    !this.project.lighting
                );
                break;
            case "IrrigationCheckbox":
                this.project.irrigation = this.inputFields.controlTypes.irrigation.getChecked();

                STACK_LIST.addStack(
                    this.owner.name,
                    this.owner.name,
                    STACK_TYPES.ENYO,
                    STACK_METHODS.EDIT,
                    inSender,
                    !this.project.irrigation
                );
                break;
            case "SiteTypeGroupCheckbox":
                if(this.inputFields.buildingSiteType.getActive()) {
                    this.inputFields.buildingSiteType.hasChange = true;
                    this.project.buildingSiteType = inEvent.originator.index;
                    if(this.inputFields.buildingSiteType.oldValue && this.inputFields.buildingSiteType.oldValue !== this.inputFields.buildingSiteType.getActive()) {
                        if(!(this.curentStack && this.curentStack.value === this.inputFields.buildingSiteType.oldValue)) {
                            this.curentStack = STACK_LIST.addStack(
                                this.owner.name,
                                this.owner.name,
                                STACK_TYPES.ENYO,
                                STACK_METHODS.EDIT,
                                this.inputFields.buildingSiteType,
                                this.inputFields.buildingSiteType.oldValue
                            );
                        }
                    }
                }
                break;
            case "AddressInput":
                this.$.GoogleMap.getInformationByAddress(this.inputFields.address.getValue());
                this.inputFields.north.setValue(this.$.GoogleMap.lat);
                this.inputFields.west.setValue(this.$.GoogleMap.lng);
                this.project.address = this.inputFields.address.getValue();
                this.project.north = this.$.GoogleMap.lat;
                this.project.west = this.$.GoogleMap.lng;
                break;
            case "NorthInput":
                this.$.GoogleMap.getInformationByLocation(this.inputFields.north.getValue(), this.inputFields.west.getValue());
                this.inputFields.address.setValue(this.$.GoogleMap.address);
                this.project.address = this.$.GoogleMap.address;
                this.project.north = this.inputFields.north.getValue();
                this.project.west = this.inputFields.west.getValue();
                break;
            case "WestInput":
                this.$.GoogleMap.getInformationByLocation(this.inputFields.north.getValue(), this.inputFields.west.getValue());
                this.inputFields.address.setValue(this.$.GoogleMap.address);
                this.project.address = this.$.GoogleMap.address;
                this.project.north = this.inputFields.north.getValue();
                this.project.west = this.inputFields.west.getValue();
                break;
            case "AltitudeInput":
                break;
        }
        // Check mark
        this.checkMark();
    },
    // Check mark for information
    checkMark: function() {
        var case1 = this.checkMarkProject();
        var case2 = this.checkMarkLocation();
        if(case1 && case2) {
            return true;
        } else {
            return false;
        }
    },
    checkMarkProject: function() {
        var percent = 0;
        var name = this.inputFields.name.getValue();
        var notes = this.inputFields.notes.getValue();
        var hvacSystem = this.inputFields.controlTypes.hvacSystem.getChecked();
        var lighting = this.inputFields.controlTypes.lighting.getChecked();
        var irrigation = this.inputFields.controlTypes.irrigation.getChecked();
        var buildingSiteType = this.inputFields.buildingSiteType.getActive();

        if(!!name && !!notes && !!buildingSiteType && (!!hvacSystem || !!irrigation || !!lighting)) {
            if(!this.$.ProjectName.hasClass("check")) {
                // Hack to add breadcrumb percentage
                // percent = PROGRESS['SETUP'];
                // percent+=25;
                // Signals.send("onProgress", {page: APP_PROGRESS.PR_SETUP, key: 'SETUP', value: percent});

                this.breadcrumbHack('SETUP', APP_PROGRESS.PR_SETUP, 25);
                this.breadcrumbHack('SETUP_SITE_INFO', APP_PROGRESS.PR_SETUP_SITE_INFO, 25);
                // END HACK

                this.$.ProjectName.addClass("check");
            }
            return true;
        } else {
            if(this.$.ProjectName.hasClass("check")) {
                // Hack to add breadcrumb percentage
                // percent = PROGRESS['SETUP'];
                // percent-=25;
                // Signals.send("onProgress", {page: APP_PROGRESS.PR_SETUP, key: 'SETUP', value: percent});

                this.breadcrumbHack('SETUP', APP_PROGRESS.PR_SETUP, -25);
                this.breadcrumbHack('SETUP_SITE_INFO', APP_PROGRESS.PR_SETUP_INFO, -25);
                // END HACK

                this.$.ProjectName.removeClass("check");
            }
            return false;
        }
    },
    checkMarkLocation: function() {
        var percent = 0;
        var address = this.inputFields.address.getValue();
        var north = this.inputFields.north.getValue();
        var west = this.inputFields.west.getValue();
        var altitude = this.inputFields.altitude.getValue();

        if(!!address && !!north && !!west && !!altitude) {
            if(!this.$.LocationName.hasClass("check")) {
                // Hack to add breadcrumb percentage
                // percent = PROGRESS['SETUP'];
                // percent+=25;
                // Signals.send("onProgress", {page: APP_PROGRESS.PR_SETUP, key: 'SETUP', value: percent});

                this.breadcrumbHack('SETUP', APP_PROGRESS.PR_SETUP, 25);
                this.breadcrumbHack('SETUP_SITE_INFO', APP_PROGRESS.PR_SETUP_SITE_INFO, 25);
                // END HACK

                this.$.LocationName.addClass("check");
            }
            return true;
        } else {
            if(this.$.LocationName.hasClass("check")) {
                // Hack to add breadcrumb percentage
                // percent = PROGRESS['SETUP'];
                // percent-=25;
                // Signals.send("onProgress", {page: APP_PROGRESS.PR_SETUP, key: 'SETUP', value: percent});

                this.breadcrumbHack('SETUP', APP_PROGRESS.PR_SETUP, -25);
                this.breadcrumbHack('SETUP_SITE_INFO', APP_PROGRESS.PR_SETUP_SITE_INFO, -25);
                // END HACK

                this.$.LocationName.removeClass("check");
            }
            return false;
        }
    },
    // Save old
    onSaveFocus: function(inSender) {
        var value = inSender.getValue();
        if(typeof value === 'string') {
            value = value.trim();
        }
        inSender.valueFocus = value;
        inSender.isFocus = true;
    },
    // Save in progress
    onSaveKeyDown: function(inSender, inEvent) {
        if(inEvent.keyCode === 13) {
            var currentValue = inSender.getValue();
            if(typeof currentValue === 'string') {
                currentValue = currentValue.trim();
            }
            if(inSender.isFocus && inSender.valueFocus != currentValue) {
                STACK_LIST.addStack(
                    this.owner.name,
                    this.owner.name,
                    STACK_TYPES.ENYO,
                    STACK_METHODS.EDIT,
                    inSender,
                    inSender.valueFocus
                );

                inSender.valueFocus = currentValue;
            }
        }
    },
    // Save to stack
    onSaveChange: function(inSender) {
        if(inSender.isFocus) {
            STACK_LIST.addStack(
                this.owner.name,
                this.owner.name,
                STACK_TYPES.ENYO,
                STACK_METHODS.EDIT,
                inSender,
                inSender.valueFocus
            );

            inSender.isFocus = false;
        }
    },
    undo: function(stack) {
        this.checkMark();
    }
});

},{'../../../components/googlemap.js':'src/components/googlemap','../../../common/services/label.js':'src/common/services/label','../../../common/services/stack.js':'src/common/services/stack'}],'src/components/sidebar':[function (module,exports,global,require,request){
// SideBarItem

var kind = require('enyo/kind');

var FittableRows = require('layout/FittableRows');
var Drawer = require('onyx/Drawer');
var Scroller = require('enyo/Scroller');
var Image = require('enyo/Image');

var utils = require('../common/services/utils.js');

var SideBarItem = kind({
    name: 'SideBarItem',
    tag: 'li',
    handlers: {
        onmouseover: 'pressed',
        onmouseout: 'released'
    },
    published: {
        image: '',
        title: '',
        width: undefined,
        height: undefined,
        scale: 1
    },
    style: 'position:relative',
    create: function() {
        this.inherited(arguments);
        this.createComponents([
            {
                name: 'Image',
                kind: Image,
                src: this.image,
                style: (this.width != undefined ? ('width:' + this.width * this.scale + 'px;') : '') + (this.height != undefined ? ('height:' + this.height * this.scale + 'px;') : '')
            },
            {name: 'MainContent', classes: 'name', content: this.title}
        ]);
    },
    pressed: function() {
        this.addClass('selected');
    },
    released: function() {
        this.removeClass('selected');
    }
});
exports.SideBarItem = SideBarItem;

// SideBar
var SideBar = kind({
    name: 'SideBar',
    kind: FittableRows,
    classes: 'side-bar',
    published: {
        contentComponents: '',
        touch: true
    },
    events: {
        onSideBarItemSelect: '',
        onSideBarDragFinish: '',
        onSideBarOnDrag: '',
        onSideBarDragStart: ''
    },
    items: undefined,
    currentSelect: -1,
    oldSelect: -1,
    heightParent: 0,
    heightTitle: 0,
    heightContent: 0,
    scrollTop: 0,
    create: function() {
        this.inherited(arguments);

        // Create main scroller
        this.createComponent({
            name: 'scroller',
            kind: Scroller,
            classes: 'enyo-fit',
            touch: this.touch,
            horizontal: 'hidden',
            onScroll: 'handlerScroll'
        });

        // Create children
        this.items = new Array();
        for(var i = 0; i < this.contentComponents.length; i++) {
            // Create a new component
            var node = this.$.scroller.createComponent([
                {
                    name: 'SlideBarItem_' + i, index: i, classes: 'slidebar-item',
                    components: [
                        {
                            name: 'SlideBarItem_' + i + '_Name',
                            index: i,
                            tag: 'div',
                            classes: 'slidebar-name',
                            ontap: 'handleShowTap',
                            content: this.contentComponents[i][0]
                        },
                        {
                            name: 'SlideBarItem_' + i + '_Drawer',
                            index: i,
                            kind: Drawer,
                            open: false,
                            animated: true,
                            components: [
                                {
                                    name: 'SlideBarItem_' + i + '_Content',
                                    index: i,
                                    tag: 'ul',
                                    //kind: Scroller,
                                    //touch: false,
                                    //horizontal: 'hidden',
                                    classes: 'slidebar-content',
                                    components: this.contentComponents[i][1]
                                }
                            ]
                        }
                    ]
                }
            ], {owner: this});

            this.items.push({id: i, node: node});
        }
        this.$.scroller.createComponent({
            name: 'ScrollerUpDown',
            classes: 'scroller-up-down'
        }, {owner: this});

        this.$.scroller.render();
    },
    rendered: function() {
        this.inherited(arguments);

        if(this.items.length > 0) {
            this.selectItem(0);
        }
        this.resizeHeightContent();
    },
    handleResize: function() {
        this.inherited(arguments);
        this.resizeHeightContent();
    },
    resizeHeightContent: function() {
        if(this.items.length == 0) return;
        this.heightParent = utils.getCSSProperty(this, 'offsetHeight', false);
        this.heightTitle = utils.getCSSProperty(this.$['SlideBarItem_0_Name'], 'offsetHeight', false);
        this.heightContent = this.heightParent - this.heightTitle * this.items.length;
        for(var i = 0; i < this.items.length; i++) {
            this.$['SlideBarItem_' + i + '_Content'].applyStyle('height', this.heightContent + 'px');
        }
        // Update Current Height
        if(this.currentSelect > -1) {
            var currentHeight = utils.getCSSProperty(this.$['SlideBarItem_' + this.currentSelect + '_Content'], 'offsetHeight', false);
            if(this.heightContent < currentHeight && this.heightContent < 400) {
                currentHeight = 400;
                this.$['SlideBarItem_' + this.currentSelect + '_Content'].applyStyle('height', currentHeight + 'px');
            } else {
                //this.$['SlideBarItem_' + this.currentSelect + '_Content'].applyStyle('height', this.heightContent + 'px');
            }
            // Add Scroll
            if((currentHeight + this.heightTitle * this.items.length) > this.heightParent) {
                this.$.ScrollerUpDown.setShowing(true);
                this.$.ScrollerUpDown.applyStyle('top', (this.heightParent + this.scrollTop - 50) + 'px');
            } else {
                this.$.ScrollerUpDown.setShowing(false);
            }
        }
    },
    selectItem: function(index) {
        // Remove
        if(this.currentSelect > -1) {
            this.$['SlideBarItem_' + this.currentSelect + '_Name'].removeClass('selected');
            this.$['SlideBarItem_' + this.currentSelect + '_Drawer'].setOpen(false);
            this.oldSelect = this.currentSelect;
        }
        // Select Item
        this.$['SlideBarItem_' + index + '_Name'].addClass('selected');
        this.$['SlideBarItem_' + index + '_Drawer'].setOpen(true);
        this.currentSelect = index;
    },
    handleShowTap: function(inSender, inEvent) {
        if(inSender.hasClass('slidebar-name') && this.currentSelect != inSender.index) {
            this.selectItem(inSender.index);
        } else {
            this.disableItem(inSender.index);
        }
    },
    disableItem: function(index) {
        this.$['SlideBarItem_' + index + '_Name'].removeClass('selected');
        this.$['SlideBarItem_' + index + '_Drawer'].setOpen(false);
        this.oldSelect = index;
        this.currentSelect = -1;
    },
    handleItemTap: function(inSender, inEvent) {
        this.doSideBarItemSelect(inSender);
    },
    handleItemDragFinish: function(inSender, inEvent) {
        inSender.type = 'onSideBarDragFinish';
        this.doSideBarDragFinish(inSender);
    },
    handleItemOnDrag: function(inSender, inEvent) {
        inSender.type = 'onSideBarOnDrag';
        this.doSideBarOnDrag(inSender);
    },
    handleItemDragStart: function(inSender, inEvent) {
        inSender.type = 'onSideBarDragStart';
        this.doSideBarDragStart(inSender);
    },
    handlerScroll: function(inSender, inEvent) {
        this.scrollTop = inSender.scrollTop;
        if(this.$.ScrollerUpDown.showing) {
            this.$.ScrollerUpDown.applyStyle('top', (this.heightParent + this.scrollTop - 50) + 'px');
        }
    }
});
exports.SideBar = SideBar;

},{'../common/services/utils.js':'src/common/services/utils'}],'src/views/progress/system/sidebar':[function (module,exports,global,require,request){
//

var kind = require('enyo/kind');

var Drawer = require('onyx/Drawer'),
    FittableRows = require('layout/FittableRows'),
    Image = require('enyo/Image'),
    Scroller = require('enyo/Scroller'),
    Signals = require('enyo/Signals');

var utils = require('../../../common/services/utils.js');

var SideBarItem = kind({
    name: "pl.st.SideBarItem",
    tag: "li",
    handlers: {
        onmousedown: "onMouseDown",
        ondragstart: "onDragStart"
    },
    published: {
        image: "",
        title: "",
        objKind: "",
        width: undefined,
        height: undefined
    },
    create: function() {
        this.inherited(arguments);
        this.createComponents([
            {
                classes: "image",
                components: [
                    {
                        classes: "content",
                        style: (this.width != undefined ? ("width:" + this.width + "px;") : "") + (this.height != undefined ? ("height:" + this.height + "px;") : ""),
                        components: [
                            {
                                name: "Image",
                                kind: Image,
                                src: this.image,
                                style: (this.width != undefined ? ("width:" + this.width + "px;") : "") + (this.height != undefined ? ("height:" + this.height + "px;") : "")
                            },
                            {name: "Badge", classes: "badge", showing: false, content: "0"}
                        ]
                    }
                ]
            },
            {
                name: "MainContent", classes: "name",
                components: [
                    {name: "Text", tag: "span", content: this.title}
                ]
            },
            {kind: Signals, onBadge: "onBadge"},
            {kind: Signals, onSystemSearch: "onSystemSearch"},
            {kind: Signals, onMouseUp: "onMouseUp"}
        ]);
    },
    onBadge: function(inSender, inEvent) {
        if(inEvent.kind == this.objKind && inEvent.value != undefined) {
            if(inEvent.value == 0) {
                this.$.Badge.hide();
            } else {
                this.$.Badge.setContent(inEvent.value);
                this.$.Badge.show();
            }
        }
    },
    onSystemSearch: function(inSender, inEvent) {
        var value = inEvent.value;
        if(typeof value === "string" && value !== "") {
            var a = this.title.toUpperCase();
            var b = value.toUpperCase();
            if(a.indexOf(b) == 0) {
                if(!this.hasClass("highlight")) this.addClass("highlight");
            } else {
                if(this.hasClass("highlight")) this.removeClass("highlight");
            }
        } else {
            if(this.hasClass("highlight")) this.removeClass("highlight");
        }
    },
    onMouseDown: function() {
        this.bubble('onEquipmentTap', {equipment: this.equipment});
        if(!this.hasClass('selected')) this.addClass("selected");
    },
    onMouseUp: function() {
        if(this.hasClass('selected')) this.removeClass("selected");
    },
    onDragStart: function() {
        //if(this.hasClass('highlight')) this.removeClass("highlight");
    }
});
exports.SideBarItem = SideBarItem;

var SideBar = kind({
    name: "pl.st.SideBar",
    kind: FittableRows,
    classes: "side-bar",
    published: {
        contentComponents: "",
        touch: false
    },
    events: {
        onSideBarItemSelect: "",
        onSideBarDragFinish: "",
        onSideBarOnDrag: "",
        onSideBarDragStart: ""
    },
    selected: -1,
    heightParent: 0,
    heightTitle: 0,
    heightContent: 0,
    create: function() {
        this.inherited(arguments);
        // Create children
        for(var i = 0; i < this.contentComponents.length; i++) {
            // Create a new component
            this.createComponent({
                name: "SlideBarItem#" + i, index: i, classes: "slidebar-item", components: [
                    {
                        name: "SlideBarItemName#" + i,
                        index: i,
                        classes: "slidebar-name",
                        ontap: "handleShowTap",
                        content: this.contentComponents[i][0]
                    },
                    {
                        name: "SlideBarItemDrawer#" + i,
                        index: i,
                        kind: Drawer,
                        open: false,
                        animated: true,
                        components: [
                            {
                                name: "SlideBarItemContent#" + i,
                                index: i,
                                tag: "ul",
                                kind: Scroller,
                                touch: false,
                                horizontal: "hidden",
                                classes: "slidebar-content",
                                components: this.contentComponents[i][1]
                            }
                        ]
                    }
                ]
            }, {owner: this});
        }
    },
    rendered: function() {
        this.inherited(arguments);

        if(this.children.length > 0) {
            this.selectItem(0);
        }
        this.resizeHeightContent();
    },
    handleResize: function() {
        this.inherited(arguments);
        this.resizeHeightContent();
    },
    resizeHeightContent: function() {
        if(this.children.length == 0) {
            return;
        }
        this.heightParent = utils.getCSSProperty(this, "offsetHeight", false);
        this.heightTitle = utils.getCSSProperty(this.$["SlideBarItemName#0"], "offsetHeight", false);
        this.heightContent = this.heightParent - this.heightTitle * this.children.length;
        for(var i = 0; i < this.children.length; i++) {
            this.$["SlideBarItemContent#" + i].applyStyle("height", this.heightContent + "px");
        }
        // Update Current Height
        if(this.selected > -1) {
            var currentHeight = utils.getCSSProperty(this.$["SlideBarItemContent#" + this.selected], "offsetHeight", false);
            if(this.heightContent < currentHeight && this.heightContent < 400) {
                currentHeight = 400;
                this.$["SlideBarItemContent#" + this.selected].applyStyle("height", currentHeight + "px");
            } else {
                this.$["SlideBarItemContent#" + this.selected].applyStyle("height", this.heightContent + "px");
            }
        }
    },
    selectItem: function(index) {
        // Remove
        if(this.selected > -1) {
            this.$["SlideBarItemName#" + this.selected].removeClass("selected");
            this.$["SlideBarItemDrawer#" + this.selected].setOpen(false);
        }
        // Select Item
        this.$["SlideBarItemName#" + index].addClass("selected");
        this.$["SlideBarItemDrawer#" + index].setOpen(true);
        this.selected = index;
    },
    handleShowTap: function(inSender, inEvent) {
        if(inSender.hasClass("slidebar-name") && this.selected != inSender.index) {
            this.selectItem(inSender.index);
        } else {
            this.disableItem(inSender.index);
        }
    },
    disableItem: function(index) {
        this.$["SlideBarItemName#" + index].removeClass("selected");
        this.$["SlideBarItemDrawer#" + index].setOpen(false);
        this.selected = -1;
    },
    handleItemTap: function(inSender) {
        this.doSideBarItemSelect(inSender);
    },
    handleItemDragFinish: function(inSender) {
        this.doSideBarDragFinish(inSender);
    },
    handleItemOnDrag: function(inSender) {
        this.doSideBarOnDrag(inSender);
    },
    handleItemDragStart: function(inSender) {
        this.doSideBarDragStart(inSender);
    }
});
exports.SideBar = SideBar;

},{'../../../common/services/utils.js':'src/common/services/utils'}],'src/views/progress/interface/sidebar':[function (module,exports,global,require,request){
// SideBarItem
var kind = require('enyo/kind');

var FittableLayout = require('layout/FittableLayout'),
    FittableRows = require('layout/FittableRows'),
    Drawer = require('onyx/Drawer'),
    Scroller = require('enyo/Scroller'),
    Image = require('enyo/Image');

var utils = require('../../../common/services/utils.js');

var SideBarItem = kind({
    name: "pl.it.SideBarItem",
    tag: "li",
    handlers: {
        onmouseover: "pressed",
        onmouseout: "released"
    },
    published: {
        image: "",
        title: "",
        width: undefined,
        height: undefined
    },
    create: function() {
        this.inherited(arguments);
        this.createComponents([
            {
                name: "Image",
                kind: Image,
                src: this.image,
                style: (this.width != undefined ? ("width:" + this.width + "px;") : "") + (this.height != undefined ? ("height:" + this.height + "px;") : "")
            },
            {name: "MainContent", content: this.title}
        ]);
    },
    pressed: function() {
        this.addClass("selected");
    },
    released: function() {
        this.removeClass("selected");
    }
});
exports.SideBarItem = SideBarItem;

// SideBar
var SideBar = kind({
    name: "pl.it.SideBar",
    kind: FittableRows,
    classes: "side-bar",
    published: {
        contentComponents: "",
        touch: false
    },
    events: {
        onSideBarItemSelect: "",
        onSideBarDragFinish: "",
        onSideBarOnDrag: "",
        onSideBarDragStart: ""
    },
    items: undefined,
    selected: -1,
    heightParent: 0,
    heightTitle: 0,
    heightContent: 0,
    create: function() {
        this.inherited(arguments);
        // Create children
        for(var i = 0; i < this.contentComponents.length; i++) {
            // Create a new component
            this.createComponent(
                {
                    name: "Item#" + i, index: i, classes: "slidebar-item",
                    components: [
                        {
                            name: "Item#" + i + "#Name",
                            index: i,
                            classes: "slidebar-name",
                            ontap: "handleShowTap",
                            content: this.contentComponents[i][0]
                        },
                        {
                            name: "Item#" + i + "#Drawer",
                            index: i,
                            kind: Drawer,
                            open: false,
                            animated: true,
                            components: [
                                {
                                    name: "Item#" + i + "#Content",
                                    index: i,
                                    tag: "ul",
                                    kind: Scroller,
                                    touch: false,
                                    horizontal: "hidden",
                                    classes: "slidebar-content",
                                    components: this.contentComponents[i][1]
                                }
                            ]
                        }
                    ]
                }, {owner: this});
        }
        this.render();
    },
    rendered: function() {
        this.inherited(arguments);

        if(this.children.length > 0) {
            this.selectItem(0);
        }
        this.resizeHeightContent();
    },
    handleResize: function() {
        this.inherited(arguments);
        this.resizeHeightContent();
    },
    resizeHeightContent: function() {
        if(this.children.length == 0) {
            return;
        }
        this.heightParent = utils.getCSSProperty(this, "offsetHeight", false);
        this.heightTitle = utils.getCSSProperty(this.$["Item#0#Name"], "offsetHeight", false);
        this.heightContent = this.heightParent - this.heightTitle * this.children.length;
        for(var i = 0; i < this.children.length; i++) {
            this.$["Item#" + i + "#Content"].applyStyle("height", this.heightContent + "px");
        }
        // Update Current Height
        if(this.selected > -1) {
            var currentHeight = utils.getCSSProperty(this.$["Item#" + this.selected + "#Content"], "offsetHeight", false);
            if(this.heightContent < currentHeight && this.heightContent < 400) {
                currentHeight = 400;
                this.$["Item#" + this.selected + "#Content"].applyStyle("height", currentHeight + "px");
            } else {
                this.$["Item#" + this.selected + "#Content"].applyStyle("height", this.heightContent + "px");
            }
        }
    },
    selectItem: function(index) {
        // Remove
        if(this.selected > -1) {
            this.$["Item#" + this.selected + "#Name"].removeClass("selected");
            this.$["Item#" + this.selected + "#Drawer"].setOpen(false);
        }
        // Select Item
        this.$["Item#" + index + "#Name"].addClass("selected");
        this.$["Item#" + index + "#Drawer"].setOpen(true);
        this.selected = index;
    },
    handleShowTap: function(inSender, inEvent) {
        if(inSender.hasClass("slidebar-name") && this.selected != inSender.index) {
            this.selectItem(inSender.index);
        } else {
            this.disableItem(inSender.index);
        }
    },
    disableItem: function(index) {
        this.$["Item#" + index + "#Name"].removeClass("selected");
        this.$["Item#" + index + "#Drawer"].setOpen(false);
        this.selected = -1;
    },
    handleItemTap: function(inSender, inEvent) {
        this.doSideBarItemSelect(inSender);
    },
    handleItemDragFinish: function(inSender, inEvent) {
        inSender.type = "onSideBarDragFinish";
        this.doSideBarDragFinish(inSender);
    },
    handleItemOnDrag: function(inSender, inEvent) {
        inSender.type = "onSideBarOnDrag";
        this.doSideBarOnDrag(inSender);
    },
    handleItemDragStart: function(inSender, inEvent) {
        inSender.type = "onSideBarDragStart";
        this.doSideBarDragStart(inSender);
    }
});
exports.SideBar = SideBar;

},{'../../../common/services/utils.js':'src/common/services/utils'}],'src/views/progress/wiring/folderbar':[function (module,exports,global,require,request){
//

var kind = require('enyo/kind');

var FittableRows = require('layout/FittableRows'),
    FittableColumns = require('layout/FittableColumns'),
    Signals = require('enyo/Signals'),
    Image = require('enyo/Image'),
    Scroller = require('enyo/Scroller'),
    Drawer = require('onyx/Drawer');

var utils = require('../../../common/services/utils.js');

var STACK_LIST = require('../../../common/services/stack.js').STACK_LIST;
var STACK_TYPES = require('../../../common/services/stack.js').STACK_TYPES;
var STACK_METHODS = require('../../../common/services/stack.js').STACK_METHODS;

var FolderBarItem = kind({
    name: "pl.wr.FolderBarItem",
    tag: "li",
    kind: FittableColumns,
    handlers: {
        onmouseover: "pressed",
        onmouseout: "released"
    },
    published: {
        content: "",
        url: "",
        quantity: 0,
        isCheck: false
    },
    components: [
        {kind: Signals, onWiringFolderBarItem: "onWiringFolderBarItem"}
    ],
    create: function() {
        this.inherited(arguments);
        this.createComponents([
            {name: "Icon", classes: "icon", components: [{kind: Image, src: this.url}]},
            {name: "Content", classes: "content", content: this.content, allowHtml: true},
            {name: "Number", classes: "number" + (!this.isCheck ? "" : " checked"), content: this.quantity}
        ]);
    },
    pressed: function() {
        this.addClass("selected");
    },
    released: function() {
        this.removeClass("selected");
    },
    check: function(check) {
        if(check) {
            if(!this.$.Number.hasClass("checked")) {
                this.$.Number.addClass("checked");
            }
        } else {
            if(this.$.Number.hasClass("checked")) {
                this.$.Number.removeClass("checked");
            }
        }

        this.isCheck = check;
    },
    getContent: function() {
        return this.$.Content.getContent();
    },
    onWiringFolderBarItem: function(inSender, inEvent) {
        if(this === inEvent.sender) {
            this.check(inEvent.check);
        }
    }
});
exports.FolderBarItem = FolderBarItem;

var FolderBar = kind({
    name: "pl.wr.FolderBar",
    kind: FittableRows,
    classes: "wiring-menu-bar",
    events: {
        onTap: "",
        onDrag: ""
    },
    loadData: function(data) {
        this.destroyClientControls();

        for(var i = 0; i < data.count; i++) {
            var childComponents = new Array();
            var floor = data.item(i);
            var zones = floor.zones;
            var count = 0;
            for(var j = 0; j < zones.count; j++) {
                var zone = zones.item(j);
                var sensors = zone.sensors;

                //var idList = [];
                //for(var s = 0; s < sensors.count; s++) {
                //    var sensor = sensors.item(s);
                //
                //    // Check duplicate for sensor
                //    if(idList.indexOf(sensor.sensorId) === -1) {
                //        var quantity = 0;
                //        for(var s2 = 0; s2 < sensors.count; s2++) {
                //            if(sensors.item(s2).sensorId === sensor.sensorId) {
                //                quantity++;
                //            }
                //        }
                //        idList.push(sensor.sensorId);
                //
                //        // Add Child
                //        var name = zone.name + ' ' + sensor.name;
                //        name = name.substr(0, 15);
                //        childComponents.push({
                //            name: "Folder_" + floor.id + "_Item_" + zone.id + "_" + sensor.id,
                //            kind: "pl.wr.FolderBarItem",
                //            content: name,
                //            url: sensor.url,
                //            isCheck: false,
                //            floorId: floor.id,
                //            zoneId: zone.id,
                //            sensorId: sensor.sensorId,
                //            sensorKey: sensor.id,
                //            floor: floor,
                //            zone: zone,
                //            sensor: sensor,
                //            quantity: quantity,
                //            classes: (count++ % 2 == 0 ? "even" : "odd"),
                //            ontap: "itemTap",
                //            ondragstart: "itemDrag",
                //            ondrag: "itemDrag",
                //            ondragfinish: "itemDrag"
                //        });
                //    }
                //}
                for(var s = 0; s < sensors.count; s++) {
                    var sensor = sensors.item(s);

                    // Add Child
                    childComponents.push({
                        name: "Folder_" + floor.id + "_Item_" + zone.id + "_" + sensor.id,
                        kind: FolderBarItem,
                        content: '<span class="zone-name">' + zone.name + '</span> <span class="sensor-name">' + sensor.name+ '</span>',
                        url: sensor.url,
                        isCheck: false,
                        floorId: floor.id,
                        zoneId: zone.id,
                        sensorId: sensor.sensorId,
                        sensorKey: sensor.id,
                        floor: floor,
                        zone: zone,
                        sensor: sensor,
                        quantity: sensor.type,
                        classes: (count++ % 2 == 0 ? "even" : "odd"),
                        ontap: "itemTap",
                        ondragstart: "itemDrag",
                        ondrag: "itemDrag",
                        ondragfinish: "itemDrag"
                    });
                }
            }

            this.createComponent({
                name: "Folder_" + floor.id,
                floorId: floor.id,
                style: "overflow: hidden;",
                components: [
                    {
                        name: "Folder_" + floor.id + "_Title",
                        floorId: floor.id,
                        classes: "title",
                        content: floor.name,
                        ontap: "folderTap"
                    },
                    {
                        name: "Folder_" + floor.id + "_Drawer",
                        kind: Drawer,
                        open: false,
                        animated: true,
                        floorId: floor.id,
                        components: [
                            {
                                name: "Folder_" + floor.id + "_Content",
                                kind: Scroller,
                                tag: "ul",
                                floorId: floor.id,
                                components: childComponents
                            }
                        ]
                    }
                ]
            });

            this.currentFolderId = floor.id;
        }
        this.render();
        this.showFolder(this.currentFolderId);
        this.resizeHeightContent();
    },
    handleResize: function() {
        this.inherited(arguments);
        this.resizeHeightContent();
    },
    showFolder: function(floorId) {
        if(floorId != -1 && this.currentFolderId != -1) {
            this.currentFolderId = floorId;
            this.$["Folder_" + this.currentFolderId + "_Title"].addClass("selected");
            this.$["Folder_" + this.currentFolderId + "_Drawer"].setOpen(true);
        } else {
            this.$["Folder_" + this.currentFolderId + "_Title"].removeClass("selected");
            this.$["Folder_" + this.currentFolderId + "_Drawer"].setOpen(false);
            this.currentFolderId = -1;
        }
    },
    resizeHeightContent: function() {
        if(this.currentFolderId > -1) {
            this.heightTitle = utils.getCSSProperty(this.$["Folder_" + this.currentFolderId + "_Title"], "offsetHeight", false);
            this.heightContent = utils.getCSSProperty(this, "offsetHeight", false) - this.heightTitle * this.children.length;
            this.$["Folder_" + this.currentFolderId + "_Content"].applyStyle("height", this.heightContent + "px");
        }
    },
    folderTap: function(inSender) {
        // Add stack list
        STACK_LIST.addStack(
            this.owner.name,
            this.owner.name,
            STACK_TYPES.ENYO,
            STACK_METHODS.DEFAULT,
            undefined,
            {
                currentFolderId: this.currentFolderId,
                oldFolderId: inSender.floorId
            },
            this,
            'folderTapCallBack'
        );
        if(this.currentFolderId != inSender.floorId) {
            // Remove
            if(this.$["Folder_" + this.currentFolderId]) {
                this.$["Folder_" + this.currentFolderId + "_Title"].removeClass("selected");
                this.$["Folder_" + this.currentFolderId + "_Drawer"].setOpen(false);
            }
            // Add
            this.$["Folder_" + inSender.floorId + "_Title"].addClass("selected");
            this.$["Folder_" + inSender.floorId + "_Content"].applyStyle("height", this.heightContent + "px");
            this.$["Folder_" + inSender.floorId + "_Drawer"].setOpen(true);
            this.currentFolderId = inSender.floorId;
        } else {
            this.showFolder(-1);
        }
    },
    folderTapCallBack: function(value) {
        if(this.$["Folder_" + value.oldFolderId]) {
            this.$["Folder_" + value.oldFolderId + "_Title"].removeClass("selected");
            this.$["Folder_" + value.oldFolderId + "_Drawer"].setOpen(false);
        }
        if(this.$["Folder_" + value.currentFolderId]) {
            this.$["Folder_" + value.currentFolderId + "_Title"].addClass("selected");
            this.$["Folder_" + value.currentFolderId + "_Content"].applyStyle("height", this.heightContent + "px");
            this.$["Folder_" + value.currentFolderId + "_Drawer"].setOpen(true);
        }
        this.currentFolderId = value.currentFolderId;
    },
    itemTap: function(inSender, inEvent) {
        inEvent.sender = inSender;
        this.doTap(inEvent);
    },
    itemDrag: function(inSender, inEvent) {
        if(!inSender.isCheck && inSender.quantity > 0) {
            inEvent.sender = inSender;
            this.doDrag(inEvent);
        }
    }
});
exports.FolderBar = FolderBar;

},{'../../../common/services/utils.js':'src/common/services/utils','../../../common/services/stack.js':'src/common/services/stack'}],'src/views/progress/wiring/device-list-setup':[function (module,exports,global,require,request){
//

var kind = require('enyo/kind');

var Panels = require('layout/Panels'),
    FittableRows = require('layout/FittableRows'),
    FittableColumns = require('layout/FittableColumns'),
    FittableRowsLayout = require('layout/FittableLayout').Rows,
    Button = require('onyx/Button'),
    Drawer = require('onyx/Drawer'),
    IconButton = require('onyx/IconButton'),
    Scroller = require('enyo/Scroller'),
    Signals = require('enyo/Signals'),
    plWrInput = require('./input.js');

var wiringGraphic = require('./graphic.js');

var utils = require("../../../common/services/utils.js");

var STACK_LIST = require('../../../common/services/stack.js').STACK_LIST;
var STACK_TYPES = require('../../../common/services/stack.js').STACK_TYPES;
var STACK_METHODS = require('../../../common/services/stack.js').STACK_METHODS;

var DeviceList = kind({
    name: "pl.wr.DeviceList",
    kind: Scroller,
    layoutKind: FittableRowsLayout,
    touch: false,
    horizontal: "hidden",
    classes: "enyo-fit",
    published: {
        componentContents: ""
    },
    events: {
        onDrop: ""
    },
    create: function() {
        this.inherited(arguments);
        this.createComponents(this.componentContents);
    }
});
exports.DeviceList = DeviceList;

var DeviceListItem = kind({
    name: "pl.wr.DeviceListItem",
    classes: "list-item",
    kind: FittableColumns,
    published: {
        color: "",
        content: "",
        position: 0,
        quantity: 1,
        images: ['assets/images/temps/wiring/a.png', 'assets/images/temps/wiring/b.png', 'assets/images/temps/wiring/plus.png', 'assets/images/temps/wiring/dash.png']
    },
    components: [
        {name: "Container", kind: FittableRows, classes: 'column-1'},
        {name: "Content", kind: FittableColumns, fit: true, allowHtml: true, classes: "column-2", content: "unused"}
        //{kind: Signals, onWiringDeviceListItem: "onWiringDeviceListItem"}
    ],
    create: function() {
        this.inherited(arguments);

        if(!this.image) this.addClass('list-item-disable');

        var childComponents = [];
        for(var i = 0; i < WIRING_SETTING.SENSOR_LIMIT; i++) {
            // NOTE: This height should be common in all uses of these connector
            // number/image pairs. At least one other use of this can be found
            // over in commission/submenu.js
            var height = 30 * this.quantity;
            childComponents.push({
                name: "Item_" + i,
                kind: FittableColumns,
                showing: (i === 0),
                classes: 'number-image-container',
                components: [
                    {name: "Item_" + i + "_Number", classes: "number", content: this.position + 1},
                    {name: "Item_" + i + "_Image", classes: "image", style: "height: " + height + "px;background-image:url('" + this.images[i % 4] + "');"}
                ]
            });
        }
        
        this.$.Container.createComponent({kind: FittableRows, components: childComponents}, {owner: this});
    },
    rendered: function() {
        this.inherited(arguments);
        this.setContentLineHeight();
    },
    //onWiringDeviceListItem: function(inSender, inEvent) {
    //    // Check position in panel
    //    if(utils.isInside(this)) {
    //        this.bubble("onAddSensorToSensorList", {
    //            controllerId: inEvent.controllerId,
    //            adaptorId: inEvent.adaptorId,
    //            sensorId: inEvent.sensorId,
    //            zone: inEvent.zone,
    //            sensor: inEvent.sensor,
    //            position: this.position,
    //            quantity: inEvent.quantity,
    //            sender: inEvent.sender
    //        });
    //    }
    //},
    setContentLineHeight: function() {
        this.$.Content.applyStyle("line-height", (30 * this.quantity) + "px");
        for(var i = 0; i < WIRING_SETTING.SENSOR_LIMIT; i++) {
            this.removeClass('quantity-' + (i + 1));
        }
        this.addClass('quantity-' + this.quantity);
    },
    setComponentContents: function(content, color, quantity) {
        if(this.hasClass("list-item-disable")) {
            this.removeClass("list-item-disable");
        }

        if(quantity <= 1) {
            quantity = 1;
        } else if(quantity > WIRING_SETTING.SENSOR_LIMIT) {
            quantity = WIRING_SETTING.SENSOR_LIMIT;
        }
        for(var i = 0; i < quantity; i++) {
//            this.$["Item_" + i + "_Image"].applyStyle("background-image", "url('" + this.images[i % 4] + "');");
            this.$["Item_" + i].setShowing(true);
        }

        for(var i = quantity; i < WIRING_SETTING.SENSOR_LIMIT; i++) {
            this.$["Item_" + i].setShowing(false);
        }

        this.content = content;
        this.color = color;
        this.quantity = quantity;

        this.$.Content.setContent(content);
        this.applyStyle("background-color", utils.getRgbaString(color, SITE_SETTING.transparency));
        this.render();
        
        //debugger;
        // Hack to make the images apear using jquery (gross)
    },
    setDescription: function(sensorId, color, zone, sensor, quantity) {
        this.sensorId = sensorId;
        this.zone = zone;
        this.sensor = sensor;
        var content = '<span class="zone-name">' + zone.name + '</span> <span class="sensor-name">' + sensor.name+ '</span>';

        this.setComponentContents(content, color, quantity);
    },
    setNumber: function(startPosition) {
        for(var i = 0; i < this.quantity; i++) {
            this.$["Item_" + i + "_Number"].setContent(startPosition + i);
        }
    },
    unused: function() {
        this.quantity = 1;

        this.$["Item_" + 0 + "_Image"].applyStyle("background-image", "");
        this.$["Item_" + 0].setShowing(true);

        for(var i = this.quantity; i < WIRING_SETTING.SENSOR_LIMIT; i++) {
            this.$["Item_" + i + "_Image"].applyStyle("background-image", "");
            this.$["Item_" + i].setShowing(false);
        }

        if(!this.hasClass("list-item-disable")) {
            this.addClass('list-item-disable');
        }

        this.$.Content.setContent("unused");
        this.applyStyle("background-color", "");
        this.render();

        delete this.sensorId;
        delete this.sensor;
        delete this.zone;
    },
    getUsed: function() {
        if(this.sensorId > 0) {
            return true;
        }
        return false;
    }
});
exports.DeviceListItem = DeviceListItem;

// Wiring
var DeviceListSetup = kind({
    name: "pl.wr.DeviceListSetup",
    kind: FittableRows,
    fit: true,
    events: {
        onDrop: ""
    },
    components: [
        {classes: "heading-title", content: "DEVICE LIST SETUP"},
        {
            kind: FittableColumns, fit: true,
            components: [
                {
                    classes: "setup-menu", kind: FittableRows,
                    components: [
                        {name: "DeviceList", kind: FittableRows, fit: true, classes: "border-left"},
                        {
                            kind: FittableColumns, classes: "footer box-shadow",
                            components: [
                                {
                                    kind: Button,
                                    content: "RESCAN",
                                    attributes: {title: ""},
                                    classes: "bt bt-footer-default"
                                },
                                {fit: true},
                                {
                                    kind: IconButton,
                                    attributes: {title: ""},
                                    classes: "bt bt-add",
                                    ontap: "newAdaptor"
                                }
                            ]
                        }
                    ]
                },
                {
                    fit: true, kind: FittableRows, classes: "setup-submenu box-shadow",
                    components: [
                        {
                            name: "ListItemPanel",
                            kind: Panels,
                            fit: true,
                            draggable: false,
                            narrowFit: false,
                            classes: "border-left"
                        },
                        {classes: "footer box-shadow"}
                    ]
                }
            ]
        },
        {kind: Signals, onWiringSelectItem: "onWiringSelectItem"},
        {kind: Signals, onWiringDeviceListItem: "onWiringDeviceListItem"}
    ],
   breadcrumbHack: function(key, page, percentToAdd) {
        // Hack to add breadcrumb percentage
        var percent = PROGRESS[key];

        percent += percentToAdd;

        if(PROGRESS[key] < 100) {
            Signals.send("onProgress", {page: page, key: key, value: percent});
        } else {
            PROGRESS[key] = 100;
        }
    },
    constructor: function() {
        this.inherited(arguments);
        this.flag = false;
        this.currentDevice = -1;
        this.oldDevice = -1;
    },
    create: function() {
        this.inherited(arguments);
    },
    handleResize: function() {
        this.inherited(arguments);
    },
    loadData: function(data) {
        // Default
        this.flag = false;
        this.currentDevice = -1;
        this.oldDevice = -1;

        // Destroy component if existing
        this.$.DeviceList.destroyClientControls();
        this.$.ListItemPanel.destroyClientControls();

        var panelIndex = 0;
        for(var i = 0; i < data.length; i++) {
            var controllerId = data[i].id;
            var childComponents = new Array();
            for(var j = 0; j < data[i].adaptors.length; j++) {
                var adaptorId = data[i].adaptors[j].id;

                // Create List
                this.$.ListItemPanel.createComponent({
                    name: "ListItem_" + controllerId + "_" + adaptorId,
                    index: panelIndex,
                    kind: FittableRows,
                    clases: "enyo-fit"
                }, {owner: this});

                // Init List Item
                var listItem = new Array();
                for(var position = 0; position < WIRING_SETTING.SENSOR_LIST_MAXIMUM; position++) {
                    listItem[position] = {
                        kind: DeviceListItem,
                        controllerId: controllerId,
                        adaptorId: adaptorId,
                        position: position,
                        parentName: "ListItem_" + controllerId + "_" + adaptorId
                    };
                }
                // Init Children
                childComponents.push({
                    name: "DeviceItem_" + controllerId + "_" + adaptorId,
                    kind: plWrInput,
                    controllerId: controllerId,
                    adaptorId: adaptorId,
                    classes: (j % 2 == 0 ? "even" : "odd"),
                    title: data[i].adaptors[j].title,
                    panelIndex: panelIndex,
                    panelName: "ListItem_" + controllerId + "_" + adaptorId,
                    componentContents: listItem,
                    ontap: "itemTap"
                });
                panelIndex++;
            }
            // Create Device List
            this.$.DeviceList.createComponent({
                name: "Device_" + controllerId, classes: "item", controllerId: controllerId,
                components: [
                    {
                        name: "DeviceTitle_" + controllerId,
                        content: data[i].name,
                        classes: "item-name",
                        controllerId: controllerId,
                        ontap: "deviceTap"
                    },
                    {
                        name: "Device_" + controllerId + "_Content",
                        kind: Drawer,
                        tag: "ul",
                        open: false,
                        animated: true,
                        controllerId: controllerId,
                        components: childComponents
                    }
                ]
            }, {owner: this});
        }

        this.render();

        // Default
        this.showDevice(1);
        this.itemTap(this.$["DeviceItem_1_2"]);
    },
    // Select device by controllerId
    showDevice: function(controllerId) {
        if((controllerId == -1 && this.currentDevice != -1) || (controllerId != -1 && this.currentDevice != -1 && controllerId != this.currentDevice)) {
            this.$["Device_" + this.currentDevice].removeClass("selected");
            this.$["Device_" + this.currentDevice + "_Content"].setOpen(false);
            this.oldDevice = -1;
        }
        if(controllerId != -1 && controllerId != this.currentDevice) {
            this.oldDevice = this.currentDevice;
            this.currentDevice = controllerId;
            this.$["Device_" + this.currentDevice].addClass("selected");
            this.$["Device_" + this.currentDevice + "_Content"].setOpen(true);
        }
        //else if(this.currentDevice != -1) {
        //    // Off list
        //    this.oldDevice = this.currentDevice;
        //    this.$["Device_" + this.currentDevice].removeClass("selected");
        //    this.$["Device_" + this.currentDevice + "_Content"].setOpen(false);
        //    this.currentDevice = -1;
        //    // Off item
        //    this.oldItem = -1;
        //    if(!!this.currentItem) {
        //        this.currentItem.removeClass("active");
        //    }
        //}
        // Select controller
        wiringGraphic.selectItem(controllerId);
    },
    deviceTap: function(inSender) {
        if(inSender.hasClass("item-name")) {
            // Add stack list
            if(this.currentDevice != inSender.controllerId) {
                STACK_LIST.addStack(
                    this.owner.name,
                    this.owner.name,
                    STACK_TYPES.ENYO,
                    STACK_METHODS.DEFAULT,
                    undefined,
                    this.currentDevice,
                    this,
                    'showDevice'
                );
            }
            // Select device
            this.showDevice(inSender.controllerId);
        }
    },
    itemTap: function(inSender, inEvent) {
        // If isn't existing
        if(!inSender) {
            return;
        }
        // Remove Class
        if(this.$["DeviceItem_" + this.oldDevice + "_" + this.oldItem] != undefined &&
            this.$["DeviceItem_" + this.oldDevice + "_" + this.oldItem].hasClass("active")
        ) {
            // Add stack list
            if(inEvent) {
                STACK_LIST.addStack(
                    this.owner.name,
                    this.owner.name,
                    STACK_TYPES.ENYO,
                    STACK_METHODS.DEFAULT,
                    undefined,
                    this.$["DeviceItem_" + this.oldDevice + "_" + this.oldItem],
                    this,
                    'itemTap'
                );
            }
            // Remove active class
            this.$["DeviceItem_" + this.oldDevice + "_" + this.oldItem].removeClass("active");
            this.oldDevice = -1;
            this.oldItem = -1;
        }
        if(this.$["DeviceItem_" + this.currentDevice + "_" + this.oldItem] != undefined &&
            this.$["DeviceItem_" + this.currentDevice + "_" + this.oldItem].hasClass("active") && this.oldItem != inSender.adaptorId
        ) {
            // Add stack list
            if(inEvent) {
                STACK_LIST.addStack(
                    this.owner.name,
                    this.owner.name,
                    STACK_TYPES.ENYO,
                    STACK_METHODS.DEFAULT,
                    undefined,
                    this.$["DeviceItem_" + this.currentDevice + "_" + this.oldItem],
                    this,
                    'itemTap'
                );
            }
            // Remove active class
            this.$["DeviceItem_" + this.currentDevice + "_" + this.oldItem].removeClass("active");
        }
        if(!this.$["DeviceItem_" + this.currentDevice + "_" + inSender.adaptorId].hasClass("active")) {
            this.$["DeviceItem_" + this.currentDevice + "_" + inSender.adaptorId].addClass("active");
            this.oldItem = inSender.adaptorId;
            this.$.ListItemPanel.setIndex(inSender.panelIndex);
            // Set current item
            this.currentItem = this.$["DeviceItem_" + this.currentDevice + "_" + inSender.adaptorId];
            // Create
            if(this.$[inSender.panelName].children.length == 0) {
                this.$[inSender.panelName].createComponent({
                    name: "DeviceList_" + this.currentDevice + "_" + inSender.adaptorId,
                    kind: DeviceList,
                    componentContents: inSender.componentContents
                }, {owner: this});
                this.$[inSender.panelName].render();
            }
        }
        //else {
        //    this.oldItem = inSender.adaptorId;
        //    this.$["DeviceItem_" + this.currentDevice + "_" + inSender.adaptorId].removeClass("active");
        //}
        this.controllerId = this.currentDevice;
        this.adaptorId = inSender.adaptorId;
        // Select adaptor
        wiringGraphic.selectItem(this.controllerId, this.adaptorId);
    },
    onWiringDeviceListItem: function(inSender, inEvent) {
        if(!!this.$["Device_" + this.controllerId + "_Content"]) {
            var node;
            var i = 0;
            if(this.$["Device_" + this.controllerId + "_Content"].kind == "onyx.Drawer") i = 1;
            for(; i < this.$["Device_" + this.controllerId + "_Content"].controls.length; i++) {
                if(utils.isInside(this.$["Device_" + this.controllerId + "_Content"].controls[i])) {
                    node = this.$["Device_" + this.controllerId + "_Content"].controls[i];
                    break;
                }
            }
            if(!!node){ // Check in Menu
                this.bubble("onAddSensorToSensorList", {
                    controllerId: node.controllerId,
                    adaptorId: node.adaptorId,
                    sensorId: inEvent.sensorId,
                    zone: inEvent.zone,
                    sensor: inEvent.sensor,
                    position: WIRING_SETTING.SENSOR_LIST_MAXIMUM - 1, // Min 0 - Max 49
                    quantity: inEvent.quantity,
                    sender: inEvent.sender
                });
            } else { // Check in Panel List
                var deviceList = this.$["DeviceList_" + inEvent.controllerId + "_" + inEvent.adaptorId];
                if(!!deviceList) {
                    for(var i = 1; i < deviceList.controls.length; i++) { // Pass scroller control
                        if(utils.isInside(deviceList.controls[i])) {  // Check pl.wr.DeviceListItem position in panel
                            node = deviceList.controls[i];
                            break;
                        }
                    }
                    if(!!node) {
                        this.bubble("onAddSensorToSensorList", {
                            controllerId: inEvent.controllerId,
                            adaptorId: inEvent.adaptorId,
                            sensorId: inEvent.sensorId,
                            zone: inEvent.zone,
                            sensor: inEvent.sensor,
                            position: node.position,
                            quantity: inEvent.quantity,
                            sender: inEvent.sender
                        });
                    }
                }
            }
        }
    },
    // Save store
    saveDeviceList: function(controllerId, adaptorId, list) {
        var sensors = [];
        for(var i = 0; i < list.length; i++) {
            if(list[i].item.getUsed()) {
                sensors.push({
                    id: list[i].sensorId,
                    color: list[i].color,
                    content: list[i].content,
                    zone: list[i].zone,
                    sensor: list[i].sensor
                });
            }
        }

        // Delete duplicate
        //for(var i = 0; i < sensors.length - 1; i++) {
        //    var count = 1;
        //    for(var j = i + 1; j < sensors.length; j++) {
        //        if(sensors[j].id == sensors[i].id) {
        //            count++;
        //            sensors.splice(j, 1);
        //            j--;
        //        }
        //    }
        //    sensors[i].total = count;
        //}

        // Update
        DEVICE_LIST[controllerId].adaptors[adaptorId].sensors = sensors;

        var total_sensor_count = plSensorList.count;
	// NOTE: If the wired sensor count is needed, use "sensors.length"
        var percent_complete = 100 / total_sensor_count;

        this.breadcrumbHack('WIRING', APP_PROGRESS.PR_WIRING, Math.ceil(percent_complete / 2));
        this.breadcrumbHack('WIRING_DEVICE_WIRING', APP_PROGRESS.PR_WIRING_DEVICE_WIRING, percent_complete);
    },
    undoDeviceItem: function(stack) {
        var controllerId = stack.value.controllerId,
            adaptorId = stack.value.adaptorId,
            floorId = stack.value.floorId,
            zoneId = stack.value.zoneId,
            sensorId = stack.value.sensorId,
            sender = stack.value.sender,
            list = stack.value.list;
        for(var i = 0; i < list.length; i++) {
            if(list[i].used) {
                list[i].item.setDescription(list[i].sensorId, list[i].color, list[i].zone, list[i].sensor, list[i].quantity);
            } else {
                list[i].item.unused();
            }
            // Resize
            list[i].item.render();
        }

        // Set number
        var startPosition = 1;
        for(var i = 0; i < list.length; i++) {
            // Check Maximum
            if(startPosition > WIRING_SETTING.SENSOR_LIST_MAXIMUM) {
                list[i].item.setShowing(false);
            } else if(!list[i].item.getShowing()) {
                list[i].item.setShowing(true);
                list[i].item.render();
            }
            // Reset start number
            list[i].item.setNumber(startPosition);
            startPosition += list[i].item.quantity;
        }
        //*** End

        wiringGraphic.removeSensorByOption({
            controllerId: controllerId,
            adaptorId: adaptorId,
            floorId: floorId,
            zoneId: zoneId,
            sensorId: sensorId,
            sender: sender
        });

        // Save store
        this.saveDeviceList(controllerId, adaptorId, list);
    },
    newAdaptor: function() {

    },
    // Transmission
    onWiringSelectItem: function(inSender, inEvent) {
        if(inEvent.controllerId != undefined && inEvent.adaptorId != undefined) {// Select adaptor
            this.itemTap(this.$["DeviceItem_" + inEvent.controllerId + "_" + inEvent.adaptorId], inEvent.isStack);
        } else if(inEvent.controllerId != undefined) {// Select controller

        }
    },
    // Public
    pAddSensorToDeviceList: function(data) {
        // Add Sensor To SensorList
        var controllerId = data.controllerId,
            adaptorId = data.adaptorId,
            floorId = data.sensor.floorId,
            zoneId = data.sensor.zoneId,
            sensorId = data.sensor.sensorId,
            pos = data.position,
            quantity = data.quantity,
            color = data.zone.color,
            sensor = data.sensor,
            zone = data.zone,
            sender = data.sender;

        function move(items, pos, data) {
            var next = items[pos + 1];
            if(!!next) {
                if(!next.getUsed()) {
                    next.setDescription(data.sensorId, data.color, data.zone, data.sensor, data.quantity);
                    return next;
                } else {
                    move(items, pos + 1, {
                        sensorId: next.sensorId,
                        color: next.color,
                        quantity: next.quantity,
                        zone: next.zone,
                        sensor: next.sensor
                    });
                    next.setDescription(data.sensorId, data.color, data.zone, data.sensor, data.quantity);
                }
            }
        }

        function getPos(items) {
            for(var pos = 0; pos < items.length; pos++) {
                if(!items[pos].getUsed()) {
                    return pos;
                }
            }
            return false;
        }

        if(!!this.$["ListItem_" + controllerId + "_" + adaptorId]) {
            var deviceList = this.$["DeviceList_" + controllerId + "_" + adaptorId];

            // Check panel list existing
            if(!deviceList) {
                //this.$["DeviceItem_" + controllerId + "_" + adaptorId].triggerHandler('ontap');

                // Create if not existing
                var inSender = this.$["DeviceItem_" + controllerId + "_" + adaptorId];
                if(this.$[inSender.panelName].children.length == 0) {
                    this.$[inSender.panelName].createComponent({
                        name: "DeviceList_" + this.currentDevice + "_" + inSender.adaptorId,
                        kind: DeviceList,
                        componentContents: inSender.componentContents
                    }, {owner: this});
                    this.$[inSender.panelName].render();
                }

                deviceList = this.$["DeviceList_" + controllerId + "_" + adaptorId];
            }

            //--- Add List Item
            var items = [];
            //if(IS_TOUCH) {
            //    for(var i = 1; i < deviceList.controls.length; i++) {
            //        items.push(deviceList.controls[i]);
            //    }
            //} else {
            //    if(deviceList.getTouch() === true) {
            //        items = deviceList.children[0].children[2].children;
            //    } else {
            //        items = deviceList.children[0].children;
            //    }
            //}

            for(var i = 1; i < deviceList.controls.length; i++) {
                items.push(deviceList.controls[i]);
            }
            //--- End

            //--- List backup
            var list = [];
            for(var i = 0; i < items.length; i++) {
                list.push({
                    item: items[i],
                    used: items[i].getUsed(),
                    sensorId: items[i].sensorId,
                    color: items[i].color,
                    content: items[i].content,
                    quantity: items[i].quantity,
                    zone: items[i].zone,
                    sensor: items[i].sensor
                });
            }
            //--- End backup

            //*** Run change
            var current = items[pos];
            if(!current.getUsed()) {
                pos = getPos(items);
                if(pos !== false) {
                    current = items[pos];
                    current.setDescription(sensorId, color, zone, sensor, quantity);
                }
            } else {
                move(items, current.position, {
                    sensorId: current.sensorId,
                    quantity: current.quantity,
                    color: current.color,
                    zone: current.zone,
                    sensor: current.sensor
                });
                current.setDescription(sensorId, color, zone, sensor, quantity);
            }

            // Set number
            var startPosition = 1;
            for(var i = 0; i < items.length; i++) {
                // Check Maximum
                if(startPosition > WIRING_SETTING.SENSOR_LIST_MAXIMUM) {
                    items[i].setShowing(false);
                } else if(!items[i].getShowing()) {
                    items[i].setShowing(true);
                }
                // Reset start number
                items[i].setNumber(startPosition);
                startPosition += items[i].quantity;
            }
            //*** End run change

            // Add stack list
            STACK_LIST.addStack(
                this.owner.name,
                this.owner.name,
                STACK_TYPES.ENYO,
                STACK_METHODS.CALLBACK,
                items,
                {
                    controllerId: controllerId,
                    adaptorId: adaptorId,
                    floorId: floorId,
                    zoneId: zoneId,
                    sensorId: sensorId,
                    sender: sender,
                    list: list
                },
                this,
                'undoDeviceItem'
            );

            // List new to save
            var list = [];
            for(var i = 0; i < items.length; i++) {
                list.push({
                    item: items[i],
                    used: items[i].getUsed(),
                    sensorId: items[i].sensorId,
                    color: items[i].color,
                    content: items[i].content,
                    zone: items[i].zone,
                    sensor: items[i].sensor
                });
            }

            // Save store
            this.saveDeviceList(controllerId, adaptorId, list);
        }
    }
});
exports.DeviceListSetup = DeviceListSetup;

},{'./input.js':'src/views/progress/wiring/input','./graphic.js':'src/views/progress/wiring/graphic','../../../common/services/utils.js':'src/common/services/utils','../../../common/services/stack.js':'src/common/services/stack'}],'src/views/progress/setup/input':[function (module,exports,global,require,request){
//

var kind = require('enyo/kind');

var Button = require('onyx/Button'),
    FittableColumns = require('layout/FittableColumns'),
    Input = require('onyx/Input');

var utils = require('../../../common/services/utils.js');

module.exports = kind({
    name: "pl.su.Input",
    kind: FittableColumns,
    published: {
        index: 0,
        value: "",
        oldValue: "",
        type: "accurate" // estimate or accurate
    },
    events: {
        onRemove: "",
        onType: "",
        onInput: "",
        onFocus: "",
        onAddStack: ""
    },
    handlers: {
        onmouseover: "onHandle",
        onmouseout: "onHandle",
        onmousemove: "onHandle",
        onmousedown: "onHandle"
    },
    popup: -1,
    validate: false,
    create: function() {
        this.inherited(arguments);
        this.createComponents([
            {name: "CloseButton", classes: "remove", ontap: "doRemove"},
            {
                name: "FloorName",
                classes: "level-title",
                allowHtml: true,
                content: "<span class='line'></span><span class='text'>LEVEL #" + this.index + "</span>"
            },
            {
                name: "FloorInputWrap",
                classes: "level-input",
                components: [
                    {
                        style: "display: inline-flex; position: relative;",
                        components: [
                            {
                                name: "FloorInput",
                                kind: Input,
                                placeholder: "unknown",
                                classes: "level-input",
                                oninput: "valueChanged",
                                onfocus: "onSaveFocus",
                                onkeydown: "onSaveKeyDown",
                                onchange: "onSaveChange"
                            },
                            {name: "FloorCheck", showing: false, classes: "bg-check"},
                            {
                                name: "FloorGroupButton",
                                kind: FittableColumns,
                                classes: "button-style-wrap",
                                showing: false,
                                components: [
                                    {
                                        name: "ButtonEstimate",
                                        kind: Button,
                                        classes: "bt bt-estimate",
                                        content: "Estimate",
                                        ontap: "typeChanged"
                                    },
                                    {
                                        name: "ButtonAccurate",
                                        kind: Button,
                                        classes: "bt bt-accurate",
                                        content: "Accurate",
                                        ontap: "typeChanged"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {name: "FloorUnit", classes: "txt-name", content: "SQFT"}
        ], {owner: this});
        if(this.value != undefined && this.value != 0) {
            this.$.FloorInput.setValue(this.value);
        }
    },
    rendered: function() {
        this.inherited(arguments);
        this.$.FloorInput.addClass(this.type);
        this.$.FloorCheck.addClass(this.type);
        // Content
        this.items = [
            "FloorName",
            "FloorInput",
            "FloorCheck",
            "FloorGroupButton",
            "ButtonEstimate",
            "ButtonAccurate",
            "FloorGroupButton",
            "FloorGroupButton",
            "ButtonAccurate",
            "FloorGroupButton",
            "FloorUnit",
            "CloseButton"
        ];
        this.items.push(this.name);
        // Check validation
        this.validation();
    },
    // Check Input Validation
    validation: function() {
        if(utils.isNumber(this.$.FloorInput.getValue())) {
            this.validate = true;
        } else {
            this.validate = false;
        }
        this.$.FloorCheck.setShowing(this.validate);
    },
    // Input Changed
    valueChanged: function(inSender) {
        this.oldValue = this.value;
        this.value = inSender.getValue();
        // Check validation
        this.validation();
        this.$.FloorGroupButton.setShowing(this.validate);
        // Return Event
        this.doInput(inSender);
    },
    // Type change
    typeChanged: function(inSender) {
        if(inSender.name == "ButtonEstimate" && this.type != "estimate") {
            this.setType("estimate");
            this.doType();
        } else if(inSender.name == "ButtonAccurate" && this.type != "accurate") {
            this.setType("accurate");
            this.doType();
        }
        // Off Popup
        this.$.FloorGroupButton.setShowing(false);
    },
    // On Popup
    popupOn: function() {
        if(this.validate) this.$.FloorGroupButton.setShowing(true);
    },
    // Off Popup
    popupOff: function() {
        this.$.FloorGroupButton.setShowing(false);
    },
    onHandle: function(inSender, inEvent) {
        switch(inEvent.type) {
            case "mousemove":
                this.popup = this.items.indexOf(inEvent.originator.name);
                break;
        }
    },
    setIndex: function(index) {
        this.index = index;
        this.$.FloorName.setContent("<span class='line'></span><span class='text'>LEVEL #" + this.index + "</span>");
    },
    setValue: function(value) {
        this.onUpdate(value);
    },
    setType: function(type) {
        var oldType = "estimate";
        if(type == "accurate") {
            oldType = "estimate";
        } else {
            oldType = "accurate";
        }
        // Input
        if(this.$.FloorInput.hasClass(oldType)) {
            this.$.FloorInput.removeClass(oldType);
        }
        if(!this.$.FloorInput.hasClass(type)) {
            this.$.FloorInput.addClass(type);
        }
        // Background
        if(this.$.FloorCheck.hasClass(oldType)) {
            this.$.FloorCheck.removeClass(oldType);
        }
        if(!this.$.FloorCheck.hasClass(type)) {
            this.$.FloorCheck.addClass(type);
        }
        this.type = type;
    },
    reverseType: function(type) {
        if(type == "accurate") {
            type = "estimate";
        } else {
            type = "accurate";
        }
        this.setType(type);
    },
    onUpdate: function(value) {
        this.oldValue = this.value;
        this.value = value;
        this.$.FloorInput.setValue(value);
        this.validation();
    },
    // Save old
    onSaveFocus: function(inSender) {
        var value = inSender.getValue();
        if(typeof value === 'string') {
            value = value.trim();
        }
        inSender.valueFocus = value;
        inSender.isFocus = true;

        this.doFocus(this);
    },
    // Save in progress
    onSaveKeyDown: function(inSender, inEvent) {
        if(inEvent.keyCode === 13) {
            var currentValue = inSender.getValue();
            if(typeof currentValue === 'string') {
                currentValue = currentValue.trim();
            }
            if(inSender.isFocus && inSender.valueFocus != currentValue) {
                inEvent.sender = inSender;
                inEvent.valueFocus = inSender.valueFocus;
                inSender.valueFocus = currentValue;
                this.doAddStack(inEvent);
            }
        }
    },
    // Save to stack
    onSaveChange: function(inSender, inEvent) {
        if(inSender.isFocus) {
            inEvent.sender = inSender;
            inEvent.valueFocus = inSender.valueFocus;
            this.doAddStack(inEvent);
            inSender.isFocus = false;
        }
    },
    // TriggerHandler
    removeInput: function() {
        this.$.CloseButton.triggerHandler('ontap');
    }
});

},{'../../../common/services/utils.js':'src/common/services/utils'}],'src/views/progress/system/template':[function (module,exports,global,require,request){
//

var kind = require('enyo/kind');

var Drawer = require('onyx/Drawer'),
    FittableRows = require('layout/FittableRows'),
    Scroller = require('enyo/Scroller'),
    plStSideBarItem = require('./sidebar').SideBarItem;

module.exports = kind({
    name: "pl.st.Template",
    kind: FittableRows,
    classes: "side-bar template",
    published: {
        touch: false
    },
    events: {
        onSideBarItemSelect: "",
        onSideBarDragFinish: "",
        onSideBarOnDrag: "",
        onSideBarDragStart: ""
    },
    selected: -1,
    heightParent: 0,
    heightTitle: 0,
    heightContent: 0,
    create: function() {
        this.inherited(arguments);
        this.build();
    },
    rendered: function() {
        this.inherited(arguments);
        if(this.children.length > 0) {
            this.selectItem(0);
        }
        this.resizeHeightContent();
    },
    build: function() {
        // Destroy
        this.destroyClientControls();

        // Create children
        var childComponent = [];
        for(var i = 0; i < plComponentList.count; i++) {
            var equipment = plComponentList.item(i);
            childComponent.push({
                kind: plStSideBarItem,
                title: equipment.name,
                value: equipment.kind,
                objKind: equipment.kind,
                image: equipment.svg,
                width: equipment.width,
                height: equipment.height,
                equipment: equipment,
                ontap: "handleItemTap",
                ondragfinish: "handleItemDragFinish",
                ondrag: "handleItemOnDrag",
                ondragstart: "handleItemDragStart"
            });
        }

        // Create a new component
        var i = 0;
        this.createComponent({
            name: "Item_" + i, index: i, classes: "slidebar-item", components: [
                {
                    name: "Item_" + i + "_Name",
                    index: i,
                    classes: "slidebar-name",
                    ontap: "handleShowTap",
                    content: "EQUIPMENT"
                },
                {
                    name: "Item_" + i + "_Drawer",
                    index: i,
                    kind: Drawer,
                    open: false,
                    animated: true,
                    components: [
                        {
                            name: "Item_" + i + "_Content",
                            index: i,
                            tag: "ul",
                            kind: Scroller,
                            touch: false,
                            horizontal: "hidden",
                            classes: "slidebar-content",
                            components: childComponent
                        }
                    ]
                }
            ]
        }, {owner: this});
    },
    handleResize: function() {
        this.inherited(arguments);
        this.resizeHeightContent();
    },
    resizeHeightContent: function() {
        if(this.children.length == 0) {
            return;
        }

        this.heightParent = utils.getCSSProperty(this, "offsetHeight", false);
        this.heightTitle = utils.getCSSProperty(this.$["Item_0_Name"], "offsetHeight", false);
        this.heightContent = this.heightParent - this.heightTitle * this.children.length;
        for(var i = 0; i < this.children.length; i++) {
            this.$["Item_" + i + "_Content"].applyStyle("height", this.heightContent + "px");
        }
        // Update Current Height
        if(this.selected > -1) {
            var currentHeight = utils.getCSSProperty(this.$["Item_" + this.selected + "_Content"], "offsetHeight", false);
            if(this.heightContent < currentHeight && this.heightContent < 400) {
                currentHeight = 400;
                this.$["Item_" + this.selected + "_Content"].applyStyle("height", currentHeight + "px");
            } else {
                this.$["Item_" + this.selected + "_Content"].applyStyle("height", this.heightContent + "px");
            }
        }

    },
    selectItem: function(index) {
        // Remove
        if(this.selected > -1) {
            this.$["Item_" + this.selected + "_Name"].removeClass("selected");
            this.$["Item_" + this.selected + "_Drawer"].setOpen(false);

        }
        // Select Item
        this.$["Item_" + index + "_Name"].addClass("selected");
        this.$["Item_" + index + "_Drawer"].setOpen(true);
        this.selected = index;
    },
    disableItem: function(index) {
        this.$["Item_" + index + "_Name"].removeClass("selected");
        this.$["Item_" + index + "_Drawer"].setOpen(false);
        this.selected = -1;
    },
    handleShowTap: function(inSender) {
        if(inSender.hasClass("slidebar-name") && this.selected != inSender.index) {
            this.selectItem(inSender.index);
        } else {
            this.disableItem(inSender.index);
        }
    },
    handleItemTap: function(inSender) {
        this.doSideBarItemSelect(inSender);
    },
    handleItemDragFinish: function(inSender) {
        this.doSideBarDragFinish(inSender);
    },
    handleItemOnDrag: function(inSender) {
        this.doSideBarOnDrag(inSender);
    },
    handleItemDragStart: function(inSender) {
        this.doSideBarDragStart(inSender);
    }
});

},{'./sidebar':'src/views/progress/system/sidebar'}],'src/views/progress/wiring/wiring':[function (module,exports,global,require,request){
// PIPELINE - EQUIPMENT AND WIRING

var kind = require('enyo/kind'),
    Signals = require('enyo/Signals');

var FittableRows = require('layout/FittableRows'),
    FittableColumns = require('layout/FittableColumns'),
    Panels = require('layout/Panels'),
    CollapsingArranger = require('layout/CollapsingArranger');

var Checkbox = require('onyx/Checkbox'),
    Grabber = require('onyx/Grabber'),
    ToggleButton = require('onyx/ToggleButton'),
    Drawer = require('onyx/Drawer'),
    Button = require('onyx/Button'),
    CardArranger = require('layout/CardArranger');

var plWrSubBreadcrumbs = require('./sub-breadcrumbs.js');
var plWrFolderBar = require('./folderbar.js').FolderBar;
var plWrDeviceListSetup = require('./device-list-setup.js').DeviceListSetup;

var utils = require('../../../common/services/utils.js');
var wiringGraphic = require('./graphic.js');

var STACK_LIST = require('../../../common/services/stack.js').STACK_LIST;
var STACK_TYPES = require('../../../common/services/stack.js').STACK_TYPES;
var STACK_METHODS = require('../../../common/services/stack.js').STACK_METHODS;

var wiringPreview = require('./preview.js');

//var plTabBar = require('../../views/progress/wiring/wiring');

module.exports = kind({
    name: "pl.WiringView",
    kind: FittableRows,
    classes: "form-wiring",
    handlers: {
        ontap: "tapHandler",
        onAddSensorToSensorList: "onAddSensorToSensorList"
    },
    components: [
        // SubMenuBar
        { name: "TabBar", kind: FittableRows, classes: "sub-menu-bar", components: [
            { name: "TabBarName", classes: "name", content: "WIRING CONFIGURATION:"},
            //{ name: "TabBarContent", kind: "pl.TabBar", style: "position: absolute;", style: "position: absolute;", classes: "tab-bar", path: ["AUTO-SETUP", "DEVICE WIRING"], onActivate: "tabActivated"},
            { name: "TabBarContent", kind: plWrSubBreadcrumbs, style: "position: absolute;", onActivate: "tabActivated" },
            { name: "TabBarChop", classes: "chop"}
        ]},
        // MainPanels
        { name: "MainPanels", kind: Panels, fit: true, arrangerKind: CollapsingArranger, draggable: false, narrowFit: false, realtimeFit: true, classes: "main-panels", components: [
            { name: "LeftColumn", kind: FittableRows, classes: "widget enyo-fit", components: [
                { name: "FolderBar", kind: plWrFolderBar, fit: true, onDrag: "dragHandler" },
                { classes: "footer"}
            ]},
            { name: "ContentPanels", kind: Panels, arrangerKind: CardArranger, draggable: false, narrowFit: false, classes: "enyo-fit box-shadow", onTransitionStart: 'panelTransitionStart', onTransitionFinish: "panelTransitionFinish", components: [
                { kind: FittableRows, classes: "enyo-fit auto-setup border-left", index: 0, components: [
                    { kind: FittableRows, fit: true, classes: "outer-box content", components: [
                        { classes: "drawer-title", drawer: "DrawerBox1", content: "HARDWARE RECOMMENDATIONS", ontap: "drawerActivated"},
                        { kind: FittableColumns, fit: true, components: [
                            { kind: FittableRows, fit: true, components: [
                                { name: "DrawerBox1", kind: Drawer, open: true, classes: "content inner-box hardware-recommendations", components: [
                                    { tag: "table", components: [
                                        {tag: "tr", classes: "odd", components: [
                                            {tag: "td", content: "HARDWARE"},
                                            {tag: "td", content: "QTY"}
                                        ]},
                                        {tag: "tr", classes: "even", components: [
                                            {tag: "td", kind: FittableColumns, components: [
                                                { kind: Checkbox, classes: "checkbox-style3", checked: true, onchange: ""},
                                                { content: "CONTROLLER"}
                                            ]},
                                            {tag: "td", content: "1"}
                                        ]},
                                        {tag: "tr", classes: "odd", components: [
                                            {tag: "td", kind: FittableColumns, components: [
                                                { kind: Checkbox, classes: "checkbox-style3", checked: true, onchange: ""},
                                                { content: "24 PORT I/O MODULE"}
                                            ]},
                                            {tag: "td", content: "1"}
                                        ]},
                                        {tag: "tr", classes: "even", components: [
                                            {tag: "td", kind: FittableColumns, components: [
                                                { kind: Checkbox, classes: "checkbox-style3", checked: true, onchange: ""},
                                                { content: "12 PORT RELAY MODULE"}
                                            ]},
                                            {tag: "td", content: "2"}
                                        ]}
                                    ]},
                                    { name: 'AutoConfigure', kind: Button, content: "AUTO-CONFIGURE", attributes: {title: "AUTO-CONFIGURE"}, classes: "bt-default", ontap: "buttonTapped"}
                                ]},
                                { classes: "drawer-title", drawer: "DrawerBox2", content: "AUTOMATIC SYSTEM WIRING", ontap: "drawerActivated"},
                                { name: "DrawerBox2", kind: Drawer, open: true, classes: "content inner-box automatic-system", components: [
                                    { name:'AutoWire', kind: Button, content: "AUTOWIRE", attributes: {title: "AUTOWIRE"}, classes: "bt-default", ontap: "buttonTapped"},
                                    { tag: "table", components: [
                                        {tag: "tr", classes: "odd", components: [
                                            {tag: "td", content: "HARDWARE"},
                                            {tag: "td", content: "PORTS USED"},
                                            {tag: "td", content: "PORTS REMAINING"}
                                        ]},
                                        {tag: "tr", classes: "even", components: [
                                            {tag: "td", content: "CONTROLLER"},
                                            {name: "ctrl_1", tag: "td", content: ""},
                                            {name: "ctrl_2", tag: "td", content: ""}
                                        ]},
                                        {tag: "tr", classes: "odd", components: [
                                            {tag: "td", content: "SENSOR MODULE"},
                                            {name: "ctrl_3", tag: "td", allowHtml: true, content: ""},
                                            {name: "ctrl_4", tag: "td", allowHtml: true, content: ""}
                                        ]},
                                        {tag: "tr", classes: "even", components: [
                                            {tag: "td", content: "RELAY MODULE - 24VAC"},
                                            {name: "ctrl_5", tag: "td", allowHtml: true, content: ""},
                                            {name: "ctrl_6", tag: "td", allowHtml: true, content: ""}
                                        ]},
                                        {tag: "tr", classes: "odd", components: [
                                            {tag: "td", content: "RELAY MODULE - 120VAC"},
                                            {name: "ctrl_7", tag: "td", allowHtml: true, content: ""},
                                            {name: "ctrl_8", tag: "td", allowHtml: true, content: ""}
                                        ]}
                                    ]}
                                ]}
                            ]},
                            { name:"PreviewArea", kind: FittableColumns, classes:"system-preview", components:[
                                { classes: "frame", components:[
                                    { classes: "title", content: "SYSTEM PREVIEW"},
                                    { name:'PreviewPanel', kind: Panels, classes: "preview-area enyo-fit", components:[
                                        {name: "PreviewSvg", tag: "svg", classes: "enyo-fit"}
                                    ]}
                                ]}
                            ]}
                        ]}
                    ]},
                    { classes: "footer", kind: FittableColumns, components: [
                        { kind: Grabber, attributes: {title: "Collapsing"}, classes: "bt bt-collapsing", ontap: "toggleFullScreen", ondragstart: "toggleFullScreen", ondragfinish: "toggleFullScreen" }
                    ]}
                ]},
                { name: "NetworkPanel", kind: FittableColumns, fit: true, classes: "device-wiring border-left", index: 1, components: [
                    { kind: FittableRows, fit: true, style: "background:#FFF;", components: [
                        { name: "DrawAreaWrapper", kind: Panels, fit: true, draggable: false, narrowFit: false, style: "background:#FFF", components: [
                            {name: "DrawArea", classes: "enyo-fit", components: [
                                { name: "Svg", tag: "svg", classes: "enyo-fit" },
                                { name: "Input", tag: "input", attributes: {value: "", type: "text"}, classes: "enyo-input onyx-input insert-text", style: "display:none"}
                            ]}
                        ]},
                        { classes: "footer", kind: FittableColumns, components: [
                            { kind: Grabber, attributes: {title: "Collapsing"}, classes: "bt bt-collapsing", ontap: "toggleFullScreen", ondragstart: "toggleFullScreen", ondragfinish: "toggleFullScreen" },
                            { fit: true},
                            { classes: "text", content: "VIEW:"},
                            { kind: ToggleButton, onContent: "Group", offContent: "Group", onChange: "toggleChanged", value: true}
                        ]}
                    ]},
                    { name: "DeviceListSetup", kind: plWrDeviceListSetup, classes: "device-list-setup box-shadow" }
                ]}
            ]}
        ]}
    ],
    breadcrumbHack: function(key, page, percentToAdd) {
        // Hack to add breadcrumb percentage
        var percent = PROGRESS[key];
        percent += percentToAdd;
//        var percent = percentToAdd;

        if(PROGRESS[key] < 100) {
            Signals.send("onProgress", {page: page, key: key, value: percent});
        } else {
            PROGRESS[key] = 100;
        }
    },
    constructor: function() {
        this.inherited(arguments);
        // Set graphic
        wiringGraphic.panel = this;
    },
    create: function() {
        this.inherited(arguments);
    },
    rendered: function() {
        this.inherited(arguments);
        this.fixSubPipeLine();
    },
    init: function() {
        if(this.ready !== true || WIRING_SETTING.RELOAD === true) {
            // Init Default
            this.$.TabBarContent.setActive(0);
            this.$.ContentPanels.setIndex(0);

            // Remove from stack list
            STACK_LIST.removePanel(this.name);

            // Graphic reset
            wiringGraphic.reset();

            // Init data
            var data = [];
            for(var controllerId in DEVICE_LIST) {
                var adaptors = [];
                for(var adaptorId in DEVICE_LIST[controllerId].adaptors) {
                    // Hashcode clear data if existing
                    DEVICE_LIST[controllerId].adaptors[adaptorId].sensors = [];

                    adaptors.push(DEVICE_LIST[controllerId].adaptors[adaptorId])
                }
                data.push({
                    id: DEVICE_LIST[controllerId].id,
                    name: DEVICE_LIST[controllerId].name,
                    adaptors: adaptors
                });
            }

            // Init value for graphic
            wiringGraphic.deviceList = data;

            // Init FolderBar
            this.$.FolderBar.loadData(plProject.floors);

            // Init device list setup
            this.$.DeviceListSetup.loadData(data);

            this.render();

            // Init Preview
            // this.initPreview();
        }

        // Ready
        this.ready = true;

        // Disable render
        WIRING_SETTING.RELOAD = false;

        //if(this.ready !== true) {
        //    // Init data
        //    var me = this;
        //    wiringService.find(PL.baseUrl + "assets/jsons/wiring.json", {}, function(inSender, inResponse) {
        //        me.$.FolderBar.loadData(inResponse);
        //        // Init device list setup
        //        var data = [];
        //        for(var controllerId in DEVICE_LIST) {
        //            var adaptors = [];
        //            for(var adaptorId in DEVICE_LIST[controllerId].adaptors) {
        //                adaptors.push(DEVICE_LIST[controllerId].adaptors[adaptorId])
        //            }
        //            data.push({
        //                id: DEVICE_LIST[controllerId].id,
        //                name: DEVICE_LIST[controllerId].name,
        //                adaptors: adaptors
        //            });
        //        }
        //        me.$.DeviceListSetup.loadData(data);
        //
        //        // Value to draw
        //        wiringGraphic.deviceList = data;
        //
        //        me.ready = true;
        //        me.initPreview();
        //    });
        //}
    },
    setProgress: function(percent){
        Signals.send("onProgress", {page: APP_PROGRESS.PR_WIRING, key: 'WIRING', value: percent});
    },
    handleResize: function() {
        this.inherited(arguments);
        this.fixSubPipeLine();
    },
    resizeComplete: function() {
        this.dimension();
        this.initDrawArea();
    },
    // Dimension
    dimension: function() {
        this.headerHeight = utils.getCSSProperty(this.parent.parent.$.Header, "offsetHeight", false);
        this.tabBarHeight = utils.getCSSProperty(this.$.TabBar, "offsetHeight", false);
        this.leftWidth = utils.getCSSProperty(this.$.LeftColumn, "offsetWidth", false);
        this.contentTop = this.headerHeight + this.tabBarHeight;
    },
    // Calculate area
    initDrawArea: function() {
        var width = utils.getCSSProperty(this.$.DrawAreaWrapper, "offsetWidth", false);
        var height = utils.getCSSProperty(this.$.DrawAreaWrapper, "offsetHeight", false);
        wiringGraphic.setSize(width, height);
    },
    // Draw
    initViewPort: function() {
        if(!!this.ready && !wiringGraphic.g) {
            wiringGraphic.init(this.$.Svg, this.$.Input);
        }
    },
    initPreview: function() {
        if(!!wiringGraphic.g) {
            var width = utils.getCSSProperty(this.$.PreviewSvg, 'offsetWidth');
            var dx = width / 2 - this.previewSize.cx;
            var dy = this.previewSize.y <= 50 ? 0 : (-this.previewSize.y + 50);
            $('#' + this.$.PreviewSvg.getId()).html(wiringGraphic.g.paper.node.innerHTML);
            this.preview = $('#' + this.$.PreviewSvg.getId());
            this.preview.find('filter').remove();
            this.preview.find('*').css('filter', '');
            this.pNodeRoot = this.preview.find('.svg-root');
            this.pNodeRoot.find("g[controllerid!='" + wiringGraphic.currentController.id + "']").remove();
            this.pNodeRoot.find("path[controllerid!='" + wiringGraphic.currentController.id + "']").remove();
            this.pNodeRoot.find("image[controllerid!='" + wiringGraphic.currentController.id + "']").remove();
            this.pNodeRoot[0].setAttribute('transform', 'matrix(1,0,0,1,' + dx + ',' + dy + ')');

            // Set Enable
            if(!!this.autoConfigure) {
                this.pNodeRoot.find('g[controllerid]').css('display', '');
                this.pNodeRoot.find('g[adaptorid]').css('display', '');
                this.pNodeRoot.find('path.svg-path-adaptor[controllerid]').css('display', '');
            } else {
                this.pNodeRoot.find('g[controllerid]').css('display', 'none');
                this.pNodeRoot.find('g[adaptorid]').css('display', 'none');
                this.pNodeRoot.find('path.svg-path-adaptor[adaptorid]').css('display', 'none');
            }

            if(!!this.autoWire) {
                this.pNodeRoot.find('image[sensorid]').css('display', '');
            } else {
                this.pNodeRoot.find('image[sensorid]').css('display', 'none');
            }

            if(!!this.autoConfigure && !!this.autoWire) {
                this.pNodeRoot.find('path.svg-path-sensor[sensorid]').css('display', '');
            } else {
                this.pNodeRoot.find('path.svg-path-sensor[sensorid]').css('display', 'none');
            }
        }
    },
    initAutoSetup: function(type) {
        var width = utils.getCSSProperty(this.$.PreviewPanel, 'offsetWidth');
        var height = utils.getCSSProperty(this.$.PreviewPanel, 'offsetHeight');
        if(type === 1) {
            wiringPreview.init(this.$.PreviewSvg.getId(), width, height, false);
        } else {
            wiringPreview.init(this.$.PreviewSvg.getId(), width, height, true);
        }
    },
    panelTransitionStart: function(inSender, inEvent) {
        if(inEvent.fromIndex == 1 && inEvent.toIndex == 0) {
            this.previewSize = wiringGraphic.g.rootNode.getBBox();
        }
    },
    panelTransitionFinish: function(inSender, inEvent) {
        if(inEvent.originator.name === 'ContentPanels') {
            if(inEvent.fromIndex == 0 && inEvent.toIndex == 1 && this.$.TabBarContent.index == 1) {
                this.initDrawArea();
                this.initViewPort();
            } else if(inEvent.fromIndex == 1 && inEvent.toIndex == 0) {
                this.initPreview();
            }
        }
    },
    tapHandler: function(inSender, inEvent) {
        if(inEvent.originator.name == 'AutoConfigure') {
            this.autoConfigure = true;
            //if(this.pNodeRoot) {
            //    this.pNodeRoot.find('g[controllerid]').css('display', '');
            //    this.pNodeRoot.find('g[adaptorid]').css('display', '');
            //    this.pNodeRoot.find('path.svg-path-adaptor[adaptorid]').css('display', '');
            //    if(!!this.autoWire) {
            //        this.pNodeRoot.find('path.svg-path-sensor[sensorid]').css('display', '');
            //    }
            //}

            this.breadcrumbHack('WIRING', APP_PROGRESS.PR_WIRING, 25);
            this.breadcrumbHack('WIRING_AUTO_SETUP', APP_PROGRESS.PR_WIRING_AUTO_SETUP, 50);

            this.initAutoSetup(1);
        } else if(inEvent.originator.name == 'AutoWire') {
            this.autoWire = true;

            this.$.ctrl_3.content = "<span class='badge red'>17</span>";
            this.$.ctrl_4.content = "<span class='badge blue'>7</span>";
            this.$.ctrl_5.content = "<span class='badge red'>6</span>";
            this.$.ctrl_6.content = "<span class='badge blue'>2</span>";
            this.$.ctrl_7.content = "<span class='badge red'>5</span>";
            this.$.ctrl_8.content = "<span class='badge blue'>2</span>";
            this.render();

            //if(this.pNodeRoot) {
            //    this.pNodeRoot.find('image[sensorid]').css('display', '');
            //    if(!!this.autoConfigure) {
            //        this.pNodeRoot.find('path.svg-path-sensor[sensorid]').css('display', '');
            //    }
            //}

            this.breadcrumbHack('WIRING', APP_PROGRESS.PR_WIRING, 25);
            this.breadcrumbHack('WIRING_AUTO_SETUP', APP_PROGRESS.PR_WIRING_AUTO_SETUP, 50);

            this.initAutoSetup(2);
        }
    },
    fixSubPipeLine: function() {
        var offset = $('#' + this.parent.parent.$.Breadcrumb.$["Item_" + APP_PROGRESS.PR_WIRING].getId()).offset();
        var offsetLeft = offset.left;
        var offsetWidth = utils.getCSSProperty(this.parent.parent.$.Breadcrumb.$["Item_" + APP_PROGRESS.PR_WIRING], "offsetWidth", false);
        var chopWidth = utils.getCSSProperty(this.parent.parent.$.Chop, "offsetWidth", false);
        var contentWidth = utils.getCSSProperty(this.$.TabBarContent, "offsetWidth", false);
        this.parent.parent.$.Chop.applyStyle("left", ((offsetLeft + offsetWidth / 2 + chopWidth / 2 - 8) - 20) + "px");
        this.$.TabBarContent.applyStyle("left", ((offsetLeft + offsetWidth / 2 - contentWidth / 2 + 25) - 20) + "px");
    },
    // Full Screen
    toggleFullScreen: function(inSender, inEvent) {
        switch(inEvent.type) {
            case "tap":
                this.$.MainPanels.setIndex(this.$.MainPanels.index ? 0 : 1);
                break;
            case "dragstart":
                this.$.MainPanels.setDraggable(true);
                break;
            case "dragfinish":
                this.$.MainPanels.setDraggable(false);
                break;
        }
    },
    tabActivated: function(inSender, inEvent) {
        this.$.ContentPanels.setIndex(inEvent.originator.index);
    },
    drawerActivated: function(inSender, inEvent) {
        if(this.$[inSender.drawer].open === true) {
            inSender.addClass("unactive");
        } else if(inSender.hasClass("unactive")) {
            inSender.removeClass("unactive");
        }

        this.$[inSender.drawer].setOpen(!this.$[inSender.drawer].open);
    },
    // Folder Drag
    dragHandler: function(inSender, inEvent) {
        if(inEvent.type == "dragstart") {
            this.itemSender = inEvent.sender;
            this.offset = utils.getOffset(this.itemSender);
            this.offset.x = inEvent.pageX - this.offset.left;
            this.offset.y = inEvent.pageY - this.offset.top;
            var pos = {
                x: inEvent.pageX - this.offset.x,
                y: inEvent.pageY - this.offset.y
            };
            var images = ['assets/images/temps/wiring/a.png', 'assets/images/temps/wiring/b.png', 'assets/images/temps/wiring/plus.png', 'assets/images/temps/wiring/dash.png'];
            var content = '';
            //content += '<div class="drag-item-content quantity-' + this.itemSender.sensor.type + '" style="background-color:' + utils.getRgbaString(this.itemSender.zone.color, SITE_SETTING.transparency) + ';animation-duration:' + WIRING_SETTING.ANIMATION_DURATION + 's">';
            content += '<div class="drag-item-content quantity-' + this.itemSender.sensor.type + '" style="background-color:' + utils.getRgbaString(this.itemSender.zone.color, SITE_SETTING.transparency) + '">';
            content += '    <div class="column-1" style="' + PREFIX.css + 'transition: visibility 0s, opacity ' + WIRING_SETTING.ANIMATION_DURATION + 's ease-out">';
            for(var i = 1; i <= this.itemSender.sensor.type; i++) {
                content += '        <div class="image" style="background-image: url(' + images[i % 4] + ')"></div>';
            }
            content += '    </div>';
            content += '    <div class="column-2"><img src="' + this.itemSender.sensor.url + '"></div>';
            content += '    <div class="column-3" style="' + PREFIX.css + 'transition: opacity ' + WIRING_SETTING.ANIMATION_DURATION + 's ease-in">' + this.itemSender.getContent() + '</div>';
            content += '    <div class="column-4"><span>' + this.itemSender.sensor.type + '</span></div>';
            content += '</div>';
            Signals.send("onDragItem", {
                content: content,
                pos: pos,
                classes: 'wiring-drag-popup'
            });
            Signals.send("onDragItem", {showing: true});

            var height = this.itemSender.sensor.type * 30;
            setTimeout(function() {
                Signals.send("onDragItem", {
                    styles: [
                        {transition: 'height ' + WIRING_SETTING.ANIMATION_DURATION + 's, line-height ' + WIRING_SETTING.ANIMATION_DURATION + 's, ' + PREFIX.css + 'transform ' + WIRING_SETTING.ANIMATION_DURATION + 's ease-in'},
                        {height: (height + 2) + 'px'},
                        {'line-height': height + 'px'}
                    ]
                });
            }, 50);
            setTimeout(function() {
                Signals.send("onDragItem", {classes: 'dragging'});
            }, WIRING_SETTING.ANIMATION_DURATION * 1000 + 50);
        } else if(inEvent.type == "drag") {
            var pos = {
                x: inEvent.pageX - this.offset.x,
                y: inEvent.pageY - this.offset.y
            };
            Signals.send("onDragItem", {pos: pos});
        } else if(inEvent.type == "dragfinish") {
            Signals.send("onDragItem", {content: '', showing: false});

            // Send to panel
            Signals.send('onWiringDeviceListItem', {
                controllerId: this.$.DeviceListSetup.controllerId,
                adaptorId: this.$.DeviceListSetup.adaptorId,
                sensorId: this.itemSender.sensorId,
                zone: this.itemSender.zone,
                sensor: this.itemSender.sensor,
                quantity: this.itemSender.quantity,
                sender: this.itemSender
            });

            // Remove temp
            delete this.itemSender;
        }
    },
    // Insert sensor to current device list
    onAddSensorToSensorList: function(inSender, inEvent) {
        // Add to list
        var data =  {
            controllerId: inEvent.controllerId,
            adaptorId: inEvent.adaptorId,
            sensorId: inEvent.sensorId,
            zone: inEvent.zone,
            sensor: inEvent.sensor,
            position: inEvent.position,
            quantity: inEvent.quantity,
            sender: inEvent.sender
        };

        // Add to device List
        this.$.DeviceListSetup.pAddSensorToDeviceList(data);

        // Add to graphic
        wiringGraphic.createSensorByAdaptor(data, function() {
            //console.log('test');
        });
    },
    undo: function() {
        var stack = STACK_LIST.getStackByParentPanel(this.name);
        if(stack) {
            if(stack.type === STACK_TYPES.SVG) {
                wiringGraphic.undo();
            } else if(stack.type === STACK_TYPES.ENYO) {
                STACK_LIST.undo(this.name);
            }
        }
    }
});

},{'./sub-breadcrumbs.js':'src/views/progress/wiring/sub-breadcrumbs','./folderbar.js':'src/views/progress/wiring/folderbar','./device-list-setup.js':'src/views/progress/wiring/device-list-setup','../../../common/services/utils.js':'src/common/services/utils','./graphic.js':'src/views/progress/wiring/graphic','../../../common/services/stack.js':'src/common/services/stack','./preview.js':'src/views/progress/wiring/preview'}],'src/components/button':[function (module,exports,global,require,request){
// Button Setting

var kind = require('enyo/kind'),
    Group = require('enyo/Group');

var IconButton = require('onyx/IconButton'),
    Tooltip = require('onyx/Tooltip')
    MenuDecorator = require('onyx/MenuDecorator'),
    Input = require('onyx/Input')
    TooltipDecorator = require('onyx/TooltipDecorator')
    Input = require('onyx/Input')
    ContextualPopup = require('onyx/ContextualPopup')
    Checkbox = require('onyx/Checkbox')
;

exports.Setting = kind({
    name: "pl.btn.Setting",
    kind: MenuDecorator,
    classes: "bt",
    style: "display:inline-block;",
    attributes: {title: "Setting"},
    components: [
        {kind: IconButton, classes: "btn btn-setting"},
        {
            kind: ContextualPopup,
            floating: true,
            classes: "setting-tool",
            components: [
                {classes: "title", content: "SETTINGS"},
                {
                    name: "SettingCheckbox",
                    kind: Group,
                    defaultKind: Checkbox,
                    classes: "checkgroup-box",
                    onActivate: "settingHandler",
                    components: [
                        {content: "option 1", value: false, classes: "checkbox-style2", checked: true},
                        {content: "option 2", value: true, classes: "checkbox-style2"}
                    ]
                }
            ]
        }
    ],
    settingHandler: function() {

    }
});

// Button Help
exports.Help = kind({
    name: "pl.btn.Help",
    kind: TooltipDecorator,
    attributes: {title: "Help"},
    components: [
        {kind: IconButton, classes: "btn btn-help"},
        {kind: Tooltip, content: "help"}
    ]
});

// Button Locked
exports.Locked = kind({
    name: "pl.btn.Locked",
    kind: MenuDecorator,
    attributes: {title: "Lock"},
    events: {
        onClick: "",
        onChange: ""
    },
    components: [
        {kind: IconButton, name: "BtLock", classes: "btn btn-lock", ontap: "buttonTap"},
        {
            kind: ContextualPopup,
            title: "UNLOCK TO MAKE CHANGES",
            floating: true,
            classes: "popup-locked",
            components: [
                {kind: Input, type: "password", placeholder: "enter password", onchange: ""}
            ]
        }
    ],
    buttonTap: function(inSender, inEvent) {
        this.doClick(inSender);
    },
    inputChanged: function(inSender, inEvent) {
        this.doChange(inSender);
    }
});

}],'src/views/progress/commission/submenu':[function (module,exports,global,require,request){
//

var kind = require('enyo/kind');

var FittableColumns = require('layout/FittableColumns'),
    FittableRows = require('layout/FittableRows'),
    Icon = require('onyx/Icon'),
    IconButton = require('onyx/IconButton'),
    Image = require('enyo/Image'),
    MenuDecorator = require('onyx/MenuDecorator'),
    ContextualPopup = require('onyx/ContextualPopup');

var utils = require('../../../common/services/utils.js');

var SubMenuItemSetting = kind({
    name: "pl.cm.SubMenuItemSetting",
    kind: MenuDecorator,
    style: "display:inline-block;",
    published: {
        type: "apply",
        info: {
            name: 'DINING TEMP',
            class: 'sensor',
            kind: 'temperature',
            type: '1-wire',
            url: 'assets/images/temps/sensor/t.svg',
            currentValue: '66'
        }
    },
    create: function() {
        this.inherited(arguments);

        var currentValue = '';
        if(this.info.kind === SENSOR_KINDS.TEMPERATURE) {
            currentValue = this.info.currentValue + " <span>°F</span>";
        } else if(this.info.kind === SENSOR_KINDS.HUMIDITY) {
            currentValue = this.info.currentValue + " <span>%</span>";
        }

        this.createComponents([
            {name: "Button", kind: IconButton, classes: "bt"},
            {
                kind: ContextualPopup,
                classes: "popup-commission",
                maxHeight: "500",
                floating: true,
                location: "right",
                components: [
                    {
                        kind: FittableRows, classes: "popup-commission-content",
                        components: [
                            {
                                kind: FittableRows, style: "overflow: hidden;",
                                components: [
                                    {classes: "heading-title", content: "COMMISSIONING"},
                                    {
                                        kind: FittableColumns,
                                        components: [
                                            {
                                                tag: "table", fit: true,
                                                components: [
                                                    {
                                                        tag: "tr", components: [
                                                        {tag: "td", content: "NAME:"},
                                                        {tag: "td", content: this.info.name}
                                                    ]
                                                    },
                                                    {
                                                        tag: "tr", components: [
                                                        {tag: "td", content: "CLASS:"},
                                                        {tag: "td", content: this.info.class}
                                                    ]
                                                    },
                                                    {
                                                        tag: "tr", components: [
                                                        {tag: "td", content: "KIND:"},
                                                        {tag: "td", content: this.info.kind}
                                                    ]
                                                    },
                                                    {
                                                        tag: "tr", components: [
                                                        {tag: "td", content: "TYPE:"},
                                                        {tag: "td", content: this.info.type + '-WIRE'}
                                                    ]
                                                    }
                                                ]
                                            },
                                            {
                                                kind: Image,
                                                src: this.info.url,
                                                style: "width: 110px;float:right"
                                                //src: "assets/images/temps/commission-sensor.png",
                                                //style: "width: 110px;height: 130px;float:right"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                kind: FittableRows,
                                components: [
                                    {
                                        kind: FittableColumns,
                                        components: [
                                            {
                                                kind: FittableRows, components: [
                                                {classes: "heading-title", content: "CURRENT VALUE"},
                                                {classes: "temperature", content: currentValue, allowHtml: true}
                                            ]
                                            },
                                            {
                                                classes: "chart", kind: FittableRows,
                                                components: [
                                                    {content: "RANGE OF EXPECTED VALUES"},
                                                    {
                                                        style: "height:130px;text-align: center;",
                                                        components: [
                                                            {
                                                                kind: Image,
                                                                src: "assets/images/temps/commission-chart.png",
                                                                style: "width: 180px;height: 130px;"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                kind: FittableRows,
                                components: [
                                    {classes: "heading-title", content: "ANALYSIS"},
                                    {classes: "text", content: "SENSOR APPEARS OK"},
                                    {
                                        classes: "button-row", kind: FittableRows,
                                        components: [
                                            {
                                                kind: Icon,
                                                content: "ACCEPT",
                                                attributes: {title: ""},
                                                classes: "bt bt-accept"
                                            },
                                            {
                                                kind: Icon,
                                                content: "REJECT",
                                                attributes: {title: ""},
                                                classes: "bt bt-reject"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ], {owner: this});
    },
    rendered: function() {
        this.inherited(arguments);
        this.$.Button.addClass("bt-commission-" + this.type);
    }
});
exports.SubMenuItemSetting = SubMenuItemSetting;

var SubMenuItem = kind({
    name: "pl.cm.SubMenuItem",
    kind: FittableRows,
    classes: "device-item",
    published: {
        start: 1,
        quantity: 2,
        title: "ENTRY TEMP",
        value: "68°F",
        images: ['assets/images/temps/wiring/a.png', 'assets/images/temps/wiring/b.png', 'assets/images/temps/wiring/plus.png', 'assets/images/temps/wiring/dash.png'],
        setting: "apply",
        color: "#a5b4da",
        height: "30",
        unused: false,
        info: {
            name: 'DINING TEMP',
            class: 'sensor',
            kind: 'temperature',
            type: '1-wire',
            url: 'assets/images/temps/sensor/t.svg'
        }
    },
    create: function() {
        this.inherited(arguments);
        if(!this.unused) {
            var childComponent = [];
            for(var i = 0; i < this.quantity; i++) {
                childComponent.push(
                    {
                        kind: FittableColumns,
                        components: [
                            {classes: "number", style: "height: " + this.height + "px;", content: this.start + i},
                            {classes: "image", style: "height: " + this.height + "px;background-image:url(" + this.images[i % 4] + ");"}
                        ]
                    }
                );
            }
            this.createComponent({
                name: "DeviceList",
                kind: FittableColumns,
                classes: "device-detail quantity-" + this.quantity,
                style: "background-color: " + utils.getRgbaString(this.color, SITE_SETTING.transparency) + ";",
                components: [
                    {
                        kind: FittableRows,
                        classes: "column-1",
                        components: childComponent
                    },
                    {
                        classes: "column-2",
                        content: this.title,
                        allowHtml: true,
                        style: "height: " + this.height * this.quantity + "px;line-height: " + this.height * this.quantity + "px"
                    },
                    {
                        allowHtml: true,
                        classes: "column-3",
                        style: "height: " + this.height * this.quantity + "px",
                        content: "<span>" + this.value + "</span>"
                    },
                    {
                        classes: "column-4",
                        style: "height: " + this.height * this.quantity + "px",
                        components: [
                            {kind: "pl.cm.SubMenuItemSetting", type: this.setting, info: this.info}
                        ]
                    }
                ]
            });
        } else {
            this.createComponent({
                name: "DeviceList", kind: FittableColumns, classes: "device-detail quantity-unused",
                components: [
                    {classes: "number", style: "height: " + this.height + "px;", content: this.start},
                    {classes: "unused", style: "height: " + this.height + "px;", content: "unused"}
                ]
            });
        }
    }
});
exports.SubMenuItem = SubMenuItem;

var SubMenu = kind({
    name: "pl.cm.SubMenu",
    kind: FittableRows,
    published: {
        componentContents: []
    },
    create: function() {
        this.inherited(arguments);
        this.createComponents(this.componentContents, {owner: this});
    }
});
exports.SubMenu = SubMenu;

},{'../../../common/services/utils.js':'src/common/services/utils'}],'src/views/progress/setup/building':[function (module,exports,global,require,request){
//

var kind = require('enyo/kind'),
    bind = require('enyo/utils').bind,
    Signals = require('enyo/Signals'),
    Animator = require('enyo/Animator'),
    Button = require('onyx/Button'),
    Drawer = require('onyx/Drawer'),
    FileInputDecorator = require('enyo-external/FileInputDecorator'),
    FittableColumns = require('layout/FittableColumns'),
    FittableRows = require('layout/FittableRows'),
    FittableColumnsLayout = require('layout/FittableLayout').Columns,
    FittableRowsLayout = require('layout/FittableLayout').Rows,
    Input = require('onyx/Input'),
    TextArea = require('onyx/TextArea'),
    Picker = require('onyx/Picker'),
    PickerButton = require('onyx/PickerButton'),
    PickerDecorator = require('onyx/PickerDecorator'),
    Scroller = require('enyo/Scroller'),
    plSuInput = require('./input.js');

var utils = require('../../../common/services/utils.js');

var STACK_LIST = require('../../../common/services/stack.js').STACK_LIST;
var STACK_TYPES = require('../../../common/services/stack.js').STACK_TYPES;
var STACK_METHODS = require('../../../common/services/stack.js').STACK_METHODS;

var INPUT_SIZE = 35;
var FLOOR_SIZE = 220;
var chart1;

module.exports = kind({
    name: 'pl.su.Building',
    kind: FittableRows,
    classes: 'building-info enyo-fit',
    handlers: {
        onmouseover: 'onHandle'
    },
    components: [
        { name:'BuildingOption', kind: FittableRows, classes: 'building-option', components: [
            { name: 'ImportBuildingTitle', drawer: 'ImportBuildingContent', classes: 'drawer-title', content: 'IMPORT BUILDING MODEL OPTION<div class="ok"></div>',
                allowHtml: true, ontap: 'activateDrawer'},
            { name: 'ImportBuildingContent', kind: Drawer, classes: 'building-option-data', open: true, onDrawerAnimationEnd: 'resize', components: [
                { kind: FittableRows, components: [
                    {classes: 'item-title', content: 'IMPORT BUILDING MODEL'},
                    {classes: 'file-input-group', components: [
                        { name: 'FileName', kind: Input, placeholder: 'open file', classes: 'txt-open-file', value: '',
                            oninput: 'valueChanged', ontap: 'oldValueChange'},
                        { name: 'FileInput', kind: FileInputDecorator, classes: 'bt bt-file-input', onSelect: 'valueChanged' }
                    ]},
                    {classes: 'item-note', content: 'IMPORT GBXML, IFC, RESCheck, OR COMCheck files'}
                ]}
            ]}
        ]},
        { name:'BuildingData', kind: FittableRows, classes: 'building-data', components: [
            { name: 'BuildingDataTitle', drawer: 'BuildingDataDrawer', classes: 'drawer-title', content: 'MANUAL BUILDING DATA<div class="ok"></div>',
                allowHtml: true, ontap: 'activateDrawer'},
            { name: 'BuildingDataDrawer', kind: Drawer, open: true, classes: 'building-data-drawer', components: [
                { name:'BuildingDataScroller', style:'overflow-x: auto;overflow-y: auto;', components: [
                    { name:'BuildingDataContent', kind: FittableColumns, classes:'building-data-content', components: [
                        { name:'DataInner', kind: FittableRows, classes: 'manual-build', components: [
                            { name:'FloorWrap', kind: FittableRows, style:'margin-bottom:10px', components:[
                                { name: 'FloorTitle', drawer: 'FloorContent', classes: 'drawer-title', content: 'BUILDING INFORMATION<div class="ok"></div>', allowHtml: true, ontap: 'activateDrawer'},
                                { name: 'FloorContent', kind: Drawer, open: true, components: [
                                    { kind: FittableRows, classes: 'inner-box building-information-content', components: [
                                        { classes: 'manual-build-title', content: 'TOTAL BUILDING FLOOR AREA'},
                                        { kind: FittableColumns, components: [
                                            { kind: FittableColumns, classes: '', components: [
                                                {
                                                    name: 'TotalBuildingFloorArea', kind: Input, placeholder: 'unknown', classes: 'sumfloor-input',
                                                    oninput: 'valueChanged',
                                                    onfocus: 'onSaveFocus',
                                                    onkeydown: 'onSaveKeyDown',
                                                    onchange: 'onSaveChange'
                                                },
                                                { classes: 'txt-name', content: 'SQFT'}
                                            ]},
                                            { kind: FittableColumns, classes: 'manual-build-total', style: 'position: absolute;top:0;right:0;', components: [
                                                { classes: 'text', content: 'TOTAL BUILDING LEVELS'},
                                                {
                                                    name: 'TotalBuildingLevels',
                                                    kind: Input,
                                                    placeholder: '1',
                                                    onfocus: 'onSaveFocus',
                                                    onkeydown: 'onSaveKeyDown',
                                                    onchange: 'onSaveChange'
                                                }
                                            ]}
                                        ]},
                                        {name: 'LevelWrap', kind: FittableRows, classes: 'floors', style: 'overflow: auto;', components: [
                                            {kind: FittableColumns, classes: 'floor-level line', allowHtml: true, content: '<span class="line"></span>'},
                                            {name: 'Levels', kind: FittableRows},
                                            {kind: FittableColumns, classes: 'floor-level add', components: [
                                                { name: 'AddButton', classes: 'add', ontap: 'createLevel', allowHtml:true, content:'<span class="line"></span><span class="img"></span>' },
                                                { name: 'FloorName', classes: 'level-title', content: 'Add level'}
                                            ]}
                                        ]}
                                    ]}
                                ]}
                            ]},
                            { name:'MechanicalWrap', kind: FittableRows, components:[
                                {
                                    name: 'MechanicalTitle',
                                    classes: 'drawer-title',
                                    content: 'BUILDING MECHANICAL LOAD INFORMATION<div class="ok"></div>',
                                    drawer: 'MechanicalContent',
                                    allowHtml: true,
                                    ontap: 'activateDrawer'
                                },
                                { name: 'MechanicalContent', kind: Drawer, open: true, onDrawerAnimationEnd: 'resize', components: [
                                    { classes: 'inner-box', components: [
                                        { tag: 'table', classes: '', components: [
                                            { tag: 'tr', components: [
                                                { tag: 'td', components: [
                                                    { classes: 'item-title', content: 'U-VALUE • AREA'},
                                                    { kind: FittableColumns, components: [
                                                        { classes: 'u-value-wrap', components: [
                                                            {
                                                                name: 'UValueAreaInput',
                                                                kind: Input,
                                                                classes: 'building-mechanical-input u-value',
                                                                placeholder: 'unknown',
                                                                oninput: 'mechanicalValueChanged',
                                                                ontap: 'mechanicalFocus',
                                                                onfocus: 'onSaveFocus',
                                                                onkeydown: 'onSaveKeyDown',
                                                                onchange: 'onSaveChange'
                                                            },
                                                            { name: 'UValueAreaCheck', showing: false, classes: 'bg-check estimate'},
                                                            { name: 'UValueGroupBox', kind: FittableColumns, classes: 'button-style-wrap', showing: false, components: [
                                                                { name: 'ButtonEstimate', kind: Button, input: 'UValueAreaInput', classes: 'bt bt-estimate', content: 'Estimate', ontap: 'uValueGroupButtonTap'},
                                                                { name: 'ButtonAccurate', kind: Button, input: 'UValueAreaInput', classes: 'bt bt-accurate', content: 'Accurate', ontap: 'uValueGroupButtonTap'}
                                                            ]}
                                                        ]},
                                                        { classes: 'txt-name', content: 'UA'}
                                                    ]}
                                                ]},
                                                { tag: 'td'},
                                                { tag: 'td'}
                                            ]},
                                            {tag: 'tr', components: [
                                                {tag: 'td', components: [
                                                    { classes: 'item-title', content: 'HEATING DESIGN DAY'},
                                                    { layoutKind: FittableColumnsLayout, components: [
                                                        {
                                                            name: 'HeatingDesignDayInput',
                                                            kind: Input,
                                                            classes: 'building-mechanical-input',
                                                            placeholder: 'unknown',
                                                            oninput: 'mechanicalValueChanged',
                                                            onfocus: 'onSaveFocus',
                                                            onkeydown: 'onSaveKeyDown',
                                                            onchange: 'onSaveChange'
                                                        },
                                                        { classes: 'txt-name', content: 'kBTU'}
                                                    ]}
                                                ]},
                                                { tag: 'td', components: [
                                                    {classes: 'item-title', content: 'COOLING DESIGN DAY'},
                                                    { layoutKind: FittableColumnsLayout, components: [
                                                        {
                                                            name: 'CoolingDesignDayInput',
                                                            kind: Input,
                                                            classes: 'building-mechanical-input',
                                                            placeholder: 'unknown',
                                                            oninput: 'mechanicalValueChanged',
                                                            onfocus: 'onSaveFocus',
                                                            onkeydown: 'onSaveKeyDown',
                                                            onchange: 'onSaveChange'
                                                        },
                                                        { classes: 'txt-name', content: 'kBTU'}
                                                    ]}
                                                ]},
                                                { tag: 'td', components: [
                                                    { name: 'PickerDesignDay', kind: PickerDecorator, onChange: 'mechanicalValueChanged', components: [
                                                        { name: 'ButtonPickerDesignDay', kind: PickerButton, classes: 'bt-select', content: '99% DESIGN DAY'},
                                                        { kind: Picker, components: [
                                                            { content: '99% DESIGN DAY'},
                                                            { content: '99.6% DESIGN DAY'}
                                                        ]}
                                                    ]}
                                                ]}
                                            ]}
                                        ]}
                                    ]}
                                ]}
                            ]}
                        ]},
                        { kind: Scroller, layoutKind: FittableRowsLayout, classes: 'chart', components: [
                            { classes: 'text', content: 'Building Floor Area Ranking Compared to Commercial Stock' },
                            { name: 'BuildingFARankingChart', classes: 'draw-area' },
                            { classes: 'text', content: 'Building UA Ranking Compared to Commercial Stock' },
                            { name: 'BuildingUaRankingChart', classes: 'draw-area' }
                        ]}
                    ]}
                ]}
            ]}
        ]}
    ],
    constructor: function() {
        this.inherited(arguments);
        // Item focus
        this.inputFocus = undefined;
        // Available
        this.project = plProject2;
        this.floors = plProject2.floors;
        this.floors.sort('id');
    },
    create: function() {
        this.inherited(arguments);

        // Set fields
        this.inputFields = {
            fileName: this.$.FileName,
            fileInput: this.$.FileInput,
            totalBuildingFloorArea: this.$.TotalBuildingFloorArea,
            totalBuildingLevels: this.$.TotalBuildingLevels
        };

        // Button Action
        this.actionButtons = {
            addLevel: this.$.AddButton
        };

        // Create level list from data
        this.floors.sort('id');
        for(var i = 0; i < this.floors.count; i++) {
            this.createLevel(this.floors.item(i));
        }
    },
    rendered: function() {
        this.inherited(arguments);
        if(this.project.uValueArea) {
            this.$.UValueAreaInput.setValue(this.project.uValueArea);
        }
        if(this.project.heatingDesignDay) {
            this.$.HeatingDesignDayInput.setValue(this.project.heatingDesignDay);
        }
        if(this.project.coolingDesignDay) {
            this.$.CoolingDesignDayInput.setValue(this.project.coolingDesignDay);
        }
        if(this.project.pickerDesignDay) {
            this.$.ButtonPickerDesignDay.setContent(this.project.pickerDesignDay + '% DESIGN DAY');
        }
        // Set height
        this.resize();
        // Scroll to bottom
        this.scrollToBottom();
    },
    resize: function() {
        // Set height for building data
        var height = utils.getCSSProperty(this, 'offsetHeight', false) - utils.getCSSProperty(this.$.BuildingOption, 'offsetHeight', false);
        this.$.BuildingData.applyStyle('height', height + 'px');

        // Set height for building data content
        var heightContent = height - utils.getCSSProperty(this.$.BuildingDataTitle, 'offsetHeight', false);
        this.$.BuildingDataScroller.applyStyle('height', heightContent + 'px');

        // Set max heigr for floor
        if(heightContent < 400) heightContent = 400;
        var maxHeight = heightContent - utils.getCSSProperty(this.$.MechanicalWrap, 'offsetHeight', false);
        this.$.LevelWrap.applyStyle('max-height', (maxHeight - 110) + 'px'); // 110 is height not floor
    },
    handleResize: function() {
        this.inherited(arguments);
        this.resize();
    },
    //resizeComplete: function() {
    //    this.resize();
    //},
    breadcrumbHack: function(key, page, percentToAdd) {
        // Hack to add breadcrumb percentage
        var percent = PROGRESS[key];
        percent += percentToAdd;

        if(PROGRESS[key] < 100){
            Signals.send('onProgress', {page: page, key: key, value: percent});
        } else {
            PROGRESS[key] = 100;
        }
    },
    updateGraphHack: function(value) {
        var areaRanking1 = chart1.getContainer().getElementsByTagName('svg')[0];
        var width1 = parseInt(areaRanking1.getAttribute('width'));
        var height1 = parseInt(areaRanking1.getAttribute('height'));

        // console.log(areaRanking1.getElementById('column').getElementsByTagName('rect'));
        // console.log(areaRanking1.childNodes);
        // console.log(areaRanking1.getElementById('column'));

        var lineColumn = areaRanking1.getElementById('column');
        var columnLabel = areaRanking1.getElementById('label');
        areaRanking1.removeChild(lineColumn);
        areaRanking1.removeChild(columnLabel);

        var column1 = utils.makeSVG(
            'rect',
            {
                id: 'column',
                x: width1 * (value / 10000),//width1 * 63 / 100,
                y: 0,
                width: 15,
                height: height1,
                fill: '#615f95',
                stroke: '#615f95',
                'fill-opacity': 0.2
            }
        );
        areaRanking1.appendChild(column1);

        var percentage = (value / 100).toString() + '%';

        var label1 = utils.makeSVG(
            'text',
            {
                id: 'label',
                x: width1 * (value / 10000) + 15 / 2,
                y: 50,
                stroke: 'none',
                fill: '#615f95',
                'font-size': '12px',
                'text-anchor': 'middle'
            },
            percentage
        );
        label1.style.fontWeight = 'bold';
        areaRanking1.appendChild(label1);
    },
    // Chart Building Floor Area Ranking
    createChart: function() {
        // Create and populate the data table.
        var data1 = new google.visualization.DataTable();
        data1.addColumn('number', 'x');
        // Line 1
        data1.addColumn('number', 'y');
        data1.addColumn({type: 'number', role: 'interval'});
        data1.addColumn({type: 'number', role: 'interval'});
        // Add data
        data1.addRows([
            [0.0, 0.0, 0.0, 0.0],
            [0.2, 0.3, 0.3, 0.0],
            [0.4, 0.4, 0.4, 0.0],
            [0.6, 0.7, 0.7, 0.0],
            [0.8, 0.5, 0.5, 0.0],
            [1.0, 0.0, 0.0, 0.0]
        ]);
        // Create and draw the visualization.
        chart1 = new google.visualization.LineChart(document.getElementById(this.$.BuildingFARankingChart.getId()));
        chart1.draw(data1, {
            width: '100%',
            height: '100%',
            chartArea: {width: '100%', height: '100%'},
            curveType: 'function',
            legend: {position: 'none'},
            lineWidth: 3,
            vAxis: {
                textPosition: 'none',
                textStyle: {color: '#303282', bold: 1},
                minValue: 0,
                maxValue: 1,
                format: '#,#%',
                gridlines: {count: 3},
                minorGridlines: {count: 4},
                baselineColor: 'grey'
            },
            hAxis: {
                textPosition: 'in',
                textStyle: {color: '#303282', bold: 1},
                minValue: 0,
                maxValue: 1,
                format: '#,#%',
                gridlines: {count: 3},
                minorGridlines: {count: 4},
                baselineColor: 'grey'
            },
            series: {
                0: {color: '#83c7ef'}
            },
            intervals: {'style': 'area', fillOpacity: 0.5}
        });
        // Custom chart1
        var areaRanking1 = chart1.getContainer().getElementsByTagName('svg')[0];

        var width1 = parseInt(areaRanking1.getAttribute('width'));
        var height1 = parseInt(areaRanking1.getAttribute('height'));

        var text11 = utils.makeSVG(
            'text',
            {
                'text-anchor': 'end',
                x: 15,
                y: height1 - 4.5,
                'font-family': 'Arial',
                'font-size': 10,
                'font-weight': 'bold',
                stroke: '#ffffff',
                'stroke-width': 3,
                fill: '#303282'
            },
            '0%'
        );
        var text12 = utils.makeSVG(
            'text',
            {
                'text-anchor': 'end',
                x: 15,
                y: height1 - 4.5,
                'font-family': 'Arial',
                'font-size': 10,
                'font-weight': 'bold',
                stroke: 'none',
                'stroke-width': 3,
                fill: '#303282'
            },
            '0%'
        );
        var text21 = utils.makeSVG(
            'text',
            {
                'text-anchor': 'end',
                x: width1,
                y: height1 - 4.5,
                'font-family': 'Arial',
                'font-size': 10,
                'font-weight': 'bold',
                stroke: '#ffffff',
                'stroke-width': 3,
                fill: '#303282'
            },
            '100%'
        );
        var text22 = utils.makeSVG(
            'text',
            {
                'text-anchor': 'end',
                x: width1,
                y: height1 - 4.5,
                'font-family': 'Arial',
                'font-size': 10,
                'font-weight': 'bold',
                stroke: 'none',
                'stroke-width': 3,
                fill: '#303282'
            },
            '100%'
        );
        areaRanking1.appendChild(text11);
        areaRanking1.appendChild(text12);
        areaRanking1.appendChild(text21);
        areaRanking1.appendChild(text22);
        var column1 = utils.makeSVG(
            'rect',
            {
                id: 'column',
                x: width1*1/100,//width1 * 63 / 100,
                y: 0,
                width: 15,
                height: height1,
                fill: '#615f95',
                stroke: '#615f95',
                'fill-opacity': 0.2
            }
        );
        areaRanking1.appendChild(column1);

        var label1 = utils.makeSVG(
            'text',
            {
                id: 'label',
                x: width1 * 63 / 100 + 15 / 2,
                y: 50,
                stroke: 'none',
                fill: '#615f95',
                'font-size': '12px',
                'text-anchor': 'middle'
            },
            '63%'
        );
        label1.style.fontWeight = 'bold';
        areaRanking1.appendChild(label1);
        // Waiting chart rendered
        setTimeout(function() {
            var bb1 = label1.getBBox();
            var mask1 = utils.makeSVG(
                'rect',
                {
                    id: 'mask',
                    x: bb1.x - 2,
                    y: bb1.y - 2,
                    height: bb1.height + 4,
                    width: bb1.width + 4,
                    fill: '#ffffff',
                    stroke: 'none',
                    'fill-opacity': 0.3
                }
            );
            areaRanking1.appendChild(mask1);
        }, 1000);
        // End Custom chart1

        // Chart Building Ua Ranking
        var data2 = new google.visualization.DataTable();
        data2.addColumn('number', 'x');
        // Line 1
        data2.addColumn('number', 'y');
        data2.addColumn({type: 'number', role: 'interval'});
        data2.addColumn({type: 'number', role: 'interval'});
        // Add data
        data2.addRows([
            [0.0, 0.0, 0.0, 0.0],
            [0.2, 0.3, 0.3, 0.0],
            [0.4, 0.4, 0.4, 0.0],
            [0.6, 0.7, 0.7, 0.0],
            [0.8, 0.5, 0.5, 0.0],
            [1.0, 0.0, 0.0, 0.0]
        ]);
        // Create and draw the visualization.
        var chart2 = new google.visualization.LineChart(document.getElementById(this.$.BuildingUaRankingChart.getId()));
        chart2.draw(data2, {
            width: '100%',
            height: '100%',
            chartArea: {width: '100%', height: '100%'},
            curveType: 'function',
            legend: {position: 'none'},
            lineWidth: 3,
            vAxis: {
                textPosition: 'none',
                textStyle: {color: '#853b3a', bold: 1},
                minValue: 0,
                maxValue: 1,
                format: '#,#%',
                gridlines: {count: 3},
                minorGridlines: {count: 4},
                baselineColor: 'grey'
            },
            hAxis: {
                textPosition: 'in',
                textStyle: {color: '#303282', bold: 1},
                minValue: 0,
                maxValue: 1,
                format: '#,#%',
                gridlines: {count: 3},
                minorGridlines: {count: 4},
                baselineColor: 'grey'
            },
            series: {
                0: {color: '#dfc496'}
            },
            intervals: {'style': 'area', fillOpacity: 0.5}
        });

        // Custom chart2
        var areaRanking2 = chart2.getContainer().getElementsByTagName('svg')[0];

        var width2 = parseInt(areaRanking2.getAttribute('width'));
        var height2 = parseInt(areaRanking2.getAttribute('height'));

        var text11 = utils.makeSVG(
            'text',
            {
                'text-anchor': 'end',
                x: 15,
                y: height2 - 4.5,
                'font-family': 'Arial',
                'font-size': 10,
                'font-weight': 'bold',
                stroke: '#ffffff',
                'stroke-width': 3,
                fill: '#303282'
            },
            '0%'
        );
        var text12 = utils.makeSVG(
            'text',
            {
                'text-anchor': 'end',
                x: 15,
                y: height2 - 4.5,
                'font-family': 'Arial',
                'font-size': 10,
                'font-weight': 'bold',
                stroke: 'none',
                'stroke-width': 3,
                fill: '#303282'
            },
            '0%'
        );
        var text21 = utils.makeSVG(
            'text',
            {
                'text-anchor': 'end',
                x: width2,
                y: height2 - 4.5,
                'font-family': 'Arial',
                'font-size': 10,
                'font-weight': 'bold',
                stroke: '#ffffff',
                'stroke-width': 3,
                fill: '#303282'
            },
            '100%'
        );
        var text22 = utils.makeSVG(
            'text',
            {
                'text-anchor': 'end',
                x: width2,
                y: height2 - 4.5,
                'font-family': 'Arial',
                'font-size': 10,
                'font-weight': 'bold',
                stroke: 'none',
                'stroke-width': 3,
                fill: '#303282'
            },
            '100%'
        );
        areaRanking2.appendChild(text11);
        areaRanking2.appendChild(text12);
        areaRanking2.appendChild(text21);
        areaRanking2.appendChild(text22);

        var column2 = utils.makeSVG(
            'rect',
            {
                id: 'column',
                x: width2 * 42 / 100,
                y: 0,
                width: 15,
                height: height2,
                fill: '#8d4f3d',
                stroke: '#8d4f3d',
                'fill-opacity': 0.2
            }
        );
        areaRanking2.appendChild(column2);

        var label2 = utils.makeSVG(
            'text',
            {
                id: 'label',
                x: width2 * 42 / 100 + 15 / 2,
                y: 50,
                stroke: 'none',
                fill: '#8d4f3d',
                'font-size': '12px',
                'text-anchor': 'middle'
            },
            '42%'
        );
        label2.style.fontWeight = 'bold';
        areaRanking2.appendChild(label2);
        // Waiting chart rendered
        setTimeout(function() {
            var bb2 = label2.getBBox();
            var mask2 = utils.makeSVG(
                'rect',
                {
                    id: 'mask',
                    x: bb2.x - 2,
                    y: bb2.y - 2,
                    height: bb2.height + 4,
                    width: bb2.width + 4,
                    fill: '#ffffff',
                    stroke: 'none',
                    'fill-opacity': 0.3
                }
            );
            areaRanking2.appendChild(mask2);
        }, 1000);
        // End Custom chart2
    },
    // Handle
    onHandle: function(inSender, inEvent) {
        switch(inEvent.type) {
            case 'mouseover':
                // Floor GroupButton Hide
                var items = ['FloorTitle', 'MechanicalTitle', 'BuildingDataDrawer'];
                if(items.indexOf(inEvent.originator.name) != -1) {
                    if(this.$[this.inputFocus] != undefined) this.$[this.inputFocus].popupOff();
                }
                // UValue GroupButton Hide
                items = ['MechanicalTitle', 'BuildingDataDrawer', 'HeatingDesignDayInput', 'CoolingDesignDayInput', 'ButtonPickerDesignDay'];
                if(items.indexOf(inEvent.originator.name) != -1) {
                    this.$.UValueGroupBox.setShowing(false);
                }
                break;
            case 'mouseout':
                break;
        }
    },
    // Up <-> Down Drawer
    activateDrawer: function(inSender) {
        if(this.$[inSender.drawer].open === true) {
            inSender.addClass('unactive');
        } else if(inSender.hasClass('unactive')) {
            inSender.removeClass('unactive');
        }
        this.$[inSender.drawer].setOpen(!this.$[inSender.drawer].open);
    },
    // Other change
    valueChanged: function(inSender, inEvent) {
        if(inSender.name == 'FileName') {
            STACK_LIST.addStack(
                this.owner.name,
                this.owner.name,
                STACK_TYPES.ENYO,
                STACK_METHODS.EDIT,
                inSender,
                inSender.oldValue
            );
        } else if(inSender.name == 'FileInput') {
            if(inEvent.files.length > 0) {
                inSender.files = inEvent.files;
                // Set value for input name
                this.oldValueChange(this.inputFields.fileName);
                this.inputFields.fileName.setValue(inEvent.files[0].name);

                STACK_LIST.addStack(
                    this.owner.name,
                    this.owner.name,
                    STACK_TYPES.ENYO,
                    STACK_METHODS.EDIT,
                    this.inputFields.fileName,
                    this.inputFields.fileName.oldValue
                );
            } else {
                inSender.files = null;
                // Set value for input name
                this.oldValueChange(this.inputFields.fileName);
                this.inputFields.fileName.setValue('');

                STACK_LIST.addStack(
                    this.owner.name,
                    this.owner.name,
                    STACK_TYPES.ENYO,
                    STACK_METHODS.EDIT,
                    this.inputFields.fileName,
                    this.inputFields.fileName.oldValue
                );
            }
        } else if(inSender.name == 'TotalBuildingFloorArea') {
            this.updateLevelByTotalBuildingFloorArea();
        } else if(inSender.parent.name == 'Levels') {
            this.levelChange();
        }

        // Check Mark
        this.checkMark();
    },
    // Resize Floor Wrap
    scrollToBottom: function() {
        var levelWrap = document.getElementById(this.$.LevelWrap.getId());
        if(levelWrap) {
            levelWrap.scrollTop = levelWrap.scrollHeight - levelWrap.offsetHeight;
        }
    },
    // Add Level
    createLevel: function(inSender) {
        var value = '', type = FLOOR_TYPES.ACCURATE, floorId = -1, removed = false;
        if(typeof inSender.$ !== 'object') { // Not Enyo Object
            value = inSender.value;
            type = inSender.type;
            floorId = inSender.id;

            inSender.removed = inSender.removed ? true : false;
            removed = inSender.removed;
        } else {
            var temFloor = new FLOOR('Floor #2', FLOOR_TYPES.ACCURATE, '');
            plFloorList2.add(temFloor, true);
            //plProject2.floors.add(temFloor);

            value = temFloor.value;
            type = temFloor.type;
            floorId = temFloor.id;

            temFloor.removed = false;
            removed = false;
        }
        var targetName = 'FloorItem_' + this.$.Levels.children.length;
        this.$.Levels.createComponent({
            name: targetName,
            kind: plSuInput,
            classes: 'floor-level',
            value: value,
            type: type,
            floorId: floorId,
            style: 'height:0;',
            removed: removed,
            onInput: 'valueChanged',
            onRemove: 'disableLevel',
            onType: 'levelChangeType',
            onFocus: 'levelFocus',
            onAddStack: 'levelAddStack'
        }, {owner: this});
        this.$[targetName].render();
        // Rename
        this.renameList();
        // Animation
        var anim = new Animator({
            duration: 200,
            startValue: 0,
            endValue: INPUT_SIZE,
            onStep: bind(this, function(data) {
                this.$[targetName].applyStyle('height', data.value + 'px');
            }),
            onEnd: bind(this, function() {
                var that = this;
                setTimeout(function() {
                    that.scrollToBottom();
                }, 200);
            })
        });
        anim.play();
        // Check Value
        this.levelChange();

        // Add stack list
        STACK_LIST.addStack(
            this.owner.name,
            this.owner.name,
            STACK_TYPES.ENYO,
            STACK_METHODS.CREATE,
            this.$[targetName],
            undefined,
            this,
            'disableLevel'
        );
    },
    // Disable Level
    disableLevel: function(inSender, inEvent) {
        // Animation
        var anim = new Animator({
            duration: 200,
            startValue: INPUT_SIZE,
            endValue: 0,
            onStep: bind(this, function(data) {
                inSender.applyStyle('height', data.value + 'px');
            }),
            onEnd: bind(this, function() {
                var that = this;
                setTimeout(function() {
                    inSender.hide();
                    inSender.removed = true;
                    that.renameList();
                    // Check Value
                    that.levelChange();
                }, 200);
            })
        });
        anim.play();

        // Add stack list
        if(!!inEvent) { // Not Callback
            STACK_LIST.addStack(
                this.owner.name,
                this.owner.name,
                STACK_TYPES.ENYO,
                STACK_METHODS.CALLBACK,
                inSender,
                undefined,
                this,
                'enableLevel'
            );
        }
    },
    // Enable Level
    enableLevel: function(stack) {
        stack.sender.applyStyle('height', '0px');
        stack.sender.show();
        stack.sender.removed = false;
        var anim = new Animator({
            duration: 200,
            startValue: 0,
            endValue: INPUT_SIZE,
            onStep: bind(this, function(data) {
                stack.sender.applyStyle('height', data.value + 'px');
            }),
            onEnd: bind(this, function() {
                //var that = this;
                //setTimeout(function() {
                //    that.scrollToBottom();
                //}, 200);
            })
        });
        anim.play();
        this.renameList();
        // Check Value
        this.levelChange();
    },
    // Rename indicator and update length for levels
    renameList: function() {
        this.$.Levels.length = 0;
        for(var i = 0, j = 1; i < this.$.Levels.children.length; i++) {
            var child = this.$.Levels.children[i];
            if(!child.removed) {
                child.setIndex(j);
                this.$.Levels.length = j;
                j++;
            }
        }
    },
    // GroupButton hide when not focus
    levelFocus: function(inSender, inEvent) {
        // Disable Popup
        if(this.inputFocus != undefined && this.$[this.inputFocus] != undefined) {
            this.$[this.inputFocus].popupOff();
        }
        // Store
        this.inputFocus = inEvent.name;
        // Show Popup
        this.$[this.inputFocus].popupOn();
    },
    levelAddStack: function(inSender, inEvent) {
        STACK_LIST.addStack(
            this.owner.name,
            this.owner.name,
            STACK_TYPES.ENYO,
            STACK_METHODS.EDIT,
            inSender,
            inEvent.valueFocus,
            this,
            'levelChange'
        );
    },
    // Record type changed
    levelChangeType: function(inSender, inEvent) {
        STACK_LIST.addStack(
            this.owner.name,
            this.owner.name,
            STACK_TYPES.ENYO,
            STACK_METHODS.EDIT,
            inEvent.originator,
            inEvent.originator.type,
            this,
            'levelReverseType'
        );
    },
    // Undo type
    levelReverseType: function(stack) {
        stack.sender.reverseType(stack.value);
    },
    // Floor Input Change and Event undo
    levelChange: function() {
        this.updateIndicator();
        this.checkMarkData();
    },
    // Update Level Input Value By Total Building Floor Area
    updateLevelByTotalBuildingFloorArea: function() {
        var inSender = this.inputFields.totalBuildingFloorArea;

        if(!utils.isNumber(inSender.getValue()) || inSender.getValue() <= 0) {
            for(var i = 0; i < this.$.Levels.children.length; i++) {
                var child = this.$.Levels.children[i];
                if(!child.removed) {
                    child.onUpdate('');
                }
            }
        } else {
            this.updateGraphHack(inSender.getValue());

            var value = Math.floor(inSender.getValue() * 1000 / this.$.Levels.length) / 1000;
            for(var i = 0; i < this.$.Levels.children.length; i++) {
                var child = this.$.Levels.children[i];
                if(!child.removed) {
                    child.onUpdate(value);
                }
            }
        }
    },
    // Update Floor By Total
    totalBuildingLevelsUpdate: function(total) {
        total = parseInt(total);

        if(this.$.Levels.length == total) {
            return false;
        } else if(this.$.Levels.length < total) {
            while(this.$.Levels.length < total) {
                this.actionButtons.addLevel.triggerHandler('ontap');
            }
        } else {
            var sum = this.$.Levels.length - total;
            for(var i = this.$.Levels.children.length - 1; i >= 0; i--) {
                var child = this.$.Levels.children[i];
                if(!child.removed) {
                    child.removeInput();
                    sum--;
                    if(sum <= 0) break;
                }
            }
        }

        // Update value for each floor
        this.updateLevelByTotalBuildingFloorArea();

        // Check Value
        this.levelChange();
    },
    // Check validation and update
    totalBuildingLevelsValid: function() {
        var val = this.inputFields.totalBuildingLevels.getValue();
        if(!val || !utils.isNumber(val)) {
            this.inputFields.totalBuildingLevels.setValue(this.inputFields.totalBuildingLevels.valueFocus);
            return false;
        }
        val = parseInt(val);
        if(val < 1 || 100 < val) {
            this.inputFields.totalBuildingLevels.setValue(this.inputFields.totalBuildingLevels.valueFocus);
            return false;
        }
        this.totalBuildingLevelsUpdate(val);
        return true;
    },
    mechanicalValueChanged: function(inSender) {
        switch(inSender.name) {
            case 'UValueAreaInput':
                if(!inSender.hasClass(this.project.uValueType)) {
                    inSender.addClass(this.project.uValueType);
                }
                if(utils.isNumber(inSender.getValue())) {
                    if(!inSender.hasClass('check')) {
                        inSender.addClass('check');
                        this.$.UValueGroupBox.setShowing(true);
                    }
                } else {
                    if(inSender.hasClass('check')) {
                        inSender.removeClass('check');
                        this.$.UValueGroupBox.setShowing(false);
                    }
                }
                this.project.uValueArea = inSender.getValue();
                this.mechanicalFocus(inSender);
                break;
            case 'HeatingDesignDayInput':
                this.project.heatingDesignDay = inSender.getValue();
                break;
            case 'CoolingDesignDayInput':
                this.project.coolingDesignDay = inSender.getValue();
                break;
            case 'PickerDesignDay':
                if(inSender.activator.getContent() == '99% DESIGN DAY') {
                    this.project.pickerDesignDay = 99;
                }
                if(inSender.activator.getContent() == '99.6% DESIGN DAY') {
                    this.project.pickerDesignDay = 99.6;
                }
                break;
        }
        // Check Value
        this.checkMarkData();
    },
    mechanicalUnChanged: function(stack) {
        if(stack.sender.name == 'UValueAreaInput') {
            stack.sender.setValue(stack.value);
            if(utils.isNumber(stack.value)) {
                if(!stack.sender.hasClass('check')) {
                    stack.sender.addClass('check');
                    this.project.uValueArea = stack.value;
                }
            } else {
                if(stack.sender.hasClass('check')) {
                    stack.sender.removeClass('check');
                    this.project.uValueArea = '';
                }
            }
            this.mechanicalFocus(stack.sender);
        }
    },
    mechanicalFocus: function(inSender) {
        if(utils.isNumber(inSender.getValue())) {
            if(this.project.uValueArea != undefined) {
                this.$.UValueAreaCheck.setShowing(true);
            }
            this.$.UValueGroupBox.setShowing(true);
        } else {
            this.$.UValueAreaCheck.setShowing(false);
            this.$.UValueGroupBox.setShowing(false);
        }
    },
    uValueGroupButtonTap: function(inSender) {
        if(this.$[inSender.input].hasClass(this.project.uValueType)) {
            this.$[inSender.input].removeClass(this.project.uValueType);
        }
        if(this.$.UValueAreaCheck.hasClass(this.project.uValueType)) {
            this.$.UValueAreaCheck.removeClass(this.project.uValueType);
        }
        var oldType = false;
        if(inSender.name == 'ButtonEstimate') {
            if(this.project.uValueType != FLOOR_TYPES.ESTIMATE) {
                oldType = this.project.uValueType;
            }
            this.project.uValueType = FLOOR_TYPES.ESTIMATE;
        } else if(inSender.name == 'ButtonAccurate') {
            if(this.project.uValueType != FLOOR_TYPES.ACCURATE) {
                oldType = this.project.uValueType;
            }
            this.project.uValueType = FLOOR_TYPES.ACCURATE;
        }

        if(!this.$[inSender.input].hasClass(this.project.uValueType)) {
            this.$[inSender.input].addClass(this.project.uValueType);
        }
        if(!this.$.UValueAreaCheck.hasClass(this.project.uValueType)) {
            this.$.UValueAreaCheck.addClass(this.project.uValueType);
        }
        // Add Stack
        if(oldType) {
            STACK_LIST.addStack(
                this.owner.name,
                this.owner.name,
                STACK_TYPES.ENYO,
                STACK_METHODS.EDIT,
                this.$[inSender.input],
                oldType,
                this,
                'unChangeUValue'
            );
        }
    },
    unChangeUValue: function(stack) {
        var oldType = stack.value;
        var newType = stack.value;
        if(oldType == FLOOR_TYPES.ACCURATE) {
            newType = FLOOR_TYPES.ESTIMATE;
        } else {
            newType = FLOOR_TYPES.ACCURATE;
        }
        if(stack.sender.hasClass(newType)) {
            stack.sender.removeClass(newType);
        }
        if(this.$.UValueAreaCheck.hasClass(newType)) {
            this.$.UValueAreaCheck.removeClass(newType);
        }
        if(!stack.sender.hasClass(oldType)) {
            stack.sender.addClass(oldType);
        }
        if(!this.$.UValueAreaCheck.hasClass(oldType)) {
            this.$.UValueAreaCheck.addClass(oldType);
        }
        this.project.uValueType = oldType;
    },
    // Update indicator
    updateIndicator: function() {
        var total = 0;
        var length = 0;
        for(var i = 0; i < this.$.Levels.children.length; i++) {
            var child = this.$.Levels.children[i];
            if(!child.removed) {
                total += (!utils.isNumber(child.value) ? 0 : parseFloat(child.value));
                length++;
            }
        }
        if(total == 0) {
            total = '';
        } else {
            total = Math.floor(total * 1000) / 1000;
        }
        this.inputFields.totalBuildingFloorArea.setValue(total);
        this.inputFields.totalBuildingLevels.setValue(length);
    },
    checkFloor: function() {
        var percent = 0;
        if(this.$.Levels.length == 0) {
            if(this.$.FloorTitle.hasClass('check')) {
                this.$.FloorTitle.removeClass('check');

                // Hack to add breadcrumb percentage
                // percent = PROGRESS['SETUP'];
                // percent-=25;
                // Signals.send('onProgress', {page: APP_PROGRESS.PR_SETUP, key: 'SETUP', value: percent});

                this.breadcrumbHack('SETUP', APP_PROGRESS.PR_SETUP, -25);
                this.breadcrumbHack('SETUP_BUILDING_INFO', APP_PROGRESS.PR_SETUP_BUILDING_INFO, -25);
                // END HACK
            }
            return false;
        } else {
            for(var i = 0; i < this.$.Levels.children.length; i++) {
                var child = this.$.Levels.children[i];
                if(!child.removed) {
                    if(!utils.isNumber(child.getValue()) || child.getValue() == 0) {
                        if(this.$.FloorTitle.hasClass('check')) {
                            this.$.FloorTitle.removeClass('check');

                            // Hack to add breadcrumb percentage
                            // percent = PROGRESS['SETUP'];
                            // percent-=25;
                            // Signals.send('onProgress', {page: APP_PROGRESS.PR_SETUP, key: 'SETUP', value: percent});

                            this.breadcrumbHack('SETUP', APP_PROGRESS.PR_SETUP, -25);
                            this.breadcrumbHack('SETUP_BUILDING_INFO', APP_PROGRESS.PR_SETUP_BUILDING_INFO, -25);
                            // END HACK
                        }
                        return false;
                    }
                }
            }
        }
        if(!this.$.FloorTitle.hasClass('check')) {
            // Hack to add breadcrumb percentage
            // percent = PROGRESS['SETUP'];
            // percent+=25;
            // Signals.send('onProgress', {page: APP_PROGRESS.PR_SETUP, key: 'SETUP', value: percent});

            this.breadcrumbHack('SETUP', APP_PROGRESS.PR_SETUP, 25);
            this.breadcrumbHack('SETUP_BUILDING_INFO', APP_PROGRESS.PR_SETUP_BUILDING_INFO, 25);
            // END HACK

            this.$.FloorTitle.addClass('check');
        }
        return true;
    },
    checkMechanical: function() {
        var percent = 0;
        if(!!this.project.uValueArea || (!!this.project.heatingDesignDay && !!this.project.coolingDesignDay && !!this.project.pickerDesignDay)) {
            if(!this.$.MechanicalTitle.hasClass('check')) {
                // Hack to add breadcrumb percentage
                // percent = PROGRESS['SETUP'];
                // percent+=25;
                // Signals.send('onProgress', {page: APP_PROGRESS.PR_SETUP, key: 'SETUP', value: percent});

                this.breadcrumbHack('SETUP', APP_PROGRESS.PR_SETUP, 25);
                this.breadcrumbHack('SETUP_BUILDING_INFO', APP_PROGRESS.PR_SETUP_BUILDING_INFO, 25);
                // END HACK

                this.$.MechanicalTitle.addClass('check');
            }
            return true;
        }

        if(this.$.MechanicalTitle.hasClass('check')) {
            // Hack to add breadcrumb percentage
            // percent = PROGRESS['SETUP'];
            // percent-=25;
            // Signals.send('onProgress', {page: APP_PROGRESS.PR_SETUP, key: 'SETUP', value: percent});

            this.breadcrumbHack('SETUP', APP_PROGRESS.PR_SETUP, -25);
            this.breadcrumbHack('SETUP_BUILDING_INFO', APP_PROGRESS.PR_SETUP_BUILDING_INFO, -25);
            // END HACK

            this.$.MechanicalTitle.removeClass('check');
        }
        return false;
    },
    checkMarkImport: function() {
        var percent = 0;
        var fileName = this.inputFields.fileName.getValue();
        var files = this.inputFields.fileInput.files;
        if(!!fileName && !!files) {
            if(!this.$.ImportBuildingTitle.hasClass('check')) {
                this.$.ImportBuildingTitle.addClass('check');
            }
            return true;
        } else {
            if(this.$.ImportBuildingTitle.hasClass('check')) {
                this.$.ImportBuildingTitle.removeClass('check');
            }
            return false;
        }
    },
    checkMarkData: function() {
        if(this.checkFloor() && this.checkMechanical()) {
            if(!this.$.BuildingDataTitle.hasClass('check')) {
                this.$.BuildingDataTitle.addClass('check');
            }
        } else {
            if(this.$.BuildingDataTitle.hasClass('check')) {
                this.$.BuildingDataTitle.removeClass('check');
            }
        }
    },
    // Check mark for information
    checkMark: function() {
        var case1 = this.checkMarkImport();
        var case2 = this.checkMarkData();
        if(case1 && case2) {
            return true;
        } else {
            return false;
        }
    },
    // Save old value
    oldValueChange: function(inSender) {
//        if(inSender.kind == 'onyx.TextArea' || inSender.kind == 'onyx.Input') {
        if(inSender instanceof TextArea || inSender instanceof Input) {
            inSender.oldValue = inSender.getValue();
        }
    },
    // Save old
    onSaveFocus: function(inSender) {
        if(inSender.name === 'UValueAreaInput') {
            this.mechanicalFocus(inSender);
        }
        var value = inSender.getValue();
        if(typeof value === 'string') {
            value = value.trim();
        }
        inSender.valueFocus = value;
        inSender.isFocus = true;
    },
    // Save in progress
    onSaveKeyDown: function(inSender, inEvent) {
        if(inEvent.keyCode === 13) {
            var currentValue = inSender.getValue();
            if(typeof currentValue === 'string') {
                currentValue = currentValue.trim();
            }
            if(inSender.isFocus && inSender.valueFocus != currentValue) {
                if(inSender.name === 'UValueAreaInput') {
                    STACK_LIST.addStack(
                        this.owner.name,
                        this.owner.name,
                        STACK_TYPES.ENYO,
                        STACK_METHODS.EDIT,
                        inSender,
                        inSender.valueFocus,
                        this,
                        'mechanicalUnChanged'
                    );
                } else if(inSender.name === 'TotalBuildingLevels') {  // Change TotalBuildingLevels
                    this.totalBuildingLevelsValid();
                } else {
                    STACK_LIST.addStack(
                        this.owner.name,
                        this.owner.name,
                        STACK_TYPES.ENYO,
                        STACK_METHODS.EDIT,
                        inSender,
                        inSender.valueFocus
                    );
                }
                inSender.valueFocus = currentValue;
            }
        }
    },
    // Save to stack
    onSaveChange: function(inSender) {
        if(inSender.isFocus) {
            if(inSender.name === 'UValueAreaInput') {
                STACK_LIST.addStack(
                    this.owner.name,
                    this.owner.name,
                    STACK_TYPES.ENYO,
                    STACK_METHODS.EDIT,
                    inSender,
                    inSender.valueFocus,
                    this,
                    'mechanicalUnChanged'
                );
            } else if(inSender.name === 'TotalBuildingLevels') {  // Change TotalBuildingLevels
                this.totalBuildingLevelsValid();
            } else {
                STACK_LIST.addStack(
                    this.owner.name,
                    this.owner.name,
                    STACK_TYPES.ENYO,
                    STACK_METHODS.EDIT,
                    inSender,
                    inSender.valueFocus
                );
            }
            inSender.isFocus = false;
        }
    },
    undo: function(stack) {

    }
});

},{'./input.js':'src/views/progress/setup/input','../../../common/services/utils.js':'src/common/services/utils','../../../common/services/stack.js':'src/common/services/stack'}],'src/views/progress/site/list-setting':[function (module,exports,global,require,request){
//

var kind = require('enyo/kind'),
    bind = require('enyo/utils').bind;

var FittableRows = require('layout/FittableRows'),
    FittableColumns = require('layout/FittableColumns'),
    Drawer = require('onyx/Drawer'),
    Grabber = require('onyx/Grabber'),
    Button = require('onyx/Button'),
    IconButton = require('onyx/IconButton'),
    Input = require('onyx/Input'),
    Picker = require('onyx/Picker'),
    PickerButton = require('onyx/PickerButton'),
    PickerDecorator = require('onyx/PickerDecorator'),
    Scroller = require('enyo/Scroller'),
    Signals = require('enyo/Signals'),
    Animator = require('enyo/Animator'),
    plSiteInput = require('./input'),
    plSiteListSettingContent = require('./list-setting-content.js'),
    plSiteSensor = require('./sensor.js');

var utils = require('../../../common/services/utils.js');

var STACK_LIST = require('../../../common/services/stack.js').STACK_LIST;
var STACK_TYPES = require('../../../common/services/stack.js').STACK_TYPES;
var STACK_METHODS = require('../../../common/services/stack.js').STACK_METHODS;

var siteGraphic = require('../../../views/progress/site/graphic.js');

module.exports = kind({
    name: 'pl.site.ListSetting',
    kind: FittableColumns,
    classes: 'zone-list-setup',
    events: {
        onFloorTap: '',
        onZoneTap: '',
        onZoneSetting: ''
    },
    components: [
        { name: 'FloorSetting', kind: FittableRows, classes: 'floor-setting', components: [
            { name: 'FloorSettingContent', classes: 'menu-bar', fit: true },
            { name: 'FloorSettingFooter', kind: FittableColumns, classes: 'footer border-right', components: [
                { name:'Collapsing', kind: Grabber, attributes: {title: 'Collapsing'}, classes: 'bt bt-collapsing',
                    ontap: 'toggleFullScreen',
                    ondragstart: 'toggleFullScreen',
                    ondragfinish: 'toggleFullScreen'
                },
                { classes: 'action', components:[
                    {kind: IconButton, classes: 'btn btn-add-new', ontap: 'zoneAdd'}
                ]}
            ]}
        ]},
        { name: 'ZoneSetting', kind: FittableRows, showing: false, classes: 'room-setting box-shadow', components: [
            { name: 'ZoneSettingContent', kind: FittableRows, classes: 'border-left', style: 'width:100%;height:100%;overflow:hidden;', fit: true, components: [
                { name: 'ZoneSettingName', classes: 'sub-menu-title', components: [
                    {name: 'ZoneName', content: 'KITCHEN SENSOR LIST', style: 'width:100%;height:100%;', fit: true},
                    {name: 'ZoneSettingClose', classes: 'sub-menu-close', attributes: {title: 'Close'}, ontap: 'zoneSettingClose'}
                ]},
                { name: 'SensorList', kind: FittableRows, fit: true, classes: 'sub-menu-content' },
                { name: 'SensorOption', kind: FittableRows, showing: false, classes: 'border-left sub-menu-option', style: 'height:100%;', components: [
                    { name: 'SensorName', classes: 'heading-title', content: 'TEMPERATURE SENSOR', onclick: 'offSensorOption'},
                    { name: 'TemperatureSensor', kind: FittableRows, classes: 'content', components: [
                        { classes: 'title', content: 'SENSOR OPTIONS'},
                        { kind: PickerDecorator, onChange: 'sensorHandleOption', components: [
                            { name: 'SensorOptionOpt', kind: PickerButton, classes: 'option', content: '10k RTD'},
                            { kind: Picker, components: [
                                { content: '10k RTD'},
                                { content: '10k RTD'},
                                { content: '10k RTD'}
                            ]}
                        ]},
                        { classes: 'drawer-advanced-header', content: 'ADVANCED OPTIONS', drawer: 'advancedOptions', ontap: 'optionDrawer'},
                        { name: 'advancedOptions', kind: Drawer, open: true, classes: 'drawer-advanced-options', components: [
                            { classes: 'row1', components: [
                                { classes: 'input-name', content: 'Coefficient A'},
                                { name: 'SensorOptionCoefficientA', kind: Input, placeholder: 'default value', oninput: 'sensorHandleOption'}
                            ]},
                            { classes: 'row2', components: [
                                { classes: 'input-name', content: 'Coefficient B'},
                                { name: 'SensorOptionCoefficientB', kind: Input, placeholder: 'default value', oninput: 'sensorHandleOption'}
                            ]}
                        ]}
                    ]}
                ]},
                { name: 'SensorLine', kind: FittableColumns, showing: false, classes: 'sensor-line', components: [
                    { name: 'SensorBegin', classes: 'begin' },
                    { name: 'SensorEnd', classes: 'line' }
                ]}
            ]},
            { name: 'ZoneSettingFooter', classes: 'footer' },
            { kind: Signals, onSiteMenu: 'onSiteMenu' }
        ]}
    ],
    constructor: function() {
        this.inherited(arguments);
        // Variables
        this.project = {};
        this.floors = [];

        this.currentFloorId = -1;
        this.currentZoneId = -1;
        this.currentSensorKey = -1;
        this.oldFloorId = -1;
        this.oldZoneId = -1;
        
        // Tests to see if add zone is clicked for the first time 
        this.ZoneListBullshit = true;

    },
    create: function() {
        this.inherited(arguments);
    },
    rendered: function() {
        this.inherited(arguments);
    },
    handleResize: function() {
        this.inherited(arguments);
        this.dimension();

        // Disable option
        this.sensorHideOption();
    },
    dimension: function() {
        this.maxHeight = utils.getCSSProperty(this.$.FloorSettingContent, 'offsetHeight', false);
        this.$.FloorSettingContent.applyStyle('width', TOOLBARS.SITE_BUILDER / 2 + 'px');
        this.$.FloorSettingFooter.applyStyle('width', TOOLBARS.SITE_BUILDER / 2 + 'px');
        // Option Fix
        this.zoneSettingNameHeight = utils.getCSSProperty(this.$.ZoneSettingName, 'offsetHeight', false);
        this.zoneSettingContentHeight = utils.getCSSProperty(this.$.ZoneSettingContent, 'offsetHeight', false);
        this.sensorListHeight = this.zoneSettingContentHeight - this.zoneSettingNameHeight;
        this.$.SensorList.applyStyle('height', this.sensorListHeight + 'px');
    },
    onSiteMenu: function(inSender, inEvent) {
        if(inEvent.method === STACK_METHODS.CREATE) {
            this.sensorAdd({
                floorId: inEvent.vals.floorId,
                zoneId: inEvent.vals.zoneId,
                sensorId: inEvent.sensorId,
                name: inEvent.name,
                classes: inEvent.classes,
                kind: inEvent.kind,
                type: inEvent.type,
                url: inEvent.url,
                w: inEvent.w,
                h: inEvent.h,
                color: inEvent.vals.color,
                objectSensor: inEvent.objectSensor
            }, 'addToSVG');
        } else if(inEvent.method === STACK_METHODS.DELETE) {
            this.sensorRemove({
                floorId: inEvent.vals.floorId,
                zoneId: inEvent.vals.zoneId,
                sensorId: inEvent.sensorId
            });
        } else if(inEvent.method === STACK_METHODS.TAP) {
            if(this.currentZoneId !== inEvent.vals.zoneId) {
                this.$['Zone_' + inEvent.vals.floorId + '_' + inEvent.vals.zoneId].triggerHandler('ontap');
            }
        } else if(inEvent.method === STACK_METHODS.MOVE) { // Change zone parent for sensor in floor
            this.sensorChangeParent(inEvent);
        }
    },
    init: function(data) {
        this.project = data;
        this.floors = data.floors;

        // Destroy if exist
        this.$.FloorSettingContent.destroyClientControls();

        // Init Floors
        var floor, zone, zoneChildren;
        for(var index = 0; index < this.floors.count; index++) {
            floor = this.floors.item(index);
            zoneChildren = new Array();
            for(var i = 0; i < floor.zones.length; i++) {
                zone = floor.zones.item(i);
                zoneChildren.push({
                    name: 'Zone_' + floor.id + '_' + zone.id,
                    kind: plSiteInput,
                    tag: 'li',
                    floorId: floor.id,
                    zoneId: zone.id,
                    classes: i % 2 == 0 ? 'even' : 'odd',
                    zoneObject: zone,
                    value: zone.name,
                    color: zone.color,
                    ontap: 'zoneTap',
                    ondblclick: 'zoneDblClick',
                    onChanged: 'zoneChanged',
                    onDelete: 'zoneRemove'
                });
            }
            this.$.FloorSettingContent.createComponent({
                name: 'Floor_' + floor.id,
                floorId: floor.id,
                components: [
                    {
                        name: 'Floor_' + floor.id + '_Name',
                        classes: 'title',
                        floorId: floor.id,
                        ontap: 'floorTap',
                        //content: (index == 0 ? 'outdoor zone' : utils.getOrdinal(index) + ' FLOOR ZONES'),
                        content: floor.name
                    },
                    {
                        name: 'Floor_' + floor.id + '_Drawer',
                        kind: Drawer,
                        floorId: floor.id,
                        open: false,
                        animated: true,
                        onDrawerAnimationEnd: 'floorDrawerEnd',
                        classes: 'floor-content',
                        components: [
                            {
                                name: 'Floor_' + floor.id + '_Content',
                                kind: plSiteListSettingContent,
                                tag: 'ul',
                                //kind: Scroller,
                                //touch: true,
                                //horizontal: 'hidden',
                                //style: 'max-height:' + (this.maxHeight - this.floors.count * 31) + 'px',
                                components: zoneChildren
                            }
                        ]
                    }
                ]
            }, {owner: this});
        }
        this.render();

        // Selected default
        //if(floor) {
        //    this.floorSelect(floor.id);
        //    this.currentFloorId = floor.id;
        //
        //    if(floor.zones.count > 0) {
        //        this.currentZoneId = floor.zones.item(0).id;
        //        this.zoneSelect(floor.zones.item(0).id);
        //        this.zoneSettingShow(true);
        //    }
        //}
    },
    toggleFullScreen: function() {
        console.log("here");
        this.turnOnPanel = this.turnOnPanel != undefined ? !!this.turnOnPanel : false;
        if(this.currentZoneId != undefined && this.currentZoneId != -1) {
            this.zoneSettingShow(!this.turnOnPanel);
        } else {
            this.zoneSettingShow(false);
        }
    },
    floorDrawerEnd: function(inSender) {
        inSender.applyStyle('overflow', 'visible');
    },
    floorSelect: function(floorId) {
        // Remove the selection on the previously selected item
        if(!!this.$['Floor_' + this.currentFloorId] && this.currentFloorId !== floorId) {
            // Add Floor Style
            this.$['Floor_' + this.currentFloorId + '_Drawer'].applyStyle('overflow', 'hidden');
            this.$['Floor_' + this.currentFloorId + '_Name'].removeClass('selected');
            if(this.$['Floor_' + this.currentFloorId + '_Drawer'].getOpen()) {
                this.$['Floor_' + this.currentFloorId + '_Drawer'].setOpen(false);
            }

            // Backup
            this.$['Floor_' + this.currentFloorId + '_Name'].currentZoneId = this.currentZoneId;
            this.$['Floor_' + this.currentFloorId + '_Name'].oldZoneId = this.oldZoneId;
        }
        // If item exist then select it
        if(!!this.$['Floor_' + floorId]) {
            // Add Floor Style
            this.$['Floor_' + floorId + '_Drawer'].applyStyle('overflow', 'hidden');
            this.$['Floor_' + floorId + '_Name'].addClass('selected');
            if(!this.$['Floor_' + floorId + '_Drawer'].getOpen()) {
                this.$['Floor_' + floorId + '_Drawer'].setOpen(true);
            }
        }
    },
    floorTap: function(inSender) {
        // Add Stack List
        STACK_LIST.addStack(
            this.owner.name,
            this.owner.name,
            STACK_TYPES.ENYO,
            STACK_METHODS.DEFAULT,
            undefined,
            {
                oldFloorId: this.oldFloorId,
                floorId: this.currentFloorId
            },
            this,
            'floorTapCallBack'
        );

        if(this.currentFloorId === inSender.floorId) { // Disable if ready
            this.floorSelect(-1);

            // Update available
            this.oldFloorId = this.currentFloorId;
            this.oldZoneId = this.currentZoneId;
            this.currentFloorId = -1;
            this.currentZoneId = -1;
        } else {
            this.floorSelect(inSender.floorId);

            // Update available
            this.oldFloorId = this.currentFloorId;
            this.currentFloorId = inSender.floorId;

            this.oldZoneId = inSender.oldZoneId;
            this.currentZoneId = inSender.currentZoneId;
        }

        // Check select default zone and restore if select floor
        if(!!this.$['Zone_' + this.currentFloorId + '_' + inSender.currentZoneId]) {
            this.$['Zone_' + this.currentFloorId + '_' + inSender.currentZoneId].isfloorTap = true;
            this.$['Zone_' + this.currentFloorId + '_' + inSender.currentZoneId].triggerHandler('ontap');
        } else {
            this.zoneSettingClose(); // Close panel
        }

        this.doFloorTap({floorId: this.currentFloorId});
    },
    floorTapCallBack: function(values) {
        this.floorSelect(values.floorId);

        // Update available
        this.currentFloorId = values.floorId;
        this.oldFloorId = values.oldFloorId;

        if(!!this.$['Floor_' + this.currentFloorId + '_Name']) {
            this.currentZoneId = this.$['Floor_' + this.currentFloorId + '_Name'].currentZoneId;
            this.oldZoneId = this.$['Floor_' + this.currentFloorId + '_Name'].oldZoneId;
        } else {
            this.currentZoneId = -1;
            this.oldZoneId = -1;
        }

        // Check select default zone and restore if select floor
        if(!!this.$['Zone_' + this.currentFloorId + '_' + this.currentZoneId]) {
            this.$['Zone_' + this.currentFloorId + '_' + this.currentZoneId].isfloorTap = true;
            this.$['Zone_' + this.currentFloorId + '_' + this.currentZoneId].triggerHandler('ontap');
        } else {
            this.zoneSettingClose(); // Close panel
        }

        this.doFloorTap({floorId: this.currentFloorId});
    },
    // Undo if floorTap
    floorCallBack: function(floorId) {
        this.$['Floor_' + floorId + '_Name'].isCallBack = true;
        this.$['Floor_' + floorId + '_Name'].triggerHandler('ontap');
    },
    zoneSettingShow: function(flag) {
        this.turnOnPanel = flag;

        if(this.flagPullOut !== flag) {
            this.flagPullOut = flag;
            this.$.ZoneSetting.setShowing(flag);
            this.$.ZoneSetting.render();
            if(flag == false) {
                this.currentSensorKey = -1;
            }
            this.doZoneSetting({open: flag});
        }
    },
    zoneSettingClose: function() {
        this.zoneSettingShow(false);
    },
    zoneAdd: function(inSender) {
        if(this.currentFloorId > -1) {
            // Button Disable
            inSender.disabled = true;

            var floorObject = this.floors.itemByID(this.currentFloorId);

            var fillColor = this.owner.fillColor ? this.owner.fillColor : SITE_SETTING.fillColor;
            this.fillColor = utils.colorHsvIncrementing(fillColor, SITE_SETTING.hue, SITE_SETTING.saturation, SITE_SETTING.brightness);

            // Add to plZoneList
            var zone = new ZONE(
                this.currentFloorId,
                'Zone ' + (floorObject.zones.count + 1),
                this.fillColor
            );

            plZoneList.add(zone, true);
            // Add to plProject
            floorObject.zones.add(zone);

            // Render Node
            var node = this.$['Floor_' + this.currentFloorId + '_Content'].createComponent({
                name: 'Zone_' + this.currentFloorId + '_' + zone.id,
                kind: plSiteInput,
                tag: 'li',
                floorId: this.currentFloorId,
                zoneId: zone.id,
                oldZoneId: this.oldZoneId,
                currentZoneId: this.currentZoneId,
                classes: this.$['Floor_' + this.currentFloorId + '_Content'].children.length % 2 == 0 ? 'even' : 'odd',
                zoneObject: zone,
                value: 'Zone ' + (floorObject.zones.count),
                color: zone.color,
                ontap: 'zoneTap',
                ondblclick: 'zoneDblClick',
                onChanged: 'zoneChanged',
                onDelete: 'zoneRemove'
            }, {owner: this});

            node.render();
            //node.scrollToBottom();

            // Select zone
            node.isAddNew = true;
            node.triggerHandler('ontap');

            // Add Stack List
            STACK_LIST.addStack(
                this.owner.name,
                this.owner.name,
                STACK_TYPES.ENYO,
                STACK_METHODS.CREATE,
                node,
                undefined,
                this,
                'zoneRemoveCallBack'
            );

            // Waiting tapHandler - Pass onCheckInput
            setTimeout(function() {
                // Enable node input
                node.setEnable();

                // Button Enable
                inSender.disabled = false;
            }, 200);
        }
        
        // Automatically opens the zone panel when a new zone is added
        this.turnOnPanel = true;
        this.zoneSettingShow(true);
        this.ZoneListBullshit = false;
    },
    zoneChanged: function(inSender, inEvent) {
        // Update Floor
        var floorObject = this.floors.itemByID(inSender.floorId);
        var zoneObject = floorObject.zones.itemByID(inSender.zoneId);
        zoneObject.name = inEvent.value;
        // Update Zone Name
        this.$.ZoneName.setContent(inEvent.value);

        // Make zone list reorder-able
        floorObject.zones.sortAlphabet('name');
        this.$['Floor_' + inSender.floorId + '_Content'].sortAlphabet();
    },
    zoneRemove: function(inSender) {
        // Remove from list store
        this.floors.itemByID(inSender.floorId).zones.removeById(inSender.zoneId);
        // Destroy
        inSender.destroy();
    },
    zoneRemoveCallBack: function(inSender) {
        this.currentZoneId = inSender.currentZoneId;
        this.oldZoneId = inSender.oldZoneId;

        this.zoneSelect(inSender.currentZoneId);

        // Remove from list store
        this.floors.itemByID(inSender.floorId).zones.removeById(inSender.zoneId);
        // Destroy
        inSender.destroy();
    },
    zoneSelect: function(zoneId) {
        if(!!this.$['Zone_' + this.currentFloorId + '_' + zoneId]) {
            // Set zone name
            this.$.ZoneName.setContent(this.$['Zone_' + this.currentFloorId + '_' + zoneId].value);
            this.zoneActiveCurrent();
        } else {
            this.zoneSettingShow(false);
        }
    },
    zoneActiveCurrent: function() {
        // Remove Class
        if(!!this.floors.itemByID(this.oldFloorId) && this.floors.itemByID(this.oldFloorId).zones.count > 0) {
            for(var i = 0; i < this.floors.itemByID(this.oldFloorId).zones.count; i++) {
                var zone = this.floors.itemByID(this.oldFloorId).zones.item(i);
                if(this.$['Zone_' + this.oldFloorId + '_' + zone.id].hasClass('active')) {
                    this.$['Zone_' + this.oldFloorId + '_' + zone.id].removeClass('active');
                }
            }
        }
        // Active Class
        if(!!this.floors.itemByID(this.currentFloorId) && this.floors.itemByID(this.currentFloorId).zones.count > 0) {
            for(var i = 0; i < this.floors.itemByID(this.currentFloorId).zones.count; i++) {
                var zone = this.floors.itemByID(this.currentFloorId).zones.item(i);
                if(this.$['Zone_' + this.currentFloorId + '_' + zone.id].hasClass('active')) {
                    this.$['Zone_' + this.currentFloorId + '_' + zone.id].removeClass('active');
                }
            }
            if(!this.$['Zone_' + this.currentFloorId + '_' + this.currentZoneId].hasClass('active')) {
                this.$['Zone_' + this.currentFloorId + '_' + this.currentZoneId].addClass('active');
            }
            // Destroy Sensor List
            this.$.SensorList.destroyClientControls();
            // Add Sensor
            for(var i = 0, sensor; sensor = this.floors.itemByID(this.currentFloorId).zones.itemByID(this.currentZoneId).sensors.item(i); i++) {
                this.$.SensorList.createComponent({
                    name: 'Sensor_' + this.currentFloorId + '_' + this.currentZoneId + '_' + sensor.id,
                    kind: plSiteSensor,
                    title: sensor.name,
                    url: sensor.url,
                    floorId: this.currentFloorId,
                    zoneId: this.currentZoneId,
                    sensorKey: sensor.id,
                    sensorId: sensor.sensorId,
                    onSelect: 'sensorEnableOption',
                    onRemove: 'sensorRemove'
                }, {owner: this});
            }
            this.$.SensorList.render();
            // Hide option
            this.sensorDisableOption();
        }
    },
    zoneTap: function(inSender, inEvent) {
        // Add Stack List
        if(inSender.isfloorTap !== true && inSender.isAddNew !== true && inSender.isCallBack !== true) {
            STACK_LIST.addStack(
                this.owner.name,
                this.owner.name,
                STACK_TYPES.ENYO,
                STACK_METHODS.DEFAULT,
                inSender,
                {
                    currentZoneId: this.currentZoneId,
                    oldZoneId: this.oldZoneId
                },
                this,
                'zoneTapCallBack'
            );
        }

        if(inSender.isCallBack !== true) {
            this.oldZoneId = this.currentZoneId;
            this.currentZoneId = inSender.zoneId;
        }

        this.$.ZoneName.setContent(inSender.value);

        this.zoneActiveCurrent();
        this.sensorDisableOption();

        // Backup
        this.$['Floor_' + this.currentFloorId + '_Name'].currentZoneId = inSender.zoneId;
        this.$['Floor_' + this.currentFloorId + '_Name'].oldZoneId = inSender.oldZoneId;

        // Send Current Zone Info
        this.doZoneTap({
            floorId: inSender.floorId,
            zoneId: inSender.zoneId,
            color: inSender.color,
            sender: inSender
        });

        delete inSender.isfloorTap;
        delete inSender.isAddNew;
        delete inSender.isCallBack;
    },
    zoneTapCallBack: function(values) {
        this.currentZoneId = values.currentZoneId;
        this.oldZoneId = values.oldZoneId;

        this.$['Zone_' + this.currentFloorId + '_' + this.currentZoneId].isCallBack = true;
        this.$['Zone_' + this.currentFloorId + '_' + this.currentZoneId].triggerHandler('ontap');
    },
    zoneExisting: function(floorId, zoneId) {
        return !!this.$['Zone_' + floorId + '_' + zoneId];
    },
    // Show Panel List
    zoneDblClick: function(inSender) {
        //this.zoneSettingShow(true);
    },
    sensorAdd: function(data, type) {
        if(data.floorId === this.currentFloorId) {
            var zones = this.floors.itemByID(data.floorId).zones.itemByID(data.zoneId),
                sensors = zones.sensors;
            var sensor = new SENSOR(
                data.sensorId,
                data.zoneId,
                this.currentFloorId,
                data.name,
                data.classes,
                data.kind,
                data.type,
                66,
                data.url
            );

            plSensorList.add(sensor, true);
            this.currentSensorKey = sensor.id;

            // Add sensor
            sensors.add(sensor);

            // Draw
            var objectSensor, node;
            if(type === 'addToList') { // Drag to SensorList
                if((objectSensor = siteGraphic.createSensor2({
                        floorId: data.floorId,
                        zoneId: data.zoneId,
                        sensorId: data.sensorId,
                        name: data.name,
                        classes: data.classes,
                        kind: data.kind,
                        type: data.type,
                        url: data.url,
                        w: data.w,
                        h: data.h
                    }))) {
                    if(data.zoneId === this.currentZoneId) {
                        node = this.$.SensorList.createComponent({
                            name: 'Sensor_' + this.currentFloorId + '_' + data.zoneId + '_' + this.currentSensorKey,
                            kind: plSiteSensor,
                            title: sensor.name,
                            url: sensor.url,
                            floorId: this.currentFloorId,
                            zoneId: data.zoneId,
                            sensorId: sensor.sensorId,
                            sensorKey: sensor.id,
                            objectSensor: objectSensor,
                            onSelect: 'sensorEnableOption',
                            onRemove: 'sensorRemove'
                        }, {owner: this});

                        this.$.SensorList.render();
                    }
                }
            } else if(type === 'addToSVG') {  // Drag to SVG
                objectSensor = data.objectSensor;
                if(data.zoneId === this.currentZoneId) {
                    node = this.$.SensorList.createComponent({
                        name: 'Sensor_' + this.currentFloorId + '_' + data.zoneId + '_' + this.currentSensorKey,
                        kind: plSiteSensor,
                        title: sensor.name,
                        url: sensor.url,
                        floorId: this.currentFloorId,
                        zoneId: data.zoneId,
                        sensorId: sensor.sensorId,
                        sensorKey: sensor.id,
                        objectSensor: objectSensor,
                        onSelect: 'sensorEnableOption',
                        onRemove: 'sensorRemove'
                    }, {owner: this});

                    this.$.SensorList.render();
                }
            }

            // Add Stack List
            STACK_LIST.addStack(
                this.owner.name,
                this.owner.name,
                STACK_TYPES.ENYO,
                STACK_METHODS.DEFAULT,
                node,
                {
                    floorId: data.floorId,
                    zoneId: data.zoneId,
                    sensorKey: sensor.id,
                    sensorId: sensor.sensorId,
                    objectSensor: objectSensor
                },
                this,
                'sensorAddCallBack'
            );
        }
    },
    sensorAddCallBack: function(values) {
        // Remove Form Store List
        if(this.floors.itemByID(values.floorId).zones.itemByID(values.zoneId)) {
            this.floors.itemByID(values.floorId).zones.itemByID(values.zoneId).sensors.removeById(values.sensorKey);
        }
        plSensorList.removeById(values.sensorKey);

        // Remove SVG Object
        siteGraphic.removeSensorByObject(values.objectSensor);

        // Remove sensor from list
        if(values.floorId == this.currentFloorId && values.zoneId == this.currentZoneId) {
            for(var i = 0; i < this.$.SensorList.children.length; i++) {
                if(this.$.SensorList.children[i].sensorKey === values.sensorKey) {
                    this.$.SensorList.children[i].destroy();
                    break;
                }
            }

            this.$.SensorList.render();
        }

        // Hide option
        this.sensorDisableOption();
    },
    sensorRemove: function(inSender, inEvent) {
        var floorId = this.currentFloorId,
            zoneId = this.currentZoneId,
            sensorId;
        if(inSender.floorId != undefined) {
            floorId = inSender.floorId;
        }
        if(inSender.zoneId != undefined) {
            zoneId = inSender.zoneId;
        }
        if(inSender.sensorId != undefined) {
            sensorId = inSender.sensorId;
        }
        if(sensorId != undefined) {
            // Remove sensor from store
            for(var i = 0; i < this.floors.itemByID(floorId).zones.itemByID(zoneId).sensors.count; i++) {
                var sensor = this.floors.itemByID(floorId).zones.itemByID(zoneId).sensors.item(i);
                if(sensor.sensorId == sensorId) {
                    this.floors.itemByID(floorId).zones.itemByID(zoneId).sensors.remove(sensor);
                    break;
                }
            }

            // Remove sensor from list
            if(floorId == this.currentFloorId && zoneId == this.currentZoneId) {
                for(var i = 0; i < this.$.SensorList.children.length; i++) {
                    if(this.$.SensorList.children[i].sensorId === sensorId) {
                        this.$.SensorList.children[i].destroy();
                        break;
                    }
                }
                this.$.SensorList.render();
            }

            // Hide option
            this.sensorDisableOption();

            // Remove sensor from panel => Remove SVG and add to Stack list
            if(!!inEvent) {
                siteGraphic.removeSensorByOption({
                    floorId: floorId,
                    zoneId: zoneId,
                    sensorId: sensorId
                });
            }
        }
    },
    // Change zone parent for sensor in floor
    sensorChangeParent: function(option) {
        var sensorId = option.sensorId,
            from = option.from,
            to = option.to,
            sensor;

        var formZones = this.floors.itemByID(from.floorId).zones.itemByID(from.zoneId);
        var toZones = this.floors.itemByID(to.floorId).zones.itemByID(to.zoneId);

        // Remove From List
        for(var i = 0; i < formZones.sensors.count; i++) {
            if(formZones.sensors.item(i).sensorId === sensorId) {
                sensor = formZones.sensors.item(i);
                formZones.sensors.remove(sensor);
                break;
            }
        }

        if(!!sensor) {
            // Remove sensor from list
            if(from.floorId == this.currentFloorId && from.zoneId == this.currentZoneId) {
                for(var i = 0; i < this.$.SensorList.children.length; i++) {
                    if(this.$.SensorList.children[i].sensorId === sensor.sensorId) {
                        this.$.SensorList.children[i].destroy();
                        break;
                    }
                }

                this.$.SensorList.render();
            }

            // Add sensor to list
            if(to.floorId == this.currentFloorId && to.zoneId == this.currentZoneId) {
                this.$.SensorList.createComponent({
                    name: 'Sensor_' + this.currentFloorId + '_' + this.zoneId + '_' + sensor.id,
                    kind: plSiteSensor,
                    title: sensor.name,
                    url: sensor.url,
                    floorId: this.currentFloorId,
                    zoneId: this.currentZoneId,
                    sensorId: sensor.sensorId,
                    sensorKey: sensor.id,
                    onSelect: 'sensorEnableOption',
                    onRemove: 'sensorRemove'
                }, {owner: this});

                this.$.SensorList.render();
            }

            // Add New parent
            toZones.sensors.add(sensor);
        }
    },
    sensorUpdateOption: function(option) {
        this.$.SensorOptionOpt.setContent(option.opt);
        this.$.SensorOptionCoefficientA.setValue(option.coefficientA);
        this.$.SensorOptionCoefficientB.setValue(option.coefficientB);
    },
    sensorHandleOption: function(inSender, inEvent) {
        var sensors = this.floors.itemByID(this.currentFloorId).zones.itemByID(this.currentZoneId).sensors,
            sensor;
        for(var i = 0; i < sensors.count; i++) {
            if(sensors.item(i).id === this.currentSensorKey) {
                sensor = sensors.item(i);
                break;
            }
        }
        if(!!sensor) {
            switch(inSender.name) {
                case 'pickerDecorator':
                    sensor.option.opt = inSender.activator.content;
                    break;
                case 'SensorOptionCoefficientA':
                    sensor.option.coefficientA = inSender.getValue();
                    break;
                case 'SensorOptionCoefficientB':
                    sensor.option.coefficientB = inSender.getValue();
                    break;
            }
        }
    },
    // Add Active Class
    sensorActiveCurrent: function() {
        for(var i = 0; i < this.$.SensorList.children.length; i++) {
            if(this.$.SensorList.children[i].sensorKey === this.currentSensorKey) {
                if(!this.$.SensorList.children[i].hasClass('active')) {
                    this.$.SensorList.children[i].addClass('active');
                }
            } else {
                if(this.$.SensorList.children[i].hasClass('active')) {
                    this.$.SensorList.children[i].removeClass('active');
                }
            }
        }
    },
    sensorEnableOption: function(inSender) {
        this.currentSensorKey = inSender.sensorKey;
        this.$.SensorName.setContent(inSender.title);
        var sensors = this.floors.itemByID(inSender.floorId).zones.itemByID(inSender.zoneId).sensors,
            sensor,
            index = 0;
        for(var i = 0; i < sensors.count; i++) {
            if(sensors.item(i).id === inSender.sensorKey) {
                sensor = sensors.item(i);
                index = i;
                break;
            }
        }
        if(!!sensor) {
            this.sensorUpdateOption(sensor.option);
            this.sensorActiveCurrent();
            // Option Animation
            this.$.SensorOption.show();
            var optionAni = new Animator({
                duration: 500,
                startValue: 0,
                endValue: 300,
                onStep: bind(this, function(data) {
                    this.$.SensorOption.applyStyle('top', Math.floor(this.zoneSettingContentHeight - data.value) + 'px');
                }),
                onEnd: bind(this, function() {
                })
            });
            optionAni.play();
            // Line Animation
            var itemHeight = utils.getCSSProperty(inSender, 'offsetHeight', false);
            var itemTop = itemHeight * index + itemHeight / 3;
            var sensorLineTop = Math.floor(this.zoneSettingNameHeight + itemTop);
            this.$.SensorLine.applyStyle('height', '0px');
            this.$.SensorLine.applyStyle('top', sensorLineTop + 'px');
            this.$.SensorLine.show();
            var lineAni = new Animator({
                duration: 500,
                startValue: 0,
                endValue: Math.floor(this.zoneSettingContentHeight - 300),
                onStep: bind(this, function(data) {
                    this.$.SensorLine.applyStyle('height', data.value + 'px');
                }),
                onEnd: bind(this, function() {
                })
            });
            lineAni.play();
        }
    },
    sensorDisableOption: function() {
        // Available
        var optionTop = utils.getCSSProperty(this.$.SensorOption, 'offsetTop', false);
        var optionHeight = utils.getCSSProperty(this.$.SensorOption, 'offsetHeight', false);
        var lineHeight = utils.getCSSProperty(this.$.SensorLine, 'offsetHeight', false);

        // Option Animation
        var optionAni = new Animator({
            duration: 200,
            startValue: optionTop,
            endValue: optionHeight,
            onStep: bind(this, function(data) {
                this.$.SensorOption.applyStyle('top', data.value + 'px');
            }),
            onEnd: bind(this, function() {
                this.$.SensorOption.hide();
            })
        });
        optionAni.play();

        // Line Animation
        var lineAni = new Animator({
            duration: 300,
            startValue: lineHeight,
            endValue: 0,
            onStep: bind(this, function(data) {
                this.$.SensorLine.applyStyle('height', data.value + 'px');
            }),
            onEnd: bind(this, function() {
                this.$.SensorLine.hide();
            })
        });
        lineAni.play();

        // Reset
        this.currentSensorKey = -1;
    },
    sensorHideOption: function() {
        this.$.SensorOption.hide();
        this.$.SensorLine.hide();
    },
    offSensorOption: function(inSender, inEvent) {
        if(inEvent.offsetX <= 25 && inEvent.offsetY <= 30) {
            this.sensorDisableOption();
        }
    },
    optionDrawer: function(inSender, inEvent) {
        if(this.$[inSender.drawer].open === true) {
            inSender.removeClass('unactive');
        } else {
            inSender.addClass('unactive');
        }
        this.$[inSender.drawer].setOpen(!this.$[inSender.drawer].open);
    },

    //*** Public
    pFloorTap: function(floorId) {
        if(floorId !== this.currentFloorId) {
            this.$['Floor_' + floorId + '_Name'].triggerHandler('ontap');
        }
    },
    pSensorAddToSensorList: function(option) {
        option = option || {};

        // Check position in SensorList Panel
        if(utils.isInside(this.$.SensorList)) {
            if(this.currentFloorId > -1 && this.currentZoneId > -1) {
                option.floorId = this.currentFloorId;
                option.zoneId = this.currentZoneId;

                this.sensorAdd(option, 'addToList');

                return true;
            }
        } else {
            // Check menu
            if(!!this.$['Floor_' + this.currentFloorId + '_Content']) {
                var node;
                for(var i = 0; i < this.$['Floor_' + this.currentFloorId + '_Content'].children.length; i++) {
                    if(utils.isInside(this.$['Floor_' + this.currentFloorId + '_Content'].children[i])) {
                        node = this.$['Floor_' + this.currentFloorId + '_Content'].children[i];
                    }
                }
                if(!!node) {
                    option.floorId = node.floorId;
                    option.zoneId = node.zoneId;

                    this.sensorAdd(option, 'addToList');

                    return true;
                }
            }
        }

        return false;
    }
});

},{'./input':'src/views/progress/site/input','./list-setting-content.js':'src/views/progress/site/list-setting-content','./sensor.js':'src/views/progress/site/sensor','../../../common/services/utils.js':'src/common/services/utils','../../../common/services/stack.js':'src/common/services/stack','../../../views/progress/site/graphic.js':'src/views/progress/site/graphic'}],'src/views/progress/system/pullout':[function (module,exports,global,require,request){
//

var kind = require('enyo/kind'),
    Signals = require('enyo/Signals');

var Drawer = require('onyx/Drawer'),
    FittableColumns = require('layout/FittableColumns'),
    FittableRows = require('layout/FittableRows'),
    FittableColumnsLayout = require('layout/FittableLayout').Columns,
    FittableRowsLayout = require('layout/FittableLayout').Rows,
    IconButton = require('onyx/IconButton'),
    Input = require('onyx/Input'),
    MenuBar = require('../../../components/menubar').MenuBar,
    MenuItem = require('../../../components/menubar').MenuItem,
    Picker = require('onyx/Picker'),
    PickerButton = require('onyx/PickerButton'),
    PickerDecorator = require('onyx/PickerDecorator'),
    Slideable = require('layout/Slideable');

var ZoneStackItem = kind({
    name: "pl.st.ZoneStackItem",
    published: {
        title: ''
    },
    create: function() {
        this.inherited(arguments);
        this.createComponents([
            {content: this.title},
            {classes: "remove", ontap: "remove"}
        ]);
    },
    remove: function() {
        this.destroy();
    }
});
exports.ZoneStackItem = ZoneStackItem;

var TankSettings = kind({
    name: "pl.st.TankSettings",
    kind: Slideable,
    layoutKind: FittableRowsLayout,
    min: 0,
    max: 200,
    value: 200,
    unit: "px",
    flag: false,
    showing: false,
    draggable: false,
    style: "right:0; position:absolute;",
    handlers: {
        onAnimateFinish: "animateFinish"
    },
    components: [
        {
            name: "MainContent", kind: FittableRows, fit: true, classes: "border-left",
            components: [
                {
                    kind: FittableRows, classes: "enyo-fit",
                    components: [
                        {classes: "heading-title", content: "TANK SETTINGS"},
                        {
                            classes: "box",
                            components: [
                                {classes: "title", content: "TANK INFORMATION"},
                                {
                                    classes: "box-content",
                                    components: [
                                        {classes: "item", content: "INPUT NAME"},
                                        {
                                            kind: Input,
                                            classes: "input-name",
                                            placeholder: "Stratification Tank",
                                            onchange: ""
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            classes: "box",
                            components: [
                                {classes: "title", content: "COMPONENT KIND"},
                                {
                                    classes: "box-content bg",
                                    components: [
                                        {classes: "item", content: "MANUFACTURER"},
                                        {
                                            kind: PickerDecorator,
                                            components: [
                                                {kind: PickerButton, classes: "option mfg", content: "MFG A"},
                                                {
                                                    kind: Picker, components: [
                                                    {content: "MFG A!"},
                                                    {content: "MFG A"},
                                                    {content: "MFG A"}
                                                ]
                                                }
                                            ]
                                        },
                                        {classes: "text-mode", content: "MODEL"},
                                        {
                                            kind: PickerDecorator,
                                            components: [
                                                {
                                                    kind: PickerButton,
                                                    classes: "option model",
                                                    content: "MODEL A"
                                                },
                                                {
                                                    kind: Picker,
                                                    components: [
                                                        {content: "MODEL A!"},
                                                        {content: "MODEL A"},
                                                        {content: "MODEL A"}
                                                    ]
                                                }
                                            ]
                                        },
                                        {classes: "text-volume", content: "VOLUME"},
                                        {
                                            layoutKind: FittableColumnsLayout,
                                            components: [
                                                {
                                                    kind: Input,
                                                    classes: "mfg-input",
                                                    placeholder: "80",
                                                    onchange: ""
                                                },
                                                {classes: "mfg-text", content: "GALLONS"}
                                            ]
                                        },
                                        {
                                            content: "ADVANCED OPTIONS",
                                            ontap: "drawerActivated",
                                            drawer: "DrawerAdvancedOption",
                                            classes: "heading-advanced-option"
                                        },
                                        {
                                            name: "DrawerAdvancedOption",
                                            kind: Drawer,
                                            open: true,
                                            classes: "drawer-advanced-option",
                                            components: [
                                                {classes: "text-variable-1", content: "VARIABLE 1"},
                                                {
                                                    layoutKind: FittableColumnsLayout,
                                                    classes: "input-control",
                                                    components: [
                                                        {
                                                            kind: Input,
                                                            classes: "mfg-input",
                                                            placeholder: "A",
                                                            onchange: ""
                                                        },
                                                        {classes: "mfg-text", content: "UNITS"}
                                                    ]
                                                },
                                                {classes: "text-variable-2", content: "VARIABLE 2"},
                                                {
                                                    layoutKind: FittableColumnsLayout,
                                                    classes: "input-control",
                                                    components: [
                                                        {
                                                            kind: Input,
                                                            classes: "mfg-input",
                                                            placeholder: "B",
                                                            onchange: ""
                                                        },
                                                        {classes: "mfg-text", content: "UNITS"}
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {name: "Footer", classes: "footer"}
    ],
    handleResize: function() {
        this.inherited(arguments);
        if(document.body.clientWidth <= 768) this.max = this.value = 150;
        else this.max = this.value = 200;
    },
    toggle: function(flag) {
        if(this.flag != flag) {
            this.show();
            if(flag === true) this.animateToMin();
            else this.animateToMax();
            this.flag = flag;
        }
    },
    valueChanged: function() {
        this.inherited(arguments);
    },
    animateFinish: function() {
        if(this.isAtMax()) this.hide();
    },
    drawerActivated: function(inSender, inEvent) {
        if(this.$[inSender.drawer].open === true) {
            inSender.addClass("unactive");
        }
        else if(inSender.hasClass("unactive")) {
            inSender.removeClass("unactive");
        }

        this.$[inSender.drawer].setOpen(!this.$[inSender.drawer].open);
    }
});
exports.TankSettings = TankSettings;

var ZoneSettings = kind({
    name: "pl.st.ZoneSettings",
    kind: Slideable,
    layoutKind: FittableColumnsLayout,
    min: 0,
    max: 450,
    value: 450,
    unit: "px",
    flag: false,
    showing: false,
    draggable: false,
    style: "right:0; position:absolute",
    handlers: {
        onAnimateFinish: "animateFinish"
    },
    components: [
        {
            kind: FittableRows, classes: "zone-manifold-settings",
            components: [
                {
                    name: "MainSetting", kind: FittableRows, fit: true, classes: "border-left",
                    components: [
                        {
                            name: "MainSettingContent", kind: FittableRows, classes: "enyo-fit",
                            components: [
                                {classes: "heading-title", content: "ZONE MANIFOLD SETTINGS"},
                                {
                                    classes: "box",
                                    components: [
                                        {classes: "title", content: "MANIFOLD INFORMATION"},
                                        {
                                            classes: "box-content",
                                            components: [
                                                {classes: "item", content: "NAME"},
                                                {kind: Input, placeholder: "HYDRONIC MANIFOLD", onchange: ""}
                                            ]
                                        }
                                    ]
                                },
                                {
                                    name: "ZoneTable", classes: "box",
                                    onmouseover: "handleMouseOver",
                                    components: [
                                        {classes: "title", content: "ZONES"},
                                        {
                                            classes: "box-content",
                                            components: [
                                                {classes: "zone-table-name", content: "ZONES"},
                                                {
                                                    name: "ZoneStack",
                                                    kind: FittableRows,
                                                    classes: "zone-table-content",
                                                    components: []
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {name: "Footer", classes: "footer"}
            ]
        },
        {
            kind: FittableRows, classes: "zone-list box-shadow",
            components: [
                {
                    name: "ZoneList", kind: FittableRows, fit: true, classes: "border-left",
                    components: [
                        {
                            kind: FittableRows, classes: "enyo-fit",
                            components: [
                                {classes: "heading-title", content: "ZONE LIST"},
                                {
                                    name: "MenuBar",
                                    kind: MenuBar,
                                    fit: true,
                                    classes: "menu",
                                    onItemTap: "handleTap",
                                    onItemDrag: "handleDrag",
                                    resizeContent: false,
                                    contentComponents: dataMenuSystem()
                                }
                            ]
                        }
                    ]
                },
                { kind: FittableColumns, classes: "footer", components: [
                    { classes: "action", components:[
                        {kind: IconButton, classes: 'btn btn-add-new', ontap: ''}
                    ]}
                ]}
            ]
        }
    ],
    rendered: function() {
        this.inherited(arguments);
        // Temp
        this.$.ZoneStack.destroyClientControls();
        this.addZoneStack({content:'ENTRY'});
        this.addZoneStack({content:'DINING'});
        this.addZoneStack({content:'SITTING'});
        this.addZoneStack({content:'KITCHEN'});
        this.addZoneStack({content:'LIVING'});
        this.addZoneStack({content:'EXERCISE'});
        this.addZoneStack({content:'ART STUDIO'});
        this.addZoneStack({content:'BATH'});
    },
    handleResize: function() {
        this.inherited(arguments);
        if(document.body.clientWidth <= 768) {
            this.max = this.value = 350;
        } else {
            this.max = this.value = 450;
        }
    },
    toggle: function(flag) {
        if(this.flag != flag) {
            this.show();
            if(flag === true) this.animateToMin();
            else this.animateToMax();
            this.flag = flag;
        }
    },
    valueChanged: function() {
        this.inherited(arguments);
    },
    animateFinish: function() {
        if(this.isAtMax()) {
            this.hide();
        }
        if(this.isAtMin()) { // Fix size
            var height = utils.getCSSProperty(this.$.MainSettingContent, "offsetHeight", false);
            for(var i = 0; i < this.$.MainSettingContent.children.length - 1; i++) {
                height -= utils.getCSSProperty(this.$.MainSettingContent.children[i], "offsetHeight", false);
            }
            height -= 100;
            this.$.ZoneStack.applyStyle("height", height + "px");
        }
    },
    handleDrag: function(inSender, inEvent) {
        if(inEvent.type == "dragstart") {
            this.itemSender = inEvent.originator;
            this.offset = $('#' + this.itemSender.getId()).offset();
            this.offset.x = inEvent.pageX - this.offset.left;
            this.offset.y = inEvent.pageY - this.offset.top;
            var pos = {
                x: inEvent.pageX - this.offset.x,
                y: inEvent.pageY - this.offset.y
            };
            Signals.send("onDragItem", {content: this.itemSender.content, pos: pos, classes: "file-popup"});
            Signals.send("onDragItem", {showing: true});
        } else if(inEvent.type == "drag") {
            var pos = {
                x: inEvent.pageX - this.offset.x,
                y: inEvent.pageY - this.offset.y
            };
            Signals.send("onDragItem", {pos: pos});
        } else if(inEvent.type == "dragfinish") {
            this.isDragFinish = true;
            Signals.send("onDragItem", {showing: false});
        }
    },
    handleMouseOver: function() {
        if(this.itemSender != undefined && this.isDragFinish === true) {
            this.addZoneStack(this.itemSender);

            this.itemSender = undefined;
            this.isDragFinish = false;
        }
    },
    addZoneStack: function(info) {
        this.$.ZoneStack.createComponent({kind: ZoneStackItem, title: info.content});
        this.$.ZoneStack.render();

        //$("#" + this.$.ZoneStack.getId()).sortable();
    }
});
exports.ZoneSettings = ZoneSettings;

function dataMenuSystem() {
    return [
        ["1ST FLOOR ZONES", [
            {
                kind: MenuItem,
                classes: "odd",
                title: "OFFICE",
                ontap: "handleItemTap",
                ondragstart: "handleItemDrag",
                ondrag: "handleItemDrag",
                ondragfinish: "handleItemDrag"
            },
            {
                kind: MenuItem,
                classes: "even",
                title: "OFFICE 2",
                ontap: "handleItemTap",
                ondragstart: "handleItemDrag",
                ondrag: "handleItemDrag",
                ondragfinish: "handleItemDrag"
            },
            {
                kind: MenuItem,
                classes: "odd",
                title: "BATH",
                ontap: "handleItemTap",
                ondragstart: "handleItemDrag",
                ondrag: "handleItemDrag",
                ondragfinish: "handleItemDrag"
            },
            {
                kind: MenuItem,
                classes: "even",
                title: "ENTRY",
                ontap: "handleItemTap",
                ondragstart: "handleItemDrag",
                ondrag: "handleItemDrag",
                ondragfinish: "handleItemDrag"
            },
            {
                kind: MenuItem,
                classes: "odd",
                title: "RECEPTION",
                ontap: "handleItemTap",
                ondragstart: "handleItemDrag",
                ondrag: "handleItemDrag",
                ondragfinish: "handleItemDrag"
            }
        ]],
        ["2ND FLOOR ZONES", [
            {
                kind: MenuItem,
                classes: "odd",
                title: "OFFICE",
                ontap: "handleItemTap",
                ondragstart: "handleItemDrag",
                ondrag: "handleItemDrag",
                ondragfinish: "handleItemDrag"
            },
            {
                kind: MenuItem,
                classes: "even",
                title: "OFFICE 2",
                ontap: "handleItemTap",
                ondragstart: "handleItemDrag",
                ondrag: "handleItemDrag",
                ondragfinish: "handleItemDrag"
            },
            {
                kind: MenuItem,
                classes: "odd",
                title: "BATH",
                ontap: "handleItemTap",
                ondragstart: "handleItemDrag",
                ondrag: "handleItemDrag",
                ondragfinish: "handleItemDrag"
            },
            {
                kind: MenuItem,
                classes: "even",
                title: "ENTRY",
                ontap: "handleItemTap",
                ondragstart: "handleItemDrag",
                ondrag: "handleItemDrag",
                ondragfinish: "handleItemDrag"
            },
            {
                kind: MenuItem,
                classes: "odd",
                title: "RECEPTION",
                ontap: "handleItemTap",
                ondragstart: "handleItemDrag",
                ondrag: "handleItemDrag",
                ondragfinish: "handleItemDrag"
            }
        ]],
        ["3RD FLOOR ZONES", [
            {
                kind: MenuItem,
                classes: "odd",
                title: "OFFICE",
                ontap: "handleItemTap",
                ondragstart: "handleItemDrag",
                ondrag: "handleItemDrag",
                ondragfinish: "handleItemDrag"
            },
            {
                kind: MenuItem,
                classes: "even",
                title: "OFFICE 2",
                ontap: "handleItemTap",
                ondragstart: "handleItemDrag",
                ondrag: "handleItemDrag",
                ondragfinish: "handleItemDrag"
            },
            {
                kind: MenuItem,
                classes: "odd",
                title: "BATH",
                ontap: "handleItemTap",
                ondragstart: "handleItemDrag",
                ondrag: "handleItemDrag",
                ondragfinish: "handleItemDrag"
            },
            {
                kind: MenuItem,
                classes: "even",
                title: "ENTRY",
                ontap: "handleItemTap",
                ondragstart: "handleItemDrag",
                ondrag: "handleItemDrag",
                ondragfinish: "handleItemDrag"
            },
            {
                kind: MenuItem,
                classes: "odd",
                title: "RECEPTION",
                ontap: "handleItemTap",
                ondragstart: "handleItemDrag",
                ondrag: "handleItemDrag",
                ondragfinish: "handleItemDrag"
            }
        ]]
    ];
}

},{'../../../components/menubar':'src/components/menubar'}],'src/views/progress/interface/control-pullout':[function (module,exports,global,require,request){
//

var kind = require('enyo/kind');

var FittableRowsLayout = require('layout/FittableLayout').Rows,
    FittableRows = require('layout/FittableRows'),
    FittableColumns = require('layout/FittableColumns'),
    Picker = require('onyx/Picker'),
    Drawer = require('onyx/Drawer'),
    Checkbox = require('onyx/Checkbox'),
    Slideable = require('layout/Slideable'),
    PickerDecorator = require('onyx/PickerDecorator'),
    PickerButton = require('onyx/PickerButton');

var utils = require('../../../common/services/utils.js');

var Control = module.exports = kind({
    name: "pl.it.po.Control",
    kind: Slideable,
    layoutKind: FittableRowsLayout,
    min: 0,
    max: 200,
    value: 200,
    unit: "px",
    flag: false,
    showing: false,
    style: "right:0; position:absolute",
    classes: "control box-shadow",
    handlers: {
        onAnimateFinish: "animateFinish"
    },
    events: {
        onUpdate: ""
    },
    components: [
        {classes: "heading-title border-left", content: "FLOOR ZONE CONTROL"},
        {
            name: "MainContent", kind: FittableRows, classes: "border-left", style: "overflow:hidden",
            components: [
                {classes: "title", content: "ZONE CONTROL SETUP"},
                {
                    kind: FittableRows, classes: "zone-content",
                    components: [
                        {classes: "name", content: "FLOOR"},
                        {
                            name: "FloorPicker", kind: PickerDecorator, onChange: "valueUpdate",
                            components: [
                                {
                                    name: "FloorPickerButton",
                                    kind: PickerButton,
                                    classes: "bt-floor",
                                    content: "1ST FLOOR"
                                },
                                {name: "FloorPickerContent", kind: Picker}
                            ]
                        },
                        {classes: "drawer-zone-heading", content: "ADVANCED OPTIONS", ontap: "drawerActivated", drawer: "DrawerAdvancedOption"},
                        {
                            name: "DrawerAdvancedOption",
                            kind: Drawer,
                            open: true,
                            classes: "drawer-zone-option",
                            components: [
                                {classes: "zone-name", content: "ZONES"},
                                {name: "ZoneList", classes: "zone-option"}
                            ]
                        }
                    ]
                }
            ]
        },
        {classes: "footer"}
    ],
    create: function() {
        this.inherited(arguments);
        for(var i = 1; i <= 3; i++) {
            this.$.FloorPickerContent.createComponent([
                {content: utils.getOrdinal(i) + " FLOOR"}
            ], {owner: this});
        }
        for(var i = 0; i < 10; i++) {
            this.$.ZoneList.createComponent([
                {
                    name: "ZoneItem-" + i,
                    kind: FittableColumns,
                    classes: (i % 2 == 0 ? "even" : "odd"),
                    components: [
                        {kind: Checkbox, classes: "checkbox-style3", checked: true, onchange: "zoneChanged"},
                        {fit: true, content: "ENTRY"}
                    ]
                }
            ], {owner: this});
        }
    },
    handleResize: function() {
        this.inherited(arguments);
    },
    toggle: function(flag) {
        if(this.flag != flag) {
            this.show();
            if(flag === true) this.animateToMin();
            else this.animateToMax();
            this.flag = flag;
        }
    },
    valueChanged: function() {
        this.inherited(arguments);
    },
    animateFinish: function() {
        if(this.isAtMax()) this.hide();
    },
    valueUpdate: function(inSender, inEvent) {
        this.doUpdate(inEvent);
    },
    drawerActivated: function(inSender, inEvent) {
        if(this.$[inSender.drawer].open === true) {
            inSender.addClass("unactive");
        } else if(inSender.hasClass("unactive")) {
            inSender.removeClass("unactive");
        }

        this.$[inSender.drawer].setOpen(!this.$[inSender.drawer].open);
    }
});

},{'../../../common/services/utils.js':'src/common/services/utils'}],'src/views/progress/interface/indicator-pullout':[function (module,exports,global,require,request){
//

var kind = require('enyo/kind');

var FittableLayout = require('layout/FittableLayout'),
    FittableRows = require('layout/FittableRows'),
    Slideable = require('layout/Slideable')
    IconButton = require('onyx/IconButton'),
    Picker = require('onyx/Picker'),
    PickerButton = require('onyx/PickerButton'),
    PickerDecorator = require('onyx/PickerDecorator'),
    ContextualPopup = require('onyx/ContextualPopup'),
    MenuDecorator = require('onyx/MenuDecorator'),
    ColorPicker = require('enyo-external/ColorPicker');


module.exports = kind({
    name: "pl.it.po.Indicator",
    kind: Slideable,
    layoutKind: FittableLayout.Rows,
    min: 0,
    max: 200,
    value: 200,
    unit: "px",
    flag: false,
    showing: false,
    style: "right:0; position:absolute",
    classes: "control box-shadow",
    handlers: {
        onAnimateFinish: "animateFinish"
    },
    events: {
        onUpdate: "", onColorPark: ""
    },
    components: [
        {classes: "heading-title border-left", content: "TEMPERATURE INDICATOR"},
        {
            name: "MainContent", kind: FittableRows, classes: "border-left", style: "overflow: hidden",
            components: [
                {classes: "title", content: "INDICATIOR SETUP"},
                {
                    kind: FittableRows, classes: "tein-content",
                    components: [
                        {classes: "name", content: "LOCATION"},
                        {
                            name: "LocationPicker", kind: PickerDecorator, onChange: "valueUpdate",
                            components: [
                                {
                                    name: "LocationPickerButton",
                                    kind: PickerButton,
                                    classes: "bt-floor",
                                    content: "OUTSIDE ZONE"
                                },
                                {
                                    name: "LocationPickerContent", kind: Picker,
                                    components: [
                                        {content: "1"},
                                        {content: "2"},
                                        {content: "3"}
                                    ]
                                }
                            ]
                        },
                        {
                            classes: "sensor",
                            components: [
                                {classes: "item-name", content: "SENSOR"},
                                {
                                    name: "SensorPicker",
                                    kind: PickerDecorator,
                                    onChange: "valueUpdate",
                                    components: [
                                        {
                                            name: "SensorPickerButton",
                                            kind: PickerButton,
                                            classes: "bt-sensor",
                                            content: "Kitchen Sensor"
                                        },
                                        {
                                            name: "SensorPickerContent", kind: Picker,
                                            components: [
                                                {content: "1"},
                                                {content: "2"},
                                                {content: "3"}
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {classes: "title", content: "COLOR"},
                {
                    classes: "tein-content", kind: FittableRows,
                    components: [
                        {
                            name: "ColorPicker", kind: PickerDecorator, onChange: "valueUpdate",
                            components: [
                                {
                                    name: "ColorPickerButton",
                                    kind: PickerButton,
                                    classes: "bt-temperature",
                                    content: "TEMPERATURE"
                                },
                                {
                                    name: "ColorPickerContent", kind: Picker,
                                    components: [
                                        {content: "1"},
                                        {content: "2"},
                                        {content: "3"}
                                    ]
                                }
                            ]
                        },
                        {
                            classes: "color",
                            components: [
                                {
                                    classes: "color-box",
                                    components: [
                                        {classes: "item-name", content: "MIN COLOR"},
                                        {
                                            kind: MenuDecorator, classes: "bt",
                                            components: [
                                                {
                                                    kind: IconButton, classes: "bt-select-color",
                                                    components: [
                                                        {
                                                            name: "MinColorContent",
                                                            classes: "min-color",
                                                            style: "background-color:#443ec6;"
                                                        }
                                                    ]
                                                },
                                                {
                                                    name: "MinColorContextualPopup",
                                                    kind: ContextualPopup,
                                                    classes: "color-picker-popup",
                                                    floating: true,
                                                    maxHeight: "500",
                                                    components: [
                                                        {
                                                            name: "MinColorPicker",
                                                            kind: ColorPicker,
                                                            drawer: "MinColorContent",
                                                            parentPopup: "MinColorContextualPopup",
                                                            color: "443ec6",
                                                            classes: "color-picker",
                                                            onColorPick: "colorPick",
                                                            onColorSlide: "colorPick",
                                                            onColorButton: "colorPick"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    classes: "color-box",
                                    components: [
                                        {classes: "item-name", content: "MAX COLOR"},
                                        {
                                            kind: MenuDecorator, classes: "bt",
                                            components: [
                                                {
                                                    kind: IconButton, classes: "bt-select-color",
                                                    components: [
                                                        {
                                                            name: "MaxColorContent",
                                                            classes: "max-color",
                                                            style: "background-color:#c8312a;"
                                                        }
                                                    ]
                                                },
                                                {
                                                    name: "MaxColorContextualPopup",
                                                    kind: ContextualPopup,
                                                    classes: "color-picker-popup",
                                                    floating: true,
                                                    maxHeight: "500",
                                                    components: [
                                                        {
                                                            name: "MaxColorPicker",
                                                            kind: ColorPicker,
                                                            drawer: "MaxColorContent",
                                                            parentPopup: "MaxColorContextualPopup",
                                                            color: "c8312a",
                                                            classes: "color-picker",
                                                            onColorPick: "colorPick",
                                                            onColorSlide: "colorPick",
                                                            onColorButton: "colorPick"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {classes: "footer"}
    ],
    create: function() {
        this.inherited(arguments);
    },
    handleResize: function() {
        this.inherited(arguments);
    },
    toggle: function(flag) {
        if(this.flag != flag) {
            this.show();
            if(flag === true) this.animateToMin();
            else this.animateToMax();
            this.flag = flag;
        }
    },
    valueChanged: function() {
        this.inherited(arguments);
    },
    animateFinish: function() {
        if(this.isAtMax()) this.hide();
    },
    valueUpdate: function(inSender, inEvent) {
        this.doUpdate(inEvent);
    },
    colorPick: function(inSender, inEvent) {
        switch(inEvent.type) {
            case "onColorPick":
                break;
            case "onColorSlide":
                break;
            case "onColorButton":
                this.doColorPark(inEvent);
                this.$[inSender.parentPopup].hide();
                break;
        }
        this.$[inSender.drawer].applyStyle("background-color", inEvent.originator.color);
    }
});

}],'src/views/progress/interface/user-input-pullout':[function (module,exports,global,require,request){
//

var kind = require('enyo/kind');

var FittableRows = require('layout/FittableRows'),
    FittableColumns = require('layout/FittableColumns'),
    FittableRowsLayout = require('layout/FittableLayout').Rows,
    Checkbox = require('onyx/Checkbox'),
    Input = require('onyx/Input'),
    Picker = require('onyx/Picker'),
    PickerDecorator = require('onyx/PickerDecorator'),
    PickerButton = require('onyx/PickerButton'),
    Signals = require('enyo/Signals'),
    Slideable = require('layout/Slideable');

module.exports = kind({
    name: "pl.it.po.UserInput",
    kind: Slideable,
    layoutKind: FittableRowsLayout,
    min: 0,
    max: 200,
    value: 200,
    unit: "px",
    flag: false,
    showing: false,
    style: "right:0; position:absolute",
    classes: "control box-shadow",
    handlers: {
        onAnimateFinish: "animateFinish"
    },
    events: {
        onUpdate: ""
    },
    components: [
        {name: "Header", classes: "heading-title border-left", content: "SNOWMELT SWITCH"},
        {
            name: "MainContent", kind: FittableRows, classes: "border-left", style: "overflow: hidden",
            components: [
                {classes: "title", content: "SWITCH SETUP"},
                {
                    kind: FittableRows, classes: "snowmelt-content",
                    components: [
                        {classes: "name", content: "INPUT NAME"},
                        {
                            name: "NameInput",
                            kind: Input,
                            clases: "switch-name",
                            placeholder: "Snowmelt",
                            oninput: "valueUpdate"
                        },
                        {
                            kind: FittableRows, classes: "switch-style",
                            components: [
                                {
                                    kind: FittableColumns, clases: "switch-style-checkbox",
                                    components: [
                                        {
                                            name: "PointerStyleCheckbox",
                                            kind: Checkbox,
                                            classes: "checkbox-style3",
                                            checked: true,
                                            onchange: "valueUpdate"
                                        },
                                        {classes: "switch-style-checkbox-name", content: "POINTER STYLE"}
                                    ]
                                },
                                {classes: "item-name", content: "POINTER ANGLE"},
                                {
                                    kind: FittableColumns, classes: "pointer-angle-input",
                                    components: [
                                        {
                                            name: "PointerAngleInput",
                                            kind: Input,
                                            clases: "switch-name",
                                            oninput: "valueUpdate"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {classes: "title", content: "SYSTEM TO TRIGGER"},
                {
                    kind: FittableRows, classes: "snowmelt-content",
                    components: [
                        {classes: "name", content: "SYSTEM"},
                        {
                            name: "SystemPicker", kind: PickerDecorator, onChange: "valueUpdate",
                            components: [
                                {
                                    name: "SystemPickerButton",
                                    kind: PickerButton,
                                    classes: "bt-system",
                                    content: "SNOW MELT"
                                },
                                {
                                    name: "SystemPickerContent", kind: Picker,
                                    components: [
                                        {content: "1"},
                                        {content: "2"},
                                        {content: "3"}
                                    ]
                                }
                            ]
                        },
                        {
                            classes: "trigger-action",
                            components: [
                                {classes: "item-name", content: "TRIGGER ACTION"},
                                {
                                    name: "TriggerActionPicker",
                                    kind: PickerDecorator,
                                    onChange: "valueUpdate",
                                    components: [
                                        {
                                            name: "TriggerActionPickerButton",
                                            kind: PickerButton,
                                            classes: "bt-trigger-action",
                                            value: true,
                                            content: "TURN ON"
                                        },
                                        {
                                            name: "TriggerActionPickerContent", kind: Picker,
                                            components: [
                                                {value: true, content: "TURN ON"},
                                                {value: false, content: "TURN OFF"}
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {classes: "title", content: "TIMER STYLE"},
                {
                    kind: FittableRows, classes: "snowmelt-content",
                    components: [
                        {
                            kind: FittableRows, classes: "switch-style",
                            components: [
                                {
                                    kind: FittableColumns, classes: "switch-style-checkbox",
                                    components: [
                                        {
                                            name: "TimerStyleCheckbox",
                                            kind: Checkbox,
                                            classes: "checkbox-style3",
                                            checked: true,
                                            onchange: "valueUpdate"
                                        },
                                        {classes: "switch-style-checkbox-name", content: "TIMER STYLE"}
                                    ]
                                },
                                {classes: "item-name", content: "DEFAULT TIME"},
                                {
                                    kind: FittableColumns, classes: "switch-style-picker",
                                    components: [
                                        {
                                            name: "TimeStylePicker",
                                            kind: PickerDecorator,
                                            onChange: "valueUpdate",
                                            components: [
                                                {
                                                    name: "TimeStylePickerButton",
                                                    kind: PickerButton,
                                                    content: "30"
                                                },
                                                {
                                                    name: "TimeStylePickerContent", kind: Picker, components: [
                                                    {content: "1"},
                                                    {content: "2"},
                                                    {content: "3"}
                                                ]
                                                }
                                            ]
                                        },
                                        {classes: "switch-style-checkbox-unit", content: "min"}
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {classes: "title", content: "PHYSICAL SWITCH"},
                {
                    kind: FittableRows, classes: "snowmelt-content",
                    components: [
                        {
                            kind: FittableRows, classes: "switch-style",
                            components: [
                                {
                                    kind: FittableColumns, classes: "switch-style-checkbox",
                                    components: [
                                        {
                                            name: "PhysicalSwitchCheckbox",
                                            kind: Checkbox,
                                            classes: "checkbox-style3",
                                            checked: true,
                                            onchange: "valueUpdate"
                                        },
                                        {classes: "switch-style-checkbox-name", content: "PHYSICAL SWITCH"}
                                    ]
                                },
                                {classes: "item-name", content: "KIND"},
                                {
                                    classes: "switch-style-picker", kind: FittableColumns,
                                    components: [
                                        {
                                            name: "PhysicalSwitchPicker",
                                            kind: PickerDecorator,
                                            onChange: "valueUpdate",
                                            components: [
                                                {
                                                    name: "PhysicalSwitchPickerButton",
                                                    classes: "bt-kind",
                                                    kind: PickerButton,
                                                    content: "2-WIRE"
                                                },
                                                {
                                                    name: "PhysicalSwitchPickerContent", kind: Picker,
                                                    components: [
                                                        {content: "1"},
                                                        {content: "2"},
                                                        {content: "3"}
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {classes: "footer"},
        {kind: Signals, onPointAngleUpdate: "onPointAngleUpdate"}
    ],
    create: function() {
        this.inherited(arguments);
    },
    handleResize: function() {
        this.inherited(arguments);
    },
    initData: function(snapObject) {
        this.snapObject = snapObject;
        this.snapInfo = snapObject.info;

        if(typeof this.snapInfo.pointerStyle === 'undefined') {
            this.snapInfo.pointerStyle = true;
        }
        if(typeof this.snapInfo.pointerAngle === 'undefined') {
            this.snapInfo.pointerAngle = 0;
        }
        if(typeof this.snapInfo.system === 'undefined') {
            this.snapInfo.system = "Snow melt";
        }
        if(typeof this.snapInfo.action === 'undefined') {
            this.snapInfo.action = false;
        }
        if(typeof this.snapInfo.timerStyle === 'undefined') {
            this.snapInfo.timerStyle = false;
        }
        if(typeof this.snapInfo.defaultTime === 'undefined') {
            this.snapInfo.defaultTime = 30;
        }

        // Build html
        this.$.Header.setContent(this.snapInfo.name + ' SWITCH');
        // Setup
        this.$.NameInput.setValue(this.snapInfo.name);
        this.$.PointerStyleCheckbox.setChecked(this.snapInfo.pointerStyle);
        this.$.PointerAngleInput.setValue(this.snapInfo.pointerAngle);
        // System
        this.$.SystemPicker.children[0].setContent(this.snapInfo.name.toUpperCase());
        if(this.snapInfo.action) {
            this.$.TriggerActionPicker.children[0].setContent('TURN ON');
        } else {
            this.$.TriggerActionPicker.children[0].setContent('TURN OFF');
        }
        // Time Style
        this.$.TimerStyleCheckbox.setChecked(this.snapInfo.timerStyle);
        this.$.TimeStylePicker.children[0].setContent(this.snapInfo.defaultTime);
        // Physical switch
        this.$.PhysicalSwitchCheckbox.setChecked(false);
        this.$.PhysicalSwitchPicker.children[0].setContent('2-WIRE');
    },
    toggle: function(flag, snapObject) {
        if(!!snapObject) {
            this.initData(snapObject);
        }
        if(this.flag != flag) {
            this.show();
            if(flag === true) {
                this.animateToMin();
            } else {
                this.animateToMax();
            }
            this.flag = flag;
        }
    },
    valueChanged: function() {
        this.inherited(arguments);
    },
    animateFinish: function() {
        if(this.isAtMax()) this.hide();
    },
    valueUpdate: function(inSender, inEvent) {
        if(!this.snapInfo) {
            return false;
        }
        switch (inSender.name) {
            case 'NameInput':
                this.snapInfo.name = inSender.getValue();
                break;
            case 'PointerStyleCheckbox':
                this.snapInfo.pointerStyle = inSender.getChecked();
                this.snapObject.changeInfo('pointerStyle');
                break;
            case 'PointerAngleInput':
                var angle = parseInt(inSender.getValue());
                if(!utils.isNumber(angle)) {
                    angle = 0;
                }
                if(angle < 0) {
                    angle = 0
                } else if(angle > 360) {
                    angle = 360;
                }
                inSender.setValue(angle);
                this.snapInfo.pointerAngle = angle;
                // Redraw
                interfaceGraphic.setPointerAngle(this.snapInfo);

                break;
            case 'SystemPicker':
                //inSender.activator.getContent()
                break;
            case 'TriggerActionPicker':
                //inSender.activator.getContent()
                break;
            case 'TimerStyleCheckbox':
                this.snapInfo.timerStyle = inSender.getChecked();
                this.snapObject.changeInfo('timerStyle');
                break;
            case 'TimeStylePicker':
                break;
            case 'PhysicalSwitchCheckbox':
                break;
            case 'PhysicalSwitchPicker':
                break;
        }
        //this.doUpdate(inEvent);
    },
    onPointAngleUpdate: function(inSender, inEvent) {
        this.snapInfo.pointerAngle = inEvent.pointerAngle;
        this.$.PointerAngleInput.setValue(this.snapInfo.pointerAngle);
    }
});

}],'src/views/progress/commission/sidebar':[function (module,exports,global,require,request){
//

var kind = require('enyo/kind');

var FittableRows = require('layout/FittableRows'),
    FittableColumns = require('layout/FittableColumns');

var plCmSubMenuItem = require('./submenu.js').SubMenuItem,
    plCmSubMenu = require('./submenu.js').SubMenu;

var MenuItem = require('../../../components/menubar.js').MenuItem,
    Scroller = require('enyo/Scroller');

module.exports = kind({
    name: "pl.cm.SideBar",
    kind: FittableRows,
    classes: "widget enyo-fit setup",
    selected: -1,
    oldSelect: undefined,
    currentItem: undefined,
    components: [
        {classes: "heading-title", content: "ZONE LIST SETUP"},
        {
            fit: true, kind: FittableColumns,
            components: [
                {
                    name: "MenuMain", classes: "setup-menu", kind: FittableRows,
                    components: [
                        {name: "MenuContent", kind: FittableRows, fit: true}
                    ]
                },
                {
                    name: "Setting", fit: true, kind: FittableColumns, classes: "setup-submenu",
                    components: [
                        {
                            name: "SubMenu",
                            kind: Scroller,
                            touch: true,
                            horizontal: "hidden",
                            classes: "device-list enyo-fit"
                        }
                    ]
                }
            ]
        },
        {classes: "footer"}
    ],
    create: function() {
        this.inherited(arguments);
    },
    loadData: function() {
        var components = [];
        var controllerIndex = 0;
        for(var controllerId in DEVICE_LIST) {
            var controller = DEVICE_LIST[controllerId];
            var adapters = controller.adaptors;
            var adapterComponents = [];
            var adapterIndex = 0;
            for(var adapterId in adapters) {
                var adapter = adapters[adapterId];
                var sensors = adapter.sensors;
                var sensorComponents = [];
                var start = 1;
                for(var sensorIndex = 0; sensorIndex < sensors.length; sensorIndex++) {
                    var sensor = sensors[sensorIndex];

                    var currentValue = '';
                    if(sensor.sensor.kind === SENSOR_KINDS.TEMPERATURE) {
                        currentValue = sensor.sensor.currentValue + "°F";
                    } else if(sensor.sensor.kind === SENSOR_KINDS.HUMIDITY) {
                        currentValue = sensor.sensor.currentValue + "%";
                    }

                    /* Hack code */
                    if(sensorIndex == 1) {
                        sensorComponents.push(
                            {
                                kind: plCmSubMenuItem,
                                start: start,
                                quantity: sensor.sensor.type,
                                title: sensor.content,
                                value: "Error",
                                setting: "exit",
                                color: sensor.color,
                                info: sensor.sensor,
                                style: "z-index:" + (sensorIndex + 1)
                            }
                        );
                    } else if(sensorIndex == 2) {
                        sensorComponents.push(
                            {
                                kind: plCmSubMenuItem,
                                start: start,
                                quantity: sensor.sensor.type,
                                title: sensor.content,
                                value: currentValue,
                                setting: "setting",
                                color: sensor.color,
                                info: sensor.sensor,
                                style: "z-index:" + (sensorIndex + 1)
                            }
                        );
                    } else {
                        sensorComponents.push(
                            {
                                kind: plCmSubMenuItem,
                                start: start,
                                quantity: sensor.sensor.type,
                                title: sensor.content,
                                value: currentValue,
                                setting: "apply",
                                color: sensor.color,
                                info: sensor.sensor,
                                style: "z-index:" + (sensorIndex + 1)
                            }
                        );
                    }
                    start += sensor.sensor.type;
                }

                // Default
                while(start <= 50) {
                    sensorComponents.push({kind: plCmSubMenuItem, start: start++, unused: true});
                }

                adapterComponents.push(
                    {
                        kind: MenuItem,
                        classes: (adapterIndex % 2 == 0) ? "even" : "odd",
                        title: adapter.title + "<span class='apply'></span>",
                        componentContents: sensorComponents,
                        ontap: "handleSubMenuTap"
                    }
                );
                adapterIndex++;
            }

            components.push({
                name: "Item_" + controllerIndex, index: controllerIndex, classes: "item", components: [
                    {
                        name: "Item_" + controllerIndex + "_Name",
                        content: controller.name,
                        index: controllerIndex,
                        classes: "item-name",
                        ontap: "handleMenuTap"
                    },
                    {
                        name: "Item_" + controllerIndex + "_Content",
                        tag: "ul",
                        showing: false,
                        components: adapterComponents
                    }
                ]
            });
            controllerIndex++;
        }

        // Check destroy
        this.$.MenuContent.destroyClientControls();
        this.$.MenuContent.createComponents(components, {owner: this});

        // Rebuild
        this.render();
        this.loaded = true;

        // Select default
        if(!!this.$["Item_0_Content"] && !!this.$["Item_0_Content"].children[0]) {
            this.selected = 0;
            this.selectItem(this.selected);
            this.handleSubMenuTap(this.$["Item_0_Content"].children[0]);
        }
    },
    rendered: function() {
        this.inherited(arguments);
    },
    handleResize: function() {
        this.inherited(arguments);
    },
    selectItem: function(index) {
        // Remove
        if(this.selected > -1) {
            this.$["Item_" + this.selected + "_Name"].removeClass("selected");
            this.$["Item_" + this.selected + "_Content"].hide()
        }
        // Select Item
        this.$["Item_" + index + "_Name"].addClass("selected");
        this.$["Item_" + index + "_Content"].show();
        this.selected = index;
    },
    disableItem: function(index) {
        this.$["Item_" + index + "_Name"].removeClass("selected");
        this.$["Item_" + index + "_Content"].hide()
        this.selected = -1;
    },
    handleMenuTap: function(inSender, inEvent) {
        if(inSender.hasClass("item-name") && this.selected != inSender.index) {
            this.selectItem(inSender.index);
        } else {
            this.disableItem(inSender.index);
        }
    },
    handleSubMenuTap: function(inSender) {
        if(this.currentItem != undefined) {
            if(this.currentItem.hasClass("active")) {
                this.currentItem.removeClass("active");
            }
        }
        // Save
        this.currentItem = inSender;
        // Active
        inSender.addClass("active");
        // Check destroy
        this.$.SubMenu.destroyClientControls();
        // Create component
        this.$.SubMenu.createComponent({
            kind: plCmSubMenu,
            componentContents: inSender.componentContents
        }, {owner: this});
        this.$.SubMenu.render();
    }
});

},{'./submenu.js':'src/views/progress/commission/submenu','../../../components/menubar.js':'src/components/menubar'}],'src/views/progress/setup/setup':[function (module,exports,global,require,request){
// PIPELINE - SETUP

var kind = require('enyo/kind'),
    Signals = require('enyo/Signals');

var FittableRows = require('layout/FittableRows'),
    FittableColumns = require('layout/FittableColumns'),
    Panels = require('layout/Panels'),
    CardArranger = require('layout/CardArranger');

var IconButton = require('onyx/IconButton');

var plSuBuilding = require('./building.js'),
    plSuSite = require('./site.js'),
//    plTabBar = require('../../views/progress/setup/setup'),
    plSuSubBreadcrumbs = require('./sub-breadcrumbs.js');

var utils = require('../../../common/services/utils.js');

var STACK_LIST = require('../../../common/services/stack.js').STACK_LIST;
var STACK_TYPES = require('../../../common/services/stack.js').STACK_TYPES;
var STACK_METHODS = require('../../../common/services/stack.js').STACK_METHODS;

module.exports = kind({
    name: "pl.SetupView",
    kind: FittableRows,
    classes: "form-setup",
    handlers: {
        ontap: "tapHandler"
    },
    components: [
        // SubMenuBar
        { name: "TabBar", kind: FittableRows, classes: "sub-menu-bar", components: [
            { name: "TabBarName", classes: "name", content: "CONTROL SYSTEM SETUP:"},
            //{ name: "TabBarContent", kind: plTabBar, style: "position: absolute;", classes: "tab-bar", path: ["SITE INFO", "BUILDING INFO"], onActivate: "tabActivated"},
            { name: "TabBarContent", kind: plSuSubBreadcrumbs, style: "position: absolute;", onActivate: "tabActivated" },
            { name: "TabBarChop", classes: "chop"}
        ]},
        // MainPanels
        { name: "MainPanels", kind: Panels, fit: true, index: 0, arrangerKind: CardArranger, draggable: false, narrowFit: false, realtimeFit: true, classes: "main-panels", onTransitionStart: "transitionStart", onTransitionFinish: "transitionFinish", components: [
            {name: "SiteInfo", kind: plSuSite, index: 0},
            {name: "BuildingInfo", kind: plSuBuilding, index: 1}
        ]},
        { name: "Footer", classes: "footer", components: [
            { name: "FooterContent", kind: FittableColumns, components: [
                { classes: "footer-status", content: "CLICK ON BUILDING INFO ARROW TO CONTINUE ...", fit: true},
                { kind: IconButton, name: "BtLocate", attributes: {title: ""}, classes: "bt bt-locate", ontap: "mapTap"},
                { kind: IconButton, name: "BtCurrentLocation", attributes: {title: ""}, classes: "bt bt-current-location", ontap: "mapTap"}
            ]}
        ]}
    ],
    constructor: function() {
        this.inherited(arguments);
        this.mapFlag = false;
    },
    create: function() {
        this.inherited(arguments);
    },
    rendered: function() {
        this.inherited(arguments);
        // Setting
        this.fixSubPipeLine();
    },
    init: function() {
        if(this.ready !== true) {
            this.ready = true;
            this.render();
            // Init google map
            this.$.SiteInfo.initGoogleMap();
        }
    },
    setProgress: function(percent) {
        Signals.send("onProgress", {page: APP_PROGRESS.PR_SETUP, key: 'SETUP', value: percent});
    },
    handleResize: function() {
        this.inherited(arguments);
        this.fixSubPipeLine();
    },
    //resizeComplete: function() {
    //    if(this.$.MainPanels.getActive() === this.$.BuildingInfo) {
    //        this.$.BuildingInfo.resizeComplete();
    //    }
    //},
    tapHandler: function(inSender, inEvent) {

    },
    tabActivated: function(inSender, inEvent) {
        this.$.MainPanels.undoed = false;
        this.$.MainPanels.setIndex(inEvent.originator.index);
    },
    transitionStart: function(inSender, inEvent) {
        if(inEvent.fromIndex != inEvent.toIndex) {
            if(this.$.TabBarContent.index != inEvent.toIndex) {
                this.$.TabBarContent.setActive(inEvent.toIndex)
            }
            if(inEvent.toIndex == 1) {
                this.$.BuildingInfo.createChart();
                this.$.FooterContent.hide()
            } else {
                this.$.FooterContent.show();
            }
        }
    },
    transitionFinish: function(inSender, inEvent) {
        if(inEvent.toIndex == 0) {
            this.$.SiteInfo.mapReLoad();
        } else if(inEvent.toIndex == 1) {
            this.$["BuildingInfo"].resize();
        }
        if(inEvent.fromIndex != inEvent.toIndex && !inSender.undoed) {
            STACK_LIST.addStack(
                this.name,
                this.name,
                STACK_TYPES.ENYO,
                STACK_METHODS.TRANSITION,
                inSender,
                inEvent.fromIndex
            );
        }
    },
    // Fix position for SubPipeLine
    fixSubPipeLine: function() {
        var offset = $('#' + this.parent.parent.$.Breadcrumb.$["Item_" + APP_PROGRESS.PR_SETUP].getId()).offset();
        var offsetLeft = offset.left;
        var offsetWidth = utils.getCSSProperty(this.parent.parent.$.Breadcrumb.$["Item_" + APP_PROGRESS.PR_SETUP], "offsetWidth", false);
        var tabBarNameWidth = utils.getCSSProperty(this.$.TabBarName, "offsetWidth", false);
        var tabBarChopWidth = utils.getCSSProperty(this.parent.parent.$.Chop, "offsetWidth", false);
        var tabBarContentWidth = utils.getCSSProperty(this.$.TabBarContent, "offsetWidth", false);
        // Set Position for chop
        this.parent.parent.$.Chop.applyStyle("left", ((offsetLeft + offsetWidth / 2 - tabBarChopWidth / 2 + 8) - 20) + "px");
        // Set Position for tab
        var left = ((offsetLeft + offsetWidth / 2 - tabBarContentWidth / 2 + 25) - 20);
        if(left < tabBarNameWidth + 10) {
            left = tabBarNameWidth + 10;
        }
        this.$.TabBarContent.applyStyle("left", left + "px");
    },
    mapTap: function(inSender) {
        if(this.$.MainPanels.getIndex() != 0) {
            return;
        }
        switch(inSender.name) {
            case "BtLocate":
                this.mapFlag = (this.mapFlag ? false : true);
                if(this.mapFlag) {
                    inSender.addClass("active");
                }
                else {
                    inSender.removeClass("active");
                }
                this.$.SiteInfo.$.GoogleMap.isClick = this.mapFlag;
                this.$.SiteInfo.$.GoogleMap.reLoad();
                break;
            case "BtCurrentLocation":
                this.$.SiteInfo.$.GoogleMap.setPanToCurrent();
                break;
        }
    },
    undo: function() {
        var stack = STACK_LIST.getStack(this.name);
        if(!!stack) {
            // Update
            if(!!this.$.SiteInfo.$[stack.sender.name] || stack.parent === this.$.SiteInfo) {
                this.$.SiteInfo.undo(stack);
            } else if(!!this.$.BuildingInfo.$[stack.sender.name] || stack.parent === this.$.BuildingInfo) {
                this.$.BuildingInfo.undo(stack);
            }
            STACK_LIST.undo(this.name);
        }
    }
});

},{'./building.js':'src/views/progress/setup/building','./site.js':'src/views/progress/setup/site','./sub-breadcrumbs.js':'src/views/progress/setup/sub-breadcrumbs','../../../common/services/utils.js':'src/common/services/utils','../../../common/services/stack.js':'src/common/services/stack'}],'src/views/progress/site/site':[function (module,exports,global,require,request){
//

var kind = require('enyo/kind'),
    Signals = require('enyo/Signals'),
    bind = require('enyo/utils').bind;

var FittableRows = require('layout/FittableRows'),
    FittableColumns = require('layout/FittableColumns'),
    Panels = require('layout/Panels'),
    CollapsingArranger = require('layout/CollapsingArranger');
var Button = require('onyx/Button'),
    Animator = require('enyo/Animator'),
    ColorPicker = require('enyo-external/ColorPicker'),
    ContextualPopup = require('onyx/ContextualPopup'),
    FileInputDecorator = require('enyo-external/FileInputDecorator'),
    Grabber = require('onyx/Grabber'),
    IconButton = require('onyx/IconButton'),
    MenuDecorator = require('onyx/MenuDecorator'),
    SideBar = require('../../../components/sidebar.js').SideBar,
    SideBarItem = require('../../../components/sidebar.js').SideBarItem,
    plSiteListSetting = require('./list-setting.js');

var utils = require('../../../common/services/utils.js');
var siteGraphic = require('../../../views/progress/site/graphic.js');

var STACK_LIST = require('../../../common/services/stack.js').STACK_LIST;
var STACK_TYPES = require('../../../common/services/stack.js').STACK_TYPES;
var STACK_METHODS = require('../../../common/services/stack.js').STACK_METHODS;

module.exports = kind({
    name: 'pl.SiteView',
    kind: FittableRows,
    classes: 'form-site',
    handlers: {
        ontap: 'tapHandler'
    },
    components: [
        { name: 'MainPanels', kind: Panels, fit: true, arrangerKind: CollapsingArranger, draggable: false, narrowFit: false, realtimeFit: true, classes: 'main-panels', onTransitionFinish: 'transitionFinish', components: [
            { name: 'LeftColumn', kind: FittableRows, classes: 'widget enyo-fit', components: [
                { name: 'SideBarWrapper', kind: FittableColumns, fit: true },
                { classes: 'footer'}
            ]},
            { name: 'MainColumn', kind: FittableRows, classes: 'panel enyo-fit box-shadow', components: [
                { content: 'ZONE LIST SETUP', classes: 'heading-title'},
                { name: 'ZoneList', fit: true, kind: FittableColumns, components: [
                    // Center Column
                    { name: 'ZoneListPanels', kind: FittableRows, fit: true, components: [
                        { name: 'ViewPortPanel', fit: true, style: 'overflow: hidden', classes: 'border-left border-right' },
                        { name: 'Footer', kind: FittableColumns, classes: 'footer', components: [
                            { kind: Grabber, attributes: {title: 'Collapsing'}, classes: 'bt bt-collapsing',
                                ontap: 'toggleFullScreen',
                                ondragstart: 'toggleFullScreen',
                                ondragfinish: 'toggleFullScreen'
                            },
                            { name: 'DrawerTools', showing: false, kind: FittableColumns, components: [
                                { name: 'ViewPortOff', kind: Button, content: 'BACK', attributes: {title: ''}, classes: 'bt bt-footer-default', ontap: 'viewPortTurnOff' },
                                { kind: FittableColumns, classes: 'box-group', components: [
                                    { kind: IconButton, name: 'bt-selector', attributes: {title: 'Selector/Move'}, classes: 'bt bt-move active', ontap: 'activeSelector'}
                                ]},
                                { kind: FittableColumns, classes: 'box-group', components: [
                                    { kind: IconButton, name: 'bt-polyline', attributes: {title: ''}, classes: 'bt bt-connector2', ontap: 'activeAddPolyLine'},
                                    { kind: IconButton, name: 'bt-rectangle', attributes: {title: ''}, classes: 'bt bt-rectangle', ontap: 'activeAddRectangle'},
                                    { kind: IconButton, name: 'bt-circle', attributes: {title: ''}, classes: 'bt bt-circle', ontap: 'activeAddCircle'},
                                    { kind: IconButton, name: 'bt-add-text', attributes: {title: 'Add Text'}, classes: 'bt bt-text', ontap: 'activeAddText'},
                                    { kind: MenuDecorator, classes: 'bt bt-fill-color', components: [
                                        { kind: IconButton, classes: 'bt bt-fill-color-button', ontap: 'colorTap', components: [
                                            { name: 'FillColorContent', classes: 'bt-fill-color-content', style: 'background-color:' + SITE_SETTING.fillColor }
                                        ]},
                                        { name: 'FillColorContextualPopup', kind: ContextualPopup, classes: 'color-picker-popup', floating: true, maxHeight: '500', components: [
                                            { name: 'FillColorPicker', kind: ColorPicker, drawer: 'FillColorContent', color: SITE_SETTING.fillColor.substr(1, 6), classes: 'color-picker',
                                                onColorPick: 'colorPick',
                                                onColorSlide: 'colorPick',
                                                onColorButton: 'colorPick'
                                            }
                                        ]}
                                    ]}
                                ]},
                                { kind: FittableColumns, classes: 'box-group', components: [
                                    { name: 'bt-zoom', kind: IconButton, attributes: {title: ''}, classes: 'bt bt-look', ontap: 'activeZoom'},
                                    { name: 'ZoomToFit', kind: IconButton, attributes: {title: 'Zoom to fit'}, classes: 'bt bt-max', ontap: 'activeZoomToFit'},
                                    { name: 'bt-move', kind: IconButton, attributes: {title: 'Move'}, classes: 'bt bt-min', ontap: 'activeMoving'}
                                ]}
                            ]},
                            { name: 'ViewPortOpen', kind: Button, content: 'EDIT PLAN VIEW', attributes: {title: ''}, classes: 'bt bt-footer-default', ontap: 'viewPortTurnOn' },
                            { fit: true },
                            { kind: FileInputDecorator, defaultClient: { kind: IconButton, content: ''}, attributes: {title: 'Up'}, classes: 'bt bt-up2', onSelect: 'floorAddImage'}
                        ]}
                    ]},
                    // Right Column
                    { name: 'ListSetting', kind: plSiteListSetting, classes: 'box-shadow',
                        onFloorTap: 'onFloorTap',
                        onZoneTap: 'onZoneTap',
                        onZoneSetting: 'onZoneSetting'
                    }
                ]}
            ]}
        ]}
    ],
    constructor: function() {
        this.inherited(arguments);
        this.ready = false;

        // available
        this.project = {};
        this.floors = new Collection();
        this.fillColor = SITE_SETTING.fillColor;

        // Transform Floor
        this.transformation = '';
        this.transformationA = '';

        // Transform SVG
        this.transformSvg = '';
        this.transformSvgA = '';
    },
    create: function() {
        this.inherited(arguments);

        // Available
        this.currentFloorId = undefined;
        this.oldFloorId = undefined;
    },
    rendered: function() {
        this.inherited(arguments);
        // Set graphic
        siteGraphic.panel = this;

        // Set tools
        this.tools = [
            this.$['bt-selector'],
            this.$['bt-polyline'],
            this.$['bt-rectangle'],
            this.$['bt-circle'],
            this.$['bt-add-text'],
            this.$['bt-zoom'],
            this.$['bt-move']
        ];
    },
    init: function() {
        var _self = this;

        this.dimension();

        if(this.ready !== true) {
            this.ready = true;
            this.render();

            // AddEventListener to Parent
            document.getElementById(this.getId()).addEventListener('dragover', function(e) {
                e.stopPropagation();
                e.preventDefault();
            }, false);

            document.getElementById(this.getId()).addEventListener('drop', function(e) {
                e.stopPropagation();
                e.preventDefault();
            }, false);

            // Init data
            //foldersService.find(PL.baseUrl + 'assets/jsons/site.json', {}, function(inSender, inResponse) {
            //    _self.initSideBar(inResponse);
            //});
            _self.initSideBar(SENSOR_LIST);

            // Init floor
            //foldersService.find(PL.baseUrl + 'assets/jsons/project.json', {}, function(inSender, inResponse) {
            //    _self.initFloors(inResponse);
            //});
            _self.initFloors(plProject);

            // Enable selector
            this.activeSelector();
        } else {
            // Hide DrawerTools
            this.$.DrawerTools.hide();
            // Show ViewPortOpen
            this.$.ViewPortOpen.show();

            // Disable view port
            this.$.ViewPortOff.triggerHandler('ontap');

            // Enable selector
            if(typeof this.toolStatus === 'function') {
                this.toolStatus();
            } else {
                this.activeSelector();
            }
        }

        // Reset
        siteGraphic.drawing = false;
        this.initColorPopup();

        // Reload for wiring page
        WIRING_SETTING.RELOAD = true;
    },
    setProgress: function(percent){
        Signals.send('onProgress', {page: APP_PROGRESS.PR_SITE, key: 'SITE_BUILDER', value: percent});
    },
    handleResize: function() {
        this.inherited(arguments);
    },
    resizeComplete: function() {
        if(this.ready === true) {
            this.dimension();

            // Floor Resize
            this.floorResize();

            this.resizeViewPort();

            // Set position attribute for svg
            this.initDrawAreaPositionByCollapse();
        }
    },
    // Set Dimension
    dimension: function() {
        this.contentWidth = utils.getCSSProperty(this.$.ViewPortPanel, 'offsetWidth', false);
        this.contentHeight = utils.getCSSProperty(this.$.ViewPortPanel, 'offsetHeight', false);

        // Check validation
        if(this.floors.count <= 1) return;

        this.floorWidth = this.contentWidth;
        this.floorHeight = Math.floor(this.contentHeight / (this.floors.count - 1));

        // Transform Floor
        this.transformation = 'scale(0.7, 2) rotateX(' + SITE_SETTING.rotateX + 'deg)';
        this.transformationA = 'scale(0.75, 2.05) rotateX(' + SITE_SETTING.rotateX + 'deg)';

        // Transform SVG
        this.transformSvg = 'scale(1, ' + this.floorHeight / this.contentHeight + ') translate(0, -' + this.contentHeight + 'px)';
        this.transformSvgA = 'scale(1, ' + this.floorHeight / this.contentHeight + ') translate(0, -' + this.contentHeight + 'px)';
    },
    // Listening mouse click event
    tapHandler: function(inSender, inEvent) {
        // FullScreen Control
        if(inEvent.originator.name == 'FullScreenButton') {
            var targetControl = this.$.MainPanels;
            // If _targetControl_ is currently fullscreen, cancel fullscreen
            if(targetControl.isFullscreen()) {
                targetControl.cancelFullscreen();
                // If _targetControl_ is not currently fullscreen, request fullscreen
            } else {
                targetControl.requestFullscreen();
            }
        }
    },
    // Init color popup
    initColorPopup: function() {
        $('#' + this.$.FillColorContextualPopup.getId()).remove();
        this.$.Footer.render();
    },
    // Init sidebar
    initSideBar: function(data) {
        // Destroy if children exist
        this.$.SideBarWrapper.destroyClientControls();
        // Create
        var contentComponents = new Array();
        for(var i = 0; i < data.length; i++) {
            var childComponents = new Array();
            for(var j = 0; j < data[i].sensors.length; j++) {
                childComponents.push({
                    kind: SideBarItem,
                    sensorId: data[i].sensors[j].id,
                    title: data[i].sensors[j].name,
                    image: data[i].sensors[j].url,
                    width: data[i].sensors[j].width,
                    height: data[i].sensors[j].height,
                    sensorInfo: data[i].sensors[j],
                    scale: 1.5,
                    ontap: 'handleItemTap',
                    ondrag: 'handleItemOnDrag',
                    ondragstart: 'handleItemDragStart',
                    ondragfinish: 'handleItemDragFinish'
                });
            }
            contentComponents.push([data[i].name, childComponents]);
        }
        this.$.SideBarWrapper.createComponent({
            name: 'SideBar',
            kind: SideBar,
            style: 'enyo-fit',
            touch: false,
            onSideBarDragStart: 'onSideBarDrag',
            onSideBarOnDrag: 'onSideBarDrag',
            onSideBarDragFinish: 'onSideBarDrag',
            contentComponents: contentComponents
        }, {owner: this});
        this.$.SideBarWrapper.render();
    },
    // Init Floor
    initFloors: function(data) {
        var _sef = this;

        // Init ZoneList
        this.$.ListSetting.init(data);

        // Init Floor Panel
        this.project = data;
        this.floors = data.floors;

        // Destroy if children exist
        this.$.ViewPortPanel.destroyClientControls();

        // Create
        for(var index = this.floors.count - 1; index > 0; index--) {
            var floor = this.floors.item(index);
            this.$.ViewPortPanel.createComponent({
                name: 'Floor_' + floor.id,
                kind: FittableRows,
                classes: 'floors',
                style: PREFIX.css + 'perspective: ' + SITE_SETTING.perspective + 'px',
                floorId: floor.id,
                info: floor,
                ontap: 'floorTap',
                components: [
                    { name: 'Floor_' + floor.id + '_Content', classes: 'level enyo-fit', components: [
                        { name: 'Floor_' + floor.id + '_Svg', tag: 'svg' },
                        { name: 'Floor_' + floor.id + '_Input', tag: 'input', attributes: {value: '', type: 'text'}, classes: 'enyo-input onyx-input insert-text', style: 'display:none'}
                    ]},
                    { name: 'Floor_' + floor.id + '_Name', classes: 'title', content: utils.getOrdinal(index) + ' FLOOR'}
                ]}, {owner: this});
        }

        // Render
        this.$.ViewPortPanel.render();
        this.$.Footer.render();

        // AddEventListener to Floor & Init Graphic
        for(var i = 0; i < this.$.ViewPortPanel.children.length; i++) {
            var floor = this.$.ViewPortPanel.children[i];

            // AddEventListener to Floor
            floor.node.addEventListener('dragover', function(e) {
                e.stopPropagation();
                e.preventDefault();
            }, false);

            floor.node.addEventListener('drop', function(e) {
                e.stopPropagation();
                e.preventDefault();
                var dt = e.dataTransfer;
                var files = dt.files;
                //var panel = e.target.attributes.panel.value;
                // Set background
                _sef.initFloorBackground(files);
            }, false);

            // Init Graphic
            siteGraphic.init(floor.info, this.$['Floor_' + floor.floorId + '_Svg'], this.$['Floor_' + floor.floorId + '_Input'], _sef.contentWidth, _sef.contentHeight);
        }

        // Select default
        if(this.$.ViewPortPanel.children.length > 0) {
            this.$.ViewPortPanel.children[0].triggerHandler('ontap');
        }

        // Resize
        this.resizeComplete();
    },
    // Set position attribute for svg
    initDrawAreaPositionByCollapse: function() {
        var offset = this.$.ViewPortPanel.getAbsoluteBounds();
        for(var index = this.floors.count - 1; index > 0; index--) {
            var floor = this.floors.item(index);
            this.$['Floor_' + floor.id + '_Svg'].setAttributes({offsetTop: offset.top, offsetLeft: offset.left});
        }
    },
    // Color for draw and color popup
    initAvailableDraw: function(option) {
        var color = (option.color ? option.color : '#ffffff');

        // Init popup color
        this.initColorPopup();

        // Set available
        this.currentFloorId = option.floorId;
        this.currentZoneId = option.zoneId;
        this.fillColor = color;

        siteGraphic.mAttributes.fill = utils.getRgbaString(color, SITE_SETTING.transparency);
        siteGraphic.selectShape(option.floorId, option.zoneId);
        siteGraphic.setAvailableDraw({
            color: siteGraphic.mAttributes.fill,
            floorId: option.floorId,
            zoneId: option.zoneId
        });

        this.$['FillColorContent'].applyStyle('background-color', color);
        this.$['FillColorPicker'].setColor(this.fillColor.substr(1, 6));
//FIXME: is this really removed in 2.7?        this.$['FillColorPicker'].load();
    },
    initFloorBackground: function(files) {
        var _self = this;
        var f = utils.getImageUrl(files);
        var floorId = this.currentFloorId;

        Signals.send('onLoading', {method: 'show'});

        f.then(function(result) {
            if(result) {
                if(siteGraphic.setBackground(result.url, result.width, result.height, _self.contentWidth, _self.contentHeight)) { // Success
                    _self.floorGridHasImage(floorId);
                } else {
                    console.info('Draw panel is not init');
                }
            }
            Signals.send('onLoading', {method: 'hide'});
        });
    },
    // Upload Image For Floor
    floorAddImage: function(inSender, inEvent) {
        if(this.$.ListSetting.currentFloorId == -1) {
            console.info('Draw panel is not init');

            return false;
        }

        this.initFloorBackground(inEvent.files);
    },
    floorTap: function(inSender) {
        if(siteGraphic.drawing !== true) {
            if(this.currentFloorId === inSender.floorId) { // Open draw panel
                if(!this.$['Floor_' + inSender.floorId].isOpenViewPort) {
                    this.$.ViewPortOpen.triggerHandler('ontap');
                }
            } else {
                // Remove selected
                for(var i = 0; i < this.$.ViewPortPanel.children.length; i++) {
                    var floorId = this.$.ViewPortPanel.children[i].floorId;
                    if(this.$['Floor_' + floorId].hasClass('active')) {
                        this.$['Floor_' + floorId].removeClass('active');
                        this.$['Floor_' + floorId + '_Content'].applyStyle(PREFIX.css + 'transform', this.transformation);
                    }
                }
                // Set old
                this.oldFloorId = this.currentFloorId;
                // Set current
                this.currentFloorId = inSender.floorId;
                // Active Resize
                inSender.addClass('active');
                // Resize
                this.floorResize();
            }
            // Select Zone Menu
            this.$.ListSetting.pFloorTap(inSender.floorId);
            // Reset
            this.$['Floor_' + inSender.floorId].isOpenViewPort = false;
        }
    },
    onFloorTap: function(inSender, inEvent) {
        var timeout = 0,
            _self = this;

        // Clear available
        siteGraphic.setAvailableDraw({});

        // Draw Area
        if(siteGraphic.drawing === true) {
            this.$.ViewPortOff.triggerHandler('ontap');
            timeout = SITE_SETTING.duration * 1000 + 100; // The time required to turn off ViewPortOff
        }

        setTimeout(function() {
            // Remove selected
            for(var index = _self.floors.count - 1; index > 0; index--) {
                var floor = _self.floors.item(index);
                if(_self.$['Floor_' + floor.id].hasClass('active')) {
                    _self.$['Floor_' + floor.id].removeClass('active');

                    // Remove current tag for graphic
                    if(_self.$['Floor_' + floor.id + '_Svg'].getId() == siteGraphic.currentTagName) {
                        siteGraphic.currentTagName = undefined;
                    }
                }
                _self.$['Floor_' + floor.id + '_Content'].applyStyle(PREFIX.css + 'transform', _self.transformation);
            }

            if(!_self.$['Floor_' + inEvent.floorId]) { // Floor not existing OR OUTDOOR
                _self.currentFloorId = -1;
            } else { // Selected
                _self.currentFloorId = inEvent.floorId;

                _self.$['Floor_' + inEvent.floorId].isOpenViewPort = true;
                _self.$['Floor_' + inEvent.floorId].triggerHandler('ontap');

                // Active
                _self.$['Floor_' + inEvent.floorId].addClass('active');
                _self.floorResize();

                // Set current tag graphic
                siteGraphic.currentTagName = _self.$['Floor_' + inEvent.floorId + '_Svg'].getId();
            }
        }, timeout);
    },
    onZoneTap: function(inSender, inEvent) {
        var timeout = 0,
            _self = this;
        if(inEvent.sender.isfloorTap === true) {
            timeout = SITE_SETTING.duration * 1000 + 100; // if onFloorTap
        }

        setTimeout(function() {
            _self.initAvailableDraw(inEvent);
        }, timeout);
        //================================================================
        // Added in order to open zone panel automatically
        
        if(document.body.clientWidth <= 768) {
            TOOLBARS.SITE_BUILDER = 300;
        } else {
            TOOLBARS.SITE_BUILDER = 400;
        }
        //console.log(this);
        var widthPanel = (utils.getCSSProperty(this.$.ZoneList, 'offsetWidth', false) - TOOLBARS.SITE_BUILDER);
        this.$.ZoneListPanels.applyStyle('width', widthPanel + 'px');
        this.$.ListSetting.applyStyle('width', TOOLBARS.SITE_BUILDER + 'px');
        
        this.$.ListSetting.dimension();

        this.resizeComplete();
        
        //================================================================
        //console.log(inEvent.type);
    },
    // Check zone existing
    zoneExisting: function(floorId, zoneId) {
        return this.$.ListSetting.zoneExisting(floorId, zoneId);
    },
    // Have the upload image on top at 100% opacity
    floorGridHasImage: function(floorId) {
        if(this.$['Floor_' + floorId]) {
            if(siteGraphic.hasBackground(this.$['Floor_' + floorId + '_Svg'].getId())) {
                this.$['Floor_' + floorId].addClass('has-image');
            } else {
                this.$['Floor_' + floorId].removeClass('has-image');
            }
        }
    },
    floorResize: function() {
        if(siteGraphic.drawing === true || this.floors.count <= 1) return;

        for(var i = 0; i < this.$.ViewPortPanel.children.length; i++) {
            var floor = this.$.ViewPortPanel.children[i];
            var floorId = floor.floorId;

            // Set height
            this.$['Floor_' + floorId].applyStyle('height', this.floorHeight + 'px');

            // Transform Parent
            this.$['Floor_' + floorId + '_Content'].applyStyle('width', this.floorWidth + 'px');
            this.$['Floor_' + floorId + '_Content'].applyStyle('height', this.floorHeight + 'px');
            this.$['Floor_' + floorId + '_Content'].applyStyle(PREFIX.css + 'transform', this.transformation);
            this.$['Floor_' + floorId + '_Content'].applyStyle(PREFIX.css + 'transition-duration', '');

            // Transform SVG
            this.$['Floor_' + floorId + '_Svg'].applyStyle(PREFIX.css + 'transform', this.transformSvg);

            // Save position
            this.$['Floor_' + floorId + '_Content'].distanceTop = this.floorHeight * i;

            // Has upload image
            this.floorGridHasImage(floorId);

            // Active Resize
            if(this.$['Floor_' + floorId].hasClass('active')) {
                // Set currentTagName
                siteGraphic.currentTagName = this.$['Floor_' + floorId + '_Svg'].getId();
                // Set current
                this.currentFloorId = floorId;
                // Transform
                this.$['Floor_' + floorId + '_Content'].applyStyle(PREFIX.css + 'transform', this.transformationA);
                this.$['Floor_' + floorId + '_Svg'].applyStyle(PREFIX.css + 'transform', this.transformSvgA);
            }
        }
    },
    onSideBarDrag: function(inSender, inEvent) {
        // Set selector
        if(siteGraphic.drawing === true) {
            this.activeSelector();
        }
        var scale = inEvent.scale ? inEvent.scale : 1,
            width = inEvent.width ? inEvent.width * scale : 30,
            height = inEvent.height ? inEvent.height * scale : 30;

        var startPos = utils.getPosition();

        if(inEvent.type == 'onSideBarDragStart') {
            // Disable notification
            Signals.send('onNotification', {method: 'close'});

            this.offset = $('#' + inEvent.id).find('#' + inEvent.id + '_Image').offset();

            this.offset.x = startPos.x  - this.offset.left;
            this.offset.y = startPos.y  - this.offset.top;

            var pos = {
                x: startPos.x - this.offset.x,
                y: startPos.y - this.offset.y
            };

            PL.dragImage.setSrc(inEvent.image);
            PL.dragImage.setStyle('width:' + width + 'px; height:' + height + 'px; position:fixed; opacity:0.5; filter:alpha(opacity=50); left:' + pos.x + 'px; top:' + pos.y + 'px;');
            PL.dragImage.setShowing(true);
            PL.dragImage.info = inEvent.sensorInfo;
            PL.dragImage.startPos = startPos;
            this.currentFloorId = this.$.ListSetting.currentFloorId;
        } else if(inEvent.type == 'onSideBarOnDrag') { // Drag
            var pos = {
                x: startPos.x - this.offset.x,
                y: startPos.y - this.offset.y
            };

            PL.dragImage.applyStyle('left', pos.x + 'px');
            PL.dragImage.applyStyle('top', pos.y + 'px');
        } else if(inEvent.type == 'onSideBarDragFinish') { // Finish
            var isFinish = false;

            // If drag on svg of floor, insert a new sensor icon on that
            if(siteGraphic.isInside()) { // Drop to panel
                var tagName = this.viewPort.node.parentElement.id;
                var offset = document.getElementById(tagName).getBoundingClientRect();

                var mouse = utils.getPosition();
                mouse.x -= offset.left;
                mouse.y -= offset.top;

                // Scroll Fix
                mouse.x += document.getElementById(tagName).scrollLeft;
                mouse.y += document.getElementById(tagName).scrollTop;

                var pos = {
                    x: mouse.x - this.offset.x,
                    y: mouse.y - this.offset.y
                };

                isFinish = siteGraphic.createSensor({
                    sensorId: PL.dragImage.info.id,
                    name: PL.dragImage.info.name,
                    type: PL.dragImage.info.type,
                    kind: PL.dragImage.info.kind,
                    classes: PL.dragImage.info.classes,
                    url: PL.dragImage.info.url,
                    w: PL.dragImage.info.width,
                    h: PL.dragImage.info.height,
                    x: pos.x,
                    y: pos.y
                });

                // Notification
                if(!isFinish) {
                    Signals.send('onNotification', {method: 'message', message: 'Sensor must be placed in zone!'});
                }
            } else { // Insert in sensor list
                //this.$.ListSetting.floorSelect(this.currentFloorId);
                //PL.dragImage.setShowing(false);
                isFinish = this.$.ListSetting.pSensorAddToSensorList({
                    sensorId: PL.dragImage.info.id,
                    name: PL.dragImage.info.name,
                    type: PL.dragImage.info.type,
                    kind: PL.dragImage.info.kind,
                    classes: PL.dragImage.info.classes,
                    url: PL.dragImage.info.url,
                    w: PL.dragImage.info.width,
                    h: PL.dragImage.info.height
                });

                // Notification
                if(!isFinish) {
                    Signals.send('onNotification', {method: 'message', message: 'Sensor must be placed in zone!'});
                }
            }

            // Check create successfully
            if(isFinish === false) {
                var startPos = PL.dragImage.startPos;
                var currentLeft = utils.getCSSProperty(PL.dragImage, 'offsetLeft', false);
                var currentTop = utils.getCSSProperty(PL.dragImage, 'offsetTop', false);

                // Move left start
                var leftAni = new Animator({
                    duration: 500,
                    startValue: currentLeft,
                    endValue: startPos.x,
                    onStep: bind(this, function(data) {
                        PL.dragImage.applyStyle('left', data.value + 'px');
                    }),
                    onEnd: bind(this, function() {

                    })
                });
                leftAni.play();

                // Move top start
                var rightAni = new Animator({
                    duration: 500,
                    startValue: currentTop,
                    endValue: startPos.y,
                    onStep: bind(this, function(data) {
                        PL.dragImage.applyStyle('top', data.value + 'px');
                    }),
                    onEnd: bind(this, function() {
                        PL.dragImage.setShowing(false);
                    })
                });
                rightAni.play();
            } else {
                PL.dragImage.setShowing(false);
            }

            // Reset available
            delete this.offset;
            delete PL.dragImage.info;
        }
    },
    // Full Screen
    toggleFullScreen: function(inSender, inEvent) {
        switch(inEvent.type) {
            case 'tap':
                this.$.MainPanels.setIndex(this.$.MainPanels.index ? 0 : 1);
                break;
            case 'dragstart':
                this.$.MainPanels.setDraggable(true);
                break;
            case 'dragfinish':
                this.$.MainPanels.setDraggable(false);
                break;
        }
    },
    transitionFinish: function(inSender, inEvent) {
        if(inEvent.fromIndex === inEvent.toIndex) {
            return;
        }
        if(inSender.name === 'MainPanels') {
            if(this.$.MainPanels.getIndex()) {
                siteGraphic.isCollapsed = true;
            } else {
                siteGraphic.isCollapsed = false;
            }
        }
        this.resizeComplete();
    },
    onZoneSetting: function(inSender, inEvent) {
        //console.log(inEvent);
        if(document.body.clientWidth <= 768) {
            TOOLBARS.SITE_BUILDER = 300;
        } else {
            TOOLBARS.SITE_BUILDER = 400;
        }
        if(inEvent.open === true) {
            var widthPanel = (utils.getCSSProperty(this.$.ZoneList, 'offsetWidth', false) - TOOLBARS.SITE_BUILDER);
            this.$.ZoneListPanels.applyStyle('width', widthPanel + 'px');
            this.$.ListSetting.applyStyle('width', TOOLBARS.SITE_BUILDER + 'px');
            this.ZoneListBullshit = false;
        } else {
            this.floorWidth = (utils.getCSSProperty(this.$.ZoneList, 'offsetWidth', false) - TOOLBARS.SITE_BUILDER / 2);
            this.$.ZoneListPanels.applyStyle('width', this.floorWidth + 'px');
            this.$.ListSetting.applyStyle('width', TOOLBARS.SITE_BUILDER / 2 + 'px');
        }
        this.$.ListSetting.dimension();

        this.resizeComplete();
    },
    viewPortTurnOn: function(inSender, inEvent) {
        if(this.currentFloorId === undefined) return;
        siteGraphic.drawing = true;
        
        // Add class
        this.$['Floor_' + this.currentFloorId].addClass('drawing');

        // Disable element other
        //for(var pos = 0; pos < this.$.ViewPortPanel.children.length; pos++) {
        //    if(this.$.ViewPortPanel.children[pos].floorId != this.currentFloorId) {
        //        this.$.ViewPortPanel.children[pos].hide();
        //    }
        //}

        // Init style
        this.scaleViewPort();

        // Init ViewPort
        siteGraphic.currentTagName = this.$['Floor_' + this.currentFloorId + '_Svg'].getId();
        this.viewPort = siteGraphic.floors[siteGraphic.currentTagName].g.paper;

        var _self = this;
        inSender.disabled = true;
        setTimeout(function() {
            // Active selector
            _self.activeSelector();
            // Show DrawerTools
            _self.$.DrawerTools.show();
            // Hide ViewPortOpen
            _self.$.ViewPortOpen.hide();
            // Reload
            _self.$.Footer.render();

            // Add Stack List
            if(inSender && inEvent) {
                STACK_LIST.addStack(
                    _self.name,
                    _self.name,
                    STACK_TYPES.ENYO,
                    STACK_METHODS.CALLBACK,
                    inSender,
                    'viewPortTurnOn',
                    _self,
                    'viewPortCallBack'
                );
            }
            inSender.disabled = false;
        }, SITE_SETTING.duration * 1000 + 100);
    },
    viewPortTurnOff: function(inSender, inEvent) {
        var _self = this;

        siteGraphic.drawing = false;

        // Enable element other
        //for(var pos = 0; pos < this.$.ViewPortPanel.children.length; pos++) {
        //    this.$.ViewPortPanel.children[pos].show();
        //}

        // Init style
        this.scaleViewPort();

        // Off input and reset zoom
        siteGraphic.resetInputAndZoom();
        inSender.disabled = true;

        //added 20170501
        setTimeout(function() 
        {
            console.log(_self.$['Floor_' + _self.currentFloorId]);
            //added 20170430
            var elements = document.getElementsByClassName('rect_shape');
            elements.style.perspective = '600px';
            elements.style.transform = 'rotateY( 45deg )';
            console.log(elements);
            //end
        });

        //end

        setTimeout(function() {
            // Remove class
            _self.$['Floor_' + _self.currentFloorId].removeClass('drawing');
            // Hide DrawerTools
            _self.$.DrawerTools.hide();
            // Show ViewPortOpen
            _self.$.ViewPortOpen.show();
            // Reload
            _self.$.Footer.render();
            // Resize
            _self.floorResize();

            // Add Stack List
            if(inSender && inEvent) {
                STACK_LIST.addStack(
                    _self.name,
                    _self.name,
                    STACK_TYPES.ENYO,
                    STACK_METHODS.CALLBACK,
                    inSender,
                    'viewPortTurnOff',
                    _self,
                    'viewPortCallBack'
                );
            }
            inSender.disabled = false;
        }, SITE_SETTING.duration * 1000 + 100);
    },
    viewPortCallBack: function(stack) {
        if(stack.value === 'viewPortTurnOff') {
            this.viewPortTurnOn(stack.sender);
        } else if(stack.value === 'viewPortTurnOn') {
            this.viewPortTurnOff(stack.sender);
        }
    },
    // Resize draw area
    resizeViewPort: function() {
        if(!this.currentFloorId) return;
        var _self = this;

        function callback() {
            _self.scaleViewPort();
        }

        siteGraphic.setSizeViewPort(_self.contentWidth, _self.contentHeight, callback);
    },
    // Scale draw area
    scaleViewPort: function() {
        if(!this.currentFloorId) return;

        if(siteGraphic.drawing) {
            var distanceTop = this.$['Floor_' + this.currentFloorId + '_Content'].distanceTop;

            // Parent Animation
            this.$['Floor_' + this.currentFloorId + '_Content'].applyStyle(PREFIX.css + 'transform', 'scale(1, 1) rotateX(0deg)');
            this.$['Floor_' + this.currentFloorId + '_Content'].applyStyle(PREFIX.css + 'transition', 'height ' + SITE_SETTING.duration + 's, top ' + SITE_SETTING.duration + 's, opacity ' + SITE_SETTING.duration + 's, ' + PREFIX.css + 'transform ' + SITE_SETTING.duration + 's ease-in');
            this.$['Floor_' + this.currentFloorId + '_Content'].applyStyle('width', this.contentWidth + 'px');
            this.$['Floor_' + this.currentFloorId + '_Content'].applyStyle('height', this.contentHeight + 'px');
            this.$['Floor_' + this.currentFloorId + '_Content'].applyStyle('top', '-' + distanceTop + 'px');

            // SVG Animation
            this.$['Floor_' + this.currentFloorId + '_Svg'].applyStyle(PREFIX.css + 'transform', 'scale(1, 1) translate(0,0)');
            this.$['Floor_' + this.currentFloorId + '_Svg'].applyStyle(PREFIX.css + 'transition', 'height ' + SITE_SETTING.duration + 's, top ' + SITE_SETTING.duration + 's, opacity ' + SITE_SETTING.duration + 's, ' + PREFIX.css + 'transform ' + SITE_SETTING.duration + 's ease-in');

            // SVG Show
            setTimeout(function() {
                siteGraphic.setShowing(true);
            }, SITE_SETTING.duration * 1000);
        } else {
            // SVG Hide
            setTimeout(function() {
                siteGraphic.setShowing(false);
            }, SITE_SETTING.duration * 1000);

//            console.log("this.currentFloorId %O", this.currentFloorId);
//            console.log("    Content %O", this.$['Floor_' + this.currentFloorId + '_Content']);

            // Has upload image
            this.floorGridHasImage(this.currentFloorId);

            // Animation
            this.$['Floor_' + this.currentFloorId + '_Content'].applyStyle(PREFIX.css + 'transform', this.transformationA);
            this.$['Floor_' + this.currentFloorId + '_Content'].applyStyle('width', this.floorWidth + 'px');
            this.$['Floor_' + this.currentFloorId + '_Content'].applyStyle('height', this.floorHeight + 'px');
            this.$['Floor_' + this.currentFloorId + '_Content'].applyStyle('top', '0');

            // SVG Animation
            this.$['Floor_' + this.currentFloorId + '_Svg'].applyStyle(PREFIX.css + 'transform', this.transformSvgA);
        }
    },
    colorTap: function() {
        //this.$['FillColorPicker'].color = this.fillColor.substr(1, 6);
        //this.$['FillColorPicker'].load();
    },
    colorPick: function(inSender, inEvent) {
        switch(inEvent.type) {
            case 'onColorPick':
                break;
            case 'onColorSlide':
                break;
            case 'onColorButton':
                this.$['FillColorContextualPopup'].hide();
                this.initAvailableDraw({
                    color: inEvent.originator.color,
                    floorId: this.currentFloorId,
                    zoneId: this.currentZoneId
                });
                siteGraphic.adjustFillColor(this.currentFloorId, this.currentZoneId, this.fillColor);
                break;
        }
    },
    activeTools: function(name) {
        for(var i = 0; i < this.tools.length; i++) {
            this.tools[i].removeClass('active');
            if(this.tools[i].name === name) {
                this.tools[i].addClass('active');
            }
        }
    },
    // active icon selector
    activeSelector: function() {
        siteGraphic.activeIcons('isSelector', true);
        this.activeTools('bt-selector');
        this.toolStatus = this.activeSelector;
    },
    // active add polyline
    activeAddPolyLine: function() {
        siteGraphic.activeIcons('isAddPolyline', true);
        this.activeTools('bt-polyline');
        this.toolStatus = this.activeAddPolyLine;
    },
    // active add rectangle
    activeAddRectangle: function() {
        siteGraphic.activeIcons('isAddRectangle', true);
        this.activeTools('bt-rectangle');
        this.toolStatus = this.activeAddRectangle;
    },
    // active add circle
    activeAddCircle: function() {
        siteGraphic.activeIcons('isAddCircle', true);
        this.activeTools('bt-circle');
        this.toolStatus = this.activeAddCircle;
    },
    // active add text
    activeAddText: function() {
        siteGraphic.activeIcons('isAddText', true);
        this.activeTools('bt-add-text');
        this.toolStatus = this.activeAddText;
    },
    // active moving (resize entities)
    activeMoving: function() {
        siteGraphic.activeIcons('isMoving', true);
        this.activeTools('bt-move');
        this.toolStatus = this.activeMoving;
    },
    // Active zoom In
    activeZoom: function() {
        //siteGraphic.zoomInViewPort();
        siteGraphic.activeIcons('isZoom', true);
        this.activeTools('bt-zoom');
        siteGraphic.zoomViewPort();
    },
    // Active zoom to fit
    activeZoomToFit: function() {
        siteGraphic.zoomToFit();
    },
    zoomIn: function() {
        if(!this.$['bt-zoom'].hasClass('zoom-out')) {
            this.$['bt-zoom'].addClass('zoom-out');
        }
    },
    zoomOut: function() {
        if(this.$['bt-zoom'].hasClass('zoom-out')) {
            this.$['bt-zoom'].removeClass('zoom-out');
        }
    },
    // It should just undo the last things done
    undo: function() {
        var stack = STACK_LIST.getStackByParentPanel(this.name);
        if(stack) {
            if(stack.type === STACK_TYPES.SVG) {
                if(siteGraphic.drawing) {
                    siteGraphic.undo();
                }
            } else if(stack.type === STACK_TYPES.ENYO) {
                STACK_LIST.undo(this.name);
            }
        }
    },
    // Delete item if key code 46
    deleteSelectedItems: function() {
        siteGraphic.deleteSelectedItems();
    }
});

},{'../../../components/sidebar.js':'src/components/sidebar','./list-setting.js':'src/views/progress/site/list-setting','../../../common/services/utils.js':'src/common/services/utils','../../../views/progress/site/graphic.js':'src/views/progress/site/graphic','../../../common/services/stack.js':'src/common/services/stack'}],'src/views/progress/system/system':[function (module,exports,global,require,request){
//

var kind = require('enyo/kind'),
    Signals = require('enyo/Signals');

var FittableRows = require('layout/FittableRows'),
    FittableColumns = require('layout/FittableColumns'),
    FittableColumnsLayout = require('layout/FittableLayout').Columns,
    Panels = require('layout/Panels'),
    CollapsingArranger = require('layout/CollapsingArranger'),
    CarouselArranger = require('layout/CarouselArranger');

var Button = require('onyx/Button'),
    ContextualPopup = require('onyx/ContextualPopup'),
    Grabber = require('onyx/Grabber'),
    Icon = require('onyx/Icon'),
    IconButton = require('onyx/IconButton'),
    MenuDecorator = require('onyx/MenuDecorator'),
    plStSearch = require('./search'),
    plStSideBar = require('./sidebar').SideBar,
    plStSideBarItem = require('./sidebar').SideBarItem,
    plStTankSettings = require('./pullout').TankSettings,
    plStTemplate = require('./template'),
    plStZoneSettings = require('./pullout').ZoneSettings;

var utils = require('../../../common/services/utils.js');

var systemGraphic = require('./graphic.js');

var eGetPosition= require('enyo/dispatcher').getPosition;
var eClone = require('enyo/utils').clone;

var IS_TOUCH = require('enyo/platform').touch;


module.exports = kind({
    name: "pl.SystemView",
    kind: FittableRows,
    classes: "form-system",
    handlers: {
        ontap: "tapHandler"
    },
    components: [
        { name: "MainPanels", kind: Panels, fit: true, arrangerKind: CollapsingArranger, draggable: false, narrowFit: false, realtimeFit: true, classes: "main-panels", onTransitionFinish: "transitionFinish", components: [
            { name: "LeftColumn", kind: Panels, arrangerKind: CarouselArranger, draggable: false, narrowFit: false, realtimeFit: true, classes: "widget enyo-fit", components: [
                { name: "EquipmentLeft", kind: FittableRows, index: 0, classes: "enyo-fit", components: [
                    { name: "EquipmentSearch", kind: plStSearch},
                    { name: "EquipmentSideBar", kind: FittableColumns, fit: true },
                    { kind: FittableColumns, classes: "footer", components: [
                        { classes: "action pull-left", components:[
                            {name: "ComponentAddButton", kind: IconButton, classes: 'btn btn-add-new', attributes: {title: "Add A User Component"}}
                        ]},
                        { fit: true },
                        { kind: Button, content: "TEMPLATES", attributes: {title: ""}, classes: "bt bt-footer-default", panelIndex: 1, ontap: "openLeftPanel"}
                    ]}
                ]},
                { name: "TemplateLeft", kind: FittableRows, index: 1, classes: "enyo-fit", components: [
                    { name: "TemplateSearch", kind: plStSearch},
                    { name: "TemplateSideBar", kind: FittableColumns, fit: true},
                    { kind: FittableColumns, classes: "footer", components: [
                        { fit: true },
                        { kind: Button, content: "EQUIPMENT", attributes: {title: ""}, classes: "bt bt-footer-default", panelIndex: 0, ontap: "openLeftPanel"}
                    ]}
                ]}
            ]},
            { name: "MainContent", kind: FittableColumns, classes: "panel enyo-fit box-shadow", components: [
                { name: "ViewPortWrapper", kind: FittableRows, classes: "enyo-fit", style: "z-index:0", components: [
                    { name: "ViewPortPanel", kind: Panels, fit: true, style: "position: relative", classes: "border-left", components: [
                        { name: "SystemBuilder", classes: "enyo-fit", components: [
                            { name: "Svg", tag: "svg", classes: "enyo-fit" },
                            { name: "Input", tag: "input", attributes: {value: "", type: "text"}, classes: "enyo-input onyx-input insert-text", style: "display:none"}
                        ]}
                    ]},
                    { name: "Footer", kind: FittableColumns, classes: "footer", components: [
                        { kind: Grabber, attributes: {title: "Collapsing"}, classes: "bt bt-collapsing", ontap: "toggleFullScreen", ondragstart: "toggleFullScreen", ondragfinish: "toggleFullScreen" },
                        { kind: IconButton, name: "bt-selector", attributes: {title: "Selector/Move"}, classes: "bt bt-move active", ontap: "activeSelector"},
                        { kind: FittableColumns, classes: "box-group", components: [
                            { kind: IconButton, name: "bt-connector", attributes: {title: "Connector"}, classes: "bt bt-connector", ontap: "activeConnector"},
                            { kind: IconButton, name: "bt-outline", attributes: {title: "Outline"}, classes: "bt bt-outline", ontap: "activeOutline"},
                            { kind: IconButton, name: "bt-parallel", attributes: {title: "Create Parallel"}, classes: "bt bt-CPI", ontap: "activeCreateParallel"},
                            { kind: IconButton, name: "bt-add-text", attributes: {title: "Add Text"}, classes: "bt bt-text", ontap: "activeAddText"}
                        ]},
                        { layoutKind: FittableColumnsLayout, classes: "box-group", components: [
                            { kind: IconButton, name: "bt-rotate", attributes: {title: "Rotate Left"}, classes: "bt bt-go-back", ontap: "activeRotate"},
                            { name: "FlipButton", kind: IconButton, attributes: {title: "Flip"}, classes: "bt bt-flip"},
                            { kind: MenuDecorator, classes: "bt", components: [
                                { kind: IconButton, name: "AlignButton", classes: "bt bt-align", attributes: {title: "Align"}},
                                { kind: ContextualPopup, classes: "align-menu", floating: true, maxHeight: "200", components: [
                                    { kind: FittableRows, components: [
                                        { kind: FittableColumns, classes: "row", components: [
                                            { name: "VerticalAlignBottom", kind: Icon, classes: "bt bt-align-bottom" },
                                            { name: "VerticalAlignCenter", kind: Icon, classes: "bt bt-align-vcenter"},
                                            { name: "VerticalAlignTop", kind: Icon, classes: "bt bt-align-top" }
                                        ]},
                                        { kind: FittableColumns, classes: "row", components: [
                                            { name: "HorizontalAlignRight", kind: Icon, classes: "bt-align-left" },
                                            { name: "HorizontalAlignCenter", kind: Icon, classes: "bt bt-align-hcenter" },
                                            { name: "HorizontalAlignLeft", kind: Icon, classes: "bt bt-align-right" }
                                        ]}
                                    ]}
                                ]}
                            ]}
                        ]},
                        { kind: FittableColumns, classes: "box-group", components: [
                            { kind: IconButton, name: "bt-delete", attributes: {title: "Delete"}, classes: "bt bt-delete", ontap: "activeDeleteItems"}
                        ]},
                        { kind: FittableColumns, classes: "box-group", components: [
                            { name: "bt-zoom", kind: IconButton, attributes: {title: ""}, classes: "bt bt-look", ontap: "activeZoom"},
                            { name: "ZoomToFit", kind: IconButton, attributes: {title: "Zoom to fit"}, classes: "bt bt-max", ontap: "activeZoomToFit"},
                            { name: "bt-move", kind: IconButton, attributes: {title: "Move"}, classes: "bt bt-min", ontap: "activeMoving"}
                        ]}
                    ]}
                ]},
                { name: "TankSettingsPullout", kind: plStTankSettings, classes: "tank-settings box-shadow"},
                { name: "ZoneSettingsPullout", kind: plStZoneSettings, classes: "zone-setting box-shadow"}
            ]}
        ]}
    ],

    breadcrumbHack: function(key, page, percentToAdd) {
        // Hack to add breadcrumb percentage
        var percent = PROGRESS[key];

        percent+=percentToAdd;

        if(PROGRESS[key] < 100)
            Signals.send("onProgress", {page: page, key: key, value: percent});
        else 
            PROGRESS[key] = 100;
    },

    constructor: function() {
        this.inherited(arguments);
        this.ready = false;
    },
    create: function() {
        this.inherited(arguments);
    },
    rendered: function() {
        this.inherited(arguments);
        // Set graphic
        systemGraphic.panel = this;
        // Set tools
        this.tools = [
            this.$['bt-selector'],
            this.$['bt-connector'],
            this.$['bt-outline'],
            this.$['bt-parallel'],
            this.$['bt-add-text'],
            this.$['bt-rotate'],
            this.$['bt-delete'],
            this.$['bt-move'],
            this.$['bt-zoom'],
            this.$['ZoomToFit']
        ];
        if(this.ready === true) {
            // Setting
            this.dimension();
            // Init draw
            this.initViewPort();
        }
    },
    init: function() {
        if(this.ready !== true) {
            this.ready = true;
            this.render();

            // Init data
            //var that = this;
            //equipmentsService.find(PL.baseUrl + "assets/jsons/system.json", {}, function(inSender, inResponse) {
            //    that.initSideBar(inResponse);
            //});
            this.initSideBar(EQUIPMENT_LIST);
        }

        // Reset
        if(this.$.MainPanels.getIndex()) {
            systemGraphic.isCollapsed = true;
        } else {
            systemGraphic.isCollapsed = false;
        }

        this.resizeComplete();

        // Enable selector
        this.activeSelector();
    },
    setProgress: function(percent){
        Signals.send("onProgress", {page: APP_PROGRESS.PR_SYSTEM, key: 'SYSTEM_BUILDER', value: percent});
    },
    handleResize: function() {
        this.inherited(arguments);
    },
    resizeComplete: function() {
        // Setting
        if(this.ready === true) {
            this.dimension();
            this.initDrawArea();
        }

        // Set position attribute for svg
        this.initDrawAreaPositionByCollapse();
    },
    // Set Dimension
    dimension: function() {
        this.headerHeight = utils.getCSSProperty(this.parent.parent.$.Header, "offsetHeight", false);
        this.leftWidth = utils.getCSSProperty(this.$.LeftColumn, "offsetWidth", false);
        this.contentWidth = utils.getCSSProperty(this.$.SystemBuilder, "offsetWidth", false);
        this.contentHeight = utils.getCSSProperty(this.$.SystemBuilder, "offsetHeight", false);
        // Fit
        this.$.TankSettingsPullout.$.MainContent.applyStyle("height", this.contentHeight + "px");
        this.$.ZoneSettingsPullout.$.MainSetting.applyStyle("height", this.contentHeight + "px");
        this.$.ZoneSettingsPullout.$.ZoneList.applyStyle("height", this.contentHeight + "px");
    },
    tapHandler: function(inSender, inEvent) {
        // Redirect Component
        if(inEvent.originator.name == "ComponentAddButton") {
            Signals.send('onPageChanged', {page: APPS.APP_EQUIPMENT});
        }
        // Align
        if(inEvent.originator.name == "VerticalAlignBottom") {
            systemGraphic.alignObjects(ALIGN.VB);
        }
        if(inEvent.originator.name == "VerticalAlignCenter") {
            systemGraphic.alignObjects(ALIGN.VC);
        }
        if(inEvent.originator.name == "VerticalAlignTop") {
            systemGraphic.alignObjects(ALIGN.VT);
        }
        if(inEvent.originator.name == "HorizontalAlignLeft") {
            systemGraphic.alignObjects(ALIGN.HL);
        }
        if(inEvent.originator.name == "HorizontalAlignCenter") {
            systemGraphic.alignObjects(ALIGN.HC);
        }
        if(inEvent.originator.name == "HorizontalAlignRight") {
            systemGraphic.alignObjects(ALIGN.HR);
        }
        // FullScreen Control
        if(inEvent.originator.name == "FullScreenButton") {
            var targetControl = this.$.MainPanels;
            // If _targetControl_ is currently fullscreen, cancel fullscreen
            if(targetControl.isFullscreen()) {
                targetControl.cancelFullscreen();
                // If _targetControl_ is not currently fullscreen, request fullscreen
            } else {
                targetControl.requestFullscreen();
            }
        }
        // Action Button
        if(inEvent.originator.name == "FlipButton") {
            systemGraphic.drawFlip();
        }
    },
    // Init SideBar
    initSideBar: function(data) {
        // Destroy if children exist
        this.$.EquipmentSideBar.destroyClientControls();
        // Create
        var contentComponents = new Array();
        for(var i = 0; i < data.length; i++) {
            var childComponents = new Array();
            childComponents.push(data[i].name);
            var equipments = new Array();
            for(var j = 0; j < data[i].equipment.length; j++) {
                equipments.push({
                    kind: plStSideBarItem,
                    title: data[i].equipment[j].name,
                    value: data[i].equipment[j].kind,
                    objKind: data[i].equipment[j].kind,
                    image: data[i].equipment[j].svg,
                    width: data[i].equipment[j].width,
                    height: data[i].equipment[j].height,
                    equipment: data[i].equipment[j],
                    ontap: "handleItemTap",
                    ondragfinish: "handleItemDragFinish",
                    ondrag: "handleItemOnDrag",
                    ondragstart: "handleItemDragStart"
                })
            }
            childComponents.push(equipments);
            contentComponents.push(childComponents);
        }

        this.$.EquipmentSideBar.createComponent({
            name: "SideBar",
            kind: plStSideBar,
            touch: false,
            onSideBarDragStart: "onDragStart",
            onSideBarOnDrag: "onDrag",
            onSideBarDragFinish: "onDragFinish",
            onEquipmentTap: "onEquipmentTap",
            contentComponents: contentComponents,
            classes: "enyo-fit"
        }, {owner: this});
        this.$.EquipmentSideBar.render();
    },
    // Calculate area
    initDrawArea: function() {
        systemGraphic.setSize(this.contentWidth, this.contentHeight);
    },
    // Draw Raphael
    initViewPort: function() {
        // Calculate area
        this.initDrawArea();
        // Initiation
        systemGraphic.init(this.$.Svg, this.$.Input);
        // Active selector
        this.activeSelector();
    },
    // Set position attribute for svg
    initDrawAreaPositionByCollapse: function() {
        var offset = this.$.Svg.getAbsoluteBounds();
        this.$.Svg.setAttributes({offsetTop: offset.top, offsetLeft: offset.left});
    },
    // Full Screen
    toggleFullScreen: function(inSender, inEvent) {
        switch(inEvent.type) {
            case "tap":
                this.$.MainPanels.setIndex(this.$.MainPanels.index ? 0 : 1);
                break;
            case "dragstart":
                this.$.MainPanels.setDraggable(true);
                break;
            case "dragfinish":
                this.$.MainPanels.setDraggable(false);
                break;
        }
    },
    transitionFinish: function(inSender, inEvent) {
        if(inEvent.fromIndex === inEvent.toIndex) {
            return;
        }
        if(inSender.name === "MainPanels") {
            if(this.$.MainPanels.getIndex()) {
                systemGraphic.isCollapsed = true;
            } else {
                systemGraphic.isCollapsed = false;
            }
        }
        this.resizeComplete();
    },
    // Drawing
    onDragStart: function(inSender, inEvent) {
        systemGraphic.g.deSelectedItems();
        if(!toolIcons.isSelector) this.activeSelector();
        // Mouse Position
        var mouse = {x: 0, y: 0};
        if(IS_TOUCH) { // active on touch
            mouse = {x: window.event.changedTouches[0].pageX, y: window.event.changedTouches[0].pageY};
        } else {
            mouse = {x: eGetPosition().pageX, y: eGetPosition().pageY};
        }
        if(toolIcons.isSelector) {
            this.dragInfo = {};
            this.dragInfo.info = inEvent;
            this.dragInfo.image = inEvent.image;
            this.dragInfo.styles = "width:" + inEvent.width + "px; height:" + inEvent.height + "px;";
            this.dragInfo.showing = true;
            Signals.send('onDragImage', this.dragInfo);

            this.offset = $('#' + inEvent.id).find('#' + inEvent.id + '_Image').offset();

            this.offset.x = mouse.x - this.offset.left;
            this.offset.y = mouse.y - this.offset.top;

            var pos = {
                x: mouse.x - this.offset.x,
                y: mouse.y - this.offset.y
            };

            this.dragInfo.styles = "left:" + pos.x + "px; top:" + pos.y + "px; position:absolute; opacity:0.5; filter:alpha(opacity=50); z-index:1000";
            Signals.send('onDragImage', this.dragInfo);
        }
    },
    onDrag: function(inSender, inEvent) {
        var mouse = {x: 0, y: 0};
        if(IS_TOUCH) { // active on touch
            mouse = {x: window.event.changedTouches[0].pageX, y: window.event.changedTouches[0].pageY};
        } else {
            mouse = { x: eGetPosition().pageX, y: eGetPosition().pageY};
        }
        if(toolIcons.isSelector) {
            var pos = {
                x: mouse.x - this.offset.x,
                y: mouse.y - this.offset.y
            };

            this.dragInfo.styles = "left:" + pos.x + "px; top:" + pos.y + "px";
            Signals.send('onDragImage', this.dragInfo);
        }
    },
    onDragFinish: function(inSender, inEvent) {
        var mouse = {x: 0, y: 0};
        var offset = document.getElementById(this.$.SystemBuilder.getId()).getBoundingClientRect();

        if(IS_TOUCH) { // active on touch
            mouse = {
                x: window.event.changedTouches[0].pageX - offset.left,
                y: window.event.changedTouches[0].pageY - offset.top
            };
        } else {
            mouse = {
                x: eGetPosition().pageX - offset.left,
                y: eGetPosition().pageY - offset.top
            };
        }

        if(0 < mouse.x && mouse.x < offset.width && 0 < mouse.y && mouse.y < offset.height) {
            this.isCreate = true;
        } else {
            this.isCreate = false;
        }

        // Scroll Fix
        mouse.x += document.getElementById(this.$.SystemBuilder.getId()).scrollLeft;
        mouse.y += document.getElementById(this.$.SystemBuilder.getId()).scrollTop;

        if(toolIcons.isSelector && !!this.isCreate) {
            var pos = {
                x: mouse.x - this.offset.x,
                y: mouse.y - this.offset.y
            };
            var options = eClone(this.dragInfo.info.equipment);
            options.x = pos.x;
            options.y = pos.y;
            systemGraphic.createEquipment(options);
        }

        this.dragInfo.showing = false;
        Signals.send('onDragImage', this.dragInfo);

        delete this.offset;
        delete this.isCreate;
        delete this.dragInfo;

        // Hack to add breadcrumb percentage
            if(PROGRESS['SYSTEM_BUILDER'] > 25)
                this.breadcrumbHack('SYSTEM_BUILDER', APP_PROGRESS.PR_SYSTEM, 5);
            else
                this.breadcrumbHack('SYSTEM_BUILDER', APP_PROGRESS.PR_SYSTEM, 10);
        // END HACK
    },
    onEquipmentTap: function(inSender, inEvent) {
        systemGraphic.selectEquipmentsByObject(inEvent.equipment);
    },
    activeTools: function(name) {
        for(var i = 0; i < this.tools.length; i++) {
            this.tools[i].removeClass('active');
            if(this.tools[i].name === name) {
                this.tools[i].addClass('active');
            }
        }
    },
    // Active selector (select entities)
    activeSelector: function() {
        systemGraphic.activeIcons('isSelector', true);
        this.activeTools('bt-selector');
    },
    // Active icon connector
    activeConnector: function() {
        systemGraphic.activeIcons('isConnector', true);
        this.activeTools('bt-connector');
    },
    // Active outline
    activeOutline: function() {
        systemGraphic.activeIcons('isOutline', true);
        this.activeTools('bt-outline');
    },
    // Active create parallel
    activeCreateParallel: function() {
        systemGraphic.createParallel();
        //systemGraphic.activeIcons('isParallel', true);
        //this.activeTools('bt-parallel');
        //var me = this;
        //setTimeout(function() {
        //    me.activeSelector();
        //}, 200);
    },
    // Active add text
    activeAddText: function() {
        systemGraphic.activeIcons('isAddText', true);
        this.activeTools('bt-add-text');
    },
    // Active moving (resize entities)
    activeMoving: function() {
        systemGraphic.activeIcons('isMoving', true);
        this.activeTools('bt-move');
    },
    // Active delete selected items
    activeDeleteItems: function() {
        systemGraphic.deleteSelectedItems();
    },
    // Active rotate
    activeRotate: function() {
        systemGraphic.rotate();
    },
    // Active zoom In
    activeZoom: function() {
        systemGraphic.activeIcons('isZoom', true);
        this.activeTools('bt-zoom');
        systemGraphic.zoomViewPort();
        var me = this;
        setTimeout(function() {
            me.activeSelector();
        }, 200);
    },
    // Active zoom to fit
    activeZoomToFit: function() {
        systemGraphic.activeIcons('isZoomToFit', true);
        this.activeTools("ZoomToFit");
        systemGraphic.zoomToFit();
        var me = this;
        setTimeout(function() {
            me.activeSelector();
        }, 200);
    },
    zoomIn: function() {
        if(!this.$['bt-zoom'].hasClass('zoom-out')) {
            this.$['bt-zoom'].addClass("zoom-out");
        }
    },
    zoomOut: function() {
        if(this.$['bt-zoom'].hasClass('zoom-out')) {
            this.$['bt-zoom'].removeClass("zoom-out");
        }
    },
    // Open left panel
    openLeftPanel: function(inSender) {
        if(inSender.panelIndex == 0) {
            this.$.LeftColumn.previous();
        } else {
            this.$.LeftColumn.next();
        }
        if(inSender.panelIndex === 1) {
            // Destroy if children exist
            this.$.TemplateSideBar.destroyClientControls();
            // Create component
            this.$.TemplateSideBar.createComponent({
                name: "Template",
                kind: plStTemplate,
                touch: false,
                onSideBarDragStart: "onDragStart",
                onSideBarOnDrag: "onDrag",
                onSideBarDragFinish: "onDragFinish",
                onEquipmentTap: "onEquipmentTap",
                classes: "enyo-fit"
            }, {owner: this});
            this.$.TemplateSideBar.render();
        }
    },
    // It should just undo the last things done
    undo: function() {
        var stack = STACK_LIST.getStackByParentPanel(this.name);
        if(stack) {
            if(stack.type === STACK_TYPES.SVG) {
                systemGraphic.undo();
            } else if(stack.type === STACK_TYPES.ENYO) {
                STACK_LIST.undo(this.name);
            }
        }
    },
    // Delete item if key code 46
    deleteSelectedItems: function() {
        systemGraphic.deleteSelectedItems();
    }
});

},{'./search':'src/views/progress/system/search','./sidebar':'src/views/progress/system/sidebar','./pullout':'src/views/progress/system/pullout','./template':'src/views/progress/system/template','../../../common/services/utils.js':'src/common/services/utils','./graphic.js':'src/views/progress/system/graphic'}],'src/views/progress/interface/interface':[function (module,exports,global,require,request){
//

var kind = require('enyo/kind'),
    Signals = require('enyo/Signals'),
    FileInputDecorator = require('enyo-external/FileInputDecorator');

var FittableRows = require('layout/FittableRows'),
    FittableColumns = require('layout/FittableColumns'),
    FittableColumnsLayout = require('layout/FittableLayout').Columns,
    Panels = require('layout/Panels'),
    CollapsingArranger = require('layout/CollapsingArranger');

var IconButton = require('onyx/IconButton'),
    RadioGroup = require('onyx/RadioGroup'),
    Grabber = require('onyx/Grabber'),
    Menu = require('onyx/Menu'),
    MenuDecorator = require('onyx/MenuDecorator');

var Scroller = require('enyo/Scroller');

var plItSideBar = require('./sidebar.js').SideBar;
var plItSideBarItem = require('./sidebar.js').SideBarItem;
var plItPoControl = require('./control-pullout.js');
var plItPoIndicator = require('./indicator-pullout.js');
var plItPoUserInput = require('./user-input-pullout.js');

var utils = require('../../../common/services/utils.js');

var interfaceGraphic = require('../../progress/interface/graphic.js');

var IS_TOUCH = require('enyo/platform').touch;

var eGetPosition= require('enyo/dispatcher').getPosition;

module.exports = kind({
    name: 'pl.InterfaceView',
    kind: FittableRows,
    classes: 'form-interface',
    handlers: {
        ontap: 'tapHandler'
    },
    components: [
        { name: 'MainPanels', kind: Panels, fit: true, arrangerKind: CollapsingArranger, draggable: false, narrowFit: false, realtimeFit: true, classes: 'main-panels', onTransitionFinish: 'transitionFinish', components: [
            { name: 'LeftColumn', kind: FittableRows, classes: 'widget enyo-fit', components: [
                { name: 'SideBarWrapper', kind: FittableColumns, fit: true },
                { classes: 'footer'}
            ]},
            { name: 'MainContent', kind: FittableColumns, classes: 'panel enyo-fit box-shadow', components: [
                { name: 'ContentWrapper', kind: FittableRows, classes: 'border-left enyo-fit', components: [
                    {name: 'ViewTabsScroller', kind: Scroller, touch: true, vertical: 'hidden', classes: 'tab', components: [
                        { name: 'ViewTabs', kind: RadioGroup, layoutKind: FittableColumnsLayout, onActivate: 'tabActivated' }
                    ]},
                    { name: 'ContentPanels', kind: Panels, fit: true, draggable: false, narrowFit: false },
                    { name: 'Footer', kind: FittableColumns, classes: 'footer', components: [
                        { kind: Grabber, attributes: {title: 'Collapsing'}, classes: 'bt bt-collapsing', ontap: 'toggleFullScreen', ondragstart: 'toggleFullScreen', ondragfinish: 'toggleFullScreen' },
                        { kind: MenuDecorator, onSelect: 'tabAddView', components: [
                            { content: 'ADD VIEW', classes: 'bt bt-footer-default'},
                            { kind: Menu, classes: 'add-view-menu', components: [
                                { name: 'MainTabViewButton', components: [
                                    {kind: IconButton, classes: 'bt bt-add-main-view'},
                                    {content: 'ADD MAIN VIEW'}
                                ]},
                                { name: 'NewTabViewButton', components: [
                                    {kind: IconButton, classes: 'bt bt-add-new-view' },
                                    {content: 'ADD NEW VIEW'}
                                ]}
                            ]}
                        ]},
                        { name: 'polygonButton', kind: IconButton, classes: 'bt bt-line-1', ontap: 'activePolyLine' },
                        { name: 'rectangleButton', kind: IconButton, classes: 'bt bt-line-2', ontap: 'activeRectangle' },
                        { name: 'ovalButton', kind: IconButton, classes: 'bt bt-line-3', ontap: 'activeOval' },
                        { name: 'textLabelingButton', kind: IconButton, classes: 'bt bt-text', ontap: 'activeAddText' },
                        { fit: true},
                        { name: 'TopViewButton', kind: FileInputDecorator, defaultClient: {kind: IconButton, content: ''}, disabled: true, attributes: {title: 'Top View'}, classes: 'bt bt-up', onSelect: 'importViewImage'},
                        { name: 'BottomViewButton', kind: FileInputDecorator, defaultClient: {kind: IconButton, content: ''}, disabled: true, attributes: {title: 'Bottom View'}, classes: 'bt bt-down', onSelect: 'importViewImage'}
                    ]}
                ]},
                { name: 'ControlPullout', kind: plItPoControl, onUpdate: 'valueChanged'},
                { name: 'IndicatorPullout', kind: plItPoIndicator, onUpdate: 'valueChanged', onColorPark: 'valueColorChanged'},
                { name: 'UserInputPullout', kind: plItPoUserInput, onUpdate: 'valueChanged'}
            ]}
        ]}
    ],
    breadcrumbHack: function(key, page, percentToAdd) {
        // Hack to add breadcrumb percentage
        var percent = PROGRESS[key];

        percent += percentToAdd;

        if(PROGRESS[key] < 100) {
            Signals.send('onProgress', {page: page, key: key, value: percent});
        } else {
            PROGRESS[key] = 100;
        }
    },
    constructor: function() {
        this.inherited(arguments);
        this.ready = false;
        // Set graphic
        interfaceGraphic.panel = this;
    },
    create: function() {
        this.inherited(arguments);
    },
    rendered: function() {
        this.inherited(arguments);
        // Setting
        this.dimension();
        // Set tools
        this.tools = [
            this.$['polygonButton'],
            this.$['rectangleButton'],
            this.$['ovalButton'],
            this.$['textLabelingButton']
        ];
        // AddEventListener to Parent
        document.getElementById(this.getId()).addEventListener('dragover', function(e) {
            e.stopPropagation();
            e.preventDefault();
        }, false);
        document.getElementById(this.getId()).addEventListener('drop', function(e) {
            e.stopPropagation();
            e.preventDefault();
        }, false);
    },
    init: function() {
        if(this.ready !== true) {
            this.ready = true;
            this.render();
            // Init data
            //var me = this;
            //interfaceService.find(PL.baseUrl + 'assets/jsons/interface.json', {}, function(inSender, inResponse) {
            //    me.initSideBar(inResponse);
            //});
            this.initSideBar(CONTROL_LIST);

            // Set default
            this.tabAddViewContent();
            //this.tabAddViewContent();
            this.$['ViewTabItem_0'].setActive(true);
            this.$.ContentPanels.setIndex(0);
        }
        // Disable toolbar
        this.activeReset();
    },
    setProgress: function(percent) {
        Signals.send('onProgress', {page: APP_PROGRESS.PR_INTERFACE, key: 'INTERFACE', value: percent});
    },
    handleResize: function() {
        this.inherited(arguments);
    },
    resizeComplete: function() {
        // Setting
        this.dimension();

        // Set position attribute for svg
        this.initDrawAreaPositionByCollapse();
    },
    resizeStopped: function() {
        this.initDrawArea();
    },
    // Dimension
    dimension: function() {
        this.headerHeight = utils.getCSSProperty(this.parent.parent.$.Header, 'offsetHeight', false);
        this.leftWidth = utils.getCSSProperty(this.$.LeftColumn, 'offsetWidth', false);
        this.contentWidth = utils.getCSSProperty(this.$.ContentPanels, 'offsetWidth', false);
        this.contentHeight = utils.getCSSProperty(this.$.ContentPanels, 'offsetHeight', false);

        // Fit
        this.$.ControlPullout.$.MainContent.applyStyle('height', this.contentHeight + 'px');
        this.$.IndicatorPullout.$.MainContent.applyStyle('height', this.contentHeight + 'px');
        this.$.UserInputPullout.$.MainContent.applyStyle('height', this.contentHeight + 'px');
    },
    tapHandler: function(inSender, inEvent) {

    },
    // init Sidebar
    initSideBar: function(data) {
        // Destroy if children exist
        this.$.SideBarWrapper.destroyClientControls();
        // Create
        var contentComponents = new Array();
        for(var i = 0; i < data.length; i++) {
            var childComponents = new Array();
            childComponents.push(data[i].name);

            var items = new Array();
            for(var j = 0; j < data[i].items.length; j++) {
                items.push({
                    kind: plItSideBarItem,
                    id: data[i].items[j].id,
                    value: data[i].items[j].id,
                    title: data[i].items[j].name,
                    image: data[i].items[j].url,
                    objkind: data[i].items[j].type,
                    width: data[i].items[j].w,
                    height: data[i].items[j].h,
                    data: data[i].items[j],
                    ontap: 'handleItemTap',
                    ondragfinish: 'handleItemDragFinish',
                    ondrag: 'handleItemOnDrag',
                    ondragstart: 'handleItemDragStart'
                })
            }
            childComponents.push(items);
            contentComponents.push(childComponents);
        }
        // Create SideBar
        this.$.SideBarWrapper.createComponent({
            name: 'SideBar',
            kind: plItSideBar,
            classes: 'enyo-fit side-bar',
            onSideBarDragStart: 'onDragStart',
            onSideBarOnDrag: 'onDrag',
            onSideBarDragFinish: 'onDragFinish',
            contentComponents: contentComponents
        }, {owner: this});
        this.$.SideBarWrapper.render();
    },
    // Calculate area
    initDrawArea: function() {
        interfaceGraphic.setSize(this.contentWidth, this.contentHeight);
    },
    // Draw
    initViewPort: function(index) {
        this.initDrawArea();
        // Initiation
        interfaceGraphic.init(this.$['DrawArea_' + index + '_Svg'], this.$['DrawArea_' + index + '_Input']);
    },
    // Set position attribute for svg
    initDrawAreaPositionByCollapse: function() {
        var length = this.$.ContentPanels.children.length;
        for(var i = 0; i < length; i++) {
            var offset = this.$['DrawArea_' + i + '_Svg'].getAbsoluteBounds();
            this.$['DrawArea_' + i + '_Svg'].setAttributes({offsetTop: offset.top, offsetLeft: offset.left});
        }
    },
    // Full Screen
    toggleFullScreen: function(inSender, inEvent) {
        switch(inEvent.type) {
            case 'tap':
                this.$.MainPanels.setIndex(this.$.MainPanels.index ? 0 : 1);
                break;
            case 'dragstart':
                this.$.MainPanels.setDraggable(true);
                break;
            case 'dragfinish':
                this.$.MainPanels.setDraggable(false);
                break;
        }
    },
    transitionFinish: function(inSender, inEvent) {
        if(inEvent.fromIndex === inEvent.toIndex) {
            return;
        }
        if(inSender.name === 'MainPanels') {
            if(this.$.MainPanels.getIndex()) {
                interfaceGraphic.isCollapsed = true;
            } else {
                interfaceGraphic.isCollapsed = false;
            }
        }
        this.resizeComplete();
    },
    // Setting
    toggleSetting: function(snapObject) {
        if(!!snapObject) {
            if(snapObject.info.objKind === INTERFACE_ITEM_TYPE.CONTROL) {
                this.$.ControlPullout.toggle(true, snapObject);
                this.$.IndicatorPullout.toggle(false);
                this.$.UserInputPullout.toggle(false);
            } else if(snapObject.info.objKind === INTERFACE_ITEM_TYPE.INDICATOR) {
                this.$.ControlPullout.toggle(false);
                this.$.IndicatorPullout.toggle(true, snapObject);
                this.$.UserInputPullout.toggle(false);
            } else if(snapObject.info.objKind === INTERFACE_ITEM_TYPE.USER_INPUT) {
                this.$.ControlPullout.toggle(false);
                this.$.IndicatorPullout.toggle(false);
                this.$.UserInputPullout.toggle(true, snapObject);
            }
        } else {
            this.$.ControlPullout.toggle(false);
            this.$.IndicatorPullout.toggle(false);
            this.$.UserInputPullout.toggle(false);
        }
        this.snapObject = snapObject;
    },
    // Switch tab
    tabActivated: function(inSender, inEvent) {
        if(inEvent.originator.getActive()) {
            this.$.ContentPanels.setIndex(inEvent.originator.index);
            // Reset button active
            this.activeReset();
            // Change viewPort
            interfaceGraphic.currentTagName = this.$['DrawArea_' + inEvent.originator.index + '_Svg'].getId();
            this.viewPort = interfaceGraphic.viewTabs[interfaceGraphic.currentTagName].g.paper;
            // ReInit
            this.initDrawArea();
        }
    },
    tabAddView: function(inSender, inEvent) {
        if(inEvent.originator.name == 'MainTabViewButton') {
            this.tabAddViewContent();
        } else if(inEvent.originator.name == 'NewTabViewButton') {
            this.tabAddViewContent();
        }
    },
    tabAddViewContent: function() {
        // Disabled Setting
        this.toggleSetting(false);
        // Create Tabs
        var index = this.$.ViewTabs.children.length;
        this.$.ViewTabs.createComponent({
            name: 'ViewTabItem_' + index,
            content: (index == 0 ? 'MAIN' : utils.getOrdinal(index + 1)) + ' VIEW',
            index: index
        }, {owner: this});
        this.$['ViewTabItem_' + index].render();
        this.$.ViewTabsScroller.scrollToRight();
        // Create Panel
        this.$.ContentPanels.createComponent({
            name: 'DrawArea_' + index + '_Panel', kind: FittableRows, fit: true, components: [
                {name: 'DrawArea_' + index + '_Svg', tag: 'svg'},
                {
                    name: 'DrawArea_' + index + '_Input',
                    tag: 'input',
                    attributes: {value: '', type: 'text'},
                    classes: 'enyo-input onyx-input insert-text',
                    style: 'display:none'
                }
            ]
        }, {owner: this});
        this.$['DrawArea_' + index + '_Panel'].render();
        // Draw
        this.initViewPort(index);
        // Set Active
        this.$['ViewTabItem_' + index].setActive(true);
        // Enable Import Button
// FIXME: these are now gone, does it matter?
//        this.$.TopViewButton.statusChanged(true);
//        this.$.BottomViewButton.statusChanged(true);
    },
    // Open dialog to import top view image  and bottom view image(jpg, png, etc)
    importViewImage: function(inSender, inEvent) {
        var position = 'bgBottom';
        if(inSender.name == 'TopViewButton') {
            position = 'bgTop';
        } else if(inSender.name == 'BottomViewButton') {
            position = 'bgBottom';
        }

        // Hack to add breadcrumb percentage
        if(position == 'bgTop' || position == 'bgBottom') {
            this.breadcrumbHack('INTERFACE', APP_PROGRESS.PR_INTERFACE, 25);
        }
        // END HACK

        // Set Background
        interfaceGraphic.setBackgroundByBase64(inEvent.files, position);

        // Clear
        inEvent.originator.$.fileInput.node.value = '';
    },
    // Drag Start
    onDragStart: function(inSender, inEvent) {
        // Mouse Position
        var mouse = {x: 0, y: 0};
        if(IS_TOUCH) {
            mouse = {x: window.event.changedTouches[0].pageX, y: window.event.changedTouches[0].pageY};
        } else {
            mouse = {x: eGetPosition().pageX, y: eGetPosition().pageY};
        }
        // Set Position
        this.dragInfo = {};
        this.dragInfo.info = inEvent;
        this.dragInfo.image = inEvent.image;
        this.dragInfo.styles = 'width:' + inEvent.width + 'px; height:' + inEvent.height + 'px;';
        this.dragInfo.showing = true;
        Signals.send('onDragImage', this.dragInfo);

        this.offset = $('#' + inEvent.id).find('#' + inEvent.$.Image.getId()).offset();

        this.offset.x = mouse.x - this.offset.left;
        this.offset.y = mouse.y - this.offset.top;

        var pos = {
            x: mouse.x - this.offset.x,
            y: mouse.y - this.offset.y
        };

        this.dragInfo.styles = 'left:' + pos.x + 'px; top:' + pos.y + 'px; position:absolute; opacity:0.5; filter:alpha(opacity=50); z-index:1000';
        Signals.send('onDragImage', this.dragInfo);

        //this.dragInfo.styles = 'left:' + (mouse.x - inEvent.width / 2) + 'px; top:' + (mouse.y - inEvent.height / 2) + 'px; position:fixed; opacity:0.5; filter:alpha(opacity=50); z-index:1000';
        //Signals.send('onDragImage', this.dragInfo);
    },
    onDrag: function(inSender, inEvent) {
        // Mouse Position
        var mouse = {x: 0, y: 0};
        if(IS_TOUCH) {
            mouse = {x: window.event.changedTouches[0].pageX, y: window.event.changedTouches[0].pageY};
        } else {
            mouse = {x: eGetPosition().pageX, y: eGetPosition().pageY};
        }
        // Move
        var pos = {
            x: mouse.x - this.offset.x,
            y: mouse.y - this.offset.y
        };

        this.dragInfo.styles = 'left:' + pos.x + 'px; top:' + pos.y + 'px';
        Signals.send('onDragImage', this.dragInfo);

        //this.dragInfo.styles = 'left:' + (mouse.x - this.dragInfo.info.width / 2) + 'px; top:' + (mouse.y - this.dragInfo.info.height / 2) + 'px';
        //Signals.send('onDragImage', this.dragInfo);
    },
    onDragFinish: function(inSender, inEvent) {
        if(this.viewPort && interfaceGraphic.isInside()) {
            var tagName = this.viewPort.node.parentElement.id;
            var offset = document.getElementById(tagName).getBoundingClientRect();

            var mouse = utils.getPosition();
            mouse.x -= offset.left;
            mouse.y -= offset.top;

            // Scroll Fix
            mouse.x += document.getElementById(tagName).scrollLeft;
            mouse.y += document.getElementById(tagName).scrollTop;

            var pos = {
                x: mouse.x - this.offset.x,
                y: mouse.y - this.offset.y
            };

            interfaceGraphic.createControl({
                name: this.dragInfo.info.data.nameDefault,
                url: this.dragInfo.info.image,
                kind: this.dragInfo.info.objkind,
                x: pos.x,
                y: pos.y,
                width: this.dragInfo.info.width,
                height: this.dragInfo.info.height,
                data: this.dragInfo.info.data
            });
        }

        this.dragInfo.showing = false;
        Signals.send('onDragImage', this.dragInfo);

        delete this.offset;
        delete this.dragInfo;
        delete this.isCreate;

        // Hack to add breadcrumb percentage
        this.breadcrumbHack('INTERFACE', APP_PROGRESS.PR_INTERFACE, 5);
        // END HACK
    },
    valueColorChanged: function(inSender, inEvent) {
        console.log(inEvent);
    },
    valueChanged: function(inSender, inEvent) {
        console.log(inEvent.originator.name);
        switch(inEvent.originator.name) {
            case 'FloorPicker':
                break;
            case 'LocationPicker':
                break;
            case 'SensorPicker':
                break;
            case 'ColorPicker':
                break;
            case 'SwitchNameInput':
                break;
            case 'PointerStyleCheckbox':
                break;
            case 'PointerAnglePicker':
                break;
            case 'SystemPicker':
                break;
            case 'TriggerActionPicker':
                break;
            case 'TimerStyleCheckbox':
                break;
            case 'TimeStylePicker':
                break;
            case 'PhysicalSwitchCheckbox':
                break;
            case 'PhysicalSwitchPicker':
                break;
        }
    },
    activeTools: function(name) {
        for(var i = 0; i < this.tools.length; i++) {
            this.tools[i].removeClass('active');
            if(this.tools[i].name === name) {
                this.tools[i].addClass('active');
            }
        }
    },
    // active reset button
    activeReset: function() {
        interfaceGraphic.activeIcons(false);
        this.activeTools(false);
    },
    // active add polyline
    activePolyLine: function() {
        if(!toolIcons.isAddPolyline) {
            if(interfaceGraphic.activeIcons('isAddPolyline', true)) {
                this.activeTools('polygonButton');
            }
        } else {
            this.activeReset();

        }
    },
    // active add rectangle
    activeRectangle: function() {
        if(!toolIcons.isAddRectangle) {
            if(interfaceGraphic.activeIcons('isAddRectangle', true)) {
                this.activeTools('rectangleButton');
            }
        } else {
            this.activeReset();

        }
    },
    // active add circle
    activeOval: function() {
        if(!toolIcons.isAddCircle) {
            if(interfaceGraphic.activeIcons('isAddCircle', true)) {
                this.activeTools('ovalButton');
            }
        } else {
            this.activeReset();

        }
    },
    // active add text
    activeAddText: function() {
        if(!toolIcons.isAddText) {
            if(interfaceGraphic.activeIcons('isAddText', true)) {
                this.activeTools('textLabelingButton');
            }
        } else {
            this.activeReset();

        }
    },
    // It should just undo the last things done
    undo: function() {
        var stack = STACK_LIST.getStackByParentPanel(this.name);
        if(stack) {
            if(stack.type === STACK_TYPES.SVG) {
                interfaceGraphic.undo();
            } else if(stack.type === STACK_TYPES.ENYO) {
                STACK_LIST.undo(this.name);
            }
        }
    },
    // Delete item if key code 46
    deleteSelectedItems: function() {
        if(PL.keyCode == 46) { // != 8 (backspace)
            interfaceGraphic.deleteSelectedItems();
        }
    }
});

},{'./sidebar.js':'src/views/progress/interface/sidebar','./control-pullout.js':'src/views/progress/interface/control-pullout','./indicator-pullout.js':'src/views/progress/interface/indicator-pullout','./user-input-pullout.js':'src/views/progress/interface/user-input-pullout','../../../common/services/utils.js':'src/common/services/utils','../../progress/interface/graphic.js':'src/views/progress/interface/graphic'}],'src/views/progress/commission/commission':[function (module,exports,global,require,request){
// PIPELINE - COMMISSION

var kind = require('enyo/kind'),
    Signals = require('enyo/Signals'),
    FittableRows = require('layout/FittableRows'),
    FittableColumns = require('layout/FittableColumns'),
    Panels = require('layout/Panels'),
    CollapsingArranger = require('layout/CollapsingArranger'),
    Button = require('onyx/Button'),
    Grabber = require('onyx/Grabber'),
    plCmSideBar = require('./sidebar.js');

module.exports = kind({
    name: "pl.CommissionView",
    kind: FittableRows,
    fit: true,
    classes: "form-commission",
    handlers: {
        ontap: "tapHandler",
        onSetting: "onSetting"
    },
    components: [
        { name: "MainPanels", kind: Panels, fit: true, arrangerKind: CollapsingArranger, draggable: false, narrowFit: false, realtimeFit: true, classes: "main-panels", components: [
            { name: "SideBar", kind: plCmSideBar},
            { kind: FittableRows, classes: "enyo-fit panel box-shadow", fit: true, components: [
                { name: "MainContent", fit: true, classes: "border-left"},
                { kind: FittableColumns, classes: "footer", components: [
                    { kind: Grabber, attributes: {title: "Collapsing"}, classes: "bt bt-collapsing", ontap: "toggleFullScreen", ondragstart: "toggleFullScreen", ondragfinish: "toggleFullScreen" },
                    { fit: true },
                    { name: "DeployButton", kind: Button, content: "DEPLOY SYSTEM", attributes: {title: ""}, classes: "bt bt-deploy"}
                ]}
            ]}
        ]}
    ],
    constructor: function() {
        this.inherited(arguments);
        this.ready = false;
    },
    create: function() {
        this.inherited(arguments);
    },
    rendered: function() {
        this.inherited(arguments);
    },
    init: function() {
        // Init sidebar
        this.$.SideBar.loadData();
        this.render();
        this.ready = true;
    },
    setProgress: function(percent){
        Signals.send("onProgress", {page: APP_PROGRESS.PR_COMMISSION, key: 'COMMISSION', value: percent});
    },
    handleResize: function() {
        this.inherited(arguments);
    },
    resizeComplete: function() {

    },
    tapHandler: function(inSender, inEvent) {
        if(inEvent.originator.name == "DeployButton") {
            // Progress
            // Signals.send("onNavigationBar", {deploy: true});
            // Return event
            Signals.send('onPageChanged', {page: APPS.APP_RUNTIME});
        }
    },
    // Full Screen
    toggleFullScreen: function(inSender, inEvent) {
        switch(inEvent.type) {
            case "tap":
                this.$.MainPanels.setIndex(this.$.MainPanels.index ? 0 : 1);
                break;
            case "dragstart":
                this.$.MainPanels.setDraggable(true);
                break;
            case "dragfinish":
                this.$.MainPanels.setDraggable(false);
                break;
        }
    },
    onSetting: function(inSender, inEvent) {
        this.render();
    },
    undo: function() {

    }
});

},{'./sidebar.js':'src/views/progress/commission/sidebar'}],'src/views/progress/progress':[function (module,exports,global,require,request){
//

var kind = require('enyo/kind'),
    Signals = require('enyo/Signals');

var FittableRows = require('layout/FittableRows'),
    FittableColumns = require('layout/FittableColumns'),
    Panels = require('layout/Panels');

var Button = require('onyx/Button'),
    IconButton = require('onyx/IconButton');

var plSetupView = require('./setup/setup.js'),
    plSiteView = require('./site/site.js'),
    plSystemView = require('./system/system.js'),
    plInterfaceView = require('./interface/interface.js'),
    plWiringView = require('./wiring/wiring.js'),
    plCommissionView = require('./commission/commission.js');

var plBtnSetting = require('../../components/button.js').Setting,
    plBtnHelp = require('../../components/button.js').Help,
    plBtnLocked = require('../../components/button.js').Locked;

var plPgBreadcrumbs = require('./breadcrumbs/breadcrumbs.js');

var plScreenState = require('./screenState.js')

module.exports = kind({
    name: 'pl.ProgressView',
    kind: FittableRows,
    classes: 'form-progress',
    handlers: {
        ontap: 'tapHandler',
    },
    components: [
        {
            name: 'Header', kind: FittableRows, classes: 'header',
            components: [
                {name: 'Chop', classes: 'chop', showing: false},
                {
                    kind: FittableColumns, classes: 'header-left',
                    components: [
                        {
                            name: 'PreviousPageButton',
                            kind: Button,
                            content: 'PROJECTS',
                            attributes: {title: 'PROJECTS'},
                            classes: 'bt bt-project'
                        },
                        {kind: IconButton, attributes: {title: 'Undo'}, classes: 'bt bt-reload', ontap: 'undo'},
                        {
                            name: 'BtAddTab',
                            kind: IconButton,
                            showing: false,
                            attributes: {title: 'Add'},
                            classes: 'bt bt-add-tab',
                            ontap: ''
                        }
                    ]
                },
                {
                    kind: FittableColumns, classes: 'header-right',
                    components: [
                        {kind: plBtnSetting},
                        {kind: plBtnHelp},
                        {kind: plBtnLocked}
                    ]
                },
                {
                    name: 'Breadcrumb',
                    kind: plPgBreadcrumbs,
                    fit: true,
                    page: 0,
                    onProgressChanged: 'onProgressChanged'
                }
            ]
        },
        {
            name: 'PGMasterPanels',
            kind: Panels,
            fit: true,
            realtimeFit: true,
            draggable: false,
            narrowFit: false,
            onTransitionStart: 'transitionStart',
            onTransitionFinish: 'transitionComplete',
            components: [
                {kind: plSiteView, name: 'SitePanel', index: APP_PROGRESS.PR_SITE},]
        },
        {kind: Signals, onChildPageChanged: 'onChildPageChanged'}
    ],
    constructor: function() {
        this.inherited(arguments);
        this.ready = false;
    },
    create: function() {
        this.inherited(arguments);
    },
    rendered: kind.inherit(function (sup) {
    return function () {
        sup.apply(this, arguments);
      this.volumehandler = this.volumehandler.bind(this);
      document.addEventListener('volumechange', this.volumehandler);
    };
  }),
    handleResize: function() {
        this.inherited(arguments);
    },
    resizeComplete: function() {
        if(typeof this.currentPanel === 'object' && typeof this.currentPanel.resizeComplete === 'function') {
            this.currentPanel.resizeComplete();
        }
    },
    resizeStopped: function() {
        if(typeof this.currentPanel === 'object' && typeof this.currentPanel.resizeStopped === 'function') {
            this.currentPanel.resizeStopped();
        }
    },
    init: function() {
        if(this.ready !== true) {
            this.ready = true;
            this.render();
            this.$.Breadcrumb.setCurrentPageWithTap(APP_PROGRESS.PR_SITE);
        }
    },
    volumehandler: function(){
        if (plScreenState.eventState == 1){
            plScreenState.eventState = 0
        }
        else {
            plScreenState.eventState = 1
            if (plScreenState.state == 0) {
                plScreenState.state = 1
                plScreenState.fromScreen = this.$.Breadcrumb.page
                this.$.Breadcrumb.setCurrentPageWithTap(APP_PROGRESS.PR_WIRING);
             }
            else{
                plScreenState.state = 0
                this.$.Breadcrumb.setCurrentPageWithTap(plScreenState.fromScreen);
                plScreenState.fromScreen = null
            }
        }
    },
    tapHandler: function(inSender, inEvent) {
        if(inEvent.originator.name == 'PreviousPageButton') {
            Signals.send('onPageChanged', {page: APPS.APP_FILEVIEWER});
        }
    },
    onChildPageChanged: function(inSender, inEvent) {
        this.$.Breadcrumb.setCurrentPageWithTap(inEvent.page);
    },
    onProgressChanged: function(inSender, inEvent) {
        // Set current page
        this.$.Breadcrumb.setCurrentPage(inEvent.page);
        this.$.PGMasterPanels.setIndex(inEvent.page);

        // Check show BtAATab
        if(inEvent.page === APP_PROGRESS.PR_SYSTEM) {
            this.$.BtAddTab.show();
        } else {
            this.$.BtAddTab.hide();
        }
        // Check Chop show
        this.chopStatus(inEvent.page);
    },
    // Check Chop show
    chopStatus: function(page) {
        if(page === APP_PROGRESS.PR_SETUP || page === APP_PROGRESS.PR_WIRING) {
            this.$.Chop.show();
        } else {
            this.$.Chop.hide();
        }
    },
    transitionStart: function(inSender, inEvent) {
        // Reset drag info
        delete PL.dragImage.ready;
        delete PL.dragImage.info;

        //Signals.send('onDragImage', {
        //    info: undefined,
        //    image: undefined,
        //    showing: false
        //});
    },
    transitionComplete: function(inSender, inEvent) {
        if(inEvent.originator.name === 'PGMasterPanels') {
            this.currentPanel = this.$.PGMasterPanels.getActive();

            PL.currentPanel = this.currentPanel;
            if(typeof this.currentPanel.init === 'function') {
                this.currentPanel.init();
            }

            if(this.currentPanel) {
                // if(this.currentPanel.name !== 'WiringPanel') {
                //     //this.currentPanel.setProgress(100);
                // }
                if(this.currentPanel.name == 'CommissionPanel') {
                    this.currentPanel.setProgress(100);
                }
            }

            // Check Chop show
            this.chopStatus(inEvent.toIndex);
        }
    },
    // It should just undo the last things done
    undo: function(inSender) {
        if(typeof this.currentPanel.undo === 'function') {
            this.currentPanel.undo();
        }

        // Delay SiteBuilder (for CSS 3)
        if(this.$.PGMasterPanels.getIndex() === APP_PROGRESS.PR_SITE) {
            inSender.disabled = true;
            setTimeout(function() {
                inSender.disabled = false;
            }, 600);
        }
    }
});

},{'./setup/setup.js':'src/views/progress/setup/setup','./site/site.js':'src/views/progress/site/site','./system/system.js':'src/views/progress/system/system','./interface/interface.js':'src/views/progress/interface/interface','./wiring/wiring.js':'src/views/progress/wiring/wiring','./commission/commission.js':'src/views/progress/commission/commission','../../components/button.js':'src/components/button','./breadcrumbs/breadcrumbs.js':'src/views/progress/breadcrumbs/breadcrumbs','./screenState.js':'src/views/progress/screenState'}],'src/views/MainView':[function (module,exports,global,require,request){
/**
 For simple applications, you might define all of your views in this file.
 For more complex applications, you might choose to separate these kind definitions
 into multiple files under this folder.
 */

var kind = require('enyo/kind'),
    bind = require('enyo/utils').bind,
    Signals = require('enyo/Signals'),
    Control = require('enyo/Control'),
    Image = require('enyo/Image'),
    FittableRows = require('layout/FittableRows'),
    Panels = require('layout/Panels'),
    Popup = require('onyx/Popup'),
    Spinner = require('onyx/Spinner'),
    Button = require('onyx/Button'),
    FittableColumns = require('layout/FittableColumns'),
    Notification = require('enyo-external/Notification'),
    Scroller = require('enyo/Scroller');

var utils = require('../common/services/utils.js');

var plProgressView = require('./progress/progress.js');

module.exports = kind({
    name: 'pl.MainView',
    kind: FittableRows,
    classes: 'app enyo-fit enyo-unselectable',
    handlers: {
        ontap: 'tapHandler'
    },
    components: [
        {
            kind: Panels,
            name: 'AppPanels',
            fit: true,
            realtimeFit: true,
            draggable: false,
            narrowFit: false,
            onTransitionStart: 'transitionStart',
            onTransitionFinish: 'transitionComplete',
            classes: 'app-panels',
            components: [
                {kind: plProgressView, name: 'ProgressPanel', index: APPS.APP_PROGRESS},
            ]
        },
        // Popup
        {name: 'Notification', kind: Notification},
        {
            name: 'Loading', kind: Popup, classes: 'enyo-loading', centered: true, floating: true, scrim: false, autoDismiss: false, components: [
                {kind: Spinner, classes: 'onyx-light'}
            ]
        },
        // Add drag item when drag-drop to create entity
        {name: 'DragItem', kind: Control, classes: 'drag-item', allowHtml: true, showing: false},
        {name: 'DragImage', kind: Image, classes: 'enyo-popup', showing: false},
        {
            kind: Signals,
            onNotification: 'onNotification',
            onLoading: 'onLoading',
            onDragItem: 'onDragItem',
            onDragImage: 'onDragImage',
            onPageChanged: 'onPageChanged',
            onUpdate: 'onUpdate',
            onMouseDown: 'onMouseDown'
        }
        //{
        //    kind: FittableColumns, noStretch: true, classes: 'onyx-toolbar onyx-toolbar-inline',
        //    components: [
        //        {
        //            kind: Scroller,
        //            thumb: false,
        //            fit: true,
        //            touch: true,
        //            vertical: 'hidden',
        //            style: 'margin: 0;',
        //            components: [
        //                {
        //                    classes: 'onyx-toolbar-inline', style: 'white-space: nowrap;',
        //                    components: [
        //                        {kind: Button, content: 'Previous', ontap: 'prevPanel'},
        //                        {kind: Button, content: 'Next', ontap: 'nextPanel'}
        //                    ]
        //                }
        //            ]
        //        }
        //    ]
        //}
    ],
    constructor: function() {
        this.inherited(arguments);
    },
    create: function() {
        this.inherited(arguments);
        PL.dragImage = this.$.DragImage;
    },
    rendered: function() {
        this.inherited(arguments);
        this.dimension();
        this.$.AppPanels.setIndex(APPS.APP_SPLASH);
        this.loadingShowing(false);
    },
    handleResize: function() {
        this.inherited(arguments);
        this.dimension();
    },
    resizeComplete: function() {
        var currentPanel = this.$.AppPanels.getActive();
        if(typeof currentPanel.resizeComplete === 'function') {
            currentPanel.resizeComplete();
        }
        this.loadingShowing(false);
    },
    resizeStopped: function() {
        var currentPanel = this.$.AppPanels.getActive();
        if(typeof currentPanel.resizeStopped === 'function') {
            currentPanel.resizeStopped();
        }
    },
    // Set global variables
    dimension: function() {
        PL.app = this;
        SETTINGS.height = utils.getCSSProperty(this.$.AppPanels, 'offsetHeight', false);
        SETTINGS.width = utils.getCSSProperty(this.$.AppPanels, 'offsetWidth', false);
        SETTINGS.header = 40;
        SETTINGS.footer = 40;
    },
    loadingShowing: function(showing) {
        // Hash code: Turn off lazy loading
//        showing = false;
//        if(showing) {
//            this.$.Loading.show();
//        } else {
//            this.$.Loading.hide();
//        }
    },
    tapHandler: function(inSender, inEvent) {
        Signals.send('onCheckInput', {sender: inEvent.originator});
    },
    transitionStart: function(inSender, inEvent) {
        var panelName = inEvent.originator.name;
        if(
            inEvent.fromIndex === inEvent.toIndex ||
            ['ListItemPanel'].indexOf(panelName) > -1
        ) {
            return;
        }

        this.loadingShowing(true);

        if(panelName === 'AppPanels' && inEvent.toIndex === APPS.APP_SPLASH) {
//            this.$.Loading.centered = false;
            //var wL = utils.getCSSProperty(this.$.Loading, 'offsetWidth', false);
            var wB = utils.getCSSProperty(this, 'offsetWidth', false);
            var percent = (73 / wB) * 50;
//            this.$.Loading.applyStyle('left', (50 - percent) + '%');
//            this.$.Loading.applyStyle('top', '55%');
        } else {
//            this.$.Loading.centered = true;
        }
    },
    transitionComplete: function(inSender, inEvent) {
        if(inEvent.originator.name === 'AppPanels') {
            var currentPanel = this.$.AppPanels.getActive();
            PL.currentPanel = currentPanel;
            if(typeof currentPanel.init === 'function') {
                currentPanel.init();
            }
        }
        this.loadingShowing(false);
    },
    // Notification
    warning: function(message) {
        this.$.Notification.sendNotification({
            title: '',
            message: message,
            icon: 'assets/images/temps/icons/warning.png',
            theme: 'notification.Bezel',
            stay: undefined,
            duration: 2
        }, bind(this, function(notif) {
            this.$[notif.originator.name].removeAllNotifications(true);
        }));
    },
    onNotification: function(inSender, inEvent) {
        if(inEvent.method === 'message') {
            this.warning(inEvent.message);
        } else if(inEvent.method === 'close') {
            this.$.Notification.removeAllNotifications(false);
        }
    },
    onLoading: function(inSender, inEvent) {
        if(inEvent.method === 'show') {
            this.loadingShowing(true);
        } else if(inEvent.method === 'hide') {
            this.loadingShowing(false);
        }
    },
    onPageChanged: function(inSender, inEvent) {
        this.$.AppPanels.setIndex(inEvent.page);
        if(!!inEvent.childPage) {
            Signals.send('onChildPageChanged', {page: inEvent.childPage});
        }
    },
    onDragItem: function(inSender, inEvent) {
        if(inEvent.showing === true) {
            this.$.DragItem.setShowing(true);
        }
        if(inEvent.showing === false) {
            this.$.DragItem.setShowing(false);
            var classes = this.$.DragItem.getAttribute('class').split(' ');
            for(var i = 0; i < classes.length; i++) {
                if(classes[i] != 'drag-item') this.$.DragItem.removeClass(classes[i]);
            }
            this.$.DragItem.setStyle('');
            this.$.DragItem.setContent('');
        }
        if(inEvent.content) {
            this.$.DragItem.setContent(inEvent.content);
        }
        if(inEvent.classes) {
            if(typeof inEvent.classes === 'object') {
                for(var i = 0; i < inEvent.classes.length; i++) {
                    if(!this.$.DragItem.hasClass(inEvent.classes[i])) {
                        this.$.DragItem.addClass(inEvent.classes[i]);
                    }
                }
            } else {
                if(!this.$.DragItem.hasClass(inEvent.classes)) {
                    this.$.DragItem.addClass(inEvent.classes);
                }
            }
        }
        if(inEvent.pos) {
            this.$.DragItem.addStyles('top:' + inEvent.pos.y + 'px;left:' + inEvent.pos.x + 'px');
        }
        if(inEvent.styles && typeof inEvent.styles === 'object') {
            for(var i = 0; i < inEvent.styles.length; i++) {
                var styles = inEvent.styles[i];
                for(var key in styles) {
                    this.$.DragItem.applyStyle(key, styles[key]);
                }
            }
        }
    },
    onDragImage: function(inSender, inEvent) {
        if(!!inEvent.info) {
            this.$.DragImage.info = inEvent.info;
        }
        if(!!inEvent.image) {
            this.$.DragImage.setSrc(inEvent.image);
        }
        if(!!inEvent.styles) {
            this.$.DragImage.addStyles(inEvent.styles);
        }
        if(!!inEvent.showing) {
            this.$.DragImage.show();
        } else {
            this.$.DragImage.hide();
        }
    },
    onUpdate: function(inSender, inEvent) {
        console.log('test');
    },
    onMouseDown: function() {
        this.$.Notification.removeAllNotifications(false);
    }
    //prevPanel: function() {
    //    this.$.AppPanels.previous();
    //},
    //nextPanel: function() {
    //    this.$.AppPanels.next();
    //}
});

},{'../common/services/utils.js':'src/common/services/utils','./progress/progress.js':'src/views/progress/progress'}],'src/app':[function (module,exports,global,require,request){
/*** Application init and global event ***/

var kind = require('enyo/kind'),
    Application = require('enyo/Application'),
    Signals = require('enyo/Signals'),
    plMainView = require('./views/MainView.js'),
    StaticDataModel = require('./data/data.js');

var app = module.exports = kind({
    name: 'pl.Application',
    kind: Application,
    components: [{kind: StaticDataModel, name: "data"}],
    view: plMainView,
    constructor: function() {
        this.inherited(arguments);
        if(DEBUG) {
            //PL.baseUrl = '';
            this.baseUrl = PL.baseUrl;
        }
    }
});

//*** EVENT RESIZE
//var resizeTimer;
//window.onresize = function() {
//    console.log("mainView %O", app);
//
//    if(typeof app.$.mainView.resizeComplete === 'function') {
//        app.$.mainView.resizeComplete();
//    }
//
//    clearTimeout(resizeTimer);
//    resizeTimer = setTimeout(function() {
//        // Run code here, resizing has 'stopped'
//        if(typeof app.$.mainView.resizeStopped === 'function') {
//            app.$.mainView.resizeStopped();
//        }
//    }, 250);
//};

window.ondragstart = function() {
    return false;
};

//*** KEY EVENT
function keydown(e) {
    PL.keyCode = e.keyCode;

    switch(e.keyCode) {
        case 13: // enter
        {
            break;
        }
        case 16: // shift
        {
            if(typeof PL.currentPanel.zoomIn === 'function') {
                PL.currentPanel.zoomIn();
            }
            break;
        }
        case 17: // ctrl
        {
            break;
        }
        case 27: //escape
        {
            if(PL.currentPanel.index === APP_PROGRESS.PR_SYSTEM) {
                systemGraphic.g.deSelectedItems();
                systemGraphic.panel.activeSelector();
            }
            break;
        }
        case 8: // backspace
        case 46: // delete
        {
            if(typeof PL.currentPanel.deleteSelectedItems === 'function') {
                PL.currentPanel.deleteSelectedItems();
            }
            break;
        }
    }

    Signals.send('onKeyDown', {keyCode: e.keyCode});
}

function keyup(e) {
    PL.keyCode = undefined;

    switch(e.keyCode) {
        case 16: // shift
        {
            if(typeof PL.currentPanel.zoomOut === 'function') {
                PL.currentPanel.zoomOut();
            }
            break;
        }
        case 17: // ctrl
            break;
    }

    Signals.send('onKeyUp', {keyCode: e.keyCode});
}

//*** MOUSE EVENT
function mousedown(e) {
    Signals.send('onMouseDown', e);
}

function mouseup(e) {
    Signals.send('onMouseUp', e);
}

//*** ALL EVENT
var dispatcher = require('enyo/dispatcher');
dispatcher.listen(window, 'mousedown', mousedown);
dispatcher.listen(window, 'touchstart', mousedown);
dispatcher.listen(window, 'mouseup', mouseup);
dispatcher.listen(window, 'touchend', mouseup);
dispatcher.listen(window, 'keydown', keydown);
dispatcher.listen(window, 'keyup', keyup);

//var KEYBOARD = true;
//$(window).bind({
//    'touchstart mousedown touchmove mousemove touchend mouseup': function(e) {
//        //e.preventDefault();
//        if(e.type === 'mousedown' || e.type === 'touchstart') mousedown(e);
//        if(e.type === 'mouseup' || e.type === 'touchend') mouseup(e);
//    },
//    'keydown keypress keyup': function(e) {
//        if(!KEYBOARD) e.preventDefault();
//        if(e.type === 'keydown') keydown(e);
//        if(e.type === 'keyup') keyup(e);
//    }
//
//});

},{'./views/MainView.js':'src/views/MainView','./data/data.js':'src/data/data'}],'index':[function (module,exports,global,require,request){
/**
	Instantiate your enyo/Application kind in this file.  Note, application
	rendering should be deferred until the DOM is ready by wrapping it in a
	call to ready().
*/

var ready = require('enyo/ready'),
    App = require('./src/app.js');

ready(function () {
    google.charts.load('current', {
        'packages': ['corechart', 'gantt'],
        'callback': function () {
            new App().renderInto(document.body);
        }
    });
});

},{'./src/app.js':'src/app'}]
	};

});
//# sourceMappingURL=HiveClient.js.map