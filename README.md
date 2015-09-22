# Rails Bootstrap Forms Extensions

## Requirements

* Ruby 2.0+
* Rails 4.0+
* Twitter Bootstrap 3.0+

## Installation

Add it to your Gemfile:

`gem 'bootstrap_form_extensions'`

Then:

`bundle`

Then require the CSS in your `application.css` file:

```css
/*
 *= require rails_bootstrap_forms_extensions
 */
```

## SubmitBar

Using all the default arguments, doing this:

```erb
<%= f.submit_bar %>
```

generates a form group, with two buttons: Save (a dropdown menu, that includes 'Save and duplicate', and 'Save and new' options), and Cancel:

```html
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
```

### Configuration

The following arguments can be used to configure the submit bar:

| Argument | Description | Default |
| -------- |-------------| --------|
| show_submit_button         | Show the Save button | true |
| submit_button_text         | Text used in the save button | 'Save' |
| show_submit_menu           | Show the dropdown menu on the save button | true |
| show_submit_and_dup_button | Show a 'Save and duplicate' option in the dropdown submit menu. The 'Save' text is affected by the submit_button_text argument | true |
| show_submit_and_new_button | Show a 'Save and new' option in the dropdown submit menu. The 'Save' text is affected by the submit_button_text argument | true |
| show_cancel_button         | Show the Cancel button| true |
| cancel_button_text         | Text used in the cancel button | 'Cancel' |
| cancel_button_url          | URL used in the cancel button | If the form object is a persisted ActiveRecord instance, the url to the show action; if not, the index action. If none of these path exit, then it uses 'javascript:history.back();' |
| extra_buttons              | An array of hashes with the definition of the extra buttons to be added between the submit and cancel buttons. The options should include at least :text and :url for the button. Anything else is passed as html options to the button | [] |
| right_buttons              | An array of hashes with the definition of the extra buttons to be added on the right side of the submit bar. The options should include at least :text and :url for the button. Anything else is passed as html options to the button | [] |
| partial                    | Partial template used to render the submit bar | See _Default partial_ below for details |

You can also change the default of `partial`, `show_submit_button`, `submit_button_text`, `show_submit_menu`, `show_submit_and_dup_button`, `show_submit_and_new_button`, `show_cancel_button`, `cancel_button_text`, or `back_button_text`, by invoking them on the BootstrapFormExtensions::SubmitBar, for example in an initializer file, like this:

```ruby
BootstrapFormExtensions::SubmitBar.partial = 'layouts/form_footer'
BootstrapFormExtensions::SubmitBar.show_submit_menu = false
```

### Default partial

This is the actual code of the default partial (located in app/views/bootstrap_form_extensions/_submit_bar.erb):

```erb
<div class="form-group">
  <div class='pull-left submitbar-left'>
    <% if show_submit_button %>
      <div class="btn-group dropup submitbar-submit-group">
        <button type="submit" class="btn btn-primary submitbar-save"><%= submit_button_text %></button>
        <% if show_submit_menu %>
          <button type="button" class="btn btn-primary dropdown-toggle submitbar-next-action-toggle" data-toggle="dropdown">
            <span class="caret"></span>
            <span class="sr-only">Toggle Dropdown</span>
          </button>
          <ul class="dropdown-menu submitbar-next-action-menu" role="menu">
            <% if show_submit_and_dup_button %>
              <li><button type="submit" name="next_action" class="btn-link submitbar-duplicate" value="duplicate"><%= submit_button_text %> and duplicate</button></li>
            <% end %>
            <% if show_submit_and_new_button %>
              <li><button type="submit" name="next_action" class="btn-link submitbar-new" value="new"><%= submit_button_text %> and new</button></li>
            <% end %>
          </ul>
        <% end %>
      </div>
    <% end %>
    <% extra_buttons.each do |text:, url:, options:| %>
      <%= link_to text, url, options %>
    <% end %>
    <% if show_cancel_button %>
      <%= link_to cancel_button_text, cancel_button_url, class: "btn btn-default submitbar-cancel", rel: "nofollow" %>
    <% end %>
  </div>
  <% if right_buttons.any? %>
    <div class='pull-right submitbar-right'>
      <% right_buttons.each do |text:, url:, options:| %>
        <%= link_to text, url, options %>
      <% end %>
    </div>
  <% end %>
</div>
```

You can use it as a template to create your own partial(s).

## Contributing

Here's a quick guide for contributing:

1. Fork the repo.

2. Run the existing test suite:

```
$ bundle exec rake -f test/dummy/Rakefile db:create db:migrate RAILS_ENV=test
$ bundle exec rake
```

3. Add tests for your change.

4. Add your changes and make your test(s) pass.

5. Update the README if necessary.

6. Add a line to the CHANGELOG for your bug fix or feature.

7. Push to your fork and submit a pull request.
