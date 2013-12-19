define([ "../common", "jsRoutes" ], {
    load : function(data, onSuccess, onFail) {
        var r = jsRoutes.controllers.Application.sample();
        r.contentType = 'application/json';
        r.data = JSON.stringify(data);
        $.ajax(r).done(onSuccess).fail(onFail);
    }
})
