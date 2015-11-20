require 'test_helper'

class DurationTest < ActionView::TestCase
  include BootstrapFormExtensions::Duration

  def setup
    setup_test_fixture
  end

  test "duration" do
    expected = '<div class="form-group duration-group" data-duration="true"><label class="control-label col-sm-2" for="thing_duration_in_seconds2">Duration in seconds2</label><div class="col-sm-10 form-inline"><input class="duration-seconds" data-formatted="1:37:23.476" type="hidden" value="5843.476" name="thing[duration_in_seconds2]" id="thing_duration_in_seconds2" /><input type="number" name="thing[hours]" id="thing_hours" value="1" class="form-control hours" min="0" />:<input type="number" name="thing[minutes]" id="thing_minutes" value="37" class="form-control minutes" min="0" max="59" />:<input type="number" name="thing[seconds]" id="thing_seconds" value="23" class="form-control seconds" min="0" max="59" />.<input type="number" name="thing[milliseconds]" id="thing_milliseconds" value="476" class="form-control milliseconds" min="0" max="999" /></div></div>'
    assert_equal expected, @builder.duration(:duration_in_seconds2)
  end

  test "duration_without_bootstrap" do
    expected = '<div class="duration-group" data-duration="true"><input class="duration-seconds" data-formatted="1:37:23.476" type="hidden" value="5843.476" name="thing[duration_in_seconds2]" id="thing_duration_in_seconds2" /><input type="number" name="thing[hours]" id="thing_hours" value="1" class="hours" min="0" />:<input type="number" name="thing[minutes]" id="thing_minutes" value="37" class="minutes" min="0" max="59" />:<input type="number" name="thing[seconds]" id="thing_seconds" value="23" class="seconds" min="0" max="59" />.<input type="number" name="thing[milliseconds]" id="thing_milliseconds" value="476" class="milliseconds" min="0" max="999" /></div>'
    assert_equal expected, @builder.duration_without_bootstrap(:duration_in_seconds2)
  end

  test "duration_without_bootstrap accepts wrapper options, like a bootstrap form's form-group" do
    @output_buffer = @builder.duration_without_bootstrap :duration_in_seconds2, wrapper: { data: { test: 'accepts' } }
    assert_select 'div.duration-group[data-test="accepts"]'
  end

  test "duration_without_bootstrap accepts wrapper_class, like a bootstrap form's form-group" do
    @output_buffer = @builder.duration_without_bootstrap :duration_in_seconds2, wrapper_class: 'test_class'
    assert_select 'div.duration-group.test_class'
  end

end
