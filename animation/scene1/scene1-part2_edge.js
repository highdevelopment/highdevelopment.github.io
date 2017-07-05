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
                            id: 'Rectangle',
                            type: 'rect',
                            rect: ['1970px', '0px', '786px', '1080px', 'auto', 'auto'],
                            fill: ["rgba(237,243,245,0.20)"],
                            stroke: [2,"rgb(190, 200, 210)","none"]
                        },
                        {
                            id: 'chatbot-chart_2',
                            symbolName: 'chatbot-chart_2',
                            type: 'rect',
                            rect: ['100px', '196px', 'undefined', 'undefined', 'auto', 'auto'],
                            opacity: '0'
                        },
                        {
                            id: 'smp-zoom-chart-2',
                            symbolName: 'smp-zoom-chart-2',
                            type: 'rect',
                            rect: ['-30341px', '-8094px', '560', '554', 'auto', 'auto'],
                            opacity: '0',
                            transform: [[],[],[],['25','25']]
                        },
                        {
                            id: 'nokia-logo',
                            type: 'image',
                            rect: ['813px', '845px', '1850px', '310px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"nokia-logo.svg",'0px','0px'],
                            transform: [[],[],[],['0.1','0.1']]
                        },
                        {
                            id: 'chatbot-chart',
                            symbolName: 'chatbot-chart',
                            display: 'block',
                            type: 'rect',
                            rect: ['-989px', '195px', '931', '689', 'auto', 'auto']
                        },
                        {
                            id: 'chatbot-chart_1',
                            symbolName: 'chatbot-chart_1',
                            display: 'block',
                            type: 'rect',
                            rect: ['-972px', '195px', 'undefined', 'undefined', 'auto', 'auto']
                        },
                        {
                            id: 'Text3',
                            display: 'block',
                            type: 'text',
                            rect: ['2255px', '125px', 'auto', 'auto', 'auto', 'auto'],
                            opacity: '0',
                            text: "<p style=\"margin: 0px;\"><span style=\"color: rgb(0, 0, 0);\">Speed Test</span></p>",
                            align: "center",
                            font: ['Arial, Helvetica, sans-serif', [36, "px"], "rgba(18,65,145,1)", "400", "none", "normal", "break-word", "nowrap"],
                            textStyle: ["", "", "", "", "none"]
                        },
                        {
                            id: 'speedomter',
                            symbolName: 'speedomter',
                            display: 'block',
                            type: 'rect',
                            rect: ['2243px', '274px', '208', '162', 'auto', 'auto'],
                            opacity: '0'
                        },
                        {
                            id: 'Group',
                            display: 'block',
                            type: 'group',
                            rect: ['2098px', '482px', '232', '232', 'auto', 'auto'],
                            opacity: '0',
                            c: [
                            {
                                id: 'Rectangle2',
                                display: 'block',
                                type: 'rect',
                                rect: ['0px', '0px', '232px', '232px', 'auto', 'auto'],
                                fill: ["rgba(152,162,174,1.00)"],
                                stroke: [2,"rgb(190, 200, 210)","none"]
                            },
                            {
                                id: 'exclamation',
                                display: 'block',
                                type: 'image',
                                rect: ['70px', '45px', '87px', '87px', 'auto', 'auto'],
                                fill: ["rgba(0,0,0,0)",im+"exclamation.svg",'0px','0px']
                            },
                            {
                                id: 'Text',
                                display: 'block',
                                type: 'text',
                                rect: ['13px', '11px', 'auto', 'auto', 'auto', 'auto'],
                                text: "<p style=\"margin: 0px;\">​<span style=\"color: rgb(255, 255, 255);\">DOWNLOAD SPEED</span></p>",
                                align: "center",
                                font: ['Arial, Helvetica, sans-serif', [16, "px"], "rgba(18,65,145,1)", "400", "none", "normal", "break-word", "nowrap"],
                                textStyle: ["", "", "", "", "none"]
                            },
                            {
                                id: 'TextCopy2',
                                display: 'block',
                                type: 'text',
                                rect: ['194px', '205px', 'auto', 'auto', 'auto', 'auto'],
                                text: "<p style=\"margin: 0px;\"><span style=\"color: rgb(255, 255, 255);\">mbps</span></p>",
                                align: "center",
                                font: ['Arial, Helvetica, sans-serif', [10, "px"], "rgba(18,65,145,1)", "400", "none", "normal", "break-word", "nowrap"],
                                textStyle: ["", "", "", "", "none"]
                            },
                            {
                                id: 'down',
                                display: 'block',
                                type: 'text',
                                rect: ['19px', '132px', 'auto', 'auto', 'auto', 'auto'],
                                text: "<p style=\"margin: 0px;\">0.00</p>",
                                align: "right",
                                font: ['Arial, Helvetica, sans-serif', [80, "px"], "rgba(255,255,255,1)", "400", "none", "normal", "break-word", "nowrap"],
                                textStyle: ["", "", "", "", "none"]
                            }]
                        },
                        {
                            id: 'Group2',
                            display: 'block',
                            type: 'group',
                            rect: ['2363px', '482px', '232', '232', 'auto', 'auto'],
                            opacity: '0',
                            c: [
                            {
                                id: 'Rectangle2Copy',
                                display: 'block',
                                type: 'rect',
                                rect: ['0px', '0px', '232px', '232px', 'auto', 'auto'],
                                fill: ["rgba(18,65,145,1.00)"],
                                stroke: [2,"rgb(190, 200, 210)","none"]
                            },
                            {
                                id: 'TextCopy',
                                display: 'block',
                                type: 'text',
                                rect: ['16px', '11px', 'auto', 'auto', 'auto', 'auto'],
                                text: "<p style=\"margin: 0px;\">​<span style=\"color: rgb(255, 255, 255);\">UPLOAD SPEED</span></p>",
                                align: "center",
                                font: ['Arial, Helvetica, sans-serif', [16, "px"], "rgba(18,65,145,1)", "400", "none", "normal", "break-word", "nowrap"],
                                textStyle: ["", "", "", "", "none"]
                            },
                            {
                                id: 'TextCopy3',
                                type: 'text',
                                rect: ['193px', '205px', 'auto', 'auto', 'auto', 'auto'],
                                text: "<p style=\"margin: 0px;\"><span style=\"color: rgb(255, 255, 255);\">mbps</span></p>",
                                align: "center",
                                font: ['Arial, Helvetica, sans-serif', [10, "px"], "rgba(18,65,145,1)", "400", "none", "normal", "break-word", "nowrap"],
                                textStyle: ["", "", "", "", "none"]
                            },
                            {
                                id: 'up',
                                display: 'block',
                                type: 'text',
                                rect: ['16px', '132px', 'auto', 'auto', 'auto', 'auto'],
                                text: "<p style=\"margin: 0px;\">0.00</p>",
                                align: "right",
                                font: ['Arial, Helvetica, sans-serif', [80, "px"], "rgba(255,255,255,1)", "400", "none", "normal", "break-word", "nowrap"],
                                textStyle: ["", "", "", "", "none"]
                            }]
                        },
                        {
                            id: 'Text11',
                            display: 'block',
                            type: 'text',
                            rect: ['1320px', '797px', 'auto', 'auto', 'auto', 'auto'],
                            opacity: '0',
                            text: "<p style=\"margin: 0px;\">​Speed test confirms a slow connection</p>",
                            align: "center",
                            font: ['Arial, Helvetica, sans-serif', [24, "px"], "rgba(0,0,0,1.00)", "400", "none", "normal", "break-word", "nowrap"],
                            textStyle: ["", "", "", "", "none"]
                        },
                        {
                            id: 'Text11Copy',
                            display: 'block',
                            type: 'text',
                            rect: ['2182px', '736px', 'auto', 'auto', 'auto', 'auto'],
                            opacity: '0',
                            text: "<p style=\"margin: 0px;\">​<span style=\"font-size: 16px;\">Ping 147.20 ms</span></p>",
                            align: "center",
                            font: ['Arial, Helvetica, sans-serif', [16, "px"], "rgba(0,0,0,1.00)", "400", "none", "normal", "break-word", "nowrap"],
                            textStyle: ["", "", "", "", "none"]
                        },
                        {
                            id: 'exclamation3',
                            display: 'block',
                            type: 'image',
                            rect: ['1975px', '571px', '350px', '350px', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(0,0,0,0)",im+"exclamation.svg",'0px','0px'],
                            transform: [[],[],[],['0.1','0.1']]
                        },
                        {
                            id: 'subscrber-analytics',
                            symbolName: 'subscrber-analytics',
                            type: 'rect',
                            rect: ['251px', '169px', 'undefined', 'undefined', 'auto', 'auto'],
                            opacity: '0'
                        },
                        {
                            id: 'btn',
                            display: 'none',
                            type: 'rect',
                            rect: ['66px', '92px', '1788px', '902px', 'auto', 'auto'],
                            cursor: 'pointer',
                            opacity: '0',
                            fill: ["rgba(255,255,255,1.00)"],
                            stroke: [2,"rgb(190, 200, 210)","none"]
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
                    duration: 44877,
                    autoPlay: true,
                    data: [
                        [
                            "eid870",
                            "left",
                            15250,
                            1000,
                            "easeInOutCubic",
                            "${Text3}",
                            '1435px',
                            '2255px'
                        ],
                        [
                            "eid983",
                            "left",
                            30500,
                            1500,
                            "easeInOutCubic",
                            "${smp-zoom-chart-2}",
                            '6px',
                            '-30341px'
                        ],
                        [
                            "eid1025",
                            "left",
                            32000,
                            1500,
                            "easeInOutCubic",
                            "${smp-zoom-chart-2}",
                            '-30341px',
                            '6px'
                        ],
                        [
                            "eid981",
                            "scaleX",
                            30500,
                            1500,
                            "easeInOutCubic",
                            "${smp-zoom-chart-2}",
                            '1',
                            '25'
                        ],
                        [
                            "eid1023",
                            "scaleX",
                            32000,
                            1500,
                            "easeInOutCubic",
                            "${smp-zoom-chart-2}",
                            '25',
                            '1'
                        ],
                        [
                            "eid875",
                            "left",
                            15250,
                            1000,
                            "easeInOutCubic",
                            "${Group2}",
                            '1543px',
                            '2363px'
                        ],
                        [
                            "eid884",
                            "display",
                            16250,
                            0,
                            "easeInOutCubic",
                            "${down}",
                            'block',
                            'none'
                        ],
                        [
                            "eid846",
                            "opacity",
                            11500,
                            500,
                            "easeInOutCubic",
                            "${exclamation3}",
                            '0',
                            '1'
                        ],
                        [
                            "eid984",
                            "top",
                            30500,
                            1500,
                            "easeInOutCubic",
                            "${smp-zoom-chart-2}",
                            '15px',
                            '-8094px'
                        ],
                        [
                            "eid1021",
                            "top",
                            32000,
                            1500,
                            "easeInOutCubic",
                            "${smp-zoom-chart-2}",
                            '-8094px',
                            '15px'
                        ],
                        [
                            "eid882",
                            "display",
                            16250,
                            0,
                            "easeInOutCubic",
                            "${Rectangle2Copy}",
                            'block',
                            'none'
                        ],
                        [
                            "eid889",
                            "display",
                            16250,
                            0,
                            "easeInOutCubic",
                            "${speedomter}",
                            'block',
                            'none'
                        ],
                        [
                            "eid850",
                            "opacity",
                            11877,
                            1000,
                            "easeInOutCubic",
                            "${Text11}",
                            '0',
                            '1'
                        ],
                        [
                            "eid822",
                            "opacity",
                            10000,
                            750,
                            "easeInOutCubic",
                            "${speedomter}",
                            '0',
                            '1'
                        ],
                        [
                            "eid848",
                            "opacity",
                            11750,
                            500,
                            "easeInOutCubic",
                            "${Text11Copy}",
                            '0',
                            '1'
                        ],
                        [
                            "eid887",
                            "display",
                            16250,
                            0,
                            "easeInOutCubic",
                            "${exclamation}",
                            'block',
                            'none'
                        ],
                        [
                            "eid883",
                            "display",
                            16250,
                            0,
                            "easeInOutCubic",
                            "${Group}",
                            'block',
                            'none'
                        ],
                        [
                            "eid873",
                            "left",
                            15250,
                            1000,
                            "easeInOutCubic",
                            "${Text11Copy}",
                            '1362px',
                            '2182px'
                        ],
                        [
                            "eid879",
                            "display",
                            16250,
                            0,
                            "easeInOutCubic",
                            "${Group2}",
                            'block',
                            'none'
                        ],
                        [
                            "eid765",
                            "opacity",
                            9250,
                            1500,
                            "easeInOutCubic",
                            "${Text3}",
                            '0',
                            '1'
                        ],
                        [
                            "eid876",
                            "display",
                            16250,
                            0,
                            "easeInOutCubic",
                            "${exclamation3}",
                            'block',
                            'none'
                        ],
                        [
                            "eid872",
                            "left",
                            15250,
                            1000,
                            "easeInOutCubic",
                            "${exclamation3}",
                            '1155px',
                            '1975px'
                        ],
                        [
                            "eid1009",
                            "left",
                            30127,
                            1000,
                            "easeInOutCubic",
                            "${chatbot-chart_1}",
                            '100px',
                            '-972px'
                        ],
                        [
                            "eid982",
                            "scaleY",
                            30500,
                            1500,
                            "easeInOutCubic",
                            "${smp-zoom-chart-2}",
                            '1',
                            '25'
                        ],
                        [
                            "eid1022",
                            "scaleY",
                            32000,
                            1500,
                            "easeInOutCubic",
                            "${smp-zoom-chart-2}",
                            '25',
                            '1'
                        ],
                        [
                            "eid878",
                            "display",
                            16250,
                            0,
                            "easeInOutCubic",
                            "${Text11}",
                            'block',
                            'none'
                        ],
                        [
                            "eid827",
                            "opacity",
                            10500,
                            1000,
                            "easeInOutCubic",
                            "${Group}",
                            '0',
                            '1'
                        ],
                        [
                            "eid952",
                            "display",
                            17250,
                            0,
                            "easeInOutCubic",
                            "${chatbot-chart}",
                            'block',
                            'none'
                        ],
                        [
                            "eid880",
                            "display",
                            16250,
                            0,
                            "easeInOutCubic",
                            "${up}",
                            'block',
                            'none'
                        ],
                        [
                            "eid869",
                            "left",
                            15250,
                            1000,
                            "easeInOutCubic",
                            "${speedomter}",
                            '1423px',
                            '2243px'
                        ],
                        [
                            "eid949",
                            "opacity",
                            16500,
                            1000,
                            "easeInOutCubic",
                            "${smp-zoom-chart-2}",
                            '0',
                            '1'
                        ],
                        [
                            "eid985",
                            "opacity",
                            31000,
                            1000,
                            "easeInOutCubic",
                            "${smp-zoom-chart-2}",
                            '1',
                            '0'
                        ],
                        [
                            "eid1024",
                            "opacity",
                            32000,
                            1000,
                            "easeInOutCubic",
                            "${smp-zoom-chart-2}",
                            '0',
                            '1'
                        ],
                        [
                            "eid959",
                            "left",
                            16250,
                            1000,
                            "easeInOutCubic",
                            "${chatbot-chart}",
                            '105px',
                            '-989px'
                        ],
                        [
                            "eid997",
                            "opacity",
                            31250,
                            875,
                            "easeInOutCubic",
                            "${subscrber-analytics}",
                            '0',
                            '1'
                        ],
                        [
                            "eid1027",
                            "opacity",
                            32125,
                            625,
                            "easeInOutCubic",
                            "${subscrber-analytics}",
                            '1',
                            '0'
                        ],
                        [
                            "eid881",
                            "display",
                            16250,
                            0,
                            "easeInOutCubic",
                            "${TextCopy}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1049",
                            "display",
                            17250,
                            0,
                            "easeInOutCubic",
                            "${chatbot-chart_1}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1010",
                            "display",
                            31127,
                            0,
                            "easeInOutCubic",
                            "${chatbot-chart_1}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1061",
                            "opacity",
                            32000,
                            970,
                            "linear",
                            "${chatbot-chart_2}",
                            '0',
                            '1'
                        ],
                        [
                            "eid853",
                            "display",
                            15250,
                            0,
                            "easeInOutCubic",
                            "${btn}",
                            'none',
                            'block'
                        ],
                        [
                            "eid854",
                            "display",
                            15371,
                            0,
                            "easeInOutCubic",
                            "${btn}",
                            'block',
                            'none'
                        ],
                        [
                            "eid968",
                            "display",
                            30127,
                            0,
                            "easeInOutCubic",
                            "${btn}",
                            'none',
                            'block'
                        ],
                        [
                            "eid969",
                            "display",
                            30248,
                            0,
                            "easeInOutCubic",
                            "${btn}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1013",
                            "display",
                            32000,
                            0,
                            "easeInOutCubic",
                            "${btn}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1014",
                            "display",
                            32121,
                            0,
                            "easeInOutCubic",
                            "${btn}",
                            'block',
                            'none'
                        ],
                        [
                            "eid874",
                            "left",
                            15250,
                            1000,
                            "easeInOutCubic",
                            "${Text11}",
                            '1320px',
                            '2030px'
                        ],
                        [
                            "eid871",
                            "left",
                            15250,
                            1000,
                            "easeInOutCubic",
                            "${Group}",
                            '1278px',
                            '2098px'
                        ],
                        [
                            "eid877",
                            "display",
                            16250,
                            0,
                            "easeInOutCubic",
                            "${Text11Copy}",
                            'block',
                            'none'
                        ],
                        [
                            "eid890",
                            "display",
                            16250,
                            0,
                            "easeInOutCubic",
                            "${Text3}",
                            'block',
                            'none'
                        ],
                        [
                            "eid888",
                            "display",
                            16250,
                            0,
                            "easeInOutCubic",
                            "${Rectangle2}",
                            'block',
                            'none'
                        ],
                        [
                            "eid885",
                            "display",
                            16250,
                            0,
                            "easeInOutCubic",
                            "${TextCopy2}",
                            'block',
                            'none'
                        ],
                        [
                            "eid852",
                            "left",
                            5750,
                            1000,
                            "easeInOutCubic",
                            "${Rectangle}",
                            '1970px',
                            '1134px'
                        ],
                        [
                            "eid1042",
                            "left",
                            30127,
                            873,
                            "easeInOutCubic",
                            "${Rectangle}",
                            '1134px',
                            '1996px'
                        ],
                        [
                            "eid1045",
                            "left",
                            32627,
                            873,
                            "easeInOutCubic",
                            "${Rectangle}",
                            '1996px',
                            '1134px'
                        ],
                        [
                            "eid829",
                            "opacity",
                            11000,
                            1000,
                            "easeInOutCubic",
                            "${Group2}",
                            '0',
                            '1'
                        ],
                        [
                            "eid886",
                            "display",
                            16250,
                            0,
                            "easeInOutCubic",
                            "${Text}",
                            'block',
                            'none'
                        ],
                            [ "eid964", "trigger", 0, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${chatbot-chart_1}', [] ] ],
                            [ "eid923", "trigger", 0, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${smp-zoom-chart-2}', [] ] ],
                            [ "eid825", "trigger", 12750, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${speedomter}', [] ] ],
                            [ "eid844", "trigger", 15119.459672919, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${speedomter}', [] ] ],
                            [ "eid965", "trigger", 16250, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${smp-zoom-chart-2}', [] ] ],
                            [ "eid966", "trigger", 17250, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${chatbot-chart_1}', [] ] ],
                            [ "eid967", "trigger", 20750, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${smp-zoom-chart-2}', [] ] ],
                            [ "eid1127", "trigger", 32000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${chatbot-chart_2}', [] ] ],
                            [ "eid1046", "trigger", 33500, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${smp-zoom-chart-2}', ['last'] ] ]
                    ]
                }
            },
            "smp-zoom-chart-2": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            type: 'image',
                            rect: ['709px', '-293px', '1632px', '1614px', 'auto', 'auto'],
                            id: 'large-network2',
                            opacity: '0',
                            clip: 'rect(0px 1632px 1614px 420px)',
                            fill: ['rgba(0,0,0,0)', 'images/large-network.svg', '0px', '0px']
                        },
                        {
                            transform: [[], [], [], ['0.35', '0.35']],
                            rect: ['1219px', '189px', '612px', '620px', 'auto', 'auto'],
                            id: 'flowchart',
                            opacity: '0',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/flowchart.svg', '0px', '0px']
                        },
                        {
                            transform: [[], [], [], ['0', '0']],
                            rect: ['1416px', '696px', '199px', '199px', 'auto', 'auto'],
                            display: 'block',
                            id: 'nba-engine',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/nba-engine.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            rect: ['1449px', '700px', '78px', '217px', 'auto', 'auto'],
                            display: 'none',
                            id: 'nba-arrow2',
                            clip: 'rect(217px 78px 217px 0px)',
                            fill: ['rgba(0,0,0,0)', 'images/nba-arrow.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'updownarrow',
                            rect: ['1507px', '517px', '28px', '125px', 'auto', 'auto'],
                            clip: 'rect(0px 28px 69px 0px)',
                            fill: ['rgba(0,0,0,0)', 'images/updownarrow.svg', '0px', '0px']
                        },
                        {
                            transform: [[], [], [], ['0.5', '0.5']],
                            id: 'step5',
                            opacity: '0',
                            rect: ['621px', '479px', '1700px', '897px', 'auto', 'auto'],
                            display: 'none',
                            type: 'image',
                            clip: 'rect(0px 1700px 407px 208px)',
                            fill: ['rgba(0,0,0,0)', 'images/step5.png', '0px', '0px']
                        },
                        {
                            type: 'rect',
                            rect: ['1340px', '335px', '362px', '178px', 'auto', 'auto'],
                            id: 'Rectangle4',
                            stroke: [7, 'rgb(18, 65, 145)', 'none'],
                            clip: 'rect(178px 362px 178px 0px)',
                            fill: ['rgba(18,65,145,1.00)']
                        },
                        {
                            transform: [[], [], [], ['0.11', '0.11']],
                            id: 'subscrber-analytics2',
                            opacity: '0',
                            rect: ['812px', '256px', null, null, 'auto', 'auto'],
                            display: 'none',
                            symbolName: 'subscrber-analytics',
                            clip: 'rect(133px 1371px 632px 24px)',
                            type: 'rect'
                        },
                        {
                            rect: ['1443px', '581px', '141px', '47px', 'auto', 'auto'],
                            opacity: '0',
                            id: 'Rectangle8',
                            stroke: [7, 'rgba(18,65,145,1.00)', 'solid'],
                            type: 'rect',
                            fill: ['rgba(0,201,255,0.00)']
                        },
                        {
                            type: 'text',
                            align: 'left',
                            textStyle: ['', '', '', '', 'none'],
                            font: ['Arial, Helvetica, sans-serif', [36, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap'],
                            text: '<p style=\"margin: 0px;\">​Home Analytics</p>',
                            rect: ['1393px', '78px', 'auto', 'auto', 'auto', 'auto'],
                            opacity: '0',
                            id: 'Text8'
                        },
                        {
                            type: 'text',
                            align: 'left',
                            textStyle: ['', '', '', '', 'none'],
                            font: ['Arial, Helvetica, sans-serif', [36, 'px'], 'rgba(255,255,255,1.00)', '400', 'none', 'normal', 'break-word', 'nowrap'],
                            text: '<p style=\"margin: 0px;\">​<span style=\"color: rgb(255, 255, 255);\">Send Wi-Fi Extender</span></p>',
                            rect: ['1357px', '403px', 'auto', 'auto', 'auto', 'auto'],
                            opacity: '0',
                            id: 'Text17'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '560px', '554px']
                        }
                    }
                },
                timeline: {
                    duration: 8000,
                    autoPlay: true,
                    labels: {
                        "last": 5000
                    },
                    data: [
                        [
                            "eid1005",
                            "opacity",
                            1000,
                            1000,
                            "easeInOutCubic",
                            "${Text8}",
                            '0',
                            '1'
                        ],
                        [
                            "eid1108",
                            "opacity",
                            5000,
                            1000,
                            "easeInOutCubic",
                            "${step5}",
                            '0',
                            '1'
                        ],
                        [
                            "eid1114",
                            "background-position",
                            5000,
                            1000,
                            "easeInOutCubic",
                            "${updownarrow}",
                            [0,72],
                            [0,0],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid373",
                            "scaleX",
                            1500,
                            1000,
                            "easeInOutCubic",
                            "${nba-engine}",
                            '0',
                            '1'
                        ],
                        [
                            "eid1120",
                            "scaleX",
                            5500,
                            1000,
                            "easeInOutCubic",
                            "${nba-engine}",
                            '1',
                            '0'
                        ],
                        [
                            "eid375",
                            "scaleY",
                            1500,
                            1000,
                            "easeInOutCubic",
                            "${nba-engine}",
                            '0',
                            '1'
                        ],
                        [
                            "eid1121",
                            "scaleY",
                            5500,
                            1000,
                            "easeInOutCubic",
                            "${nba-engine}",
                            '1',
                            '0'
                        ],
                        [
                            "eid914",
                            "scaleX",
                            500,
                            1000,
                            "easeInOutCubic",
                            "${flowchart}",
                            '0.35',
                            '1'
                        ],
                        [
                            "eid922",
                            "rotateZ",
                            500,
                            1000,
                            "easeInOutCubic",
                            "${flowchart}",
                            '-90deg',
                            '0deg'
                        ],
                        [
                            "eid1033",
                            "display",
                            5000,
                            0,
                            "easeInOutCubic",
                            "${subscrber-analytics2}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1032",
                            "display",
                            5000,
                            0,
                            "easeInOutCubic",
                            "${step5}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1124",
                            "display",
                            6500,
                            0,
                            "easeInOutCubic",
                            "${nba-engine}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1041",
                            "opacity",
                            6000,
                            1000,
                            "easeInOutCubic",
                            "${Text17}",
                            '0',
                            '1'
                        ],
                        [
                            "eid901",
                            "opacity",
                            0,
                            1000,
                            "easeInOutCubic",
                            "${large-network2}",
                            '0',
                            '1'
                        ],
                        [
                            "eid1123",
                            "display",
                            6250,
                            0,
                            "easeInOutCubic",
                            "${nba-arrow2}",
                            'none',
                            'block'
                        ],
                        [
                            "eid419",
                            "opacity",
                            3250,
                            1000,
                            "easeInOutCubic",
                            "${Rectangle8}",
                            '0',
                            '1'
                        ],
                        [
                            "eid1043",
                            "display",
                            5000,
                            0,
                            "easeInOutCubic",
                            "${updownarrow}",
                            'none',
                            'block'
                        ],
                        [
                            "eid916",
                            "scaleY",
                            500,
                            1000,
                            "easeInOutCubic",
                            "${flowchart}",
                            '0.35',
                            '1'
                        ],
                        [
                            "eid1006",
                            "top",
                            2000,
                            0,
                            "easeInOutCubic",
                            "${Text8}",
                            '78px',
                            '78px'
                        ],
                        [
                            "eid377",
                            "clip",
                            2000,
                            1250,
                            "easeInOutCubic",
                            "${nba-arrow2}",
                            [217,78,217,0],
                            [0,78,217,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid1122",
                            "clip",
                            5000,
                            1250,
                            "easeInOutCubic",
                            "${nba-arrow2}",
                            [0,78,217,0],
                            [217,78,217,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid1112",
                            "opacity",
                            5000,
                            1000,
                            "easeInOutCubic",
                            "${subscrber-analytics2}",
                            '0',
                            '1'
                        ],
                        [
                            "eid1039",
                            "clip",
                            5500,
                            1000,
                            "easeInOutCubic",
                            "${Rectangle4}",
                            [178,362,178,0],
                            [0,362,178,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid918",
                            "opacity",
                            500,
                            1000,
                            "easeInOutCubic",
                            "${flowchart}",
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
                        {
                            transform: [[], [], [], ['0', '0']],
                            rect: ['1036px', '263', '560', '554', 'auto', 'auto'],
                            id: 'smp-zoom-chart-2Copy',
                            symbolName: 'smp-zoom-chart-2',
                            opacity: '0',
                            type: 'rect'
                        },
                        {
                            transform: [[], [], [], ['0.4', '0.4']],
                            rect: ['476px', '105px', '1353', '793', 'auto', 'auto'],
                            id: 'zero-touch',
                            symbolName: 'zero-touch',
                            opacity: '0',
                            type: 'rect'
                        },
                        {
                            transform: [[], [], [], ['0.25', '0.25']],
                            rect: ['341px', '543px', '1542', '634', 'auto', 'auto'],
                            id: 'VoLTE-chart',
                            symbolName: 'VoLTE-chart',
                            opacity: '0',
                            type: 'rect'
                        },
                        {
                            rect: ['300px', '397px', '228px', '445px', 'auto', 'auto'],
                            id: 'weakphoneCopy',
                            opacity: '0',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/weakphone.svg', '0px', '0px']
                        },
                        {
                            rect: ['343px', '614px', '29px', '27px', 'auto', 'auto'],
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            id: 'weak_bar',
                            opacity: '0',
                            type: 'rect',
                            fill: ['rgba(18,65,145,1.00)']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [24, ''], 'rgba(18,65,145,1.00)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'weak_signal_text',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\">​Weak Signal</p>',
                            rect: ['345px', '660px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [24, 'px'], 'rgba(0,0,0,1.00)', '400', 'none', 'normal', 'break-word', 'nowrap'],
                            rect: ['249px', '238px', 'auto', 'auto', 'auto', 'auto'],
                            align: 'left',
                            textStyle: ['', '', '', '', 'none'],
                            id: 'jackie_text',
                            opacity: '0',
                            text: '<p style=\"margin: 0px; text-align: center;\">​<span style=\"font-size: 30px;\">Jackie’s VoLTE signal</span></p><p style=\"margin: 0px; text-align: center;\"><span style=\"font-size: 30px;\">is weak making it difficult</span></p><p style=\"margin: 0px; text-align: center;\"><span style=\"font-size: 30px;\">to talk to her mom</span>​</p>',
                            type: 'text'
                        },
                        {
                            rect: ['581px', '557px', '257px', '11px', 'auto', 'auto'],
                            id: 'arrow-rightCopy',
                            type: 'image',
                            clip: 'rect(0px 257px 11px 0px)',
                            fill: ['rgba(0,0,0,0)', 'images/arrow-right.svg', '-258px', '0px']
                        },
                        {
                            rect: ['1068px', '688px', '410px', '108px', 'auto', 'auto'],
                            transform: [[], [], [], ['0', '0']],
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            id: 'Rectangle2Copy',
                            opacity: '0',
                            type: 'rect',
                            fill: ['rgba(18,65,145,1)']
                        },
                        {
                            type: 'text',
                            id: 'smp_workflow_text',
                            text: '<p style=\"margin: 0px; text-align: center;\">​<span style=\"color: rgb(255, 255, 255);\">Service Management Platform</span></p><p style=\"margin: 0px; text-align: center;\"><span style=\"color: rgb(255, 255, 255);\">​Workflow Engine</span></p>',
                            font: ['Arial, Helvetica, sans-serif', [24, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap'],
                            transform: [[], [], [], ['0', '0']],
                            textStyle: ['', '', '', '', 'none'],
                            rect: ['1112px', '712px', 'auto', 'auto', 'auto', 'auto'],
                            align: 'left',
                            opacity: '1'
                        },
                        {
                            type: 'text',
                            id: 'knowledge_text',
                            text: '<p style=\"margin: 0px;\">​Knowledge driven, dynamic, intelligent workflows</p>',
                            font: ['Arial, Helvetica, sans-serif', [30, 'px'], 'rgba(0,0,0,1.00)', '400', 'none', 'normal', 'break-word', 'nowrap'],
                            transform: [[], [], [], ['0', '0']],
                            textStyle: ['', '', '', '', 'none'],
                            rect: ['951px', '115px', 'auto', 'auto', 'auto', 'auto'],
                            align: 'left',
                            opacity: '0'
                        },
                        {
                            rect: ['178px', '211px', '1550px', '764px', 'auto', 'auto'],
                            type: 'rect',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            id: 'btn',
                            opacity: '0',
                            cursor: 'pointer',
                            fill: ['rgba(18,65,145,1)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '1920px', '1080px']
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
            "zero-touch": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            type: 'image',
                            id: 'chart12',
                            opacity: '1',
                            rect: ['39px', '98px', '1276px', '673px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/chart1.png', '0px', '0px']
                        },
                        {
                            type: 'rect',
                            rect: ['0px', '659px', '1353px', '134px', 'auto', 'auto'],
                            opacity: '0',
                            id: 'Rectangle5',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            clip: 'rect(0px 1353px 134px 0px)',
                            fill: ['rgba(18,65,145,1)']
                        },
                        {
                            type: 'text',
                            id: 'Text7',
                            opacity: '0',
                            rect: ['423px', '703px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\">​Tests confirm slow connection</p>',
                            align: 'center',
                            font: ['Arial, Helvetica, sans-serif', [40, 'px'], 'rgba(255,255,255,1.00)', '400', 'none', 'normal', 'break-word', 'nowrap'],
                            textStyle: ['', '', '', '', 'none'],
                            transform: [[], [], [], ['0', '0']]
                        },
                        {
                            type: 'text',
                            id: 'Text6',
                            opacity: '0',
                            rect: ['380px', '0px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\">​Record of Wi-Fi extender zero-touch activation</p>',
                            align: 'center',
                            font: ['Arial, Helvetica, sans-serif', [30, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap'],
                            textStyle: ['', '', '', '', 'none'],
                            transform: [[], [], [], ['0', '0']]
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '1353px', '793px']
                        }
                    }
                },
                timeline: {
                    duration: 2250,
                    autoPlay: true,
                    data: [
                        [
                            "eid244",
                            "scaleY",
                            0,
                            1000,
                            "easeInOutCubic",
                            "${Text6}",
                            '0',
                            '1'
                        ],
                        [
                            "eid282",
                            "left",
                            250,
                            1500,
                            "easeInOutCubic",
                            "${chart12}",
                            '39px',
                            '38px'
                        ],
                        [
                            "eid236",
                            "scaleY",
                            1250,
                            1000,
                            "easeInOutCubic",
                            "${Text7}",
                            '0',
                            '1'
                        ],
                        [
                            "eid226",
                            "opacity",
                            1250,
                            1000,
                            "easeInOutCubic",
                            "${Text7}",
                            '0',
                            '1'
                        ],
                        [
                            "eid230",
                            "opacity",
                            0,
                            1000,
                            "easeInOutCubic",
                            "${Text6}",
                            '0',
                            '1'
                        ],
                        [
                            "eid242",
                            "scaleX",
                            0,
                            1000,
                            "easeInOutCubic",
                            "${Text6}",
                            '0',
                            '1'
                        ],
                        [
                            "eid284",
                            "top",
                            250,
                            1500,
                            "easeInOutCubic",
                            "${chart12}",
                            '98px',
                            '100px'
                        ],
                        [
                            "eid234",
                            "scaleX",
                            1250,
                            1000,
                            "easeInOutCubic",
                            "${Text7}",
                            '0',
                            '1'
                        ],
                        [
                            "eid280",
                            "opacity",
                            750,
                            1000,
                            "easeInOutCubic",
                            "${Rectangle5}",
                            '0',
                            '1'
                        ],
                        [
                            "eid260",
                            "clip",
                            750,
                            1000,
                            "easeInOutCubic",
                            "${Rectangle5}",
                            [142,1353,134,0],
                            [0,1353,134,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ]
                    ]
                }
            },
            "VoLTE-chart": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            type: 'rect',
                            id: 'Rectangle',
                            stroke: [0, 'rgb(18, 65, 145)', 'solid'],
                            rect: ['0px', '0px', '1542px', '634px', 'auto', 'auto'],
                            fill: ['rgba(255,255,255,1.00)']
                        },
                        {
                            rect: ['-3356px', '-787px', '8790px', '2200px', 'auto', 'auto'],
                            id: 'volte-chart-only',
                            transform: [[], [], [], ['0.1', '0.1']],
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/volte-chart-only.svg', '0px', '0px']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [24, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap'],
                            rect: ['553px', '0px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px; text-align: center;\">​<span style=\"font-size: 36px;\">Customer Experience Index</span></p>',
                            opacity: '0',
                            align: 'left',
                            textStyle: ['', '', '', '', 'none'],
                            id: 'Text9',
                            type: 'text'
                        },
                        {
                            type: 'rect',
                            rect: ['0px', '543px', '1542px', '155px', 'auto', 'auto'],
                            id: 'Rectangle6',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            clip: 'rect(155px 1542px 155px 0px)',
                            fill: ['rgba(18,65,145,1)']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [24, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap'],
                            rect: ['377px', '597px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px; text-align: center;\">​<span style=\"color: rgb(255, 255, 255); font-size: 40px;\">CEI shows Jackie is a High Valued Customer</span></p>',
                            opacity: '0',
                            align: 'left',
                            textStyle: ['', '', '', '', 'none'],
                            id: 'Text8',
                            type: 'text'
                        },
                        {
                            rect: ['80px', '193px', 'auto', 'auto', 'auto', 'auto'],
                            id: 'Text',
                            text: '<p style=\"margin: 0px;\">​Mobile Network Experience Index</p>',
                            font: ['Arial, Helvetica, sans-serif', [20, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text'
                        },
                        {
                            rect: ['80px', '229px', 'auto', 'auto', 'auto', 'auto'],
                            id: 'TextCopy',
                            text: '<p style=\"margin: 0px;\">​Voice Index</p>',
                            font: ['Arial, Helvetica, sans-serif', [20, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text'
                        },
                        {
                            rect: ['80px', '265px', 'auto', 'auto', 'auto', 'auto'],
                            id: 'TextCopy3',
                            text: '<p style=\"margin: 0px;\">Data index</p>',
                            font: ['Arial, Helvetica, sans-serif', [20, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text'
                        },
                        {
                            rect: ['80px', '301px', 'auto', 'auto', 'auto', 'auto'],
                            id: 'TextCopy2',
                            text: '<p style=\"margin: 0px;\">​VoLTE Index</p>',
                            font: ['Arial, Helvetica, sans-serif', [20, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text'
                        },
                        {
                            rect: ['413px', '193px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [20, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            id: 'TextCopy7',
                            text: '<p style=\"margin: 0px;\">​24</p>',
                            align: 'right',
                            type: 'text'
                        },
                        {
                            rect: ['502px', '193px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [20, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            id: 'TextCopy12',
                            text: '<p style=\"margin: 0px;\">​100</p>',
                            align: 'right',
                            type: 'text'
                        },
                        {
                            rect: ['413px', '229px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [20, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            id: 'TextCopy6',
                            text: '<p style=\"margin: 0px;\">​15</p>',
                            align: 'right',
                            type: 'text'
                        },
                        {
                            rect: ['413px', '265px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [20, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            id: 'TextCopy5',
                            text: '<p style=\"margin: 0px;\">27</p>',
                            align: 'right',
                            type: 'text'
                        },
                        {
                            rect: ['424px', '301px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [20, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            id: 'TextCopy4',
                            text: '<p style=\"margin: 0px;\">​5</p>',
                            align: 'right',
                            type: 'text'
                        },
                        {
                            rect: ['513px', '246px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [20, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            id: 'TextCopy10',
                            text: '<p style=\"margin: 0px;\">75</p>',
                            align: 'right',
                            type: 'text'
                        },
                        {
                            rect: ['513px', '301px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [20, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            id: 'TextCopy9',
                            text: '<p style=\"margin: 0px;\">50</p>',
                            align: 'right',
                            type: 'text'
                        },
                        {
                            rect: ['513px', '355px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [20, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            id: 'TextCopy13',
                            text: '<p style=\"margin: 0px;\">25</p>',
                            align: 'right',
                            type: 'text'
                        },
                        {
                            rect: ['524px', '407px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [20, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            id: 'TextCopy8',
                            text: '<p style=\"margin: 0px;\">​0</p>',
                            align: 'right',
                            type: 'text'
                        },
                        {
                            rect: ['740px', '436px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [20, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            id: 'TextCopy14',
                            text: '<p style=\"margin: 0px;\">20 Feb</p>',
                            align: 'right',
                            type: 'text'
                        },
                        {
                            rect: ['1083px', '436px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [20, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            id: 'TextCopy15',
                            text: '<p style=\"margin: 0px;\">22 Feb</p>',
                            align: 'right',
                            type: 'text'
                        },
                        {
                            rect: ['1434px', '436px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [20, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            id: 'TextCopy16',
                            text: '<p style=\"margin: 0px;\">24 Feb</p>',
                            align: 'right',
                            type: 'text'
                        },
                        {
                            rect: ['-5px', '-351px', '130px', '1220px', 'auto', 'auto'],
                            id: 'legend',
                            transform: [[], [], [], ['0.1', '0.1']],
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/legend.svg', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '1542px', '634px']
                        }
                    }
                },
                timeline: {
                    duration: 2500,
                    autoPlay: true,
                    labels: {
                        "Label 1": 0
                    },
                    data: [
                        [
                            "eid310",
                            "opacity",
                            1500,
                            1000,
                            "easeInOutCubic",
                            "${Text8}",
                            '0',
                            '1'
                        ],
                        [
                            "eid312",
                            "clip",
                            1000,
                            1000,
                            "easeInOutCubic",
                            "${Rectangle6}",
                            [155,1542,155,0],
                            [0,1542,155,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid308",
                            "opacity",
                            500,
                            1000,
                            "easeInOutCubic",
                            "${Text9}",
                            '0',
                            '1'
                        ]
                    ]
                }
            },
            "chatbot-chart": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['402px', '373px', '69px', '132px', 'auto', 'auto'],
                            id: 'troubleshoot-arrow3',
                            type: 'image',
                            display: 'none',
                            fill: ['rgba(0,0,0,0)', 'images/troubleshoot-arrow.svg', '0px', '0px']
                        },
                        {
                            rect: ['466px', '390px', '356px', '38px', 'auto', 'auto'],
                            id: 'rightdown-arrow',
                            type: 'image',
                            display: 'none',
                            fill: ['rgba(0,0,0,0)', 'images/rightdown-arrow.svg', '0px', '0px']
                        },
                        {
                            rect: ['458px', '366px', '17px', '118px', 'auto', 'auto'],
                            type: 'rect',
                            id: 'hidearrow1',
                            stroke: [2, 'rgb(18, 65, 145)', 'none'],
                            clip: 'rect(118px 17px 118px 0px)',
                            fill: ['rgba(255,255,255,1.00)']
                        },
                        {
                            transform: [[], [], [], ['0.35554']],
                            type: 'rect',
                            rect: ['322px', '483px', '218px', '23px', 'auto', 'auto'],
                            id: 'Rectangle4',
                            stroke: [2, 'rgb(18, 65, 145)', 'none'],
                            clip: 'rect(0px 218px 23px 0px)',
                            fill: ['rgba(255,255,255,1)']
                        },
                        {
                            type: 'rect',
                            id: 'Rectangle6',
                            stroke: [2, 'rgb(18, 65, 145)', 'none'],
                            rect: ['467px', '391px', '356px', '3px', 'auto', 'auto'],
                            display: 'none',
                            transform: [[], [], [], ['1', '3.23762']],
                            clip: 'rect(0px 356px 3.0299999713898px 356px)',
                            fill: ['rgba(255,255,255,1)']
                        },
                        {
                            rect: ['804px', '393px', '23px', '39px', 'auto', 'auto'],
                            type: 'rect',
                            display: 'none',
                            id: 'Rectangle7',
                            stroke: [2, 'rgb(18, 65, 145)', 'none'],
                            clip: 'rect(0px 23px 39px 0px)',
                            fill: ['rgba(255,255,255,1)']
                        },
                        {
                            rect: ['77px', '0px', '46px', '97px', 'auto', 'auto'],
                            id: 'alexa',
                            opacity: '0',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/alexa.svg', '0px', '0px']
                        },
                        {
                            rect: ['325px', '16px', '35px', '68px', 'auto', 'auto'],
                            id: 'fb_phone',
                            opacity: '0',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/fb%20phone.svg', '0px', '0px']
                        },
                        {
                            rect: ['795px', '21px', '65px', '65px', 'auto', 'auto'],
                            id: 'mic_icon',
                            opacity: '0',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/mic%20icon.svg', '0px', '0px']
                        },
                        {
                            rect: ['0px', '49px', '200px', '89px', 'auto', 'auto'],
                            id: 'blue_box',
                            opacity: '0',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/blue%20box.svg', '0px', '0px']
                        },
                        {
                            rect: ['243px', '49px', '200px', '89px', 'auto', 'auto'],
                            id: 'gray_box',
                            opacity: '0',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/gray%20box.svg', '0px', '0px']
                        },
                        {
                            rect: ['485px', '49px', '200px', '89px', 'auto', 'auto'],
                            id: 'nokia_box',
                            opacity: '0',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/nokia%20box.svg', '0px', '0px']
                        },
                        {
                            rect: ['546px', '45px', '84px', '14px', 'auto', 'auto'],
                            id: 'small-nokia',
                            opacity: '0',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/small-nokia.svg', '0px', '0px']
                        },
                        {
                            rect: ['728px', '49px', '200px', '89px', 'auto', 'auto'],
                            id: 'mic_box',
                            opacity: '0',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/mic%20box.svg', '0px', '0px']
                        },
                        {
                            rect: ['0px', '187px', '200px', '83px', 'auto', 'auto'],
                            id: 'round_box',
                            opacity: '0',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/round%20box.svg', '0px', '0px']
                        },
                        {
                            rect: ['243px', '186px', '200px', '83px', 'auto', 'auto'],
                            id: 'round_boxCopy',
                            opacity: '0',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/round%20box.svg', '0px', '0px']
                        },
                        {
                            rect: ['488px', '186px', '200px', '83px', 'auto', 'auto'],
                            id: 'round_boxCopy2',
                            opacity: '0',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/round%20box.svg', '0px', '0px']
                        },
                        {
                            rect: ['728px', '186px', '200px', '83px', 'auto', 'auto'],
                            id: 'round_gray_box',
                            opacity: '0',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/round%20gray%20box.svg', '0px', '0px']
                        },
                        {
                            rect: ['0px', '210px', '684px', '32px', 'auto', 'auto'],
                            stroke: [2, 'rgba(18,65,145,1.00)', 'solid'],
                            id: 'Rectangle',
                            opacity: '0',
                            type: 'rect',
                            fill: ['rgba(255,255,255,1.00)']
                        },
                        {
                            rect: ['728px', '210px', '196px', '32px', 'auto', 'auto'],
                            stroke: [2, 'rgba(190,200,210,1.00)', 'solid'],
                            id: 'RectangleCopy',
                            opacity: '0',
                            type: 'rect',
                            fill: ['rgba(255,255,255,1.00)']
                        },
                        {
                            rect: ['0px', '317px', '196px', '52px', 'auto', 'auto'],
                            stroke: [2, 'rgb(190, 200, 210)', 'none'],
                            id: 'Rectangle2',
                            opacity: '0',
                            type: 'rect',
                            fill: ['rgba(0,201,255,1.00)']
                        },
                        {
                            rect: ['0px', '637px', '253px', '52px', 'auto', 'auto'],
                            stroke: [2, 'rgb(190, 200, 210)', 'none'],
                            id: 'Rectangle2Copy8',
                            opacity: '0',
                            type: 'rect',
                            fill: ['rgba(18,65,145,1.00)']
                        },
                        {
                            rect: ['280px', '637px', '253px', '52px', 'auto', 'auto'],
                            stroke: [2, 'rgb(190, 200, 210)', 'none'],
                            id: 'Rectangle2Copy9',
                            opacity: '0',
                            type: 'rect',
                            fill: ['rgba(190,200,210,1.00)']
                        },
                        {
                            rect: ['561px', '637px', '166px', '52px', 'auto', 'auto'],
                            stroke: [2, 'rgb(190, 200, 210)', 'none'],
                            id: 'Rectangle2Copy10',
                            opacity: '0',
                            type: 'rect',
                            fill: ['rgba(190,200,210,1.00)']
                        },
                        {
                            rect: ['243px', '317px', '445px', '52px', 'auto', 'auto'],
                            stroke: [2, 'rgb(190, 200, 210)', 'none'],
                            id: 'Rectangle2Copy',
                            opacity: '0',
                            type: 'rect',
                            fill: ['rgba(18,65,145,1.00)']
                        },
                        {
                            rect: ['728px', '317px', '200px', '52px', 'auto', 'auto'],
                            stroke: [2, 'rgb(190, 200, 210)', 'none'],
                            id: 'Rectangle2Copy3',
                            opacity: '0',
                            type: 'rect',
                            fill: ['rgba(190,200,210,1.00)']
                        },
                        {
                            rect: ['0px', '413px', '200px', '52px', 'auto', 'auto'],
                            borderRadius: ['22px', '22px', '0px 0px', '0px 0px'],
                            stroke: [2, 'rgb(190, 200, 210)', 'none'],
                            id: 'Rectangle2Copy4',
                            opacity: '0',
                            type: 'rect',
                            fill: ['rgba(18,65,145,1.00)']
                        },
                        {
                            rect: ['488px', '413px', '200px', '52px', 'auto', 'auto'],
                            borderRadius: ['22px', '22px', '0px 0px', '0px 0px'],
                            stroke: [2, 'rgb(190, 200, 210)', 'none'],
                            id: 'Rectangle2Copy6',
                            opacity: '0',
                            type: 'rect',
                            fill: ['rgba(18,65,145,1.00)']
                        },
                        {
                            rect: ['244px', '413px', '200px', '52px', 'auto', 'auto'],
                            borderRadius: ['0px', '0px 0px', '0px 0px', '0px 0px'],
                            stroke: [2, 'rgb(190, 200, 210)', 'none'],
                            id: 'Rectangle2Copy5',
                            opacity: '0',
                            type: 'rect',
                            fill: ['rgba(18,65,145,1.00)']
                        },
                        {
                            rect: ['727px', '438px', '200px', '32px', 'auto', 'auto'],
                            borderRadius: ['0px', '0px 0px', '0px 0px', '0px 0px'],
                            stroke: [2, 'rgba(18,65,145,1.00)', 'solid'],
                            id: 'Rectangle2Copy7',
                            opacity: '0',
                            type: 'rect',
                            fill: ['rgba(18,65,145,0.00)']
                        },
                        {
                            rect: ['211px', '508px', '112px', '77px', 'auto', 'auto'],
                            id: 'diamond',
                            opacity: '0',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/gray%20diamond.svg', '0px', '0px']
                        },
                        {
                            rect: ['350px', '508px', '112px', '77px', 'auto', 'auto'],
                            id: 'gray_diamond',
                            opacity: '0',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/diamond.svg', '0px', '0px']
                        },
                        {
                            rect: ['490px', '508px', '112px', '77px', 'auto', 'auto'],
                            id: 'gray_diamondCopy',
                            opacity: '0',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/gray%20diamond.svg', '0px', '0px']
                        },
                        {
                            rect: ['629px', '508px', '112px', '77px', 'auto', 'auto'],
                            id: 'gray_diamondCopy2',
                            opacity: '0',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/gray%20diamond.svg', '0px', '0px']
                        },
                        {
                            transform: [[], [], [], ['0.99995']],
                            type: 'image',
                            id: 'updownarrow',
                            rect: ['96px', '145px', '8px', '35px', 'auto', 'auto'],
                            clip: 'rect(18px 8px 18px 0px)',
                            fill: ['rgba(0,0,0,0)', 'images/updownarrow.svg', '0px', '0px']
                        },
                        {
                            rect: ['339px', '145px', '8px', '35px', 'auto', 'auto'],
                            id: 'updownarrowCopy',
                            type: 'image',
                            clip: 'rect(18px 8px 18px 0px)',
                            fill: ['rgba(0,0,0,0)', 'images/updownarrow.svg', '0px', '0px']
                        },
                        {
                            rect: ['584px', '145px', '8px', '35px', 'auto', 'auto'],
                            id: 'updownarrowCopy2',
                            type: 'image',
                            clip: 'rect(18px 8px 18px 0px)',
                            fill: ['rgba(0,0,0,0)', 'images/updownarrow.svg', '0px', '0px']
                        },
                        {
                            rect: ['825px', '145px', '8px', '35px', 'auto', 'auto'],
                            id: 'updownarrowCopy3',
                            type: 'image',
                            clip: 'rect(18px 8px 18px 0px)',
                            fill: ['rgba(0,0,0,0)', 'images/updownarrow.svg', '0px', '0px']
                        },
                        {
                            rect: ['96px', '274px', '8px', '35px', 'auto', 'auto'],
                            id: 'updownarrowCopy7',
                            type: 'image',
                            clip: 'rect(18px 8px 18px 0px)',
                            fill: ['rgba(0,0,0,0)', 'images/updownarrow.svg', '0px', '0px']
                        },
                        {
                            rect: ['339px', '274px', '8px', '35px', 'auto', 'auto'],
                            id: 'updownarrowCopy6',
                            type: 'image',
                            clip: 'rect(18px 8px 18px 0px)',
                            fill: ['rgba(0,0,0,0)', 'images/updownarrow.svg', '0px', '0px']
                        },
                        {
                            rect: ['584px', '274px', '8px', '35px', 'auto', 'auto'],
                            id: 'updownarrowCopy5',
                            type: 'image',
                            clip: 'rect(18px 8px 18px 0px)',
                            fill: ['rgba(0,0,0,0)', 'images/updownarrow.svg', '0px', '0px']
                        },
                        {
                            rect: ['825px', '274px', '8px', '35px', 'auto', 'auto'],
                            id: 'updownarrowCopy4',
                            type: 'image',
                            clip: 'rect(18px 8px 18px 0px)',
                            fill: ['rgba(0,0,0,0)', 'images/updownarrow.svg', '0px', '0px']
                        },
                        {
                            rect: ['96px', '373px', '8px', '35px', 'auto', 'auto'],
                            id: 'updownarrowCopy11',
                            type: 'image',
                            clip: 'rect(18px 8px 18px 0px)',
                            fill: ['rgba(0,0,0,0)', 'images/updownarrow.svg', '0px', '0px']
                        },
                        {
                            rect: ['339px', '373px', '8px', '35px', 'auto', 'auto'],
                            id: 'updownarrowCopy10',
                            type: 'image',
                            clip: 'rect(18px 8px 18px 0px)',
                            fill: ['rgba(0,0,0,0)', 'images/updownarrow.svg', '0px', '0px']
                        },
                        {
                            rect: ['584px', '373px', '8px', '35px', 'auto', 'auto'],
                            id: 'updownarrowCopy9',
                            type: 'image',
                            clip: 'rect(18px 8px 18px 0px)',
                            fill: ['rgba(0,0,0,0)', 'images/updownarrow.svg', '0px', '0px']
                        },
                        {
                            rect: ['0px', '438px', '684px', '32px', 'auto', 'auto'],
                            stroke: [2, 'rgba(18,65,145,1.00)', 'solid'],
                            id: 'RectangleCopy2',
                            opacity: '0',
                            type: 'rect',
                            fill: ['rgba(255,255,255,1.00)']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'Text',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\">​<span style=\"color: rgb(255, 255, 255); font-size: 14px;\">Amazon Alexa</span></p>',
                            rect: ['56px', '114px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy12',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\">​<span style=\"color: rgb(255, 255, 255); font-size: 14px;\">ML Engine (NLU)</span></p>',
                            rect: ['44px', '335px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(255,255,255,1.00)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy13',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\">Workflow Engine</p>',
                            rect: ['414px', '335px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(255,255,255,1.00)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy14',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\">Knowledge Engine</p>',
                            rect: ['776px', '335px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(18,65,145,1.00)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy18',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\">Contact Center</p>',
                            rect: ['783px', '448px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\">​<span style=\"color: rgb(255, 255, 255); font-size: 14px;\">FB Messenger</span></p>',
                            rect: ['298px', '114px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy2',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\">​<span style=\"color: rgb(255, 255, 255); font-size: 14px;\">Nokia IMS</span></p>',
                            rect: ['556px', '114px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(255,255,255,1.00)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy3',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\">Other</p>',
                            rect: ['810px', '114px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy7',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\">​<span style=\"color: rgb(255, 255, 255); font-size: 14px;\">Plug - In</span></p>',
                            rect: ['73px', '190px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy6',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\"><span style=\"color: rgb(255, 255, 255);\">Plug - In</span></p>',
                            rect: ['317px', '190px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy5',
                            opacity: '0',
                            text: '<p style=\"margin: 0px; font-family: Arial, Helvetica, sans-serif; font-weight: 400; font-style: normal; text-decoration: none; font-size: 14px; color: rgb(255, 255, 255); background-color: rgba(0, 0, 0, 0); letter-spacing: 0px; text-transform: none; word-spacing: 0px; text-align: start; text-indent: 0px; line-height: normal;\">Plug - In</p>',
                            rect: ['561px', '190px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy4',
                            opacity: '0',
                            text: '<p style=\"margin: 0px; font-family: Arial, Helvetica, sans-serif; font-weight: 400; font-style: normal; text-decoration: none; font-size: 14px; color: rgb(255, 255, 255); background-color: rgba(0, 0, 0, 0); letter-spacing: 0px; text-transform: none; word-spacing: 0px; text-align: start; text-indent: 0px; line-height: normal;\">Plug - In</p>',
                            rect: ['805px', '190px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy11',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\">​<span style=\"color: rgb(255, 255, 255); font-size: 14px;\">Plug - In</span></p>',
                            rect: ['73px', '249px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy10',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\"><span style=\"color: rgb(255, 255, 255);\">Plug - In</span></p>',
                            rect: ['317px', '249px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy9',
                            opacity: '0',
                            text: '<p style=\"margin: 0px; font-family: Arial, Helvetica, sans-serif; font-weight: 400; font-style: normal; text-decoration: none; font-size: 14px; color: rgb(255, 255, 255); background-color: rgba(0, 0, 0, 0); letter-spacing: 0px; text-transform: none; word-spacing: 0px; text-align: start; text-indent: 0px; line-height: normal;\">Plug - In</p>',
                            rect: ['561px', '249px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy17',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\">​<span style=\"color: rgb(255, 255, 255); font-size: 14px;\">Plug - In</span></p>',
                            rect: ['73px', '417px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy20',
                            opacity: '0',
                            text: '<p style=\"margin: 0px; text-align: center;\">​<span style=\"color: rgb(255, 255, 255); font-size: 14px;\">Provision</span></p><p style=\"margin: 0px; text-align: center;\"><span style=\"color: rgb(255, 255, 255); font-size: 14px;\">​Devices</span></p>',
                            rect: ['237px', '530px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [15, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy24',
                            opacity: '0',
                            text: '<p style=\"margin: 0px; text-align: center;\">​<font color=\"#ffffff\">Connected Device Platform</font></p>',
                            rect: ['34px', '654px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [15, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy25',
                            opacity: '0',
                            text: '<p style=\"margin: 0px; text-align: center;\">​<font color=\"#ffffff\">Analytics</font></p>',
                            rect: ['378px', '654px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [15, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy26',
                            opacity: '0',
                            text: '<p style=\"margin: 0px; text-align: center;\">​<font color=\"#ffffff\">OSS/BSS</font></p>',
                            rect: ['611px', '654px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(255,255,255,1.00)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy21',
                            opacity: '0',
                            text: '<p style=\"margin: 0px; text-align: center;\">Trouble</p><p style=\"margin: 0px; text-align: center;\">​Shoot</p>',
                            rect: ['380px', '530px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy23',
                            opacity: '0',
                            text: '<p style=\"margin: 0px; text-align: center;\">​<font color=\"#ffffff\">Inquiry</font></p>',
                            rect: ['526px', '538px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(255,255,255,1.00)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy22',
                            opacity: '0',
                            text: '<p style=\"margin: 0px; text-align: center;\">...</p>',
                            rect: ['678px', '538px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy16',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\"><span style=\"color: rgb(255, 255, 255);\">WF Builder</span></p>',
                            rect: ['313px', '417px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy19',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\"><span style=\"color: rgb(18, 65, 145);\">Bot Builder</span></p>',
                            rect: ['307px', '448px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy27',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\"><span style=\"color: rgb(18, 65, 145);\">Interaction Engine (Dialogue)</span></p>',
                            rect: ['253px', '220px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy15',
                            opacity: '0',
                            text: '<p style=\"margin: 0px; font-family: Arial, Helvetica, sans-serif; font-weight: 400; font-style: normal; text-decoration: none; font-size: 14px; color: rgb(255, 255, 255); background-color: rgba(0, 0, 0, 0); letter-spacing: 0px; text-transform: none; word-spacing: 0px; text-align: start; text-indent: 0px; line-height: normal;\">Plug - In</p>',
                            rect: ['561px', '417px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy8',
                            opacity: '0',
                            text: '<p style=\"margin: 0px; font-family: Arial, Helvetica, sans-serif; font-weight: 400; font-style: normal; text-decoration: none; font-size: 14px; color: rgb(255, 255, 255); background-color: rgba(0, 0, 0, 0); letter-spacing: 0px; text-transform: none; word-spacing: 0px; text-align: start; text-indent: 0px; line-height: normal;\">Plug - In</p>',
                            rect: ['805px', '249px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            transform: [[], [], [], ['0.6', '0.6']],
                            borderRadius: ['50%', '50%', '50%', '50%'],
                            id: 'Ellipse',
                            opacity: '0',
                            rect: ['82px', '112px', '36px', '36px', 'auto', 'auto'],
                            type: 'ellipse',
                            stroke: [2, 'rgb(190, 200, 210)', 'none'],
                            fill: ['rgba(0,201,255,1.00)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '931px', '689px']
                        }
                    }
                },
                timeline: {
                    duration: 12877,
                    autoPlay: true,
                    data: [
                        [
                            "eid661",
                            "opacity",
                            3000,
                            1000,
                            "linear",
                            "${TextCopy9}",
                            '0',
                            '1'
                        ],
                        [
                            "eid619",
                            "opacity",
                            5500,
                            1000,
                            "linear",
                            "${Rectangle2Copy3}",
                            '0',
                            '1'
                        ],
                        [
                            "eid673",
                            "opacity",
                            4500,
                            1000,
                            "linear",
                            "${TextCopy12}",
                            '0',
                            '1'
                        ],
                        [
                            "eid641",
                            "opacity",
                            8000,
                            1000,
                            "linear",
                            "${TextCopy18}",
                            '0',
                            '1'
                        ],
                        [
                            "eid809",
                            "display",
                            6000,
                            0,
                            "linear",
                            "${troubleshoot-arrow3}",
                            'none',
                            'block'
                        ],
                        [
                            "eid565",
                            "opacity",
                            500,
                            1000,
                            "linear",
                            "${gray_box}",
                            '0',
                            '1'
                        ],
                        [
                            "eid631",
                            "opacity",
                            10256,
                            1000,
                            "linear",
                            "${TextCopy25}",
                            '0',
                            '1'
                        ],
                        [
                            "eid633",
                            "opacity",
                            10750,
                            1000,
                            "linear",
                            "${TextCopy26}",
                            '0',
                            '1'
                        ],
                        [
                            "eid623",
                            "opacity",
                            9750,
                            1000,
                            "linear",
                            "${TextCopy24}",
                            '0',
                            '1'
                        ],
                        [
                            "eid611",
                            "opacity",
                            4500,
                            1000,
                            "linear",
                            "${Rectangle2}",
                            '0',
                            '1'
                        ],
                        [
                            "eid520",
                            "clip",
                            5750,
                            750,
                            "linear",
                            "${updownarrowCopy11}",
                            [18,8,18,0],
                            [0,8,35,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid621",
                            "opacity",
                            9250,
                            1000,
                            "linear",
                            "${Rectangle2Copy8}",
                            '0',
                            '1'
                        ],
                        [
                            "eid639",
                            "opacity",
                            6500,
                            1000,
                            "linear",
                            "${Rectangle2Copy7}",
                            '0',
                            '1'
                        ],
                        [
                            "eid699",
                            "display",
                            6000,
                            0,
                            "linear",
                            "${Rectangle7}",
                            'none',
                            'block'
                        ],
                        [
                            "eid569",
                            "opacity",
                            1000,
                            1000,
                            "linear",
                            "${TextCopy2}",
                            '0',
                            '1'
                        ],
                        [
                            "eid635",
                            "opacity",
                            8377,
                            1000,
                            "linear",
                            "${gray_diamondCopy}",
                            '0',
                            '1'
                        ],
                        [
                            "eid589",
                            "opacity",
                            6500,
                            1000,
                            "linear",
                            "${Rectangle2Copy5}",
                            '0',
                            '1'
                        ],
                        [
                            "eid706",
                            "clip",
                            6000,
                            1000,
                            "linear",
                            "${hidearrow1}",
                            [0,17,118,0],
                            [118,17,118,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid559",
                            "opacity",
                            500,
                            1000,
                            "linear",
                            "${fb_phone}",
                            '0',
                            '1'
                        ],
                        [
                            "eid573",
                            "opacity",
                            1500,
                            1000,
                            "linear",
                            "${TextCopy3}",
                            '0',
                            '1'
                        ],
                        [
                            "eid516",
                            "clip",
                            5750,
                            750,
                            "linear",
                            "${updownarrowCopy6}",
                            [18,8,18,0],
                            [0,8,35,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid655",
                            "opacity",
                            0,
                            1000,
                            "linear",
                            "${Text}",
                            '0',
                            '1'
                        ],
                        [
                            "eid577",
                            "opacity",
                            3500,
                            1000,
                            "linear",
                            "${TextCopy27}",
                            '0',
                            '1'
                        ],
                        [
                            "eid676",
                            "location",
                            7000,
                            5877,
                            "linear",
                            "${Ellipse}",
                            [[100, 130.02, 0, 0, 0, 0,0],[100.76, 228.33, 0, 0, 0, 0,98.31],[343.29, 227.77, 0, 0, 0, 0,340.84],[344.45, 343.14, 0, 0, 0, 0,456.22],[466.19, 342.44, 0, 0, 0, 0,577.96],[466.11, 486.54, 0, 0, 0, 0,722.06],[406.31, 486.92, 0, 0, 0, 0,781.86],[406.26, 542.22, 0, 0, 0, 0,837.16]]
                        ],
                        [
                            "eid617",
                            "opacity",
                            7000,
                            1500,
                            "linear",
                            "${RectangleCopy2}",
                            '0',
                            '1'
                        ],
                        [
                            "eid669",
                            "opacity",
                            5000,
                            1000,
                            "linear",
                            "${Rectangle2Copy}",
                            '0',
                            '1'
                        ],
                        [
                            "eid512",
                            "clip",
                            5750,
                            750,
                            "linear",
                            "${updownarrowCopy9}",
                            [18,8,18,0],
                            [0,8,35,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid581",
                            "opacity",
                            8000,
                            1000,
                            "linear",
                            "${TextCopy23}",
                            '0',
                            '1'
                        ],
                        [
                            "eid561",
                            "opacity",
                            1500,
                            1000,
                            "linear",
                            "${mic_icon}",
                            '0',
                            '1'
                        ],
                        [
                            "eid502",
                            "clip",
                            5750,
                            750,
                            "linear",
                            "${updownarrowCopy}",
                            [18,8,18,0],
                            [0,8,35,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid625",
                            "opacity",
                            8883,
                            1000,
                            "linear",
                            "${gray_diamondCopy2}",
                            '0',
                            '1'
                        ],
                        [
                            "eid659",
                            "opacity",
                            2000,
                            1000,
                            "linear",
                            "${round_box}",
                            '0',
                            '1'
                        ],
                        [
                            "eid651",
                            "opacity",
                            3500,
                            1000,
                            "linear",
                            "${TextCopy8}",
                            '0',
                            '1'
                        ],
                        [
                            "eid686",
                            "opacity",
                            7000,
                            313,
                            "linear",
                            "${Ellipse}",
                            '0',
                            '1'
                        ],
                        [
                            "eid685",
                            "opacity",
                            12484,
                            393,
                            "linear",
                            "${Ellipse}",
                            '1',
                            '0'
                        ],
                        [
                            "eid585",
                            "opacity",
                            5000,
                            1000,
                            "linear",
                            "${TextCopy13}",
                            '0',
                            '1'
                        ],
                        [
                            "eid657",
                            "opacity",
                            3500,
                            1000,
                            "linear",
                            "${TextCopy4}",
                            '0',
                            '1'
                        ],
                        [
                            "eid645",
                            "opacity",
                            7000,
                            1000,
                            "linear",
                            "${TextCopy15}",
                            '0',
                            '1'
                        ],
                        [
                            "eid583",
                            "opacity",
                            7377,
                            1000,
                            "linear",
                            "${diamond}",
                            '0',
                            '1'
                        ],
                        [
                            "eid607",
                            "opacity",
                            7883,
                            1000,
                            "linear",
                            "${gray_diamond}",
                            '0',
                            '1'
                        ],
                        [
                            "eid615",
                            "opacity",
                            6500,
                            1000,
                            "linear",
                            "${TextCopy16}",
                            '0',
                            '1'
                        ],
                        [
                            "eid649",
                            "opacity",
                            7000,
                            1000,
                            "linear",
                            "${Rectangle2Copy6}",
                            '0',
                            '1'
                        ],
                        [
                            "eid504",
                            "clip",
                            5750,
                            750,
                            "linear",
                            "${updownarrow}",
                            [18,8,18,0],
                            [0,8,35,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid671",
                            "opacity",
                            3500,
                            1000,
                            "linear",
                            "${RectangleCopy}",
                            '0',
                            '1'
                        ],
                        [
                            "eid557",
                            "clip",
                            6250,
                            2000,
                            "linear",
                            "${Rectangle6}",
                            [0,356,3.0299999713897705,0],
                            [0,356,3.0299999713898,356],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid599",
                            "opacity",
                            2500,
                            1000,
                            "linear",
                            "${TextCopy6}",
                            '0',
                            '1'
                        ],
                        [
                            "eid579",
                            "opacity",
                            7500,
                            1000,
                            "linear",
                            "${TextCopy19}",
                            '0',
                            '1'
                        ],
                        [
                            "eid601",
                            "opacity",
                            10250,
                            1000,
                            "linear",
                            "${Rectangle2Copy10}",
                            '0',
                            '1'
                        ],
                        [
                            "eid563",
                            "opacity",
                            500,
                            1000,
                            "linear",
                            "${TextCopy}",
                            '0',
                            '1'
                        ],
                        [
                            "eid508",
                            "clip",
                            5750,
                            750,
                            "linear",
                            "${updownarrowCopy3}",
                            [18,8,18,0],
                            [0,8,35,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid688",
                            "scaleY",
                            7000,
                            313,
                            "linear",
                            "${Ellipse}",
                            '0.6',
                            '1'
                        ],
                        [
                            "eid682",
                            "scaleY",
                            12484,
                            393,
                            "linear",
                            "${Ellipse}",
                            '1',
                            '0.6'
                        ],
                        [
                            "eid518",
                            "clip",
                            5750,
                            750,
                            "linear",
                            "${updownarrowCopy7}",
                            [18,8,18,0],
                            [0,8,35,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid522",
                            "clip",
                            5750,
                            750,
                            "linear",
                            "${updownarrowCopy5}",
                            [18,8,18,0],
                            [0,8,35,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid587",
                            "opacity",
                            3000,
                            1000,
                            "linear",
                            "${round_boxCopy2}",
                            '0',
                            '1'
                        ],
                        [
                            "eid629",
                            "opacity",
                            0,
                            1000,
                            "linear",
                            "${blue_box}",
                            '0',
                            '1'
                        ],
                        [
                            "eid695",
                            "display",
                            6250,
                            0,
                            "linear",
                            "${rightdown-arrow}",
                            'none',
                            'block'
                        ],
                        [
                            "eid567",
                            "opacity",
                            1000,
                            1000,
                            "linear",
                            "${nokia_box}",
                            '0',
                            '1'
                        ],
                        [
                            "eid716",
                            "clip",
                            7000,
                            1000,
                            "linear",
                            "${Rectangle4}",
                            [0,218,23,0],
                            [0,0,23,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid627",
                            "opacity",
                            2000,
                            1000,
                            "linear",
                            "${TextCopy11}",
                            '0',
                            '1'
                        ],
                        [
                            "eid591",
                            "opacity",
                            3500,
                            1000,
                            "linear",
                            "${round_gray_box}",
                            '0',
                            '1'
                        ],
                        [
                            "eid605",
                            "opacity",
                            7506,
                            1000,
                            "linear",
                            "${TextCopy21}",
                            '0',
                            '1'
                        ],
                        [
                            "eid613",
                            "opacity",
                            3000,
                            1000,
                            "linear",
                            "${TextCopy5}",
                            '0',
                            '1'
                        ],
                        [
                            "eid597",
                            "opacity",
                            6000,
                            1000,
                            "linear",
                            "${TextCopy17}",
                            '0',
                            '1'
                        ],
                        [
                            "eid700",
                            "display",
                            6000,
                            0,
                            "linear",
                            "${Rectangle6}",
                            'none',
                            'block'
                        ],
                        [
                            "eid506",
                            "clip",
                            5750,
                            750,
                            "linear",
                            "${updownarrowCopy2}",
                            [18,8,18,0],
                            [0,8,35,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid647",
                            "opacity",
                            5500,
                            1000,
                            "linear",
                            "${TextCopy14}",
                            '0',
                            '1'
                        ],
                        [
                            "eid643",
                            "opacity",
                            2500,
                            1500,
                            "linear",
                            "${Rectangle}",
                            '0',
                            '1'
                        ],
                        [
                            "eid663",
                            "opacity",
                            2500,
                            1000,
                            "linear",
                            "${round_boxCopy}",
                            '0',
                            '1'
                        ],
                        [
                            "eid510",
                            "clip",
                            5750,
                            750,
                            "linear",
                            "${updownarrowCopy4}",
                            [18,8,18,0],
                            [0,8,35,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid551",
                            "clip",
                            8134,
                            616,
                            "linear",
                            "${Rectangle7}",
                            [0,23,39,0],
                            [39,23,39,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid665",
                            "opacity",
                            2000,
                            1000,
                            "linear",
                            "${TextCopy7}",
                            '0',
                            '1'
                        ],
                        [
                            "eid514",
                            "clip",
                            5750,
                            750,
                            "linear",
                            "${updownarrowCopy10}",
                            [18,8,18,0],
                            [0,8,35,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid609",
                            "opacity",
                            8506,
                            1000,
                            "linear",
                            "${TextCopy22}",
                            '0',
                            '1'
                        ],
                        [
                            "eid603",
                            "opacity",
                            0,
                            1000,
                            "linear",
                            "${alexa}",
                            '0',
                            '1'
                        ],
                        [
                            "eid637",
                            "opacity",
                            7000,
                            1000,
                            "linear",
                            "${TextCopy20}",
                            '0',
                            '1'
                        ],
                        [
                            "eid571",
                            "opacity",
                            1500,
                            1000,
                            "linear",
                            "${mic_box}",
                            '0',
                            '1'
                        ],
                        [
                            "eid687",
                            "scaleX",
                            7000,
                            313,
                            "linear",
                            "${Ellipse}",
                            '0.6',
                            '1'
                        ],
                        [
                            "eid681",
                            "scaleX",
                            12484,
                            393,
                            "linear",
                            "${Ellipse}",
                            '1',
                            '0.6'
                        ],
                        [
                            "eid575",
                            "opacity",
                            1000,
                            1000,
                            "linear",
                            "${small-nokia}",
                            '0',
                            '1'
                        ],
                        [
                            "eid593",
                            "opacity",
                            6000,
                            1000,
                            "linear",
                            "${Rectangle2Copy4}",
                            '0',
                            '1'
                        ],
                        [
                            "eid595",
                            "opacity",
                            9756,
                            1000,
                            "linear",
                            "${Rectangle2Copy9}",
                            '0',
                            '1'
                        ],
                        [
                            "eid653",
                            "opacity",
                            2500,
                            1000,
                            "linear",
                            "${TextCopy10}",
                            '0',
                            '1'
                        ]
                    ]
                }
            },
            "config-vowifi-screens": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '0px', '1120px', '862px', 'auto', 'auto'],
                            id: 'ss1',
                            opacity: '1',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/8_mockup.png', '0px', '0px']
                        },
                        {
                            rect: ['0px', '0px', '1120px', '862px', 'auto', 'auto'],
                            id: 'ss2',
                            opacity: '0',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/9_mockup.png', '0px', '0px']
                        },
                        {
                            rect: ['0px', '0px', '1120px', '862px', 'auto', 'auto'],
                            id: 'ss3',
                            opacity: '0',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/10_mockup.png', '0px', '0px']
                        },
                        {
                            rect: ['0px', '0px', '1120px', '862px', 'auto', 'auto'],
                            id: 'ss4',
                            opacity: '0',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/11_mockup.png', '0px', '0px']
                        },
                        {
                            rect: ['0px', '0px', '1120px', '862px', 'auto', 'auto'],
                            id: 'ss5',
                            opacity: '0',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/12_mockup.png', '0px', '0px']
                        },
                        {
                            rect: ['0px', '0px', '1120px', '862px', 'auto', 'auto'],
                            id: 'ss6',
                            opacity: '0',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/13_mockup.png', '0px', '0px']
                        },
                        {
                            rect: ['0px', '0px', '1120px', '862px', 'auto', 'auto'],
                            id: 'ss7',
                            opacity: '0',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/14_mockup.png', '0px', '0px']
                        },
                        {
                            rect: ['0px', '0px', '1120px', '862px', 'auto', 'auto'],
                            id: 'ss8',
                            opacity: '0',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/15_mockup.png', '0px', '0px']
                        },
                        {
                            type: 'rect',
                            rect: ['32px', '26px', '1066px', '606px', 'auto', 'auto'],
                            display: 'block',
                            stroke: [2, 'rgb(18, 65, 145)', 'solid'],
                            id: 'btn',
                            opacity: '0',
                            cursor: 'pointer',
                            fill: ['rgba(255,255,255,1)']
                        },
                        {
                            type: 'image',
                            id: 'iphone6-vowifi-1',
                            rect: ['-802px', '-646px', '1800px', '2600px', 'auto', 'auto'],
                            transform: [[], [], [], ['0.25', '0.25']],
                            fill: ['rgba(0,0,0,0)', 'images/iphone6-vowifi-1.png', '0px', '0px']
                        },
                        {
                            type: 'image',
                            transform: [[], [], [], ['0.25', '0.25']],
                            rect: ['-802px', '-646px', '1800px', '2600px', 'auto', 'auto'],
                            id: 'iphone6-vowifi-22',
                            opacity: '1',
                            display: 'none',
                            fill: ['rgba(0,0,0,0)', 'images/iphone6-vowifi-2.png', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '1120px', '862px']
                        }
                    }
                },
                timeline: {
                    duration: 7000,
                    autoPlay: true,
                    data: [
                        [
                            "eid797",
                            "opacity",
                            6000,
                            1000,
                            "easeInOutCubic",
                            "${iphone6-vowifi-22}",
                            '0',
                            '1'
                        ],
                        [
                            "eid730",
                            "opacity",
                            1000,
                            1000,
                            "linear",
                            "${ss3}",
                            '0',
                            '1'
                        ],
                        [
                            "eid718",
                            "opacity",
                            2000,
                            1000,
                            "linear",
                            "${ss4}",
                            '0',
                            '1'
                        ],
                        [
                            "eid722",
                            "opacity",
                            0,
                            1000,
                            "linear",
                            "${ss2}",
                            '0',
                            '1'
                        ],
                        [
                            "eid728",
                            "opacity",
                            4000,
                            1000,
                            "linear",
                            "${ss6}",
                            '0',
                            '1'
                        ],
                        [
                            "eid732",
                            "opacity",
                            5000,
                            1000,
                            "linear",
                            "${ss7}",
                            '0',
                            '1'
                        ],
                        [
                            "eid808",
                            "display",
                            7000,
                            0,
                            "easeInOutCubic",
                            "${btn}",
                            'block',
                            'none'
                        ],
                        [
                            "eid726",
                            "opacity",
                            6000,
                            1000,
                            "linear",
                            "${ss8}",
                            '0',
                            '1'
                        ],
                        [
                            "eid724",
                            "opacity",
                            3000,
                            1000,
                            "linear",
                            "${ss5}",
                            '0',
                            '1'
                        ],
                        [
                            "eid807",
                            "display",
                            6000,
                            0,
                            "easeInOutCubic",
                            "${iphone6-vowifi-22}",
                            'none',
                            'block'
                        ]
                    ]
                }
            },
            "speedomter": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '0px', '208px', '162px', 'auto', 'auto'],
                            id: 'speedometerbg',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/speedometerbg.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'speed',
                            rect: ['0px', '12px', '64px', '150px', 'auto', 'auto'],
                            clip: 'rect(150px 64px 150px 0px)',
                            fill: ['rgba(0,0,0,0)', 'images/speed.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'speed-hand',
                            rect: ['75px', '82px', '34px', '33px', 'auto', 'auto'],
                            transform: [[], ['-75'], [0, 0, 0], [1, 1, 1]],
                            fill: ['rgba(0,0,0,0)', 'images/speed-hand.svg', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '208px', '162px']
                        }
                    }
                },
                timeline: {
                    duration: 10000,
                    autoPlay: false,
                    data: [
                        [
                            "eid811",
                            "clip",
                            0,
                            6000,
                            "easeInOutCubic",
                            "${speed}",
                            [150,64,150,0],
                            [0,64,150,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid816",
                            "clip",
                            6000,
                            2000,
                            "easeInOutCubic",
                            "${speed}",
                            [0,64,150,0],
                            [15,64,150,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid817",
                            "clip",
                            8000,
                            500,
                            "easeInOutCubic",
                            "${speed}",
                            [15,64,150,0],
                            [0,64,150,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid820",
                            "clip",
                            8500,
                            1500,
                            "easeInOutCubic",
                            "${speed}",
                            [0,64,150,0],
                            [150,64,150,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid814",
                            "rotateZ",
                            0,
                            6000,
                            "easeInOutCubic",
                            "${speed-hand}",
                            '-75deg',
                            '16deg'
                        ],
                        [
                            "eid815",
                            "rotateZ",
                            6000,
                            2000,
                            "easeInOutCubic",
                            "${speed-hand}",
                            '16deg',
                            '10deg'
                        ],
                        [
                            "eid818",
                            "rotateZ",
                            8000,
                            500,
                            "easeInOutCubic",
                            "${speed-hand}",
                            '10deg',
                            '19deg'
                        ],
                        [
                            "eid819",
                            "rotateZ",
                            8500,
                            1500,
                            "easeInOutCubic",
                            "${speed-hand}",
                            '19deg',
                            '-75deg'
                        ]
                    ]
                }
            },
            "subscrber-analytics": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['256px', '152px', '1161px', '551px', 'auto', 'auto'],
                            id: 'Rectangle3',
                            stroke: [2, 'rgb(190, 200, 210)', 'none'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,1)']
                        },
                        {
                            type: 'image',
                            id: 'analytics-website',
                            rect: ['0px', '0px', '1417px', '702px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/analytics-website.svg', '0px', '0px']
                        },
                        {
                            transform: [[], ['-45'], [0, 0, 0], [1, 1, 1]],
                            id: 'Text7',
                            textStyle: ['', '', '', '', 'none'],
                            rect: ['728px', '623px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\">​1:00 AM</p>',
                            font: ['Arial, Helvetica, sans-serif', [10, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap'],
                            align: 'left',
                            type: 'text'
                        },
                        {
                            transform: [[], ['-45'], [0, 0, 0], [1, 1, 1]],
                            id: 'Text7Copy',
                            textStyle: ['', '', '', '', 'none'],
                            rect: ['781px', '623px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\">​2:00 AM</p>',
                            font: ['Arial, Helvetica, sans-serif', [10, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap'],
                            align: 'left',
                            type: 'text'
                        },
                        {
                            transform: [[], ['-45'], [0, 0, 0], [1, 1, 1]],
                            id: 'Text7Copy2',
                            textStyle: ['', '', '', '', 'none'],
                            rect: ['834px', '623px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\">​3:00 AM</p>',
                            font: ['Arial, Helvetica, sans-serif', [10, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap'],
                            align: 'left',
                            type: 'text'
                        },
                        {
                            transform: [[], ['-45'], [0, 0, 0], [1, 1, 1]],
                            id: 'Text7Copy5',
                            textStyle: ['', '', '', '', 'none'],
                            rect: ['886px', '623px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\">​4:00 AM</p>',
                            font: ['Arial, Helvetica, sans-serif', [10, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap'],
                            align: 'left',
                            type: 'text'
                        },
                        {
                            transform: [[], ['-45'], [0, 0, 0], [1, 1, 1]],
                            id: 'Text7Copy4',
                            textStyle: ['', '', '', '', 'none'],
                            rect: ['939px', '623px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\">​5:00 AM</p>',
                            font: ['Arial, Helvetica, sans-serif', [10, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap'],
                            align: 'left',
                            type: 'text'
                        },
                        {
                            transform: [[], ['-45'], [0, 0, 0], [1, 1, 1]],
                            id: 'Text7Copy3',
                            textStyle: ['', '', '', '', 'none'],
                            rect: ['992px', '623px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\">​6:00 AM</p>',
                            font: ['Arial, Helvetica, sans-serif', [10, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap'],
                            align: 'left',
                            type: 'text'
                        },
                        {
                            transform: [[], ['-45'], [0, 0, 0], [1, 1, 1]],
                            id: 'Text7Copy11',
                            textStyle: ['', '', '', '', 'none'],
                            rect: ['1044px', '623px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\">​7:00 AM</p>',
                            font: ['Arial, Helvetica, sans-serif', [10, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap'],
                            align: 'left',
                            type: 'text'
                        },
                        {
                            transform: [[], ['-45'], [0, 0, 0], [1, 1, 1]],
                            id: 'Text7Copy10',
                            textStyle: ['', '', '', '', 'none'],
                            rect: ['1097px', '623px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\">​8:00 AM</p>',
                            font: ['Arial, Helvetica, sans-serif', [10, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap'],
                            align: 'left',
                            type: 'text'
                        },
                        {
                            transform: [[], ['-45'], [0, 0, 0], [1, 1, 1]],
                            id: 'Text7Copy9',
                            textStyle: ['', '', '', '', 'none'],
                            rect: ['1149px', '623px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\">​9:00 AM</p>',
                            font: ['Arial, Helvetica, sans-serif', [10, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap'],
                            align: 'left',
                            type: 'text'
                        },
                        {
                            transform: [[], ['-45'], [0, 0, 0], [1, 1, 1]],
                            id: 'Text7Copy8',
                            textStyle: ['', '', '', '', 'none'],
                            rect: ['1202px', '625px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\">​10:00 AM</p>',
                            font: ['Arial, Helvetica, sans-serif', [10, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap'],
                            align: 'left',
                            type: 'text'
                        },
                        {
                            transform: [[], ['-45'], [0, 0, 0], [1, 1, 1]],
                            id: 'Text7Copy7',
                            textStyle: ['', '', '', '', 'none'],
                            rect: ['1255px', '625px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\">​11:00 AM</p>',
                            font: ['Arial, Helvetica, sans-serif', [10, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap'],
                            align: 'left',
                            type: 'text'
                        },
                        {
                            transform: [[], ['-45'], [0, 0, 0], [1, 1, 1]],
                            id: 'Text7Copy6',
                            textStyle: ['', '', '', '', 'none'],
                            rect: ['1307px', '625px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\">​12:00 PM</p>',
                            font: ['Arial, Helvetica, sans-serif', [10, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap'],
                            align: 'left',
                            type: 'text'
                        },
                        {
                            transform: [[], ['-45'], [0, 0, 0], [1, 1, 1]],
                            id: 'Text7Copy12',
                            textStyle: ['', '', '', '', 'none'],
                            rect: ['1360px', '623px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\">​1:00 PM</p>',
                            font: ['Arial, Helvetica, sans-serif', [10, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap'],
                            align: 'left',
                            type: 'text'
                        },
                        {
                            type: 'text',
                            rect: ['351px', '229px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\">​android-c972f1ac5f93eab3 - 5GHz - 50mbsb - 7472</p>',
                            id: 'Text5',
                            textStyle: ['', '', '', '', 'none'],
                            align: 'left',
                            font: ['Arial, Helvetica, sans-serif', [16, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            rect: ['317px', '303px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\">​android-893b895bbb9237278 - 2.4GHz - 24mbsb - 7472</p>',
                            id: 'Text5Copy',
                            textStyle: ['', '', '', '', 'none'],
                            align: 'left',
                            font: ['Arial, Helvetica, sans-serif', [16, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            rect: ['345px', '387px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\">​android-305937860fc63de3 - 5GHz - 50mbsb - 7472</p>',
                            id: 'Text5Copy2',
                            textStyle: ['', '', '', '', 'none'],
                            align: 'left',
                            font: ['Arial, Helvetica, sans-serif', [16, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            rect: ['411px', '472px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\">​WLAN-Repeater-2 - 5GHz - 50mbsb - 7472</p>',
                            id: 'Text5Copy3',
                            textStyle: ['', '', '', '', 'none'],
                            align: 'left',
                            font: ['Arial, Helvetica, sans-serif', [16, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            rect: ['373px', '558px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\">​ipad-fw295048443pa53 2.4GHz – 50mbsb-7442</p>',
                            id: 'Text5Copy4',
                            textStyle: ['', '', '', '', 'none'],
                            align: 'left',
                            font: ['Arial, Helvetica, sans-serif', [16, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            rect: ['13px', '0px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\">​<span style=\"color: rgb(255, 255, 255); font-size: 16px;\">Subscriber 1013328179</span></p>',
                            id: 'Text12',
                            textStyle: ['', '', '', '', 'none'],
                            align: 'left',
                            font: ['Arial, Helvetica, sans-serif', [24, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            rect: ['18px', '49px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\">​daily</p>',
                            id: 'Text12Copy',
                            textStyle: ['', '', '', '', 'none'],
                            align: 'left',
                            font: ['Arial, Helvetica, sans-serif', [12, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            rect: ['105px', '51px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\">​<span style=\"font-size: 12px;\">January 16th, 2017</span></p>',
                            id: 'Text12Copy2',
                            textStyle: ['', '', '', '', 'none'],
                            align: 'left',
                            font: ['Arial, Helvetica, sans-serif', [12, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            rect: ['18', '92px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\">​<span style=\"font-size: 11px;\">INSIGHTS</span></p>',
                            id: 'Text13',
                            textStyle: ['', '', '', '', 'none'],
                            align: 'left',
                            font: ['Arial, Helvetica, sans-serif', [11, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            rect: ['90px', '92px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\">CHARTS</p>',
                            id: 'Text13Copy',
                            textStyle: ['', '', '', '', 'none'],
                            align: 'left',
                            font: ['Arial, Helvetica, sans-serif', [11, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            rect: ['159px', '92px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\">OBSERVATIONS</p>',
                            id: 'Text13Copy2',
                            textStyle: ['', '', '', '', 'none'],
                            align: 'left',
                            font: ['Arial, Helvetica, sans-serif', [11, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            rect: ['271px', '92px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\">RECOMMENDATIONS</p>',
                            id: 'Text13Copy3',
                            textStyle: ['', '', '', '', 'none'],
                            align: 'left',
                            font: ['Arial, Helvetica, sans-serif', [11, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            rect: ['18px', '133px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\">Wi-Fi client device signal evolution report</p>',
                            id: 'Text14',
                            textStyle: ['', '', '', '', 'none'],
                            align: 'left',
                            font: ['Arial, Helvetica, sans-serif', [16, 'px'], 'rgba(255,255,255,1.00)', '400', 'none', 'normal', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            rect: ['21px', '179px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\">​<span style=\"color: rgb(0, 0, 0); font-size: 11px;\">Home</span></p>',
                            id: 'Text15',
                            textStyle: ['', '', '', '', 'none'],
                            align: 'left',
                            font: ['Arial, Helvetica, sans-serif', [11, 'px'], 'rgba(255,255,255,1)', '400', 'none', 'normal', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            rect: ['34px', '215px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\">​<span style=\"color: rgb(0, 0, 0); font-size: 11px;\">Daily</span></p>',
                            id: 'Text15Copy',
                            textStyle: ['', '', '', '', 'none'],
                            align: 'left',
                            font: ['Arial, Helvetica, sans-serif', [11, 'px'], 'rgba(255,255,255,1)', '400', 'none', 'normal', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            rect: ['35px', '260px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\">​<span style=\"color: rgb(0, 0, 0); font-size: 11px;\">Inventory Report</span></p>',
                            id: 'Text15Copy2',
                            textStyle: ['', '', '', '', 'none'],
                            align: 'left',
                            font: ['Arial, Helvetica, sans-serif', [11, 'px'], 'rgba(255,255,255,1)', '400', 'none', 'normal', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            rect: ['35px', '303px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\"><span style=\"color: rgb(0, 0, 0);\">Port Mapping Report</span></p>',
                            id: 'Text15Copy3',
                            textStyle: ['', '', '', '', 'none'],
                            align: 'left',
                            font: ['Arial, Helvetica, sans-serif', [11, 'px'], 'rgba(255,255,255,1)', '400', 'none', 'normal', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            rect: ['35px', '346px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\">​<span style=\"color: rgb(0, 0, 0); font-size: 11px;\">WAN Data Volume Report</span></p>',
                            id: 'Text15Copy5',
                            textStyle: ['', '', '', '', 'none'],
                            align: 'left',
                            font: ['Arial, Helvetica, sans-serif', [11, 'px'], 'rgba(255,255,255,1)', '400', 'none', 'normal', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            rect: ['35px', '390px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\"><span style=\"color: rgb(0, 0, 0);\">WAN DSL Connection Report</span></p>',
                            id: 'Text15Copy4',
                            textStyle: ['', '', '', '', 'none'],
                            align: 'left',
                            font: ['Arial, Helvetica, sans-serif', [11, 'px'], 'rgba(255,255,255,1)', '400', 'none', 'normal', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            rect: ['35px', '433px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\">​<span style=\"color: rgb(0, 0, 0); font-size: 11px;\">WAN DSL Quality Report</span></p>',
                            id: 'Text15Copy9',
                            textStyle: ['', '', '', '', 'none'],
                            align: 'left',
                            font: ['Arial, Helvetica, sans-serif', [11, 'px'], 'rgba(255,255,255,1)', '400', 'none', 'normal', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            rect: ['35px', '476px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\"><span style=\"color: rgb(0, 0, 0);\">Wi-Fi Activity Report</span></p>',
                            id: 'Text15Copy8',
                            textStyle: ['', '', '', '', 'none'],
                            align: 'left',
                            font: ['Arial, Helvetica, sans-serif', [11, 'px'], 'rgba(255,255,255,1)', '400', 'none', 'normal', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            rect: ['35px', '519px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\">​<span style=\"color: rgb(0, 0, 0); font-size: 11px;\">Wi-Fi Client Device Quality Evolution...</span></p>',
                            id: 'Text15Copy7',
                            textStyle: ['', '', '', '', 'none'],
                            align: 'left',
                            font: ['Arial, Helvetica, sans-serif', [11, 'px'], 'rgba(255,255,255,1)', '400', 'none', 'normal', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            rect: ['35px', '563px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px; font-family: Arial, Helvetica, sans-serif; font-weight: 400; font-style: normal; text-decoration: none; font-size: 11px; color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); letter-spacing: 0px; text-transform: none; word-spacing: 0px; text-align: left; text-indent: 0px; line-height: normal;\">Wi-Fi Client Device Signal Evolution...</p>',
                            id: 'Text15Copy6',
                            textStyle: ['', '', '', '', 'none'],
                            align: 'left',
                            font: ['Arial, Helvetica, sans-serif', [11, 'px'], 'rgba(255,255,255,1)', '400', 'none', 'normal', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            rect: ['35px', '606px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px; font-family: Arial, Helvetica, sans-serif; font-weight: 400; font-style: normal; text-decoration: none; font-size: 11px; color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); letter-spacing: 0px; text-transform: none; word-spacing: 0px; text-align: left; text-indent: 0px; line-height: normal;\">Wi-Fi Client Coverage Report</p>',
                            id: 'Text15Copy10',
                            textStyle: ['', '', '', '', 'none'],
                            align: 'left',
                            font: ['Arial, Helvetica, sans-serif', [11, 'px'], 'rgba(255,255,255,1)', '400', 'none', 'normal', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            rect: ['34px', '649px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px; font-family: Arial, Helvetica, sans-serif; font-weight: 400; font-style: normal; text-decoration: none; font-size: 11px; color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); letter-spacing: 0px; text-transform: none; word-spacing: 0px; text-align: left; text-indent: 0px; line-height: normal;\">Wi-Fi Radio Activity Report</p>',
                            id: 'Text15Copy11',
                            textStyle: ['', '', '', '', 'none'],
                            align: 'left',
                            font: ['Arial, Helvetica, sans-serif', [11, 'px'], 'rgba(255,255,255,1)', '400', 'none', 'normal', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            rect: ['362', '249', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\">​</p>',
                            id: 'Text4',
                            textStyle: ['', '', '', '', 'none'],
                            align: 'left',
                            font: ['Arial, Helvetica, sans-serif', [16, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            rect: ['515px', '673px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\">​<span style=\"font-size: 10px;\">0</span></p>',
                            id: 'Text6',
                            textStyle: ['', '', '', '', 'none'],
                            align: 'left',
                            font: ['Arial, Helvetica, sans-serif', [10, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            rect: ['664px', '673px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\">​<span style=\"font-size: 10px;\">1</span></p>',
                            id: 'Text6Copy',
                            textStyle: ['', '', '', '', 'none'],
                            align: 'left',
                            font: ['Arial, Helvetica, sans-serif', [10, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            rect: ['586px', '673px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\">​0<span style=\"font-size: 10px;\">.5</span></p>',
                            id: 'Text6Copy2',
                            textStyle: ['', '', '', '', 'none'],
                            align: 'left',
                            font: ['Arial, Helvetica, sans-serif', [10, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            rect: ['589px', '-77px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\">​Home Analytics</p>',
                            id: 'Text9',
                            textStyle: ['', '', '', '', 'none'],
                            align: 'left',
                            font: ['Arial, Helvetica, sans-serif', [36, 'px'], 'rgba(0,0,0,1.00)', '400', 'none', 'normal', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            rect: ['200px', '739px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px; text-align: center;\">​Home Analytics recommends that a Wi-Fi extender to resolve persistent low Wi-Fi</p><p style=\"margin: 0px; text-align: center;\">connectivity on Jackie’s tablet</p>',
                            id: 'Text16',
                            textStyle: ['', '', '', '', 'none'],
                            align: 'left',
                            font: ['Arial, Helvetica, sans-serif', [36, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '1417px', '702px']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "chatbot-chart_2": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            type: 'image',
                            display: 'none',
                            rect: ['466px', '390px', '356px', '38px', 'auto', 'auto'],
                            id: 'rightdown-arrow',
                            fill: ['rgba(0,0,0,0)', 'images/rightdown-arrow.svg', '0px', '0px']
                        },
                        {
                            rect: ['263px', '373px', '208px', '130px', 'auto', 'auto'],
                            id: 'arrow2',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/arrow2.svg', '0px', '0px']
                        },
                        {
                            type: 'rect',
                            rect: ['461px', '372px', '22px', '112px', 'auto', 'auto'],
                            id: 'Rectangle3',
                            stroke: [2, 'rgb(18, 65, 145)', 'none'],
                            clip: 'rect(0px 22px 112px 0px)',
                            fill: ['rgba(255,255,255,1)']
                        },
                        {
                            transform: [[], [], [], ['0.94496']],
                            type: 'rect',
                            rect: ['257px', '483px', '218px', '23px', 'auto', 'auto'],
                            id: 'Rectangle4',
                            stroke: [2, 'rgb(18, 65, 145)', 'none'],
                            clip: 'rect(0px 218px 23px 0px)',
                            fill: ['rgba(255,255,255,1)']
                        },
                        {
                            transform: [[], [], [], ['1', '3.23762']],
                            type: 'rect',
                            rect: ['467px', '391px', '356px', '3px', 'auto', 'auto'],
                            id: 'Rectangle6',
                            stroke: [2, 'rgb(18, 65, 145)', 'none'],
                            clip: 'rect(0px 356px 3.0299999713898px 356px)',
                            fill: ['rgba(255,255,255,1)']
                        },
                        {
                            type: 'rect',
                            rect: ['804px', '393px', '23px', '39px', 'auto', 'auto'],
                            display: 'none',
                            id: 'Rectangle7',
                            stroke: [2, 'rgb(18, 65, 145)', 'none'],
                            clip: 'rect(0px 23px 39px 0px)',
                            fill: ['rgba(255,255,255,1)']
                        },
                        {
                            type: 'image',
                            id: 'alexa',
                            opacity: '0',
                            rect: ['77px', '0px', '46px', '97px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/alexa.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'fb_phone',
                            opacity: '0',
                            rect: ['325px', '16px', '35px', '68px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/fb%20phone.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'mic_icon',
                            opacity: '0',
                            rect: ['795px', '21px', '65px', '65px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/mic%20icon.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'blue_box',
                            opacity: '0',
                            rect: ['0px', '49px', '200px', '89px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/blue%20box.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'gray_box',
                            opacity: '0',
                            rect: ['243px', '49px', '200px', '89px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/gray%20box.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'nokia_box',
                            opacity: '0',
                            rect: ['485px', '49px', '200px', '89px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/nokia%20box.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'small-nokia',
                            opacity: '0',
                            rect: ['546px', '45px', '84px', '14px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/small-nokia.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'mic_box',
                            opacity: '0',
                            rect: ['728px', '49px', '200px', '89px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/mic%20box.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'round_box',
                            opacity: '0',
                            rect: ['0px', '187px', '200px', '83px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/round%20box.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'round_boxCopy',
                            opacity: '0',
                            rect: ['243px', '186px', '200px', '83px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/round%20box.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'round_boxCopy2',
                            opacity: '0',
                            rect: ['488px', '186px', '200px', '83px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/round%20box.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'round_gray_box',
                            opacity: '0',
                            rect: ['728px', '186px', '200px', '83px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/round%20gray%20box.svg', '0px', '0px']
                        },
                        {
                            rect: ['0px', '210px', '684px', '32px', 'auto', 'auto'],
                            opacity: '0',
                            id: 'Rectangle',
                            stroke: [2, 'rgba(18,65,145,1.00)', 'solid'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,1.00)']
                        },
                        {
                            rect: ['728px', '210px', '196px', '32px', 'auto', 'auto'],
                            opacity: '0',
                            id: 'RectangleCopy',
                            stroke: [2, 'rgba(190,200,210,1.00)', 'solid'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,1.00)']
                        },
                        {
                            rect: ['0px', '317px', '196px', '52px', 'auto', 'auto'],
                            opacity: '0',
                            id: 'Rectangle2',
                            stroke: [2, 'rgb(190, 200, 210)', 'none'],
                            type: 'rect',
                            fill: ['rgba(0,201,255,1.00)']
                        },
                        {
                            rect: ['0px', '637px', '253px', '52px', 'auto', 'auto'],
                            opacity: '0',
                            id: 'Rectangle2Copy8',
                            stroke: [2, 'rgb(190, 200, 210)', 'none'],
                            type: 'rect',
                            fill: ['rgba(18,65,145,1)']
                        },
                        {
                            rect: ['280px', '637px', '253px', '52px', 'auto', 'auto'],
                            opacity: '0',
                            id: 'Rectangle2Copy9',
                            stroke: [2, 'rgb(190, 200, 210)', 'none'],
                            type: 'rect',
                            fill: ['rgba(190,200,210,1.00)']
                        },
                        {
                            rect: ['561px', '637px', '166px', '52px', 'auto', 'auto'],
                            opacity: '0',
                            id: 'Rectangle2Copy10',
                            stroke: [2, 'rgb(190, 200, 210)', 'none'],
                            type: 'rect',
                            fill: ['rgba(190,200,210,1.00)']
                        },
                        {
                            rect: ['243px', '317px', '445px', '52px', 'auto', 'auto'],
                            opacity: '0',
                            id: 'Rectangle2Copy',
                            stroke: [2, 'rgb(190, 200, 210)', 'none'],
                            type: 'rect',
                            fill: ['rgba(18,65,145,1.00)']
                        },
                        {
                            rect: ['728px', '317px', '200px', '52px', 'auto', 'auto'],
                            opacity: '0',
                            id: 'Rectangle2Copy3',
                            stroke: [2, 'rgb(190, 200, 210)', 'none'],
                            type: 'rect',
                            fill: ['rgba(190,200,210,1.00)']
                        },
                        {
                            rect: ['0px', '413px', '200px', '52px', 'auto', 'auto'],
                            borderRadius: ['22px', '22px', '0px 0px', '0px 0px'],
                            opacity: '0',
                            id: 'Rectangle2Copy4',
                            stroke: [2, 'rgb(190, 200, 210)', 'none'],
                            type: 'rect',
                            fill: ['rgba(18,65,145,1.00)']
                        },
                        {
                            rect: ['488px', '413px', '200px', '52px', 'auto', 'auto'],
                            borderRadius: ['22px', '22px', '0px 0px', '0px 0px'],
                            opacity: '0',
                            id: 'Rectangle2Copy6',
                            stroke: [2, 'rgb(190, 200, 210)', 'none'],
                            type: 'rect',
                            fill: ['rgba(18,65,145,1.00)']
                        },
                        {
                            rect: ['244px', '413px', '200px', '52px', 'auto', 'auto'],
                            borderRadius: ['0px', '0px 0px', '0px 0px', '0px 0px'],
                            opacity: '0',
                            id: 'Rectangle2Copy5',
                            stroke: [2, 'rgb(190, 200, 210)', 'none'],
                            type: 'rect',
                            fill: ['rgba(18,65,145,1.00)']
                        },
                        {
                            rect: ['727px', '438px', '200px', '32px', 'auto', 'auto'],
                            borderRadius: ['0px', '0px 0px', '0px 0px', '0px 0px'],
                            opacity: '0',
                            id: 'Rectangle2Copy7',
                            stroke: [2, 'rgba(18,65,145,1.00)', 'solid'],
                            type: 'rect',
                            fill: ['rgba(18,65,145,0.00)']
                        },
                        {
                            type: 'image',
                            id: 'diamond',
                            opacity: '0',
                            rect: ['211px', '508px', '112px', '77px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/diamond.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'gray_diamond',
                            opacity: '0',
                            rect: ['350px', '508px', '112px', '77px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/gray%20diamond.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'gray_diamondCopy',
                            opacity: '0',
                            rect: ['490px', '508px', '112px', '77px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/gray%20diamond.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'gray_diamondCopy2',
                            opacity: '0',
                            rect: ['629px', '508px', '112px', '77px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/gray%20diamond.svg', '0px', '0px']
                        },
                        {
                            transform: [[], [], [], ['0.99995']],
                            type: 'image',
                            id: 'updownarrow',
                            rect: ['96px', '145px', '8px', '35px', 'auto', 'auto'],
                            clip: 'rect(18px 8px 18px 0px)',
                            fill: ['rgba(0,0,0,0)', 'images/updownarrow.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'updownarrowCopy',
                            rect: ['339px', '145px', '8px', '35px', 'auto', 'auto'],
                            clip: 'rect(18px 8px 18px 0px)',
                            fill: ['rgba(0,0,0,0)', 'images/updownarrow.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'updownarrowCopy2',
                            rect: ['584px', '145px', '8px', '35px', 'auto', 'auto'],
                            clip: 'rect(18px 8px 18px 0px)',
                            fill: ['rgba(0,0,0,0)', 'images/updownarrow.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'updownarrowCopy3',
                            rect: ['825px', '145px', '8px', '35px', 'auto', 'auto'],
                            clip: 'rect(18px 8px 18px 0px)',
                            fill: ['rgba(0,0,0,0)', 'images/updownarrow.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'updownarrowCopy7',
                            rect: ['96px', '274px', '8px', '35px', 'auto', 'auto'],
                            clip: 'rect(18px 8px 18px 0px)',
                            fill: ['rgba(0,0,0,0)', 'images/updownarrow.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'updownarrowCopy6',
                            rect: ['339px', '274px', '8px', '35px', 'auto', 'auto'],
                            clip: 'rect(18px 8px 18px 0px)',
                            fill: ['rgba(0,0,0,0)', 'images/updownarrow.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'updownarrowCopy5',
                            rect: ['584px', '274px', '8px', '35px', 'auto', 'auto'],
                            clip: 'rect(18px 8px 18px 0px)',
                            fill: ['rgba(0,0,0,0)', 'images/updownarrow.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'updownarrowCopy4',
                            rect: ['825px', '274px', '8px', '35px', 'auto', 'auto'],
                            clip: 'rect(18px 8px 18px 0px)',
                            fill: ['rgba(0,0,0,0)', 'images/updownarrow.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'updownarrowCopy11',
                            rect: ['96px', '373px', '8px', '35px', 'auto', 'auto'],
                            clip: 'rect(18px 8px 18px 0px)',
                            fill: ['rgba(0,0,0,0)', 'images/updownarrow.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'updownarrowCopy10',
                            rect: ['339px', '373px', '8px', '35px', 'auto', 'auto'],
                            clip: 'rect(18px 8px 18px 0px)',
                            fill: ['rgba(0,0,0,0)', 'images/updownarrow.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'updownarrowCopy9',
                            rect: ['584px', '373px', '8px', '35px', 'auto', 'auto'],
                            clip: 'rect(18px 8px 18px 0px)',
                            fill: ['rgba(0,0,0,0)', 'images/updownarrow.svg', '0px', '0px']
                        },
                        {
                            rect: ['0px', '438px', '684px', '32px', 'auto', 'auto'],
                            opacity: '0',
                            id: 'RectangleCopy2',
                            stroke: [2, 'rgba(18,65,145,1.00)', 'solid'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,1.00)']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'Text',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\">​<span style=\"color: rgb(255, 255, 255); font-size: 14px;\">Amazon Alexa</span></p>',
                            rect: ['56px', '114px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy12',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\">​<span style=\"color: rgb(255, 255, 255); font-size: 14px;\">ML Engine (NLU)</span></p>',
                            rect: ['44px', '335px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(255,255,255,1.00)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy13',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\">Workflow Engine</p>',
                            rect: ['414px', '335px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(255,255,255,1.00)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy14',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\">Knowledge Engine</p>',
                            rect: ['776px', '335px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(18,65,145,1.00)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy18',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\">Contact Center</p>',
                            rect: ['783px', '448px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\">​<span style=\"color: rgb(255, 255, 255); font-size: 14px;\">FB Messenger</span></p>',
                            rect: ['298px', '114px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy2',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\">​<span style=\"color: rgb(255, 255, 255); font-size: 14px;\">Nokia IMS</span></p>',
                            rect: ['556px', '114px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(255,255,255,1.00)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy3',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\">Other</p>',
                            rect: ['810px', '114px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy7',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\">​<span style=\"color: rgb(255, 255, 255); font-size: 14px;\">Plug - In</span></p>',
                            rect: ['73px', '190px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy6',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\"><span style=\"color: rgb(255, 255, 255);\">Plug - In</span></p>',
                            rect: ['317px', '190px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy5',
                            opacity: '0',
                            text: '<p style=\"margin: 0px; font-family: Arial, Helvetica, sans-serif; font-weight: 400; font-style: normal; text-decoration: none; font-size: 14px; color: rgb(255, 255, 255); background-color: rgba(0, 0, 0, 0); letter-spacing: 0px; text-transform: none; word-spacing: 0px; text-align: start; text-indent: 0px; line-height: normal;\">Plug - In</p>',
                            rect: ['561px', '190px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy4',
                            opacity: '0',
                            text: '<p style=\"margin: 0px; font-family: Arial, Helvetica, sans-serif; font-weight: 400; font-style: normal; text-decoration: none; font-size: 14px; color: rgb(255, 255, 255); background-color: rgba(0, 0, 0, 0); letter-spacing: 0px; text-transform: none; word-spacing: 0px; text-align: start; text-indent: 0px; line-height: normal;\">Plug - In</p>',
                            rect: ['805px', '190px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy11',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\">​<span style=\"color: rgb(255, 255, 255); font-size: 14px;\">Plug - In</span></p>',
                            rect: ['73px', '249px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy10',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\"><span style=\"color: rgb(255, 255, 255);\">Plug - In</span></p>',
                            rect: ['317px', '249px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy9',
                            opacity: '0',
                            text: '<p style=\"margin: 0px; font-family: Arial, Helvetica, sans-serif; font-weight: 400; font-style: normal; text-decoration: none; font-size: 14px; color: rgb(255, 255, 255); background-color: rgba(0, 0, 0, 0); letter-spacing: 0px; text-transform: none; word-spacing: 0px; text-align: start; text-indent: 0px; line-height: normal;\">Plug - In</p>',
                            rect: ['561px', '249px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy17',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\">​<span style=\"color: rgb(255, 255, 255); font-size: 14px;\">Plug - In</span></p>',
                            rect: ['73px', '417px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy20',
                            opacity: '0',
                            text: '<p style=\"margin: 0px; text-align: center;\">​<span style=\"color: rgb(255, 255, 255); font-size: 14px;\">Provision</span></p><p style=\"margin: 0px; text-align: center;\"><span style=\"color: rgb(255, 255, 255); font-size: 14px;\">​Devices</span></p>',
                            rect: ['237px', '530px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [15, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy24',
                            opacity: '0',
                            text: '<p style=\"margin: 0px; text-align: center;\">​<font color=\"#ffffff\">Connected Device Platform</font></p>',
                            rect: ['34px', '654px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [15, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy25',
                            opacity: '0',
                            text: '<p style=\"margin: 0px; text-align: center;\">​<font color=\"#ffffff\">Analytics</font></p>',
                            rect: ['378px', '654px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [15, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy26',
                            opacity: '0',
                            text: '<p style=\"margin: 0px; text-align: center;\">​<font color=\"#ffffff\">OSS/BSS</font></p>',
                            rect: ['611px', '654px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(255,255,255,1.00)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy21',
                            opacity: '0',
                            text: '<p style=\"margin: 0px; text-align: center;\">Trouble</p><p style=\"margin: 0px; text-align: center;\">​Shoot</p>',
                            rect: ['380px', '530px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy23',
                            opacity: '0',
                            text: '<p style=\"margin: 0px; text-align: center;\">​<font color=\"#ffffff\">Inquiry</font></p>',
                            rect: ['526px', '538px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(255,255,255,1.00)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy22',
                            opacity: '0',
                            text: '<p style=\"margin: 0px; text-align: center;\">...</p>',
                            rect: ['678px', '538px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy16',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\"><span style=\"color: rgb(255, 255, 255);\">WF Builder</span></p>',
                            rect: ['313px', '417px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy19',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\"><span style=\"color: rgb(18, 65, 145);\">Bot Builder</span></p>',
                            rect: ['307px', '448px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy27',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\"><span style=\"color: rgb(18, 65, 145);\">Interaction Engine (Dialogue)</span></p>',
                            rect: ['253px', '220px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy15',
                            opacity: '0',
                            text: '<p style=\"margin: 0px; font-family: Arial, Helvetica, sans-serif; font-weight: 400; font-style: normal; text-decoration: none; font-size: 14px; color: rgb(255, 255, 255); background-color: rgba(0, 0, 0, 0); letter-spacing: 0px; text-transform: none; word-spacing: 0px; text-align: start; text-indent: 0px; line-height: normal;\">Plug - In</p>',
                            rect: ['561px', '417px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'TextCopy8',
                            opacity: '0',
                            text: '<p style=\"margin: 0px; font-family: Arial, Helvetica, sans-serif; font-weight: 400; font-style: normal; text-decoration: none; font-size: 14px; color: rgb(255, 255, 255); background-color: rgba(0, 0, 0, 0); letter-spacing: 0px; text-transform: none; word-spacing: 0px; text-align: start; text-indent: 0px; line-height: normal;\">Plug - In</p>',
                            rect: ['805px', '249px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            type: 'ellipse',
                            borderRadius: ['50%', '50%', '50%', '50%'],
                            id: 'Ellipse',
                            opacity: '0',
                            rect: ['82px', '112px', '36px', '36px', 'auto', 'auto'],
                            transform: [[], [], [], ['0.6', '0.6']],
                            stroke: [2, 'rgb(190, 200, 210)', 'none'],
                            fill: ['rgba(0,201,255,1.00)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '931px', '689px']
                        }
                    }
                },
                timeline: {
                    duration: 12877,
                    autoPlay: false,
                    data: [
                        [
                            "eid661",
                            "opacity",
                            3000,
                            1000,
                            "linear",
                            "${TextCopy9}",
                            '0',
                            '1'
                        ],
                        [
                            "eid619",
                            "opacity",
                            5500,
                            1000,
                            "linear",
                            "${Rectangle2Copy3}",
                            '0',
                            '1'
                        ],
                        [
                            "eid673",
                            "opacity",
                            4500,
                            1000,
                            "linear",
                            "${TextCopy12}",
                            '0',
                            '1'
                        ],
                        [
                            "eid641",
                            "opacity",
                            8000,
                            1000,
                            "linear",
                            "${TextCopy18}",
                            '0',
                            '1'
                        ],
                        [
                            "eid514",
                            "clip",
                            5750,
                            750,
                            "linear",
                            "${updownarrowCopy10}",
                            [18,8,18,0],
                            [0,8,35,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid631",
                            "opacity",
                            10256,
                            1000,
                            "linear",
                            "${TextCopy25}",
                            '0',
                            '1'
                        ],
                        [
                            "eid633",
                            "opacity",
                            10750,
                            1000,
                            "linear",
                            "${TextCopy26}",
                            '0',
                            '1'
                        ],
                        [
                            "eid623",
                            "opacity",
                            9750,
                            1000,
                            "linear",
                            "${TextCopy24}",
                            '0',
                            '1'
                        ],
                        [
                            "eid611",
                            "opacity",
                            4500,
                            1000,
                            "linear",
                            "${Rectangle2}",
                            '0',
                            '1'
                        ],
                        [
                            "eid520",
                            "clip",
                            5750,
                            750,
                            "linear",
                            "${updownarrowCopy11}",
                            [18,8,18,0],
                            [0,8,35,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid621",
                            "opacity",
                            9250,
                            1000,
                            "linear",
                            "${Rectangle2Copy8}",
                            '0',
                            '1'
                        ],
                        [
                            "eid639",
                            "opacity",
                            6500,
                            1000,
                            "linear",
                            "${Rectangle2Copy7}",
                            '0',
                            '1'
                        ],
                        [
                            "eid699",
                            "display",
                            6000,
                            0,
                            "linear",
                            "${Rectangle7}",
                            'none',
                            'block'
                        ],
                        [
                            "eid569",
                            "opacity",
                            1000,
                            1000,
                            "linear",
                            "${TextCopy2}",
                            '0',
                            '1'
                        ],
                        [
                            "eid688",
                            "scaleY",
                            7000,
                            313,
                            "linear",
                            "${Ellipse}",
                            '0.6',
                            '1'
                        ],
                        [
                            "eid682",
                            "scaleY",
                            12484,
                            393,
                            "linear",
                            "${Ellipse}",
                            '1',
                            '0.6'
                        ],
                        [
                            "eid589",
                            "opacity",
                            6500,
                            1000,
                            "linear",
                            "${Rectangle2Copy5}",
                            '0',
                            '1'
                        ],
                        [
                            "eid559",
                            "opacity",
                            500,
                            1000,
                            "linear",
                            "${fb_phone}",
                            '0',
                            '1'
                        ],
                        [
                            "eid573",
                            "opacity",
                            1500,
                            1000,
                            "linear",
                            "${TextCopy3}",
                            '0',
                            '1'
                        ],
                        [
                            "eid516",
                            "clip",
                            5750,
                            750,
                            "linear",
                            "${updownarrowCopy6}",
                            [18,8,18,0],
                            [0,8,35,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid655",
                            "opacity",
                            0,
                            1000,
                            "linear",
                            "${Text}",
                            '0',
                            '1'
                        ],
                        [
                            "eid577",
                            "opacity",
                            3500,
                            1000,
                            "linear",
                            "${TextCopy27}",
                            '0',
                            '1'
                        ],
                        [
                            "eid676",
                            "location",
                            7000,
                            5877,
                            "linear",
                            "${Ellipse}",
                            [[100, 130.02, 0, 0, 0, 0,0],[100.76, 228.33, 0, 0, 0, 0,98.31],[343.29, 227.77, 0, 0, 0, 0,340.84],[344.45, 343.14, 0, 0, 0, 0,456.22],[466.19, 342.44, 0, 0, 0, 0,577.96],[466.11, 486.54, 0, 0, 0, 0,722.06],[266.73, 487.82, 0, 0, 0, 0,921.45],[266.81, 537.8, 0, 0, 0, 0,971.43]]
                        ],
                        [
                            "eid617",
                            "opacity",
                            7000,
                            1500,
                            "linear",
                            "${RectangleCopy2}",
                            '0',
                            '1'
                        ],
                        [
                            "eid669",
                            "opacity",
                            5000,
                            1000,
                            "linear",
                            "${Rectangle2Copy}",
                            '0',
                            '1'
                        ],
                        [
                            "eid512",
                            "clip",
                            5750,
                            750,
                            "linear",
                            "${updownarrowCopy9}",
                            [18,8,18,0],
                            [0,8,35,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid581",
                            "opacity",
                            8000,
                            1000,
                            "linear",
                            "${TextCopy23}",
                            '0',
                            '1'
                        ],
                        [
                            "eid561",
                            "opacity",
                            1500,
                            1000,
                            "linear",
                            "${mic_icon}",
                            '0',
                            '1'
                        ],
                        [
                            "eid502",
                            "clip",
                            5750,
                            750,
                            "linear",
                            "${updownarrowCopy}",
                            [18,8,18,0],
                            [0,8,35,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid625",
                            "opacity",
                            8883,
                            1000,
                            "linear",
                            "${gray_diamondCopy2}",
                            '0',
                            '1'
                        ],
                        [
                            "eid659",
                            "opacity",
                            2000,
                            1000,
                            "linear",
                            "${round_box}",
                            '0',
                            '1'
                        ],
                        [
                            "eid651",
                            "opacity",
                            3500,
                            1000,
                            "linear",
                            "${TextCopy8}",
                            '0',
                            '1'
                        ],
                        [
                            "eid686",
                            "opacity",
                            7000,
                            313,
                            "linear",
                            "${Ellipse}",
                            '0',
                            '1'
                        ],
                        [
                            "eid685",
                            "opacity",
                            12484,
                            393,
                            "linear",
                            "${Ellipse}",
                            '1',
                            '0'
                        ],
                        [
                            "eid585",
                            "opacity",
                            5000,
                            1000,
                            "linear",
                            "${TextCopy13}",
                            '0',
                            '1'
                        ],
                        [
                            "eid657",
                            "opacity",
                            3500,
                            1000,
                            "linear",
                            "${TextCopy4}",
                            '0',
                            '1'
                        ],
                        [
                            "eid645",
                            "opacity",
                            7000,
                            1000,
                            "linear",
                            "${TextCopy15}",
                            '0',
                            '1'
                        ],
                        [
                            "eid583",
                            "opacity",
                            7377,
                            1000,
                            "linear",
                            "${diamond}",
                            '0',
                            '1'
                        ],
                        [
                            "eid945",
                            "background-color",
                            12877,
                            0,
                            "easeOutQuad",
                            "${Rectangle2Copy9}",
                            'rgba(190,200,210,1.00)',
                            'rgba(190,200,210,1.00)'
                        ],
                        [
                            "eid607",
                            "opacity",
                            7883,
                            1000,
                            "linear",
                            "${gray_diamond}",
                            '0',
                            '1'
                        ],
                        [
                            "eid615",
                            "opacity",
                            6500,
                            1000,
                            "linear",
                            "${TextCopy16}",
                            '0',
                            '1'
                        ],
                        [
                            "eid649",
                            "opacity",
                            7000,
                            1000,
                            "linear",
                            "${Rectangle2Copy6}",
                            '0',
                            '1'
                        ],
                        [
                            "eid504",
                            "clip",
                            5750,
                            750,
                            "linear",
                            "${updownarrow}",
                            [18,8,18,0],
                            [0,8,35,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid671",
                            "opacity",
                            3500,
                            1000,
                            "linear",
                            "${RectangleCopy}",
                            '0',
                            '1'
                        ],
                        [
                            "eid557",
                            "clip",
                            6250,
                            2000,
                            "linear",
                            "${Rectangle6}",
                            [0,356,3.0299999713897705,0],
                            [0,356,3.0299999713898,356],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid599",
                            "opacity",
                            2500,
                            1000,
                            "linear",
                            "${TextCopy6}",
                            '0',
                            '1'
                        ],
                        [
                            "eid579",
                            "opacity",
                            7500,
                            1000,
                            "linear",
                            "${TextCopy19}",
                            '0',
                            '1'
                        ],
                        [
                            "eid601",
                            "opacity",
                            10250,
                            1000,
                            "linear",
                            "${Rectangle2Copy10}",
                            '0',
                            '1'
                        ],
                        [
                            "eid653",
                            "opacity",
                            2500,
                            1000,
                            "linear",
                            "${TextCopy10}",
                            '0',
                            '1'
                        ],
                        [
                            "eid587",
                            "opacity",
                            3000,
                            1000,
                            "linear",
                            "${round_boxCopy2}",
                            '0',
                            '1'
                        ],
                        [
                            "eid571",
                            "opacity",
                            1500,
                            1000,
                            "linear",
                            "${mic_box}",
                            '0',
                            '1'
                        ],
                        [
                            "eid518",
                            "clip",
                            5750,
                            750,
                            "linear",
                            "${updownarrowCopy7}",
                            [18,8,18,0],
                            [0,8,35,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid508",
                            "clip",
                            5750,
                            750,
                            "linear",
                            "${updownarrowCopy3}",
                            [18,8,18,0],
                            [0,8,35,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid687",
                            "scaleX",
                            7000,
                            313,
                            "linear",
                            "${Ellipse}",
                            '0.6',
                            '1'
                        ],
                        [
                            "eid681",
                            "scaleX",
                            12484,
                            393,
                            "linear",
                            "${Ellipse}",
                            '1',
                            '0.6'
                        ],
                        [
                            "eid635",
                            "opacity",
                            8377,
                            1000,
                            "linear",
                            "${gray_diamondCopy}",
                            '0',
                            '1'
                        ],
                        [
                            "eid695",
                            "display",
                            6250,
                            0,
                            "linear",
                            "${rightdown-arrow}",
                            'none',
                            'block'
                        ],
                        [
                            "eid603",
                            "opacity",
                            0,
                            1000,
                            "linear",
                            "${alexa}",
                            '0',
                            '1'
                        ],
                        [
                            "eid944",
                            "clip",
                            6869,
                            1000,
                            "easeOutQuad",
                            "${Rectangle4}",
                            [0,218,23,0],
                            [0,0,23,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid943",
                            "clip",
                            7883,
                            0,
                            "linear",
                            "${Rectangle4}",
                            [0,0,23,0],
                            [0,0,23,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid609",
                            "opacity",
                            8506,
                            1000,
                            "linear",
                            "${TextCopy22}",
                            '0',
                            '1'
                        ],
                        [
                            "eid591",
                            "opacity",
                            3500,
                            1000,
                            "linear",
                            "${round_gray_box}",
                            '0',
                            '1'
                        ],
                        [
                            "eid565",
                            "opacity",
                            500,
                            1000,
                            "linear",
                            "${gray_box}",
                            '0',
                            '1'
                        ],
                        [
                            "eid551",
                            "clip",
                            8134,
                            616,
                            "linear",
                            "${Rectangle7}",
                            [0,23,39,0],
                            [39,23,39,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid605",
                            "opacity",
                            7506,
                            1000,
                            "linear",
                            "${TextCopy21}",
                            '0',
                            '1'
                        ],
                        [
                            "eid663",
                            "opacity",
                            2500,
                            1000,
                            "linear",
                            "${round_boxCopy}",
                            '0',
                            '1'
                        ],
                        [
                            "eid506",
                            "clip",
                            5750,
                            750,
                            "linear",
                            "${updownarrowCopy2}",
                            [18,8,18,0],
                            [0,8,35,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid647",
                            "opacity",
                            5500,
                            1000,
                            "linear",
                            "${TextCopy14}",
                            '0',
                            '1'
                        ],
                        [
                            "eid643",
                            "opacity",
                            2500,
                            1500,
                            "linear",
                            "${Rectangle}",
                            '0',
                            '1'
                        ],
                        [
                            "eid597",
                            "opacity",
                            6000,
                            1000,
                            "linear",
                            "${TextCopy17}",
                            '0',
                            '1'
                        ],
                        [
                            "eid510",
                            "clip",
                            5750,
                            750,
                            "linear",
                            "${updownarrowCopy4}",
                            [18,8,18,0],
                            [0,8,35,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid613",
                            "opacity",
                            3000,
                            1000,
                            "linear",
                            "${TextCopy5}",
                            '0',
                            '1'
                        ],
                        [
                            "eid665",
                            "opacity",
                            2000,
                            1000,
                            "linear",
                            "${TextCopy7}",
                            '0',
                            '1'
                        ],
                        [
                            "eid627",
                            "opacity",
                            2000,
                            1000,
                            "linear",
                            "${TextCopy11}",
                            '0',
                            '1'
                        ],
                        [
                            "eid629",
                            "opacity",
                            0,
                            1000,
                            "linear",
                            "${blue_box}",
                            '0',
                            '1'
                        ],
                        [
                            "eid567",
                            "opacity",
                            1000,
                            1000,
                            "linear",
                            "${nokia_box}",
                            '0',
                            '1'
                        ],
                        [
                            "eid637",
                            "opacity",
                            7000,
                            1000,
                            "linear",
                            "${TextCopy20}",
                            '0',
                            '1'
                        ],
                        [
                            "eid563",
                            "opacity",
                            500,
                            1000,
                            "linear",
                            "${TextCopy}",
                            '0',
                            '1'
                        ],
                        [
                            "eid593",
                            "opacity",
                            6000,
                            1000,
                            "linear",
                            "${Rectangle2Copy4}",
                            '0',
                            '1'
                        ],
                        [
                            "eid522",
                            "clip",
                            5750,
                            750,
                            "linear",
                            "${updownarrowCopy5}",
                            [18,8,18,0],
                            [0,8,35,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid1083",
                            "clip",
                            6000,
                            869,
                            "linear",
                            "${Rectangle3}",
                            [0,22,112,0],
                            [112,22,112,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid595",
                            "opacity",
                            9756,
                            1000,
                            "linear",
                            "${Rectangle2Copy9}",
                            '0',
                            '1'
                        ],
                        [
                            "eid575",
                            "opacity",
                            1000,
                            1000,
                            "linear",
                            "${small-nokia}",
                            '0',
                            '1'
                        ]
                    ]
                }
            },
            "chatbot-chart_1": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            transform: [[], [], [], ['0.1', '0.1']],
                            rect: ['61px', '-212px', '890px', '1300px', 'auto', 'auto'],
                            display: 'none',
                            id: 'inquiry_arrow',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/inquiry%20arrow.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            display: 'none',
                            rect: ['466px', '390px', '356px', '38px', 'auto', 'auto'],
                            id: 'rightdown-arrow',
                            fill: ['rgba(0,0,0,0)', 'images/rightdown-arrow.svg', '0px', '0px']
                        },
                        {
                            type: 'rect',
                            rect: ['458px', '366px', '17px', '118px', 'auto', 'auto'],
                            display: 'none',
                            id: 'hidearrow1',
                            stroke: [2, 'rgb(18, 65, 145)', 'none'],
                            clip: 'rect(118px 17px 118px 0px)',
                            fill: ['rgba(255,255,255,1.00)']
                        },
                        {
                            transform: [[], ['-90'], [], ['1.23529', '0.98305']],
                            id: 'hidearrow1Copy',
                            stroke: [2, 'rgb(18, 65, 145)', 'none'],
                            rect: ['513px', '434px', '17px', '118px', 'auto', 'auto'],
                            display: 'none',
                            type: 'rect',
                            clip: 'rect(0px 17px 118px 0px)',
                            fill: ['rgba(255,255,255,1.00)']
                        },
                        {
                            transform: [[], [], [], ['1', '3.23762']],
                            id: 'Rectangle6',
                            stroke: [2, 'rgb(18, 65, 145)', 'none'],
                            rect: ['467px', '391px', '356px', '3px', 'auto', 'auto'],
                            display: 'none',
                            type: 'rect',
                            clip: 'rect(0px 356px 3.0299999713898px 356px)',
                            fill: ['rgba(255,255,255,1)']
                        },
                        {
                            type: 'rect',
                            rect: ['804px', '393px', '23px', '39px', 'auto', 'auto'],
                            display: 'none',
                            id: 'Rectangle7',
                            stroke: [2, 'rgb(18, 65, 145)', 'none'],
                            clip: 'rect(0px 23px 39px 0px)',
                            fill: ['rgba(255,255,255,1)']
                        },
                        {
                            type: 'image',
                            id: 'alexa',
                            opacity: '0',
                            rect: ['77px', '0px', '46px', '97px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/alexa.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'fb_phone',
                            opacity: '0',
                            rect: ['325px', '16px', '35px', '68px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/fb%20phone.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'mic_icon',
                            opacity: '0',
                            rect: ['795px', '21px', '65px', '65px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/mic%20icon.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'blue_box',
                            opacity: '0',
                            rect: ['0px', '49px', '200px', '89px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/blue%20box.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'gray_box',
                            opacity: '0',
                            rect: ['243px', '49px', '200px', '89px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/gray%20box.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'nokia_box',
                            opacity: '0',
                            rect: ['485px', '49px', '200px', '89px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/nokia%20box.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'small-nokia',
                            opacity: '0',
                            rect: ['546px', '45px', '84px', '14px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/small-nokia.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'mic_box',
                            opacity: '0',
                            rect: ['728px', '49px', '200px', '89px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/mic%20box.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'round_box',
                            opacity: '0',
                            rect: ['0px', '187px', '200px', '83px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/round%20box.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'round_boxCopy',
                            opacity: '0',
                            rect: ['243px', '186px', '200px', '83px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/round%20box.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'round_boxCopy2',
                            opacity: '0',
                            rect: ['488px', '186px', '200px', '83px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/round%20box.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'round_gray_box',
                            opacity: '0',
                            rect: ['728px', '186px', '200px', '83px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/round%20gray%20box.svg', '0px', '0px']
                        },
                        {
                            rect: ['0px', '210px', '684px', '32px', 'auto', 'auto'],
                            opacity: '0',
                            id: 'Rectangle',
                            stroke: [2, 'rgba(18,65,145,1.00)', 'solid'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,1.00)']
                        },
                        {
                            rect: ['728px', '210px', '196px', '32px', 'auto', 'auto'],
                            opacity: '0',
                            id: 'RectangleCopy',
                            stroke: [2, 'rgba(190,200,210,1.00)', 'solid'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,1.00)']
                        },
                        {
                            rect: ['0px', '317px', '196px', '52px', 'auto', 'auto'],
                            opacity: '0',
                            id: 'Rectangle2',
                            stroke: [2, 'rgb(190, 200, 210)', 'none'],
                            type: 'rect',
                            fill: ['rgba(0,201,255,1.00)']
                        },
                        {
                            rect: ['0px', '637px', '253px', '52px', 'auto', 'auto'],
                            opacity: '0',
                            id: 'Rectangle2Copy8',
                            stroke: [2, 'rgb(190, 200, 210)', 'none'],
                            type: 'rect',
                            fill: ['rgba(190,200,210,1.00)']
                        },
                        {
                            rect: ['280px', '637px', '253px', '52px', 'auto', 'auto'],
                            opacity: '0',
                            id: 'Rectangle2Copy9',
                            stroke: [2, 'rgb(190, 200, 210)', 'none'],
                            type: 'rect',
                            fill: ['rgba(18,65,145,1.00)']
                        },
                        {
                            rect: ['561px', '637px', '166px', '52px', 'auto', 'auto'],
                            opacity: '0',
                            id: 'Rectangle2Copy10',
                            stroke: [2, 'rgb(190, 200, 210)', 'none'],
                            type: 'rect',
                            fill: ['rgba(190,200,210,1.00)']
                        },
                        {
                            rect: ['243px', '317px', '445px', '52px', 'auto', 'auto'],
                            opacity: '0',
                            id: 'Rectangle2Copy',
                            stroke: [2, 'rgb(190, 200, 210)', 'none'],
                            type: 'rect',
                            fill: ['rgba(18,65,145,1.00)']
                        },
                        {
                            rect: ['728px', '317px', '200px', '52px', 'auto', 'auto'],
                            opacity: '0',
                            id: 'Rectangle2Copy3',
                            stroke: [2, 'rgb(190, 200, 210)', 'none'],
                            type: 'rect',
                            fill: ['rgba(190,200,210,1.00)']
                        },
                        {
                            rect: ['0px', '413px', '200px', '52px', 'auto', 'auto'],
                            borderRadius: ['22px', '22px', '0px 0px', '0px 0px'],
                            opacity: '0',
                            id: 'Rectangle2Copy4',
                            stroke: [2, 'rgb(190, 200, 210)', 'none'],
                            type: 'rect',
                            fill: ['rgba(18,65,145,1.00)']
                        },
                        {
                            rect: ['488px', '413px', '200px', '52px', 'auto', 'auto'],
                            borderRadius: ['22px', '22px', '0px 0px', '0px 0px'],
                            opacity: '0',
                            id: 'Rectangle2Copy6',
                            stroke: [2, 'rgb(190, 200, 210)', 'none'],
                            type: 'rect',
                            fill: ['rgba(18,65,145,1.00)']
                        },
                        {
                            rect: ['244px', '413px', '200px', '52px', 'auto', 'auto'],
                            borderRadius: ['0px', '0px 0px', '0px 0px', '0px 0px'],
                            opacity: '0',
                            id: 'Rectangle2Copy5',
                            stroke: [2, 'rgb(190, 200, 210)', 'none'],
                            type: 'rect',
                            fill: ['rgba(18,65,145,1.00)']
                        },
                        {
                            rect: ['727px', '438px', '200px', '32px', 'auto', 'auto'],
                            borderRadius: ['0px', '0px 0px', '0px 0px', '0px 0px'],
                            opacity: '0',
                            id: 'Rectangle2Copy7',
                            stroke: [2, 'rgba(18,65,145,1.00)', 'solid'],
                            type: 'rect',
                            fill: ['rgba(18,65,145,0.00)']
                        },
                        {
                            type: 'image',
                            id: 'diamond',
                            opacity: '0',
                            rect: ['211px', '508px', '112px', '77px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/gray%20diamond.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'gray_diamond',
                            opacity: '0',
                            rect: ['350px', '508px', '112px', '77px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/gray%20diamond.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'gray_diamondCopy',
                            opacity: '0',
                            rect: ['490px', '508px', '112px', '77px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/diamond.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'gray_diamondCopy2',
                            opacity: '0',
                            rect: ['629px', '508px', '112px', '77px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/gray%20diamond.svg', '0px', '0px']
                        },
                        {
                            rect: ['96px', '145px', '8px', '35px', 'auto', 'auto'],
                            transform: [[], [], [], ['0.99995']],
                            id: 'updownarrow',
                            type: 'image',
                            clip: 'rect(18px 8px 18px 0px)',
                            fill: ['rgba(0,0,0,0)', 'images/updownarrow.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'updownarrowCopy',
                            rect: ['339px', '145px', '8px', '35px', 'auto', 'auto'],
                            clip: 'rect(18px 8px 18px 0px)',
                            fill: ['rgba(0,0,0,0)', 'images/updownarrow.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'updownarrowCopy2',
                            rect: ['584px', '145px', '8px', '35px', 'auto', 'auto'],
                            clip: 'rect(18px 8px 18px 0px)',
                            fill: ['rgba(0,0,0,0)', 'images/updownarrow.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'updownarrowCopy3',
                            rect: ['825px', '145px', '8px', '35px', 'auto', 'auto'],
                            clip: 'rect(18px 8px 18px 0px)',
                            fill: ['rgba(0,0,0,0)', 'images/updownarrow.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'updownarrowCopy7',
                            rect: ['96px', '274px', '8px', '35px', 'auto', 'auto'],
                            clip: 'rect(18px 8px 18px 0px)',
                            fill: ['rgba(0,0,0,0)', 'images/updownarrow.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'updownarrowCopy6',
                            rect: ['339px', '274px', '8px', '35px', 'auto', 'auto'],
                            clip: 'rect(18px 8px 18px 0px)',
                            fill: ['rgba(0,0,0,0)', 'images/updownarrow.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'updownarrowCopy5',
                            rect: ['584px', '274px', '8px', '35px', 'auto', 'auto'],
                            clip: 'rect(18px 8px 18px 0px)',
                            fill: ['rgba(0,0,0,0)', 'images/updownarrow.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'updownarrowCopy4',
                            rect: ['825px', '274px', '8px', '35px', 'auto', 'auto'],
                            clip: 'rect(18px 8px 18px 0px)',
                            fill: ['rgba(0,0,0,0)', 'images/updownarrow.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'updownarrowCopy11',
                            rect: ['96px', '373px', '8px', '35px', 'auto', 'auto'],
                            clip: 'rect(18px 8px 18px 0px)',
                            fill: ['rgba(0,0,0,0)', 'images/updownarrow.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'updownarrowCopy10',
                            rect: ['339px', '373px', '8px', '35px', 'auto', 'auto'],
                            clip: 'rect(18px 8px 18px 0px)',
                            fill: ['rgba(0,0,0,0)', 'images/updownarrow.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'updownarrowCopy9',
                            rect: ['584px', '373px', '8px', '35px', 'auto', 'auto'],
                            clip: 'rect(18px 8px 18px 0px)',
                            fill: ['rgba(0,0,0,0)', 'images/updownarrow.svg', '0px', '0px']
                        },
                        {
                            rect: ['0px', '438px', '684px', '32px', 'auto', 'auto'],
                            opacity: '0',
                            id: 'RectangleCopy2',
                            stroke: [2, 'rgba(18,65,145,1.00)', 'solid'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,1.00)']
                        },
                        {
                            rect: ['56px', '114px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            id: 'Text',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\">​<span style=\"color: rgb(255, 255, 255); font-size: 14px;\">Amazon Alexa</span></p>',
                            type: 'text'
                        },
                        {
                            rect: ['44px', '335px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            id: 'TextCopy12',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\">​<span style=\"color: rgb(255, 255, 255); font-size: 14px;\">ML Engine (NLU)</span></p>',
                            type: 'text'
                        },
                        {
                            rect: ['414px', '335px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(255,255,255,1.00)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            id: 'TextCopy13',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\">Workflow Engine</p>',
                            type: 'text'
                        },
                        {
                            rect: ['776px', '335px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(255,255,255,1.00)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            id: 'TextCopy14',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\">Knowledge Engine</p>',
                            type: 'text'
                        },
                        {
                            rect: ['783px', '448px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(18,65,145,1.00)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            id: 'TextCopy18',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\">Contact Center</p>',
                            type: 'text'
                        },
                        {
                            rect: ['298px', '114px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            id: 'TextCopy',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\">​<span style=\"color: rgb(255, 255, 255); font-size: 14px;\">FB Messenger</span></p>',
                            type: 'text'
                        },
                        {
                            rect: ['556px', '114px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            id: 'TextCopy2',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\">​<span style=\"color: rgb(255, 255, 255); font-size: 14px;\">Nokia IMS</span></p>',
                            type: 'text'
                        },
                        {
                            rect: ['810px', '114px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(255,255,255,1.00)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            id: 'TextCopy3',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\">Other</p>',
                            type: 'text'
                        },
                        {
                            rect: ['73px', '190px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            id: 'TextCopy7',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\">​<span style=\"color: rgb(255, 255, 255); font-size: 14px;\">Plug - In</span></p>',
                            type: 'text'
                        },
                        {
                            rect: ['317px', '190px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            id: 'TextCopy6',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\"><span style=\"color: rgb(255, 255, 255);\">Plug - In</span></p>',
                            type: 'text'
                        },
                        {
                            rect: ['561px', '190px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            id: 'TextCopy5',
                            opacity: '0',
                            text: '<p style=\"margin: 0px; font-family: Arial, Helvetica, sans-serif; font-weight: 400; font-style: normal; text-decoration: none; font-size: 14px; color: rgb(255, 255, 255); background-color: rgba(0, 0, 0, 0); letter-spacing: 0px; text-transform: none; word-spacing: 0px; text-align: start; text-indent: 0px; line-height: normal;\">Plug - In</p>',
                            type: 'text'
                        },
                        {
                            rect: ['805px', '190px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            id: 'TextCopy4',
                            opacity: '0',
                            text: '<p style=\"margin: 0px; font-family: Arial, Helvetica, sans-serif; font-weight: 400; font-style: normal; text-decoration: none; font-size: 14px; color: rgb(255, 255, 255); background-color: rgba(0, 0, 0, 0); letter-spacing: 0px; text-transform: none; word-spacing: 0px; text-align: start; text-indent: 0px; line-height: normal;\">Plug - In</p>',
                            type: 'text'
                        },
                        {
                            rect: ['73px', '249px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            id: 'TextCopy11',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\">​<span style=\"color: rgb(255, 255, 255); font-size: 14px;\">Plug - In</span></p>',
                            type: 'text'
                        },
                        {
                            rect: ['317px', '249px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            id: 'TextCopy10',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\"><span style=\"color: rgb(255, 255, 255);\">Plug - In</span></p>',
                            type: 'text'
                        },
                        {
                            rect: ['561px', '249px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            id: 'TextCopy9',
                            opacity: '0',
                            text: '<p style=\"margin: 0px; font-family: Arial, Helvetica, sans-serif; font-weight: 400; font-style: normal; text-decoration: none; font-size: 14px; color: rgb(255, 255, 255); background-color: rgba(0, 0, 0, 0); letter-spacing: 0px; text-transform: none; word-spacing: 0px; text-align: start; text-indent: 0px; line-height: normal;\">Plug - In</p>',
                            type: 'text'
                        },
                        {
                            rect: ['73px', '417px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            id: 'TextCopy17',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\">​<span style=\"color: rgb(255, 255, 255); font-size: 14px;\">Plug - In</span></p>',
                            type: 'text'
                        },
                        {
                            rect: ['237px', '530px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            id: 'TextCopy20',
                            opacity: '0',
                            text: '<p style=\"margin: 0px; text-align: center;\">​<span style=\"color: rgb(255, 255, 255); font-size: 14px;\">Provision</span></p><p style=\"margin: 0px; text-align: center;\"><span style=\"color: rgb(255, 255, 255); font-size: 14px;\">​Devices</span></p>',
                            type: 'text'
                        },
                        {
                            rect: ['34px', '654px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [15, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            id: 'TextCopy24',
                            opacity: '0',
                            text: '<p style=\"margin: 0px; text-align: center;\">​<font color=\"#ffffff\">Connected Device Platform</font></p>',
                            type: 'text'
                        },
                        {
                            rect: ['378px', '654px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [15, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            id: 'TextCopy25',
                            opacity: '0',
                            text: '<p style=\"margin: 0px; text-align: center;\">​<font color=\"#ffffff\">Analytics</font></p>',
                            type: 'text'
                        },
                        {
                            rect: ['611px', '654px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [15, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            id: 'TextCopy26',
                            opacity: '0',
                            text: '<p style=\"margin: 0px; text-align: center;\">​<font color=\"#ffffff\">OSS/BSS</font></p>',
                            type: 'text'
                        },
                        {
                            rect: ['380px', '530px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(255,255,255,1.00)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            id: 'TextCopy21',
                            opacity: '0',
                            text: '<p style=\"margin: 0px; text-align: center;\">Trouble</p><p style=\"margin: 0px; text-align: center;\">​Shoot</p>',
                            type: 'text'
                        },
                        {
                            rect: ['526px', '538px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            id: 'TextCopy23',
                            opacity: '0',
                            text: '<p style=\"margin: 0px; text-align: center;\">​<font color=\"#ffffff\">Inquiry</font></p>',
                            type: 'text'
                        },
                        {
                            rect: ['678px', '538px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(255,255,255,1.00)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            id: 'TextCopy22',
                            opacity: '0',
                            text: '<p style=\"margin: 0px; text-align: center;\">...</p>',
                            type: 'text'
                        },
                        {
                            rect: ['313px', '417px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            id: 'TextCopy16',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\"><span style=\"color: rgb(255, 255, 255);\">WF Builder</span></p>',
                            type: 'text'
                        },
                        {
                            rect: ['307px', '448px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            id: 'TextCopy19',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\"><span style=\"color: rgb(18, 65, 145);\">Bot Builder</span></p>',
                            type: 'text'
                        },
                        {
                            rect: ['253px', '220px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            id: 'TextCopy27',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\"><span style=\"color: rgb(18, 65, 145);\">Interaction Engine (Dialogue)</span></p>',
                            type: 'text'
                        },
                        {
                            rect: ['561px', '417px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            id: 'TextCopy15',
                            opacity: '0',
                            text: '<p style=\"margin: 0px; font-family: Arial, Helvetica, sans-serif; font-weight: 400; font-style: normal; text-decoration: none; font-size: 14px; color: rgb(255, 255, 255); background-color: rgba(0, 0, 0, 0); letter-spacing: 0px; text-transform: none; word-spacing: 0px; text-align: start; text-indent: 0px; line-height: normal;\">Plug - In</p>',
                            type: 'text'
                        },
                        {
                            rect: ['805px', '249px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [14, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            id: 'TextCopy8',
                            opacity: '0',
                            text: '<p style=\"margin: 0px; font-family: Arial, Helvetica, sans-serif; font-weight: 400; font-style: normal; text-decoration: none; font-size: 14px; color: rgb(255, 255, 255); background-color: rgba(0, 0, 0, 0); letter-spacing: 0px; text-transform: none; word-spacing: 0px; text-align: start; text-indent: 0px; line-height: normal;\">Plug - In</p>',
                            type: 'text'
                        },
                        {
                            type: 'ellipse',
                            borderRadius: ['50%', '50%', '50%', '50%'],
                            id: 'Ellipse',
                            opacity: '0',
                            rect: ['82px', '112px', '36px', '36px', 'auto', 'auto'],
                            transform: [[], [], [], ['0.6', '0.6']],
                            stroke: [2, 'rgb(190, 200, 210)', 'none'],
                            fill: ['rgba(0,201,255,1.00)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '931px', '689px']
                        }
                    }
                },
                timeline: {
                    duration: 12877,
                    autoPlay: true,
                    data: [
                        [
                            "eid661",
                            "opacity",
                            3000,
                            1000,
                            "linear",
                            "${TextCopy9}",
                            '0',
                            '1'
                        ],
                        [
                            "eid619",
                            "opacity",
                            5500,
                            1000,
                            "linear",
                            "${Rectangle2Copy3}",
                            '0',
                            '1'
                        ],
                        [
                            "eid673",
                            "opacity",
                            4500,
                            1000,
                            "linear",
                            "${TextCopy12}",
                            '0',
                            '1'
                        ],
                        [
                            "eid641",
                            "opacity",
                            8000,
                            1000,
                            "linear",
                            "${TextCopy18}",
                            '0',
                            '1'
                        ],
                        [
                            "eid565",
                            "opacity",
                            500,
                            1000,
                            "linear",
                            "${gray_box}",
                            '0',
                            '1'
                        ],
                        [
                            "eid631",
                            "opacity",
                            10256,
                            1000,
                            "linear",
                            "${TextCopy25}",
                            '0',
                            '1'
                        ],
                        [
                            "eid633",
                            "opacity",
                            10750,
                            1000,
                            "linear",
                            "${TextCopy26}",
                            '0',
                            '1'
                        ],
                        [
                            "eid629",
                            "opacity",
                            0,
                            1000,
                            "linear",
                            "${blue_box}",
                            '0',
                            '1'
                        ],
                        [
                            "eid611",
                            "opacity",
                            4500,
                            1000,
                            "linear",
                            "${Rectangle2}",
                            '0',
                            '1'
                        ],
                        [
                            "eid520",
                            "clip",
                            5750,
                            750,
                            "linear",
                            "${updownarrowCopy11}",
                            [18,8,18,0],
                            [0,8,35,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid621",
                            "opacity",
                            9250,
                            1000,
                            "linear",
                            "${Rectangle2Copy8}",
                            '0',
                            '1'
                        ],
                        [
                            "eid639",
                            "opacity",
                            6500,
                            1000,
                            "linear",
                            "${Rectangle2Copy7}",
                            '0',
                            '1'
                        ],
                        [
                            "eid699",
                            "display",
                            6000,
                            0,
                            "linear",
                            "${Rectangle7}",
                            'none',
                            'block'
                        ],
                        [
                            "eid569",
                            "opacity",
                            1000,
                            1000,
                            "linear",
                            "${TextCopy2}",
                            '0',
                            '1'
                        ],
                        [
                            "eid635",
                            "opacity",
                            8377,
                            1000,
                            "linear",
                            "${gray_diamondCopy}",
                            '0',
                            '1'
                        ],
                        [
                            "eid653",
                            "opacity",
                            2500,
                            1000,
                            "linear",
                            "${TextCopy10}",
                            '0',
                            '1'
                        ],
                        [
                            "eid706",
                            "clip",
                            6000,
                            1000,
                            "linear",
                            "${hidearrow1}",
                            [0,17,118,0],
                            [118,17,118,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid559",
                            "opacity",
                            500,
                            1000,
                            "linear",
                            "${fb_phone}",
                            '0',
                            '1'
                        ],
                        [
                            "eid573",
                            "opacity",
                            1500,
                            1000,
                            "linear",
                            "${TextCopy3}",
                            '0',
                            '1'
                        ],
                        [
                            "eid516",
                            "clip",
                            5750,
                            750,
                            "linear",
                            "${updownarrowCopy6}",
                            [18,8,18,0],
                            [0,8,35,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid655",
                            "opacity",
                            0,
                            1000,
                            "linear",
                            "${Text}",
                            '0',
                            '1'
                        ],
                        [
                            "eid577",
                            "opacity",
                            3500,
                            1000,
                            "linear",
                            "${TextCopy27}",
                            '0',
                            '1'
                        ],
                        [
                            "eid676",
                            "location",
                            7000,
                            5877,
                            "linear",
                            "${Ellipse}",
                            [[100, 130.02, 0, 0, 0, 0,0],[100.76, 228.33, 0, 0, 0, 0,98.31],[343.29, 227.77, 0, 0, 0, 0,340.84],[344.45, 343.14, 0, 0, 0, 0,456.22],[466.19, 342.44, 0, 0, 0, 0,577.96],[466.11, 486.54, 0, 0, 0, 0,722.06],[546.73, 487.45, 0, 0, 0, 0,802.69],[546.68, 542.22, 0, 0, 0, 0,857.46]]
                        ],
                        [
                            "eid617",
                            "opacity",
                            7000,
                            1500,
                            "linear",
                            "${RectangleCopy2}",
                            '0',
                            '1'
                        ],
                        [
                            "eid669",
                            "opacity",
                            5000,
                            1000,
                            "linear",
                            "${Rectangle2Copy}",
                            '0',
                            '1'
                        ],
                        [
                            "eid512",
                            "clip",
                            5750,
                            750,
                            "linear",
                            "${updownarrowCopy9}",
                            [18,8,18,0],
                            [0,8,35,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid581",
                            "opacity",
                            8000,
                            1000,
                            "linear",
                            "${TextCopy23}",
                            '0',
                            '1'
                        ],
                        [
                            "eid561",
                            "opacity",
                            1500,
                            1000,
                            "linear",
                            "${mic_icon}",
                            '0',
                            '1'
                        ],
                        [
                            "eid502",
                            "clip",
                            5750,
                            750,
                            "linear",
                            "${updownarrowCopy}",
                            [18,8,18,0],
                            [0,8,35,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid625",
                            "opacity",
                            8883,
                            1000,
                            "linear",
                            "${gray_diamondCopy2}",
                            '0',
                            '1'
                        ],
                        [
                            "eid659",
                            "opacity",
                            2000,
                            1000,
                            "linear",
                            "${round_box}",
                            '0',
                            '1'
                        ],
                        [
                            "eid651",
                            "opacity",
                            3500,
                            1000,
                            "linear",
                            "${TextCopy8}",
                            '0',
                            '1'
                        ],
                        [
                            "eid686",
                            "opacity",
                            7000,
                            313,
                            "linear",
                            "${Ellipse}",
                            '0',
                            '1'
                        ],
                        [
                            "eid685",
                            "opacity",
                            12484,
                            393,
                            "linear",
                            "${Ellipse}",
                            '1',
                            '0'
                        ],
                        [
                            "eid585",
                            "opacity",
                            5000,
                            1000,
                            "linear",
                            "${TextCopy13}",
                            '0',
                            '1'
                        ],
                        [
                            "eid657",
                            "opacity",
                            3500,
                            1000,
                            "linear",
                            "${TextCopy4}",
                            '0',
                            '1'
                        ],
                        [
                            "eid1103",
                            "rotateZ",
                            7000,
                            0,
                            "linear",
                            "${hidearrow1Copy}",
                            '-90deg',
                            '-90deg'
                        ],
                        [
                            "eid645",
                            "opacity",
                            7000,
                            1000,
                            "linear",
                            "${TextCopy15}",
                            '0',
                            '1'
                        ],
                        [
                            "eid583",
                            "opacity",
                            7377,
                            1000,
                            "linear",
                            "${diamond}",
                            '0',
                            '1'
                        ],
                        [
                            "eid946",
                            "background-color",
                            12250,
                            0,
                            "easeOutQuad",
                            "${Rectangle2Copy8}",
                            'rgba(190,200,210,1.00)',
                            'rgba(190,200,210,1.00)'
                        ],
                        [
                            "eid607",
                            "opacity",
                            7883,
                            1000,
                            "linear",
                            "${gray_diamond}",
                            '0',
                            '1'
                        ],
                        [
                            "eid615",
                            "opacity",
                            6500,
                            1000,
                            "linear",
                            "${TextCopy16}",
                            '0',
                            '1'
                        ],
                        [
                            "eid603",
                            "opacity",
                            0,
                            1000,
                            "linear",
                            "${alexa}",
                            '0',
                            '1'
                        ],
                        [
                            "eid504",
                            "clip",
                            5750,
                            750,
                            "linear",
                            "${updownarrow}",
                            [18,8,18,0],
                            [0,8,35,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid671",
                            "opacity",
                            3500,
                            1000,
                            "linear",
                            "${RectangleCopy}",
                            '0',
                            '1'
                        ],
                        [
                            "eid557",
                            "clip",
                            6250,
                            2000,
                            "linear",
                            "${Rectangle6}",
                            [0,356,3.0299999713897705,0],
                            [0,356,3.0299999713898,356],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid563",
                            "opacity",
                            500,
                            1000,
                            "linear",
                            "${TextCopy}",
                            '0',
                            '1'
                        ],
                        [
                            "eid688",
                            "scaleY",
                            7000,
                            313,
                            "linear",
                            "${Ellipse}",
                            '0.6',
                            '1'
                        ],
                        [
                            "eid682",
                            "scaleY",
                            12484,
                            393,
                            "linear",
                            "${Ellipse}",
                            '1',
                            '0.6'
                        ],
                        [
                            "eid599",
                            "opacity",
                            2500,
                            1000,
                            "linear",
                            "${TextCopy6}",
                            '0',
                            '1'
                        ],
                        [
                            "eid579",
                            "opacity",
                            7500,
                            1000,
                            "linear",
                            "${TextCopy19}",
                            '0',
                            '1'
                        ],
                        [
                            "eid601",
                            "opacity",
                            10250,
                            1000,
                            "linear",
                            "${Rectangle2Copy10}",
                            '0',
                            '1'
                        ],
                        [
                            "eid593",
                            "opacity",
                            6000,
                            1000,
                            "linear",
                            "${Rectangle2Copy4}",
                            '0',
                            '1'
                        ],
                        [
                            "eid522",
                            "clip",
                            5750,
                            750,
                            "linear",
                            "${updownarrowCopy5}",
                            [18,8,18,0],
                            [0,8,35,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid587",
                            "opacity",
                            3000,
                            1000,
                            "linear",
                            "${round_boxCopy2}",
                            '0',
                            '1'
                        ],
                        [
                            "eid695",
                            "display",
                            6250,
                            0,
                            "linear",
                            "${rightdown-arrow}",
                            'none',
                            'block'
                        ],
                        [
                            "eid518",
                            "clip",
                            5750,
                            750,
                            "linear",
                            "${updownarrowCopy7}",
                            [18,8,18,0],
                            [0,8,35,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid589",
                            "opacity",
                            6500,
                            1000,
                            "linear",
                            "${Rectangle2Copy5}",
                            '0',
                            '1'
                        ],
                        [
                            "eid1106",
                            "display",
                            6000,
                            0,
                            "linear",
                            "${hidearrow1}",
                            'none',
                            'block'
                        ],
                        [
                            "eid627",
                            "opacity",
                            2000,
                            1000,
                            "linear",
                            "${TextCopy11}",
                            '0',
                            '1'
                        ],
                        [
                            "eid591",
                            "opacity",
                            3500,
                            1000,
                            "linear",
                            "${round_gray_box}",
                            '0',
                            '1'
                        ],
                        [
                            "eid514",
                            "clip",
                            5750,
                            750,
                            "linear",
                            "${updownarrowCopy10}",
                            [18,8,18,0],
                            [0,8,35,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid649",
                            "opacity",
                            7000,
                            1000,
                            "linear",
                            "${Rectangle2Copy6}",
                            '0',
                            '1'
                        ],
                        [
                            "eid613",
                            "opacity",
                            3000,
                            1000,
                            "linear",
                            "${TextCopy5}",
                            '0',
                            '1'
                        ],
                        [
                            "eid609",
                            "opacity",
                            8506,
                            1000,
                            "linear",
                            "${TextCopy22}",
                            '0',
                            '1'
                        ],
                        [
                            "eid597",
                            "opacity",
                            6000,
                            1000,
                            "linear",
                            "${TextCopy17}",
                            '0',
                            '1'
                        ],
                        [
                            "eid643",
                            "opacity",
                            2500,
                            1500,
                            "linear",
                            "${Rectangle}",
                            '0',
                            '1'
                        ],
                        [
                            "eid700",
                            "display",
                            6000,
                            0,
                            "linear",
                            "${Rectangle6}",
                            'none',
                            'block'
                        ],
                        [
                            "eid605",
                            "opacity",
                            7506,
                            1000,
                            "linear",
                            "${TextCopy21}",
                            '0',
                            '1'
                        ],
                        [
                            "eid506",
                            "clip",
                            5750,
                            750,
                            "linear",
                            "${updownarrowCopy2}",
                            [18,8,18,0],
                            [0,8,35,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid647",
                            "opacity",
                            5500,
                            1000,
                            "linear",
                            "${TextCopy14}",
                            '0',
                            '1'
                        ],
                        [
                            "eid663",
                            "opacity",
                            2500,
                            1000,
                            "linear",
                            "${round_boxCopy}",
                            '0',
                            '1'
                        ],
                        [
                            "eid571",
                            "opacity",
                            1500,
                            1000,
                            "linear",
                            "${mic_box}",
                            '0',
                            '1'
                        ],
                        [
                            "eid510",
                            "clip",
                            5750,
                            750,
                            "linear",
                            "${updownarrowCopy4}",
                            [18,8,18,0],
                            [0,8,35,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid551",
                            "clip",
                            8134,
                            616,
                            "linear",
                            "${Rectangle7}",
                            [0,23,39,0],
                            [39,23,39,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid665",
                            "opacity",
                            2000,
                            1000,
                            "linear",
                            "${TextCopy7}",
                            '0',
                            '1'
                        ],
                        [
                            "eid1087",
                            "clip",
                            7000,
                            1000,
                            "linear",
                            "${hidearrow1Copy}",
                            [0,17,118,0],
                            [118,17,118,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid567",
                            "opacity",
                            1000,
                            1000,
                            "linear",
                            "${nokia_box}",
                            '0',
                            '1'
                        ],
                        [
                            "eid931",
                            "display",
                            6000,
                            0,
                            "linear",
                            "${inquiry_arrow}",
                            'none',
                            'block'
                        ],
                        [
                            "eid637",
                            "opacity",
                            7000,
                            1000,
                            "linear",
                            "${TextCopy20}",
                            '0',
                            '1'
                        ],
                        [
                            "eid623",
                            "opacity",
                            9750,
                            1000,
                            "linear",
                            "${TextCopy24}",
                            '0',
                            '1'
                        ],
                        [
                            "eid687",
                            "scaleX",
                            7000,
                            313,
                            "linear",
                            "${Ellipse}",
                            '0.6',
                            '1'
                        ],
                        [
                            "eid681",
                            "scaleX",
                            12484,
                            393,
                            "linear",
                            "${Ellipse}",
                            '1',
                            '0.6'
                        ],
                        [
                            "eid575",
                            "opacity",
                            1000,
                            1000,
                            "linear",
                            "${small-nokia}",
                            '0',
                            '1'
                        ],
                        [
                            "eid508",
                            "clip",
                            5750,
                            750,
                            "linear",
                            "${updownarrowCopy3}",
                            [18,8,18,0],
                            [0,8,35,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid595",
                            "opacity",
                            9756,
                            1000,
                            "linear",
                            "${Rectangle2Copy9}",
                            '0',
                            '1'
                        ],
                        [
                            "eid1105",
                            "display",
                            6000,
                            0,
                            "linear",
                            "${hidearrow1Copy}",
                            'none',
                            'block'
                        ]
                    ]
                }
            }
        };

    AdobeEdge.registerCompositionDefn(compId, symbols, fonts, scripts, resources, opts);

    if (!window.edge_authoring_mode) AdobeEdge.getComposition(compId).load("scene1-part2_edgeActions.js");


})("scene1-part2");
