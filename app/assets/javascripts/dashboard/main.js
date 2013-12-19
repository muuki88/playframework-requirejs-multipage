require(["../common"], function(common) {
   console.log('Dashboard started');
   require(["jquery", "math", "dashboard/chart"], function($, math, chart){
       console.log("Title is : " + $('h1').text());
       console.log("1 + 3 = " + math.sum(1,3));
       console.log(chart);
       
       chart.load({ page : 'dashboard'}, function(data){
           console.log(data);
       }, function(status, xhr, error) {
           console.log(status);
       });
       
   });
});