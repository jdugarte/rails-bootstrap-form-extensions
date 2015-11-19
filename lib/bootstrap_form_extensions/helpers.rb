module BootstrapFormExtensions

  module Helpers

    def glyphicon_tag *icons
      options = icons.extract_options!
      options[:class] = options.fetch :class, ''
      options[:class] << " glyphicon " << icons.flatten.map{ |icon| "glyphicon-#{icon}"}.join(' ')
      content_tag :i, nil, options
    end

    def true? value
      value.to_s.match(/(true|t|yes|y|1)$/i).present?
    end

    def merge_css_classes *css
      css.map { |value| value.to_s.split ' ' }.flatten.compact.uniq.join(' ')
    end

  end

end
