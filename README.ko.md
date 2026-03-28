<div align="right">
  <a href="README.md">🇺🇸 English</a> | 🇰🇷 한국어
</div>

<div align="center">
  <h1>에이전틱 엔지니어링 패턴</h1>
  <p><em>코딩 에이전트를 활용하여 소프트웨어 엔지니어링 역량을 증폭하는 실천 가이드</em></p>

  <a href="https://simonwillison.net/guides/agentic-engineering-patterns/"><img src="https://img.shields.io/badge/Author-Simon_Willison-blue" alt="Author: Simon Willison"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-CC0-lightgrey" alt="License: CC0"></a>
  <img src="https://img.shields.io/badge/Language-Korean-orange" alt="Language: Korean">

  <br><br>

  > 코드를 작성하는 비용은 낮아졌지만, 신뢰할 수 있는 소프트웨어를 만드는 일은 여전히 어렵습니다.

</div>

---

🧠 엔지니어링 규율 증폭 · 🛠️ 실용적인 패턴 · 🔄 지속적인 업데이트 · 📖 살아있는 가이드

## 프로젝트 소개

이 저장소는 사이먼 윌리슨(Simon Willison)의 **"Agentic Engineering Patterns"** 가이드를 체계적으로 정리하고 번역한 한국어 문서 저장소입니다. Claude Code나 OpenAI Codex 같은 코딩 에이전트를 활용하여 소프트웨어 개발을 수행하는 실용적인 패턴들을 다룹니다.

에이전틱 엔지니어링(Agentic Engineering)은 단순히 AI에게 코드를 맡기는 '바이브 코딩(vibe coding)'과는 다릅니다. 이 가이드는 전문 소프트웨어 엔지니어가 코딩 에이전트를 활용하여 기존의 엔지니어링 규율을 우회하는 것이 아니라, 오히려 그 역량을 어떻게 **증폭**할 수 있는지에 초점을 맞추고 있습니다.

## 핵심 가이드라인

본 저장소의 문서는 분야가 발전함에 따라 지속적으로 갱신되는 챕터형 구조의 살아있는 가이드입니다. 

| 챕터 | 주제 | 설명 |
|------|------|------|
| **1. 원칙** | 에이전틱 엔지니어링의 기본 | 코드가 저렴해진 시대의 새로운 직관과 피해야 할 안티패턴 |
| **2. 에이전트 작업** | 코딩 에이전트 실무 | 에이전트의 작동 원리, Git과의 통합, 서브에이전트 활용법 |
| **3. 테스트와 QA** | 신뢰성 확보 | 레드/그린 TDD, 테스트 우선 접근법, 에이전트 수동 테스트 |
| **4. 코드 이해하기** | 레거시 및 복잡성 대응 | 선형 워크스루 및 대화형 설명을 통한 코드 분석 |
| **5. 프롬프트 분석** | 실제 활용 사례 | 주석이 달린 실제 프롬프트를 통한 최적화 도구 구축 사례 |

자세한 내용은 [에이전틱 엔지니어링 패턴 소개](./docs/ko/00-agentic-engineering-patterns-intro.md) 문서에서 확인할 수 있습니다.

## 목차

전체 가이드는 아래와 같이 구성되어 있습니다. 각 링크를 통해 한국어 번역본을 확인할 수 있습니다.

### 1. 원칙 (Principles)
- [에이전틱 엔지니어링이란 무엇인가?](./docs/ko/01-principles/01-what-is-agentic-engineering.md)
- [이제 코드는 싸다](./docs/ko/01-principles/02-writing-code-is-cheap-now.md)
- [할 줄 아는 것을 모아두라](./docs/ko/01-principles/03-hoard-things-you-know-how-to-do.md)
- [AI는 더 나은 코드를 생산하는 데 도움이 되어야 합니다](./docs/ko/01-principles/04-ai-should-help-us-produce-better-code.md)
- [안티패턴: 피해야 할 것들](./docs/ko/01-principles/05-anti-patterns-things-to-avoid.md)

### 2. 코딩 에이전트와 함께 작업하기 (Working with coding agents)
- [코딩 에이전트는 어떻게 작동하는가](./docs/ko/02-working-with-coding-agents/01-how-coding-agents-work.md)
- [코딩 에이전트와 Git 함께 사용하기](./docs/ko/02-working-with-coding-agents/02-using-git-with-coding-agents.md)
- [서브에이전트](./docs/ko/02-working-with-coding-agents/03-subagents.md)

### 3. 테스트와 QA (Testing and QA)
- [레드/그린 TDD](./docs/ko/03-testing-and-qa/01-red-green-tdd.md)
- [먼저 테스트를 실행하라](./docs/ko/03-testing-and-qa/02-first-run-the-tests.md)
- [에이전트 수동 테스트](./docs/ko/03-testing-and-qa/03-agentic-manual-testing.md)

### 4. 코드 이해하기 (Understanding code)
- [선형 워크스루](./docs/ko/04-understanding-code/01-linear-walkthroughs.md)
- [대화형 설명](./docs/ko/04-understanding-code/02-interactive-explanations.md)

### 5. 주석이 달린 프롬프트 (Annotated prompts)
- [WebAssembly와 Gifsicle을 사용한 GIF 최적화 도구](./docs/ko/05-annotated-prompts/01-gif-optimization-tool-using-webassembly-and-gifsicle.md)

### 6. 부록 (Appendix)
- [내가 사용하는 프롬프트](./docs/ko/06-appendix/01-prompts-i-use.md)

## 프로젝트 구조 및 관리

이 저장소는 `toc.yml` 파일을 단일 진실 공급원(Single Source of Truth)으로 사용하여 문서의 구조를 관리합니다.

```bash
├── toc.yml                 # 전체 목차 구조 정의 파일
├── scripts/
│   └── render_toc.rb       # toc.yml을 기반으로 README 생성 스크립트
└── docs/
    ├── en/                 # 영문 원본 문서
    └── ko/                 # 한국어 번역 문서
```

목차 구조를 변경하려면 `toc.yml`을 수정하고 아래 명령어를 실행하여 README 파일을 재생성하세요.

```bash
ruby scripts/render_toc.rb
```

## 원본 출처 및 라이선스

- **원본 가이드**: [Agentic Engineering Patterns](https://simonwillison.net/guides/agentic-engineering-patterns/) by Simon Willison
- **라이선스**: 본 저장소의 내용은 [CC0 (Creative Commons Zero v1.0 Universal)](LICENSE) 라이선스에 따라 퍼블릭 도메인으로 배포됩니다.
