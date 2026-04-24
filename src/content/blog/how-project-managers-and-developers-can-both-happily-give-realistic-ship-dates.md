---
title: "How project managers and developers can both (happily!) give realistic ship dates"
description: "How we implemented Fog Creek's evidence-based scheduling (EBS) to verify our PM and developer estimation accuracy for better software project maangement."
pubDate: 2025-01-28
author: "Roy Yuen"
categories:
  - "product-management"
  - "development"
displayCategory: "Product Management"
image: "/images/blogs/be84151240_66e31465e154677cd314f180_Oursky-perks-9510-720x478.jpg"
draft: false
webflowId: "66e314add2bf9fc097393d8a"
---

![Evidence based scheduling EBS fog creek joel on software](/images/blogs/046dcb0a1f_66e3144dc5c78539d58ff4c8_1_I0MCeRgbNi2aHiuxUtD-cg.png)

SOURCE: FOG CREEK

Project managers (PMs) are deadline chasers. They think clients want the earliest possible ship date to reduce costs. But that’s a common misconception. What clients really want is **the best possible product** with the earliest possible ship date.

Quality products need well-written code. Developers should [use the 12 development approaches on the Joel Test](https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/)to ensure good source control, encourage daily builds, and make use of QA testers.

Realistic deadlines need to be based on estimations from track records. Our project teams wanted to verify the accuracy of our estimations and create a feedback loop for our PMs and developers. We’ve been doing [evidence-based scheduling](https://www.joelonsoftware.com/2007/10/26/evidence-based-scheduling/) (EBS) with Fog Creek for two months, and I’d like to share what we’ve learned so far.

## Evidence-Based Scheduling without being OCD

We used Fog Creek’s EBS to track developers’ estimates compared to their actual time spent on a project. This data helped us make better project schedules, and also provided a feedback loop for PMs and developers to improve their estimates for individual tasks.  
But the emphasis is not on OCD time tracking tools — we trust our developers and PMs to input their times in the project spreadsheet.

Besides what Fog Creek mentions in their [EBS blog post](https://www.joelonsoftware.com/2007/10/26/evidence-based-scheduling/), here’s what we learned in our implementation.  
**Break down projects into less than 2-day tasks**

![Evidence based scheduling formula fog creek](/images/blogs/ad82ff7e1a_66e3144d2718891a812b5746_EBS-velocity-log-template-oursky.png)

A TEMPLATE FOR OUR GOOGLE SPREADSHEET FOR EBS

As I mentioned above, our EBS tracks estimates vs time spent for user stories and features. The individual features are broken down into tasks (GitHub Issues) that should be completed within two days.  
Developers still need to map out exactly how a feature will be put together by creating small enough tasks. For example, rather than just saying “Create shopping cart,” we can break these tasks down into various items, such as “Layout cart product list.”

This tracking also benefits our clients, because they can see exactly what we are working on for each bi-weekly sprint. They will be notified if features are completed ahead of or behind schedule, and there will be no surprises.

We also track our PMs’ time estimates, because they are not just account managers. They must have some technical understanding. It is important for PMs to learn from their miscalculations and improve their future estimates.

By comparing their estimates with the developer’s for the same feature, they can ask questions when there is a large deviation. They learn what takes more time, how technical debt affects a project, and how things work better technically.

Our PMs help find the sweet spot: they give their developers enough time to architect and code well while providing a reasonable time frame (and cost) to clients.

## Tracking elapsed time

![Toggl free time tracker](/images/blogs/a770dfea20_66e3144dc17092ac927ab21e_1_EmFTOYBD2bZZdqnNQ3FOpg.png)

SOURCE: TOGGL

Since our company has casual working hours, many colleagues may take coffee breaks or go for a chat. For EBS, these breaks are counted in the time spent for that feature. Some developers may take frequent breaks and work in quick sprints, while others may work continuously for four hours.  
In the end, if the estimated time and the actual time spent are the same, then both developers are still accurate. You can check your own working estimates with the app [Toggl](https://www.toggl.com/), leaving the timer on through breaks (however frequent or long) until a feature is completed. But this isn’t really necessary.

Because many tasks do take at least a few hours, developers can quickly log the issues they complete daily. Estimates such as 0.25 days are good enough. This is why we do not require time trackers.

We measure estimated versus actual time spent as “velocity.” If an estimate and tracked time are the same, we give it a 1. If a developer finished a task in 2 days, but estimated it would take 2.5 days, their velocity was 0.8, meaning they underestimated their speed.

The goal with tracking is not to become faster for the sake of it. **The goal of EBS is consistency and accuracy.**Consistency means that team members can predict each other’s delivery dates based on past performance. Accuracy means consistently achieving a velocity as close to 1 as possible (low range).

## Factoring developer estimates into project estimates

![evidence based scheduling software development](/images/blogs/ab6923fe97_66e3144d3cbc0064c74b7d92_Oursky-EBS-software-project-management-template.png)

A TEMPLATE FOR OUR GOOGLE SPREADSHEET FOR EBS

When a client comes to us with a project, our PMs break down the features and then estimate how much time is needed for each feature. By adding up all the features, including code reviews and QA, we can give a standard project estimate.

EBS helps us see how individual developers can affect projects. Since we started tracking, we have learned interesting patterns. For example, some developers may consistently overestimate their velocity, and are therefore behind their estimates. However, they may still end up finishing features faster than “average” and be on schedule.

Since this behavior is still predictable, our PMs now know how to adjust the estimates given to clients. In contrast, if we had a developer who constantly delivered ahead of time, our PMs would know that they might be able to give clients a tighter estimate.  
It just goes to show that evidence is even better than experience.

## Other EBS observations and learnings

![](/images/blogs/25cf0bb6a5_66e3144c25c887370b875520_1_RR8oubeQOm63YN90Uth0CA.jpeg)

PHOTO BY NEONBRAND VIA UNSPLASH

We did learn something else interesting: more experienced developers don’t necessarily estimate better. One possible reason is because we delegate complex features to them. Even with detailed planning, there is a high level of uncertainty. Issues need to be addressed as development progresses.  
The goal is to allow developers and PMs to give buffer time for tasks they cannot fully imagine yet, and use existing estimates for common tasks (such as login pages).

Another observation is that even though every product is different, some common tasks will always remain just as time-consuming. We should not try to rush for “optimization” just to cut costs.

EBS and task tracking on a spreadsheet has also helped us quickly identify recurring delay patterns with certain types of features.

Having evidence helps us track patterns so we can better understand our working styles. However, every project is a new project.

Joel showed how projects should [use a Monte Carlo simulation](https://www.joelonsoftware.com/2007/10/26/evidence-based-scheduling/), with 100 possible scenarios, each with 1% probability. This shows the full range of possible futures for a project based on a developer’s randomly selected historical velocity data. The goal is to narrow that range of ship dates for a client, not to fix a date and assume 100% accuracy every time.  
EBS has confirmed that software development is a probability.

## Final thoughts

![](/images/blogs/3564f42bb7_66e3144c25c887370b87551c_1_UAxIYFZyxxfhOwscbRcgCg.jpeg)

PHOTO BY FELIX PLAKOLB VIA UNSPLASH

For practical reasons, we still give clients an estimated delivery date for a project. We also invite our clients into a Basecamp projects so they know what we are working on each week.

When a company or developer (colleagues included!) gives you a project estimation, don’t just look at total days. Regardless of project length, ask for estimates broken down into features, and past records for project ship dates. Understand how a team does their project estimations first, and then factor that in to the long-term budgeting for your product.

I am one of Oursky’s co-founders and am the lead project manager for the company. As a startup founder, you teach yourself things on the go. Many of our project management best practices we developed along the way. You can check out my reflection on [how I became the project management bottleneck and how I solved it](http://blog.oursky.com/2017/11/28/project-management-startup-founders/).

Did you enjoy this post?

😻 At [Oursky](https://oursky.com/) we’re all about helping brands and entrepreneurs make their ideas happen. Get in touch if you’re looking for a partner to help build your next digital product.

‍
