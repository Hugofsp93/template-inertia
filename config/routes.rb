Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: "users/sessions",
    registrations: "users/registrations",
    passwords: "users/passwords"
  }

  devise_scope :user do
    get "new-password", to: "users/passwords#new_password", as: :new_password
  end

  # Rotas públicas de registro
  get "sign_up", to: "users#new", as: :sign_up
  post "sign_up", to: "users#create"

  # Rotas de gerenciamento de usuários (requer autenticação)
  resources :users, except: [ :new, :create ] do
    member do
      get "new", to: "users#new_user", as: :new_user
      post "new", to: "users#create_user", as: :create_user
    end
  end

  get "inertia-example", to: "inertia_example#index"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/*
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest

  # Defines the root path route ("/")
  root "dashboard#index"
end
