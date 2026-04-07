#!/usr/bin/env ruby
# frozen_string_literal: true

require 'open3'

exe = File.expand_path('execute.rb', __dir__)
out, err, status = Open3.capture3('ruby', exe, stdin_data: "\"hi\" eval dup putn swap putn\n")
raise "unexpected stderr: #{err}" unless err.empty?
raise "expected 105104, got #{out.inspect}" unless out == '105104'
raise "exit #{status}" unless status.success?
puts 'ok'
