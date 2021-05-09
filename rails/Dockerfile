FROM ruby:2.6.7

RUN apt-get update -qq && apt-get install -y libssl1.1 npm postgresql-client vim

# node のバージョンは16.0.0
RUN npm install -g n && n 16.0.0

WORKDIR /app

COPY Gemfile /app/Gemfile

COPY Gemfile.lock /app/Gemfile.lock

# publicディレクトリが無いとwebpackのビルド時にコピーできない
RUN bundle install && mkdir -p public

COPY . /app

WORKDIR /app/frontend

# Vueのビルドをして、/public配下に移すことでrailsのviewから読み込めるようにする
RUN npm install && npm run build && mv dist/bundle.js ../public/

WORKDIR /app

COPY entrypoint.sh /usr/bin/

# entrypoint.shの実行権限付与
RUN chmod +x /usr/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]