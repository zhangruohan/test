//Golobal NameSpace
var YoMailEx = YoMailEx || {};
(function(){
    // initialize operation
    var pluginId = "cb93d44913cb48er85b942810fc19788";
    YoMailPluginEx.init(pluginId);
    YoMailEx.event = function (event) {
        YoTeambition[event.method](event.parameter);
    }
    // from yomail to this plugin
    var YoTeambition = {};
    YoTeambition.sendEmailToCurrentChat = function (parameter) {
        var interval,clearCondition;
        var createBtn = document.getElementsByClassName('create-project-handler');
        if (createBtn.length) {     // 已登录
            createBtn[0].click();
            interval = setInterval(function () {
                clearCondition = document.getElementsByClassName('project-name form-control')[0];
                if(clearCondition){
                    clearInterval(interval);
                    document.getElementsByClassName('project-name form-control')[0].focus();
                    document.execCommand('insertText', false, parameter.subject.replace(/re:/,''));
                }
            },100);
            GoogleAnalytics.pluginUse(clientID, "Teambition");
        }
    }
    // from this plugin to yomail and wechat
    var toYomailAndWechat = function () {
        // css
        var style = document.createElement('style');
        style.id = 'addtionalStyle';
        style.innerText = '#addtionalDiv{display:none;position:fixed;width:40px;height:16px;z-index:1000;cursor:pointer}' +
            '#addtionalYomail{width:16px;height:16px;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALCSURBVEhLrVbPT1NBEB4BPSGJCv+AqFFj4sWrZ0XPqEBI1JMnQbxo/PGidve9Yj2YGBMTb1qBYoreFYJwEtQLJy7a7r4HRGKi/0D9ZrqlpbyW8uNLJn1vdnZmd+abeaWa8ApNpMLjkAEK7BtS9jPkq0jCTpJv3pJaHhCbTKbZ7WoQw7lOSoQjpO0E6bCHdP4IeYttlCk0izxfbROdzvcgYJaUGZX3TVEo7MGGK5AZSpiL8r4Z2EabCzjINKl8r9w8Fp7XBKO7cP6O1GKH0zYObQ8hUBr778cHkVQgLa/m9zrN1jFVaEEQpBa+1mF4pZN09IVS/9qdZvtIhe2SrrWaMANUOEqB6SoqdgFB/pwUXtiVAs10lN1QUC9/EHm9gWIP1hWmcTI643YVIYUPx4XCpKJb5Ie9bqkMHT5CgL/4/VFXlP0J+eN2laHtZfLhGw/pWA7rcJB8m8H6PfIW9jnteqjcWdziE2yyTlOGv3wYPkbY0aQ0TjV8e1VYocwzyEc4OeZWkL6FVgrCOzg5uI80cKqq8WKlFXumcQozR90xrc4BGNy5aukSjBehu46UnsTzLOQ1vcwdEJu4ANJX5jsC2DnyplqcuoxSgBJ8cxq2CzjQKm5902mLiAvQzQeL5jnAVM0UVUNFHfR06dQGxsUFSP7eLynEIjovpsiBvSbXbARP7JB7KmOtyEylOJrysGMG8enqiYZzZbXbVYbQNH8b1/7FRZtoaHI2ilKjBdGJIku0HUc3n3fLOwePCu4h9i1ImqMIMiODaqeQYQdflX0j0GGfDKjdGNfJqN9pKsAfCW0fSJDt3KR48jRS87DOV42D4CbazIIhjX8yg6gLztHdpr+280rIvwn7HvIBPdJHj1EjbhweKSzcmKyTryAYKLY8mrcCZgDTjHmeMGNIHQpneDx/Q0fjORwD84bEZo0t1SD6DwHsvirP+wdCAAAAAElFTkSuQmCC") no-repeat;background-size:16px 16px;display:inline-block;margin-right:8px}' +
            '#addtionalWechat{width:16px;height:16px;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpmODJiZTM3NC01ZTYzLThkNDctYmE1ZS1kODYyOWQyMmY3YzMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDQxNTRBMDk2OUM2MTFFNjlEMzY4NDI5RTEyMjRBOTMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDQxNTRBMDg2OUM2MTFFNjlEMzY4NDI5RTEyMjRBOTMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTM4ZjQ2MDMtNmY1Zi05MzQ1LThmYzctMzYxOGEzNjk4Nzc1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmY4MmJlMzc0LTVlNjMtOGQ0Ny1iYTVlLWQ4NjI5ZDIyZjdjMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrpMBRYAAAT3SURBVHja1Fd5TBRXGP/ezF7sbtllOQRTOYIHaaEYd1nCVSk0lVirFqJEMQipUZrG1pqaxtCmpoQYa5MeiTWkhv5hTKq2VFrYQowXUUNlhSJpEQqNW9CmyI0uy87Me30Ph+2Wq7vQ1HSSX2be982b75vvfogQAo/z4uAxXygyNv4/E+boaptBU5TZM+fc8K7lMrOQgoKXrYVkFvMbppBkYJnm96WYRSiShamKjiU+HRar26jW8hm8EsVwPApl72CJDFA4XA+kxpHfXbUVxc03KNktK+OXIuiLwRLP4r2kq0ywsrjiGevSOP0hlZbL9CVOhAliH3CMlx8vaK6nywnZIj65gJOwBAxMuN6kDNhvS3r/yUTdBV5Dsijdw58PnBJbQperqw6ct372VHawUXaZby6QsADlKXZOR4WXnI6vVOvJVkyEhXgUqfRQtKE0Kpqmdl77xcHhuSzxNwuIksDuyqLKlaV8AN7K1osBUkmZz++POMxiyCto501DPvdIZEJMsu4H+rrKm3mjsR+uX+8DszkYMtYumbF5im9JCoH0jDBvltTT4kw7s89hlwNz7jRkCF3Jl1BXqKYz2ccFN4abNwcgNd00Y/O1a30gChjsTf2QkhrkzeJN0dyr9L7HW4Go5QmzKsBzGjFLxNIMptligGb7CCQkBoKI3TP4FivlN41A4upAcAsTQDAB9hlW3kWJPEefDNTID2QlRBYT3R0/kuku0JfURfRT86v9DjsyWRNAEglEq8wQq7dClC4ejJpw0PB6kCQ8Iklij9M53tTTe/fs5rztV6bqxZQiTAHdK7bQewhBoF/CaXxLIoYohQVylr4GIQHL/nGL2+1ubW/vOJCXX9jAll23WwhTIKCwyniJV6Nkn3+c6i66CWQZd0FGxHZ/7Sb19d0vS1u77gP67GJVThwfFs9g6jyfIEm08gmQ/sQOSAvfBphq4yf4kNCQQw2Xvn+TpSpvMIWR0bv4dmQqnwuIBLMAmg8YYwglK+DlqHcm05xZg+GTigpotNvBusbsoc3H02q1GVarpY7bcU5Leu3iWN/PQjH9+BghGOYD87s5aNOjMKDrKXgU9KLNx6MU1aq4FW+gg21WOLXZySqW8sWPNesMUdxJGpCGORuPC8PemC9ppEcsej4QBOE3jqVSwTdalhJC7T5X/T07fkFyw53JXjALEI1+nTJ40hWLBcdxYZ5WO6XE5XLXT5KLtMyZAdRWYxODtAviRcMtCPdnDCTLrLxSqUfZ1GWjriFyfHyINGqDkJlXQxzHwxI8gdS9wx3Rq0JMYYt1wejoWI1iettN2qVaLTrJ57/US5+2nHT/IbdUm9dIxqd8KKbGpok2hBC/UOHUBSNXGq5+hA62Wj3EU7lO5CUIF1RpsRfPU74p1LU1X5UFBRnfWohwmhFCd/ev+YU799QsdCpmSmq+rT592Gg07PWl7//152TU4XDs3llUco6V44WeC5hlXBs35b/d2dm1xeVydYqiCL6g9VZbERVezYRfvFBDkK8no9l6+VRMGAwGzdEjZdkmU9AGjUaTpFDw4TTFAlhho0LvPHQ6b+m0umS1WrVmcHCoNH9b0dHz9dXCrGO5v+6ss30t5qzPe7i75PUauq6TB1Ikg3idGRSVJ47l0Lh5drIjSeKjP1ikBcD23Vmf9q9/aQvympYx3Yf/FQX+/4fTx308/1OAAQAW6Y8ARBQBjwAAAABJRU5ErkJggg==") no-repeat;background-size:16px 16px;display:inline-block}' +
            '#dialogDiv{display:none;position:fixed;left:0px;top:0px;width:100%;height:100%;z-index:1000;text-align:center}' +
            '#dialogShadow{position:absolute;left:0px;top:0px;width:100%;height:100%;background:#000;opacity:0.2}' +
            '#dialogContent{position:relative;z-index:1001;display:inline-block;width:670px;height:436px;padding:34px 0px 0px;background:#f5f5f5;border-radius:4px;margin-top:100px}' +
            '#dialogTextArea{display:block;margin:0px auto 15px auto;border:1px solid #0086e5;outline:none;padding:10px;border-radius:4px;width:612px;height:354px;resize:none;}' +
            '#dialogSubmit,#dialogCancel{width:60px;height:25px;background:#008bf3;color:#fff;border:1px solid #008bf3;outline:none;padding:5px 10px;border-radius:4px;margin:0px 10px;cursor:pointer}' +
            '#dialogSubmit:hover,#dialogCancel:hover{background:#31a7fc}' +
            '#dialogClose{position:absolute;top:10px;right:10px;width:10px;height:10px;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RUU0MDIxNTM0NTgwMTFFNjk1QkVCRjBGQTBEMDc4OEMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RUU0MDIxNTQ0NTgwMTFFNjk1QkVCRjBGQTBEMDc4OEMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFREYzNUUxQzQ1ODAxMUU2OTVCRUJGMEZBMEQwNzg4QyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFRTQwMjE1MjQ1ODAxMUU2OTVCRUJGMEZBMEQwNzg4QyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhkDIIQAAAB4SURBVHjafI7RDYAgDAXRdDdZQP3VTdjDPzQqO+hoEh9JQ0qDNrlCygGvcc4txpgLBFOvHnQt2g08GD+kLTmEdvLQ8xqUNIGDeKjlKKU0IPGNlrOUqlWZHrGP8kC+OIAVzCwVmaki7eJylulHKjIn0VYkLdtXgAEApC8gU0bdY/kAAAAASUVORK5CYII=") no-repeat;background-size:10px 10px;cursor:pointer}' +
            '#dialogClose:hover{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzdFQzZFQUQ0NTgwMTFFNjk1QkVCRjBGQTBEMDc4OEMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzdFQzZFQUU0NTgwMTFFNjk1QkVCRjBGQTBEMDc4OEMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozN0VDNkVBQjQ1ODAxMUU2OTVCRUJGMEZBMEQwNzg4QyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozN0VDNkVBQzQ1ODAxMUU2OTVCRUJGMEZBMEQwNzg4QyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkB7RYQAAAB4SURBVHjafI7RDYAgDAXRdBVmkQXUX53LPzQqO+hoEh9JQ0qDNrlCygGvsdYuxpgLBFOvHnQt2g08GD+kLTmEdvLQ8xqUNIGDeKjlKKU0IPGNlrOUqlWZHrGP8kC+OIAVzCwVmaki7eJylulHKjIn0VUkLbtXgAEA8PkfQupQhm8AAAAASUVORK5CYII=")}' +
            '@media(-webkit-min-device-pixel-ratio:1.98),(min-resolution:192dpi){#addtionalYomail{background:url("data:image/png;base64,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") no-repeat;}' +
            '#addtionalWechat{background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpmODJiZTM3NC01ZTYzLThkNDctYmE1ZS1kODYyOWQyMmY3YzMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0EzOThFMkM2OUM2MTFFNkE1NThGQjU2MDRGN0QyMTkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0EzOThFMkI2OUM2MTFFNkE1NThGQjU2MDRGN0QyMTkiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ZTY5OWRlNDEtYzQ0OC03ZDQwLTg1ODEtMzRiYjFiN2QwNWQ3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmY4MmJlMzc0LTVlNjMtOGQ0Ny1iYTVlLWQ4NjI5ZDIyZjdjMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmCCbowAAAn1SURBVHja7FsHVFRXGv7fezNvhunMyNAMKAoRFMQCgmLUWAhq1tjA6NoWW1w3euKquyfGhpg9JnE3McnRlBNP1r4RgnoQxRpFIgJDMEfXvppVaSJ9hplX9r5xBpX6YBpn5XL+M6/9997/u3+7BYxlWXiZCw4veekCoAuALgBe7oL59er3fyHIvVtXOsQnsLXhpNyR8MHgs5wmERaNshLW6FMu3jKNCfHbFIdR2zb1X2Cj+QhQB4SzPw0N9PCXRJMywSAhifcmhJgvRmAahABpkdzE0mw5Q7MPKSN7r76OKqwsqs/Z9+df8xC/CX1isgcYzjABzDLSwrc/7vuqX5hyjlgumIQEDuhI4wzDltbX0Ccriwx7vpyZxw2lERG1KXcEbyDWDT5nkwm0BwBOcHLRd+HDPQIkq0kJPsqeThRpxs2qEuM/0jbf2PufvMoa9IjeeDmmTSDWR1xwOADcqAsTtgYHBUSotoqkeJwjVZI2wc3Su3WrdvxedwLd1m/IGca09v2GyCybAMB5vHd7N3XQ0qDhqhyhBOIYlgFHEiZgArWB4h9XZUbuCJ+o1SABida+t7W05gSJkNfVygl/DdghluPT0diAM+dNYjnMiVvtN7DHIPm0TUOyb3/wcyTliHZaAoCImumleW2hT6pQDEPtgXSH1FMI/YLHqk6SssBJSVE5he9nD7Y7CM2ZAN5nlLsy5g9eBwkSCc8gVXMhAcZ27xEhS3ljtb9/cnQu0eS9nQHgHJ5o3CrfbYSYHcGwNHQGQn7BP2ScYrd3iET64bB8/Pl39gZAsGBvUIJIDnM7i/BWIkRs1FvJfqu5iGRPAJ73AfiwBVqt3Av/G8O0XTHnEPMuP4aC/MdQW0dBaJgaRr7uCTiO8WqY48/NKQNdXjkY6mnoF+reJr/EHXtvUtIr+z8a/uu1leeCaXs7QUG/OPlSDGc9+SyTZV0oheys0ob7vNwyEAoxiHnNg1fD2Yg/qxG/iMRg6PBW+d18wkTvod93WJah7ekEsZ5RUqlYiS3gRp8P6XLLm1Smyy8Hvvz5+U35CwuftMlHSiEhYpZavW3kdYxh7OcDiOhE1RgWo7V8bZIFthm1ZnnbdHNKxj1rkw+jJcGxkvFcn+3pAwiJBotrT4Wh/RXIhiuaPONbR2h/OVy+9CJ/cF8ZL36RAmLRz57PRt9tyAv8e4faBgAuZAe0J64OGaoEsRsOBXlVoNfT5s5HRit4x+bIaCWQIszMb6hnkBOUv8DP5V6cRrEM++zaojWUiQ1DTxTIcnHLOgNtWV+gb18vaFe+ap0MSRele9/BCdC6clXHLCgSmKZYEIMC/MTh4CMOhG6iHuAu8gQZqeZGCiUrGIuzwkqapoopirpXV6e/WlFZdWnf/h/O7Pp+T5VlfYEXGFYAZIuOeZaimsWuEpyhGcApNwiRjoL+6nHgJw9G3WnfbBtpSb1erz9XXFK6O3HRsrR7937TcwrTGhANACSmezzEMJA7dTWGc3o0C7hJBJHK6RDlORncBAq71G0yme4WF5dsmxI/e1d5+RMDpxG3/q1jWwJAMv+wphATQC+njTonvJGBnmQUTOy+ApQix1ifwVCvy9f98se58xfncytONxuBYNUxxqSnC1ByAc4gztHRBgZGqRbDzIDNoCQ9niLiABKLyAHRQwafPnvy6DvcLDuwzwD8+fdWAGhDNX3WWcKzBgymeG6AoZ7xqBOYo2RvIKToYh8fn7//fOHUFjMIwQNx6zsrANT1E8ZDDMPWPg03jiGG8/Ao5E3QroFgdYw5mXLmn7tatSLrpxMbubXNoJCBGPfMCgB75WB9ubGa2e9IAGgTA5GyeAjTjAZHttMaaTTqlcfTU2Zws0runlCqG5wPK/XAr6h74XMdEQ65+K6kfWF6zyTAMaLF767duA6fffUVnDl/Hry0Wuim6car/nbwYTK5fKSn1uPAtPjZlc8HWubSTsN/a8uYJEeoH4VGf5R2EUpkBK1+t+/QIaiqrjYTd823/vbwoSm3KjZ29HrOFBpnGqbUhXU7qFomzZ5eyDz64PXU7ttQ0cZ7aXxVu718MpksYdPGtd2fN4GGpXlciJ/RBOFjkKZ62WWtHyU74dI3oZcios1vkWrCzdt3wE0shvjJk3mbQPv5MEKtdn/U0sYIEbmY9A8YI0gnhPCqzbs+yPMneG2FQNWQTrWjjOYQp1paFqdzdhrvo5lpXO+xghSchHBbc32tuCd0tgNZJCns09psg7r8jfF+wV5TLFXHptua83M5vqtCX0uEYZimrekWfS3NVJa21JBQW8Jussy5O5j7s52OUFZq5DPfZAyVrKGokEmBpoce+AmPuGqMFcCYl8w6D5koqpTvAQncOxz/XUcBQNNsKNbfATnZrbM5wTy+AAhIOTa+iX0Y2FOGKjhBSmAgLsIGoYgR0Nx2G0ZgcL9WxysMOrM8qag4xgcAfMgSkbdABBHPwhpkVf7GbM5YZfjJsh5nPjkSNoNU+g7G+4lkWBACwwvlESozUBTUXTddcRvhSS/FMLxTnEyjafphcvLWH3kB4DsQn4DSK4IxQl7lA2ZL+kpDBjw9zkLPSpE0xLY9U+rqCvdDMbo8YwEFe5acFYhnZNb0kMtlEzsDAEVFxVvz8nS1vExAKAXfmiLmbRQNjqDbesuoNwnqFjBoC3GAvAC6Lr9gXUxM9FgUfkSuFF6vN5ybN3/Jt5wy8wGAOTBL/75ViOYE56t1q9asvZqaum8zSluTXKn6GcczEysqKvQXs06yzj4oyZmEW0ZG6vcyqXSqs4VHcb9cp/tl4vIVay5fOH+CAnD+UVlOewzLl69OrK6uOeLMgxYmk6mkoODKW0j4XE4RrM8xR+bnrWxX4SqVUrLrux1b0O+yjuYX7Vgiv5qdnRO/bn3yDc7uz55JZ5+l6a4BwKp95Ddffz7Bz6/7NoFA4OeIPlRXVx/4/Iuv383MPF1++tRRqrlOuKpw84r6BQuXHd6+fWdEWdnjzRRFldlb9SsqKi8i4StPZh6mmnvv6qSEzTyeZjpy9FhZfMLcpE8+2R7y8MGjpQa94SJDM/TTjVH+hHiMjZ+5q9y5vANviceVJmAux4+lNlzHxk3mfAEXmgXz5s7qNjwmeoRUKh0kFouDBQLiFZQ/yAmCUKA+c6NZhULaA6PRdKu2tja/uLgkZ/sXO2+tW7smztvb6y9CobCvdb9wz96DAf/cvf8Raqvp1pirAchIP9Ts8zfGT7UezLYexceaZpcvHL23HiwglEqFaNvHyVO1Wg8OiD4lJaUL58xbsgu11cQHCMDVNsA0PwDHjv7AvejIwUgmbuI0KnHhn/YqFPKU7Z9+NFkuk/ZpqS2Xa0D6kX85rP3xb063apEZGNQW0+kAcHXp+qeprn+dfclLFwBdALzk5X8CDACjjnPVZ83nPQAAAABJRU5ErkJggg==") no-repeat;}' +
            '#dialogClose{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RUU0MDIxNUI0NTgwMTFFNjk1QkVCRjBGQTBEMDc4OEMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RUU0MDIxNUM0NTgwMTFFNjk1QkVCRjBGQTBEMDc4OEMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFRTQwMjE1OTQ1ODAxMUU2OTVCRUJGMEZBMEQwNzg4QyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFRTQwMjE1QTQ1ODAxMUU2OTVCRUJGMEZBMEQwNzg4QyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvaCIE4AAADZSURBVHjanNJBCsIwEIXhOLhy42lEr1BB3PYwKt0pHkTwAKLi2pYeR9eCvoEW4pB0kgn8izbtR5p0VFXVxDl3QnvUOtuYoS0qqcPW6I7mRuyBVujM4BG90NSA9hi/+0YHBmu0NKASY+NJ3WQuGsR4gryHUtEoJsEUdBALgT1aBFAV4zGO7FHToVcPdRoWW6FE+5WqmAby+Ijrb+BeMij3zN/TRS4YOgD/828xlDL+syYFJQUrxAGoKClYnXD6fyhlYipKBmwQZXBnwGLohsESXQyYRNkofwIMAMs0Zs93f7PRAAAAAElFTkSuQmCC")}' +
            '#dialogClose:hover{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RURGMzVFMTY0NTgwMTFFNjk1QkVCRjBGQTBEMDc4OEMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RURGMzVFMTc0NTgwMTFFNjk1QkVCRjBGQTBEMDc4OEMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFREYzNUUxNDQ1ODAxMUU2OTVCRUJGMEZBMEQwNzg4QyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFREYzNUUxNTQ1ODAxMUU2OTVCRUJGMEZBMEQwNzg4QyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrB5HPAAAAD9SURBVHjanNUxCsIwFAbgNG4uDl30AF11EvUEWhcXB4/gJZwVb+AFnKUIKk4OtngPL6CzqP+DCDGkfUke/CVN2w8eL9AoSZK6EGKLLJGbCKsuskBmEcAdFhPkgQwDUMLOSAPZS1zWCqONE9ILxJ7IisAcGQegJkbGVaqHvqgVowdSe8kVLcVM0AWtxKhoyraWBshBffib/pvDqkAbKjjM1rJeBZJq7bMYB1K9jPuPZc8ZNAegD6rvC9qmqbd/LEOlxzkrXFDJYKkxABaVDJY7TP8PlZ4Yi9LB9sWqDv+oFsfxBot2AEZ1Ry7IVKEtAjMsOsjcEzPRJv0CvgIMABs1ZyRwRQI0AAAAAElFTkSuQmCC")}}' +
            '@media screen and (max-height:450px){#dialogContent{height:260px}#dialogTextArea{height:200px}}';
        if(! document.getElementById('addtionalStyle')){
            document.head.appendChild(style);
        }
        // icon
        var addtionalDiv = document.createElement('div');
        addtionalDiv.id = 'addtionalDiv';
        addtionalDiv.innerHTML = '<span id="addtionalYomail"></span><span id="addtionalWechat"></span>';
        if(! document.getElementById('addtionalDiv')){
            document.body.appendChild(addtionalDiv);
        }
        // modal
        var dialogDiv = document.createElement('div');
        dialogDiv.id = 'dialogDiv';
        dialogDiv.innerHTML = '<div id="dialogShadow"></div><div id="dialogContent"><textarea id="dialogTextArea"></textarea><span id="dialogSubmit">确定</span><span id="dialogCancel">取消</span><span id="dialogClose"></span></div>'
        if(! document.getElementById('dialogDiv')){
            document.body.appendChild(dialogDiv);
        }
        // main
        var contactInfoObj = {},currentContactNode,x = 0;
        var addtionalDivNode = document.getElementById('addtionalDiv');
        document.addEventListener('mouseover',function (e) {
            var target = e.target,position;
            if(target.className === 'member member-detail ui-draggable-handle' || target.className === 'member member-detail ui-draggable-handle open'){
                position = target.getBoundingClientRect();
                addtionalDivNode.style.display = 'block';
                addtionalDivNode.style.top = position.top + (position.height - 16)/2 + 'px';
                addtionalDivNode.style.left = position.right - 45 + 'px';
                contactInfoObj.nickname = target.getElementsByClassName('member-name item-name')[0].firstElementChild.innerText;
                contactInfoObj.account = target.getElementsByClassName('member-email muted')[0].innerText;
                currentContactNode = target;
                document.getElementsByClassName('members-list clearfix')[0].onmouseleave = function () {
                    setTimeout(function () {
                        if(x === 0){
                            addtionalDivNode.style.display = 'none';
                        }
                    },0)
                }
            }
        })
        document.addEventListener('click',function (e) {
            if(e.target.getAttribute('data-menu') === 'member' || e.target.className === 'icon icon-users' || e.target.className === 'icon icon-remove close-handler'){
                addtionalDivNode.style.display = 'none';
            }else if(e.target.id === 'addtionalYomail'){
                YoMailPluginEx.selfCheck(JSON.stringify(contactInfoObj), '', function (result) {
                    if (!result.error) {
                        YoMailPluginEx.sendEmailByYomail(JSON.stringify(contactInfoObj), '',function(result){
                            GoogleAnalytics.pluginUse(clientID, 'Teambition');
                        });
                    }
                })
            }else if(e.target.id === 'addtionalWechat'){
                YoMailPluginEx.selfCheck(JSON.stringify(contactInfoObj), '', function (result) {
                    if (! result.error) {
                        var email = result.email;
                        YoMailPluginEx.query("com.yomail.pluginex.im").get("wechat").queryThirdAccount(email, function (result) {
                            if(result.error){
                                var toast = (LANGUAGE === 'en')? 'Oops,you have not binded this account(' + email + ') in wechat!':'亲，没有绑定此微信的呢...';
                                YoMailPluginEx.ShowToast(toast);
                            }else{
                                var dialogDivNode = document.getElementById('dialogDiv');
                                var dialogTextAreaNode = document.getElementById('dialogTextArea');
                                var dialogSubmitNode = document.getElementById('dialogSubmit');
                                var dialogCancelNode = document.getElementById('dialogCancel');
                                var dialogCloseNode = document.getElementById('dialogClose');
                                var dialogCommonOperation = function () {
                                    addtionalDivNode.style.display = 'none';
                                    dialogDivNode.style.display = 'none';
                                    dialogTextAreaNode.value = '';
                                }
                                dialogDivNode.style.display = 'block';
                                dialogTextAreaNode.focus();
                                dialogSubmitNode.onclick = function () {
                                    var utcTime = new Date().getTime();
                                    YoMailPluginEx.query("com.yomail.pluginex.im").get("wechat").sendMessage(utcTime.toString(), result["third_account"], dialogTextAreaNode.value);
                                    dialogCommonOperation();
                                }
                                dialogCancelNode.onclick = function () {
                                    dialogCommonOperation();
                                }
                                dialogCloseNode.onclick = function () {
                                    dialogCommonOperation();
                                }
                            }
                        });
                    }
                })
            }
        })
        addtionalDivNode.onmouseenter = function () {
            currentContactNode.style.cssText = 'background-color:#eee';
            x = 1;
        }
        addtionalDivNode.onmouseleave = function () {
            currentContactNode.style.cssText = '';
            x = 0;
        }
    }
    // count the unread message
    var count = null,sum,unreadChatNum = 0,sendersObj = {};
    var unreadMsg = function () {
        var sumAgent = 0,unreadChatNumAgent = 0,autoFire = 0,num,selectMenu,senders,senderName,senderUnreadMsgNum,sendersAgentObj = {};
        var notificationList = document.getElementsByClassName('nav-badge');
        for(var i=0;i<notificationList.length;i++){
            if(notificationList[i] && notificationList[i].innerText){
                num = parseInt(notificationList[i].innerText,10);
                if(i === notificationList.length - 1){
                    unreadChatNumAgent = num;
                }
                sumAgent += num;
            }
        }
        if(unreadChatNumAgent !== unreadChatNum){
            selectMenu = document.getElementsByClassName('popover chat-nav-popover-view bottom in');
            if(!selectMenu.length){
                autoFire = 1;
                document.getElementsByClassName('icon icon-chat-group')[0].click();
                selectMenu = document.getElementsByClassName('popover chat-nav-popover-view bottom in');
                selectMenu[0].style.opacity = 0;
            }
            setTimeout(function () {
                senders = document.getElementsByClassName('chat-message-view');
                for(var j=0;j<senders.length;j++){
                    if(senders[j].className === 'chat-message-view'){
                        senderName = senders[j].children[1].firstElementChild.innerText;
                        senderUnreadMsgNum = parseInt(senders[j].lastElementChild.lastElementChild.innerText,10);
                        if(sendersObj[senderName] === undefined || senderUnreadMsgNum > sendersObj[senderName]){
                            YoMailPluginEx.sendNewMessage(senderName);
                        }
                        sendersAgentObj[senderName] = senderUnreadMsgNum;
                    }
                }
                document.getElementsByClassName('close-handler')[0].click();
                sendersObj = sendersAgentObj;
            },100)
        }
        unreadChatNum = unreadChatNumAgent;
        if(sumAgent !== sum && sumAgent !== count){
            sum = sumAgent;
            count = sumAgent;
            YoMailPluginEx.notifyNativeWindow(sumAgent);
        }
    }
    // startup operation
    window.onload = function () {
        var observer = new MutationObserver(function(mutations){
            unreadMsg();  // call unreadMsg()
        });
        observer.observe(document, {childList:true,attributes:true,subtree:true});
        toYomailAndWechat();
    }
})();