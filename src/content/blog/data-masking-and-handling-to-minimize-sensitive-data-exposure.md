---
title: "Data Masking and Handling to Minimize Sensitive Data Exposure"
description: "Some tips on how to establish a secure development cycle, covering data-masking and filtering techniques with code examples."
pubDate: 2024-09-12
author: "Oursky Team"
category: "code"
image: "https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/66e3414d06cf626ff37ac77b_image-1160x773.png"
draft: false
webflowId: "66e34153e8d13c9e0ce3b0a8"
---

Data privacy and security is an essential R&D stage for many applications. Here, we’ll walk you through on how to securely handle sensitive or personal information in your applications and reduce their chance of leaking.

There are all kinds of data obfuscation tools out there. Instead of covering them, we’ll share:

1.  How we implement our own ways to protect PII
2.  Some of our data-masking techniques

![Privacy with Data Masking](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/66e340afab190a148fbe893e_photo-1504639725590-34d0984388bd-1160x870.jpeg)

MASKING SENSITIVE DATA SHOULD BE A DEFAULT – PHOTO BY [DAYNE TOPKIN](https://unsplash.com/@ikukevk) ON [UNSPLASH](https://unsplash.com/)

## What is PII?

Personally identifiable information (PII) is any data used to identify, locate, or contact an individual. Data privacy regulations each have their own standards of what constitutes PII, so be mindful of what PII you should protect. For starters, check out how [The National Institute of Standards and Technology](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-122.pdf)(NIST) classifies PII.

## What is Sensitive Data?

While the term looks self-explanatory, boundaries separating data from being sensitive can still be blurry. So let’s resort to the definitions from the [European Commission](https://ec.europa.eu/info/law/law-topic/data-protection/reform/rules-business-and-organisations/legal-grounds-processing-data/sensitive-data/what-personal-data-considered-sensitive_en). The following are considered sensitive data:

*   personal data revealing racial or ethnic origin, political opinions, religious or philosophical beliefs;
*   trade-union membership;
*   genetic data, biometric data processed solely to identify a human being;
*   health-related data;
*   data concerning a person’s sex life or sexual orientation.

In this walkthrough, we will use PII and sensitive data interchangeably. But in real life, sensitive data often refers to something more general and broad, while PII has a stricter definition.

## Why is protecting PII/sensitive data so important?

Information and data privacy regulations and laws compel you to do so. Nobody wants to get slapped with a hefty fine! The European Union’s (EU’s) General Data Protection Regulation (GDPR) comes to mind.

Depending on the nature of your application, it has to comply with data privacy requirements for it to be legally released and used by the end users. Besides, keeping the user’s data secure and private must be a default to any developer.

Right, even if your team have the correct attitude, it’s often a careless mistake that causes a sensitive data exposure. Awareness is key to avoid this, hopefully this piece will provide some insights.

Onto the walkthrough! The examples below are in Kotlin, but the underlying concepts and principles are all applicable to different kinds of software development, especially on the front end.

## Data Class `Sensitive<T>` – Masking Sensitive Data by Default

Here’s our very own data-masking tool. When a data field itself contains some sensitive value, it should be encapsulated within the below data class to achieve **data obfuscation** by default. Since the `toString()` method is overridden, **where “masked” is always returned**, its **actual value can’t be printed out unless explicitly requested**. Access to sensitive or restricted information is controlled this way, reminding the developers not expose one. Below is a data-masking example class written in Kotlin:

‍

A hint – some programming languages support memory erasure, you may want to implement a `clear()` function with that.

Here’s an example data class `User` where three of its properties are considered sensitive, which hence needs data masking with `Sensitive<T>`:

‍

Below is a demo on masking with `Sensitive<T>`:

An interactive code snippet is available [here](https://pl.kotl.in/EuEHiR7I1), try run it! The result should be:

User(name=masked, email=masked, cardLast4=masked, username=elliot)Elliot

### Explicitly Obtain Sensitive Data

In cases where the developer really has to obtain a sensitive data field, they can do so by calling the function `getSensitive()` from the data class `Sensitive<T>`. Such operation is intentionally designed to be inconvenient so the developer will need to think twice before impetuously printing PII to the console.

### Track Exposed Sensitive Data

To visualize which part of code explicitly requested to expose sensitive data, type the following grep command in your terminal:

‍

This can be effortlessly integrated into a CI pipeline to conduct auto checks on exposed sensitive data.

## Build InputFields and Picker with `Sensitive<T>`

By wrapping standard UI widgets regardless of the platform (iOS, Android, web), you can build input components like InputFields or DatePicker that return `Sensitive<T>`. Doing this secures an input flow on sensitive data, from the second an end user starts entering data to the end of your process. This should be applied on all input components that contain sensitive data, where processes like masking credit card numbers or phone numbers become automatic.

Let’s say a user is entering a credit card CVC. We’ll always handle it with a `SensitiveInputField` that returns `Sensitive<String>`. The actual CVC value is hidden until the stage of serialization (for data transit), which minimizes direct contact. In other words, a masked credit card CVC value becomes the **default output** from the user input process.

## Disable Screenshot and Background Preview when Handling Sensitive Information

Thorough understandings on behaviours of the underlying operation system is also essential to a secure development cycle.

While we may have PII data hidden by sensitive filters in the code and log console, it’s still possible that the sensitive data value is shown on the UI. Make sure to disable screenshot ability and background preview on such screens.

### Android – Disable Screenshot

‍

‍

### Android – Hide Sensitive Screen on Recent Apps List

This [StackOverflow post](https://stackoverflow.com/a/49442984) covers the logic in lifecycle `onPause()` and `onResume()` to hide an app’s screen from Recent Apps List on Android. It may not work on older Android versions (i.e., pre-Android 8/Oreo), so you may have to opt for more robust measures like setting `android:excludeFromRecents="true"` in your manifest, or self-replacing the screen with a black image temporarily.

### iOS – Replace Task Switcher Thumbnail

This [document](https://developer.apple.com/library/archive/qa/qa1838/_index.html) covers how to hide sensitive information from the Task Switcher preview.

## Store Sensitive Data in Mobile App with System Secret Manager

Avoid storing sensitive data on your app (though sometimes it’s inevitable) like storing an access token in local storage.

### Android

Always store such tokens in [Android Keystore](https://developer.android.com/training/articles/keystore). Here’s a sample flow we’ve adopted lately:

1.  Generate an AES key first (per app) and store it in Android Keystore.
2.  Encrypt tokens with the AES key before saving to `SharedPreference.`

### iOS

Always go with [Keychain Services](https://developer.apple.com/documentation/security/keychain_services).

## Set your `.gitignore`, `.dockerignore`and `.gcloudignore` properly

A developer with less experience can set up a repo’s `.gitignore` properly right at the start. But s/he may never realize if other ignore files like `.dockerignore` are not configured carefully, which can lead to a lot of security problems.

The internet is loaded with all kinds of ignore file templates and discussions on them, so be sure to study thoroughly when you are not sure if yours is correct enough!

## Conclusion

So, there you have it! Data masking blocks certain fields and pieces of data from being visible. These data obfuscation techniques help prevent sensitive information from being visible while preserving the data’s integrity and the overall semantics.

The takeaway here is that there’s no silver bullet for data masking and preventing sensitive data exposure.  
Depending on the business requirements, use cases,and the data you’re working with, some techniques will be more relevant and need to be consistently applied than others.

There are also solutions with different stacks, like an authentication solution for web and mobile apps that went through rounds of security audit. For self-maintained ones, you’ll have to take up the responsibility in securing PII.

‍
