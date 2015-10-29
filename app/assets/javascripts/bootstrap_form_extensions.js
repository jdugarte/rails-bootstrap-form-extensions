+function ($) {
  'use strict';

  // ARRAYED FIELD CLASS DEFINITION
  // ==============================

  var ArrayedField = function (element) {
    this.$container = $(element)
    this.$container.on('click.bsfe.arrayedfield.data-api', '.add-arrayed-field-row', this.addRow.bind(this))
    this.$container.on('click.bsfe.arrayedfield.data-api', '.remove-arrayed-field-row', this.removeRow.bind(this))
  }

  ArrayedField.VERSION = '0.0.5'

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


+function ($) {
  'use strict';


  // SCHEDULER CLASS DEFINITION
  // ==========================

  var Scheduler = function (element) {
    this.days = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ]
    this.$element = $(element)
    this.createEvents()
    this.setInitialValues()
  }

  Scheduler.VERSION = '0.0.5'

  Scheduler.prototype.createEvents = function (event) {
    this.$element.on('click.bsfe.scheduler.data-api', 'table.scheduler-badge', this.editSchedule.bind(this))
  }

  Scheduler.prototype.setInitialValues = function (event) {
    var hidden_field = this.hiddenField()
    if (hidden_field.length > 0) {
      this.values = JSON.parse(hidden_field.val())
    } else {
      this.values = []
    }
  }

  Scheduler.prototype.editSchedule = function (event) {
    this.createModal()
    this.$modal.modal({ keyboard: true })
  }

  Scheduler.prototype.createModal = function () {
    this.$container = this.modalTemplate()
    this.$container.appendTo('body')
    this.$modal = this.$container.find('.modal')
    this.createModalEvents()
  }

  Scheduler.prototype.createModalEvents = function () {
    this.$modal.on('click.bsfe.scheduler.data-api', 'a.hour-header', this.toggleHour.bind(this))
    this.$modal.on('click.bsfe.scheduler.data-api', 'a.day-header', this.toggleDay.bind(this))
    this.$modal.on('click.bsfe.scheduler.data-api', 'td.clickable', this.toggleOne.bind(this))
    this.$modal.on('click.bsfe.scheduler.data-api', 'a.all', this.toggleAll.bind(this, true))
    this.$modal.on('click.bsfe.scheduler.data-api', 'a.none', this.toggleAll.bind(this, false))
    this.$modal.on('click.bsfe.scheduler.data-api', 'button.apply', this.apply.bind(this))
    this.$modal.on('click.bsfe.scheduler.data-api', 'button.cancel', this.removeModal.bind(this))
  }

  Scheduler.prototype.removeModal = function () {
    this.$modal.modal('hide')
    this.$container.remove()
  }

  Scheduler.prototype.toggleHour = function (event) {
    var hour  = $(event.target).data('hour')
    var cells = this.$modal.find("td[data-hour=" + hour + "]")
    this.toggleLine(cells)
  }

  Scheduler.prototype.toggleDay = function (event) {
    var cells = $(event.target).closest('tr').find('td.clickable')
    this.toggleLine(cells)
  }

  Scheduler.prototype.toggleAll = function (value) {
    var cells = this.$modal.find('td.clickable')
    this.toggle(cells, value)
  }

  Scheduler.prototype.toggleOne = function (event) {
    var cell  = $(event.target)
    var value = cell.hasClass('off')
    this.toggle(cell, value)
  }

  Scheduler.prototype.toggleLine = function (cells) {
    var ctOn  = cells.filter('.on').length
    var ctOff = cells.filter('.off').length
    var value = ctOn < ctOff
    this.toggle(cells, value)
  }

  Scheduler.prototype.toggle = function (cells, value) {
    cells.toggleClass('on', value)
    cells.toggleClass('off', !value)
  }

  Scheduler.prototype.apply = function () {
    this.assignValues()
    this.updateBadge()
    this.removeModal()
  }

  Scheduler.prototype.assignValues = function () {
    var self = this
    this.scanTable(this.$modal.find("td.clickable"), function (cell, day, hour) {
      self.values[day][hour] = cell.hasClass('on')
    })
    this.hiddenField().val(JSON.stringify(this.values))
  }

  Scheduler.prototype.updateBadge = function () {
    var self = this
    this.scanTable(this.$element.find('table.scheduler-badge td'), function (cell, day, hour) {
      self.toggle(cell, this.values[day][hour])
    })
  }

  Scheduler.prototype.scanTable = function (elements, action) {
    var self = this, cell, day, hour
    elements.each(function (index, element) {
      cell = $(element)
      day  = cell.data('day')
      hour = cell.data('hour')
      action.call(self, cell, day, hour)
    })
  }

  Scheduler.prototype.hiddenField = function () {
    return this.$element.find('.scheduler-hidden-field')
  }


  // SCHEDULER HTML
  // ===========================

  Scheduler.prototype.modalTemplate = function () {
    return $("<div id='scheduler-container'>" +
             "  <div class='modal wider-modal' tabindex='-1'>" +
             "    <div class='modal-dialog'>" +
             "      <div class='modal-content'>" +
             "        <div class='modal-header'>" +
             "          <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>" +
             "          <h3>Schedule</h3>" +
             "        </div>" +
             "        <div class='modal-body'>" + this.scheduleTable() + this.linksAllNone() + "</div>" +
             "        <div class='modal-footer'>" +
             "          <button class='btn btn-primary apply' type='button' data-dismiss='modal'>Apply</button>" +
             "          <button class='btn btn-default cancel' type='button' data-dismiss='modal'>Cancel</button>" +
             "        </div>" +
             "      </div>" +
             "    </div>" +
             "  </div>" +
             "</div>"
    )
  }

  Scheduler.prototype.scheduleTable = function () {
    return "<table class='scheduler-editor'>" + this.hourHeaders() + this.dayRows() + "</table>"
  }

  Scheduler.prototype.hourHeaders = function () {
    var headers, hour, hours = []
    for (hour = 0; hour <= 23; hour++) {
      hours.push("<th><a class='hour-header' data-hour='" + hour + "'>" + (this.hourLabel(hour)) + "</a></th>")
    }
    return "<tr><th></th>" + hours.join('') + "</tr>"
  }

  Scheduler.prototype.hourLabel = function (hour) {
    if (hour === 0) return '12am'
    if (hour < 12) return hour + "am"
    if (hour === 12) return hour + "pm"
    return (hour - 12) + "pm"
  }

  Scheduler.prototype.dayRows = function () {
    var rows, day, hour, hours, first, on_off
    rows = []
    for (day = 0; day <= 6; day++) {
      first = "<td><a class='day-header'>" + this.days[day] + "</a></td>"
      hours = []
      for (hour = 0; hour <= 23; hour++) {
        on_off = this.values[day][hour] === 't' || this.values[day][hour] === true ? 'on' : 'off'
        hours.push("<td class='clickable " + on_off + "' data-day=" + day + " data-hour=" + hour + "></td>")
      }
      rows.push("<tr>" + (first + hours.join('')) + "</tr>")
    }
    return rows.join('')
  }

  Scheduler.prototype.linksAllNone = function () {
    return "<br><a class='all'>all</a>&nbsp;&nbsp;&nbsp;<a class='none'>none</a>"
  }


  // SCHEDULER PLUGIN DEFINITION
  // ===========================

  function Plugin() {
    return $(this).each(function () {
      var $this = $(this)
      var data  = $this.data('bsfe.scheduler')

      if (!data) $this.data('bsfe.scheduler', (data = new Scheduler(this)))
    })
  }

  var old = $.fn.scheduler

  $.fn.scheduler             = Plugin
  $.fn.scheduler.Constructor = Scheduler


  // SCHEDULER NO CONFLICT
  // =====================

  $.fn.scheduler.noConflict = function () {
    $.fn.scheduler = old
    return this
  }


  // SCHEDULER DATA-API
  // ==================

  $(window).on('load page:load page:restore', function () {
    $('[data-scheduler]').each(function () {
      Plugin.call(this)
    })
  })

}(jQuery);


+function ($) {
  'use strict';

  // TIMESPAN CLASS DEFINITION
  // =========================

  var Timespan = function (element) {
    this.$container = $(element)
    this.$container.on('change.bsfe.timespan.data-api', '.timespan-quantity, .timespan-unit', this.updateSeconds.bind(this))
  }

  Timespan.VERSION = '0.0.5'

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


