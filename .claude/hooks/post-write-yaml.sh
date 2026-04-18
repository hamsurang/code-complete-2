#!/usr/bin/env bash
# post-write-yaml.sh
#
# Why: chapter-editor가 _workspace/edited/chXX.edited.yml을 쓸 때마다
# 원본 _workspace/data/chapters/chXX.yml의 human_only 블록과 해시 비교.
# 불일치 시 exit 2로 하네스 파이프라인 전체를 중단시킨다.
# "스킬에 쓰여있다"만으로는 보장되지 않으므로 기계적 강제가 필요하다.

set -eu

# Claude Code가 전달하는 환경변수
FILE_PATH="${CLAUDE_FILE_PATH:-${1:-}}"

# 챕터 edited YAML일 때만 작동
case "$FILE_PATH" in
  */_workspace/edited/ch*.edited.yml)
    ;;
  *)
    exit 0  # 다른 파일은 무관심
    ;;
esac

# 원본 경로 추정
BASENAME=$(basename "$FILE_PATH" .edited.yml)   # ch05
PROJECT_ROOT=$(cd "$(dirname "$0")/../.." && pwd)
INPUT_YAML="$PROJECT_ROOT/_workspace/data/chapters/${BASENAME}.yml"

if [ ! -f "$INPUT_YAML" ]; then
  echo "WARN [hash-skip] 원본 YAML 없음: $INPUT_YAML — extractor 미실행 추정, skip"
  exit 0
fi

# Node 스크립트로 해시 검증 위임
node "$PROJECT_ROOT/scripts/verify-human-only-hash.js" "$INPUT_YAML" "$FILE_PATH"
