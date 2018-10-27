/**
 * Created by linwh on 2017/7/3.
 */

;(function () {
    function GetQueryString(name) {
        let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        let r = window.location.search.substr(1).match(reg);
        if(r!=null)return  decodeURI(r[2]); return null;
    }
    var showPic = GetQueryString("nobanner");
    var host = document.getElementsByTagName('body')[0];
    var dom = document.createElement('div');
    dom.innerHTML = `<div id="downloadapp" style="height:1.52rem;background: #130025;position: fixed;bottom:0;left:0;right:0;color:#FFF;display: flex;align-items: center;padding:0.29rem 0.4rem;z-index: 2;">
                      <div style="width:1.46rem;height:1.46rem;margin-right:0.5rem;">
                        <img src="https://gw.alicdn.com/tfs/TB1q4GmRFXXXXcnXVXXXXXXXXXX-111-111.png" alt="logo" style="width:100%;height:100%;float:left;">
                      </div>
                      <div style="">
                        <h2 style="line-height:0.6rem;font-weight: normal;font-size:0.45rem;">
                          去福利中心领奖励吧！
                        </h2>
                        <p style="font-size:0.37rem;line-height:0.6rem;">
                          beyond电竞
                        </p>
                      </div>
                      <div id="godownload" style="margin-left:auto;font-size:0.37rem;width:1.95rem;height:0.8rem;line-height:0.8rem;background:#ea3234;border-radius:5px;text-align:center;">
                        去下载
                      </div>
                  </div>`;
    //console.log(host);
    host.appendChild(dom);
    var godownload = document.getElementById('godownload');
    var downloadbox = document.getElementById('downloadapp');
    godownload.onclick = function () {
        window.location.href = 'alisportswesg://func_webview?url='+window.location.href;
        setTimeout(function () {
            window.location.href = `http://beyond.alisports.com/download/app.php?from=huodong2`;
        },1500);
    };
    var explorer = window.navigator.userAgent;
    if (showPic == 1 || explorer.indexOf("esports-platform/Android") >= 0 || explorer.indexOf("esports-platform/iPhone") >= 0) {
        downloadbox.style.display = 'none';
    }
})()
