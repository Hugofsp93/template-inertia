class Users::SessionsController < Devise::SessionsController
  respond_to :html, :json

  def new
    render inertia: "Auth/Login", props: { flash: flash.to_hash }
  end

  def create
    self.resource = warden.authenticate(auth_options)
    if resource
      set_flash_message!(:notice, :signed_in)
      sign_in(resource_name, resource)
      yield resource if block_given?
      respond_with resource, location: after_sign_in_path_for(resource)
    else
      render inertia: "Auth/Login", props: {
        errors: [ "Email ou senha inválidos" ],
        flash: flash.to_hash
      }
    end
  end

  def destroy
    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    set_flash_message! :notice, :signed_out if signed_out
    yield if block_given?
    respond_to_on_destroy
  end

  protected

  def after_sign_out_path_for(resource_or_scope)
    new_user_session_path
  end
end
