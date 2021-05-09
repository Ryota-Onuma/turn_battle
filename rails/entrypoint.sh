#!/bin/bash

# エラーが発生するとスクリプトを終了する
set -e

# server.pid削除
rm -f /app/tmp/pids/server.pid

# DockefileのCMDから渡されたコマンドを実行
exec "$@"