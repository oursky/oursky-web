---
title: "Performing Exploratory Testing: Improving Your App with Crowdsourced QA"
description: "Performing Exploratory Testing: Improving Your App with Crowdsourced QA"
pubDate: 2025-01-28
author: "Oursky"
categories:
  - "qa"
displayCategory: "Software QA"
image: "/images/blogs/aefdbc7a06_679957d04779025b7e265017_1S-KcVsKM2Jui-dodKJUTUA.webp"
draft: false
webflowId: "679957e3fe53167067980e33"
---

Whenever a client wants Oursky to take over an existing app or software, we always recommend [performing exploratory testing and codebase review](https://blog.oursky.com/2020/12/21/exploratory-testing-and-code-review-why-theyre-important-when-changing-software-outsourcing-vendors/) first before tinkering with it.

Over time, we’ve built a standalone service around agile testing and software diagnosis. These software testing services, which include exploratory testing, takes snapshots of the digital product’s codebase and existing issues. Source code review is a critical element in ensuring software quality (QA). This is especially important for companies who are outsourcing developers or third-party teams or changing to a new software vendor.

Let’s assume that your development team already follows best practices such as:

*   Performing code reviews before pull requests are merged into the main branch
*   Having [quality commits](https://blog.oursky.com/2017/11/17/care-commit-quality/) that are readable for the tech lead and future team members
*   Conducting [automated tests with continuous integration](https://code.oursky.com/catch-bugs-systematically-build-gitlab-ci-testing-pipeline-4-steps/) (such as [integrating to Slack](https://code.oursky.com/human-and-cat-friendly-chatops/))

Software quality assurance is not a function, but a baked-in approach to software development that adopts best practices. Here, we’ll dig deeper into exploratory testing: why they’re important, how it figures into software design, and how Oursky conducts this important step in the software development process.

# What is exploratory testing?

As its moniker suggests, exploratory testing is an approach to software testing that focuses on discovery. The QA tester understands and uses different personas who would most likely use the app or software (or user stories) and uncover and document issues and potential bugs.

Exploratory testing fits neatly into the agile software development life cycle and is widely adopted by Agile teams because they follow similar principles. It’s a simultaneous and iterative process of discovering, investigating, and learning how the software or app works, testing their functionalities, and finding issues that may have been otherwise overlooked by scripted testing.

Unlike scripted testing, exploratory testing doesn’t restrict a QA tester to predefined checklists or instructions, and instead encourages flexibility in observing, evaluating, and reporting the digital product’s behaviors and issues.

![Oursky tech working style](/images/blogs/226c554507_679957c8063a385bb45c369c_1S-KcVsKM2Jui-dodKJUTUA.png)

A SNAPSHOT OF THE COMPONENTS THAT CONTRIBUTE TO SOFTWARE QUALITY ASSURANCE AT OURSKY

## How Exploratory Testing Figures into the Software Testing Life Cycle

Exploratory testing is usually better for consumer-facing apps that can be tested “exploratorily”. These tests can take place after a new build is completed and before it is shipped. Exploratory testing is for product usability to complement the automated tests with continuous integration that check for errors.

Exploratory tests usually come in for two scenarios in Oursky:

*   **Scheduled by a project manager (PM) after a new build.** This is built into a project management process or workflow for an existing project.
*   **Performed for a client with an existing digital product.** This could be part of our standalone software testing services when clients have digital products built by a third-party development team and would want us to review the existing codebase, make changes to the existing product, or take over the whole project.

![skygear gitlab software qa testing](/images/blogs/6110e2e685_679957c91400b35535238ac1_Oursky-Exploratory-Test-QA-Gitlab-Report-720x334.png)

A SCREENSHOT SHOWING HOW WE TRACK BUGS FOR OUR OWN PROJECTS, INCLUDING OUR OPEN-SOURCE SERVERLESS BACK END PLATFORM

## How Exploratory Testing Helps Before Working on Existing Apps or Software

Oursky began offering standalone software testing services from the vantage point that it’s a [good practice to examine an app created by a third party](https://blog.oursky.com/2020/12/21/exploratory-testing-and-code-review-why-theyre-important-when-changing-software-outsourcing-vendors/). This helps us understand the scope of work before providing estimations or timelines to a client.

The goal with software diagnosis is to provide our client with enough information to make informed decisions about how to proceed with their digital product. It also clearly documents pre-existing issues before our own development team takes over a project.

Our software testing services delivers a report to the client. This report is a snapshot of the quality of the existing codebase and a list of existing bug reports and issues. Where appropriate, notes or suggestions are made about the existing software architecture that could cause problems down the line when the product scales.

The report has two main sections:

1.  [**Codebase review**](https://blog.oursky.com/2020/12/21/exploratory-testing-and-code-review-why-theyre-important-when-changing-software-outsourcing-vendors/) — This involves assessing the quality of the codebase and checking whether it is easy to understand and good enough to maintain or build upon.
2.  **Exploratory testing** — This entails documenting major, minor, trivial bugs in the existing digital product to understand what needs to be fixed before proceeding with development. This helps clear confusion if there are future bugs.

Depending on the size of a product and quality of documentation, the review could take a few days to two weeks for huge projects.

![code review service hong kong](/images/blogs/7e1e2e23e1_679957c8aaa47ef20a34bbea_Oursky-Exploratory-test-software-QA-720x314.png)

OURSKY’S EXPLORATORY TESTS DIVIDE ISSUES INTO MAJOR, MINOR, AND TRIVIAL BUGS.

# How Oursky Performs Exploratory Testing

The objective of exploratory testing (and even general software QA) is to find as many bugs and usability issues as possible within a specified period of time. Depending on the timeline agreed upon with a client, the scope of work may or may not cover the entire app. The main goal is to provide a clear picture of the number and degree of severity of defects in different parts of the app or software.

For example, in one software testing case with a client, we had 100+ issues reported overnight by our Skytesters (testers that Oursky’s QA team manages). This meant that Oursky’s QA team had to retest and edit all reported bugs within 48 hours. Ultimately, 60-70 reasonable issues were accepted.

## Oursky’s Process for Conducting Exploratory Testing:

1.  **Kick-off Meeting: QA team meets with the Sales and PM teams to give the software testing team clear briefing instructions.**
    1.  Quick demo of the product features
    2.  Questions about testing setup
        *   How should testing accounts be created? Is there any special workflow at the registration?
        *   Any testing for credit cards or billing accounts?
    3.  Questions about expected exception handling
        *   Any loading state between pages / before data is loaded?
        *   What are the expected behaviors if users click on a button that’s supposed to be available only to logged-in users?
        *   What happens if the users kill the session and restore, such as closing the browsers or reopening the app?
        *   Does the website support mobile view or responsive design?
    4.  Confirm the schedule and scope
        *   How many platforms need to be tested?
        *   Around how many testers should be invited to join the test?
        *   When will the testing environment be set up and ready?
        *   When is the deadline for submitting the test report to the client?
        *   Does the website support mobile view or responsive design?
2.  **Invite Testers: Invite and confirm remote testers who are suitable to join this test**
    *   Based on client’s budget and urgency
3.  **Planning: Draft and send testing guidelines to the testers, which include the following:**
    *   Test run information (e.g., date, time, platform, app version, etc.)
    *   Instructions on how to report issues
    *   Checklist of app features
    *   Any special points to note
    *   Any known and existing issues
4.  **Test Run: Testers report any issues they find and retest each other’s issues to raise accuracy in a fixed time period**
5.  **Review: Testers stop reporting and test manager does the following:**
    1.  Review and edit the issues reported.
    2.  Filter out issues that are duplicates, too trivial, or issues created due to improper use.
    3.  Make sure that the issues are reproducible according to the given steps.
    4.  Double check the issue type and make sure severity is properly labelled.
6.  **Report: Generate a test report in PDF format from the list of issues**
    1.  Create an index page listing the issues in different sections and sort by severity.
    2.  To be clear, print each issue in a separate page.

Since the severity of defects on different sections are clearly listed on the report, the PM can easily scan the document and further discuss with the client about fixing the major issues before proceeding to adding new features. This meeting may seem like a small step, but it is crucial because it prevents the development schedule from being delayed due to unknown major issues that may arise after all the planning is done. Of course, the client will also receive the full report and can take the report to meet with any [app vendors they choose](https://blog.oursky.com/2020/08/19/a-definitive-guide-for-startup-founders-to-choosing-software-development-agencies/).

![gitlab ci software qa](/images/blogs/aefff3e273_679957c809f41a233c80d2a8_Oursky-Exploratory-Test-QA-Screen-Shot-2018-03-16-at-4.37.37-PM-720x687.webp)

ALL BUG REPORTS BY TESTERS SHOULD INCLUDE SCREENSHOTS AND DETAILED INSTRUCTIONS.

# Software Testing Life Cycle: How Issues are Reported

Oursky manages a team of regular testers who are pre-screened and audited for performance. Testers are paid a base salary for each test run and each new **accepted** issue are verified by the QA team to avoid duplicates. Testers can also re-test issues to increase the accuracy of reports.

Issues have a standardized structure and must be clear so that the development team can reproduce the issue and fix the problem. The items included in the report are:

*   **Descriptive Issue Name**
    
    *   Device: e.g., iPhone 12 (11.2) / Chrome on Macbook (10.12.5)
    
    *   Build: If given in email
    
    *   Description: Clear description of the issue and the steps for others to reproduce the issue
*   **Screenshots (and other test case documentation)**
    *   Proper documentation is a must in exploratory testing and testers provide documentation, which includes screenshots, memos, and annotations among others.

The final deliverable is a report broken down into modules, with issues ordered according to severity. We also emphasize that reports are meant to be used by teams either from Oursky or other third-party agencies that provide software development services. The reports are meant to be a guide for the team to reproduce the issue and ultimately solve the problem. All the information listed above is hence essential for each issue.

# Why You Should Consider Exploratory Testing

Exploratory testing helps ensure software quality from a customer’s perspective. It helps quickly solicit feedback while also learning how end users and customers would use your digital product.

If you’re an enterprise with mission-critical application or software, exploratory testing can help identify edge cases that could lead to operational disruptions if overlooked. For startups and scaleups looking to add new features to an existing digital product, exploratory testing helps in fixing problems so that updates and improvements can be smoothly implemented.

Of course, exploratory testing is not a panacea; it’s part of an agile software testing life cycle. It complements the QA team’s existing strategies to ensure that the app or software works without the bugs and glitches. You should strike a good balance of utilizing different software testing methodologies based on your business needs, compliance checklists and security audits you’re mandated to do, and the overall scope of your project.

By sharing our own process of performing exploratory testing, we hope that this would help you and your team understand a bit more about one component of software QA. By having a meaningful snapshot of your digital product, you can plan on mapping out how to further improve it!

_Oursky has an amazing team of bug swatters that include QA testers, engineers, and crowdsourced testers who pry open builds with their keen eyes to make sure your digital product works as intended without the costly and disruptive bugs and glitches._

_Apart from_ [_helping businesses bring their ideas to life_](https://www.oursky.com/product-development/)_, Oursky also provides software QA as a service. If you have an existing app or software that you would like to make improvements on,_ [_please get in touch_](https://www.oursky.com/enquiry/) _with us!_

‍
