---
title: "An Opensourced Recipe for Intializing Redux x Android Native Apps"
description: "An Opensourced Recipe for Intializing Redux x Android Native Apps"
pubDate: 2025-01-28
author: "David Ng"
categories:
  - "development"
displayCategory: "OpenSource"
image: "/images/blogs/0eac53fa20_679942c679416f07ba267b7b_Oursky-life-8827.jpg"
draft: false
webflowId: "679942e45d936e4b69fb39c2"
---

![oursky opensource github](/images/blogs/efe99b5919_679942d2f9deac5f8d123019_Oursky-life-8827.jpeg)

## For syncing project structure and frameworks, a case for using Redux

As a software development agency, Oursky handles many simultaneous projects that include mobile and web apps, [code diagnostics](https://blog.oursky.com/2018/03/19/code-review-better-software-project-estimate/), and research projects to name a few. In order to allow team members to initialize or switch projects efficiently, the team uses the [Redux framework](https://blog.oursky.com/2018/02/13/redux-design-pattern-oursky/) for web apps. However the multiple states problem not only happens on web platforms, but is also common in apps. That’s why we also extended the [Redux](https://redux.js.org/) pattern to platforms such as iOS and Android and built an Android skeleton for our internal use.

There are boilerplates for Redux Web projects, but when it comes to Android, it’s less trivial. That’s why we created an in-house standard template for Android apps that also comes with a simple NodeJS backend minimal set up with Docker.

_Disclaimer: Not all Oursky engineers agree with the Redux pattern. Some may use_ [_VIPER_](https://m.oursky.com/viper-ios-app-beyond-mvc-mega-viewcontroller-e2b625ac58d5)_, MVVC, MVC. Still, Redux is great for syncing a single project across different platforms._

We’ve opensourced our GitHub repository includes 3 skeletons, including templates for

1.  Android Kotlin Project
2.  Android Java Project
3.  NodeJS backendThe template includes recommended libraries from Oursky’s engineers to handle daily operations in Android app development.

## Initializing apps are standard but repetitive, so…

If you’re still wondering why we did this, below are some reasons:

1.  **Kickstarting a bootstrap project is faster with a template**
2.  **Fits into our CI and testing workflow**
3.  **Enforces and stantardizes the lint rules**
4.  **Includes recommended libraries by default**
    *   Custom fonts: Included `android.support.v4.content.res.ResourcesCompat`, so that developers can load Typeface (such as .ttf)easy with `helper.font(fontName)`
    *   Localization: Initialized strings.xml a few localizations (EN, CN, HK and TW). It makes localization supported by default.
    *   [Fresco](https://github.com/facebook/fresco): nearly every app needs image management. Fresco is a Facebook library for fetching and caching images on Android platform efficiently.
    *   [Flexbox](https://github.com/google/flexbox-layout): Google flexbox library brings a CSS-like flexbox layout to Android. It helps our developers to create views with custom sizes and arrange them with less hassle.  
        

![android redux ](/images/blogs/ca074c447f_679942d3c081df9e01b3a98f_image-169x300.png)

Google Flexbox

## What’s included in the repo?

So here’s the list of features and supports implemented:

### Android-java:

*   [lint rules](https://github.com/oursky/skeleton/blob/master/android-java/app/lint.xml)
*   i18n with `string.xml`
*   Custom font with `ResourcesCompat.getFont(context, fontId);`
*   Redux store with [Reductor](https://github.com/Yarikx/reductor), [RxAndroid](https://github.com/ReactiveX/RxAndroid), [RxJava](https://github.com/ReactiveX/RxJava)
*   Navigation with [Conductor](https://github.com/bluelinelabs/Conductor)
*   [Fresco](https://github.com/facebook/fresco)
*   [Flexbox](https://github.com/google/flexbox-layout)
*   A dummy webclient workflow with login action

### Android-kotlin:

*   [lint rules](https://github.com/oursky/skeleton/blob/master/android-kotlin/app/lint.xml) and [ktlint](https://github.com/shyiko/ktlint)
*   i18n with `string.xml`
*   Custom font with `ResourcesCompat.getFont(context, fontId)`
*   Redux store with [redux-kotlin](https://github.com/pardom/redux-kotlin), [RxAndroid](https://github.com/ReactiveX/RxAndroid), [RxJava](https://github.com/ReactiveX/RxJava), [RxKotlin](https://github.com/ReactiveX/RxKotlin)
*   Navigation with [Conductor](https://github.com/bluelinelabs/Conductor)
*   [Fresco](https://github.com/facebook/fresco)
*   [Flexbox](https://github.com/google/flexbox-layout)
*   A dummy webclient workflow with login action

### Backend-nodejs

*   [lint rules](https://github.com/oursky/skeleton/blob/master/backend-nodejs/app/tslint.json)
*   [standard package](https://github.com/oursky/skeleton/blob/master/backend-nodejs/app/package.json)
*   Typescript
*   docker with redis & mysql

## Your turn! How did you use this in your project?

Follow the guides in Our GitHub repository [https://github.com/oursky/skeleton](https://github.com/oursky/skeleton)

For the Android skeletons, you can copy and use the whole project in `skeleton/android-java` or `skeleton/android-kotlin` , and modify the app name, manifest and build configuration to your new app. Don’t forget to rename the package name (it comes with com.oursky.skeleton) to your own as well.

There are also many great things to be included in the standard kit, such as [Buddybuild](https://www.buddybuild.com/) or [Travis CI](https://travis-ci.org/) for Continuous Integration. Do you have any must-have starter libraries? Let us know – or send us a Pull Request directly!

‍
