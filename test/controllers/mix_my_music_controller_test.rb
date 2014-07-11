require 'test_helper'

class MixMyMusicControllerTest < ActionController::TestCase
  test "should get home" do
    get :home
    assert_response :success
  end

  test "should get help" do
    get :help
    assert_response :success
  end

  test "should get ==no-test-framework" do
    get :==no-test-framework
    assert_response :success
  end

end
