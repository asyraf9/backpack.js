Backpack.add("Tabs", (function($, _, Backbone, Backpack){

  Backpack.__extends(Tabs, Backpack.modules.Component);

  function Tabs() {
    Tabs.__super__.constructor.apply(this, arguments);
  }

  Tabs.prototype = _.extend(Tabs.prototype, {
    tagName: 'ul',
    
    config: {
      'parent': '.test'
    }

  });

  return Tabs;

})($, _, Backbone, Backpack))