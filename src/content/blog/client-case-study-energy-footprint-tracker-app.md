---
title: "Client Case Study: Energy Footprint Tracker App"
description: "Client Case Study: Energy Footprint Tracker App"
pubDate: 2025-01-28
author: "Queenie So"
categories:
  - "case-study"
displayCategory: "Client Stories"
image: "/images/blogs/03323ab616_679953f4387921465f2815a5_A4.webp"
draft: false
webflowId: "6799541b8149b61a4ec44aa9"
---

![edwel energy footprint tracker](/images/blogs/03323ab616_679953f4387921465f2815a5_A4.webp)

Edwel Energy: Energy Footprint Tracker

Motivate User Engagement

For the App, and for the Earth

## Strategic Planning

*   Offline first architecture enables an non-interrupting user experience
*   Strive for simplicity in UX design to align with business goal (form users’ habit)
*   Optimize the database loading time to improve user experience

  
“It was noticeable that Oursky not only wanted to complete our App but ensure it was a success. This can be shown in the zero crashes that our first version has had. Everyone who has used the App has commented on the high quality for an MVP.”

— Benjamin Gilkes, Director of Edwel Energy

## Executive Summary

Being committed to environmental advocacy, [Edwel Energy](https://edwelenergy.com/) came to us for a solution to spotlight the concept of energy chain process, meantime to educate and engage public participation in changing habits so that people would reduce their carbon footprint. Ultimately, they hope to help manufacturers and retailers optimize their marketing strategies and contribute to building an energy-efficient ecosystem. Our app solution, [Energy Footprint Tracker](https://itunes.apple.com/us/app/energy-footprint-tracker/id1437980734?mt=8), has visualized Edwel Energy’s goal to raise public awareness of energy consumption with a handy iOS application. Users are now able to learn energy consumption through tracking their transportation pattern or scanning the product barcodes. By forming a habit of tracking their own carbon footprint, it is believed that it will bring positive outcomes to an environmental change eventually.

## Challenges

### Business Challenge

There is no doubt that our planet is vulnerable. Edwel Energy has the vision to help people make the right decision and better meet their needs by empowering companies and individuals to navigate the energy chain, control their energy footprint and reduce consumption of non-renewable energy. They currently have a [website](https://edwelenergy.com/) providing environmental insights, and also [an energy calculator](https://edwelenergy.com/energy-calculator-2/) to help people discover the total energy being consumed in the lifecycle of a product or service. The biggest challenges here are:  

1.  How to communicate the carbon footprint knowledge and make it meaningful and understandable to the public,
2.  How to further engage people, not only the passionate ones, in environmental issues that they are generally feeling distant with;
3.  And ultimately, how to motivate them to keep track of carbon footprints in daily lives and form a behavior change

With confidence in Oursky’s proven track record of high-quality app development, Edwel Energy came to us for an app solution that can develop users’ habits in a handy way. Through daily tracking, people would realize the importance of being a stakeholder, hence making better decisions on consumption to save the planet.  

### Technical Challenge

When we talk about engaging users in doing daily tracking, it is important to ensure that users can create records no matter when and where. Since the internet bandwidth may not be always stable in the launching country, one of the client’s top concern is the app performance, especially under weak internet condition. To solve the bottleneck of network communication, it is challenging to find out a total solution that:

1.  The app would not need to connect with the backend and load data all the time.
2.  Fine-tune the performance to enable a quick query in the local database.

## Solutions

### Business Solution

In order to engage people in learning the carbon footprint concept and further track something that they are not used to, we utilized our expertise of UI/UX design to achieve simplicity – users have to feel that it is easy enough to complete the task through the App, and they are able to do it repeatedly without hassle.  

![edwel energy footprint tracker](/images/blogs/e813813132_67995409949feb7a44cbddd5_A4-Copy-1160x770.webp)

‍

The key to success is creating a seamless user experience. It is an art to structure a clear layout for showing summary, educational content and functional taps on the same page, meantime keeping everything simple and intuitive. For the user flow design, our designers streamlined the flow and minimized the number of taps to each major feature. We also made a careful balance between the app objective and use case when designing the user profile and how users fill it up. For the core of the App – tracking, users are not expected to jump through hoops for creating a record. We simplified the fields to be filled by eliminating those information which can be fetched by scanning product barcodes, end up the user can create a record within 3 taps, which may be doubled or tripled if we didn’t optimize the flow.

However, keeping things simple doesn’t mean to be primitive. Users must feel that it is enjoyable to use the App, and we achieved this by building an easy-breezy user interface. To cultivate awareness of carbon footprint as well as to support brand recognizability, we decided to use honeycomb patterns as our main visual – beehive is the most efficient system in existence and also the muse of Edwel Energy. We further developed fancy details to make it more outstanding. For example, users can enjoy a trendy loading screen in a running honeycomb shape which matches with the main visual. 3D effect is also shown on the main interface when users tilt their phone. We feel honored that Edwel Energy is well satisfied with our design and further applied the honeycomb visuals back to their official website.

On the other hand, to achieve the business goal of educating users about carbon footprint, we inserted interesting insights at the landing page (like how many times a bee could fly around the world with the consumed energy) in order to visualize the concept and help users understand how they would make an impact on Earth.  

### Technical Solution

Our mission is to deliver the best solution to the client’s budget. We optimized the budget by proposing a MVP model starting with iOS version as pilot which can also adapt to other platforms easily in future. Since we aim to maintain the app consistency regardless of internet connection, we further improve our solution to deliver an _offline first_ experience. Though pursuing an offline first architecture is more challenging, we don’t want to compromise the user experience where users may feel annoyed or dissatisfactory when awaiting due to network interruption and latency. It’s important that users can create records even without internet connection i.e. nothing would interrupt the users from forming a habit.

On code quality and design pattern, we applied Redux data flow with RX observable to manage the event stream. We did a lot of optimization such as defining data structure to enable a faster static run. We also adopted an asynchronous approach (Async) in order to provide a non-interrupting user experience. When the initial data-loading is running intensively in the background, users can still continue to browse the app before the completion of background data refresh. In this case, the user experience is smooth enough that the users would not even notice that the app is still updating.

We applied various optimization to overcome the technical barrier which the app loading time could be a problem with the given dataset. Normally we go for [Realm.io](http://realm.io/) and schema-free JSON decode in favour of development speed. However, with the dataset of this project, we found the performance is not satisfactory: the initial import takes 76s while the query time exceeds 16ms (which feel sluggish for users as it is below 60 fps). We did some benchmarks to tickle down the problem (you can refer to one of the open-sourced [references](https://github.com/kiootic/db-benchmark) for details). With other profiling, we also took a series of actions including switching to use GRDB, increasing the gzip compression ratio and introducing static schema during decoding. With the above optimization, the initial import time is successfully reduced from 76s to 6s; and we are able to maintain the query time within 16ms.

Last but not least, we used [Skygear](https://skygear.io/) for setting up backend and cloud platform for deployment. We also integrated Skygear CMS for management. Skygear has played an important role in speeding up the overall development process with a lower development cost.  

## Results

Edwel Energy and Oursky worked closely together and are able to deliver a high quality app within 4 months. The App received positive feedback widely from users about the quality and usability after launch. The steadily increasing number of records created with the app has also shown that the [Energy Footprint Tracker](https://itunes.apple.com/us/app/energy-footprint-tracker/id1437980734?mt=8) is successfully engaging the app users to form a habit of tracking their carbon footprints.

### Technologies

*   iOS
*   [Skygear](https://skygear.io/)
*   Cloud
*   Backend

### [Services](https://oursky.com/start/)

*   UI/UX Design
*   Development
*   Project Management

### Category

*   Productivity
*   Lifestyle

### Industry

*   Environmental Services

‍
