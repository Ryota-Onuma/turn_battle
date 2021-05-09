# 概要
nginx (80) rails(3000)  
ローカルではrailsで、webpackコンテナからのbundleファイルを読み込む
それ以外ではrailsコンテナ上でbuildしてpublic配下にbundleファイルをおいて読み込む