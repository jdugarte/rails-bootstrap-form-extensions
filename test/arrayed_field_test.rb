require 'test_helper'

class ArrayedFieldTest < ActionView::TestCase
  include BootstrapFormExtensions::ArrayedField

  def setup
    setup_test_fixture
  end

  test "arrayed_text_field with default values" do
    expected = '<div class="form-group"><label class="control-label col-sm-2" for="thing_list">List</label><div class="col-sm-10"><div data-arrayed-field="true"><div class="blueprint-for-arrayed-field" style="display:none;"><div class="row voffset1"><div class="col-sm-11"><input type="text" id="" class="form-control" data-name="thing[list][]" /></div><div class="col-sm-1"><a class="btn btn-default remove-arrayed-field-row" href="javascript:void(0);"><i class=" glyphicon glyphicon-trash"></i></a></div></div></div><div class="arrayed-field-rows"><div class="row voffset1"><div class="col-sm-11"><input type="text" name="thing[list][]" id="thing_list_" value="One" class="form-control" /></div><div class="col-sm-1"><a class="btn btn-default remove-arrayed-field-row" href="javascript:void(0);"><i class=" glyphicon glyphicon-trash"></i></a></div></div><div class="row voffset1"><div class="col-sm-11"><input type="text" name="thing[list][]" id="thing_list_" value="Two" class="form-control" /></div><div class="col-sm-1"><a class="btn btn-default remove-arrayed-field-row" href="javascript:void(0);"><i class=" glyphicon glyphicon-trash"></i></a></div></div></div><div class="row voffset1"><div class="col-sm-12"><a class="btn btn-default add-arrayed-field-row" href="javascript:void(0);"><i class=" glyphicon glyphicon-plus"></i></a></div></div></div></div></div>'
    assert_equal expected, @builder.arrayed_text_field(:list)
  end

  test "arrayed_url_field with default values" do
    expected = '<div class="form-group"><label class="control-label col-sm-2" for="thing_urls">Urls</label><div class="col-sm-10"><div data-arrayed-field="true"><div class="blueprint-for-arrayed-field" style="display:none;"><div class="row voffset1"><div class="col-sm-11"><input type="url" id="" class="form-control" data-name="thing[urls][]" /></div><div class="col-sm-1"><a class="btn btn-default remove-arrayed-field-row" href="javascript:void(0);"><i class=" glyphicon glyphicon-trash"></i></a></div></div></div><div class="arrayed-field-rows"><div class="row voffset1"><div class="col-sm-11"><input type="url" name="thing[urls][]" id="thing_urls_" value="www.example1.com" class="form-control" /></div><div class="col-sm-1"><a class="btn btn-default remove-arrayed-field-row" href="javascript:void(0);"><i class=" glyphicon glyphicon-trash"></i></a></div></div><div class="row voffset1"><div class="col-sm-11"><input type="url" name="thing[urls][]" id="thing_urls_" value="www.example2.com" class="form-control" /></div><div class="col-sm-1"><a class="btn btn-default remove-arrayed-field-row" href="javascript:void(0);"><i class=" glyphicon glyphicon-trash"></i></a></div></div></div><div class="row voffset1"><div class="col-sm-12"><a class="btn btn-default add-arrayed-field-row" href="javascript:void(0);"><i class=" glyphicon glyphicon-plus"></i></a></div></div></div></div></div>'
    assert_equal expected, @builder.arrayed_url_field(:urls)
  end

  test "ArrayedField, with nonexistent attribute, assumes the value is an empty array" do
    expected = '<div class="form-group"><label class="control-label col-sm-2" for="thing_nonexistent">Nonexistent</label><div class="col-sm-10"><div data-arrayed-field="true"><div class="blueprint-for-arrayed-field" style="display:none;"><div class="row voffset1"><div class="col-sm-11"><input type="text" id="" class="form-control" data-name="thing[nonexistent][]" /></div><div class="col-sm-1"><a class="btn btn-default remove-arrayed-field-row" href="javascript:void(0);"><i class=" glyphicon glyphicon-trash"></i></a></div></div></div><div class="arrayed-field-rows"></div><div class="row voffset1"><div class="col-sm-12"><a class="btn btn-default add-arrayed-field-row" href="javascript:void(0);"><i class=" glyphicon glyphicon-plus"></i></a></div></div></div></div></div>'
    assert_equal expected, @builder.arrayed_text_field(:nonexistent)
  end

  test "ArrayedField, with non-array attribute, assumes the value is an empty array" do
    expected = '<div class="form-group"><label class="control-label col-sm-2 required" for="thing_name">Name</label><div class="col-sm-10"><div data-arrayed-field="true"><div class="blueprint-for-arrayed-field" style="display:none;"><div class="row voffset1"><div class="col-sm-11"><input type="text" id="" class="form-control" data-name="thing[name][]" /></div><div class="col-sm-1"><a class="btn btn-default remove-arrayed-field-row" href="javascript:void(0);"><i class=" glyphicon glyphicon-trash"></i></a></div></div></div><div class="arrayed-field-rows"></div><div class="row voffset1"><div class="col-sm-12"><a class="btn btn-default add-arrayed-field-row" href="javascript:void(0);"><i class=" glyphicon glyphicon-plus"></i></a></div></div></div></div></div>'
    assert_equal expected, @builder.arrayed_text_field(:name)
  end

  test "pass options to the form group in the an ArrayedField" do
    @output_buffer = @builder.arrayed_text_field(:list, wrapper_class: 'extra-class')
    assert_select 'div.form-group.extra-class'
  end

  test "arrayed_json_field with default values" do
    expected = '<div class="form-group"><label class="control-label col-sm-2" for="thing_variables">Variables</label><div class="col-sm-10"><div data-arrayed-field="true"><div class="blueprint-for-arrayed-field" style="display:none;"><div class="row voffset1"><div class="col-sm-2"><input type="text" id="" class="form-control" placeholder="name" data-name="thing[variables][][name]" /></div><div class="col-sm-2"><input type="text" id="" class="form-control" placeholder="value" data-name="thing[variables][][value]" /></div><div class="col-sm-1"><a class="btn btn-default remove-arrayed-field-row" href="javascript:void(0);"><i class=" glyphicon glyphicon-trash"></i></a></div></div></div><div class="arrayed-field-rows"><div class="row voffset1"><div class="col-sm-2"><input type="text" name="thing[variables][][name]" id="thing_variables__name" class="form-control" placeholder="name" /></div><div class="col-sm-2"><input type="text" name="thing[variables][][value]" id="thing_variables__value" class="form-control" placeholder="value" /></div><div class="col-sm-1"><a class="btn btn-default remove-arrayed-field-row" href="javascript:void(0);"><i class=" glyphicon glyphicon-trash"></i></a></div></div><div class="row voffset1"><div class="col-sm-2"><input type="text" name="thing[variables][][name]" id="thing_variables__name" class="form-control" placeholder="name" /></div><div class="col-sm-2"><input type="text" name="thing[variables][][value]" id="thing_variables__value" class="form-control" placeholder="value" /></div><div class="col-sm-1"><a class="btn btn-default remove-arrayed-field-row" href="javascript:void(0);"><i class=" glyphicon glyphicon-trash"></i></a></div></div></div><div class="row voffset1"><div class="col-sm-12"><a class="btn btn-default add-arrayed-field-row" href="javascript:void(0);"><i class=" glyphicon glyphicon-plus"></i></a></div></div></div></div></div>'
    assert_equal expected, @builder.arrayed_json_field(:variables, %i[ name value ])
  end

  test "arrayed_json_field with custom input types" do
    expected = <<-HTML.chomp
<div class="form-group"><label class="control-label col-sm-2" for="thing_variables">Variables</label><div class="col-sm-10"><div data-arrayed-field="true"><div class="blueprint-for-arrayed-field" style="display:none;"><div class="row voffset1"><div class="col-sm-2"><select id="" class="form-control" data-name="thing[variables][][name]"><option value="var1">Variable One</option>
<option value="var2">Variable Two</option>
<option value="var3">Variable Three</option></select></div><div class="col-sm-2"><input type="text" id="" class="form-control" placeholder="value" data-name="thing[variables][][value]" /></div><div class="col-sm-1"><a class="btn btn-default remove-arrayed-field-row" href="javascript:void(0);"><i class=" glyphicon glyphicon-trash"></i></a></div></div></div><div class="arrayed-field-rows"><div class="row voffset1"><div class="col-sm-2"><select id="" class="form-control"><option value="var1">Variable One</option>
<option value="var2">Variable Two</option>
<option value="var3">Variable Three</option></select></div><div class="col-sm-2"><input type="text" name="thing[variables][][value]" id="thing_variables__value" class="form-control" placeholder="value" /></div><div class="col-sm-1"><a class="btn btn-default remove-arrayed-field-row" href="javascript:void(0);"><i class=" glyphicon glyphicon-trash"></i></a></div></div><div class="row voffset1"><div class="col-sm-2"><select id="" class="form-control"><option value="var1">Variable One</option>
<option value="var2">Variable Two</option>
<option value="var3">Variable Three</option></select></div><div class="col-sm-2"><input type="text" name="thing[variables][][value]" id="thing_variables__value" class="form-control" placeholder="value" /></div><div class="col-sm-1"><a class="btn btn-default remove-arrayed-field-row" href="javascript:void(0);"><i class=" glyphicon glyphicon-trash"></i></a></div></div></div><div class="row voffset1"><div class="col-sm-12"><a class="btn btn-default add-arrayed-field-row" href="javascript:void(0);"><i class=" glyphicon glyphicon-plus"></i></a></div></div></div></div></div>
    HTML
    assert_equal expected, @builder.arrayed_json_field(:variables, [ { name: { type: :select, options: options_for_variables } }, :value ])
  end

  private

  def options_for_variables
    [
      [ "Variable One",   "var1" ],
      [ "Variable Two",   "var2" ],
      [ "Variable Three", "var3" ],
    ]
  end

end
