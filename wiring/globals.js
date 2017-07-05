'user strict';

// Global variables
var PL = {
    app: undefined,
    currentPanel: undefined,
    dragImage: undefined,
    keycode: undefined,
    keyCode: undefined,
    baseUrl: ""
    //baseUrl: "http://localhost/passivelogic/"
};

var SETTINGS = {
    height: 0,
    width: 0,
    header: 40,
    footer: 40
};

var ALIGN = {
    VB: 'vb',
    VC: 'vc',
    VT: 'vt',
    HL: 'hl',
    HC: 'hc',
    HR: 'hr'
};

var TOOLBARS = {
    TANK_SETTINGS: 200,
    ZONE_MANIFOLD: 450,
    SITE_BUILDER: 400,
    INTERFACE_SETTING: 200
};

var METHOD = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
};

var HANDLEAS = {
    TEXT: "text",
    JSON: "json",
    XML: "xml"
};

// Project type
var FLOOR_TYPES = {
    ESTIMATE: 'estimate',
    ACCURATE: 'accurate'
};

var ZONE_TYPES = {};

// Sensor types
var SENSOR_TYPES = {
    NONE: 0,
    ONE_WIRE: 1,
    TWO_WIRE: 2,
    THREE_WIRE: 3,
    FOUR_WIRE: 4
};

/***
 * Current Value: Temperature (random between 65-76°F), humidity ( 25-40%), CO2 = 725 ppm) Analysis = if (X)
 */
var SENSOR_KINDS = {
    TEMPERATURE: 'temperature',
    HUMIDITY: 'humidity'
};

var SENSOR_CLASSES = {
    SENSOR: 'sensor'
};

var SENSOR_TEMPERATURE_VALUE = {
    min: 65,
    max: 76
};

var SENSOR_HUMIDITY_VALUE = {
    min: 25,
    max: 40
};

// component types in sensor
var EQUIPMENT_TYPES = {
    NONE: '',
    TANK: 'Tank',
    ZONE: 'Zone'
};

// Equipment Builder
var ANIMATION_TYPES = {
    ROTATE: 'ROTATE',
    SCALE: 'SCALE',
    COLOR: 'COLOR',
    FLIP: 'FLIP',
    FLOW: 'FLOW'
};
var ANIMATION_METHODS = {
    LINEAR_BLEND: 'LINEAR BLEND',
    BOOLEAN: 'BOOLEAN'
};

// End Equipment Builder
var CONNECTION_TYPES = {
    NONE: 'none',
    INPUT: 'input',
    OUTPUT: 'output'
};

var CONNECTION_METHODS = {
    IN_LEFT_RIGHT: 'in-left-right',
    IN_RIGHT_LEFT: 'in-right-left',
    IN_TOP_BOTTOM: 'in-top-bottom',
    IN_BOTTOM_TOP: 'in-bottom-top',
    OUT_LEFT_RIGHT: 'out-left-right',
    OUT_RIGHT_LEFT: 'out-right-left',
    OUT_TOP_BOTTOM: 'out-top-bottom',
    OUT_BOTTOM_TOP: 'out-bottom-top',
    NONE: 'none'
};

var SHAPE_TYPES = {
    NONE: 'none',
    RECTANGLE: 'rect',
    CIRCLE: 'circle',
    ELLIPSE: 'ellipse',
    POLYGON: 'polygon',
    POLYLINE: 'polyline'
};

var OBJECTS = {
    EQUIPMENT: 'equipment',
    ENTITY: 'entity',
    SHAPE: 'shape',
    TEXT: 'text',
    EDGE: 'edge',
    CONNECTION: 'connection',
    HOLDER: 'holder',
    SENSOR: 'sensor',
    CONTROL: 'control',
    CONTROLLER: 'controller',
    ADAPTOR: 'adaptor',
    GROUP: 'group',
    POINTER: 'pointer',
    TIMER: 'timer'
};

var POINTER_TYPE = {
    ARROW: 'arrow',
    POINTER: 'pointer',
    HAND: 'hand',
    ZOOM_IN: 'zoom-in',
    ZOOM_OUT: 'zoom-out'
};

// flag on icon layout
var toolIcons = {
    isConnector: false,
    isSelector: true,
    isOutline: false,
    isParallel: false,
    isAddText: false,
    isAddPolyline: false,
    isAddRectangle: false,
    isAddCircle: false,
    isAlignItem: false,
    isMoving: false,
    isCollapsed: false,
    isZoom: false,
    isZoomToFit: false,
    isParallel: false
};

// Interface items
var INTERFACE_ITEM_TYPE = {
    CONTROL: 'control',
    INDICATOR: 'indicator',
    USER_INPUT: 'user_input',
    CONTAINER: 'container'
};

var CONTAINER_TYPE = {
    HORIZONTAL: 'horizontal',
    VERTICAL: 'vertical'
};

var BUILDING_SITE_TYPES = {
    COMMERCIAL: 'commercial',
    RESIDENTIAL: 'residential',
    INDUSTRIAL: 'industrial'
};

// object draw
var viewport = new Object();
