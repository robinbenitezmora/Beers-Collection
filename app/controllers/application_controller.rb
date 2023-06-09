class ApplicationController < ActionController::Base
 protect_form_forgery with: :null_session
end
