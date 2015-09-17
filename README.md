# Rails Bootstrap Forms Extensions

## Requirements

* Ruby 1.9+
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
