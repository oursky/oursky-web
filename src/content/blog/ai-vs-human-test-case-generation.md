---
title: "AI vs Human: Test Case Generation"
description: "We have done a small experiment, to ask ChatGPT to draft some test scenarios for a sample app, and compare the results with those written by a real human tester. The app will have authentication functions such as Sign Up, Sign In, Email Verification, Forgot Password, and Sign Out. Let’s see how it turns out, no cheating!"
pubDate: 2025-02-07
author: "Joyz Ng"
category: "qa"
image: "https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/66e300c2bdcd1bb946551a3f_8137885-scaled.jpg"
draft: false
webflowId: "66e301057ff06c7c48de9e3c"
---

Over the past few months, people have seen a surge of AI generated contents from articles to illustrations and more. ChatGPT is currently the most powerful AI model with the ability to chat with humans like a real person, and has a huge professional knowledge base to perform even techincal tasks.

As experts in software testing, we have a question here:

> **Can AI help human generate test cases?**

Below we have done a small experiment, to ask ChatGPT to draft some test scenarios for a sample app, and compare the results with those written by a real human tester. The app will have authentication functions such as Sign Up, Sign In, Email Verification, Forgot Password, and Sign Out. Let’s see how it turns out, no cheating!

‍

![](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/66e300e40e6e153a4cc546d5_8137885-1160x652.jpeg)

In the experiment, we will only give 1 short question to both ChatGPT and the human tester, without explanation or examples ahead, let’s see what they will show us from scratch:

**“I have a mobile app which authenticate users with email and password. It has Sign Up, Sign In, Email verification, Forgot password and Sign Out functions. Name some test scenarios for each of these functions.”**

_As a quick experiment, we are only testing the “default” answers from both sides by not providing extra information. However, for practical ChatGPT usage, we should include much more specific information in the prompt to generate the ideal result. More techniques about it can be found on the_ [OpenAI Cookbook](https://github.com/openai/openai-cookbook/blob/main/techniques_to_improve_reliability.md)_._

Alright Let’s Start!

### Round 1 – Sign Up

#### ChatGPT’s Test Cases

*   Verify that the user is able to enter valid email and password information
*   Verify that the user is able to submit the form and is **redirected to a success page**
*   Verify that the user is not able to submit the form if any required fields are missing or invalid
*   Verify that the user is not able to sign up with an already registered email address
*   Verify that the user is **prompted with helpful error messages** if any errors occur during the sign up process

#### Human’s Test Cases

*   Sign up with an email and password that meet the requirements
*   Sign up with missing mandatory fields
*   Sign up with an email that has an **incorrect format**, such as a missing “@” sign
*   Sign up with a password that **does not meet the complexity requirements**
*   Sign up with an email that is already registered

#### Result – Human wins a bit💪

Both ChatGPT and the human tester are able to cover the most common scenarios for successful and invalid sign-up attempts. A slight difference we could see here is that ChatGPT prioritizes the test scenarios for **UI behaviors** more, while the human tester focuses more on **conditional cases** of user input.

We would say both are important to the app, but in real-life executions, the human’s test cases actually have higher test coverage as the UI behaviors could be considered as some sub-steps of the conditional test scenarios.

### Round 2 – Sign In

#### ChatGPT’s Test Cases

*   Verify that the user is able to enter valid email and password information
*   Verify that the user is able to sign in and is **redirected to the correct page**
*   Verify that the user is not able to sign in with invalid email or password information
*   Verify that the user is redirected to the login page if they **try to access a protected page while not authenticated**
*   Verify that the user is **prompted with helpful error messages** if any errors occur during the sign in process

#### Human’s Test Cases

*   Sign in with the correct email and password of a verified account
*   Sign in with the correct email and password of **an unverified account**
*   Sign in with missing mandatory fields
*   Sign in with an **unregistered email**
*   Sign in with a wrong password

#### Result – 50/50⚔️

Similar to Sign Up case, both ChatGPT and human tester can cover successful and unsuccessful attempts. We can see that the human tester focus on conditional user inputs as in the last round, while ChatGPT also includes an important case **related to authentication security**, although it is not directly related to clicking the Sign-In button.

On the other hand, the human tester is able to relate test cases with other features such as email verification, while for ChatGPT, it seems that it needs to be given with more guidance to include additional cases related to cross-feature user flows.

### Round 3 – Email Verification

#### ChatGPT’s Test Cases

*   Verify that the user is able to successfully sign up for the app with a **valid** email address and password
*   Verify that the user receives the verification email promptly and that it contains the **correct** verification link
*   Verify that the user is able to click on the verification link and that it takes them to the **correct** page to verify their email address
*   Verify that the user is able to **successfully** verify their email address using the verification link
*   Verify that the user is redirected to the **correct** page after their email address has been verified
*   Verify that the user is **able to log in** with their email and password after their email address has been verified
*   Verify that the user is not able to log in with an incorrect email or password
*   Verify that the user is not able to access any protected pages until their email address has been verified
*   Verify that the user is **able to request** a new verification email if they did not receive the first one
*   Verify that the user is not able to request a new verification email if their email address **has already been verified**
*   Verify that the user is **able to receive** and use a new verification email if they accidentally delete the first one or the link expires.
*   Verify that the user is able to **successfully** verify their email address using the new verification email

#### Human’s Test Cases

Assume the user cannot sign in before verifying their email. Assume the email verification link is a deep link to open the app and finish the process in the app.

*   Click a valid email verification link to complete the verification
*   Click an email verification link after it has expired
*   Click an email verification link with an invalid URL
*   Request to resend the email verification link through the app
*   Click an old verification link after requesting to send a new link
*   Click an email verification link when the app is signing in with another account
*   Click an email verification link when the app is in the background
*   Click an email verification link when the app has been force quit
*   Click an email verification link when the app has been uninstalled

#### Result – Human wins by a mile🏃🏃🏃🏃

ChatGPT’s default answer is more like a set of steps to ensure that the Email Verification function works properly in **happy flows**. It generates a lot of points, but we can actually group some of them like point 1-6 into one test flow, while some are duplicated with previous sets like point 7-8, or too similar as separated cases like point 9 & 11.

The human side style is very different on this part. We can see that it actually covers a wider variety of conditions and real-life situations, such as clicking the verification link of different statuses.

As a test on a complex user function without more information given to ChatGPT, it will be difficult for it to create good enough result.

💡 Frankly speaking email verification is a complicated feature, especially when handling on a mobile app, as there are a lot of factors that could affect the behaviours depending on the app and business logic, which should be clarified before starting to write the test cases. For example,

**Regarding the verification status:**

*   Can user still sign in when the email is not verified?
*   If it verifies with a link, how many error states there are? Expiry, invalid link, old link, etc.
*   If it verifies with a code instead of clicking a link, how many error states there are? Expiry, wrong code, exceed no. of attempts, etc.
*   Are there other user statuses that will fail the verification? Suspened user, deleted account, etc.

**Regarding the user flow:**

*   How many entry points to trigger a email verification?
*   How many places will have status change after a successful verification, including other web portal or app platforms of the system?
*   Will email or push notification be sent to user after a verification?
*   How should the link route when the app is under different conditions? Staying on specific screens, app in background, app closed, etc.

### Round 4 – Forgot Password

#### ChatGPT’s Test Cases

*   Verify that the user is able to enter their email address and submit the forgot password form
*   Verify that the user receives an email with a password reset link
*   Verify that the user is able to click the password reset link and is redirected to a success page
*   Verify that the user is prompted with helpful error messages if **any errors occur** during the forgot password process
*   Verify that the user is able to reset their password and sign in using their new password

#### Human’s Test Cases

*   Submit forgot password form with a valid and registered email
*   Submit forgot password form with **empty email field**
*   Submit forgot password form with **an unregistered email**
*   Receive reset password email, follow the instructions and set a new password
*   Reset password with a password the **same as the old one**
*   Reset password with a password that **does not meet the complexity requirements**
*   Sign in with new password after reset
*   Try to **sign in with old password** after reset

#### Result – Human wins by accuracy and sustainability🧐

The “Forgot Password” feature is another example where ChatGPT generates something more like a test script that goes through the positive path of the feature with multiple steps, and includes only one unclear error scenario that tries to cover “any errors”, which is not specific enough for test execution.

In contrast, the human tester states the exact error conditions and divides the points by different test flows instead of different steps in a flow. This is also more recommended for higher efficiency in reading and maintaining the test scenarios, especially in high-speed agile projects.

### Last Round – Sign Out

#### ChatGPT’s Test Cases

*   Verify that the user is able to click the sign out button and is **redirected to the login page**
*   Verify that the user is not able to access any protected pages after signing out
*   Verify that the user is **redirected to the login page** if they try to access a protected page while not authenticated
*   Verify that the user is able to sign back in using their original email and password after signing out
*   Verify that the user’s session **is completely destroyed** after signing out

#### Human’s Test Cases

*   Show **confirmation dialogue** and confirm sign out
*   Cancel logout in confirmation dialogue
*   After sign out, user should not be able to access pages that requires login
*   After sign out, user **should not recceive push notifications** sending to the last logged in user
*   Sign in as the same user again after sign out, check if user info is loaded correctly
*   Sign in as **a different user** after sign out, check if user info is loaded correctly

#### Result – Woohoo! Another 50/50 🤜🤛

Similar to the Sign In round, ChatGPT and human tester are both able to list the common scenarios, including successful sign in, restricted content after sign out, and signing back in after sign out.

One interesting point is that since the given description is not clear, both of them tried to add some common UX behaviours based on their understanding of a sign out feature too, i.e.

*   Redirecting to sign in page after sign out and accessing protected page
*   Showing confirmation dialogue before user confirms to sign out

We can also see that they are slightly more precise in their “strengths” respectively, where ChatGPT describes more details about UI transition, and the human tester thinks of more checkpoints to test for a destroyed session.

## What’s Next?

It is significant that AI could act as a supporting role in writing test cases for human, and it takes just a second to generate the content while the prompt is sent. Even without specific information and examples given, ChatGPT could already generate some results as good as human testers, especially in straightforward questions, e.g. common scenarios or happy flows, user input validation, CRUD features, etc.

In the future, instead of spending time writing step-by-step test cases, we could foresee that QA testers will transform their skills to develop techniques related to the usage of ChatGPT, such as [few-shot chain of thought prompting](https://github.com/openai/openai-cookbook/blob/main/techniques_to_improve_reliability.md#few-shot-examples), and widely adopt it in the field of test case generation.

‍
