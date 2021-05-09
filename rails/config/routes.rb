Rails.application.routes.draw do
  namespace :api do
    # API用のルーティングはここに書く
    namespace :v1 do
      get '/health_check' => 'health_checks#health_check'
    end
  end
  root to: 'layouts#index'
  get '*path', to: 'layouts#index'
end
