# 할 줄 아는 것을 모아두라

코딩 에이전트를 활용해 생산성을 높이기 위한 제 팁 상당수는 에이전트 없이도 커리어에서 유용하다고 느꼈던 조언의 연장선에 있습니다. 여기 좋은 예가 있습니다: **할 줄 아는 것을 모아두세요**.

소프트웨어를 만드는 기술의 상당 부분은 무엇이 가능하고 무엇이 불가능한지를 이해하는 것, 그리고 그것을 어떻게 달성할 수 있는지에 대한 대략적인 아이디어라도 갖고 있는 것입니다.

이런 질문은 광범위할 수도, 꽤 특수할 수도 있습니다. 웹 페이지에서 JavaScript만으로 OCR 작업을 실행할 수 있을까? iPhone 앱이 실행되지 않는 상태에서도 Bluetooth 기기와 페어링할 수 있을까? Python에서 100GB JSON 파일을 전체를 메모리에 올리지 않고 처리할 수 있을까?

이런 질문에 대한 답을 많이 확보할수록, 다른 사람들이 아직 떠올리지 못한 방식으로 기술을 문제 해결에 투입할 기회를 포착할 가능성이 높아집니다.

무언가가 이론적으로 가능하다는 것을 아는 것과 실제로 해본 것을 직접 본 것은 다릅니다. 소프트웨어 전문가로서 기르야 할 핵심 자산은 이런 질문들에 대한 방대한 답변 모음이며, 이상적으로는 실행 가능한 코드로 뒷받침되어야 합니다.

저는 이런 해결책을 여러 방식으로 모아둡니다. 제 [블로그](https://simonwillison.net/)와 [TIL 블로그](https://til.simonwillison.net/)에는 제가 어떻게 하는지 알아낸 것들에 대한 노트가 빼곡합니다. [천 개가 넘는 GitHub 저장소](https://github.com/simonw)에는 다양한 프로젝트를 위해 작성한 코드가 모여 있으며, 그중 많은 것이 핵심 아이디어를 보여주는 소규모 개념 증명입니다.

최근에는 LLM을 활용해 흥미로운 문제에 대한 코드 솔루션 컬렉션을 더 넓히고 있습니다.

[tools.simonwillison.net](https://tools.simonwillison.net/)은 LLM으로 만든 도구와 프로토타입 중 가장 큰 모음입니다. 여기에 제가 [HTML 도구](https://simonwillison.net/2025/Dec/10/html-tools/)라고 부르는 것들을 모읍니다. JavaScript와 CSS를 내장한 단일 HTML 페이지로, 특정 문제를 해결합니다.

제 [simonw/research](https://github.com/simonw/research) 저장소에는 코딩 에이전트에게 문제를 조사하고 동작하는 코드와 발견한 내용을 정리한 보고서를 가져오도록 도전한, 더 크고 복잡한 예제들이 있습니다.

## 모아둔 것들을 재조합하기

이 모든 것을 왜 모을까요? 자신의 능력을 구축하고 확장하는 데 도움이 되는 것 외에도, 그 과정에서 생성하는 자산들은 코딩 에이전트에 대한 엄청나게 강력한 입력이 됩니다.

제가 가장 좋아하는 프롬프팅 패턴 중 하나는 에이전트에게 두 개 이상의 기존 동작 예제를 조합해서 새로운 것을 만들라고 지시하는 것입니다.

이것이 얼마나 효과적인지 결정적으로 느끼게 해준 프로젝트는 제 도구 컬렉션에 처음 추가한 브라우저 기반 [OCR 도구](https://tools.simonwillison.net/ocr)였습니다([자세한 설명](https://simonwillison.net/2024/Mar/30/ocr-pdfs-images/)).

저는 PDF 파일의 페이지를 OCR 처리하는 간편한 브라우저 기반 도구를 원했습니다. 특히 텍스트 버전 없이 스캔 이미지로만 구성된 PDF를 대상으로 했습니다.

이전에 브라우저에서 [Tesseract.js OCR 라이브러리](https://tesseract.projectnaptha.com/)를 실행하는 실험을 해본 적이 있었고, 매우 뛰어나다는 것을 확인했습니다. 이 라이브러리는 성숙한 Tesseract OCR 엔진의 WebAssembly 빌드를 제공하며, JavaScript에서 호출해 이미지에서 텍스트를 추출할 수 있게 해줍니다.

하지만 이미지가 아니라 PDF로 작업하고 싶었습니다. 그때 Mozilla의 [PDF.js](https://mozilla.github.io/pdf.js/) 라이브러리도 사용해본 적이 있다는 것을 떠올렸습니다. 이 라이브러리는 PDF의 개별 페이지를 렌더링된 이미지로 변환하는 등의 기능을 제공합니다.

두 라이브러리에 대한 JavaScript 스니펫이 제 노트에 있었습니다.

다음은 두 예제를 조합하고 원하는 솔루션을 설명해서 모델(당시 Claude 3 Opus)에 전달한 전체 프롬프트입니다:

> This code shows how to open a PDF and turn it into an image per page:
>
> ```html
> <!DOCTYPE html>
> <html>
> <head>
>   <title>PDF to Images</title>
>   <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.min.js"></script>
>   <style>
>     .image-container img {
>       margin-bottom: 10px;
>     }
>     .image-container p {
>       margin: 0;
>       font-size: 14px;
>       color: #888;
>     }
>   </style>
> </head>
> <body>
>   <input type="file" id="fileInput" accept=".pdf" />
>   <div class="image-container"></div>
>
>   <script>
>   const desiredWidth = 800;
>     const fileInput = document.getElementById('fileInput');
>     const imageContainer = document.querySelector('.image-container');
>
>     fileInput.addEventListener('change', handleFileUpload);
>
>     pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.worker.min.js';
>
>     async function handleFileUpload(event) {
>       const file = event.target.files[0];
>       const imageIterator = convertPDFToImages(file);
>
>       for await (const { imageURL, size } of imageIterator) {
>         const imgElement = document.createElement('img');
>         imgElement.src = imageURL;
>         imageContainer.appendChild(imgElement);
>
>         const sizeElement = document.createElement('p');
>         sizeElement.textContent = `Size: ${formatSize(size)}`;
>         imageContainer.appendChild(sizeElement);
>       }
>     }
>
>     async function* convertPDFToImages(file) {
>       try {
>         const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
>         const numPages = pdf.numPages;
>
>         for (let i = 1; i <= numPages; i++) {
>           const page = await pdf.getPage(i);
>           const viewport = page.getViewport({ scale: 1 });
>           const canvas = document.createElement('canvas');
>           const context = canvas.getContext('2d');
>           canvas.width = desiredWidth;
>           canvas.height = (desiredWidth / viewport.width) * viewport.height;
>           const renderContext = {
>             canvasContext: context,
>             viewport: page.getViewport({ scale: desiredWidth / viewport.width }),
>           };
>           await page.render(renderContext).promise;
>           const imageURL = canvas.toDataURL('image/jpeg', 0.8);
>           const size = calculateSize(imageURL);
>           yield { imageURL, size };
>         }
>       } catch (error) {
>         console.error('Error:', error);
>       }
>     }
>
>     function calculateSize(imageURL) {
>       const base64Length = imageURL.length - 'data:image/jpeg;base64,'.length;
>       const sizeInBytes = Math.ceil(base64Length * 0.75);
>       return sizeInBytes;
>     }
>
>     function formatSize(size) {
>       const sizeInKB = (size / 1024).toFixed(2);
>       return `${sizeInKB} KB`;
>     }
>   </script>
> </body>
> </html>
> ```
>
> This code shows how to OCR an image:
>
> ```js
> async function ocrMissingAltText() {
>     // Load Tesseract
>     var s = document.createElement("script");
>     s.src = "https://unpkg.com/tesseract.js@v2.1.0/dist/tesseract.min.js";
>     document.head.appendChild(s);
>
>     s.onload = async () => {
>       const images = document.getElementsByTagName("img");
>       const worker = Tesseract.createWorker();
>       await worker.load();
>       await worker.loadLanguage("eng");
>       await worker.initialize("eng");
>       ocrButton.innerText = "Running OCR...";
>
>       // Iterate through all the images in the output div
>       for (const img of images) {
>         const altTextarea = img.parentNode.querySelector(".textarea-alt");
>         // Check if the alt textarea is empty
>         if (altTextarea.value === "") {
>           const imageUrl = img.src;
>           var {
>             data: { text },
>           } = await worker.recognize(imageUrl);
>           altTextarea.value = text; // Set the OCR result to the alt textarea
>           progressBar.value += 1;
>         }
>       }
>
>       await worker.terminate();
>       ocrButton.innerText = "OCR complete";
>     };
>   }
> ```
>
> Use these examples to put together a single HTML page with embedded HTML and CSS and JavaScript that provides a big square which users can drag and drop a PDF file onto and when they do that the PDF has every page converted to a JPEG and shown below on the page, then OCR is run with tesseract and the results are shown in textarea blocks below each image.

이것은 완벽하게 동작했습니다! 모델은 제가 필요로 했던 것을 정확히 하는 개념 증명 페이지를 만들어냈습니다.

최종 결과를 얻기까지 [몇 번 반복](https://gist.github.com/simonw/6a9f077bf8db616e44893a24ae1d36eb)했지만, 그 이후로 계속 유용하게 쓰고 있는 진짜 쓸모 있는 도구를 만드는 데 몇 분밖에 걸리지 않았습니다.

## 코딩 에이전트가 이를 더 강력하게 만든다

저 OCR 예제는 Claude Code 첫 출시보다 거의 1년 전인 2024년 3월에 만들었습니다. 코딩 에이전트는 동작하는 예제를 모아두는 것을 훨씬 더 가치 있게 만들었습니다.

코딩 에이전트가 인터넷에 접근할 수 있다면 이런 식으로 지시할 수 있습니다:

> Use curl to fetch the source of `https://tools.simonwillison.net/ocr` and `https://tools.simonwillison.net/gemini-bbox` and build a new tool that lets you select a page from a PDF and pass it to Gemini to return bounding boxes for illustrations on that page.

(여기서 `curl`을 지정한 이유는 Claude Code가 기본적으로 페이지 내용을 요약하는 WebFetch 도구를 사용하기 때문이며, 원시 HTML을 반환하지 않기 때문입니다.)

코딩 에이전트는 검색에 뛰어나므로, 자신의 머신에서 실행하면서 원하는 작업의 예제를 어디서 찾을 수 있는지 알려줄 수 있습니다:

> Add mocked HTTP tests to the `~/dev/ecosystem/datasette-oauth` project inspired by how `~/dev/ecosystem/llm-mistral` is doing it.

대부분의 경우 이것으로 충분합니다. 에이전트가 검색 하위 에이전트를 띄워 조사하고, 작업을 수행하는 데 필요한 세부 정보만 가져옵니다.

제 연구 코드의 상당수가 공개되어 있기 때문에, 코딩 에이전트에게 제 저장소를 `/tmp`에 클론해서 입력으로 사용하라고 지시하기도 합니다:

> Clone `simonw/research` from GitHub to `/tmp` and find examples of compiling Rust to WebAssembly, then use that to build a demo HTML page for this project.

여기서 핵심 아이디어는 코딩 에이전트 덕분에 유용한 트릭을 _한 번만_ 알아내면 된다는 것입니다. 그 트릭이 동작하는 코드 예제와 함께 어딘가에 문서화되어 있다면, 에이전트가 그 예제를 참고해서 앞으로 비슷한 형태의 모든 프로젝트를 해결할 수 있습니다.

---
Source: https://simonwillison.net/guides/agentic-engineering-patterns/hoard-things-you-know-how-to-do/
