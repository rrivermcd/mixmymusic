#TEST

#require 'aws-sdk'
#require 'yaml'
 
# configure aws-sdk gem from a yaml configuration file
#AWS.config(YAML.load_file('aws.yml'))


#END TEST

#GO CODE
  module S3
    class Application < Rails::Application
      config.before_configuration do
      unless Rails.env.production?

        ENV["AWS_ACCESS_KEY_ID"] = "AKIAIH4BZW2Z3R7XMV4Q"
        ENV["S3_BUCKET"] =  "mixmymusic"
        ENV["AWS_SECRET_ACCESS_KEY"] = "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"
      end
    end
#END GO CODE

#THIS IS BUGGY? CODE
    # I NEED TO DEBUG THIS CODE!!!!


      #      s3_file = Rails.root.join("config", 'environment_variables.yml').to_s
      #
      #      if File.exists?(s3_file)
      #        YAML.load_file(s3_file)[Rails.env].each do |key, value|
      #          ENV[key.to_s] = value
      #        end # end YAML.load_file
      #      end # end if File.exists?
      #    end # end config.before_configuration
  end # end class
end # end module