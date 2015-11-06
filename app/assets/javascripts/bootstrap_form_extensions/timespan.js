+function ($) {
  'use strict';

  // TIMESPAN CLASS DEFINITION
  // =========================

  var Timespan = function (element) {
    this.$container = $(element)
    this.$container.on('change.bsfe.timespan.data-api', '.timespan-quantity, .timespan-unit', this.updateSeconds.bind(this))
  }

  Timespan.VERSION = '1.0.1'

  Timespan.prototype.updateSeconds = function (e) {
    var hidden   = this.$container.find('.timespan-seconds')
    var quantity = this.$container.find('.timespan-quantity')
    var unit     = this.$container.find('.timespan-unit')
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

  $(window).on('load page:load page:restore', function () {
    $('[data-timespan]').each(function () {
      Plugin.call(this)
    })
  })

}(jQuery);
