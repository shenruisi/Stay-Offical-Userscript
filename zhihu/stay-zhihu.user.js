// ==UserScript==
// @name         豆瓣电影在线观看
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  提供在线观看豆瓣电影的链接 
// @author       anc95
// @match        https://movie.douban.com/subject/*
// @include      https://movie.douban.com/subject/*
// @icon         https://www.google.com/s2/favicons?domain=douban.com
// @license      MIT
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