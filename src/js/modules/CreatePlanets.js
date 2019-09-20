define(function (require) {
    'use strict';

    var config = require('../config');
    var Planet = require('modules/Planet');
    var Labels = require('modules/Labels');

    var CreatePlanets = function () {
        this.angle = 0;
        this.create();
    };

    CreatePlanets.prototype = (function () {

        var attributes = {
            colors: {
                'mercury': '#929091',
                'venus': '#ac9159',
                'earth': '#01bdfc',
                'mars': '#ff9906',
                'jupiter': '#7eb2ae',
                'saturn': '#fd3900',
                'uranus': '#587d98',
                'neptune': '#a0e6c4',
                'pluto': '#c2c3c5'
            },
            radius: {
                'mercury': 25,
                'venus': 50,
                'earth': 75,
                'mars': 100,
                'jupiter': 125,
                'saturn': 220,
                'uranus': 280,
                'neptune': 340,
                'pluto': 390
            }
        };

        var create = function () {

            config.planets.push({
                'name': 'Mercury',
                '0': new Planet(5, attributes.colors.mercury),
                'radius': attributes.radius.mercury,
                'speed': 0.009,
                'angle': this.angle,
                'label': new Labels('Mercury'),
                'path': new Planet(attributes.radius.mercury, attributes.colors.mercury, 'path'),
                'details': {
                    'discovery': 'Known to the ancients and visible to the naked eye',
                    'namedFor': 'Messenger of the Roman gods',
                    'diameter': '3,031 miles (4,878 km)',
                    'orbit': '88 Earth days',
                    'day': '58.6 Earth days'
                }
            });

            config.planets.push({
                'name': 'Venus',
                '1': new Planet(4, attributes.colors.venus),
                'radius': attributes.radius.venus,
                'speed': 0.008,
                'angle': this.angle,
                'label': new Labels('Venus'),
                'path': new Planet(attributes.radius.venus, attributes.colors.venus, 'path'),
                'details': {
                    'discovery': 'Known to the ancients and visible to the naked eye',
                    'namedFor': 'Roman goddess of love and beauty',
                    'diameter': '7,521 miles (12,104 km)',
                    'orbit': '225 Earth days',
                    'day': '241 Earth days'
                }
            });

            config.planets.push({
                'name': 'Earth',
                '2': new Planet(8, attributes.colors.earth),
                'radius': attributes.radius.earth,
                'speed': 0.007,
                'angle': this.angle,
                'label': new Labels('Earth'),
                'path': new Planet(attributes.radius.earth, attributes.colors.earth, 'path'),
                'details': {
                    'diameter': '7,926 miles (12,760 km)',
                    'orbit': '365.24 days',
                    'day': '23 hours, 56 minutes'
                }
            });

            config.planets.push({
                'name': 'Mars',
                '3': new Planet(6.5, attributes.colors.mars),
                'radius': attributes.radius.mars,
                'speed': 0.006,
                'angle': this.angle,
                'label': new Labels('Mars'),
                'path': new Planet(attributes.radius.mars, attributes.colors.mars, 'path'),
                'details': {
                    'discovery': 'Known to the ancients and visible to the naked eye',
                    'namedFor': 'Roman god of war',
                    'diameter': '4,217 miles (6,787 km)',
                    'orbit': '687 Earth days',
                    'day': 'Just more than one Earth day (24 hours, 37 minutes)'
                }
            });

            config.planets.push({
                'name': 'Jupiter',
                '4': new Planet(7, attributes.colors.jupiter),
                'radius': attributes.radius.jupiter,
                'speed': 0.005,
                'angle': this.angle,
                'label': new Labels('Jupiter'),
                'path': new Planet(attributes.radius.jupiter, attributes.colors.jupiter, 'path'),
                'details': {
                    'discovery': 'Known to the ancients and visible to the naked eye',
                    'namedFor': 'Ruler of the Roman gods',
                    'diameter': '86,881 miles (139,822 km)',
                    'orbit': '11.9 Earth years',
                    'day': '9.8 Earth hours'
                }
            });

            config.planets.push({
                'name': 'Saturn',
                '5': new Planet(18, attributes.colors.saturn),
                'radius': attributes.radius.saturn,
                'speed': 0.004,
                'angle': this.angle,
                'label': new Labels('Saturn'),
                'path': new Planet(attributes.radius.saturn, attributes.colors.saturn, 'path'),
                'details': {
                    'discovery': 'Known to the ancients and visible to the naked eye',
                    'namedFor': 'Roman god of agriculture',
                    'diameter': '74,900 miles (120,500 km)',
                    'orbit': '29.5 Earth years',
                    'day': 'About 10.5 Earth hours'
                }
            });

            config.planets.push({
                'name': 'Uranus',
                '6': new Planet(6.5, attributes.colors.uranus),
                'radius': attributes.radius.uranus,
                'speed': 0.003,
                'angle': this.angle,
                'label': new Labels('Uranus'),
                'path': new Planet(attributes.radius.uranus, attributes.colors.uranus, 'path'),
                'details': {
                    'discovery': '1781 by William Herschel (was thought previously to be a star)',
                    'namedFor': 'Personification of heaven in ancient myth',
                    'diameter': '31,763 miles (51,120 km)',
                    'orbit': '84 Earth years',
                    'day': '18 Earth hours'
                }
            });

            config.planets.push({
                'name': 'Neptune',
                '7': new Planet(7, attributes.colors.neptune),
                'radius': attributes.radius.neptune,
                'speed': 0.002,
                'angle': this.angle,
                'label': new Labels('Neptune'),
                'path': new Planet(attributes.radius.neptune, attributes.colors.neptune, 'path'),
                'details': {
                    'discovery': '1846',
                    'namedFor': 'Roman god of water',
                    'diameter': '30,775 miles (49,530 km)',
                    'orbit': '165 Earth years',
                    'day': '19 Earth hours'
                }
            });

            config.planets.push({
                'name': 'Pluto',
                '8': new Planet(6.5, attributes.colors.pluto),
                'radius': attributes.radius.pluto,
                'speed': 0.001,
                'angle': this.angle,
                'label': new Labels('Pluto'),
                'path': new Planet(attributes.radius.pluto, attributes.colors.pluto, 'path'),
                'details': {
                    'discovery': '1930 by Clyde Tombaugh',
                    'namedFor': 'Roman god of the underworld, Hades',
                    'diameter': '1,430 miles (2,301 km)',
                    'orbit': '248 Earth years',
                    'day': '6.4 Earth day'
                }
            });
 
            config.planets.push({
                'name': 'moon',
                '9': new Planet(2.5, '#ffffff'),
                'radius': 16,
                'speed': 0.002,
                'angle': 0,
                'label': new Labels('Moon'),
                'path': new Planet(attributes.radius.earth, attributes.colors.earth, 'path')
            });
        };

        return {
            create: create
        };

    })();

    return CreatePlanets;
});
