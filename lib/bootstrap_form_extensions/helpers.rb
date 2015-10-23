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

  end

end
