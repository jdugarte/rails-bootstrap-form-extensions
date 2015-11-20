+function ($) {
  'use strict';

  // DURATION CLASS DEFINITION
  // =========================

  var Duration = function (element) {
    this.$container = $(element)
    this.$container.on('change.bsfe.duration.data-api', 'input.hours, input.minutes, input.seconds, input.milliseconds', this.updateSeconds.bind(this))
  }

  Duration.VERSION = '1.0.4'

  Duration.prototype.updateSeconds = function (event) {
    var hidden       = this.$container.find('input.duration-seconds')
    var hours        = this.$container.find('input.hours').val()
    var minutes      = this.$container.find('input.minutes').val()
    var seconds      = this.$container.find('input.seconds').val()
    var milliseconds = (this.$container.find('input.milliseconds').val() / 1000).toFixed(3)
    var duration     = +hours*3600 + +minutes*60 + +seconds + +milliseconds
    var formatted    = hours + ':' + ("00" + minutes).slice(-2) + ':' + ("00" + seconds).slice(-2) + '.' + ("000" + milliseconds).slice(-3)

    hidden.val(duration)
    hidden.data('formatted', formatted)
  }


  // DURATION PLUGIN DEFINITION
  // ==========================

  function Plugin() {
    return $(this).each(function () {
      var $this = $(this)
      var data  = $this.data('bsfe.duration')

      if (!data) $this.data('bsfe.duration', (data = new Duration(this)))
    })
  }

  var old = $.fn.duration

  $.fn.duration             = Plugin
  $.fn.duration.Constructor = Duration


  // DURATION NO CONFLICT
  // ====================

  $.fn.duration.noConflict = function () {
    $.fn.duration = old
    return this
  }


  // DURATION DATA-API
  // =================

  $(window).on('load page:load page:restore', function () {
    $('[data-duration]').each(function () {
      Plugin.call(this)
    })
  })

}(jQuery);
