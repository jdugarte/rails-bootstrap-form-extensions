module BootstrapFormExtensions

  module SelectOrNew

    include BootstrapFormExtensions::Helpers

    def select_or_new method, choices = [], options = {}, html_options = {}
      new_is_selected = object.send(method) == 0

      # select...
      options.delete :prompt
      options.delete :include_blank
      choices.unshift [ "Please select", nil ]
      choices.push    [ "New...", 0 ]
      html_options[:class] = merge_css_classes 'form-control', html_options[:class]
      html_options[:style] = 'display: none;' if new_is_selected
      select = self.select_without_bootstrap method, choices, options, html_options

      # ... or new
      icon = @template.glyphicon_tag 'remove', class: 'text-danger'
      icon = content_tag :div, icon, class: 'input-group-addon select-or-new-cancel'
      new_method = "new_#{method.to_s.sub(/_id$/, '')}"
      new_field_name = "#{object_name}[#{new_method}]"
      text = @template.text_field_tag new_field_name, object.try(new_method), class: 'form-control', placeholder: 'New...'
      text = content_tag :div, text + icon, class: 'input-group', style: (new_is_selected ?  '' : 'display: none;')

      # form group to put them together
      html_options[:wrapper] ||= {}
      html_options[:wrapper][:data] ||= {}
      html_options[:wrapper][:data][:select_or_new] = true
      form_group_builder(method, options, html_options) { select + text }
    end

  end

end
