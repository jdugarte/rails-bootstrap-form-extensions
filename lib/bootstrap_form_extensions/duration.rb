module BootstrapFormExtensions

  module Duration

    include BootstrapFormExtensions::Helpers

    def duration_without_bootstrap method, **options
      fields = duration_fields_builder method, options.except(:wrapper, :wrapper_class)

      options[:class] = merge_css_classes options.delete(:wrapper_class), 'duration-group'
      options.merge!(options.delete(:wrapper) { {} })
      options[:data] ||= {}
      options[:data][:duration] = true

      content_tag :div, fields, options
    end

    def duration method, **options
      options[:class] = merge_css_classes options[:class], 'form-control'
      fields = duration_fields_builder method, options.except(:wrapper, :wrapper_class)

      # TODO: Replace for these commented out lines, once this pull request is merged: https://github.com/bootstrap-ruby/rails-bootstrap-forms/pull/238
      # options[:wrapper] ||= {}
      # options[:wrapper].merge! inline: true
      options[:control_col] = control_col_for_number_fields options

      options[:wrapper_class] = merge_css_classes options[:wrapper_class], 'duration-group'
      options[:wrapper] ||= {}
      options[:wrapper][:data] ||= {}
      options[:wrapper][:data][:duration] = true

      form_group_builder(method, options) { fields }
    end

    private

    def duration_fields_builder method, options
      hours, minutes, seconds, milliseconds = parse_duration_values method
      hidden = hidden_field method, class: 'duration-seconds', data: { formatted: ('%5d:%02d:%02d.%03d' % [ hours, minutes, seconds, milliseconds ]).strip }
      number_fields = %w[ hours minutes seconds milliseconds ].inject(''.html_safe) do |html, unit|
        html << unit_field_builder(unit, eval(unit), options.dup)
      end
      hidden + number_fields
    end

    def parse_duration_values method
      duration_seconds = object.send(method).to_f
      hours, minutes, seconds, milliseconds = [ 1, 60, 60 ].reduce([ duration_seconds ]) do |values, unit|
        values.unshift(values.shift.divmod(unit)).flatten
      end
      [ hours, minutes, seconds, (milliseconds * 1000).round ]
    end

    def unit_field_builder unit, value, options
      options[:class] = merge_css_classes options[:class], unit
      options.merge! min: 0
      options.merge! max: (unit == 'milliseconds' ? 999 : 59) unless unit == 'hours'
      field = @template.number_field_tag "#{object_name}[#{unit}]", value, options
      separator = unit == 'milliseconds' ? '' : unit == 'seconds' ? '.' : ':'
      field + separator
    end

    def control_col_for_number_fields options
      (options[:control_col] || control_col.clone) + ' form-inline'
    end

  end

end
