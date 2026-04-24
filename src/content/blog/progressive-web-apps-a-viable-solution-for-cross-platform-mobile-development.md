---
title: "Progressive Web Apps: A Viable Solution for Cross-Platform Mobile Development"
description: "Progressive Web Apps: A Viable Solution for Cross-Platform Mobile Development"
pubDate: 2025-01-28
author: "Ten Tang"
categories:
  - "case-study"
displayCategory: "Client Stories"
image: "/images/blogs/c74408e4ee_679958f539e78e0a9add05bb_pexels-cottonbro-5082580-scaled.jpg"
draft: false
webflowId: "679959582d86b2417748d717"
---

Seven years ago, Starbucks released its mobile app. It all went smoothly, but they want to take it up a notch. When they were updating their website, they wanted the ordering functionality to be accessible to all kinds of coffee lovers in the United States — people on the go, customers with intermittent internet, and users who just don’t like using mobile apps.

Cue in progressive web applications (PWAs).

[They built a PWA](https://www.youtube.com/watch?v=GAkkKjds00o&t=5153s) that lets customers add their favorite drinks to the cart even if they’re offline. They also made sure that ordering from the web app looks and feels similar to a mobile app.

The results? An app that’s 99% smaller than its native mobile counterpart with twice the daily and monthly customers on the PWA.

This echoes the success stories of [AliExpress](https://developers.google.com/web/showcase/2016/aliexpress), [Uber](https://eng.uber.com/m-uber/), [Forbes](https://www.forbes.com/sites/forbespr/2017/03/07/forbes-launches-all-new-mobile-web-experience-for-forbes-com/?sh=2688e97f5168), and [Tinder](https://medium.com/@addyosmani/a-tinder-progressive-web-app-performance-case-study-78919d98ece0), all of which saw improved performance and increased user engagement, retention, and conversion after building their own PWAs. It was such a success for Twitter that it even deployed its PWA version ([Twitter Lite](https://blog.twitter.com/en_us/topics/product/2017/introducing-twitter-lite.html)) globally. Even some of our clients have successfully used PWAs to deliver a mobile app-like experience to their customers.

So what’s with progressive web applications that are making businesses use them? What are PWA’s use cases and how do you build one? We’ll take a closer look by telling our own story of how we developed a PWA.

![](/images/blogs/2762015950_679958edf82bf08f7d8f2727_pexels-cottonbro-5082580-1160x1058.jpeg)

Photo by cottonbro from Pexels

# PWAs are a Viable Alternative for Cross-Platform App Development

Building a native mobile app is like buying a premium laptop — it has all the glitzy and nifty features you want, but they’re too pricey and may not be what you really need.

Native apps are targeted to specific OSs, so they need more time and resources to create. Because they have longer development cycles, they can be more expensive. Maintaining and upgrading them can also be pricier, not to mention providing support to customers using different devices and different versions of the app.

If you’re looking to develop an app for multiple platforms without the hefty price tag, progressive web applications (PWAs) can be your practical option.

That’s what we did for one of our projects. The client is a popular content creator who wanted to create a content and media platform without the woes of censorship, exorbitant service charges and commissions, and excessive ads. A progressive web app answers his needs.

PWAs are web applications that are websites or webpages, but appear and behave like native mobile apps for users. They use web technologies like HTML, CSS, and JavaScript to deliver a mobile- and app-like experience via web browsers, including Chrome, Firefox, and Safari.

By building a progressive web app, our client can retain and reach out to different kinds of users while giving them the freedom to view content wherever and whenever they want.

## Why or When to Build a Progressive Web App

Here’s why progressive web apps are a viable alternative for businesses:

*   **PWAs support cross-platform app development.** You can create an app that can be used in multiple mobile devices and OSs. PWA can be your option as there’s a single codebase for the app. As long as the device’s browsers support it, users can install the PWA on the home screen or desktop and it will behave like an app. PWAs are accessed by URLs, so they’re shareable and linkable.
*   **They’re very accessible.** PWAs are independent from app stores like Google Play and Apple App Store. Their independence from app marketplaces means your users don’t need to download them — all they need is a browser (although Safari has limited support) and the URL of your app. They can also be run on different kinds of devices and mobile OSs.
*   **They can be more discoverable.** PWAs are technically websites, so the content can be SEO-friendly so it can be discovered on search engines. In comparison, users discover native apps on app stores and will require additional channels for you to promote it.

## Why You Should Not Build a Progressive Web App

Progressive web apps are not for everybody. PWAs are not without its flaws. It certainly can’t do everything like a native mobile app can. They use more battery. They have performance, hardware, and compatibility issues with iOS and legacy devices. Many of the technologies it uses are still relatively new. Here’s why building a progressive web app may not be for you:

### PWAs have limited support and compatibility with iOS.

There are features in PWAs that will not be supported in iOS, such as push notifications. This is a disadvantage if you’re targeting an audience who mostly uses iPhones or iPads.

When we were developing the PWA for the client, we realized that there’s a difference between a web app and a progressive web app being able to work offline. On iOS, background audio playback is supported in browsers (i.e., Safari), but it’s not if it’s installed as a PWA. This means the users can play podcasts if they access the app on browsers, but not if they installed it on the device’s home screen.

We worked around the restrictions by disabling the [web app manifest](https://web.dev/add-manifest/) on iOS so offline playback can still be supported.

There were other restrictions, too. In iOS, there’s a 2 GB-limit on data. While it may sound a lot, it’s not enough for a content-heavy app whose single videos could be as large as 200 MB.

Browsers on iOS also don’t notify users that the web app is installable. For our client, we worked around this by including a banner that pops up to ask users to install the PWA on the home screen (if they haven’t already).

### PWAs cannot directly access native device features.

Progressive web apps can’t easily access the device’s own hardware and application programming interfaces (APIs). This can be a drawback if you’re planning to add features that extend the browser’s capability to leverage the device’s hardware, like biometrics, camera, geolocation, payment processing, [augmented reality](https://blog.oursky.com/2021/01/15/augmented-reality-for-the-web-using-webar-to-speed-up-cross-platform-mobile-development/), or Bluetooth. There are workarounds, but they require additional effort, and not all browsers may support them.

In a similar vein, not all devices can support a progressive web app’s full range of features. Older smartphones and mobile devices with outdated browsers can’t support PWAs. For example, some PWA-enabled features would not be supported in iOS 11.2 and earlier versions.

For the project we did, we integrated SendGrid and Stripe to get around the PWA’s limitations in push notifications and payment processing. SendGrid serves as the client’s channel for customer and email communication, while Stripe takes care of online payments. These features provide the resources our client needs to keep creating content for his users.

# Progressive Web Apps vs Native

Choosing the tech stack is one of the most important (and earliest) technical decisions when developing mobile apps. It has long-term impact — the speed and cost of development, migrating your existing technologies, and maintaining the app, to name a few.

A “native” approach means using the mobile device’s OS and toolkits to create the app — Android Studio and Java or Kotlin for Android, and Xcode and Swift for iOS.

Progressive web apps are like responsive websites but added with capabilities that make it behave like a native app. These features include offline access, push notifications, a home screen icon, geolocation, and payment management. Browsers like Chrome and Firefox fully support PWAs, while Safari’s is limited.

Some companies have both native mobile apps and PWAs, such as Tinder, Uber, and Financial Times. They have a website that’s further optimized for a mobile experience. These also use PWA-related APIs to deliver better web experience. The mobile app and PWAs also cater to different users — those that use their services regularly, and those who don’t. This ensures that their services deliver the best mobile user experience (UX) no matter the kind of user accesses them.

# Progressive Web App Frameworks, Tools, and Technologies

Once you’ve determined if building a PWA is the right approach for your app, you can focus on how to create one. There are various progressive web app frameworks and tools that you or your team can use to build PWAs, each with their own capabilities and limitations. A recommended starting point is creating a proof of concept (PoC) to validate your PWA.

PWAs have three core components:

*   **Web frameworks.** These are the platforms to design and build the PWA on. Examples include Angular, React, Vue, and Ionic.
*   **Service workers**. These are scripts that the browser runs in the background. These provide functionalities that enable the app to be available offline. Features include caching, push notifications, and background syncs. Service workers can access network requests, allowing developers to control the PWA’s offline user experience.
*   **WebAPK.** This enables the PWA to be wrapped into an Android Package (APK) so it can be integrated and installed to Android devices, or even iOS (albeit with limitations). An example is https://coronavirus.app. When installed in the phone (via a button in the menu), its app icon will be on the device’s home screen. It also feels and behaves like a native mobile experience rather than a website.

The tech stack we used for our client’s web app included:

*   React.js (front end)
*   [Next.js](https://github.com/vercel/next.js/tree/canary/examples/progressive-web-app), which was the glue between the data and the front-end renderer
*   Python (back end/server-side)
*   Google Cloud Platform
*   [Simple Application Server](https://www.alibabacloud.com/help/doc-detail/58612.html) (for the APIs)
*   Authentication and authorization via our own [Authgear](https://www.authgear.com/#Features), an authentication server for web and mobile apps
*   Relational database system

Before starting actual development, we built a PoC to test the features we’ll include, particularly offline playback. It’s a content creation platform, so it’s a must for users to be able to browse, view, and listen to podcasts, videos, and other media offline. We thoroughly tested them on different devices and browsers.

After validating the PoC, we started development. After building the main features, we started adding more, such as making it installable to mobile devices and supporting offline playback. These are usually added at the latter part of development.

Here’s a list of some progressive web app frameworks and toolkits to get you started:

*   [**ReactJS**](https://reactjs.org/)**.** Open-source, front-end JavaScript (JS) library that can be used to create single-page and multipage web apps. React.js uses [JavaScript XML (JSX)](https://reactjs.org/docs/introducing-jsx.html) for render functions that connect HTML structures. It’s maintained by Facebook, so there’s large community support and extensive documentations.
*   [**AngularJS**](https://angularjs.org/). An open-source and JS-based front-end framework maintained by Google. AngularJS allows developers to use HTML syntax to expose the application’s components. Its [two-way data binding feature](https://docs.angularjs.org/guide/databinding) lets data automatically synchronize between the ‘model’ and ‘view’. This can be a good option for developing server-side apps.
*   [**Vue.js**](https://vuejs.org/)**.** Another JS-based front-end framework that was once the [second most-loved web framework](https://insights.stackoverflow.com/survey/2019#technology-_-most-loved-dreaded-and-wanted-web-frameworks) by developers. It’s no wonder why: It’s lightweight and easy to install and download, so [Vue apps loads more quickly and use less bandwidth](https://vuejs.org/v2/guide/comparison.html#Runtime-Performance). Vue.js focuses on the ‘view’ layer, e.g., user interface (UI) and other visual elements, so they can be a good choice for creating single-page apps.
*   [**Ionic**](https://ionicframework.com/)**.** An open-source software development kit (SDK), providing web components that enable developers to use any UI framework. Ionic’s [Capacitor](https://capacitorjs.com/) allows developers to use native app containers to package and deploy Ionic apps to different mobile or desktop platforms.
*   [**Magento PWA Studio**](https://magento.com/products/magento-commerce/pwa). Adobe’s set of tools that enable developers to create PWAs on top of Magento 2. A Magento PWA is composed of React-based modules. This can be a good toolkit to use if you are [building an e-commerce store](https://blog.oursky.com/2020/06/12/how-going-headless-can-make-your-e-commerce-business-sell-more/).
*   [**webpack**](https://webpack.js.org/)**.** Module bundlers like webpack and [Browsersify](http://browserify.org/) packages JS files and dependencies (including assets like images and fonts) for use in the browser, allowing them to be loaded faster. webpack modularizes codes based on how they’re used in the app to make it easier to manage, debug, or verify code.
*   [**Lighthouse.**](https://developers.google.com/web/tools/lighthouse) Developed by Google, Lighthouse is an analysis tool that audits a website against different criteria (e.g., performance, accessibility, etc.) and lists down what you need to improve on to ensure that it’s PWA-enabled.
*   [**Workbox.**](https://developers.google.com/web/tools/workbox) Google’s bevy of libraries that helps developers write and manage service workers. Workbox also enables offline mode and helps boost performance by managing the PWA’s caching processes/behavior.

# How to Build a PWA: Best Practices and Checklist

With lots of tools at your disposal, developing PWAs have become easier — but that doesn’t mean you can be complacent! Here are some best practices and a list of things to check off when developing progressive web apps:

## UI/UX and Design Best Practices for Developing PWAs:

*   **Design the web app like you would for a native mobile app.** You may technically be building a website, but creating a PWA is very much closer to developing a native mobile app than a responsive website.  
      
    Adopt a “less is more” approach. While PWAs provide rich features, don’t get carried away. Prioritize and clearly define your app’s calls to action. Remove features or elements that could distract your users from truly using your app. Simplify the user experience. Make it easier for users to complete tasks like, filling out forms, [authenticating their credentials](https://www.authgear.com/#Features)**,** or directly asking users to install the PWA instead of hiding it on the menus.  
    
*   **Be consistent.** Make sure that the visual and interactive elements have a coherent look and feel (images, font/typography, icons, etc.). Use the appropriate app icons for each OS, and use navigation bars to help users easily browse through the app.
*   **Ensure compatibility and responsiveness.** Make sure that the PWA will work across multiple devices — smartphones, tablets, desktops. Consider doing PoCs and mockups of the app with (and without) the browser’s UI to help you discover and fix issues.
*   **Design for different states, particularly offline experience.** Design the app in a way that’ll make it work in different situations: online; offline; under bad weather or dead zones and poor network coverage; loading content (or when it fails to load); connected to timeboxed internet (e.g., airport, hotel, cafés).  
      
    In our PWA project, we used the [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) to allow the app to manage network requests, cache them, and provide offline access to cached content. We used [Apollo/GraphQL](https://www.apollographql.com/docs/react/caching/cache-configuration/) caching to customize the app’s caching behavior, and  [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) to enable the app to store data locally within the browser. These worked around the storage limits and ensured the app’s offline capabilities.

## PWA Development Checklist

Here’s a list of things you need to review and keep track of before launching the app:

*   **Speed and performance.** Make sure the app’s content loads fast. They affect customer engagement and retention — [user bounce rates can increase by up to 123%](https://www.thinkwithgoogle.com/_qs/documents/9757/Milliseconds_Make_Millions_report_hQYAbZJ.pdf) if load times go from one to 10 seconds. Consider employing lazy loading, image content delivery networks, resource prefetching, and optimistic UI to speed up the app’s loading time.
*   **Browser compatibility.** The app should work across multiple browsers — Chrome, Firefox, Opera, Edge, Opera, Safari, to name a few. These browsers have different degrees of support for PWA features. For example, Bluetooth features are supported in Android mobile and macOS devices, but not on iOS phones or Windows and Linux desktops. Know which feature is compatible to which browser so you can create a PWA for the widest range of users.
*   **Responsiveness.** Users should be able to view and engage with the app regardless of their device’s form factor. Make sure the app’s content and elements float around automatically. Avoid hard-coding and locking content to specific positions. Don’t employ horizontal scrolling unless absolutely necessary. Adopt a mobile-first approach in your CSS to accommodate larger screens.
*   **Offline Availability.** You need a service worker so that your app can still deliver a custom digital experience even when it’s offline. Examples include caching recent content so users can still read the news feed, or allowing streaming content to be played back. Consider using the [IndexedDB](https://developers.google.com/web/ilt/pwa/working-with-indexeddb) and [Background Sync](https://developers.google.com/web/updates/2015/12/background-sync) APIs for storing and updating data/content.
*   **Accessibility.** Design the app so that it’s accessible to users with disabilities (e.g., vision, hearing, motor skills). The World Wide Web Consortium (W3C) has [accessibility requirements and recommendations](https://www.w3.org/TR/WCAG20/) that can be your starting point. You can also use tools like Lighthouse or [axe](https://github.com/dequelabs/axe-core) to do accessibility testing.
*   **Usability with inputs.** Make sure that the PWA can be used with different input methods, like touch, mouse, keyboard, or stylus. Equally ensure that users can switch between different inputs. You can use [APIs for Pointer Events](https://developers.google.com/web/updates/2016/10/pointer-events) to handle different input devices.
*   **Permissions.** APIs provide powerful ways to enrich the app’s UX, but they should not be abused. Asking for too many permissions — like accessing the camera, contact list or locations — can be intrusive and gives a bad impression to users. [Ask only what your app needs.](https://uxplanet.org/mobile-ux-design-the-right-ways-to-ask-users-for-permissions-6cdd9ab25c27) Make sure to notify users, too, and give them context why you need them.
*   **Up-to-date codebase.** Don’t use libraries with unpatched vulnerabilities. Avoid deprecated APIs and anti-pattern designs. Regularly audit the app and employ static code analysis, lint checks ([we have one for JavaScript](https://github.com/oursky/stylelint-oursky)), and automated testing in different browsers.

## Can I convert my site into a PWA?

Yes! There are different ways to transform your site into a PWA. For example, you can use a plugin to convert a WordPress site into a progressive web app.

For converting the site to a PWA, there are caveats:

*   **Switch from HTTP to HTTPS.** It’s a must nowadays anyway. You need an SSL certificate from a trusted authority.
*   **You need to create a web app manifest.** It provides information (e.g., app name, icons, URLs, splash screen) about your app to the browser, like how it should behave when installed on a desktop or a mobile device. Google provides a good [documentation on how to create a web app manifest](https://web.dev/add-manifest/#create). After creating the manifest, you need to [set up a service worker](https://developers.google.com/web/fundamentals/primers/service-workers), which will serve as the gateway between the web app, browser, and network.

## How much does developing a PWA cost?

There are free and readily available open-source tools that you can use to build a PWA, so it’s relatively cheaper to create. The costs would largely depend on:

*   What you want the PWA to do
*   The scope and extent of features you want to add
*   The back-end components and underlying infrastructures the PWA needs to connect to
*   Third-party libraries, toolkits, and APIs it needs to use or access (some require licenses and subscriptions to use)
*   Your region; it’s more expensive to develop apps in the US or UK than in other countries

A simple PWA can cost anywhere between US$1,000 and $10,000, with bespoke, complex and feature-rich PWAs shooting up to $300,000. PWA experts say it’s still [75% cheaper](https://divante.com/pwabook/chapter/06-pwa-solutions-and-costs.html#costs-and-roi-of-building-a-pwa) than the costs of developing native mobile apps. That said, [paying a premium doesn’t necessarily mean quality](about:blank) — and vice-versa. You need to [assess your business needs and goals](https://blog.oursky.com/2021/01/29/how-digital-product-design-projects-help-before-committing-to-quotations-for-software-development-services/) before committing to any price point.

## Are progressive web apps the future in mobile experience?

PWAs may not be replacing native mobile apps soon, but they will play important roles in cross-platform mobile app development as more technologies supporting it mature. Case in point: PWAs were not initially supported on iOS, but Apple’s walled garden is slowly opening when it silently added support for certain PWA features in [iOS 11.3](https://www.apple.com/newsroom/2018/03/ios-11-3-is-available-today/).

## TL;DR: Progressive web apps vs native apps:

![\_\_wf\_reserved\_inherit](/images/blogs/b28bd722b7_679959582d86b2417748d6e5_67995932f40308ded19c5f49_SCR-20250128-tjex.png)

‍

In our project, we developed a PWA so the client can deliver a cross-platform digital experience. The client is able to retain his already existing audience while attracting new viewers regardless of the devices they use. We’re also currently working with the users to [discover and fix UI/UX issues](https://blog.oursky.com/2020/11/03/a-quick-guide-on-iterative-design-process/) and further improve the PWA’s features.

PWAs are mobile-first by nature, so we expect more businesses and developers to turn to PWAs. And with increasing support from the likes of Microsoft and Mozilla, the future of mobile experience looks bright — and progressive!

‍
