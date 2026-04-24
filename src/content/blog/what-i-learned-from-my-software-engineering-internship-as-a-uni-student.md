---
title: "What I learned from my software engineering internship as a uni student"
description: "What I learned from my software engineering internship as a uni student"
pubDate: 2025-01-28
author: "Oursky"
categories:
  - "culture"
displayCategory: "Culture"
image: "/images/blogs/631af278b9_6799534c36bc0d1279202abb_IMG_0578-768x576.jpg"
draft: false
webflowId: "67995361d1b6a0967d1ff97a"
---

![oursky taipei 台北](/images/blogs/4359782f24_679953455defbec984e29f9a_IMG_0578-720x540.jpeg)

Farewell dinner with Oursky’s Taiwan team

As well-paid as it seems, you may not be so sure if you want to spend the next ten years working as a software engineer. Me neither. I’m still a student, but I feel that losing direction enabled me to explore different possibilities.

I joined Oursky as part of the Chinese University of Hong Kong (CUHK)’s 2-month Global Internship Program. I spent my first and last week in [Oursky’s](http://oursky.com/) Hong Kong office and about 6 weeks in Oursky’s Taipei office. During my internship, one of my main job duties was to join one of the development teams working on an Android app that involved image recognition. I even presented about blockchain during one of our company sharing sessions. The two months were a good chance to take an early look into how life of a developer actually is before leaving school. It is quite different from what I had imagined before starting. Below are some of the things I didn’t even think about before joining that might help other computer science interns get the most out of their internship opportunities.

![oursky friday sharing session](/images/blogs/ada09753ef_679953459e5bbde3d22c3877_IMG_0562.jpeg)

During my internship, I presented about blockchain at Oursky’s Friday sharing session.

## To efficiently integrate into a team as a newbie, learn to…

### Ask good questions

Asking the right question saves you at least half the time. Learning to ask a good question is not easier than writing good code. I spent more than half my internship (1 month) to understand the skill of questioning, and the other half to learn _how_ to ask a “good” question. Below are my takeaways:

**Give the context of the question so that the listener knows what you are working on and your progress.** Talking only about the specific problem may not provide enough detail to get useful advice to solve it.

**Problems may be caused by issues that you may not have considered.** After I understood how giving the big picture helped reduce clarification questions from the listener, I found problems were solved much faster.

**Plan your question carefully so that the listener understands the current situation with minimum effort.** Respect the other person’s time and attention. In addition, since asking questions is a way of learning, why not get more out of it than just the answer by learning through planning the question. The effort pays off because you learn a new thinking process.

### Spend some time to read other people’s code

It is tempting to want to dive into a project and contribute or try things out yourself. But it is a good habit to have a look at how your teammates write code. Since you are joining a team, reading provides a guideline of what counts as ‘qualified code’. You also learn about the team’s (and even project specific) [naming conventions](https://m.oursky.com/naming-101-4b0b498f5161?source=collection_home---4------4----------------), code structure and design principles.

Each team has its own style of project management and preferred coding style. Pay attention to the design and confirm if a design is just a convention or if there is some reason behind it.

When I got started on my Android project, I figured out that API calls were handled in different ways — some were handled by callbacks while some were in the [Redux](https://blog.oursky.com/2018/02/13/redux-design-pattern-oursky/) store. As both methods achieve the same goal, I intuitively picked the one that was most convenient for me at the time. When my code was reviewed by the project tech lead, I was told that there are some principles for choosing which to use. For example:

*   Does single source of truth matter?
*   Do you want to maintain a global state?
*   Have you tried to avoid unnecessary communication between different screens?

I would not have had to take extra time to refactor my code if I had considered the principles before I started the work.

### Check your code in 2 weeks to see if it’s passable

[Write code that’s clean, understandable and maintainable](http://blog.oursky.com/2017/11/17/care-commit-quality/) as if your code will be viewed 10 years later.

Actually, reading your own code 2 weeks later is no different from reading other people’s code. I knew this was important but I didn’t pay a lot of attention on it. **I used to believe workable code is the first priority**. Every time I viewed my code from 2 weeks before, I was so embarrassed I wanted to kill myself.

Just as you would not like to spend hours to read and understand complicated code, teammates wouldn’t appreciate it either. Ensure classes and functions have a single purpose, and the purpose can be understood at the first glance.

### Understand the project requirements

The two most common project risks in software development are poor requirements and poor project planning. Misunderstanding project requirements makes what you do a waste of time. You can avoid this by putting a little bit more effort in communicating with your PM or tech lead to clarify the requirement.

![oursky taipei 台北](/images/blogs/4161ba2967_67995345690e28959ee2379b_IMG_0578.jpeg)

Farewell dinner with Oursky’s Taiwan team

## My biggest takeaways from working in a team:

*   Don’t write code that runs fast, but write code that can be understood fast.
*   Let your teammates know what you are working on.
*   Follow your team’s convention rather than your personal preferences.

Joining a new team was really tough and not just about fun. But when I could not always enjoy my work, I tried harder to engage myself with the work. Even though I wasn’t sure of what I wanted for my future, I knew that I could not learn or enjoy something if I decided that I hated it. This internship taught me that when we really try hard and tried our best to engage in one thing, we start to enjoy it.

‍
