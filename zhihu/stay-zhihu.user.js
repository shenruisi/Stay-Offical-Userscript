// ==UserScript==
// @name         知乎@AutoExpand
// @namespace    http://stay.app/
// @version      0.0.2
// @description  自动展开回答，支持知乎桌面版
// @author       Stay²
// @match        *://*.zhihu.com/*
// @exclude      (http|https)://*.zhihu.com/R_E_D_I_R_E_C_T/*
// @run-at       document-start
// @grant        GM_log
// @require      stay://vendor/stay-taskloop.js
// @updateURL    https://raw.githubusercontent.com/shenruisi/Stay-Offical-Userscript/main/zhihu/stay-zhihu.update.js
// @downloadURL    https://raw.githubusercontent.com/shenruisi/Stay-Offical-Userscript/main/zhihu/stay-zhihu.user.js
// ==/UserScript==
 
function invirant(condition, message) {
    if (!condition) {
      throw '[豆瓣电影在线观看]', '获取电影名失败';
    }
  }
  
  function getMovieName() {
    var innerText = document.querySelector('.related-info').innerText;
    var movieName = innerText.substring(innerText, innerText.indexOf('的剧情简介'));
    invirant(movieName);
  
    return movieName;
  }
  
  function getMovieList(movieName) {
    const url = 'https://api.jackeriss.com/api/v1/search/?text=' + movieName + '&type=0&from=0&size=10';
    return fetch(url)
      .then(function(res) {
        return res.json();
      })
      .then(function({resources}) {
        appendMovieLink(resources);
      })
  }
  
  function ensureContainer() {
    var movieContainer = document.querySelector('.gray_ad');
  
    if (movieContainer && movieContainer.innerText.includes('在哪儿看这部')) {
      return
    }
    var aside = document.querySelector('.aside');
    var grayad = document.createElement('div');
    grayad.className = 'gray_ad';
  
    grayad.innerHTML = [
      '<h2>',
        '在哪儿看这部电影 &nbsp;·&nbsp;·&nbsp;·&nbsp;·&nbsp;·&nbsp;·',
      '</h2>',
      '<ul class="bs">',
      '</ul>'
    ].join('');
    aside.prepend(grayad);
  }
  
  function appendMovieLink(resources) {
    var internalPlatform = ['爱奇艺', '腾讯视频', '优酷', 'bilibili'];
    var movieContainer = document.querySelector('.gray_ad');
  
    function append(resource) {
      if (internalPlatform.includes(resource.website)) {
        return;
      }
  
      var ul = movieContainer.querySelector('ul');
      var htmlContent = [
        '<a class="playBtn" target="_blank" href=', resource.url, '>',
        resource.website,
        '</a>',
        '<span class="buylink-price" style="left: 130px; position: absolute; color: #999;"><span>免费观看</span></span>'
      ].join('');
      var li = document.createElement('li');
      li.innerHTML = htmlContent;
      ul.append(li);
    }
  
    resources.forEach(append);
  }
  
  (function() {
    'use strict';
  
    ensureContainer();
    var movieName = getMovieName();
    getMovieList(movieName);
  })();