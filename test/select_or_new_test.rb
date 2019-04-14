require 'test_helper'

class SelectOrNewTest < ActionView::TestCase
  include BootstrapFormExtensions::SelectOrNew

  def setup
    setup_test_fixture
  end

  test "select_or_new" do
    expected = <<-HTML.chomp
<div class="form-group" data-select-or-new="true"><label class="control-label col-2" for="thing_category">Category</label><div class="col-10"><select class="form-control" name="thing[category]" id="thing_category"><option value="">Please select</option>
<option value="1">One</option>
<option value="2">Two</option>
<option value="0">New...</option></select><div class="input-group" style="display: none;"><input type="text" name="thing[new_category]" id="thing_new_category" class="form-control" placeholder="New..." /><div class="input-group-append select-or-new-cancel"><button class="btn btn-outline-danger" type="button">&times;</button></div></div></div></div>
    HTML
    assert_equal expected, @builder.select_or_new(:category, [ [ 'One', 1 ], [ 'Two', 2 ] ])
  end

  test "display new, if option is selected" do
    expected = <<-HTML.chomp
<div class="form-group" data-select-or-new="true"><label class="control-label col-2" for="thing_category">Category</label><div class="col-10"><select class="form-control" name="thing[category]" id="thing_category"><option value="">Please select</option>
<option value="1">One</option>
<option value="2">Two</option>
<option value="0">New...</option></select><div class="input-group" style="display: none;"><input type="text" name="thing[new_category]" id="thing_new_category" value="New Category" class="form-control" placeholder="New..." /><div class="input-group-append select-or-new-cancel"><button class="btn btn-outline-danger" type="button">&times;</button></div></div></div></div>
    HTML
    @thing.category_id = 0
    @thing.new_category = "New Category"
    assert_equal expected, @builder.select_or_new(:category, [ [ 'One', 1 ], [ 'Two', 2 ] ])
  end

  test "add a css class to the select" do
    @output_buffer = @builder.select_or_new :category, [ [ 'One', 1 ], [ 'Two', 2 ] ], {}, { class: 'category_select_css' }
    assert_select 'select.category_select_css'
  end

end
