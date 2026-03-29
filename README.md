<div align="right">
  🇺🇸 English | <a href="README.ko.md">🇰🇷 한국어</a>
</div>

<div align="center">
  <h1>Agentic Engineering Patterns</h1>
  <p><em>Practical patterns for amplifying software engineering discipline with coding agents</em></p>

  <a href="https://simonwillison.net/guides/agentic-engineering-patterns/"><img src="https://img.shields.io/badge/Author-Simon_Willison-blue" alt="Author: Simon Willison"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-CC0-lightgrey" alt="License: CC0"></a>
  <img src="https://img.shields.io/badge/Language-English-orange" alt="Language: English">

  <br><br>

  > Writing code is much cheaper than before, but producing reliable software is still hard.

</div>

---

🧠 Amplify Discipline · 🛠️ Practical Patterns · 🔄 Continuous Updates · 📖 Living Guide

## About the Project

This repository curates and organizes practical patterns for building software with coding agents such as Claude Code and OpenAI Codex, based on Simon Willison's **"Agentic Engineering Patterns"** guide.

Agentic Engineering is different from "vibe coding" where you hand everything over to AI. This guide focuses on how professional software engineers can use coding agents to **amplify** their existing engineering discipline, rather than bypassing it.

## Core Guidelines

The documents in this repository are structured as a living guide made of chapter-style documents that will be updated as the field evolves.

| Chapter | Topic | Description |
|---------|-------|-------------|
| **1. Principles** | Fundamentals of Agentic Engineering | New intuitions for an era of cheap code and anti-patterns to avoid |
| **2. Working with Agents** | Coding Agent Practices | How agents work, using them with Git, and subagents |
| **3. Testing and QA** | Ensuring Reliability | Red/green TDD, test-first approach, and agentic manual testing |
| **4. Understanding Code** | Handling Legacy & Complexity | Code analysis through linear walkthroughs and interactive explanations |
| **5. Annotated Prompts** | Real-world Use Cases | Building an optimization tool with annotated real prompts |
| **6. Appendix** | Reusable Prompts | Curated prompts for artifacts, proofreading, and alt text |

For more details, check out the [Agentic Engineering Patterns intro](./docs/en/00-agentic-engineering-patterns-intro.md).

## Table of Contents

The full guide is structured as follows. Click the links to view the English documents.

### 1. Principles
- [What is agentic engineering?](./docs/en/01-principles/01-what-is-agentic-engineering.md)
- [Writing code is cheap now](./docs/en/01-principles/02-writing-code-is-cheap-now.md)
- [Hoard things you know how to do](./docs/en/01-principles/03-hoard-things-you-know-how-to-do.md)
- [AI should help us produce better code](./docs/en/01-principles/04-ai-should-help-us-produce-better-code.md)
- [Anti-patterns: things to avoid](./docs/en/01-principles/05-anti-patterns-things-to-avoid.md)

### 2. Working with coding agents
- [How coding agents work](./docs/en/02-working-with-coding-agents/01-how-coding-agents-work.md)
- [Using Git with coding agents](./docs/en/02-working-with-coding-agents/02-using-git-with-coding-agents.md)
- [Subagents](./docs/en/02-working-with-coding-agents/03-subagents.md)

### 3. Testing and QA
- [Red/green TDD](./docs/en/03-testing-and-qa/01-red-green-tdd.md)
- [First run the tests](./docs/en/03-testing-and-qa/02-first-run-the-tests.md)
- [Agentic manual testing](./docs/en/03-testing-and-qa/03-agentic-manual-testing.md)

### 4. Understanding code
- [Linear walkthroughs](./docs/en/04-understanding-code/01-linear-walkthroughs.md)
- [Interactive explanations](./docs/en/04-understanding-code/02-interactive-explanations.md)

### 5. Annotated prompts
- [GIF optimization tool using WebAssembly and Gifsicle](./docs/en/05-annotated-prompts/01-gif-optimization-tool-using-webassembly-and-gifsicle.md)

### 6. Appendix
- [Prompts I use](./docs/en/06-appendix/01-prompts-i-use.md)

## Project Structure & Management

This repository uses `toc.yml` as the Single Source of Truth to manage the document structure.

```bash
├── toc.yml                 # Defines the overall table of contents
├── scripts/
│   └── render_toc.rb       # Script to generate README from toc.yml
└── docs/
    ├── en/                 # English original documents
    └── ko/                 # Korean translated documents
```

To change the TOC structure, edit `toc.yml` and run the following command to regenerate the README files.

```bash
ruby scripts/render_toc.rb
```

## Source & License

- **Original Guide**: [Agentic Engineering Patterns](https://simonwillison.net/guides/agentic-engineering-patterns/) by Simon Willison
- **License**: The content in this repository is distributed into the public domain under the [CC0 (Creative Commons Zero v1.0 Universal)](LICENSE) license.
- **Last synced**: 2026-03-29
