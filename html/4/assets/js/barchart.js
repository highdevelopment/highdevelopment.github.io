$(document).ready(function() {
  $.getScript('assets/js/Chart.js',function(){
    
      var data = {
          labels : ["Rating","Rating","Rating","Rating","Rating"],
          datasets : [
              {
                  fillColor : "rgba(113,192,238,0.5)",
                  strokeColor : "rgba(113,192,238,1)",
                  pointColor : "rgba(113,192,238,1)",
                  pointStrokeColor : "#fff",
                  data : [65,59,90,81,56,55,40]
              },
              {
                  fillColor : "rgba(88,128,224,0.5)",
                  strokeColor : "rgba(88,128,224,1)",
                  pointColor : "rgba(88,128,224,1)",
                  pointStrokeColor : "#fff",
                  data : [28,48,40,19,96,27,100]
              }
          ]
      }
  
      var options = {
          animation: true
      };
  
      //Get the context of the canvas element we want to select
      var c = $('#myChart');
      var ct = c.get(0).getContext('2d');
      var ctx = document.getElementById("myChart").getContext("2d");
      /*********************/
      new Chart(ctx).Bar(data,options);
  
  })
});