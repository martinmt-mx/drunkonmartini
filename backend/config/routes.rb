Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    resources :releases, only: :index
    resources :beats, only: :index
    resources :credits, only: :index
    resources :messages, only: :create
  end
end
