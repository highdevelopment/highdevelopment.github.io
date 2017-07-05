/*jslint */
/*global AdobeEdge: false, window: false, document: false, console:false, alert: false */
(function (compId) {

    "use strict";
    var im='images/',
        aud='media/',
        vid='media/',
        js='js/',
        fonts = {
        },
        opts = {
            'gAudioPreloadPreference': 'auto',
            'gVideoPreloadPreference': 'auto'
        },
        resources = [
        ],
        scripts = [
            js+"jquery-2.2.3.min.js",
            js+"jquery-ui.min.js"
        ],
        symbols = {
            "stage": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "width",
                centerStage: "horizontal",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            id: 'nokia-logo',
                            type: 'image',
                            rect: ['813px', '845px', '1850px', '310px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"nokia-logo.svg",'0px','0px'],
                            transform: [[],[],[],['0.1','0.1']]
                        },
                        {
                            id: 'smp-nodes-network',
                            type: 'image',
                            rect: ['774px', '234px', '371px', '367px', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(0,0,0,0)",im+"smp-nodes-network.svg",'0px','0px'],
                            transform: [[],['90'],[],['0.3','0.3']]
                        },
                        {
                            id: 'workflow',
                            type: 'image',
                            rect: ['872px', '329px', '175px', '177px', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(0,0,0,0)",im+"workflow.svg",'0px','0px'],
                            transform: [[],['-90'],[],['0.3','0.3']]
                        },
                        {
                            id: 'Text',
                            type: 'text',
                            rect: ['799px', '114px', 'auto', 'auto', 'auto', 'auto'],
                            opacity: '0',
                            text: "<p style=\"margin: 0px;\">​Service Management Platform</p><p style=\"margin: 0px;\">​Workflow Engine</p>",
                            align: "center",
                            font: ['Arial, Helvetica, sans-serif', [24, ""], "rgba(18,65,145,1.00)", "normal", "none", "", "break-word", "nowrap"]
                        },
                        {
                            id: 'Rectangle',
                            type: 'rect',
                            rect: ['358px', '700px', '100px', '100px', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(77,87,102,1.00)"],
                            stroke: [2,"rgb(18, 65, 145)","none"]
                        },
                        {
                            id: 'Text3',
                            type: 'text',
                            rect: ['369px', '711px', 'auto', 'auto', 'auto', 'auto'],
                            text: "<p style=\"margin: 0px;\">​Call</p><p style=\"margin: 0px;\">Duration</p>",
                            align: "left",
                            font: ['Arial, Helvetica, sans-serif', [15, "px"], "rgba(255,255,255,1.00)", "400", "none", "normal", "break-word", "nowrap"],
                            textStyle: ["", "", "", "", "none"]
                        },
                        {
                            id: 'RectangleCopy',
                            type: 'rect',
                            rect: ['468px', '700px', '100px', '100px', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(77,87,102,1.00)"],
                            stroke: [2,"rgb(18, 65, 145)","none"]
                        },
                        {
                            id: 'Text3Copy2',
                            type: 'text',
                            rect: ['478px', '711px', 'auto', 'auto', 'auto', 'auto'],
                            text: "<p style=\"margin: 0px;\">​Call</p><p style=\"margin: 0px;\">URL</p>",
                            align: "left",
                            font: ['Arial, Helvetica, sans-serif', [15, "px"], "rgba(255,255,255,1.00)", "400", "none", "normal", "break-word", "nowrap"],
                            textStyle: ["", "", "", "", "none"]
                        },
                        {
                            id: 'RectangleCopy3',
                            type: 'rect',
                            rect: ['579px', '700px', '100px', '100px', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(77,87,102,1.00)"],
                            stroke: [2,"rgb(18, 65, 145)","none"]
                        },
                        {
                            id: 'Text3Copy3',
                            type: 'text',
                            rect: ['589px', '711px', 'auto', 'auto', 'auto', 'auto'],
                            text: "<p style=\"margin: 0px;\">​Call</p><p style=\"margin: 0px;\">URL</p>",
                            align: "left",
                            font: ['Arial, Helvetica, sans-serif', [15, "px"], "rgba(255,255,255,1.00)", "400", "none", "normal", "break-word", "nowrap"],
                            textStyle: ["", "", "", "", "none"]
                        },
                        {
                            id: 'RectangleCopy2',
                            type: 'rect',
                            rect: ['689px', '700px', '100px', '100px', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(77,87,102,1.00)"],
                            stroke: [2,"rgb(18, 65, 145)","none"]
                        },
                        {
                            id: 'Text3Copy4',
                            type: 'text',
                            rect: ['699px', '711px', 'auto', 'auto', 'auto', 'auto'],
                            text: "<p style=\"margin: 0px;\">​Call</p><p style=\"margin: 0px;\">Open</p><p style=\"margin: 0px;\">​Reason</p>",
                            align: "left",
                            font: ['Arial, Helvetica, sans-serif', [15, "px"], "rgba(255,255,255,1.00)", "400", "none", "normal", "break-word", "nowrap"],
                            textStyle: ["", "", "", "", "none"]
                        },
                        {
                            id: 'RectangleCopy7',
                            type: 'rect',
                            rect: ['799px', '700px', '100px', '100px', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(77,87,102,1.00)"],
                            stroke: [2,"rgb(18, 65, 145)","none"]
                        },
                        {
                            id: 'Text3Copy5',
                            type: 'text',
                            rect: ['811px', '711px', 'auto', 'auto', 'auto', 'auto'],
                            text: "<p style=\"margin: 0px;\">​Call</p><p style=\"margin: 0px;\">Open</p><p style=\"margin: 0px;\">​Reason</p>",
                            align: "left",
                            font: ['Arial, Helvetica, sans-serif', [15, "px"], "rgba(255,255,255,1.00)", "400", "none", "normal", "break-word", "nowrap"],
                            textStyle: ["", "", "", "", "none"]
                        },
                        {
                            id: 'RectangleCopy6',
                            type: 'rect',
                            rect: ['910px', '700px', '100px', '100px', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(77,87,102,1.00)"],
                            stroke: [2,"rgb(18, 65, 145)","none"]
                        },
                        {
                            id: 'Text3Copy6',
                            type: 'text',
                            rect: ['922px', '711px', 'auto', 'auto', 'auto', 'auto'],
                            text: "<p style=\"margin: 0px;\">Codec</p>",
                            align: "left",
                            font: ['Arial, Helvetica, sans-serif', [15, "px"], "rgba(255,255,255,1.00)", "400", "none", "normal", "break-word", "nowrap"],
                            textStyle: ["", "", "", "", "none"]
                        },
                        {
                            id: 'RectangleCopy5',
                            type: 'rect',
                            rect: ['1020px', '700px', '100px', '100px', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(77,87,102,1.00)"],
                            stroke: [2,"rgb(18, 65, 145)","none"]
                        },
                        {
                            id: 'Text3Copy7',
                            type: 'text',
                            rect: ['1032px', '711px', 'auto', 'auto', 'auto', 'auto'],
                            text: "<p style=\"margin: 0px;\">Media</p><p style=\"margin: 0px;\">​Direction</p>",
                            align: "left",
                            font: ['Arial, Helvetica, sans-serif', [15, "px"], "rgba(255,255,255,1.00)", "400", "none", "normal", "break-word", "nowrap"],
                            textStyle: ["", "", "", "", "none"]
                        },
                        {
                            id: 'RectangleCopy4',
                            type: 'rect',
                            rect: ['1130px', '700px', '100px', '100px', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(77,87,102,1.00)"],
                            stroke: [2,"rgb(18, 65, 145)","none"]
                        },
                        {
                            id: 'Text3Copy8',
                            type: 'text',
                            rect: ['1142px', '711px', 'auto', 'auto', 'auto', 'auto'],
                            text: "<p style=\"margin: 0px;\">Last Cell</p>",
                            align: "left",
                            font: ['Arial, Helvetica, sans-serif', [15, "px"], "rgba(255,255,255,1.00)", "400", "none", "normal", "break-word", "nowrap"],
                            textStyle: ["", "", "", "", "none"]
                        },
                        {
                            id: 'RectangleCopy17',
                            type: 'rect',
                            rect: ['1240px', '700px', '100px', '100px', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(77,87,102,1.00)"],
                            stroke: [2,"rgb(18, 65, 145)","none"]
                        },
                        {
                            id: 'Text3Copy9',
                            type: 'text',
                            rect: ['1252px', '711px', 'auto', 'auto', 'auto', 'auto'],
                            text: "<p style=\"margin: 0px;\">Technology</p>",
                            align: "left",
                            font: ['Arial, Helvetica, sans-serif', [15, "px"], "rgba(255,255,255,1.00)", "400", "none", "normal", "break-word", "nowrap"],
                            textStyle: ["", "", "", "", "none"]
                        },
                        {
                            id: 'RectangleCopy16',
                            type: 'rect',
                            rect: ['1351px', '700px', '100px', '100px', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(77,87,102,1.00)"],
                            stroke: [2,"rgb(18, 65, 145)","none"]
                        },
                        {
                            id: 'Text3Copy10',
                            type: 'text',
                            rect: ['1362px', '711px', 'auto', 'auto', 'auto', 'auto'],
                            text: "<p style=\"margin: 0px;\">Uplink</p><p style=\"margin: 0px;\">​MOS</p>",
                            align: "left",
                            font: ['Arial, Helvetica, sans-serif', [15, "px"], "rgba(255,255,255,1.00)", "400", "none", "normal", "break-word", "nowrap"],
                            textStyle: ["", "", "", "", "none"]
                        },
                        {
                            id: 'RectangleCopy15',
                            type: 'rect',
                            rect: ['1461px', '700px', '100px', '100px', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(77,87,102,1.00)"],
                            stroke: [2,"rgb(18, 65, 145)","none"]
                        },
                        {
                            id: 'Text3Copy11',
                            type: 'text',
                            rect: ['1472px', '711px', 'auto', 'auto', 'auto', 'auto'],
                            text: "<p style=\"margin: 0px;\">Downlink</p><p style=\"margin: 0px;\">​MOS</p>",
                            align: "left",
                            font: ['Arial, Helvetica, sans-serif', [15, "px"], "rgba(255,255,255,1.00)", "400", "none", "normal", "break-word", "nowrap"],
                            textStyle: ["", "", "", "", "none"]
                        },
                        {
                            id: 'RectangleCopy28',
                            type: 'rect',
                            rect: ['358px', '810px', '100px', '100px', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(190,200,210,1.00)"],
                            stroke: [2,"rgb(18, 65, 145)","none"]
                        },
                        {
                            id: 'Text3Copy34',
                            type: 'text',
                            rect: ['369px', '818px', 'auto', 'auto', 'auto', 'auto'],
                            text: "<p style=\"margin: 0px; color: rgb(18, 65, 145);\">90 Sec</p>",
                            align: "left",
                            font: ['Arial, Helvetica, sans-serif', [15, "px"], "rgba(255,255,255,1.00)", "400", "none", "normal", "break-word", "nowrap"],
                            textStyle: ["", "", "", "", "none"]
                        },
                        {
                            id: 'RectangleCopy27',
                            type: 'rect',
                            rect: ['468px', '810px', '100px', '100px', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(190,200,210,1.00)"],
                            stroke: [2,"rgb(18, 65, 145)","none"]
                        },
                        {
                            id: 'Text3Copy33',
                            type: 'text',
                            rect: ['478px', '818px', 'auto', 'auto', 'auto', 'auto'],
                            text: "<p style=\"margin: 0px;\"><span style=\"color: rgb(18, 65, 145);\">123456789</span></p><p style=\"margin: 0px;\"><span style=\"color: rgb(18, 65, 145);\">​@ims.xx-</span></p><p style=\"margin: 0px;\"><span style=\"color: rgb(18, 65, 145);\">​.yy.com</span></p>",
                            align: "left",
                            font: ['Arial, Helvetica, sans-serif', [15, "px"], "rgba(255,255,255,1.00)", "400", "none", "normal", "break-word", "nowrap"],
                            textStyle: ["", "", "", "", "none"]
                        },
                        {
                            id: 'RectangleCopy26',
                            type: 'rect',
                            rect: ['579px', '810px', '100px', '100px', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(190,200,210,1.00)"],
                            stroke: [2,"rgb(18, 65, 145)","none"]
                        },
                        {
                            id: 'Text3Copy32',
                            type: 'text',
                            rect: ['589px', '818px', 'auto', 'auto', 'auto', 'auto'],
                            text: "<p style=\"margin: 0px;\"><span style=\"color: rgb(18, 65, 145);\">456789123</span></p><p style=\"margin: 0px;\"><span style=\"color: rgb(18, 65, 145);\">​@ims.xx-</span></p><p style=\"margin: 0px;\"><span style=\"color: rgb(18, 65, 145);\">​.yy.com</span></p>",
                            align: "left",
                            font: ['Arial, Helvetica, sans-serif', [15, "px"], "rgba(255,255,255,1.00)", "400", "none", "normal", "break-word", "nowrap"],
                            textStyle: ["", "", "", "", "none"]
                        },
                        {
                            id: 'RectangleCopy25',
                            type: 'rect',
                            rect: ['689px', '810px', '100px', '100px', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(190,200,210,1.00)"],
                            stroke: [2,"rgb(18, 65, 145)","none"]
                        },
                        {
                            id: 'Text3Copy30',
                            type: 'text',
                            rect: ['699px', '818px', 'auto', 'auto', 'auto', 'auto'],
                            text: "<p style=\"margin: 0px;\"><span style=\"color: rgb(18, 65, 145);\">New Call</span></p>",
                            align: "left",
                            font: ['Arial, Helvetica, sans-serif', [15, "px"], "rgba(255,255,255,1.00)", "400", "none", "normal", "break-word", "nowrap"],
                            textStyle: ["", "", "", "", "none"]
                        },
                        {
                            id: 'RectangleCopy24',
                            type: 'rect',
                            rect: ['799px', '810px', '100px', '100px', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(190,200,210,1.00)"],
                            stroke: [2,"rgb(18, 65, 145)","none"]
                        },
                        {
                            id: 'Text3Copy29',
                            type: 'text',
                            rect: ['811px', '818px', 'auto', 'auto', 'auto', 'auto'],
                            text: "<p style=\"margin: 0px;\"><span style=\"color: rgb(18, 65, 145);\">WiFi Ho</span></p>",
                            align: "left",
                            font: ['Arial, Helvetica, sans-serif', [15, "px"], "rgba(255,255,255,1.00)", "400", "none", "normal", "break-word", "nowrap"],
                            textStyle: ["", "", "", "", "none"]
                        },
                        {
                            id: 'RectangleCopy23',
                            type: 'rect',
                            rect: ['910px', '810px', '100px', '100px', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(190,200,210,1.00)"],
                            stroke: [2,"rgb(18, 65, 145)","none"]
                        },
                        {
                            id: 'Text3Copy28',
                            type: 'text',
                            rect: ['922px', '818px', 'auto', 'auto', 'auto', 'auto'],
                            text: "<p style=\"margin: 0px;\"><span style=\"color: rgb(18, 65, 145);\">AMR-WB</span></p>",
                            align: "left",
                            font: ['Arial, Helvetica, sans-serif', [15, "px"], "rgba(255,255,255,1.00)", "400", "none", "normal", "break-word", "nowrap"],
                            textStyle: ["", "", "", "", "none"]
                        },
                        {
                            id: 'RectangleCopy22',
                            type: 'rect',
                            rect: ['1020px', '810px', '100px', '100px', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(190,200,210,1.00)"],
                            stroke: [2,"rgb(18, 65, 145)","none"]
                        },
                        {
                            id: 'Text3Copy27',
                            type: 'text',
                            rect: ['1032px', '818px', 'auto', 'auto', 'auto', 'auto'],
                            text: "<p style=\"margin: 0px;\"><span style=\"color: rgb(18, 65, 145);\">Bidirectional</span></p>",
                            align: "left",
                            font: ['Arial, Helvetica, sans-serif', [15, "px"], "rgba(255,255,255,1.00)", "400", "none", "normal", "break-word", "nowrap"],
                            textStyle: ["", "", "", "", "none"]
                        },
                        {
                            id: 'RectangleCopy21',
                            type: 'rect',
                            rect: ['1130px', '810px', '100px', '100px', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(75,221,51,1.00)"],
                            stroke: [2,"rgb(18, 65, 145)","none"]
                        },
                        {
                            id: 'Text3Copy26',
                            type: 'text',
                            rect: ['1142px', '818px', 'auto', 'auto', 'auto', 'auto'],
                            text: "<p style=\"margin: 0px;\"><span style=\"color: rgb(18, 65, 145);\">abc</span></p>",
                            align: "left",
                            font: ['Arial, Helvetica, sans-serif', [15, "px"], "rgba(255,255,255,1.00)", "400", "none", "normal", "break-word", "nowrap"],
                            textStyle: ["", "", "", "", "none"]
                        },
                        {
                            id: 'RectangleCopy20',
                            type: 'rect',
                            rect: ['1240px', '810px', '100px', '100px', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(190,200,210,1.00)"],
                            stroke: [2,"rgb(18, 65, 145)","none"]
                        },
                        {
                            id: 'Text3Copy25',
                            type: 'text',
                            rect: ['1252px', '818px', 'auto', 'auto', 'auto', 'auto'],
                            text: "<p style=\"margin: 0px;\"><span style=\"color: rgb(18, 65, 145);\">WiFi</span></p>",
                            align: "left",
                            font: ['Arial, Helvetica, sans-serif', [15, "px"], "rgba(255,255,255,1.00)", "400", "none", "normal", "break-word", "nowrap"],
                            textStyle: ["", "", "", "", "none"]
                        },
                        {
                            id: 'RectangleCopy19',
                            type: 'rect',
                            rect: ['1351px', '810px', '100px', '100px', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(190,200,210,1.00)"],
                            stroke: [2,"rgb(18, 65, 145)","none"]
                        },
                        {
                            id: 'Text3Copy24',
                            type: 'text',
                            rect: ['1362px', '818px', 'auto', 'auto', 'auto', 'auto'],
                            text: "<p style=\"margin: 0px;\"><span style=\"color: rgb(18, 65, 145);\">4.3</span></p>",
                            align: "left",
                            font: ['Arial, Helvetica, sans-serif', [15, "px"], "rgba(255,255,255,1.00)", "400", "none", "normal", "break-word", "nowrap"],
                            textStyle: ["", "", "", "", "none"]
                        },
                        {
                            id: 'RectangleCopy18',
                            type: 'rect',
                            rect: ['1461px', '810px', '100px', '100px', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(190,200,210,1.00)"],
                            stroke: [2,"rgb(18, 65, 145)","none"]
                        },
                        {
                            id: 'Text3Copy23',
                            type: 'text',
                            rect: ['1472px', '818px', 'auto', 'auto', 'auto', 'auto'],
                            text: "<p style=\"margin: 0px;\"><span style=\"color: rgb(18, 65, 145);\">4.4</span></p>",
                            align: "left",
                            font: ['Arial, Helvetica, sans-serif', [15, "px"], "rgba(255,255,255,1.00)", "400", "none", "normal", "break-word", "nowrap"],
                            textStyle: ["", "", "", "", "none"]
                        },
                        {
                            id: 'girl-icon',
                            type: 'image',
                            rect: ['1447px', '318px', '128px', '201px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"girl-icon.svg",'0px','0px'],
                            transform: [[],[],[],['0','0']]
                        },
                        {
                            id: 'alexa',
                            type: 'image',
                            rect: ['358px', '349px', '65px', '137px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"alexa.svg",'0px','0px'],
                            transform: [[],[],[],['0','0']]
                        },
                        {
                            id: 'wng',
                            type: 'text',
                            rect: ['1252px', '658px', 'auto', 'auto', 'auto', 'auto'],
                            opacity: '0',
                            text: "<p style=\"margin: 0px;\">​Wireless Network Guardian (WNG)</p>",
                            align: "center",
                            font: ['Arial, Helvetica, sans-serif', [20, "px"], "rgba(18,65,145,1)", "400", "none", "normal", "break-word", "nowrap"],
                            textStyle: ["", "", "", "", "none"]
                        },
                        {
                            id: 'alexa-speech',
                            symbolName: 'alexa-speech',
                            type: 'rect',
                            rect: ['458', '199', '150', '150', 'auto', 'auto'],
                            transform: [[],['41']]
                        },
                        {
                            id: 'speech_bubble2',
                            type: 'image',
                            rect: ['1267px', '199px', '150px', '150px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"speech%20bubble.svg",'0px','0px'],
                            transform: [[],[],[],['-1']]
                        }
                    ],
                    style: {
                        '${Stage}': {
                            isStage: true,
                            rect: ['null', 'null', '1920px', '1080px', 'auto', 'auto'],
                            sizeRange: ['','1920px','',''],
                            overflow: 'hidden',
                            fill: ["rgba(255,255,255,1)"]
                        }
                    }
                },
                timeline: {
                    duration: 4750,
                    autoPlay: true,
                    data: [
                        [
                            "eid826",
                            "opacity",
                            1500,
                            500,
                            "easeInOutCubic",
                            "${RectangleCopy5}",
                            '0',
                            '1'
                        ],
                        [
                            "eid878",
                            "opacity",
                            250,
                            500,
                            "easeInOutCubic",
                            "${Text3Copy24}",
                            '0',
                            '1'
                        ],
                        [
                            "eid900",
                            "scaleX",
                            500,
                            1000,
                            "easeInOutCubic",
                            "${smp-nodes-network}",
                            '0.3',
                            '1'
                        ],
                        [
                            "eid832",
                            "opacity",
                            0,
                            500,
                            "easeInOutCubic",
                            "${RectangleCopy18}",
                            '0',
                            '1'
                        ],
                        [
                            "eid810",
                            "opacity",
                            2250,
                            500,
                            "easeInOutCubic",
                            "${RectangleCopy16}",
                            '0',
                            '1'
                        ],
                        [
                            "eid842",
                            "opacity",
                            750,
                            500,
                            "easeInOutCubic",
                            "${RectangleCopy21}",
                            '0',
                            '1'
                        ],
                        [
                            "eid840",
                            "opacity",
                            1750,
                            500,
                            "easeInOutCubic",
                            "${RectangleCopy25}",
                            '0',
                            '1'
                        ],
                        [
                            "eid884",
                            "opacity",
                            1750,
                            500,
                            "easeInOutCubic",
                            "${Text3Copy30}",
                            '0',
                            '1'
                        ],
                        [
                            "eid916",
                            "opacity",
                            3000,
                            1000,
                            "easeInOutCubic",
                            "${wng}",
                            '0',
                            '1'
                        ],
                        [
                            "eid890",
                            "scaleX",
                            1500,
                            1000,
                            "easeInOutCubic",
                            "${alexa}",
                            '0',
                            '1'
                        ],
                        [
                            "eid860",
                            "opacity",
                            1500,
                            500,
                            "easeInOutCubic",
                            "${Text3Copy7}",
                            '0',
                            '1'
                        ],
                        [
                            "eid853",
                            "opacity",
                            0,
                            500,
                            "easeInOutCubic",
                            "${Text3}",
                            '0',
                            '1'
                        ],
                        [
                            "eid908",
                            "opacity",
                            500,
                            1000,
                            "easeInOutCubic",
                            "${workflow}",
                            '0',
                            '1'
                        ],
                        [
                            "eid862",
                            "opacity",
                            2000,
                            500,
                            "easeInOutCubic",
                            "${Text3Copy9}",
                            '0',
                            '1'
                        ],
                        [
                            "eid844",
                            "opacity",
                            250,
                            500,
                            "easeInOutCubic",
                            "${RectangleCopy19}",
                            '0',
                            '1'
                        ],
                        [
                            "eid855",
                            "opacity",
                            250,
                            500,
                            "easeInOutCubic",
                            "${Text3Copy2}",
                            '0',
                            '1'
                        ],
                        [
                            "eid824",
                            "opacity",
                            1250,
                            500,
                            "easeInOutCubic",
                            "${RectangleCopy6}",
                            '0',
                            '1'
                        ],
                        [
                            "eid914",
                            "opacity",
                            0,
                            1000,
                            "easeInOutCubic",
                            "${Text}",
                            '0',
                            '1'
                        ],
                        [
                            "eid879",
                            "opacity",
                            500,
                            500,
                            "easeInOutCubic",
                            "${Text3Copy25}",
                            '0',
                            '1'
                        ],
                        [
                            "eid830",
                            "opacity",
                            750,
                            500,
                            "easeInOutCubic",
                            "${RectangleCopy2}",
                            '0',
                            '1'
                        ],
                        [
                            "eid857",
                            "opacity",
                            750,
                            500,
                            "easeInOutCubic",
                            "${Text3Copy4}",
                            '0',
                            '1'
                        ],
                        [
                            "eid859",
                            "opacity",
                            1250,
                            500,
                            "easeInOutCubic",
                            "${Text3Copy6}",
                            '0',
                            '1'
                        ],
                        [
                            "eid816",
                            "opacity",
                            1750,
                            500,
                            "easeInOutCubic",
                            "${RectangleCopy4}",
                            '0',
                            '1'
                        ],
                        [
                            "eid856",
                            "opacity",
                            500,
                            500,
                            "easeInOutCubic",
                            "${Text3Copy3}",
                            '0',
                            '1'
                        ],
                        [
                            "eid852",
                            "opacity",
                            2000,
                            500,
                            "easeInOutCubic",
                            "${RectangleCopy26}",
                            '0',
                            '1'
                        ],
                        [
                            "eid888",
                            "opacity",
                            2500,
                            500,
                            "easeInOutCubic",
                            "${Text3Copy34}",
                            '0',
                            '1'
                        ],
                        [
                            "eid858",
                            "opacity",
                            1000,
                            500,
                            "easeInOutCubic",
                            "${Text3Copy5}",
                            '0',
                            '1'
                        ],
                        [
                            "eid834",
                            "opacity",
                            1000,
                            500,
                            "easeInOutCubic",
                            "${RectangleCopy22}",
                            '0',
                            '1'
                        ],
                        [
                            "eid882",
                            "opacity",
                            1250,
                            500,
                            "easeInOutCubic",
                            "${Text3Copy28}",
                            '0',
                            '1'
                        ],
                        [
                            "eid887",
                            "opacity",
                            2250,
                            500,
                            "easeInOutCubic",
                            "${Text3Copy33}",
                            '0',
                            '1'
                        ],
                        [
                            "eid822",
                            "opacity",
                            250,
                            500,
                            "easeInOutCubic",
                            "${RectangleCopy}",
                            '0',
                            '1'
                        ],
                        [
                            "eid877",
                            "opacity",
                            0,
                            500,
                            "easeInOutCubic",
                            "${Text3Copy23}",
                            '0',
                            '1'
                        ],
                        [
                            "eid814",
                            "opacity",
                            500,
                            500,
                            "easeInOutCubic",
                            "${RectangleCopy3}",
                            '0',
                            '1'
                        ],
                        [
                            "eid838",
                            "opacity",
                            1500,
                            500,
                            "easeInOutCubic",
                            "${RectangleCopy24}",
                            '0',
                            '1'
                        ],
                        [
                            "eid848",
                            "opacity",
                            1250,
                            500,
                            "easeInOutCubic",
                            "${RectangleCopy23}",
                            '0',
                            '1'
                        ],
                        [
                            "eid861",
                            "opacity",
                            1750,
                            500,
                            "easeInOutCubic",
                            "${Text3Copy8}",
                            '0',
                            '1'
                        ],
                        [
                            "eid881",
                            "opacity",
                            1000,
                            500,
                            "easeInOutCubic",
                            "${Text3Copy27}",
                            '0',
                            '1'
                        ],
                        [
                            "eid883",
                            "opacity",
                            1500,
                            500,
                            "easeInOutCubic",
                            "${Text3Copy29}",
                            '0',
                            '1'
                        ],
                        [
                            "eid892",
                            "scaleY",
                            1500,
                            1000,
                            "easeInOutCubic",
                            "${alexa}",
                            '0',
                            '1'
                        ],
                        [
                            "eid904",
                            "opacity",
                            500,
                            1000,
                            "easeInOutCubic",
                            "${smp-nodes-network}",
                            '0',
                            '1'
                        ],
                        [
                            "eid912",
                            "scaleY",
                            500,
                            1000,
                            "easeInOutCubic",
                            "${workflow}",
                            '0.3',
                            '1'
                        ],
                        [
                            "eid896",
                            "scaleY",
                            1500,
                            1000,
                            "easeInOutCubic",
                            "${girl-icon}",
                            '0',
                            '1'
                        ],
                        [
                            "eid818",
                            "opacity",
                            2000,
                            500,
                            "easeInOutCubic",
                            "${RectangleCopy17}",
                            '0',
                            '1'
                        ],
                        [
                            "eid820",
                            "opacity",
                            0,
                            500,
                            "easeInOutCubic",
                            "${Rectangle}",
                            '0',
                            '1'
                        ],
                        [
                            "eid886",
                            "opacity",
                            2000,
                            500,
                            "easeInOutCubic",
                            "${Text3Copy32}",
                            '0',
                            '1'
                        ],
                        [
                            "eid828",
                            "opacity",
                            2500,
                            500,
                            "easeInOutCubic",
                            "${RectangleCopy15}",
                            '0',
                            '1'
                        ],
                        [
                            "eid850",
                            "opacity",
                            2500,
                            500,
                            "easeInOutCubic",
                            "${RectangleCopy28}",
                            '0',
                            '1'
                        ],
                        [
                            "eid910",
                            "scaleX",
                            500,
                            1000,
                            "easeInOutCubic",
                            "${workflow}",
                            '0.3',
                            '1'
                        ],
                        [
                            "eid836",
                            "opacity",
                            2250,
                            500,
                            "easeInOutCubic",
                            "${RectangleCopy27}",
                            '0',
                            '1'
                        ],
                        [
                            "eid863",
                            "opacity",
                            2250,
                            500,
                            "easeInOutCubic",
                            "${Text3Copy10}",
                            '0',
                            '1'
                        ],
                        [
                            "eid906",
                            "rotateZ",
                            500,
                            1000,
                            "easeInOutCubic",
                            "${workflow}",
                            '-90deg',
                            '0deg'
                        ],
                        [
                            "eid880",
                            "opacity",
                            750,
                            500,
                            "easeInOutCubic",
                            "${Text3Copy26}",
                            '0',
                            '1'
                        ],
                        [
                            "eid812",
                            "opacity",
                            1000,
                            500,
                            "easeInOutCubic",
                            "${RectangleCopy7}",
                            '0',
                            '1'
                        ],
                        [
                            "eid902",
                            "scaleY",
                            500,
                            1000,
                            "easeInOutCubic",
                            "${smp-nodes-network}",
                            '0.3',
                            '1'
                        ],
                        [
                            "eid846",
                            "opacity",
                            500,
                            500,
                            "easeInOutCubic",
                            "${RectangleCopy20}",
                            '0',
                            '1'
                        ],
                        [
                            "eid898",
                            "rotateZ",
                            500,
                            1000,
                            "easeInOutCubic",
                            "${smp-nodes-network}",
                            '90deg',
                            '0deg'
                        ],
                        [
                            "eid894",
                            "scaleX",
                            1500,
                            1000,
                            "easeInOutCubic",
                            "${girl-icon}",
                            '0',
                            '1'
                        ],
                        [
                            "eid864",
                            "opacity",
                            2500,
                            500,
                            "easeInOutCubic",
                            "${Text3Copy11}",
                            '0',
                            '1'
                        ]
                    ]
                }
            },
            "slide1": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [

                    ],
                    style: {
                        '${symbolSelector}': {
                            isStage: 'true',
                            rect: [undefined, undefined, '1920px', '1080px']
                        }
                    }
                },
                timeline: {
                    duration: 25500,
                    autoPlay: true,
                    data: [
                        [
                            "eid334",
                            "left",
                            15000,
                            1000,
                            "easeInOutCubic",
                            "${VoLTE-chart}",
                            '194px',
                            '189px'
                        ],
                        [
                            "eid352",
                            "left",
                            18750,
                            1000,
                            "easeInOutCubic",
                            "${VoLTE-chart}",
                            '189px',
                            '341px'
                        ],
                        [
                            "eid165",
                            "opacity",
                            3000,
                            1500,
                            "easeInOutCubic",
                            "${knowledge_text}",
                            '0',
                            '1'
                        ],
                        [
                            "eid211",
                            "opacity",
                            6500,
                            500,
                            "easeInOutCubic",
                            "${knowledge_text}",
                            '1',
                            '0'
                        ],
                        [
                            "eid167",
                            "scaleX",
                            3000,
                            1500,
                            "easeInOutCubic",
                            "${knowledge_text}",
                            '0',
                            '1'
                        ],
                        [
                            "eid173",
                            "scaleX",
                            3750,
                            1250,
                            "easeInOutCubic",
                            "${smp-zoom-chart-2Copy}",
                            '0',
                            '1'
                        ],
                        [
                            "eid266",
                            "scaleX",
                            8250,
                            1000,
                            "easeInOutCubic",
                            "${zero-touch}",
                            '0.4',
                            '1'
                        ],
                        [
                            "eid299",
                            "scaleX",
                            12500,
                            1000,
                            "easeInOutCubic",
                            "${zero-touch}",
                            '1',
                            '0.4'
                        ],
                        [
                            "eid187",
                            "scaleX",
                            5500,
                            1000,
                            "easeInOutCubic",
                            "${smp_workflow_text}",
                            '0',
                            '1'
                        ],
                        [
                            "eid330",
                            "scaleX",
                            15000,
                            1000,
                            "easeInOutCubic",
                            "${VoLTE-chart}",
                            '0.25',
                            '1'
                        ],
                        [
                            "eid350",
                            "scaleX",
                            18750,
                            1000,
                            "easeInOutCubic",
                            "${VoLTE-chart}",
                            '1',
                            '0.25'
                        ],
                        [
                            "eid160",
                            "opacity",
                            2500,
                            1000,
                            "easeInOutCubic",
                            "${weak_signal_text}",
                            '0',
                            '1'
                        ],
                        [
                            "eid214",
                            "opacity",
                            6500,
                            500,
                            "easeInOutCubic",
                            "${weak_signal_text}",
                            '1',
                            '0'
                        ],
                        [
                            "eid175",
                            "scaleY",
                            3750,
                            1250,
                            "easeInOutCubic",
                            "${smp-zoom-chart-2Copy}",
                            '0',
                            '1'
                        ],
                        [
                            "eid336",
                            "top",
                            15000,
                            1000,
                            "easeInOutCubic",
                            "${VoLTE-chart}",
                            '196px',
                            '223px'
                        ],
                        [
                            "eid348",
                            "top",
                            18750,
                            1000,
                            "easeInOutCubic",
                            "${VoLTE-chart}",
                            '223px',
                            '543px'
                        ],
                        [
                            "eid189",
                            "scaleY",
                            5500,
                            1000,
                            "easeInOutCubic",
                            "${smp_workflow_text}",
                            '0',
                            '1'
                        ],
                        [
                            "eid171",
                            "opacity",
                            3750,
                            1250,
                            "easeInOutCubic",
                            "${smp-zoom-chart-2Copy}",
                            '0',
                            '1'
                        ],
                        [
                            "eid193",
                            "scaleY",
                            5000,
                            1000,
                            "easeInOutCubic",
                            "${Rectangle2Copy}",
                            '0',
                            '1'
                        ],
                        [
                            "eid162",
                            "background-position",
                            3000,
                            2000,
                            "easeInOutCubic",
                            "${arrow-rightCopy}",
                            [-258,0],
                            [0,0],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid217",
                            "background-position",
                            6500,
                            500,
                            "easeInOutCubic",
                            "${arrow-rightCopy}",
                            [0,0],
                            [267,0],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid221",
                            "left",
                            6500,
                            3500,
                            "easeInOutCubic",
                            "${Pasted}",
                            '946px',
                            '-4791px'
                        ],
                        [
                            "eid268",
                            "scaleY",
                            8250,
                            1000,
                            "easeInOutCubic",
                            "${zero-touch}",
                            '0.4',
                            '1'
                        ],
                        [
                            "eid298",
                            "scaleY",
                            12500,
                            1000,
                            "easeInOutCubic",
                            "${zero-touch}",
                            '1',
                            '0.4'
                        ],
                        [
                            "eid183",
                            "opacity",
                            5500,
                            1000,
                            "easeInOutCubic",
                            "${smp_workflow_text}",
                            '0',
                            '1'
                        ],
                        [
                            "eid209",
                            "opacity",
                            6500,
                            500,
                            "easeInOutCubic",
                            "${smp_workflow_text}",
                            '1',
                            '0'
                        ],
                        [
                            "eid272",
                            "top",
                            8250,
                            1000,
                            "easeInOutCubic",
                            "${zero-touch}",
                            '143px',
                            '177px'
                        ],
                        [
                            "eid297",
                            "top",
                            12500,
                            1000,
                            "easeInOutCubic",
                            "${zero-touch}",
                            '177px',
                            '105px'
                        ],
                        [
                            "eid156",
                            "opacity",
                            2000,
                            1000,
                            "easeInOutCubic",
                            "${weakphoneCopy}",
                            '0',
                            '1'
                        ],
                        [
                            "eid213",
                            "opacity",
                            6500,
                            500,
                            "easeInOutCubic",
                            "${weakphoneCopy}",
                            '1',
                            '0'
                        ],
                        [
                            "eid275",
                            "opacity",
                            8250,
                            1000,
                            "easeInOutCubic",
                            "${zero-touch}",
                            '0',
                            '1'
                        ],
                        [
                            "eid300",
                            "opacity",
                            12500,
                            1000,
                            "easeInOutCubic",
                            "${zero-touch}",
                            '1',
                            '0'
                        ],
                        [
                            "eid338",
                            "opacity",
                            15000,
                            1000,
                            "easeInOutCubic",
                            "${VoLTE-chart}",
                            '0',
                            '1'
                        ],
                        [
                            "eid351",
                            "opacity",
                            18750,
                            1000,
                            "easeInOutCubic",
                            "${VoLTE-chart}",
                            '1',
                            '0'
                        ],
                        [
                            "eid185",
                            "opacity",
                            5000,
                            1000,
                            "easeInOutCubic",
                            "${Rectangle2Copy}",
                            '0',
                            '1'
                        ],
                        [
                            "eid210",
                            "opacity",
                            6500,
                            500,
                            "easeInOutCubic",
                            "${Rectangle2Copy}",
                            '1',
                            '0'
                        ],
                        [
                            "eid332",
                            "scaleY",
                            15000,
                            1000,
                            "easeInOutCubic",
                            "${VoLTE-chart}",
                            '0.25',
                            '1'
                        ],
                        [
                            "eid349",
                            "scaleY",
                            18750,
                            1000,
                            "easeInOutCubic",
                            "${VoLTE-chart}",
                            '1',
                            '0.25'
                        ],
                        [
                            "eid198",
                            "display",
                            6500,
                            0,
                            "easeInOutCubic",
                            "${btn}",
                            'none',
                            'block'
                        ],
                        [
                            "eid220",
                            "display",
                            6625,
                            0,
                            "easeInOutCubic",
                            "${btn}",
                            'block',
                            'none'
                        ],
                        [
                            "eid285",
                            "display",
                            11500,
                            0,
                            "easeInOutCubic",
                            "${btn}",
                            'none',
                            'block'
                        ],
                        [
                            "eid304",
                            "display",
                            11634,
                            0,
                            "easeInOutCubic",
                            "${btn}",
                            'block',
                            'none'
                        ],
                        [
                            "eid341",
                            "display",
                            17500,
                            0,
                            "easeInOutCubic",
                            "${btn}",
                            'none',
                            'block'
                        ],
                        [
                            "eid342",
                            "display",
                            17634,
                            0,
                            "easeInOutCubic",
                            "${btn}",
                            'block',
                            'none'
                        ],
                        [
                            "eid222",
                            "top",
                            6500,
                            3500,
                            "easeInOutCubic",
                            "${Pasted}",
                            '557px',
                            '-2472px'
                        ],
                        [
                            "eid270",
                            "left",
                            8250,
                            1000,
                            "easeInOutCubic",
                            "${zero-touch}",
                            '476px',
                            '275px'
                        ],
                        [
                            "eid301",
                            "left",
                            12500,
                            1000,
                            "easeInOutCubic",
                            "${zero-touch}",
                            '275px',
                            '-122px'
                        ],
                        [
                            "eid154",
                            "opacity",
                            1000,
                            1000,
                            "easeInOutCubic",
                            "${jackie_text}",
                            '0',
                            '1'
                        ],
                        [
                            "eid212",
                            "opacity",
                            6500,
                            500,
                            "easeInOutCubic",
                            "${jackie_text}",
                            '1',
                            '0'
                        ],
                        [
                            "eid158",
                            "opacity",
                            2000,
                            1000,
                            "easeInOutCubic",
                            "${weak_bar}",
                            '0',
                            '1'
                        ],
                        [
                            "eid215",
                            "opacity",
                            6500,
                            500,
                            "easeInOutCubic",
                            "${weak_bar}",
                            '1',
                            '0'
                        ],
                        [
                            "eid169",
                            "scaleY",
                            3000,
                            1500,
                            "easeInOutCubic",
                            "${knowledge_text}",
                            '0',
                            '1'
                        ],
                        [
                            "eid191",
                            "scaleX",
                            5000,
                            1000,
                            "easeInOutCubic",
                            "${Rectangle2Copy}",
                            '0',
                            '1'
                        ],
                            [ "eid163", "trigger", 0, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${smp-zoom-chart-2Copy}', [] ] ],
                            [ "eid278", "trigger", 0, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${zero-touch}', [] ] ],
                            [ "eid339", "trigger", 0, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${VoLTE-chart}', [] ] ],
                            [ "eid218", "trigger", 6750, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${smp-zoom-chart-2Copy}', [] ] ],
                            [ "eid277", "trigger", 9250, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${zero-touch}', [] ] ],
                            [ "eid219", "trigger", 9869.4596729193, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${smp-zoom-chart-2Copy}', [] ] ],
                            [ "eid302", "trigger", 11750, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${smp-zoom-chart-2Copy}', ['next'] ] ],
                            [ "eid340", "trigger", 15000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${VoLTE-chart}', [] ] ],
                            [ "eid303", "trigger", 16250, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${smp-zoom-chart-2Copy}', [] ] ],
                            [ "eid355", "trigger", 17750, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${smp-zoom-chart-2Copy}', ['last'] ] ]
                    ]
                }
            },
            "alexa-speech": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            id: 'speech_bubble',
                            type: 'image',
                            rect: ['0px', '0px', '150px', '150px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/speech%20bubble.svg', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            isStage: 'true',
                            rect: [undefined, undefined, '150px', '150px']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [

                    ]
                }
            }
        };

    AdobeEdge.registerCompositionDefn(compId, symbols, fonts, scripts, resources, opts);

    if (!window.edge_authoring_mode) AdobeEdge.getComposition(compId).load("scene2-part3_edgeActions.js");
})("scene2-part3");
