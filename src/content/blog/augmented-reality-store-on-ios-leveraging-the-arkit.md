---
title: "Augmented Reality Store on iOS: Leveraging the ARKit"
description: "Augmented Reality Store on iOS: Leveraging the ARKit"
pubDate: 2025-01-28
author: "David Ng"
categories:
  - "engineering"
displayCategory: "Augmented Reality"
image: "/images/blogs/9123ab46a9_67994053c0359ca570108331_monica-silva-144544-1024x681.jpg"
draft: false
webflowId: "6799407a476c3cb2a8881468"
---

![](/images/blogs/98724e9399_6799406353e5a1d6a9fedff2_monica-silva-144544.jpeg)

Photo by Monica Silva on Unsplash

So, of course, half our team was up checking out the latest specs and implications of the new iPhone 8 and iPhone X. Our QA team is already looking at navigation bar breaks the iPhone X simulator. But we’ve also been testing out other announcements this year from Apple beyond just the iPhone, such as the new ARKit. The iPhone X is a whole new ballgame for UX design, but the even bigger news for developers who want to get into mobile AR is their revolutionary ARKit, which democratizes augmented reality for development.  

## How AR could be applied to the next generation of apps?

AR has been around for a while, and while everyone can imagine immersive worlds with a headset, what can you do with AR on a regular phone? How can AR go beyond games like Pokemon Go to create more interactive marketing or educational experiences?

We looked for some of the smallest ways we could integrate AR and we came up with 3D stickers that would be great for interactive campaigns and treasure hunts. By scanning a QR code, users would be able to see an AR sticker. Scanning a QR code is common practice in Asia, so it is a familiar action, that can use technology to give people dynamic or personal experiences in a given environment. **Thanks to Apple’s ARKit, we can illustrate how creating a simple AR sticker product is now accessible for every iOS developer.**

## What’s game-changing about Apple’s ARKit?

There were existing frameworks for writing AR mobile applications in the market. With [Apple’s recent ARKit](https://developer.apple.com/arkit/), developers will save more time focusing on what they want to do with AR, rather than figuring out how to constantly track and translate information from the world to interact with digital objects.

ARKit provides a native API that runs on an iOS device directly, which gets rid of integrating extra hardware, researching for frameworks, and handling compatibility issues. It gives every iOS developer an opportunity to experiment AR and rapidly prototype products.

## Building a virtual catalog with AR

As we’ve mentioned, our first mini project was a catalog that turns markers in reality into some object in the augmented reality scene. Our user can scan a QR code and see the 3D render of what a spot was like 100 years ago, or placing and previewing furnitures around in your house as you move the QR code markers around.

**_You don’t need a headset to see these 3D objects from different angles — with ARKit, you can just move your phone._**

**The object visualization flow is broken down to the following steps:**

*   Upload a QR code to be recognized to a CMS
*   CMS provides corresponding 3D object
*   ARKit renders the scene locally on the phone where a matching sticker marker is placed.
*   Pre-fetch all sticker image in the app so that objects can be rendered more quickly locally (but also on the server as a backup).
*   Camera view to recognise a QR code with ARKit.
*   If the QR code is recognized, the corresponding 3D object is downloaded.
*   Render the 3D object with ARKit on a surface with its own dimension from 3D object. User can move the object freely in the camera.

![Augmented reality iOS 11](/images/blogs/eaf1b5cf71_679940631bafd9f5adb29d15_arcms-system.001-1024x768.jpeg)

With ARKit, we only need a CMS, QR Code reader, and stickers to begin playing with AR.

AR is no longer just 2D stickers placed on faces. Now, real objects can turn into virtual objects and interact inside the augmented reality scene just from a smartphone. Since the app is embedded with a store system, it is easy to recognize new markers and displaying new objects dynamically. For example, when you scan a new QR code marker, you can discover a new Pokemon.

_Check out the link for the AR App demo!_

<iframe src="https://streamable.com/s/ouw2d/uhohrg" allowfullscreen loading="lazy" title="Embedded content"></iframe>

## Implementing with ARKit

1.  **Update your Xcode to Xcode 9 and install iOS 11 on target running device** to start developing with ARKit.
2.  **Use CIDector to do image processing** for QR code scanning (ARKit does not have a feature that recoginzes QR code markers.)
3.  **Export 3D objects as a `.scn` file, which you can create with Autocad or Blender.** All you have to do is update the objects to be displayed to the store without updating the client application.
4.  **Hosting the files in a CMS.** We chose to use our company’s open-source Skygear CMS.
5.  **When there is a QR code captured on the camera,** the system will load the corresponding 3D object models from local device. If the object is not found, the app will try to load the 3D model remotely from Skygear backend for a better user experience.
6.  Once the object model is found/ downloaded, the app will place the object on the position where the QR Code marker is located.

## What’s special about ARKit?

![](/images/blogs/6cfe546e09_6799406338bb3b02c881abbe_1_kn24j6a4FQ9K8SjoqJvhCA.png)

ARKit is groundbreaking in its attention to real life details and ability to capture 2D camera information and match it with 3D objects that are rendered.

As seen in the demo video, when we move the camera around, the object seems to stick to the current position. How is it done? Thanks to the Visual Inertial Odometry (VIO) technology in ARKit registers that the object in the camera is the same, and therefore knows to adjust with the changes in your 2D camera angle information. _(Side note: We think the next version of Pokemon Go should let you walk around and look at them the Pokemon from different angles.)_

ARKit also comes with default lighting estimation, which means that the rendered 3D object will show changes that matches real environment light source.

We’re super excited to continue experimenting with ARKit. We’ll continue to share our AR projects so that developers can create more interactive marketing, entertainment, games that interact with reality, and educational apps.

If you have ideas on what to build with AR, let us know! If you need my support on trying it out, just contact one of the [Skygear Support Channel](https://docs.skygear.io/support/).

‍
