---
title: "Why Use Docker: Real-life Use Cases, Examples, and Takeaways"
description: "Why Use Docker: Real-life Use Cases, Examples, and Takeaways"
pubDate: 2025-01-28
author: "Queenie So"
categories:
  - "engineering"
displayCategory: "Engineering"
image: "/images/blogs/23e7d87e89_679954428efc312cbdfa142b_image (1).webp"
draft: false
webflowId: "6799545b9b3ffdecb20a74f7"
---

[Docker](https://www.docker.com/) just celebrated its [sixth anniversary](https://blog.docker.com/2019/02/22757/) earlier. Back in 2013, [Oursky](https://oursky.com/) was probably one of Docker’s earliest adopters, using it long before it went mainstream. And to be honest, when we start using Docker six years ago, we didn’t imagine that Docker would have evolved at an astonishing pace like this. Throughout our six-year journey with Docker, we found great potential in how Docker could benefit the company and get inspired by the use cases. In this blog post, we are going to share our own experience with you about:

1.  [Why we use Docker in the first place](https://blog.oursky.com/2019/07/03/docker-use-cases/#why%20use%20docker)
2.  [Our concerns before adopting it](https://blog.oursky.com/2019/07/03/docker-use-cases/#what%20concerns%20we%20had%20before%20using%20Docker)
3.  [How we adopt Docker](https://blog.oursky.com/2019/07/03/docker-use-cases/#how%20to%20adopt%20Docker)
4.  [Use cases and real-life examples in Oursky](https://blog.oursky.com/2019/07/03/docker-use-cases/#Docker%20use%20cases)
5.  [Takeaways and for whom Docker is](https://blog.oursky.com/2019/07/03/docker-use-cases/#using%20Docker)

## Why use Docker?

It’s interesting that our initial motivation for using Docker is trying out the latest technology (our company culture!). Python has been really popular in Oursky, and Docker just naturally caught our attention when it was first released in PyCon 2013.

Besides, we are a software company focusing on mobile app and web development, so we do a lot of server-side development and deployment day to day.

Before using Docker, we need to set up separate development environments for different languages. For example, we need to setup pyenv for Python, or rvm for Ruby.

At the same time, we encouraged our developers to pick the right programming language for each project – a part of our company culture. It’s not hard to imagine that, when our team is growing bigger, it becomes more and more difficult to maintain language-specific containment – especially for companies like us who love to embrace different kinds of technologies.

**Docker came under the spotlight since it is language-agnostic at containment level**, which means we can unify the environment and save a lot of setup time before kick-starting development. And for software development, saving time is not just about improving your own efficiency; it helps clients save costs too.

After using Docker, it brought more benefits to the company than we expected (we’ll go through the use cases and benefits in details at the later part of this article), and we soon became a fan of Docker and started expanding the scope of usage. Six years since, we have been using it more than ever!  

## Concerns we had before using Docker

![why use docker question](/images/blogs/73a678b3df_6799543945bd81b8300680e6_image.png)

SOURCE: [QIMONO](https://pixabay.com/users/qimono-1962238/) VIA [PIXABAY](https://pixabay.com/illustrations/question-mark-important-sign-1872665/)

Six years ago, Docker was still new to the market. Apparently, it did not promise plain sailing for adoption, and it was hard to find someone sharing experience online. These were the challenges we had when we first used Docker:

*   Mac support was not good; it was very challenging since we use MacOS for development.
*   There was no docker-compose at that time, which means there is no standard way to compose a Docker container. We have to spend extra time on configuring settings manually.
*   Docker was not stable when handling stateful instances, so we were only using Docker for stateless services for quite a long time.
*   We have no idea if it is a sustainable technology.

Despite the challenges, we all know that it takes time to discover the good and bad of a new technology. Not a single technology can be perfect at its first launch.

Though we had a few concerns, we still decided to be a pioneer of using Docker, considering the benefits that Docker could potentially bring to our engineering team. To be honest, we once thought [rkt](https://coreos.com/rkt/) may become more popular and replace Docker.  

## How we adopted Docker

![why use docker how to adopt Docker](/images/blogs/bad88e0dfb_67995439be65ccad3d1d116f_image-4-1160x773.png)

SOURCE: [DANIELLE MACLNNES](https://unsplash.com/@dsmacinnes) VIA [UNSPLASH](https://unsplash.com/photos/IuLgi9PWETU)

We adopted Docker gradually, from trial to full implementation. If you want to introduce new technology to your company, the first thing to do is to get your people to try. Here are the steps we took:

1.  We created a virtual machine that everyone can _freely deploy Docker app for fun_.
2.  We then _added a Docker building machine into our CD pipeline_, so that everyone can use Docker at the stage of CD. At that time, Travis-CI hasn’t supported Docker yet and so we reserved a single EC2 machine instead.
3.  We then _accepted Github commit trigger_ and built the repos according to the Dockerfile in that repo.
4.  After taking these steps, one of our developers became a super fan of Docker. He started to _send PR to different internal repos_ and _provided demos on how to use Docker_.
5.  Thanks to him, _a company-wide momentum was gradually gain_. We are glad to see that more and more developers tried Docker in different projects.

In the following year, Docker evolved remarkably. Container technology became a buzzword that you couldn’t ignore and big players started jumping into the container market.

Eventually, our whole pipeline is Docker-ready when all tech giants (like AWS, Azure and GCP) started supporting Docker. We widely adopted Docker within our company not just for deployment, but also at the development stage. **_Even our QA team uses Docker and built an_** [**_image_**](https://hub.docker.com/r/joyzoursky/python-chromedriver) **_with over 1 million pulls._**  

## Real-life use cases of Docker

![why use docker use cases](/images/blogs/03008f2a5c_6799543923af1a9d6bd719d6_image-1.png)

SOURCE: [RAWPIXEL](https://pixabay.com/users/rawpixel-4283981/) VIA [PIXABAY](https://pixabay.com/photos/hand-business-plan-business-3190204/)

So how can companies use Docker? Let’s take a look at some of Docker’s use cases and benefits in our company:

### 1\. Environment standardization

Since Docker documented instructions in how to create an environment with a Dockerfile, **you can minimize the inconsistency between different environments**. It is a big advantage that it makes your development environment repeatable. You can also ensure that every team member is working in the same environment.

In Oursky, we use docker-compose for development, [testing](https://www.freecodecamp.org/news/a-recipe-for-website-automated-tests-with-python-selenium-headless-chrome-in-docker-8d344a97afb5/), and production. The Dockerfile and docker-compose configuration file are committed to code repository, such that every team member has access to use it to create their own development environment. **Docker would make sure all created environments are consistent.**

### 2\. Faster configuration with consistency

With Docker, configurations become simple. **You can just put your configurations into code and deploy it.** You can also use your configurations repeatedly since Docker supports a wide variety of environments.

As we expected, one of the biggest benefits for using Docker in our company is **accelerating project setup**, especially for new developers. Development environment is the same for every developer. Once we have consistency, even new team members can skip the time-consuming environment settings and start development with any kind of programming language right away. By saving configuration time, we can spend more time on important things like development or QA testing.

Another benefit is that, once we have standardized the Docker configuration, we **save a lot of time from preparing the setup and deployment documentation** about the procedures and processes. Even with less documentation, we are still certain that the operation environments are consistent.

### 3\. Better disaster recovery

Disaster is unpredictable. However, you can back up a Docker image (also called “snapshot”) for the state of the container at that back-up moment, and retrieve it later when serious issues happen. For example, a hardware failure just happened and you need to switch your work to a new hardware. With Docker, **you can easily replicate the file to the new hardware.**

Our own example is, sometimes we found a bug when deploying a new version of one particular software. We can revert to the last version with the previous Docker image easily. Without Docker, we have to set up the rollback step from runtime to runtime. You can imagine rolling back to a PHP site and a Go binary, which are two different workflows. With Docker, we just need one workflow.

### 4\. Improvement in adoption of DevOps

We [envisioned that](https://code.oursky.com/dockerizing-our-python-stack/) the DevOps community will gradually use Docker as the first step towards standardizing contained deployment a few years ago.

When people talk about the relationship between Docker and DevOps, the first thing that comes to mind would be CI/CD. With Docker, the testing environment is consistent with your production environment. If those changes can pass CI/CD, they should work in production, too. In Oursky’s workflow, we use the same container for testing and production. Docker has a positive impact here to make the process from testing to production smoother.

Furthermore, standardization plays a key role for automation. **Docker simplifies DevOps by standardizing the configuration interface and makes machine setup simpler.** As Docker has a standard setup interface, you can ensure that the interface is standardized for all members, and no one will get frustrated with ever-changing user interfaces. Overall, we think Docker is a favorable tool for improving DevOps in the company.  

## Key takeaways and how to adopt Docker

![why use docker takeaways](/images/blogs/5ca510cd79_6799543900afd2ad0ddbd2d9_image-5-1160x773.png)

SOURCE: [PRISCILLA DU PREEZ](https://unsplash.com/@priscilladupreez) VIA [UNSPLASH](https://unsplash.com/photos/XkKCui44iM0)

You may have read a lot about Docker use cases, and finally made a decision to go for it. If you want to start using Docker in your tech team, we have a few tips for you:

### 1\. Don’t expect company-wide adoption overnight

Don’t push adoption overnight. Run Docker development in parallel with non-Docker projects first. You can encourage using Docker for deployment on small projects, and extend to bigger ones when the pipeline is ready and mature. Provide sufficient time for developers to get used to new technology, and to test if Docker fits into your company or operations. Docker is not a silver bullet; always test it on a small scale first.

### 2\. Not only for deployment, use Docker in workflow

Don’t limit its usage on deployment only. You can use Docker in the workflow, such as during development. In Oursky, we use Docker in environment setup and save time for new developers setting up projects.

Extend the usage at different stages and give developers more chance to try new technology. For example, Docker supports continuous integration & continuous deployment (CI/CD). This allows collaboration between team members through sharing of Docker images, and simplifies deployment.

There are plenty of CI/CD tools in the market providing solutions to that use Docker container technology and help improve your workflow, too.

### 3\. Provide incentives to use Docker

Sometimes, even developers can be skeptical about new technology. Provide more incentives to the developers. You can consider defaulting the CD pipeline with Docker setup. On the other hand, you can organize demos or sharing sessions to share practical use cases.

Encourage them to use it for development, deployment, and production. Only when the developers truly think that it is helpful to their work will they promote Docker usage organically.

### 4\. Prepare a set of Docker setup instructions for QA

We’ve known that Docker can simplify configurations and speed up environment setup, but it’s still better to have a set of Docker setup instructions for QA purposes. Take our company as an example. We have our in-house QA team. If the setup is standardized with Docker, we can save time for QA from setting up an app for testing.

## What’s next?

![](/images/blogs/91f820ce44_679954397f3630483833693e_image-2.png)

Source: [geralt](https://pixabay.com/users/geralt-9301/) via [Pixabay](https://pixabay.com/illustrations/board-school-immediately-soon-1647323/)

Six years ago, what Docker claimed – running containers anywhere regardless of environments or infrastructure – sounded too good to be true.

However, Docker has proved its benefits in every stage of software development or DevOps throughout the years. We are glad that we made the right decision in using Docker early, so that we can accumulate more use cases to refine our operations.

The whole container ecosystem is now growing bigger than ever. Apart from Docker, [Kubernetes](https://kubernetes.io/) also contributes to the growth of the container ecosystem. In a nutshell, Kubernetes is an open-source system for automating deployment, scaling, and management of containerized applications. It enables management of containers at scale. Along with the popularity of Kubernetes, all major cloud providers have incorporated Kubernetes as the orchestration layer when providing container services.

If you want to further understand Docker, Kubernetes, and the container ecosystem, here are a few useful links for your reference:

*   [A High-Level History of the Container Ecosystem, 2013-2019](https://containerjournal.com/2019/04/01/a-high-level-history-of-the-container-ecosystem-2013-2019/)
*   [What is a Container?](https://www.docker.com/resources/what-container)
*   [Docker and Kubernetes](https://www.docker.com/products/kubernetes)
*   [Beyond Docker and Kubernetes: The container ecosystem continues to evolve](https://www.computerweekly.com/feature/Beyond-Docker-and-Kubernetes-The-container-ecosystem-continues-to-evolve)

Interested in knowing more about Docker use cases or sharing your thoughts? Please leave your comments below and we look forward to hearing from you.

If you are looking for consultancy on applying Docker or DevOps, or seeking a technology partner to develop microservices-based applications for you, [talk to our consultant](https://oursky.com/) and we’d love to help by sharing our expertise with you!

‍
