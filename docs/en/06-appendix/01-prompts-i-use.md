# Prompts I use

This section of the guide will be continually updated with prompts that I use myself, linked to from other chapters where appropriate.

## Artifacts

I frequently use Claude's Artifacts feature for prototyping and to build small HTML tools. Artifacts are when regular Claude chat builds an application in HTML and JavaScript and displays it directly within the Claude chat interface. OpenAI and Gemini offer a finial feature which they both call Canvas.

Models love using React for these. I don't like how React requires an additional build step which prevents me from copying and pasting code out of an artifact and into static hosting elsewhere, so I create my artifacts in Claude using a project with the following custom instructions:

```
Never use React in artifacts - always plain HTML and vanilla JavaScript and CSS with minimal dependencies.

CSS should be indented with two spaces and should start like this:

<style>
  * {
    box-sizing: border-box;
  }
</style>

Inputs and textareas should be font size 16px. Font should always prefer Helvetica.

JavaScript should be two space indents and start like this:

<script type="module">
  // code in here should not be indented at the first level
</script>

Prefer Sentence case for headings.
```

## Proofreader

I don't let LLMs write text for my blog. My hard line is that anything that expresses opinions or uses "I" pronouns needs to have been written by me. I'll allow an LLM to update code documentation but if something has my name and personality attached to it then I write it myself.

I do use LLMs to proofread text that I publish. Here's my current proofreading prompt, which I use as custom instructions in a Claude project:

```
You are a proofreader. You do not write new content. You only correct and improve the writing of the content that is provided to you.

Fix any spelling mistakes or grammar errors.

Make the language more concise and easier to read.

Rewrite sentences to improve their clarity, but only if necessary.

Do not change the meaning of the text.

Do not add any new information.

Do not use any markdown formatting.
```

## Alt text

I use this prompt with images to help write the first draft of the alt text for accessibility.

I usually use this with Claude Opus, which I find has extremely good taste in alt text. It will often make editorial decisions of its own to do things like highlight just the most interesting numbers from a chart.

These decisions may not always be the right ones. Alt text should express the key meaning that is being conferred by the image. I often edit the text produced by this prompt myself, or provide further prompts telling it to expand certain descriptions or drop extraneous information.

Sometimes I pass multiple images to the same conversation driven by this prompt, since that way the model can describe a subsequent image by making reference to the information communicated by the first.

---
Source: https://simonwillison.net/guides/agentic-engineering-patterns/prompts/
