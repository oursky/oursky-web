---
title: "Deconstructing the Monolith with Microservices"
description: "Deconstructing the Monolith with Microservices"
pubDate: 2025-01-28
author: "Ten Tang"
category: "engineering"
image: "https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/679956287edf02e003e39819_chuttersnap-9cCeS9Sg6nU-unsplash-scaled.jpg"
draft: false
webflowId: "6799564209f41a233c7f3a8c"
---

Whether a startup or an enterprise, businesses may not be able to predict how lucrative or large they’ll become or how cumbersome their software or applications will be in the long run. Many apps are built to address immediate needs. But as more businesses come in, these tools and technologies are slowly outgrown until they can no longer meet business requirements and even hamper operations.

That’s the gist of Netflix’s story. What started out as a fledgling subscription-based DVD provider 20 years ago evolved into a tech-driven company that revolutionized online media streaming. But Netflix is also more than just a media service provider — it’s also considered a role model for cloud computing and microservices.

![](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/67995620458240f81799ab15_chuttersnap-9cCeS9Sg6nU-unsplash-1160x773.jpeg)

Photo by [chuttersnap](https://unsplash.com/@chuttersnap?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

## What are microservices?

Microservices are an architectural pattern where various loosely coupled services work together to form an application. Each service serves a single purpose: to encapsulate all related logic and data. These services communicate with each other via well-defined application programming interfaces (APIs).

In 2008, a single slipup in Netflix’s monolithic architecture (i.e., single codebase with several modules or tiers) caused massive data corruption and downtime. That’s when Netflix’s architects decided to transition to microservices, with the aim of improving availability, scalability, and speed of delivering its services.

A microservices-based architecture enabled Netflix’s engineers to break up the system into independent services — for example, one for storing watched shows, another for online payments, and a separate one for analyzing customer histories and recommending similar content. By deconstructing the monolith into microservices, Netflix’s team is able to update any part of its infrastructures or systems without suffering significant outages.

## Why microservices?

A microservices-based architecture can solve several challenges of packaging and deploying applications by modularizing them. At the time, Netflix could not build data centers fast enough to keep up with the exponential growth of its user base. A microservices-based architecture enabled Netflix to scale components of its applications up or down, thus saving computational resources. Adopting microservices helped Netflix minimize the negative impact of bugs and sustain certain service levels even if a component in its applications is not working properly.

A microservices-based architecture also eases the cognitive load for developers. When a complex piece of software is broken down into independent subsystems, enterprises can better organize their development teams around these services. Developers need only care about the codes of the subsystems they work on and don’t have to worry about how their work may affect the other parts of the software. Communication between these subsystems are done through predefined messaging protocols. These enable them to communicate clearly and consistently and thus reduce communication overhead and conflicts in their workflows.

In a monolithic architecture, most development teams are limited to the technology stack they are using. This can discourage the team from exploring new technologies, not to mention hiring developers who use them. This is exacerbated by a cloud and digital skills shortage. In a recent Gartner [study](https://www.gartner.com/en/newsroom/press-releases/2019-07-24-gartner-survey-shows-pace-of-change-as-top-emerging-r), business executives cited pace of change (i.e., transformative strategies that mitigate an organization’s exposure to disruptions); the need to keep up with digitalization and emerging technologies; and talent shortage as the major risks to their businesses’ growth.

Microservices liberates the team from the constraints of their own technology stack. Services communicate via APIs, so it’s no longer necessary to write all the services in the same programming language. In a microservices-based architecture, a team, for instance, can flexibly use .NET as the back-end technology while writing services in Python. It is said that Netflix’s entire service comprises over [700 microservices](https://medium.com/refraction-tech-everything/how-netflix-works-the-hugely-simplified-complex-stuff-that-happens-every-time-you-hit-play-3a40c9be254b) that are regularly maintained by various engineering teams who work with different programming languages and different schedules to enhance agility in the development process.

## Adopting microservices can be a game changer

Netflix’s move wasn’t a walk in the park. As it steadily transitioned from a monolith into microservices — starting out with movie encoding and non-customer-facing applications — it had to contend with latencies, instance failures, and data migration among others. Today, Netflix boasts more than [182 million](https://www.nytimes.com/2020/04/21/business/media/netflix-q1-2020-earnings-nflx.html) subscribers in 190 countries. And what many people thought was outlandish turned out to be a game changer in cloud computing today. In fact, many high-profile companies, including Uber, Amazon, and Twitter have come to embrace this paradigm shift.

‍
