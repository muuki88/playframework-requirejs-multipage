# Playframework 2.2.x and RequireJS

[RequireJS](http://requirejs.org/docs/api.html) and [Play](http://www.playframework.com/) can
get along quite nicely. You just have to know how.

# Application structure

The basic structure is as follows

```
GET    /                controllers.Application.index
GET    /dashboard       controllers.Application.dashboard
POST   /api/sample      controllers.Application.sample

### Additions needed
GET    /jsroutes.js     controllers.Application.jsRoutes()
### Enable www.WebJars.org based resources to be returned
GET    /webjars/*file   controllers.WebJarAssets.at(file)

```

The javascript folder layout looks like this


```
assets/javascripts/
    common.js
    main.js
    dasbhoard/
        chart.js
        main.js
    lib/
        math.js

```

# How does it work

First you define a file `common.js`, which is used to configure
requirejs.

```javascript
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
```

The `baseUrl` is important, as this will be the root path from now on. IMHO
this makes things easier than, relative paths.

The `shim` configuration is used to export your `jsRoutes`, which is defined
in my `Application.scala` file. Of course you can add as many as you want.

The `paths` section is a bit tricky. Currently it seems there's no better
way than hardcoding the urls, like `"jsRoutes" : "//localhost:9000/jsroutes"`,
when you use [WebJars](webjars.org).


# Define and Require

Ordering is crucial! For my `/dasbhoard` page the `/dasbhoard/main.js` is my
[entry point](http://requirejs.org/docs/api.html#data-main)


```javascript
// first load the configuration
require(["../common"], function(common) {
   console.log('Dashboard started');
   
   // Then load submodules. Remember the baseUrl is set:
   // Even you are in the dasboard folder you have to reference dashboard/chart
   // directly
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
```

For the `chart.js` 

```javascript
// first the configuration, then other dependencies
define([ "../common", "jsRoutes" ], {
    load : function(data, onSuccess, onFail) {
        var r = jsRoutes.controllers.Application.sample();
        r.contentType = 'application/json';
        r.data = JSON.stringify(data);
        $.ajax(r).done(onSuccess).fail(onFail);
    }
})
```

# Links

* [RequireJS](http://requirejs.org/docs/api.html)
* [Play and RequireJS](http://www.playframework.com/documentation/2.2.x/RequireJS-support)
* [RequireJS Multipage](https://github.com/requirejs/example-multipage)
