+function ($) {
  'use strict';

  // ARRAYED FIELD CLASS DEFINITION
  // ==============================

  var ArrayedField = function (element) {
    this.$container = $(element)
    this.$container.on('click.bsfe.arrayedfield.data-api', '.add-arrayed-field-row', this.addRow.bind(this))
    this.$container.on('click.bsfe.arrayedfield.data-api', '.remove-arrayed-field-row', this.removeRow.bind(this))
  }

  ArrayedField.VERSION = '1.0.3'

  ArrayedField.prototype.addRow = function (event) {
    var blueprint = this.$container.find(".blueprint-for-arrayed-field > .row").clone(true)
    blueprint.find('[data-name]').each(function (i, field) {
      $(field)
        .attr('name', $(field).data('name'))
        .removeAttr('data-name')
    })
    blueprint.appendTo(this.$container.find(".arrayed-field-rows"))
    blueprint.trigger("added.bsfe.arrayedfield")
  }

  ArrayedField.prototype.removeRow = function (event) {
    var $target = $(event.target)
    var $rows = $target.closest('.arrayed-field-rows')
    $target.closest('.row').remove()
    $rows.trigger("removed.bsfe.arrayedfield")
  }


  // ARRAYED FIELD PLUGIN DEFINITION
  // ===============================

  function Plugin() {
    return $(this).each(function () {
      var $this = $(this)
      var data  = $this.data('bsfe.arrayedfield')

      if (!data) $this.data('bsfe.arrayedfield', (data = new ArrayedField(this)))
    })
  }

  var old = $.fn.arrayedfield

  $.fn.arrayedfield             = Plugin
  $.fn.arrayedfield.Constructor = ArrayedField


  // ARRAYED FIELD NO CONFLICT
  // =========================

  $.fn.arrayedfield.noConflict = function () {
    $.fn.arrayedfield = old
    return this
  }


  // ARRAYED FIELD DATA-API
  // ======================

  $(window).on('load page:load page:restore', function () {
    $('[data-arrayed-field]').each(function () {
      Plugin.call(this)
    })
  })

}(jQuery);
