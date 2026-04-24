---
title: "The New Era of E2E Test Automation: Faster, Cheaper, and More Accessible"
description: "Learn how to use AI tools to help create End-to-end (E2E) test automation, and create test scripts with Cursor AI"
pubDate: 2025-01-28
author: "Joyz Ng"
categories:
  - "qa"
  - "machine-learning-and-ai"
displayCategory: "Test Automation"
image: "/images/blogs/6590ffe387_66e7b17a8935e3e5cd466add_cover_img.png"
featured: 1
draft: false
webflowId: "66e7b89177d7d990d1fc049b"
---

End-to-end (E2E) test automation has long been a critical component of software quality assurance. Traditionally, when comparing automated testing with manual testing, factors such as coverage, limitations, and cost have been the primary focus. However, the landscape is changing rapidly, and it's time to reassess the value proposition of E2E test automation.

## Overcoming the Cost Hurdle

One of the main hesitations in adopting E2E test automation has been the perceived high cost. Many organizations believe that implementing robust automated testing requires significant investment in tools, infrastructure, and skilled personnel. This perception has led to a misconception that E2E test automation is only for "rich product owners." But what if we told you that this is no longer the case?

## Enter Cursor: A Game-Changer in AI Code Editing

[Cursor](https://www.cursor.com/) is one of the tools that changes the way we approach coding and test automation. As an AI-powered code editor, it offers significant advantages over traditional tools like [Visual Studio Code](https://code.visualstudio.com/) and even surpasses the capabilities of [GitHub Copilot](https://github.com/features/copilot) in some areas like its powerful autocomplete. Cursor's intelligent code suggestions and automated refactoring capabilities make it a competitive handy asset for test automation engineers.

![\_\_wf\_reserved\_inherit](/images/blogs/c09f4738f2_66e7b89077d7d990d1fc03a9_66e7b2518935e3e5cd473479_cursor.png)

Cursor AI Code Editor

## Choosing Your Test Framework and Language

Before diving into the practical aspects, it's essential to select the right test framework and language for your project. For web applications, popular choices include:

*   [Playwright](https://playwright.dev/)
*   [Selenium](https://www.selenium.dev/)
*   [Cypress](https://www.cypress.io/)

These frameworks support various programming languages, with Python and Node.js being common choices. For mobile applications, [Appium](https://appium.io/docs/en/latest/) is a popular option that supports multiple languages as well.

## Speedrun a Test Script with Cursor

Let's walk through a practical example of how Cursor can help you create an E2E test case using Playwright, [Pytest](https://docs.pytest.org/en/stable/), and [Allure Report](https://allurereport.org/) in just 5 minutes:

1.  Create a virtual environment in Python
2.  Use Cursor to guide you through installing required packages
3.  Generate raw Playwright script by Playwright Inspector using `playwright codegen`
4.  Click through the test flow once and copy the generated code
5.  Create a test script file and paste the generated code
6.  Ask Cursor to refactor the code to Playwright Pytest with best practices
7.  Run the test using `pytest --headed` to verify the updated script
8.  Debug with Cursor or edit any steps as needed
9.  Use Cursor to add Allure report steps
10.  Run the test script and generate the HTML report using Allure functions

![\_\_wf\_reserved\_inherit](/images/blogs/620b837b1c_66e7b89077d7d990d1fc0391_66e7b69313e49eb0913d4b42_Screenshot%202024-09-15%20at%209.09.28%E2%80%AFPM.png)

Ask AI how to install packages

![\_\_wf\_reserved\_inherit](/images/blogs/a89d459996_66e7b89077d7d990d1fc03a3_66e7b78de5ee5f8722be0d5f_Screenshot%202024-09-15%20at%209.14.05%E2%80%AFPM.png)

Generate first script by Playwright Inspector

![\_\_wf\_reserved\_inherit](/images/blogs/7437cfa916_66e7b89077d7d990d1fc03ba_66e7b7ed297c80a6f1936aec_Screenshot%202024-09-15%20at%209.17.31%E2%80%AFPM.png)

Ask AI to refactor code

![\_\_wf\_reserved\_inherit](/images/blogs/e14ae8f7b0_66e7b89077d7d990d1fc03a6_66e7b81967df6605bbb671ee_Screenshot%202024-09-15%20at%209.24.18%E2%80%AFPM.png)

Ask AI to add allure report code

![\_\_wf\_reserved\_inherit](/images/blogs/de6557eb50_66e7b89077d7d990d1fc0394_66e7b87732f03348aa1172ed_pass_example.png)

Allure Report Sample

## The New Economics of Test Automation

With the development of LLM and AI-powered tools, the efficiency of creating and maintaining E2E tests is dramatically improved. This shift in productivity translates to significantly lower costs, making test automation accessible to a broader range of organizations and projects. No longer is E2E test automation the exclusive domain of well-funded enterprises – it's now within reach for startups, small teams, and budget-conscious projects.

## Looking Ahead: The Future of E2E Testing

As we embrace these new tools and methodologies, it's important to focus on the following areas to maximize the benefits of E2E test automation:

1.  **Test Stability and Maintenance**: Develop strategies to create more robust tests that require less maintenance over time.
2.  **Test Script Quality**: Leverage AI tools to improve the overall quality and readability of test scripts.
3.  **Enhanced Test Case Design**: Use the time saved on script creation to focus on designing more comprehensive and effective test cases.
4.  **Manual Testing Complementarity**: Allocate more resources to exploratory and user experience-focused manual testing, complementing the automated suite.

By focusing on these areas, teams can create a more balanced and effective testing strategy that combines the strengths of both automated and manual approaches.

In conclusion, the landscape of E2E test automation is evolving rapidly. With tools like Cursor, we're entering an era where high-quality test automation is accessible to all, regardless of budget constraints. It's time to embrace these new possibilities and elevate your testing practices to new heights.

‍

_At the heart of Oursky is the art of software engineering: translating ideas into opportunities. We work with startups in bringing their ideas to life with the right blend of people, process, and technology — from MVP development to scalable digital products powered by the latest technologies._ [_Schedule a no-commitment consultation with us_](https://oursky.com/contact) _and we can explore how to creatively harness the digital space to solve real-world problems._
