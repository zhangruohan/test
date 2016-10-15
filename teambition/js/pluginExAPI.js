//Public PluginEx API
var YoMailPluginEx = (function(){
    var pluginID = "";
    var plugin_domain;
    var target_plugin;
    function objQuery(jsonObj, onSuccess, onError) {
        window.cefQuery({
            request: JSON.stringify(jsonObj),
            onSuccess: function(json_result){
                var result = json_result;
                if(json_result){
                    result = JSON.parse(json_result);
                }
                if(onSuccess) {
                    onSuccess(result);
                }
            },
            onFailure: function(error_json) {
                var result = JSON.parse(error_json);
                if(onError) {
                    onError(result);
                }
            }
        });
    }
    function invokePluginExJS(guid,jsString) {
        objQuery({
            uri: '/yomail/pluginEx',
            event : 'cross_invoke',
            pluginID : guid,
            jsCode : jsString
        });
    }
    function sendMessageToPlugin(from_id,to_id,msg_id,expire, jsString) {
        objQuery({
            uri: '/yomail/pluginEx/action',
            event : 'send_message',
            from : from_id,
            toId : to_id,
            msgId : msg_id,
            expire: expire,
            jsCode : jsString
        });
    }
    var pluginAction = function(pName){
        var sendMessage = function(msg_id, user_account, content){
            var json_req = {
                uri : "/yomail/pluginEx/query",
                event : "query_plugin",
                domain : plugin_domain
            };
            objQuery(json_req, 
                function(result){
                    target_plugin = result[pName];
                    // var json_req = {
                    //     from : pluginID,
                    //     to : target_guid,
                    //     msgId : msg_id,
                    //     expirt: 3000,
                    // };
                    var jsCode = {};
                    jsCode.method = "handleMessage";
                    jsCode.parameter = {"thirdAccount":JSON.parse(user_account),"message": content};
                    sendMessageToPlugin(pluginID, target_plugin, msg_id, 3000, JSON.stringify(jsCode));
                },
                function(){});
        };
        var openWindow = function(user_account){
            var jsCode = {};
            jsCode.method = "openWindow";
            jsCode.parameter = {"thirdAccount":JSON.parse(user_account)};
            invokePluginExJS(pluginID, JSON.stringify(jsCode));
        };
        var queryAccount = function(email, cb){
            var json_req = {
                uri : "/yomail/pluginEx/query",
                event : "query_plugin",
                domain : plugin_domain
            };
            objQuery(json_req,
                function(result){
                    if(result['error'] == 0){
                        target_plugin = result[pName];
                        var json_req = {
                            uri : "/yomail/pluginEx/check",
                            event : 'check_account',
                            email : email,
                            pluginId: target_plugin
                        }
                        objQuery(json_req,
                            function(result){
                                cb(result);
                            },
                            function(){});
                    }
                    else{
                        cb(result);
                    } 
                },
                function(){});   
        };
        return{
            sendMessage : sendMessage,
            openWindow : openWindow,
            queryThirdAccount : queryAccount
        }
    };

    var plugin = function(plugin_ns){
        plugin_domain = plugin_ns;
        var getObject = function(plugin_name){
            return pluginAction(plugin_name);
        }
        return{
            get:getObject
        }
    };
    return{
        openWindow : function(){
            var json_req = {
                event : "switch_window"
            }
            objQuery(json_req);
        },
        ShowToast : function(msg){
            var json_req = {
                event : "system_toast",
                message : msg
            }
            objQuery(json_req);
        },
        notifyNativeWindow : function (message_count){
            var json_req = {
                event:"new_message",
                count:message_count
            };
            objQuery(json_req);
        },
        sendNewMessage : function (user){
            var json_req = {
                event: "new_message_arrival",
                from : user
            };
            objQuery(json_req);
        },
        sendEmailByYomail : function(user, avatar, callFun){
            var json_req = {
                event: "send_email",
                userInfo : user,
                avatar : avatar
            }
            objQuery(json_req, 
            function(result){
                callFun(result);
            },
            function(result){

            });
        },
        selfCheck : function(user, avatar, callFun){
            var json_req = {
                event: "self_check",
                userInfo : user,
                avatar : avatar
            }
            objQuery(json_req, 
            function(result){
                callFun(result);
            },
            function(result){
            });
        },
        query : function(pluginNS){
            return plugin(pluginNS);
        },
        init : function(guid){
            pluginID = guid;
        }
    }
})();