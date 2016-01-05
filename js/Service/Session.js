/**
 * Session service
 * @module Service/Holiday
 */

module.exports = function($filter) {

  var sessionService = {};

  sessionService.getValue = function(key) {
    var value = localStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  };
  sessionService.setValue = function(key, value) {
    return localStorage.setItem(key, value);
  };

  return sessionService;
};
