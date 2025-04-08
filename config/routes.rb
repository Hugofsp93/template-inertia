Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: "users/sessions",
    registrations: "users/registrations",
    passwords: "users/passwords"
  }

  devise_scope :user do
    get "new-password", to: "users/passwords#new_password", as: :new_password
    post "users/sign_up", to: "users/registrations#create"
  end

  # Rotas de gerenciamento de usuários (requer autenticação)
  resources :users do
    collection do
      get "new", to: "users#new_user", as: :new_user
      post "new", to: "users#create_user", as: :create_user
    end
  end

  get "inertia-example", to: "inertia_example#index"

  get "up" => "rails/health#show", as: :rails_health_check

  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest

  root "dashboard#index"
end
