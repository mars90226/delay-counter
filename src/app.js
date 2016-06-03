'use strict';

require("./index.css");
require("./font.css");
var Vue = require('./vue.min.js');

var vm = new Vue({
    el: '#app',
    data: {
        title: 'Delay Counter',
        time: '0:0:0'
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
        vm.time = "You need to start a date.";
    } else {
        var duration = Math.floor((new Date() - startDate) / 1000);
        var second = duration % 60;
        var minute = Math.floor(duration / 60) % 60;
        var hour = Math.floor(duration / 60 / 60) % 24;
        var day = Math.floor(duration / 60 / 60 / 24);
        vm.time = day + ':' + hour + ':' + minute + ':' + second;
    }

    window.setTimeout(updateCounter, 1000);
}

function init(params) {
    var title = params.get("title");
    if (title !== undefined) {
        vm.title = title;
    }
}

init(params);
updateCounter();