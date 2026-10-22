<div align="center">

# 💘 Emotional Push & Pull｜情感推拉

**成年男性的高自尊、松弛感与清醒亲密沟通指南 —— 拒绝讨好跪舔，告别油腻套路，掌握自然真诚的推拉艺术**

[![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)](package.json)
[![Skills](https://img.shields.io/badge/skills-17%20modules%20%7C%20100%25%20covered-brightgreen.svg)](.agents/skills/emotional-master)
[![Evals](https://img.shields.io/badge/evals-19%20scenarios%20%7C%20%E8%A1%8C%E4%B8%BA%E9%AA%8C%E6%94%B6-success.svg)](evals/scenarios.json)
[![License: MIT](https://img.shields.io/badge/license-MIT-purple.svg)](open_source_reference/qingsheng-skill/LICENSE)
[![Output Style](https://img.shields.io/badge/output-%E6%9E%81%E7%AE%80%E7%9F%AD%E6%89%93%20%C2%B7%20%E9%9D%9E%E9%98%B2%E5%BE%A1%E6%80%A7-brightgreen.svg)](.agents/skills/emotional-master/SKILL.md)
[![Interface](https://img.shields.io/badge/interface-%E7%A7%92%E7%BA%A7%E5%9B%9E%E5%A4%8D%20%C2%B7%201v1%E6%B2%99%E7%9B%92%20%2Fmock-informational.svg)](.agents/skills/emotional-master/references/crush_sandbox_simulator.md)

</div>

---

## 💻 项目简介

很多男性在亲密关系中常陷入两种极端：要么沦为“老好人”，无底线妥协、暗中付出（建立隐性契约），在患得患失中内耗爆发；要么盲目相信低质“PUA套路”，机械打压、虚浮吹嘘，显得既油腻又廉价。

**Emotional Push & Pull（情感推拉）** 是一套建立在临床心理学、高自尊人格与健康沟通哲学之上的智能体系统。它帮助成年男性在保持自尊、判断力与个人边界的前提下，从容表达好感、承接情绪、化解分歧，并在不合适时体面退出。

> **核心原则：**  
> **底层原则用于选择回应方向，不要求在答案中逐条解释。默认只给一条贴合语境的回复；用户要求分析或复盘时，再展开依据。专项模块不得自行增加默认输出栏目。**

---

## 🏛️ 四层解耦架构 (The 4-Layer Architecture)

为避免知识库膨胀导致日常回复臃肿，系统严格执行“四层职责解耦”：

```text
┌──────────────────────────────────────────────────────────────────┐
│ 1. 思想层 (Philosophy) ── 集中于 mindset_meta_concepts.md        │
│    • Glover：拒绝隐性契约（付出出于心甘情愿，意图与结果解绑）     │
│    • Tawwab：温和非防御性设限（客观事实 + 个人底线 + 行动选择）   │
│    • Gottman：拒绝冷暴力（情绪过载时执行战术安全暂停，准时归来） │
│    • Manson：真实坦荡表达（放弃操控，得之坦然，失之淡然）        │
├──────────────────────────────────────────────────────────────────┤
│ 2. 场景层 (Scenarios) ── 各专项参考手册                          │
│    • 根据具体事实，决定接话、安慰、设限、邀约、暂停或体面止损    │
├──────────────────────────────────────────────────────────────────┤
│ 3. 输出层 (Output) ── 主入口 SKILL.md 严格锁定                   │
│    • 默认只给 1 条 10-25 字即拷即用的话术，不带理论分析与策略说教│
├──────────────────────────────────────────────────────────────────┤
│ 4. 教练层 (Coach) ── 按需展开 (/mock, /复盘, /教练)             │
│    • 仅在用户明确要求分析、对练或复盘时，才展开详细理论与多维评分│
└──────────────────────────────────────────────────────────────────┘
```

---

## 🎛️ 常用操作指令

平时直接丢原话或截图，系统默认秒给回复；需要深入对练时使用以下指令：

```powershell
# 1. 日常解围（直接发原话或截图）
"她说：'你挺闲啊'，我们平时常开玩笑，怎么回？"
> 忙里偷闲，刚好碰上你。

# 2. 遭遇越界/情感勒索时直接求助
"她说：'你要是不把朋友圈背景换成我，就是不爱我'，怎么回？"
> 我很在乎你，但我习惯按自己的节奏发圈，我们不拿这个证明爱。

# 3. 沉浸式对练沙盒 (/mock)
/mock 慢热回避型
/mock 高压职场型
/mock 直爽调侃型

# 4. 沙盒内伴随指令
/提示    # 暂停角色，给出思路与示范
/教练    # 开启/关闭每轮短评
/复盘    # 针对整场表现生成框架/边界/共情体检报告
/exit    # 随时退出沙盒
```

---

## 🛠️ 本地知识库全景目录

```text
emotional-push-pull/
├── .agents/skills/emotional-master/          # 主力 Skill
│   ├── SKILL.md                              # 总控准则（极简输出 + 严格分层）
│   └── references/                           # 17 个专项手册
│       ├── mindset_meta_concepts.md          # 思想层集中地：隐性契约、边界、情绪主权
│       ├── chat_playbook.md                  # 场景层：破冰、升温、邀约与三级阶梯
│       ├── shit_tests_bible.md               # 场景层：调侃化解与临床三阶设限剧本
│       ├── recovery_and_cold_start.md        # 场景层：战术安全暂停与失恋复原
│       ├── female_psychology.md              # 场景层：语言双轨制、依恋与情感投标
│       ├── push_pull_framing.md              # 场景层：松弛自洽推拉与高框架
│       ├── signals_and_kino.md               # 场景层：知情同意与非强迫接触阶梯
│       ├── advanced_conversation_steering.md # 场景层：话题跳档与自然留白
│       ├── crush_sandbox_simulator.md        # 教练层：/mock 沉浸式对练沙盒
│       ├── autopilot_live_guide.md           # 场景/教练层：逐轮副驾驶实时指导
│       ├── real_world_dialogue_examples.md   # 案例库：全周期真实多轮实录
│       ├── platform_playbooks.md             # 场景层：微信/交友软件/职场生态
│       ├── profile_audit_rules.md            # 展示面：头像/简介/动态诊断
│       ├── social_profile_moments.md         # 展示面：真实生活方式构建
│       ├── target_profile_card.md            # 工具层：事实与投射过滤器
│       └── tong_classic_quotes.md            # 语料库：反向曲解与自尊金句
├── evals/
│   └── scenarios.json                        # 19 个独立行为验收测试场景
└── open_source_reference/                    # 开源参考归档 (MIT)
```

---

## 🧪 19 个行为验收场景 (Evals)

项目在 [`evals/scenarios.json`](evals/scenarios.json) 中定义了 19 个独立验收用例，覆盖：
1. **自然接话**（先给简短回复，不长篇大论）
2. **语境不足**（不盲目打好感百分比，区分事实与猜测）
3. **严肃提问**（诚实表达意图，不回避反弹）
4. **明确拒绝**（尊重边界，停止联系，不搞机械冷冻再死缠烂打）
5. **失误负责**（主动道歉改正，不框架压制）
6. **自然节奏**（随缘自然回复，杜绝固定等几分钟套路）
7. **接触同意**（区分赴约与接触意愿，杜绝借交通等借口强行拉手）
8. **模拟对练与退出**（/mock 沉浸互动，/exit 立即退出）
9. **自动边界**（未回消息不连续施压，不编造已发送）
10. **非防御性设限**（面对情感勒索，平静温和守住边界）
11. **冲突安全暂停**（情绪过载时用状态+离开+归期战术暂停，杜绝冷战）
12. **破除隐性契约**（引导平复受害者心态，不发小作文被动攻击）
