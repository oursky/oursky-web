---
title: "Better StackTrace for iOS crash report from Sentry on Slack"
description: "Better StackTrace for iOS crash report from Sentry on Slack"
pubDate: 2025-01-28
author: "Rick Mak"
categories:
  - "code"
displayCategory: "iOS"
image: "/images/blogs/344043091f_6799276263cf1df864aa245e_dsym-cover.webp"
draft: false
webflowId: "6799278496bfcb295c64a8c4"
---

![Slack dSYM bot for Sentry](/images/blogs/8b1c7f43c0_67992770c2a101ee0fdf2c3b_dsym-cover.png)

## Get crash reports from Sentry

We have been using [Sentry](http://www.getsentry.com/) for collecting crash reports and stack traces for our front-end js, Python, and Rails applications. It is reliable with affordable pricing. Simple to setup with it’s [open-source SDK](https://github.com/getsentry/raven-js).

However, there’s a fundamental problem when it comes to iOS.

## What? No symbolized data returned?

Sentry only returns the crash report with a piece of memory address but not a meaningful method name.

As an iOS developers, you should have noticed that it requires a [dSYM](https://developer.apple.com/library/ios/recipes/Instruments_help_articles/RestoringSymbolsWhenTraceShowsOnlyAddresses/RestoringSymbolsWhenTraceShowsOnlyAddresses.html) file to symbolize the stack trace. It helps to identify these addresses with the appropriate dSYM file.

We thought we can upload dsym files and get symbolized information returned when Sentry claims it works on iOS.

Unfortunately, it is not the case:

![](/images/blogs/0993c7d0a5_679927703068a4155692209f_sentry_github_issue.png)

refs. https://github.com/getsentry/raven-objc/issues/11#issuecomment-84141003

No one can understand the iOS Stack trace with memory address only. Proper support of dSym is needed.

(BTW if you can debug with memory address, please consider [joining us](http://jobs.oursky.com/).)

## Solution

One of the possible solutions is to fork a piece of Sentry code and get our hands on it, but we don’t want to get into the complexity.

Instead, we write a micro service that will reply to a Sentry notification with de-symbolized stack trace on Slack, here is what we did.

## A Slack bot to rule them all

Here we introduce a Slack bot that listens to Sentry notification and do all the de-symbolization works. Let us illustrate this with our iOS app [**_Spentable_**](https://itunes.apple.com/us/app/spentable/id500630565?mt=8).

1.  When a release is pushed to [Testflight](https://developer.apple.com/testflight/), it also pushes the respective dsym file to Slack.

![Raw exception from Sentry](/images/blogs/f53bf94db8_679927700e8fc967d6bbd659_exception_raw.png)

Raw exception from Sentry

1.  When Sentry posts a notification to Slack, the bot will analyze the message.
2.  If the message is a stack trace, it will download the respective dSYM file and run a command to symbolize the stack trace.
    1.  example stack trace:  
        `18 spentable 0x000000010012aeb0 spentable + 192176`
    2.  runs the following:
        1.  `` loadAddress=`echo "obase=16;ibase=10;$((0x000000010012aeb0-192176))" | bc` ``
        2.  `atos -o -l $loadAddress 0x000000010012aeb0 -arch`
    3.  example result:  
        `- (in spentable) (:)`
        1.  if the corresponding dSYM file is not provided, result only shows the original de-symbolized trace:  
            `0x000000010000003c (in spentable)`
3.  Result (NB: Only related stack trace) will be posted to corresponding **Slack** channel (in this case _#spentable_)

![De-symbolized stacktrace pushed in Slack channel ](/images/blogs/09966f9609_67992770f349eabfd48c8933_dsym_bot_result_simple.png)

De-symbolized stacktrace pushed in Slack channel

Now, the developers can start fighting with the bugs happily with this meaningful information 😉

Oursky had open-sourced this project on Github because we think it will be useful beyond [Oursky](http://www.oursky.com/). We are hoping that software programmers and developers will use, enhance, and customize this bot for their use-cases.

If you are interested in this mini Slack Bot, please check it out :

We would also like to engage with the community on topics related to efficiency for software development.

‍
