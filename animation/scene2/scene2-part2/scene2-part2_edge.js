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
                            id: 'chatbot-chart',
                            symbolName: 'chatbot-chart',
                            type: 'rect',
                            rect: ['-1059px', '162', '931', '689', 'auto', 'auto']
                        },
                        {
                            id: 'config-vowifi-screens',
                            symbolName: 'config-vowifi-screens',
                            type: 'rect',
                            rect: ['400px', '123px', '1120', '862', 'auto', 'auto'],
                            opacity: '0'
                        },
                        {
                            id: 'Text3',
                            type: 'text',
                            rect: ['1206px', '215px', 'auto', 'auto', 'auto', 'auto'],
                            opacity: '0',
                            text: "<p style=\"margin: 0px;\">​SMP workflow to automate the settings and configuration</p><p style=\"margin: 0px;\">of the mobile device with the CDP (Apple) Entitlement Server.</p>",
                            align: "center",
                            font: ['Arial, Helvetica, sans-serif', [22, "px"], "rgba(18,65,145,1)", "400", "none", "normal", "break-word", "nowrap"],
                            textStyle: ["", "", "", "", "none"]
                        },
                        {
                            id: 'btn-zoom',
                            display: 'block',
                            type: 'rect',
                            rect: ['1392px', '720px', '232px', '111px', 'auto', 'auto'],
                            cursor: 'pointer',
                            opacity: '0',
                            fill: ["rgba(255,255,255,1)"],
                            stroke: [2,"rgb(18, 65, 145)","none"]
                        },
                        {
                            id: 'btn-zoombigger',
                            display: 'none',
                            type: 'rect',
                            rect: ['786px', '812px', '232px', '111px', 'auto', 'auto'],
                            cursor: 'pointer',
                            opacity: '0',
                            fill: ["rgba(255,255,255,1)"],
                            stroke: [2,"rgb(18, 65, 145)","none"]
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
                    duration: 15250,
                    autoPlay: true,
                    data: [
                        [
                            "eid791",
                            "top",
                            13750,
                            1500,
                            "easeInOutCubic",
                            "${btn-zoombigger}",
                            '832px',
                            '812px'
                        ],
                        [
                            "eid779",
                            "scaleX",
                            13750,
                            1500,
                            "easeInOutCubic",
                            "${config-vowifi-screens}",
                            '0.6',
                            '1'
                        ],
                        [
                            "eid788",
                            "display",
                            13000,
                            0,
                            "easeInOutCubic",
                            "${btn-zoom}",
                            'block',
                            'none'
                        ],
                        [
                            "eid781",
                            "scaleY",
                            13750,
                            1500,
                            "easeInOutCubic",
                            "${config-vowifi-screens}",
                            '0.6',
                            '1'
                        ],
                        [
                            "eid793",
                            "width",
                            13750,
                            1500,
                            "easeInOutCubic",
                            "${btn-zoombigger}",
                            '232px',
                            '348px'
                        ],
                        [
                            "eid769",
                            "opacity",
                            10000,
                            1500,
                            "easeInOutCubic",
                            "${config-vowifi-screens}",
                            '0',
                            '1'
                        ],
                        [
                            "eid792",
                            "height",
                            13750,
                            1500,
                            "easeInOutCubic",
                            "${btn-zoombigger}",
                            '111px',
                            '167px'
                        ],
                        [
                            "eid789",
                            "display",
                            15250,
                            0,
                            "easeInOutCubic",
                            "${btn-zoombigger}",
                            'none',
                            'block'
                        ],
                        [
                            "eid772",
                            "left",
                            13750,
                            1500,
                            "easeInOutCubic",
                            "${chatbot-chart}",
                            '125px',
                            '-1059px'
                        ],
                        [
                            "eid790",
                            "left",
                            13750,
                            1500,
                            "easeInOutCubic",
                            "${btn-zoombigger}",
                            '830px',
                            '786px'
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
                            "eid783",
                            "opacity",
                            12877,
                            1500,
                            "easeInOutCubic",
                            "${Text3}",
                            '1',
                            '0'
                        ],
                        [
                            "eid780",
                            "left",
                            13750,
                            1500,
                            "easeInOutCubic",
                            "${config-vowifi-screens}",
                            '940px',
                            '400px'
                        ],
                            [ "eid745", "trigger", 0, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${config-vowifi-screens}', [] ] ]
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
                            id: 'network-circle',
                            rect: ['-590px', '228px', '1053px', '1043px', 'auto', 'auto'],
                            transform: [[], [], [], ['1.9', '1.9']],
                            fill: ['rgba(0,0,0,0)', 'images/network-circle.svg', '0px', '0px']
                        },
                        {
                            rect: ['331px', '219px', '385px', '181px', 'auto', 'auto'],
                            type: 'rect',
                            id: 'Rectangle9',
                            stroke: [0, 'rgb(18, 65, 145)', 'solid'],
                            clip: 'rect(0px 0px 181px 0px)',
                            fill: ['rgba(18,65,145,1.00)']
                        },
                        {
                            type: 'text',
                            id: 'Text10',
                            textStyle: ['', '', '', '', 'none'],
                            rect: ['410px', '264px', 'auto', 'auto', 'auto', 'auto'],
                            align: 'left',
                            font: ['Arial, Helvetica, sans-serif', [24, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap'],
                            opacity: '0',
                            text: '<p style=\"margin: 0px; text-align: center;\">​<span style=\"color: rgb(255, 255, 255); font-size: 40px;\">Recommend</span></p><p style=\"margin: 0px; text-align: center;\"><span style=\"color: rgb(255, 255, 255); font-size: 40px;\">VoWi-Fi</span></p>'
                        },
                        {
                            type: 'rect',
                            id: 'Rectangle7',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            rect: ['-229px', '622px', '273px', '10px', 'auto', 'auto'],
                            display: 'none',
                            transform: [[], ['-1'], [0, 0, 0], [1, 1, 1]],
                            clip: 'rect(0px 273px 10px 0px)',
                            fill: ['rgba(0,201,255,1.00)']
                        },
                        {
                            type: 'image',
                            id: 'nba-engine',
                            rect: ['-164px', '401px', '199px', '199px', 'auto', 'auto'],
                            transform: [[], [], [], ['0', '0']],
                            fill: ['rgba(0,0,0,0)', 'images/nba-engine.svg', '0px', '0px']
                        },
                        {
                            rect: ['-131px', '405px', '78px', '217px', 'auto', 'auto'],
                            id: 'nba-arrow2',
                            type: 'image',
                            clip: 'rect(217px 78px 217px 0px)',
                            fill: ['rgba(0,0,0,0)', 'images/nba-arrow.svg', '0px', '0px']
                        },
                        {
                            rect: ['-143px', '284px', '150px', '49px', 'auto', 'auto'],
                            stroke: [7, 'rgba(18,65,145,1.00)', 'solid'],
                            id: 'Rectangle8',
                            opacity: '0',
                            type: 'rect',
                            fill: ['rgba(0,201,255,0.00)']
                        },
                        {
                            type: 'image',
                            id: 'solidarrow',
                            rect: ['18px', '300px', '285px', '20px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/solidarrow.svg', '-290px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '560px', '554px']
                        }
                    }
                },
                timeline: {
                    duration: 21000,
                    autoPlay: true,
                    labels: {
                        "next": 6000,
                        "last": 13250
                    },
                    data: [
                        [
                            "eid377",
                            "clip",
                            16500,
                            1250,
                            "easeInOutCubic",
                            "${nba-arrow2}",
                            [217,78,217,0],
                            [0,78,217,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid431",
                            "opacity",
                            20000,
                            1000,
                            "easeInOutCubic",
                            "${Text10}",
                            '0',
                            '1'
                        ],
                        [
                            "eid31",
                            "scaleY",
                            500,
                            3000,
                            "easeInOutCubic",
                            "${network-circle}",
                            '0.7',
                            '73.93'
                        ],
                        [
                            "eid55",
                            "scaleY",
                            6000,
                            2500,
                            "easeInOutCubic",
                            "${network-circle}",
                            '73.93',
                            '10'
                        ],
                        [
                            "eid88",
                            "scaleY",
                            9000,
                            1500,
                            "easeInOutCubic",
                            "${network-circle}",
                            '10',
                            '73.93'
                        ],
                        [
                            "eid105",
                            "scaleY",
                            13250,
                            2750,
                            "easeInOutCubic",
                            "${network-circle}",
                            '73.93',
                            '1.9'
                        ],
                        [
                            "eid359",
                            "clip",
                            16000,
                            1000,
                            "easeInOutCubic",
                            "${Rectangle7}",
                            [0,0,10,0],
                            [0,273,10,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid29",
                            "top",
                            500,
                            3000,
                            "easeInOutCubic",
                            "${network-circle}",
                            '-200px',
                            '4441px'
                        ],
                        [
                            "eid57",
                            "top",
                            6000,
                            2500,
                            "easeInOutCubic",
                            "${network-circle}",
                            '4441px',
                            '325px'
                        ],
                        [
                            "eid82",
                            "top",
                            8500,
                            500,
                            "easeOutQuad",
                            "${network-circle}",
                            '325px',
                            '395px'
                        ],
                        [
                            "eid90",
                            "top",
                            9000,
                            1500,
                            "easeInOutCubic",
                            "${network-circle}",
                            '395px',
                            '4447px'
                        ],
                        [
                            "eid102",
                            "top",
                            13250,
                            2750,
                            "easeInOutCubic",
                            "${network-circle}",
                            '4447px',
                            '228px'
                        ],
                        [
                            "eid419",
                            "opacity",
                            17750,
                            1000,
                            "easeInOutCubic",
                            "${Rectangle8}",
                            '0',
                            '1'
                        ],
                        [
                            "eid375",
                            "scaleY",
                            16000,
                            1000,
                            "easeInOutCubic",
                            "${nba-engine}",
                            '0',
                            '1'
                        ],
                        [
                            "eid28",
                            "scaleX",
                            500,
                            3000,
                            "easeInOutCubic",
                            "${network-circle}",
                            '0.7',
                            '73.93'
                        ],
                        [
                            "eid54",
                            "scaleX",
                            6000,
                            2500,
                            "easeInOutCubic",
                            "${network-circle}",
                            '73.93',
                            '10'
                        ],
                        [
                            "eid87",
                            "scaleX",
                            9000,
                            1500,
                            "easeInOutCubic",
                            "${network-circle}",
                            '10',
                            '73.93'
                        ],
                        [
                            "eid104",
                            "scaleX",
                            13250,
                            2750,
                            "easeInOutCubic",
                            "${network-circle}",
                            '73.93',
                            '1.9'
                        ],
                        [
                            "eid432",
                            "display",
                            16000,
                            0,
                            "easeInOutCubic",
                            "${Rectangle7}",
                            'none',
                            'block'
                        ],
                        [
                            "eid421",
                            "background-position",
                            18750,
                            1250,
                            "easeInOutCubic",
                            "${solidarrow}",
                            [-290,0],
                            [0,0],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid373",
                            "scaleX",
                            16000,
                            1000,
                            "easeInOutCubic",
                            "${nba-engine}",
                            '0',
                            '1'
                        ],
                        [
                            "eid30",
                            "left",
                            500,
                            3000,
                            "easeInOutCubic",
                            "${network-circle}",
                            '-291px',
                            '7568px'
                        ],
                        [
                            "eid56",
                            "left",
                            6000,
                            2500,
                            "easeInOutCubic",
                            "${network-circle}",
                            '7568px',
                            '56px'
                        ],
                        [
                            "eid81",
                            "left",
                            8500,
                            500,
                            "easeOutQuad",
                            "${network-circle}",
                            '56px',
                            '-1385px'
                        ],
                        [
                            "eid89",
                            "left",
                            9000,
                            1500,
                            "easeInOutCubic",
                            "${network-circle}",
                            '-1385px',
                            '-6307px'
                        ],
                        [
                            "eid103",
                            "left",
                            13250,
                            2750,
                            "easeInOutCubic",
                            "${network-circle}",
                            '-6307px',
                            '-590px'
                        ],
                        [
                            "eid434",
                            "clip",
                            19500,
                            1000,
                            "easeInOutCubic",
                            "${Rectangle9}",
                            [0,0,181,0],
                            [0,385,181,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
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
                            type: 'rect',
                            transform: [[], [], [], ['0', '0']],
                            id: 'smp-zoom-chart-2Copy',
                            symbolName: 'smp-zoom-chart-2',
                            opacity: '0',
                            rect: ['1036px', '263', '560', '554', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            transform: [[], [], [], ['0.4', '0.4']],
                            id: 'zero-touch',
                            symbolName: 'zero-touch',
                            opacity: '0',
                            rect: ['476px', '105px', '1353', '793', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            transform: [[], [], [], ['0.25', '0.25']],
                            id: 'VoLTE-chart',
                            symbolName: 'VoLTE-chart',
                            opacity: '0',
                            rect: ['341px', '543px', '1542', '634', 'auto', 'auto']
                        },
                        {
                            type: 'image',
                            id: 'weakphoneCopy',
                            opacity: '0',
                            rect: ['300px', '397px', '228px', '445px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/weakphone.svg', '0px', '0px']
                        },
                        {
                            rect: ['343px', '614px', '29px', '27px', 'auto', 'auto'],
                            opacity: '0',
                            id: 'weak_bar',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            type: 'rect',
                            fill: ['rgba(18,65,145,1.00)']
                        },
                        {
                            rect: ['345px', '660px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [24, ''], 'rgba(18,65,145,1.00)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            id: 'weak_signal_text',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\">​Weak Signal</p>',
                            type: 'text'
                        },
                        {
                            type: 'text',
                            align: 'left',
                            textStyle: ['', '', '', '', 'none'],
                            font: ['Arial, Helvetica, sans-serif', [24, 'px'], 'rgba(0,0,0,1.00)', '400', 'none', 'normal', 'break-word', 'nowrap'],
                            text: '<p style=\"margin: 0px; text-align: center;\">​<span style=\"font-size: 30px;\">Jackie’s VoLTE signal</span></p><p style=\"margin: 0px; text-align: center;\"><span style=\"font-size: 30px;\">is weak making it difficult</span></p><p style=\"margin: 0px; text-align: center;\"><span style=\"font-size: 30px;\">to talk to her mom</span>​</p>',
                            rect: ['249px', '238px', 'auto', 'auto', 'auto', 'auto'],
                            opacity: '0',
                            id: 'jackie_text'
                        },
                        {
                            type: 'image',
                            id: 'arrow-rightCopy',
                            rect: ['581px', '557px', '257px', '11px', 'auto', 'auto'],
                            clip: 'rect(0px 257px 11px 0px)',
                            fill: ['rgba(0,0,0,0)', 'images/arrow-right.svg', '-258px', '0px']
                        },
                        {
                            type: 'rect',
                            rect: ['1068px', '688px', '410px', '108px', 'auto', 'auto'],
                            transform: [[], [], [], ['0', '0']],
                            id: 'Rectangle2Copy',
                            opacity: '0',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            fill: ['rgba(18,65,145,1)']
                        },
                        {
                            type: 'text',
                            id: 'smp_workflow_text',
                            opacity: '1',
                            rect: ['1112px', '712px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px; text-align: center;\">​<span style=\"color: rgb(255, 255, 255);\">Service Management Platform</span></p><p style=\"margin: 0px; text-align: center;\"><span style=\"color: rgb(255, 255, 255);\">​Workflow Engine</span></p>',
                            align: 'left',
                            font: ['Arial, Helvetica, sans-serif', [24, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap'],
                            textStyle: ['', '', '', '', 'none'],
                            transform: [[], [], [], ['0', '0']]
                        },
                        {
                            type: 'text',
                            id: 'knowledge_text',
                            opacity: '0',
                            rect: ['951px', '115px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\">​Knowledge driven, dynamic, intelligent workflows</p>',
                            align: 'left',
                            font: ['Arial, Helvetica, sans-serif', [30, 'px'], 'rgba(0,0,0,1.00)', '400', 'none', 'normal', 'break-word', 'nowrap'],
                            textStyle: ['', '', '', '', 'none'],
                            transform: [[], [], [], ['0', '0']]
                        },
                        {
                            type: 'rect',
                            rect: ['178px', '211px', '1550px', '764px', 'auto', 'auto'],
                            opacity: '0',
                            id: 'btn',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
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
                            [ "eid339", "trigger", 0, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${VoLTE-chart}', [] ] ],
                            [ "eid278", "trigger", 0, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${zero-touch}', [] ] ],
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
                            rect: ['39px', '98px', '1276px', '673px', 'auto', 'auto'],
                            id: 'chart12',
                            opacity: '1',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/chart1.png', '0px', '0px']
                        },
                        {
                            rect: ['0px', '659px', '1353px', '134px', 'auto', 'auto'],
                            type: 'rect',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            id: 'Rectangle5',
                            opacity: '0',
                            clip: 'rect(0px 1353px 134px 0px)',
                            fill: ['rgba(18,65,145,1)']
                        },
                        {
                            type: 'text',
                            id: 'Text7',
                            text: '<p style=\"margin: 0px;\">​Tests confirm slow connection</p>',
                            font: ['Arial, Helvetica, sans-serif', [40, 'px'], 'rgba(255,255,255,1.00)', '400', 'none', 'normal', 'break-word', 'nowrap'],
                            transform: [[], [], [], ['0', '0']],
                            textStyle: ['', '', '', '', 'none'],
                            rect: ['423px', '703px', 'auto', 'auto', 'auto', 'auto'],
                            align: 'center',
                            opacity: '0'
                        },
                        {
                            type: 'text',
                            id: 'Text6',
                            text: '<p style=\"margin: 0px;\">​Record of Wi-Fi extender zero-touch activation</p>',
                            font: ['Arial, Helvetica, sans-serif', [30, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap'],
                            transform: [[], [], [], ['0', '0']],
                            textStyle: ['', '', '', '', 'none'],
                            rect: ['380px', '0px', 'auto', 'auto', 'auto', 'auto'],
                            align: 'center',
                            opacity: '0'
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
                            rect: ['0px', '0px', '1542px', '634px', 'auto', 'auto'],
                            id: 'Rectangle',
                            stroke: [0, 'rgb(18, 65, 145)', 'solid'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,1.00)']
                        },
                        {
                            type: 'image',
                            id: 'volte-chart-only',
                            rect: ['-3356px', '-787px', '8790px', '2200px', 'auto', 'auto'],
                            transform: [[], [], [], ['0.1', '0.1']],
                            fill: ['rgba(0,0,0,0)', 'images/volte-chart-only.svg', '0px', '0px']
                        },
                        {
                            type: 'text',
                            id: 'Text9',
                            textStyle: ['', '', '', '', 'none'],
                            rect: ['553px', '0px', 'auto', 'auto', 'auto', 'auto'],
                            align: 'left',
                            font: ['Arial, Helvetica, sans-serif', [24, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap'],
                            opacity: '0',
                            text: '<p style=\"margin: 0px; text-align: center;\">​<span style=\"font-size: 36px;\">Customer Experience Index</span></p>'
                        },
                        {
                            rect: ['0px', '543px', '1542px', '155px', 'auto', 'auto'],
                            type: 'rect',
                            id: 'Rectangle6',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            clip: 'rect(155px 1542px 155px 0px)',
                            fill: ['rgba(18,65,145,1)']
                        },
                        {
                            type: 'text',
                            id: 'Text8',
                            textStyle: ['', '', '', '', 'none'],
                            rect: ['377px', '597px', 'auto', 'auto', 'auto', 'auto'],
                            align: 'left',
                            font: ['Arial, Helvetica, sans-serif', [24, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap'],
                            opacity: '0',
                            text: '<p style=\"margin: 0px; text-align: center;\">​<span style=\"color: rgb(255, 255, 255); font-size: 40px;\">CEI shows Jackie is a High Valued Customer</span></p>'
                        },
                        {
                            type: 'text',
                            id: 'Text',
                            text: '<p style=\"margin: 0px;\">​Mobile Network Experience Index</p>',
                            rect: ['80px', '193px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [20, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            id: 'TextCopy',
                            text: '<p style=\"margin: 0px;\">​Voice Index</p>',
                            rect: ['80px', '229px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [20, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            id: 'TextCopy3',
                            text: '<p style=\"margin: 0px;\">Data index</p>',
                            rect: ['80px', '265px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [20, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            id: 'TextCopy2',
                            text: '<p style=\"margin: 0px;\">​VoLTE Index</p>',
                            rect: ['80px', '301px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [20, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            rect: ['413px', '193px', 'auto', 'auto', 'auto', 'auto'],
                            id: 'TextCopy7',
                            text: '<p style=\"margin: 0px;\">​24</p>',
                            align: 'right',
                            font: ['Arial, Helvetica, sans-serif', [20, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            rect: ['502px', '193px', 'auto', 'auto', 'auto', 'auto'],
                            id: 'TextCopy12',
                            text: '<p style=\"margin: 0px;\">​100</p>',
                            align: 'right',
                            font: ['Arial, Helvetica, sans-serif', [20, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            rect: ['413px', '229px', 'auto', 'auto', 'auto', 'auto'],
                            id: 'TextCopy6',
                            text: '<p style=\"margin: 0px;\">​15</p>',
                            align: 'right',
                            font: ['Arial, Helvetica, sans-serif', [20, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            rect: ['413px', '265px', 'auto', 'auto', 'auto', 'auto'],
                            id: 'TextCopy5',
                            text: '<p style=\"margin: 0px;\">27</p>',
                            align: 'right',
                            font: ['Arial, Helvetica, sans-serif', [20, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            rect: ['424px', '301px', 'auto', 'auto', 'auto', 'auto'],
                            id: 'TextCopy4',
                            text: '<p style=\"margin: 0px;\">​5</p>',
                            align: 'right',
                            font: ['Arial, Helvetica, sans-serif', [20, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            rect: ['513px', '246px', 'auto', 'auto', 'auto', 'auto'],
                            id: 'TextCopy10',
                            text: '<p style=\"margin: 0px;\">75</p>',
                            align: 'right',
                            font: ['Arial, Helvetica, sans-serif', [20, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            rect: ['513px', '301px', 'auto', 'auto', 'auto', 'auto'],
                            id: 'TextCopy9',
                            text: '<p style=\"margin: 0px;\">50</p>',
                            align: 'right',
                            font: ['Arial, Helvetica, sans-serif', [20, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            rect: ['513px', '355px', 'auto', 'auto', 'auto', 'auto'],
                            id: 'TextCopy13',
                            text: '<p style=\"margin: 0px;\">25</p>',
                            align: 'right',
                            font: ['Arial, Helvetica, sans-serif', [20, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            rect: ['524px', '407px', 'auto', 'auto', 'auto', 'auto'],
                            id: 'TextCopy8',
                            text: '<p style=\"margin: 0px;\">​0</p>',
                            align: 'right',
                            font: ['Arial, Helvetica, sans-serif', [20, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            rect: ['740px', '436px', 'auto', 'auto', 'auto', 'auto'],
                            id: 'TextCopy14',
                            text: '<p style=\"margin: 0px;\">20 Feb</p>',
                            align: 'right',
                            font: ['Arial, Helvetica, sans-serif', [20, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            rect: ['1083px', '436px', 'auto', 'auto', 'auto', 'auto'],
                            id: 'TextCopy15',
                            text: '<p style=\"margin: 0px;\">22 Feb</p>',
                            align: 'right',
                            font: ['Arial, Helvetica, sans-serif', [20, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap']
                        },
                        {
                            type: 'text',
                            rect: ['1434px', '436px', 'auto', 'auto', 'auto', 'auto'],
                            id: 'TextCopy16',
                            text: '<p style=\"margin: 0px;\">24 Feb</p>',
                            align: 'right',
                            font: ['Arial, Helvetica, sans-serif', [20, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'nowrap']
                        },
                        {
                            type: 'image',
                            id: 'legend',
                            rect: ['-5px', '-351px', '130px', '1220px', 'auto', 'auto'],
                            transform: [[], [], [], ['0.1', '0.1']],
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
                            "eid308",
                            "opacity",
                            500,
                            1000,
                            "easeInOutCubic",
                            "${Text9}",
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
                            rect: ['466px', '390px', '356px', '38px', 'auto', 'auto'],
                            id: 'rightdown-arrow',
                            type: 'image',
                            display: 'none',
                            fill: ['rgba(0,0,0,0)', 'images/rightdown-arrow.svg', '0px', '0px']
                        },
                        {
                            rect: ['263px', '373px', '208px', '128px', 'auto', 'auto'],
                            type: 'image',
                            id: 'provision-arrow',
                            opacity: '1',
                            display: 'none',
                            fill: ['rgba(0,0,0,0)', 'images/provision-arrow.svg', '0px', '0px']
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
                            rect: ['253px', '478px', '218px', '23px', 'auto', 'auto'],
                            type: 'rect',
                            id: 'Rectangle4',
                            stroke: [2, 'rgb(18, 65, 145)', 'none'],
                            clip: 'rect(0px 218px 23px 0px)',
                            fill: ['rgba(255,255,255,1)']
                        },
                        {
                            transform: [[], [], [], ['1', '3.23762']],
                            rect: ['467px', '391px', '356px', '3px', 'auto', 'auto'],
                            display: 'none',
                            type: 'rect',
                            id: 'Rectangle6',
                            stroke: [2, 'rgb(18, 65, 145)', 'none'],
                            clip: 'rect(0px 356px 3.0299999713898px 356px)',
                            fill: ['rgba(255,255,255,1)']
                        },
                        {
                            rect: ['804px', '393px', '23px', '39px', 'auto', 'auto'],
                            display: 'none',
                            type: 'rect',
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
                            fill: ['rgba(0,0,0,0)', 'images/diamond.svg', '0px', '0px']
                        },
                        {
                            rect: ['350px', '508px', '112px', '77px', 'auto', 'auto'],
                            id: 'gray_diamond',
                            opacity: '0',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/gray%20diamond.svg', '0px', '0px']
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
                            rect: ['96px', '145px', '8px', '35px', 'auto', 'auto'],
                            transform: [[], [], [], ['0.99995']],
                            id: 'updownarrow',
                            type: 'image',
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
                            transform: [[], [], [], ['0.6', '0.6']],
                            rect: ['82px', '112px', '36px', '36px', 'auto', 'auto'],
                            borderRadius: ['50%', '50%', '50%', '50%'],
                            stroke: [2, 'rgb(190, 200, 210)', 'none'],
                            id: 'Ellipse',
                            opacity: '0',
                            type: 'ellipse',
                            fill: ['rgba(0,201,255,1.00)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            isStage: 'true',
                            rect: [undefined, undefined, '931px', '689px']
                        }
                    }
                },
                timeline: {
                    duration: 12877,
                    autoPlay: true,
                    data: [
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
                            11383,
                            1000,
                            "linear",
                            "${TextCopy25}",
                            '0',
                            '1'
                        ],
                        [
                            "eid633",
                            "opacity",
                            11877,
                            1000,
                            "linear",
                            "${TextCopy26}",
                            '0',
                            '1'
                        ],
                        [
                            "eid694",
                            "display",
                            6000,
                            0,
                            "linear",
                            "${provision-arrow}",
                            'none',
                            'block'
                        ],
                        [
                            "eid623",
                            "opacity",
                            10877,
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
                            10877,
                            1000,
                            "linear",
                            "${Rectangle2Copy8}",
                            '0',
                            '1'
                        ],
                        [
                            "eid639",
                            "opacity",
                            8000,
                            1000,
                            "linear",
                            "${Rectangle2Copy7}",
                            '0',
                            '1'
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
                            9877,
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
                            [[100, 130.02, 0, 0, 0, 0,0],[100.76, 228.33, 0, 0, 0, 0,98.31],[343.29, 227.77, 0, 0, 0, 0,340.84],[344.45, 343.14, 0, 0, 0, 0,456.22],[466.19, 342.44, 0, 0, 0, 0,577.96],[465.59, 485.5, 0, 0, 0, 0,721.01],[265.76, 486.05, 0, 0, 0, 0,920.84],[266, 548, 0, 0, 0, 0,982.79]]
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
                            9877,
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
                            10383,
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
                            "eid583",
                            "opacity",
                            8877,
                            1000,
                            "linear",
                            "${diamond}",
                            '0',
                            '1'
                        ],
                        [
                            "eid607",
                            "opacity",
                            9383,
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
                            11877,
                            1000,
                            "linear",
                            "${Rectangle2Copy10}",
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
                            "eid716",
                            "clip",
                            7000,
                            1630,
                            "linear",
                            "${Rectangle4}",
                            [0,218,23,0],
                            [0,0,23,0],
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
                            "eid609",
                            "opacity",
                            10383,
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
                            "eid605",
                            "opacity",
                            9383,
                            1000,
                            "linear",
                            "${TextCopy21}",
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
                            "eid637",
                            "opacity",
                            8877,
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
                            "eid595",
                            "opacity",
                            11383,
                            1000,
                            "linear",
                            "${Rectangle2Copy9}",
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
                            stroke: [2, 'rgb(18, 65, 145)', 'solid'],
                            rect: ['32px', '26px', '1066px', '606px', 'auto', 'auto'],
                            type: 'rect',
                            display: 'block',
                            id: 'btn',
                            opacity: '0',
                            cursor: 'pointer',
                            fill: ['rgba(255,255,255,1)']
                        },
                        {
                            rect: ['-802px', '-646px', '1800px', '2600px', 'auto', 'auto'],
                            id: 'iphone6-vowifi-1',
                            transform: [[], [], [], ['0.25', '0.25']],
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/iphone6-vowifi-1.png', '0px', '0px']
                        },
                        {
                            rect: ['-802px', '-646px', '1800px', '2600px', 'auto', 'auto'],
                            transform: [[], [], [], ['0.25', '0.25']],
                            type: 'image',
                            id: 'iphone6-vowifi-22',
                            opacity: '1',
                            display: 'none',
                            fill: ['rgba(0,0,0,0)', 'images/iphone6-vowifi-2.png', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            isStage: 'true',
                            rect: [undefined, undefined, '1120px', '862px']
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
            }
        };

    AdobeEdge.registerCompositionDefn(compId, symbols, fonts, scripts, resources, opts);

    if (!window.edge_authoring_mode) AdobeEdge.getComposition(compId).load("scene2-part2_edgeActions.js");
})("scene2-part2");
