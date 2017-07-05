var DEBUG = true;

var GB = {
    isStart: false,
    points: new Array(),
    width: 615,
    height: 903
};

var APPS = {
    APP_SPLASH: 0,
    APP_STARTUP: 1,
    APP_FILEVIEWER: 2,
    APP_PROGRESS: 3,
    APP_EQUIPMENT: 4,
    APP_RUNTIME: 5
};

var APP_PROGRESS = {
    PR_SETUP: 0,
    PR_SITE: 1,
    PR_SYSTEM: 2,
    PR_INTERFACE: 3,
    PR_WIRING: 4,
    PR_COMMISSION: 5,
    PR_SETUP_SITE_INFO: 6,
    PR_SETUP_BUILDING_INFO: 7,
    PR_WIRING_AUTO_SETUP: 8,
    PR_WIRING_DEVICE_WIRING: 9
};

var APP_RUNTIME = {
    RT_HOMEPAGE: 0,
    RT_FLOORS: 1,
    RT_ZONELIST: 2,
    RT_LOGSDASHBOARD: 3,
    RT_MECHANICAL: 4,
    RT_PREFERENCES: 5
};

var PROPERTY_NAMES = {
    width: 'offsetWidth',
    height: 'offsetHeight'
};

var PROGRESS = {
    SETUP: 0,
    SETUP_SITE_INFO: 0,
    SETUP_BUILDING_INFO: 0,
    SITE_BUILDER: 0,
    SYSTEM_BUILDER: 0,
    INTERFACE: 0,
    WIRING: 0,
    WIRING_AUTO_SETUP: 0,
    WIRING_DEVICE_WIRING: 0,
    COMMISSION: 0
};

var FILEVIEWER_SETTING = {
    placeholderColor: '#fbf9ee',
    animatorDuration: 100,
    popupDuration: 0.4 // seconds
};

var SITE_SETTING = {
    perspective: 800,
    rotateX: 75, // deg
    fillColor: '#FF0040',
    hue: 35/360, // degree
    saturation: 1,
    brightness: 0.75, // value or brightness
    luminosity: 0.3,
    transparency: 0.35,
    holdTime: 500, // milliseconds
    duration: 0.4, // seconds
    gridOpacity: 0.4 // make the background grid more transparent
};

var WIRING_SETTING = {
    RELOAD: false,
    SENSOR_LIST_MAXIMUM: 50,
    SENSOR_LIMIT: 4,
    ANIMATION_DURATION: 0.15 // seconds
};

// Get prefix browser
var PREFIX = (function() {
    var styles = window.getComputedStyle(document.documentElement, ''),
        pre = (Array.prototype.slice
            .call(styles)
            .join('')
            .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
        )[1],
        dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
    return {
        dom: dom,
        lowercase: pre,
        css: '-' + pre + '-',
        js: pre[0].toUpperCase() + pre.substr(1)
    };
})();

// Get browser
var BROWSER = (function() {
    var browser = new Object();
    var userAgent = navigator.userAgent;
    if(userAgent.indexOf('Chrome') !== -1) {
        browser.chrome = true;
    } else if(userAgent.indexOf('Firefox') !== -1) {
        browser.firefox = true;
    } else if(userAgent.indexOf('Safari') !== -1) {
        browser.safari = true;
    } else if(userAgent.indexOf('MSIE') !== -1) {
        browser.msie = true;
        if(userAgent.indexOf('6.0') !== -1) {
            browser.version = '6.0';
        } else if(userAgent.indexOf('7.0') !== -1) {
            browser.version = '7.0';
        } else if(userAgent.indexOf('8.0') !== -1) {
            browser.version = '8.0';
        } else if(userAgent.indexOf('9.0') !== -1) {
            browser.version = '9.0';
        } else {
            browser.version = '10.0';
        }
    }
    return browser;
})();

var PLATFORM = (function() {
    return {
        mac: navigator.platform.toUpperCase().indexOf('MAC') > -1,
        win: navigator.platform.toUpperCase().indexOf('WIN') > -1,
        unix: navigator.platform.toUpperCase().indexOf('X11') > -1,
        linux: navigator.platform.toUpperCase().indexOf('Linux') > -1
    };
})();

// Check is mobile
var IS_MOBILE = (function() {
    var a = navigator.userAgent || navigator.vendor || window.opera;
    if(/android|android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
        return true;
    } else {
        return false;
    }
})();

// Check touch
//var p = require('enyo/platform');
