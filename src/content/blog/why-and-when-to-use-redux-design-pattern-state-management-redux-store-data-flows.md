---
title: "Why and When to Use Redux Design Pattern: State Management, Redux Store, Data Flows"
description: "Oursky adopted the Redux design pattern across iOS, Android, and web development as a standard to cap the cost and complexity of projects."
pubDate: 2025-01-28
author: "Rick Mak"
category: "development"
image: "https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/66e30379cf1e65996dca8095_jason-leung-8-Hw2S-j3VU-unsplash-1160x773.jpg"
draft: false
webflowId: "66e303d633a4d3846b6da18d"
---

Oursky creates websites, software, and applications that run on multiple platforms — from JavaScript- and Angular- to React Native-based apps. Before adopting Redux, there was no common design pattern to adhere to. Back then, every project could have a different philosophy in how data flows were implemented.

As the lead engineer at Oursky, one of my responsibilities is to optimize development and engineering management. This is to minimize the mental overhead needed for developers to contribute to an existing project. One of the ways we used to address this was to adopt a Redux design pattern. In this blog, I’ll share the lessons we learned adopting [Redux design pattern](https://medium.com/@abhiaiyer/the-command-pattern-c51292e22ea7) across all platforms, why we’re using it, and how it can help fellow engineers and developers who are setting a standard to cap the cost and complexity of projects.

![Why and When to Use Redux Design Pattern: State Management, Redux Store, Data Flows](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/66e3039f73af8993a44fe0b1_jason-leung-8-Hw2S-j3VU-unsplash-1160x773.jpeg)

PHOTO BY [JASON LEUNG](https://unsplash.com/@ninjason?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) ON [UNSPLASH](https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

# What is a Redux design pattern?

In a nutshell, Redux is a way for [organizing data flows](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow) on the front end. Redux is essentially a library (and pattern) for state management, enabling developers to update the app’s state through ‘actions.’ It acts as a centralized repository for ‘states’ (called the [store](https://redux.js.org/tutorials/fundamentals/part-4-store)) that will be used across the entire app.

As a design pattern, Redux has specific guidelines on how data can flow through the project. A strict and predictable structure makes code easier to read and maintain. With predictable states, developers can write apps that behave consistently across clients, servers, and other native environments. The consistency makes the app is easier to debug and test, too.

Redux is often used by developers and engineers when working on React Native project structures, but as we’ve learned, Redux provides more than just state management. Redux is open-source, so there’s a thriving developer community around the world to help you with using it. You can use Redux with Angular, Vue, Polymer, and many others. Even Twitter and Uber’s developers [use Redux](https://github.com/reactjs/redux/issues/310)!

# Why Use Redux?

Predictability and maintainability are the main benefits of Redux. It also helps with server rendering (which improves user experience), and developers or engineers can keep track of changes in actions and states. Redux helps divide the app into smaller pieces that are easy to read, test, and debug. Here were some of our experiences with Redux:

### Redux lowers cognitive overhead so you don’t repeat yourself.

Though every project is different, the [principles for good and quality code](https://blog.oursky.com/2020/08/10/is-there-a-programming-language-to-rule-them-all/) are the same. Projects can follow a certain kind of principle so that a project can be kick-started quickly. If we are working on many different platforms, there needs to be a method for syncing the expectation of a project’s code to reduce the cost of context switching.

The Redux design pattern is versatile enough to apply to various platforms. Having a lower mental overhead allows other developers to just jump in and contribute, enabling them to devote their time to improving the code when rotating between projects.

### Redux design pattern provides consistency.

Without a standard, each developer will come up with a different design pattern for a new project. This isn’t to say that Redux is the best design pattern, but rather, Redux is simple enough to understand. Enforcing the use of Redux allows capped complexity in components.

Redux, as a design pattern, frames each project so that engineers can work together on the same Redux Store ([the single source of truth](https://redux.js.org/docs/introduction/ThreePrinciples.html)) and have the code merged cleanly. If you want to more about the core concepts behind using Redux (i.e., Redux [Store, Action, and Dispatch](https://medium.com/@abhiaiyer/the-command-pattern-c51292e22ea7)), you can refer to how fellow engineer [Ahbi Aiyer](https://medium.com/@abhiaiyer/the-command-pattern-c51292e22ea7) uses Redux.

### Redux helps developers recycle resources.

With the Redux design pattern, apps in different platforms have the same data flow, which means the requirements for APIs are the same. No platform specific API is needed. Improvement in one platform can be migrated to another platform, but it also allows for specific platform handling.

### Redux leverages the power of a team.

Once we expanded beyond our first hires to about 10-20 developers, we were taking on more projects and some with bigger scopes. One of the arguments for not expanding a company is that sometimes the additional effort on our admin, and the processes aren’t just worth the trouble.

On the other hand, having more team members also means we can take on more interesting projects together and share a greater pool of knowledge. Adopting a standard allows team members to learn from each other, because there is a common ground to approach a problem.

# Understanding Redux and Its Drawbacks

Redux does have its benefits, but not all apps need it. You and your development team need to understand the kind of app you’re creating, the problems you want to solve, and what tools can best address them. Here are some situations when to use Redux:

*   Dealing with shared state management
*   Addressing complex and huge amounts of states that need to be in different parts of the app
*   Working on large codebases with different people collaborating on it

Of course, no tool is perfect, and Redux also has its drawbacks. For example, it can result in a lot of boilerplate code as a tradeoff for allowing collaboration among developers. There may also be additional overhead – for example, you may be required to write more code to implement relatively simple actions and UI changes, like button clicks.

In addition, there is no recommendation on how normalized data should be in the Redux Store. For example, a person’s name maybe broken into many parts: first name, last name, nickname. Should the Redux Store store the parts or the full name? If storing the parts, the UI needs to be smart enough to assemble a full name. If the Store stores the full name, the UI will not be able to show the first name only without data redundancy in the store. The Redux design pattern does not have a set way to solve the [singleton problem](http://vojtechruzicka.com/singleton-pattern-pitfalls/).

Oursky is committed to improving our development process and best practices. As a flat-structured company, our fellows also contribute in optimizing code quality in different ways, such as setting up a [Kubernetes cluster for colleagues to deploy apps faster](https://code.oursky.com/built-kubernetes-cluster-coworkers-deploy-apps-faster/), [building a ChatOp integration into Slack for easier deployment](https://code.oursky.com/human-and-cat-friendly-chatops/), or [implementing evidence-based-scheduling](https://medium.freecodecamp.org/how-project-managers-and-developers-can-both-happily-give-realistic-ship-dates-2d5e4ec42df7)to encourage developers and project managers to do better estimations for features.

We’ve also experimented on other design patterns. Depending on their own needs and goals, other developers can consider trying are [VIPER in iOS](https://code.oursky.com/viper-ios-architecture-beyond-mega-viewcontroller/), [Model-View-ViewModel](http://web.csulb.edu/~pnguyen/cecs475/pdf/intromvvm%20ver%202.pdf) in Android and MVC in JS. If you’ve tried any of them and have had your own learnings, takeaways, and suggestions for us to try, [drop us a line and let us know](mailto:hello@oursky.com?subject=RE%3A%20Why%20and%20When%20to%20Use%20Redux%20Design%20Pattern)!

_Oursky is a DevSecOps-enabled agency comprising a diverse and socially progressive team of experts collaborating across different parts of the world. Ourskyers are technology-oriented who value craftsmanship. Our mission is to create open-source solutions and we’ve become part of the successes of the startups and enterprises we partnered with._ [_Schedule a no-commitment consultation with us_](https://oursky.com/contact) _and we can explore how to creatively use the right tools for the job!_

‍
