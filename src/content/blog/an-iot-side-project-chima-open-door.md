---
title: "An IoT Side Project: Chima-open-door"
description: "My company’s Internet of Things (IoT) side project began when we couldn’t reset the door lock that we inherited from a previous tenant. It was one of those minor details we learned about after moving in to our new last-minute office.Normally, people just pay for a new one. But our team was too cheap to replace the lock and no one ever wanted to get the door bell. Plus, we’re engineers and we wanted to fiddle with some hardware.Our goal was to open the door with a phone or wearable technology. We had several options for how to approach the problem. In theory, we could use an app, an integration into another platform, or anything that could send a signal to trigger the door lock.So far in our door lock experiment, we’ve developed solutions for a Slack integration, native iOS and Android apps, the Apple Watch, and Pebble. I’ll focus on the architecture of the mobile apps. I admit the final product is a bit over-engineered, but we just love it!"
pubDate: 2025-01-28
author: "May Yeung"
category: "development"
image: "https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/67993eadb2410b219086190d_Oursky-9381.jpg"
draft: false
webflowId: "67993efa0b2cac4eb1709596"
---

![](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/67993ec3928c07968276a0b0_Oursky-9381.jpeg)

My company’s Internet of Things (IoT) side project began when we couldn’t reset the door lock that we inherited from a previous tenant. It was one of those minor details we learned about after moving in to our new last-minute office.

Normally, people just pay for a new one. But our team was too cheap to replace the lock and no one ever wanted to get the door bell. Plus, we’re engineers and we wanted to fiddle with some hardware.

Our goal was to open the door with a phone or wearable technology. We had several options for how to approach the problem. In theory, we could use an app, an integration into another platform, or anything that could send a signal to trigger the door lock.

So far in our door lock experiment, we’ve developed solutions for a Slack integration, native iOS and Android apps, the Apple Watch, and Pebble. I’ll focus on the architecture of the mobile apps. I admit the final product is a bit over-engineered, but we just love it!  

## iOS and Android architecture

![](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/66e30ff9e7844d7e7e332ba2_architecture.png)

Our IoT door lock project’s architecture

What exactly happens when you press the button in our iOS / Android app? An HTTPS request is sent to the cloud server, which then triggers a message to the door lock daemon via the client server, which then tells a relay board to open the door lock.

Traditionally, the door lock is opened with a button beside the door. But with modern technology, the possibilities extend beyond a direct, physical button. In addition to the physical button that triggers the `Doorlock Daemon` in the diagram, we added two other triggers: a cloud-based trigger, and a Bluetooth Low Energy (BLE) trigger, thanks to our choice of hardware.

This article focuses on the cloud-based trigger, which is what our door lock app depends on.

## Starting from pressing the button to a record saved on Skygear server.

![](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/66e347b5d44e61d5b04386e0_IMG_1040.png)

When a user presses the open door button on the mobile app, the app accesses the cloud server.

Two things happen in the cloud server. The first is that a record is saved to our choice of server, [Skygear Cloud Database](https://docs.skygear.io/guides/), which allows you to synchronize your data to the cloud. The server will log when the door access is being requested.

`SKYDatabase *db =  publicCloudDatabase];   SKYRecord *openDoor = ;   ;   `

Once a record is saved, it would trigger an `after_save` function provided by [Skygear Cloud Functions](https://docs.skygear.io/guides/), which runs our code in the cloud without bothering server deployment.

The `after_save` function is triggered after a record is saved. `def after_open_door_save(record, original_record, db):` is triggered asynchronously when a record of type `'OpenDoor'` is saved. The function publishes a message to the channel `'xxx-channel'`.

`@skygear.after_save('OpenDoor', async=True)   def after_open_door_save(record, original_record, db):      publish('xxx-channel', {          'source': 'record-after-save',          'data': record.get('data', None),      })   `

## The Node Client and Clojure Server on Raspberry Pi

The next step is to create a listener for the request. This is where the Node client and a Clojure server on Raspberry Pi come in. The Node client listens to the message in the specified channel on the Skygear server. The Clojure server is the only one with the right to access the Raspberry Pi 3 circuit. Then the Node client issues a request to the Clojure server once it hears any message.

Here is the script for the Node client, which includes code related to our specific configuration for Skygear. The endpoint and the API Key are for accessing the main server on Skygear. `skygear.on('xxx-channel', onReceiveOpenDoor)` means to subscribe the function callback (`onReceiveOpenDoor`) on receiving a message on the `'xxx-channel'` channel.

``function onReceiveOpenDoor(data) {    console.log('daemon-trigger-skygear: open door');    exec(`curl localhost:8090 --header 'X-Source: Skygear'`);   }      skygear.config({    endPoint: 'https://chimagun.skygeario.com/',    apiKey: apiKey,   }).then(() => {    skygear.loginWithUsername('xxx', 'xxx').then(() => {      skygear.on('xxx-channel', onReceiveOpenDoor);    });   });   ``

The Clojure server directly controls General Purpose Input/Output (GPIO) on a Raspberry Pi. GPIO are the pins on the Raspberry Pi 3. The GPIO connects to the external circuit that is connected with the door magnet.

![Raspberry Pi 3 GPIO Header](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/66e347b5d433098f07df6c44_1d80-lFQeMHleoRI30NzgTA.png)

Here is the Clojure code showing how the Raspberry Pi opens the door. Once the Clojure server receives the request from Node client, it will open the door and set it open for 3 seconds. However, if there is a new request coming in during that 3 seconds, the door will reset the timer to another 3 seconds. When the count down time is up, the door will lock again.

`; listen on unlock-chan for unlock events    ; if a new unlock event is received before the 3000ms timeout, the door is kept open.    (go-loop             (when unlock               (sh "gpio" "write" "1" "1")               (loop                   (when trigger                   (log/info (str "Unlock triggered by " (:source trigger)))                   (recur (alts! ))))               (sh "gpio" "write" "1" "0")               (log/info "Door Locked"))             (recur (<! unlock-chan)))       ; http event listener    (run-server (fn                  (>!! unlock-chan {:source (or (get-in req [:headers "x-source"]) :network)})                  {:status 200})                {:ip "127.0.0.1" :port 8090})   `

A random side note: Skygear is using AWS in America, while the door and the Raspberry Pi is in Hong Kong. Effectively, our ‘芝麻開門’ (Chima Open Door) request travels around the world before it reaches the door.

## Why Raspberry Pi?

Now, you may be wondering why we specifically chose Raspberry Pi. We considered using Arduino boards because we had them in the office. The reason we couldn’t use our specific Arduino model was because we wanted to synchronize data via Skygear JS SDK and this specific Arduino can’t set up the Node server.

What’s more, Raspberry Pi is Bluetooth Low Energy ready (which means we could access the door lock using a third method, Bluetooth).

![Linus-based Raspberry Pi is compatible with Oursky’s open-source serverless platform, Skygear](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/66e347b5f0a649927df562fb_IMG_0517-2.jpeg)

Linus-based Raspberry Pi is compatible with Oursky’s open-source serverless platform, Skygear

![](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/66e347b56163c2b650f22c7b_IMG_0526-2.jpeg)

## Additional integrations

Considering the app is internal-use only, we started a Slack customized command `/chima-open-door` to open the door since every Ourskyer has access to Slack.

Later some other Oursky colleagues got involved in this project and helped write the WatchOS app and Android app published on the internal platform. Apart from pressing the button inside the app, we also provide alternatives such as iOS 3D touch, Today extension, Android widget and even a Pebble integration because some of our developers use it.

## Details

That’s it! Before you dive in, there are two other main factors to consider: the reverse electricity flow (in this case for the Raspberry Pi) and the security of each of your integrations. For example, we also integrated Bluetooth app access with Bluetooth Low Energy (BLE), which has a self-implemented 2FA-like authentication. Other integrations you can include are notifications when the door is open (bell, LED).

If you want to learn about any of the above, feel free to get in touch!

### Link to Repo / files

Doorlock: [https://github.com/oursky/doorlock](https://github.com/oursky/doorlock)

I would like to credit my colleagues [David Ng](https://medium.com/@iamdavidng), Boris ([akiroz](https://medium.com/@akiroz)), Brian ([b壹貳參肆零零](https://medium.com/@b123400)), and [May Yeung](https://medium.com/@mayyuen318) for working on the Android application, the circuit implementation & Clojure, Pebble application, and this blog piece respectively. Here’s to teamwork!

‍
