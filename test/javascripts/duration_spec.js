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
        return '<div class="duration-group" data-duration="true">'
             + '  <input class="duration-seconds" id="thing_duration_in_seconds2" name="thing[duration_in_seconds2]" type="hidden" value="0">'
             + '  <input class="hours" id="thing_hours" min="0" name="thing[hours]" type="number" value="0">:'
             + '  <input class="minutes" id="thing_minutes" max="59" min="0" name="thing[minutes]" type="number" value="0">:'
             + '  <input class="seconds" id="thing_seconds" max="59" min="0" name="thing[seconds]" type="number" value="0">.'
             + '  <input class="milliseconds" id="thing_milliseconds" max="999" min="0" name="thing[milliseconds]" type="number" value="0">'
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
