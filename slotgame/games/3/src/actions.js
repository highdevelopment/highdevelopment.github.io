/*****************************************************
    Description     : Define global actions
    Created         : 2016/08/12
******************************************************/
//Define values for spin action
var agAction = function() {

    var main            = this;

    var loopCounter     = 0;
    var winCounter      = 0;
    var winlineGroup    = game.add.group();
    var animGroup       = game.add.group();
    var paylineImg      = null;
    var winlinetimer    = null;
    var showAll         = false;

    var lineColors = 
        [   '0xFFFF00', '0x65FEAC', '0xCC33CB', '0xFE0000', '0x98CB00', '0xFF6766', '0xCCFF00', '0x008A00', '0xC0FFB4', '0x00FF87',  //1
            '0x01CC01', '0xFF99FD', '0xFEB4B3', '0xFF3301', '0x7FFF6C', '0xFFB600', '0x00CCA3', '0x00FFF7', '0xFF32CB', '0xFF67CC',  //2
            '0xE9FF79', '0x00A6A6', '0x66D1FF', '0x0099FF', '0xFF6600', '0x9AFF01', '0xCC9900', '0x8AF6F3', '0xFF3366', '0xD652DB',  //3
            '0xFDA053', '0xCE0062', '0x016C8C', '0xC046FF', '0x0B38E9', '0x64B800', '0xA2C8DF', '0xF8D114', '0x006A4C', '0x020F99',  //4
            '0x988C20', '0xB04F58', '0x71AA99', '0xD0E276', '0x0967BF', '0xFF73A4', '0x86150F', '0x9EA8A0', '0x01692A', '0x654AA7',  //5
            '0xD24160', '0x9E9EBA', '0x324486', '0x030432', '0xAB4ACF', '0xBAE27F', '0x42B28E', '0xDB663A', '0xF3E288', '0x3494A4',  //6
            '0xB6DA52', '0xA7B0AF', '0x629DD9', '0xAE99A2', '0xA22C4F', '0x702F45', '0x5D4593', '0x459BBE', '0x5FF1C0', '0xC0C9C4',  //7
            '0x886000', '0x544FB5', '0x8C9A21', '0x0C3F5E', '0x86B4C3', '0x15AD7A', '0xC74051', '0x9E6399', '0x07E3D9', '0x176DE8',  //8
            '0xECCE90', '0xBB47AC', '0xBB47AC', '0x682AA9', '0x0EB692', '0x62BD1A', '0xBD7B00', '0x7EBFB7', '0x9AC3C7', '0xAAAADC',  //9
            '0xD0D998', '0x989A4F', '0xA74B96', '0x46829E', '0xA14B4E', '0x2D078E', '0x9E2D01', '0xE05E10', '0xDDF000', '0xF90100'  ];

    var noWinArr    = [ '{"res":"true","win":"false","pattern":[[3,2,7,6,4],[1,7,4,6,2],[1,6,8,7,6]],"money":99850,"bonus":"false","bonus_prize":"0"}',
                        '{"res":"true","win":"false","pattern":[[1,7,5,2,2],[1,3,7,5,2],[4,3,2,6,5]],"money":99850,"bonus":"false","bonus_prize":"0"}',
                        '{"res":"true","win":"false","pattern":[[1,4,2,2,2],[6,5,2,4,2],[7,2,2,4,3]],"money":99850,"bonus":"false","bonus_prize":"0"}',
                        '{"res":"true","win":"false","pattern":[[3,4,5,4,5],[3,1,2,7,1],[8,1,6,4,1]],"money":99850,"bonus":"false","bonus_prize":"0"}',
                        '{"res":"true","win":"false","pattern":[[6,4,3,4,4],[7,5,3,4,1],[2,3,5,4,1]],"money":99850,"bonus":"false","bonus_prize":"0"}'];

    var SpinAnimScale = [   1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
                            2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
                            2.0, 2.0, 1.0, 1.0];

    var agSpinAnimCount = [24, 24, 24, 24, 24, 24, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32];

    main.clearGroups = function () {
        showAllImageOnReel();
        agLineView.clearLines();
        agAutoView.hideMenu();
        animGroup.removeAll();
    }

    main.startSpinning = function() {

        var vbal = agSetView.getBalanceValue();
        var vtotal = agSetView.getTotalBetValue();
        var vbet = agSetView.getBetValue();
        var vlines = agSetView.getLinesValue();

        if(vbal < vtotal) {
            return;
        }

        g_gameSound.playReels();
        
        if(agIsAuto) {
            agSpinCounter--;
            agSetView.setSpinLbl(agSpinCounter);
        }
        
        agSetView.setWinValue(0);

        agResponseObj = null;
        agSetView.disableAllButtons();

        _oAjaxData = {};
        _oAjaxData.gameengine = 2;
        _oAjaxData.a = "spin";
        _oAjaxData.bet = vbet;
        _oAjaxData.total_bet = vtotal;
        _oAjaxData.lines = vlines;
        _oAjaxData.gameid = 3;
        // _oAjaxData.hold = [false, false, false, false, false];
        
        console.log("a=spin bet="+_oAjaxData.bet + " lines = " + _oAjaxData.lines +  " total_bet = " + _oAjaxData.total_bet);
           
        $.ajax({
            type: 'POST',
            url: "http://95.85.17.19/work/action.php",
            data: _oAjaxData,
            headers: { "cache-control": "no-cache" },
            cache: false,
            timeout : 15000,
            dataType : "text",
            beforeSend: function(){
                console.log("Before send request");
            },

            success: function(data){
                // s_oLoading.hide();
                console.log(data);
                // data = 'res=true&win=true&pattern=[[2,15,5,3,1],[15,4,5,3,4],[3,3,5,15,13]]&win_lines=[{"line":1,"amount":10,"num_win":2,"value":4,"list":[{"row":1,"col":0,"value":4},{"row":1,"col":1,"value":4}]},{"line":9,"amount":10,"num_win":2,"value":4,"list":[{"row":1,"col":0,"value":4},{"row":0,"col":1,"value":4}]},{"line":10,"amount":10,"num_win":2,"value":4,"list":[{"row":1,"col":0,"value":4},{"row":0,"col":1,"value":4}]},{"line":14,"amount":10,"num_win":2,"value":4,"list":[{"row":1,"col":0,"value":4},{"row":1,"col":1,"value":4}]},{"line":15,"amount":10,"num_win":2,"value":4,"list":[{"row":1,"col":0,"value":4},{"row":1,"col":1,"value":4}]},{"line":28,"amount":10,"num_win":2,"value":4,"list":[{"row":1,"col":0,"value":4},{"row":0,"col":1,"value":4}]}]&money=5150&tot_win=300&bonus=0&bonus_items=0&bonus_prize=-1&cash=50'
                if(data.length == 0) {
                    console.log("Get Empty Data");
                    data = noWinArr[game.rnd.between(0, 4)];
                } 

                agResponseObj = JSON.parse(data);
            },

            error:function(){
                console.log("Connection Error");
                console.log("Get Empty Data");
                data = noWinArr[game.rnd.between(0, 4)];
                agResponseObj = JSON.parse(data);
            }
        });
        

        agLineView.clearLines();
        agAutoView.hideMenu();
        animGroup.removeAll();
        
        var s = 2;
        agReelFst.startSpin(++s);
        agReelSnd.startSpin(++s);
        agReelThr.startSpin(++s);
        agReelFur.startSpin(++s);
        agReelFiv.startSpin(++s);
    }

    function getUrlVars( urlVars ) {
        urlVars = urlVars.trim();
        var oFinalData = new Array();
        var hashes = urlVars.split('&');
        for (var i = 0; i < hashes.length; i++) {
            var hash = hashes[i].split('=');
            oFinalData[hash[0]] = hash[1];
        }
        return oFinalData;
    }

    main.onCompleteSpin = function() {
        
        g_gameSound.stopReels();

        winCounter = 0;
        console.log("AGScatter Counter = " + agScatterCounter);
        if(agScatterCounter > 2 && !agIsFree) {
            /*agIsFree = true;
            agSpinCounter = 7;

            agTitleView.startFreeSpin(agSpinCounter);
            return;*/
        }

        if(agResponseObj) {
            var vbal = agResponseObj.money;
            agSetView.setBalanceValue(vbal);
            g_gameEnv.setCurBalance(vbal);
            
            if(agResponseObj.win == 'true') {
                var vwin = agResponseObj.tot_win;
                agSetView.setWinValue(vwin);
            } else {
                agSetView.setWinValue(0);
            }
        }

        collectionAllWin();
    }

    function collectionAllWin() {
        var rxp         = 618;
        var isDefined = false;

        animGroup.removeAll();
        winlineGroup.removeAll();

        showAll = true;
        
        /* In this game, it don't need spin animations when show all wins. show only lines.
        var winArr = new Array();

        for(var l = 0; l < 5; l++) {
            winArr.length = 0;
            if(agResponseObj && agResponseObj.win_lines) {
                var winlineArr = JSON.parse(agResponseObj.win_lines);
                for(var i = 0; i < winlineArr.length; i++) {
                    if(winlineArr[i].line > 30)
                        continue;

                    var linelist = winlineArr[i].list;
                    for(var j = 0; j < linelist.length; j++) {
                        var line = linelist[j];
                        if(line.col == l) {
                            var found = false;
                            for(var k = 0; k < winArr.length; k++) {
                                if(line.row == winArr[k]) {
                                    found = true;
                                    break;
                                }
                            }

                            if(!found) {
                                winArr.push(line.row);
                            }
                        }
                    }
                }
            }

            if(winArr.length != 0) {
                for(var i = 0; i < winArr.length; i++) {
                    if(agResponseObj && agResponseObj.pattern) {
                        var winlineArr = JSON.parse(agResponseObj.pattern); 
                        var animIndex = winlineArr[winArr[i]][l] - 1;

                        var anim = animGroup.create(rxp + AG_IMAGE_HEIGHT * l, AG_START_Y + AG_IMAGE_HEIGHT * winArr[i], agSpinAnimArr[animIndex]);
                        anim.smoothed = false;
                        var animate = anim.animations.add('ok' + winArr[i] + l);
                        animate.play(20, true);

                        var borderAnim = animGroup.create(rxp + IMAGE_HEIGHT * l, START_Y + IMAGE_HEIGHT * winArr[i], 'win_frame');
                        borderAnim.smoothed = false;
                        var borderAnimate = borderAnim.animations.add('Border');
                        borderAnimate.play(1, true);
                    }
                }
            }
        }

        var viewY = 386;
        for(var i = 1; i < 5; i++) {
            animGroup.create(rxp + (i * IMAGE_HEIGHT) - 13, viewY, 'seperate');
        }*/

        loopCounter = 0;
        drawWinLines();
    }

    function drawWinLines() {
        var viewX = 600;
        var viewY = 300;

        if(agResponseObj && agResponseObj.win == 'true') {
            var winlineArr = agResponseObj.win_lines;
            for(var i = 0; i < winlineArr.length; i++) {
                /*
                //Limit lines counter is 30
                if(winlineArr[i].line > 30)
                        continue;*/

                var paylineIndex = winlineArr[i].line - 1;
                winlineGroup.create(viewX, viewY, agLineImgArr[paylineIndex]);
            }

            game.time.events.add(300, removeWinLines, this);
        } else {
            if(agIsAuto) {
                if(agSpinCounter > 0) {
                    main.startSpinning();
                } else {
                    agSetView.setSpinLbl('Spin!');
                    agSetView.enableAllButtons();
                    agIsAuto = false;
                }
            } else {
                agSetView.enableAllButtons();
            }
        }
    }

    function removeWinLines() {
        winlineGroup.removeAll();

        loopCounter++;
        if(loopCounter < 3) {
            game.time.events.add(300, drawWinLines, this);
        } else {
            loopCounter = 0;
            if(agIsAuto) {

                if(agResponseObj && agResponseObj.bonus == 1) {
                    // game.state.start("Bonus");
                    return;
                }

                if(agSpinCounter > 0) {
                    main.startSpinning();
                } else {
                    agSetView.setSpinLbl('Spin!');
                    agSetView.enableAllButtons();
                    agIsAuto = false;
                }
            } else {
                agSetView.enableAllButtons();

                collectionColWin();
                /*game.time.events.add(10000, removeWinColLines, this);*/
            }
        }

    }

    function removeWinColLines() {
        animGroup.removeAll();
    }

    function collectionColWin() {

        if(agResponseObj && agResponseObj.bonus == 1) {
            // game.state.start("Bonus");
            // return;
        }

        var rxp         = 618;
        var isDefined = false;
        var winlineArr = null;

        if(agResponseObj && agResponseObj.win_lines) {
            winlineArr = agResponseObj.win_lines;
        }

        /*
        //Limit lines counter is 30
        while(winlineArr[winCounter].line > 30) {
            winCounter++;
            
            if(winCounter >= winlineArr.length) {
                winCounter = 0;
            }   
        }*/

        animGroup.removeAll();

        var viewX = 600;
        var viewY = 300;
        var winlineArr = agResponseObj.win_lines;
        var paylineIndex = winlineArr[winCounter].line - 1;
        animGroup.create(viewX, viewY, agLineImgArr[paylineIndex]);

        for(var l = 0; l < 5; l++) {
            var winArr = new Array();
            if(winCounter < winlineArr.length) {
                var linelist = winlineArr[winCounter].list;
                for(var j = 0; j < linelist.length; j++) {
                    var line = linelist[j];
                    if(line.col == l) {
                        var found = false;
                        for(var k = 0; k < winArr.length; k++) {
                            if(line.row == winArr[k]) {
                                found = true;
                                break;
                            }
                        }

                        if(!found) {
                            winArr.push(line.row);
                        }
                    }
                }
            }

            if(winArr.length != 0) {
                
                for(var i = 0; i < winArr.length; i++) {
                    if(agResponseObj && agResponseObj.pattern) {

                        var borderBg = animGroup.create(reelXArr[l], AG_START_Y + AG_IMAGE_HEIGHT * winArr[i], 'border_bg');

                        var patternArr = agResponseObj.pattern;
                        var animIndex = patternArr[winArr[i]][l];
                        animIndex = getNumberIndex(animIndex) - 1;
                        
                        var startX = reelXArr[l] + parseInt(AG_IMAGE_HEIGHT / 2);
                        var startY = AG_START_Y + AG_IMAGE_HEIGHT * winArr[i] + parseInt(AG_IMAGE_HEIGHT / 2);

                        if(animIndex == 0) {
                            startX += 7;
                            startY -= 7;
                        } else if(animIndex == 1) {
                            startX += 7;
                            startY -= 4;
                        } else if(animIndex == 2) {
                            startX += 3;
                            startY -= 3;
                        }
                        else if(animIndex == 3) {
                            startX += 6;
                            startY -= 1;
                        } else if(animIndex == 4) {
                            startX += 7;
                            startY -= 7;
                        } else if(animIndex == 5) {
                            startX += 10;
                            startY -= 6;
                        } else if(animIndex == 9) {
                            startX += 50;
                            startY += 13;
                        } else if(animIndex == 15) {
                            startX += 6;
                            startY -= 11;
                        } else if(animIndex == 13) {
                            startY += 5;
                            startX += 1;
                        }

                        if(animIndex < 6) {
                            startY += 10;
                        } else {
                            startY -= 2;
                        }

                        var anim = animGroup.create(startX, startY, agSpinAnimArr[animIndex]);
                        var scaleSize = SpinAnimScale[animIndex];
                        anim.scale.setTo(scaleSize, scaleSize);

                        anim.anchor.setTo(0.5, 0.5);
                        anim.smoothed = false;
                        var animate = anim.animations.add();
                        animate.play(agSpinAnimCount[animIndex], true);
                        hideImageFromReel(l, winArr[i]);
                        
                        var borderAnim = animGroup.create(reelXArr[l], AG_START_Y + AG_IMAGE_HEIGHT * winArr[i], 'agWinBorder');
                        borderAnim.tint = lineColors[paylineIndex];
                        borderAnim.smoothed = false;
                        var borderAnimate = borderAnim.animations.add();
                        if(!isDefined) {
                            isDefined = true;
                            loopCounter = 0;
                            // anim.onStart.add(animationStarted, this);
                            borderAnimate.onLoop.add(animationLooped, this);
                            // anim.onComplete.add(animationStopped, this);
                        }
                        borderAnimate.play(1, true);
                    }
                    
                }
            }
        }

        /* There is no seperate in this game.
        var viewY = 386;
        for(var i = 1; i < 5; i++) {
            animGroup.create(rxp + (i * IMAGE_HEIGHT) - 13, viewY, 'seperate');
        }*/
        winCounter++;
        if(winCounter >= winlineArr.length) {
            winCounter = 0;
        }
    }

    function animationLooped() {
    
        loopCounter++;
        if(loopCounter >= 1) {
            loopCounter = 0;
            showAllImageOnReel();
            collectionColWin();
        }
    }

    function hideImageFromReel(reelId, itemId) {
        var selectedReel = agReelArr[reelId];
        var selectedGr   = selectedReel.getReelGroup();
        var selectedItem = selectedGr.getChildAt(itemId + 1);
        if(selectedItem != null) {
            selectedItem.visible = false;
        }
    }

    function showAllImageOnReel() {
        for(var i = 0; i < agReelArr.length; i++) {
            var reel = agReelArr[i];
            for(var j = 0; j < 5; j++) {
                var gr = reel.getReelGroup();
                var item = gr.getChildAt(j);
                item.visible = true;
            }
        }
    }
}



