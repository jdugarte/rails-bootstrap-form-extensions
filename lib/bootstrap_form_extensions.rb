require 'bootstrap_form/form_builder'
require 'bootstrap_form_extensions/submit_bar'

module BootstrapFormExtensions
end

BootstrapForm::FormBuilder.send :include, BootstrapFormExtensions::SubmitBar
