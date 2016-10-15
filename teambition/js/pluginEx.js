//Golobal Namespace
var YoMailEx = YoMailEx || {};
(function(){
    var pluginID = "cb93d44913cb48er85b942810fc19788";

    function sendEmailToWeb(emailId) {
        vmodel.emails.forEach(function (email) {
            if(email['emailId'] == emailId){
                var simpleEmail = {};
                simpleEmail.subject = email.subject;
                simpleEmail.content = email.content;
                var jsCode = {};
                jsCode.method = "createTeambitionTask";
                jsCode.parameter = simpleEmail;
                nativeBridge.invokePluginExJS(pluginID, JSON.stringify(jsCode));
                return;
            }
        });
    };
    var lang = YoGlobals.locale;
    var menu = {
        id : "teambition",
        name: "Teambition",
        onClick: function(emailId){
            sendEmailToWeb(emailId);
        },
        shouldAddMenuItem: function(emailId) {
            return true;
        }
    }
    app.registerMenuItem(menu);
})();