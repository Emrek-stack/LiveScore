feed = (function () {

    var socket = io();

    return {
        onChange: function (callback) {
            socket.on('goals', callback);
        }
    };

}());