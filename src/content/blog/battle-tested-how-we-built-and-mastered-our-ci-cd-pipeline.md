---
title: "Battle-Tested: How We Built and Mastered Our CI/CD Pipeline"
description: "CI/CD are the pillars supporting DevOps. Here we shared our experience of how we built our own CI/CD pipeline and CI/CD best practices."
pubDate: 2025-01-28
author: "Oursky Team"
categories:
  - "engineering"
  - "development"
displayCategory: "ENGINEERING"
image: "/images/blogs/ad4db53205_66e3161c5b6c8148f69000a2_sticky-note-to-ship-code-1160x773.jpg"
draft: false
webflowId: "66e3168984da8b61bfa46225"
---

_In this article, we’re going to share our own experience of how we built and run our CI/CD pipeline, as well as some basic continuous integration/continuous delivery (CI/CD_) _concepts._

_As a leading software company based in Hong Kong that needs to continuously deliver tech solutions to our clients worldwide,_ [_Oursky_](https://oursky.com/) _embraced DevOps practices to maximize the efficiency of software engineering._

_This article aims to help DevOps or CI/CD newcomers to understand the basics, and share our practical experience about how we implemented our CI/CD pipeline. By the end of this article, we’ll walk through:_

*   [_The basics: What CI/CD is and how it is related to DevOps_](https://blog.oursky.com/2019/08/19/how-to-build-cicd-pipeline/#what%20is%20CICD)
*   [_How CI/CD benefit to our development and business_](https://blog.oursky.com/2019/08/19/how-to-build-cicd-pipeline/#benefits%20of%20cicd)
*   [_Our own example of CI/CD pipeline_](https://blog.oursky.com/2019/08/19/how-to-build-cicd-pipeline/#cicd%20pipeline%20example)
*   [_Suggestions about how to get started with CI/CD_](https://blog.oursky.com/2019/08/19/how-to-build-cicd-pipeline/#how%20to%20adopt%20CICD)
*   [_7 best practices we adopted to optimize our CI/CD_](https://blog.oursky.com/2019/08/19/how-to-build-cicd-pipeline/#ci/cd%20best%20practices)

## Introduction

In the age of digital transformation, optimizing software development and delivery creates a path to success. The rise of DevOps sheds light on how to automate things in software engineering. More and more software companies plan to embrace DevOps and implement CI/CD pipeline in order to accelerate product delivery. If you are undergoing digital transformation and are new to the DevOps or CI/CD, you may probably feel confused about [these terms](https://blog.oursky.com/2019/04/03/microservices-glossary-terms/).  

### What is CI/CD?

![traditional software development flow](/images/blogs/7359805e65_66e31642a63888d6745ebdaf_image-1160x553.webp)

![ci/cd workflow in devops](/images/blogs/e3401c5e83_66e31642c25e4f9bebe04a36_image-1-1160x571.webp)

[CI](https://en.wikipedia.org/wiki/Continuous_integration) refers to continuous integration. It aims to reduce integration overhead by continuously integrating all works within a team to one shared repository. It is usually worked out by automated building processes.

[CD](https://continuousdelivery.com/) refers to continuous delivery. Teams adopting CD will produce and release software in shorter cycles, and tends to automate and carry out testing and monitoring more frequently. CD aims to get the software ready for release at any time. When the code is proven to be deployable all the time, continuous deployment can be considered as the next step to automate the deployment process.

CI/CD are the fundamentals of DevOps culture. By building a successful pipeline with automation, a DevOps team is able to deliver products to end users at a faster pace.  

### What is the difference between CI/CD and DevOps?

You probably often hear people mentioning CI/CD and DevOps together.

While [DevOps](https://www.redhat.com/en/topics/devops) (combination of “Development” and “Operations”) promotes a culture/philosophy of team collaboration and work transparency, CI/CD are the pillars that enable DevOps. **CI/CD focuses on the _a_utomation of building, testing, and deployment by properly setting up a CI/CD pipeline with appropriate CI/CD tools.**

Automation sounds good and efficient. However, compared to the traditional process of software development, what actual benefits can CI/CD bring to your development lifecycle and business?

## What are the benefits of CI/CD?

![ci/cd benefits](/images/blogs/9d168d4eb5_66e31642b31769643249e05c_image-4-1160x774.webp)

SOURCE: [NICOLE DE KHORS](https://burst.shopify.com/@ndekhors) VIA BURST

CI/CD is essential for the software development process. A successful CI/CD pipeline will bring you compelling benefits. CI/CD has helped us make engineering easier in the following ways:

### **Benefits of CI/CD for Development**

#### **Fewer bugs**

Continuous integration enforces merging codes into one mainline constantly, which enables testing to be done more frequently. Moreover, as developers are submitting codes in small batches, each batch of code contain smaller and atomic changes. It’s thus easier for developers to review the code and spot problems early, resulting in fewer hidden bugs.

#### **More efficient testing**

Continuous integration enables us to conduct tests more frequently and run specific tests for different regression changes. More testing also encourages a much bigger test coverage.

#### **Reduced manual work**

When building, testing, and deployment processes are automated, we can spend less human effort on the tasks.

### **Benefits of CI/CD for Businesses**

A well-established CI/CD pipeline not only provides benefits to the development process, but also maximizes business potential:

#### **Better product quality**

Automated testing helps detect bugs or failures at earlier stages. It is easier to make quality control and ensure product quality after release.

#### **Faster time to market**

When the whole development process is accelerated with CI/CD, more software can be released to production. Innovations can be delivered to the market and bring in more profit.

#### **Faster response to the market**

With shorter time to market and more frequent software updates, we can collect end users’ feedback earlier. By gathering more updated user feedback, our clients are able to iterate their products and make instant improvement to suit market needs.

Before reaping these benefits, a well-established CI/CD pipeline is required. You may have read enough technical articles about how to set up a CI/CD pipeline already, so we’re not going to dig into technical details here. Instead, we would like to share how a software company like Oursky runs CI/CD in the real world.

## How do we run a CI/CD pipeline in daily operations?

![ci/cd devops cycle](/images/blogs/cec518ea82_66e316425b6c8148f69024b9_image-3.webp)

A TYPICAL DEVOPS CYCLE

In a typical DevOps cycle, CI is usually integrated into coding, building, and testing stages; while CD would be applied at the deployment stage. Here’s an overview of how we run our CI/CD processes:

### **Continuous Integration**

#### Coding Stage

*   We know many DevOps teams using git pre-push hook to automate push commits, but we don’t. We allow our developers enjoy freedom in his own workspace for PoC or WIP.
*   All CI/CD commands are designed to be able to run locally so that developers can check the code locally in their developer environments when necessary.

#### Building Stage

*   When commits are pushed to the repository, it will trigger a build. For app development, we use App Center to build native apps. Other codes are built on Travis.

#### Testing Stage

*   We integrated some of our projects with our [DevSecOps security checker](https://github.com/oursky/devsecops-ci) to enhance the security of our software. By simply invoking the checker toolset in the CI pipeline, it will perform all necessary checks with different lint and static code analysis tools.
*   We have extra scripts to run test cases. In addition to unit tests, we also have static code analytic tools to check the code’s health. It is an important step because codes with bad health may not be maintainable in the long term. For example, we check train wreck, cyclomatic complexity, and bandit, etc.
*   Dependency vulnerabilities check is also conducted. Yes, we have this even before GitHub!
*   We adopt [TSLint](https://palantir.github.io/tslint/) to check typescript code health and use [ESLint](https://eslint.org/) to check general code health.
*   For language-specific testing, we use tools like [Golint](https://github.com/golang/lint), [Pylint](https://www.pylint.org/) to conduct code analysis.
*   We host our code on GitHub and connect with [Travis CI](https://travis-ci.org/), which will be triggered for code testing whenever there is a new pull request or change of master.
*   After passing all tests, the CI server will notify about the integration results. We have integrated CI into [Slack](https://slackhq.com/)so we can receive notifications on Slack directly. Afterwards, either the developer fixes bugs (if the test failed), or the code will be merged to the main repository (if it passes all tests).

### **Continuous Delivery**

#### Monitoring Stage

*   For operation and monitoring, we utilize error-tracking tools (e.g. [Sentry](https://sentry.io/about/) or [Crashlytics](https://try.crashlytics.com/)) to provide bug/crash alerts.
*   We use the portal of our own product, the serverless [Skygear](https://skygear.io/), to access server logs.

#### Deployment Stage

*   We trigger deployment to development environment per push.
*   For staging deployment, we enabled a chatbot with which the project manager (PM) can decide when to deploy with a simple command.

_In case you’re interested in our deployment process, we also use_ [_Skygear_](https://skygear.io/) _to deploy. Uploading server code and deploying Lambda functions could be completed with just one simple command. Just type “skycli” and it’s done!_

![ci/cd flow](/images/blogs/76b1349157_66e316420f61c080a27843cf_image-2-1160x1131.webp)

You may have noticed that lots of tools we are using are open-source projects. What does it imply?

> **An efficient CI/CD pipeline is not necessarily costly.**

We didn’t spend a fortune to set up our CI/CD pipeline, and you don’t need to either. Don’t let cost stop you if you want to start adopting DevOps and CI/CD in your company. In fact, in our journey to CI/CD, planning and implementation are much more important.

## How do you plan for implementing CI/CD?

![adopting ci/cd](/images/blogs/453a191beb_66e316413b9bbe235e7c8c44_image-6-1160x773.webp)

SOURCE: [DIGGITY MARKETING](https://diggitymarketing.com/white-hat-seo-techniques/) VIA [UNSPLASH](https://unsplash.com/photos/s8HyIEe7lF0)

Many newcomers to DevOps or CI/CD concept may ask:

> **“Do I need to hire a DevOps engineer if I want to adopt DevOps or CI/CD?”**

Typically, a DevOps engineer should be able to master a wide scope of technologies and automation tools that help maximize the positive outcomes of DevOps. He/she should be also good at collaborating with different functional teams and facilitate communication between these teams.

The expertise of a DevOps engineer is a good leverage when adopting a new culture or workflow, especially if you are new to DevOps and not sure about where to start. However, in our experience, hiring a DevOps engineer is optional instead of a must.

The collaborative spirit in DevOps is to empower engineers with control to the operations. Thanks to this spirit, it can close the gap between development and operations. In Oursky, we have our CTO and a senior engineer setting up the basic infrastructure of CI/CD. At the same time, we educate _all_ developers to run and integrate DevOps and CI/CD in their work process themselves.

### How We Adopted DevOps & CI/CD Without Hiring a DevOps Engineer

So instead of hiring a dedicated DevOps engineer, here is how we built the culture of DevOps in Oursky:

*   Set up a good authoritative example to follow.
*   Team members would know who to ask during a roadblock.
*   Work with an evangelist to promote the tools and software in our company weekly update.

When we started to implement CI/CD, the first thing to do was to collaborate with different functional teams. If you finally decided to go for CI/CD, get your teams to know the common goal and consolidate their opinions. Here are the steps we took:

1.  Use a version control system if you don’t have one yet. For example, we use [Git](https://git-scm.com/) for version control and [GitHub](https://github.com/)/[GitLab](https://about.gitlab.com/) as codebase server.
2.  Have at least two configurations, one for development and one for production.
3.  Pick the appropriate CI/CD tools. Popular CI/CD tools include [Jenkins](https://jenkins.io/), [Bamboo](https://www.atlassian.com/software/bamboo), [Travis CI](https://travis-ci.org/), [GitLab](https://about.gitlab.com/) etc. You can pick those that fit your current development tools.
4.  Implement CI first. When CI is proven to be reliable, you’ll have a solid foundation for implementing CD.
5.  Compare the velocity of a team before and after implementation of CI/CD. Check if CI/CD does improve your team efficiency. Check if code quality improves, too, with your own metrics or indexes. All these help indicate if your CI/CD pipeline is successful.

In fact, setting up a CI/CD pipeline is not technically difficult. The most difficult part is to keep it fast and reliable in the long term. Below are some best practices we adopted to optimize our CI/CD:

## Best Practices We Adopted to Optimize CI/CD

![ci/cd best practices](/images/blogs/6eafccc906_66e31641d3319a04e8c5eac3_image-7-1160x805.webp)

SOURCE: [TEROVESALAINEN](https://pixabay.com/users/TeroVesalainen-809550/) VIA PIXABAY

#### **1\. Build only once**

The binary artifacts should be built once, and only once. It is to ensure a clean environment in CI so that you can trust the build. If you try to rebuild binaries, it’s hard to make sure that the one you built and the one passing CI/in production are the same one.

#### **2\. Make small and incremental commit to reduce branching**

To keep CI efficient at testing and monitoring, all changes should be merged to the main repository and minimize branching. To do this, encourage developers to commit atomically and implement features incrementally. Educate them about how to make pull request that is easy for code review, and enforce them to merge as soon as possible.

#### **3\. Plan for test priority**

Another way to empower CI testing is to better arrange the tests. Prioritize which test should go first. For example, you can arrange some smaller and quicker tests (i.e., unit test) at the early stage.

In this way, you can detect and fix bugs earlier when your code fails before going through time-consuming tests. It also helps allocate the right resources for different tests. Hence, accelerate the whole testing process.

#### **4\. Version control everything including documentation, deployment, and configurations**

Version control (or source control) is one of the must-have techniques in CI/CD. Developers should separate build artifacts by versioning in order to differentiate different versions as well as track changes. Otherwise it would be painful if you mistakenly overwrite the document and cannot go back again.

#### **5\. Isolate your CI/CD pipeline for security**

You definitely don’t want your codebase and internal data being exposed to the public. Since CI/CD has full access to your codebase and credentials, it is recommended to isolate your CI/CD pipeline and limit to private access in secure networks.

#### **6\. Only use CI/CD pipeline to deploy**

CI/CD already serves as the best practice for testing and deployment. However, it could not safeguard your production if you keep using other channels for deployment and bypassing CI/CD.

For quality assurance, make CI/CD the single channel to deploy your code. Ensure everything is going through the CI/CD pipeline so you can ensure the codes in testing and production are exactly the same. You can also reduce human error and avoid deploying other versions not being tested by mistake.

In Oursky, though we enable developers to override the CI/CD pipeline, it’s limited to emergency cases, such as when Travis CI crashes and the whole CI/CD pipeline is down. Except for these special cases, CI/CD pipeline should be the only channel for deployment.

#### **7\. Consider using container technology for testing**

If you are experienced in CI/CD, you may start to consider [using containers like Docker](https://blog.oursky.com/2019/07/03/docker-use-cases/) for testing. Container technology is an amazing tool that can help you set up a testing environment quickly while ensuring the cleanliness of the environments.

In our CI/CD pipeline, we [use Docker for automated tests to improve QA](https://www.freecodecamp.org/news/a-recipe-for-website-automated-tests-with-python-selenium-headless-chrome-in-docker-8d344a97afb5/). You can take a look at [our open-source Github repo with 100,000+ Docker image pulls](https://hub.docker.com/r/joyzoursky/python-chromedriver/) if you’re interested.

## One Step Closer to DevOps

![ci/cd devops work](/images/blogs/2d3d81056d_66e316420f61c080a2784408_image-5-1160x773.webp)

SOURCE: [MATTHEW HENRY](https://burst.shopify.com/@matthew_henry) VIA BURST

CI/CD is a definitely one of the core capabilities of DevOps culture. It helps us and many software teams out there to improve efficiency and maximize productivity. Though CI/CD emphasizes on tooling mostly, it relies on a cultural mindset among the company to make it truly works at the end of the day.

> **CI/CD and DevOps are only theories until every team member implements the idea in every step during their development. — Rick Mak, CTO of Oursky**

Leave your comments below on this topic! If you are planning to embrace DevOps or implementing CI/CD for your company, [talk to our consultant](https://oursky.com/contact) and we’d love to help by sharing our expertise with you!  

‍
