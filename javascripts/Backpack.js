var root = this;

(function(root){
  "use strict";

  var __modules = {};

  function Backpack(module, options) {
    options = options || {};

    if (!(this instanceof Backpack))
      return new Backpack(module, options);

    if (__modules.hasOwnProperty(module))
      return new __modules[module](options);
  }


  _.extend(Backpack, Backbone.Events, {
    __slice: Array.prototype.slice,
    __hasProp: Object.prototype.hasOwnProperty,
    __extends: function(child, parent) { for (var key in parent) { if (Backpack.__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },

    add: function (name, module) {
      if (!(__modules.hasOwnProperty(name))) {
        __modules[name] = module;
        return true;
      }
      return false;
    },

    modules: (function() {
      return __modules;
    })()
  });


  // Support Browser and Node environments.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = Backpack;
    }
    exports.Backpack = Backpack;
  } else {
    root['Backpack'] = Backpack;
  }


  return Backpack;

})(root);