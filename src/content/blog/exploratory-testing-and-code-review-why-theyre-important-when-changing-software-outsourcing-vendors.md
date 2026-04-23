---
title: "Exploratory Testing and Code Review: Why They’re Important When Changing Software Outsourcing Vendors"
description: "Here's a real-life lesson on why exploratory testing and code review are important when you change or transition to a new software outsourcing vendor."
pubDate: 2025-01-28
author: "Roy Yuen"
category: "product-management"
image: "https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/66e306d03a8aa54db92c0811_pexels-kevin-ku-577585-1160x870.jpg"
draft: false
webflowId: "66e30716a9778b10dc4ceee5"
---

Many of our clients come to us to build software and apps from scratch. A lot come to us, too, and ask us to take over or revamp an existing digital product built by a third-party development team. A lot of them are either transitioning or planning to change to a new software outsourcing vendor. Some of our clients are even the ones who ask about reviewing the app after it’s been built by another development team.

We always recommend conducting exploratory testing and source code review before we do anything else to these already-built software or apps. It’s not that we don’t trust other developers, nor are we trying to upsell our services. We owe it to our would-be clients, the third-party vendor/developers, and even ourselves to fully understand the product before tinkering with it. This way, we can see more clearly what needs to get fixed (if it needs fixing at all), make more practical estimates, and recommend realistic solutions.

Below, we’ll share some real-life examples and reasons why it’s important to do exploratory testing and code/software diagnosis on an existing digital product before making any changes.

![](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/66e306f0f37ef51ac70945ac_pexels-kevin-ku-577585-1160x870.jpeg)

PHOTO BY [**KEVIN KU**](https://www.pexels.com/@kevin-ku-92347?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels) FROM [**PEXELS**](https://www.pexels.com/photo/coding-computer-data-depth-of-field-577585/?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels)

# Why Change a Software Outsourcing Team?

There’s a lot of reasons why a company would switch or change to another development team. As a software development outsourcing agency ourselves, we understand the burden and responsibility all too well. We know what the cost and impact of irreparable mistakes can be.

Of course, you can never be 100% confident all the time with your partner or vendor. [Asking the right questions](https://blog.oursky.com/2020/12/03/5-questions-to-ask-agencies-before-outsourcing-software-development/) and [closely looking at how they work](https://blog.oursky.com/2020/08/19/a-definitive-guide-for-startup-founders-to-choosing-software-development-agencies/) can reveal some red flags that could be signs of bigger problems that you should watch out for.

In one instance, one of our clients came to us with a web platform built by a third-party developer in New York. They wanted to update the existing app but did not know how the digital product was built by the previous development team.

The client knew that the existing version had bugs that were affecting the app’s performance. The platform consisted of three different portals for users (consumers, professionals, and admins) that were interdependent. Any changes done to one portal could further break the whole platform.

Oursky performed a standalone code/software diagnosis to provide the client with enough information to make informed decisions about their app. The code review process for this project took three days then delivered it to the client as a report.

After seeing our report, the client eventually commissioned Oursky to do development work for the app’s bug fixes and feature additions.

# Exploratory Testing and Code Review Report: A Good First Deliverable

It’s irresponsible for us as a software development outsourcing vendor to just haphazardly guess a time and budget to clients for updating or adding new features when we don’t know what we’re looking at.

The software project estimate will be inaccurate because we don’t know the codebase’s quality or the extent of existing bugs. A source code review would tell us what we will be working with.  This will help us give realistic estimates. It’s like doing a proper assessment for building a house and its foundation before committing to renovating them — from noting light fixture replacements to discovering leaking pipes behind darkened wall patches.

When working with a client, we make a list of bugs and issues as concrete first deliverable. If they want to double check or get a better software project estimate, a client can take this report to any development team or software outsourcing vendor, not just us.

A comprehensive source code review and software diagnosis should have two separate components: codebase review and exploratory testing. Depending on the scope and size of the product and quality of documentation, the review could take a few days to two months (for huge projects). We break down these assessments into modules, to make project estimations clearer.

# Codebase Review

Reviewing the codebase means assessing whether the code is easy enough to understand and in good condition to maintain or build upon. This is especially important when working on an unfamiliar codebase. By reviewing the code, we can find errors that have been overlooked in the initial software development process.

To begin the code review, Oursky needs to access the code. This can come in the form of ZIP files or a full repository on GitHub. The best-case scenario is that we receive a full repository that is:

*   Complete (and matches the deployed version)
*   With clear commit messages
*   Easy to set up the environment for

In our project with the New York-based client, we received a ZIP package with the modules for the three web portals and a back-end API server. We had no commit messages to help us understand the changes made to the app over time. This required our own development team to figure out the logic and what each component did.

The languages used in the project were TypeScript for the front end; and Erlang with some Python scripts for the back end.

We first confirmed that we were able to set up a local development environment for both the front end and back end. We didn’t receive instructions for setting up the environment, so we wrote a README to enable future developers to further build upon and deploy the application. The README is a standard documentation best practice that development teams and software outsourcing agencies should include in a handover.

During the assessment, we checked if the code is easy to trace and read. We also want to see if the application or modules are well-organized and reasonably structured for further development. We then separated our code review into the front end; communication between front end and back end; and the back end.

## Front End Development and Ensuring Responsiveness

If we don’t have direct access to the deployed version, then one of the things to quickly verify is that the deployed (live) and staging (our local) versions are the same. In our client’s case, the front end was not the same though the differences were minor.

When assessing the code, we look at whether the application performs the desired functions. We also consider if it has an acceptable software design, i.e., user experience/user interface (UX/UI).

For example, the pagination may be absent from the code. This is not an error, but we may add a remark if we think it adversely affects the UI. Having all the records listed in a single page will create a longer wait time as the back end needs to process lots of data to feed to the front end.

Another factor is how the system architecture affects the front end’s responsiveness. For example, having the front end perform functions like sorting may be acceptable if there are not that many records, but will not be optimal for scaling.

## Front-End and Back-End Communication

Communication between the front end and back end depends on the application. If the back end is only for internal use, then there won’t be a problem as long as it communicates well with the front end and that the interfaces are consistent between the projects. If the back end needs to provide an API to the third party itself, a RESTful API/GraphQL design with a well-defined interface is needed.

In our code review/software diagnosis reports, we note the communication protocol for the specific application. As a rule of thumb, we document only when an approach is not the standard.

## The Back End: Enable Debugging and Check API Integration

When looking at the back end, we note which code is in good condition. We also provide best-practice deliverables, such as debug logs that help code tracing and enable debugging. We note when we find documentation that explains the various components, such as the controller, websocket handler, and model among others.

We also note the implementations that have implications on future development. For example, we look at how a third-party API integration would be handled, what is used for storing a user session, and if a test case is written.

# Conducting Exploratory Testing

In addition to performing code review, we also do exploratory testing to see, from a user’s perspective, what needs to be fixed.

Exploratory testing checks for bugs in the existing product (whether they’re major, minor, trivial) and serves as a current-status snapshot. This would help any development team or independent software vendor to understand what needs to be fixed, or what (and how much) bugs exist prior to any new development work.

Exploratory testing is a staple in the software testing life cycle, and any competent agency that provides software development services should be able to conduct this to ensure the quality of their digital products.

![code diagnostics hong kong](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/66e306f2b5be41f948ba8c19_Oursky-Exploratory-Test-QA-Screen-Shot-2018-03-16-at-4.38.02-PM-720x632.png)

ALL BUG REPORTS BY TESTERS INCLUDE SCREENSHOTS AND STEPS TO REPRODUCE THEM.

The objective of an exploratory testing is to find as many bugs and usability issues as possible within a specified period of time. Oursky manages a team of software quality assurance engineers and testers to perform exploratory testing across specified platforms.

The reported bugs are clearly documented, with screencaps and descriptions that are manually verified and “accepted” by our software QA team. Our reports are organized according to the pages in each model we receive. The issues we report are: bugs; and UX problems classified as major, minor, and trivial issues.

In our client’s case, the app was originally developed in New York. Our testers reported over 100 issues within 24 hours. After two days of manual verification by our QA team, approximately 70 issues were accepted. Our project manager (PM) then took the list of defects to the client to discuss major issues that must be addressed before development can begin on new features.

# What’s next after code review and exploratory testing?

Each case of software diagnosis, code review, and exploratory testing will have different issues to fix. For example, some applications may have serious security vulnerabilities, like passwords being stored in plain text and admins being able to directly view them. Some may not have obvious front-end bugs yet, but may require an entirely new database architecture to be able to scale efficiently without future problems. An example would be a database hotspot that will exponentially slow down data insertion or queries.

We also recommend best practices that reduce the chance for future errors, such as having database migration files so that changes to the database are automatically updated for the entire development team.

![software codebase review hong kong](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/66e306f0789f1478a175e1be_Oursky-Exploratory-test-software-QA-screenshot.png)

WHEN PRIORITIZING BUG FIXES, ISSUES ARE DIVIDED INTO MAJOR, MINOR, AND TRIVIAL.

After the code review and exploratory testing, Oursky will agree with the client on a list of existing bugs that must be fixed, including necessary changes that are not necessarily bugs but are crucial for synced deployment with continuous integration, the digital product’s scalability, and security of user data. By confirming these and ensuring we’re all on the same page, we prevent future delays in the development schedule.

# Things to Consider When Switching Your Software Outsourcing Vendor

Code reviews and exploratory testing are just the tip of the iceberg when outsourcing developers or contracting with another software development agency. What (and why) are you changing to another development team in the first place?

If you’re feeling the pressure and frustration about successfully completing your software development project or app, you’re not alone: [75%](https://www.entrepreneur.com/article/329019) of business and IT executives feel the same way, too.

While an ill-equipped vendor is a major factor, you should also look inward to see what could be missing from your own team. It’s perfectly understandable to switch to a new software outsourcing vendor, but you also need to ensure that you and your team can successfully manage the project. Otherwise, you’ll end up constantly switching vendors and restarting development, and use them to solve problems that lie elsewhere.

Here are some things to keep in mind:

*   **Assess your current state and plan ahead.** Don’t set arbitrary deadlines, especially if you don’t have the data and insights to back them up. You don’t just get up and go then hire a new team. Learn why you’d want to change vendors. Understand the basics behind your app — the project management process adopted, the tech stack, platforms, and third-party integrations that were used. Consult people with technical knowledge if you must. This way, you can see the bigger picture.
*   **Document, document, document.** You should be doing this even during your initial work with the agency. [Changes and handovers don’t happen overnight](https://blog.oursky.com/2020/06/04/from-ideas-to-owning-source-codes-what-startups-need-to-know-before-developing-an-app/) and can be a complicated process on both sides. Make sure everything is documented to ensure smoother transition not just with the team involved, but also with your app’s source code and access/ownership to applications, databases, and storage, to name a few. Make sure that your new team will be more than thorough in keeping track of their work.
*   **Spell out your requirements.** Many projects fail due to mismatch in expectations and communication. It’s possible that the company wasn’t sure of the project’s scope to begin with and left the developers unsure of what to do. [Align your business goals with the project’s requirements](https://blog.oursky.com/2020/06/04/from-ideas-to-owning-source-codes-what-startups-need-to-know-before-developing-an-app/). Be more involved. Communicate regularly. Adopt [project management principles](https://blog.oursky.com/2017/11/29/project-managers-developers-ship-dates-ebs-evidence-based-scheduling/) that will help you better onboard your new team and manage your resources.

Not everything should be about cost. Price points are important, but you should also focus on quality and how the vendor will provide the most suitable solution. Of course, you should [vet the vendors](https://blog.oursky.com/2020/08/19/a-definitive-guide-for-startup-founders-to-choosing-software-development-agencies/).

Conducting software diagnosis, code review, and exploratory testing code review may seem like an additional upfront cost with a new vendor. However, the costs of improving your app pales in comparison to keeping a buggy app and, in turn, losing your customers. The small and fixed investment helps estimate and cap the time and costs of working on an existing codebase.

Oursky believes in working with our clients together as product owners. By giving them these deliverables, a client is better equipped to own their product and more confidently work with any development team to improve it in the future.

_Oursky has a team of passionate software quality engineers who ensure that the_ [_digital products_](https://www.oursky.com/product-development/) _that we create function as intended without the glitches, bugs, and vulnerabilities. We also have an extended family of crowdsourced testers who work with our QA team and follow Oursky’s rigorous software testing life cycle. If you have app and software development projects or are exploring code reviews, software diagnostics, and exploratory testing for your existing product,_ [_get in touch with us_](https://oursky.com/contact)_!_

‍
