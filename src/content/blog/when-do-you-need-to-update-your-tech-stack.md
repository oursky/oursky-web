---
title: "When do you need to update your tech stack?"
description: "When do you need to update your tech stack?"
pubDate: 2025-01-28
author: "Ten Tang"
categories:
  - "project-management"
displayCategory: "Project Management"
image: "/images/blogs/032277f452_6799518696dda19f1d20e111_austin-chan-275638-768x512.jpg"
draft: false
webflowId: "679951a10615a7e0ea74f91a"
---

![](/images/blogs/6fdd8bccc1_6799517edaa2fabb50340d8a_austin-chan-275638-720x480.jpeg)

Photo by Austin Chan via Unsplash

Recently, I started bouldering even though I’m afraid of heights. The best thing is that it doesn’t matter how you solve a problem as long as you get to the end. It’s like the companies that I’ve been talking to recently who all use different platforms, technologies, and libraries to build digital products.

But no development team wants to spend time rewriting code. (The exception would be rapid prototyping where the MVP is intended to be scrapped after proof of concept.) But being forced to switch your code base because of unforeseen problems such as platforms shutting down or libraries becoming available for a specific technology platform can be a costly setback for business.

The good news is that companies can take steps to lower the risk of being forced to switch. These are based on cases companies have encountered when discussing backend solutions with Oursky.

## Common reasons to switch tech stacks

![](/images/blogs/bbaeae8d9d_6799517e45bd81b83003b2e8_christian-sterk-218727.webp)

Photo by Christian Sterk via Unsplash

Generally, there are 5 scenarios I encounter when speaking to companies considering Skygear, my company’s serverless backend solution.

*   Entering a new market that requires in-country data storage (i.e. China, and maybe future countries with data protection regulations)
*   Deprecated frameworks or outdated platforms
*   New feature requirements that their previous code base cannot support
*   Suffering performance and scalability issues
*   Very specific features available only with one technology

Below, are some considerations for entrepreneurs or developers aiming to build products that are maintainable and extensible.

## Entering new markets

![](/images/blogs/7e777e0957_6799517ed42e2f08f180edce_jamie-templeton-428883.webp)

Photo by Jamie Templeton via Unsplash

If you want to enter the Mainland China market, take a pause. Does your business use Gmail and Google Analytics? You will need replacements. If you have apps using Firebase, you’ll need another serverless solution and you’ll need separate hosting for China. Companies consider Skygear because it has server hosting in China and companies using our open-source version with their own hosting have no additional costs.

We also suggest companies do research on security and privacy when using third-party services, which is one reason to use open-source technologies. When doing business in China, look for hosting solutions that have servers inside and outside China so that you don’t lose visitors due to site load times and performance issues.

## Deprecated frameworks or outdated platforms

![](/images/blogs/704a7ed75f_6799517e5908fb6007678dcb_pablo-garcia-saldana-27622.webp)

Photo by Pablo Garcia Saldaña via Unsplash

One client that I spoke to was using an early version of Angular JS that is no longer supported by the latest libraries. Developing with libraries helps rapid development and also leverages code from the global community. However, version updates and compatibility across platforms also becomes a common tradeoff.

Deprecated libraries are one of the most common problems for development and is an argument for companies to build everything in-house. However, open-source libraries gives developers access to great tools that they can fork and maintain for specific use cases. For example, Android was developed based on certain parts of Linux, an open-source operating system. The Skygear team used an iOS UIKit that was later deprecated, but since it was open-source forked it.

Popular frameworks have benefits and risks. They benefit from community support and maintenance, but can also become obsolete after a few years. Therefore, consider the modularity of the libraries you choose. Loosely coupled libraries are easier to maintain or replace in the future.

When using API-as-a-service, serverless, or BaaS solutions, consider products developed by companies that have their whole business dependent on the product (rather than venture-backed). According to some statistics, 75 percent of venture-backed companies never return cash to investors, which also means their services will also be shutdown. In addition, VC-backed companies are looking for high-return exits, which isn’t always aligned with keeping a technology or service publicly available. In fact, many founders are aiming for acquisitions knowing that their product will be shut down. Even side projects but deep-pocketed companies (such as Parse for Facebook) may shutdown when the cost becomes too high. Companies that create services that they use internally as well will have an interest in maintaining the service as an end user.

## Their existing code base cannot support new features

![](/images/blogs/beaa1969be_6799517eb3407cd04b0871ba_joshua-ness-112783.webp)

Photo by Joshua Ness via Unsplash

One client came to us because their product’s features began to break and their code base was not maintainable. Adding new features was taking an increasingly long time, which meant there was huge technical debt. In addition, regression bugs were frequent and fixing them was time consuming. Issues included navigation problems, loading errors and app crashes. Still, the company wanted to add video recording and sharing features to boost engagement. This product’s backend didn’t just need updating; it needed to be rewritten with better architecture with a backend that was extensible.

No matter how well you plan, it’s difficult to know which direction your product will go. A lot depends on user adoption and feedback. Code updates will be necessary with new API or language versions. But when maintenance becomes a nightmare that takes time away from improving or building new features, you should consider a fresh start. Our first advice to customers is almost always not a fresh start, unless the code is really not maintainable. We recommend incremental refactoring. Teams can focus on the parts that are easiest to refactor and deliver huge performance gains.

## Suffering performance and scalability issues

![](/images/blogs/1f104f54e0_6799517ede1f0564894b08b6_enrapture-media-266831.webp)

Photo by Enrapture Media via Unsplash

Product architecture becomes obvious when a company scales and there are more users. One company we worked with a few years ago used Facebook’s Parse for its backend for rapid development, but discovered that the platform could not handle over 3,000 concurrent users. No matter how much they paid Parse, the service was extremely slow or crashed. The app was rapidly adopted, but the technology became a limiting factor and cost sink. The Parse backend platform was never designed for scalability, but newer backend-as-a-services have learned and are.

Our painful experience with Parse was how we began working on Skygear as our own in-house backend-as-a-service. Our developers needed scalability (able to handle high concurrent usage) and flexibility for different development use cases.

Another common mistake is to completely rewrite the backend once the original MVP cannot handle the increased traffic. In our experience, a much better way is to identify the slowest part and to refactor the code base into different services. These services should separate stateless and stateful components, so that stateless services could be horizontally scaled (usually with auto-scaling and containerization technologies), and stateful components are simpler for developers to design a more scalable implementation.

## Very specific features available only with one technology

![](/images/blogs/9eee232077_6799517ea81f96c1ee913dde_veronica-benavides-331238.webp)

Photo by Veronica Benavides via Unsplash

Sometimes, a tech stack change may boil down to one specific feature need. For example, one company we worked with wanted to do image classification and our company tested two technologies for performance. Ultimately, despite TensorFlow being superior in identifying our target objects, the other technology had one feature the company needed: it could recognize hand-drawn items and match them to existing photos better. This one requirement meant that we had to replace the classification engine.

If the libraries or software you need is on the backend, it doesn’t make sense to update the tech stack just because you need one specific library. A better way is to make it a service for the original backend software and connect the two via some queue or APIs.

If you are beginning to experience some strains on your product, do a diagnostic to see if you can refactor parts of the code and optimize for different services. Of course, if you want us to to have a look and give a third-party opinion, please get in touch!

‍
