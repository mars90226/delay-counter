(function (exports) {
    'use strict';
    
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
        if (startDate === undefined) {
            var date = new Date();
            var hour = date.getHours();
            var minute = date.getMinutes();
            var second = date.getSeconds();
            vm.time = hour + ':' + minute + ':' + second;
        } else {
            var duration = Math.floor((new Date() - startDate) / 1000);
            var second = duration % 60;
            var minute = Math.floor(duration / 60) % 60;
            var hour = Math.floor(duration / 60 / 60) % 60;
            var day = Math.floor(duration / 60 / 60 / 24);
            vm.time = day + ':' + hour + ':' + minute + ':' + second;
        }
        
        window.setTimeout(update, 1000);
    }
    
    updateCounter();
})(window);