+function ($) {
  'use strict';

  // TIMESPAN CLASS DEFINITION
  // =========================

  var Timespan = function (element) {
    var $container = $(element)
    $container.on('change.bsfe.timespan.data-api', '.timespan-quantity, .timespan-unit', this.updateSeconds)
  }

  Timespan.VERSION = '0.0.3'

  Timespan.prototype.updateSeconds = function (e) {
    var $container = $(this).closest('[data-timespan]')
    var hidden   = $container.find('.timespan-seconds')
    var quantity = $container.find('.timespan-quantity')
    var unit     = $container.find('.timespan-unit')
    var seconds  = +quantity.val() * +unit.val()

    hidden.val(seconds)
  }


  // TIMESPAN PLUGIN DEFINITION
  // ==========================

  function Plugin() {
    return $(this).each(function () {
      var $this = $(this)
      var data  = $this.data('bsfe.timespan')

      if (!data) $this.data('bsfe.timespan', (data = new Timespan(this)))
    })
  }

  var old = $.fn.timespan

  $.fn.timespan             = Plugin
  $.fn.timespan.Constructor = Timespan


  // TIMESPAN NO CONFLICT
  // ====================

  $.fn.timespan.noConflict = function () {
    $.fn.timespan = old
    return this
  }


  // TIMESPAN DATA-API
  // =================

  $(window).on('load', function () {
    $('[data-timespan]').each(function () {
      Plugin.call(this)
    })
  })

}(jQuery);
