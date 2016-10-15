(function keywordSearch() {
    // 生成并获取searchBtn
    var ms_div_search = document.createElement('div');
    ms_div_search.id = 'ms_search';
    document.body.appendChild(ms_div_search);
    var ms_search = document.getElementById('ms_search');
    document.body.onmouseleave = function(){
        ms_search.style.display = 'none';
    }
    // 生成并获取searchGroup
    var ms_div_group = document.createElement('div');
    ms_div_group.id = 'ms_group';
    document.body.appendChild(ms_div_group);
    var ms_group = document.getElementById('ms_group');
    // 生成具体的input
    var ms_input;
    for (var i = 1; i <= 5; i++) {
        ms_input = document.createElement('input');
        ms_input.id = 'ms_search_' + i;
        switch (i) {
            case 2:
                ms_input.readOnly = 'readonly';
                break;
            case 3:
                ms_input.type = 'button';
                break;
            case 4:
                ms_input.type = 'button';
                break;
            case 5:
                ms_input.type = 'button';
                break;
        }
        ms_group.appendChild(ms_input);
    }
    var ms_search_1 = document.getElementById('ms_search_1');
    var ms_search_2 = document.getElementById('ms_search_2');
    var ms_search_3 = document.getElementById('ms_search_3');
    var ms_search_4 = document.getElementById('ms_search_4');
    var ms_search_5 = document.getElementById('ms_search_5');
    ms_search_1.onfocus = function () {
        this.style.cssText = 'border:2px solid #86cfff;width:101px;height:18px';
        ms_search_2.style.cssText = 'border:2px solid #86cfff;width:61px;height:18px';
    }
    ms_search_1.onblur = function () {
        this.style.cssText = 'border:1px solid #bbb;width:102px;height:20px';
        ms_search_2.style.cssText = 'border:1px solid #bbb;width:62px;height:20px';
    }
    // CSS hack
    var ms_hack = navigator.userAgent;
    if (ms_hack.indexOf('Windows NT 5.1') != -1 || ms_hack.indexOf('Windows NT 5.2') != -1) {   // XP系统
        ms_search_1.onfocus = function () {
            this.style.cssText = 'border:2px solid #86cfff;width:101px;height:18px;top:-10px';
            ms_search_2.style.cssText = 'border:2px solid #86cfff;width:61px;height:18px;top:-10px';
        }
        ms_search_1.onblur = function () {
            this.style.cssText = 'border:1px solid #bbb;width:102px;height:20px;top:-10px';
            ms_search_2.style.cssText = 'border:1px solid #bbb;width:62px;height:20px;top:-10px';
        }
        ms_search_3.style.top = '-5px';
        ms_search_4.style.top = '-5px';
        ms_search_5.style.top = '0px';
    } else if (ms_hack.indexOf('Mac OS X') != -1) {    // MAC系统
        ms_search_1.onfocus = function () {
            this.style.cssText = 'border:2px solid #86cfff;width:100px;height:18px;top:-8px';
            ms_search_2.style.cssText = 'border:2px solid #86cfff;width:60px;height:18px;top:-8px';
        }
        ms_search_1.onblur = function () {
            this.style.cssText = 'border:1px solid #bbb;width:101px;height:20px;top:-8px';
            ms_search_2.style.cssText = 'border:1px solid #bbb;width:61px;height:20px;top:-8px';
        }
        ms_search_5.style.width = '20px';
    }
    // 点击搜索
    var ms_type_num = 0, ms_txt = '';
    var ms_present = 0,ms_account = 0,ms_remember_num = 0;
    function startSearch() {
        GoogleAnalytics.pluginUse('User','keywordSearch'); // 统计
        var ms_group_display = ms_group.style.display;
        var ms_content = document.getElementById('-eMc-emails-body-id');
        if (ms_group_display == 'inline') {   // 只有在处于搜索状态时进行展开、折叠、重绘操作才会进行搜索
            clearLocateAndTag();
            if (ms_txt) {
                createLocate();
                createTextWrap(ms_content);
                groupInfo();
            } else {
                ms_search_2.value = '';
            }
            cancelSearch();
            ms_search_1.focus();
            ms_type_num = 0;
        }
        // 移除位置标签
        function clearLocateAndTag() {
            // 清除定位标签
            var ms_selected_array = document.getElementsByClassName('ms_selected_symbol');
            if (ms_selected_array[0]) {
                ms_selected_array[0].parentNode.removeChild(ms_selected_array[0])
            }
            // 清除文本标签
            var ms_wrap_text;
            var ms_wrap_reset = document.getElementsByClassName('ms_wrap');
            var ms_wrap_length = ms_wrap_reset.length;
            for (var i = 0; i < ms_wrap_length; i++) {
                ms_wrap_text = document.createTextNode(ms_wrap_reset[0].textContent);  // 这里一定要用0，因为ms_warp_reset是变化的
                ms_wrap_reset[0].parentNode.replaceChild(ms_wrap_text, ms_wrap_reset[0]);
            }
            // 清除点击事件
            ms_search_3.onclick = function(){}
            ms_search_4.onclick = function(){}
        }
        // 添加定位标签
        function createLocate() {
            if (ms_type_num == 1) {   // 划词搜索时执行此函数
                var ms_selected_symbol = document.createElement('span');
                ms_selected_symbol.className = 'ms_selected_symbol';
                ms_range.insertNode(ms_selected_symbol);
            }
        }
        // 添加文本标签
        var ms_reg, ms_wrap, ms_currentNode, ms_previousSibling;
        function createTextWrap(node) {
            ms_reg = new RegExp('(' + ms_txt + ')', 'gi');
            for (var i = 0; i < node.childNodes.length; i++) {
                ms_currentNode = node.childNodes[i];
                if (ms_currentNode.nodeType == 1) {
                    switch (ms_currentNode.className) {
                        case '-emc-date':
                            break;
                        case '-emc-fast-reply-form':
                            break;
                        case '-eMc-show-quote-placeholder':
                            if(ms_currentNode.getAttribute('data-show') == 'false'){
                                num_nextSibling(ms_currentNode);
                                i = i + a;
                            }
                            break;
                        default:
                            createTextWrap(ms_currentNode);
                    }
                } else if ((!(/^\s+$/.test(ms_currentNode.nodeValue))) && (ms_currentNode.nodeType == 3)) {    // 文本节点且不为空
                    if (ms_currentNode.nodeValue.toLowerCase().indexOf(ms_txt.toLowerCase()) != -1) {    // 识别大小写
                        ms_wrap = document.createElement('span');
                        ms_wrap.className = 'ms_wrap';
                        ms_wrap.innerHTML = ms_currentNode.nodeValue.replace(ms_reg, '<span class="ms_text_span">$1</span>');
                        ms_currentNode.parentNode.replaceChild(ms_wrap, ms_currentNode);
                    }
                }
            }
            function get_previousSibling(dom) {
                var x = dom.previousSibling;
                while (x.nodeType != 1) {
                    x = x.previousSibling;
                }
                return x;
            }
            var a = 0;
            function num_nextSibling(dom){
                if(dom.nextSibling && dom.nextSibling.nodeType == 1){
                    a++;
                    num_nextSibling(dom.nextSibling);
                }
            }
        }
        // 显示信息并绑定相应操作
        function groupInfo() {
            var ms_self, ms_previous_span;
            var ms_text_span = document.getElementsByClassName('ms_text_span');
            var ms_text_span_length = ms_text_span.length;
            for(var a = ms_text_span_length;a--;){   // ellipse
                var ms_guy = ms_text_span[a];
                var ms_grandparent = ms_guy.parentNode.parentNode;
                console.log(ms_grandparent.offsetWidth);
                console.log(ms_guy.offsetLeft);
                if(ms_grandparent.className == '-eMc-email-fold-summary' && ms_grandparent.offsetWidth - 30 < ms_guy.offsetLeft){   // 每次替换时document.getElementsByClassName('ms_text_span')的数量都要-1，而且a也要-1
                    ms_guy.parentNode.replaceChild(document.createTextNode(ms_guy.textContent),ms_guy);
                }
            }
            ms_text_span = document.getElementsByClassName('ms_text_span');
            ms_text_span_length = ms_text_span.length;
            if (ms_text_span_length) {    // 有结果
                if (ms_type_num == 1) {        // 划词搜索有定位标签
                    for (var i = 0; i < ms_text_span_length; i++) {
                        ms_self = ms_text_span[i];
                        ms_previous_span = ms_self.parentNode.previousSibling && ms_self.parentNode.previousSibling.className;
                        if (ms_previous_span == 'ms_selected_symbol') {
                            ms_self.className = 'ms_text_span ms_selected';
                            ms_search_2.value = (i + 1) + ' of ' + ms_text_span_length;
                            nextAndPrevious(i);
                            ms_present = i;
                            break;
                        }
                        if (i == ms_text_span_length - 1) {    // 已经循环到最后依然没有找到定位标签
                            ms_search_2.value = '1 of ' + ms_text_span_length;
                            ms_text_span[0].className = 'ms_text_span ms_selected';
                            nextAndPrevious(0);
                        }
                    }
                } else if(ms_remember_num == 1 &&  ms_account == ms_text_span.length){        // ctrl+F和resize时记忆上次位置
                    ms_remember_num = 0;
                    ms_search_2.value = ms_present + 1 + 'of ' + ms_text_span_length;
                    ms_text_span[ms_present].className = 'ms_text_span ms_selected';
                    nextAndPrevious(ms_present);
                }else{       // 其它情况
                    ms_search_2.value = '1 of ' + ms_text_span_length;
                    ms_text_span[0].className = 'ms_text_span ms_selected';
                    nextAndPrevious(0);
                }
                ms_account = ms_text_span.length;
            } else {        // 无结果
                if (ms_type_num == 0) {
                    ms_search_2.value = '0 of 0';    // 输入搜索
                } else {
                    ms_search_2.value = '1 of 1';    // 划词搜索
                }
            }
            // 移动操作
            function nextAndPrevious(i) {
                ms_search_3.onclick = function () {
                    previous();
                }
                ms_search_4.onclick = function () {
                    next();
                }
                document.onkeydown = function (e) {    // 清除默认键盘操作
                    if (e.keyCode == 40 || e.keyCode == 38) {
                        return false;
                    }
                }
                document.onkeyup = function (e) {     // 自定义键盘操作
                    if (e.keyCode == 40) {
                        next();
                    } else if (e.keyCode == 38) {
                        previous();
                    }
                }
                function next() {
                    ms_text_span[i].className = 'ms_text_span';
                    if (i + 1 == ms_text_span_length) {
                        autoMove(ms_text_span[0]);
                        ms_text_span[0].className = 'ms_text_span ms_selected';
                        ms_search_2.value = '1 of ' + ms_text_span_length;
                        ms_present = 0;
                        i = 0;
                    } else {
                        autoMove(ms_text_span[i+1]);
                        ms_text_span[i + 1].className = 'ms_text_span ms_selected';
                        ms_search_2.value = (i + 2) + ' of ' + ms_text_span_length;
                        ms_present = ++i;
                    }
                }
                function previous() {
                    ms_text_span[i].className = 'ms_text_span';
                    if (i == 0) {
                        autoMove( ms_text_span[ms_text_span_length - 1]);
                        ms_text_span[ms_text_span_length - 1].className = 'ms_text_span ms_selected';
                        ms_search_2.value = ms_text_span_length + ' of ' + ms_text_span_length;
                        i = ms_text_span_length - 1;
                        ms_present = i;
                    } else {
                        autoMove(ms_text_span[i-1]);
                        ms_text_span[i-1].className = 'ms_text_span ms_selected';
                        ms_search_2.value = i + ' of ' + ms_text_span_length;
                        ms_present = --i;
                    }
                }
                function autoMove(x){
                    var ms_clientHeight = document.documentElement.clientHeight;  // 窗口高度
                    var ms_scrollTop = document.body.scrollTop;   // 滚动高度
                    var ms_top = x.getBoundingClientRect().top;    // 相对于窗口高度
                    if(ms_top < 0){
                        document.body.scrollTop = ms_scrollTop + ms_top - 200;
                    }else if(ms_top - ms_clientHeight > 0){
                        document.body.scrollTop = ms_top - ms_clientHeight + ms_scrollTop + 200;
                    }
                    var ms_clientWidth = document.documentElement.clientWidth;  // 窗口宽度
                    var ms_scrollLeft = document.body.scrollLeft;   // 滚动宽度
                    var ms_left = x.getBoundingClientRect().left;    // 相对于窗口宽度
                    if(ms_left < 0){
                        document.body.scrollLeft = ms_scrollLeft + ms_left - 200;
                    }else if(ms_left - ms_clientWidth > 0){
                        document.body.scrollLeft = ms_left - ms_clientWidth + ms_scrollLeft + 200;
                    }
                }
            }
        }
        // 取消操作
        function cancelSearch() {
            ms_search_5.onclick = function () {
                clearLocateAndTag();
                ms_group.style.display = 'none';
            }
        }
    }
    // 页面重绘时搜索
    window.onresize = function(){
        ms_remember_num = 1;
        startSearch();
    }
    // 手动搜索
    ms_search_1.addEventListener('keyup', function (e) {
        if ((e.keyCode > 47 && e.keyCode < 91) || (e.keyCode > 95 && e.keyCode < 106) || e.keyCode == 8 || e.keyCode == 32 || e.keyCode == 13 || e.keyCode == 108) {   // 字母数字键、全键盘数字键、BackSpace、SpaceBar、Enter
            var ms_replace = ms_search_1.value.replace(/(^\s+)|(\s+$)/g, '');
            if(ms_replace != ms_txt){   // 内容改变且不为空时进行搜索
                ms_txt = ms_replace;
                ms_group.style.display = 'inline';
                startSearch();
            }
        }
    })
    // ctrl+F快捷搜索
    document.addEventListener('keydown', function (e) {
        if (e.ctrlKey && e.keyCode == 70 && ms_group.style.display != 'inline') {
            var ms_another_replace = ms_search_1.value.replace(/(^\s+)|(\s+$)/g, '');
            ms_txt = ms_another_replace;
            ms_search_1.value = ms_another_replace; // 不能写在startSearch函数中，会导致手动搜索时每次光标都会移到最后
            ms_search_1.select();  // 选中文本
            ms_group.style.display = 'inline';
            ms_remember_num = 1;
            startSearch();
        }
    })
    // 获取range对象并返回文本
    var ms_range;
    function selectTxt() {
        var ms_selection = window.getSelection();
        var ms_selection_txt = ms_selection.toString();
        ms_selection_txt = ms_selection_txt.replace(/(^\s+)|(\s+$)/g, '');  // 去除空格
        if (ms_selection_txt)
            ms_range = ms_selection.getRangeAt(0);  // 获取range对象
        return ms_selection_txt;
    }
    // 划词搜索
    document.body.onmouseup = function (e) {
        setTimeout(function(){
            var ms_selection_txt = selectTxt();  // 获取文本
            if (ms_selection_txt) {
                // 获取光标位置
                e = e || window.event;
                var ms_scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
                var ms_left = (e.clientX - 40 < 0) ? e.clientX + 20 : e.clientX - 20;
                var ms_top = (e.clientY - 40 < 0) ? e.clientY + ms_scrollTop + 20 : e.clientY + ms_scrollTop - 40;
                // 显示searchBtn
                var ms_cssText = 'display:block;left:' + ms_left + 'px;top:' + ms_top + 'px';
                if(ms_range.startContainer.id != 'ms_group'){   // 排除选中搜索框中文本
                    ms_search.style.cssText = ms_cssText
                }
                // 添加click事件
                ms_search.onclick = function () {
                    ms_common();
                }
                // 添加快捷键
                document.body.onkeydown = function(e){
                    if (e.ctrlKey && e.keyCode == 70) {
                        e.stopPropagation(); // 阻止冒泡
                        document.body.onkeydown = function(){}  // 不能省略
                        ms_common();
                    }
                }
                function ms_common(){
                    ms_type_num = 1;
                    ms_txt = ms_selection_txt;
                    ms_search_1.value = ms_selection_txt;  // 不能写在startSearch函数中，会导致手动搜索时每次光标都会移到最后
                    ms_group.style.display = 'inline';
                    ms_search.style.display = 'none';
                    startSearch();
                }
            } else {
                ms_search.style.display = 'none';
                document.body.onkeydown = function(){}  // 不能省略
            }
        },0)
    }
    eventManager.addListener("emailUnfold",function(){setTimeout(function(){startSearch()},0)});
    eventManager.addListener("emailFold",function(){setTimeout(function(){startSearch()},0)});
    eventManager.addListener("toggleQuote",function(){setTimeout(function(){startSearch()},0)});
}())

