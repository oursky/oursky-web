---
title: "Dockerizing our Python stack"
description: "Dockerizing our Python stack"
pubDate: 2025-01-28
author: "Rick Mak"
categories:
  - "development"
displayCategory: "Devops"
image: "/images/blogs/018361b6e4_6799270aed5f0f3cde9a9acc_docker-cover.webp"
draft: false
webflowId: "6799272c15958e6f60ac44f7"
---

![](/images/blogs/19b4ff1482_67992714d74f269e13d7542e_docker-cover.png)

> **_… and it didn’t benefit that much._**

Everyone in the [DevOps](http://devopsreactions.tumblr.com/) community should have already heard about [Docker](http://www.docker.com/).

There are always sysAdmin coming around and telling you how Docker has made his life easier, how well the automation goes or how lightweight the containers are…  

**So, what is Docker trying to solve?**

Basically, Docker wraps up your application and all the dependencies required into a complete filesystem, that becomes a Docker Image. The next step is all about shipping this container to your production infrastructure, let it be AWS, Heroku or other servcies.

Back in the Pre-Docker age, every SysAdmin implements his own solution to package and deploy applications.

A small scale online shop might use git to deploy code and [virtualenv](https://virtualenv.pypa.io/en/latest/) to _contain_ applications in an isolated environment. There were also existing solution providers – [Heroku](http://www.heroku.com/), [Elastic Beanstalk](https://aws.amazon.com/documentation/elastic-beanstalk/), [Google AppEngine](https://cloud.google.com/appengine/) and others services, having their own proprietary way for packaging and deploying applications.

Now, all the configurations and environment settings are standardized in the Docker Container, which actually saves loads of time for developers dealing with the repetitive setup and maintenance.

![docker-2](/images/blogs/a0d7a357ee_679927148a612cc0207cb75e_docker-2.png)

(ref. [https://www.docker.com/whatisdocker](https://www.docker.com/whatisdocker))

### **How about using Docker in our Python Stack?**

We usually like our Python stack with virtualenv at Oursky. Now, let’s give Docker a try and see if it really rocks.

Soon after a while, here comes a doubt from one of our fellows:

> **What containment technology can do, that _python+virtualenv+git_ with a disciplined developer cannot?**

em… the answer is probably:

> **_Not much_.**

Let’s argue in such ways:

#### **The level of containment**

When we consider using Docker to isolate environments within the same box, it is actually similar to virtualenv.

The only different is how much the application is contained:

> **virtualenv**

*   application depends on different set of python interpreter and modules
*   share the same file system, network with every other process in the same box

> **chroot**

*   application runs in its own file system
*   share the same network and kernel with other processes
*   processes share the same init parent

> **Docker**

*   application runs in its own file system and networking stack
*   share the same init parent and kernel with other processes

> **Virtualization**

*   application runs in its own OS
*   only sharing the same hypervisor

Each technology brings a different overhead for containment, while virtualenv being the most lightweight option.

**_Containment_** and **_isolation_** aim to solve different set of problems. Isolation could bring security benefits while Docker has nothing to do with security itself.

#### **Docker is not always the simplest and lightest solution**

For a simple Python application, here’s what Docker only brings:

*   Docker adds complexity – Packaging a Docker image is more difficult for you to package a Python egg.
*   Docker adds extra weight – A Docker image is relatively huge compare with a python egg.

#### **Logs are not Persistent in Docker**

Logs are expected to be persistent, even over version updates. Sadly this does’t happen in the Docker world, log files are bind to the container and will be lost when it is replaced with a new image. And apparently there is no universal standard way to persist log outside the container yet.

##### Our solution: how to persist the logs in docker

The simplest way is to make use of syslog logging driver:

`docker run --log-driver syslog imagename`

By default, the syslog driver sends log to the default unix socket. To centralize logging data from multiple machine to a log collection server, specify an alternative address as per [Configuring Logging Driver](https://docs.docker.com/reference/logging/overview/). Additional flags can be added to the docker command to tag log streams.

Additionally, you need to configure syslog to save log in an appropriate location (e.g. `/var/log/`), or to forward log to a self-hosted / third party log collection service.

[Fluentd](http://www.fluentd.org/) is another logging driver that is much more capable, such as sending log to S3, a collection service and syslog at the same time.

## All in all

##### **What Docker can do while virtualenv cannot?**

If you are implementing a simple Python web server, such as a [pyramid](http://www.pylonsproject.org/) API. The answer is, again: **_Not much._**

Dockerizing an app is virtually appears to be the same as setting up a proper virtualenv.  
To deal with dependencies in virtualenv, you only need to run:

`pip install -r requirements.txt`.

When dealing with more complicated applications, for example, an app depends on c-binding (like [libxml2](http://www.xmlsoft.org/) and [PyZMQ](https://zeromq.github.io/pyzmq/)) , Docker will probably save you one or two command on library installation.

Meanwhile, [Docker](https://www.docker.com/) is the first containment technology that everyone seems to agree on. The beauty of a standardized format is that the same image can be deployed to Heroku, Google AppEngine or your own ssh box.

We envision the DevOps community will gradually use Docker as the first step towards standardizing contained deployment.

## **Good reads**

*   Docker Official Blog [https://blog.docker.com/](https://blog.docker.com/)
*   CircleCI’s Blog about Docker [http://blog.circleci.com/its-the-future/](http://blog.circleci.com/its-the-future/)
*   Production Docker by Sirupsen [http://sirupsen.com/production-docker/](http://sirupsen.com/production-docker/)

‍
