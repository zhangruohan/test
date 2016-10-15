/**
 * Created by mike on 2016/9/1.
 * 设置光标在文本区域最后位置
 * 通过startPos、endPos可以实现更多功能
 * text可选
 */
var cursor = function (area,text) {
    var startPos,endPos,length;
    if(text){
        area.value = text;
    }else{
        // startPos = area.selectionStart;
        // endPos = area.selectionEnd;
        length = area.value.length;
        area.setSelectionRange(length,length);
    }
    area.focus();
}