/***********************
* Adobe Edge Animate Composition Actions
*
* Edit this file with caution, being careful to preserve 
* function signatures and comments starting with 'Edge' to maintain the 
* ability to interact with these actions from within Adobe Edge Animate
*
***********************/

    $('#ppp').click(function()
    {
        AdobeEdge.symbol;
    });


(function($, Edge, compId){
var Composition = Edge.Composition, Symbol = Edge.Symbol; // aliases for commonly used Edge classes


   //Edge symbol: 'stage'
   (function(symbolName) {
      
      
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 12877, function(sym, e) {
         sym.stop();
         
         var value = 0;
         var stop = 4.95;
         var time = 18;
         var increment = 0.01;
         
         var myInterval = setInterval(function () {
         
         	if( value < stop ){
         		value = value+increment;
         		sym.$("down").text(value.toFixed(2));
         	}else{
         		clearInterval(myInterval);
         		sym.play();
         	}
         }, time);

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 15250, function(sym, e) {
         sym.stop();
         
         var value = 0;
         var stop = 5.71;
         var time = 15;
         var increment = 0.01;
         
         var myInterval = setInterval(function () {
         
         	if( value < stop ){
         		value = value+increment;
         		sym.$("up").text(value.toFixed(2));
         	}else{
         		clearInterval(myInterval);
         	}
         }, time);

      });
      //Edge binding end

      

      

      Symbol.bindElementAction(compId, symbolName, "${btn}", "click", function(sym, e) {
         sym.play();
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 30127, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 32000, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      

   })("stage");
   //Edge symbol end:'stage'

   //=========================================================
   
   //Edge symbol: 'smp-zoom-chart-2'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 8000, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

   })("smp-zoom-chart-2");
   //Edge symbol end:'smp-zoom-chart-2'

   //=========================================================
   
   //Edge symbol: 'slide1'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 6500, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${btn}", "click", function(sym, e) {
         sym.play();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 11500, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 17500, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 25500, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

   })("slide1");
   //Edge symbol end:'slide1'

   //=========================================================
   
   //Edge symbol: 'zero-touch'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2250, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

   })("zero-touch");
   //Edge symbol end:'zero-touch'

   //=========================================================
   
   //Edge symbol: 'VoLTE-chart'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2500, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

   })("VoLTE-chart");
   //Edge symbol end:'VoLTE-chart'

   //=========================================================
   
   //Edge symbol: 'chatbot-chart'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 12877, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

   })("chatbot-chart");
   //Edge symbol end:'chatbot-chart'

   //=========================================================
   
   //Edge symbol: 'config-vowifi-screens'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1000, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2000, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 3000, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 4000, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 5000, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 6000, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 7000, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${btn}", "click", function(sym, e) {
         sym.play();

      });
      //Edge binding end

   })("config-vowifi-screens");
   //Edge symbol end:'config-vowifi-screens'

   //=========================================================
   
   //Edge symbol: 'speedomter'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 10000, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

   })("speedomter");
   //Edge symbol end:'speedomter'

   //=========================================================
   
   //Edge symbol: 'subscrber-analytics'
   (function(symbolName) {   
   
   })("subscrber-analytics");
   //Edge symbol end:'subscrber-analytics'

   //=========================================================
   
   //Edge symbol: 'chatbot-chart_1'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 12877, function(sym, e) {
         sym.stop();
		 console.log('ddd');
		parent.$(parent.document).trigger('close_slide');
      });
         //Edge binding end

      })("chatbot-chart_2");
   //Edge symbol end:'chatbot-chart_2'

   //=========================================================
   
   //Edge symbol: 'chatbot-chart_1'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 12877, function(sym, e) {
         sym.stop();

      });
         //Edge binding end

      })("chatbot-chart_1");
   //Edge symbol end:'chatbot-chart_1'

})(window.jQuery || AdobeEdge.$, AdobeEdge, "asdasd-part2");

