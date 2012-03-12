var root = (typeof exports === 'undefined') 
            ? this 
            : exports;

(function(exports){
  // "use strict";

  var __slice   = Backpack.__slice   = Array.prototype.slice,
      __hasProp = Backpack.__hasProp = Object.prototype.hasOwnProperty,
      __extends = Backpack.__extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };


  exports.Backpack = Backpack;
  function Backpack() {

    var args = __slice.call(arguments),
        callback = args.pop(), 
        module, 
        i,

        modules = (args[0] && typeof args[0] === "string")
                    ? args
                    : args[0];


    if ( !(this instanceof Backpack) )
      return new Backpack(modules, callback);

    if ( _.isUndefined(Backpack.Modules) )
      Backpack.Modules = {};

    if (!modules || modules === '*') {
      modules = [];
      for (i in Backpack.Modules) {
        if (Backpack.Modules[i]) {
          modules.push(i);
        }
      }
    }

    for (i = 0; i < modules.length; i += 1) {
      module = Backpack.Modules[modules[i]];
      if (module) {
        return new module;
      } else {
        // Backpack.add(module['name'], module)
      }
    }

    // if ( _.isFunction(callback) ) {
    //   callback(this);
    // }
  }


  Backpack.Modules = {};
  Backpack.Modules.Component = (function(_super){

    __extends(Component, _super);

    var count = -1,
        __super = Component.__super__;

    function Component(){
      __super.constructor.apply(this, arguments);
    };

    Component.prototype.initialize = function() {
        count += 1;
        console.log(count);
        __super.initialize.call(this);
    }

    return Component;

  })(Backbone.View);




  Backpack.add = function (name, module) {
    var parts = name.split('.'),
        parent = Backpack.Modules, i;

    if (parts[0] === "Backpack")
      parts = parts.slice(1);

    for (i = 0; i < parts.length; i += 1) {
      if (typeof parent[parts[i]] === "undefined")
        parent[parts[i]] = module || {};
      parent = parent[parts[i]];
    }
    return parent;
  };

  Backpack.slug = function(string) {
    if (string == null) return this;
    return string.toLowerCase()
                 .replace(/\ +/g, "-")
                 .replace(/[^a-z0-9-]/g, "");
  };

})(root, undefined);