# Rails Bootstrap Form Extensions

## Requirements

* Ruby 2.0+
* Rails 4.0+
* Twitter Bootstrap 3.0+

## Installation

Add it to your Gemfile:

```ruby
gem 'bootstrap_form_extensions'
```

Then:

`bundle`

Then require the JS in your `application.js` file:

```js
/*
 *= require bootstrap_form_extensions
 */
```

And require the CSS in your `application.css` file:

```css
/*
 *= require rails_bootstrap_form_extensions
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

This is the actual code of the default partial (located in app/views/bootstrap_form_extensions/_submit_bar.html.erb):

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

## Timespan

Having, for example, a column `duration_in_seconds`, doing this:

```erb
<%= f.timespan :duration_in_seconds %>
```

generates this html:

```html
<span data-timespan="true">
  <input class="timespan-seconds" type="hidden" value="3600" name="thing[duration_in_seconds]" id="thing_duration_in_seconds" />
  <div class="form-group">
    <input type="text" name="duration_quantity" id="duration_quantity" value="1" size="5" class="form-control timespan-quantity" />
  </div>
  &nbsp;
  <div class="form-group">
    <select name="duration_unit" id="duration_unit" class="form-control timespan-unit">
      <option selected="selected" value="1">seconds</option>
      <option value="60">minutes</option>
      <option value="3600">hours</option>
      <option value="86400">days</option>
      <option value="604800">weeks</option>
      <option value="18144000">months</option>
    </select>
  </div>
</span>
```

### Configuration

The following arguments can be used to configure the timespan:

| Argument | Description | Default |
| -------- |-------------| --------|
| units            | The list of units that will be displayed       | [ :seconds, :minutes, :hours, :days, :weeks, :months ] |
| quantity_options | html options to be added to the quantity input | {} |
| unit_options     | html options to be added to the unit select    | {} |

You can also change the default of `units` by invoking it on the BootstrapFormExtensions::Timespan, for example in an initializer file, like this:

```ruby
BootstrapFormExtensions::Timespan.units = [ :hours, :days ]
```

## ArrayedField

ArrayedField provides three helpers:

### arrayed_text_field

Given a column that holds an array of texts, this helper adds a multiple line text inputs:

```erb
<%= f.arrayed_text_field :lists %>
```

It accepts any option you'd pass to a form_group. If the column provided doesn't exist, or is not an array, it assumes an empty array as the value.

### arrayed_url_field

Given a column that holds an array of URLs, this helper adds a multiple line url inputs:

```erb
<%= f.arrayed_url_field :urls %>
```

It accepts any option you'd pass to a form_group. If the column provided doesn't exist, or is not an array, it assumes an empty array as the value.

### arrayed_json_field

Given a column that holds an array of hashes, this helper adds a multiple line, multiple field, text/select inputs:

```erb
<%= f.arrayed_json_field :variables, [ :name, :value ] %>
```

The generated html contains multiple lines like this:

```html
<div class="col-sm-2">
  <input type="text" name="thing[variables][][name]" class="form-control" placeholder="name" />
</div>
<div class="col-sm-2">
  <input type="text" name="thing[variables][][value]" class="form-control" placeholder="value" />
</div>
```

The list of fields in the hash can be customized further:

```erb
<%= f.arrayed_json_field :variables, [ { name: { type: :select, options: [ [ "One", "var1" ], [ "Two", "var2" ] ] } }, :value ] %>
```

`type` can be `:text` or `:select`.

The generated html for each element of the array would look something like this:

```html
<div class="col-sm-2">
  <select class="form-control">
    <option value="var1">One</option>
    <option value="var2">Two</option>
  </select>
</div>
<div class="col-sm-2">
  <input class="form-control" name="thing[variables][][value]" placeholder="value" type="text">
</div>
```

It accepts any option you'd pass to a form_group. If the column provided doesn't exist, or is not an array, it assumes an empty array as the value.

## Contributing

Here's a quick guide for contributing:

1. Fork the repo.

2. Run the existing test suite:

```
$ bundle exec rake -f test/dummy/Rakefile db:create db:migrate RAILS_ENV=test
$ bundle exec rake
$ bundle exec rake jasmine:ci
```

3. Add tests for your change.

4. Add your changes and make your test(s) pass.

5. Update the README if necessary.

6. Add a line to the CHANGELOG for your bug fix or feature.

7. Push to your fork and submit a pull request.
