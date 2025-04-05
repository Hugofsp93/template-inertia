class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?

  inertia_share auth: -> {
    {
      user: current_user ? {
        id: current_user.id,
        email: current_user.email,
        name: current_user.name
      } : nil
    }
  }

  inertia_share flash: -> {
    {
      notice: flash.notice,
      alert: flash.alert
    }
  }

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [ :name ])
    devise_parameter_sanitizer.permit(:account_update, keys: [ :name ])
  end
end
