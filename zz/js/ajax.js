/**
 * Created by mike on 2016/8/6.
 */
/**
 * ajax({url:'demo.php',type:'GET',data:{name:'zz'}});
 * 推荐返回json格式
 * echo json_encode(array('name'=>$_GET['name']));
 */
function ajax(obj){
    var url = obj.url;
    var type = (obj.type || 'GET').toUpperCase();   // post文件时需要使用FormData
    var data = obj.data ? format(obj.data) : '';    // 数据，和form字段二选一
    var formData = obj.form ? new FormData(document.getElementById(obj.form)) : '';  // 初始化FormData（只能post）
    var success = obj.success || function (data) {
            console.log(data);
        };
    var error = obj.error || function (data) {
            console.log(data);
        }
    var xhr = new XMLHttpRequest();      // ajax
    xhr.onreadystatechange = function () {
        try{
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    success(xhr.responseText);
                }else{
                    error(xhr.status);
                }
            }
        }catch(e){
            console.log(e);
        }
    }
    if (type === "GET") {               // startup
        if(data){
            xhr.open("GET", url + "?" + data);
        }else{
            xhr.open("GET", url);    // get数据为空
        }
        xhr.send();
    } else if (type === "POST") {
        xhr.open("POST", url);
        if(data){
            xhr.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');   // 需要设置header，否者使用$_POST不能获取数据
            xhr.send(data);
        }else if(formData){
            xhr.send(formData);   // 不需要设置header
        }else{
            xhr.send();    // post数据为空
        }
    }
    function format(data) {             // format
        var arr = [];
        for (var name in data) {
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
        }
        var date = new Date();
        arr.push(('time=' + date.getTime()));
        return arr.join("&");
    }
}