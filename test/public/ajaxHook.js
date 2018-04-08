(function () {
    //存放请求后台的参数
    var arr = [];
    var xhr = [];
    //数组内对象的索引兼id
    var idx = 0;
    !function (ob) {
        ob.hookAjax = function (funs, callback) {
            window._ahrealxhr = window._ahrealxhr || XMLHttpRequest;
            XMLHttpRequest = function () {
                this.xhr = new window._ahrealxhr;
                xhr[idx] = {};
                xhr[idx].xhr = this;
                xhr[idx].id = idx;
                arr[idx] = {};
                arr[idx].id = idx;
                for (var attr in this.xhr) {
                    var type = "";
                    try {
                        type = typeof this.xhr[attr];
                    } catch (e) {
                    }
                    if (type === "function") {
                        this[attr] = hookfun(attr);
                    } else {
                        Object.defineProperty(this, attr, {
                            get: getFactory(attr),
                            set: setFactory(attr)
                        })
                    }
                }
                idx++;
            };

            function getFactory(attr) {
                return function () {
                    return this.hasOwnProperty(attr + "_") ? this[attr + "_"] : this.xhr[attr];
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
                        return;
                    }
                    return this.xhr[fun].apply(this.xhr, args);
                }
            }

            return window._ahrealxhr;
        };
        ob.unHookAjax = function () {
            if (window._ahrealxhr) XMLHttpRequest = window._ahrealxhr;
            window._ahrealxhr = undefined;
        };
    }(window);
    //配置内容
    var param = {
        count: 2,
        time: 2000,
        open: function (arg) {
            for (var k = 0; k < xhr.length; k++) {
                if (xhr[k].xhr == this) {
                    arr[k].method = arg[0];
                    arr[k].path = arg[1];
                    arr[k].async = arg[2] == undefined ? true : arg[2];
                    arr[k].xhr = this;
                    xhr[k].open = true;
                }
            }
        },
        setRequestHeader: function (headers) {
            for (var k = 0; k < xhr.length; k++) {
                if (xhr[k].xhr == this) {
                    arr[k].headers = arr[k].headers || {};
                    arr[k].headers[headers[0]] = headers[1];
                }
            }
        },
        send: function (data) {
            if (data.length > 0) {
                for (var k = 0; k < xhr.length; k++) {
                    if (xhr[k].xhr == this) {
                        arr[k].data = JSON.parse(data[0]);
                    }
                }
            }
            for (var k = 0; k < xhr.length; k++) {
                if (xhr[k].open && xhr[k].xhr == this) {
                    xhr[k].send = true;
                }
                var effectiveNum = effectiveXhr();
                if (effectiveNum >= param.count) {
                    sendXHRFun();
                }
            }
            return true;
        }
    };
    //调用拦截功能
    hookAjax(param);
    //定时发送请求
    var sendXHR = setInterval(sendXHRFun, param.time);
    //发送请求
    function sendXHRFun() {
        console.log("执行发送",Date.now());
        //判断是否需要合并发送
        var effectiveNum = effectiveXhr();
        if (effectiveNum >= 2 && param.count != 1) {
            console.log("合并发送");
            unHookAjax();
            var XHR = new XMLHttpRequest();
            XHR.open('post', "/all?timestamp=" + Date.now(), false);
            XHR.setRequestHeader("Content-type", "application/json");
            XHR.onreadystatechange = function () {
                if (XHR.readyState == 4 && XHR.status == 200 || XHR.status == 304) {
                    var data = JSON.parse(XHR.responseText).data;
                    for (var i = 0; i < arr.length; i++) {
                        for (var j = 0; j < data.length; j++) {
                            if (arr[i].id == data[j].id) {
                                arr[i].xhr.responseText = JSON.stringify(data[j]);
                                arr[i].xhr.readyState = 4;
                                arr[i].xhr.status = 200;
                                arr[i].xhr.onreadystatechange();
                            }
                        }
                    }
                } else {
                    console.log("访问失败");
                }
                xhr.splice(0, param.count);
                arr.splice(0, param.count);
                idx = xhr.length;
                hookAjax(param);
            };
            XHR.send(JSON.stringify({"data": arr.slice(0, param.count)}));
        } else if (effectiveNum > 0) {
            for (var k = 0; k < xhr.length; k++) {
                if (xhr[k].open && xhr[k].send) {
                    console.log("单个发送");
                    unHookAjax();
                    for (var key in window) {
                        if (window[key] == arr[k].xhr) {
                            var fun = arr[k].xhr.onreadystatechange;
                            window[key] = new XMLHttpRequest();
                            window[key].open(arr[k].method, arr[k].path, arr[k].async);
                            for (var j in arr[k].xhr.headers) {
                                window[key].setRequestHeader(j, arr[k].headers[j]);
                            }
                            window[key].onreadystatechange = fun;
                            window[key].send();
                            arr.shift();
                            xhr.shift();
                            return true;
                        }
                    }
                }
            }
            if (xhr.length == 0) {
                clearInterval(sendXHR);
            }
        }
    }
    //判断可发送的请求有几个
    function effectiveXhr() {
        var effectiveXhr = 0;
        //处理连两个数组，使得需要发送的数据置顶
        for(var l = 0;l<xhr.length;l++){
            if(xhr[l].open && xhr[l].send && xhr[l-1]){
                if(!xhr[l-1].open || !xhr[l-1].send){
                    var temp = xhr[l];
                    xhr.splice(l,1);
                    xhr.splice(l-1,0,temp);
                    // xhr.push(temp);
                    var temp1 = arr[l];
                    arr.splice(l,1);
                    arr.splice(l-1,0,temp1);
                    l--;
                }
            }
        }
        for (var k = 0; k < xhr.length; k++) {
            if(xhr[k].open && xhr[k].send){
                effectiveXhr++;
            }
        }
        return effectiveXhr;
    }
})();
