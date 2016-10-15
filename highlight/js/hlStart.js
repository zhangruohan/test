/**
 * Created by mike on 2016/8/25.
 */
(function highLight(){
    /**
     * 生成页面元素
     */
    var eleArr = [];   // 存放生成的节点
    var createElement = function(id,tag,father){
        var ele = document.createElement(tag);         // 生成
        ele.id = id;
        if(father < 0){                                 //  绑定
            document.body.appendChild(ele);
        }else{
            eleArr[oriArr[father][0]].appendChild(ele);
        }
        eleArr[id] = document.getElementById(id);      //  返回
    }
    var oriArr = [     // -1代表document.body，其它数字代表以数组中的相应元素生成的节点为父节点，比如2的父节点为document.getElementById('hl_modal');
        ['hl_edit','span',-1],
        ['hl_delete', 'span', -1],
        ['hl_modal', 'div', -1],
        ['hl_modal_shadow', 'div', 2],
        ['hl_modal_content', 'div', 2],
        ['hl_modal_text', 'textarea', 4],
        ['hl_modal_yes', 'button', 4],
        ['hl_modal_no', 'button', 4],
        ['hl_modal_close', 'span', 4]
    ];
    for(var i=0;i<oriArr.length;i++){
        createElement(oriArr[i][0],oriArr[i][1],oriArr[i][2]);
    }
    eleArr['hl_edit'].setAttribute('contentEditable','false');
    eleArr['hl_delete'].setAttribute('contentEditable','false');
    eleArr['hl_modal_yes'].textContent = '确定';
    eleArr['hl_modal_no'].textContent = '取消';
    /**
     * 接口调用，生成图标并绑定click事件
     */
    var hl_type;                   // 0代表生成新的代码块，1代表编辑操作
    var start = function() {     // 启动函数
        GoogleAnalytics.pluginUse('User','highlight'); // 统计
        eleArr['hl_modal'].style.display = 'inline';
        hl_type = 0;
    }
    app.getResourceAsString(app.getResourceURL("/manifest.json"), function(pluginStr){
        var pluginJson = JSON.parse(pluginStr);
        if(!document.querySelector(".-eMc-quote-button-line")){
            editorPlugins.addButton(pluginJson, function(){
                start();
            })
        }
    })
    /**
     *  四种操作
     */
    var getById = function (id) {
        return document.getElementById(id);
    }
    var anotherCreateElement = function (id,tag,father) {
        var ele = document.createElement(tag);
        ele.id = id;
        father.appendChild(ele);
    }
    // 公共操作
    var commonOperation = function(){
        eleArr['hl_modal_text'].value = '';
        eleArr['hl_modal'].style.display = 'none';
    }
    // css遍历
    var hl_arr1 = ['hljs-comment', 'hljs-quote', 'hljs-variable'];
    var hl_arr2 = ['hljs-keyword','hljs-selector-tag','hljs-built_in','hljs-name','hljs-tag'];
    var hl_arr3 = ['hljs-string','hljs-title','hljs-section','hljs-attribute','hljs-literal','hljs-template-tag','hljs-template-variable','hljs-type','hljs-addition'];
    var hl_arr4 = ['hljs-deletion','hljs-selector-attr','hljs-selector-pseudo','hljs-meta'];
    var hl_arr5 = ['hljs-doctag'];
    var hl_arr6 = [ 'hljs-attr'];
    var hl_arr7 = ['hljs-symbol','hljs-bullet','hljs-link'];
    var hl_arr8 = ['hljs-emphasis'];
    var hl_arr9 = ['hljs-strong'];
    var setStyleInline = function (node) {
        for (var i = 0; i < node.childNodes.length; i++) {
            var hl_node = node.childNodes[i];
            if (hl_node.nodeType === 1) {
                var hl_node_class = hl_node.className.replace(/(^\s+)|(\s+$)/g, '');
                if (hl_node_class) {
                    if (hl_node_class.indexOf('hljs ') != -1) {
                        hl_node.style.cssText = 'display: block;overflow-x: auto;padding: 0.5em;background:#f5f9fe;color:#000'
                    } else if (hl_arr1.indexOf(hl_node_class) != -1) {
                        hl_node.style.cssText = 'color: #008000'
                    } else if (hl_arr2.indexOf(hl_node_class) != -1) {
                        hl_node.style.cssText = 'color: #00f'
                    } else if (hl_arr3.indexOf(hl_node_class) != -1) {
                        hl_node.style.cssText = 'color: #a31515'
                    } else if (hl_arr4.indexOf(hl_node_class) != -1) {
                        hl_node.style.cssText = 'color: #2b91af'
                    } else if (hl_arr5.indexOf(hl_node_class) != -1) {
                        hl_node.style.cssText = 'color: #808080'
                    } else if (hl_arr6.indexOf(hl_node_class) != -1) {
                        hl_node.style.cssText = 'color: #f00'
                    } else if (hl_arr7.indexOf(hl_node_class) != -1) {
                        hl_node.style.cssText = 'color: #00b0e8'
                    }else if (hl_arr8.indexOf(hl_node_class) != -1) {
                        hl_node.style.cssText = 'font-style: italic'
                    }else if (hl_arr9.indexOf(hl_node_class) != -1) {
                        hl_node.style.cssText = 'font-weight: bold'
                    }
                }
                setStyleInline(hl_node);
            }
        }
    }
    //  确定操作
    eleArr['hl_modal_yes'].onclick = function () {
        var ele,sel,range;
        var text = eleArr['hl_modal_text'].value.replace(/^\s+|\s+$/g,'');
        if(hl_type === 0 && text){     // 排除空文本
            if (getById('hl_div')) {            // 清除上次生成的id
                getById('hl_div').id = '';
                getById('hl_pre').id = '';
                getById('hl_code').id = '';
            }
            ele = document.createElement('div');   // 生成元素
            ele.id = 'hl_div';
            ele.setAttribute('name', 'hl_div');
            ele.style.cssText = 'border:1px solid rgba(255,255,255,0)';
            SelectionManager.restoreLastRange();    // 接口，记忆上次光标位置
            sel = window.getSelection();      // 获取selection
            range = sel.getRangeAt(0);
            range.deleteContents();
            range.insertNode(ele);
            anotherCreateElement('hl_pre', 'pre', getById('hl_div'));
            anotherCreateElement('hl_code', 'code', getById('hl_pre'));
            getById('hl_code').setAttribute('name', 'hl_code');
            getById('hl_code').textContent = eleArr['hl_modal_text'].value;
            hljs.highlightBlock(getById('hl_code'));  // highlight.js
            setStyleInline(getById('hl_pre'));   // 遍历css
            getById('hl_code').innerHTML = '<span contentEditable = "false">' + getById('hl_code').innerHTML + '</span>';
        }else if(hl_type === 1){
            if(text){
                hl_edit_code.textContent = eleArr['hl_modal_text'].value;
                hljs.highlightBlock(hl_edit_code);
                setStyleInline(hl_edit_pre);
                hl_edit_code.innerHTML = '<span contentEditable = "false">' + hl_edit_code.innerHTML + '</span>';
            }else{
                hl_edit_div.parentNode.removeChild(hl_edit_div);
                getById('hl_edit').style.display = 'none';
                getById('hl_delete').style.display = 'none';
            }
        }
        commonOperation();
    }
    // 取消操作 1
    eleArr['hl_modal_no'].onclick = function () {
        commonOperation();
    }
    // 取消操作 2
    eleArr['hl_modal_close'].onclick = function () {
        commonOperation();
    }
    // 取消操作 3
    eleArr['hl_modal_shadow'].onclick = function () {
        commonOperation();
    }
    /**
     *  编辑 & 删除
     */
    var hl_edit_div,hl_edit_pre,hl_edit_code;
    (function editAndDelete(){
        var top,height,edit,clear;
        var div = document.getElementById('-eMc-editor-body-id');
        div.onmouseover = function (e) {
            if(e.target.getAttribute('name') === 'hl_code'){
                e = e.target;
                hl_edit_code = e;
                hl_edit_pre = e.parentNode;
                hl_edit_div = e.parentNode.parentNode;
                top = e.getBoundingClientRect().top;
                height = e.offsetHeight;
                eleArr['hl_edit'].style.display = 'inline';
                eleArr['hl_delete'].style.display = 'inline';
                fixedTop();
                window.onscroll = function () {
                    top = e.getBoundingClientRect().top;
                    fixedTop();
                }
                eleArr['hl_edit'].onclick = function () {
                    eleArr['hl_modal'].style.display = 'inline';
                    eleArr['hl_modal_text'].value = e.textContent;
                    hl_type = 1;
                }
                eleArr['hl_delete'].onclick = function () {
                    hl_edit_div.parentNode.removeChild(hl_edit_div);
                    eleArr['hl_edit'].style.display = 'none';
                    eleArr['hl_delete'].style.display = 'none';
                }
            }
            function fixedTop(){
                if(top > 0){
                    eleArr['hl_edit'].style.top = top + 'px';
                    eleArr['hl_delete'].style.top = top + 'px';
                }else{
                    if(height < 50 || top + height < 90) {   // 高度小于50或显示高度小于50
                        eleArr['hl_edit'].style.top = '0px';
                        eleArr['hl_delete'].style.top = '0px';
                    }
                    else{
                        eleArr['hl_edit'].style.top = '10px';
                        eleArr['hl_delete'].style.top = '10px';
                    }
                }
            }
        }
        div.onmouseout = function (e) {
            if(e.target.getAttribute('name') == 'hl_div'){
                eleArr['hl_edit'].style.display = 'none';
                eleArr['hl_delete'].style.display = 'none';
                window.onscroll = function () {}
            }
        }
    }());
    /**
     *  剪切 & 删除
     */
    var clearAction = function (){
        eleArr['hl_edit'].style.display = 'none';
        eleArr['hl_delete'].style.display = 'none';
        var hl_all_code = document.getElementsByName('hl_code');
        setTimeout(function () {
            for(var i = hl_all_code.length;i--;){
                if( hl_all_code[i].innerHTML.replace(/^\s+|\s+$/g, '') === '<br>'){
                    hl_all_code[i].parentNode.parentNode.parentNode.removeChild(hl_all_code[i].parentNode.parentNode);
                }
            }
        },0)
    }
    document.body.addEventListener('cut',function () {
        clearAction();
    })
    document.body.addEventListener('keydown',function (e) {
        if(e.keyCode === 8 || e.keyCode === 13 || e.keyCode === 32 || e.keyCode === 46 || e.keyCode === 108){  // backspace  enter  space  delete  enter
            clearAction();
        }
    })
    /**
     *  tab键缩进四格
     */
    var textArea = eleArr['hl_modal_text'];
    textArea.onkeydown = function (e) {
        if(e.keyCode === 9){
            e.preventDefault();     // 阻止默认行为
            var startPos = textArea.selectionStart;    // 获取光标位置
            var endPos = textArea.selectionEnd;
            textArea.value = textArea.value.slice(0, startPos) + '    ' + textArea.value.slice(endPos, textArea.value.length);    // 加入空格
            textArea.setSelectionRange(endPos + 4,endPos + 4);   // 设置光标位置
        }
    }
}())