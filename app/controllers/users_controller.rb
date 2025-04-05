class UsersController < ApplicationController
  before_action :set_user, only: [ :show, :edit, :update ]
  before_action :authenticate_user!, except: [ :new, :create, :show ]
  before_action :authorize_user!, only: [ :edit, :update ]

  inertia_share flash: -> { flash.to_hash }

  # GET /users
  def index
    @users = User.all
    render inertia: "User/Index", props: {
      users: @users.as_json(only: [ :id, :name, :email ])
    }
  end

  # GET /users/1
  def show
    render inertia: "User/Show", props: {
      user: @user.as_json(only: [ :id, :name, :email ]),
      can_edit: current_user&.id == @user.id
    }
  end

  # GET /users/new
  def new
    @user = User.new
    render inertia: "User/New", props: {
      user: @user.as_json(only: [ :id, :name, :email ])
    }
  end

  # GET /users/1/edit
  def edit
    render inertia: "User/Edit", props: {
      user: @user.as_json(only: [ :id, :name, :email ])
    }
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      sign_in(@user)
      redirect_to users_path, notice: "Conta criada com sucesso!"
    else
      render inertia: "Auth/Register", props: { errors: @user.errors.full_messages }
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      if current_user&.id == @user.id
        bypass_sign_in(@user)
      end
      redirect_to users_path, notice: "Usuário atualizado com sucesso!"
    else
      render inertia: "User/Edit", props: {
        user: @user.as_json(only: [ :id, :name, :email ]),
        errors: @user.errors.full_messages
      }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end

    def authorize_user!
      unless current_user&.id == @user.id
        redirect_to root_path, alert: "Você não tem permissão para editar este usuário."
      end
    end
end
