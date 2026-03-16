# 선형 워크스루

때로는 코딩 에이전트에게 코드베이스를 구조적으로 워크스루해 달라고 요청하는 것이 유용합니다.

빠르게 익혀야 하는 기존 코드일 수도 있고, 예전에 내가 작성했지만 세부를 잊어버린 코드일 수도 있으며, 혹은 전체를 바이브 코딩으로 만들었는데 실제 동작 원리를 이해해야 하는 상황일 수도 있습니다.

적절한 에이전트 하네스를 갖춘 프런티어 모델은 코드가 어떻게 동작하는지 이해를 돕는 상세한 워크스루를 구성할 수 있습니다.

## Showboat와 Present를 사용한 예시

최근 저는 Claude Code와 Opus 4.6을 사용해 Mac에서 SwiftUI 슬라이드 프레젠테이션 앱을 바이브 코딩으로 만들었습니다.

2025년 11월부터 2026년 2월까지 프런티어 모델의 발전에 대해 발표할 예정이었고, 저는 발표에 최소 하나의 장치를 넣는 것을 좋아합니다([STAR moment](https://simonwillison.net/2019/Dec/10/better-presentations/) - Something They'll Always Remember). 이번에는 발표 마지막에 슬라이드 메커니즘 자체가 바이브 코딩이 할 수 있는 것의 예시였다는 사실을 공개하는 것을 그 장치로 정했습니다.

코드를 [GitHub에 공개](https://github.com/simonw/present)한 뒤에야, 정작 이 코드가 실제로 어떻게 동작하는지 저는 거의 모른다는 사실을 깨달았습니다. 코드가 작성되는 과정을 거의 보지 않은 채([부분 트랜스크립트](https://gisthost.github.io/?bfbc338977ceb71e298e4d4d5ac7d63c)) 프롬프트만으로 전체를 만들어냈기 때문입니다.

그래서 Claude Code for web의 새 인스턴스를 띄우고, 저장소를 지정한 뒤 다음과 같이 프롬프트했습니다:

> Read the source and then plan a linear walkthrough of the code that explains how it all works in detail
>
> Then run "uvx showboat –help" to learn showboat - use showboat to create a walkthrough.md file in the repo and build the walkthrough in there, using showboat note for commentary and showboat exec plus sed or grep or cat or whatever you need to include snippets of code you are talking about

[Showboat](https://github.com/simonw/showboat)는 코딩 에이전트가 자신의 작업 과정을 보여주는 문서를 작성하도록 돕기 위해 제가 만든 도구입니다. 도구 사용에 모델이 필요로 하는 정보를 모두 담도록 설계된 [showboat --help 출력](https://github.com/simonw/showboat/blob/main/help.txt)도 확인할 수 있습니다.

`showboat note` 명령은 문서에 Markdown을 추가합니다. `showboat exec` 명령은 셸 명령을 받아 실행한 뒤, 명령과 그 출력을 문서에 함께 추가합니다.

"sed or grep or cat or whatever you need to include snippets of code you are talking about"를 사용하라고 지시함으로써, Claude Code가 코드 스니펫을 문서에 수동 복사하지 않도록 했습니다. 수동 복사는 환각이나 실수의 위험을 만들 수 있기 때문입니다.

결과는 매우 훌륭했습니다. [Claude Code가 Showboat로 만든 문서](https://github.com/simonw/present/blob/main/walkthrough.md)를 보면 여섯 개 `.swift` 파일을 모두 상세히 설명하고, 코드가 어떻게 동작하는지 명확하고 바로 활용 가능한 해설을 제공합니다.

저는 이 문서를 읽는 것만으로 SwiftUI 앱 구조에 대해 많은 것을 배웠고, Swift 언어 자체에 대한 탄탄한 디테일도 흡수할 수 있었습니다.

LLM이 새로운 기술을 배우는 속도를 떨어뜨릴까 걱정된다면, 이런 패턴을 강력히 권장합니다. 바이브 코딩으로 만든 40분짜리 작은 프로젝트조차 새로운 생태계를 탐색하고 흥미로운 새 기법을 익힐 기회가 될 수 있습니다.

---
Source: https://simonwillison.net/guides/agentic-engineering-patterns/linear-walkthroughs/
