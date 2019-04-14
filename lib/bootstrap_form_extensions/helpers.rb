module BootstrapFormExtensions

  module Helpers

    def true? value
      value.to_s.match(/(true|t|yes|y|1)$/i).present?
    end

    def merge_css_classes *css
      css.map { |value| value.to_s.split ' ' }.flatten.compact.uniq.join(' ')
    end

  end

end
