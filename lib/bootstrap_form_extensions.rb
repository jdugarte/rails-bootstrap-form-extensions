require 'bootstrap_form/form_builder'
require 'bootstrap_form_extensions/submit_bar'

module BootstrapFormExtensions
  module Rails
    class Engine < ::Rails::Engine
    end
  end
end

BootstrapForm::FormBuilder.send :include, BootstrapFormExtensions::SubmitBar
