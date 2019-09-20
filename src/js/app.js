/*global define:false */
define(function (require) {
	
	'use strict';

    var SolarSystem = require('modules/SolarSystem');
	
    var App = (function () {

        var init = function () {
            new SolarSystem();
        };

        return {
            init: init
        };

    }());

	return App;
});
