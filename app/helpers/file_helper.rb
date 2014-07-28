module FileHelper

  def policy

 Base64.encode64(
      "{'expiration': '#{10.hours.from_now.utc.strftime('%Y-%m-%dT%H:%M:%S.000Z')}',
        'conditions': [
          {'bucket': '#{ENV['S3_BUCKET']}'},
          ['starts-with', '$key', ''],
          {'acl': 'private'},
          {'success_action_redirect': 'http://localhost:3000'},
        ['starts-with','$Content-Type','audio/mp3'],
          ['content-length-range', 0, 1048576],
        
        ]
    }").gsub(/\n|\r/, '')
  end


  def signature
    #options = {}
    signature = Base64.encode64(
     OpenSSL::HMAC.digest(
      OpenSSL::Digest::Digest.new('sha1'),
      ENV['AWS_SECRET_ACCESS_KEY'], policy)).gsub("\n","")


  
#digest = OpenSSL::Digest::Digest.new('sha1')
#key = ENV["AWS_SECRET_ACCESS_KEY"]
#hmac = OpenSSL::HMAC.digest(digest,key,policy)
#signature = Base64.encode64(hmac).gsub("\n","")

  end

  def sanitize_filename(file_name)
    just_filename = File.basename(file_name)
    just_filename.sub(/[^\w\.\-]/,'_')
  end

  def whitespace_to_underscore(user_name)
    name = user_name.gsub(' ', '_') 
  end
 end