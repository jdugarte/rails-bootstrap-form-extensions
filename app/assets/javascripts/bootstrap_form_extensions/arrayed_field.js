+function ($) {
  'use strict';

  // ARRAYED FIELD CLASS DEFINITION
  // ============================

  var ArrayedField = function (element) {
    var $container = $(element)
    $container.on('click.bsfe.arrayedfield.data-api', '.add-arrayed-field-row', this.addRow)
    $container.on('click.bsfe.arrayedfield.data-api', '.remove-arrayed-field-row', this.removeRow)
  }

  ArrayedField.VERSION = '0.0.4'

  ArrayedField.prototype.addRow = function (event) {
    var $container = $(this).closest('[data-arrayed-field]')
    var blueprint = $container.find(".blueprint-for-arrayed-field > .row").clone(true)
    blueprint.find('[data-name]').each(function (i, field) {
      $(field)
        .attr('name', $(field).data('name'))
        .removeAttr('data-name')
    })
    blueprint.appendTo($container.find(".arrayed-field-rows"))
    blueprint.trigger("added.bsfe.arrayedfield")
  }

  ArrayedField.prototype.removeRow = function (event) {
    var $target = $(event.target)
    var $rows = $target.closest('.arrayed-field-rows')
    $target.closest('.row').remove()
    $rows.trigger("removed.bsfe.arrayedfield")
  }


  // ARRAYED FIELD PLUGIN DEFINITION
  // =============================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bsfe.arrayedfield')

      if (!data) $this.data('bsfe.arrayedfield', (data = new ArrayedField(this)))
    })
  }

  var old = $.fn.arrayedfield

  $.fn.arrayedfield             = Plugin
  $.fn.arrayedfield.Constructor = ArrayedField


  // ARRAYED FIELD NO CONFLICT
  // =======================

  $.fn.arrayedfield.noConflict = function () {
    $.fn.arrayedfield = old
    return this
  }


  // ARRAYED FIELD DATA-API
  // ====================

  $(window).on('load', function () {
    $('[data-arrayed-field]').each(function () {
      Plugin.call($(this))
    })
  })

}(jQuery);
