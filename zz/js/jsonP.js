/**
 * Created by mike on 2016/8/6.
 */
/**
 * jsonP({url:'demo.php',data:{name:'zz'}});
 * 推荐返回json格式
 * echo $_GET['callback'].'('. json_encode(array('name'=>$_GET['name'])).')';
 */
var callback;
function jsonP(obj){
    var url = obj.url;
    var data = obj.data;
    var time = obj.time;
    var success = obj.success || function (data) {
            console.log(data);
        };
    var error = obj.error || function (data) {
            console.log(data);
        };
    callback = function (data) {
        document.body.removeChild(document.body.lastElementChild);
        clearTimeout(overtime);
        success(data);
    };
    var param,script,overtime;
    var startup = function(){
        data.callback = 'callback';
        param = format(data);
        script = document.createElement('script');
        script.src = url + '?' + param;
        document.body.appendChild(script);
        if(time){
            overtime = setTimeout(function () {
                document.body.removeChild(document.body.lastElementChild);
                callback = function(){};
                error({ message: "oops,overtime!" });
            }, time);
        }
    }();
    function format(data) {
        var arr = [];
        for (var name in data) {
            arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
        }
        var date = new Date();
        arr.push(('time=' + date.getTime()));
        return arr.join('&');
    };
}