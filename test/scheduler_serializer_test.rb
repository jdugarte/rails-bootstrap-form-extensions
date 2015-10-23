require 'test_helper'

class SchedulerSerializerTest < ActionView::TestCase
  include BootstrapFormExtensions::Scheduler


  # dump

  test "dump blank values (nil, empty string, empty array), or invalid type, as yaml" do
    serializer = BootstrapFormExtensions::Scheduler::Serializer.new :yaml, true
    [ nil, '', [], 1, false ].each do |value|
      result = serializer.dump value
      assert_equal result, full_schedule.to_yaml
    end
  end

  test "dump blank values (nil, empty string, empty array), or invalid type, as yaml, with default selection to false" do
    serializer = BootstrapFormExtensions::Scheduler::Serializer.new :yaml, false
    [ nil, '', [], 1, false ].each do |value|
      result = serializer.dump value
      assert_equal result, empty_schedule.to_yaml
    end
  end

  test "dump string with incomplete values as yaml" do
    serializer = BootstrapFormExtensions::Scheduler::Serializer.new :yaml, true
    string = "[[false],[false],[false],[false],[false],[false],[false]]"
    result = serializer.dump string
    assert_equal result, not_first_hour.to_yaml
  end

  test "dump array with incomplete values as yaml" do
    serializer = BootstrapFormExtensions::Scheduler::Serializer.new :yaml, true
    array = [[false],[false],[false],[false],[false],[false],[false]]
    result = serializer.dump array
    assert_equal result, not_first_hour.to_yaml
  end

  test "dump string with incomplete values, and default selection to false, as yaml" do
    serializer = BootstrapFormExtensions::Scheduler::Serializer.new :yaml, false
    string = "[[true],[true],[true],[true],[true],[true],[true]]"
    result = serializer.dump string
    assert_equal result, only_first_hour.to_yaml
  end

  test "dump array with incomplete values, and default selection to false, as yaml" do
    serializer = BootstrapFormExtensions::Scheduler::Serializer.new :yaml, false
    array = [[true],[true],[true],[true],[true],[true],[true]]
    result = serializer.dump array
    assert_equal result, only_first_hour.to_yaml
  end

  test "dump string with complete values as yaml" do
    serializer = BootstrapFormExtensions::Scheduler::Serializer.new :yaml, true
    [ full_schedule, not_first_hour ].each do |value|
      result = serializer.dump value
      assert_equal result, value.to_yaml
    end
  end


  test "dump blank values (nil, empty string, empty array), or invalid type, as array" do
    serializer = BootstrapFormExtensions::Scheduler::Serializer.new :array, true
    [ nil, '', [], 1, false ].each do |value|
      result = serializer.dump value
      assert_equal result, full_schedule
    end
  end

  test "dump blank values (nil, empty string, empty array), or invalid type, as array, with default selection to false" do
    serializer = BootstrapFormExtensions::Scheduler::Serializer.new :array, false
    [ nil, '', [], 1, false ].each do |value|
      result = serializer.dump value
      assert_equal result, empty_schedule
    end
  end

  test "dump string with incomplete values as array" do
    serializer = BootstrapFormExtensions::Scheduler::Serializer.new :array, true
    string = "[[false],[false],[false],[false],[false],[false],[false]]"
    result = serializer.dump string
    assert_equal result, not_first_hour
  end

  test "dump array with incomplete values as array" do
    serializer = BootstrapFormExtensions::Scheduler::Serializer.new :array, true
    array = [[false],[false],[false],[false],[false],[false],[false]]
    result = serializer.dump array
    assert_equal result, not_first_hour
  end

  test "dump string with incomplete values, and default selection to false, as array" do
    serializer = BootstrapFormExtensions::Scheduler::Serializer.new :array, false
    string = "[[true],[true],[true],[true],[true],[true],[true]]"
    result = serializer.dump string
    assert_equal result, only_first_hour
  end

  test "dump array with incomplete values, and default selection to false, as array" do
    serializer = BootstrapFormExtensions::Scheduler::Serializer.new :array, false
    array = [[true],[true],[true],[true],[true],[true],[true]]
    result = serializer.dump array
    assert_equal result, only_first_hour
  end

  test "dump string with complete values as array" do
    serializer = BootstrapFormExtensions::Scheduler::Serializer.new :array, true
    [ full_schedule, not_first_hour ].each do |value|
      result = serializer.dump value.to_s
      assert_equal result, value
    end
  end


  # load

  test "load blank values (nil, empty string, empty array), or invalid type, from yaml" do
    serializer = BootstrapFormExtensions::Scheduler::Serializer.new :yaml, true
    [ nil, '' ].each do |value|
      result = serializer.load value
      assert_equal result, full_schedule
    end
  end

  test "load blank values (nil, empty string, empty array), or invalid type, from yaml, with default selection to false" do
    serializer = BootstrapFormExtensions::Scheduler::Serializer.new :yaml, false
    [ nil, '' ].each do |value|
      result = serializer.load value
      assert_equal result, empty_schedule
    end
  end

  test "load an incomplete schedule from yaml" do
    serializer = BootstrapFormExtensions::Scheduler::Serializer.new :yaml, true
    result = serializer.load [[false],[false],[false],[false],[false],[false],[false]].to_yaml
    assert_equal result, not_first_hour
  end

  test "load an incomplete schedule from yaml, with default selection to false" do
    serializer = BootstrapFormExtensions::Scheduler::Serializer.new :yaml, false
    result = serializer.load [[true],[true],[true],[true],[true],[true],[true]].to_yaml
    assert_equal result, only_first_hour
  end

  test "load a complete schedule from yaml" do
    serializer = BootstrapFormExtensions::Scheduler::Serializer.new :yaml, true
    [ full_schedule, not_first_hour ].each do |value|
      result = serializer.load value.to_yaml
      assert_equal result, value
    end
  end


  test "load blank values (nil, empty string, empty array), or invalid type, from array" do
    serializer = BootstrapFormExtensions::Scheduler::Serializer.new :array, true
    [ nil, '' ].each do |value|
      result = serializer.load value
      assert_equal result, full_schedule
    end
  end

  test "load an incomplete schedule from array" do
    serializer = BootstrapFormExtensions::Scheduler::Serializer.new :array, true
    result = serializer.load [[false],[false],[false],[false],[false],[false],[false]]
    assert_equal result, not_first_hour
  end

  test "load an incomplete schedule from array, with default selection to false" do
    serializer = BootstrapFormExtensions::Scheduler::Serializer.new :yaml, false
    result = serializer.load [[true],[true],[true],[true],[true],[true],[true]]
    assert_equal result, only_first_hour
  end

  test "load a complete schedule from array" do
    serializer = BootstrapFormExtensions::Scheduler::Serializer.new :array, true
    [ full_schedule, not_first_hour ].each do |value|
      result = serializer.load value
      assert_equal result, value
    end
  end

  private

  def full_schedule
    @full_schedule ||= Array.new(7) { |i| Array.new(24) { |j| true } }
  end

  def empty_schedule
    @full_schedule ||= Array.new(7) { |i| Array.new(24) { |j| false } }
  end

  def not_first_hour
    @not_first_hour ||= Array.new(7) { |i| Array.new(24) { |j| !!j.nonzero? } }
  end

  def only_first_hour
    @not_first_hour ||= Array.new(7) { |i| Array.new(24) { |j| !!j.zero? } }
  end

end
