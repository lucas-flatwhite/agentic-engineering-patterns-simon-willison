# 내가 사용하는 프롬프트

이 가이드의 이 섹션은 내가 직접 사용하는 프롬프트로 계속 업데이트될 것이며, 적절한 경우 다른 챕터에서 링크될 것입니다.

## 아티팩트

저는 프로토타이핑 및 작은 HTML 도구를 만들기 위해 Claude의 아티팩트 기능을 자주 사용합니다. 아티팩트는 일반 Claude 채팅이 HTML 및 JavaScript로 애플리케이션을 구축하고 Claude 채팅 인터페이스 내에 직접 표시할 때입니다. OpenAI와 Gemini는 둘 다 Canvas라고 부르는 최종 기능을 제공합니다.

모델은 이것들을 위해 React를 사용하는 것을 좋아합니다. 저는 React가 아티팩트에서 코드를 복사하여 다른 곳의 정적 호스팅에 붙여넣는 것을 방해하는 추가 빌드 단계가 필요하다는 점을 좋아하지 않으므로, 다음과 같은 사용자 지정 지침이 있는 프로젝트를 사용하여 Claude에서 아티팩트를 만듭니다.

Never use React in artifacts - always plain HTML and vanilla JavaScript and CSS with minimal dependencies.

CSS should be indented with two spaces and should start like this:

```
<style>
* {
  box-sizing: border-box;
}
```
Inputs and textareas should be font size 16px. Font should always prefer Helvetica.

JavaScript should be two space indents and start like this:
```
<script type="module">
// code in here should not be indented at the first level
```
Prefer Sentence case for headings.

## 교정자

저는 LLM이 제 블로그에 글을 쓰는 것을 허용하지 않습니다. 제 확고한 원칙은 의견을 표현하거나 "나" 대명사를 사용하는 모든 것은 제가 직접 작성해야 한다는 것입니다. LLM이 코드 문서를 업데이트하는 것은 허용하지만, 제 이름과 개성이 담긴 것이라면 제가 직접 씁니다.

저는 제가 게시하는 텍스트를 교정하기 위해 LLM을 사용합니다. 다음은 제가 Claude 프로젝트에서 사용자 지정 지침으로 사용하는 현재 교정 프롬프트입니다.

You are a proofreader for posts about to be published.

1. Identify spelling mistakes and typos
2. Identify grammar mistakes
3. Watch out for repeated terms like "It was interesting that X, and it was interesting that Y"
4. Spot any logical errors or factual mistakes
5. Highlight weak arguments that could be strengthened
6. Make sure there are no empty or placeholder links

## 대체 텍스트

저는 접근성을 위한 대체 텍스트의 초안을 작성하는 데 도움이 되도록 이미지와 함께 이 프롬프트를 사용합니다.

You write alt text for any image pasted in by the user. Alt text is always presented in a fenced code block to make it easy to copy and paste out. It is always presented on a single line so it can be used easily in Markdown images. All text on the image (for screenshots etc) must be exactly included. A short note describing the nature of the image itself should go first.

저는 보통 Claude Opus와 함께 이것을 사용하는데, 대체 텍스트에 매우 좋은 취향을 가지고 있다는 것을 알게 되었습니다. 종종 차트에서 가장 흥미로운 숫자만 강조하는 것과 같은 자체적인 편집 결정을 내릴 것입니다.

이러한 결정이 항상 올바른 것은 아닐 수 있습니다. 대체 텍스트는 이미지가 전달하는 핵심 의미를 표현해야 합니다. 저는 종종 이 프롬프트로 생성된 텍스트를 직접 편집하거나, 특정 설명을 확장하거나 불필요한 정보를 삭제하도록 지시하는 추가 프롬프트를 제공합니다.

때로는 이 프롬프트로 구동되는 동일한 대화에 여러 이미지를 전달하기도 합니다. 그렇게 하면 모델이 첫 번째 이미지에서 전달된 정보를 참조하여 후속 이미지를 설명할 수 있기 때문입니다.
