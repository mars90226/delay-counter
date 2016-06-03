'use strict';

require("./index.css");
require("./font.css");
var bsList = require("./bs.json");
var Vue = require('./vue.min.js');

var app = new Vue({
    el: '#app',
    data: {
        title: 'Delay Counter',
        time: '0:0:0',
        bs: 'Some bullshit here'
    }
});

var params = parseUrl();

function parseUrl() {
    var result = new Map();
    window.location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            var temp = item.split("=");
            result.set(temp[0], decodeURIComponent(temp[1]));
        });
    return result;
}

function updateCounter() {
    var startDate = new Date(params.get("startDate"));
    if (isNaN(startDate.getTime())) {
        app.time = "You need to start a date.";
    } else {
        var duration = Math.floor((new Date() - startDate) / 1000);
        var second = duration % 60;
        var minute = Math.floor(duration / 60) % 60;
        var hour = Math.floor(duration / 60 / 60) % 24;
        var day = Math.floor(duration / 60 / 60 / 24);
        app.time = day + ':' + hour + ':' + minute + ':' + second;
    }

    window.setTimeout(updateCounter, 1000);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function init(params) {
    var title = params.get("title");
    if (title !== undefined) {
        app.title = title;
    }
    
    app.bs = bsList[getRandomInt(0, bsList.length)];
}

init(params);
updateCounter();