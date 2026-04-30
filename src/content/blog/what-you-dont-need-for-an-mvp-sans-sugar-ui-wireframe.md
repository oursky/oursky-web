---
title: "What you don’t need for an MVP: Sans Sugar UI Wireframe"
description: "What you don’t need for an MVP: Sans Sugar UI Wireframe"
pubDate: 2025-01-28
author: "David Ng"
categories:
  - "ui-design"
displayCategory: "UX/UI Design"
image: "/images/blogs/a5dc261751_6799510993bdb1ce79fbea1e_SnasSugar-Appicon-Preview.webp"
draft: false
webflowId: "6799512154769870a1f32ef8"
---

![iphone x mockup app design UI UX](/images/blogs/e8d52964a5_67995100697ab60b8f3a0256_SnasSugar-Appicon-Preview-720x354.webp)

## How we started our side project

Here’s a first world problem: when you discover your company’s fridge is out of your favourite beverage. Our company’s been offering free drinks and snacks for years and recently we’ve switched to healthier drinks (replacing Coke with Coke Zero, juices with teas, and coconut water). Overall, was it helping? We had no way of knowing. Could we collect data to find out without doing OCD calorie tracking?

![](/images/blogs/3a5c05e01b_67995100f80d7a7970e282e0_oursky-startup-free-drinks-720x368.jpeg)

Some of the options in our company fridge.

Diets have so many factors, but was there one thing we could reduce and make instant gains? Well, based on the recent [PBS report on the possible correlation with cancer, sugar](https://www.pbs.org/newshour/science/sugar-industry-withheld-possible-evidence-of-cancer-link-50-years-ago-researchers-say) was a good candidate. **So could we just have an app that would tell us if we were over or under the daily recommended sugar intake limit?**

![](/images/blogs/5745dcee18_6799510023af1a9d6bd3808f_startup-unlimited-alcohol-oursky-300x287.jpeg)

What’s left at the end of a long week at Oursky

The WHO officially suggests [10% of daily caloric intake](http://www.who.int/mediacentre/news/releases/2015/sugar-guideline/en/), but we opted for 5% as suggested by the [Hong Kong Dieticians Association](https://www.hkda.com.hk/index.php?_a=viewDoc&parent_id=&docId=76). So, we started another in-house side project like our [IoT door lock](https://code.oursky.com/iot-side-project-chima-open-door/) which was featured on [freeCodeCamp](https://medium.freecodecamp.org/how-to-over-engineer-a-door-lock-863b5d58dd0d). This one we’re calling **Sans Sugar**.

## Our own user story

When we develop products for clients and other developers, we create user stories. So here’s the one for this app (in future posts we’ll share the different stages of product development):

**A user can:**  
1\. Sign up / by e-mail (Because we wanted test our Skygear Auth. Usually not necessary for simple app.)  
2\. Input basic biometric information (to calculate their daily intake)  
3\. See their daily quota (home screen after signup). Daily quota updates after scanning packaged food consumed.  
4\. Scan packaged foods for sugar content.  
5\. Manually input food item and sugar content.  
6\. See their daily history (whether they stayed within limit).  
7\. Update biometric information (with an updated daily quota). (We later removed this from our MVP)

We weren’t setting diet goals for ourselves. We also aren’t looking to completely change our lifestyle. We wanted a product that fitted our casual approach to sugar intake.

**We tried other apps first**

Always check to see if someone else has solved your problem already. We went to the Android and Apple Stores to find similar apps. The apps fell into two categories: calorie trackers for weight watchers and sugar intake trackers for diabetes. On the surface, our sugar intake app might overlap with these apps, so we tried them out to see if they solved our problem.

## Solving different problems

![android UI calorie intake app](/images/blogs/a29c0d45b6_67995100daa2fabb50333388_diet-app-UX-UI-.webp)

Above are three of the most popular calorie tracker apps: Lifesum, Yazio, and FatSecret.

We quickly learned that intake apps are not all the same. If they did cover our use case, they would have been competitors. But we quickly discovered they couldn’t solve our problem. Below is why.

The most popular calorie intake trackers have sleek interfaces, large food databases, and sophisticated nutrient intake interfaces. These details can be important to their users, but the interface is too complicated for tracking one item and only works if you input all intake (too OCD for us). In fact, the interface is misleading for our use case because we only want to input sugar. Consuming 25 grams of sugar is only 97 calories. It will seem like we aren’t eating enough every day!

These apps are solving the problem of balancing a whole diet. We want to solve the problem of staying under _one_ quota. Understanding the difference in the core problem has huge implications for the MVP and user experience (UX) and user interface (UI) design.

## Ease of use depends on use case

The purpose of an MVP is to validate a user need. Because the MVP is barebones, it should have _just enough_ essential features that the main target user would want. Also, the project team must understand the behaviour of the target users well enough to prioritize features that create a smooth user experience (UX).

**Our hypothesis is that our target users (like us) want an interface that is easy to access, read, and input data.** Because the other tracker apps we looked at were based on three meals a day, a user is required to click through several screens or search for their food items.

![Lifesum Yazio FatSecret comparison](/images/blogs/7656c14ee2_67995100aa572ea096838333_calorie-tracking-apps-android.webp)

Android UI version for calorie tracking apps.

In contrast, we wanted to keep our MVP simple to only do the the following:

1.  use publicly accessible food data to focus efforts on validation, not creating a database
2.  focus on the key feature and remove as many screens as possible

For an MVP focused on sugar intake, we started on one type of product that had high levels of sugar and a **convenient database to access: packaged products with barcodes to scan.**

Because we relied on barcode scanning, we didn’t have to build our database from scratch and could instead focus on the UX and UI.

**Below was our first wireframe:**

![iOS wireframe sample](/images/blogs/fbd003c686_67995100518e430f41fcde36_sanssugar-wireframe_original.webp)

V1 of our Sans Sugar App Wireframe

One hypothesis is that adoption was related to convenience. We emphasized barcode scanning to reduce the amount of work a user needed to do. They wouldn’t have the risk of names not matching in searches.

We also wanted to give users the option to manually add in items they could not find and contribute to a growing database.

The other key feature is the actual tracking. We showed the number an individual had taken in that day and a circle to visually show the percentage. This would make it easy for a user to quickly glance and see their latest status.

The non-technical team members looked at the wireframe and gave feedback. Four considerations were raised:

1.  A disclaimer because it’s a side project, not a health service.
2.  Gamification features to encourage staying under the limit (showing a streak).
3.  Including options for users with diabetes or high blood pressure and calculating that intake quota.
4.  Registration completion screen (a state).

**Our V2 reflected these suggestions.**

![UX UI ios 11 app design](/images/blogs/f0dfa6948c_679951003ab5547d30721a49_ios-11-app-wireframe.webp)

Our Sans Sugar iOS 11 app V2 wireframe

We took this expanded version and asked ourselves again what we could cut. Because we wanted to complete the prototype in one week, we wanted to spend effort only on the minimum and essential features for this MVP.

These were the things we removed:

1.  Diabetes and high blood pressure options (to focus on 1 target “average” user first)
2.  Additional gamification screens (could simplify the history screen to achieve the same result)
3.  Settings and update info screens because they aren’t essential for an MVP

![wireframe iterations mvp design thinking](/images/blogs/167749c085_67995100be2d1859c0628e5d_sans-sugarv2.webp)

Simplify. Focus on user flow and main feature before moving to mockups.

On the surface, V3 looks similar to V1 because we still have 9 screens, but notice the following changes:

*   We’ve moved the disclaimer to a pop-up after registration rather than hiding it in the Settings section.
*   The “history” button now leads to a simplified “My Progress” screen that uses colours to quickly indicate whether we’re staying within limit. Notice we removed the graphs which may look more impressive, but don’t really mean much because we’re not actually tracking someone’s overall health.

We’ve rearranged our wireframe to make the flow more obvious than the first version. This makes it easier for everyone — from designers, to developers to understand the user flow.

**This is Part 1 of our iOS MVP design and development series for our side project, Sans Sugar, a simple tracker for your daily sugar intake. Check out** [**Part 2: from wireframes to mockups**](https://blog.oursky.com/2017/12/11/mvp-ui-design-mockups-sans-sugar/).

![sugar intake tracker design](/images/blogs/f05cba3026_679951006fa34d27f8f9610f_SansSugar-appicon-1024-300x300.png)

The upcoming app logo!

‍
