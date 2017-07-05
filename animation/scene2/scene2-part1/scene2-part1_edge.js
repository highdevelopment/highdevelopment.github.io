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
                            id: 'slide1',
                            symbolName: 'slide1',
                            type: 'rect',
                            rect: ['0px', '0px', '1920', '1080', 'auto', 'auto']
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
                    duration: 25500,
                    autoPlay: true,
                    data: [

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
                            rect: ['-590px', '228px', '1053px', '1043px', 'auto', 'auto'],
                            id: 'network-circle',
                            transform: [[], [], [], ['1.9', '1.9']],
                            type: 'image',
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
                            textStyle: ['', '', '', '', 'none'],
                            rect: ['410px', '264px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [24, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap'],
                            align: 'left',
                            id: 'Text10',
                            opacity: '0',
                            text: '<p style=\"margin: 0px; text-align: center;\">​<span style=\"color: rgb(255, 255, 255); font-size: 40px;\">Recommend</span></p><p style=\"margin: 0px; text-align: center;\"><span style=\"color: rgb(255, 255, 255); font-size: 40px;\">VoWi-Fi</span></p>',
                            type: 'text'
                        },
                        {
                            transform: [[], ['-1']],
                            rect: ['-229px', '622px', '273px', '10px', 'auto', 'auto'],
                            display: 'none',
                            type: 'rect',
                            id: 'Rectangle7',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            clip: 'rect(0px 273px 10px 0px)',
                            fill: ['rgba(0,201,255,1.00)']
                        },
                        {
                            rect: ['-164px', '401px', '199px', '199px', 'auto', 'auto'],
                            id: 'nba-engine',
                            transform: [[], [], [], ['0', '0']],
                            type: 'image',
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
                            id: 'solidarrow',
                            type: 'image',
                            rect: ['18px', '300px', '285px', '20px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/solidarrow.svg', '-290px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            isStage: 'true',
                            rect: [undefined, undefined, '560px', '554px']
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
                            font: ['Arial, Helvetica, sans-serif', [24, ''], 'rgba(18,65,145,1.00)', 'normal', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            id: 'weak_signal_text',
                            opacity: '0',
                            text: '<p style=\"margin: 0px;\">​Weak Signal</p>',
                            rect: ['345px', '660px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            type: 'text',
                            id: 'jackie_text',
                            textStyle: ['', '', '', '', 'none'],
                            font: ['Arial, Helvetica, sans-serif', [24, 'px'], 'rgba(0,0,0,1.00)', '400', 'none', 'normal', 'break-word', 'nowrap'],
                            rect: ['249px', '238px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px; text-align: center;\">​<span style=\"font-size: 30px;\">Jackie’s VoLTE signal</span></p><p style=\"margin: 0px; text-align: center;\"><span style=\"font-size: 30px;\">is weak making it difficult</span></p><p style=\"margin: 0px; text-align: center;\"><span style=\"font-size: 30px;\">to talk to her mom</span>​</p>',
                            opacity: '0',
                            align: 'left'
                        },
                        {
                            type: 'image',
                            id: 'arrow-rightCopy',
                            rect: ['581px', '557px', '257px', '11px', 'auto', 'auto'],
                            clip: 'rect(0px 257px 11px 0px)',
                            fill: ['rgba(0,0,0,0)', 'images/arrow-right.svg', '-258px', '0px']
                        },
                        {
                            transform: [[], [], [], ['0', '0']],
                            rect: ['1068px', '688px', '410px', '108px', 'auto', 'auto'],
                            type: 'rect',
                            id: 'Rectangle2Copy',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            opacity: '0',
                            fill: ['rgba(18,65,145,1)']
                        },
                        {
                            type: 'text',
                            id: 'smp_workflow_text',
                            text: '<p style=\"margin: 0px; text-align: center;\">​<span style=\"color: rgb(255, 255, 255);\">Service Management Platform</span></p><p style=\"margin: 0px; text-align: center;\"><span style=\"color: rgb(255, 255, 255);\">​Workflow Engine</span></p>',
                            rect: ['1112px', '712px', 'auto', 'auto', 'auto', 'auto'],
                            opacity: '1',
                            align: 'left',
                            font: ['Arial, Helvetica, sans-serif', [24, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap'],
                            textStyle: ['', '', '', '', 'none'],
                            transform: [[], [], [], ['0', '0']]
                        },
                        {
                            type: 'text',
                            id: 'knowledge_text',
                            text: '<p style=\"margin: 0px;\">​Knowledge driven, dynamic, intelligent workflows</p>',
                            rect: ['951px', '115px', 'auto', 'auto', 'auto', 'auto'],
                            opacity: '0',
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
                            opacity: '0',
                            font: ['Arial, Helvetica, sans-serif', [40, 'px'], 'rgba(255,255,255,1.00)', '400', 'none', 'normal', 'break-word', 'nowrap'],
                            transform: [[], [], [], ['0', '0']],
                            textStyle: ['', '', '', '', 'none'],
                            rect: ['423px', '703px', 'auto', 'auto', 'auto', 'auto'],
                            align: 'center',
                            text: '<p style=\"margin: 0px;\">​Tests confirm slow connection</p>'
                        },
                        {
                            type: 'text',
                            id: 'Text6',
                            opacity: '0',
                            font: ['Arial, Helvetica, sans-serif', [30, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap'],
                            transform: [[], [], [], ['0', '0']],
                            textStyle: ['', '', '', '', 'none'],
                            rect: ['380px', '0px', 'auto', 'auto', 'auto', 'auto'],
                            align: 'center',
                            text: '<p style=\"margin: 0px;\">​Record of Wi-Fi extender zero-touch activation</p>'
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
                            rect: ['-3356px', '-787px', '8790px', '2200px', 'auto', 'auto'],
                            id: 'volte-chart-only',
                            transform: [[], [], [], ['0.1', '0.1']],
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/volte-chart-only.svg', '0px', '0px']
                        },
                        {
                            textStyle: ['', '', '', '', 'none'],
                            rect: ['553px', '0px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [24, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap'],
                            align: 'left',
                            id: 'Text9',
                            opacity: '0',
                            text: '<p style=\"margin: 0px; text-align: center;\">​<span style=\"font-size: 36px;\">Customer Experience Index</span></p>',
                            type: 'text'
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
                            textStyle: ['', '', '', '', 'none'],
                            rect: ['377px', '597px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [24, 'px'], 'rgba(0,0,0,1)', '400', 'none', 'normal', 'break-word', 'nowrap'],
                            align: 'left',
                            id: 'Text8',
                            opacity: '0',
                            text: '<p style=\"margin: 0px; text-align: center;\">​<span style=\"color: rgb(255, 255, 255); font-size: 40px;\">CEI shows Jackie is a High Valued Customer</span></p>',
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
                            isStage: 'true',
                            rect: [undefined, undefined, '1542px', '634px']
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
                        ]
                    ]
                }
            }
        };

    AdobeEdge.registerCompositionDefn(compId, symbols, fonts, scripts, resources, opts);

    if (!window.edge_authoring_mode) AdobeEdge.getComposition(compId).load("scene2-part1_edgeActions.js");
})("scene2-part1");
