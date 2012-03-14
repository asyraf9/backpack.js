Backpack.add("Tabs", function($, _, Backbone, Backpack){

  Backpack.__extends(Tabs, Backpack.Component);

  function Tabs() {
    _.bindAll(this);
    Tabs.__super__.constructor.apply(this, arguments);
  }

  Tabs.prototype = _.extend(Tabs.prototype, {
    tagName: 'ul',

    config: {
      'type': "tabs"
    },

    initialize: function() {
      this.addClass('clearfix');
    }

  });

  return Tabs;

}($, _, Backbone, Backpack))