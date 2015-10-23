require 'bootstrap_form/form_builder'
require 'bootstrap_form_extensions/submit_bar'
require 'bootstrap_form_extensions/timespan'
require 'bootstrap_form_extensions/arrayed_field'
require 'bootstrap_form_extensions/scheduler'

module BootstrapFormExtensions
  module Rails
    class Engine < ::Rails::Engine
    end
  end
end

BootstrapForm::FormBuilder.send :include, BootstrapFormExtensions::SubmitBar,
                                          BootstrapFormExtensions::Timespan,
                                          BootstrapFormExtensions::ArrayedField,
                                          BootstrapFormExtensions::Scheduler
