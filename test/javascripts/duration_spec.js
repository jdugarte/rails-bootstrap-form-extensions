describe("Duration", function() {

  describe("Plugin", function() {

    it("should be defined on jQuery object", function() {
      expect($(document.body).duration).not.toThrow()
    })

  })

  describe("Run tests in noConflict mode -- it's the only way to ensure that the plugin works in noConflict mode", function() {

    beforeEach(function() {
      $.fn.bootstrapDuration = $.fn.duration.noConflict()
    })

    afterEach(function() {
      $.fn.duration = $.fn.bootstrapDuration
      delete $.fn.bootstrapDuration
    })

    describe("initialization", function() {

      it("should provide no conflict - duration was set back to undefined (orig value)", function() {
        expect($.fn.duration).toBeUndefined()
      })

      it("should return jquery collection containing the element", function() {
        var $el = $('<div/>')
        var $duration = $el.bootstrapDuration()
        expect($duration).toEqual(jasmine.any($))
        expect($duration[0]).toBe($el[0])
      })

    })

    describe("behaviour", function() {

      var $element
      var fixture = function() {
        return '<div class="form-group duration-group row" data-duration="true">'
             + '  <label class="col-form-label col-2" for="thing_duration_in_seconds2">Duration in seconds2</label>'
             + '  <div class="col-10 form-inline">'
             + '    <input class="duration-seconds" data-formatted="0:00:00.000" type="hidden" value="0" name="thing[duration_in_seconds2]" id="thing_duration_in_seconds2" />'
             + '    <input type="number" name="thing[hours]" id="thing_hours" value="0" class="form-control hours" min="0" pattern="[0-9]*" />:'
             + '    <input type="number" name="thing[minutes]" id="thing_minutes" value="0" class="form-control minutes" min="0" pattern="[0-9]*" max="59" />:'
             + '    <input type="number" name="thing[seconds]" id="thing_seconds" value="0" class="form-control seconds" min="0" pattern="[0-9]*" max="59" />.'
             + '    <input type="number" name="thing[milliseconds]" id="thing_milliseconds" value="0" class="form-control milliseconds" min="0" pattern="[0-9]*" max="999" />'
             + '  </div>'
             + '</div>'
      }

      beforeEach(function() {
        $element = $(fixture())
        $element.bootstrapDuration()
      })

      it("should update the value in seconds when the hours change", function() {
        var $unit  = $element.find('input.hours')
        var $value = $element.find('input.duration-seconds')

        $unit.val(1).trigger('change')
        expect($value.val()).toBe('3600')
      })

      it("should update the value in seconds when the minutes change", function() {
        var $unit  = $element.find('input.minutes')
        var $value = $element.find('input.duration-seconds')

        $unit.val(1).trigger('change')
        expect($value.val()).toBe('60')
      })

      it("should update the value in seconds when the seconds change", function() {
        var $unit  = $element.find('input.seconds')
        var $value = $element.find('input.duration-seconds')

        $unit.val(1).trigger('change')
        expect($value.val()).toBe('1')
      })

      it("should update the value in seconds when the milliseconds change", function() {
        var $unit  = $element.find('input.milliseconds')
        var $value = $element.find('input.duration-seconds')

        $unit.val(1).trigger('change')
        expect($value.val()).toBe('0.001')
      })

    })

  })

})
