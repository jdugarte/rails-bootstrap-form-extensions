require 'mocha/mini_test'

# Configure Rails Environment
ENV["RAILS_ENV"] = "test"

require File.expand_path("../../test/dummy/config/environment.rb",  __FILE__)
ActiveRecord::Migrator.migrations_paths = [File.expand_path("../../test/dummy/db/migrate", __FILE__)]
require "rails/test_help"

# Filter out Minitest backtrace while allowing backtrace from other libraries
# to be shown.
Minitest.backtrace_filter = Minitest::BacktraceFilter.new

# Load support files
Dir["#{File.dirname(__FILE__)}/support/**/*.rb"].each { |f| require f }

# Load fixtures from the engine
if ActiveSupport::TestCase.respond_to?(:fixture_path=)
  ActiveSupport::TestCase.fixture_path = File.expand_path("../fixtures", __FILE__)
  ActionDispatch::IntegrationTest.fixture_path = ActiveSupport::TestCase.fixture_path
  ActiveSupport::TestCase.fixtures :all
end

ActionController::Base.prepend_view_path File.dirname(__FILE__) + "/../app/views"

def setup_test_fixture
  @thing    = Thing.new name: 'Something',
                        duration_in_seconds: 3600,
                        urls: [ 'www.example1.com', 'www.example2.com' ],
                        list: [ 'One', 'Two' ],
                        variables: [ { name: 'var1', value: 1 }, { name: 'var2', value: 2 } ],
                        schedule: [[false],[false],[false],[false],[false],[false],[false]]
  @builder  = BootstrapForm::FormBuilder.new :thing, @thing, self, layout: :horizontal, label_col: "col-sm-2", control_col: "col-sm-10"
  @template = @builder.instance_variable_get :@template
  @template.stubs(:controller_name).returns('things')
end
