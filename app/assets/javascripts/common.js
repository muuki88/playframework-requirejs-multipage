(function(requirejs) {
    "use strict";

    requirejs.config({
        baseUrl : "/assets/javascripts",
        shim : {
            "jquery" : {
                exports : "$"
            },
            "jsRoutes" : {
                exports : "jsRoutes"
            }
        },
        paths : {
            "math" : "lib/math",
            // Map the dependencies to CDNs or WebJars directly
            "_" : "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.1/underscore-min",
            "jquery" : "//localhost:9000/webjars/jquery/2.0.3/jquery.min",
            "bootstrap" : "//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min",
            "jsRoutes" : "//localhost:9000/jsroutes"
        // A WebJars URL would look like
        // //server:port/webjars/angularjs/1.0.7/angular.min
        }
    });

    requirejs.onError = function(err) {
        console.log(err);
    };
})(requirejs);