

module EnvironmentVariables
  class Application < Rails::Application
    config.before_configuration do
    unless Rails.env.production?
      ENV["AWS_ACCESS_KEY_ID"] = "AKIAIH4BZW2Z3R7XMV4Q"
      ENV["S3_BUCKET"] =  "mixmymusic"
      ENV["AWS_SECRET_ACCESS_KEY"] = "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"
    end
  end

    # I NEED TO DEBUG THIS CODE!!!!


      #      env_file = Rails.root.join("config", 'environment_variables.yml').to_s
      #
      #      if File.exists?(env_file)
      #        YAML.load_file(env_file)[Rails.env].each do |key, value|
      #          ENV[key.to_s] = value
      #        end # end YAML.load_file
      #      end # end if File.exists?
      #    end # end config.before_configuration
  end # end class
end # end module