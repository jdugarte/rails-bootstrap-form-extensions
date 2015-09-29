describe("Timespan", function() {

  describe("Plugin", function() {

    it("should be defined on jQuery object", function() {
      expect($(document.body).timespan).not.toThrow()
    })

  })

  describe("Run tests in noConflict mode -- it's the only way to ensure that the plugin works in noConflict mode", function() {

    beforeEach(function() {
      $.fn.bootstrapTimespan = $.fn.timespan.noConflict()
    })

    afterEach(function() {
      $.fn.timespan = $.fn.bootstrapTimespan
      delete $.fn.bootstrapTimespan
    })

    describe("initialization", function() {

      it("should provide no conflict - timespan was set back to undefined (orig value)", function() {
        expect($.fn.timespan).toBeUndefined()
      })

      it("should return jquery collection containing the element", function() {
        var $el = $('<div/>')
        var $timespan = $el.bootstrapTimespan()
        expect($timespan).toEqual(jasmine.any($))
        expect($timespan[0]).toBe($el[0])
      })

    })

    describe("behaviour", function() {

      var $element
      var fixture = function() {
        return '<span data-timespan="true">'
              +'  <input class="timespan-seconds" type="hidden" value="0" name="duration_in_seconds" id="duration_in_seconds">'
              +'  <div class="form-group">'
              +'    <input type="text" name="duration_quantity" id="duration_quantity" value="1" size="5" class="form-control timespan-quantity">'
              +'  </div>'
              +'  &nbsp;'
              +'  <div class="form-group">'
              +'    <select name="duration_unit" id="duration_unit" class="form-control timespan-unit">'
              +'      <option value="3600" selected>hours</option>'
              +'      <option value="86400">days</option>'
              +'    </select>'
              +'  </div>'
              +'</span>'
      }

      beforeEach(function() {
        $element = $(fixture())
        $element.bootstrapTimespan()
      })

      it("should update the value in seconds when the quantity changes", function() {
        var $quantity = $element.find('#duration_quantity')
        var $value    = $element.find('#duration_in_seconds')

        $quantity.val(2).trigger('change')
        expect($value.val()).toBe('7200')
      })

      it("should update the value in seconds when the unit changes", function() {
        var $unit     = $element.find('#duration_unit')
        var $value    = $element.find('#duration_in_seconds')

        $unit.val(86400).trigger('change')
        expect($value.val()).toBe('86400')
      })

    })

  })

})
