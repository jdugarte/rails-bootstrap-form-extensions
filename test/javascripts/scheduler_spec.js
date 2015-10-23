describe("Scheduler", function() {

  describe("Plugin", function() {

    it("should be defined on jQuery object", function() {
      expect($(document.body).scheduler).not.toThrow()
    })

  })

  describe("Run tests in noConflict mode -- it's the only way to ensure that the plugin works in noConflict mode", function() {

    beforeEach(function() {
      $.fn.bootstrapScheduler = $.fn.scheduler.noConflict()
    })

    afterEach(function() {
      $.fn.scheduler = $.fn.bootstrapScheduler
      delete $.fn.bootstrapScheduler
    })

    describe("initialization", function() {

      it("should provide no conflict - scheduler was set back to undefined (orig value)", function() {
        expect($.fn.scheduler).toBeUndefined()
      })

      it("should return jquery collection containing the element", function() {
        var $el = $('<div/>')
        var $scheduler = $el.bootstrapScheduler()
        expect($scheduler).toEqual(jasmine.any($))
        expect($scheduler[0]).toBe($el[0])
      })

    })

    describe("behaviour", function() {

      var $element
      var fixture = function() {
        return '<div class="form-group">'
              +'  <label class="control-label col-sm-2" for="thing_schedule">Schedule</label>'
              +'  <div class="col-sm-10">'
              +'    <div data-scheduler="true">'
              +'      <input class="scheduler-hidden-field" id="thing_schedule" name="thing[schedule]" type="hidden" value="[[false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],[false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],[false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],[false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],[false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],[false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],[false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]]">'
              +'      <table class="scheduler-badge">'
              +'        <tbody>'
              +'          <tr>'
              +'            <td class="off" data-day="0" data-hour="0">&nbsp;</td>'
              +'            <td class="on" data-day="0" data-hour="1">&nbsp;</td>'
              +'            <td class="on" data-day="0" data-hour="2">&nbsp;</td>'
              +'            <td class="on" data-day="0" data-hour="3">&nbsp;</td>'
              +'            <td class="on" data-day="0" data-hour="4">&nbsp;</td>'
              +'            <td class="on" data-day="0" data-hour="5">&nbsp;</td>'
              +'            <td class="on" data-day="0" data-hour="6">&nbsp;</td>'
              +'            <td class="on" data-day="0" data-hour="7">&nbsp;</td>'
              +'            <td class="on" data-day="0" data-hour="8">&nbsp;</td>'
              +'            <td class="on" data-day="0" data-hour="9">&nbsp;</td>'
              +'            <td class="on" data-day="0" data-hour="10">&nbsp;</td>'
              +'            <td class="on" data-day="0" data-hour="11">&nbsp;</td>'
              +'            <td class="on" data-day="0" data-hour="12">&nbsp;</td>'
              +'            <td class="on" data-day="0" data-hour="13">&nbsp;</td>'
              +'            <td class="on" data-day="0" data-hour="14">&nbsp;</td>'
              +'            <td class="on" data-day="0" data-hour="15">&nbsp;</td>'
              +'            <td class="on" data-day="0" data-hour="16">&nbsp;</td>'
              +'            <td class="on" data-day="0" data-hour="17">&nbsp;</td>'
              +'            <td class="on" data-day="0" data-hour="18">&nbsp;</td>'
              +'            <td class="on" data-day="0" data-hour="19">&nbsp;</td>'
              +'            <td class="on" data-day="0" data-hour="20">&nbsp;</td>'
              +'            <td class="on" data-day="0" data-hour="21">&nbsp;</td>'
              +'            <td class="on" data-day="0" data-hour="22">&nbsp;</td>'
              +'            <td class="on" data-day="0" data-hour="23">&nbsp;</td>'
              +'          </tr>'
              +'          <tr>'
              +'            <td class="off" data-day="1" data-hour="0">&nbsp;</td>'
              +'            <td class="on" data-day="1" data-hour="1">&nbsp;</td>'
              +'            <td class="on" data-day="1" data-hour="2">&nbsp;</td>'
              +'            <td class="on" data-day="1" data-hour="3">&nbsp;</td>'
              +'            <td class="on" data-day="1" data-hour="4">&nbsp;</td>'
              +'            <td class="on" data-day="1" data-hour="5">&nbsp;</td>'
              +'            <td class="on" data-day="1" data-hour="6">&nbsp;</td>'
              +'            <td class="on" data-day="1" data-hour="7">&nbsp;</td>'
              +'            <td class="on" data-day="1" data-hour="8">&nbsp;</td>'
              +'            <td class="on" data-day="1" data-hour="9">&nbsp;</td>'
              +'            <td class="on" data-day="1" data-hour="10">&nbsp;</td>'
              +'            <td class="on" data-day="1" data-hour="11">&nbsp;</td>'
              +'            <td class="on" data-day="1" data-hour="12">&nbsp;</td>'
              +'            <td class="on" data-day="1" data-hour="13">&nbsp;</td>'
              +'            <td class="on" data-day="1" data-hour="14">&nbsp;</td>'
              +'            <td class="on" data-day="1" data-hour="15">&nbsp;</td>'
              +'            <td class="on" data-day="1" data-hour="16">&nbsp;</td>'
              +'            <td class="on" data-day="1" data-hour="17">&nbsp;</td>'
              +'            <td class="on" data-day="1" data-hour="18">&nbsp;</td>'
              +'            <td class="on" data-day="1" data-hour="19">&nbsp;</td>'
              +'            <td class="on" data-day="1" data-hour="20">&nbsp;</td>'
              +'            <td class="on" data-day="1" data-hour="21">&nbsp;</td>'
              +'            <td class="on" data-day="1" data-hour="22">&nbsp;</td>'
              +'            <td class="on" data-day="1" data-hour="23">&nbsp;</td>'
              +'          </tr>'
              +'          <tr>'
              +'            <td class="off" data-day="2" data-hour="0">&nbsp;</td>'
              +'            <td class="on" data-day="2" data-hour="1">&nbsp;</td>'
              +'            <td class="on" data-day="2" data-hour="2">&nbsp;</td>'
              +'            <td class="on" data-day="2" data-hour="3">&nbsp;</td>'
              +'            <td class="on" data-day="2" data-hour="4">&nbsp;</td>'
              +'            <td class="on" data-day="2" data-hour="5">&nbsp;</td>'
              +'            <td class="on" data-day="2" data-hour="6">&nbsp;</td>'
              +'            <td class="on" data-day="2" data-hour="7">&nbsp;</td>'
              +'            <td class="on" data-day="2" data-hour="8">&nbsp;</td>'
              +'            <td class="on" data-day="2" data-hour="9">&nbsp;</td>'
              +'            <td class="on" data-day="2" data-hour="10">&nbsp;</td>'
              +'            <td class="on" data-day="2" data-hour="11">&nbsp;</td>'
              +'            <td class="on" data-day="2" data-hour="12">&nbsp;</td>'
              +'            <td class="on" data-day="2" data-hour="13">&nbsp;</td>'
              +'            <td class="on" data-day="2" data-hour="14">&nbsp;</td>'
              +'            <td class="on" data-day="2" data-hour="15">&nbsp;</td>'
              +'            <td class="on" data-day="2" data-hour="16">&nbsp;</td>'
              +'            <td class="on" data-day="2" data-hour="17">&nbsp;</td>'
              +'            <td class="on" data-day="2" data-hour="18">&nbsp;</td>'
              +'            <td class="on" data-day="2" data-hour="19">&nbsp;</td>'
              +'            <td class="on" data-day="2" data-hour="20">&nbsp;</td>'
              +'            <td class="on" data-day="2" data-hour="21">&nbsp;</td>'
              +'            <td class="on" data-day="2" data-hour="22">&nbsp;</td>'
              +'            <td class="on" data-day="2" data-hour="23">&nbsp;</td>'
              +'          </tr>'
              +'          <tr>'
              +'            <td class="off" data-day="3" data-hour="0">&nbsp;</td>'
              +'            <td class="on" data-day="3" data-hour="1">&nbsp;</td>'
              +'            <td class="on" data-day="3" data-hour="2">&nbsp;</td>'
              +'            <td class="on" data-day="3" data-hour="3">&nbsp;</td>'
              +'            <td class="on" data-day="3" data-hour="4">&nbsp;</td>'
              +'            <td class="on" data-day="3" data-hour="5">&nbsp;</td>'
              +'            <td class="on" data-day="3" data-hour="6">&nbsp;</td>'
              +'            <td class="on" data-day="3" data-hour="7">&nbsp;</td>'
              +'            <td class="on" data-day="3" data-hour="8">&nbsp;</td>'
              +'            <td class="on" data-day="3" data-hour="9">&nbsp;</td>'
              +'            <td class="on" data-day="3" data-hour="10">&nbsp;</td>'
              +'            <td class="on" data-day="3" data-hour="11">&nbsp;</td>'
              +'            <td class="on" data-day="3" data-hour="12">&nbsp;</td>'
              +'            <td class="on" data-day="3" data-hour="13">&nbsp;</td>'
              +'            <td class="on" data-day="3" data-hour="14">&nbsp;</td>'
              +'            <td class="on" data-day="3" data-hour="15">&nbsp;</td>'
              +'            <td class="on" data-day="3" data-hour="16">&nbsp;</td>'
              +'            <td class="on" data-day="3" data-hour="17">&nbsp;</td>'
              +'            <td class="on" data-day="3" data-hour="18">&nbsp;</td>'
              +'            <td class="on" data-day="3" data-hour="19">&nbsp;</td>'
              +'            <td class="on" data-day="3" data-hour="20">&nbsp;</td>'
              +'            <td class="on" data-day="3" data-hour="21">&nbsp;</td>'
              +'            <td class="on" data-day="3" data-hour="22">&nbsp;</td>'
              +'            <td class="on" data-day="3" data-hour="23">&nbsp;</td>'
              +'          </tr>'
              +'          <tr>'
              +'            <td class="off" data-day="4" data-hour="0">&nbsp;</td>'
              +'            <td class="on" data-day="4" data-hour="1">&nbsp;</td>'
              +'            <td class="on" data-day="4" data-hour="2">&nbsp;</td>'
              +'            <td class="on" data-day="4" data-hour="3">&nbsp;</td>'
              +'            <td class="on" data-day="4" data-hour="4">&nbsp;</td>'
              +'            <td class="on" data-day="4" data-hour="5">&nbsp;</td>'
              +'            <td class="on" data-day="4" data-hour="6">&nbsp;</td>'
              +'            <td class="on" data-day="4" data-hour="7">&nbsp;</td>'
              +'            <td class="on" data-day="4" data-hour="8">&nbsp;</td>'
              +'            <td class="on" data-day="4" data-hour="9">&nbsp;</td>'
              +'            <td class="on" data-day="4" data-hour="10">&nbsp;</td>'
              +'            <td class="on" data-day="4" data-hour="11">&nbsp;</td>'
              +'            <td class="on" data-day="4" data-hour="12">&nbsp;</td>'
              +'            <td class="on" data-day="4" data-hour="13">&nbsp;</td>'
              +'            <td class="on" data-day="4" data-hour="14">&nbsp;</td>'
              +'            <td class="on" data-day="4" data-hour="15">&nbsp;</td>'
              +'            <td class="on" data-day="4" data-hour="16">&nbsp;</td>'
              +'            <td class="on" data-day="4" data-hour="17">&nbsp;</td>'
              +'            <td class="on" data-day="4" data-hour="18">&nbsp;</td>'
              +'            <td class="on" data-day="4" data-hour="19">&nbsp;</td>'
              +'            <td class="on" data-day="4" data-hour="20">&nbsp;</td>'
              +'            <td class="on" data-day="4" data-hour="21">&nbsp;</td>'
              +'            <td class="on" data-day="4" data-hour="22">&nbsp;</td>'
              +'            <td class="on" data-day="4" data-hour="23">&nbsp;</td>'
              +'          </tr>'
              +'          <tr>'
              +'            <td class="off" data-day="5" data-hour="0">&nbsp;</td>'
              +'            <td class="on" data-day="5" data-hour="1">&nbsp;</td>'
              +'            <td class="on" data-day="5" data-hour="2">&nbsp;</td>'
              +'            <td class="on" data-day="5" data-hour="3">&nbsp;</td>'
              +'            <td class="on" data-day="5" data-hour="4">&nbsp;</td>'
              +'            <td class="on" data-day="5" data-hour="5">&nbsp;</td>'
              +'            <td class="on" data-day="5" data-hour="6">&nbsp;</td>'
              +'            <td class="on" data-day="5" data-hour="7">&nbsp;</td>'
              +'            <td class="on" data-day="5" data-hour="8">&nbsp;</td>'
              +'            <td class="on" data-day="5" data-hour="9">&nbsp;</td>'
              +'            <td class="on" data-day="5" data-hour="10">&nbsp;</td>'
              +'            <td class="on" data-day="5" data-hour="11">&nbsp;</td>'
              +'            <td class="on" data-day="5" data-hour="12">&nbsp;</td>'
              +'            <td class="on" data-day="5" data-hour="13">&nbsp;</td>'
              +'            <td class="on" data-day="5" data-hour="14">&nbsp;</td>'
              +'            <td class="on" data-day="5" data-hour="15">&nbsp;</td>'
              +'            <td class="on" data-day="5" data-hour="16">&nbsp;</td>'
              +'            <td class="on" data-day="5" data-hour="17">&nbsp;</td>'
              +'            <td class="on" data-day="5" data-hour="18">&nbsp;</td>'
              +'            <td class="on" data-day="5" data-hour="19">&nbsp;</td>'
              +'            <td class="on" data-day="5" data-hour="20">&nbsp;</td>'
              +'            <td class="on" data-day="5" data-hour="21">&nbsp;</td>'
              +'            <td class="on" data-day="5" data-hour="22">&nbsp;</td>'
              +'            <td class="on" data-day="5" data-hour="23">&nbsp;</td>'
              +'          </tr>'
              +'          <tr>'
              +'            <td class="off" data-day="6" data-hour="0">&nbsp;</td>'
              +'            <td class="on" data-day="6" data-hour="1">&nbsp;</td>'
              +'            <td class="on" data-day="6" data-hour="2">&nbsp;</td>'
              +'            <td class="on" data-day="6" data-hour="3">&nbsp;</td>'
              +'            <td class="on" data-day="6" data-hour="4">&nbsp;</td>'
              +'            <td class="on" data-day="6" data-hour="5">&nbsp;</td>'
              +'            <td class="on" data-day="6" data-hour="6">&nbsp;</td>'
              +'            <td class="on" data-day="6" data-hour="7">&nbsp;</td>'
              +'            <td class="on" data-day="6" data-hour="8">&nbsp;</td>'
              +'            <td class="on" data-day="6" data-hour="9">&nbsp;</td>'
              +'            <td class="on" data-day="6" data-hour="10">&nbsp;</td>'
              +'            <td class="on" data-day="6" data-hour="11">&nbsp;</td>'
              +'            <td class="on" data-day="6" data-hour="12">&nbsp;</td>'
              +'            <td class="on" data-day="6" data-hour="13">&nbsp;</td>'
              +'            <td class="on" data-day="6" data-hour="14">&nbsp;</td>'
              +'            <td class="on" data-day="6" data-hour="15">&nbsp;</td>'
              +'            <td class="on" data-day="6" data-hour="16">&nbsp;</td>'
              +'            <td class="on" data-day="6" data-hour="17">&nbsp;</td>'
              +'            <td class="on" data-day="6" data-hour="18">&nbsp;</td>'
              +'            <td class="on" data-day="6" data-hour="19">&nbsp;</td>'
              +'            <td class="on" data-day="6" data-hour="20">&nbsp;</td>'
              +'            <td class="on" data-day="6" data-hour="21">&nbsp;</td>'
              +'            <td class="on" data-day="6" data-hour="22">&nbsp;</td>'
              +'            <td class="on" data-day="6" data-hour="23">&nbsp;</td>'
              +'          </tr>'
              +'        </tbody>'
              +'      </table>'
              +'    </div>'
              +'  </div>'
              +'</div>'
      }

      beforeEach(function() {
        $element = $(fixture())
        $element.bootstrapScheduler()
        $element.find('table.scheduler-badge').click()
      })

      describe("return values in the hidden field", function() {

        it("apply no changes", function() {
          var values
          $('#scheduler-container button.apply').click()
          values = JSON.parse($element.find('.scheduler-hidden-field').val())
          expect(values).toEqual([[false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], [false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], [false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], [false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], [false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], [false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], [false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]])
        })

        it("cancel changes", function() {
          var values
          $('#scheduler-container a.none').click()
          $('#scheduler-container button.cancel').click()
          values = JSON.parse($element.find('.scheduler-hidden-field').val())
          expect(values).toEqual([[false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], [false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], [false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], [false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], [false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], [false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], [false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]])
        })

        it("select all", function() {
          var values
          $('#scheduler-container a.all').click()
          $('#scheduler-container button.apply').click()
          values = JSON.parse($element.find('.scheduler-hidden-field').val())
          expect(values).toEqual([[true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]])
        })

        it("select none", function() {
          var values
          $('#scheduler-container a.none').click()
          $('#scheduler-container button.apply').click()
          values = JSON.parse($element.find('.scheduler-hidden-field').val())
          expect(values).toEqual([[false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]])
        })

        it("unselect a full day", function() {
          var values
          $('#scheduler-container a.day-header:first').click()
          $('#scheduler-container button.apply').click()
          values = JSON.parse($element.find('.scheduler-hidden-field').val())
          expect(values).toEqual([[false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], [false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], [false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], [false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], [false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], [false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], [false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]])
        })

        it("unselect a full hour", function() {
          var values
          $('#scheduler-container a.hour-header:last').click()
          $('#scheduler-container button.apply').click()
          values = JSON.parse($element.find('.scheduler-hidden-field').val())
          expect(values).toEqual([[false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false], [false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false], [false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false], [false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false], [false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false], [false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false], [false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false]])
        })

        it("unselect one hour", function() {
          var values
          $('#scheduler-container td[data-day="0"][data-hour="0"]').click()
          $('#scheduler-container button.apply').click()
          values = JSON.parse($element.find('.scheduler-hidden-field').val())
          expect(values).toEqual([[true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], [false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], [false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], [false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], [false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], [false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], [false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]])
        })

      })

      describe("update badge", function() {

        it("apply no changes", function() {
          var html
          html = $element.find('table.scheduler-badge').html()
          $('#scheduler-container button.apply').click()
          expect($element.find('table.scheduler-badge').html()).toEqual(html)
        })

        it("cancel changes", function() {
          var html
          html = $element.find('table.scheduler-badge').html()
          $('#scheduler-container a.none').click()
          $('#scheduler-container button.cancel').click()
          expect($element.find('table.scheduler-badge').html()).toEqual(html)
        })

        it("select all", function() {
          $('#scheduler-container a.all').click()
          $('#scheduler-container button.apply').click()
          expect($element.find('table.scheduler-badge').html()).not.toContain('off')
        })

        it("select none", function() {
          $('#scheduler-container a.none').click()
          $('#scheduler-container button.apply').click()
          expect($element.find('table.scheduler-badge').html()).not.toContain('on')
        })

        it("unselect a full day", function() {
          var values
          $('#scheduler-container a.day-header:first').click()
          $('#scheduler-container button.apply').click()
          expect($element.find('table.scheduler-badge tr:first').html()).not.toContain('on')
        })

        it("unselect a full hour", function() {
          $('#scheduler-container a.hour-header:last').click()
          $('#scheduler-container button.apply').click()
          expect($element.find('table.scheduler-badge tr td:last-child.on')).not.toExist()
        })

        it("unselect one hour", function() {
          $('#scheduler-container td[data-day="0"][data-hour="0"]').click()
          $('#scheduler-container button.apply').click()
          expect($element.find('table.scheduler-badge td[data-day="0"][data-hour="0"]')).toHaveClass('on')
        })

      })

    })

  })

})
