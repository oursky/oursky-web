---
title: "Microservices 101: A Glossary of 11 Most Popular Terms and Acronyms"
description: "A summary of most popular terms to help build fundamental knowledge about microservices, and how it relates to DevOps, containers or Kubernetes."
pubDate: 2025-01-28
author: "Oursky Team"
categories:
  - "development"
  - "engineering"
displayCategory: "DEVELOPMENT"
image: "/images/blogs/6c20d839c7_66e316bd14404e1e88b7fb58_photo-1546074177-ffdda98d214f.webp"
draft: false
webflowId: "66e31739014e7117d707c321"
---

![microservices terms](/images/blogs/90c6250e71_66e31719ed43523cfd3e3e8f_photo-1546074177-ffdda98d214f-1160x870.jpeg)

SOURCE: [NICOLE HONEYWILL](https://unsplash.com/@nicolehoneywill) VIA [UNSPLASH](https://unsplash.com/photos/vcF5y2Edm6A)

Microservice architecture is becoming more popular than ever, especially among agile and DevOps teams. You may have heard of a lot of buzzwords like “microservices,” “containers,” and “Kubernetes.” There is no doubt that microservices are full of complex theories and terminologies. Here we are going to introduce a glossary of 11 of related terms and acronyms used most commonly with microservices to help you better understand how they would benefit your team.

## Microservices

_Microservices are an architectural pattern where various loosely coupled services work together to form an application. Each of these services focus on one single purpose only, that is, encapsulating all related logic and data. Communications between services are conducted over well-defined APIs._

Some may ask, “_What is the difference between microservices and web services?”_ While the latter always provides services over HTTP via the world wide web, Microservices are not restricted to that. It can run on non HTTP, communicate through application programming interfaces (APIs), be served over file descriptors, or be developed over messages or email.  

### Application under a monolithic architecture

In a monolithic architecture, the application is built as a whole unit where functions and services are tightly coupled. When an error is thrown and not handled properly, the entire unit including services that are not related to the error will be brought down. Also, for any code changes or version update on even one service to take effect, a restart of the entire monolith (including all other services) is required.  

### Application under a microservice architecture

Since the service components are decoupled and self-contained, errors thrown in one service will be handled right there. To release code changes on one service, restarting that specific service will suffice. Other services are left unaffected. As a result, the deployment speed of the application as a whole is improved.

Different tech stacks can be adopted across services as well, as each of them has become self-contained while communications are carried out via pre-defined APIs. You can build service A with Java and service B with JavaScript – they’ll work nicely together as long as the inter-service APIs are reliable and defined well enough.

There is improvement in the scalability of the application, too, as each can be scaled independently. Say the traffic on service A has increased drastically over the last five minutes and it is now struggling to deal with the increased amount of requests due to a lack of computational power. This issue can be tackled by simply scaling up the resources on service A. Once again, other services are left untouched.  

### Key Benefits

*   Service-level independent development and deployment cycle
*   Shortened deployment time
*   Different services can adopt different tech stacks
*   Service-level fault isolations
*   Improved modifiability
*   Improved scalability

### Service Providers

*   AWS
*   Google
*   IBM

### Read More

*   [https://smartbear.com/learn/api-design/what-are-microservices/](https://smartbear.com/learn/api-design/what-are-microservices/)
*   [https://en.wikipedia.org/wiki/Microservices](https://en.wikipedia.org/wiki/Microservices)
*   [https://www.edureka.co/blog/what-is-microservices/](https://www.edureka.co/blog/what-is-microservices/)
*   [https://searchmicroservices.techtarget.com/definition/microservices](https://searchmicroservices.techtarget.com/definition/microservices)
*   [https://www.quora.com/What-is-micro-services-and-how-is-it-different-from-web-services](https://www.quora.com/What-is-micro-services-and-how-is-it-different-from-web-services)

## Agile Development

_Based on the_ [_Manifesto for Agile Software Development_](https://www.agilealliance.org/agile101/the-agile-manifesto/) _and the_ [_12 Principles_](https://www.agilealliance.org/agile101/12-principles-behind-the-agile-manifesto/) _behind it, agile development is an umbrella term for software development methodologies that promote disciplines and collaboration between cross-functional teams in the app development process with optimized work flow and continuous improvement._

Agile development emphasizes iterative development where each team and team member are self-organized and accountable for the product quality. It promotes a set of software engineering best practices such as simple design, pair programming, continuous integration, and test-driven development, etc. The ultimate goal of agile development is to deliver a high-quality product rapidly through frequent iteration and careful inspection. To achieve this, it is important to keep features small and incremental.  

### Key Benefits

*   End users are satisfied with a rapidly delivered product with high quality and reliability.
*   Client is satisfied when app vendors can respond to requests and iterate versions quickly.
*   Vendors are able to shorten the product delivery time.
*   Client and vendors can work closely together to ensure every new feature is aligned with business goal.

### Read More

*   [https://www.agilealliance.org/agile101/](https://www.agilealliance.org/agile101/)
*   [https://www.cprime.com/resources/what-is-agile-what-is-scrum/](https://www.cprime.com/resources/what-is-agile-what-is-scrum/)
*   [https://www.atlassian.com/agile](https://www.atlassian.com/agile)
*   [https://searchsoftwarequality.techtarget.com/definition/agile-software-development](https://searchsoftwarequality.techtarget.com/definition/agile-software-development)

## Serverless Cloud Computing

_Serverless cloud computing (or “cloud functions hosting”) is a cloud service that allows building and deploying applications in the cloud without involving infrastructure management. Going serverless means you can avoid provisioning or managing servers, virtual machines, or containers._

Traditionally, we have to carefully provision, manage, and monitor the bare-metal servers no matter where they’re located, (on site or cloud). To provide all-day services, the servers are up and running 24/7 even if there is no incoming event. We also have to apply regular security updates and scale resources according to the real-time conditions. All these consume your team’s time and effort, which can be invested elsewhere, e.g. deliver new features, refactor existing functions, or try out some latest tech trends.

Serverless cloud computing is an alternative. It allows users to build and run applications without having to think about servers. You don’t have to mess with the server’s infrastructure. All you have to do is upload the application’s code and let the server provider take care of the rest.

The term “serverless” can be misleading though – an actual server is still up and running somewhere, you just don’t have to care about it.

Using serverless clouding computing services might help you save some money as well.  
You pay for the actual amount of computational resources consumed, unlike renting a dedicated server where you get charged a fixed amount regularly. In other words, you pay only when your code runs.

Sometimes people mix up the terms serverless and PaaS (Platform as a Service). In fact, PaaS runs anything you deployed in the platform, whether it is just a function or huge services. Though both serverless and PaaS support horizontal scaling, serverless applications scale instantly, automatically, and on-demand while PaaS needs manual provision.  

### Key Benefits

*   Time and effort used on server setup and maintenance can be allocated elsewhere
*   On-demanding billing
*   Auto-scaling
*   Increased efficiency for deployment with lower cost

### Corporations which adopt Serverless

*   Coca Cola
*   Nordstom
*   Expedia

### Service Providers

*   AWS Lambda
*   IBM Cloud Functions
*   Microsoft Azure Functions
*   Oursky [Skygear](https://skygear.io/) Cloud Functions

### Read More

*   [https://serverless-stack.com/chapters/what-is-serverless.html](https://serverless-stack.com/chapters/what-is-serverless.html)
*   [https://serverless.com/learn/overview/](https://serverless.com/learn/overview/)
*   [https://aws.amazon.com/serverless/](https://aws.amazon.com/serverless/)
*   [https://www.cloudflare.com/learning/serverless/what-is-serverless/](https://www.cloudflare.com/learning/serverless/what-is-serverless/)
*   [https://www.serverlessops.io/what-is-serverless](https://www.serverlessops.io/what-is-serverless)
*   [https://codingsans.com/blog/serverless-apps](https://codingsans.com/blog/serverless-apps)
*   [https://hackernoon.com/what-is-serverless-architecture-what-are-its-pros-and-cons-cc4b804022e9](https://hackernoon.com/what-is-serverless-architecture-what-are-its-pros-and-cons-cc4b804022e9)
*   [https://www.bmc.com/blogs/serverless-paas/](https://www.bmc.com/blogs/serverless-paas/)
*   [https://www.cloudflare.com/learning/serverless/glossary/serverless-vs-paas/](https://www.cloudflare.com/learning/serverless/glossary/serverless-vs-paas/)

## DevOps

_The word DevOps is combination of “development” and “operations.” In traditional development lifecycles, also known as the Waterfall model, a product is released after going through the following phases: Design -> Development -> Test -> Deployment. What if some parts of the design are changed at any of those phases? Do we need to go through every phase again?_

The **Agile** approach tackles this. The above phases are repeated and iterated swiftly and frequently. DevOps practices then come in, adopting **continuous integration and continuous delivery (CI/CD)** approaches through automation to deliver new features in each product sprint. It’s like breaking the waterfall model down into bits and iterating through each of them. Sounds intuitive, right?

Like physics, when things move fast enough it behaves differently. That is something DevOps is trying to address. By practicing the concept of CI/CD, developers do not need to always care about which or what servers the code is being deployed to. The developer only needs to push code to the source control server. The code uploaded is run through automated tests then built regardless if it is an .apk, .ipa, index.js, .jar, a docker image, or something else.

By practicing  **Infrastructure as Code (IaC)**, every instance behaves the same as many human errors as possible. The whole system is documented and reproducible. Discussions and reviews can now be conducted on code, instead of having to dive in various servers and type in some long procedural commands. Code changes now apply to all server instances, making them more manageable.  

### What is DevOps?

DevOps can be a set of cultures or practices that bridges the gap between development and operations. Development team wants their features to be released swiftly to complete each sprint’s objectives. The operations team wants the system reliable, but adding more new features mean more risks.

DevOps breaks down the barriers of development and operations, accelerating the development cycle by applying the practices of **CI/CD**, **IaC**, and tools like **serverless cloud computing**, **container,** and **Kubernetes**. DevOps is basically involved in every part of the development lifecycle: testing, deployment, monitoring and scaling (maintenance).  

### Key Benefits

*   Accelerate speed of development and deployment
*   Enhance product reliability and quality by emphasizing shared responsibilities
*   Enhance security by applying automated security protocols and best practices
*   Improve scalability by automating and standardizing the process

### Read More

*   [https://theagileadmin.com/what-is-devops/](https://theagileadmin.com/what-is-devops/)
*   [https://aws.amazon.com/devops/what-is-devops/](https://aws.amazon.com/devops/what-is-devops/)
*   [https://www.atlassian.com/devops](https://www.atlassian.com/devops)
*   [https://docs.microsoft.com/en-us/azure/devops/learn/what-is-devops](https://docs.microsoft.com/en-us/azure/devops/learn/what-is-devops)
*   [https://www.mongodb.com/what-is-devops](https://www.mongodb.com/what-is-devops)
*   [https://hackernoon.com/what-is-devops-and-why-i-should-have-it-e60f1ee446d2](https://hackernoon.com/what-is-devops-and-why-i-should-have-it-e60f1ee446d2)
*   [https://sdarchitect.blog/2012/07/24/understanding-devops-part-1-defining-devops/](https://sdarchitect.blog/2012/07/24/understanding-devops-part-1-defining-devops/)

## Continuous Integration/Continuous Delivery (CI/CD)

_Continuous Integration (CI) means continuously integrating all works within a team to one shared mainline (i.e., a development branch on Git) at a high frequency to reduce integration overhead. This is usually done through some automated building and deployment processes._

_Continuous Delivery (CD) is an approach where teams produce and release software in short cycles, hence testing and monitoring can be carried out at a more frequent manner. CD aims to get the software ready and stable enough for release at any time._

_CI/CD are two of the most popular philosophies adopted by DevOps teams targeting to build an automated pipeline to deliver product to end users at a fast pace._

Here are some generally good CI/CD practices:

*   Each developer frequently commits the changes made to his/her working branch.
*   Regularly merge to and rebase from the mainline.
*   Software has a frequent build-and-release cycle.
*   Ensure each team member gets access to the latest build.

### Key Benefits of CI

*   Avoids debugging at the final stage and allow bugs to be found at earlier stages
*   The most recent codes are available to all members all the time
*   Easier to locate issues across different versions as releases are done frequently
*   Reduce version control overhead due to frequent code check-ins

### Key Benefits of CD

*   Improved product quality and reliability through-continuous testing before formal releases
*   Accelerated delivery time to the market because of fast building
*   Feedback and testings are made quickly, which help build the right product

### Read More

*   [https://en.wikipedia.org/wiki/Continuous\_integration](https://en.wikipedia.org/wiki/Continuous_integration)
*   [https://medium.com/@william456821/什麼是-ci-cd-72bd5ae571f1](https://medium.com/@william456821/%E4%BB%80%E9%BA%BC%E6%98%AF-ci-cd-72bd5ae571f1)
*   [https://medium.com/@nirespire/what-is-cicd-concepts-in-continuous-integration-and-deployment-4fe3f6625007](https://medium.com/@nirespire/what-is-cicd-concepts-in-continuous-integration-and-deployment-4fe3f6625007)
*   [https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment](https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment)

## Continuous Deployment

_Continuous deployment is an approach that shortens the time lapse between writing and releasing codes into production environments. Through automation, it ensures a reliable and validated application / service to be deployed for production at any time, in a frequent and sustainable way._

Continuous deployment can be regarded as the next step of continuous delivery. While continuous delivery ensures that the developers’ changes are tested to be deployable at any time (which is fundamental in DevOps philosophy), continuous deployment can be optionally adopted to automate the changes to be deployed to production.

### Key Benefits

*   Feedback from users is quickly given by enabling frequent release of updates
*   Improved product quality
*   Earlier return on investment in the product

### Read More

*   [https://sdarchitect.blog/2013/10/16/understanding-devops-part-6-continuous-deployment/](https://sdarchitect.blog/2013/10/16/understanding-devops-part-6-continuous-deployment/)
*   [https://www.agilealliance.org/glossary/continuous-deployment](https://www.agilealliance.org/glossary/continuous-deployment/#q)
*   [https://puppet.com/blog/continuous-delivery-vs-continuous-deployment-what-s-diff](https://puppet.com/blog/continuous-delivery-vs-continuous-deployment-what-s-diff)
*   [https://devops.com/continuous-delivery-vs-continuous-deployment/](https://devops.com/continuous-delivery-vs-continuous-deployment/)
*   [https://puppet.com/blog/continuous-delivery-vs-continuous-deployment-what-s-diff](https://puppet.com/blog/continuous-delivery-vs-continuous-deployment-what-s-diff)

## Infrastructure as Code (IaC)

_IaC is the foundation of DevOps methodology. It is how you manage and provision the configurations of infrastructure such as servers, virtual machines, or load balancers in a codified and automated way. Each configuration file will generate an exact deployment environment. In this way, it can prevent inconsistency and reduce manual work (there’s no need for setting up on a portal). It also assists in scaling and automation._

IaC is not just about codes or automation. It requires modelling the infrastructure with machine-readable definition files (e.g. JSON / XML / YAML etc.) properly with proven software best practices. By adopting best practices, we can ensure that the server (infrastructure) could be redeployed to multiple servers without errors, i.e., a single person can configure multiple machines properly with just one click.

### Key Benefits

*   Accelerated production speed with early testing and faster development
*   Reduced potential risks (e.g., errors, security vulnerabilities)
*   Prevention of inconsistencies in deployment environments
*   Cost efficiency (less manual work involved)
*   Better scalability

### Sevice Providers

*   Vagrant
*   Ansible
*   Puppet
*   Docker

### Read More

*   [https://en.wikipedia.org/wiki/Infrastructure\_as\_code](https://en.wikipedia.org/wiki/Infrastructure_as_code)
*   [https://docs.microsoft.com/en-us/azure/devops/learn/what-is-infrastructure-as-code](https://docs.microsoft.com/en-us/azure/devops/learn/what-is-infrastructure-as-code)
*   [https://searchitoperations.techtarget.com/definition/Infrastructure-as-Code-IAC](https://searchitoperations.techtarget.com/definition/Infrastructure-as-Code-IAC)
*   [https://puppet.com/solutions/infrastructure-as-code](https://puppet.com/solutions/infrastructure-as-code)
*   [https://sdtimes.com/cicd/infrastructure-configuration-code-come-cicd-rescue/](https://sdtimes.com/cicd/infrastructure-configuration-code-come-cicd-rescue/)

## Infrastructure as a Services (IaaS)

_IaaS is one of the cloud computing services that provide computing resources for the use of infrastructure, such as cloud hosting and virtualized hardware over the internet._

IaaS often charges based on the demand, like how much computing power you consume from virtual machines. Since it is hosted by third-party service providers, you are able to scale up and down quickly with pay-per-use basis. IaaS could be used at production, or it could be very effective especially when your infrastructure demand is temporary or experimental, such as developing a new product that doesn’t have a significant workload yet.

### Key Benefits

*   Easy management of infrastructure and helps developers focus on using the service and support
*   Cost efficiency, i.e., you do not need to set up your own data center
*   Less time spent on setting up infrastructure; in turn, development can be started at any time
*   Scalability with unknown demand
*   Increased focus on prioritizing what users truly feel (e.g. business values, UI/UX, etc.) without provisioning effort to maintain infrastructure
*   Better stability and reliability with best practices of the infrastructure in place
*   Better security and disaster recover strategy provided by infrastructure expertise

### Service Providers

*   AWS EC2
*   Google Cloud Platform
*   Microsoft Azure

### Read More

*   [https://en.wikipedia.org/wiki/Infrastructure\_as\_a\_service](https://en.wikipedia.org/wiki/Infrastructure_as_a_service)
*   [https://searchcloudcomputing.techtarget.com/definition/Infrastructure-as-a-Service-IaaS](https://searchcloudcomputing.techtarget.com/definition/Infrastructure-as-a-Service-IaaS)
*   [https://azure.microsoft.com/en-us/overview/what-is-iaas/](https://azure.microsoft.com/en-us/overview/what-is-iaas/)

## Container Technology

_People nowadays use the term container or Docker interchangeably. But a container actually refers to the capabilities to run programs on various runtime environment as guest over the host operating system (OS), which is achieved via technologies like Linux Container (LXC_ ) _or libcontainer. LXC isolates the filesystem, memory, and network through namespaces and cgroup._

Container abstracts the OS, which only packs the user space (referring to the executables and files of our app), so it is considered lightweight compared to **virtual machine (VM)**. VM, on the other hand, abstracts the communications among hardware, packing the code and the guest OS in the image that run on top of a hypervisor or host OS.

Docker is a higher level of abstraction over LXC/libc driver. Docker is commonly regarded as the industry standard of container. Most developers are coding and deploying containers as Docker. Docker provides a standard that defines containers, delivering a myriad of benefits like portability, easy versioning and sharing of images, which is a good practice of IaC (Infrastructure as Code).

### Key Benefits

*   Deployable on different service providers
*   Lightweight design with more flexible resource allocation
*   Able to run anywhere because of standardization and consistency
*   Better scalability

### Service Providers

*   Google Kubernetes Engine (GKE)
*   AWS Elastic Container Service (ECS)
*   Amazon Elastic Container Service for Kubernetes (EKS)
*   Docker Swarm
*   Apache Mesos

### Read More

*   [https://www.techradar.com/news/what-is-container-technology](https://www.techradar.com/news/what-is-container-technology)
*   [https://www.docker.com/resources/what-container](https://www.docker.com/resources/what-container)
*   [https://cloud.google.com/containers/](https://cloud.google.com/containers/)
*   [https://medium.com/flow-ci/introduction-to-containers-concept-pros-and-cons-orchestration-docker-and-other-alternatives-9a2f1b61132c](https://medium.com/flow-ci/introduction-to-containers-concept-pros-and-cons-orchestration-docker-and-other-alternatives-9a2f1b61132c)
*   [https://aws.amazon.com/containers/](https://aws.amazon.com/containers/)

## Kubernetes (k8s)

_By_ [_official definition_](https://kubernetes.io/)_, Kubernetes (also known as “k8s”) is “an open-source system for automating deployment, scaling, and management of containerized applications.”_

Imagine your product becomes a worldwide hit overnight and a massive amount of users are rushing in. While the traffic has grown drastically over a short span of time which is a good thing, you’ll have a few problems to solve. How can you keep the system healthy while scaling the resources to deal with the significantly increased traffic? How do you release features gradually to test users’ acceptance towards them?

A costly solution to handle the grown amount of traffic would be renting a lot more servers, paying for more tools, and expanding your Ops team to closely monitor your services. But you just might not have the big bucks (yet) to do this, and it may nit manageable and scalable.

Tools like Kubernetes (k8s) addresses this. Kubernetes orchestrates containers in deployments, scaling resources automatically. You can also set up and implement approaches like High Availability (HA) architecture, resources planning, and many more plugins like alerting CI/CD on k8s. The benefits of adopting containerization also include portability, independence of service providers, and productivity.

In summary, k8s provides a whole ecosystem to operate on. The growth of traffic can be handled by automatically scaling the k8s cluster workers and replicas of container (_pods_in k8s term). Rolling update can be achieved with zero downtime as well. It also allows utilization of resources like over-provisioning for efficient use or guaranteed Quality of Service.

### Key Benefits

*   Improved productivity for development and deployment
*   Integration of CI/CD with zero downtime
*   Independence from service/cloud providers (pods or containers)
*   Efficiency in resource utilization
*   Better observability
*   Highly Availability cluster running on multiple zones

### Read More

*   [https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
*   [https://www.infoworld.com/article/3268073/kubernetes/what-is-kubernetes-container-orchestration-explained.html](https://www.infoworld.com/article/3268073/kubernetes/what-is-kubernetes-container-orchestration-explained.html)
*   [https://www.redhat.com/en/topics/containers/what-is-kubernetes](https://www.redhat.com/en/topics/containers/what-is-kubernetes)
*   [https://blog.containership.io/k8svsdocker/](https://blog.containership.io/k8svsdocker/)

To illustrate the mentioned terms in real-life examples, imagine you are now going through a mobile app development process. To optimize the development process, you can:

1.  Adopt agile development to introduce a corporate culture of discipline and encourage collaboration between cross-functional teams.
2.  Adopt DevOps and apply best practices such as CI/CD, continuous improvement, and continuous deployment to enable a rapid and reliable deployment.
3.  Opt using VM, serverless, or microservices (such as [Skygear](https://skygear.io/)) in the architecture to minimize maintenance costs of physical infrastructure.
4.  Apply containers (such as Kubernetes) for the main API server to standardize the environment from development to production.

Of course, a glossary of 11 popular terms is not enough to understand the full picture, but we hope the article helped you better understand what microservices, containers, or serverless cloud computing are. We will keep updating the glossary, so stay tuned by subscribing to us!

‍
