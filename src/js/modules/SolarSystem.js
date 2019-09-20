define(function (require) {
    'use strict';

    var Planet = require('modules/Planet'),
        config = require('../config'),
        CreatePlanets = require('modules/CreatePlanets');

    var SolarSystem = function () {
        var $btnPath = document.querySelector('.btnTogglePath'),
            $btnToggleLabels = document.querySelector('.btnToggleLabels'),
            $btnSpeedUp = document.querySelector('.btnSpeedUp'),
            $btnSpeedDown = document.querySelector('.btnSpeedDown');
 
        this.$btnToggleTransition = document.querySelector('.btnToggleTransition');
        this.$details = document.querySelector('.planetDetails');
        this.$message = document.querySelector('.speedMessage');
        this.$canvas = document.querySelector('.SolarSystem');
        this.context = this.$canvas.getContext('2d');

        var $canvas = this.$canvas.getBoundingClientRect();

        this.isPlay = true;
        this.requestId = null;
        this.time;
        this.delta;
        this.transitionSpeed = 0.000;
        this.$canvasPosition = {
            left: $canvas.left,
            top: $canvas.top
        };

        new CreatePlanets();

        this.setCanvasAttributes();
        this.createSun();

        $btnPath.addEventListener('click', this.togglePaths.bind(this));
        $btnToggleLabels.addEventListener('click', this.toggleLabels.bind(this));
        $btnSpeedUp.addEventListener('click', this.speedUp.bind(this));
        $btnSpeedDown.addEventListener('click', this.speedDown.bind(this));
        this.$btnToggleTransition.addEventListener('click', this.toggleTransition.bind(this));
        this.$canvas.addEventListener('click', this.handleDetailClick.bind(this));
    };

    SolarSystem.prototype = (function () {

        var meta = {
            'planetInfoLabels': {
                'name': '<b>Name:</b>',
                'discovery': '<b>Discovery:</b>',
                'namedFor': '<b>Named for:</b>',
                'diameter': '<b>Diameter:</b>',
                'orbit': '<b>Orbit:</b>',
                'day': '<b>Day:</b>'
            },
            'speedMessage': {
                'maxSpeed': 'Maximum Speed',
                'minSpeed': 'Minimum Speed'
            }
        };

        var setCanvasAttributes = function () {
            this.$canvas.width = window.innerWidth - 120;
            this.$canvas.height = window.innerHeight;
        },

        handleDetailClick = function (e) {
            var mouse = {
                x: e.pageX - this.$canvasPosition.left,
                y: e.pageY - this.$canvasPosition.top
            }, self = this, $li, text = '';

            config.planets.forEach(function (planet, index) {
                var dx = mouse.x - planet[index].x,
                    dy = mouse.y - planet[index].y,
                    dist = Math.sqrt(dx * dx + dy * dy);
                                
                if (dist < planet[index].radius && self.transitionSpeed <= 0.001) {
                    $li = document.createElement('li');

                    text += meta.planetInfoLabels.name + ' ' + planet.name + '<br>';

                    if (planet.name !== 'Earth') {
                        text += meta.planetInfoLabels.discovery + ' ' + planet.details.discovery + '<br>';
                        text += meta.planetInfoLabels.namedFor + ' ' + planet.details.namedFor + '<br>';
                    }

                    text += meta.planetInfoLabels.diameter + ' ' + planet.details.diameter + '<br>';
                    text += meta.planetInfoLabels.orbit + ' ' + planet.details.orbit + '<br>';
                    text += meta.planetInfoLabels.day + ' '  + planet.details.day + '<br>';

                    $li.innerHTML = text;

                    self.$details.innerHTML = '';

                    self.$details.appendChild($li);
                }
            });
        },

        speedUp = function (e) {
            if (this.transitionSpeed <= 0.1) {
                this.transitionSpeed += 0.001;
                this.$message.innerHTML = '';
            } else {
                this.$message.innerHTML = meta.speedMessage.maxSpeed;
            }

            this.transitionSpeed.toFixed(2);
            e.preventDefault();
        },

        speedDown = function (e) {
            if (this.transitionSpeed >= 0.001) {
                this.transitionSpeed -= 0.001;
                this.$message.innerHTML = '';
            } else {
                this.$message.innerHTML = meta.speedMessage.minSpeed;
            }

            this.transitionSpeed.toFixed(2);
            e.preventDefault();
        },

        toggleLabels = function (e) {
            if (config.labels) {
                config.labels = false;
            } else {
                config.labels = true;
            }

            window.cancelAnimationFrame(this.requestId);
            this.frame();

            e.preventDefault();
        },

        togglePaths = function (e) {
            if (!config.color) {
                config.color = true;
            } else {
                config.color = false;
            }

            window.cancelAnimationFrame(this.requestId);
            this.frame();

            e.preventDefault();
        },

        toggleTransition = function (e) {
            if (this.isPlay) {
                this.isPlay = false;
                this.$btnToggleTransition.innerHTML = 'Play';
                window.cancelAnimationFrame(this.requestId);
            } else {
                this.isPlay = true;
                this.$btnToggleTransition.innerHTML = 'Pause';
                this.requestId = window.requestAnimationFrame(this.frame.bind(this), this.$canvas);
            }

            e.preventDefault();
        },

        setPlanetAttributes = function () {
            var self = this, earthX = 0, earthY = 0;

            config.planets.forEach(function (planet, index) {
                if (index < 10) {
                    planet[index].x = self.centerX + Math.sin(planet.angle) * planet.radius;
                    planet[index].y = self.centerY + Math.cos(planet.angle) * planet.radius;

                    if (index == 2) {
                        earthX = planet['2'].x;
                        earthY = planet['2'].y;
                    }

                    if (planet.name == 'moon') {
                        planet[index].x = earthX + Math.sin(planet.angle) * planet.radius;
                        planet[index].y = earthY + Math.cos(planet.angle) * planet.radius;
                        planet.angle += self.transitionSpeed + 0.02;
                    }

                    planet[index].draw(self.context);

                    if (planet[index].name != 'moon') {
                        setPlanetPaths(self, planet);
                        setPlanetLabels(self, planet, earthX, earthY);
                    }
                }

                self.transitionSpeed.toFixed(2);

                if (self.isPlay) {
                    planet.angle += self.transitionSpeed + planet.speed;
                }
            });
        },

        setPlanetLabels = function (self, planet, earthX, earthY) {
            if (config.labels) {
                if (planet.name == 'moon') {
                    planet.label.x = earthX + Math.sin(planet.angle) * planet.radius;
                    planet.label.y = earthY + Math.cos(planet.angle) * planet.radius;
                } else {
                    planet.label.x = self.centerX + Math.sin(planet.angle) * planet.radius;
                    planet.label.y = self.centerY + Math.cos(planet.angle) * planet.radius;
                }

                planet.label.setLabel(self.context);
            }
        },

        setPlanetPaths = function (self, planet) {
            if (config.color) {
                planet.path.x = self.$canvas.width / 2;
                planet.path.y = self.$canvas.height / 2;
                planet.path.draw(self.context);
            }
        },

        createSun = function () {
            this.sun = new Planet(10, 'yellow');
            this.sun.x = this.$canvas.width / 2;
            this.sun.y = this.$canvas.height / 2;

            this.centerX = this.sun.x;
            this.centerY = this.sun.y;

            this.frame();
        },

        frame = function () { 
            if (this.isPlay) {
                this.requestId = window.requestAnimationFrame(this.frame.bind(this));
            }

            this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
            this.setPlanetAttributes();
            this.sun.draw(this.context);
        };

        return {
            setCanvasAttributes: setCanvasAttributes,
            createSun: createSun,
            frame: frame,
            setPlanetAttributes: setPlanetAttributes,
            togglePaths: togglePaths,
            toggleTransition: toggleTransition,
            toggleLabels: toggleLabels,
            speedUp: speedUp,
            speedDown: speedDown,
            handleDetailClick: handleDetailClick
        };
    })();

    return SolarSystem;
});

