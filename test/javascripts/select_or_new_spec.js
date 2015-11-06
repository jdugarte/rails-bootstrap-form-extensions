describe("SelectOrNew", function() {

  describe("Plugin", function() {

    it("should be defined on jQuery object", function() {
      expect($(document.body).selectOrNew).not.toThrow()
    })

  })

  describe("Run tests in noConflict mode -- it's the only way to ensure that the plugin works in noConflict mode", function() {

    beforeEach(function() {
      $.fn.bootstrapSelectOrNew = $.fn.selectOrNew.noConflict()
    })

    afterEach(function() {
      $.fn.selectOrNew = $.fn.bootstrapSelectOrNew
      delete $.fn.bootstrapSelectOrNew
    })

    describe("initialization", function() {

      it("should provide no conflict - selectOrNew was set back to undefined (orig value)", function() {
        expect($.fn.selectOrNew).toBeUndefined()
      })

      it("should return jquery collection containing the element", function() {
        var $el = $('<div/>')
        var $selectOrNew = $el.bootstrapSelectOrNew()
        expect($selectOrNew).toEqual(jasmine.any($))
        expect($selectOrNew[0]).toBe($el[0])
      })

    })

    describe("behaviour", function() {

      var $element, $select, $input, $inputGroup
      var fixture = function() {
        return '<div class="form-group" data-select-or-new="true">'
              +'  <label class="control-label col-sm-2" for="thing_category">Category</label>'
              +'  <div class="col-sm-10">'
              +'    <select class="form-control" id="thing_category" name="thing[category]">'
              +'      <option value="">Please select</option>'
              +'      <option value="1">One</option>'
              +'      <option value="2">Two</option>'
              +'      <option value="0">New...</option>'
              +'    </select>'
              +'    <div class="input-group" style="display: none;">'
              +'      <input class="form-control" id="thing_new_category" name="thing[new_category]" placeholder="New..." type="text">'
              +'      <div class="input-group-addon select-or-new-cancel">'
              +'        <i class="text-danger glyphicon glyphicon-remove"></i>'
              +'      </div>'
              +'    </div>'
              +'  </div>'
              +'</div>'
      }

      beforeEach(function() {
        $element = $(fixture())
        $element.appendTo('body')

        $select     = $element.find('select')
        $input      = $element.find('input')
        $inputGroup = $element.find('div.input-group')
        $cancelNew  = $element.find('div.select-or-new-cancel')

        $element.bootstrapSelectOrNew()
      })

      afterEach(function() {
        $element.remove()
      })

      it("should show the input tag when 'New...' is selected", function() {
        expect($select).toBeVisible()
        expect($inputGroup).not.toBeVisible()
        $select.val('0').trigger('change')
        expect($select).not.toBeVisible()
        expect($inputGroup).toBeVisible()
      })

      it("should focus on the input tag when 'New...' is selected", function() {
        $select.val('0').trigger('change')
        expect($input).toBeFocused()
      })

      it("should show the select tag when new is cancelled", function() {
        $select.val('0').trigger('change')
        $cancelNew.click()
        expect($select).toBeVisible()
        expect($inputGroup).not.toBeVisible()
      })

      it("should focus on the select tag when new is cancelled", function() {
        $select.val('0').trigger('change')
        $cancelNew.click()
        expect($select).toBeFocused()
      })

      it("should empty the input value when new is cancelled", function() {
        $select.val('0').trigger('change')
        $input.val('New Category')
        $cancelNew.click()
        expect($input).toHaveValue('')
      })

    })

  })

})
