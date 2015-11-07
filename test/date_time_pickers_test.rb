require 'test_helper'

class DateTimePickersTest < ActionView::TestCase
  include BootstrapFormExtensions::DateTimePickers

  def setup
    setup_test_fixture
  end

  test "date_picker" do
    expected = '<div class="form-group"><label class="control-label col-sm-2" for="thing_start_date">Start date</label><div class="col-sm-10 form-inline"><div class="input-group date" data-provide="datepicker" data-date-today-highlight="true" data-date-format="yyyy-mm-dd" data-date-today-btn="linked" data-date-autoclose="true" data-date-disable-touch-keyboard="true" data-date-enable-on-readonly="false" data-date-show-on-focus="false"><input size="10" class="form-control" type="text" value="1971-10-21" name="thing[start_date]" id="thing_start_date" /><span class="input-group-addon"><i class=" glyphicon glyphicon-calendar"></i></span></div></div></div>'
    assert_equal expected, @builder.date_picker(:start_date)
  end

  test "add an option to date_picker" do
    @output_buffer = @builder.date_picker :start_date, widget: { clear_btn: true }
    assert_select 'div.date[data-date-clear-btn=true]'
  end

  test "overwrite one of the default options to date_picker" do
    @output_buffer = @builder.date_picker :start_date, widget: { format: 'dd-mm-yyyy' }
    assert_select 'div.date[data-date-format="dd-mm-yyyy"]'
  end

  test "time_picker" do
    expected = '<div class="form-group"><label class="control-label col-sm-2" for="thing_start_time">Start time</label><div class="col-sm-10 form-inline"><div class="input-group bootstrap-timepicker"><input class="form-control" size="8" data-provide="timepicker" type="text" value="07:30:00" name="thing[start_time]" id="thing_start_time" /><span class="input-group-addon"><i class=" glyphicon glyphicon-time"></i></span></div></div></div>'
    assert_equal expected, @builder.time_picker(:start_time)
  end

  test "add an option to time_picker" do
    @output_buffer = @builder.time_picker :start_time, widget: { disable_mousewheel: true }
    assert_select 'input[data-time-disable-mousewheel=true]'
  end

  test "date_time_picker" do
    expected = '<div class="form-group"><label class="control-label col-sm-2" for="thing_start_at">Start at</label><div class="col-sm-10 form-inline"><div class="form-group"><div class="input-group date" data-provide="datepicker" data-date-today-highlight="true" data-date-format="yyyy-mm-dd" data-date-today-btn="linked" data-date-autoclose="true" data-date-disable-touch-keyboard="true" data-date-enable-on-readonly="false" data-date-show-on-focus="false"><input size="10" class="form-control" type="text" value="1971-10-21" name="thing[start_date]" id="thing_start_date" /><span class="input-group-addon"><i class=" glyphicon glyphicon-calendar"></i></span></div></div>&nbsp;&nbsp;<div class="form-group"><div class="input-group bootstrap-timepicker"><input class="form-control" size="8" data-provide="timepicker" type="text" value="07:30:00" name="thing[start_time]" id="thing_start_time" /><span class="input-group-addon"><i class=" glyphicon glyphicon-time"></i></span></div></div></div></div>'
    assert_equal expected, @builder.date_time_picker(:start_at)
  end

  test "add an option to the date control in the date_time_picker" do
    @output_buffer = @builder.date_time_picker :start_at, date_options: { widget: { clear_btn: true } }
    assert_select 'div.date[data-date-clear-btn=true]'
  end

  test "add an option to the time control in the date_time_picker" do
    @output_buffer = @builder.date_time_picker :start_at, time_options: { widget: { disable_mousewheel: true } }
    assert_select 'input[data-time-disable-mousewheel=true]'
  end

end
