# 에이전틱 엔지니어링 패턴

**게시일:** 2026년 2월 23일

새로운 프로젝트로 **[Agentic Engineering Patterns](https://simonwillison.net/guides/agentic-engineering-patterns/)**를 수집하고 문서화하기 시작했습니다. 우리가 막 진입하고 있는 코딩 에이전트 개발의 새로운 시대에서 더 좋은 결과를 얻기 위한 코딩 실천과 패턴을 정리하는 작업입니다.

저는 **Agentic Engineering**을 코딩 에이전트를 사용한 소프트웨어 개발로 정의합니다. Claude Code나 OpenAI Codex 같은 도구를 떠올리면 됩니다. 핵심 특징은 이들이 코드를 생성할 뿐 아니라 _실행_도 할 수 있다는 점이며, 그 덕분에 인간 감독자의 턴 단위 지시 없이도 코드를 테스트하고 스스로 반복 개선할 수 있습니다.

저는 **vibe coding**을 [원래 정의](https://simonwillison.net/2025/Mar/19/vibe-coding/) 그대로, 코드 자체에는 전혀 주의를 기울이지 않는 코딩으로 봅니다. 오늘날에는 비개발자가 LLM으로 코드를 작성하는 맥락과 자주 연결됩니다.

Agentic Engineering은 그 반대편에 있습니다. 전문 소프트웨어 엔지니어가 코딩 에이전트를 활용해 기존 전문성을 증폭함으로써 일을 개선하고 가속하는 방식입니다.

이 새로운 분야에는 배우고 탐구할 것이 정말 많습니다. 저는 이미 [ai-assisted-programming 태그](https://simonwillison.net/tags/ai-assisted-programming/) 아래에 많은 글(현재 345개 이상)을 게시했지만, 그 글들은 비교적 비정형적이었습니다. 이제의 목표는 "이걸로 좋은 결과를 얻으려면 어떻게 해야 하나"라는 질문에 한 곳에서 답할 수 있는 형태를 만드는 것입니다.

이 블로그에서 이 프로젝트를 챕터 형태의 패턴 시리즈로 계속 발전시켜 나갈 예정입니다. 형식은 1994년에 대중화된 [Design Patterns: Elements of Reusable Object-Oriented Software](https://en.wikipedia.org/wiki/Design_Patterns)에서 느슨하게 영감을 받았습니다.

오늘 첫 두 챕터를 공개했습니다:

*   **[Writing code is cheap now](https://simonwillison.net/guides/agentic-engineering-patterns/code-is-cheap/)**는 에이전틱 엔지니어링의 핵심 과제를 다룹니다. 초기 동작 코드를 만들어내는 비용이 거의 0에 가까워졌을 때, 개인과 팀의 기존 작업 직관은 어떻게 달라져야 하는가?
*   **[Red/green TDD](https://simonwillison.net/guides/agentic-engineering-patterns/red-green-tdd/)**는 테스트-우선 개발이 최소한의 추가 프롬프트로 에이전트가 더 간결하고 신뢰할 수 있는 코드를 작성하도록 돕는 방법을 설명합니다.

앞으로 주당 1-2개 속도로 챕터를 더 추가하고 싶습니다. 어디서 멈출지는 아직 모르겠습니다. 다룰 주제가 정말 많거든요!

## LLM이 아니라 제가 직접 쓴 글입니다

저는 제 이름으로 AI 생성 글을 게시하지 않는다는 강한 개인 원칙을 갖고 있습니다. 이 원칙은 Agentic Engineering Patterns에도 그대로 적용됩니다. 교정, 예시 코드 보강, 그 밖의 여러 보조 작업에는 LLM을 활용하겠지만, 여기서 읽는 문장 자체는 제가 직접 작성합니다.

## 챕터와 가이드

Agentic Engineering Patterns는 정확히 _책_은 아니지만, 책과 비슷한 형태를 갖습니다. 이를 제 사이트에서 _guide_라고 부르는 새로운 콘텐츠 형태로 게시할 예정입니다. 가이드는 챕터들의 모음이며, 각 챕터는 사실상 블로그 포스트이되 날짜는 덜 강조하고, 최초 게시 시점에 고정되지 않고 시간이 지나며 업데이트되도록 설계됩니다.

가이드와 챕터는 블로그에서 "evergreen" 콘텐츠를 게시하는 문제에 대한 제 해답입니다. 이 방식을 꽤 오래 찾고 있었고, 이번 형식은 정착 가능성이 있다고 느낍니다.

구현이 궁금하다면 [Guide](https://github.com/simonw/simonwillisonblog/blob/b9cd41a0ac4a232b2a6c90ca3fff9ae465263b02/blog/models.py#L262-L280), [Chapter](https://github.com/simonw/simonwillisonblog/blob/b9cd41a0ac4a232b2a6c90ca3fff9ae465263b02/blog/models.py#L349-L405), [ChapterChange](https://github.com/simonw/simonwillisonblog/blob/b9cd41a0ac4a232b2a6c90ca3fff9ae465263b02/blog/models.py#L408-L423) 모델과 [관련 Django 뷰](https://github.com/simonw/simonwillisonblog/blob/b9cd41a0ac4a232b2a6c90ca3fff9ae465263b02/blog/views.py#L775-L923) 코드를 참고하세요. 이 중 대부분은 iPhone을 통해 웹에 접속한 Claude Code에서 Claude Opus 4.6이 작성했습니다.

---
Source: https://simonwillison.net/2026/Feb/23/agentic-engineering-patterns/
