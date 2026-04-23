---
title: "2017 Oursky X’mas Hackathon Projects"
description: "2017 Oursky X’mas Hackathon Projects"
pubDate: 2025-01-28
author: "May Yeung"
category: "culture"
image: "https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/67995221e5c70fc684f83d93_photo6186087868431181780.jpg"
draft: false
webflowId: "6799523254769870a1f492f3"
---

![hong kong startup culture](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/679952189e5bbde3d22b2331_photo6186087868431181780-720x540.jpeg)

We ended off 2017 with an annual Oursky tradition: the Christmas hackathon! Below is a recap of our projects. Anyone could propose an idea and anyone could sign up to help during the two days.  

## Timeline

*   Day 1 (28th Dec 2017), 11am – noon: Topic and Team Formation
*   Day 2 (29th Dec 2017), 5:30pm – 7pm: Demo!!!  
    

![hong kong opensource](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/679952189465a580dc3a08e9_20180110_180155.jpeg)

## Rules / Notes

*   Just create something. It could be software, hardware, even hand-making a table, or whatever “hack”. **We stress that it doesn’t have to be software.**
*   Prefer something different from daily work (take a real mental break).
*   If you have an idea, try to list out what kind of tasks you need to get done and solicit other Ourskyers to join.
*   If you need to buy something, notify a partner and beforehand to make sure it can be claimed (unless the something is crazily expensive).
*   Don’t worry about “completing” the product in two days. Just make a demo, proof of concept, or even just a failed attempt is fine.
*   The point is have fun and joy of creating things.

## Our Project List.

1.  RC Car with live video and phone control
2.  緩跑徑開放時間 telegram bot
3.  OpenSky Face Recognition for opening the door
4.  Sublimte text + purescript ide bugfix
5.  電子支票存款服務 Bot
6.  Nanoleaf Doorsign to accompany our [IoT Doorlock](https://code.oursky.com/iot-side-project-chima-open-door/)
7.  車 Cam Merger and uploader (Dashup)
8.  [Skygear](https://skygear.io/) Zeromq improvement  
    

![hong kong tech culture](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/67995218149ea6cafad93fcf_20180110_180138.jpeg)

## Team 1: RC Car with live video and phone control

![hong kong startup culture](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/679952188149b61a4ec22dd3_25660390_10155180222421485_904931014054765192_n.jpeg)

One of our colleagues constructed a remote control car using a micro controller. There is a video cam on the car, and 3 fellows wrote an app to connect the mobile phone to control the car, and also sees the video on the screen.

## Team 2: 緩跑徑開放時間 Telegram Bot for Running Courses

![hong kong jogger telegram bot](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/67995218387921465f25bf1c_Screen-Shot-2018-02-28-at-3.06.17-PM-407x720.png)

Since several Ourskyers are long-distance runners and have trained and travelled together for marathons, we wanted to quickly built a bot that could quickly help us find a suitable running courses in Hong Kong’s neighbourhoods to train in. Some Ourskyers are also open data activists, and this small project fitted a lot of people’s interests.

We used Telegram because it’s our company’s choice IM service and it is created open-sourced. One of the problems we encountered was that the data was in PDF format and had different tables and colours, but we finished it! We used PDFMiner (Python), [Tabular](https://github.com/tabulapdf/tabula-java), and PDFBox (Java/Kotlin) and an output into the Telegram Bot. The [HackMD file](https://hackmd.io/CYIwTCBmCG1gtAUwgZngFmgBgGzwJyQoDs8WkiAxnMpABySRA) is available.

## Team 3: Opensky with face recognition

![hong kong developers neural network](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/67995218d1b6a0967d1e6c42_26229932_10155180222431485_3766646346677966120_n.jpeg)

Oursky already uses our [over-engineered IoT doorlock](https://medium.freecodecamp.org/how-to-over-engineer-a-door-lock-863b5d58dd0d) ([Chima Opendoor](https://github.com/oursky/doorlock)) that we wanted to automate with face recognition with the launch of the iPhone X. Two colleagues worked on it and the result was interesting. We found that the generated neural network is too big for Raspberry Pi, so we would need to do more work to put it in our door’s production (it’s set up on our Raspberry Pi, but not integrated into the doorlock system).

## Team 4: Sublime text + Purescript IDE Bug fix

![github opensource repo](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/67995218a81f96c1ee91dc62_Screen-Shot-2018-02-28-at-2.57.27-PM.png)

One of our colleagues has gone all over the world to work with different developers. He wanted to spend the holidays contributing to the open-source community and finished 2 issues a for [Purescript IDE integration for Sublime Text 3](https://github.com/b123400/purescript-ide-sublime/commits/master).

## Team 5: 電子支票存款服務 Bot

Another colleague wanted to use an automated bot to deposit e-chques into different bank accounts (such as for the monthly salaries for our 40 colleagues). Currently, cheques need to deposit their cheques manually because not everyone uses the same bank account. Our colleague decided to use RUST to learn a new language. The project is incomplete, but he had a good time!

## Team 6: Nanoleaf door sign

![hong kong iot](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/67995218223c893cb17c4725_26001239_10155180222341485_3287374921414488180_n.jpeg)

Since we already [over-engineered our doorlock](https://medium.freecodecamp.org/how-to-over-engineer-a-door-lock-863b5d58dd0d), a few of us decided to over-engineer our door status notification as well (because people didn’t listen to the door unlocking and couldn’t tell if our doorlock app had worked). The doorlock was previously written in [Clojurescript](http://clojurescript/) by a former colleague, and the two Ourskyers working on it added a few lines. It was a simple and fun hack.

## Team 7: 車 Cam Merger and uploader (Dashup)

![](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/67995218223c893cb17c4721_26166630_10155180222336485_597738249561516723_n.jpeg)

An Ourskyer in Taiwan likes to road trips. But when recording videos he has the problem of recording massive video files or many small files that take too long to stitch back together. He teamed up with another colleague to create a cross-platform [Electron](https://electronjs.org/) desktop app that helps users merge mini car-cam videos to upload to Youtube with a simple drag and drop.

It’s finished! Check out the app [Dash Up](https://github.com/inDream/dash-up) and join #dashup on Slack. The command line for merging videos is [here](https://github.com/inDream/dash-up/wiki/FFMPEG-command-line-for-merging-videos).

*   Build: https://drive.google.com/file/d/1SzmWCYZlY9UqLCvCFhdDIvwxJU7BL3nC/

## Team 8: Skygear Zeromq Improvement

![hong kong open source](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/67995218d7eea6403ab5500d_26112442_10155180222501485_7949591693276991723_n.jpeg)

We have a team working on [Skygear](https://skygear.io/), our open-source backend-as-a-service, and one of the former team members had always wanted to clean up dependencies on [CZMQ](https://github.com/zeromq/czmq) (deprecated) to speed up the Docker image building time. After removing the dependency ([pull request here](https://github.com/SkygearIO/skygear-server/pull/512)) and reducing the shared state, building a docker image went from 50 seconds to 10 seconds!! Thank you!!

Did you like this post? Check out how one of our co-founders, [Ben](https://medium.com/@chpapa), [built a solid engineering culture](http://blog.oursky.com/2016/08/18/build-engineering-culture-tech-team/) at [Oursky](https://oursky.com/) and a Chinese blog sharing how we hire developers based on fundamentals: [如何找到可靠的軟體工程師？三個標準篩選出蘋果、Google 等級的優秀 coder](https://blog.oursky.com/2017/11/01/asia-hiring-developers-programmers-chinese/).

‍
