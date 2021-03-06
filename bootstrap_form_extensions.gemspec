$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "bootstrap_form_extensions/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "bootstrap_form_extensions"
  s.version     = BootstrapFormExtensions::VERSION
  s.author      = "Jesús Dugarte"
  s.email       = "jdugarte@gmail.com"
  s.homepage    = "http://jdugarte.github.io/rails-bootstrap-form-extensions/"
  s.summary     = "Specialized controls added to the bootstrap_form gem"
  s.description = ""
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc"]
  s.test_files = Dir["test/**/*"]

  s.add_dependency "bootstrap_form", "~> 4.2.0"

  s.add_development_dependency "rails", "~> 5.0"
  s.add_development_dependency "sqlite3"
  s.add_development_dependency "mocha"
  s.add_development_dependency "jasmine"
end
