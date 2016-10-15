//Golobal NameSpace
var YoMailEx = YoMailEx || {};
(function () {
    // initialize operation
    var pluginID = "c308a347cadcfbc74c43505110fb6f59";
    YoMailPluginEx.init(pluginID);
    YoMailEx.event = function (event) {
        YoWhatsapp[event.method](event.parameter);
    }
    // get contact info
    var allContact,allContactInfoArr,chattingContact,chattingContactInfoArr;
    var getContactInfo = function () {
        allContactInfoArr = [];
        chattingContactInfoArr = [];
        allContact = window.Store.Contact.models;
        chattingContact = window.Store.Chat.models;
        for(var i=0;i<allContact.length - 2;i++){
            allContactInfoArr[i] = [];
            allContactInfoArr[i].push(allContact[i].formattedName);
            allContactInfoArr[i].push('+' + allContact[i].id.match(/\d+/)[0]);
        }
        for(var j=0;j<chattingContact.length;j++){
            chattingContactInfoArr[j] = [];
            chattingContactInfoArr[j].push(chattingContact[j].formattedTitle);
            chattingContactInfoArr[j].push('+' + chattingContact[j].id.match(/\d+/)[0]);
        }
    }
    var adjustWidth = function () {
        var target = document.getElementsByClassName('emojitext ellipsify');
        for(var i=0;i<target.length;i++){
            if(target[i].parentNode.className === 'chat-status' && target[i].innerText.length > 15){
                target[i].innerText = target[i].innerText.slice(0,15) + '...';
            }
        }
    }
    var sendEmailToContact = function () {
        // css
        var style = document.createElement('style');
        style.id = 'addtionalStyle';
        style.innerText = '#addtionalYomail{display:none;position:fixed;z-index:10000;cursor:pointer;background:url("yomailplugin://c308a347cadcfbc74c43505110fb6f59/img/yomail.png") no-repeat;background-size:16px 16px;width:16px;height:16px;}' +
            '@media(-webkit-min-device-pixel-ratio: 1.98),(min-resolution: 192dpi) {#addtionalYomail{background: url("yomailplugin://c308a347cadcfbc74c43505110fb6f59/img/yomail@h.png") no-repeat;}}';
        if(! document.getElementById('addtionalStyle')){
            document.head.appendChild(style);
        }
        // icon
        var yomail = document.createElement('div');
        yomail.id = 'addtionalYomail';
        if(! document.getElementById('addtionalYomail')){
            document.body.appendChild(yomail);
        }
        // main
        var x = 0,y,z,currentContactNode;
        var number = function (node,type) {
            var all,allNum = [];
            if(type === 0){
                all = document.getElementsByClassName('drawer-container-left flow-drawer-container')[0].getElementsByClassName('infinite-list-item-transition');
            }else{
                all = document.getElementsByClassName('pane pane-list pane-one')[0].getElementsByClassName('infinite-list-item-transition');
            }
            for(var i=0;i<all.length;i++){
                allNum.push(parseInt(all[i].style.transform.match(/\d+%/)));
            }
            allNum.sort(function (a,b) {
                return a - b;
            })
            for(var j=0;j<allNum.length;j++){
                if(parseInt(node.parentNode.parentNode.parentNode.style.transform.match(/\d+%/)) === allNum[j]){
                    if(type === 0){
                        y = j;
                    }else{
                        z = j;
                    }
                    break;
                }
            }
        }
        var onMouseLeave = function (node) {
            node.onmouseleave = function () {
                setTimeout(function () {
                    if(x === 0){
                        yomail.style.display = 'none';
                    }
                },0)
            }
        }
        document.addEventListener('mouseover',function (e) {
            var target = e.target,position,adjustPostion,offsetLeft;
            if(target.className === 'chat-avatar' || target.className === 'chat-body' && target.parentNode.className !== 'pane-header pane-chat-header'){
                if(target.parentNode.className === 'contact chat'){
                    z = -1;
                    number(target,0);
                }else{
                    y =  -1;
                    number(target,1);
                }
                onMouseLeave(target.parentNode.parentNode.parentNode.parentNode);
                position = target.parentNode.getBoundingClientRect();
                adjustPostion = target.parentNode.getElementsByClassName('chat-status')[0].getBoundingClientRect();
                yomail.style.display = 'block';
                yomail.style.top = (z === -1)? (position.top + (position.height - 16)/2 + 'px'):(adjustPostion.top + (adjustPostion.height - 16)/2 + 'px');
                offsetLeft = (target.parentNode.className === 'contact chat')? 25:55;
                yomail.style.left = position.right - offsetLeft + 'px';
                currentContactNode = target.parentNode;
            }
        })
        document.addEventListener('click',function (e) {
            var target = e.target,contactInfoObj;
            if(target.id === 'addtionalYomail'){
                if(y === -1){
                    contactInfoObj = {'nickname':chattingContactInfoArr[z][0],'account':chattingContactInfoArr[z][1]};
                }else if(z === -1){
                    contactInfoObj = {'nickname':allContactInfoArr[y][0],'account':allContactInfoArr[y][1]};
                }
                YoMailPluginEx.selfCheck(JSON.stringify(contactInfoObj), '', function (result) {
                    if (!result.error) {
                        YoMailPluginEx.sendEmailByYomail(JSON.stringify(contactInfoObj), '',function(result){
                            GoogleAnalytics.pluginUse(clientID, 'Whatsapp');
                        });
                    }
                })
            }
        })
        yomail.onmouseenter = function () {
            currentContactNode.style.cssText = 'background-color:#f4f5f5';
            x = 1;
        }
        yomail.onmouseleave = function () {
            currentContactNode.style.cssText = '';
            x = 0;
        }
    }
    // count the unread message
    var count = null,sendersObj = {},isInitial = 0;
    var unreadMsg = function () {
        var num,sum = 0,senderName,sendersAgentObj = {};
        var notificationList = document.getElementsByClassName("unread-count");
        if(notificationList.length){
            for(var i=0;i<notificationList.length;i++){
                senderName = notificationList[i].parentNode.parentNode.parentNode.parentNode.previousSibling.firstElementChild.firstElementChild.getAttribute('title');
                num = pareseInt(notificationList[i].innerText);
                if(isInitial && num !== sendersObj[senderName]){
                    YoMailPluginEx.sendNewMessage(senderName);
                }
                sendersAgentObj[senderName] = num;
                sum += num;
            }
            sendersObj = sendersAgentObj;
        }else{
            sendersObj = {};
        }
        if(sum !== count){
            count = sum;
            YoMailPluginEx.notifyNativeWindow(sum);
        }
    }
    // startup operation
    window.onload = function () {
        unreadMsg();
        isInitial = 1;
        var observer = new MutationObserver(function (mutations) {
            unreadMsg();
            getContactInfo();
            adjustWidth();
        });
        observer.observe(document, {childList: true, attributes: true, characterData: true, subtree: true});
        sendEmailToContact();
    }
})();
