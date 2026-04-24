---
title: "Test, Measure, Learn: What Agile Testing Metrics Can Teach You about Your Testing Process"
description: "Test, Measure, Learn: What Agile Testing Metrics Can Teach You about Your Testing Process"
pubDate: 2025-01-28
author: "Sealights.io"
categories:
  - "qa"
displayCategory: "Software QA"
image: "/images/blogs/6ccce51822_679951bcf2137d56a87a1d57_software-qa-test-result-oursky.png"
draft: false
webflowId: "679951e1e5c70fc684f7ffe8"
---

![agile testing CI](/images/blogs/b2501db29f_679951c63ab5547d30730798_software-qa-test-result-oursky-720x389.png)

_This is a guest contribution by Limor, a technical writer and editor with over ten years’ experience writing technical documentation for developer tools and SaaS technologies. She specializes in software development and the Agile methodology, computer/network security, middleware, and cloud technologies._

Agile testing refers to a paradigm shift in software testing influenced by teams using an Agile development approach. First written in 2001 by seventeen software experts, the [_Agile manifesto_](https://www.agilealliance.org/agile101/12-principles-behind-the-agile-manifesto/) established a new way of developing and testing applications, moving to a cross-functional approach in which everyone is responsible for quality, not just QA teams.

In fact, **the QA team doesn’t work independently in Agile** —testing is an embedded practice within the wider Agile development team. Both testers and developers work together to release high-quality software faster and more frequently.

Some best practices for Agile testing include:

*   Increased test automation for quicker feedback on applications
*   Automated regression testing to support the iterative fast-paced Agile development approach
*   Defined testing strategy from the outset
*   Collaboration between developers and testers
*   Testing completion within the sprint cycle (iteration).
*   Use of Agile testing metrics

This post focuses on Agile testing metrics ([_see this learning section_](https://www.sealights.io/test-metrics/agile-testing-metrics/) by SeaLights for a broad list of testing metrics relevant to Agile teams). It’s crucial that Agile teams shift their focus to measurements relevant in Agile (for example, individual metrics such as the number of test cases executed per tester are not applicable to a cross-functional team).

Test metrics provide a way of improving testing efforts, however, no single metric is perfect. Below are some examples of Agile testing metrics and how they can help your team improve its testing efforts and the quality of software you develop.

## **Agile Testing Metrics**

### **Cyclomatic Complexity**

**Definition**: Cyclomatic complexity is a measure of the number of linearly independent paths through a section of source code.  

![agile testing software qa](/images/blogs/0f8b90e941_679951c67db63d8307a1f861_8.-Cyclomatic-Complexity.jpeg)

Cyclomatic complexity targets — Image from Sealights.io

**How It Can Help**: Cyclomatic complexity is a useful metric to determine the level of risk inherent in a codebase. Software defects post-release are very costly to fix, and the higher the complexity, the greater the chance of something going wrong with the application.

The original developer of this metric, Thomas J. McCabe, proposed that a [_cyclomatic complexity_](http://www.mccabe.com/pdf/mccabe-nist235r.pdf) exceeding ten represents a significant risk, and that teams should split modules of code exceeding 10 CC into smaller modules. The prevailing modern thought is that 15 is a more realistic and acceptable level of complexity.

**How It’s Measured**: Code analyzer tools such as CCCC or Eclipse Metriculator can calculate cyclomatic complexity.

Editor notes: Developers at Oursky have also used [Lizard](http://www.lizard.ws/) and [ESLint](https://eslint.org/docs/rules/complexity) (ESLint is for JavaScript and JSX only, but has additional features to checking cyclomatic complexity).

### **Automation Progress**

![agile testing automation software qa](/images/blogs/04532950c3_679951c6ef69509e8dc274a6_7.-Automation.jpeg)

Benefits of QA testing automation Image from Sealights.io

**Definition**: A metric calculating how many test cases have been automated at a given time.

**How it can help**: Agile requires fast software releases with quicker testing efforts—increased test automation is at the heart of this. The goal is to automate all possible test cases because automation maintains agility and consistency. It is, however, equally important to know when to not to automate a test, such as for one-off “edge” cases.

Automation begins on day one in an Agile team, at the same time as development, so immediate measurement of automation is advisable.

**How it’s measured**: (# of automated test cases) / (total # of automatable test cases)

### Percent of Automated Test Coverage

**Definition:** A calculation of the percentage of test coverage achieved by test automation out of the total code coverage.

**How it can help**: Projects differ in terms of specific automation goals. There is no “one-size-fits-all” automation coverage percentage that teams should aim for. However, it’s important to automate as many tests as possible, and this metric provides a way of checking the progression of an automation initiative.

It’s important to remember, though, that a larger percentage of coverage achieved by automation doesn’t tell you anything about the quality of those tests.

**How it’s measured:** (Automation coverage) / (total coverage that includes measured as lines of code (KLOC) or functions points (FP))

### **Escaped Defects**

![software development qa best practices](/images/blogs/a71c16f05a_679951c60f76d341d9b14ed9_9.-Escaped-Defects-over-Time.jpeg)

Image from Sealights.io

**Definition**: Software defects that customers find after the software’s release date.

**How it can help**: It’s helpful to analyze escaped defects to find out the root cause of these defects and improve upon testing efforts. For example, you can analyze an iteration with an abnormally high escaped defect count and see whether there were issues with complexity, development, or software tests for that iteration.

**How it’s measured**: # of defects reported by software users post-release

## Additional thoughts on software testing

Despite the usefulness of metrics in Agile teams, viewing metrics in isolation does not give the full picture. A holistic measurement of software testing that integrates these quality metrics in one centralized dashboard better reflects test quality and code quality.

Aside from traditional scripted testing approaches, teams should conduct exploratory testing, which involves simultaneous test design and test execution.

The idea behind exploratory testing is that it makes use of human intelligence to find real issues with software that automated or manual scripted tests might miss. Balancing exploratory testing with scripted testing leads to a deeper, fuller testing effort for a given project.

Agile testing metrics are invaluable for getting actionable insights on software testing personnel, processes, and strategies, which you can use to ensure testing stays up to speed with development to meet Agile aims.

‍
