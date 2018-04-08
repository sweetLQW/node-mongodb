(function () {
    //存放单次请求后台的参数
    var arr = [];
    //数组内对象的索引
    var idx = 0;
    //共有几个数组
    var arrIdx = 1;
    //页面本身共有几个xhr请求
    var xhrCount = 0;
    !function (ob) {
        ob.hookAjax = function (funs,callback) {
            window._ahrealxhr = window._ahrealxhr || XMLHttpRequest;
            // XMLHttpRequest.a = "a";
            if(xhrCount == 0) {
                var k = 0;
                for (var key in window) {
                    if (window.hasOwnProperty(key)) {
                        k++;
                    }
                }
            }
            XMLHttpRequest = function () {
                if(xhrCount == 0){
                    var j = 0;
                    for(var key in window){
                        if(window.hasOwnProperty(key)) {
                            j++;
                        }
                    }
                    xhrCount = j-k-2;
                    console.log(xhrCount);
                }
                this.xhr = new window._ahrealxhr;
                for (var attr in this.xhr) {
                    var type = "";
                    try {
                        type = typeof this.xhr[attr];
                    } catch (e) {}
                    if (type === "function") {
                        this[attr] = hookfun(attr);
                    } else {
                        Object.defineProperty(this, attr, {
                            get: getFactory(attr),
                            set: setFactory(attr)
                        })
                    }
                }
            };

            function getFactory(attr) {
                return function () {
                    return this.hasOwnProperty(attr + "_")?this[attr + "_"]:this.xhr[attr];
                }
            }

            function setFactory(attr) {
                return function (f) {
                    var xhr = this.xhr;
                    var that = this;
                    if (attr.indexOf("on") != 0) {
                        this[attr + "_"] = f;
                        return;
                    }
                    if (funs[attr]) {
                        xhr[attr] = function () {
                            funs[attr](that) || f.apply(xhr, arguments);
                        }
                    } else {
                        xhr[attr] = f;
                    }
                }
            }

            function hookfun(fun) {
                return function () {
                    var args = [].slice.call(arguments);
                    if (funs[fun] && funs[fun].call(this, args, this.xhr)) {
                        callback(funs);
                        return;
                    }
                    return this.xhr[fun].apply(this.xhr, args);
                }
            }
            return window._ahrealxhr;
        };
        ob.unHookAjax = function () {
            if (window._ahrealxhr)  XMLHttpRequest = window._ahrealxhr;
            window._ahrealxhr = undefined;
        };
    }(window);
    //配置内容
    var param = {
        count:2,
        open:function(arg){
            var obj = {};
            obj.method = arg[0];
            obj.path = arg[1];
            obj.xhr = this;
            arr[idx++] = obj;
        },
        setRequestHeader:function (headers) {
            arr[idx-1].headers = {"Content-type":headers[1]};
        },
        send:function (data) {
            if (data.length > 0) {
                arr[idx-1].data = JSON.parse(data[0]);
            }
            return true;
        }
    };
    //回调-统一请求后台
    function callback(params){
        if (params.count == idx) {
            console.log("发送");
            idx = 0;
            unHookAjax();
            var XHR = new XMLHttpRequest();
            XHR.open('post',"/all?timestamp="+Date.now(),false);
            XHR.setRequestHeader("Content-type", "application/json");
            XHR.onreadystatechange = function () {
                if (XHR.readyState == 4 && XHR.status == 200 || XHR.status == 304) {
                    var data = JSON.parse(XHR.responseText).data;
                    // console.log(data);
                    // console.log(arr);
                    for(var i = 0;i<arr.length;i++){
                        for(var j = 0;j<data.length;j++){
                            if(arr[i].path == data[j].path){
                                arr[i].xhr.responseText = JSON.stringify(data[j]);
                                arr[i].xhr.readyState = 4;
                                arr[i].xhr.status = 200;
                                arr[i].xhr.onreadystatechange();
                            }
                        }
                    }
                    if(arrIdx*params.count+xhrCount%params.count == xhrCount){
                        unHookAjax();
                    }else{
                        hookAjax(param,callback);
                        arrIdx++;
                    }
                    arr = [];
                    idx = 0;
                }else{
                    console.log("访问失败");
                }
            };
            XHR.send(JSON.stringify({"data":arr}));
        }
    }
    //调用拦截功能
    hookAjax(param,callback);
})();
