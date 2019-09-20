define(function () {
    'use strict';

    var Planet = function (radius, color, path) {
        this.x = 0;
        this.y = 0;
        this.radius = radius || 40;
        this.rotation = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.color = color || '#ff0000';
        this.lineWidth = 1;
        this.path = path || false;
    };

    Planet.prototype = (function () {

        var draw = function (context) {
            context.save();
            context.translate(this.x, this.y);
            context.scale(this.scaleX, this.scaleY);
            context.lineWidth = this.lineWidth;
            if (!this.path) {
                context.fillStyle = this.color;
            }
            context.beginPath();

            context.arc(0, 0, this.radius, 0, (Math.PI * 2), true);
            context.closePath();
            if (!this.path) {
                context.fill();
            }
            if (this.path) {
                context.strokeStyle = this.color;
                context.stroke();
            }
            context.restore();
        };

        return {
            draw: draw
        }

    })();

    return Planet;
});
