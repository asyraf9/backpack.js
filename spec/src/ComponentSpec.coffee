describe "Backpack.Component", ->

  beforeEach ->
    @component = new Backpack.Component


  describe "#initialize", ->

    it "should create a <div>", ->
      nodeName = @component.el.nodeName
      expect(nodeName).toEqual('DIV')

    it "should have a 'backpack-component' class", ->
      hasClass = @component.$el.hasClass('backpack-component')
      expect(hasClass).toBeTruthy()

    it "should call #hide", ->
      spy = sinon.spy(@component, 'hide')
      @component.initialize()
      expect(spy).toHaveBeenCalled()

    it "should have a 'hide' class", ->
      hasClass = @component.$el.hasClass('hide')
      expect(hasClass).toBeTruthy()

    describe "options", ->

      beforeEach ->
        @options = @component.options
    
      it "should have a blank default name", ->
        expect(@options.name).toEqual('')

      it "should have a blank default content", ->
        expect(@options.content).toEqual('')

      it "should have 'body' as a default parent", ->
        expect(@options.parent).toEqual('body')

      it "should set options", ->
        options = (new Backpack.Component { 
                  name: 'test'
                , parent: '#test'
                , content: 'test' }).options
        expect(options.name).toEqual('test')
        expect(options.parent).toEqual('#test')
        expect(options.content).toEqual('test')


  describe "#render", ->

    it "should append the component to it's parent", ->
      parent = $('<div>')
      @component.setParent(parent)
      @component.render()
      expect(parent.children().length).toEqual(1)

    it "should return the component for chaining", ->
      parent = $('<div>')
      @component.setParent(parent)
      expect(@component.render()).toEqual(@component)

    it "should call the parents #append", ->
      parent = $('<div>')
      spy = sinon.spy(parent, 'append')
      @component.setParent(parent)
      @component.render()
      expect(spy).toHaveBeenCalled()

  
  describe "#addClass", ->

    it "should add a class to the component", ->
      @component.addClass("test")
      expect(@component.$el.hasClass("test")).toBeTruthy()

    it "should do nothing if passed nothing", ->
      className = @component.className
      @component.addClass()
      expect(@component.className).toEqual(className)


  describe "#setParent", ->

    it "should set the component's parent", ->
      parent1 = $('<div>')
      @component.setParent(parent1)
      expect(@component.parent).toEqual(parent1)
      parent2 = $('<ul>')
      @component.setParent(parent2)
      expect(@component.parent).toEqual(parent2)

    it "should do nothing if passed nothing", ->
      parent = @component.parent
      @component.setParent()
      expect(@component.parent).toEqual(parent)


  describe "#hide", ->

    it "should add the hide class to the component", ->
      @component.show()
      expect(@component.$el.hasClass('hide')).toBeFalsy()
      @component.hide()
      expect(@component.$el.hasClass('hide')).toBeTruthy()

    it "should call #undelegateEvents", ->
      spy = sinon.spy(@component, 'undelegateEvents')
      @component.hide()
      expect(spy).toHaveBeenCalled()

    it "should call #addClass", ->
      spy = sinon.spy(@component.$el, 'addClass')
      @component.hide()
      expect(spy).toHaveBeenCalled()


  describe "#show", ->

    it "should remove the hide class from the component", ->
      expect(@component.$el.hasClass('hide')).toBeTruthy()
      @component.show()
      expect(@component.$el.hasClass('hide')).toBeFalsy()

    it "should call #delegateEvents", ->
      spy = sinon.spy(@component, 'delegateEvents')
      @component.show()
      expect(spy).toHaveBeenCalled()

    it "should call #removeClass", ->
      spy = sinon.spy(@component.$el, 'removeClass')
      @component.show()
      expect(spy).toHaveBeenCalled()


  describe "#close", ->

    it "should call #hide", ->
      spy = sinon.spy(@component, 'hide')
      @component.close()
      expect(spy).toHaveBeenCalled()

    it "should call #remove", ->
      spy = sinon.spy(@component, 'remove')
      @component.close()
      expect(spy).toHaveBeenCalled()


  describe "#append", ->

    it "should call $.append", ->
      spy = sinon.spy(@component.$el, 'append')
      @component.append('')
      expect(spy).toHaveBeenCalled()

    it "should call #setContent", ->
      spy = sinon.spy(@component, 'setContent')
      @component.append('')
      expect(spy).toHaveBeenCalled()

    it "should do nothing if passed nothing", ->
      testContent = @component.content
      @component.setContent()
      expect(@component.content).toEqual(testContent)


  describe "#prepend", ->

    it "should call $.prepend", ->
      spy = sinon.spy(@component.$el, 'prepend')
      @component.prepend('')
      expect(spy).toHaveBeenCalled()

    it "should call #setContent", ->
      spy = sinon.spy(@component, 'setContent')
      @component.append('')
      expect(spy).toHaveBeenCalled()

    it "should do nothing if passed nothing", ->
      testContent = @component.content
      @component.setContent()
      expect(@component.content).toEqual(testContent)


  describe "#before", ->

    it "should call $.before", ->
      spy = sinon.spy(@component.$el, 'before')
      @component.before('')
      expect(spy).toHaveBeenCalled()

    it "should call #setContent", ->
      spy = sinon.spy(@component, 'setContent')
      @component.append('')
      expect(spy).toHaveBeenCalled()

    it "should do nothing if passed nothing", ->
      @component.content = 'lkja'
      @component.setContent()
      expect(@component.content).toEqual('lkja')


  describe "#after", ->

    it "should call $.after", ->
      spy = sinon.spy(@component.$el, 'after')
      @component.after('')
      expect(spy).toHaveBeenCalled()

    it "should call #setContent", ->
      spy = sinon.spy(@component, 'setContent')
      @component.append('')
      expect(spy).toHaveBeenCalled()

    it "should do nothing if passed nothing", ->
      testContent = @component.content
      @component.setContent()
      expect(@component.content).toEqual(testContent)

  
  describe "#setContent", ->
    
    it "should do nothing if passed nothing", ->
      testContent = 'test'
      @component.setContent(testContent)
      @component.setContent()
      expect(@component.content).toEqual(testContent)

    it "should set @content to content if content isn't a View", ->
      testContent = 'test'
      @component.setContent(testContent)
      expect(@component.content).toEqual(testContent)

    it "should set @conent to content.render().el if it's a View", ->
      testContent = new Backbone.View
      spy = sinon.spy(testContent, 'render')
      @component.setContent(testContent)
      expect(spy).toHaveBeenCalled()
      expect(@component.content).toEqual(testContent.render().el)

    it "should set @conent to content.el if content.render doesn't exist", ->
      testContent = { el: document.createElement('div') }
      @component.setContent(testContent)
      expect(@component.content).toEqual(testContent.el)