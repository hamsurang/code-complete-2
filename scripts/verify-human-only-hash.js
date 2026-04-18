#!/usr/bin/env node
/**
 * verify-human-only-hash.js
 *
 * Why: chapter-editor가 3-Zone YAML을 편집할 때 human_only zone(멤버 의견·투표·
 * Devil's Advocate·베스트 토론)을 한 글자라도 수정하면 스터디 상품 가치가 훼손된다.
 * 스킬 문서에 "수정 금지" 라고 써 있어도 AI가 스킬을 안 읽으면 무방비이므로,
 * hook으로 해시를 기계적으로 비교해 수정 시 파이프라인을 중단시킨다.
 *
 * 사용: node scripts/verify-human-only-hash.js <input_yaml> <output_yaml>
 * exit 0: 통과 / exit 2: 해시 불일치 (human_only 수정됨) / exit 3: 파일/스키마 오류
 */

import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { parse, stringify } from 'yaml';

const [, , inputPath, outputPath] = process.argv;

if (!inputPath || !outputPath) {
  console.error('Usage: node verify-human-only-hash.js <input.yml> <output.yml>');
  process.exit(3);
}

if (!existsSync(inputPath) || !existsSync(outputPath)) {
  console.error(`ERROR [missing-file] input=${existsSync(inputPath)} output=${existsSync(outputPath)}`);
  process.exit(3);
}

function hashHumanOnly(filePath) {
  const raw = readFileSync(filePath, 'utf8');
  const doc = parse(raw);
  if (!doc || typeof doc !== 'object' || !('human_only' in doc)) {
    console.error(`ERROR [schema] ${filePath} has no 'human_only' key`);
    process.exit(3);
  }
  const canonical = stringify(doc.human_only, { sortMapEntries: true });
  return createHash('sha256').update(canonical).digest('hex');
}

const inputHash = hashHumanOnly(inputPath);
const outputHash = hashHumanOnly(outputPath);

if (inputHash !== outputHash) {
  console.error(
    `ERROR [human-only-modified] ${outputPath}\n` +
      `  input  hash: ${inputHash}\n` +
      `  output hash: ${outputHash}\n` +
      `REMEDIATION: chapter-editor가 human_only zone을 수정했습니다. ` +
      `멤버 기여물은 한 글자도 수정할 수 없습니다. ` +
      `Run: diff <(yq .human_only ${inputPath}) <(yq .human_only ${outputPath})`,
  );
  process.exit(2);
}

console.log(`OK [human-only-preserved] ${outputPath}`);
process.exit(0);
