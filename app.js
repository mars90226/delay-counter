(function (exports) {
    'use strict';
    
    require("./index.css");
    
    exports.vm = new Vue({
        el: '#app',
        data: {
            title: 'Delay Counter',
            time: '0:0:0'
        }
    });
    
    exports.parseUrl = function () {
        var result = new Map();
        window.location.search
            .substr(1)
            .split("&")
            .forEach(function (item) {
            let temp = item.split("=");
            result.set(temp[0], decodeURIComponent(temp[1]));
        });
        return result;
    }
    
    var params = parseUrl();
    var title = params.get("title");
    if (title !== undefined) {
        vm.title = title;
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
    
    updateCounter();
})(window);