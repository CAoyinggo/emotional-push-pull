const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const skillDir = path.join(rootDir, '.agents', 'skills', 'emotional-master');
const refDir = path.join(skillDir, 'references');
const evalsDir = path.join(rootDir, 'evals');

let totalErrors = 0;
let totalWarnings = 0;

function reportError(msg) {
  console.error(`❌ [ERROR] ${msg}`);
  totalErrors++;
}

function reportWarning(msg) {
  console.warn(`⚠️ [WARN] ${msg}`);
  totalWarnings++;
}

function reportPass(msg) {
  console.log(`✅ [PASS] ${msg}`);
}

console.log('=== 1. 验证 scenarios.json 结构与合法性 ===');
const scenariosPath = path.join(evalsDir, 'scenarios.json');
let scenariosData = null;
try {
  scenariosData = JSON.parse(fs.readFileSync(scenariosPath, 'utf8'));
  reportPass(`scenarios.json 成功解析，共定义 ${scenariosData.scenarios.length} 个评测场景。`);
} catch (e) {
  reportError(`scenarios.json 解析失败: ${e.message}`);
}

let devCount = 0;
let independentCount = 0;
const seenIds = new Set();

if (scenariosData && scenariosData.scenarios) {
  scenariosData.scenarios.forEach((s, idx) => {
    // 检查 ID 唯一性
    if (seenIds.has(s.id)) {
      reportError(`场景 ID 重复: #${s.id}`);
    }
    seenIds.add(s.id);

    // 检查单轮或多轮结构
    if (s.is_multi_turn || Array.isArray(s.turns)) {
      if (!Array.isArray(s.turns) || s.turns.length === 0) {
        reportError(`多轮场景 #${s.id || idx} 缺少 turns 数组`);
      } else {
        s.turns.forEach((t, tIdx) => {
          const promptText = t.user_input || t.prompt;
          if (!t.turn || !promptText || !Array.isArray(t.must) || !Array.isArray(t.must_not)) {
            reportError(`多轮场景 #${s.id} 轮次 ${t.turn || tIdx + 1} 缺少必要字段 (turn, user_input/prompt, must, must_not)`);
          }
        });
      }
    } else {
      if (!s.id || !s.name || !s.prompt || !Array.isArray(s.must) || !Array.isArray(s.must_not)) {
        reportError(`场景 #${s.id || idx} 缺少必要字段 (id, name, prompt, must, must_not)`);
      }
    }

    if (s.dataset_type === 'development') {
      devCount++;
    } else if (s.dataset_type === 'independent_validation' || s.dataset_type === 'holdout') {
      independentCount++;
    } else {
      reportWarning(`场景 #${s.id} dataset_type 建议标注为 'development' 或 'independent_validation' (当前: ${s.dataset_type})`);
    }

    // 检查图片 fixture
    if (s.image_fixtures) {
      s.image_fixtures.forEach(fixPath => {
        const fullFixPath = path.join(rootDir, fixPath);
        if (!fs.existsSync(fullFixPath)) {
          reportError(`场景 #${s.id} 引用的图片 fixture 不存在: ${fixPath}`);
        }
      });
    }
  });
  reportPass(`场景集划分统计：开发集 (development) = ${devCount} 个，待独立验收集 (independent_validation) = ${independentCount} 个。`);
}

console.log('\n=== 2. 统计实际活动模块与图片 Fixtures ===');
const refFiles = fs.readdirSync(refDir).filter(f => f.endsWith('.md'));
reportPass(`references/ 目录下活动手册数量：${refFiles.length} 篇。`);

const fixtureFiles = fs.readdirSync(path.join(evalsDir, 'fixtures')).filter(f => f.endsWith('.png') || f.endsWith('.jpg'));
reportPass(`evals/fixtures/ 目录下合成图片测试样本数量：${fixtureFiles.length} 张。`);

console.log('\n=== 3. 检查重命名后的文件与旧名称残留 ===');
const oldNames = [
  'shit_tests_bible.md',
  'push_pull_framing.md',
  'signals_and_kino.md',
  'target_profile_card.md',
  'female_psychology.md'
];

const newNames = [
  'boundaries_and_banter.md',
  'natural_interaction.md',
  'consent_and_comfort.md',
  'relationship_observation_notes.md',
  'understanding_context_and_emotions.md'
];

newNames.forEach(nn => {
  if (fs.existsSync(path.join(refDir, nn))) {
    reportPass(`新手册文件存在: references/${nn}`);
  } else {
    reportError(`新手册文件缺失: references/${nn}`);
  }
});

oldNames.forEach(on => {
  if (fs.existsSync(path.join(refDir, on))) {
    reportError(`发现残留旧文件未清除: references/${on}`);
  }
});

console.log('\n=== 4. 链接解析器专项自测 (Regex & Resolver Self-Test) ===');
// 自测函数：验证解析器能正确区分外部链接、锚点、含 h/t/p 的有效及无效本地路径
function parseAndValidateLink(rawTarget, fromFilePath) {
  const trimmed = rawTarget.trim();
  // 1. 外部网络协议链接
  if (/^(https?:|mailto:|ftp:|\/\/)/i.test(trimmed)) {
    return { type: 'external', valid: true, target: trimmed };
  }
  // 2. 纯文档内部锚点
  if (trimmed.startsWith('#')) {
    return { type: 'in_page_anchor', valid: true, anchor: trimmed.slice(1) };
  }
  // 3. 本地相对路径（可能附带锚点）
  const [filePathPart, anchorPart] = trimmed.split('#');
  if (!filePathPart) {
    return { type: 'empty', valid: false, target: trimmed };
  }
  const baseDir = path.dirname(fromFilePath);
  const resolvedPath = path.resolve(baseDir, filePathPart);
  const exists = fs.existsSync(resolvedPath);
  return {
    type: 'local_file',
    valid: exists,
    resolvedPath,
    hasAnchor: !!anchorPart,
    anchor: anchorPart
  };
}

// 运行自测用例
const selfTestCases = [
  { raw: 'references/chat_playbook.md', expectValid: true, desc: '含 h/t/p 的有效本地路径 (chat_playbook)' },
  { raw: 'references/platform_playbooks.md', expectValid: true, desc: '含 p 的有效本地路径 (platform_playbooks)' },
  { raw: 'references/nonexistent_chat_test.md', expectValid: false, desc: '含 h/t/p 的无效本地路径 (正确识别失效)' },
  { raw: 'SKILL.md#一-产品定位与核心需求', expectValid: true, desc: '带锚点的本地有效路径' },
  { raw: 'https://img.shields.io/badge/version-1.3.0-blue.svg', expectValid: true, desc: '外部 HTTPS 链接 (跳过本地检查)' },
  { raw: '#核心概念框架的真正定义', expectValid: true, desc: '纯页内锚点' }
];

let selfTestPass = true;
selfTestCases.forEach(c => {
  const res = parseAndValidateLink(c.raw, path.join(skillDir, 'SKILL.md'));
  if (res.valid !== c.expectValid) {
    reportError(`链接解析自测失败: "${c.raw}" (${c.desc}) -> 预期 ${c.expectValid}, 实际 ${res.valid}`);
    selfTestPass = false;
  }
});
if (selfTestPass) {
  reportPass(`链接解析自测全部通过 (${selfTestCases.length} 个覆盖用例验证了 h/t/p 字符、锚点与外部 URL 识别)。`);
}

console.log('\n=== 5. 检查工程 Markdown 链接有效性与旧文件名引用 ===');
const allMdFiles = [
  path.join(rootDir, 'README.md'),
  path.join(skillDir, 'SKILL.md'),
  path.join(evalsDir, 'eval_report.md'),
  ...refFiles.map(rf => path.join(refDir, rf))
];

allMdFiles.forEach(mdPath => {
  const content = fs.readFileSync(mdPath, 'utf8');
  const relPath = path.relative(rootDir, mdPath);

  // 检查是否引用了旧文件名
  oldNames.forEach(oldN => {
    const linkRegex = new RegExp(`\\]\\([^)]*${oldN}[^)]*\\)`, 'g');
    if (linkRegex.test(content)) {
      reportError(`${relPath} 中仍存在指向旧文件的链接: ${oldN}`);
    }
  });

  // 全量提取所有 [text](target) 格式链接
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const rawTarget = match[2].trim();
    const result = parseAndValidateLink(rawTarget, mdPath);

    if (result.type === 'local_file' && !result.valid) {
      reportError(`${relPath} 中的相对本地链接失效: "${rawTarget}" -> 未找到文件 "${result.resolvedPath}"`);
    }
  }
});

console.log('\n=== 6. 检查活动规则中是否有已知攻击性/标签化违禁词及结构性问题 ===');
const bannedWords = [
  '脆弱巨婴',
  '社交毒瘤',
  '特权索取',
  '奖品心态',
  '打一巴掌揉一揉',
  '晚上再来收拾你',
  '败犬',
  '交出主动权',
  '工位上话挺少的',
  '工位上忙得脚不沾地',
  '不负责任的懦弱',
  '廉价且令人窒息',
  '极度廉价',
  '对尊严的自我放弃',
  '四个独立维度',
  '四个彼此独立的判断维度',
  '请客赔罪',
  '买单赔罪',
  '礼貌回复祝福后彻底停止',
  '怨夫',
  '掉价'
];

const ruleFiles = [
  path.join(rootDir, 'README.md'),
  path.join(skillDir, 'SKILL.md'),
  path.join(evalsDir, 'scenarios.json'),
  ...refFiles.map(rf => path.join(refDir, rf))
];

ruleFiles.forEach(mdPath => {
  const content = fs.readFileSync(mdPath, 'utf8');
  const relPath = path.relative(rootDir, mdPath);

  bannedWords.forEach(bw => {
    if (content.includes(bw)) {
      const lines = content.split('\n');
      lines.forEach((l, idx) => {
        if (l.includes(bw) && !l.includes('批判') && !l.includes('反对') && !l.includes('消除') && !l.includes('旧问题') && !l.includes('已知问题') && !l.includes('修复') && !l.includes('严禁') && !l.includes('杜绝') && !l.includes('禁止')) {
          reportError(`${relPath}:${idx + 1} 发现未清理的违规词或遗留缺陷: "${bw}" -> ${l.trim()}`);
        }
      });
    }
  });
});

console.log('\n====================================');
console.log(`工程静态审计完成。总错误数: ${totalErrors}，总告警数: ${totalWarnings}`);
if (totalErrors === 0) {
  console.log('🎉 验证全部通过！(注：此项为静态文件与链接有效性审计，非模型推理行为验收)');
} else {
  console.log('⚠️ 存在需要修复的问题，请按上述日志处理。');
}
process.exit(totalErrors > 0 ? 1 : 0);
