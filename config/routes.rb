Rails.application.routes.draw do
  resources :users do
    member do
      get :following, :followers
    end
  end

  resources :sessions,      only: [:new, :create, :destroy]
  resources :microposts,    only: [:create, :destroy]
  resources :relationships, only: [:create, :destroy]
  
  root to: 'mix_my_music#home'
  match '/signup',  to: 'users#new',            via: 'get'
  match '/signin',  to: 'sessions#new',         via: 'get'
  match '/signout', to: 'sessions#destroy',     via: 'delete'
  match '/help',    to: 'mix_my_music#help',    via: 'get'
  match '/about',   to: 'mix_my_music#about',   via: 'get'
  match '/contact', to: 'mix_my_music#contact', via: 'get'
end