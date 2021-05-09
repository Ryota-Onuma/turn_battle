max_threads_count = ENV.fetch('RAILS_MAX_THREADS', 5)

min_threads_count = ENV.fetch('RAILS_MIN_THREADS') { max_threads_count }

threads min_threads_count, max_threads_count

# port        ENV.fetch("PORT") { 3000 }をコメントアウトすると、nginx経由でしかrailsにアクセスできなくなる↓
# port        ENV.fetch("PORT") { 3000 }
environment ENV.fetch('RAILS_ENV') { 'development' }

plugin :tmp_restart

app_root = File.expand_path('..', __dir__)

bind "unix://#{app_root}/tmp/sockets/puma.sock"
