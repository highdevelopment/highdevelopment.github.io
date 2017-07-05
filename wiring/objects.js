/*========= object controller ==========*/
'use strict';

/*--------- collection ------------*/
var Collection = Class.extend({
    init: function() {
        this.collection = new Array();
        this.count = 0;
        this.autoIncrement = -1;
    },
    //add item
    add: function(item, isKey) {
        this.autoIncrement++;
        if(isKey) {
            item.id = this.getAutoKey();
        }
        // push item into array
        this.collection.push(item);
        this.count++;
        return this.count;
    },
    //update item
    change: function(newVal) {
        for(var i = 0; i < this.count; i++) {
            if(this.collection[i].id === newVal.id) {
                this.collection[i] = newVal;
                return true;
            }
        }
        return false;
    },
    //remove item
    remove: function(item) {
        for(var i = 0; i < this.count; i++) {
            var obj = this.collection[i];
            if(item.id === obj.id) {
                this.collection.splice(i, 1);
                this.count--;
                return true;
            }
        }
        return false;
    },
    removeById: function(id) {
        var item = this.itemByID(id);
        if(item) {
            this.remove(item);
        }
    },
    //get item
    item: function(index) {
        if(this.collection[index] == undefined) {
            return null;
        }
        return this.collection[index];
    },
    // get item by id
    itemByID: function(id) {
        for(var i = 0; i < this.count; i++) {
            if(this.collection[i].id == id) {
                return this.collection[i];
            }
        }
        return null;
    },
    // get item by name
    itemByName: function(name) {
        for(var i = 0; i < this.count; i++) {
            if(this.collection[i].name == name) {
                return this.collection[i];
            }
        }
        return null;
    },
    // get auto key
    getAutoKey: function() {
        //if(this.count <= 0) {
        //    return 0;
        //}
        //return this.collection[this.count - 1].id + 1;

        return this.autoIncrement;
    },
    // get each item in array items (loop for - foreach)
    forEach: function(callback) {
        if(typeof callback == 'function') {
            for(var i = 0; i < this.count; i++) {
                // get callback run with each value
                callback.call(false, this.collection[i], i, this);
            }
        }
    },
    sort: function(propertyName) {
        if(propertyName) {
            this.collection.sort(function(a, b) {
                if(a[propertyName] == b[propertyName]) {
                    return 0;
                } else if(a[propertyName] > b[propertyName]) {
                    return 1;
                }
                return -1;
            })
        } else {
            this.collection.sort();
        }
        return this;
    },
    sortAlphabet: function(propertyName) {
        if(propertyName) {
            var a, b, a1, b1, rx = /(\d+)|(\D+)/g, rd = /\d+/;
            this.collection.sort(function(as, bs) {
                a = String(as[propertyName]).toLowerCase().match(rx);
                b = String(bs[propertyName]).toLowerCase().match(rx);
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
        } else {
            this.collection.sort();
        }
        return this;
    }
});

//.. base entity
var BaseEntity = Class.extend({
    init: function() {
        this.id = -1;
    }
});

// folder object
var Folder = BaseEntity.extend({
    init: function(name) {
        this.id = -1;
        this.name = name || 'Folder';
        this.projects = new Collection();
    }
});

// project object
var Project = BaseEntity.extend({
    init: function(name, notes) {
        this.id = -1;
        this.name = name || 'New Project';
        this.notes = notes || 'Project\'s Description';
        // Begin ControlType
        this.hvacSystem = false;
        this.lighting = false;
        this.irrigation = false;
        // End ControlType
        this.buildingSiteType = 'commercial' || 'residential' || 'industrial' || 'other';
        // Begin Location
        this.address = '';
        this.north = 0;
        this.west = 0;
        this.altitude = '';
        // End location
        this.importBuildingModelOption = '';
        // Begin BuildingMechanical
        uValueArea: 0;
        uValueType: 'estimate' || 'accurate';
        heatingDesignDay: 0;
        coolingDesignDay: 0;
        pickerDesignDay: 99;
        // End BuildingMechanical
        floors: new Collection()
    }
});

// Sensor object
var Sensor = BaseEntity.extend({
    init: function(type, name, url, x, y, w, h) {
        this.id = -1;
        this.type = type || SENSOR_TYPES.NONE;
        this.objType = OBJECTS.SENSOR;
        this.name = name || 'Sensor';
        this.url = url || 'resources/images/';
        this.x = x || 0;
        this.y = y || 0;
        this.w = w || 30;
        this.h = h || 30;
        this.option = {opt: '10k RTD', coefficientA: '', coefficientB: ''};
        this.items = new Collection();
    }
});
// control object
var Control = BaseEntity.extend({
    init: function(type, kind, name, url, x, y, width, height, data) {
        this.id = -1;
        this.type = type || OBJECTS.CONTROL;
        this.objType = OBJECTS.CONTROL;
        this.objKind = kind;
        this.name = name || 'Control';
        this.url = url || 'resources/images/';
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 0;
        this.height = height || 0;
        this.data = data || {};
    }
});

// controller
var Controller = BaseEntity.extend({
    init: function(id, name, url, x, y, w, h) {
        this.id = id || 0;
        this.objType = OBJECTS.CONTROLLER;
        this.name = name || 'Controller';
        this.url = url;
        this.x = x || 0;
        this.y = y || 0;
        this.w = w || 130;
        this.h = h || 90;
        this.adaptors = new Collection();
    }
});

// adaptor
var Adaptor = BaseEntity.extend({
    init: function(id, name, controllerId, url, x, y, w, h) {
        this.id = id || 0;
        this.objType = OBJECTS.ADAPTOR;
        this.name = name || 'Adaptor';
        this.controllerId = controllerId || 0;
        this.url = url;
        this.x = x || 0;
        this.y = y || 0;
        this.w = w || 88;
        this.h = h || 54;
        this.sensors = new Collection();
    }
});

// Sensor for adaptor
var SensorForAdaptor = BaseEntity.extend({
    init: function(controllerId, adaptorId, floorId, zoneId, sensorId, url, x, y, w, h, sender) {
        this.id = -1;
        this.objType = OBJECTS.SENSOR;
        this.controllerId = controllerId;
        this.adaptorId = adaptorId;
        this.floorId = floorId;
        this.zoneId = zoneId;
        this.sensorId = sensorId;
        this.url = url;
        this.x = x || 0;
        this.y = y || 0;
        this.w = w || 30;
        this.h = h || 30;
        this.sender = sender
    }
});

/* ============== objects ============= */
/*--------- equipment --------*/
var Equipment = BaseEntity.extend({
    init: function(info) {
        this.id = -1;
        this.kind = info.kind;
        this.type = info.kind || EQIUPMENT_TYPES.NONE;
        this.objType = OBJECTS.EQUIPMENT;
        this.svg = info.svg;
        this.holders = info.holders || [];
        this.parallel = info.parallel || 0;
        this.x = info.x || 0;
        this.y = info.y || 0;
        this.width = info.width || 0;
        this.height = info.height || 0;
        this.animation = {
            rotate: 0,
            scale: 1,
            flip: false,
            color: '#ffffff',
            flow: null
        };
    }
});

var Shape = BaseEntity.extend({
    init: function(type, x, y, w, h, points) {
        this.id = -1;
        this.type = type || SHAPE_TYPES.NONE;
        this.objType = OBJECTS.SHAPE;
        this.x = x || 0;
        this.y = y || 0;
        this.w = w || 0;
        this.width = w || 0;
        this.h = h || 0;
        this.height = h || 0;
        this.points = points || [];
        this.path = points || [];
        this.animation = {
            rotate: 0,
            scale: 1,
            flip: false,
            color: '#000000',
            flow: null
        };
    },
    setWidth: function(w) {
        this.w = parseFloat(w);
        this.width = this.w
    },
    setHeight: function(h) {
        this.h = parseFloat(h);
        this.height = this.h
    }
});

/*--------- text --------*/
var Text = BaseEntity.extend({
    init: function(x, y, text, fontSize) {
        this.id = -1;
        //this.type = type;
        this.objType = OBJECTS.TEXT;
        this.x = x || 0;
        this.y = y || 0;
        this.text = text || '';
        this.fontSize = fontSize || 20;
        this.animation = {
            rotate: 0,
            scale: 1,
            flip: false,
            color: '#000000',
            flow: null
        };
    }
});

/*--------- connection --------*/
var Connection = BaseEntity.extend({
    init: function(from, to, fromHolder, toHolder, color) {
        this.id = -1;
        this.color = color || '#c8c8c8c';
        this.from = from;
        this.to = to;
        this.fromHolder = fromHolder || -1;
        this.toHolder = toHolder || -1;
        this.objType = OBJECTS.CONNECTION;
    },
    clone: function() {
        var res = new Connection();
        res.id = this.id;
        res.color = this.color;
        res.from = this.from;
        res.to = this.to;
        res.fromHolder = this.fromHolder;
        res.toHolder = this.toHolder;
        res.objType = this.objType;
        return res;
    }
});

// Animaton object
var Animation = BaseEntity.extend({
    init: function(rotate, scale, flip, color, flow) {
        this.rotate = rotate || 0;
        this.scale = scale || 1;
        this.flip = flip || null;
        this.color = color || '#ffffff';
        this.flow = flow || null;
    }
});
