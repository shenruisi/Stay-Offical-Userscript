// ==UserScript==
// @name         简书@AutoExpand
// @namespace    http://stay.app/
// @version      0.0.2
// @description  自动展开简书文章
// @author       Stay²
// @match        *://*.jianshu.com/*
// @run-at       document-start
// @require      stay://vendor/stay-taskloop.js
// @updateURL    https://raw.githubusercontent.com/shenruisi/Stay-Offical-Userscript/main/jianshu/stay-jianshu.update.js
// @downloadURL    https://raw.githubusercontent.com/shenruisi/Stay-Offical-Userscript/main/jianshu/stay-jianshu.user.js
// ==/UserScript==

function removeChoosePanel(){
    let pannel = document.querySelector('.download-app-guidance');
    if (pannel){
        pannel.remove();
        return COMPLETE;
    }
    
    return CONTINUE;
}

function removeAppJump(){
    let app = document.querySelector('button.call-app-btn');
    if (app){
        app.remove();
        return COMPLETE;
    }
    
    return CONTINUE;
}

function unfold(){
    
    
    let closebtn = document.querySelector('button.close-collapse-btn');
    if (closebtn){
        closebtn.click();
        
        let openAppModal = document.querySelector('div.open-app-modal');
        if (openAppModal){
            let cancelbtn = openAppModal.querySelector('button.cancel');
            cancelbtn.click();
        }
        
//        let content = document.querySelector('div.collapse-free-content')
//        if (content){
//            content.className = null;
//        }
//
        return COMPLETE;
    }
    
    return CONTINUE;
}

if (document.readyState != "loading"){
    let tasks = [removeChoosePanel,removeAppJump,unfold];
    Stay_Inject.run(tasks,100,30,false).then((data) => {});
}
else{
    document.addEventListener("DOMContentLoaded", function(event) {
        let tasks = [removeChoosePanel,removeAppJump,unfold];
        Stay_Inject.run(tasks,100,30,false).then((data) => {});
    });
}

