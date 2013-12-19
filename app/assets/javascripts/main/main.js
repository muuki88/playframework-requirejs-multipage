require(["../common"], function(common) {
   console.log('Index started');
   require(["jquery"], function($){
      console.log($('h1').text());
   });
});