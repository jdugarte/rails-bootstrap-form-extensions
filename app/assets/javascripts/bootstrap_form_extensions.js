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

  function Plugin() {
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


+function ($) {
  'use strict';

  // TIMESPAN CLASS DEFINITION
  // ============================

  var Timespan = function (element) {
    this.$container = $(element)
    this.$container.on('change.bsfe.timespan.data-api', '.timespan-quantity, .timespan-unit', this.updateSeconds)
  }

  Timespan.VERSION = '0.0.3'

  Timespan.prototype.updateSeconds = function (e) {
    var hidden   = this.$container.find('.timespan-seconds')
    var quantity = this.$container.find('.timespan-quantity')
    var unit     = this.$container.find('.timespan-unit')
    var seconds  = +quantity.val() * +unit.val()

    hidden.val(seconds)
  }


  // TIMESPAN PLUGIN DEFINITION
  // =============================

  function Plugin() {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bsfe.timespan')

      if (!data) $this.data('bsfe.timespan', (data = new Timespan(this)))
    })
  }

  var old = $.fn.timespan

  $.fn.timespan             = Plugin
  $.fn.timespan.Constructor = Timespan


  // TIMESPAN NO CONFLICT
  // =======================

  $.fn.timespan.noConflict = function () {
    $.fn.timespan = old
    return this
  }


  // TIMESPAN DATA-API
  // ====================

  $(window).on('load', function () {
    $('[data-timespan]').each(function () {
      Plugin.call($(this))
    })
  })

}(jQuery);


