(function(exports) {

  var mixins,
      backpack;

  // private
  mixins = [];


  // public
  backpack = {
    version: '0.0.1',

    add: function(name, mixin) {
      mixins.push(name);
      backpack[name] = mixin;
    },

    list: function() {
      return mixins;
    },

    mixin: function() {

    }
  };

  exports.backpack = backpack;

})(this);