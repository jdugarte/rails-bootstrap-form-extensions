require 'bootstrap_form_extensions/helpers'

module BootstrapFormExtensions

  module ArrayedField

    include BootstrapFormExtensions::Helpers

    ARRAYED_HELPERS = %w[ url_field text_field ]
    ARRAYED_HELPERS.each do |method_name|
      define_method "arrayed_#{method_name}" do |field, **options|
        arrayed_field method_name, field, options
      end
    end

    def arrayed_json_field method, fields, **options
      fields = parse_fields_for_arrayed_json fields
      col_class = options.fetch :col_class, 'col-sm-2'

      blueprint = fields.map do |field|
        case field[:type]
        when :select
          @template.select_tag nil, @template.options_for_select(field[:options]), class: 'form-control', data: { name: "#{object_name}[#{method}][][#{field[:name]}]" }
        else
          @template.text_field_tag nil, nil, class: 'form-control', placeholder: field[:name], data: { name: "#{object_name}[#{method}][][#{field[:name]}]" }
        end
      end
      blueprint = arrayed_field_row_builder blueprint, col_class: col_class
      blueprint = arrayed_field_blueprint_builder blueprint

      form_group_builder_for_arrayed_field method, blueprint, options do |values|
        inputs = fields.map do |field|
          case field[:type]
          when :select
            @template.select_tag nil, @template.options_for_select(field[:options], values[field[:name].to_s]), class: 'form-control'
          else
            @template.text_field_tag "#{object_name}[#{method}][][#{field[:name]}]", values[field[:name].to_s], class: 'form-control', placeholder: field[:name]
          end
        end
        arrayed_field_row_builder inputs, col_class: col_class
      end
    end

    private

    def arrayed_field field_type, field, **options
      field_tag = "#{field_type}_tag".to_sym

      blueprint = @template.send field_tag, nil, nil, class: 'form-control', data: { name: "#{object_name}[#{field}][]" }
      blueprint = arrayed_field_row_builder blueprint
      blueprint = arrayed_field_blueprint_builder blueprint

      form_group_builder_for_arrayed_field field, blueprint, options do |value|
        input = @template.send field_tag, "#{object_name}[#{field}][]", value, class: 'form-control'
        arrayed_field_row_builder input
      end
    end

    def parse_fields_for_arrayed_json fields
      fields.map do |field|
        if field.is_a? Hash
          name   = field.keys.first
          values = field.values.first
          type   = values.fetch :type, :text
          select_options = values.fetch :options, []
          { name: name, type: type, options: select_options }
        else
          { name: field, type: :text }
        end
      end
    end

    def arrayed_field_row_builder args, col_class: 'col-sm-11'
      args = [ args ].flatten

      inputs = args.inject(''.html_safe) do |content, input|
        content << content_tag(:div, input, class: col_class)
      end

      remove_button = @template.link_to glyphicon_tag('trash'), 'javascript:void(0);', class: 'btn btn-default remove-arrayed-field-row'
      remove_button = content_tag :div, remove_button, class: 'col-sm-1'

      content_tag :div, inputs + remove_button, class: 'row voffset1'
    end

    def arrayed_field_blueprint_builder row
      content_tag :div, row, class: 'blueprint-for-arrayed-field', style: 'display:none;'
    end

    def form_group_builder_for_arrayed_field method, blueprint, options, &row_builder_block
      add_button = @template.link_to glyphicon_tag('plus'), 'javascript:void(0);', class: 'btn btn-default add-arrayed-field-row'
      add_button = content_tag :div, add_button, class: 'col-sm-12'
      add_button = content_tag :div, add_button, class: 'row voffset1'

      rows = object.send(method) rescue []
      rows = rows.inject(''.html_safe) { |content, value| content << row_builder_block.call(value) }
      rows = content_tag :div, rows, class: 'arrayed-field-rows'

      form_group_builder method, options do
        content_tag :div, blueprint + rows + add_button, data: { arrayed_field: true }
      end
    end

  end

end
