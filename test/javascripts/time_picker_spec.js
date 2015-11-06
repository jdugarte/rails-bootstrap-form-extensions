describe("TimePicker", function() {

  describe("Plugin", function() {

    it("should be defined on jQuery object", function() {
      expect($(document.body).timePicker).not.toThrow()
    })

  })

  describe("Run tests in noConflict mode -- it's the only way to ensure that the plugin works in noConflict mode", function() {

    beforeEach(function() {
      $.fn.bootstrapTimePicker = $.fn.timePicker.noConflict()
    })

    afterEach(function() {
      $.fn.timePicker = $.fn.bootstrapTimePicker
      delete $.fn.bootstrapTimePicker
    })

    describe("initialization", function() {

      it("should provide no conflict - timePicker was set back to undefined (orig value)", function() {
        expect($.fn.timePicker).toBeUndefined()
      })

      it("should return jquery collection containing the element", function() {
        var $el = $('<div/>')
        var $timePicker = $el.bootstrapTimePicker()
        expect($timePicker).toEqual(jasmine.any($))
        expect($timePicker[0]).toBe($el[0])
      })

    })

    describe("behaviour", function() {
    })

  })

})
