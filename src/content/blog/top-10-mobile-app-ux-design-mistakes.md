---
title: "Top 10 Mobile App UX Design Mistakes"
description: "Our QA is always the first user of those client apps. Every time, it is a UX testing. Here's 10 mobile UX mistakes she came up with. Are you Familiar with?"
pubDate: 2024-09-16
author: "Joyz Ng"
categories:
  - "qa"
  - "ui-design"
displayCategory: "User Experience"
image: "/images/blogs/7f14b43b0f_66e349609847feb156298a34_lead-nuclear-power-human-error-homer-simpson-1-1024x680.webp"
draft: false
webflowId: "66e3497eebe06c795cbc410f"
---

We've been dealing with [many many different apps](https://oursky.com/works/). App quality and usability are always our core values we never settle for less.

There are some common UX mistakes that engineers often overlooked. Getting these discovered and handled, one can build greater apps.

**Get ready, here are our top 10:**

## 10\. Long text is too long in a text field

You've probably met this before. Long text can be really loooooooooooooooooooooooooong.

It's not the text's fault.

It's the text field couldn't handle that.

![Long text handling](/images/blogs/21c13b5e4a_66e349447ef78a6fb0c82b98_full-text-message-ios.gif)

Yet, there are ways to deal with that:

*   Truncate the text.
*   Overflow the text field, make it scroll.
*   Expand the text field.
*   Limit the text length!

## 9\. Couldn't go back in multi-page sign up forms

Sure we love sign-ups!

However at some time, users might need to take a step back to the previous page, and sadly in your app there's no way doing so! They have to start it all again to amend a single field.

\[caption id="attachment\_155" align="aligncenter" width="499"\]

![Let me in, I need to go back out again](/images/blogs/90702f81cd_66e349448ee82fc85464cfc5_let-me-in.webp)

I left my toy there\[/caption\]

## 8\. Missing out non-alphanumeric characters

Unicode characters and emojis are being popular nowadays.

Without emojis, we don't even know how to say ? (thanks) or ??? (sorry).

Losing the smileys and turn them into unknown characters will take away your users' smileys.

Mind that!

\[caption id="attachment\_156" align="aligncenter" width="500"\]

![funny-emoji-balloon](/images/blogs/c0f43c725d_66e3494413eb0585f98dd87c_funny-emoji-balloon.jpeg)

Imagine if we missed all the emojis there...\[/caption\]

## 7\. Didn't handle button being clicked repeatedly

We all know users can be like [monkeys](https://en.wikipedia.org/wiki/Monkey_test) when they get frustrated. Hold on, don't crash on it!

\[caption id="attachment\_157" align="aligncenter" width="500"\]

![Monkey clicking the mouse](/images/blogs/00af39a989_66e34944ffb8af7ecd498e9b_monkey-clicks.gif)

The app should be able to pass the monkey test\[/caption\]

Make sure the button events are not fired repeatedly out of our expectation.

A simple button pressed feedback mechanism (loading/ or hide the button) should do the job.

## 6\. No visual hints when it's busy loading

_Slow_ loading is better than _no_ loading.

Never let your app freeze (or appear to be frozen) when data loads. Users don't mind a bit waiting, but would just like to know that the app is still running.

Provide visual hints that the app is still alive while it loads.

\[caption id="attachment\_163" align="aligncenter" width="485"\]

![its-loading-i-know](/images/blogs/7a407ea5fe_66e349449a49a032bc6e40e5_its-loading-i-know.jpeg)

so user know's we are still working for them...\[/caption\]

## 5\. A pressed button doesn't look like pressed

That's _confusing_ - we feel natural to receive feedback when we interact with another object. A little bit of laziness on adding an active state to your buttons loses your smoothness and consistency.

\[caption id="attachment\_159" align="aligncenter" width="449"\]

![repeatedly-click](/images/blogs/eb29640280_66e34944aa35fe56a20a9408_repeatedly-click.gif)

if a click doesn't work, let's click again - customer's thought.\[/caption\]

## 4\. Confusing choices in alert prompts

When your prompt requires a user response, you should make sure to ask a clear question so that one can answer right away.

Asking bad questions or provide confusing choices might cause a panic.

\[caption id="attachment\_169" align="aligncenter" width="658"\]

![Does the skip skip the "skip"?](/images/blogs/24106fb92a_66e349446983c4e6a717347c_instagram-skips.webp)

image from useronboard.com\[/caption\]

There are [guidelines](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/UIKitUICatalog/UIAlertView.html) for alert prompts, follow them.

## 3\. Things broken on orientation changed

It's common that users put their phones in different orientations when using the app. It's also kinda common for developers not bearing in mind to test through their apps in different orientations.

Changing orientation (e.g. from portrait to landscape) triggers a interface redraw, and most of the elements on the screen are relocated in different positions. That involves calculations. Often mistakes were made here, while your users will never stop rotating...rotating...rotating...

![rotating-mobile-device](/images/blogs/a19afec9c7_66e34944aaeffdb3b5479775_rotating-mobile-device.gif)

## 2\.  Fail to handle bad network connection

Most of the apps now requires connection to the server. However there are moment that users are offline.  
Handling no network connection issue is a common practice. They need it.

Google did a nice job here on Chrome (to kill your time)

![chrome-no-connection](/images/blogs/bb5ca88e78_66e349449a49a032bc6e40e2_chrome-no-connection.gif)

## 1\. Bad error message

Probably it's the most annoying situation that hangs the user around.

That only leaves nothing but a frustrated user that never uses your app again.

\[caption id="attachment\_158" align="aligncenter" width="600"\]

![I-Have-No-Idea-What-I-am-Doing](/images/blogs/bec3ad4fc5_66e34945bb04a889e9e1ea28_I-Have-No-Idea-What-I-am-Doing.jpeg)

Anyone tell me what's that...\[/caption\]

Give a proper message to keep the user updated on what's happening. That saves the user and saves your app.

## Conclusion

The best app should do what it supposes to do and avoid annoying users.

By understanding potential UX problems that hinder the app usage, we are able to tackle them early in the development stage.

The point is, users never use your app perfectly as expected. Stay alerted for the worse and juggle with them will make your app _inevitable_.

‍
