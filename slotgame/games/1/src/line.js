var betLineView = function() {
	
	var main 			= this;
	var graph 			= game.add.graphics();

	var LX0 			= 612;
	var LX1 			= LX0 + IMAGE_HEIGHT / 2;
	var LX2 			= LX1 + IMAGE_HEIGHT;
	var LX3 			= LX2 + IMAGE_HEIGHT;
	var LX4 			= LX3 + IMAGE_HEIGHT;
	var LX5 			= LX4 + IMAGE_HEIGHT;
	var LX6 			= LX5 + IMAGE_HEIGHT / 2;

	var LY 				= new Array();
	LY[0] 				= 402;

	var lineNumberArr 	= [	4, 28, 2, 24, 20, 16, 10, 1, 11, 17, 13, 21, 3, 29, 5, 
							14, 26, 18, 12, 9, 22, 6, 30, 7, 23, 8, 19, 25, 27, 15];

	var lineColorArr 	= [	'0xffff01', '0x65ffac', '0xcc32cc', '0xff3200', '0x98cc01', '0xff98ff', '0x6633ff', '0x7eff6b', '0xc0ffb3', '0xff3265',
							'0x01cc00', '0x008b8c', '0xffb2b5', '0xff3200', '0xff6500', '0xffb600', '0x00ff86', '0x008900', '0x65d1ff', '0xfe65cb', 
							'0xe9ff78', '0xff3200', '0xff2ed0', '0x0098ff', '0xccff00', '0x98fe00', '0x00fff7', '0x8bf3f2', '0x00cda3', '0xff6666' ];

	main.initView = function() {
		//set Line Buttons
		var lineBX = 576;
		var lineBY = 360;
		var bX = lineBX;
		var bY = lineBY;
		var linebtnWidth = 40;
		var linebtnHeight = 25;

		for(var i = 0; i < linebtnImgArr.length; i++) {
			if(i < LINE_NUMBER) 
				bX = lineBX;
			else
				bX = lineBX + 732;
			if(i == LINE_NUMBER)
				bY = lineBY;
			bY = bY + linebtnHeight + 3;

			var btnImgID = linebtnImgArr[i];
	    	var button = game.add.button(bX, bY, btnImgID, showLines, this, 0, 0, 0);
			button.name = btnImgID;
			button.index = i;

			var cText = game.add.text(0, 0, lineNumberArr[i], lblStyle);
	    	//balanceText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
	    	cText.setTextBounds(bX, bY + 2, linebtnWidth, linebtnHeight);
		}

		initLinePointers();
	}

	function showLines(button) {

		var btnId = button.index; 
		var lineCount = lineNumberArr[btnId];
		
		main.drawLinewithCount(lineCount);
	}

	main.hideLines = function() {
		graph.visible = false;
	}

	main.drawLinewithCount = function(lcount) {
		linesValue = lcount;
		linesValueText.text = linesValue;
		drawLine(linesValue);
		setTotalValue();
	}

	function drawLine(lcount) {

		var linewidth = 6;

		graph.clear();
		for(var i = 0; i < lcount; i++) {
			var xPointArry = lineXPoints[i];
			var yPointArry = lineYPoints[i];

			if(xPointArry.length != yPointArry.length) {
				consol.log('points is wrong : ' + i);
			}
			var pcount = xPointArry.length;

			
			graph.lineStyle(linewidth, lineColorArr[i]);	

			for(var j = 1; j < pcount; j++) {
				graph.moveTo(xPointArry[j - 1], yPointArry[j - 1]);
	    		graph.lineTo(xPointArry[j], yPointArry[j]);
			}
			
		}
		graph.visible = true;
	}
	
	function initLinePointers() {

		for(var i = 1; i <15; i++) {
			LY[i] = LY[i - 1] + 28;
		}

		var ymargin = 10;
		var xmargin = 10;
		var linewidth = 4;

		lineXPoints = new Array();
		lineXPoints[0] = [LX0, LX6];
		lineXPoints[1] = [LX0, LX6];
		lineXPoints[2] = [LX0, LX6];
		lineXPoints[3] = [LX0, LX3, LX6];
		lineXPoints[4] = [LX0, LX3, LX6];
		lineXPoints[5] = [LX0, LX1, LX2, LX4, LX5, LX6];
		lineXPoints[6] = [LX0, LX1, LX2, LX4, LX5, LX6];
		lineXPoints[7] = [LX0, LX2, LX4, LX6];
		lineXPoints[8] = [LX0, LX2, LX4, LX6];
		lineXPoints[9] = [LX0, LX1, LX2, LX4, LX5 - xmargin, LX6];
		lineXPoints[10] = [LX0, LX1, LX2, LX4, LX5 - xmargin, LX6];
		lineXPoints[11] = [LX0, LX1, LX2, LX4 - xmargin, LX5 - xmargin, LX6];
		lineXPoints[12] = [LX0, LX1 + xmargin, LX2, LX4 - xmargin, LX5 - xmargin, LX6];
		lineXPoints[13] = [LX0, LX1 - xmargin, LX2, LX3, LX4, LX5, LX6];
		lineXPoints[14] = [LX0, LX1 - xmargin, LX2, LX3, LX4, LX5, LX6];
		lineXPoints[15] = [LX0, LX1 + xmargin, LX2 + xmargin, LX3, LX4 - xmargin, LX5, LX6];
		lineXPoints[16] = [LX0, LX1, LX2, LX3 - xmargin, LX4 - xmargin, LX5, LX6];
		lineXPoints[17] = [LX0, LX2 - xmargin, LX3, LX4 + xmargin, LX6];
		lineXPoints[18] = [LX0, LX2 - xmargin, LX3, LX4 + xmargin, LX6];
		lineXPoints[19] = [LX0, LX1, LX2 + xmargin, LX4 - xmargin, LX5, LX6];
		lineXPoints[20] = [LX0, LX1, LX2 + xmargin, LX4 - xmargin, LX5, LX6];
		lineXPoints[21] = [LX0, LX1, LX2, LX3 - linewidth, LX4 - xmargin, LX5 - xmargin, LX6];
		lineXPoints[22] = [LX0, LX1, LX2, LX3 - linewidth, LX4 - xmargin, LX5 - xmargin, LX6];
		lineXPoints[23] = [LX0, LX1 - xmargin, LX2, LX3, LX4, LX5 + xmargin, LX6];
		lineXPoints[24] = [LX0, LX1 + xmargin, LX2, LX3, LX4, LX5 - xmargin, LX6];
		lineXPoints[25] = [LX0, LX1 + xmargin, LX2 - xmargin, LX4, LX5, LX6];
		lineXPoints[26] = [LX0, LX1 - xmargin, LX2 + xmargin, LX4, LX5, LX6];
		lineXPoints[27] = [LX0, LX1 - xmargin, LX2, LX3, LX4, LX5 + linewidth, LX6];
		lineXPoints[28] = [LX0, LX1 - xmargin, LX2, LX3, LX4, LX5 + linewidth, LX6];
		lineXPoints[29] = [LX0, LX1 + xmargin, LX3, LX4 + xmargin, LX5, LX6];

		lineYPoints = new Array();
		lineYPoints[0] = [LY[7], LY[7]];
		lineYPoints[1] = [LY[2], LY[2]];
		lineYPoints[2] = [LY[12], LY[12]];
		lineYPoints[3] = [LY[0], LY[12], LY[0]];
		lineYPoints[4] = [LY[14], LY[2] + ymargin, LY[14]];
		lineYPoints[5] = [LY[6], LY[6], LY[2] +ymargin, LY[2] +ymargin, LY[6], LY[6]];
		lineYPoints[6] = [LY[8], LY[8], LY[12] +ymargin, LY[12] +ymargin, LY[8], LY[8]];
		lineYPoints[7] = [LY[4] - linewidth, LY[4] - linewidth, LY[10], LY[10]];
		lineYPoints[8] = [LY[10] - linewidth, LY[10] - linewidth, LY[4] - linewidth, LY[4] - linewidth];
		lineYPoints[9] = [LY[6] - linewidth, LY[6] - linewidth, LY[12] - linewidth, LY[3], LY[6] - linewidth, LY[6] - linewidth];
		lineYPoints[10] = [LY[8] - linewidth, LY[8] - linewidth, LY[3] - linewidth, LY[12], LY[8] - linewidth, LY[8] - linewidth];
		lineYPoints[11] = [LY[3], LY[3], LY[8], LY[8], LY[3], LY[3]];
		lineYPoints[12] = [LY[10] - linewidth, LY[10]-linewidth, LY[7] - ymargin, LY[7] - ymargin, LY[10] - linewidth, LY[10]-linewidth];
		lineYPoints[13] = [LY[0] -linewidth, LY[0] -linewidth, LY[6] + ymargin, LY[2] + ymargin, LY[6] + ymargin, LY[0] -linewidth, LY[0] -linewidth];
		lineYPoints[14] = [LY[14], LY[14], LY[8], LY[13], LY[8], LY[14], LY[14]];
		lineYPoints[15] = [LY[5], LY[7] - ymargin, LY[7] - ymargin, LY[2] - linewidth, LY[7] - ymargin, LY[7] - ymargin, LY[5]];
		lineYPoints[16] = [LY[9], LY[7] + ymargin, LY[7] + ymargin, LY[12] - linewidth, LY[7] + ymargin, LY[7] + ymargin, LY[9]];
		lineYPoints[17] = [LY[2] + linewidth, LY[2] + linewidth, LY[11], LY[2] + linewidth, LY[2] + linewidth];
		lineYPoints[18] = [LY[11] + linewidth, LY[11] + linewidth, LY[4], LY[11] + linewidth, LY[11] + linewidth];
		lineYPoints[19] = [LY[4], LY[2] + ymargin, LY[12] - ymargin, LY[12] - ymargin, LY[2] + ymargin, LY[4]];
		lineYPoints[20] = [LY[11], LY[12] + ymargin, LY[4] - linewidth, LY[4] - linewidth, LY[12] + ymargin, LY[11]];
		lineYPoints[21] = [LY[5] + linewidth, LY[5] + linewidth, LY[11] - ymargin, LY[4], LY[11] - ymargin, LY[5] + linewidth, LY[5] + linewidth];
		lineYPoints[22] = [LY[8] - linewidth, LY[8] - linewidth, LY[5] - ymargin, LY[11] - ymargin, LY[5] - ymargin, LY[8] - linewidth, LY[8] - linewidth];
		lineYPoints[23] = [LY[3] - linewidth, LY[3] - linewidth, LY[11], LY[2] + linewidth, LY[11], LY[3] - linewidth, LY[3] - linewidth];
		lineYPoints[24] = [LY[12], LY[12], LY[4], LY[12] - linewidth, LY[4], LY[12], LY[12]];
		lineYPoints[25] = [LY[10] + linewidth, LY[10] + linewidth, LY[2] + linewidth, LY[10] + linewidth, LY[1], LY[1]];
		lineYPoints[26] = [LY[4] - linewidth, LY[4] - linewidth, LY[12] + ymargin, LY[3] + linewidth, LY[13] + linewidth, LY[13] + linewidth];
		lineYPoints[27] = [LY[1], LY[1], LY[12] - ymargin, LY[7] - ymargin, LY[12] - ymargin, LY[1], LY[1]];
		lineYPoints[28] = [LY[13], LY[13], LY[4] - ymargin, LY[8], LY[4] - ymargin, LY[13], LY[13]];
		lineYPoints[29] = [LY[12] - linewidth, LY[12] - linewidth, LY[3], LY[3], LY[7], LY[7]];
	}	
}

