#!/usr/bin/env sh
# index.html의 CSS·JS 링크에 파일 내용 해시를 ?v= 로 붙인다.
# 파일이 바뀌면 주소가 바뀌어서 브라우저·GitHub Pages 캐시(최대 10분)에 예전 파일이 남지 않는다.
# 사용법: CSS나 JS를 고친 뒤, 커밋 전에 프로젝트 폴더에서  sh scripts/bump-version.sh
set -e
cd "$(dirname "$0")/.."

for f in css/styles.css js/data.js js/main.js; do
  v=$(md5sum "$f" | cut -c1-8)
  # "css/styles.css" 또는 "css/styles.css?v=xxxx" → "css/styles.css?v=<새 해시>"
  sed -i "s#\"$f\(?v=[0-9a-f]*\)\?\"#\"$f?v=$v\"#" index.html
  echo "$f -> ?v=$v"
done
