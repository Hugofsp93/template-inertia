class ApplicationController < ActionController::Base
  include Pundit::Authorization

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?

  inertia_share auth: -> {
    if current_user
      {
        user: current_user.as_json(only: [ :id, :name, :email, :created_at, :updated_at ], methods: [ :role ]),
        role: current_user.role,
        is_admin: current_user.admin?,
        is_super_admin: current_user.super_admin?
      }
    else
      {
        user: nil,
        role: nil,
        is_admin: false,
        is_super_admin: false
      }
    end
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

  private

  def user_not_authorized
    flash[:alert] = "Você não está autorizado a realizar esta ação."
    redirect_back(fallback_location: root_path)
  end
end
