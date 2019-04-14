describe("ArrayedField", function() {

  describe("Plugin", function() {

    it("should be defined on jQuery object", function() {
      expect($(document.body).arrayedfield).not.toThrow()
    })

  })

  describe("Run tests in noConflict mode -- it's the only way to ensure that the plugin works in noConflict mode", function() {

    beforeEach(function() {
      $.fn.bootstrapArrayedField = $.fn.arrayedfield.noConflict()
    })

    afterEach(function() {
      $.fn.arrayedfield = $.fn.bootstrapArrayedField
      delete $.fn.bootstrapArrayedField
    })

    describe("initialization", function() {

      it("should provide no conflict - arrayedfield was set back to undefined (orig value)", function() {
        expect($.fn.arrayedfield).toBeUndefined()
      })

      it("should return jquery collection containing the element", function() {
        var $el = $('<div/>')
        var $arrayedfield = $el.bootstrapArrayedField()
        expect($arrayedfield).toEqual(jasmine.any($))
        expect($arrayedfield[0]).toBe($el[0])
      })

    })

    describe("behaviour", function() {

      var $element
      var fixture = function() {
        return '<div data-arrayed-field="true">'
              +'  <div class="blueprint-for-arrayed-field" style="display:none;">'
              +'    <div class="row mt-1">'
              +'      <div class="col-11">'
              +'        <input type="url" id="" class="form-control" data-name="thing[urls][]" />'
              +'      </div>'
              +'      <div class="col-1">'
              +'        <a class="btn btn-default remove-arrayed-field-row" href="javascript:void(0);">&times;</a>'
              +'      </div>'
              +'    </div>'
              +'  </div>'
              +'  <div class="arrayed-field-rows">'
              +'    <div class="row mt-1">'
              +'      <div class="col-11">'
              +'        <input type="url" id="" class="form-control" name="thing[urls][]" />'
              +'      </div>'
              +'      <div class="col-1">'
              +'        <a class="btn btn-default remove-arrayed-field-row" href="javascript:void(0);">&times;</a>'
              +'      </div>'
              +'    </div>'
              +'    <div class="row mt-1">'
              +'      <div class="col-11">'
              +'        <input type="url" id="" class="form-control" name="thing[urls][]" />'
              +'      </div>'
              +'      <div class="col-1">'
              +'        <a class="btn btn-default remove-arrayed-field-row" href="javascript:void(0);">&times;</a>'
              +'      </div>'
              +'    </div>'
              +'  </div>'
              +'  <div class="row mt-1">'
              +'    <div class="col-12">'
              +'      <a class="btn btn-default add-arrayed-field-row" href="javascript:void(0);">+</a>'
              +'    </div>'
              +'  </div>'
              +'</div>'
      }

      beforeEach(function() {
        $element = $(fixture())
        $element.bootstrapArrayedField()
      })

      it("should add rows", function() {
        var $add_button = $element.find('.add-arrayed-field-row')
        expect($element.find('.arrayed-field-rows > .row')).toHaveLength(2)
        $add_button.click()
        expect($element.find('.arrayed-field-rows > .row')).toHaveLength(3)
      })

      it("should remove rows", function() {
        var $remove_button = $element.find('.arrayed-field-rows .remove-arrayed-field-row:first')
        expect($element.find('.arrayed-field-rows > .row')).toHaveLength(2)
        $remove_button.click()
        expect($element.find('.arrayed-field-rows > .row')).toHaveLength(1)
      })

    })

  })

})
