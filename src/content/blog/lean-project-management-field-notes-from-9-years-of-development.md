---
title: "Lean Project Management: Field Notes from 9 Years of Development"
description: "Lean Project Management: Field Notes from 9 Years of Development"
pubDate: 2025-01-28
author: "Dennis Tam"
category: "project-management"
image: "https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/67995088005556a1b388e404_dawid-zawila-226624-768x540.jpg"
draft: false
webflowId: "6799509eba8a39e39ebfa5dd"
---

![lean-project-management](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/6799508123af1a9d6bd305fc_dawid-zawila-226624-720x506.jpeg)

Photo by Dawid Zawiła on Unsplash

When Oursky first began all three of us founders were project managers (PMs). But as our company grew, we faced the same quality control issues as other companies. With over 50 team members now, we needed to strike a balance between nurturing junior developers who may not have as much experience and ensuring code and design quality for our clients.  

We began bringing onboard new PMs after passing 10 simultaneous projects. Our PMs are the glue, drivers, and client contact points for projects, not just account managers. Below are the multiple hats great PMs wear.

Note: We emphasize that everyone on a team is responsible for product quality, from designers and developers to PMs and quality assurance (QA) colleagues.

## What does a PM actually do in a tech company?

![](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/679950807f363048382fac48_christopher-burns-270898.jpeg)

Photo by Christopher Burns via Unsplash

Unlike many other agencies, PMs and account managers are the same individual at [Oursky](http://www.oursky.com/). Our PM plans a project, keeps it on-track and ensures the quality of the final product. As acting account managers, they also advise clients on what’s possible within their budget, the technical considerations and provide progress updates.

At [Oursky](http://www.oursky.com/), the PM is usually introduced when the sales team is confirming a project. Once the deal is signed and the project officially kicks off, the PM will open a Basecamp project so that the client see our progress and leave messages. A complete list of tasks expected of PMs is another article in and of itself, but just to give you an idea, here is what a PM’s checklist looks like during just the initial project setup stage.

**Project Setup:**

*   Automation tools are setup appropriately ([Hockeyapp](https://hockeyapp.net/#s), [Apple’s TestFlight](https://developer.apple.com/testflight/), QA server, etc)
*   Organize meeting for tech lead and developer to discuss technical concerns in the project
*   API doc initial draft is written
*   Database ER diagrams are prepared
*   Server architecture is planned
*   App structure / navigation is planned
*   Model unit test case is set up
*   Analytical stats collection is defined

## Queen or King Estimator

![Trello project Management Screenshots](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/6799508045bd81b830029ca2_Screen-Shot-2016-04-20-at-4.12.23-PM-1024x554.png)

We categorize the issues and features of the app, weigh their significance and prioritize them.

The first step is to figuring out the business goal of the project, which is done when a new project is confirmed. PMs begin by providing an A and B project estimation (measured in billable man-days) based on the requested features and budget. The reason they provide at least two optionsis because clients usually revise their product once they realize the price of the original project scope. It usually at this point that PMs also ask a designer to begin working on the wireframe.

Once the main components, such as key features, budget, and timeline are settled on, the PM will assemble a team based on each colleague’s schedule and platform focus. Our developers generally focus on Android, iOS, or web development, but are full-stack as they are expected to take ownership of complete features. The key features are then prioritized and features are broken down into two-day maximum tasks.

## Being Chief Chaser and Maintainer

![](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/67995080f2137d56a878b202_quino-al-272729.jpeg)

Photo by Quino Al on Unsplash

Another major role for a PM is maintaining communication channels. This begins with a daily stand-up meeting with [Waffle.io](https://waffle.io/) integrated into a GitHub project for all development team members to touch base. The PM will go through new issues and prioritized client requests before making assignments. While the PM is the contact point for the client, they also need to know which requests are urgent (like critical bugs) and which should wait so as not to distract developers. Also, since our PMs manage multiple projects, they can often share relevant libraries and common issues that developers in different teams may not be aware of.

## Build Once, Revisit Once

![](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/679950800f76d341d9afde6d_margarida-csilva-121801.jpeg)

Photo by Margarida CSilva on Unsplash

Cohesion is just as important as communication. It should be noted that PMs aren’t the ones actually ensuring the quality of code. That task belongs to the tech lead. But what the PMs can do, and should be doing, is ask the right questions during daily meeting with the dev team, such as whether it is worthwhile to change the data structure _right now_ given that a client is running a campaign. The PM will also ask for small details that can improve user experience, such as a change in color to indicate a status change to go with a minor bug fix in the same feature. In other words, the PM makes sure everyone is assembling their feature with the bigger picture in mind.It’s not just elegant code for its own sake. Quality code means the next person can spend time improving, rather than fixing features.

## Catching the Details

![](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/67995080a81f96c1ee8dd6b5_andrew-branch-191920.jpeg)

Photo by Margarida CSilva on Unsplash

One of the most difficult things for new developers in the company is commit messages on GitHub and readable code for pull requests. As our company rotates developers between projects to ensure code readability, the PM must also ensure that an incoming team member is properly briefed and able to pick up the assignments to meet deadlines.

We’ve come up with the following guidelines for quality assurance:

*   Each pull request requires a code review done by a tech lead
*   Each project has at least one code reviewer assigned
*   Automated lint checking, cyclomatic complexity, and test coverage.

The PM is also the person who does a final check for a new feature and coordinates the QA tests once a build is finished. Once the team completes a project, we provide the source code and Git repository to our clients for them to maintain or edit as they like.

## Our Project Management Tools

It’s not enough to just work with people. With so many tools available, a PM’s role is also to find the most suitable one for project tracking and facilitating efficient communication with our clients as well.

Our favourite is still [Basecamp](https://www.basecamp.com/) for non-tech consulting clients and internal projects. For technical clients and our internal development teams, we use the Github Issue Tracker that we’ve integrated into Waffle.io to have a Trello-like sprint overview. As a full company coordinating our developers’ workloads, we go back to the simplest tool: a spreadsheet scheduling developers for a specific project duration.

## Conclusion

![](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/67995080f80d7a7970e1f51f_rawpixel-com-196464.jpeg)

Photo by rawpixel.com on Unsplash

At [Oursky](https://www.oursky.com/), we are passionate about products. As we evolved from a 3-person team to a firm with 50+ staff, we recognized the need for an additional type of person: someone who could bring people together to do what they love, and to do it well. Actually, PM also stands for people manager.

If you found this piece helpful, follow [Oursky’s Medium Publication](https://m.oursky.com/) for more startup/entrepreneurship/project management/app dev/design hacks! 💚

😻 At Oursky we’re all about helping brands and entrepreneurs make their ideas happen. Get in touch if you’re looking for a partner to help build your next digital product.

‍
