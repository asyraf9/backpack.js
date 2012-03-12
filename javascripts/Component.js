// **Backpack.Component**
// -------------------------

// Importing global variables into the immediately
// invoked function turns the globals into locals.
// This speeds up symbol resolution inside the IIFE.
// It's also helps declare dependencies.
Backpack.add("Component", (function($, _, Backbone, Backpack){

  Backpack.__extends(Component, Backbone.View);

  function Component(){
    _.bindAll(this);
    Component.__super__.constructor.apply(this, arguments);
  };

  Component.prototype = _.extend(Component.prototype, {
    _items: [],
    _type: 'component',
    _visible: false,
    _rendered: false,
    _renderType: 'append',
    _renderTypes: ['append', 'html', 'prepend'],

    tagName:   'div',
    className: 'backpack-component',

    defaults: {
      'parent': 'body',
      'content': null,
      'visible': true
    },

    initialize: function() {
      this.options = _.extend({}, this.defaults, this.config, this.options);
      _ref = this.options;

      for (func in _ref) {
        args = _ref[func];
        if (typeof this[func] !== 'undefined') {
          // console.log(func);
          if (!_.isArray(args)) {
            if (typeof (_base = this[func]).call === "function") {
              _base.call(this, args);
            }
          } else {
            if (typeof (_base2 = this[func]).apply === "function") {
              _base2.apply(this, args);
            }
          }
        }
      }
    },

    render: function() {
      var func;
      func = this.$parent[this._renderType];
      func.call(this.$parent, this.getRenderEl());
      this._rendered = true;
      return this;
    },

    renderType: function(type) {
      var hasType;
      hasType = _.include(this._renderTypes, type);
      if (!hasType) return this;
      this._renderType = type;
      return this;
    },

    renderEl: function(el) {
      this._renderEl = el;
      return this;
    },

    getRenderEl: function() {
      if (this._renderEl != null) return this._renderEl;
      return this.el;
    },

    content: function(content) {
      var wrappedContent;
      if (content == null) return this;
      this._content = this.setContent(content);
      wrappedContent = this.make('div', {
        "class": 'content clearfix'
      }, this._content);
      this.$el.append(wrappedContent);
      return this;
    },

    setContent: function(content) {
      if (content == null) return this;
      if (content.el != null) {
        if (content.render != null) {
          return content = content.render().el;
        } else {
          return content = content.el;
        }
      } else {
        return content = content;
      }
    },

    parent: function(parent) {
      if (parent == null) return this;
      this.$parent = $(parent);
      return this;
    },

    visible: function(show) {
      if (show) {
        this.show();
      } else {
        this.hide();
      }
    },

    show: function() {
      if (!this._rendered) this.render();
      this.delegateEvents();
      this.$el.removeClass('hide');
      this._visible = true;
      Backpack.trigger('show', this);
      return this;
    },

    hide: function() {
      this.$el.addClass('hide');
      this.undelegateEvents();
      this._visible = false;
      return this;
    },

    close: function() {
      this.hide();
      this.remove();
      return this;
    },

    remove: function() {
      this.undelegateEvents();
      Component.__super__.remove.call(this);
    },

    slug: function(string) {
      if (string == null) return this;
      return string.toLowerCase()
                   .replace(/\ +/g, "-")
                   .replace(/[^a-z0-9-]/g, "");
    }
  });

  return Component;

})($, _, Backbone, Backpack));