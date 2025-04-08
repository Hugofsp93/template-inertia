class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :html, :json

  def new
    render inertia: "Auth/Register"
  end

  def create
    # Estrutura os parâmetros no formato que o Devise espera
    params[:user] = params.permit(:name, :email, :password, :password_confirmation)

    build_resource(sign_up_params)
    resource.add_role(:user) # Sempre adiciona role user

    if resource.save
      if resource.active_for_authentication?
        sign_up(resource_name, resource)
        redirect_to after_sign_up_path_for(resource), notice: "Conta criada com sucesso!"
      else
        expire_data_after_sign_in!
        redirect_to after_inactive_sign_up_path_for(resource)
      end
    else
      clean_up_passwords resource
      render inertia: "Auth/Register", props: {
        errors: resource.errors.messages
      }, status: :unprocessable_entity
    end
  end

  protected

  def sign_up_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

  def after_sign_up_path_for(resource)
    root_path
  end

  private

  def format_errors(errors)
    errors.messages.transform_keys { |key| "user.#{key}" }
  end
end
