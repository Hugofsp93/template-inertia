class UsersController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :new, :create ]
  before_action :set_user, only: [ :show, :edit, :update, :destroy ]
  after_action :verify_authorized, except: [ :index, :new, :create ]
  after_action :verify_policy_scoped, only: :index

  inertia_share flash: -> { flash.to_hash }

  # GET /users
  def index
    @users = policy_scope(User)
    render inertia: "User/Index", props: {
      users: @users.map { |user| user.as_json(only: [ :id, :name, :email, :created_at, :updated_at ], methods: [ :role ]) }
    }
  end

  # GET /users/1
  def show
    authorize @user
    render inertia: "User/Show", props: {
      user: @user.as_json(only: [ :id, :name, :email, :created_at, :updated_at ], methods: [ :role ])
    }
  end

  # GET /sign_up (registro público)
  def new
    if user_signed_in?
      redirect_to root_path, alert: "Você já está logado."
      return
    end
    @user = User.new
    render inertia: "Auth/Register"
  end

  # POST /sign_up (registro público)
  def create
    if user_signed_in?
      redirect_to root_path, alert: "Você já está logado."
      return
    end
    @user = User.new(public_user_params)
    @user.add_role(:user) # Define como usuário comum por padrão

    if @user.save
      redirect_to new_user_session_path, notice: "Usuário criado com sucesso. Faça login para continuar."
    else
      render inertia: "Auth/Register", props: {
        errors: @user.errors
      }, status: :unprocessable_entity
    end
  end

  # GET /users/:id/new (criação por admin)
  def new_user
    authorize User
    @user = User.new
    render inertia: "User/New", props: {
      can_edit_role: can_edit_role?
    }
  end

  # POST /users/:id/new (criação por admin)
  def create_user
    authorize User
    Rails.logger.debug "Parâmetros recebidos: #{params.inspect}"

    @user = User.new(admin_user_params)
    Rails.logger.debug "Usuário criado com parâmetros: #{@user.attributes.inspect}"

    if @user.save
      @user.add_role(params[:role])
      redirect_to users_path, notice: "Usuário criado com sucesso."
    else
      Rails.logger.debug "Erros de validação: #{@user.errors.full_messages.inspect}"
      render inertia: "User/New", props: {
        errors: @user.errors
      }, status: :unprocessable_entity
    end
  end

  # GET /users/1/edit
  def edit
    authorize @user
    render inertia: "User/Edit", props: {
      user: @user.as_json(only: [ :id, :name, :email, :created_at, :updated_at ], methods: [ :role ]),
      can_edit_role: can_edit_role?
    }
  end

  # PATCH/PUT /users/1
  def update
    authorize @user

    # Verifica se pode editar o role
    unless can_edit_role?
      params.delete(:role)
    end

    if @user.update(admin_user_params)
      # Atualiza o role se permitido
      if can_edit_role? && params[:role].present?
        @user.roles = []
        @user.add_role(params[:role])
      end

      # Se o usuário estiver alterando sua própria senha, mantém ele logado
      if @user == current_user && admin_user_params[:password].present?
        bypass_sign_in(@user)
      end

      redirect_to users_path, notice: "Usuário atualizado com sucesso."
    else
      render inertia: "User/Edit", props: {
        user: @user.as_json(only: [ :id, :name, :email, :created_at, :updated_at ], methods: [ :role ]),
        errors: @user.errors,
        can_edit_role: can_edit_role?
      }, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    authorize @user
    @user.destroy
    redirect_to users_path, notice: "Usuário excluído com sucesso."
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    def public_user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end

    def admin_user_params
      params.permit(:name, :email, :password, :password_confirmation, :role)
    end

    def can_edit_role?
      # Se não houver usuário atual, não permite edição
      return false unless current_user

      # Se for criação de novo usuário (@user é nil)
      if @user.nil?
        return current_user.super_admin? || current_user.admin?
      end

      # Se for edição de usuário existente
      case current_user.role
      when "super_admin"
        # Super admin pode editar roles de admins e users
        @user.role != "super_admin"
      when "admin"
        # Admin só pode editar roles de users
        @user.role == "user"
      else
        false
      end
    end
end
