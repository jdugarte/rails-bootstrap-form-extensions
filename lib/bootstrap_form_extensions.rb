require 'bootstrap_form/form_builder'
require 'bootstrap_form_extensions/submit_bar'
require 'bootstrap_form_extensions/timespan'

module BootstrapFormExtensions
  module Rails
    class Engine < ::Rails::Engine
    end
  end
end

BootstrapForm::FormBuilder.send :include, BootstrapFormExtensions::SubmitBar
BootstrapForm::FormBuilder.send :include, BootstrapFormExtensions::Timespan
