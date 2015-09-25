module BootstrapFormExtensions

  module Timespan

    UNITS_IN_SECONDS = ActiveSupport::OrderedHash[ :seconds, 1, :minutes, 60, :hours, 3600, :days, 86400, :weeks, 604800, :months, 18144000 ]

    mattr_accessor :units
    @@units = UNITS_IN_SECONDS.keys

    def timespan method, units: @@units, quantity_options: {}, unit_options: {}
      quantity, selected, units = quantity_and_units_for_timespan method, units
      hidden = hidden_field method, class: 'timespan-seconds'
      field  = text_field_for_timespan method, quantity, quantity_options
      select = select_for_timespan method, selected, units, unit_options
      content_tag :span, hidden + field + '&nbsp;'.html_safe + select, data: { timespan: true }
    end

    private

    def quantity_and_units_for_timespan method, units
      units = units.map { |unit| [ unit, UNITS_IN_SECONDS[unit] ] }

      time_in_seconds = object.send method
      return [ '', units.first.last, units ] if time_in_seconds.blank?

      selected = UNITS_IN_SECONDS.values.reverse.find(proc { 1 }) { |seconds| time_in_seconds % seconds == 0 }
      quantity = time_in_seconds / selected
      [ quantity, selected, units ]
    end

    def text_field_for_timespan method, quantity, quantity_options
      text_field_name = method.to_s.sub(/(_in_seconds)?$/, '_quantity').to_sym

      quantity_options[:size] ||= 5
      quantity_options[:class] = [ "form-control", "timespan-quantity", quantity_options[:class] ].compact.join(' ')

      field = @template.text_field_tag text_field_name, quantity, quantity_options
      field << generate_help(method, nil)

      css_class = 'form-group'
      css_class << " #{error_class}" if has_error?(method)

      content_tag :div, field, class: css_class
    end

    def select_for_timespan method, selected, units, unit_options
      select_field_name = method.to_s.sub(/(_in_seconds)?$/, '_unit').to_sym
      unit_options[:class] = [ "form-control", "timespan-unit", unit_options[:class] ].compact.join(' ')
      select = @template.select_tag select_field_name, @template.options_for_select(units, selected), unit_options
      content_tag :div, select, class: 'form-group'
    end

  end

end