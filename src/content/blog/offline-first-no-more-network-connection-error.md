---
title: "Offline-First: No More Network Connection Error"
description: "Offline-First: No More Network Connection Error"
pubDate: 2025-01-28
author: "May Yeung"
category: "ui-design"
image: "https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/6799295d0330a30a262a0d8a_903F4B0.jpg.png"
draft: false
webflowId: "679929900bbcd75afaa4492e"
---

![](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/6799296e778d40c8eb350dd6_903F4B0.jpg.png)

The Internet seems to be always available nowadays. Thanks to the mobility of phones and tablets, mobile app developers can design their apps with a variety of features that assume the Internet connection _is stable_ and let users experience tithe unleash the power of the convenient and efficient network services. Social media apps such as Facebook, WhatsApp and Instagram are good examples. However, how would theses apps function when there is no stable internet connection?

## “No Network” bugs are hard to dig out.

When an app puts cloud services as its major selling point, it would be often running into various Network Connection Errors. You will see a lot of these issues from the bug report from testers.

The problem only scales up with the project size. And – it makes developers headache – it is hard to gid out all “No Network” related bugs. Often, apps are developed at a company that serves ultra-high performance network.

Developers cannot react quick to fix problem will have to receive “1-star rating App Reviews” on App Store or Play Store hopelessly.

## Do not assume the Internet is always reachable.

Start building an app with the Online-First pattern does speed up the progress in early stage development, yet it might become a crisis in a later stage. If your apps rely heavily on the Internet connection, you should be more proactively take network instability problems into account earlier. Hence, the concept “offline-first” was introduced.

**Consider Offline-First as a basic support.**

The offline state is not a bug nor an extra feature.

It is basic that every mobile app should have an offline state.

From a security perspective, making an Offline-First app online is more secure than handling an offline state on top of the Online-First app.

From an UX perspective, users will find annoying if your app doesn’t handle the offline state properly. If you have ever tried any apps  implemented an Offline-First design, you would find these differences:

*   There is no inexplicable data loss
*   The app seems to work at all times, even without internet connection
*   The app looks more smooth and gives a faster response

## Not every app should be Offline-First .

But in reality, the Offline-First pattern may not be suitable for every app. For those apps that need to exchange large amount of data between server and client or apps that require real-time synchronization, we still recommend the Online-First pattern. It’s because these apps have a clear focus on the data transmission speed than stability.

We have mentioned the benefits of the Offline-First pattern. Next, let’s talk about 3 implementations we often use to handle the offline state:

*   Offline State UI
*   Static Cache
*   Dynamic Cache

## Display a proper UI for offline state.

When the app detects the Internet connection is unavailable, it should notify the user by displayingon the interface, no matter it’s a graphic or a popup message. So the user is notified the problem was caused by the internet connection but not a bug. Let’s take Facebook (Android version) as an example, we conducted a simple offline test and here is the what we do:

Let’s take Facebook (Android version) as an example, we conducted a simple offline test and procedure as shown below:

1.  Open the app with a stable Internet connection
2.  Disconnect network (simulate an accidental offline state)
3.  Pull down to refresh the app
4.  Re-connect to the network
5.  Press ‘Tap to Retry’ / refresh the app again

Most of the pages displayed a ‘Can’t connect’ message or ‘Tap to Retry’ button. Though some other pages stuck in the loading state, the main page notification is good enough to notify the users to check the internet connection.

![Facebook offline interface](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/6799296f467318490e1f0a78_Screenshot_2015-10-14-16-59-08-576x1024.png)

A bar with “Can’t connect right now.” shown at the bottom. What’s more, they have a “Retry” button at the bottom right-hand corner.

![offline UI is important](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/6799296e0bbcd75afaa42c3e_Screenshot_2015-10-14-17-02-56-576x1024.png)

An error message with “Tap to Retry” in the middle of a major session

![Facebook does a great job on the offline UI](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/6799296f40dd8a07dca899cd_Screenshot_2015-10-14-16-59-37-576x1024.png)

Error message appears in another main page

The other pop hit mobile game “Pokemon GO” sets a bad example.  We conducted the same test during catching wild Pokemon.

When we shut down the network during catching wild Pokemon, there is a message shown on the top “GPS signal not found”.

![Pokemon - GPS signal not found.](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/6799296e0c0cbb9edb1f3012_IMG_5977-576x1024.png)

Notifying your users their internet problem is a very basic requirement you need to meet.

However, after we re-connect the network. The top bar disappeared but the interface was stuck there. The app did not “retry” after the app re-connected to the internet. This kind of mistakes disappoints your users a lot.

![Pokemon - Online-first design sucks](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/6799296fc784dff69b087abf_IMG_5978-576x1024.png)

Where is my wild pokemon? What should I do with such interface?

## Use Static Cache to store static information.

Most of the time static information will be downloaded and stored locally during the first loading time. Even if there is no internet connection, users can still access the information. This kind of information does not change often. Since the size of data is too large to include in the app download package, it has to be downloaded from the server directly at the first launch time. Once the device loads and stores the data, users can read them smoothly and use it offline.

Google Maps is always a caring service and makes good use of the static cache technique. Considering people using Google Map usually move around. The internet connection can be very unstable. Google Maps designed lots of offline functions.

![Google Map makes good use of state cache](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/6799296eb90ead80822bf1d4_IMG_0362-1-2-576x1024.png)

Static cache lets user browse your app happily even the network sucks

In Google Maps, even if the Internet connection suddenly disconnected, users can continue to read the map that was being displayed at the time. It is because the map data is temporarily stored in user’s device. What’s more, users can even pre-store part of the maps manually (Save offline map). Users can thus read the map offline. Unfortunately, the offline map feature is still unavailable in Hong Kong.

## Use Dynamic Cache to cache dynamic data.

Unlike the static cache, the data in the dynamic cache is expected to be updated frequently. Hence, it requires frequent Internet connections to download the latest content.

In most of the apps that has a sign-up feature, user’s data will store at local cache temporarily. This approach can avoid stucking at screen blank during offline mode or showing a endless loading spin to the user. Therefore it contributes to a smoother user experience.

This technique is widely adopted in most of the games and social media apps such as Candy Crush, Facebook, Twitter, etc. . 9 out of 10 social media apps, if not all, allow users to read offline. Once again, though most of the online-first apps do include offline features during post-production stage, there are always loopholes. If developers can carefully handle local cache in the offline state before programming the online loading information, the apps can work everywhere anytime.

The following example, Bindle, adopted the dynamic cache technique. From the screenshot below, users can still view their groups as well as the stored messages while they turned on the airplane mode. This is common, even basic, for social media services.

![Dynamic Cache](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/6799296e55cb8a7bec12ef25_IMG_0379-1-1-576x1024.png)

You can browse the app during airplane mode

![Bindle makes good use of dynamic cache](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/6799296f40dd8a07dca899db_IMG_0378-1-576x1024.png)

You can read messages during offline mode. This is a very basic requirement that every social app should meet

## Think Offline-First in your next app.

With all sorts of mobile devices, it makes Internet available almost everywhere at any time. Yet in pursuit of new features, we should always take the poor internet connection into consideration during development. In order to provide a smooth and stable experience to your users, Offline-First should be a pre-requisite for most of the apps.

Offline first may not guarantee you a bunch of 5-star reviews on App Store or Google Play, but the accessibility and stability of data transfer between app and server will be much better. Your users can enjoy your smooth and stable app and that may even boost the retention rate and referral that leads to your apps success!

‍
