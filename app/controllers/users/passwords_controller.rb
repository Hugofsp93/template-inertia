class Users::PasswordsController < Devise::PasswordsController
  respond_to :html, :json

  def new
    render inertia: "Auth/ForgotPassword"
  end

  def new_password
    render inertia: "Auth/ResetPassword", props: {
      token: session[:reset_password_token],
      email: session[:reset_password_email]
    }
  end

  def create
    # Verifica se o email pertence a um super_admin
    user = User.find_by(email: resource_params[:email])
    if user&.super_admin?
      redirect_to new_user_session_path
      return
    end

    self.resource = resource_class.send_reset_password_instructions(resource_params)
    yield resource if block_given?

    if successfully_sent?(resource)
      respond_with({}, location: after_sending_reset_password_instructions_path_for(resource_name))
    else
      render inertia: "Auth/ForgotPassword", props: { errors: resource.errors.full_messages }
    end
  end

  def edit
    # Encontra o usuário pelo token
    user = User.with_reset_password_token(params[:reset_password_token])

    if user
      # Armazena o token e email na sessão
      session[:reset_password_token] = params[:reset_password_token]
      session[:reset_password_email] = user.email
      redirect_to new_password_path
    else
      redirect_to new_user_session_path, alert: "Token inválido ou expirado"
    end
  end

  def update
    # Formata os parâmetros no formato que o Devise espera
    params[:user] = {
      reset_password_token: session[:reset_password_token],
      email: session[:reset_password_email],
      password: params[:password],
      password_confirmation: params[:password_confirmation]
    }

    self.resource = resource_class.reset_password_by_token(resource_params)
    yield resource if block_given?

    if resource.errors.empty?
      resource.unlock_access! if unlockable?(resource)
      if Devise.sign_in_after_reset_password
        flash_message = resource.active_for_authentication? ? :updated : :updated_not_active
        set_flash_message!(:notice, flash_message)
        resource.after_database_authentication
        sign_in(resource_name, resource)
      else
        set_flash_message!(:notice, :updated_not_active)
      end
      respond_with resource, location: after_resetting_password_path_for(resource)
    else
      set_minimum_password_length
      respond_with resource
    end
  end

  protected

  def after_resetting_password_path_for(resource)
    new_user_session_path
  end

  def after_sending_reset_password_instructions_path_for(resource_name)
    new_user_session_path
  end
end
