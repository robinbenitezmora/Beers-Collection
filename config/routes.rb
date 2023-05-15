Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'beers/index'
      post 'beers/create'
      delete 'beers/:id', to: 'beers#destroy'
    end
  end

  root 'beers#index'
end
