module BootstrapFormExtensions

  module DateTimePickers

    include BootstrapFormExtensions::Helpers

    def date_time_picker attribute, **options
      name = attribute.to_s.sub /_at$/, ''
      date_method  = options.delete(:date_method) { "#{name}_date".to_sym }
      time_method  = options.delete(:time_method) { "#{name}_time".to_sym }

      date_options = options.delete(:date_options) { {} }
      time_options = options.delete(:time_options) { {} }
      date_options[:class] = [ 'form-control', date_options[:class] ].compact.uniq.join(' ')
      time_options[:class] = [ 'form-control', time_options[:class] ].compact.uniq.join(' ')

      # TODO: Replace for these commented out lines, once this pull request is merged: https://github.com/bootstrap-ruby/rails-bootstrap-forms/pull/238
      # options[:wrapper] ||= {}
      # options[:wrapper].merge! inline: true
      options[:control_col] = 'col-sm-10 form-inline'

      date_picker_html = content_tag :div, date_picker_builder(date_method, date_options), class: 'form-group'
      time_picker_html = content_tag :div, time_picker_builder(time_method, time_options), class: 'form-group'
      form_group_builder(attribute, options) { date_picker_html + '&nbsp;&nbsp;'.html_safe + time_picker_html }
    end

    def date_picker method, **options
      # TODO: Replace for these commented out lines, once this pull request is merged: https://github.com/bootstrap-ruby/rails-bootstrap-forms/pull/238
      # options[:wrapper] ||= {}
      # options[:wrapper].merge! inline: true
      options[:control_col] = 'col-sm-10 form-inline'
      form_group_builder(method, options) { date_picker_builder method, options }
    end

    def time_picker method, **options
      # TODO: Replace for these commented out lines, once this pull request is merged: https://github.com/bootstrap-ruby/rails-bootstrap-forms/pull/238
      # options[:wrapper] ||= {}
      # options[:wrapper].merge! inline: true
      options[:control_col] = 'col-sm-10 form-inline'
      form_group_builder(method, options) { time_picker_builder method, options }
    end

    private

    def date_picker_builder method, **options
      widget_options = {
        provide:                     'datepicker',
        date_today_highlight:        true,
        date_format:                 'yyyy-mm-dd',
        date_today_btn:              'linked',
        date_autoclose:              true,
        date_disable_touch_keyboard: true,
        date_enable_on_readonly:     false,
        date_show_on_focus:          false
      }
      widget = options.delete(:widget) { {} }
      widget.each { |option, value| widget_options["date_#{option.to_s.underscore}".to_sym] = value }

      text = self.text_field_without_bootstrap method, { size: 10 }.merge(options)
      icon = content_tag :span, glyphicon_tag('calendar'), class: 'input-group-addon'
      content_tag :div, text + icon, class: 'input-group date', data: widget_options
    end

    def time_picker_builder method, **options
      widget_options = { provide: 'timepicker' }
      widget = options.delete(:widget) { {} }
      widget.each { |option, value| widget_options["time_#{option.to_s.underscore}".to_sym] = value }

      options.reverse_merge! size: 8, data: {}
      options[:data].merge! widget_options

      text = self.text_field_without_bootstrap method, options
      icon = content_tag :span, glyphicon_tag('time'), class: 'input-group-addon'
      content_tag :div, text + icon, class: 'input-group bootstrap-timepicker'
    end

  end

end
