define(function () {
    'use strict';

    var Labels = function (name) {
        this.x = 0;
        this.y = 0;

        this.name = name;
    };

    Labels.prototype = (function () {

        var setLabel = function (context) {
            context.fillStyle = '#ffffff';
            context.fillText(this.name, this.x, this.y);
        };

        return {
            setLabel: setLabel
        };
    })();

    return Labels;
});
