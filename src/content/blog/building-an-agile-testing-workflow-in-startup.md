---
title: "Building an Agile Testing Workflow in Startup"
description: "Agile methodology has been a trend in software industry in the recent years. Publishing speedy new releases with high quality is the goal of all product teams. We would like to introduce a model of QA Workflow for specifically small-scale startup scrum teams, where all one-man testing team gets started from."
pubDate: 2025-01-28
author: "Joy Ng"
category: "development"
image: "https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/66e30303e992404f6e423c3c_pexels-picjumbocom-210661-1160x773.jpg"
draft: false
webflowId: "66e30356c5577b9b8ea33b41"
---

**Agile** methodology has been a trend in software industry in the recent years. Publishing speedy new releases with high quality is the goal of all product teams.

**Scrum** is a framework of agile project development, which breaks the big scope of features development into small cycles called **“Sprints”**, and deliver product increment by iteration called **“Milestones”**. There are various ways of works, terms and principals in actual, but in general it refers to a mechanism that can provide fast and continuous delivery.

Keeping up the quality as its speed is one of the key challenges. Teams could easily rush for new features and miss out **testing and maintenance** for the app quality, breaking the product with accumulating defects and growing tech debt.

Below we would like to introduce a model of **QA Workflow** for specifically small-scale startup scrum teams, where all one-man testing team gets started from.

## Team Structure

Let’s say you have a startup scrum team with the following members:

*   Project Manager (PM) x 1
*   UI/UX Designer x 1
*   Senior Developer x 1
*   Junior Developer x 1-2
*   QA Tester (QA) x 1

Regarding to testing, PM, Developer and QA are the 3 main roles that contribute to the quality control of products. We could have a simple division of work for them according to their skill set.

**Project Manager**

*   Responsible person of the project, including product quality
*   Consolidate project scope and use cases
*   Break down user stories and acceptance criteria
*   Manage development, test and release schedule
*   Collect feedback, prioritise bug fix and enhancements

**Developer**

*   Complete assigned tasks with basic testing
*   Code quality control
*   Fix bugs by assignment
*   Continuous delivery

**QA Tester**

*   Continuous Exploratory Test based on project scope
*   Run different types of test according to project need
*   Find, Verify and Report issues
*   Regression test after new changes and bug fix

‍

## Sprint & Milestone

In a scrum lifecycles, tasks to do are scheduled by recurring “Sprints”, while the batch features to release is planned by “Milestone”.

For example, say if each sprint is around 2 weeks of work, and the product owner will like to release a version of the app every 3 months, then the cycle will be like:

Sprint 1 → Sprint 2 → Sprint 3 → Sprint 4 → Sprint 5 → Sprint 6 (Milestone 1)

‍

## QA Workflow

To suit the nature of “Sprint” and “Milestone”, the testing worflow will also be slightly different in different stages of development, while the testing work does not actually vary a lot.

A suggested workflow with PM, Developer, Tester involved:

When the milestone starts, PM hosts a **Kickoff meeting** with the project team, to brief and clarify the background and requirements of the whole project

Within each sprint,

1.  PM prepares user stories and host a **Sprint planning meeting** with the team, to debrief the work done in the previous sprint, and go through the tasks scheduled in this sprint;
2.  Developers do a **Technical planning** to break down the todos;
3.  Developers code and deploy changes to **Testing environment;**
4.  PM runs an **Acceptance Test**, to check the acceptance criteria and testability of app;
5.  When it is ready for test, QA runs an **Exploratory Test**, to find bugs in any possible scenarios, related to the features scope of new updates, and also the overall app stability;
6.  After QA reports bugs to the team, PM and QA may discuss to **prioritize the issues**, and arrange whether they should be fixed within this sprint, the next sprint, other slots or put to a backlog;
7.  Looping the bug fix and test run within the sprint until it is stable to ship, PM can summarize a **Progress Update** as the work done in this sprint

Coming to the end of a milestone after several sprints of work, a final check on whole project should also be arranged to make sure the it is good for a **Production release**:

1.  Developers prepare a **Alpha or Beta Production environment** for testing
2.  Apart from the regular sprint testing flow, PM and QA also runs a **Smoke Test** for the whole app, as a health check for all main user flows, no matter the feature is related to the milestone update or not
3.  When everything looks good and submitted to app store, it’s time for a release party 🎉
4.  ‍

![](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/66e302ccbf76331a3fa065c3_Small-scale-agile-workflow.png)

A SAMPLE WORKFLOW CHART FOR STARTUP AGILE TEAM

‍

Actually, when working out a testing flow in a scrum team, there is also a lot of project-specific tests runs that we may consider add-ons, e.g. Usability Test, Functional Test, Performance Test, Load Test, Security Test, etc.

These could be more technical or time-consuming work which also depend on the needs of the project. But as a recommendation for Startup Scrum Team, **Exploratory Test** is good to be one of the main testing methods, as it suits the nature of Agile – Fast, Flexible and User-Driven.

Last but not least, we would also like to share you a sample of an Issue Report format that our QA team used to write, hope it will also be useful for anyone getting started to software testing 🙂

‍

![](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/66e302ccbb0653993a38b9b9_issue_report-1160x1276.png)

HTTPS://GITHUB.COM/AUTHGEAR/AUTHGEAR-SERVER/ISSUES/2537

‍
