+function ($) {
  'use strict';

  // TIMESPAN CLASS DEFINITION
  // ============================

  var Timespan = function (el) {
    $(el).on('change', '.timespan-quantity, .timespan-unit', this.updateSeconds)
  }

  Timespan.VERSION = '0.0.3'

  Timespan.prototype.updateSeconds = function (e) {
    var $this    = $(this).closest('span[data-timespan]')
    var hidden   = $this.find('.timespan-seconds')
    var quantity = $this.find('.timespan-quantity')
    var unit     = $this.find('.timespan-unit')
    var seconds  = +quantity.val() * +unit.val()

    hidden.val(seconds)
  }


  // TIMESPAN PLUGIN DEFINITION
  // =============================

  function Plugin(option) {
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


