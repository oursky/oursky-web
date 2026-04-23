---
title: "Augmented Reality for the Web: Using WebAR to Speed Up Cross-Platform Mobile Development"
description: "Augmented Reality for the Web: Using WebAR to Speed Up Cross-Platform Mobile Development"
pubDate: 2025-01-28
author: "David Ng"
category: "development"
image: "https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/6799581f35d3af619f07a99e_AR-for-the-Web-Oursky-01-23-at-12.webp"
draft: false
webflowId: "67995835f0bb85751062bcfc"
---

More than a decade ago, it wouldn’t have been possible to create an augmented reality (AR) app or demo for your smartphone in a day or two. But with the likes of Pokemon Go and interactive AR stickers on Android devices and iPhones, we’re seeing AR technology move forward to new heights. In fact, we’re already seeing AR extend into the business space.

At Oursky, we embrace new things. We’ve played around with augmented reality development as early as 2017, back when [ARKit](https://developer.apple.com/augmented-reality/) and [ARCore](https://developers.google.com/ar) were initially released.

At the time, we created a demo for both iOS and Android using AR for the web as part of our quick Christmas project. We used Google’s open-sourced [AR for the Web](https://developers.google.com/ar/develop/web/getting-started) (now [WebXR Device API](https://codelabs.developers.google.com/codelabs/ar-with-webxr#0)) available for ARCore in Android and ARKit in iOS to create a cross-platform AR experience for users who downloaded our custom web browser.

Below is a quick overview of how we used ARKit and ARCore’s features to build the project.

# Augmented Reality App Development: ARCore, ARKit, WebAR

First things first: Let’s get a quick refresher on AR development.

ARCore is Google’s platform/software development kit for building AR experiences on [ARCore-supported devices](https://developers.google.com/ar/discover/supported-devices) (including iOS devices). ARKit enables developers to build or add AR functionality to apps in the iOS platform.

Both use three key features to integrate AR content: motion tracking, environmental understanding, and light estimation. Of course, they both have their own list of features, formats, specifications, and implementations (e.g., [collaborative sessions in ARKit](https://developer.apple.com/documentation/arkit/creating_a_collaborative_session), [cross-platform app development in ARCore](https://developers.google.com/ar/develop/unity-arf/quickstart-ios), etc.).

WebAR, or browser/web-based augmented reality, is an emerging technology that allows for AR content to be displayed on the mobile device’s browser. It uses web technologies to display or overlay AR and digital content. It’s a new technology so it has limitations compared to native apps, but it definitely opens up [new opportunities](https://blog.oursky.com/2020/06/12/how-going-headless-can-make-your-e-commerce-business-sell-more/) to AR.

Note that at the time when we created our AR demo, web browsers don’t natively support bridging between ARKit or ARCore yet. We were able to do this by creating a custom browser to bridge JavaScript.

## How ARKit and ARCore Apps Pave the Way for Mobile Developers

The video above is Google’s overview of showing Android users what they could potentially see through their smartphones powered by ARCore. While game developers have been able to develop AR experiences for years with the powerful Unreal or Unity game engines, web developers previously did not have similar tools to develop AR experiences for the web. Even mobile developers had to put together libraries or custom-build components to develop an app with AR features for smartphones.

With [ARKit](https://developer.apple.com/arkit/) and [ARCore](https://developers.google.com/ar/), developers could create more interactive experiences for mobile apps because these frameworks packaged the essential features for AR that traditionally used to come separately:

*   [Motion tracking](https://developers.google.com/ar/discover/concepts#motion_tracking)
*   [Environmental understanding](https://developers.google.com/ar/discover/concepts#environmental_understanding)
*   [Light estimation](https://developers.google.com/ar/discover/concepts#light_estimation)

These kits help developers create AR content by tracking information on the environment and positioning 3D objects and animations in the foreground in relation to the real-world environment viewed through a smartphone’s camera.

Both Apple and Google’s AR libraries can integrate easily into game engines and other libraries. However, they’re not yet available for all mobile devices. ARKit can be used with [Metal](https://developer.apple.com/metal/) and [SceneKit](https://developer.apple.com/scenekit/), but only iPad and iPhone models with Apple A9 processors can support ARKit. While ARCore was initially only available on Pixel and Samsung S8 in 2018, it has since [expanded](https://developers.google.com/ar/discover/supported-devices) to different device models.

## How Augmented Reality App Development Has Advanced in the Past Decade

Augmented reality depends on these main components:

*   A camera to capture information on the environment
*   Motion tracking for objects in the camera view
*   A set of 3D objects that can interact with the environment in the camera
*   A rendered view

Back in 2007, these four components were usually separate, making a full-featured AR application much more technically challenging. To build an augmented reality app, developers were required to be fully knowledgeable about all the components.

In addition, the hardware couldn’t support an interactive experience. The first-generation iPhone was just introduced that time, which meant that most people would still be using a webcam attached to a desktop, which isn’t easy to move or interact with.

Fast forward to more than 10 years, and we’ve arrived at a mobile-first era with different selections of open-source AR library to choose from. The mobile experience has created the opportunity to film and render. Nowadays, users can interact directly with what the camera sees on their mobile interface and interact with objects by touching the screen, creating a more seamless experience.

However, ARKit and ARCore are native mobile experiences and are not available for the web directly. Developers would have to create an iOS and Android version for app demo projects, minimum viable products (MVP), and prototypes. By using WebAR, or web-based augmented reality, we can create an AR experience that users of any smartphone can see from a web browser.

![AR for Web Hong Kong](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/67995804a3797722532e5b71_AR-for-the-Web-Oursky-01-23-at-12.04.27-PM.png)

We created an AR Christmas greeting in about a day!

# Augmented Reality for the Web: Using WebAR for Small Projects, MVP, and Rapid Prototyping

Augmented reality for the web, or WebAR, is simply another variation of technologies and tools that run augmented reality on web browsers. Our team worked with [three.ar.js](https://github.com/google-ar/three.ar.js?files=1), developed by Google, for tracking and [three.js](https://threejs.org/) for 3D objects. You can see the diagram below to see the layers that go into an AR experience.  

![WebAR](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/67995804587163b0f8c42e1f_AR-for-the-Web-Oursky-01-23-at-12.14.57-PM.png)

HOW WebAR/AR FOR THE WEB WORKS

On the native layer, ARKit and ARCore help developers do many key processes to create an AR experience, including AR markers, surface tracking, geo tracking, face tracking, color tracking, object tracking, and ambient light tracking. These form the foundation for processing the data needed from the environment so that the developer can focus on creating the 3D objects that will interact with it.

Creating the 3D objects is usually in the domain of artists and people who work with 3D animations. However, agile and lean teams can now use Google’s [Poly project](https://poly.google.com/) to get template objects that can be customized.

For our project, we used Adobe Fuse CC to turn our dancer into Ben, Oursky’s CEO.

![AR app development agency](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/67995804aaa47ef20a34fbb2_AR-for-the-Web-Oursky-01-23-at-12.04.33-PM.png)

WE QUICKLY CREATED A 3D MODEL USING TEMPLATES AND ADOBE FUSE CC.

After the 3D object is created, we needed to load the objects we want in specific scenarios. In our case, we needed to give “Dancing Ben” a flat surface to share his dance moves on. With AR for the web, displaying the object on a designated type of mapped surface becomes as simple as a line of code as shown below:  

![WEBARonARKit WEBARonARCore](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/6799580412b8bedd1b842815_AR-for-the-Web-Oursky-01-23-at-11.59.14-AM.png)

WebAR/AR FOR THE WEB HELPS DEVELOPERS FOCUS ON THEIR PRODUCT

With AR for the web, we were able to focus mostly on modifying a template 3D object and choosing where it would be suitable to dance on. We didn’t have to get bogged down with important details, such as fine-tuning the accuracy of tracking. The result, our [Christmas Dancing Ben](https://www.facebook.com/oursky.hk/videos/10155105026696485/), was rendered from a compatible phone, like the iPhone X, on our custom browser.

![AR app development hong kong](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/67995804fe53167067982ca6_AR-for-the-Web-Oursky-01-16-at-5.24.45-AM.png)

OURSKY’S CHRISTMAS AR APP SIDE PROJECT

# Why AR: Augmented Reality Examples and Business Use Cases

Augmented reality has limitless potential in what objects and information can interact with and what our smartphones are capturing on camera and displaying on screen. While many would associate AR with gaming or entertainment, there’s many business opportunities and use cases for developing an AR app. Gartner even projected that [70% of enterprises](https://www.gartner.com/smarterwithgartner/gartner-top-10-strategic-technology-trends-for-2019/) will try out immersive technologies like AR by 2022.

AR’s market potential is just starting to be realized as the tech industry further improve smartphone processors, cameras, and open-source developer tools. Brands can engage with customers beyond a single sales point. They can create helpful product previews, informative tools and guides, and entertaining brand experiences.

If you’re looking for more business cases for AR, look no further than [Ikea’s app](https://www.wired.com/story/ikea-place-ar-kit-augmented-reality/) that gives an augmented reality shopping experience. Still want more examples? Check out this quick iOS 11 video:

Here are some of AR app examples and their real business use cases:

*   Interactive stickers for video chats and messages, such as Snapchat, Instagram, and Google Hangouts
*   Previewing retail products and visualizing product mockups in a digital space like the [Ikea Place](http://www.ikea.com/us/en/about_ikea/newsitem/091217_IKEA_Launches_IKEA_Place)’s virtual commerce platform
*   Create a virtual showroom, such as Harley Davidson’s AR app that lets users customize their motorcycles
*   Augmented reality in construction: Getting architects and engineers to step into a virtual simulation of the buildings and spaces they’re designing or renovating, like how [Kieran Timberlake](https://academy.autodesk.com/inspiration/blog/step-your-building-virtual-reality) is doing
*   Maintenance simulations such as Hyundai’s [Virtual Guide](https://www.theverge.com/2016/1/5/10712686/hyundai-augmented-reality-owners-manual-video-ar-ces-2016) that labels parts or mapping out infrastructure below street surface
*   Daily tools like a [camera tape measures](https://itunes.apple.com/app/id1258270451)
*   Augmented reality training simulators for everything from [cooking](http://www.spoon-tamago.com/2013/03/13/cooking-simulator-tokyo-institute-technology/) to [flight control](https://www.youtube.com/watch?v=iws2eMdIj_A&list=PL203AE3371D6C8C05) and [military training](https://www.army.mil/article/188088?a)
*   Creating an image the brain in 3D on top of a person’s head for surgery
*   [Helping medical students](http://engineering.case.edu/HoloLens-video) learn anatomy by exploring the human body in interactive, 3D format
*   Navigation and sightseeing, with visualizing routes with [Fitness AR by Strava](https://itunes.apple.com/us/app/fitness-ar/id1274233318?mt=8), or [interactive city guides and travel apps](http://travel.cnn.com/explorations/life/top-10-augmented-reality-travel-apps-569570/)
*   Interactive advertising with integrated information based on location by companies like [Layar](https://www.layar.com/)
*   Creating marketing campaigns
*   Interactive entertainment and gaming experiences such as [Pokemon Go](https://www.pokemongo.com/), [Harry Potter](https://futurism.com/harry-potter-life-augmented-reality/), and [coloring books](https://www.youtube.com/watch?v=SWzurBQ81CM)
*   Improve logistics and supply chain operations, like [BMW](https://www.automotivelogistics.media/materials-handling/reality-check-how-ar-can-improve-efficiency-in-logistics/37943.article) and [DHL](https://www.dhl.com/global-en/home/about-us/delivered-magazine/articles/2014-2015/dhl-successfully-tests-augmented-reality-application-in-warehouse.html)’s augmented reality-powered vision picking

WebAR/AR for the web is great for rapid prototyping, MVP development, and cross-platform mobile development to test and validate your app ideas and digital products or projects.

When we created this demo two years ago, we had to create a custom browser. But we knew that AR would advance and vastly improve that we only need to share a link to your web app.

True enough, WebAR now is leveling the playing field for mobile developers in building augmented reality apps. Now, you can use WebAR not only to share your prototypes and MVPs, but also share memorable immersive stories and experiences to users. In fact, many are already doing it — from [Purina](https://one28daychallengear.purina.com/) to [TIME Magazine](https://time.com/longform/apollo-11-moon-landing-immersive-experience/) and [Toyota](https://www.forbes.com/sites/danielnewman/2019/06/07/toyotas-new-augmented-reality-shopping-experience-a-shift-in-the-car-buying-journey/?sh=6e30342a67e8).

If you need some inspiration for your AR app, check out our previous post on an [augmented reality store for iOS](https://m.oursky.com/augmented-reality-store-on-ios-c8552bbce48f)! ✨

_Oursky’s team of passionate developers, designers,_ [_AI experts_](https://www.skylab.ai/)_, and QA engineers can help you_ [_bring your ideas to life_](https://www.oursky.com/product-development/) _— whether on_ [_mobile_](https://www.oursky.com/mobile/)_,_ [_web_](https://www.oursky.com/web/)_, or simply_ [_designing your digital product_](https://www.oursky.com/design/)_. If you’re exploring a partner to help you with your AR apps, MVPs, cross-platform mobile development and other software projects,_ [_get in touch with us_](mailto:hello@oursky.com?subject=AR%20App%20)_!_

‍
