module BootstrapFormExtensions

  module SubmitBar

    mattr_accessor :partial
    @@partial = 'bootstrap_form_extensions/submit_bar'

    mattr_accessor :show_submit_button
    @@show_submit_button = true

    mattr_accessor :submit_button_text
    @@submit_button_text = 'Save'

    mattr_accessor :show_submit_menu
    @@show_submit_menu = true

    mattr_accessor :show_submit_and_dup_button
    @@show_submit_and_dup_button = true

    mattr_accessor :show_submit_and_new_button
    @@show_submit_and_new_button = true

    mattr_accessor :show_cancel_button
    @@show_cancel_button = true

    mattr_accessor :cancel_button_text
    @@cancel_button_text = 'Cancel'

    mattr_accessor :back_button_text
    @@back_button_text = 'Back'

    def submit_bar show_submit_button: @@show_submit_button, submit_button_text: @@submit_button_text,
                   show_submit_menu: @@show_submit_menu, show_submit_and_dup_button: @@show_submit_and_dup_button, show_submit_and_new_button: @@show_submit_and_new_button,
                   show_cancel_button: @@show_cancel_button, cancel_button_text: nil, cancel_button_url: nil,
                   extra_buttons: [], right_buttons: [],
                   partial: @@partial

      show_submit_menu   &&= @template.current_ability.can? :new, object if @template.respond_to? :current_ability
      cancel_button_url  ||= @template.url_for(object.persisted? ? object : @template.controller_name.to_sym) rescue 'javascript:history.back();'
      cancel_button_text ||= show_submit_button ? @@cancel_button_text : @@back_button_text

      @template.render partial, {
        show_submit_button: show_submit_button, submit_button_text: submit_button_text,
        show_submit_menu:   show_submit_menu,   show_submit_and_dup_button: show_submit_and_dup_button, show_submit_and_new_button: show_submit_and_new_button,
        show_cancel_button: show_cancel_button, cancel_button_text: cancel_button_text, cancel_button_url: cancel_button_url,
        extra_buttons: parse_extra_buttons_for_submit_bar(extra_buttons, :extra),
        right_buttons: parse_extra_buttons_for_submit_bar(right_buttons, :right),
      }
    end

    private

    def parse_extra_buttons_for_submit_bar buttons, type
      buttons.map do |options|
        text = options.delete :text
        url  = options.delete :url
        options[:class] = merge_css_classes 'btn', 'btn-default', "submitbar-#{type}-button", options[:class]
        options[:rel] ||= "nofollow"
        { text: text, url: url, options: options }
      end
    end

  end

end
