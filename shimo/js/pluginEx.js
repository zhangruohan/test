//Golobal Namespace
var YoMailEx = YoMailEx || {};
(function(){
    var pluginID = '08c3a347cadcfbc74c43505110fb6f59';
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
    var name = (lang === 'en')? 'ShiMo':'石墨';
    var menu = {
        id : 'shimo',
        name: name,
        onClick: function(emailId){
            sendEmailToWeb(emailId);
        },
        shouldAddMenuItem: function(emailId) {
            return true;
        }
    }
    app.registerMenuItem(menu);
})();