// ==UserScript==
// @name         网易@AutoExpand
// @namespace    http://stay.app/
// @version      0.0.1
// @description  自动展开网易文章，解除仅 App 阅读限制
// @author       Stay²
// @match        *://3g.163.com/*
// @grant        GM_addStyle
// @run-at       document-start
// @updateURL    https://raw.githubusercontent.com/shenruisi/Stay-Offical-Userscript/main/netease/stay-netease.update.js
// @downloadURL    https://raw.githubusercontent.com/shenruisi/Stay-Offical-Userscript/main/netease/stay-netease.user.js
// ==/UserScript==

(function () {
    if (typeof GM_addStyle == "undefined") {
        function GM_addStyle(css) {
            let style = document.createElement("style");
            style.appendChild(document.createTextNode(css));
            (document.querySelector("head") || document.documentElement).appendChild(style);
        }
    };
    GM_addStyle(`\
.footer {
    display: none !important;
}
article {
    height: auto !important;
    max-height: none !important;
    overflow: visible !important;
}
article .content .page {
    display: block !important;
}`
    );
    window.addEventListener("load", () => {
        document.querySelectorAll('a[class^="newsapp-model-"]').forEach(_ => _.outerHTML = _.outerHTML);
        document.querySelectorAll('.to-app').forEach(_ => _.remove())
    });
})();