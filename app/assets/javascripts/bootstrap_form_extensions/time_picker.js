+function ($) {
  'use strict';


  // TIME PICKER CLASS DEFINITION
  // ============================

  var TimePicker = function (element, options) {
    var defaults = {
      minuteStep:   1,
      showSeconds:  true,
      secondStep:   1,
      showMeridian: false,
      defaultTime:  false
    }
    $(element).timepicker($.extend(defaults, options))
  }

  TimePicker.VERSION = '0.0.7'


  // TIME PICKER PLUGIN DEFINITION
  // =============================

  function Plugin(options) {
    return $(this).each(function () {
      var $this = $(this)
      var data  = $this.data('bsfe.timepicker')

      if (!data) $this.data('bsfe.timepicker', (data = new TimePicker(this, options)))
    })
  }

  var old = $.fn.timePicker

  $.fn.timePicker             = Plugin
  $.fn.timePicker.Constructor = TimePicker


  // TIME PICKER NO CONFLICT
  // =======================

  $.fn.timePicker.noConflict = function () {
    $.fn.timePicker = old
    return this
  }


  // TIME PICKER DATA-API
  // ====================

  $(window).on('load page:load page:restore', function () {
    $('[data-provide="timepicker"]').each(function () {
      var $picker = $(this)
      var options = $picker.html5data('time')

      Plugin.call($picker, options)
    })
  })

}(jQuery);
