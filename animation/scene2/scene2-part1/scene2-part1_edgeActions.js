/***********************
* Adobe Edge Animate Composition Actions
*
* Edit this file with caution, being careful to preserve 
* function signatures and comments starting with 'Edge' to maintain the 
* ability to interact with these actions from within Adobe Edge Animate
*
***********************/
(function($, Edge, compId){
var Composition = Edge.Composition, Symbol = Edge.Symbol; // aliases for commonly used Edge classes

   //Edge symbol: 'stage'
   (function(symbolName) {
      
      
   })("stage");
   //Edge symbol end:'stage'

   //=========================================================
   
   //Edge symbol: 'smp-zoom-chart-2'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 21000, function(sym, e) {
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

})(window.jQuery || AdobeEdge.$, AdobeEdge, "scene2-part1");