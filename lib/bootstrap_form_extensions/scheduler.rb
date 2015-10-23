module BootstrapFormExtensions

  module Scheduler

    include BootstrapFormExtensions::Helpers

    def self.serializer to: :yaml, default_selection: true
      BootstrapFormExtensions::Scheduler::Serializer.new to, default_selection
    end

    def scheduler method, label: nil
      schedule = object.send method
      label  ||= method.to_s.humanize
      hidden   = hidden_field method, value: JSON.dump(schedule), class: 'scheduler-hidden-field'
      form_group method, label: { text: label } do
        content_tag :div, hidden + schedule_to_table(schedule), data: { scheduler: true }
      end
    end

    private

    def schedule_to_table schedule
      content_tag :table, class: 'scheduler-badge' do
        content_tag :tbody do
          schedule.each.with_index.inject(''.html_safe) do |rows, (day_array, day_index)|
            rows << content_tag(:tr) do
              day_array.each.with_index.inject(''.html_safe) do |columns, (value, hour_index)|
                columns << content_tag(:td, '&nbsp;'.html_safe, class: (true?(value) ? 'on' : 'off'), data: { day: day_index, hour: hour_index })
              end
            end
          end
        end
      end
    end

    class Serializer

      include BootstrapFormExtensions::Helpers

      attr_reader :to_format, :default_selection

      def initialize to_format, default_selection
        @to_format         = to_format
        @default_selection = default_selection
      end

      def load value_from_db
        value_from_db = YAML.load(value_from_db.to_s || '') if to_format == :yaml
        value_from_db = [] if value_from_db.blank?
        value_from_db = parse_schedule_array value_from_db unless value_from_db[6].try(:[], 23).present?
        value_from_db
      end

      def dump value_from_user
        value_from_user = JSON.parse value_from_user rescue [] if value_from_user.is_a? String
        value_from_user = [] unless value_from_user.is_a? Array
        value_from_user = parse_schedule_array value_from_user
        value_from_user = value_from_user.to_yaml if to_format == :yaml
        value_from_user
      end

      private

      def parse_schedule_array value
        Array.new(7) { |i| Array.new(24) { |j| (value[i][j].nil? && default_selection) || true?(value[i][j]) rescue default_selection } }
      end

    end

  end

end
