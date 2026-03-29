# 대화형 설명

에이전트가 작성한 코드의 작동 방식을 놓치게 되면 **인지 부채**를 떠안게 됩니다.

많은 경우 이는 중요하지 않습니다. 코드가 데이터베이스에서 일부 데이터를 가져와 JSON으로 출력하는 경우, 구현 세부 사항은 우리가 신경 쓸 필요가 없을 정도로 간단할 가능성이 높습니다. 새로운 기능을 시도해보고 작동 방식을 매우 확실하게 추측한 다음, 코드를 훑어보며 확인할 수 있습니다.

하지만 종종 세부 사항이 정말로 중요합니다. 애플리케이션의 핵심이 우리가 완전히 이해하지 못하는 블랙박스가 되면, 더 이상 자신 있게 추론할 수 없게 되어 새로운 기능 계획을 더 어렵게 만들고 결국 축적된 기술 부채와 같은 방식으로 진행 속도를 늦춥니다.

인지 부채를 어떻게 갚을 수 있을까요? 코드 작동 방식에 대한 이해를 높임으로써 가능합니다.

제가 가장 좋아하는 방법 중 하나는 **대화형 설명**을 만드는 것입니다.

## 워드 클라우드 이해하기

[AI 에이전트 코딩 회의론자가 AI 에이전트 코딩을 과도하게 자세히 시도하다](https://minimaxir.com/2026/02/ai-agent-coding/)에서 Max Woolf는 `Create a Rust app that can create "word cloud" data visualizations given a long input text`라는 프롬프트로 LLM의 Rust 능력을 테스트했다고 언급했습니다.

이것은 제 상상력을 사로잡았습니다. 저는 항상 워드 클라우드가 어떻게 작동하는지 알고 싶었기 때문에, 아이디어를 탐구하기 위해 [비동기 연구 프로젝트](https://simonwillison.net/2025/Nov/6/async-code-research/)를 시작했습니다. - [초기 프롬프트는 여기](https://github.com/simonw/research/pull/91#issue-4002426963), [코드 및 보고서는 여기](https://github.com/simonw/research/tree/main/rust-wordcloud)에 있습니다.

이것은 정말 잘 작동했습니다. 웹용 Claude Code는 다음과 같은 이미지를 생성할 수 있는 Rust CLI 도구를 만들어 주었습니다.
이 이미지처럼요:

![다양한 색상과 크기의 많은 단어가 있고 가운데에 더 큰 단어가 있는 워드 클라우드.](https://raw.githubusercontent.com/simonw/research/refs/heads/main/rust-wordcloud/wordcloud.png)

하지만 실제로 어떻게 작동하는 걸까요?

Claude의 보고서에 따르면 "**자연스러운 레이아웃을 위해 단어별 무작위 각도 오프셋을 사용한 아르키메데스 나선 배치**"를 사용한다고 합니다. 이것은 저에게 큰 도움이 되지 않았습니다!

저는 코드베이스의 [선형 둘러보기](https://simonwillison.net/guides/agentic-engineering-patterns/linear-walkthroughs/)를 요청하여 Rust 코드를 더 자세히 이해하는 데 도움을 받았습니다. - 여기 [해당 둘러보기](https://github.com/simonw/research/blob/main/rust-wordcloud/walkthrough.md)가 있습니다(그리고 [프롬프트](https://github.com/simonw/research/commit/2cb8c62477173ef6a4c2e274be9f712734df6126)). 이것은 Rust 코드의 구조를 이해하는 데 도움이 되었지만, "아르키메데스 나선 배치" 부분이 실제로 어떻게 작동하는지에 대한 직관적인 이해는 여전히 없었습니다.

그래서 저는 **애니메이션 설명**을 요청했습니다. 기존 `walkthrough.md` 문서에 대한 링크를 Claude Code 세션에 붙여넣고 다음을 추가하여 이 작업을 수행했습니다:

Fetch https://raw.githubusercontent.com/simonw/research/refs/heads/main/rust-wordcloud/walkthrough.md to /tmp using curl so you can read the whole thing

Inspired by that, build animated-word-cloud.html - a page that accepts pasted text (which it persists in the `#fragment` of the URL such that a page loaded with that `#` populated will use that text as input and auto-submit it) such that when you submit the text it builds a word cloud using the algorithm described in that document but does it animated, to make the algorithm as clear to understand. Include a slider for the animation which can be paused and the speed adjusted or even stepped through frame by frame while paused. At any stage the visible in-progress word cloud can be downloaded as a PNG.

[여기에서 결과를 가지고 놀 수 있습니다](https://tools.simonwillison.net/animated-word-cloud). 다음은 애니메이션 GIF 데모입니다:

![알고리즘이 단어를 배치하려는 위치를 보여주는 작은 상자와 함께 워드 클라우드에 단어가 한 번에 하나씩 나타납니다. 상자가 기존 단어와 겹치면 다시 시도합니다.](https://static.simonwillison.net/static/2026/animated-word-cloud-demo.gif)

이것은 Claude Opus 4.6을 사용했는데, 설명 애니메이션을 만드는 데 꽤 좋은 취향을 가지고 있는 것으로 나타났습니다.

애니메이션을 자세히 보면 각 단어에 대해 상자를 표시하여 페이지의 어딘가에 배치하려고 시도하고, 해당 상자가 기존 단어와 교차하는지 확인하는 것을 볼 수 있습니다. 그렇다면 중심에서 바깥쪽으로 나선형으로 움직이면서 좋은 위치를 계속 찾으려고 합니다.

저는 이 애니메이션이 알고리즘이 작동하는 방식을 이해하는 데 정말 도움이 되었다고 생각합니다.

저는 오랫동안 다양한 개념을 설명하는 데 도움이 되는 애니메이션과 대화형 인터페이스의 팬이었습니다. 좋은 코딩 에이전트는 자신의 코드나 다른 사람이 작성한 코드를 설명하는 데 도움이 되도록 요청 시 이러한 것을 생성할 수 있습니다.
