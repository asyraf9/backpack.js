var root = this;

(function(root, $, _, Backbone){
  "use strict";

  if (typeof Backpack === 'undefined')
    var Backpack = {};


  _.extend(Backpack, Backbone.Events, (function(){

    // Private
    // -------
    var _modules = {};

    // Public
    // -------
    return {

      __slice:   Array.prototype.slice,
      __hasProp: Object.prototype.hasOwnProperty,
      __extends: function(child, parent) { 
        _.each(parent, function(val, key){
          if (Backpack.__hasProp.call(parent, key)) child[key] = parent[key];
        });
        function ctor() { this.constructor = child; } 
        ctor.prototype = parent.prototype; 
        child.prototype = new ctor; 
        child.__super__ = parent.prototype; 
        return child; 
      },

      add: function() {
        var name   = _.initial(arguments),
            module = _.last(arguments),
            newModule = !(_modules.hasOwnProperty(name)) &&
                        !(Backpack.hasOwnProperty(name));
        
        if (newModule) {
          // store in _modules for 
          // reference
          _modules[name] = module;
          Backpack[name] = module;
          return true;
        }
        return false;
      },

      modules: function() {
        var name = _.first(arguments);

        // return the named module
        if (_.isString(name)) 
          return Backpack[name];

        // return array containing
        // the named modules
        if (_.isArray(name)) {
          var _ref = [];
          _.each(name, function(module){
            _ref.push(module);
          });
          return _ref;
        }

        // return object containing
        // all modules
        return _modules;
      }
    }
  })());

  // Support Browser and Node environments.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = Backpack;
    }
    exports.Backpack = Backpack;
  } else {
    root['Backpack'] = Backpack;
  }

})(root, $, _, Backbone)