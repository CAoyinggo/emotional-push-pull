# 情感推拉智能体 · Emotional-Push-Pull 本地增强版

这个桌面副本默认用于执行与测试两性社交推拉、聊天解围、送命题化解与沙盒对抗演练。Agent 与全局 Skill 共用同一套配置逻辑：读取当前对话或聊天截图 → 识别 7 阶段推进状态与红黄绿灯信号 → 破译女性潜台词与深层心理动机 → 由推拉引擎输出极简幽默短打方案（或由沙盒模拟器展开 1v1 闭环对练）。

所有改动保留在本地。GitHub 远端地址绑定为 [https://github.com/CAoyinggo/emotional-push-pull](https://github.com/CAoyinggo/emotional-push-pull)，已在 `main` 分支完成推送。开源参考资产完整保留原作者 MIT License 与版权声明。核心 Prompt、17 篇专项参考手册已同时部署于当前工作区及全局 `~/.gemini/config/skills/emotional-master/`。

## 开始使用

需要支持 Antigravity / Claude Code / 任意兼容 AgentSkills 规范的环境。本机已完成全局配置与工作区挂载；直接在对话窗口输入自然语言或快捷指令即可调用。

```powershell
# 1. 日常聊天解围（直接抛出对话或截图）
"女生问我：'你是不是平时对每个女孩子都这么会撩？' 帮我解围"

# 2. 启动 1v1 沙盒对抗模拟器
/mock 傲娇高冷学姐
/mock 慢热敏感文艺女
/mock 现实职场御姐
/mock 段位极高的绿茶海后

# 3. 退出演练模式
/exit

# 4. 运行基准评测集（22 个真实实战用例）
cd open_source_reference/qingsheng-skill/evals
bash run_evals.sh
```

不提供特定角色指令时默认进入日常军师问答模式；输入 `/mock` 自动挂载独立沙盒裁判与角色双视窗。

输出判定严格遵循用户定制的最高执行军规：
- **短平快 (Ultra-Short)**：核心回复单句必须控制在 10~20 字以内，像真人秒发的微信短句，拒绝学术小作文。
- **绝不油腻反蠢 (No Cringe)**：彻底封杀土味情话和恶俗老梗（如“捕捉野生小可爱”等）。
- **高级幽默与松弛感 (Witty & Relaxed)**：善用反常规曲解、自嘲与轻度推拉，让女生会心一笑，没有压力。

## 已支持的业务能力

- **阶段推进与信号雷达**：初识破冰 `stage1`、好感吸引 `stage2`、情绪升温 `stage3`、深度共鸣 `stage4`、模糊邀约 `stage5`、肢体进挪 `stage6`、关系确权 `stage7`；自动检测 🟢绿灯 (IOI)、🟡黄灯 (观望)、🔴红灯 (降权)。
- **7 大平台差异化 Playbook**：微信 private；探探 tantan；陌陌 momo；Soul soul；Bumble bumble；青藤之恋 qingteng；小红书/Tinder trends。
- **高维话题主导**：气泡植入 bubble；无缝嫁接 grafting；悬念留白 zeigarnik；升维探讨 escalation；冷场唤醒 re-ignition。
- **死局起死回生**：假性冷淡 3-7 天战术冷却 soft-freeze；真性断联/分手 14-30 天认知重塑与“回忆种子信” hard-freeze。
- **肢体进挪安全阶梯**：Class 1 社交级、Class 2 进阶级、Class 3 亲密级、Class 4 私密确权级；强制执行 1 秒后撤与知情同意。
- **展示面与朋友圈诊断**：微信门面三件套 profile；4 类动态黄金配比 moments；神级评论留钩子引流私聊 comments。
- **送命题降维破解**：“对谁都这样吗”、“渣男”、“前女友谁好看”、“图我什么”等 20+ 送命题通关。
- **祖师爷名场面**：童锦程无需求感心法、反客为主骚话库、随时抽离的高价值框架。

## 接入 Skill 与 Agent 配置

主控入口位于 [.agents/skills/emotional-master/SKILL.md](.agents/skills/emotional-master/SKILL.md)，全局副本部署于 `~/.gemini/config/skills/emotional-master/`，使用相对路径索引专项参考库，不增加无意义上下文 Token。

Skill 暴露 5 维立体输出矩阵：

```text
🎯【局势一语点破】
（1-2 句话点出：对方处于第几阶段、是试探/测试还是撒娇，用户切忌踩什么雷）

🔥【短打幽默话术 · 复制即发】
1. 痞帅调侃流（首选）："一句超短、幽默、带刺带甜的骚话"
2. 自然松弛流："一句云淡风轻、高情商化解的话"
3. 战术反弹流："一句反客为主、反向测试的话"

⏱️【节奏要点】
（1 句话提醒：隔多久回、标点细节、发完立刻锁屏）
```

沙盒模式遵循双视窗协议：视窗 1 输出角色对话与微表情神态，视窗 2 输出好感度打分、潜台词透视、祖师爷毒舌点评与神级示范。

## 数据、语料与基准评测

项目收录经过脱敏与标注的真实语料库，存放在 references 目录：
- 40+ 真实分阶段对话语料案例库：见 [real_world_dialogue_examples.md](.agents/skills/emotional-master/references/real_world_dialogue_examples.md)。
- 15 大两性吸引力元心法库：见 [mindset_meta_concepts.md](.agents/skills/emotional-master/references/mindset_meta_concepts.md)。
- 女性心理学与潜台词大辞典：见 [female_psychology.md](.agents/skills/emotional-master/references/female_psychology.md)。
- 完整开源参考原版与 22 个基准测试集位于 [open_source_reference/](open_source_reference/)，保留 MIT License 与版权归属。

基准回归用例位于 `open_source_reference/qingsheng-skill/evals/evals.json`，覆盖被动冷淡分析、邀约被拒破局、长回复冷读、多目标切换、送命题化解等维度。

## 验证与边界限制

核心实现与规则索引：
- 主控调度：[.agents/skills/emotional-master/SKILL.md](.agents/skills/emotional-master/SKILL.md)
- 7 阶段推进：[.agents/skills/emotional-master/references/seven_stages_engine.md](.agents/skills/emotional-master/references/seven_stages_engine.md)
- 废物测试圣经：[.agents/skills/emotional-master/references/shit_tests_bible.md](.agents/skills/emotional-master/references/shit_tests_bible.md)
- 沙盒实战模拟：[.agents/skills/emotional-master/references/crush_sandbox_simulator.md](.agents/skills/emotional-master/references/crush_sandbox_simulator.md)

边界与伦理限制：
1. **知情同意与边界保护**：任何身体接触或关系升级必须建立在女方明确愿意的基础上；若遭遇迟疑、退缩或明确拒绝，必须在 1 秒内中止并后撤，严禁违背意志。
2. **严防金钱诈骗与恶意伤害**：可以玩推拉调情，但严禁借贷欺诈、骗财骗色或恶意人身攻击。
3. **真实性原则**：高情商与推拉是打破僵局的工具，绝不鼓励脱离个人真实生活基础的虚假伪装。
