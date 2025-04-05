class Users::PasswordsController < Devise::PasswordsController
  respond_to :html, :json

  def new
    render inertia: "Auth/ForgotPassword"
  end

  def create
    self.resource = resource_class.send_reset_password_instructions(resource_params)
    yield resource if block_given?

    if successfully_sent?(resource)
      respond_with({}, location: after_sending_reset_password_instructions_path_for(resource_name))
    else
      render inertia: "Auth/ForgotPassword", props: { errors: resource.errors.full_messages }
    end
  end

  protected

  def after_sending_reset_password_instructions_path_for(resource_name)
    new_user_session_path
  end
end
