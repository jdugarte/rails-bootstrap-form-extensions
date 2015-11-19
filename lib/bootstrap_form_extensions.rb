require 'bootstrap_form/form_builder'
require 'bootstrap_form_extensions/submit_bar'
require 'bootstrap_form_extensions/timespan'
require 'bootstrap_form_extensions/arrayed_field'
require 'bootstrap_form_extensions/scheduler'
require 'bootstrap_form_extensions/date_time_pickers'
require 'bootstrap-datepicker-rails'
require 'bootstrap_form_extensions/select_or_new'
require 'bootstrap_form_extensions/duration'

module BootstrapFormExtensions
  module Rails
    class Engine < ::Rails::Engine
    end
  end
end

BootstrapForm::FormBuilder.send :include, BootstrapFormExtensions::SubmitBar,
                                          BootstrapFormExtensions::Timespan,
                                          BootstrapFormExtensions::ArrayedField,
                                          BootstrapFormExtensions::Scheduler,
                                          BootstrapFormExtensions::DateTimePickers,
                                          BootstrapFormExtensions::SelectOrNew,
                                          BootstrapFormExtensions::Duration
