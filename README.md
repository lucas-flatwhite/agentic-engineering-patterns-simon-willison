# Agentic Engineering Patterns (Simon Willison)

Guides based on Simon Willison's "Agentic Engineering Patterns".
https://simonwillison.net/guides/agentic-engineering-patterns/

## Project Intent (EN)

This repository curates and organizes practical patterns for building software with coding agents such as Claude Code and OpenAI Codex.

The core idea is simple: writing code is much cheaper than before, but producing reliable, maintainable, well-tested software is still hard. These guides focus on how professional engineers can use agents to amplify real engineering discipline, not bypass it.

This is intentionally structured as a living guide made of chapter-style documents. Chapters can be updated over time as the field evolves.

Independent article (not part of TOC):
- English: [Agentic Engineering Patterns intro](./docs/en/00-agentic-engineering-patterns-intro.md)
- 한국어: [에이전틱 엔지니어링 패턴 소개](./docs/ko/00-agentic-engineering-patterns-intro.md)

## 프로젝트 의도 (KO)

이 저장소는 Claude Code, OpenAI Codex 같은 코딩 에이전트를 활용한 소프트웨어 개발 패턴을 체계적으로 정리하기 위해 만들었습니다.

핵심 전제는 단순합니다. 이제 코드를 쓰는 비용은 크게 낮아졌지만, 신뢰 가능하고 유지보수 가능하며 테스트로 검증된 소프트웨어를 만드는 일은 여전히 어렵습니다. 이 가이드는 에이전트가 엔지니어링 규율을 대체하는 것이 아니라, 숙련된 엔지니어의 역량을 증폭하는 방향에 초점을 둡니다.

문서는 챕터형 구조의 살아있는 가이드로 운영합니다. 분야가 발전함에 따라 각 챕터는 지속적으로 갱신될 수 있습니다.

## Language / 언어

- English: [Docs](./docs/en/README.md)
- 한국어: [문서](./docs/ko/README.md)

## TOC Source

- Canonical TOC: [toc.yml](./toc.yml)
- English and Korean documents follow the same IDs and order defined in `toc.yml`.

## TOC Rendering

- Run `ruby scripts/render_toc.rb` after editing `toc.yml`.
- This regenerates:
  - `docs/en/README.md`
  - `docs/ko/README.md`
