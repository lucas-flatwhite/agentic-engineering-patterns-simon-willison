# Red/green TDD

"**Use red/green TDD**" is a pleasingly succinct way to get better results out of a coding agent.

TDD stands for Test Driven Development. It's a programming style where you ensure every piece of code you write is accompanied by automated tests that demonstrate the code works.

The most disciplined form of TDD is test-first development. You write the automated tests first, confirm that they fail, then iterate on the implementation until the tests pass.

This turns out to be a _fantastic_ fit for coding agents. A significant risk with coding agents is that they might write code that doesn't work, or build code that is unnecessary and never gets used, or both.

Test-first development helps protect against both of these common mistakes, and also ensures a robust automated test suite that protects against future regressions. As projects grow the chance that a new change might break an existing feature grows with them. A comprehensive test suite is by far the most effective way to keep those features working.

It's important to confirm that the tests fail before implementing the code to make them pass. If you skip that step you risk building a test that passes already, hence failing to exercise and confirm your new implementation.

That's what "red/green" means: the red phase watches the tests fail, then the green phase confirms that they now pass.

Every good model understands "red/green TDD" as a shorthand for the much longer "use test driven development, write the tests first, confirm that the tests fail before you implement the change that gets them to pass".

Example prompt:

> Build a Python function to extract headers from a markdown string. Use red/green TDD.

Here's what I got [from Claude](https://claude.ai/share/2b9b952a-149b-4864-afb0-46f59b90b458) and [from ChatGPT](https://chatgpt.com/share/699beb6f-adc8-8006-a706-6bbfdcdca538). Normally I would use a coding agent like Claude Code or OpenAI Codex, but this example is simple enough that both Claude and ChatGPT can implement it using their default code environments.

(I did have to append "Use your code environment" to the ChatGPT prompt. When I tried without that it wrote the code and tests without actually executing them.)

---
Source: https://simonwillison.net/guides/agentic-engineering-patterns/red-green-tdd/
