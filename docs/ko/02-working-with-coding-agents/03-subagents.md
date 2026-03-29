# 서브에이전트 (Subagents)

LLM은 **컨텍스트 제한(context limit)**에 의해 제약을 받습니다. 즉, 한 번에 작업 메모리에 담을 수 있는 토큰의 양이 정해져 있습니다. 지난 2년간 LLM 자체의 능력은 극적으로 향상되었지만, 이 컨텍스트 크기는 크게 증가하지 않았습니다. 일반적으로 최대 약 1,000,000 토큰이며, 벤치마크에서는 200,000 토큰 미만에서 더 좋은 품질의 결과를 보고하는 경우가 많습니다.

모델로부터 훌륭한 결과를 얻기 위해서는 컨텍스트를 해당 제한 내에 맞도록 신중하게 관리하는 것이 중요합니다.

**서브에이전트(Subagents)**는 코딩 에이전트의 귀중한 최상위 컨텍스트를 너무 많이 소모하지 않으면서 더 큰 작업을 처리할 수 있는 간단하면서도 효과적인 방법을 제공합니다.

코딩 에이전트가 서브에이전트를 사용하면, 지정된 목표를 달성하기 위해 새로운 프롬프트로 시작하는 새 컨텍스트 창을 가진 자신의 복사본을 효과적으로 파견합니다.

## Claude Code의 탐색(Explore) 서브에이전트

Claude Code는 표준 작업 방식의 일부로 서브에이전트를 광범위하게 사용합니다. 이를 설명적인 예로 사용해 보겠습니다.

기존 저장소에 대해 새 작업을 시작할 때마다 Claude Code는 먼저 해당 저장소를 탐색하여 전반적인 구조를 파악하고 작업을 수행하는 데 필요한 관련 정보를 찾아야 합니다.

이를 위해 프롬프트를 구성하고 서브에이전트를 파견하여 탐색을 수행하고 찾은 내용에 대한 설명을 반환하도록 합니다.

저는 [제 가이드의 페이지](https://simonwillison.net/guides/agentic-engineering-patterns/linear-walkthroughs/changes/) 스크린샷과 함께 Claude Code 세션을 시작했고 다음 프롬프트를 사용했습니다:

> Make the chapter diffs also show which characters have changed in this diff view with a darker color of red or green for the individually changed segments of text within the line

해당 세션의 [대화록](https://gisthost.github.io/?effbdc564939b88fe5c6299387e217da/index.html)은 여기에 있습니다.

Claude Code는 다음 시작 프롬프트로 "탐색(Explore)" 서브에이전트를 실행했습니다:

> Find the code that implements the diff view for "chapters" in this Django blog. I need to find:
>
> 1.  Templates that render diffs (look for diff-related HTML/CSS with red/green backgrounds)
> 2.  Python code that generates diffs (look for difflib usage or similar)
> 3.  Any JavaScript related to diff rendering
> 4.  CSS styles for the diff view (red/green line backgrounds)
>
> Search thoroughly - check templates/, static/, blog/ directories. Look for keywords like "diff", "chapter", "revision", "history", "compare".

서브에이전트는 다른 도구 호출과 유사하게 작동합니다: 부모 에이전트가 다른 도구를 사용하는 것처럼 서브에이전트를 파견하고 응답을 기다립니다. 모델이 이런 방식으로 스스로에게 프롬프트를 작성하는 것은 흥미롭습니다 - 일반적으로 프롬프팅 전략에 대한 좋은 감각을 가지고 있습니다.

탐색 서브에이전트는 몇 초간 작업한 후 다음과 같이 시작하는 응답을 반환했습니다:

> Perfect! Now let me create a comprehensive summary with all the findings:
>
> ### Summary: Chapter Diff View Implementation
>
> I found the complete implementation of the diff view for chapters in this Django blog. Here are the key components:
>
> #### 1. **Python Code - Diff Generation** (`/home/user/simonwillisonblog/guides/views.py`, lines 139-202)
>
> The `chapter_changes()` view function uses Python's built-in `difflib.unified_diff()` to generate diffs: […]

서브에이전트의 전체 응답에는 부모 에이전트가 원래 요청을 처리하기 위해 코드를 편집하는 데 필요한 모든 세부 정보가 포함되어 있었습니다.

## 병렬 서브에이전트

이 탐색 서브에이전트는 서브에이전트가 어떻게 작동하는지 보여주는 가장 간단한 예입니다. 부모 에이전트가 서브에이전트가 실행되는 동안 일시 정지합니다. 이런 종류의 서브에이전트의 주요 장점은 부모의 사용 가능한 제한에서 토큰을 소비하지 않는 방식으로 새로운 컨텍스트에서 작업할 수 있다는 것입니다.

서브에이전트는 부모 에이전트가 여러 서브에이전트를 동시에 실행하도록 하여 상당한 성능 향상을 제공할 수도 있으며, 잠재적으로 Claude Haiku와 같은 더 빠르고 저렴한 모델을 사용하여 해당 작업을 가속화할 수 있습니다.

서브에이전트를 지원하는 코딩 에이전트는 사용자의 지시에 따라 이를 사용할 수 있습니다. 다음과 같은 프롬프트를 시도해 보세요:

`Use subagents to find and update all of the templates that are affected by this change.
`
여러 파일을 편집하는 작업에서 - 그리고 해당 파일들이 서로 의존하지 않는 경우 - 이는 상당한 속도 향상을 제공할 수 있습니다.

## 전문 서브에이전트

일부 코딩 에이전트는 서브에이전트가 추가 사용자 정의와 함께 실행되도록 허용합니다. 종종 사용자 정의 시스템 프롬프트나 사용자 정의 도구 또는 둘 다의 형태로, 이를 통해 서브에이전트가 다른 역할을 수행할 수 있습니다.

이러한 역할은 다양한 유용한 전문 분야를 다룰 수 있습니다:

*   **코드 리뷰어** 에이전트는 코드를 검토하고 버그, 기능 격차 또는 설계의 약점을 식별할 수 있습니다.
*   **테스트 실행기** 에이전트는 테스트를 실행할 수 있습니다. 테스트 스위트가 크고 장황한 경우 특히 유용합니다. 서브에이전트가 전체 테스트 출력을 메인 코딩 에이전트로부터 숨기고 실패에 대한 세부 정보만 보고할 수 있기 때문입니다.
*   **디버거** 에이전트는 문제 디버깅에 특화할 수 있으며, 코드베이스를 추론하고 코드 스니펫을 실행하여 재현 단계를 분리하고 버그의 근본 원인을 파악하는 데 토큰 허용량을 사용합니다.

수십 개의 다른 전문 서브에이전트에 걸쳐 작업을 분할하는 것이 유혹적일 수 있지만, 서브에이전트의 주요 가치는 귀중한 루트 컨텍스트를 보존하고 토큰 집약적인 작업을 관리하는 데 있다는 것을 기억하는 것이 중요합니다. 루트 코딩 에이전트는 토큰이 충분하다면 자체 출력을 디버깅하거나 검토하는 데 완벽하게 능숙합니다.

## 공식 문서

여러 인기 있는 코딩 에이전트가 서브에이전트를 지원하며, 각각 사용 방법에 대한 자체 문서를 제공합니다:

*   [OpenAI Codex subagents](https://developers.openai.com/codex/subagents/)
*   [Claude subagents](https://code.claude.com/docs/en/sub-agents)
*   [Gemini CLI subagents](https://geminicli.com/docs/core/subagents/)
*   [Mistral Vibe subagents](https://docs.mistral.ai/mistral-vibe/agents-skills#agent-selection)
*   [OpenCode agents](https://opencode.ai/docs/agents/)
*   [Subagents in Visual Studio Code](https://code.visualstudio.com/docs/copilot/agents/subagents)
*   [Cursor Subagents](https://cursor.com/docs/subagents)
