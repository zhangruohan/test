//Golobal Namespace
var YoMailEx = YoMailEx || {};
(function(){
    var pluginID = 'c308a347cadcfbc74c43505110fb6f59';
    function sendEmailToWeb(emailId) {
        vmodel.emails.forEach(function (email) {
            if(email['emailId'] == emailId){
                var simpleEmail = {};
                simpleEmail.subject = email.subject;
                simpleEmail.content = email.content;
                var jsCode = {};
                jsCode.method = 'sendEmailToCurrentChat';
                jsCode.parameter = simpleEmail;
                nativeBridge.invokePluginExJS(pluginID, JSON.stringify(jsCode));
                return;
            }
        });
    };
    var lang = YoGlobals.locale;
    var menu = {
        id : 'WhatsApp',
        name: 'WhatsApp',
        onClick: function(emailId){
            sendEmailToWeb(emailId);
        },
        shouldAddMenuItem: function(emailId) {
            return true;
        }
    }
    app.registerMenuItem(menu);
})();