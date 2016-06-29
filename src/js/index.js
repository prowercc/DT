//加载js
window.onload = function () {
    TabBanner()
    flow(20,20);
    changFlowTop();
    returnTop();
    var ul = document.getElementById("flow-box");
    var aBtn = true;

    //下拉加载数据
    window.onscroll = function () {
        if(checkScrollSlide() && aBtn) {
            aBtn = false;
            ajax("data.json",function (str) {
                var data = JSON.parse(str);
                for(var i = 0; i < data.src.length; i++) {
                    var oLi = document.createElement("li");
                    oLi.innerHTML = '<a href="javascript:;"><img src="'+ data.src[i] +'"></a><div class="flow-top"><p>韩国马丁雨靴女装 韩版中筒水鞋防滑平跟水靴 秋冬套鞋时尚雨鞋女</p><p><i class="i1"></i><span class="i1-span">40</span><i class="i2"></i><span class="i2-span">1</span></p></div><div class="flow-bottom"><div class="flow-bottom-fl"><a href="javascript:;"><img src="img/head.jpeg"></a></div><div class="flow-bottom-fr"><p><a href="javascript:;">非一般猫</a></p><p><span>收集到</span><a href="javascript:;">无美不收</a></p></div></div><div class="flow-tip"><div class="mask"></div><div class="flow-tip-collection"><i class="red-star"></i><span>收集</span><span>376</span></div><i class="flow-zan"></i><i class="flow-message"></i></div>';
                    ul.appendChild(oLi);
                }
            });
        }
        flow(20,20);
        changFlowTop();
    }
}

//检测是否加载数据块
function checkScrollSlide() {
    var ul = document.getElementById("flow-box");
    var li = ul.getElementsByTagName("li");
    var viewHeight = document.documentElement.clientHeight;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;

    for(var i = 0; i < li.length; i++) {
        var lastLi = li[li.length - 1];
        return (posTop(lastLi) < viewHeight + scrollY) ? true : false;
    }
}

//改变窗口大小时重新布局
var re = null;
window.onresize = function() {
    clearTimeout(re);
    re = setTimeout(function() {flow(20,20);}, 200);
}

//瀑布流头部显示隐藏
function changFlowTop() {
    var ul = document.getElementById("flow-box");
    var li = ul.getElementsByTagName("li");
    for(var j = 0; j < li.length; j++) {
        li[j].onmouseover = function () {
            var oFlpwTip = getByClass(this,"flow-tip")[0];
            oFlpwTip.style.display = "block";
        }
        li[j].onmouseout = function () {
            var oFlpwTip = getByClass(this,"flow-tip")[0];
            oFlpwTip.style.display = "none";
        }
    }
}

//瀑布流布局
function flow(mh,mv) { //参数mh和mv是定义数据块之间的间距，mh是水平距离，mv是垂直距离
    var ul = document.getElementById("flow-box");
    var li = ul.getElementsByTagName("li");
    var iw = li[0].offsetWidth + mh; //计算数据块的宽度
    var c = Math.floor(ul.offsetWidth / iw); //计算列数
    var liLen = li.length;
    var lenArr = [];
    for(var i = 0; i < liLen; i++) { //遍历每一个数据块将高度记入数组
        lenArr.push(li[i].offsetHeight);
    }

    var oArr = [];
    for(var i = 0; i < c; i++) { //把第一行排放好，并将每一列的高度记入数据oArr
        li[i].style.top = 0;
        li[i].style.left = iw * i + "px";
        oArr.push(lenArr[i]);
    }

    for(var i = c; i < liLen; i++) {
        var x = getMinKey(oArr); //获取最短的一列的索引值
        li[i].style.top = oArr[x] + mv + "px";
        li[i].style.left = iw * x + "px";
        oArr[x] = lenArr[i] + oArr[x] + mv;
    }

    getUlHeight(ul,li,c);

}

//获取最后一列最高的li
function getUlHeight(oUl,oLi,col) {
    var oMaxArr = [];
    for(var i = oLi.length - col; i < oLi.length; i++) {
        oMaxArr[i] = oLi[i].offsetTop + oLi[i].offsetHeight;
    }
    oUl.style.height = getMaxKey(oMaxArr,oLi.length - col) + "px";
}

//获取元素到顶部的距离
function posTop(obj) {
    var top = 0;
    while(obj) {
        top += obj.offsetTop;
        obj = obj.offsetParent;
    }
    return top;
}

//获取数组最大值
function getMaxKey(arr,x) {
    var a = arr[x];
    for(var i in arr) {
        if(arr[i] > a) {
            a = arr[i];
        }
    }
    return a;
}

//获取数组最小索引
function getMinKey(arr) {
    var a = arr[0];
    var b = 0;
    for(var i in arr) {
        if(arr[i] < a) {
            a = arr[i];
            b = i;
        }
    }
    return b;
}

//返回顶部
function returnTop() {
    var oFixBtn = document.getElementById("fix-btn");
    var oReturnTop = document.getElementById("returntop");
    var oMobileSoft = document.getElementById("mobilesoft");
    var oFeedBack = document.getElementById("feedback");
    window.onscroll = function () {
        var oTop = document.documentElement.scrollTop || document.body.scrollTop;
        if(oTop > 50) {
            oFixBtn.style.display = "block";
            startMoveChange(oFixBtn,{opacity:100});
        }
        else {
            startMoveChange(oFixBtn,{opacity:0});
            oFixBtn.style.display = "none";
        }
    }
    oMobileSoft.onmouseover = function () {
        oMobileSoft.style.backgroundImage = "url()";
        oMobileSoft.innerHTML = "手机应用";
    }
    oMobileSoft.onmouseout = function () {
        oMobileSoft.style.backgroundImage = "url(img/return-top.png)";
        oMobileSoft.style.backgroundPositionX = "10px";
        oMobileSoft.style.backgroundPositionY = "-36px";
        oMobileSoft.innerHTML = "";
    }
    oFeedBack.onmouseover = function () {
        oFeedBack.style.backgroundImage = "url()";
        oFeedBack.innerHTML = "反馈意见";
    }
    oFeedBack.onmouseout = function () {
        oFeedBack.style.backgroundImage = "url(img/return-top.png)";
        oFeedBack.style.backgroundPositionX = "10px";
        oFeedBack.style.backgroundPositionY = "-82px";
        oFeedBack.innerHTML = "";
    }
    oReturnTop.onmouseover = function () {
        oReturnTop.style.backgroundImage = "url()";
        oReturnTop.innerHTML = "返回顶部";
    }
    oReturnTop.onmouseout = function () {
        oReturnTop.style.backgroundImage = "url(img/return-top.png)";
        oReturnTop.style.backgroundPositionX = "10px";
        oReturnTop.style.backgroundPositionY = "11px";
        oReturnTop.innerHTML = "";
    }
    oReturnTop.onclick = function () {
        var timer = null;
        clearInterval(timer);
        var speed = Math.ceil(document.documentElement.scrollTop) / 10 || Math.ceil(document.body.scrollTop) / 10;
        timer = setInterval(function () {
            if(document.documentElement.scrollTop || document.body.scrollTop > 0) {
                document.documentElement.scrollTop -= speed;
                document.body.scrollTop -= speed;
            }
            else {
                clearInterval(timer);
            }
        }, 30);
    }
}

//banner切换动画
function TabBanner() {
    var oDivNav = document.getElementById("main-img-nav");
    var oDivMainImg = document.getElementById("main-img");
    var oUl = oDivMainImg.getElementsByTagName("ul")[0];
    var aLiImg = oUl.getElementsByTagName("li");
    var aLiNav = oDivNav.getElementsByTagName("li");
    var oSpan1 = document.getElementById("nav-span1");
    var oSpan2 = document.getElementById("nav-span2");
    var oBtnPrev = document.getElementById("a-btnl");
    var oBtnNext = document.getElementById("a-btnr");

    var aSpan1 = ["一路走一路拍","书桌上的一抹绿色","我的青春，活在书里","梦想到达的地方","小打小闹的烘焙"];
    var aSpan2 = ["by 郑容和_脑残粉","by 下不了海的渔夫","by 他的怠慢","by _白日梦想家","by Doveyyy"];
    var now = 0;

    for(var i = 0; i < aLiNav.length; i++) {
        aLiNav[i].index = i;
        aLiNav[i].onclick = function () {
            now = this.index;
            tab();
        }
    }

    function tab() {
        for(var i = 0; i < aLiNav.length; i++) {
            aLiNav[i].style.backgroundPositionX = -438 + "px";
        }
        aLiNav[now].style.backgroundPositionX = -462 + "px";
        oSpan1.innerHTML = aSpan1[now];
        oSpan2.innerHTML = aSpan2[now];
        startMoveChange(oUl,{left:-aLiImg[0].offsetWidth*now});
    }

    oBtnNext.onclick = function () {
        now++;
        if(now == aLiNav.length) {
            now = 0;
        }
        tab();
    }

    oBtnPrev.onclick = function () {
        now--;
        if(now == -1) {
            now = aLiNav.length - 1;
        }
        tab();
    }

    oDivMainImg.onmouseover = function () {
        oBtnPrev.style.opacity = 1;
        oBtnPrev.style.filter = 'alpha(opacity:' + 100 + ')';
        oBtnNext.style.opacity = 1;
        oBtnNext.style.filter = 'alpha(opacity:' + 100 + ')';
        clearInterval(timer);
    }
    oDivMainImg.onmouseout = function () {
        oBtnPrev.style.opacity = 0;
        oBtnPrev.style.filter = 'alpha(opacity:' + 0 + ')';
        oBtnNext.style.opacity = 0;
        oBtnNext.style.filter = 'alpha(opacity:' + 0 + ')';
        timer = setInterval(function () {
            oBtnNext.onclick();
        },5000);
    }

    timer = setInterval(function () {
        oBtnNext.onclick();
    },5000);

}

//加载多个函数
function addLoadEvent(func) {
    var oldonload = window.onloadl
    if(typeof window.onload != 'function') {
        window.onload = func;
    }
    else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}

//获取行外样式
function getStyle(obj, attr) {
    if(obj.currentStyle) {
        return obj.currentStyle[attr];
    }
    else {
        return getComputedStyle(obj, false)[attr];
    }
}

//通过class获取元素
function getByClass(oParent, sClass) {
    var aElem = oParent.getElementsByTagName("*");
    var aResult = [];
    for(var i = 0; i < aElem.length; i++) {
        if(aElem[i].className == sClass) {
            aResult.push(aElem[i]);
        }
    }
    return aResult;
}

//变速完美运动框架
function startMoveChange(obj, json, fnEnd) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var bStop = true;
        for(var attr in json) {
            var cur = 0;
            if(attr == "opacity") {
                cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
            }
            else {
                cur = parseInt(getStyle(obj, attr));
            }
            var speed = (json[attr] - cur) / 5;
            if(speed > 0) {
                speed = Math.ceil(speed);
            }
            else {
                speed = Math.floor(speed);
            }
            if(cur != json[attr]) {
                bStop = false;
            }
            if(attr == "opacity") {
                obj.style.opacity = (cur + speed) / 100;
                obj.style.filter = "alpha(opacity:" + (cur + speed) + ")";
            }
            else {
                obj.style[attr] = cur + speed + "px";
            }
        }
        if(bStop) {
            clearInterval(obj.timer);
            if(fnEnd) {
                fnEnd();
            }
        }
    }, 30);
}

//匀速完美运动框架
function startMoveUniform(obj, json, fnEnd) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var bStop = true;
        for(var attr in json) {
            var cur = 0;
            if(attr == "opacity") {
                cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
            }
            else {
                cur = parseInt(getStyle(obj, attr));
            }
            var speed = 0;
            if(json[attr] - cur > 0) {
                speed = 7;
            }
            else {
                speed = -7;
            }
            if(cur != json[attr]) {
                bStop = false;
            }
            if(attr == "opacity") {
                if(Math.abs(json[attr] - cur) < Math.abs(speed)) {
                    obj.style.opacity = json[attr] / 100;
                    obj.style.filter = "alpha(opacity:" + json[attr] + ")";
                }
                else {
                    obj.style.opacity = (cur + speed) / 100;
                    obj.style.filter = "alpha(opacity:" + (speed + cur) + ")";
                }
            }
            else {
                if(Math.abs(json[attr] - cur) < Math.abs(speed)) {

                    obj.style[attr] = json[attr] + "px";
                }
                else {
                    obj.style[attr] = cur + speed + "px";
                }
            }
        }
        if(bStop) {
            clearInterval(obj.timer);
            if(fnEnd) {
                fnEnd();
            }
        }
    }, 30);
}
