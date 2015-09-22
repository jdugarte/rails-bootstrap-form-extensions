require 'test_helper'

class SubmitBarTest < ActionView::TestCase
  include BootstrapFormExtensions::SubmitBar

  def setup
    setup_test_fixture
  end

  test "SubmitBar with default values" do
    expected = <<-HTML
<div class="form-group">
  <div class='pull-left submitbar-left'>
      <div class="btn-group dropup submitbar-submit-group">
        <button type="submit" class="btn btn-primary submitbar-save">Save</button>
          <button type="button" class="btn btn-primary dropdown-toggle submitbar-next-action-toggle" data-toggle="dropdown">
            <span class="caret"></span>
            <span class="sr-only">Toggle Dropdown</span>
          </button>
          <ul class="dropdown-menu submitbar-next-action-menu" role="menu">
              <li><button type="submit" name="next_action" class="btn-link submitbar-duplicate" value="duplicate">Save and duplicate</button></li>
              <li><button type="submit" name="next_action" class="btn-link submitbar-new" value="new">Save and new</button></li>
          </ul>
      </div>
      <a class="btn btn-default submitbar-cancel" rel="nofollow" href="/things">Cancel</a>
  </div>
</div>
    HTML
    assert_equal expected, @builder.submit_bar
  end

  test "don't show the submit button" do
    @output_buffer = @builder.submit_bar show_submit_button: false
    assert_select 'button.submitbar-save', count: 0
    assert_select 'div.submitbar-submit-group', count: 0
  end

  test "change the submit button text" do
    @output_buffer = @builder.submit_bar submit_button_text: 'Register'
    assert_select 'button.submitbar-save', text: 'Register'
    assert_select 'button.submitbar-duplicate', text: /^Register/
    assert_select 'button.submitbar-new', text: /^Register/
  end

  test "don't show the submit menu" do
    @output_buffer = @builder.submit_bar show_submit_menu: false
    assert_select 'button.submitbar-next-action-toggle', count: 0
    assert_select 'ul.submitbar-next-action-menu', count: 0
    assert_select 'button[name=next_action]', count: 0
  end

  test "don't show the submit and duplicate button" do
    @output_buffer = @builder.submit_bar show_submit_and_dup_button: false
    assert_select 'button.submitbar-next-action-toggle', count: 1
    assert_select 'ul.submitbar-next-action-menu', count: 1
    assert_select 'button.submitbar-duplicate', count: 0
  end

  test "don't show the submit and new button" do
    @output_buffer = @builder.submit_bar show_submit_and_new_button: false
    assert_select 'button.submitbar-next-action-toggle', count: 1
    assert_select 'ul.submitbar-next-action-menu', count: 1
    assert_select 'button.submitbar-new', count: 0
  end

  test "don't show the cancel button" do
    @output_buffer = @builder.submit_bar show_cancel_button: false
    assert_select 'submitbar-cancel', count: 0
  end

  test "change the cancel button text" do
    @output_buffer = @builder.submit_bar cancel_button_text: 'Abort'
    assert_select 'a.submitbar-cancel', text: 'Abort'
  end

  test "change the cancel button url" do
    @output_buffer = @builder.submit_bar cancel_button_url: '/'
    assert_select 'a.submitbar-cancel', href: '/'
  end

  test "cancel button points to the create url when the object is new" do
    @output_buffer = @builder.submit_bar
    assert_select 'a.submitbar-cancel[href=?]', things_path
  end

  test "cancel button points to the index url when the object is persisted" do
    @thing.save
    @output_buffer = @builder.submit_bar
    assert_select 'a.submitbar-cancel[href=?]', thing_path(@thing)
  end

  test "cancel button text changes if there is no submit button" do
    @output_buffer = @builder.submit_bar show_submit_button:false
    assert_select 'a.submitbar-cancel', text: 'Back'
  end

  test "add extra buttons" do
    @output_buffer = @builder.submit_bar extra_buttons: [ { text: 'Option', url: '/option', class: 'option_css' } ]
    assert_select 'a.submitbar-extra-button', count: 1, text: 'Option'
    assert_select 'a.submitbar-extra-button[href=?]', '/option'
    assert_select 'a.submitbar-extra-button.option_css', count: 1
  end

  test "add extra buttons on the right" do
    @output_buffer = @builder.submit_bar right_buttons: [ { text: 'Option', url: '/option', class: 'option_css' } ]
    assert_select 'div.submitbar-right', count: 1
    assert_select 'a.submitbar-right-button', count: 1, text: 'Option'
    assert_select 'a.submitbar-right-button[href=?]', '/option'
    assert_select 'a.submitbar-right-button.option_css', count: 1
  end

end
