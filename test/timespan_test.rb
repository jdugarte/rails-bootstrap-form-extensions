require 'test_helper'

class TimespanTest < ActionView::TestCase
  include BootstrapFormExtensions::Timespan

  def setup
    setup_test_fixture
  end

  test "Timespan with default values" do
    expected = <<-HTML.chomp
<span data-timespan="true"><input class="timespan-seconds" type="hidden" value="3600" name="thing[duration_in_seconds]" id="thing_duration_in_seconds" /><div class="form-group"><input type="text" name="duration_quantity" id="duration_quantity" value="1" size="5" class="form-control timespan-quantity" /></div>&nbsp;<div class="form-group"><select name="duration_unit" id="duration_unit" class="form-control timespan-unit"><option value="1">seconds</option>
<option value="60">minutes</option>
<option selected="selected" value="3600">hours</option>
<option value="86400">days</option>
<option value="604800">weeks</option>
<option value="18144000">months</option></select></div></span>
    HTML
    assert_equal expected, @builder.timespan(:duration_in_seconds)
  end

  test "specifying units" do
    expected = <<-HTML.chomp
<span data-timespan="true"><input class="timespan-seconds" type="hidden" value="3600" name="thing[duration_in_seconds]" id="thing_duration_in_seconds" /><div class="form-group"><input type="text" name="duration_quantity" id="duration_quantity" value="1" size="5" class="form-control timespan-quantity" /></div>&nbsp;<div class="form-group"><select name="duration_unit" id="duration_unit" class="form-control timespan-unit"><option selected="selected" value="3600">hours</option>
<option value="86400">days</option></select></div></span>
    HTML
    assert_equal expected, @builder.timespan(:duration_in_seconds, units: %i[ hours days ])
  end

  test "specifying quantity html options" do
    @output_buffer = @builder.timespan(:duration_in_seconds, quantity_options: { class: 'quantity-css' })
    assert_select 'input.timespan-quantity.quantity-css'
  end

  test "specifying unit html options" do
    @output_buffer = @builder.timespan(:duration_in_seconds, unit_options: { class: 'unit-css' })
    assert_select 'select.timespan-unit.unit-css'
  end

  test "field has errors" do
    @thing.errors.add :duration_in_seconds, 'has some errors'
    @output_buffer = @builder.timespan(:duration_in_seconds)
    assert_select 'div.has-error > input.timespan-quantity'
    assert_select 'span.help-block', text: 'has some errors'
  end

end
