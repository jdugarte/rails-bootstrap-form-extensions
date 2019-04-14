+function ($) {
  'use strict';


  // SELECT-OR-NEW CLASS DEFINITION
  // ==============================

  var SelectOrNew = function (element) {
    this.$element    = $(element)
    this.$select     = this.$element.find('select')
    this.$input      = this.$element.find('input[type="text"]')
    this.$inputGroup = this.$element.find('div.input-group')
    this.createEvents()
  }

  SelectOrNew.VERSION = '1.2.1'

  SelectOrNew.prototype.createEvents = function () {
    this.$element.on('change.bsfe.select-or-new.data-api', 'select', this.changeSelection.bind(this))
    this.$element.on('click.bsfe.select-or-new.data-api', 'div.input-group-append button', this.cancelNew.bind(this))
  }

  SelectOrNew.prototype.changeSelection = function (event) {
    if (this.$select.val() == '0') {
      this.$select.hide()
      this.$inputGroup.show()
      this.$input.focus()
    }
  }

  SelectOrNew.prototype.cancelNew = function (event) {
    this.$inputGroup.hide()
    this.$input.val('')
    this.$select.val('')
    this.$select.show()
    this.$select.focus()
  }


  // SELECT-OR-NEW PLUGIN DEFINITION
  // ===============================

  function Plugin() {
    return $(this).each(function () {
      var $this = $(this)
      var data  = $this.data('bsfe.select-or-new')

      if (!data) $this.data('bsfe.select-or-new', (data = new SelectOrNew(this)))
    })
  }

  var old = $.fn.selectOrNew

  $.fn.selectOrNew             = Plugin
  $.fn.selectOrNew.Constructor = SelectOrNew


  // SELECT-OR-NEW NO CONFLICT
  // =========================

  $.fn.selectOrNew.noConflict = function () {
    $.fn.selectOrNew = old
    return this
  }


  // SELECT-OR-NEW DATA-API
  // ======================

  $(window).on('load page:load turbolinks:load page:restore', function () {
    $('[data-select-or-new]').each(function () {
      Plugin.call(this)
    })
  })

}(jQuery);
