begin
  require 'bundler/setup'
rescue LoadError
  puts 'You must `gem install bundler` and `bundle install` to run rake tasks'
end

require 'rdoc/task'

RDoc::Task.new(:rdoc) do |rdoc|
  rdoc.rdoc_dir = 'rdoc'
  rdoc.title    = 'BootstrapFormExtensions'
  rdoc.options << '--line-numbers'
  rdoc.rdoc_files.include('README.rdoc')
  rdoc.rdoc_files.include('lib/**/*.rb')
end






Bundler::GemHelper.install_tasks

require 'rake/testtask'

Rake::TestTask.new(:test) do |t|
  t.libs << 'lib'
  t.libs << 'test'
  t.pattern = 'test/**/*_test.rb'
  t.verbose = false
end


task default: :test



desc "Create bootstrap_form_extensions.js, concatenating all javascript files"
task :concatjs do
  File.open('app/assets/javascripts/bootstrap_form_extensions.js', 'w') do |concat_file|
    Dir.glob('app/assets/javascripts/bootstrap_form_extensions/*.js').each do |source_file|
      content = File.open(source_file, 'r').read
      content.each_line { |line| concat_file << line }
      concat_file << "\n\n"
    end
  end
end
