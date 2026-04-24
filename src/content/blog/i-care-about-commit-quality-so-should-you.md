---
title: "I care about commit quality. So should you."
description: "I care about commit quality. So should you."
pubDate: 2025-01-28
author: "Carmen Lau"
categories:
  - "engineering"
displayCategory: "ENGINEERING CULTURE"
image: "/images/blogs/88c913598a_65800dc11650bb250fd43618_commit-quality.jpeg"
draft: false
webflowId: "65800dc446fa2dba9ca5f991"
---

When I started working as a developer in Hong Kong, iOS was still in Version 4. Since then, I’ve become one of the six partners in one of Hong Kong’s leading web and mobile development agencies. In addition to acting as the tech lead or PM for projects, I work on initiatives like setting up the company’s [Kubernetes cluster for DevOps](https://code.oursky.com/built-kubernetes-cluster-coworkers-deploy-apps-faster/#more-466) and mentor junior developers.

I’ve grown with [Oursky](http://www.oursky.com/), since we were fewer than 10 people. Now with over 50 colleagues and new developers every year, we’ve started formalizing approaches to helping new team members settle in. We want everyone hired to pass probation, but the truth is there will always be some who aren’t a good fit in the end. Every case that doesn’t work out is slightly different, but one of the biggest hurdles I’ve noticed is a _person’s approach to commits._ \*\*

Below are my reflections on what commits reveal about a developer and why it’s an important factor for cultural fit.

## **How we work with new team members**

![onboarding engineering team](/images/blogs/a26258fd5f_66e15e7607cb48f6a18f2f03_annie-spratt.jpeg)

PHOTO BY ANNIE SPRATT VIA UNSPLASH

No matter what their background is, we expect all our developers to be full-stack. (Ben, a co-founder, explained [how we hire developers based on fundamental knowledge](https://blog.oursky.com/2017/03/27/why-i-gave-up-technology-specific-hiring/), effective implementation, and willingness to learn new languages.) For our company, a server-side engineer has to be willing to work on web and mobile projects; a front-end engineer has to be willing to strengthen their backend logic. Everyone has different strengths, but by being full-stack, developers can think about features in their entirety for apps.

When we hire a new team member, we onboard them into our projects immediately. We assign tasks in platforms they’re familiar with first (i.e. iOS, Android, JS), so that they can focus on learning how to work with our team members.

During the onboarding, we can see how a developer works. This includes:

*   their coding style
*   their logic
*   their ability to write readable commits

## What a commit message means to us

![Commits on Skygear.io Server](/images/blogs/e99d41b918_66e15e761b59f04dc4ee78d6_skygear-opensource-commits.png)

COMMITS ON SKYGEAR.IO SERVER

Adjusting to commit styles can sometimes be painful. Commits may be inconsistent or have multiple changes in one pull request. I have worked with fresh university graduates who may be using git for the first time (it’s not required in all Hong Kong universities) who adapt in a week. I’ve also had an experienced developer putting 30+ micro-commits in a pull request and asking me if the rule was “the more commits the better” when I raised the issue of readability of his [pull requests in the Github workflow](https://guides.github.com/introduction/flow/).

A commit is more than just “our company’s way of doing things”. Our two main considerations are 1) readability, and 2) logic factoring in future maintenance (Wiki on [Atomic commits](https://en.wikipedia.org/wiki/Atomic_commit)).

Our developers have different styles for writing commits. For example, some prefer the REF number before or after the message. I am flexible on the format as long as a team is consistent for each project.

## What a commit tells us is:

*   **How does someone think about a feature?** How do they break down tasks? Are they putting everything in one gigantic commit? Or are they thin-slicing them until others can’t understand the logic?
*   **What is their working logic?** Are they able to make one logical change per commit, so that we can merge or roll back if needed?
*   **Are they able to think about others?** When they write messages, are they clear so the tech lead or peer reviewing can understand and accept or deny a pull request?
*   **Are they willing to take feedback?** How do they respond to their tech buddy or tech lead’s advice? Are they able to implement changes? Can they explain their logic rather than taking follow-up questions personally?

### Finding the sweet spot between freedom and teamwork

By giving a new member tasks, we should give them space to execute. We don’t want to box people in with rules and waste time on fixed training procedures. Our company gives individuals the freedom to find the sweet spot between their personal optimal and a team’s optimal working style.

There isn’t only one right way to do things and we want team members to keep a creative problem-solving mindset. Though they’re part of a project team, our developers individually own the features they work on. Though they are working independently, our developers need to think about how to improve their code quality and communication for others to follow.

### Things that shouldn’t happen

![good tech mentorship](/images/blogs/f14045e32e_66e15e768514b5005e0ad434_aimee-vogelsang-106103.jpeg)

PHOTO BY AIMEE VOGELSANG ON UNSPLASH

One of the biggest mistakes PMs and tech mentors can make is not briefing a new team member enough. If there is no discussion with a new team member, there is a danger that they will use the wrong approach and the entire feature cannot be used. Of course, that’s an extreme case. We usually will require small fixes in the commits.

## My advice to new developers

Working at Oursky means continually learning as a developer. One of the lessons we are often reminded of, even with colleagues we’ve worked with for years, is that there are always communication gaps. Using the Atomic commit approach is a commitment to creating well thought-out features that are understandable, and therefore maintainable, for people in the future (including yourself!).

A new team member’s willingness to adapt their work style and ensure readable code reflects how open they are to considering different perspectives and engaging in debates. After a month of working with a new team member, I will usually spend less time asking “What does this mean?” and more time on the fun stuff: plans for implementation and exploring possible solutions to the problem of building great products.

‍
