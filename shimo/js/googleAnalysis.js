var GoogleAnalytics = (function(){
    function httpPostAsync(theUrl, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
                //callback(xmlHttp.responseText);
            }
        }
        xmlHttp.open("POST", theUrl, true);
        xmlHttp.send(null);
    }
    
    function googleAnalyticsURL(cid, hitType, parameter) {
        var protocol = "https://";
        var host = "ssl.google-analytics.com";
        var method = "/collect";
        var args = {v: 1, tid: "UA-83005875-1"};
        args['cid'] = cid;
        args['t'] = hitType;
        for (var arg in parameter) {
            args[arg] = parameter[arg];
        }
        var url = protocol + host + method + "?";
        for (var arg in args) {
            var par = arg + "=" + encodeURIComponent(args[arg]) + "&";
            url += par;
        }
        return url.substring(0, url.length-1);
    }
    function eventURL(cid, ec, parameter) {
        parameter['ec'] = ec;
        return googleAnalyticsURL(cid, "event", parameter);
    }
    function pluginURL(cid, eventAction, eventLabel) {
        return eventURL(cid, "plugin", {ea: eventAction, el: eventLabel});
    }
    return{
        pluginUse: function (cid, pluginName) {
            var url = pluginURL(cid, "Bind", pluginName);
            httpPostAsync(url);
        }
    }
})();