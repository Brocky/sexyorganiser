/**
 * Created by hbrockmann on 22.12.2015.
 */

require('angular');
require('angular-aria');
require('angular-animate');
require('angular-material');

var calendarApp = angular.module('calendarApp', ['ngMaterial']);

var sessionService = require('./Service/Session.js');
var holidaysService = require('./Service/Holidays.js');
var calendarService = require('./Service/Calendar.js');
var oneDayOnOnePageService = require('./Service/oneDayOnOnePage.js');
var templateController = require('./Controller/Template.js');
var threeMonthDirective = require('./Directive/ThreeMonth.js');

calendarApp.factory('session', sessionService);
calendarApp.factory('holidays', holidaysService);
calendarApp.factory('calendar', calendarService);
calendarApp.factory('oneDayOnOnePage', oneDayOnOnePageService);
calendarApp.controller('templateController', templateController);
calendarApp.directive('threeMonth', threeMonthDirective);