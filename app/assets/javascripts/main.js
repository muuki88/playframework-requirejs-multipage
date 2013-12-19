(function(requirejs) {
  "use strict";

  // -- PROD RequireJS config --
  requirejs.config({
    packages: ["main"],
    shim: {
      "jquery": {
        exports: "$"
      }
  /*
      "jsRoutes" : {
        deps : [],
        // it's not a RequireJS module, so we have to tell it what var is returned
        exports : "jsRoutes"
      }
  */
    },
    paths: {
      // Map the dependencies to CDNs or WebJars directly
      "_" : "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.1/underscore-min",
      //"jquery": "//code.jquery.com/jquery-2.0.3.min"
      "jquery": "//localhost:9000/webjars/jquery/2.0.3/jquery.min",
      "bootstrap": "//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min"
      // TODO Replace with your server URL; this isn't perfect yet
      //"jsRoutes": "//localhost:9000/jsroutes"
      // A WebJars URL would look like //server:port/webjars/angularjs/1.0.7/angular.min
    }
  });

  requirejs.onError = function(err) {
    console.log(err);
  };

  // Make sure generic external scripts are loaded
  //require(["angular", "app", "angular-cookies", "jquery", "bootstrap"], function(angular, app) {
  //  angular.bootstrap(document, ["app"]);
  //});
})(requirejs);

require(["jquery", "_"], function() {
    console.log('started');
    console.log($);
    console.log(_);
});